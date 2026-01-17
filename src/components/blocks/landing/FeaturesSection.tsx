"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { 
  Award, Users, GraduationCap, BookOpen, Sun, Cpu, 
  ShieldCheck, Mic, Lightbulb, HeartHandshake, 
  Library, FlaskConical, Globe, Leaf
} from "lucide-react";

// --- Data Organization ---
const featuresData = [
  {
    category: "Academic Excellence",
    items: [
      {
        icon: Award,
        title: "Board Affiliated",
        desc: "Officially Registered & Affiliated with BISE Gujranwala, ensuring recognized certification."
      },
      {
        icon: Users,
        title: "1:16 Student-Teacher Ratio",
        desc: "Small class sizes ensure every student gets personalized attention and guidance."
      },
      {
        icon: GraduationCap,
        title: "Teacher Mentorship",
        desc: "Junior teachers undergo structured apprenticeships under educators with 15+ years experience."
      },
      {
        icon: BookOpen,
        title: "Oxford Collaboration",
        desc: "Academic collaboration with Oxford University Press since 2021 for world-class curriculum."
      },
      {
        icon: FlaskConical,
        title: "Science & AI Labs",
        desc: "Fully equipped labs and a 60% practical, activity-based AI curriculum without traditional textbooks."
      },
      {
        icon: Lightbulb,
        title: "Top Board Results",
        desc: "Consistent academic excellence reflecting the top Matric Board results in the area."
      }
    ]
  },
  {
    category: "Campus & Tech",
    items: [
      {
        icon: Sun,
        title: "Solar-Powered Campus",
        desc: "Eco-friendly environment ensuring uninterrupted learning regardless of power cuts."
      },
      {
        icon: Cpu,
        title: "Advanced IT Infrastructure",
        desc: "High-performance quad-core systems with 15 TB secure school cloud storage."
      },
      {
        icon: ShieldCheck,
        title: "24/7 Secure Campus",
        desc: "Controlled entry/exit monitored by trained staff for complete student safety."
      },
      {
        icon: Leaf,
        title: "Healthy Environment",
        desc: "Filtered water, ventilated classrooms for summer, and insulated spaces for winter."
      },
      {
        icon: Library,
        title: "Well-Stocked Library",
        desc: "A rich collection of resources to cultivate reading habits and independent learning."
      }
    ]
  },
  {
    category: "Student Care & Growth",
    items: [
      {
        icon: HeartHandshake,
        title: "Holistic Assessment",
        desc: "Progress measured academically, psychologically, behaviorally, and environmentally."
      },
      {
        icon: Users,
        title: "Support for Slow Learners",
        desc: "Individualized care and structured parent-teacher communication for students needing extra help."
      },
      {
        icon: Mic,
        title: "Public Speaking",
        desc: "Daily assembly practice to build confidence, communication skills, and leadership."
      },
      {
        icon: Globe,
        title: "English Environment",
        desc: "Active promotion of English speaking across campus to prepare global citizens."
      },
      {
        icon: Award,
        title: "Competitions & Events",
        desc: "Regular debates, quizzes, and purpose-driven events aligned with the national calendar."
      }
    ]
  }
];

// --- Animation Variants (Strictly Typed) ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.5, 
      ease: "easeOut" 
    },
  },
};

export function FeaturesSection() {
  return (
    <section className="relative w-full py-20 overflow-hidden bg-slate-50/50">
      {/* Decorative Background Blob */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 h-[500px] w-[500px] rounded-full bg-emerald-100/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-[500px] w-[500px] rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />

      <div className="container relative mx-auto px-4 md:px-6">
        
        {/* Header Section */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl"
          >
            Why Choose <span className="text-emerald-600">MSNS?</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-slate-600 font-medium"
          >
            Academic Excellence • Student Care • Future Readiness
          </motion.p>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-2 text-sm text-slate-500"
          >
            Affordable education with the lowest fee structure in Gakkhar.
          </motion.p>
        </div>

        {/* Categories Loop */}
        <div className="space-y-20">
          {featuresData.map((category, catIndex) => (
            <div key={catIndex}>
              {/* Category Title */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="mb-8 flex items-center gap-4"
              >
                <div className="h-px flex-1 bg-slate-200" />
                <h3 className="text-xl font-bold uppercase tracking-wider text-slate-400">
                  {category.category}
                </h3>
                <div className="h-px flex-1 bg-slate-200" />
              </motion.div>

              {/* Grid for this category */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {category.items.map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-slate-900">
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-600">
                      {feature.desc}
                    </p>
                    
                    {/* Bottom Gradient Line on Hover */}
                    <div className="absolute bottom-0 left-0 h-1 w-0 bg-emerald-500 transition-all duration-300 group-hover:w-full" />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
