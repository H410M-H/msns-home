"use client"

import { motion } from "framer-motion"

export const MissionStatement = ( ) => {
  return (
    <motion.section
      className="py-24 relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl p-8 backdrop-blur-lg border border-white/10">
          <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-green-300 to-emerald-400 bg-clip-text text-transparent">
            Our Mission
          </h2>
          <motion.p
            className="text-xl text-center max-w-4xl mx-auto text-slate-200 leading-relaxed"
            initial={{ scale: 0.95 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            At M.S.NAZ High School, we are committed to providing a nurturing and challenging educational environment
            that empowers students to become lifelong learners, critical thinkers, and responsible global citizens.
          </motion.p>
        </div>
      </div>
    </motion.section>
  )
}

