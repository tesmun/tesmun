import { Link, useParams } from "react-router-dom";
import { FileText, TableProperties } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Divider, Eyebrow } from "@/components/section-parts";
import { PersonPlaceholder } from "@/components/PersonCard";
import { LogoMark } from "@/components/LogoMark";
import SpecularButton from "@/components/SpecularButton";
import { allocationsSheet, getCommittee, type Committee, type Person } from "@/lib/data";

function BoardRow({
  person,
  reverse,
}: {
  person: Person;
  reverse?: boolean;
}) {
  return (
    <section className="px-6 py-16 md:px-10">
      <div className={`mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2 md:gap-16 ${reverse ? "" : ""}`}>
        <Reveal className={reverse ? "order-2 md:order-1" : ""}>
          {person.image ? (
            <img src={person.image} alt={`${person.name}, ${person.role}`} className="aspect-[4/5] w-full max-w-md object-cover" />
          ) : (
            <PersonPlaceholder name={person.name} className="aspect-[4/5] w-full max-w-md" />
          )}
        </Reveal>
        <Reveal delay={0.08} className={reverse ? "order-1 md:order-2" : ""}>
          <Eyebrow className="text-silver/80">{person.role}</Eyebrow>
          <h2 className="font-display mt-3 text-3xl text-white sm:text-4xl">
            {person.placeholder ? "To Be Announced" : person.name}
          </h2>
          <div className="rule mt-6 max-w-[7rem]" />
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/80">
            {person.placeholder
              ? "This appointment will be published when the Secretariat confirms the dais."
              : `${person.name} serves as ${person.role} for this committee, guiding procedure, debate and the drafting of resolutions across the conference.`}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function CommitteeHero({ committee }: { committee: Committee }) {
  return (
    <section className="relative flex h-[65vh] min-h-[440px] w-full items-center justify-center overflow-hidden bg-navy-deep">
      <img src="/images/committees-hero.png" alt={`${committee.name} committee hall`} className="absolute inset-0 h-full w-full object-cover opacity-45" />
      <div className="navy-hero-overlay absolute inset-0" />
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <Reveal>
          {committee.logo ? (
            <span className="mx-auto mb-6 flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-warm p-3 shadow-lg">
              <img src={committee.logo} alt={`${committee.abbr} emblem`} className="h-full w-full object-contain" />
            </span>
          ) : (
            <LogoMark size={72} className="mx-auto mb-6" />
          )}
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="font-display text-4xl tracking-[0.04em] text-warm sm:text-6xl">{committee.name}</h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-4 text-xs uppercase tracking-[0.28em] text-silver">{committee.abbr}</p>
        </Reveal>
      </div>
    </section>
  );
}

function CommitteeDescription({ committee }: { committee: Committee }) {
  const isFacilitating = committee.category === "facilitating";
  return (
    <section className="bg-navy-deep px-6 py-16 md:px-10">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
        <p className="text-[15px] leading-relaxed text-white/80">{committee.description}</p>
        {!isFacilitating && (
          <div className="flex flex-wrap items-center justify-center gap-3">
            {committee.guideUrl ? (
              <SpecularButton href={committee.guideUrl} size="md">
                <span className="inline-flex items-center gap-2">
                  <FileText size={14} /> Background Guide
                </span>
              </SpecularButton>
            ) : (
              <span className="border border-white/20 px-5 py-3 text-[11px] uppercase tracking-[0.14em] text-silver">
                Background Guide forthcoming
              </span>
            )}
            <a
              href={allocationsSheet}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/25 px-5 py-3 text-[11px] uppercase tracking-[0.14em] text-white transition-colors hover:border-gold"
            >
              <TableProperties size={14} /> Country Matrix
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

function ITDetail({ committee }: { committee: Committee }) {
  return (
    <main className="bg-navy-deep text-white">
      <CommitteeHero committee={committee} />
      <CommitteeDescription committee={committee} />

      <section className="px-6 py-16 md:px-10">
        <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2 md:gap-16">
          <Reveal>
            <Eyebrow className="text-silver/80">Head of IT</Eyebrow>
            <h2 className="font-display mt-3 text-4xl text-white sm:text-5xl">Yubin KC</h2>
            <div className="rule mt-6 max-w-[7rem]" />
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/80">
              Leading the IT desk for TESMUN XIV, Yubin KC oversees the conference website, on-site systems and the digital infrastructure that keeps every committee connected.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <PersonPlaceholder name="Yubin KC" className="aspect-[4/5] w-full max-w-md" />
          </Reveal>
        </div>
      </section>
      <Divider />

      <section className="px-6 py-16 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 md:gap-16">
          {[
            { name: "Suyog Acharya", role: "Deputy Head of IT", text: "Working alongside the Head of IT, Suyog ensures the conference platform remains stable, responsive and accessible to every delegate and visitor." },
            { name: "Saksham Adhikari", role: "Deputy Head of IT", text: "Saksham supports the technical workflow behind the website and digital media, helping translate creative ideas into reliable conference experiences." },
          ].map((person) => (
            <div key={person.name} className="flex flex-col">
              <Reveal>
                <PersonPlaceholder name={person.name} className="mb-4 aspect-[4/5] w-full" />
                <p className="text-[11px] uppercase tracking-[0.16em] text-silver">{person.role}</p>
                <h3 className="font-display mt-1 text-2xl text-white">{person.name}</h3>
                <p className="mt-3 max-w-sm text-sm leading-7 text-white/70">{person.text}</p>
              </Reveal>
              <hr className="rule mt-10" />
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-16 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <Eyebrow className="text-silver/80">Specialist Leads</Eyebrow>
            <h2 className="font-display mt-3 text-3xl text-white sm:text-4xl">Web, Video &amp; Graphics</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              { name: "John Doe", role: "Website Designing Lead", image: "/images/gallery-library.jpg" },
              { name: "John Doe", role: "Video Editing Lead", image: "/images/gallery-debate.jpg" },
              { name: "John Doe", role: "Graphics Designing Lead", image: "/images/cartoon-1.png" },
            ].map((lead) => (
              <div key={lead.role} className="flex flex-col">
                <Reveal>
                  <div className="relative aspect-[4/5] overflow-hidden bg-navy">
                    <img src={lead.image} alt={lead.role} className="photo-fill" />
                  </div>
                  <p className="mt-4 text-[11px] uppercase tracking-[0.16em] text-silver">{lead.role}</p>
                  <p className="font-display mt-1 text-xl text-white">{lead.name}</p>
                </Reveal>
                <hr className="rule mt-8" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-navy-deep pb-10 text-center">
        <Link to="/committees" className="text-xs uppercase tracking-[0.14em] text-silver hover:text-white">
          ← Back to Committees
        </Link>
      </div>
    </main>
  );
}

function PressDetail({ committee }: { committee: Committee }) {
  const editors = [
    { name: "Dechen Hira Tamang", role: "Chief Editor", reverse: false, text: "As Chief Editor, Dechen Hira Tamang leads the Press Committee in covering every committee session, interview and behind-the-scenes moment of TESMUN XIV." },
    { name: "Siddhartha Basnet", role: "Deputy Chief Editor", reverse: true, text: "Siddhartha supports editorial planning and works with reporters to ensure each publication reflects the depth and diversity of the conference." },
    { name: "Simran Devkota", role: "Deputy Chief Editor", reverse: false, text: "Simran coordinates press coverage across sessions, helping writers and photographers capture the urgency and nuance of every debate." },
    { name: "John Doe", role: "Deputy Chief Editor", reverse: true, text: "This deputy editor position will be announced when the Press Desk finalises its roster." },
  ];

  return (
    <main className="bg-navy-deep text-white">
      <CommitteeHero committee={committee} />
      <CommitteeDescription committee={committee} />

      <section className="px-6 py-16 md:px-10">
        <div className="mx-auto max-w-7xl space-y-16">
          {editors.map((editor, index) => (
            <div key={`${editor.role}-${editor.name}`}>
              <article className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
                <div className={`relative aspect-[4/5] overflow-hidden bg-navy ${editor.reverse ? "md:order-2" : ""}`}>
                  <PersonPlaceholder name={editor.name} className="h-full w-full" />
                </div>
                <div className={editor.reverse ? "md:order-1" : ""}>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-silver">{editor.role}</p>
                  <h2 className="font-display mt-2 text-3xl text-white sm:text-4xl">{editor.name}</h2>
                  <div className="rule mt-5 max-w-[7rem]" />
                  <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/80">{editor.text}</p>
                </div>
              </article>
              {index < editors.length - 1 && <Divider className="mt-16" />}
            </div>
          ))}
        </div>
      </section>

      <div className="bg-navy-deep pb-10 text-center">
        <Link to="/committees" className="text-xs uppercase tracking-[0.14em] text-silver hover:text-white">
          ← Back to Committees
        </Link>
      </div>
    </main>
  );
}

function LogisticsDetail({ committee }: { committee: Committee }) {
  const { headOf, coHeadOf } = committee.board;

  return (
    <main className="bg-navy-deep text-white">
      <CommitteeHero committee={committee} />
      <CommitteeDescription committee={committee} />

      <section className="px-6 py-16 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 md:gap-16">
          {[headOf, coHeadOf].filter(Boolean).map((person, i) => (
            <div key={person!.name} className="flex flex-col">
              <Reveal delay={i * 0.08}>
                <PersonPlaceholder name={person!.name} className="mb-4 aspect-[4/5] w-full" />
                <p className="text-[11px] uppercase tracking-[0.16em] text-silver">{person!.role}</p>
                <h3 className="font-display mt-1 text-2xl text-white">{person!.name}</h3>
                <p className="mt-3 max-w-sm text-sm leading-7 text-white/70">
                  {person!.name} coordinates the operational execution of TESMUN XIV, ensuring every session, transition and venue detail runs precisely as planned.
                </p>
              </Reveal>
              <hr className="rule mt-10" />
            </div>
          ))}
        </div>
      </section>

      <div className="bg-navy-deep pb-10 text-center">
        <Link to="/committees" className="text-xs uppercase tracking-[0.14em] text-silver hover:text-white">
          ← Back to Committees
        </Link>
      </div>
    </main>
  );
}

export default function CommitteeDetail() {
  const { slug = "" } = useParams();
  const committee = getCommittee(slug);

  if (!committee) {
    return (
      <main className="bg-navy-deep px-6 py-40 text-center">
        <h1 className="font-display text-4xl text-white">Committee not found</h1>
        <Link to="/committees" className="mt-6 inline-block text-sm uppercase tracking-[0.14em] text-silver">
          ← Back to Committees
        </Link>
      </main>
    );
  }

  if (slug === "it") return <ITDetail committee={committee} />;
  if (slug === "press") return <PressDetail committee={committee} />;
  if (slug === "logistics") return <LogisticsDetail committee={committee} />;

  const { chair, viceChair, moderator, headOf, deputyHeadOf } = committee.board;

  return (
    <main className="bg-navy-deep text-white">
      <CommitteeHero committee={committee} />
      <CommitteeDescription committee={committee} />

      <Divider />

      {chair && <BoardRow person={chair} />}
      {viceChair && (
        <>
          <Divider />
          <BoardRow person={viceChair} reverse />
        </>
      )}
      {moderator && (
        <>
          <Divider />
          <BoardRow person={moderator} />
        </>
      )}

      {headOf && (
        <>
          <Divider />
          <BoardRow person={headOf} />
          {deputyHeadOf && deputyHeadOf.length > 0 && (
            <section className="px-6 pb-16 md:px-10">
              <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2">
                {deputyHeadOf.map((d, i) => (
                  <Reveal key={`${d.role}-${i}`}>
                    <PersonPlaceholder name={d.name} className="mb-4 aspect-[5/4] w-full" />
                    <p className="font-display text-xl text-white">{d.placeholder ? "To Be Announced" : d.name}</p>
                    <p className="text-[11px] uppercase tracking-[0.14em] text-silver">{d.role}</p>
                  </Reveal>
                ))}
              </div>
            </section>
          )}
        </>
      )}

      <div className="bg-navy-deep pb-10 text-center">
        <Link to="/committees" className="text-xs uppercase tracking-[0.14em] text-silver hover:text-white">
          ← Back to Committees
        </Link>
      </div>
    </main>
  );
}
