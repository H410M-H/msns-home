"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FlaskConical, Cpu, BookOpen, Award, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '~/components/ui/button'

interface Program {
  id: number
  title: string
  category: string
  description: string
  highlights: string[]
  icon: React.ReactNode
  color: string
  image?: string
}

const programs: Program[] = [
  {
    id: 1,
    title: 'Science Labs & Research',
    category: 'STEM Excellence',
    description: '60% practical, activity-based learning with state-of-the-art laboratory facilities',
    highlights: [
      'Advanced physics & chemistry labs',
      'Biology center with modern equipment',
      'Research project mentorship',
      'Inter-school science competitions'
    ],
    icon: <FlaskConical className="w-10 h-10" />,
    color: 'from-cyan-500 to-blue-600',
    image: 'https://res.cloudinary.com/dvvbxrs55/image/upload/w_600,h_400,c_fill,q_auto,f_auto/v1761398991/IMG_3045_rrwon6.jpg'
  },
  {
    id: 2,
    title: 'AI Curriculum & Tech Labs',
    category: 'Innovation Hub',
    description: 'Cutting-edge artificial intelligence program with industry-standard tools and expert guidance',
    highlights: [
      'AI/ML fundamentals & applications',
      'Robotics & automation projects',
      'Coding bootcamp & competitions',
      'Tech internship opportunities'
    ],
    icon: <Cpu className="w-10 h-10" />,
    color: 'from-purple-500 to-pink-600',
    image: 'https://res.cloudinary.com/dvvbxrs55/image/upload/w_600,h_400,c_fill,q_auto,f_auto/v1761399399/POSTER_vb1tvs.jpg'
  },
  {
    id: 3,
    title: 'Oxford University Partnership',
    category: 'Advanced Learning',
    description: 'Collaborative curriculum with Oxford University Press for world-class academic standards',
    highlights: [
      'Oxford-aligned curriculum content',
      'Advanced study materials',
      'Virtual lectures from experts',
      'International exam preparation'
    ],
    icon: <BookOpen className="w-10 h-10" />,
    color: 'from-amber-500 to-orange-600',
    image: 'https://res.cloudinary.com/dvvbxrs55/image/upload/w_600,h_400,c_fill,q_auto,f_auto/v1761399166/IMG_3360_h9xvsz.jpg'
  },
  {
    id: 4,
    title: 'Leadership Development',
    category: 'Personal Growth',
    description: 'Comprehensive program developing future leaders through mentorship, workshops, and real-world challenges',
    highlights: [
      'Executive coaching programs',
      'Public speaking & debating',
      'Team project leadership',
      'Alumni mentor network'
    ],
    icon: <Award className="w-10 h-10" />,
    color: 'from-green-500 to-emerald-600',
    image: 'https://res.cloudinary.com/dvvbxrs55/image/upload/w_600,h_400,c_fill,q_auto,f_auto/v1761398687/IMG_3101_tib63s.jpg'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export function ProgramsHighlightSection() {
  const [selectedProgram, setSelectedProgram] = useState<number | null>(null)

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-white to-emerald-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
            Featured Programs
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our signature programs designed to foster excellence and innovation
          </p>
        </motion.div>

        {/* Programs Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {programs.map((program) => (
            <motion.div
              key={program.id}
              variants={itemVariants}
              className="group cursor-pointer"
              onClick={() => setSelectedProgram(selectedProgram === program.id ? null : program.id)}
            >
              <motion.div
                className={`bg-gradient-to-br ${program.color} p-0.5 rounded-2xl h-full`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white rounded-[14px] overflow-hidden h-full flex flex-col">
                  {/* Program Image */}
                  {program.image && (
                    <div className="h-48 overflow-hidden relative bg-gray-200">
                      <motion.img
                        src={program.image}
                        alt={program.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${program.color} opacity-0 group-hover:opacity-20 transition-opacity`} />
                    </div>
                  )}

                  {/* Program Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <motion.div
                        className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${program.color} text-white group-hover:scale-110 transition-transform`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        {program.icon}
                      </motion.div>
                      <span className="text-xs font-semibold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
                        {program.category}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {program.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-6 flex-grow">
                      {program.description}
                    </p>

                    {/* Highlights List - Expandable */}
                    <AnimatePresence>
                      {selectedProgram === program.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mb-6 space-y-2"
                        >
                          {program.highlights.map((highlight, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.08 }}
                              className="flex items-start gap-2 text-sm text-gray-700"
                            >
                              <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${program.color} mt-1.5 flex-shrink-0`} />
                              <span>{highlight}</span>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* CTA Link */}
                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center justify-between pt-4 border-t border-gray-100"
                    >
                      <span className={`text-sm font-semibold bg-gradient-to-r ${program.color} bg-clip-text text-transparent`}>
                        {selectedProgram === program.id ? 'Show Less' : 'Learn More'}
                      </span>
                      <motion.div
                        animate={{ rotate: selectedProgram === program.id ? 90 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronRight className={`w-5 h-5 bg-gradient-to-r ${program.color} bg-clip-text text-transparent`} />
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Programs Teaser */}
        <motion.div
          className="bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-2xl p-8 md:p-12 border border-emerald-200 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            And Much More...
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Sports programs, arts & culture, community service initiatives, and specialized coaching for competitive exams
          </p>
          <Link href="/programs">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105">
              Explore All Programs <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
