"use client";

import { useState } from "react";
import { AdmissionsBanner } from "~/components/blocks/landing/AdmissionBanner";
import { AdmissionsProcess } from "~/components/blocks/landing/AdmissionProcess";
import { ContactAdmissions } from "~/components/blocks/landing/AdmissionContact";
import { AdmissionsCriteria } from "~/components/blocks/landing/AdmissionCriteria";
import { FeeStructure } from "~/components/blocks/landing/FeeStructure";
import { AdmissionsFaq } from "~/components/blocks/landing/AdmissionsFaq";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClipboardCheck,
  CalendarIcon,
  DollarSign,
  HelpCircle,
  ArrowRight,
  Clock,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";

const tabs = [
  { id: "process", label: "Process", icon: ClipboardCheck },
  { id: "criteria", label: "Criteria", icon: CalendarIcon },
  { id: "fees", label: "Fees", icon: DollarSign },
  { id: "faq", label: "FAQs", icon: HelpCircle },
] as const;

type TabId = (typeof tabs)[number]["id"];

const admissionDates = [
  { label: "Application Opens", date: "February – April (Dates may vary)", status: "active" },
  { label: "Application Deadline", date: "March 31, 2026", status: "upcoming" },
  { label: "Assessment Tests", date: "April 10 – 20, 2026", status: "upcoming" },
  { label: "Results Announced", date: "May 5, 2026", status: "upcoming" },
  { label: "Classes Begin", date: "August 15, 2026", status: "upcoming" },
];

export default function Admission() {
  const [activeTab, setActiveTab] = useState<TabId>("process");

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <AdmissionsBanner />

      {/* Content area */}
      <div className="relative">
        {/* Subtle decorative background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-emerald-500/[0.04] blur-[120px]" />
          <div className="absolute top-1/2 -left-40 h-[400px] w-[400px] rounded-full bg-sky-500/[0.04] blur-[120px]" />
        </div>

        <div className="relative container mx-auto px-4 md:px-6 py-12 md:py-16">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center"
          >
            <span className="inline-block mb-3 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
              Admissions 2025–26
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              Your Journey{" "}
              <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 bg-clip-text text-transparent">
                Starts Here
              </span>
            </h1>
            <p className="mt-3 mx-auto max-w-2xl text-base md:text-lg text-slate-500 dark:text-slate-400">
              We&apos;re delighted you&apos;re considering MSNS. Our admissions process is designed to be straightforward, transparent, and supportive.
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-10 flex justify-center"
          >
            <div className="inline-flex gap-1.5 p-1.5 rounded-2xl bg-slate-100 dark:bg-white/[0.06] border border-slate-200/60 dark:border-white/[0.08] backdrop-blur-sm">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium
                      transition-all duration-300 cursor-pointer
                      ${isActive
                        ? "text-white shadow-lg shadow-emerald-500/25"
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/[0.04]"
                      }
                    `}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="mb-16"
            >
              {activeTab === "process" && <AdmissionsProcess />}
              {activeTab === "criteria" && <AdmissionsCriteria />}
              {activeTab === "fees" && <FeeStructure />}
              {activeTab === "faq" && <AdmissionsFaq />}
            </motion.div>
          </AnimatePresence>

          {/* Bottom Grid: Calendar + Contact + CTA */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Admission Calendar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-1"
            >
              <div className="h-full rounded-2xl border border-slate-200/60 dark:border-white/[0.08] bg-white dark:bg-white/[0.03] p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/20">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    Admission Calendar
                  </h2>
                </div>
                <div className="space-y-3">
                  {admissionDates.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08 }}
                      className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-transparent hover:border-emerald-500/20 transition-colors"
                    >
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {item.label}
                      </span>
                      <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
                        {item.date}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-1"
            >
              <ContactAdmissions />
            </motion.div>

            {/* Apply Now CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="h-full rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-sky-500/10 dark:from-emerald-500/[0.08] dark:to-sky-500/[0.06] p-6 backdrop-blur-sm flex flex-col justify-between">
                <div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/25 mb-5">
                    <GraduationCap className="h-7 w-7 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    Ready to Join?
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                    Take the first step towards a world-class education. Complete our application form to begin the admissions journey.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl hover:shadow-emerald-500/30 hover:brightness-110"
                >
                  Start Application
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}