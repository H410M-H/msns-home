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
  {
    label: "Application Opens",
    date: "February – April (Dates may vary)",
    status: "active",
  },
  { label: "Application Deadline", date: "March 31, 2026", status: "upcoming" },
  {
    label: "Assessment Tests",
    date: "April 10 – 20, 2026",
    status: "upcoming",
  },
  { label: "Results Announced", date: "May 5, 2026", status: "upcoming" },
  { label: "Classes Begin", date: "August 15, 2026", status: "upcoming" },
];

export default function AdmissionClient() {
  const [activeTab, setActiveTab] = useState<TabId>("process");

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <AdmissionsBanner />

      {/* Content area */}
      <div className="relative">
        {/* Subtle decorative background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-emerald-500/[0.04] blur-[120px]" />
          <div className="absolute top-1/2 -left-40 h-[400px] w-[400px] rounded-full bg-sky-500/[0.04] blur-[120px]" />
        </div>

        <div className="relative container mx-auto px-4 py-12 md:px-6 md:py-16">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center"
          >
            <span className="mb-3 inline-block rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-emerald-600 uppercase dark:text-emerald-400">
              Admissions 2026–28
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl dark:text-white">
              Your Journey{" "}
              <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 bg-clip-text text-transparent">
                Starts Here
              </span>
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-base text-slate-500 md:text-lg dark:text-slate-400">
              We&apos;re delighted you&apos;re considering MSNS. Our admissions
              process is designed to be straightforward, transparent, and
              supportive.
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-10 flex justify-center"
          >
            <div className="inline-flex gap-1.5 rounded-2xl border border-slate-200/60 bg-slate-100 p-1.5 backdrop-blur-sm dark:border-white/[0.08] dark:bg-white/[0.06]">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex cursor-pointer items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "text-white shadow-lg shadow-emerald-500/25"
                        : "text-slate-500 hover:bg-white/60 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/[0.04] dark:hover:text-white"
                    } `}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.5,
                        }}
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
              <div className="h-full rounded-2xl border border-slate-200/60 bg-white p-6 backdrop-blur-sm dark:border-white/[0.08] dark:bg-white/[0.03]">
                <div className="mb-6 flex items-center gap-3">
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
                      className="flex items-center justify-between gap-3 rounded-xl border border-transparent bg-slate-50 p-3 transition-colors hover:border-emerald-500/20 dark:bg-white/[0.04]"
                    >
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {item.label}
                      </span>
                      <span className="text-xs font-semibold whitespace-nowrap text-emerald-600 dark:text-emerald-400">
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
              <div className="flex h-full flex-col justify-between rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-sky-500/10 p-6 backdrop-blur-sm dark:from-emerald-500/[0.08] dark:to-sky-500/[0.06]">
                <div>
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/25">
                    <GraduationCap className="h-7 w-7 text-white" />
                  </div>
                  <h2 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
                    Ready to Join?
                  </h2>
                  <p className="mb-6 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                    Take the first step towards a world-class education.
                    Complete our application form to begin the admissions
                    journey.
                  </p>
                </div>
                <Link
                  href="/admission/apply"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl hover:shadow-emerald-500/30 hover:brightness-110"
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
