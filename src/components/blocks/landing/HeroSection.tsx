"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'


export function HeroSection() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0)

  const videos = [
    "https://res.cloudinary.com/dvvbxrs55/video/upload/f_auto,q_auto,w_auto/v1729269611/clip1_awtegx",
    "https://res.cloudinary.com/dvvbxrs55/video/upload/f_auto,q_auto,w_auto/v1729269805/clip4_stlpus",
    "https://res.cloudinary.com/dvvbxrs55/video/upload/f_auto,q_auto,w_auto/v1729269611/clip1_awtegx",
    "https://res.cloudinary.com/dvvbxrs55/video/upload/f_auto,q_auto,w_auto/v1729267740/clip5_szbx9z",
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [videos.length])

  return (
    <motion.section
      className="relative h-screen overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-slate-900/90" />
      <video
        className="absolute inset-0 w-full h-full object-cover"
        key={currentVideoIndex}
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={videos[currentVideoIndex]} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="relative h-full flex items-center justify-center text-center">
        <div className="w-full p-4 bg-gray-500/30">
          <motion.h1
            className="text-7xl md:text-7xl font-serif font-bold mb-6 bg-gradient-to-r from-white via-emerald-300 to-white bg-clip-text text-transparent drop-shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            M.S.NAZ HIGH SCHOOL
          </motion.h1>

          <motion.p
            className="text-xl md:text-3xl text-white mb-12 font-normal font-serif"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Pursuit of Excellence | Know Thyself
          </motion.p>

          <motion.div
            className="flex flex-col gap-4 md:flex-row justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown className="w-10 h-10 text-white animate-pulse" />
      </motion.div>
    </motion.section>
  )
}