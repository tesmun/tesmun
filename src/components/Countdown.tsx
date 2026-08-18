import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function getParts(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function FlipNumber({ value }: { value: number }) {
  const display = value.toString().padStart(2, "0");
  return (
    <span className="relative block h-[1.15em] w-[1.72em] overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.span
          key={display}
          initial={{ y: "85%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-85%", opacity: 0 }}
          transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center justify-center tabular-nums"
        >
          {display}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Countdown({ target }: { target: Date }) {
  const [parts, setParts] = useState(() => getParts(target));

  useEffect(() => {
    const tick = () => setParts(getParts(target));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const units: [string, number][] = [
    ["Days", parts.days],
    ["Hours", parts.hours],
    ["Minutes", parts.minutes],
    ["Seconds", parts.seconds],
  ];

  return (
    <div className="mx-auto grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
      {units.map(([label, value]) => (
        <div
          key={label}
          className="flex min-h-[7.2rem] flex-col items-center justify-center border border-white/10 bg-[#071a33] px-3 py-5 text-center transition-transform duration-500 hover:-translate-y-1 sm:min-h-[8.4rem]"
        >
          <span className="font-display text-[2.4rem] font-semibold leading-none text-warm sm:text-[2.8rem]">
            <FlipNumber value={value} />
          </span>
          <span className="mt-3 text-[10px] font-medium uppercase tracking-[0.22em] text-silver">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
