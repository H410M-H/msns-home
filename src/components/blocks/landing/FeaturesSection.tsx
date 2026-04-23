"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Award,
  Users,
  GraduationCap,
  BookOpen,
  Sun,
  Cpu,
  ShieldCheck,
  Mic,
  Lightbulb,
  HeartHandshake,
  Library,
  FlaskConical,
  Globe,
  Leaf,
  type LucideIcon,
} from "lucide-react";

// --- Feature data ---
interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
  category: string;
}

const allFeatures: Feature[] = [
  // Academic Excellence
  {
    icon: Award,
    title: "Board Affiliated",
    desc: "Officially Registered & Affiliated with BISE Gujranwala, ensuring recognized certification.",
    category: "Academic Excellence",
  },
  {
    icon: Users,
    title: "1:16 Student-Teacher Ratio",
    desc: "Small class sizes ensure every student gets personalized attention and guidance.",
    category: "Academic Excellence",
  },
  {
    icon: GraduationCap,
    title: "Teacher Mentorship",
    desc: "Junior teachers undergo structured apprenticeships under educators with 15+ years experience.",
    category: "Academic Excellence",
  },
  {
    icon: BookOpen,
    title: "Oxford Collaboration",
    desc: "Academic collaboration with Oxford University Press since 2021 for world-class curriculum.",
    category: "Academic Excellence",
  },
  {
    icon: FlaskConical,
    title: "Science & AI Labs",
    desc: "Fully equipped labs and a 60% practical, activity-based AI curriculum without traditional textbooks.",
    category: "Academic Excellence",
  },
  {
    icon: Lightbulb,
    title: "Top Board Results",
    desc: "Consistent academic excellence reflecting the top Matric Board results in the area.",
    category: "Academic Excellence",
  },
  // Campus & Tech
  {
    icon: Sun,
    title: "Solar-Powered Campus",
    desc: "Eco-friendly environment ensuring uninterrupted learning regardless of power cuts.",
    category: "Campus & Tech",
  },
  {
    icon: Cpu,
    title: "Advanced IT Infrastructure",
    desc: "High-performance quad-core systems with 15 TB secure school cloud storage.",
    category: "Campus & Tech",
  },
  {
    icon: ShieldCheck,
    title: "24/7 Secure Campus",
    desc: "Controlled entry/exit monitored by trained staff for complete student safety.",
    category: "Campus & Tech",
  },
  {
    icon: Leaf,
    title: "Healthy Environment",
    desc: "Filtered water, ventilated classrooms for summer, and insulated spaces for winter.",
    category: "Campus & Tech",
  },
  {
    icon: Library,
    title: "Well-Stocked Library",
    desc: "A rich collection of resources to cultivate reading habits and independent learning.",
    category: "Campus & Tech",
  },
  // Student Care & Growth
  {
    icon: HeartHandshake,
    title: "Holistic Assessment",
    desc: "Progress measured academically, psychologically, behaviorally, and environmentally.",
    category: "Student Care",
  },
  {
    icon: Users,
    title: "Support for Slow Learners",
    desc: "Individualized care and structured parent-teacher communication for students needing extra help.",
    category: "Student Care",
  },
  {
    icon: Mic,
    title: "Public Speaking",
    desc: "Daily assembly practice to build confidence, communication skills, and leadership.",
    category: "Student Care",
  },
  {
    icon: Globe,
    title: "English Environment",
    desc: "Active promotion of English speaking across campus to prepare global citizens.",
    category: "Student Care",
  },
  {
    icon: Award,
    title: "Competitions & Events",
    desc: "Regular debates, quizzes, and purpose-driven events aligned with the national calendar.",
    category: "Student Care",
  },
];

// --- Category color mapping ---
const categoryColors: Record<string, { bg: string; text: string; accent: string; glow: string }> = {
  "Academic Excellence": {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    accent: "from-emerald-500 to-teal-400",
    glow: "shadow-emerald-500/20",
  },
  "Campus & Tech": {
    bg: "bg-sky-500/10",
    text: "text-sky-400",
    accent: "from-sky-500 to-blue-400",
    glow: "shadow-sky-500/20",
  },
  "Student Care": {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    accent: "from-amber-500 to-orange-400",
    glow: "shadow-amber-500/20",
  },
};

// --- Feature Card ---
function FeatureCard({ feature }: { feature: Feature }) {
  const colors = categoryColors[feature.category] ?? categoryColors["Academic Excellence"]!;

  return (
    <div className="group relative flex-shrink-0 w-[280px] sm:w-[310px]">
      <div
        className={`
          relative h-full overflow-hidden rounded-2xl border border-white/[0.08]
          bg-white/[0.04] backdrop-blur-xl
          p-6 transition-all duration-500
          hover:bg-white/[0.09] hover:border-white/15
          hover:shadow-xl ${colors.glow}
          hover:-translate-y-1
        `}
      >
        {/* Gradient accent strip */}
        <div
          className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${colors.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />

        {/* Category badge */}
        <span
          className={`
            inline-block mb-4 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.15em]
            ${colors.bg} ${colors.text} border border-white/5
          `}
        >
          {feature.category}
        </span>

        {/* Icon */}
        <div
          className={`
            mb-4 flex h-12 w-12 items-center justify-center rounded-xl
            bg-gradient-to-br ${colors.accent} shadow-lg ${colors.glow}
            transition-transform duration-300 group-hover:scale-110 group-hover:rotate-2
          `}
        >
          <feature.icon className="h-6 w-6 text-white" strokeWidth={1.8} />
        </div>

        {/* Content */}
        <h3 className="mb-2 text-base font-bold text-white leading-snug">
          {feature.title}
        </h3>
        <p className="text-[13px] leading-relaxed text-white/50 group-hover:text-white/70 transition-colors duration-300">
          {feature.desc}
        </p>

        {/* Hover glow effect */}
        <div
          className={`
            absolute -bottom-16 -right-16 h-32 w-32 rounded-full
            bg-gradient-to-br ${colors.accent} opacity-0 blur-3xl
            group-hover:opacity-[0.06] transition-opacity duration-700
          `}
        />
      </div>
    </div>
  );
}

// --- Marquee Row ---
function MarqueeRow({
  features,
  direction = "left",
  speed = 35,
}: {
  features: Feature[];
  direction?: "left" | "right";
  speed?: number;
}) {
  // Duplicate the array to create a seamless loop
  const duplicated = [...features, ...features];

  return (
    <div
      className="relative overflow-hidden group/marquee"
      style={{
        maskImage: "linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)",
      }}
    >
      <div
        className="flex gap-5 w-max group-hover/marquee:[animation-play-state:paused]"
        style={{
          animation: `marquee-${direction} ${speed}s linear infinite`,
        }}
      >
        {duplicated.map((feature, i) => (
          <FeatureCard key={`${direction}-${i}`} feature={feature} />
        ))}
      </div>


    </div>
  );
}

// --- Main Section ---
export function FeaturesSection() {
  // Split features into two rows for visual variety
  const row1 = allFeatures.slice(0, 8);
  const row2 = allFeatures.slice(8);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0a1628 0%, #0d2137 35%, #0a2e1f 65%, #0c1a2e 100%)",
      }}
    >
      {/* Background noise & grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Floating orbs */}
      <div className="absolute top-20 left-[10%] h-[400px] w-[400px] rounded-full bg-emerald-500/[0.05] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-[15%] h-[350px] w-[350px] rounded-full bg-sky-500/[0.05] blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-amber-500/[0.03] blur-[150px] pointer-events-none" />

      <div className="relative py-20 md:py-28">
        {/* Header */}
        <div className="container mx-auto px-4 md:px-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
              Why Choose MSNS
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
              Built for{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400 bg-clip-text text-transparent">
                Excellence
              </span>
            </h2>
            <p className="mt-4 text-base md:text-lg text-white/45 max-w-xl leading-relaxed">
              Academic rigor, modern infrastructure, and personalized care —
              at the lowest fee structure in Gakkhar.
            </p>
          </motion.div>
        </div>

        {/* Marquee rows — continuous right-to-left motion */}
        <div className="space-y-5">
          <MarqueeRow features={row1} direction="left" speed={40} />
          <MarqueeRow features={row2} direction="right" speed={45} />
        </div>

        {/* Stats bar */}
        <div className="container mx-auto px-4 md:px-6 mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-8 md:gap-16 py-8 border-t border-white/[0.06]"
          >
            {[
              { value: "16+", label: "Years of Excellence" },
              { value: "1:16", label: "Student-Teacher Ratio" },
              { value: "100%", label: "Board Results" },
              { value: "15TB", label: "Cloud Storage" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-white/40 uppercase tracking-wider font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
