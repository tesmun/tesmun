import { useState } from "react";

export type AccordionGalleryItem = {
  image: string;
  label: string;
  link?: string;
};

export default function AccordionGallery({
  items,
  defaultIndex = 0,
  expandRatio = 0.52,
  trigger = "hover",
}: {
  items: AccordionGalleryItem[];
  defaultIndex?: number;
  expandRatio?: number;
  trigger?: "hover" | "click";
}) {
  const [active, setActive] = useState(defaultIndex);
  const collapsed = (1 - expandRatio) / Math.max(items.length - 1, 1);

  return (
    <div className="flex h-[62vw] max-h-[640px] min-h-[320px] w-full overflow-hidden" onMouseLeave={() => trigger === "hover" && setActive(defaultIndex)}>
      {items.map((item, index) => {
        const open = index === active;
        const inner = (
          <>
            <img src={item.image} alt={item.label} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071a33]/80 via-transparent to-transparent" />
            <span className="absolute bottom-5 left-5 font-display text-lg text-white sm:text-2xl">
              {item.label}
            </span>
          </>
        );
        const className = "relative overflow-hidden border-r border-white/10 last:border-0";
        const style = {
          flexGrow: open ? expandRatio * 100 : collapsed * 100,
          flexBasis: 0,
          transition: "flex-grow 480ms cubic-bezier(0.22, 1, 0.36, 1)",
        };

        if (item.link && item.link !== "#") {
          return (
            <a
              key={item.label}
              href={item.link}
              className={className}
              style={style}
              onMouseEnter={() => trigger === "hover" && setActive(index)}
              onClick={() => trigger === "click" && setActive(index)}
            >
              {inner}
            </a>
          );
        }

        return (
          <button
            key={item.label}
            type="button"
            className={className}
            style={style}
            onMouseEnter={() => trigger === "hover" && setActive(index)}
            onClick={() => setActive(index)}
          >
            {inner}
          </button>
        );
      })}
    </div>
  );
}
