import { Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { FacebookIcon, YoutubeIcon } from "@/components/social-icons";
import SpecularButton from "@/components/SpecularButton";
import { Eyebrow, PageHero } from "@/components/section-parts";
import { contactInfo } from "@/lib/data";

export default function Contact() {
  return (
    <main>
      <PageHero
        image="/images/contact-hero.png"
        alt="The Excelsior School campus approach"
        title="CONTACT"
        kicker="Get in touch"
      />

      <section className="bg-warm px-6 py-20 sm:py-28 md:px-10">
        <div className="mx-auto max-w-5xl">
          <Reveal className="mx-auto max-w-xl text-center">
            <p className="text-[15px] leading-relaxed text-ink/70">
              For questions about delegate registration, committee assignments or general conference
              inquiries, reach TESMUN XIV through any of the channels below.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            <Reveal>
              <div className="h-full border border-navy/10 p-7">
                <MapPin size={18} className="text-gold" />
                <p className="mt-5 text-[11px] uppercase tracking-[0.16em] text-blue">Visit</p>
                <p className="mt-2 text-sm leading-relaxed text-ink">{contactInfo.school}</p>
                <p className="text-sm leading-relaxed text-ink/70">{contactInfo.address}</p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <a href={`tel:${contactInfo.phone.replace(/[^0-9+]/g, "")}`} className="flex h-full flex-col border border-navy/10 p-7 transition-colors hover:border-gold">
                <Phone size={18} className="text-gold" />
                <p className="mt-5 text-[11px] uppercase tracking-[0.16em] text-blue">Call</p>
                <p className="mt-2 text-sm text-ink">{contactInfo.phone}</p>
              </a>
            </Reveal>
            <Reveal delay={0.16}>
              <a href={`mailto:${contactInfo.email}`} className="flex h-full flex-col border border-navy/10 p-7 transition-colors hover:border-gold">
                <Mail size={18} className="text-gold" />
                <p className="mt-5 text-[11px] uppercase tracking-[0.16em] text-blue">Email</p>
                <p className="mt-2 text-sm text-ink underline decoration-gold/60 underline-offset-4">{contactInfo.email}</p>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-warm px-6 py-16 md:px-10">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <Eyebrow>Find us</Eyebrow>
            <h2 className="font-display mt-3 text-3xl text-ink">The Excelsior School, Swoyambhu</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-8 overflow-hidden border border-navy/10">
              <iframe
                title="Map of The Excelsior School, Kathmandu"
                src={contactInfo.mapEmbed}
                className="h-[360px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-warm px-6 py-16 md:px-10">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <Eyebrow>Accessibility</Eyebrow>
            <h2 className="font-display mt-3 text-3xl text-ink">Help and access</h2>
            <p className="mt-5 text-[15px] leading-relaxed text-ink/70">
              If you need assistance accessing the conference site, documents, or the campus, write to{" "}
              <a href={`mailto:${contactInfo.email}`} className="underline decoration-gold underline-offset-4">
                {contactInfo.email}
              </a>{" "}
              or call{" "}
              <a href={`tel:${contactInfo.phone.replace(/[^0-9+]/g, "")}`} className="underline decoration-gold underline-offset-4">
                {contactInfo.phone}
              </a>
              . We will arrange support in advance of arrival.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <SpecularButton href={`mailto:${contactInfo.email}`}>Write to TESMUN</SpecularButton>
              {contactInfo.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`TESMUN on ${social.label}`}
                  className="flex h-11 w-11 items-center justify-center border border-navy/15 text-navy transition-colors hover:border-gold"
                >
                  {social.label === "YouTube" ? <YoutubeIcon size={18} /> : <FacebookIcon size={18} />}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <div className="rule-gold" />
    </main>
  );
}
