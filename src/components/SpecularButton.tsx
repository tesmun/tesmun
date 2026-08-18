import { useRef, type ButtonHTMLAttributes, type CSSProperties, type MouseEvent, type ReactNode, type RefObject } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type SpecularButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  radius?: number;
  tint?: string;
  tintOpacity?: number;
  blur?: number;
  textColor?: string;
  lineColor?: string;
  baseColor?: string;
  intensity?: number;
  shineSize?: number;
  shineFade?: number;
  thickness?: number;
  speed?: number;
  followMouse?: boolean;
  proximity?: number;
  autoAnimate?: boolean;
  href?: string;
};

export default function SpecularButton({
  children,
  className,
  size = "md",
  radius = 18,
  tint = "#ffffff",
  tintOpacity = 0,
  textColor = "#f8f7f2",
  lineColor = "rgba(200,205,211,0.45)",
  baseColor = "#0d2a4a",
  intensity = 1,
  shineSize = 10,
  shineFade = 40,
  thickness = 1,
  speed = 0.35,
  followMouse = true,
  proximity = 250,
  autoAnimate = false,
  href,
  ...props
}: SpecularButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  const onMove = (event: MouseEvent<HTMLElement>) => {
    if (!followMouse || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    ref.current.style.setProperty("--mx", `${x}px`);
    ref.current.style.setProperty("--my", `${y}px`);
  };

  const padding = size === "lg" ? "0.95rem 1.7rem" : size === "sm" ? "0.55rem 0.95rem" : "0.75rem 1.3rem";
  const fontSize = size === "lg" ? "0.72rem" : "0.64rem";

  const style = {
    "--mx": "50%",
    "--my": "50%",
    borderRadius: radius,
    color: textColor,
    padding,
    fontSize,
    background: `linear-gradient(180deg, ${baseColor}, #071a33)`,
    border: `${thickness}px solid ${lineColor}`,
    boxShadow: `inset 0 1px 0 rgba(244,239,168,${0.18 * intensity}), 0 10px 28px rgba(7,26,51,0.28)`,
    transition: `transform ${speed}s ease, box-shadow ${speed}s ease`,
  } as CSSProperties;

  const shine = (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ borderRadius: radius }}
    >
      <span
        className={`absolute h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full ${autoAnimate ? "animate-pulse" : ""}`}
        style={{
          left: "var(--mx)",
          top: "var(--my)",
          background: `radial-gradient(circle, rgba(244,239,168,${0.28 * intensity}) 0%, transparent ${shineFade}%)`,
          width: shineSize * 8,
          height: shineSize * 8,
        }}
      />
      <span
        className="absolute inset-0"
        style={{
          background: `linear-gradient(120deg, transparent 30%, ${tint}${Math.round(tintOpacity * 255)
            .toString(16)
            .padStart(2, "0")} 48%, transparent 62%)`,
        }}
      />
    </span>
  );

  const classes = cn(
    "group relative inline-flex items-center justify-center overflow-hidden font-sans font-medium uppercase tracking-[0.16em] outline-none hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-gold/70",
    className,
  );

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
    if (isExternal) {
      return (
        <a
          ref={ref as RefObject<HTMLAnchorElement>}
          href={href}
          className={classes}
          style={style}
          onMouseMove={onMove}
          {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {shine}
          <span className="relative z-10">{children}</span>
        </a>
      );
    }
    return (
      <Link
        ref={ref as RefObject<HTMLAnchorElement>}
        to={href}
        className={classes}
        style={style}
        onMouseMove={onMove}
      >
        {shine}
        <span className="relative z-10">{children}</span>
      </Link>
    );
  }

  return (
    <button
      ref={ref as RefObject<HTMLButtonElement>}
      className={classes}
      style={style}
      onMouseMove={onMove}
      {...props}
    >
      {shine}
      <span className="relative z-10">{children}</span>
    </button>
  );
}
