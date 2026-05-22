"use client"

import { motion } from "framer-motion"
import { BookOpen, Users, Trophy, Lightbulb } from "lucide-react"
import { Card, CardContent } from "~/components/ui/card"

export const KeyStatistics = () => {
  const stats = [
    { icon: BookOpen, label: "AP Courses", value: "15+", color: "text-purple-400/90" },
    { icon: Users, label: "Student-Teacher Ratio", value: "18:1", color: "text-teal-400/90" },
    { icon: Trophy, label: "State Championships", value: "25", color: "text-amber-400/90" },
    { icon: Lightbulb, label: "Clubs & Activities", value: "50+", color: "text-emerald-400/90" },
  ]

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-16 bg-gradient-to-r from-emerald-100 via-emerald-300 to-teal-100 bg-clip-text text-transparent">
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
              <Card className="h-full bg-white/[0.02] backdrop-blur-md border border-white/5 hover:border-emerald-500/30 hover:bg-white/[0.05] transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] rounded-2xl">
                <CardContent className="flex flex-col items-center justify-center h-full p-8">
                  <motion.div whileHover={{ scale: 1.15, rotate: 360 }} transition={{ type: "spring", stiffness: 200 }}>
                    <stat.icon className={`w-14 h-14 mb-6 ${stat.color}`} />
                  </motion.div>
                  <h3 className="text-4xl md:text-5xl font-serif font-bold mb-4 bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
                    {stat.value}
                  </h3>
                  <p className="text-slate-300 text-center text-base tracking-wide font-light">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

