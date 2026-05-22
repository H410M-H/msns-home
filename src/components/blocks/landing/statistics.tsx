"use client"

import { motion } from "framer-motion"
import { BookOpen, Users, Trophy, Lightbulb } from "lucide-react"
import { Card, CardContent } from "~/components/ui/card"

export const KeyStatistics = () => {
  const stats = [
    { icon: BookOpen, label: "AP Courses", value: "15+", color: "text-purple-600" },
    { icon: Users, label: "Student-Teacher Ratio", value: "18:1", color: "text-teal-600" },
    { icon: Trophy, label: "State Championships", value: "25", color: "text-amber-600" },
    { icon: Lightbulb, label: "Clubs & Activities", value: "50+", color: "text-emerald-600" },
  ]

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-16 bg-gradient-to-r from-emerald-950 via-emerald-800 to-teal-900 bg-clip-text text-transparent drop-shadow-sm">
          MSNS by the Numbers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
              <Card className="h-full bg-white/80 border border-emerald-100/50 hover:border-emerald-500/30 hover:bg-white transition-all duration-300 shadow-[0_10px_35px_-15px_rgba(16,185,129,0.05)] hover:shadow-[0_15px_40px_rgba(16,185,129,0.08)] rounded-2xl">
                <CardContent className="flex flex-col items-center justify-center h-full p-8">
                  <motion.div whileHover={{ scale: 1.15, rotate: 360 }} transition={{ type: "spring", stiffness: 200 }}>
                    <stat.icon className={`w-14 h-14 mb-6 ${stat.color}`} />
                  </motion.div>
                  <h3 className="text-4xl md:text-5xl font-serif font-bold mb-4 bg-gradient-to-r from-emerald-950 via-emerald-800 to-teal-900 bg-clip-text text-transparent">
                    {stat.value}
                  </h3>
                  <p className="text-slate-600 text-center text-base tracking-wide font-medium">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

