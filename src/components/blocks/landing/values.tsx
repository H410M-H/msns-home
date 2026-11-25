"use client";

import { motion } from "framer-motion";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";

interface SchoolValuesProps {
  expandedValue: number | null;
  setExpandedValue: (value: number | null) => void;
}

export const SchoolValues = ({
  expandedValue,
  setExpandedValue,
}: SchoolValuesProps) => {
  const values = [
    {
      title: "Excellence",
      description:
        "We strive for excellence in all aspects of education and personal development.",
      details:
        "Our commitment to excellence is reflected in our rigorous academic programs, state-of-the-art facilities, and highly qualified faculty.",
      gradient: "from-emerald-600 to-teal-500",
    },
    {
      title: "Integrity",
      description:
        "We foster honesty, ethics, and accountability in all our interactions.",
      details:
        "We believe that integrity is the foundation of character development and essential for creating a respectful and trustworthy community.",
      gradient: "from-teal-500 to-cyan-500",
    },
    {
      title: "Innovation",
      description:
        "We embrace creativity, critical thinking, and forward-looking approaches to education.",
      details:
        "Our innovative teaching methods and curriculum prepare students for the challenges of a rapidly changing world and inspire them to become problem-solvers.",
      gradient: "from-emerald-500 to-green-600",
    },
  ];

  return (
    <section className="relative py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="mb-16 bg-gradient-to-r from-emerald-950 via-emerald-800 to-teal-900 bg-clip-text text-center font-serif text-4xl font-bold text-transparent drop-shadow-sm md:text-5xl">
          Our Core Values
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
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
              <Card className="group h-full rounded-2xl border border-emerald-100/50 bg-white/80 shadow-[0_10px_35px_-15px_rgba(16,185,129,0.05)] transition-all duration-300 hover:border-emerald-500/30 hover:shadow-[0_15px_40px_rgba(16,185,129,0.08)]">
                <CardContent className="flex h-full flex-col p-8">
                  <div
                    className={`mb-6 h-1.5 w-full rounded-full bg-gradient-to-r ${value.gradient}`}
                  />
                  <h3 className="mb-4 font-serif text-2xl font-semibold text-emerald-950">
                    {value.title}
                  </h3>
                  <p className="mb-6 grow leading-relaxed font-light text-slate-700">
                    {value.description}
                  </p>

                  <motion.div
                    initial={false}
                    animate={{
                      height: expandedValue === index ? "auto" : 0,
                      opacity: expandedValue === index ? 1 : 0,
                    }}
                    className="overflow-hidden"
                  >
                    <p className="pb-4 text-sm leading-relaxed font-light text-slate-600">
                      {value.details}
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-4 self-end"
                  >
                    <Button
                      variant="ghost"
                      className="rounded-full font-medium text-emerald-700 hover:bg-emerald-500/10 hover:text-emerald-800"
                      onClick={() =>
                        setExpandedValue(expandedValue === index ? null : index)
                      }
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
  );
};
