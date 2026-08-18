import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import BorderGlow from "@/components/BorderGlow";
import { newsArticles, pressSections } from "@/lib/press-data";

const sessions = ["Final Session", "Second Session", "First Session"] as const;

export default function PressNews() {
  const featured = newsArticles[0];
  const rest = newsArticles.slice(1);

  return (
    <main className="paper-grain min-h-screen text-ink">
      <section className="border-b border-navy/15 px-6 pb-16 pt-32 md:px-10 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <Link to="/press" className="text-[11px] font-medium uppercase tracking-[0.16em] text-blue hover:text-navy">
            ← Press hub
          </Link>
          <div className="mt-8 flex items-end justify-between gap-6 border-b-2 border-navy pb-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-gold">International Press Corps</p>
              <h1 className="font-display mt-2 text-6xl font-medium leading-[0.9] tracking-tight sm:text-8xl">The Gazette</h1>
            </div>
            <p className="hidden max-w-xs text-right text-sm leading-6 text-ink/60 md:block">{pressSections.news.intro}</p>
          </div>
          <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-ink/50">TESMUN XIV · Kathmandu</p>
        </div>
      </section>

      <section className="px-6 py-12 md:px-10">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.4fr_0.8fr]">
          <Link to={`/press/news/${featured.slug}`} className="group">
            <p className="text-[11px] uppercase tracking-[0.18em] text-gold">{featured.session}</p>
            <h2 className="font-display mt-3 text-4xl leading-[1.05] text-ink sm:text-6xl">{featured.title}</h2>
            <div className="mt-6 overflow-hidden">
              <img
                src={featured.image}
                alt={featured.caption ?? featured.title}
                className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
            <p className="mt-5 max-w-2xl font-display text-xl leading-8 text-ink/70">{featured.standfirst}</p>
            <span className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-navy">
              Continue reading <ArrowUpRight size={14} />
            </span>
          </Link>

          <aside className="flex flex-col gap-6 border-t border-navy/15 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <p className="text-[11px] uppercase tracking-[0.18em] text-gold">Also in this edition</p>
            {rest.map((article) => (
              <Link key={article.slug} to={`/press/news/${article.slug}`} className="group border-b border-navy/15 pb-6 last:border-0">
                <p className="text-[11px] uppercase tracking-[0.14em] text-ink/45">{article.session}</p>
                <h3 className="font-display mt-2 text-2xl leading-tight group-hover:text-navy">{article.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink/60">{article.standfirst}</p>
              </Link>
            ))}
          </aside>
        </div>
      </section>

      <section className="px-6 pb-24 md:px-10">
        <div className="mx-auto max-w-6xl space-y-14">
          {sessions.map((session) => {
            const items = newsArticles.filter((a) => a.session === session);
            if (!items.length) return null;
            return (
              <div key={session}>
                <div className="mb-6 flex items-center justify-between border-y border-navy/20 py-3">
                  <h2 className="font-display text-2xl">{session}</h2>
                  <span className="text-[11px] uppercase tracking-[0.16em] text-ink/45">Dispatches</span>
                </div>
                <div className="grid gap-8 md:grid-cols-3">
                  {items.map((article) => (
                    <Link key={article.slug} to={`/press/news/${article.slug}`} className="group block">
                      <BorderGlow backgroundColor="#0d2a4a" borderRadius={16} colors={["#c6a15b", "#e3c46a", "#f4efa8"]}>
                      <img
                        src={article.image}
                        alt={article.caption ?? article.title}
                        className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      </BorderGlow>
                      <p className="mt-4 text-[11px] uppercase tracking-[0.14em] text-gold">
                        {article.date} · {article.author}
                      </p>
                      <h3 className="font-display mt-2 text-2xl leading-tight">{article.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-ink/65">{article.standfirst}</p>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
