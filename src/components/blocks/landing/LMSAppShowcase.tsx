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
  Activity,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { TiltCard } from "~/components/motion/TiltCard";
import { Button } from "~/components/ui/button";

function GooglePlayIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className ?? "h-6 w-6 shrink-0"}
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
  const [activeTab, setActiveTab] = useState<"mobile" | "web" | "card">(
    "mobile",
  );

  const appFeatures = [
    {
      icon: Bell,
      title: "Real-Time Attendance Alerts",
      description:
        "Automated entry/exit notifications sent directly to parents' smartphones.",
    },
    {
      icon: FileText,
      title: "Daily Digital Homework & Diary",
      description:
        "Direct access to teacher assignments, syllabus coverage, and class remarks.",
    },
    {
      icon: GraduationCap,
      title: "Instant Marks & Report Cards",
      description:
        "Term results, subject progress analytics, and board preparatory evaluations.",
    },
    {
      icon: CreditCard,
      title: "Digital Fee Challans & Receipts",
      description:
        "Download monthly fee challans and verify payments anytime with zero queues.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-slate-900 via-emerald-950 to-slate-900 py-20 text-white">
      {/* Glow Orbs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-emerald-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 -bottom-24 h-96 w-96 rounded-full bg-teal-500/20 blur-[120px]" />

      <div className="relative z-10 container mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Left Text & Features */}
          <div className="space-y-6 lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-900/60 px-4 py-1.5 text-xs font-semibold tracking-wider text-emerald-300 uppercase">
              <Smartphone className="h-3.5 w-3.5" /> MSNS Smart Campus ERP
            </span>

            <h2 className="text-3xl leading-tight font-bold tracking-tight md:text-5xl">
              Pakistan&apos;s Leading{" "}
              <span className="bg-linear-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                Digital Parent Portal & LMS
              </span>
            </h2>

            <p className="text-base leading-relaxed text-slate-300 md:text-lg">
              Experience total transparency in your child&apos;s academic
              journey. The proprietary MSNS Learning Management System brings
              daily attendance, syllabus progress, examination results, and
              online fee management to your fingertips.
            </p>

            <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
              {appFeatures.map((feat) => (
                <div
                  key={feat.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xs transition-colors hover:border-emerald-500/40"
                >
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300">
                    <feat.icon className="h-5 w-5" />
                  </div>
                  <h4 className="mb-1 text-sm font-bold text-white">
                    {feat.title}
                  </h4>
                  <p className="text-xs leading-relaxed text-slate-400">
                    {feat.description}
                  </p>
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
                className="inline-flex cursor-pointer items-center gap-3 rounded-xl border border-emerald-500/40 bg-slate-900/90 px-5 py-2.5 text-white shadow-lg shadow-emerald-950/40 transition-all hover:scale-[1.02] hover:border-emerald-400 hover:bg-slate-800"
              >
                <GooglePlayIcon className="h-6 w-6" />
                <div className="text-left leading-tight">
                  <div className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                    GET IT ON
                  </div>
                  <div className="text-sm font-bold tracking-wide text-white">
                    Google Play
                  </div>
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
                  className="h-[46px] cursor-pointer rounded-xl bg-linear-to-r from-emerald-500 to-teal-500 font-bold text-slate-950 shadow-lg shadow-emerald-500/20 hover:from-emerald-600 hover:to-teal-600"
                >
                  Open LMS Portal <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              {/* Download Guides / APK */}
              <Link href="/downloads">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-[46px] cursor-pointer rounded-xl border-white/20 bg-white/5 text-white hover:bg-white/15"
                >
                  <Download className="mr-2 h-4 w-4" /> User Guides & APK
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Visual Preview Area */}
          <div className="flex flex-col items-center lg:col-span-5">
            {/* View Switcher Tabs */}
            <div className="mb-4 flex items-center gap-1.5 self-center rounded-xl border border-emerald-500/30 bg-slate-950/80 p-1 backdrop-blur-md">
              <button
                type="button"
                onClick={() => setActiveTab("mobile")}
                className={`flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  activeTab === "mobile"
                    ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Smartphone className="h-3.5 w-3.5" /> Mobile App
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("web")}
                className={`flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  activeTab === "web"
                    ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Laptop className="h-3.5 w-3.5" /> Web Portal
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("card")}
                className={`flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  activeTab === "card"
                    ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Activity className="h-3.5 w-3.5" /> Live Status
              </button>
            </div>

            {/* Morphing 3D card swap between tabs */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeTab}
                className="w-full max-w-sm [transform-style:preserve-3d]"
                initial={{ opacity: 0, rotateY: -18, scale: 0.94 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                exit={{ opacity: 0, rotateY: 18, scale: 0.96 }}
                transition={{ type: "spring", stiffness: 220, damping: 26 }}
                style={{ transformPerspective: 1000 }}
              >
                <TiltCard max={7} className="rounded-3xl">
                  {/* Tab 1: Smartphone App 3D Mockup */}
                  {activeTab === "mobile" && (
                    <div className="group relative w-full max-w-sm overflow-hidden rounded-3xl border border-emerald-500/30 bg-slate-950/80 shadow-2xl shadow-emerald-950/50 backdrop-blur-xl">
                      <div className="relative aspect-square w-full">
                        <Image
                          src="/images/lms-app-mockup.jpg"
                          alt="MSNS Smart App Mobile Preview"
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 400px"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                        <div className="absolute right-4 bottom-4 left-4 flex items-center justify-between">
                          <div>
                            <div className="text-xs font-bold text-white">
                              MSNS Smart Android App
                            </div>
                            <div className="text-[10px] text-emerald-400">
                              Available on Google Play & APK
                            </div>
                          </div>
                          <span className="rounded-full border border-emerald-400/40 bg-emerald-500/20 px-2.5 py-1 text-[10px] font-bold text-emerald-300">
                            v1.4.5 Live
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tab 2: Web Portal Dashboard Showcase */}
                  {activeTab === "web" && (
                    <div className="group relative w-full max-w-sm overflow-hidden rounded-3xl border border-emerald-500/30 bg-slate-950/80 shadow-2xl shadow-emerald-950/50 backdrop-blur-xl">
                      <div className="relative aspect-square w-full">
                        <Image
                          src="/images/lms-dashboard-showcase.jpg"
                          alt="MSNS LMS Web Portal Dashboard"
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 400px"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                        <div className="absolute right-4 bottom-4 left-4 flex items-center justify-between">
                          <div>
                            <div className="text-xs font-bold text-white">
                              Next-Gen LMS Dashboard
                            </div>
                            <div className="text-[10px] text-emerald-400">
                              lms.msns.edu.pk
                            </div>
                          </div>
                          <Link
                            href="https://lms.msns.edu.pk"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full bg-emerald-500 px-2.5 py-1 text-[10px] font-bold text-slate-950 transition-colors hover:bg-emerald-400"
                          >
                            Visit Portal →
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tab 3: Interactive Mock Dashboard Card */}
                  {activeTab === "card" && (
                    <div className="relative w-full max-w-sm rounded-3xl border border-emerald-500/30 bg-linear-to-b from-emerald-800/40 to-slate-900/90 p-6 shadow-2xl backdrop-blur-xl">
                      <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-lg font-black text-slate-950">
                            M
                          </div>
                          <div>
                            <div className="text-sm font-bold text-white">
                              MSNS Smart App
                            </div>
                            <div className="text-[11px] text-emerald-400">
                              Parent & Student Access
                            </div>
                          </div>
                        </div>
                        <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400" />
                      </div>

                      {/* Mock Dashboard Widgets */}
                      <div className="space-y-3 text-xs">
                        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/10 p-3.5">
                          <span className="text-slate-300">
                            Today&apos;s Attendance
                          </span>
                          <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 font-bold text-emerald-300">
                            Present (07:34 AM)
                          </span>
                        </div>
                        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/10 p-3.5">
                          <span className="text-slate-300">
                            Class 10th Matric Prep
                          </span>
                          <span className="font-semibold text-white">
                            10-Tulip (Biology)
                          </span>
                        </div>
                        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/10 p-3.5">
                          <span className="text-slate-300">
                            Recent Test Result
                          </span>
                          <span className="font-bold text-emerald-300">
                            Physics: 95/100 (A+)
                          </span>
                        </div>
                        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/10 p-3.5">
                          <span className="text-slate-300">
                            Monthly Fee Status
                          </span>
                          <span className="rounded-full bg-sky-500/20 px-2.5 py-0.5 font-semibold text-sky-300">
                            Verified Online
                          </span>
                        </div>
                      </div>

                      <div className="mt-6 border-t border-white/10 pt-4 text-center">
                        <p className="text-[11px] text-slate-400">
                          Secured with encrypted credentials & 15 TB central
                          cloud infrastructure.
                        </p>
                      </div>
                    </div>
                  )}
                </TiltCard>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
