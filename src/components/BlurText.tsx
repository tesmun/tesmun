import { motion } from "framer-motion";

type BlurTextProps = {
  text: string;
  delay?: number;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  onAnimationComplete?: () => void;
  className?: string;
};

export default function BlurText({
  text,
  delay = 150,
  animateBy = "words",
  direction = "top",
  onAnimationComplete,
  className = "",
}: BlurTextProps) {
  const units = animateBy === "letters" ? text.split("") : text.split(" ");
  const offset = direction === "top" ? -14 : 14;

  return (
    <motion.span
      initial={{ letterSpacing: "0.12em" }}
      animate={{ letterSpacing: "0.02em" }}
      transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      className={`inline-flex flex-wrap justify-center ${className}`}
    >
      {units.map((unit, i) => (
        <motion.span
          key={`${unit}-${i}`}
          initial={{ opacity: 0, y: offset, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.75,
            delay: (i * delay) / 1000,
            ease: [0.16, 1, 0.3, 1],
          }}
          onAnimationComplete={i === units.length - 1 ? onAnimationComplete : undefined}
          className="inline-block whitespace-pre"
        >
          {unit}
          {animateBy === "words" && i < units.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </motion.span>
  );
}
