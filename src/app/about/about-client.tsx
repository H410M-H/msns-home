"use client";

import { useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { SchoolValues } from "~/components/blocks/landing/values";
import { MissionStatement } from "~/components/blocks/landing/mission-statement";
import { KeyStatistics } from "~/components/blocks/landing/statistics";
import { MessageFromCEO } from "~/components/blocks/landing/message-ceo";
import { HeroSection } from "~/components/blocks/landing/hero-section";

export default function AboutClient() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 1], [15, 0]), {
    stiffness: 300,
    damping: 40,
  });

  // Parallax offsets for content sections
  const yHeroText = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const yCEO = useTransform(scrollYProgress, [0, 0.5], [40, -40]);
  const yMission = useTransform(scrollYProgress, [0.2, 0.7], [60, -60]);
  const yStats = useTransform(scrollYProgress, [0.4, 0.9], [40, -40]);
  const yValues = useTransform(scrollYProgress, [0.6, 1.0], [30, -20]);

  // Parallax movement for ambient background glow orbs
  const yGlow1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const yGlow2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const yGlow3 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const [expandedValue, setExpandedValue] = useState<number | null>(null);

  return (
    <section className="relative flex flex-col min-h-screen pt-4 bg-gradient-to-b from-[#f3fbf7] via-[#f8fdfa] to-[#ffffff] text-slate-800 font-sans overflow-hidden">
      {/* Premium ambient backdrop glowing orbs with parallax drifting */}
      <motion.div style={{ y: yGlow1 }} className="absolute top-1/4 left-[10%] w-96 h-96 bg-emerald-200/40 rounded-full blur-[120px] pointer-events-none" />
      <motion.div style={{ y: yGlow2 }} className="absolute bottom-1/4 right-[10%] w-[500px] h-[500px] bg-teal-200/30 rounded-full blur-[150px] pointer-events-none" />
      <motion.div style={{ y: yGlow3 }} className="absolute top-2/3 left-1/3 -translate-x-1/2 w-80 h-80 bg-green-200/30 rounded-full blur-[100px] pointer-events-none" />

      <main className="grow relative z-10">
        <HeroSection scale={scale} rotateX={rotateX} yText={yHeroText} />
        
        <motion.div style={{ y: yCEO }}>
          <MessageFromCEO />
        </motion.div>

        <motion.div style={{ y: yMission }}>
          <MissionStatement />
        </motion.div>

        <motion.div style={{ y: yStats }}>
          <KeyStatistics />
        </motion.div>

        <motion.div style={{ y: yValues }}>
          <SchoolValues expandedValue={expandedValue} setExpandedValue={setExpandedValue} />
        </motion.div>
      </main>
    </section>
  );
}
