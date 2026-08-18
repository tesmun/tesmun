type GradualBlurProps = {
  target?: "parent" | "self";
  position?: "top" | "bottom";
  height?: string;
  strength?: number;
  divCount?: number;
  curve?: "linear" | "bezier";
  exponential?: boolean;
  opacity?: number;
  className?: string;
};

export default function GradualBlur({
  target = "parent",
  position = "bottom",
  height = "6rem",
  strength = 2,
  divCount = 5,
  curve = "bezier",
  exponential = true,
  opacity = 1,
  className = "",
}: GradualBlurProps) {
  const layers = Array.from({ length: divCount }, (_, i) => {
    const t = (i + 1) / divCount;
    const eased = curve === "bezier" ? t * t * (3 - 2 * t) : t;
    const blur = (exponential ? eased * eased : eased) * strength * 8;
    const stop = eased * 100;
    return { blur, stop, i };
  });

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none ${target === "parent" ? "absolute inset-x-0" : "relative"} ${
        position === "bottom" ? "bottom-0" : "top-0"
      } ${className}`}
      style={{ height, opacity }}
    >
      {layers.map((layer) => (
        <div
          key={layer.i}
          className="absolute inset-0"
          style={{
            backdropFilter: `blur(${layer.blur}px)`,
            WebkitBackdropFilter: `blur(${layer.blur}px)`,
            maskImage:
              position === "bottom"
                ? `linear-gradient(to top, black ${layer.stop * 0.35}%, transparent ${layer.stop}%)`
                : `linear-gradient(to bottom, black ${layer.stop * 0.35}%, transparent ${layer.stop}%)`,
            WebkitMaskImage:
              position === "bottom"
                ? `linear-gradient(to top, black ${layer.stop * 0.35}%, transparent ${layer.stop}%)`
                : `linear-gradient(to bottom, black ${layer.stop * 0.35}%, transparent ${layer.stop}%)`,
          }}
        />
      ))}
    </div>
  );
}
