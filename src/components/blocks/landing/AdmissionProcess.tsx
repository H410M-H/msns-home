"use client"

import { CheckCircle, ClipboardList, SearchCheck, ClipboardCheck, CalendarCheck, BadgeDollarSign, MailCheck } from "lucide-react"
import { motion } from "framer-motion"

const steps = [
  {
    icon: ClipboardList,
    title: "Submit Application",
    description: "Complete the online application form with all required information and documentation.",
  },
  {
    icon: SearchCheck,
    title: "Application Review",
    description: "Our admissions team will review your application and contact you for the next steps.",
  },
  {
    icon: ClipboardCheck,
    title: "Assessment Test",
    description: "Students will be invited to take an assessment test appropriate for their grade level.",
  },
  {
    icon: CalendarCheck,
    title: "Interview",
    description: "Selected candidates and their parents will be invited for an interview with school administrators.",
  },
  {
    icon: MailCheck,
    title: "Admission Decision",
    description: "Admission decisions will be communicated to parents within two weeks of the interview.",
  },
  {
    icon: BadgeDollarSign,
    title: "Fee Payment",
    description: "Upon acceptance, secure your child's place by paying the registration fee and first term fees.",
  },
]

const requiredDocs = [
  "Completed application form",
  "Birth certificate",
  "Previous school records / report cards",
  "Passport-sized photographs",
  "Immunization records",
  "Parent / guardian ID proof",
  "Proof of address",
  "Transfer certificate (if applicable)",
]

export const AdmissionsProcess = () => {
  return (
    <div className="space-y-12">
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
          Our 6-Step{" "}
          <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
            Admission Journey
          </span>
        </h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-xl">
          A clear, step-by-step process designed to make admissions easy for every family.
        </p>
      </motion.div>

      {/* Steps Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.07 }}
              className="group relative rounded-2xl border border-slate-200/60 dark:border-white/[0.08] bg-white dark:bg-white/[0.03] p-6 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/5 hover:border-emerald-500/20"
            >
              {/* Step number */}
              <span className="absolute top-4 right-4 text-xs font-bold text-slate-300 dark:text-white/10 tabular-nums">
                0{index + 1}
              </span>

              {/* Icon */}
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md shadow-emerald-500/20 transition-transform duration-300 group-hover:scale-105">
                <Icon className="h-5 w-5 text-white" strokeWidth={1.8} />
              </div>

              <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-white">
                {step.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          )
        })}
      </div>

      {/* Required Documents */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-2xl border border-slate-200/60 dark:border-white/[0.08] bg-gradient-to-br from-emerald-50/50 to-sky-50/30 dark:from-emerald-500/[0.05] dark:to-sky-500/[0.03] p-6 md:p-8"
      >
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
            <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Required Documentation
          </h3>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2">
          {requiredDocs.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + i * 0.04 }}
              className="flex items-center gap-3 rounded-xl bg-white/70 dark:bg-white/[0.04] p-3.5 border border-transparent hover:border-emerald-500/15 transition-colors"
            >
              <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
              <span className="text-sm text-slate-600 dark:text-slate-300">
                {item}
              </span>
            </motion.li>
          ))}
        </ul>

        <p className="mt-5 text-xs text-slate-400 dark:text-slate-500">
          * All documents must be certified copies. International students may require additional documentation.
        </p>
      </motion.div>
    </div>
  )
}