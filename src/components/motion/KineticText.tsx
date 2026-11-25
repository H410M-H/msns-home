"use client";

import { motion, type Variants } from "framer-motion";

type KineticTextProps = {
  text: string;
  className?: string;
  /** Class applied to each word (e.g. gradient text). */
  wordClassName?: string;
  /**
   * "settle": words start visible and slightly displaced, then spring into
   *   place. Safe for above-the-fold headings (no hidden text before hydration).
   * "rise": words rise from behind a clip mask when scrolled into view.
   */
  mode?: "settle" | "rise";
  delay?: number;
};

const container = (delay: number): Variants => ({
  hidden: {},
  shown: { transition: { staggerChildren: 0.06, delayChildren: delay } },
});

const settleWord: Variants = {
  hidden: { y: "0.28em", rotateX: 28, opacity: 1 },
  shown: {
    y: 0,
    rotateX: 0,
    transition: { type: "spring", stiffness: 160, damping: 16 },
  },
};

const riseWord: Variants = {
  hidden: { y: "105%" },
  shown: { y: 0, transition: { type: "spring", stiffness: 130, damping: 18 } },
};

/**
 * Kinetic headline: animates word by word on a spring. The full text stays in
 * the DOM as one string for screen readers and search engines.
 */
export function KineticText({
  text,
  className,
  wordClassName,
  mode = "rise",
  delay = 0,
}: KineticTextProps) {
  const words = text.split(" ");
  const variant = mode === "settle" ? settleWord : riseWord;
  const inView = mode === "rise";

  return (
    <motion.span
      className={className}
      variants={container(delay)}
      initial="hidden"
      animate={inView ? undefined : "shown"}
      whileInView={inView ? "shown" : undefined}
      viewport={{ once: true }}
      style={{ perspective: 600 }}
    >
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden
          className={
            mode === "rise"
              ? "inline-block overflow-hidden pb-[0.12em] align-bottom"
              : "inline-block"
          }
        >
          <motion.span
            className={`inline-block will-change-transform ${wordClassName ?? ""}`}
            variants={variant}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
