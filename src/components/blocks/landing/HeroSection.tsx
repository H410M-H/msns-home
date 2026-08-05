"use client"

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '~/components/ui/button'
import Link from 'next/link'

const DEFAULT_VIDEOS = [
  "/api/images/videos/clip1_awtegx.mp4",
  "/api/images/videos/clip4_stlpus.mp4",
  "/api/images/videos/clip5_szbx9z.mp4",
  "/api/images/videos/1780771531430_IMG_3176_-_Trim.mp4",
  "/api/images/videos/1780771539453_IMG_3595_-_Trim.mp4",
  "/api/images/videos/1780771562319_IMG_3596_-_Trim.mp4",
  "/api/images/videos/1780771761292_IMG_3682_-_Trim.mp4",
  "/api/images/videos/1780771784615_IMG_4121_-_Trim.mp4",
  "/api/images/videos/1780771846566_IMG_4339.mov",
  "/api/images/videos/1785951372907_gemini_generated_video_62b1fbe4.mp4",
]

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const itemI = shuffled[i]
    const itemJ = shuffled[j]
    if (itemI !== undefined && itemJ !== undefined) {
      shuffled[i] = itemJ
      shuffled[j] = itemI
    }
  }
  return shuffled
}

export function HeroHome() {
  const [videoList, setVideoList] = useState<string[]>(() => shuffleArray(DEFAULT_VIDEOS))
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [mounted, setMounted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setMounted(true)

    // Fetch video list dynamically from API to pick up newly added clips automatically
    async function fetchVideos() {
      try {
        const res = await fetch("/api/gallery")
        if (!res.ok) return
        const data = (await res.json()) as { images?: { key: string; url: string }[] }
        if (data.images && data.images.length > 0) {
          const videoUrls = data.images
            .filter((img) => {
              const filename = img.key.split("/").pop() ?? ""
              return (
                img.key.startsWith("videos/") ||
                /\.(mp4|webm|ogg|mov)$/i.test(filename)
              )
            })
            .map((img) => img.url)

          if (videoUrls.length > 0) {
            setVideoList(shuffleArray(videoUrls))
          }
        }
      } catch (err) {
        console.error("Failed to fetch dynamic video list:", err)
      }
    }

    void fetchVideos()
  }, [])

  // Reset video loaded status when video index changes
  useEffect(() => {
    setIsVideoLoaded(false)
  }, [currentVideoIndex])

  // Automatically change video every 8 seconds
  useEffect(() => {
    if (videoList.length === 0) return
    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoList.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [videoList.length])

  // Navigation functions for manual video control
  const goToNextVideo = useCallback(() => {
    if (videoList.length === 0) return
    setIsVideoLoaded(false)
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoList.length)
  }, [videoList.length])

  const goToPrevVideo = useCallback(() => {
    if (videoList.length === 0) return
    setIsVideoLoaded(false)
    setCurrentVideoIndex((prevIndex) => (prevIndex - 1 + videoList.length) % videoList.length)
  }, [videoList.length])

  const selectVideo = useCallback((index: number) => {
    setIsVideoLoaded(false)
    setCurrentVideoIndex(index)
  }, [])

  const currentSrc = videoList[currentVideoIndex] ?? DEFAULT_VIDEOS[0]

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Static gradient background — immediate FCP paint */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(135deg, #064e3b 0%, #0f766e 40%, #115e59 70%, #0c4a6e 100%)",
        }}
      />

      {/* Video Background with fade transition - Loaded on all viewports */}
      <AnimatePresence mode="wait">
        <motion.video
          ref={videoRef}
          key={currentSrc}
          className="absolute inset-0 w-full h-full object-cover z-[1]"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setIsVideoLoaded(true)}
          onError={goToNextVideo}
          initial={{ opacity: 0 }}
          animate={{ opacity: isVideoLoaded ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <source src={currentSrc} type={currentSrc?.endsWith(".mov") ? "video/quicktime" : "video/mp4"} />
          Your browser does not support the video tag.
        </motion.video>
      </AnimatePresence>

      {/* Gradient overlay for improved contrast — sits above video */}
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
      {mounted && videoList.length > 1 && (
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
      {mounted && videoList.length > 1 && (
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2 z-[4] max-w-[90vw] overflow-x-auto py-1 scrollbar-hide">
          {videoList.map((_, index) => (
            <Button
              key={index}
              className={`w-3 h-3 rounded-full border-none p-0 shrink-0 ${index === currentVideoIndex ? 'bg-white' : 'bg-white/50'}`}
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

