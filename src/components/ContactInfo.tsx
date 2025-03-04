"use client"

import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Clock, MessageSquare, ArrowRight } from 'lucide-react'
import { Button } from "~/components/ui/button"
import { QuickLinksSection } from "./blocks/landing/QuickLinksSection"

export default function ContactInfo() {
  return (
    <div className="space-y-12">
      {/* Contact Methods */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Phone Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 flex flex-col h-full"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center mb-4">
            <Phone className="w-6 h-6 text-white" />
          </div>

          <h3 className="text-xl font-bold text-white mb-4">Call Us</h3>

          <div className="space-y-3 flex-grow">
            <div>
              <p className="text-white/60 text-sm">Main Office</p>
              <p className="text-white font-medium">+92 (318) 7625415</p>
            </div>
            <div>
              <p className="text-white/60 text-sm">Support</p>
              <p className="text-white font-medium">+92 (301) 6233609</p>
            </div>
          </div>

          <Button asChild variant="ghost" className="mt-4 text-white hover:bg-white/20 group">
            <a href="tel:+923187625415" target="_blank" rel="noopener noreferrer">
              Call Now
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </motion.div>

        {/* Email Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 flex flex-col h-full"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-400 flex items-center justify-center mb-4">
            <Mail className="w-6 h-6 text-white" />
          </div>

          <h3 className="text-xl font-bold text-white mb-4">Email Us</h3>

          <div className="space-y-3 flex-grow">
            <div>
              <p className="text-white/60 text-sm">General Inquiries</p>
              <p className="text-white font-medium">info@msnazhighschool.edu.pk</p>
            </div>
            <div>
              <p className="text-white/60 text-sm">Admissions</p>
              <p className="text-white font-medium">admissions@msnazhighschool.edu.pk</p>
            </div>
          </div>

          <Button asChild variant="ghost" className="mt-4 text-white hover:bg-white/20 group">
            <a href="mailto:info@msnazhighschool.edu.pk" target="_blank" rel="noopener noreferrer">
              Send Email
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </motion.div>

        {/* WhatsApp Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 flex flex-col h-full"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-400 flex items-center justify-center mb-4">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>

          <h3 className="text-xl font-bold text-white mb-4">WhatsApp</h3>

          <div className="space-y-3 flex-grow">
            <div>
              <p className="text-white/60 text-sm">Customer Service</p>
              <p className="text-white font-medium">+92 (318) 7625415</p>
            </div>
            <div>
              <p className="text-white/60 text-sm">Text anytime</p>
              <p className="text-white font-medium">We typically reply within an hour</p>
            </div>
          </div>

          <Button asChild variant="ghost" className="mt-4 text-white hover:bg-white/20 group">
            <a href="https://wa.me/923187625415" target="_blank" rel="noopener noreferrer">
              Message Us
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </motion.div>

        {/* Visit Us Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 flex flex-col h-full"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-orange-400 flex items-center justify-center mb-4">
            <MapPin className="w-6 h-6 text-white" />
          </div>

          <h3 className="text-xl font-bold text-white mb-4">Visit Us</h3>

          <div className="space-y-3 flex-grow">
            <div>
              <p className="text-white/60 text-sm">Address</p>
              <p className="text-white font-medium">123 Education Avenue</p>
            </div>
            <div>
              <p className="text-white/60 text-sm">Location</p>
              <p className="text-white font-medium">Springfield, ST 12345, USA</p>
            </div>
          </div>

          <Button asChild variant="ghost" className="mt-4 text-white hover:bg-white/20 group">
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
              Get Directions
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </motion.div>
      </div>

      {/* Business Hours */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
      >
        <div className="flex items-center mb-6">
          <Clock className="w-6 h-6 text-blue-400 mr-3" />
          <h3 className="text-xl font-bold text-white">Business Hours</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Monday - Friday Hours */}
          <div className="p-4 bg-white/5 rounded-lg">
            <p className="text-white font-medium">Monday - Friday</p>
            <p className="text-white/70">8:00 AM - 5:00 PM</p>
          </div>
          
          {/* Saturday Hours */}
          <div className="p-4 bg-white/5 rounded-lg">
            <p className="text-white font-medium">Saturday</p>
            <p className="text-white/70">9:00 AM - 2:00 PM</p>
          </div>
          
          {/* Sunday Hours */}
          <div className="p-4 bg-white/5 rounded-lg">
            <p className="text-white font-medium">Sunday</p>
            <p className="text-white/70">Closed</p>
          </div>
        </div>
      </motion.div>

      {/* Social Media Links - Using QuickLinksSection */}
      <QuickLinksSection />
    </div>
  )
}
