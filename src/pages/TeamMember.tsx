import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Divider, Eyebrow } from "@/components/section-parts";
import { PersonPlaceholder } from "@/components/PersonCard";
import { getTeamMember } from "@/lib/data";

export default function TeamMember() {
  const { slug = "" } = useParams();
  const person = getTeamMember(slug);

  if (!person) {
    return (
      <main className="px-6 py-40 text-center">
        <h1 className="font-display text-4xl">Profile not found</h1>
        <Link to="/our-team" className="mt-6 inline-block text-sm uppercase tracking-[0.14em] text-blue">
          ← Our team
        </Link>
      </main>
    );
  }

  return (
    <main>
      <section className="relative overflow-hidden bg-navy-deep px-6 pb-20 pt-32 sm:pb-28 md:px-10 md:pt-40">
        <div className="mx-auto grid max-w-6xl items-end gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <Reveal>
            <Link
              to="/our-team"
              className="mb-10 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-silver transition-colors hover:text-warm"
            >
              <ArrowLeft size={15} />
              Our team
            </Link>
            <Eyebrow>{person.role}</Eyebrow>
            <h1 className="mt-5 max-w-3xl font-display text-5xl font-medium leading-[0.95] tracking-[0.03em] text-warm sm:text-7xl">
              {person.name}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative aspect-[3/4] max-w-sm overflow-hidden bg-navy lg:ml-auto">
              {person.image ? (
                <img src={person.image} alt={`${person.name}, ${person.role}`} className="photo-fill" />
              ) : (
                <PersonPlaceholder name={person.name} className="h-full w-full" />
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <Divider />

      <section className="bg-warm px-6 py-20 sm:py-28 md:px-10">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <Eyebrow>Testimonial</Eyebrow>
            <blockquote className="font-display mt-7 max-w-2xl text-2xl leading-relaxed text-ink sm:text-3xl">
              “{person.testimonial ?? "This testimonial will be published soon."}”
            </blockquote>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
