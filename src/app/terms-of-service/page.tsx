"use client";

import { motion } from "framer-motion";
import { Scale, ShieldCheck, Handshake, Landmark, BookOpen, Rocket } from "lucide-react";
import PrivacyPolicy from "~/components/blocks/nav/footer/PrivacyPolicy";
import TermsOfService from "~/components/blocks/nav/footer/TermsOfService";
import Affiliations from "~/components/blocks/nav/footer/Affiliations";
import EducationalSociety from "~/components/blocks/nav/footer/EducationalSociety";
import LMSKnowledge from "~/components/blocks/nav/footer/LMSKnowledge";
import LMSMarketing from "~/components/blocks/nav/footer/LMSMarketing";

const sections = [
  { id: "terms", title: "Terms of Service", icon: Scale, component: <TermsOfService />, colors: "from-blue-400 to-indigo-500", shadow: "shadow-blue-500/20" },
  { id: "privacy", title: "Privacy Policy", icon: ShieldCheck, component: <PrivacyPolicy />, colors: "from-purple-400 to-pink-500", shadow: "shadow-purple-500/20" },
  { id: "affiliations", title: "Affiliations", icon: Handshake, component: <Affiliations />, colors: "from-emerald-400 to-teal-500", shadow: "shadow-emerald-500/20" },
  { id: "society", title: "Society", icon: Landmark, component: <EducationalSociety />, colors: "from-orange-400 to-red-500", shadow: "shadow-orange-500/20" },
  { id: "knowledge", title: "Knowledge Base", icon: BookOpen, component: <LMSKnowledge />, colors: "from-cyan-400 to-sky-500", shadow: "shadow-cyan-500/20" },
  { id: "marketing", title: "Growth & ROI", icon: Rocket, component: <LMSMarketing />, colors: "from-rose-400 to-pink-600", shadow: "shadow-rose-500/20" },
];

export default function Terms() {
  return (
    <section className="relative min-h-screen w-full bg-linear-to-br from-green-800/60 to-emerald-50 font-sans py-20 px-6">
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-green-950 tracking-tight mb-4">
            Institutional <span className="text-green-700">Governance</span>
          </h1>
          <p className="text-green-900/80 max-w-2xl mx-auto text-lg">
            Legal frameworks, regulatory compliance, and technical documentation for the MSNS Ecosystem.
          </p>
        </header>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
        >
          {sections.map((section) => (
            <motion.div
              key={section.id}
              variants={{ hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } }}
              whileHover={{ y: -5 }}
              className={`group relative overflow-hidden rounded-3xl border border-white/40 bg-white/40 backdrop-blur-md p-8 transition-all hover:bg-white/50 ${section.shadow} hover:shadow-2xl`}
            >
              <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${section.colors} mb-6`}>
                <section.icon className="w-6 h-6 text-white" />
              </div>
              
              <h2 className="text-2xl font-bold text-green-950 mb-4 group-hover:text-green-700 transition-colors">
                {section.title}
              </h2>
              
              <div className="max-h-[300px] overflow-y-auto pr-2 text-slate-800 custom-scrollbar text-sm leading-relaxed">
                {section.component}
              </div>
              
              {/* Decorative Vector Element */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-white/40 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
          background: rgba(0, 0, 0, 0.2); 
          border-radius: 10px; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0, 0, 0, 0.4); }
      `}</style>
    </section>
  );
}
