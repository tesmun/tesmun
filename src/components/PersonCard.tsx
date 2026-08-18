import { Link } from "react-router-dom";
import type { Person } from "@/lib/data";
import { cn } from "@/lib/utils";

function initials(name: string) {
  if (name.toLowerCase().includes("announced") || name.toLowerCase().includes("doe")) return "—";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

export function PersonPlaceholder({ name, className }: { name: string; className?: string }) {
  return (
    <div
      className={cn("relative flex items-center justify-center overflow-hidden bg-navy", className)}
      aria-hidden="true"
    >
      <div className="absolute inset-0 border border-white/10" />
      <span className="font-display text-3xl tracking-wide text-silver/70">{initials(name)}</span>
    </div>
  );
}

function Portrait({ person, className }: { person: Person; className?: string }) {
  const portrait = !person.image ? (
    <PersonPlaceholder name={person.name} className={className} />
  ) : (
    <div className={cn("relative overflow-hidden bg-navy", className)}>
      <img
        src={person.image}
        alt={`${person.name}, ${person.role}`}
        className="photo-fill scale-on-hover"
      />
    </div>
  );

  if (!person.slug) return portrait;

  return (
    <Link to={`/our-team/${person.slug}`} aria-label={`Read ${person.name}'s profile`} className="block outline-none focus-visible:ring-2 focus-visible:ring-gold">
      {portrait}
    </Link>
  );
}

export function PersonCard({ person, size = "md" }: { person: Person; size?: "sm" | "md" }) {
  return (
    <div className="group flex flex-col gap-3">
      <Portrait person={person} className={cn("w-full overflow-hidden", size === "sm" ? "aspect-[3/4]" : "aspect-[4/5]")} />
      <div>
        <p className="font-display text-lg font-medium text-ink">{person.placeholder ? "To Be Announced" : person.name}</p>
        <p className="text-[11px] uppercase tracking-[0.14em] text-blue/80">{person.role}</p>
      </div>
    </div>
  );
}
