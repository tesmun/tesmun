import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const WORDS = ["ENGAGE", "EXPRESS", "EXCELL"];

export default function MottoRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % WORDS.length);
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className="relative flex min-h-[clamp(3.4rem,11vw,8.2rem)] w-full items-center justify-center overflow-hidden px-4"
      aria-live="polite"
      aria-label="Engage, Express, Excell"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={WORDS[index]}
          initial={{ opacity: 0, filter: "blur(8px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="font-display relative z-10 block text-center text-[clamp(2.2rem,9.5vw,6.4rem)] font-medium leading-none tracking-[0.08em] text-warm"
        >
          {WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
