import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center bg-warm px-6 text-center">
      <p className="text-[11px] uppercase tracking-[0.22em] text-gold">TESMUN XIV</p>
      <h1 className="font-display mt-4 text-5xl text-navy">Page not found</h1>
      <p className="mt-4 max-w-md text-sm text-ink/65">The page you requested is not part of this session.</p>
      <Link to="/" className="mt-8 text-xs uppercase tracking-[0.16em] text-navy underline decoration-gold underline-offset-4">
        Return home
      </Link>
    </main>
  );
}
