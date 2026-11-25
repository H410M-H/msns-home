"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import type { Milestone } from "~/content/about";

/**
 * Vertical timeline whose spine "draws" itself as the visitor scrolls.
 */
export function StoryTimeline({ milestones }: { milestones: Milestone[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 60%"],
  });
  const draw = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <ol ref={ref} className="relative space-y-10 pl-10 sm:pl-12">
      {/* Track + animated progress line */}
      <span
        aria-hidden
        className="absolute top-2 bottom-2 left-[11px] w-[3px] rounded-full bg-emerald-100 sm:left-[15px]"
      />
      <motion.span
        aria-hidden
        style={{ scaleY: draw }}
        className="absolute top-2 bottom-2 left-[11px] w-[3px] origin-top rounded-full bg-gradient-to-b from-emerald-500 via-teal-500 to-amber-400 sm:left-[15px]"
      />

      {milestones.map((m, i) => (
        <motion.li
          key={m.year}
          className="relative"
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 18,
            delay: i * 0.05,
          }}
        >
          <span
            aria-hidden
            className="absolute top-1 -left-10 flex h-[25px] w-[25px] items-center justify-center rounded-full border-4 border-white bg-emerald-500 shadow-md ring-1 ring-emerald-200 sm:-left-12 sm:h-[33px] sm:w-[33px]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white sm:h-2 sm:w-2" />
          </span>
          <p className="font-mono text-sm font-semibold tracking-widest text-emerald-700">
            {m.year}
          </p>
          <h3 className="mt-1 font-serif text-xl font-semibold text-emerald-950 sm:text-2xl">
            {m.title}
          </h3>
          <p className="mt-2 max-w-xl leading-relaxed text-slate-600">
            {m.body}
          </p>
        </motion.li>
      ))}
    </ol>
  );
}
