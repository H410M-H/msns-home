"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Gem, Lightbulb, ShieldCheck, Plus, X } from "lucide-react";
import { useState } from "react";
import { values } from "~/content/about";
import { cn } from "~/lib/utils";

const ICONS = [Gem, ShieldCheck, Lightbulb];
const ACCENTS = [
  "from-emerald-500 to-teal-400",
  "from-teal-500 to-sky-400",
  "from-amber-400 to-emerald-400",
];

/**
 * Core values as cards that morph (shared layout animation) into an
 * expanded panel. Fully keyboard operable; content is always in the DOM.
 */
export function ValuesMorph() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <LayoutGroup>
      <ul className="grid gap-5 md:grid-cols-3">
        {values.map((v, i) => {
          const Icon = ICONS[i] ?? Gem;
          const expanded = open === i;
          return (
            <motion.li
              key={v.title}
              layout
              className={cn(
                "relative overflow-hidden rounded-3xl border bg-white/90 shadow-[0_20px_50px_-25px_rgba(6,78,59,0.35)] backdrop-blur",
                expanded
                  ? "border-emerald-300 md:col-span-3"
                  : "border-emerald-100",
              )}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
            >
              <motion.div
                layout="position"
                className={cn(
                  "h-1.5 w-full bg-gradient-to-r",
                  ACCENTS[i] ?? ACCENTS[0],
                )}
              />
              <div
                className={cn(
                  "p-6 sm:p-8",
                  expanded && "md:flex md:items-start md:gap-10",
                )}
              >
                <motion.div layout="position" className="md:min-w-0 md:flex-1">
                  <span
                    className={cn(
                      "mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg",
                      ACCENTS[i] ?? ACCENTS[0],
                    )}
                  >
                    <Icon aria-hidden className="h-6 w-6" />
                  </span>
                  <h3 className="font-serif text-2xl font-semibold text-emerald-950">
                    {v.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-slate-600">
                    {v.summary}
                  </p>
                </motion.div>

                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.p
                      id={`value-detail-${i}`}
                      key="detail"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.25 }}
                      className="mt-5 rounded-2xl bg-emerald-50/80 p-5 text-base leading-relaxed text-emerald-900 md:mt-0 md:flex-1 md:text-lg"
                    >
                      {v.detail}
                    </motion.p>
                  )}
                </AnimatePresence>

                <motion.div layout="position" className="mt-6 md:mt-0">
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={expanded ? `value-detail-${i}` : undefined}
                    onClick={() => setOpen(expanded ? null : i)}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-800 transition-colors hover:bg-emerald-50 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
                  >
                    {expanded ? (
                      <X aria-hidden className="h-4 w-4" />
                    ) : (
                      <Plus aria-hidden className="h-4 w-4" />
                    )}
                    {expanded
                      ? "Close"
                      : `What ${v.title.toLowerCase()} means here`}
                  </button>
                </motion.div>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </LayoutGroup>
  );
}
