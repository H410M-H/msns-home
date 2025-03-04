"use client"

import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Clock, MessageSquare, ArrowRight } from 'lucide-react'
import { Button } from "~/components/ui/button"
import { QuickLinksSection } from "./QuickLinksSection"

export default function ContactInfo() {
  return (
    <div className="space-y-8 md:space-y-12">
      {/* Contact Methods Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
        {/* Phone Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6 border border-white/20 flex flex-col h-full"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center mb-3 sm:mb-4">
            <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Call Us</h3>
          <div className="space-y-2 sm:space-y-3 flex-grow">
            <div>
              <p className="text-white/60 text-xs sm:text-sm">Main Office</p>
              <p className="text-white font-medium text-sm sm:text-base">+92 (318) 7625415</p>
            </div>
            <div>
              <p className="text-white/60 text-xs sm:text-sm">Support</p>
              <p className="text-white font-medium text-sm sm:text-base">+92 (301) 6233609</p>
            </div>
          </div>
          <Button asChild variant="ghost" className="mt-3 sm:mt-4 text-white hover:bg-white/20 group px-3 sm:px-4">
            <a href="tel:+923187625415" target="_blank" rel="noopener noreferrer">
              <span className="text-sm">Call Now</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </motion.div>

        {/* Email Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6 border border-white/20 flex flex-col h-full"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-400 flex items-center justify-center mb-3 sm:mb-4">
            <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Email Us</h3>
          <div className="space-y-2 sm:space-y-3 flex-grow">
            <div>
              <p className="text-white/60 text-xs sm:text-sm">General Inquiries</p>
              <p className="text-white font-medium text-sm sm:text-base">info@msnazhighschool.edu.pk</p>
            </div>
            <div>
              <p className="text-white/60 text-xs sm:text-sm">Admissions</p>
              <p className="text-white font-medium text-sm sm:text-base">admissions@msnazhighschool.edu.pk</p>
            </div>
          </div>
          <Button asChild variant="ghost" className="mt-3 sm:mt-4 text-white hover:bg-white/20 group px-3 sm:px-4">
            <a href="mailto:info@msnazhighschool.edu.pk" target="_blank" rel="noopener noreferrer">
              <span className="text-sm">Send Email</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </motion.div>

        {/* WhatsApp Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6 border border-white/20 flex flex-col h-full"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-400 flex items-center justify-center mb-3 sm:mb-4">
            <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">WhatsApp</h3>
          <div className="space-y-2 sm:space-y-3 flex-grow">
            <div>
              <p className="text-white/60 text-xs sm:text-sm">Customer Service</p>
              <p className="text-white font-medium text-sm sm:text-base">+92 (318) 7625415</p>
            </div>
            <div>
              <p className="text-white/60 text-xs sm:text-sm">Response Time</p>
              <p className="text-white font-medium text-sm sm:text-base">Typically within 1 hour</p>
            </div>
          </div>
          <Button asChild variant="ghost" className="mt-3 sm:mt-4 text-white hover:bg-white/20 group px-3 sm:px-4">
            <a href="https://wa.me/923187625415" target="_blank" rel="noopener noreferrer">
              <span className="text-sm">Message Us</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </motion.div>

        {/* Visit Us Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6 border border-white/20 flex flex-col h-full"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-red-500 to-orange-400 flex items-center justify-center mb-3 sm:mb-4">
            <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Visit Us</h3>
          <div className="space-y-2 sm:space-y-3 flex-grow">
            <div>
              <p className="text-white/60 text-xs sm:text-sm">Street Address</p>
              <p className="text-white font-medium text-sm sm:text-base">123 Education Avenue</p>
            </div>
            <div>
              <p className="text-white/60 text-xs sm:text-sm">City/State</p>
              <p className="text-white font-medium text-sm sm:text-base">Springfield, ST 12345</p>
            </div>
          </div>
          <Button asChild variant="ghost" className="mt-3 sm:mt-4 text-white hover:bg-white/20 group px-3 sm:px-4">
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
              <span className="text-sm">Get Directions</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </motion.div>
      </div>

      {/* Business Hours Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6 border border-white/20"
      >
        <div className="flex items-center mb-4 sm:mb-6">
          <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 mr-2 sm:mr-3" />
          <h3 className="text-lg sm:text-xl font-bold text-white">Business Hours</h3>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3">
          <div className="p-3 sm:p-4 bg-white/5 rounded-lg">
            <p className="text-white font-medium text-sm sm:text-base">Monday - Friday</p>
            <p className="text-white/70 text-sm">8:00 AM - 5:00 PM</p>
          </div>
          <div className="p-3 sm:p-4 bg-white/5 rounded-lg">
            <p className="text-white font-medium text-sm sm:text-base">Saturday</p>
            <p className="text-white/70 text-sm">9:00 AM - 2:00 PM</p>
          </div>
          <div className="p-3 sm:p-4 bg-white/5 rounded-lg">
            <p className="text-white font-medium text-sm sm:text-base">Sunday</p>
            <p className="text-white/70 text-sm">Closed</p>
          </div>
        </div>
      </motion.div>

      {/* Social Media Links */}
      <div className="px-2 sm:px-0">
        <QuickLinksSection />
      </div>
    </div>
  )
}