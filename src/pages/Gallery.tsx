import { useState } from "react";
import { X } from "lucide-react";
import AccordionGallery from "@/components/AccordionGallery";
import BorderGlow from "@/components/BorderGlow";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, PageHero } from "@/components/section-parts";
import { galleryImages } from "@/lib/data";

const accordionItems = [
  { image: "https://picsum.photos/id/1015/900/1200", label: "Canyon", link: "#" },
  { image: "https://picsum.photos/id/1018/900/1200", label: "Ridgeline", link: "#" },
  { image: "https://picsum.photos/id/1039/900/1200", label: "Falls", link: "#" },
  { image: "https://picsum.photos/id/1043/900/1200", label: "Harbour", link: "#" },
  { image: "https://picsum.photos/id/1044/900/1200", label: "Skyline", link: "#" },
];

const ceremonyVideos = [
  {
    title: "Opening Ceremony",
    dek: "The first gavel of TESMUN XIV. The YouTube URL will embed automatically when published.",
    youtubeUrl: "",
  },
  {
    title: "Closing Ceremony",
    dek: "The final sitting, recorded for the conference archive. The YouTube URL will embed automatically when published.",
    youtubeUrl: "",
  },
];

export default function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <main>
      <PageHero
        image="/images/cover.png"
        alt="The Excelsior School campus at night"
        title="GALLERY"
        subtitle="A visual record of TESMUN — campus, chamber and city."
      />

      <section className="bg-warm px-6 py-16 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <Eyebrow>Selected frames</Eyebrow>
            <h2 className="font-display mt-3 text-3xl text-ink">Accordion</h2>
          </Reveal>
          <div className="mt-8">
            <AccordionGallery items={accordionItems} defaultIndex={2} expandRatio={0.52} trigger="hover" />
          </div>
        </div>
      </section>

      <section className="bg-warm px-6 pb-16 md:px-10">
        <div className="mx-auto columns-1 gap-4 sm:columns-2 lg:columns-3">
          {galleryImages.map((image, index) => (
            <Reveal key={image.src} delay={(index % 6) * 0.04} className="mb-4 break-inside-avoid">
              <button type="button" onClick={() => setActive(index)} className="group relative block w-full overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <span className="absolute inset-x-0 bottom-0 bg-navy-deep/70 px-4 py-3 text-left text-xs uppercase tracking-[0.16em] text-warm opacity-0 transition-opacity group-hover:opacity-100">
                  {image.caption}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-navy-deep px-6 py-20 pb-28 md:px-10">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Eyebrow className="text-silver/70">Ceremonies</Eyebrow>
            <h2 className="font-display mt-3 text-3xl font-medium text-warm sm:text-4xl">Opening and Closing</h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-silver/75">
              Official recordings will appear here. Each placeholder accepts a YouTube URL and embeds the video automatically.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {ceremonyVideos.map((video, index) => (
              <Reveal key={video.title} delay={index * 0.08}>
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
                >
                  <article className="p-5 sm:p-6">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-gold">TESMUN XIV</p>
                    <h3 className="font-display mt-2 text-2xl text-warm">{video.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-silver/75">{video.dek}</p>
                    <div className="mt-5">
                      <YouTubeEmbed url={video.youtubeUrl} title={video.title} />
                    </div>
                  </article>
                </BorderGlow>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {active !== null && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-navy-deep/92 p-6" onClick={() => setActive(null)}>
          <button type="button" aria-label="Close photograph" className="absolute right-6 top-6 text-warm">
            <X size={28} />
          </button>
          <figure className="max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img src={galleryImages[active].src} alt={galleryImages[active].alt} className="max-h-[82vh] w-full object-contain" />
            <figcaption className="mt-4 text-center text-sm text-silver">{galleryImages[active].alt}</figcaption>
          </figure>
        </div>
      )}
    </main>
  );
}
