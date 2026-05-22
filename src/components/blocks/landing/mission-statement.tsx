"use client"

import { motion } from "framer-motion"

export const MissionStatement = () => {
  return (
    <motion.section
      className="py-20 relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4 relative z-10 max-w-5xl">
        <div className="bg-white/[0.02] rounded-3xl p-10 md:p-16 backdrop-blur-xl border border-white/10 shadow-[0_0_50px_rgba(16,185,129,0.08)]">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-8 bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-400 bg-clip-text text-transparent">
            Our Mission
          </h2>
          <motion.p
            className="text-xl md:text-2xl text-center max-w-3xl mx-auto text-slate-300 leading-relaxed font-light"
            initial={{ scale: 0.98, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            At M.S.NAZ High School, we are committed to providing a nurturing and challenging educational environment
            that empowers students to become lifelong learners, critical thinkers, and responsible global citizens.
          </motion.p>
        </div>
      </div>
    </motion.section>
  )
}

