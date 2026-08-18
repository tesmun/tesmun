import { cn } from "@/lib/utils";

export function LogoMark({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <span className={cn("relative inline-block shrink-0", className)} style={{ width: size, height: size }}>
      <img src="/images/munlogo.svg" alt="TESMUN emblem" className="h-full w-full object-contain" />
    </span>
  );
}
