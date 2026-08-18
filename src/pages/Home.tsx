import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import BlurText from "@/components/BlurText";
import Countdown from "@/components/Countdown";
import GradualBlur from "@/components/GradualBlur";
import MottoRotator from "@/components/MottoRotator";
import { Reveal } from "@/components/Reveal";
import SpecularButton from "@/components/SpecularButton";
import { Divider, EditorialLink, Eyebrow } from "@/components/section-parts";
import { conferenceDate } from "@/lib/data";

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const letterRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "7%"]);
  const { scrollYProgress: letterProgress } = useScroll({ target: letterRef, offset: ["start end", "end start"] });
  const portraitY = useTransform(letterProgress, [0, 1], [24, -24]);

  return (
    <main>
      <section ref={heroRef} className="group/img relative flex h-[100svh] min-h-[640px] w-full items-center justify-center overflow-hidden bg-navy-deep">
        <motion.img
          src="/images/cover.png"
          alt="The Excelsior School campus at night, illuminated for TESMUN"
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ scale: 1.03 }}
          animate={{ scale: 1 }}
          transition={{ duration: 16, ease: "easeOut" }}
          style={{ y: imageY }}
        />
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "linear-gradient(180deg, rgba(7,26,51,0.50) 0%, rgba(7,26,51,0.20) 42%, rgba(7,26,51,0.80) 100%)",
              "linear-gradient(185deg, rgba(7,26,51,0.38) 0%, rgba(18,59,99,0.16) 46%, rgba(7,26,51,0.86) 100%)",
              "linear-gradient(180deg, rgba(7,26,51,0.50) 0%, rgba(7,26,51,0.20) 42%, rgba(7,26,51,0.80) 100%)",
            ],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative z-10 flex flex-col items-center px-6 text-center">
          <Reveal>
            <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.3em] text-silver sm:text-xs">
              The Excelsior School Model United Nations
            </p>
          </Reveal>
          <h1 className="text-[12vw] leading-[0.92] text-warm sm:text-[8vw] lg:text-[6.2vw]">
            <BlurText text="TESMUN" delay={150} animateBy="words" direction="top" className="font-display font-extrabold" />
            <BlurText text="XIV" delay={150} animateBy="words" direction="top" className="ml-[0.12em] font-serif font-medium tracking-[0.04em]" />
          </h1>
          <Reveal delay={0.35}>
            <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.26em] text-silver sm:text-sm">
              Kathmandu, Nepal
            </p>
          </Reveal>
        </div>
        <GradualBlur target="parent" position="bottom" height="7rem" strength={2} divCount={5} curve="bezier" exponential opacity={1} />
      </section>

      <section className="bg-navy-deep px-6 py-20 sm:py-24">
        <Reveal className="mx-auto max-w-4xl text-center">
          <Eyebrow className="text-silver/70">Convening In</Eyebrow>
          <div className="mt-8">
            <Countdown target={conferenceDate} />
          </div>
        </Reveal>
      </section>

      <section className="relative flex min-h-[42vh] items-center justify-center overflow-hidden px-6 py-20">
        <img src="/images/mottobg.png" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-navy-deep/62" />
        <div className="relative z-10 w-full">
          <MottoRotator />
        </div>
      </section>

      <section ref={letterRef} className="bg-warm px-6 py-24 sm:py-32 md:px-10">
        <div className="mx-auto grid max-w-7xl items-center gap-14 md:grid-cols-2 md:gap-20">
          <Reveal>
            <Eyebrow>A Letter From the Secretary-General</Eyebrow>
            <h2 className="font-display mt-4 text-3xl font-medium leading-tight text-ink sm:text-4xl">
              To the delegates of TESMUN XIV
            </h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-ink/75 sm:text-base">
              <p>
                It is my privilege to welcome you to the fourteenth session of the Excelsior School
                Model United Nations. TESMUN has always been, at its heart, a space where young
                people learn the discipline of listening, the courage of speaking, and the patience
                of negotiation.
              </p>
              <p>
                This year, we ask every delegate to arrive not merely to debate, but to genuinely
                engage with perspectives unlike their own. Diplomacy is not the absence of
                disagreement — it is the practice of disagreeing with dignity.
              </p>
              <p>I look forward to welcoming you to Kathmandu, and to the conversations that will shape TESMUN XIV.</p>
            </div>
            <div className="mt-8">
              <p className="font-script text-4xl text-navy">Dibas Khadka</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-blue">Secretary General</p>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <motion.div style={{ y: portraitY }} className="group/img relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden md:ml-auto">
              <img
                src="/images/secgen.png"
                alt="Portrait of Dibas Khadka, Secretary-General of TESMUN XIV"
                className="photo-fill scale-on-hover"
              />
            </motion.div>
          </Reveal>
        </div>
      </section>

      <Divider />

      <section className="bg-warm px-6 py-24 sm:py-32 md:px-10">
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2 md:gap-20">
          <Reveal className="order-2 md:order-1">
            <div className="group/img relative aspect-[4/5] w-full overflow-hidden">
              <img src="/images/about-preview.png" alt="An open notebook and fountain pen on a conference table" className="photo-fill scale-on-hover" />
            </div>
          </Reveal>
          <Reveal delay={0.12} className="order-1 md:order-2">
            <Eyebrow>Discover</Eyebrow>
            <h2 className="font-display mt-4 text-3xl font-medium leading-tight text-ink sm:text-4xl">About the Conference</h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink/75">
              TESMUN XIV brings together delegates for simulated diplomacy, legislative debate and
              international negotiation — built to sharpen the skills that define tomorrow's leaders.
            </p>
            <div className="mt-8">
              <EditorialLink href="/about">Discover TESMUN</EditorialLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-navy-deep px-6 py-24 sm:py-32 md:px-10">
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2 md:gap-20">
          <Reveal>
            <Eyebrow className="text-silver/70">Forums of Diplomacy</Eyebrow>
            <h2 className="font-display mt-4 text-3xl font-medium leading-tight text-warm sm:text-4xl">Committees</h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-silver/85">
              From National Legislative Parliaments to International Councils and Facilitating
              Committees, TESMUN XIV convenes eleven distinct forums for debate, negotiation and resolution.
            </p>
            <div className="mt-8">
              <SpecularButton href="/committees" size="lg" radius={18}>
                View Committees
              </SpecularButton>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="group/img relative aspect-[4/5] w-full overflow-hidden">
              <img src="/images/committees-preview.png" alt="A gavel resting beside folded country nameplates" className="photo-fill scale-on-hover" />
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
