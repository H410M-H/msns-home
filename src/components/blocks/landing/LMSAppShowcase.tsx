"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Smartphone, 
  Bell, 
  FileText, 
  CreditCard, 
  GraduationCap, 
  ArrowRight,
  Download,
  Laptop,
  Activity
} from "lucide-react";
import { Button } from "~/components/ui/button";

function GooglePlayIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className ?? "w-6 h-6 shrink-0"} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M3.609 1.813A2.03 2.03 0 0 0 3 3.327v17.346c0 .597.234 1.15.609 1.514l9.53-9.593L3.609 1.813z" 
        fill="#00D3FF"
      />
      <path 
        d="M16.545 9.188L13.14 5.794 3.609 1.813c.433-.217.953-.186 1.45.093l11.486 7.282z" 
        fill="#00F076"
      />
      <path 
        d="M16.545 14.812l-11.486 7.282c-.497.279-1.017.31-1.45.093l9.53-3.981 3.406-3.394z" 
        fill="#FF3A44"
      />
      <path 
        d="M21.213 10.748l-4.668-2.956-3.406 4.802 3.406 4.802 4.668-2.956c.928-.588.928-2.104 0-2.692z" 
        fill="#FFC800"
      />
    </svg>
  );
}

export const LMSAppShowcase = () => {
  const [activeTab, setActiveTab] = useState<"mobile" | "web" | "card">("mobile");

  const appFeatures = [
    {
      icon: Bell,
      title: "Real-Time Attendance Alerts",
      description: "Automated entry/exit notifications sent directly to parents' smartphones."
    },
    {
      icon: FileText,
      title: "Daily Digital Homework & Diary",
      description: "Direct access to teacher assignments, syllabus coverage, and class remarks."
    },
    {
      icon: GraduationCap,
      title: "Instant Marks & Report Cards",
      description: "Term results, subject progress analytics, and board preparatory evaluations."
    },
    {
      icon: CreditCard,
      title: "Digital Fee Challans & Receipts",
      description: "Download monthly fee challans and verify payments anytime with zero queues."
    }
  ];

  return (
    <section className="py-20 bg-linear-to-br from-slate-900 via-emerald-950 to-slate-900 text-white relative overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-teal-500/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text & Features */}
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-300 bg-emerald-900/60 border border-emerald-500/30">
              <Smartphone className="w-3.5 h-3.5" /> MSNS Smart Campus ERP
            </span>

            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Pakistan&apos;s Leading{" "}
              <span className="bg-linear-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                Digital Parent Portal & LMS
              </span>
            </h2>

            <p className="text-slate-300 text-base md:text-lg leading-relaxed">
              Experience total transparency in your child&apos;s academic journey. The proprietary MSNS Learning Management System brings daily attendance, syllabus progress, examination results, and online fee management to your fingertips.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {appFeatures.map((feat) => (
                <div 
                  key={feat.title}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs hover:border-emerald-500/40 transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center mb-3">
                    <feat.icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-white mb-1">{feat.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{feat.description}</p>
                </div>
              ))}
            </div>

            {/* Action Buttons: Google Play, Web Portal & APK */}
            <div className="flex flex-wrap items-center gap-3.5 pt-4">
              {/* Google Play Store Badge Button */}
              <Link 
                href="https://play.google.com/store/apps/details?id=com.msns.lms"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-emerald-500/40 hover:border-emerald-400 text-white shadow-lg shadow-emerald-950/40 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <GooglePlayIcon className="w-6 h-6" />
                <div className="text-left leading-tight">
                  <div className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">GET IT ON</div>
                  <div className="text-sm font-bold text-white tracking-wide">Google Play</div>
                </div>
              </Link>

              {/* Web Portal Button */}
              <Link 
                href="https://lms.msns.edu.pk"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button 
                  size="lg"
                  className="h-[46px] rounded-xl bg-linear-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-bold shadow-lg shadow-emerald-500/20 cursor-pointer"
                >
                  Open LMS Portal <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>

              {/* Download Guides / APK */}
              <Link 
                href="/downloads"
              >
                <Button 
                  variant="outline"
                  size="lg"
                  className="h-[46px] rounded-xl border-white/20 bg-white/5 hover:bg-white/15 text-white cursor-pointer"
                >
                  <Download className="mr-2 w-4 h-4" /> User Guides & APK
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Visual Preview Area */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* View Switcher Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950/80 border border-emerald-500/30 backdrop-blur-md mb-4 self-center">
              <button
                type="button"
                onClick={() => setActiveTab("mobile")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "mobile"
                    ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" /> Mobile App
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("web")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "web"
                    ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Laptop className="w-3.5 h-3.5" /> Web Portal
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("card")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "card"
                    ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Activity className="w-3.5 h-3.5" /> Live Status
              </button>
            </div>

            {/* Tab 1: Smartphone App 3D Mockup */}
            {activeTab === "mobile" && (
              <div className="relative w-full max-w-sm rounded-3xl overflow-hidden border border-emerald-500/30 bg-slate-950/80 shadow-2xl shadow-emerald-950/50 backdrop-blur-xl group">
                <div className="relative aspect-square w-full">
                  <Image
                    src="/images/lms-app-mockup.jpg"
                    alt="MSNS Smart App Mobile Preview"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">MSNS Smart Android App</div>
                      <div className="text-[10px] text-emerald-400">Available on Google Play & APK</div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-[10px] font-bold text-emerald-300">
                      v1.4.5 Live
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Web Portal Dashboard Showcase */}
            {activeTab === "web" && (
              <div className="relative w-full max-w-sm rounded-3xl overflow-hidden border border-emerald-500/30 bg-slate-950/80 shadow-2xl shadow-emerald-950/50 backdrop-blur-xl group">
                <div className="relative aspect-square w-full">
                  <Image
                    src="/images/lms-dashboard-showcase.jpg"
                    alt="MSNS LMS Web Portal Dashboard"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">Next-Gen LMS Dashboard</div>
                      <div className="text-[10px] text-emerald-400">lms.msns.edu.pk</div>
                    </div>
                    <Link
                      href="https://lms.msns.edu.pk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-bold hover:bg-emerald-400 transition-colors"
                    >
                      Visit Portal →
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Interactive Mock Dashboard Card */}
            {activeTab === "card" && (
              <div className="relative w-full max-w-sm rounded-3xl bg-linear-to-b from-emerald-800/40 to-slate-900/90 border border-emerald-500/30 p-6 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 font-black text-lg">
                      M
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white">MSNS Smart App</div>
                      <div className="text-[11px] text-emerald-400">Parent & Student Access</div>
                    </div>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>

                {/* Mock Dashboard Widgets */}
                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-white/10 border border-white/10 flex items-center justify-between">
                    <span className="text-slate-300">Today&apos;s Attendance</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">Present (07:34 AM)</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/10 border border-white/10 flex items-center justify-between">
                    <span className="text-slate-300">Class 10th Matric Prep</span>
                    <span className="text-white font-semibold">10-Tulip (Biology)</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/10 border border-white/10 flex items-center justify-between">
                    <span className="text-slate-300">Recent Test Result</span>
                    <span className="text-emerald-300 font-bold">Physics: 95/100 (A+)</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/10 border border-white/10 flex items-center justify-between">
                    <span className="text-slate-300">Monthly Fee Status</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-semibold">Verified Online</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 text-center">
                  <p className="text-[11px] text-slate-400">
                    Secured with encrypted credentials & 15 TB central cloud infrastructure.
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

