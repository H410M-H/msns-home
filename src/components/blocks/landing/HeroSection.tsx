"use client"

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '~/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

const videos = [
  "/api/images/videos/clip1_awtegx.mp4",
  "/api/images/videos/clip4_stlpus.mp4",
  "/api/images/videos/clip5_szbx9z.mp4",
]

export function HeroHome() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [loadVideo, setLoadVideo] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Detect client mount and defer video loading to clear the main thread
  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => {
      setLoadVideo(true)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  // Automatically change video every 8 seconds (only after video load state is true)
  useEffect(() => {
    if (!loadVideo) return
    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [loadVideo])

  // Navigation functions for manual video control
  const goToNextVideo = useCallback(() => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length)
  }, [])

  const goToPrevVideo = useCallback(() => {
    setCurrentVideoIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length)
  }, [])

  const selectVideo = useCallback((index: number) => {
    setCurrentVideoIndex(index)
  }, [])

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Static gradient background — immediate FCP paint */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #064e3b 0%, #0f766e 40%, #115e59 70%, #0c4a6e 100%)",
        }}
      />

      {/* Static Fallback Image - Rendered instantly on SSR and client as LCP base */}
      <Image
        src="/api/images/resolve/FrontView1_alaabu.jpg"
        alt="M.S. Naz High School Building"
        fill
        priority
        sizes="100vw"
        style={{ objectFit: "cover" }}
        className="absolute inset-0"
      />

      {/* Video Background with fade transition - Loaded deferred on all viewports */}
      {loadVideo && (
        <AnimatePresence>
          <motion.video
            ref={videoRef}
            key={currentVideoIndex}
            className="absolute inset-0 w-full h-full object-cover z-[1]"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onLoadedData={() => setIsVideoLoaded(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: isVideoLoaded ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <source src={videos[currentVideoIndex]} type="video/mp4" />
            Your browser does not support the video tag.
          </motion.video>
        </AnimatePresence>
      )}

      {/* Gradient overlay for improved contrast — sits above image and video */}
      <div className="absolute inset-0 bg-linear-to-t from-slate-900/70 via-transparent to-slate-900/90 z-[2]" />

      {/* Main content overlay — rendered immediately on top */}
      <div className="relative z-[3] h-full flex flex-col items-center justify-center text-center px-4">
        <h1
          className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold mb-4 bg-linear-to-r from-yellow-100 via-green-400 to-orange-200 bg-clip-text text-transparent drop-shadow-2xl"
        >
          M.S.NAZ HIGH SCHOOL
        </h1>

        <p
          className="text-lg sm:text-xl md:text-3xl text-white mb-8 font-normal font-serif"
        >
          Pursuit of Excellence | Know Thyself
        </p>

        {/* "Learn More" interactive button */}
        <Link href="/about" className="px-6 py-3 bg-emerald-500 text-white rounded-full shadow-lg hover:bg-emerald-600 focus:outline-hidden transition-colors"
        >
          Learn More
        </Link>
      </div>

      {/* Left and right navigation controls - Rendered after mount */}
      {mounted && (
        <>
          <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-[4]">
            <Button
              onClick={goToPrevVideo}
              className="bg-white/30 hover:bg-white/50 p-2 rounded-full border-none"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </Button>
          </div>
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-[4]">
            <Button
              onClick={goToNextVideo}
              className="bg-white/30 hover:bg-white/50 p-2 rounded-full border-none"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </Button>
          </div>
        </>
      )}

      {/* Carousel indicators - Rendered after mount */}
      {mounted && (
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2 z-[4]">
          {videos.map((_, index) => (
            <Button
              key={index}
              className={`w-3 h-3 rounded-full border-none p-0 ${index === currentVideoIndex ? 'bg-white' : 'bg-white/50'}`}
              onClick={() => selectVideo(index)}
            />
          ))}
        </div>
      )}

      {/* Animated down chevron indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-[4]"
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown className="w-8 h-8 text-white" />
      </motion.div>
    </section>
  )
}
