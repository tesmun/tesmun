import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Divider({ className }: { className?: string }) {
  return <hr className={cn("rule mx-auto max-w-7xl", className)} />;
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("text-[11px] font-medium uppercase tracking-[0.24em] text-blue", className)}>
      {children}
    </p>
  );
}

export function EditorialLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      to={href}
      className={cn(
        "group inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.12em] text-navy transition-opacity hover:opacity-70",
        className,
      )}
    >
      <span className="border-b border-gold/70 pb-0.5">{children}</span>
      <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1.5" />
    </Link>
  );
}

export function PageHero({
  image,
  alt,
  title,
  kicker,
  subtitle,
}: {
  image: string;
  alt: string;
  title: string;
  kicker?: string;
  subtitle?: string;
}) {
  return (
    <section className="group/img relative flex h-[68vh] min-h-[420px] w-full items-center justify-center overflow-hidden bg-navy-deep">
      <img src={image} alt={alt} className="scale-on-hover absolute inset-0 h-full w-full object-cover" />
      <div className="navy-hero-overlay absolute inset-0" />
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        {kicker && <p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-silver">{kicker}</p>}
        <h1 className="font-display text-[11vw] font-semibold leading-[0.95] text-warm sm:text-[7vw] lg:text-[5.2vw]">
          {title}
        </h1>
        {subtitle && <p className="mt-5 max-w-xl text-sm leading-relaxed text-silver/90 sm:text-base">{subtitle}</p>}
      </div>
    </section>
  );
}
