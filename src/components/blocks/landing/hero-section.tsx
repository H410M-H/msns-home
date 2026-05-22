"use client"

import Image from "next/image"
import { Button } from "~/components/ui/button"
import { ChevronDown } from "lucide-react"
import { motion, type MotionValue } from "framer-motion"

interface HeroSectionProps {
  scale: string | number | MotionValue<number> | MotionValue<string> | MotionValue<unknown> | undefined
  rotateX: string | number | MotionValue<number> | MotionValue<string> | MotionValue<unknown> | undefined
}

export const HeroSection = ({ scale, rotateX }: HeroSectionProps) => {
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
        {/* Rich dark gradient overlay to blend the image into the page background */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/90" />
      </motion.div>

      <motion.div
        className="relative z-10 text-center px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 bg-gradient-to-r from-yellow-100 via-emerald-300 to-teal-100 bg-clip-text text-transparent drop-shadow-2xl">
          M.S.NAZ HIGH SCHOOL®
        </h1>
        <motion.p
          className="text-xl md:text-3xl font-serif text-slate-200 mb-12 font-light tracking-wide"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Nurturing Minds, Shaping Futures
        </motion.p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
          <Button
            size="lg"
            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-semibold text-lg rounded-full px-8 py-6 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all duration-300 border border-emerald-400/20"
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
        <ChevronDown className="w-10 h-10 text-emerald-400 animate-pulse" />
      </motion.div>
    </section>
  )
}

