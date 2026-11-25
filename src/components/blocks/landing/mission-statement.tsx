"use client";

import { motion } from "framer-motion";

export const MissionStatement = () => {
  return (
    <motion.section
      className="relative py-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <div className="relative z-10 container mx-auto max-w-5xl px-4">
        <div className="rounded-3xl border border-emerald-100/50 bg-gradient-to-br from-emerald-50/60 to-teal-50/30 p-10 shadow-[0_15px_40px_rgba(16,185,129,0.04)] md:p-16">
          <h2 className="mb-8 bg-gradient-to-r from-emerald-950 via-emerald-800 to-teal-900 bg-clip-text text-center font-serif text-4xl font-bold text-transparent drop-shadow-sm md:text-5xl">
            Our Mission
          </h2>
          <motion.p
            className="mx-auto max-w-3xl text-center text-xl leading-relaxed font-light text-slate-700 md:text-2xl"
            initial={{ scale: 0.98, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            At M.S.NAZ High School, we are committed to providing a nurturing
            and challenging educational environment that empowers students to
            become lifelong learners, critical thinkers, and responsible global
            citizens.
          </motion.p>
        </div>
      </div>
    </motion.section>
  );
};
