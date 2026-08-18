import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Divider, Eyebrow, PageHero } from "@/components/section-parts";
import { PersonCard } from "@/components/PersonCard";
import { coordinators, secretariat, seniorLeadership } from "@/lib/data";

export default function OurTeam() {
  return (
    <main>
      <PageHero image="/images/team-hero.png" alt="An empty auditorium stage with soft navy lighting" title="OUR TEAM" />

      <section className="bg-warm px-6 py-20 sm:py-28 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <Eyebrow>Senior Leadership</Eyebrow>
          </Reveal>
          <div className="mt-10 grid gap-10 sm:grid-cols-2">
            {seniorLeadership.map((p, i) => (
              <Reveal key={p.role} delay={i * 0.1}>
                <PersonCard person={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      <section className="bg-warm px-6 py-20 sm:py-28 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <Eyebrow>Coordinators</Eyebrow>
          </Reveal>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {coordinators.map((p, i) => (
              <Reveal key={p.role} delay={i * 0.06}>
                <PersonCard person={p} size="sm" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      <section className="bg-warm px-6 py-20 sm:py-28 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <Eyebrow>Secretariat</Eyebrow>
          </Reveal>
          <div className="mt-10 grid gap-10 sm:grid-cols-2">
            {[secretariat.sg, secretariat.dsg].map((p, i) => (
              <Reveal key={p.role} delay={i * 0.1}>
                <PersonCard person={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-deep px-6 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <Eyebrow className="text-silver/70">Facilitating Teams</Eyebrow>
            <h2 className="font-display mt-3 text-3xl text-warm sm:text-4xl">The desks behind the conference</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              { label: "IT", href: "/committees/it", logo: "/images/it.png" },
              { label: "Press", href: "/committees/press", logo: "/images/press.png" },
              { label: "Logistics", href: "/committees/logistics", logo: "/images/logistic.png" },
            ].map((t, i) => (
              <Reveal key={t.label} delay={i * 0.08}>
                <Link
                  to={t.href}
                  className="group flex flex-col items-center border border-white/15 px-6 py-12 text-center transition-all duration-500 hover:-translate-y-1 hover:border-gold/50"
                >
                  <span className="flex h-40 w-40 items-center justify-center overflow-hidden rounded-full bg-warm p-3 transition-transform duration-500 ease-out group-hover:scale-[1.05]">
                    <img src={t.logo} alt={`${t.label} team mark`} className="h-full w-full object-cover" />
                  </span>
                  <span className="font-display mt-6 text-3xl font-medium text-warm">{t.label}</span>
                  <ArrowUpRight size={18} className="mt-3 text-silver transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-warm" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
