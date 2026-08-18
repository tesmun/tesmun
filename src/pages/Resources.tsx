import { BookOpen, FileText, TableProperties } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import BorderGlow from "@/components/BorderGlow";
import Grainient from "@/components/Grainient";
import { LogoMark } from "@/components/LogoMark";
import { Divider, Eyebrow, PageHero } from "@/components/section-parts";
import FindAssignment from "@/components/FindAssignment";
import { allocationsSheet, committeesByCategory } from "@/lib/data";

const guideCommittees = [...committeesByCategory.national, ...committeesByCategory.international].filter(
  (c) => c.slug !== "ipc"
);

const delegateHandbook = "https://drive.google.com/file/d/1O1bmZtB23QCrZeCudLt0Ph9iGLqN21Rx/view?usp=sharing";

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

export default function Resources() {
  return (
    <main>
      <PageHero
        image="/images/resources-hero.png"
        alt="Research materials prepared for TESMUN delegates"
        title="RESOURCES"
        kicker="Delegate library"
      />

      <FindAssignment />

      <Divider />

      <section className="bg-warm px-6 py-20 sm:py-28 md:px-10">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <Eyebrow>Essential documents</Eyebrow>
            <h2 className="font-display mt-3 text-3xl text-ink sm:text-4xl">The working papers of the conference</h2>
          </Reveal>
          <div className="mt-12">
            <Reveal>
              <a
                href={delegateHandbook}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <BorderGlow backgroundColor="#0d2a4a" borderRadius={22} colors={["#c6a15b", "#e3c46a", "#f4efa8"]}>
                  <article className="flex flex-col justify-between p-8 sm:flex-row sm:items-end sm:gap-10">
                    <div>
                      <BookOpen size={22} className="text-gold" />
                      <h3 className="font-display mt-5 text-2xl text-warm">Delegate Handbook</h3>
                      <p className="mt-3 max-w-md text-sm leading-7 text-silver/80">
                        Procedure, dress, points and motions — the working document for the conference floor.
                      </p>
                    </div>
                    <span className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-silver transition-colors group-hover:text-gold sm:mt-0">
                      Open handbook <FileText size={14} />
                    </span>
                  </article>
                </BorderGlow>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      <Divider />

      <section className="relative px-6 py-20 sm:py-28 md:px-10">
        <div className="absolute inset-0">
          <Grainient {...grainientProps} />
        </div>
        <div className="relative z-10 mx-auto max-w-5xl">
          <Reveal className="max-w-xl">
            <Eyebrow className="text-silver/80">Background Guides</Eyebrow>
            <h2 className="font-display mt-3 text-3xl text-warm">Committee research</h2>
            <p className="mt-4 text-sm leading-relaxed text-silver/80">
              Published guides open in Google Docs. Remaining committees will appear here as their guides are released.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {guideCommittees.map((committee, i) => (
              <Reveal key={committee.slug} delay={i * 0.04}>
                {committee.guideUrl ? (
                  <a
                    href={committee.guideUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <BorderGlow backgroundColor="#0d2a4a" borderRadius={18} colors={["#c6a15b", "#e3c46a", "#f4efa8"]}>
                      <span className="flex items-center gap-5 p-5">
                        <span className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-2">
                          {committee.logo ? (
                            <img src={committee.logo} alt={`${committee.abbr} emblem`} className="h-full w-full object-contain" />
                          ) : (
                            <LogoMark size={36} />
                          )}
                        </span>
                        <span className="flex-1">
                          <span className="block font-display text-xl text-warm">{committee.abbr}</span>
                          <span className="block text-xs text-silver/70">{committee.name}</span>
                        </span>
                        <FileText size={16} className="text-gold" />
                      </span>
                    </BorderGlow>
                  </a>
                ) : (
                  <div className="flex items-center gap-5 border border-white/10 bg-white/10 p-5 opacity-80">
                    <span className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-2">
                      {committee.logo ? (
                        <img src={committee.logo} alt={`${committee.abbr} emblem`} className="h-full w-full object-contain" />
                      ) : (
                        <LogoMark size={36} />
                      )}
                    </span>
                    <span className="flex-1">
                      <span className="block font-display text-xl text-warm">{committee.abbr}</span>
                      <span className="block text-xs text-silver/70">Guide forthcoming</span>
                    </span>
                  </div>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-deep px-6 py-20 pb-28 sm:py-28 md:px-10">
        <div className="mx-auto max-w-5xl">
          <Reveal className="max-w-xl">
            <Eyebrow className="text-silver/70">Country Matrix</Eyebrow>
            <h2 className="font-display mt-3 text-3xl text-warm">Delegate allocations</h2>
            <p className="mt-4 text-sm leading-relaxed text-silver/80">
              All committee assignments are published in one official spreadsheet.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <a href={allocationsSheet} target="_blank" rel="noopener noreferrer" className="group mt-10 block">
              <BorderGlow backgroundColor="#071a33" borderRadius={22} colors={["#c6a15b", "#e3c46a", "#f4efa8"]}>
                <div className="flex items-center justify-between gap-6 p-7 text-warm">
                  <div>
                    <p className="font-display text-2xl">TESMUN XIV Allocations</p>
                    <p className="mt-2 text-sm text-silver/70">Open the master country matrix</p>
                  </div>
                  <TableProperties size={20} className="text-gold transition-transform duration-500 group-hover:translate-x-0.5" />
                </div>
              </BorderGlow>
            </a>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
