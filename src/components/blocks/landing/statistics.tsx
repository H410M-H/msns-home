"use client"

import { motion } from "framer-motion"
import { BookOpen, Users, Trophy, Lightbulb } from "lucide-react"
import { Card, CardContent } from "~/components/ui/card"

export const KeyStatistics = () => {
  const stats = [
    { icon: BookOpen, label: "AP Courses", value: "15+", color: "text-purple-400" },
    { icon: Users, label: "Student-Teacher Ratio", value: "18:1", color: "text-teal-400" },
    { icon: Trophy, label: "State Championships", value: "25", color: "text-amber-400" },
    { icon: Lightbulb, label: "Clubs & Activities", value: "50+", color: "text-pink-400" },
  ]

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 bg-linear-to-r from-green-300 to-emerald-400 bg-clip-text text-transparent">
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
              <Card className="h-full bg-white/40 backdrop-blur-md border border-white/40 hover:border-blue-400/30 transition-all shadow-lg hover:shadow-xl">
                <CardContent className="flex flex-col items-center justify-center h-full p-8">
                  <motion.div whileHover={{ scale: 1.2, rotate: 360 }} transition={{ type: "spring" }}>
                    <stat.icon className={`w-16 h-16 mb-6 ${stat.color}`} />
                  </motion.div>
                  <h3 className="text-4xl font-bold mb-4 bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {stat.value}
                  </h3>
                  <p className="text-slate-700 text-center text-lg">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

