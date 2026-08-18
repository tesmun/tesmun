import { Reveal } from "@/components/Reveal";
import { CommitteeCard } from "@/components/CommitteeCard";
import Grainient from "@/components/Grainient";
import { PageHero, Eyebrow } from "@/components/section-parts";
import { committeesByCategory } from "@/lib/data";

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

export default function Committees() {
  return (
    <main>
      <PageHero
        image="/images/committeesbackground.png"
        alt="A montage of school and United Nations landmarks"
        title="COMMITTEES"
        subtitle="Explore the forums where diplomacy, debate and decision-making meet."
      />

      <section className="bg-[#123b63] px-6 py-20 sm:py-28 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="rule mb-8 max-w-7xl" />
            <Eyebrow className="text-silver/80">National</Eyebrow>
            <h2 className="font-display mt-3 text-3xl font-medium text-white sm:text-4xl">Legislative Parliaments</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {committeesByCategory.national.map((c, i) => (
              <Reveal key={c.slug} delay={i * 0.08}>
                <CommitteeCard committee={c} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#16456f] px-6 py-20 sm:py-28 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="rule mb-8 max-w-7xl" />
            <Eyebrow className="text-silver/80">International</Eyebrow>
            <h2 className="font-display mt-3 text-3xl font-medium text-white sm:text-4xl">Global Councils &amp; Committees</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {committeesByCategory.international.map((c, i) => (
              <Reveal key={c.slug} delay={i * 0.06}>
                <CommitteeCard committee={c} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0d2a4a] px-6 py-20 pb-28 sm:pb-36 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <Eyebrow className="text-silver/70">Facilitating</Eyebrow>
            <h2 className="font-display mt-3 text-3xl font-medium text-white sm:text-4xl">Behind the Conference</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {committeesByCategory.facilitating.map((c, i) => (
              <Reveal key={c.slug} delay={i * 0.08}>
                <CommitteeCard committee={c} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
