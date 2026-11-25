"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export const MessageFromCEO = () => {
  return (
    <section className="relative py-24">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Top heading */}
        <h2 className="mb-16 bg-gradient-to-r from-emerald-950 via-emerald-800 to-teal-900 bg-clip-text text-center font-serif text-4xl font-bold text-transparent drop-shadow-sm md:text-5xl">
          Message from the Founder
        </h2>

        {/* Main glassmorphic content container */}
        <motion.div
          className="flex flex-col items-center gap-12 rounded-3xl border border-emerald-100/60 bg-white/80 p-8 shadow-[0_20px_50px_-12px_rgba(16,185,129,0.08)] backdrop-blur-xl md:flex-row md:p-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Image section */}
          <div className="flex w-full shrink-0 justify-center md:w-2/5">
            <motion.div
              className="relative h-96 w-72 overflow-hidden rounded-2xl border border-emerald-100 bg-white p-3 shadow-[0_15px_35px_rgba(16,185,129,0.05)] md:h-[420px] md:w-80"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src="/api/images/resolve/haji_muhammad_siddique_naz_d5ct3l.jpg"
                alt="Haji Muhammad Siddique Naz"
                fill
                sizes="(min-width: 768px) 320px, 288px"
                className="rounded-2xl object-contain p-2"
              />
            </motion.div>
          </div>

          {/* Text/quote section */}
          <div className="w-full md:w-3/5">
            <div className="mb-6">
              <span className="rounded-full border border-emerald-200/50 bg-emerald-50 px-4 py-1.5 text-xs font-semibold tracking-wider text-emerald-800 uppercase md:text-sm">
                Dear Students, Parents, and Esteemed Community Members
              </span>
            </div>

            <div className="relative">
              <Quote className="absolute -top-6 -left-6 -z-10 h-12 w-12 text-emerald-500/10" />
              <p className="text-slate-755 mb-8 text-lg leading-relaxed font-light italic md:text-xl">
                Welcome to M. S. Naz High School®, established in 2004 with a
                steadfast commitment to excellence in education. Our mission is
                to provide a nurturing and innovative environment that
                cultivates academic achievement, creativity, and strong
                character.
              </p>
              <p className="text-slate-755 mb-8 text-lg leading-relaxed font-light italic md:text-xl">
                We are proud of our dedicated educators who inspire critical
                thinking and prepare our students for the challenges of a
                dynamic world. Our success is a collaborative effort, and
                together we continue to shape future leaders with integrity,
                respect, and perseverance. Thank you for your continued trust
                and support.
              </p>
            </div>

            <div className="border-t border-emerald-100/60 pt-6">
              <p className="text-right font-serif text-xl font-semibold text-emerald-950">
                Haji Muhammad Siddique Naz{" "}
                <span className="ml-2 font-sans text-xs tracking-widest text-emerald-700 uppercase">
                  (Late)
                </span>
              </p>
              <p className="mt-1 text-right text-sm font-medium tracking-wider text-emerald-600 uppercase">
                Founder, M. S. Naz High School®
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
