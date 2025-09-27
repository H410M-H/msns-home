"use client";

import { GeometricBackground } from "~/components/blocks/landing/GeometricBg";
import PrivacyPolicy from "~/components/blocks/nav/footer/PrivacyPolicy";
import TermsOfService from "~/components/blocks/nav/footer/TermsOfService";
import { motion } from "framer-motion";

export default function Terms() {
  return (
    <section className="relative flex flex-col min-h-screen pt-4">
      <main className="flex-grow">
        <div className="relative w-full min-h-screen overflow-hidden">
          {/* Background */}
          <GeometricBackground />

          {/* Content */}
          <div className="relative z-10 w-full min-h-screen flex flex-col lg:flex-row items-center justify-center gap-8 p-6 md:p-12">
            {/* Terms of Service Card */}
            <motion.div
              className="w-full max-w-2xl rounded-2xl bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20 p-6 md:p-10 text-white hover:shadow-pink-500/40 hover:border-pink-400/50 transition-all"
              whileHover={{ scale: 1.03, rotateY: 3 }}
              whileTap={{ scale: 0.98 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-6">
                Terms of Service
              </h2>
              <div className="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                <TermsOfService />
              </div>
            </motion.div>

            {/* Privacy Policy Card */}
            <motion.div
              className="w-full max-w-2xl rounded-2xl bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20 p-6 md:p-10 text-white hover:shadow-green-500/40 hover:border-green-400/50 transition-all"
              whileHover={{ scale: 1.03, rotateY: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-400 via-teal-400 to-blue-400 bg-clip-text text-transparent mb-6">
                Privacy Policy
              </h2>
              <div className="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                <PrivacyPolicy />
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Extra Styling for Scrollbar */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #ec4899, #3b82f6, #22c55e);
          border-radius: 9999px;
        }
      `}</style>
    </section>
  );
}
