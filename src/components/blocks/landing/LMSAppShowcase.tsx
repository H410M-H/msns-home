"use client";

import React from "react";
import Link from "next/link";
import { 
  Smartphone, 
  CheckCircle2, 
  Bell, 
  FileText, 
  CreditCard, 
  GraduationCap, 
  ArrowRight,
  Download
} from "lucide-react";
import { Button } from "~/components/ui/button";

export const LMSAppShowcase = () => {
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

            <div className="flex flex-wrap gap-4 pt-4">
              <Link 
                href="https://lms.msns.edu.pk"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button 
                  size="lg"
                  className="rounded-xl bg-linear-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-bold shadow-lg shadow-emerald-500/20 cursor-pointer"
                >
                  Open LMS Portal <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link 
                href="/downloads"
              >
                <Button 
                  variant="outline"
                  size="lg"
                  className="rounded-xl border-white/20 bg-white/5 hover:bg-white/15 text-white cursor-pointer"
                >
                  <Download className="mr-2 w-4 h-4" /> User Guides & App APK
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Mobile Visual Preview Card */}
          <div className="lg:col-span-5 flex justify-center">
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
          </div>

        </div>
      </div>
    </section>
  );
};
