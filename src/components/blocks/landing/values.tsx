"use client"

import { motion } from "framer-motion"
import { Button } from "~/components/ui/button"
import { Card, CardContent } from "~/components/ui/card"

interface SchoolValuesProps {
  expandedValue: number | null
  setExpandedValue: (value: number | null) => void
}

export const SchoolValues = ({ expandedValue, setExpandedValue }: SchoolValuesProps) => {
  const values = [
    {
      title: "Excellence",
      description: "We strive for excellence in all aspects of education and personal development.",
      details:
        "Our commitment to excellence is reflected in our rigorous academic programs, state-of-the-art facilities, and highly qualified faculty.",
      gradient: "from-emerald-500 to-teal-400",
    },
    {
      title: "Integrity",
      description: "We foster honesty, ethics, and accountability in all our interactions.",
      details:
        "We believe that integrity is the foundation of character development and essential for creating a respectful and trustworthy community.",
      gradient: "from-teal-400 to-cyan-400",
    },
    {
      title: "Innovation",
      description: "We embrace creativity, critical thinking, and forward-looking approaches to education.",
      details:
        "Our innovative teaching methods and curriculum prepare students for the challenges of a rapidly changing world and inspire them to become problem-solvers.",
      gradient: "from-emerald-400 to-green-500",
    },
  ]

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-16 bg-gradient-to-r from-emerald-100 via-emerald-300 to-teal-100 bg-clip-text text-transparent">
          Our Core Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 100,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white/[0.02] backdrop-blur-md border border-white/5 hover:border-emerald-500/30 transition-all duration-300 group shadow-lg hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] rounded-2xl">
                <CardContent className="p-8 flex flex-col h-full">
                  <div className={`w-full h-1.5 mb-6 rounded-full bg-gradient-to-r ${value.gradient}`} />
                  <h3 className="text-2xl font-serif font-semibold mb-4 text-white">{value.title}</h3>
                  <p className="text-slate-300 mb-6 grow font-light leading-relaxed">{value.description}</p>

                  <motion.div
                    initial={false}
                    animate={{
                      height: expandedValue === index ? "auto" : 0,
                      opacity: expandedValue === index ? 1 : 0,
                    }}
                    className="overflow-hidden"
                  >
                    <p className="text-slate-400 text-sm pb-4 font-light leading-relaxed">{value.details}</p>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="self-end mt-4">
                    <Button
                      variant="ghost"
                      className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 rounded-full font-medium"
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

