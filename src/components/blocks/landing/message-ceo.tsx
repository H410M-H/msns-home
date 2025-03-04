"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Quote } from "lucide-react"

export const MessageFromCEO = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Top heading */}
        <h2 className="text-4xl font-bold text-center text-slate-900 mb-16">
          Message from Founder
        </h2>

        {/* Main content wrapper */}
        <motion.div
          className="flex flex-col md:flex-row items-center gap-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Image section */}
          <div className="md:w-1/3 w-full flex-shrink-0">
            <motion.div
              className="relative w-full h-80 md:h-96 border-4 border-emerald-500/30 rounded-lg overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src="https://res.cloudinary.com/dvvbxrs55/image/upload/v1741086948/haji_muhammad_siddique_naz_d5ct3l.jpg"
                alt="CEO"
                fill
                className="object-contain"
              />
            </motion.div>
          </div>

          {/* Text/quote section */}
          <div className="md:w-2/3 w-full">
            <div className="flex items-center mb-4">
              <div className="bg-emerald-600 text-white py-1 px-3 rounded-r-lg">
                Dear Students, Parents, and Esteemed Community Members,
              </div>
            </div>
            <Quote className="w-12 h-12 text-emerald-500/50 mb-4" />
            <p className="text-slate-700 text-lg italic mb-6 leading-relaxed">
              Welcome to M. S. Naz High School®, established in 2004 with a steadfast commitment to excellence in education. Our mission is to provide a nurturing and innovative environment that cultivates academic achievement, creativity, and strong character.
              We are proud of our dedicated educators who inspire critical thinking and prepare our students for the challenges of a dynamic world. Our success is a collaborative effort, and together we continue to shape future leaders with integrity, respect, and perseverance.
              Thank you for your continued trust and support. We look forward to celebrating the achievements of our students and the growth of our community.
              Sincerely,
              Founder, M. S. Naz High School®            </p>
            <p className="text-right text-slate-900 font-bold">— Siddique |  LATE</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
