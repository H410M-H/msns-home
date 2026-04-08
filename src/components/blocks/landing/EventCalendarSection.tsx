"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, MapPin, Users, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '~/components/ui/button'

interface Event {
  id: number
  title: string
  date: string
  time: string
  location: string
  category: string
  attendees: number
  description: string
  image: string
  color: string
  isUpcoming: boolean
}

const events: Event[] = [
  {
    id: 1,
    title: 'Annual Science Fair 2024',
    date: 'April 20, 2024',
    time: '9:00 AM - 5:00 PM',
    location: 'School Campus',
    category: 'Academic',
    attendees: 500,
    description: 'Showcase of innovative student projects in robotics, AI, and sustainable technology.',
    image: 'https://res.cloudinary.com/dvvbxrs55/image/upload/w_800,h_400,c_fill,q_auto,f_auto/v1761398555/IMG_3136_nufwsu.jpg',
    color: 'from-cyan-500 to-blue-600',
    isUpcoming: true
  },
  {
    id: 2,
    title: 'Leadership Summit with Industry Experts',
    date: 'April 25, 2024',
    time: '10:00 AM - 3:00 PM',
    location: 'Auditorium',
    category: 'Development',
    attendees: 300,
    description: 'Interactive sessions with CEOs, entrepreneurs, and thought leaders on career paths and success strategies.',
    image: 'https://res.cloudinary.com/dvvbxrs55/image/upload/w_800,h_400,c_fill,q_auto,f_auto/v1761399141/IMG_3135_dzhkaf.jpg',
    color: 'from-purple-500 to-pink-600',
    isUpcoming: true
  },
  {
    id: 3,
    title: 'Sports Day & Inter-house Championship',
    date: 'May 5, 2024',
    time: '8:00 AM - 6:00 PM',
    location: 'Sports Complex',
    category: 'Sports',
    attendees: 800,
    description: 'Annual sports extravaganza featuring track & field, cricket, volleyball, basketball, and more.',
    image: 'https://res.cloudinary.com/dvvbxrs55/image/upload/w_800,h_400,c_fill,q_auto,f_auto/v1761398835/H7H_1547_scojlx.jpg',
    color: 'from-red-500 to-orange-600',
    isUpcoming: true
  },
  {
    id: 4,
    title: 'Alumni Reunion & Networking Event',
    date: 'May 12, 2024',
    time: '3:00 PM - 9:00 PM',
    location: 'School Grounds',
    category: 'Community',
    attendees: 400,
    description: 'Reconnect with former classmates and hear inspiring stories of career success from alumni.',
    image: 'https://res.cloudinary.com/dvvbxrs55/image/upload/w_800,h_400,c_fill,q_auto,f_auto/v1761398989/IMG_3015_ocmbrn.jpg',
    color: 'from-green-500 to-emerald-600',
    isUpcoming: true
  },
  {
    id: 5,
    title: 'Cultural Fest & Talent Show',
    date: 'May 18, 2024',
    time: '5:00 PM - 10:00 PM',
    location: 'Main Hall',
    category: 'Culture',
    attendees: 600,
    description: 'Celebration of creativity with music, dance, drama, art, and talent performances.',
    image: 'https://res.cloudinary.com/dvvbxrs55/image/upload/w_800,h_400,c_fill,q_auto,f_auto/v1761399166/IMG_3360_h9xvsz.jpg',
    color: 'from-yellow-500 to-amber-600',
    isUpcoming: true
  },
  {
    id: 6,
    title: 'Parent-Teacher Conference & Open House',
    date: 'May 25, 2024',
    time: '3:00 PM - 7:00 PM',
    location: 'School Building',
    category: 'Academic',
    attendees: 1000,
    description: 'Discuss student progress, see classrooms, and meet teaching staff in an interactive session.',
    image: 'https://res.cloudinary.com/dvvbxrs55/image/upload/w_800,h_400,c_fill,q_auto,f_auto/v1761399399/POSTER_vb1tvs.jpg',
    color: 'from-indigo-500 to-blue-600',
    isUpcoming: true
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export function EventCalendarSection() {
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const categories = ['All', ...new Set(events.map(e => e.category))]
  const filteredEvents = selectedCategory === 'All' 
    ? events 
    : events.filter(e => e.category === selectedCategory)

  return (
    <section className="py-20 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
            Upcoming Events
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join us for exciting events, celebrations, and learning opportunities throughout the year
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                selectedCategory === category
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Events List */}
        <motion.div
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {filteredEvents.map((event) => (
            <motion.div
              key={event.id}
              variants={itemVariants}
              className="group"
            >
              <motion.div
                className={`bg-gradient-to-r ${event.color} p-0.5 rounded-2xl`}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white rounded-[14px] overflow-hidden">
                  <div className="grid md:grid-cols-3 gap-6 p-6">
                    {/* Event Image */}
                    <div className="md:col-span-1 h-48 md:h-auto rounded-xl overflow-hidden">
                      <motion.img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    {/* Event Details */}
                    <div className="md:col-span-2 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className={`text-xs font-bold text-white bg-gradient-to-r ${event.color} px-3 py-1 rounded-full`}>
                            {event.category}
                          </span>
                          <span className="text-sm font-semibold text-emerald-600">
                            {event.attendees} Expected
                          </span>
                        </div>

                        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors">
                          {event.title}
                        </h3>

                        {/* Event Meta Information */}
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-3 text-gray-600">
                            <Calendar className="w-5 h-5 text-emerald-600" />
                            <span className="font-semibold">{event.date}</span>
                          </div>
                          <div className="flex items-center gap-3 text-gray-600">
                            <Clock className="w-5 h-5 text-emerald-600" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-3 text-gray-600">
                            <MapPin className="w-5 h-5 text-emerald-600" />
                            <span>{event.location}</span>
                          </div>
                        </div>

                        {/* Description - Expandable */}
                        <AnimatePresence>
                          {expandedEvent === event.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="text-gray-600 mb-4"
                            >
                              {event.description}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
                        <motion.button
                          onClick={() => setExpandedEvent(expandedEvent === event.id ? null : event.id)}
                          className="text-emerald-600 font-semibold text-sm hover:text-emerald-700 transition-colors"
                          whileHover={{ x: 3 }}
                        >
                          {expandedEvent === event.id ? 'Show Less' : 'Learn More'} <ArrowRight className="w-3 h-3 inline ml-1" />
                        </motion.button>
                        <Link href={`/events/${event.id}`}>
                          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm px-4 py-2">
                            Register Now
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Events Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link href="/events">
            <Button 
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              View All Events <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
