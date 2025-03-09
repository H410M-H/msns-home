"use client"

import Image from "next/image"
import { Button } from "~/components/ui/button"
import { ChevronDown } from "lucide-react"
import { type CustomValueType, motion, type MotionValue } from "framer-motion"

interface HeroSectionProps {
  scale: string | number | CustomValueType | MotionValue<number> | MotionValue<string> | MotionValue<unknown> | undefined
  rotateX: string | number | CustomValueType | MotionValue<number> | MotionValue<string> | MotionValue<unknown> | undefined
}

export const HeroSection = ({ scale, rotateX }: HeroSectionProps)  => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div style={{ scale, rotateX }} className="absolute inset-0 shadow-2xl">
        <Image
          src="https://res.cloudinary.com/dvvbxrs55/image/upload/v1729267627/FrontView1_alaabu.jpg"
          alt="School building"
          fill
          style={{ objectFit: "cover" }}
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-slate-900/90" />
      </motion.div>

      <motion.div
        className="relative z-10 text-center px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 bg-gradient-to-r from-white via-emerald-300 to-white bg-clip-text text-transparent">
          M.S.NAZ HIGH SCHOOL®
        </h1>
        <motion.p
          className="text-xl md:text-3xl font-serif text-white mb-12 font-normal"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Nurturing Minds, Shaping Futures
        </motion.p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-lg rounded-full px-8 py-6 shadow-lg"
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
        <ChevronDown className="w-10 h-10 text-white animate-pulse" />
      </motion.div>
    </section>
  )
}

