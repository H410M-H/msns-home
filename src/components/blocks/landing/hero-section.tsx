"use client";

import Image from "next/image";
import { Button } from "~/components/ui/button";
import { ChevronDown } from "lucide-react";
import { motion, type MotionValue } from "framer-motion";

interface HeroSectionProps {
  scale:
    | string
    | number
    | MotionValue<number>
    | MotionValue<string>
    | MotionValue<unknown>
    | undefined;
  rotateX:
    | string
    | number
    | MotionValue<number>
    | MotionValue<string>
    | MotionValue<unknown>
    | undefined;
  yText?: MotionValue<number>;
}

export const HeroSection = ({ scale, rotateX, yText }: HeroSectionProps) => {
  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden">
      <motion.div
        style={{ scale, rotateX }}
        className="absolute inset-0 shadow-2xl"
      >
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
        className="relative z-10 px-4 text-center"
        style={{ y: yText }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="mb-6 bg-gradient-to-r from-emerald-950 via-emerald-800 to-teal-950 bg-clip-text font-serif text-5xl font-bold text-transparent drop-shadow-sm md:text-7xl lg:text-8xl">
          M.S.NAZ HIGH SCHOOL®
        </h1>
        <motion.p
          className="mb-12 font-serif text-xl font-light tracking-wide text-emerald-900/80 md:text-3xl"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Nurturing Minds, Shaping Futures
        </motion.p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block"
        >
          <Button
            size="lg"
            className="rounded-full border border-emerald-400/20 bg-gradient-to-r from-emerald-600 to-teal-700 px-8 py-6 text-lg font-semibold text-white shadow-[0_4px_20px_rgba(16,185,129,0.2)] transition-all duration-300 hover:from-emerald-500 hover:to-teal-600 hover:shadow-[0_6px_25px_rgba(16,185,129,0.3)]"
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
        <ChevronDown className="h-10 w-10 animate-pulse text-emerald-600" />
      </motion.div>
    </section>
  );
};
