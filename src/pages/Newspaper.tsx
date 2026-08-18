import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  articlesBySession,
  getSessionMeta,
  sessions,
  type NewsSession,
  type NewspaperArticle,
} from "@/lib/newspaper-data";
import { getCommittee } from "@/lib/data";

type Page = 1 | 2;

function CommitteeMark({ slug, abbr }: { slug: string; abbr: string }) {
  const logo = getCommittee(slug)?.logo;
  return (
    <span className="inline-flex items-center gap-2">
      {logo && (
        <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">
          <img src={logo} alt="" className="h-full w-full object-contain" />
        </span>
      )}
      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-gold">{abbr}</span>
    </span>
  );
}

function SessionTabs({
  session,
  onChange,
}: {
  session: NewsSession;
  onChange: (id: NewsSession) => void;
}) {
  return (
    <nav aria-label="Conference session" className="overflow-x-auto">
      <ul className="flex min-w-max items-center justify-center">
        {sessions.map((item, index) => {
          const active = item.id === session;
          return (
            <li key={item.id} className="flex items-center">
              {index > 0 && (
                <span className="px-2 text-[10px] text-navy/35 sm:px-3" aria-hidden="true">
                  |
                </span>
              )}
              <button
                type="button"
                onClick={() => onChange(item.id)}
                aria-current={active ? "page" : undefined}
                className={`py-2 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors ${
                  active ? "text-navy underline decoration-gold decoration-2 underline-offset-6" : "text-ink/40 hover:text-navy"
                }`}
              >
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function Masthead({ session }: { session: NewsSession }) {
  const meta = getSessionMeta(session);
  return (
    <header>
      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-ink/50">
        <span>TESMUN XIV</span>
        <span className="hidden sm:inline">Kathmandu, Nepal</span>
        <span>{meta.date}</span>
      </div>
      <hr className="paper-rule mt-2" />
      <h1 className="font-masthead mt-2 text-center text-[11.5vw] font-semibold uppercase leading-[0.82] tracking-[-0.03em] text-navy sm:text-7xl md:text-[5.4rem]">
        The TESMUN Times
      </h1>
      <p className="mt-2 text-center text-[10px] uppercase tracking-[0.36em] text-gold sm:text-[11px]">News · Views · Impact</p>
      <hr className="paper-rule mt-3" />
      <div className="mt-2 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-ink/45">
        <span>{meta.edition}</span>
        <span>TESMUN Press Corps</span>
        <span>One rupee</span>
      </div>
    </header>
  );
}

function PageFooter({ page, session }: { page: Page; session: NewsSession }) {
  const meta = getSessionMeta(session);
  return (
    <footer className="mt-8 flex items-center justify-between border-t border-navy/20 pt-3 text-[10px] uppercase tracking-[0.18em] text-ink/45">
      <span>{meta.edition}</span>
      <span>Page {page} of 2</span>
      <span>The TESMUN Times</span>
    </footer>
  );
}

function Brief({ article }: { article: NewspaperArticle }) {
  return (
    <Link to={`/news/${article.slug}`} className="group block">
      <CommitteeMark slug={article.committeeSlug} abbr={article.committeeAbbr} />
      <h3 className="font-masthead mt-1 text-[1.15rem] leading-tight text-navy group-hover:text-blue sm:text-xl">
        {article.headline}
      </h3>
      <p className="mt-2 text-[13px] leading-6 text-ink/65">{article.dek}</p>
      <p className="mt-2 text-[10px] uppercase tracking-[0.14em] text-ink/40">Continued on page 2</p>
    </Link>
  );
}

function CoverPage({ articles, session }: { articles: NewspaperArticle[]; session: NewsSession }) {
  const lead = articles.find((article) => article.featured) ?? articles[0];
  const others = articles.filter((article) => article.slug !== lead.slug);
  const left = others.slice(0, 2);
  const right = others.slice(2, 4);
  const hot = others.slice(0, 4);

  return (
    <div>
      <Masthead session={session} />

      <div className="mt-4 hidden border-y border-navy/20 py-2 md:grid md:grid-cols-3 md:divide-x md:divide-navy/15">
        {others.slice(0, 3).map((article) => (
          <Link key={article.slug} to={`/news/${article.slug}`} className="group px-4 first:pl-0 last:pr-0">
            <CommitteeMark slug={article.committeeSlug} abbr={article.committeeAbbr} />
            <p className="font-masthead mt-1 text-sm leading-snug text-navy group-hover:text-blue">{article.headline}</p>
          </Link>
        ))}
      </div>

      <div className="mt-6 grid gap-7 border-b border-navy/20 pb-7 lg:grid-cols-12 lg:gap-0">
        <aside className="flex flex-col gap-6 lg:col-span-3 lg:border-r lg:border-navy/20 lg:pr-5">
          {left.map((article) => (
            <Brief key={article.slug} article={article} />
          ))}
        </aside>

        <Link to={`/news/${lead.slug}`} className="group lg:col-span-6 lg:px-6">
          <p className="flex flex-wrap items-center gap-2 text-[10px] font-medium uppercase tracking-[0.22em] text-gold">
            <CommitteeMark slug={lead.committeeSlug} abbr={lead.committeeAbbr} />
            <span className="text-ink/40">Continued on page 2</span>
          </p>
          <h2 className="font-masthead mt-2 text-[2rem] leading-[0.92] text-navy sm:text-5xl">{lead.headline}</h2>
          <p className="mt-3 text-[15px] leading-7 text-ink/70">{lead.dek}</p>
          <figure className="mt-4 overflow-hidden">
            <img src={lead.image} alt={lead.imageAlt} className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
            <figcaption className="mt-2 flex flex-col gap-0.5 text-xs italic text-ink/55 sm:flex-row sm:justify-between">
              <span>{lead.caption}</span>
              <span className="not-italic uppercase tracking-[0.12em] text-ink/40">
                {lead.credit ?? "Photograph · TESMUN Press Corps"}
              </span>
            </figcaption>
          </figure>
          <p className="drop-cap mt-4 text-[14px] leading-6 text-ink/80">{lead.body[0]}</p>
        </Link>

        <aside className="flex flex-col gap-6 lg:col-span-3 lg:border-l lg:border-navy/20 lg:pl-5">
          {right.map((article) => (
            <Brief key={article.slug} article={article} />
          ))}
        </aside>
      </div>

      <section className="mt-6">
        <div className="mb-4 flex items-baseline justify-between border-y-2 border-navy py-2">
          <h3 className="text-[11px] font-medium uppercase tracking-[0.24em] text-navy">Hot / Recently added</h3>
          <p className="text-[10px] uppercase tracking-[0.16em] text-ink/40">{getSessionMeta(session).label}</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-navy/15">
          {hot.map((article) => (
            <Link key={article.slug} to={`/news/${article.slug}`} className="group lg:px-4 first:pl-0 last:pr-0">
              <CommitteeMark slug={article.committeeSlug} abbr={article.committeeAbbr} />
              <h4 className="font-masthead mt-1 text-lg leading-snug text-navy group-hover:text-blue">{article.headline}</h4>
              <p className="mt-2 line-clamp-3 text-sm leading-6 text-ink/60">{article.dek}</p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.14em] text-ink/40">See page 2</p>
            </Link>
          ))}
        </div>
      </section>
      <PageFooter page={1} session={session} />
    </div>
  );
}

function StoryBlock({
  article,
  variant = "standard",
}: {
  article: NewspaperArticle;
  variant?: "lead" | "standard" | "compact";
}) {
  return (
    <article>
      <Link to={`/news/${article.slug}`} className="group block">
        <span className="inline-flex items-center gap-2">
          <CommitteeMark slug={article.committeeSlug} abbr={article.committeeAbbr} />
          <span className="text-[10px] uppercase tracking-[0.14em] text-ink/40">{article.committee}</span>
        </span>
        <h3
          className={`font-masthead mt-2 leading-[1.05] text-navy group-hover:text-blue ${
            variant === "lead" ? "text-3xl sm:text-4xl" : variant === "compact" ? "text-xl" : "text-2xl"
          }`}
        >
          {article.headline}
        </h3>
        <p className="mt-2 text-[11px] uppercase tracking-[0.12em] text-ink/40">
          By {article.author} · {article.date}
        </p>
      </Link>
      {variant === "lead" && (
        <figure className="mt-4 overflow-hidden">
          <img src={article.image} alt={article.imageAlt} className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
          <figcaption className="mt-2 flex flex-col gap-0.5 text-xs italic text-ink/50 sm:flex-row sm:justify-between">
            <span>{article.caption}</span>
            <span className="not-italic uppercase tracking-[0.12em] text-ink/35">
              {article.credit ?? "Photograph · TESMUN Press Corps"}
            </span>
          </figcaption>
        </figure>
      )}
      <p className="mt-3 text-[15px] leading-7 text-ink/70">{article.dek}</p>
      <p className={`mt-3 text-[15px] leading-7 text-ink/80 ${variant === "lead" ? "drop-cap" : ""}`}>{article.body[0]}</p>
      <Link
        to={`/news/${article.slug}`}
        className="mt-3 inline-block text-[11px] uppercase tracking-[0.16em] text-navy underline decoration-gold/70 underline-offset-4"
      >
        Continue reading
      </Link>
    </article>
  );
}

function InnerPage({
  articles,
  session,
}: {
  articles: NewspaperArticle[];
  session: NewsSession;
}) {
  const [lead, ...rest] = articles;
  const mid = rest.slice(0, 3);
  const last = rest.slice(3);
  return (
    <div>
      <div className="mb-6 flex items-end justify-between border-b-[3px] border-navy pb-3">
        <div>
          <p className="font-masthead text-2xl uppercase tracking-tight text-navy">The TESMUN Times</p>
          <p className="text-[10px] uppercase tracking-[0.18em] text-gold">TESMUN XIV</p>
        </div>
        <p className="text-[10px] uppercase tracking-[0.18em] text-ink/45">
          {getSessionMeta(session).label} · Page 2
        </p>
      </div>
      {lead && (
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7 lg:border-r lg:border-navy/20 lg:pr-7">
            <StoryBlock article={lead} variant="lead" />
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1 lg:divide-y lg:divide-navy/15">
            {mid.map((article) => (
              <div key={article.slug} className="lg:py-6 lg:first:pt-0 lg:last:pb-0">
                <StoryBlock article={article} variant="standard" />
              </div>
            ))}
          </div>
        </div>
      )}
      {last.length > 0 && (
        <div className="mt-10 grid gap-8 border-t-2 border-navy pt-8 md:grid-cols-3 md:divide-x md:divide-navy/15">
          {last.map((article) => (
            <div key={article.slug} className="md:px-5 first:md:pl-0 last:md:pr-0">
              <StoryBlock article={article} variant="compact" />
            </div>
          ))}
        </div>
      )}
      <PageFooter page={2} session={session} />
    </div>
  );
}

export default function Newspaper() {
  const [session, setSession] = useState<NewsSession>("final");
  const [page, setPage] = useState<Page>(1);
  const articles = useMemo(() => articlesBySession(session), [session]);

  const changeSession = (id: NewsSession) => {
    setSession(id);
    setPage(1);
  };

  return (
    <main className="paper-grain min-h-screen text-ink">
      <div className="news-sheet mx-auto max-w-6xl px-4 pb-16 pt-28 sm:px-8 md:px-12 md:pt-36">
        <div className="flex items-center justify-between gap-4">
          <Link to="/press" className="text-[11px] font-medium uppercase tracking-[0.16em] text-blue hover:text-navy">
            ← Press hub
          </Link>
          <p className="hidden text-[10px] uppercase tracking-[0.18em] text-ink/40 sm:block">A TESMUN Press Corps edition</p>
        </div>
        <div className="mt-5">
          <SessionTabs session={session} onChange={changeSession} />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${session}-${page}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="mt-7"
          >
            {page === 1 && <CoverPage articles={articles} session={session} />}
            {page === 2 && <InnerPage articles={articles} session={session} />}
          </motion.div>
        </AnimatePresence>

        <nav aria-label="Newspaper pages" className="mt-10 flex items-center justify-between gap-3 border-t border-navy/20 pt-5">
          <button
            type="button"
            onClick={() => setPage(1)}
            disabled={page === 1}
            className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.16em] text-navy disabled:text-ink/25"
          >
            <ChevronLeft size={14} /> Previous
          </button>
          <p className="text-[11px] uppercase tracking-[0.18em] text-navy">
            Page {page} / 2
          </p>
          <button
            type="button"
            onClick={() => setPage(2)}
            disabled={page === 2}
            className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.16em] text-navy disabled:text-ink/25"
          >
            Next <ChevronRight size={14} />
          </button>
        </nav>
      </div>
    </main>
  );
}
