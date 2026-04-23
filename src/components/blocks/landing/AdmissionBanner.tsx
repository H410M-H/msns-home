"use client"
import { motion } from "framer-motion"

export const AdmissionsBanner = () => {
  return (
    <div className="relative min-h-[55vh] md:min-h-[60vh] w-full overflow-hidden">
      {/* Background image with zoom */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/dvvbxrs55/image/upload/w_1920,q_auto,f_auto/v1741368302/IMG_E2801_tkldxd.jpg')",
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
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Floating ambient orbs */}
      <div className="absolute top-1/4 left-[15%] h-40 w-40 rounded-full bg-emerald-400/15 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[10%] h-36 w-36 rounded-full bg-sky-400/15 blur-[80px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex h-full min-h-[55vh] md:min-h-[60vh] flex-col items-center justify-center px-6 text-center">
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
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400 bg-emerald-500/15 border border-emerald-500/25 backdrop-blur-sm"
          >
            Now Accepting Applications
          </motion.span>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
            <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-sky-300 bg-clip-text text-transparent">
              Admissions 2025–26
            </span>
          </h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mx-auto max-w-xl text-base md:text-lg text-white/65 leading-relaxed"
          >
            Begin your child&apos;s journey towards excellence in a nurturing environment that fosters creativity, leadership, and lifelong learning.
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom fade to page */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 dark:from-slate-950 to-transparent" />
    </div>
  )
}