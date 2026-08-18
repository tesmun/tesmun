import { Link } from "react-router-dom";
import { LogoMark } from "@/components/LogoMark";
import Magnetic from "@/components/Magnetic";
import { FacebookIcon, YoutubeIcon } from "@/components/social-icons";
import { contactInfo, navLinks } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative bg-navy-deep text-silver">
      <div className="rule" />
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <Link to="/" aria-label="TESMUN home" className="flex items-center gap-3">
            <LogoMark size={36} />
            <div>
              <p className="font-display text-sm font-semibold tracking-[0.16em] text-warm">TESMUN XIV</p>
              <p className="mt-1 text-xs text-silver/70">The Excelsior School</p>
            </div>
          </Link>

          <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm sm:grid-cols-4">
            {navLinks
              .filter((l) => l.href !== "/")
              .map((link) => (
                <Link key={link.href} to={link.href} className="text-silver/75 transition-colors hover:text-warm">
                  {link.label}
                </Link>
              ))}
          </nav>

          <div className="flex items-center gap-4">
            <a href={`mailto:${contactInfo.email}`} className="hidden text-xs text-silver/75 transition-colors hover:text-warm lg:block">
              {contactInfo.email}
            </a>
            {contactInfo.socials.map((social) => (
              <Magnetic key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`TESMUN on ${social.label}`}
                className="inline-flex text-silver/75 transition-colors duration-300 hover:text-warm"
              >
                {social.label === "YouTube" ? <YoutubeIcon size={18} /> : <FacebookIcon size={18} />}
              </a>
              </Magnetic>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-1 border-t border-white/10 pt-5 text-xs text-silver/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© TESMUN XIV · The Excelsior School</p>
          <p>{contactInfo.address}</p>
        </div>
      </div>
    </footer>
  );
}
