"use client"

import Image from "next/image"
import { Button } from "~/components/ui/button"
import { ChevronDown } from "lucide-react"
import { motion, type MotionValue } from "framer-motion"

interface HeroSectionProps {
  scale: string | number | MotionValue<number> | MotionValue<string> | MotionValue<unknown> | undefined
  rotateX: string | number | MotionValue<number> | MotionValue<string> | MotionValue<unknown> | undefined
  yText?: MotionValue<number>
}

export const HeroSection = ({ scale, rotateX, yText }: HeroSectionProps) => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div style={{ scale, rotateX }} className="absolute inset-0 shadow-2xl">
        <Image
          src="/api/images/resolve/FrontView1_alaabu.jpg"
          alt="School building"
          fill
          priority
          style={{ objectFit: "cover" }}
          className="absolute inset-0"
        />
        {/* Soft light-green gradient overlay to blend the image into the page background */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#f3fbf7] via-[#f3fbf7]/40 to-[#f3fbf7]/80" />
      </motion.div>

      <motion.div
        className="relative z-10 text-center px-4"
        style={{ y: yText }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 bg-gradient-to-r from-emerald-950 via-emerald-800 to-teal-950 bg-clip-text text-transparent drop-shadow-sm">
          M.S.NAZ HIGH SCHOOL®
        </h1>
        <motion.p
          className="text-xl md:text-3xl font-serif text-emerald-900/80 mb-12 font-light tracking-wide"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Nurturing Minds, Shaping Futures
        </motion.p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
          <Button
            size="lg"
            className="bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-semibold text-lg rounded-full px-8 py-6 shadow-[0_4px_20px_rgba(16,185,129,0.2)] hover:shadow-[0_6px_25px_rgba(16,185,129,0.3)] transition-all duration-300 border border-emerald-400/20"
          >
            Explore Our World
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
      >
        <ChevronDown className="w-10 h-10 text-emerald-600 animate-pulse" />
      </motion.div>
    </section>
  )
}

