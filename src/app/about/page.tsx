"use client"

import { useState } from "react"
import { useScroll, useTransform, useSpring } from "framer-motion"
import { SchoolValues } from "~/components/blocks/landing/values"
import { MissionStatement } from "~/components/blocks/landing/mission-statement"
import { KeyStatistics } from "~/components/blocks/landing/statistics"
import { MessageFromCEO } from "~/components/blocks/landing/message-ceo"
import { HeroSection } from "~/components/blocks/landing/hero-section"

export default function About() {
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 1], [15, 0]), {
    stiffness: 300,
    damping: 40,
  })

  const [expandedValue, setExpandedValue] = useState<number | null>(null)

  return (
    <section className="flex flex-col min-h-screen pt-4 bg-gradient-to-br from-green-900 via-yellow-700/50 to-purple-900/30">
      <main className="flex-grow">
        <HeroSection scale={scale} rotateX={rotateX} />
        <MessageFromCEO />
        <MissionStatement />
        <KeyStatistics />
        <SchoolValues expandedValue={expandedValue} setExpandedValue={setExpandedValue} />
      </main>
    </section>
  )
}

