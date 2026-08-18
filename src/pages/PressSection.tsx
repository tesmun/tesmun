import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { X } from "lucide-react";
import BorderGlow from "@/components/BorderGlow";
import Grainient from "@/components/Grainient";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { PersonPlaceholder } from "@/components/PersonCard";
import {
  cartoons,
  interviews,
  opEdContributors,
  pressSections,
  speeches,
  voxQuestions,
  type PressSectionSlug,
} from "@/lib/press-data";

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

export default function PressSection() {
  const { slug = "" } = useParams();
  const section = pressSections[slug as PressSectionSlug];
  const [lightbox, setLightbox] = useState<number | null>(null);

  if (!section || slug === "news") {
    return (
      <main className="relative min-h-screen px-6 py-40 text-center text-warm">
        <div className="fixed inset-0 -z-10">
          <Grainient {...grainientProps} />
        </div>
        <h1 className="relative z-10 font-display text-4xl">Section not found</h1>
        <Link to="/press" className="relative z-10 mt-6 inline-block text-sm uppercase tracking-[0.14em] text-silver hover:text-gold">
          ← Press hub
        </Link>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen text-warm">
      <div className="fixed inset-0 -z-10">
        <Grainient {...grainientProps} />
      </div>
      <section className="relative z-10 px-6 pb-12 pt-32 md:px-10 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <Link to="/press" className="text-[11px] font-medium uppercase tracking-[0.16em] text-silver hover:text-gold">
            ← Press hub
          </Link>
          <p className="mt-12 text-[11px] uppercase tracking-[0.18em] text-gold">
            {slug === "op-ed" ? "Editorial desk" : "Press Committee"}
          </p>
          <h1 className="font-display mt-4 max-w-4xl text-5xl leading-[0.92] text-warm sm:text-7xl">{section.title}</h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-silver/80">{section.intro}</p>
        </div>
      </section>

      {slug === "vox-pop" && (
        <section className="px-6 pb-24 md:px-10">
          <div className="mx-auto max-w-6xl space-y-16">
            {voxQuestions.map((item, qIndex) => (
              <div key={item.question}>
                <div className="mb-8 bg-navy-deep px-6 py-5 text-warm">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-silver">Q{qIndex + 1}</p>
                  <h2 className="font-display mt-2 text-2xl sm:text-4xl">{item.question}</h2>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {item.answers.map((answer, index) => (
                    <BorderGlow key={answer} edgeSensitivity={30} glowColor="40 80 80" backgroundColor="#0d2a4a" borderRadius={28} glowRadius={40} glowIntensity={1} coneSpread={25} animated={false} colors={["#c6a15b", "#e3c46a", "#f4efa8"]}>
                    <article className="group p-4">
                      <div className="relative aspect-square overflow-hidden bg-navy">
                        <PersonPlaceholder
                          name={`Person ${index + 1}`}
                          className="h-full w-full"
                        />
                        <span className="sr-only">Portrait placeholder for conference participant {index + 1}</span>
                      </div>
                      <p className="mt-4 text-[15px] leading-7 text-warm">{answer}</p>
                    </article>
                    </BorderGlow>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {slug === "interviews" && (
        <section className="px-6 pb-24 md:px-10">
          <div className="mx-auto max-w-4xl space-y-14">
            {interviews.map((story) => (
              <BorderGlow key={story.slug} edgeSensitivity={30} glowColor="40 80 80" backgroundColor="#0d2a4a" borderRadius={28} glowRadius={40} glowIntensity={1} coneSpread={25} animated={false} colors={["#c6a15b", "#e3c46a", "#f4efa8"]}>
              <article className="p-7 sm:p-8">
                <div className="flex items-start gap-5">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden bg-navy">
                    {story.portrait ? (
                      <img src={story.portrait} alt={`Portrait of ${story.subject}`} className="photo-fill" />
                    ) : (
                      <PersonPlaceholder name={story.subject} className="h-full w-full" />
                    )}
                  </div>
                  <div>
                    <h2 className="font-display text-3xl leading-tight text-warm sm:text-4xl">{story.title}</h2>
                    <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-silver">{story.subject}</p>
                  </div>
                </div>
                <div className="mt-8">
                  <YouTubeEmbed url={story.youtubeUrl} title={story.title} />
                </div>
              </article>
              </BorderGlow>
            ))}
          </div>
        </section>
      )}

      {slug === "speeches" && (
        <section className="px-6 pb-24 md:px-10">
          <div className="mx-auto max-w-3xl space-y-16">
            {speeches.map((speech) => (
              <BorderGlow key={speech.slug} edgeSensitivity={30} glowColor="40 80 80" backgroundColor="#0d2a4a" borderRadius={28} glowRadius={40} glowIntensity={1} coneSpread={25} animated={false} colors={["#c6a15b", "#e3c46a", "#f4efa8"]}>
              <article className="p-7 sm:p-8">
                <div className="mb-8 flex items-center gap-5">
                  <div className="relative h-24 w-24 overflow-hidden bg-navy">
                    {speech.photo ? (
                      <img src={speech.photo} alt={`Photograph of ${speech.speaker}`} className="photo-fill" />
                    ) : (
                      <PersonPlaceholder name={speech.speaker} className="h-full w-full" />
                    )}
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-gold">{speech.committee}</p>
                    <h2 className="font-display mt-1 text-3xl text-warm">{speech.title}</h2>
                    <p className="mt-2 text-sm text-silver/75">
                      {speech.speaker} · {speech.role}
                    </p>
                  </div>
                </div>
                <div className="space-y-5 text-lg leading-9 text-silver/85">
                  {speech.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </article>
              </BorderGlow>
            ))}
          </div>
        </section>
      )}

      {slug === "op-ed" && (
        <section className="px-6 pb-24 md:px-10">
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
            {opEdContributors.map((person) => {
              const inner = (
                <>
                  <div className="aspect-[5/4] overflow-hidden bg-navy">
                    {person.photo ? (
                      <img src={person.photo} alt={`Portrait of ${person.name}`} className="h-full w-full object-cover" />
                    ) : (
                      <PersonPlaceholder name={person.name} className="h-full w-full" />
                    )}
                  </div>
                  <div className="p-6">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-gold">{person.role}</p>
                    <h2 className="font-display mt-2 text-3xl text-warm">{person.name}</h2>
                    <p className="mt-5 text-[11px] uppercase tracking-[0.16em] text-silver underline decoration-gold underline-offset-4">
                      View OP-ED PDF
                    </p>
                  </div>
                </>
              );
              return person.pdf ? (
                <a
                  key={person.name}
                  href={person.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <BorderGlow edgeSensitivity={30} glowColor="40 80 80" backgroundColor="#0d2a4a" borderRadius={28} glowRadius={40} glowIntensity={1} coneSpread={25} animated={false} colors={["#c6a15b", "#e3c46a", "#f4efa8"]}>
                  {inner}
                  </BorderGlow>
                </a>
              ) : (
                <BorderGlow key={person.name} edgeSensitivity={30} glowColor="40 80 80" backgroundColor="#0d2a4a" borderRadius={28} glowRadius={40} glowIntensity={1} coneSpread={25} animated={false} colors={["#c6a15b", "#e3c46a", "#f4efa8"]}>
                <article>
                  {inner}
                  <p className="px-6 pb-6 text-xs text-silver/50">PDF forthcoming.</p>
                </article>
                </BorderGlow>
              );
            })}
          </div>
        </section>
      )}

      {slug === "cartoons" && (
        <section className="px-6 pb-24 md:px-10">
          <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2">
            {cartoons.map((cartoon, index) => (
              <button
                key={cartoon.src}
                type="button"
                onClick={() => setLightbox(index)}
                className="group block overflow-hidden"
              >
                <BorderGlow edgeSensitivity={30} glowColor="40 80 80" backgroundColor="#0d2a4a" borderRadius={28} glowRadius={40} glowIntensity={1} coneSpread={25} animated={false} colors={["#c6a15b", "#e3c46a", "#f4efa8"]}>
                <img src={cartoon.src} alt={cartoon.alt} className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                </BorderGlow>
              </button>
            ))}
          </div>
          {lightbox !== null && (
            <div
              className="fixed inset-0 z-[80] flex items-center justify-center bg-navy-deep/90 p-6"
              onClick={() => setLightbox(null)}
            >
              <button type="button" aria-label="Close cartoon" className="absolute right-6 top-6 text-warm">
                <X size={28} />
              </button>
              <img
                src={cartoons[lightbox].src}
                alt={cartoons[lightbox].alt}
                className="max-h-[86vh] max-w-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
        </section>
      )}
    </main>
  );
}
