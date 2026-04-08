"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, TrendingUp, Users, Award } from 'lucide-react'
import Link from 'next/link'
import { Button } from '~/components/ui/button'

interface MarketingMessage {
  id: number
  title: string
  subtitle: string
  icon: React.ReactNode
  color: string
  stat: string
}

const messages: MarketingMessage[] = [
  {
    id: 1,
    title: 'Award-Winning Excellence',
    subtitle: 'Ranked among top institutions in the region',
    icon: <Award className="w-12 h-12" />,
    color: 'from-emerald-500 to-teal-500',
    stat: '#1 in Board Results'
  },
  {
    id: 2,
    title: '500+ Success Stories',
    subtitle: 'Our alumni thrive in top universities worldwide',
    icon: <Users className="w-12 h-12" />,
    color: 'from-cyan-500 to-blue-500',
    stat: '95% University Placement'
  },
  {
    id: 3,
    title: 'Top Board Results 2024',
    subtitle: 'Exceptional performance across all streams',
    icon: <TrendingUp className="w-12 h-12" />,
    color: 'from-orange-500 to-pink-500',
    stat: '5 National Toppers'
  },
  {
    id: 4,
    title: 'Innovation Hub Campus',
    subtitle: 'AI Labs, Science Centers & Tech Infrastructure',
    icon: <Sparkles className="w-12 h-12" />,
    color: 'from-purple-500 to-indigo-500',
    stat: '100% Solar Powered'
  }
]

export function MarketingBannerSection() {
  const [currentMessage, setCurrentMessage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const current = messages[currentMessage]

  return (
    <section className="relative py-16 px-4 md:px-8 overflow-hidden bg-gray-900">
      {/* Animated Background with 3D Effect */}
      <div className="absolute inset-0">
        {/* Gradient mesh background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 via-gray-900 to-gray-900" />
        
        {/* Animated geometric shapes */}
        <motion.div
          className="absolute top-10 right-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-64 h-64 bg-emerald-600/10 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 0.5 }}
        />
      </div>

      {/* Content Container */}
      <div className="relative max-w-6xl mx-auto z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className={`text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r ${current.color} bg-clip-text text-transparent`}>
                {current.title}
              </h2>
            </motion.div>

            <motion.p
              key={`subtitle-${current.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-gray-300 mb-8 leading-relaxed"
            >
              {current.subtitle}
            </motion.p>

            {/* Stats */}
            <motion.div
              key={`stat-${current.id}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`bg-gradient-to-r ${current.color} p-0.5 rounded-xl mb-8 w-fit`}
            >
              <div className="bg-gray-900 px-6 py-4 rounded-[10px]">
                <p className="text-sm text-gray-400 mb-1">Our Achievement</p>
                <p className={`text-2xl font-bold bg-gradient-to-r ${current.color} bg-clip-text text-transparent`}>
                  {current.stat}
                </p>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/admission">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full text-lg font-semibold hover:shadow-lg transition-all hover:scale-105">
                  Apply Now
                </Button>
              </Link>
              <Link href="/about">
                <Button className="border-2 border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 px-8 py-3 rounded-full text-lg font-semibold transition-all">
                  Learn More
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Side - Icon & Visual */}
          <motion.div
            className="flex justify-center items-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 0.5, rotateZ: -20 }}
                animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotateZ: 20 }}
                transition={{ duration: 0.6 }}
                className={`bg-gradient-to-br ${current.color} p-12 rounded-3xl shadow-2xl text-white relative`}
              >
                {/* Icon glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-3xl blur-2xl opacity-50"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <div className="relative z-10 flex justify-center">
                  {current.icon}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Navigation Dots */}
        <motion.div
          className="flex justify-center gap-3 mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {messages.map((msg, index) => (
            <motion.button
              key={msg.id}
              onClick={() => setCurrentMessage(index)}
              className={`h-3 rounded-full transition-all ${
                index === currentMessage
                  ? 'bg-emerald-500 w-8'
                  : 'bg-gray-600 w-3 hover:bg-gray-400'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
