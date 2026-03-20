"use client";

import { GeometricBackground } from "~/components/blocks/landing/GeometricBg";
import PrivacyPolicy from "~/components/blocks/nav/footer/PrivacyPolicy";
import TermsOfService from "~/components/blocks/nav/footer/TermsOfService";
import Affiliations from "~/components/blocks/nav/footer/Affiliations";
import EducationalSociety from "~/components/blocks/nav/footer/EducationalSociety";
import LMSKnowledge from "~/components/blocks/nav/footer/LMSKnowledge";
import LMSMarketing from "~/components/blocks/nav/footer/LMSKnowledge";
import { motion } from "framer-motion";

export default function Terms() {
  // Scalable array to manage all policy and informational sections
  const sections =;

  return (
    <section className="relative flex flex-col min-h-screen pt-4">
      <main className="grow">
        <div className="relative w-full min-h-screen overflow-hidden">
          {/* Background */}
          <GeometricBackground />

          {/* Content */}
          <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center p-6 md:p-12">
            {/* Grid Layout for Scalability */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-7xl">
              {sections.map((section, index) => (
                <motion.div
                  key={section.id}
                  className={`w-full rounded-2xl bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20 p-6 md:p-10 text-white transition-all ${section.hoverShadow}`}
                  whileHover={{
                    scale: 1.02,
                    rotateY: index % 2 === 0? 2 : -2, // Alternates rotation direction based on grid position
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <h2
                    className={`text-3xl md:text-4xl font-bold bg-linear-to-r ${section.colors} bg-clip-text text-transparent mb-6`}
                  >
                    {section.title}
                  </h2>
                  <div className="max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                    {section.component}
                  </div>
                </motion.div>
              ))}
            </div>
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
