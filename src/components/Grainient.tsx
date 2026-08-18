import { useEffect, useRef } from "react";

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  return [((bigint >> 16) & 255) / 255, ((bigint >> 8) & 255) / 255, (bigint & 255) / 255];
}

const vertexShaderSource = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision mediump float;

  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec3 u_color1;
  uniform vec3 u_color2;
  uniform vec3 u_color3;
  uniform float u_timeSpeed;
  uniform float u_colorBalance;
  uniform float u_warpStrength;
  uniform float u_warpFrequency;
  uniform float u_warpSpeed;
  uniform float u_warpAmplitude;
  uniform float u_blendAngle;
  uniform float u_blendSoftness;
  uniform float u_rotationAmount;
  uniform float u_noiseScale;
  uniform float u_grainAmount;
  uniform float u_grainScale;
  uniform bool u_grainAnimated;
  uniform float u_contrast;
  uniform float u_gamma;
  uniform float u_saturation;
  uniform float u_centerX;
  uniform float u_centerY;
  uniform float u_zoom;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    uv = (uv - 0.5) / u_zoom + 0.5 + vec2(u_centerX, u_centerY);

    float angle = u_time * u_rotationAmount * 0.001;
    uv = mat2(cos(angle), -sin(angle), sin(angle), cos(angle)) * (uv - 0.5) + 0.5;

    float warp = sin(uv.x * u_warpFrequency + u_time * u_warpSpeed) * u_warpAmplitude * 0.01;
    uv += warp * u_warpStrength * vec2(1.0, 0.5);

    float n = noise(uv * u_noiseScale + u_time * u_timeSpeed);

    float blend = mix(uv.x, uv.y, u_blendAngle) + n * u_blendSoftness + u_colorBalance;
    vec3 color = mix(u_color1, u_color2, smoothstep(0.0, 0.5, blend));
    color = mix(color, u_color3, smoothstep(0.5, 1.0, blend));

    float grain = noise(uv * u_grainScale + (u_grainAnimated ? u_time * 0.1 : 0.0));
    color += (grain - 0.5) * u_grainAmount;

    color = (color - 0.5) * u_contrast + 0.5;
    color = pow(color, vec3(1.0 / u_gamma));

    float luminance = dot(color, vec3(0.299, 0.587, 0.114));
    color = mix(vec3(luminance), color, u_saturation);

    gl_FragColor = vec4(color, 1.0);
  }
`;

export type GrainientProps = {
  color1?: string;
  color2?: string;
  color3?: string;
  timeSpeed?: number;
  colorBalance?: number;
  warpStrength?: number;
  warpFrequency?: number;
  warpSpeed?: number;
  warpAmplitude?: number;
  blendAngle?: number;
  blendSoftness?: number;
  rotationAmount?: number;
  noiseScale?: number;
  grainAmount?: number;
  grainScale?: number;
  grainAnimated?: boolean;
  contrast?: number;
  gamma?: number;
  saturation?: number;
  centerX?: number;
  centerY?: number;
  zoom?: number;
  className?: string;
};

export default function Grainient({
  color1 = "#123b72",
  color2 = "#0d2a4a",
  color3 = "#B497CF",
  timeSpeed = 0.25,
  colorBalance = 0.0,
  warpStrength = 1.0,
  warpFrequency = 5.0,
  warpSpeed = 2.0,
  warpAmplitude = 50.0,
  blendAngle = 0.0,
  blendSoftness = 0.05,
  rotationAmount = 500.0,
  noiseScale = 2.0,
  grainAmount = 0.1,
  grainScale = 2.0,
  grainAnimated = false,
  contrast = 1.5,
  gamma = 1.0,
  saturation = 1.0,
  centerX = 0.0,
  centerY = 0.0,
  zoom = 0.9,
  className = "",
}: GrainientProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) return;

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compile(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compile(gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const uniforms = {
      resolution: gl.getUniformLocation(program, "u_resolution"),
      time: gl.getUniformLocation(program, "u_time"),
      color1: gl.getUniformLocation(program, "u_color1"),
      color2: gl.getUniformLocation(program, "u_color2"),
      color3: gl.getUniformLocation(program, "u_color3"),
      timeSpeed: gl.getUniformLocation(program, "u_timeSpeed"),
      colorBalance: gl.getUniformLocation(program, "u_colorBalance"),
      warpStrength: gl.getUniformLocation(program, "u_warpStrength"),
      warpFrequency: gl.getUniformLocation(program, "u_warpFrequency"),
      warpSpeed: gl.getUniformLocation(program, "u_warpSpeed"),
      warpAmplitude: gl.getUniformLocation(program, "u_warpAmplitude"),
      blendAngle: gl.getUniformLocation(program, "u_blendAngle"),
      blendSoftness: gl.getUniformLocation(program, "u_blendSoftness"),
      rotationAmount: gl.getUniformLocation(program, "u_rotationAmount"),
      noiseScale: gl.getUniformLocation(program, "u_noiseScale"),
      grainAmount: gl.getUniformLocation(program, "u_grainAmount"),
      grainScale: gl.getUniformLocation(program, "u_grainScale"),
      grainAnimated: gl.getUniformLocation(program, "u_grainAnimated"),
      contrast: gl.getUniformLocation(program, "u_contrast"),
      gamma: gl.getUniformLocation(program, "u_gamma"),
      saturation: gl.getUniformLocation(program, "u_saturation"),
      centerX: gl.getUniformLocation(program, "u_centerX"),
      centerY: gl.getUniformLocation(program, "u_centerY"),
      zoom: gl.getUniformLocation(program, "u_zoom"),
    };

    const setUniforms = () => {
      gl.uniform3fv(uniforms.color1, hexToRgb(color1));
      gl.uniform3fv(uniforms.color2, hexToRgb(color2));
      gl.uniform3fv(uniforms.color3, hexToRgb(color3));
      gl.uniform1f(uniforms.timeSpeed, timeSpeed);
      gl.uniform1f(uniforms.colorBalance, colorBalance);
      gl.uniform1f(uniforms.warpStrength, warpStrength);
      gl.uniform1f(uniforms.warpFrequency, warpFrequency);
      gl.uniform1f(uniforms.warpSpeed, warpSpeed);
      gl.uniform1f(uniforms.warpAmplitude, warpAmplitude);
      gl.uniform1f(uniforms.blendAngle, blendAngle);
      gl.uniform1f(uniforms.blendSoftness, blendSoftness);
      gl.uniform1f(uniforms.rotationAmount, rotationAmount);
      gl.uniform1f(uniforms.noiseScale, noiseScale);
      gl.uniform1f(uniforms.grainAmount, grainAmount);
      gl.uniform1f(uniforms.grainScale, grainScale);
      gl.uniform1i(uniforms.grainAnimated, grainAnimated ? 1 : 0);
      gl.uniform1f(uniforms.contrast, contrast);
      gl.uniform1f(uniforms.gamma, gamma);
      gl.uniform1f(uniforms.saturation, saturation);
      gl.uniform1f(uniforms.centerX, centerX);
      gl.uniform1f(uniforms.centerY, centerY);
      gl.uniform1f(uniforms.zoom, zoom);
    };

    setUniforms();

    const resize = () => {
      const parent = canvas.parentElement;
      const width = parent ? parent.clientWidth : canvas.clientWidth;
      const height = parent ? parent.clientHeight : canvas.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);

    startTimeRef.current = performance.now();
    const render = () => {
      const elapsed = (performance.now() - startTimeRef.current) * 0.001;
      gl.uniform1f(uniforms.time, elapsed);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      frameRef.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameRef.current);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, [
    color1,
    color2,
    color3,
    timeSpeed,
    colorBalance,
    warpStrength,
    warpFrequency,
    warpSpeed,
    warpAmplitude,
    blendAngle,
    blendSoftness,
    rotationAmount,
    noiseScale,
    grainAmount,
    grainScale,
    grainAnimated,
    contrast,
    gamma,
    saturation,
    centerX,
    centerY,
    zoom,
  ]);

  return <canvas ref={canvasRef} className={`block h-full w-full ${className}`} />;
}
