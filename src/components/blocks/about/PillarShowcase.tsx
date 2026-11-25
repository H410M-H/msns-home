"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpenCheck, Cpu, Sun } from "lucide-react";
import { LazyCanvas } from "~/components/motion/LazyCanvas";
import { pillars, type PillarKey } from "~/content/about";
import { cn } from "~/lib/utils";

const About3DCanvas = dynamic(() => import("./About3DCanvas"), {
  ssr: false,
});

const ICONS: Record<PillarKey, typeof Sun> = {
  academic: BookOpenCheck,
  stem: Cpu,
  eco: Sun,
};

/** Interactive 3D centerpiece of the About hero, with a static fallback. */
export function PillarShowcase() {
  const [active, setActive] = useState<PillarKey>("academic");
  const current = pillars.find((p) => p.key === active) ?? pillars[0];

  return (
    <div className="relative">
      <LazyCanvas
        className="aspect-square w-full overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-900 shadow-[0_40px_80px_-30px_rgba(6,78,59,0.7)] sm:aspect-[5/4] lg:aspect-square"
        fallback={
          <div className="relative h-full w-full">
            <Image
              src="/api/images/resolve/FrontView1_alaabu.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent" />
          </div>
        }
        render={(visible) => <About3DCanvas pillar={active} active={visible} />}
      />

      <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/10 bg-emerald-950/75 p-3 backdrop-blur-md sm:inset-x-4 sm:bottom-4 sm:p-4">
        <div
          role="group"
          aria-label="Explore our pillars"
          className="grid grid-cols-3 gap-1.5"
        >
          {pillars.map((p) => {
            const Icon = ICONS[p.key];
            const selected = p.key === active;
            return (
              <button
                key={p.key}
                type="button"
                aria-pressed={selected}
                onClick={() => setActive(p.key)}
                className={cn(
                  "relative flex min-h-11 items-center justify-center gap-1.5 rounded-xl px-2 py-2 text-xs font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:outline-none sm:text-sm",
                  selected
                    ? "text-emerald-950"
                    : "text-emerald-50/80 hover:text-white",
                )}
              >
                {selected && (
                  <motion.span
                    layoutId="pillar-pill"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-200 to-emerald-200"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon aria-hidden className="relative h-4 w-4 shrink-0" />
                <span className="relative">{p.label}</span>
              </button>
            );
          })}
        </div>
        <div className="relative mt-2 min-h-10" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={current.key}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="text-center text-xs leading-snug text-emerald-50/85 sm:text-sm"
            >
              {current.caption}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
