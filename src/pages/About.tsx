import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import GradualBlur from "@/components/GradualBlur";
import { Reveal, TextReveal } from "@/components/Reveal";
import { Divider, Eyebrow } from "@/components/section-parts";

export default function About() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);

  return (
    <main>
      <section ref={heroRef} className="group/img relative flex h-[80vh] min-h-[520px] w-full items-center justify-center overflow-hidden bg-navy-deep">
        <motion.img
          src="/images/aboutbackground.png"
          alt="A blue-lit United Nations exhibition hall"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ y }}
        />
        <div className="navy-hero-overlay absolute inset-0" />
        <div className="relative z-10 flex flex-col items-center px-6 text-center">
          <Reveal>
            <h1 className="font-display text-[11vw] font-semibold leading-[0.95] text-warm sm:text-[7vw] lg:text-[5.2vw]">
              ABOUT TESMUN XIV
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-sm uppercase tracking-[0.32em] text-silver">Engage · Express · Excell</p>
          </Reveal>
        </div>
        <GradualBlur target="parent" position="bottom" height="6rem" strength={2} divCount={5} curve="bezier" exponential />
      </section>

      <section className="bg-warm px-6 py-24 sm:py-32 md:px-10">
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2 md:gap-20">
          <Reveal>
            <div className="group/img relative aspect-[4/5] w-full overflow-hidden">
              <img src="/images/about-purpose.png" alt="A delegate's hand resting on a wooden podium" className="photo-fill scale-on-hover" />
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="rule mb-6 max-w-[8rem]" />
            <Eyebrow>What We Strive For</Eyebrow>
            <h2 className="font-display mt-4 text-3xl font-medium leading-tight text-ink sm:text-5xl">A school for the work of the world</h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink/75 sm:text-base">
              The main objective of TESMUN is to equip students with fundamental 21st-century skills
              to become knowledgeable and innovative active citizens. Our platform provides students
              with an energetic learning space that enables them to overcome public speaking anxiety
              while learning essential negotiation skills and fundamental principles of human
              interaction. The real-world diplomatic and political situation simulations at TESMUN
              enable participants to develop skills that will lead them towards success as students
              and activists, and visionary leaders who will create meaningful changes in their nation
              and worldwide.
            </p>
          </Reveal>
        </div>
      </section>

      <Divider />

      <section className="bg-warm px-6 py-24 sm:py-32 md:px-10">
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2 md:gap-20">
          <Reveal className="order-2 md:order-1">
            <div className="rule mb-6 max-w-[8rem]" />
            <Eyebrow>Vision and Mission</Eyebrow>
            <h2 className="font-display mt-4 text-3xl font-medium leading-tight text-ink sm:text-5xl">Citizens of a larger room</h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink/75 sm:text-base">
              Our objective is to develop students who become knowledgeable and imaginative,
              responsible citizens for national and global communities. Through the TESMUN
              platform, we create an interactive learning space that enables students to defeat
              public speaking anxiety while building powerful negotiation abilities and developing
              fundamental communication skills. Through our simulations of authentic diplomatic and
              political situations, we prepare students to succeed in their future roles as scholars
              and activists, and visionary leaders.
            </p>
          </Reveal>
          <Reveal delay={0.12} className="order-1 md:order-2">
            <div className="group/img relative aspect-[4/5] w-full overflow-hidden">
              <img src="/images/about-vision.png" alt="An empty conference table lined with chairs and flags" className="photo-fill scale-on-hover" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative flex min-h-[70vh] w-full items-center justify-center overflow-hidden bg-navy-deep px-6 py-28">
        <img src="/images/about-closing.png" alt="A grand assembly hall ceiling at blue hour" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-navy-deep/70" />
        <div className="relative z-10 max-w-3xl text-center">
          <TextReveal
            text="A platform for dialogue, diplomacy and leadership."
            className="font-display text-3xl font-medium leading-tight text-warm sm:text-5xl"
          />
        </div>
      </section>
    </main>
  );
}
