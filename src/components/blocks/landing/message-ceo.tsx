"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Quote } from "lucide-react"

export const MessageFromCEO = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Top heading */}
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-center bg-gradient-to-r from-emerald-100 via-emerald-300 to-teal-100 bg-clip-text text-transparent mb-16">
          Message from the Founder
        </h2>

        {/* Main glassmorphic content container */}
        <motion.div
          className="flex flex-col md:flex-row items-center gap-12 bg-white/[0.02] border border-white/10 p-8 md:p-12 rounded-3xl backdrop-blur-xl shadow-[0_0_50px_-12px_rgba(16,185,129,0.15)]"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Image section */}
          <div className="md:w-2/5 w-full shrink-0 flex justify-center">
            <motion.div
              className="relative w-72 h-96 md:w-80 md:h-[420px] border border-emerald-500/20 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.2)] bg-slate-900/40 p-3"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src="/api/images/resolve/haji_muhammad_siddique_naz_d5ct3l.jpg"
                alt="Haji Muhammad Siddique Naz"
                fill
                className="object-contain p-2 rounded-2xl"
              />
            </motion.div>
          </div>

          {/* Text/quote section */}
          <div className="md:w-3/5 w-full">
            <div className="mb-6">
              <span className="bg-emerald-500/10 text-emerald-300 border border-emerald-500/25 py-1.5 px-4 rounded-full text-xs md:text-sm font-semibold tracking-wider uppercase">
                Dear Students, Parents, and Esteemed Community Members
              </span>
            </div>
            
            <div className="relative">
              <Quote className="w-12 h-12 text-emerald-500/20 absolute -top-6 -left-6 -z-10" />
              <p className="text-slate-300 text-lg md:text-xl italic font-light mb-8 leading-relaxed">
                Welcome to M. S. Naz High School®, established in 2004 with a steadfast commitment to excellence in education. Our mission is to provide a nurturing and innovative environment that cultivates academic achievement, creativity, and strong character.
              </p>
              <p className="text-slate-300 text-lg md:text-xl italic font-light mb-8 leading-relaxed">
                We are proud of our dedicated educators who inspire critical thinking and prepare our students for the challenges of a dynamic world. Our success is a collaborative effort, and together we continue to shape future leaders with integrity, respect, and perseverance. Thank you for your continued trust and support.
              </p>
            </div>

            <div className="border-t border-white/10 pt-6">
              <p className="text-right text-white font-serif text-xl font-semibold">
                Haji Muhammad Siddique Naz <span className="text-xs text-emerald-400 font-sans tracking-widest uppercase ml-2">(Late)</span>
              </p>
              <p className="text-right text-emerald-400 text-sm font-light mt-1 tracking-wider uppercase">
                Founder, M. S. Naz High School®
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
