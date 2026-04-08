"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Trophy, Zap, Globe, GraduationCap } from 'lucide-react'

interface AchievementCard {
  id: number
  title: string
  stat: string
  description: string
  icon: React.ReactNode
  color: string
  gradient: string
}

const achievements: AchievementCard[] = [
  {
    id: 1,
    title: 'National Toppers',
    stat: '5+',
    description: 'Students ranking in top 10 across multiple boards',
    icon: <Trophy className="w-8 h-8" />,
    color: 'from-yellow-400 to-orange-500',
    gradient: 'from-yellow-50 to-orange-50'
  },
  {
    id: 2,
    title: 'Pass Rate',
    stat: '95%',
    description: 'Exceptional board exam success rate',
    icon: <Zap className="w-8 h-8" />,
    color: 'from-blue-400 to-cyan-500',
    gradient: 'from-blue-50 to-cyan-50'
  },
  {
    id: 3,
    title: 'University Placement',
    stat: '98%',
    description: 'Alumni studying at top universities worldwide',
    icon: <Globe className="w-8 h-8" />,
    color: 'from-purple-400 to-pink-500',
    gradient: 'from-purple-50 to-pink-50'
  },
  {
    id: 4,
    title: 'Success Stories',
    stat: '500+',
    description: 'Alumni excelling in diverse career paths',
    icon: <GraduationCap className="w-8 h-8" />,
    color: 'from-green-400 to-emerald-500',
    gradient: 'from-green-50 to-emerald-50'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export function SuccessStoriesSection() {
  return (
    <section className="py-20 px-4 md:px-8 bg-white">
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
            Our Success Stories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Witness the achievements and milestones that define M.S. Naz High School's commitment to excellence
          </p>
        </motion.div>

        {/* Achievement Cards Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {achievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              variants={itemVariants}
              className="group relative"
            >
              {/* Card Background */}
              <div className={`bg-gradient-to-br ${achievement.gradient} rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300`}>
                {/* Icon Container */}
                <motion.div
                  className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${achievement.color} text-white mb-6 group-hover:scale-110 transition-transform`}
                  whileHover={{ rotate: 360, scale: 1.15 }}
                  transition={{ duration: 0.6 }}
                >
                  {achievement.icon}
                </motion.div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="mb-4"
                >
                  <p className={`text-5xl font-bold bg-gradient-to-r ${achievement.color} bg-clip-text text-transparent`}>
                    {achievement.stat}
                  </p>
                </motion.div>

                {/* Title & Description */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {achievement.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {achievement.description}
                </p>

                {/* Bottom accent line */}
                <motion.div
                  className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${achievement.color}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Detailed Success Highlights */}
        <motion.div
          className="grid md:grid-cols-2 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Left Column - Key Achievements */}
          <motion.div
            className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-8 border border-emerald-200"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-1 h-8 bg-gradient-to-b from-green-600 to-emerald-500 rounded-full" />
              Board Excellence
            </h3>
            <ul className="space-y-4">
              {[
                'Consistent top positions in BISE board exams',
                'All-stream excellence across science, commerce & humanities',
                'Average score improvement of 15% year-over-year',
                'Zero dropouts in final exams'
              ].map((item, idx) => (
                <motion.li
                  key={idx}
                  className="flex items-start gap-3 text-gray-700"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right Column - Career & Alumni */}
          <motion.div
            className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8 border border-cyan-200"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-1 h-8 bg-gradient-to-b from-blue-600 to-cyan-500 rounded-full" />
              Alumni Success
            </h3>
            <ul className="space-y-4">
              {[
                'Enrolled in world-renowned universities (Oxford, Cambridge, MIT)',
                'Pursuing diverse careers: Medicine, Engineering, Business, Law',
                'Active alumni network supporting current students',
                'Featured in national and international achievement records'
              ].map((item, idx) => (
                <motion.li
                  key={idx}
                  className="flex items-start gap-3 text-gray-700"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
