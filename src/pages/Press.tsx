import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import BorderGlow from "@/components/BorderGlow";
import Grainient from "@/components/Grainient";
import SpecularButton from "@/components/SpecularButton";
import { PageHero, Eyebrow } from "@/components/section-parts";
import { pressSections } from "@/lib/press-data";

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

const slots = [
  { slug: "news", layout: "wide" as const },
  { slug: "vox-pop", layout: "square" as const },
  { slug: "interviews", layout: "square" as const },
  { slug: "speeches", layout: "tall" as const },
  { slug: "op-ed", layout: "square" as const },
  { slug: "cartoons", layout: "square" as const },
];

export default function Press() {
  return (
    <main>
      <PageHero
        image="/images/press-hero.png"
        alt="Editorial still from the TESMUN press desk"
        title="PRESS"
        kicker="Press Hub"
        subtitle="Conference coverage from TESMUN XIV, produced by the International Press Corps."
      />

      <section className="relative px-6 py-20 pb-28 sm:py-28 md:px-10">
        <div className="absolute inset-0">
          <Grainient {...grainientProps} />
        </div>
        <div className="relative z-10 mx-auto max-w-6xl">
          <Reveal className="max-w-xl">
            <Eyebrow className="text-silver/80">Coverage</Eyebrow>
            <h2 className="font-display mt-3 text-3xl font-medium text-warm sm:text-4xl">The conference, recorded</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-silver/80">
              Six desks. One record. Choose a section to read the conference as it unfolds.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-6">
            {slots.map((slot, i) => {
              const section = pressSections[slot.slug as keyof typeof pressSections];
              const span = slot.layout === "wide" ? "md:col-span-6" : slot.layout === "tall" ? "md:col-span-2" : "md:col-span-2";
              return (
                <Reveal key={slot.slug} delay={i * 0.05} className={span}>
                  <Link to={slot.slug === "news" ? "/news" : `/press/${slot.slug}`} className="group block h-full">
                    <BorderGlow
                      edgeSensitivity={30}
                      glowColor="40 80 80"
                      backgroundColor="#0d2a4a"
                      borderRadius={28}
                      glowRadius={40}
                      glowIntensity={1}
                      coneSpread={25}
                      animated={false}
                      colors={["#c6a15b", "#e3c46a", "#f4efa8"]}
                      className="h-full transition-transform duration-500 group-hover:-translate-y-1"
                    >
                    <article className={`flex h-full flex-col justify-between p-7 ${slot.layout === "wide" ? "min-h-52 md:flex-row md:items-end" : "min-h-64"}`}>
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.16em] text-silver">0{i + 1}</p>
                          <h3 className="font-display mt-3 text-3xl font-medium text-warm">{section.label}</h3>
                          <p className="mt-3 max-w-md text-sm leading-6 text-silver/80">{section.intro}</p>
                        </div>
                        <span className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-warm">
                          Enter <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                      </article>
                    </BorderGlow>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          <div className="mt-12 flex justify-center">
            <BorderGlow
              edgeSensitivity={30}
              glowColor="40 80 80"
              backgroundColor="#0d2a4a"
              borderRadius={28}
              glowRadius={40}
              glowIntensity={1}
              coneSpread={25}
              animated={false}
              colors={["#c6a15b", "#e3c46a", "#f4efa8"]}
              className="inline-flex"
            >
              <div className="px-2 py-2">
                <SpecularButton href="/contact" size="lg">
                  Media inquiries
                </SpecularButton>
              </div>
            </BorderGlow>
          </div>
        </div>
      </section>
    </main>
  );
}
