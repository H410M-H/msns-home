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
        <div className="bg-gradient-to-br from-emerald-50/60 to-teal-50/30 rounded-3xl p-10 md:p-16 border border-emerald-100/50 shadow-[0_15px_40px_rgba(16,185,129,0.04)]">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-8 bg-gradient-to-r from-emerald-950 via-emerald-800 to-teal-900 bg-clip-text text-transparent drop-shadow-sm">
            Our Mission
          </h2>
          <motion.p
            className="text-xl md:text-2xl text-center max-w-3xl mx-auto text-slate-700 leading-relaxed font-light"
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

