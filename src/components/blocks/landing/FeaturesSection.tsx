"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Award, Users, GraduationCap, BookOpen, Sun, Cpu, ShieldCheck, Mic,
  Lightbulb, HeartHandshake, Library, FlaskConical, Globe, Leaf,
  Trophy, Star,
  type LucideIcon,
} from "lucide-react";

// ───── Feature data ─────
interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
  category: string;
}

const allFeatures: Feature[] = [
  { icon: Award, title: "Board Affiliated", desc: "Officially Registered & Affiliated with BISE Gujranwala, ensuring recognized certification.", category: "Academic Excellence" },
  { icon: Users, title: "1:16 Student-Teacher Ratio", desc: "Small class sizes ensure every student gets personalized attention and guidance.", category: "Academic Excellence" },
  { icon: GraduationCap, title: "Teacher Mentorship", desc: "Junior teachers undergo structured apprenticeships under educators with 15+ years experience.", category: "Academic Excellence" },
  { icon: BookOpen, title: "Oxford Collaboration", desc: "Academic collaboration with Oxford University Press since 2021 for world-class curriculum.", category: "Academic Excellence" },
  { icon: FlaskConical, title: "Science & AI Labs", desc: "Fully equipped labs and a 60% practical, activity-based AI curriculum without traditional textbooks.", category: "Academic Excellence" },
  { icon: Lightbulb, title: "Top Board Results", desc: "Consistent academic excellence reflecting the top Matric Board results in the area.", category: "Academic Excellence" },
  { icon: Sun, title: "Solar-Powered Campus", desc: "Eco-friendly environment ensuring uninterrupted learning regardless of power cuts.", category: "Campus & Tech" },
  { icon: Cpu, title: "Advanced IT Infrastructure", desc: "High-performance quad-core systems with 15 TB secure school cloud storage.", category: "Campus & Tech" },
  { icon: ShieldCheck, title: "24/7 Secure Campus", desc: "Controlled entry/exit monitored by trained staff for complete student safety.", category: "Campus & Tech" },
  { icon: Leaf, title: "Healthy Environment", desc: "Filtered water, ventilated classrooms for summer, and insulated spaces for winter.", category: "Campus & Tech" },
  { icon: Library, title: "Well-Stocked Library", desc: "A rich collection of resources to cultivate reading habits and independent learning.", category: "Campus & Tech" },
  { icon: HeartHandshake, title: "Holistic Assessment", desc: "Progress measured academically, psychologically, behaviorally, and environmentally.", category: "Student Care" },
  { icon: Users, title: "Support for Slow Learners", desc: "Individualized care and structured parent-teacher communication for students needing extra help.", category: "Student Care" },
  { icon: Mic, title: "Public Speaking", desc: "Daily assembly practice to build confidence, communication skills, and leadership.", category: "Student Care" },
  { icon: Globe, title: "English Environment", desc: "Active promotion of English speaking across campus to prepare global citizens.", category: "Student Care" },
  { icon: Award, title: "Competitions & Events", desc: "Regular debates, quizzes, and purpose-driven events aligned with the national calendar.", category: "Student Care" },
];

// ───── Distinction holders ─────
interface Achiever { name: string; year: number; rollNo: string; marks: number; }

const allAchievers: Achiever[] = [
  { name: "Saqib Zafar", year: 2010, rollNo: "—", marks: 899 },
  { name: "Faizan Shafique", year: 2010, rollNo: "—", marks: 834 },
  { name: "Hafiz Faizan Azam", year: 2010, rollNo: "—", marks: 822 },
  { name: "Gul-e-Saman", year: 2012, rollNo: "405130", marks: 842 },
  { name: "Rehan Asif", year: 2012, rollNo: "431818", marks: 804 },
  { name: "Friha Kanwal", year: 2012, rollNo: "405128", marks: 798 },
  { name: "Malik Usama Mehmood", year: 2013, rollNo: "441421", marks: 831 },
  { name: "Hassan Mehmood", year: 2013, rollNo: "441420", marks: 816 },
  { name: "Furhan Ansar", year: 2013, rollNo: "441433", marks: 792 },
  { name: "Tahir Akbar", year: 2014, rollNo: "453224", marks: 762 },
  { name: "Ayesha Siddiqa", year: 2014, rollNo: "404150", marks: 760 },
  { name: "Faiza Mushtaq", year: 2014, rollNo: "404151", marks: 760 },
  { name: "Hafsa Asif", year: 2015, rollNo: "404709", marks: 912 },
  { name: "Tehreem Naz", year: 2016, rollNo: "422042", marks: 990 },
  { name: "Saffa Irfan", year: 2016, rollNo: "421884", marks: 912 },
  { name: "Zahdan Khalid", year: 2016, rollNo: "405552", marks: 856 },
  { name: "Dua Cheema", year: 2016, rollNo: "421353", marks: 835 },
  { name: "Ali Hassan Hussain", year: 2017, rollNo: "416278", marks: 1001 },
  { name: "Hassaan Azam", year: 2017, rollNo: "433765", marks: 938 },
  { name: "Nihad Ahmad Bajwa", year: 2018, rollNo: "406207", marks: 1012 },
  { name: "Haram Khald", year: 2018, rollNo: "118468", marks: 909 },
  { name: "Ali Suleman Butt", year: 2019, rollNo: "413467", marks: 950 },
  { name: "Ali Haider", year: 2019, rollNo: "413219", marks: 950 },
  { name: "Arbab Mushtaq", year: 2020, rollNo: "489996", marks: 970 },
  { name: "Aleena Suleman", year: 2021, rollNo: "508830", marks: 1090 },
  { name: "Adan Irfan", year: 2021, rollNo: "508824", marks: 1075 },
  { name: "Hassan Butt", year: 2021, rollNo: "404726", marks: 938 },
  { name: "Ibrar Hussain Butt", year: 2022, rollNo: "403416", marks: 1005 },
  { name: "Hajra Asif", year: 2022, rollNo: "483997", marks: 958 },
];

const topAchievers = allAchievers.filter((a) => a.marks >= 1000).sort((a, b) => b.marks - a.marks);
const otherAchievers = allAchievers.filter((a) => a.marks < 1000).sort((a, b) => b.marks - a.marks);

// ───── Color map ─────
const categoryColors: Record<string, { bg: string; text: string; accent: string; glow: string }> = {
  "Academic Excellence": { bg: "bg-emerald-500/10", text: "text-emerald-400", accent: "from-emerald-500 to-teal-400", glow: "shadow-emerald-500/20" },
  "Campus & Tech": { bg: "bg-sky-500/10", text: "text-sky-400", accent: "from-sky-500 to-blue-400", glow: "shadow-sky-500/20" },
  "Student Care": { bg: "bg-amber-500/10", text: "text-amber-400", accent: "from-amber-500 to-orange-400", glow: "shadow-amber-500/20" },
};

// ───── Feature Card ─────
function FeatureCard({ feature }: { feature: Feature }) {
  const colors = categoryColors[feature.category] ?? categoryColors["Academic Excellence"]!;
  return (
    <div className="group relative flex-shrink-0 w-[280px] sm:w-[310px]">
      <div className={`relative h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl p-6 transition-all duration-500 hover:bg-white/[0.09] hover:border-white/15 hover:shadow-xl ${colors.glow} hover:-translate-y-1`}>
        <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${colors.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        <span className={`inline-block mb-4 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.15em] ${colors.bg} ${colors.text} border border-white/5`}>
          {feature.category}
        </span>
        <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${colors.accent} shadow-lg ${colors.glow} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-2`}>
          <feature.icon className="h-6 w-6 text-white" strokeWidth={1.8} />
        </div>
        <h3 className="mb-2 text-base font-bold text-white leading-snug">{feature.title}</h3>
        <p className="text-[13px] leading-relaxed text-white/50 group-hover:text-white/70 transition-colors duration-300">{feature.desc}</p>
        <div className={`absolute -bottom-16 -right-16 h-32 w-32 rounded-full bg-gradient-to-br ${colors.accent} opacity-0 blur-3xl group-hover:opacity-[0.06] transition-opacity duration-700`} />
      </div>
    </div>
  );
}

// ───── Marquee Row ─────
function MarqueeRow({ features, direction = "left", speed = 35 }: { features: Feature[]; direction?: "left" | "right"; speed?: number }) {
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
        style={{ animation: `marquee-${direction} ${speed}s linear infinite` }}
      >
        {duplicated.map((feature, i) => (
          <FeatureCard key={`${direction}-${i}`} feature={feature} />
        ))}
      </div>
    </div>
  );
}

// ───── Top Achiever Hero Card (1000+ marks) ─────
function TopAchieverCard({ achiever, index }: { achiever: Achiever; index: number }) {
  const isFirst = index === 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
      className={`group relative overflow-hidden rounded-2xl border backdrop-blur-xl transition-all duration-500 hover:-translate-y-1
        ${isFirst
          ? "border-amber-400/25 bg-gradient-to-br from-amber-500/[0.1] via-yellow-500/[0.04] to-transparent hover:shadow-xl shadow-amber-400/10 md:col-span-2 lg:col-span-1"
          : "border-amber-400/15 bg-white/[0.04] hover:shadow-lg shadow-amber-400/5"
        }`}
    >
      {/* Top accent */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 ${isFirst ? "opacity-70" : "opacity-40 group-hover:opacity-70"} transition-opacity duration-500`} />

      <div className="p-5 md:p-6">
        <div className="flex items-center gap-4">
          {/* Trophy icon */}
          <div className={`flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-500 shadow-lg shadow-amber-400/25 transition-transform duration-300 group-hover:scale-110 ${isFirst ? "h-14 w-14" : "h-11 w-11"}`}>
            <Trophy className={`text-white ${isFirst ? "h-7 w-7" : "h-5 w-5"}`} strokeWidth={1.8} />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-[10px] uppercase tracking-[0.18em] text-amber-400/60 font-semibold mb-0.5">
              {isFirst ? "★ Highest Scorer" : "Top Achiever"} — {achiever.year}
            </p>
            <h4 className={`font-bold text-white truncate ${isFirst ? "text-lg md:text-xl" : "text-base"}`}>
              {achiever.name}
            </h4>
            {achiever.rollNo !== "—" && (
              <p className="text-[17px] text-white/90 font-mono mt-0.5">Roll # {achiever.rollNo}</p>
            )}
          </div>

          {/* Marks */}
          <div className="text-right shrink-0">
            <span className={`font-black tabular-nums bg-gradient-to-r from-amber-300 to-yellow-500 bg-clip-text text-transparent leading-none ${isFirst ? "text-3xl md:text-4xl" : "text-2xl"}`}>
              {achiever.marks}
            </span>
            <p className="text-[9px] text-white/30 uppercase tracking-wider mt-0.5">marks</p>
          </div>
        </div>
      </div>

      {/* Ambient glow */}
      <div className="absolute -bottom-16 -right-16 h-32 w-32 rounded-full bg-amber-400/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
    </motion.div>
  );
}

// ───── Achiever marquee card (compact) ─────
function AchieverChip({ achiever }: { achiever: Achiever }) {
  return (
    <div className="group flex-shrink-0 flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl px-4 py-3 transition-all duration-300 hover:bg-white/[0.09] hover:border-white/15 hover:-translate-y-0.5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-400 shadow shadow-emerald-500/20">
        <Star className="h-4 w-4 text-white" strokeWidth={2} />
      </div>
      <div className="min-w-0">
        <p className="text-xl font-semibold text-white truncate">{achiever.name}</p>
        <p className="text-[15px] text-white/85">{achiever.year}</p>
      </div>
      <span className="ml-auto text-3xl font-bold tabular-nums text-emerald-400">{achiever.marks}</span>
    </div>
  );
}

// ───── Main Section ─────
export function FeaturesSection() {
  const row1 = allFeatures.slice(0, 8);
  const row2 = allFeatures.slice(8);
  const achieversDuplicated = [...otherAchievers, ...otherAchievers];

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0a1628 0%, #0d2137 35%, #0a2e1f 65%, #0c1a2e 100%)",
      }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Floating orbs */}
      <div className="absolute top-20 left-[10%] h-[400px] w-[400px] rounded-full bg-emerald-500/[0.05] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-[15%] h-[350px] w-[350px] rounded-full bg-sky-500/[0.05] blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-amber-500/[0.03] blur-[150px] pointer-events-none" />

      <div className="relative py-20 md:py-28">
        {/* ── Header ── */}
        <div className="container mx-auto px-4 md:px-6 mb-14">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: "easeOut" }} className="max-w-2xl">
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xl font-semibold uppercase tracking-[0.2em] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
              Why Choose MSNS
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
              Built for{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400 bg-clip-text text-transparent">Excellence</span>
            </h2>
            <p className="mt-4 text-base md:text-lg text-white/45 max-w-xl leading-relaxed">
              Academic rigor, modern infrastructure, and personalized care — at the lowest fee structure in Gakkhar.
            </p>
          </motion.div>
        </div>

        {/* ── Feature marquee rows ── */}
        <div className="space-y-5">
          <MarqueeRow features={row1} direction="left" speed={30} />
          <MarqueeRow features={row2} direction="right" speed={35} />
        </div>

        {/* ── Stats bar ── */}
        <div className="container mx-auto px-4 md:px-6 mt-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="flex flex-wrap justify-center gap-8 md:gap-16 py-8 border-t border-white/[0.06]">
            {[
              { value: "16+", label: "Years of Excellence" },
              { value: "1:16", label: "Student-Teacher Ratio" },
              { value: "100%", label: "Board Results" },
              { value: "15TB", label: "Cloud Storage" },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.1 }} className="text-center">
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">{stat.value}</div>
                <div className="mt-1 text-xs text-white/40 uppercase tracking-wider font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ════════════════════════════════════════════════
            ── ACHIEVEMENTS & DISTINCTIONS ──
            ════════════════════════════════════════════════ */}
        <div className="container mx-auto px-4 md:px-6 mt-24">
          {/* Section sub-header */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-2xl mb-10">
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xl font-semibold uppercase tracking-[0.2em] text-amber-400 bg-amber-500/10 border border-amber-500/20">
              Board Toppers
            </span>
            <h3 className="text-3xl md:text-4xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
              Hall of{" "}
              <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">Distinctions</span>
            </h3>
            <p className="mt-3 text-lg md:text-xl text-white/40 max-w-lg leading-relaxed">
              Celebrating our brightest minds who scored <strong className="text-amber-400/80">1000+ marks</strong> in Matric Board examinations.
            </p>
          </motion.div>

          {/* Top achievers (1000+) — hero cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {topAchievers.map((achiever, i) => (
              <TopAchieverCard key={achiever.rollNo} achiever={achiever} index={i} />
            ))}
          </div>
        </div>

        {/* All other distinction holders — horizontal marquee */}
        <div className="mt-2">
          <div className="container mx-auto px-4 md:px-6 mb-4">
            <p className="text-xl uppercase tracking-[0.2em] text-white/80 font-semibold">
              All Distinction Holders · 2010 – 2022
            </p>
          </div>
          <div
            className="relative overflow-hidden group/achievers"
            style={{
              maskImage: "linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%)",
            }}
          >
            <div
              className="flex gap-3 w-max group-hover/achievers:[animation-play-state:paused]"
              style={{ animation: "marquee-left 50s linear infinite" }}
            >
              {achieversDuplicated.map((a, i) => (
                <AchieverChip key={`ach-${i}`} achiever={a} />
              ))}
            </div>
          </div>
        </div>

        {/* Achievement stats */}
        <div className="container mx-auto px-4 md:px-6 mt-14">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="flex flex-wrap justify-center gap-8 md:gap-16 py-8 border-t border-white/[0.06]">
            {[
              { value: "29+", label: "Distinction Holders" },
              { value: "1090", label: "Highest Score" },
              { value: `${topAchievers.length}`, label: "Scored 1000+" },
              { value: "2010–2022", label: "Legacy of Excellence" },
            ].map((stat, i) => (
              <motion.div key={`ach-stat-${i}`} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.1 }} className="text-center">
                <div className="text-4xl md:text-4xl font-bold bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">{stat.value}</div>
                <div className="mt-1 text-2xl text-white/80 uppercase tracking-wider font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
