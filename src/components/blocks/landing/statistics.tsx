"use client";

import { motion } from "framer-motion";
import { BookOpen, Users, Trophy, Lightbulb } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";

export const KeyStatistics = () => {
  const stats = [
    {
      icon: BookOpen,
      label: "Academic Curricula",
      value: "Oxford & Matric",
      color: "text-purple-600",
    },
    {
      icon: Users,
      label: "Student-Teacher Ratio",
      value: "1:16",
      color: "text-teal-600",
    },
    {
      icon: Trophy,
      label: "Board & Regional Distinctions",
      value: "50+",
      color: "text-amber-600",
    },
    {
      icon: Lightbulb,
      label: "Practical AI & STEM Focus",
      value: "60% Labs",
      color: "text-emerald-600",
    },
  ];

  return (
    <section className="relative py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="mb-16 bg-gradient-to-r from-emerald-950 via-emerald-800 to-teal-900 bg-clip-text text-center font-serif text-4xl font-bold text-transparent drop-shadow-sm md:text-5xl">
          MSNS by the Numbers
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                delay: index * 0.15,
              }}
              viewport={{ once: true }}
            >
              <Card className="h-full rounded-2xl border border-emerald-100/50 bg-white/80 shadow-[0_10px_35px_-15px_rgba(16,185,129,0.05)] transition-all duration-300 hover:border-emerald-500/30 hover:bg-white hover:shadow-[0_15px_40px_rgba(16,185,129,0.08)]">
                <CardContent className="flex h-full flex-col items-center justify-center p-8">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <stat.icon className={`mb-6 h-14 w-14 ${stat.color}`} />
                  </motion.div>
                  <h3 className="mb-4 bg-gradient-to-r from-emerald-950 via-emerald-800 to-teal-900 bg-clip-text font-serif text-4xl font-bold text-transparent md:text-5xl">
                    {stat.value}
                  </h3>
                  <p className="text-center text-base font-medium tracking-wide text-slate-600">
                    {stat.label}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
