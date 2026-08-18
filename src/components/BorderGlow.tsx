import { useRef, type CSSProperties, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type BorderGlowProps = {
  children: ReactNode;
  className?: string;
  edgeSensitivity?: number;
  glowColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  glowRadius?: number;
  glowIntensity?: number;
  coneSpread?: number;
  animated?: boolean;
  colors?: string[];
};

export default function BorderGlow({
  children,
  className,
  edgeSensitivity = 30,
  glowColor = "40 80 80",
  backgroundColor = "#0d2a4a",
  borderRadius = 28,
  glowRadius = 40,
  glowIntensity = 1,
  coneSpread = 25,
  animated = false,
  colors = ["#c6a15b", "#e3c46a", "#f4efa8"],
}: BorderGlowProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    ref.current.style.setProperty("--gx", `${x}px`);
    ref.current.style.setProperty("--gy", `${y}px`);
    const nearEdge =
      x < edgeSensitivity ||
      y < edgeSensitivity ||
      x > rect.width - edgeSensitivity ||
      y > rect.height - edgeSensitivity;
    ref.current.style.setProperty("--gopa", nearEdge ? String(0.95 * glowIntensity) : String(0.42 * glowIntensity));
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => ref.current?.style.setProperty("--gopa", "0")}
      className={cn("relative isolate h-full overflow-hidden", className)}
      style={
        {
          "--gx": "50%",
          "--gy": "0px",
          "--gopa": "0",
          borderRadius,
          background: backgroundColor,
        } as CSSProperties
      }
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 opacity-[var(--gopa)] transition-opacity duration-300 ${animated ? "animate-pulse" : ""}`}
        style={{
          background: `radial-gradient(${glowRadius * 6}px circle at var(--gx) var(--gy), ${colors[0]}, ${colors[1]} ${coneSpread}%, ${colors[2]} 46%, rgb(${glowColor} / 0) 68%)`,
        }}
      />
      <div
        className="relative z-10 m-[1px] h-[calc(100%-2px)] overflow-hidden"
        style={{ borderRadius: Math.max(borderRadius - 1, 0), background: backgroundColor }}
      >
        {children}
      </div>
    </div>
  );
}
