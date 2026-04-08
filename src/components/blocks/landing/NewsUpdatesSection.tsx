"use client"

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '~/components/ui/button'

interface NewsItem {
  id: string
  title: string
  excerpt: string
  date: string
  category: string
  image?: string
  featured?: boolean
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

export function NewsUpdatesSection() {
  const [news, setNews] = useState<NewsItem[]>([
    {
      id: '1',
      title: 'Annual Science Fair 2024 - Breaking Records',
      excerpt: 'Students showcase innovative projects in robotics, AI, and sustainable technology. Over 150 participants competed for awards.',
      date: 'March 15, 2024',
      category: 'Events',
      featured: true,
      image: 'https://res.cloudinary.com/dvvbxrs55/image/upload/w_800,h_400,c_fill,q_auto,f_auto/v1761398555/IMG_3136_nufwsu.jpg'
    },
    {
      id: '2',
      title: 'New AI Lab Grand Opening',
      excerpt: 'State-of-the-art artificial intelligence facility launches with cutting-edge equipment and expert instructors.',
      date: 'March 8, 2024',
      category: 'Facilities',
      image: 'https://res.cloudinary.com/dvvbxrs55/image/upload/w_800,h_400,c_fill,q_auto,f_auto/v1761398737/IMG_3037_djwx6t.jpg'
    },
    {
      id: '3',
      title: 'Board Exams Results - 95% Pass Rate',
      excerpt: 'Exceptional performance with top-ranking students achieving distinctions. 5 students rank among top 10 nationwide.',
      date: 'March 1, 2024',
      category: 'Achievements',
      image: 'https://res.cloudinary.com/dvvbxrs55/image/upload/w_800,h_400,c_fill,q_auto,f_auto/v1762033683/mono_MS_Naz_School_ue6upl.png'
    },
    {
      id: '4',
      title: 'Oxford University Partnership Expanded',
      excerpt: 'New collaboration opens opportunities for advanced study programs and international exposure for top performers.',
      date: 'February 25, 2024',
      category: 'Academics',
      image: 'https://res.cloudinary.com/dvvbxrs55/image/upload/w_800,h_400,c_fill,q_auto,f_auto/v1761399141/IMG_3135_dzhkaf.jpg'
    },
    {
      id: '5',
      title: 'Leadership Development Workshop Success',
      excerpt: 'Over 200 students participated in intensive leadership training with industry experts and alumni mentors.',
      date: 'February 18, 2024',
      category: 'Development',
      image: 'https://res.cloudinary.com/dvvbxrs55/image/upload/w_800,h_400,c_fill,q_auto,f_auto/v1761398989/IMG_3015_ocmbrn.jpg'
    },
    {
      id: '6',
      title: 'Solar Campus Initiative - 100% Green Energy',
      excerpt: 'Complete transition to renewable energy. School now operates entirely on solar power - a first in the region.',
      date: 'February 10, 2024',
      category: 'Sustainability',
      image: 'https://res.cloudinary.com/dvvbxrs55/image/upload/w_800,h_400,c_fill,q_auto,f_auto/v1761398835/H7H_1547_scojlx.jpg'
    }
  ])

  const featuredNews = news.find(item => item.featured)
  const recentNews = news.slice(1, 4)

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
            Latest News & Updates
          </h2>
          <p className="text-lg text-gray-600">Stay informed about school events, achievements, and announcements</p>
        </motion.div>

        {/* Featured News Card */}
        {featuredNews && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid md:grid-cols-2 gap-8 bg-white rounded-2xl overflow-hidden shadow-lg border border-emerald-100">
              {/* Featured Image */}
              <div className="h-80 md:h-auto relative overflow-hidden">
                <motion.img
                  src={featuredNews.image}
                  alt={featuredNews.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
                <div className="absolute top-4 left-4 bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  {featuredNews.category}
                </div>
              </div>

              {/* Featured Content */}
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-gray-500 mb-4">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{featuredNews.date}</span>
                </div>
                <h3 className="text-3xl font-bold mb-4 text-gray-900">
                  {featuredNews.title}
                </h3>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  {featuredNews.excerpt}
                </p>
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href="/news">
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                      Read Full Story <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Recent News Grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {recentNews.map((item, index) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-100 group cursor-pointer"
            >
              {/* News Card Image */}
              <div className="h-48 overflow-hidden bg-gray-200">
                {item.image && (
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                )}
              </div>

              {/* News Card Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                  <span className="text-xs text-gray-500">{item.date}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {item.excerpt}
                </p>
                <motion.div
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link href="/news" className="text-emerald-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                    Read More <ArrowRight className="w-3 h-3" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link href="/news">
            <Button 
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              View All News <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
