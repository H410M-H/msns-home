"use client"

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
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
  const [videoList, setVideoList] = useState<string[]>(DEFAULT_VIDEOS)
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [mounted, setMounted] = useState(false)

  // Track two static persistent HTML5 video elements for dual-layer zero-flicker crossfading
  const videoRefA = useRef<HTMLVideoElement>(null)
  const videoRefB = useRef<HTMLVideoElement>(null)

  const [activeLayer, setActiveLayer] = useState<'A' | 'B'>('A')
  const [srcA, setSrcA] = useState<string>(DEFAULT_VIDEOS[0]!)
  const [srcB, setSrcB] = useState<string>(DEFAULT_VIDEOS[1] ?? DEFAULT_VIDEOS[0]!)

  // Keep track of active layer & index refs to avoid stale closures in listeners/intervals
  const activeLayerRef = useRef<'A' | 'B'>('A')
  const currentIndexRef = useRef<number>(0)
  const isTransitioningRef = useRef<boolean>(false)

  activeLayerRef.current = activeLayer
  currentIndexRef.current = currentIndex

  // On mount, fetch dynamic video gallery list without resetting initial playing video
  useEffect(() => {
    setMounted(true)

    async function fetchVideos() {
      try {
        const res = await fetch("/api/gallery")
        if (!res.ok) return
        const data = (await res.json()) as { images?: { key: string; url: string }[] }
        if (data.images && data.images.length > 0) {
          const videoUrls = data.images
            .filter((img) => {
              const filename = img.key.split("/").pop() ?? ""
              return img.key.startsWith("videos/") || /\.(mp4|webm|ogg)$/i.test(filename)
            })
            .map((img) => img.url)

          if (videoUrls.length > 0) {
            const shuffled = shuffleArray(videoUrls)
            setVideoList(shuffled)
          }
        }
      } catch (err) {
        console.error("Failed to fetch dynamic video list:", err)
      }
    }

    void fetchVideos()
  }, [])

  // Transition seamlessly to target index using dual layer video swap
  const changeVideo = useCallback((newIdx: number) => {
    if (videoList.length === 0 || isTransitioningRef.current) return
    const nextIdx = (newIdx + videoList.length) % videoList.length
    const nextSrc = videoList[nextIdx]
    if (!nextSrc) return

    isTransitioningRef.current = true
    setCurrentIndex(nextIdx)

    const currentLayer = activeLayerRef.current
    const targetLayer = currentLayer === 'A' ? 'B' : 'A'
    const targetRef = targetLayer === 'A' ? videoRefA : videoRefB

    if (targetLayer === 'A') {
      setSrcA(nextSrc)
    } else {
      setSrcB(nextSrc)
    }

    // Force load & play on target layer element once state updates
    setTimeout(() => {
      if (targetRef.current) {
        targetRef.current.load()
        const playPromise = targetRef.current.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setActiveLayer(targetLayer)
              isTransitioningRef.current = false
            })
            .catch(() => {
              // Retry / skip gracefully if interrupted
              setActiveLayer(targetLayer)
              isTransitioningRef.current = false
            })
        } else {
          setActiveLayer(targetLayer)
          isTransitioningRef.current = false
        }
      } else {
        isTransitioningRef.current = false
      }
    }, 50)
  }, [videoList])

  const goToNextVideo = useCallback(() => {
    changeVideo(currentIndexRef.current + 1)
  }, [changeVideo])

  const goToPrevVideo = useCallback(() => {
    changeVideo(currentIndexRef.current - 1)
  }, [changeVideo])

  // Automatically advance to next video every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      goToNextVideo()
    }, 8000)
    return () => clearInterval(timer)
  }, [goToNextVideo])

  return (
    <section className="relative h-screen overflow-hidden bg-slate-950">
      {/* Fallback rich background gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(135deg, #064e3b 0%, #0f766e 40%, #115e59 70%, #0c4a6e 100%)",
        }}
      />

      {/* Layer A Video Element — persistent DOM node */}
      <video
        ref={videoRefA}
        src={srcA}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onError={goToNextVideo}
        style={{
          opacity: activeLayer === 'A' ? 1 : 0,
          zIndex: activeLayer === 'A' ? 2 : 1,
        }}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out pointer-events-none"
      />

      {/* Layer B Video Element — persistent DOM node */}
      <video
        ref={videoRefB}
        src={srcB}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onError={goToNextVideo}
        style={{
          opacity: activeLayer === 'B' ? 1 : 0,
          zIndex: activeLayer === 'B' ? 2 : 1,
        }}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out pointer-events-none"
      />

      {/* Contrast Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/30 to-slate-950/70 z-[3]" />

      {/* Content overlay */}
      <div className="relative z-[4] h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold mb-4 bg-linear-to-r from-yellow-100 via-green-400 to-orange-200 bg-clip-text text-transparent drop-shadow-2xl">
          M.S.NAZ HIGH SCHOOL
        </h1>
        <p className="text-lg sm:text-xl md:text-3xl text-white mb-8 font-normal font-serif">
          Pursuit of Excellence | Know Thyself
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/admission/apply"
            className="group px-7 py-3.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold text-base rounded-full shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-300 border border-emerald-400/30 inline-flex items-center gap-2"
          >
            Apply Now
            <Sparkles className="w-4 h-4 text-amber-200 transition-transform group-hover:rotate-12" />
          </Link>
          <Link
            href="/about"
            className="px-7 py-3.5 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-medium text-base rounded-full shadow-md transition-all duration-300 border border-white/30 hover:border-white/50"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Controls */}
      {mounted && videoList.length > 1 && (
        <>
          <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-[5]">
            <Button
              onClick={goToPrevVideo}
              className="bg-white/30 hover:bg-white/50 p-2 rounded-full border-none cursor-pointer text-white"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
          </div>
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-[5]">
            <Button
              onClick={goToNextVideo}
              className="bg-white/30 hover:bg-white/50 p-2 rounded-full border-none cursor-pointer text-white"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>

          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2 z-[5] max-w-[90vw] overflow-x-auto py-1 scrollbar-hide">
            {videoList.map((_, index) => (
              <Button
                key={index}
                className={`w-3 h-3 rounded-full border-none p-0 shrink-0 cursor-pointer ${index === currentIndex ? 'bg-white' : 'bg-white/50'}`}
                onClick={() => changeVideo(index)}
              />
            ))}
          </div>
        </>
      )}

      <motion.div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-[5]"
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown className="w-8 h-8 text-white" />
      </motion.div>
    </section>
  )
}
