import { Link, useParams } from "react-router-dom";
import BorderGlow from "@/components/BorderGlow";
import Grainient from "@/components/Grainient";
import { getNewspaperArticle, relatedNewspaperArticles, sessions } from "@/lib/newspaper-data";
import { getNewsArticle, newsArticles } from "@/lib/press-data";

const grainientProps = {
  color1: "#123b72",
  color2: "#0d2a4a",
  color3: "#B497CF",
  timeSpeed: 0.25,
  colorBalance: 0.0,
  warpStrength: 1.0,
  warpFrequency: 5.0,
  warpSpeed: 2.0,
  warpAmplitude: 50.0,
  blendAngle: 0.0,
  blendSoftness: 0.05,
  rotationAmount: 500.0,
  noiseScale: 2.0,
  grainAmount: 0.1,
  grainScale: 2.0,
  grainAnimated: false,
  contrast: 1.5,
  gamma: 1.0,
  saturation: 1.0,
  centerX: 0.0,
  centerY: 0.0,
  zoom: 0.9,
};

export default function NewsArticle() {
  const { articleSlug = "" } = useParams();
  const paper = getNewspaperArticle(articleSlug);
  const article = getNewsArticle(articleSlug);

  if (paper) {
    const related = relatedNewspaperArticles(paper.slug);
    const sessionMeta = sessions.find((item) => item.id === paper.session);
    return (
      <main className="paper-grain min-h-screen text-ink">
        <article className="mx-auto max-w-4xl px-6 pb-24 pt-32 md:px-10 md:pt-40">
          <Link to="/news" className="text-[11px] font-medium uppercase tracking-[0.16em] text-blue hover:text-navy">
            ← The TESMUN Times
          </Link>
          <p className="mt-10 text-[11px] font-medium uppercase tracking-[0.18em] text-gold">
            {paper.committeeAbbr} · {sessionMeta?.label} · {paper.date}
          </p>
          <h1 className="font-masthead mt-4 max-w-4xl text-4xl leading-[0.95] text-navy sm:text-6xl">{paper.headline}</h1>
          <p className="mt-6 max-w-2xl text-xl leading-8 text-ink/65">{paper.dek}</p>
          <p className="mt-4 text-[11px] uppercase tracking-[0.14em] text-ink/45">
            By {paper.author} · Page {paper.page}
          </p>
          <figure className="mt-10">
            <img src={paper.image} alt={paper.imageAlt} className="aspect-[2/1] w-full object-cover" />
            <figcaption className="mt-3 flex flex-col gap-0.5 text-xs italic text-ink/50 sm:flex-row sm:justify-between">
              <span>{paper.caption}</span>
              <span className="not-italic uppercase tracking-[0.12em] text-ink/40">
                {paper.credit ?? "Photograph · TESMUN Press Corps"}
              </span>
            </figcaption>
          </figure>
          <div className="editorial-columns mt-12 text-[17px] leading-8 text-ink/80">
            {paper.body.map((paragraph, index) => (
              <p key={paragraph} className={index === 0 ? "drop-cap" : ""}>{paragraph}</p>
            ))}
            {paper.pullQuote && (
              <blockquote className="my-8 border-l-2 border-gold py-2 pl-6 font-masthead text-2xl leading-8 text-navy">
                “{paper.pullQuote}”
              </blockquote>
            )}
          </div>
          <div className="relative mt-16 px-6 py-10">
            <div className="absolute inset-0 -mx-6">
              <Grainient {...grainientProps} />
            </div>
            <p className="relative z-10 text-[11px] font-medium uppercase tracking-[0.16em] text-gold">Also in this edition</p>
            <div className="relative z-10 mt-5 grid gap-4 sm:grid-cols-3">
              {related.map((item) => (
                <Link key={item.slug} to={`/news/${item.slug}`} className="block">
                  <BorderGlow edgeSensitivity={30} glowColor="40 80 80" backgroundColor="#0d2a4a" borderRadius={28} glowRadius={40} glowIntensity={1} coneSpread={25} animated={false} colors={["#c6a15b", "#e3c46a", "#f4efa8"]}>
                    <div className="p-4">
                      <span className="text-[10px] uppercase tracking-[0.16em] text-gold">{item.committeeAbbr}</span>
                      <span className="font-masthead mt-2 block text-xl leading-tight text-warm">{item.headline}</span>
                    </div>
                  </BorderGlow>
                </Link>
              ))}
            </div>
          </div>
        </article>
      </main>
    );
  }

  if (!article) {
    return (
      <main className="px-6 py-40 text-center">
        <h1 className="font-display text-4xl">Article not found</h1>
        <Link to="/news" className="mt-6 inline-block text-sm uppercase tracking-[0.14em] text-blue">
          ← The TESMUN Times
        </Link>
      </main>
    );
  }

  const related = newsArticles.filter((item) => item.slug !== article.slug).slice(0, 2);

  return (
    <main className="paper-grain min-h-screen text-ink">
      <article className="mx-auto max-w-4xl px-6 pb-24 pt-32 md:px-10 md:pt-40">
        <Link to="/news" className="text-[11px] font-medium uppercase tracking-[0.16em] text-blue hover:text-navy">
          ← The TESMUN Times
        </Link>
        <p className="mt-12 text-[11px] font-medium uppercase tracking-[0.18em] text-gold">
          {article.session} · {article.date}
        </p>
        <h1 className="font-display mt-4 max-w-4xl text-5xl leading-[0.95] sm:text-7xl">{article.title}</h1>
        <p className="mt-8 max-w-2xl font-display text-xl leading-8 text-ink/65">{article.standfirst}</p>
        <p className="mt-4 text-[11px] uppercase tracking-[0.14em] text-ink/45">
          By {article.author}
        </p>

        {article.image && (
          <figure className="mt-10">
            <img src={article.image} alt={article.caption ?? article.title} className="aspect-[2/1] w-full object-cover" />
            {article.caption && <figcaption className="mt-3 text-xs italic text-ink/50">{article.caption}</figcaption>}
          </figure>
        )}

        <div className="mt-12 grid gap-12 md:grid-cols-[1fr_13rem]">
          <div className="editorial-columns font-display text-lg leading-9 text-ink/80">
            {article.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {article.pullQuote && (
              <blockquote className="my-8 border-l-2 border-gold py-2 pl-6 font-display text-2xl leading-8 text-navy">
                “{article.pullQuote}”
              </blockquote>
            )}
          </div>
          <aside className="border-t border-navy/15 pt-4 text-[11px] uppercase tracking-[0.14em] text-ink/45">
            TESMUN XIV Press Desk
            <br />
            Kathmandu
          </aside>
        </div>

        {article.extraImages?.map((image) => (
          <figure key={image.src} className="mt-10">
            <img src={image.src} alt={image.alt} className="w-full object-cover" />
            {image.caption && <figcaption className="mt-3 text-xs italic text-ink/50">{image.caption}</figcaption>}
          </figure>
        ))}

        <div className="relative mt-20 px-6 py-10">
          <div className="absolute inset-0 -mx-6">
            <Grainient {...grainientProps} />
          </div>
          <p className="relative z-10 text-[11px] font-medium uppercase tracking-[0.16em] text-gold">Related articles</p>
          <div className="relative z-10 mt-5 grid gap-4 sm:grid-cols-2">
            {related.map((item) => (
              <Link key={item.slug} to={`/press/news/${item.slug}`} className="border border-navy/15 p-5 transition-colors hover:border-gold">
                <span className="font-display text-2xl">{item.title}</span>
                <span className="mt-2 block text-sm text-ink/60">{item.standfirst}</span>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </main>
  );
}
