"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '~/components/ui/button'
import Link from 'next/link'

export function HeroHome() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0)

  const videos = [
    "https://res.cloudinary.com/dvvbxrs55/video/upload/f_auto,q_auto,w_auto/v1729269611/clip1_awtegx",
    "https://res.cloudinary.com/dvvbxrs55/video/upload/f_auto,q_auto,w_auto/v1729269805/clip4_stlpus",
    "https://res.cloudinary.com/dvvbxrs55/video/upload/f_auto,q_auto,w_auto/v1729269611/clip1_awtegx",
    "https://res.cloudinary.com/dvvbxrs55/video/upload/f_auto,q_auto,w_auto/v1729267740/clip5_szbx9z",
  ]

  // Automatically change video every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [videos.length])

  // Navigation functions for manual video control
  const goToNextVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length)
  }

  const goToPrevVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length)
  }

  const selectVideo = (index: number) => {
    setCurrentVideoIndex(index)
  }

  return (
    <motion.section className="relative h-screen overflow-hidden">
      {/* Gradient overlay for improved contrast */}
      <div className="absolute inset-0 bg-linear-to-t from-slate-900/70 via-transparent to-slate-900/90" />

      {/* Video Background with fade transition */}
      <AnimatePresence>
        <motion.video
          key={currentVideoIndex}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <source src={videos[currentVideoIndex]} type="video/mp4" />
          Your browser does not support the video tag.
        </motion.video>
      </AnimatePresence>

      {/* Main content overlay */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold mb-4 bg-linear-to-r from-yellow-100 via-green-400 to-orange-200 bg-clip-text text-transparent drop-shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          M.S.NAZ HIGH SCHOOL
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl md:text-3xl text-white mb-8 font-normal font-serif"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Pursuit of Excellence | Know Thyself
        </motion.p>

        {/* "Learn More" interactive button */}
        <Link href="/about"          className="px-6 py-3 bg-emerald-500 text-white rounded-full shadow-lg hover:bg-emerald-600 focus:outline-hidden"
        >
          Learn More
        </Link>
      </div>

      {/* Left and right navigation controls */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
        <Button
          onClick={goToPrevVideo}
          className="bg-white/30 hover:bg-white/50 p-2 rounded-full"
        >
          <ChevronLeft className="w-4 h-4 text-white" />
        </Button>
      </div>
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
        <Button
          onClick={goToNextVideo}
          className="bg-white/30 hover:bg-white/50 p-2 rounded-full"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </Button>
      </div>

      {/* Carousel indicators for manual video selection */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {videos.map((_, index) => (
          <Button
            key={index}
            className={`w-3 h-3 rounded-full ${index === currentVideoIndex ? 'bg-white' : 'bg-white/50'}`}
            onClick={() => selectVideo(index)}
          />
        ))}
      </div>

      {/* Animated down chevron indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown className="w-8 h-8 text-white" />
      </motion.div>
    </motion.section>
  )
}
