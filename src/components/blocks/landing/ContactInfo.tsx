"use client";

import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { QuickLinksSection } from "./QuickLinksSection";

export const ContactInfo = () => {
  return (
    <div className="space-y-8 md:space-y-12">
      {/* Contact Methods Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {/* Phone Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex h-full flex-col rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-lg sm:p-6"
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-r from-blue-500 to-cyan-400 sm:mb-4 sm:h-12 sm:w-12">
            <Phone className="h-5 w-5 text-white sm:h-6 sm:w-6" />
          </div>
          <h3 className="mb-3 text-lg font-bold text-white sm:mb-4 sm:text-xl">
            Call Us
          </h3>
          <div className="grow space-y-2 sm:space-y-3">
            <div>
              <p className="text-xs text-white/60 sm:text-sm">Main Office</p>
              <p className="text-sm font-medium text-white sm:text-base">
                +92 (318) 7625415
              </p>
            </div>
            <div>
              <p className="text-xs text-white/60 sm:text-sm">Support</p>
              <p className="text-sm font-medium text-white sm:text-base">
                +92 (301) 6233609
              </p>
            </div>
          </div>
          <Button
            asChild
            variant="ghost"
            className="group mt-3 px-3 text-white hover:bg-white/20 sm:mt-4 sm:px-4"
          >
            <a
              href="tel:+923187625415"
              target="_blank"
              rel="noopener noreferrer"
            >
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
          className="flex h-full flex-col rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-lg sm:p-6"
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-r from-purple-500 to-pink-400 sm:mb-4 sm:h-12 sm:w-12">
            <Mail className="h-5 w-5 text-white sm:h-6 sm:w-6" />
          </div>
          <h3 className="mb-3 text-lg font-bold text-white sm:mb-4 sm:text-xl">
            Email Us
          </h3>
          <div className="grow space-y-2 sm:space-y-3">
            <div>
              <p className="text-xs text-white/60 sm:text-sm">
                General Inquiries
              </p>
              <p className="text-sm font-medium text-white sm:text-base">
                info@msns.edu.pk
              </p>
            </div>
            <div>
              <p className="text-xs text-white/60 sm:text-sm">Admissions</p>
              <p className="text-sm font-medium text-white sm:text-base">
                admissions@msns.edu.pk
              </p>
            </div>
          </div>
          <Button
            asChild
            variant="ghost"
            className="group mt-3 px-3 text-white hover:bg-white/20 sm:mt-4 sm:px-4"
          >
            <a
              href="mailto:info@msns.edu.pk"
              target="_blank"
              rel="noopener noreferrer"
            >
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
          className="flex h-full flex-col rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-lg sm:p-6"
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-r from-green-500 to-emerald-400 sm:mb-4 sm:h-12 sm:w-12">
            <MessageSquare className="h-5 w-5 text-white sm:h-6 sm:w-6" />
          </div>
          <h3 className="mb-3 text-lg font-bold text-white sm:mb-4 sm:text-xl">
            WhatsApp
          </h3>
          <div className="grow space-y-2 sm:space-y-3">
            <div>
              <p className="text-xs text-white/60 sm:text-sm">
                Customer Service
              </p>
              <p className="text-sm font-medium text-white sm:text-base">
                +92 (318) 7625415
              </p>
            </div>
            <div>
              <p className="text-xs text-white/60 sm:text-sm">Response Time</p>
              <p className="text-sm font-medium text-white sm:text-base">
                Typically within 1 hour
              </p>
            </div>
          </div>
          <Button
            asChild
            variant="ghost"
            className="group mt-3 px-3 text-white hover:bg-white/20 sm:mt-4 sm:px-4"
          >
            <a
              href="https://wa.me/923187625415"
              target="_blank"
              rel="noopener noreferrer"
            >
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
          className="flex h-full flex-col rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-lg sm:p-6"
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-r from-red-500 to-orange-400 sm:mb-4 sm:h-12 sm:w-12">
            <MapPin className="h-5 w-5 text-white sm:h-6 sm:w-6" />
          </div>
          <h3 className="mb-3 text-lg font-bold text-white sm:mb-4 sm:text-xl">
            Visit Us
          </h3>
          <div className="grow space-y-2 sm:space-y-3">
            <div>
              <p className="text-xs text-white/60 sm:text-sm">
                {" "}
                G.T. ROAD GHAKHAR MANDI
              </p>
              <p className="text-sm font-medium text-white sm:text-base">
                Opposite to Model Police station
              </p>
            </div>
            <div>
              <p className="text-xs text-white/60 sm:text-sm">
                Ghakhar, Gujranwala
              </p>
              <p className="text-sm font-medium text-white sm:text-base">
                Punjab, Pakistan 52200
              </p>
            </div>
          </div>
          <Button
            asChild
            variant="ghost"
            className="group mt-3 px-3 text-white hover:bg-white/20 sm:mt-4 sm:px-4"
          >
            <a
              href="https://maps.google.com/?q=32.2818,74.1481"
              target="_blank"
              rel="noopener noreferrer"
            >
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
        className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-lg sm:p-6"
      >
        <div className="mb-4 flex items-center sm:mb-6">
          <Clock className="mr-2 h-5 w-5 text-blue-400 sm:mr-3 sm:h-6 sm:w-6" />
          <h3 className="text-lg font-bold text-white sm:text-xl">
            Business Hours
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-white/5 p-3 sm:p-4">
            <p className="text-sm font-medium text-white sm:text-base">
              Monday - Friday
            </p>
            <p className="text-sm text-white/70">8:00 AM - 5:00 PM</p>
          </div>
          <div className="rounded-lg bg-white/5 p-3 sm:p-4">
            <p className="text-sm font-medium text-white sm:text-base">
              Saturday
            </p>
            <p className="text-sm text-white/70">9:00 AM - 2:00 PM</p>
          </div>
          <div className="rounded-lg bg-white/5 p-3 sm:p-4">
            <p className="text-sm font-medium text-white sm:text-base">
              Sunday
            </p>
            <p className="text-sm text-white/70">Closed</p>
          </div>
        </div>
      </motion.div>

      {/* Social Media Links */}
      <div className="px-2 sm:px-0">
        <QuickLinksSection />
      </div>
    </div>
  );
};
