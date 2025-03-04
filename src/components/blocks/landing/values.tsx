"use client"

import { motion } from "framer-motion"
import { Button } from "~/components/ui/button"
import { Card, CardContent } from "~/components/ui/card"

interface SchoolValuesProps {
  expandedValue: number | null
  setExpandedValue: (value: number | null) => void
}

export default function SchoolValues({ expandedValue, setExpandedValue }: SchoolValuesProps) {
  const values = [
    {
      title: "Excellence",
      description: "We strive for excellence in all aspects of education and personal development.",
      details:
        "Our commitment to excellence is reflected in our rigorous academic programs, state-of-the-art facilities, and highly qualified faculty.",
      gradient: "from-purple-600 to-blue-500",
    },
    {
      title: "Integrity",
      description: "We foster honesty, ethics, and accountability in all our interactions.",
      details:
        "We believe that integrity is the foundation of character development and essential for creating a respectful and trustworthy community.",
      gradient: "from-emerald-600 to-teal-500",
    },
    {
      title: "Innovation",
      description: "We embrace creativity, critical thinking, and forward-looking approaches to education.",
      details:
        "Our innovative teaching methods and curriculum prepare students for the challenges of a rapidly changing world and inspire them to become problem-solvers.",
      gradient: "from-amber-600 to-orange-500",
    },
  ]

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-green-300 to-emerald-400 bg-clip-text text-transparent">
          Our Core Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 100,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-gradient-to-br from-slate-800 to-slate-900/50 border border-white/10 hover:border-blue-400/30 transition-all group">
                <CardContent className="p-8 flex flex-col h-full">
                  <div className={`w-full h-2 mb-6 rounded-full bg-gradient-to-r ${value.gradient}`} />
                  <h3 className="text-2xl font-bold mb-4 text-slate-100">{value.title}</h3>
                  <p className="text-slate-300 mb-6 flex-grow">{value.description}</p>

                  <motion.div
                    initial={false}
                    animate={{
                      height: expandedValue === index ? "auto" : 0,
                      opacity: expandedValue === index ? 1 : 0,
                    }}
                    className="overflow-hidden"
                  >
                    <p className="text-slate-400 text-sm pb-4">{value.details}</p>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="self-end">
                    <Button
                      variant="ghost"
                      className="text-blue-400 hover:bg-blue-400/10 rounded-full"
                      onClick={() => setExpandedValue(expandedValue === index ? null : index)}
                    >
                      {expandedValue === index ? "Show Less" : "Learn More"}
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

