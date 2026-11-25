"use client";
import { motion } from "framer-motion";

export const AdmissionsBanner = () => {
  return (
    <div className="relative min-h-[55vh] w-full overflow-hidden md:min-h-[60vh]">
      {/* Background image with zoom */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/api/images/resolve/IMG_E2801_tkldxd.jpg')",
        }}
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.4, ease: [0.33, 1, 0.68, 1] }}
      />

      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/50 to-slate-950/30" />

      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Floating ambient orbs */}
      <div className="pointer-events-none absolute top-1/4 left-[15%] h-40 w-40 rounded-full bg-emerald-400/15 blur-[80px]" />
      <div className="pointer-events-none absolute right-[10%] bottom-1/4 h-36 w-36 rounded-full bg-sky-400/15 blur-[80px]" />

      {/* Content */}
      <div className="relative z-10 flex h-full min-h-[55vh] flex-col items-center justify-center px-6 text-center md:min-h-[60vh]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-3xl space-y-5"
        >
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-block rounded-full border border-emerald-500/25 bg-emerald-500/15 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-emerald-400 uppercase backdrop-blur-sm"
          >
            Now Accepting Applications
          </motion.span>

          {/* Heading */}
          <h1 className="text-4xl leading-[1.1] font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-sky-300 bg-clip-text text-transparent">
              Admissions 2026-28
            </span>
          </h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mx-auto max-w-xl text-base leading-relaxed text-white/65 md:text-lg"
          >
            Begin your child&apos;s journey towards excellence in a nurturing
            environment that fosters creativity, leadership, and lifelong
            learning.
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom fade to page */}
      <div className="absolute right-0 bottom-0 left-0 h-20 bg-gradient-to-t from-slate-50 to-transparent dark:from-slate-950" />
    </div>
  );
};
