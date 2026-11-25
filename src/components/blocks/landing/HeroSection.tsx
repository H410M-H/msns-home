"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { KineticText } from "~/components/motion/KineticText";
import { Magnetic } from "~/components/motion/Magnetic";
import { MorphBlobs } from "~/components/motion/MorphBlobs";

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
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const itemI = shuffled[i];
    const itemJ = shuffled[j];
    if (itemI !== undefined && itemJ !== undefined) {
      shuffled[i] = itemJ;
      shuffled[j] = itemI;
    }
  }
  return shuffled;
}

export function HeroHome() {
  const [videoList, setVideoList] = useState<string[]>(DEFAULT_VIDEOS);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [mounted, setMounted] = useState(false);
  const reduceMotion = useReducedMotion();

  // Track two static persistent HTML5 video elements for dual-layer zero-flicker crossfading
  const videoRefA = useRef<HTMLVideoElement>(null);
  const videoRefB = useRef<HTMLVideoElement>(null);

  const [activeLayer, setActiveLayer] = useState<"A" | "B">("A");
  const [srcA, setSrcA] = useState<string>(DEFAULT_VIDEOS[0]!);
  const [srcB, setSrcB] = useState<string>(
    DEFAULT_VIDEOS[1] ?? DEFAULT_VIDEOS[0]!,
  );

  // Keep track of active layer & index refs to avoid stale closures in listeners/intervals
  const activeLayerRef = useRef<"A" | "B">("A");
  const currentIndexRef = useRef<number>(0);
  const isTransitioningRef = useRef<boolean>(false);

  activeLayerRef.current = activeLayer;
  currentIndexRef.current = currentIndex;

  // On mount, fetch dynamic video gallery list without resetting initial playing video
  useEffect(() => {
    setMounted(true);

    async function fetchVideos() {
      try {
        const res = await fetch("/api/gallery");
        if (!res.ok) return;
        const data = (await res.json()) as {
          images?: { key: string; url: string }[];
        };
        if (data.images && data.images.length > 0) {
          const videoUrls = data.images
            .filter((img) => {
              const filename = img.key.split("/").pop() ?? "";
              return (
                img.key.startsWith("videos/") ||
                /\.(mp4|webm|ogg)$/i.test(filename)
              );
            })
            .map((img) => img.url);

          if (videoUrls.length > 0) {
            const shuffled = shuffleArray(videoUrls);
            setVideoList(shuffled);
          }
        }
      } catch (err) {
        console.error("Failed to fetch dynamic video list:", err);
      }
    }

    void fetchVideos();
  }, []);

  // Transition seamlessly to target index using dual layer video swap
  const changeVideo = useCallback(
    (newIdx: number) => {
      if (videoList.length === 0 || isTransitioningRef.current) return;
      const nextIdx = (newIdx + videoList.length) % videoList.length;
      const nextSrc = videoList[nextIdx];
      if (!nextSrc) return;

      isTransitioningRef.current = true;
      setCurrentIndex(nextIdx);

      const currentLayer = activeLayerRef.current;
      const targetLayer = currentLayer === "A" ? "B" : "A";
      const targetRef = targetLayer === "A" ? videoRefA : videoRefB;

      if (targetLayer === "A") {
        setSrcA(nextSrc);
      } else {
        setSrcB(nextSrc);
      }

      // Force load & play on target layer element once state updates
      setTimeout(() => {
        if (targetRef.current) {
          targetRef.current.load();
          const playPromise = targetRef.current.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                setActiveLayer(targetLayer);
                isTransitioningRef.current = false;
              })
              .catch(() => {
                // Retry / skip gracefully if interrupted
                setActiveLayer(targetLayer);
                isTransitioningRef.current = false;
              });
          } else {
            setActiveLayer(targetLayer);
            isTransitioningRef.current = false;
          }
        } else {
          isTransitioningRef.current = false;
        }
      }, 50);
    },
    [videoList],
  );

  const goToNextVideo = useCallback(() => {
    changeVideo(currentIndexRef.current + 1);
  }, [changeVideo]);

  const goToPrevVideo = useCallback(() => {
    changeVideo(currentIndexRef.current - 1);
  }, [changeVideo]);

  // Automatically advance to next video every 8 seconds (not for visitors
  // who prefer reduced motion; they can still use the controls).
  useEffect(() => {
    if (reduceMotion) return;
    const timer = setInterval(() => {
      goToNextVideo();
    }, 8000);
    return () => clearInterval(timer);
  }, [goToNextVideo, reduceMotion]);

  return (
    <section className="relative h-screen overflow-hidden bg-slate-950">
      {/* Fallback rich background gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(135deg, #064e3b 0%, #0f766e 40%, #115e59 70%, #0c4a6e 100%)",
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
          opacity: activeLayer === "A" ? 1 : 0,
          zIndex: activeLayer === "A" ? 2 : 1,
        }}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out"
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
          opacity: activeLayer === "B" ? 1 : 0,
          zIndex: activeLayer === "B" ? 2 : 1,
        }}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out"
      />

      {/* Contrast Overlay */}
      <div className="absolute inset-0 z-[3] bg-linear-to-t from-slate-950/80 via-slate-950/30 to-slate-950/70" />
      <MorphBlobs tone="dark" className="z-[3] mix-blend-screen" />

      {/* Content overlay */}
      <div className="relative z-[4] flex h-full flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-4 font-serif text-4xl font-bold drop-shadow-2xl sm:text-5xl md:text-7xl">
          <KineticText
            mode="settle"
            text="M.S.NAZ HIGH SCHOOL"
            wordClassName="bg-linear-to-r from-yellow-100 via-green-400 to-orange-200 bg-clip-text text-transparent"
          />
        </h1>
        <p className="mb-8 font-serif text-lg font-normal text-white sm:text-xl md:text-3xl">
          Pursuit of Excellence | Know Thyself
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Magnetic>
            <Link
              href="/admission/apply"
              className="group inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:scale-105 hover:from-emerald-400 hover:to-teal-500 hover:shadow-emerald-500/50"
            >
              Apply Now
              <Sparkles className="h-4 w-4 text-amber-200 transition-transform group-hover:rotate-12" />
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              href="/about"
              className="rounded-full border border-white/30 bg-white/20 px-7 py-3.5 text-base font-medium text-white shadow-md backdrop-blur-md transition-all duration-300 hover:border-white/50 hover:bg-white/30"
            >
              Learn More
            </Link>
          </Magnetic>
        </div>
      </div>

      {/* Controls */}
      {mounted && videoList.length > 1 && (
        <>
          <div className="absolute top-1/2 left-4 z-[5] -translate-y-1/2 transform">
            <Button
              aria-label="Previous video"
              onClick={goToPrevVideo}
              className="cursor-pointer rounded-full border-none bg-white/30 p-2 text-white hover:bg-white/50"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </div>
          <div className="absolute top-1/2 right-4 z-[5] -translate-y-1/2 transform">
            <Button
              aria-label="Next video"
              onClick={goToNextVideo}
              className="cursor-pointer rounded-full border-none bg-white/30 p-2 text-white hover:bg-white/50"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          <div className="scrollbar-hide absolute bottom-16 left-1/2 z-[5] flex max-w-[90vw] -translate-x-1/2 transform space-x-2 overflow-x-auto py-1">
            {videoList.map((_, index) => (
              <Button
                key={index}
                aria-label={`Show video ${index + 1}`}
                aria-current={index === currentIndex}
                className={`h-3 w-3 shrink-0 cursor-pointer rounded-full border-none p-0 ${index === currentIndex ? "bg-white" : "bg-white/50"}`}
                onClick={() => changeVideo(index)}
              />
            ))}
          </div>
        </>
      )}

      <motion.div
        className="absolute bottom-4 left-1/2 z-[5] -translate-x-1/2 transform"
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown className="h-8 w-8 text-white" />
      </motion.div>
    </section>
  );
}
