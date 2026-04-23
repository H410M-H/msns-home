"use client"

import { useState } from "react"
import { Banknote, Book, Building, Calculator, Calendar, CreditCard, School, Ticket } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const feeData = {
  primary: { registration: 500, tuition: 3000, examination: 100 },
  middle: { registration: 600, tuition: 3500, examination: 150 },
  high: { registration: 700, tuition: 4000, examination: 200 },
} as const

type Level = keyof typeof feeData

const levels: { id: Level; label: string }[] = [
  { id: "primary", label: "Primary" },
  { id: "middle", label: "Middle" },
  { id: "high", label: "High" },
]

const additionalCosts = [
  "Uniform: PKR 150 – 200 (varies by grade)",
  "Books / stationery: PKR 200 – 400 / year",
  "School trips: Varies by destination",
  "Extracurricular fees: Activity dependent",
]

const paymentMethods = [
  { icon: Banknote, label: "School Portal" },
  { icon: Building, label: "Bank Transfer" },
  { icon: CreditCard, label: "Credit / Debit" },
  { icon: Book, label: "Cheque" },
]

function getFeeRows(fees: (typeof feeData)[Level]) {
  return [
    { type: "Application Fee", amount: "PKR 5,000", frequency: "One-time (non-refundable)" },
    { type: "Registration Fee", amount: `PKR ${fees.registration.toLocaleString()}`, frequency: "One-time (non-refundable)" },
    { type: "Tuition Fee", amount: `PKR ${fees.tuition.toLocaleString()}`, frequency: "Per term (3 terms / year)" },
    { type: "Development Fund", amount: "PKR 300", frequency: "Annual" },
    { type: "Technology Fee", amount: "PKR 200", frequency: "Annual" },
    { type: "Examination Fee", amount: `PKR ${fees.examination.toLocaleString()}`, frequency: "Per term" },
  ]
}

export const FeeStructure = () => {
  const [activeLevel, setActiveLevel] = useState<Level>("primary")
  const fees = feeData[activeLevel]

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
          Fee Structure{" "}
          <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
            & Payment
          </span>
        </h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-xl">
          Transparent pricing for every level. Select a school level to view fees.
        </p>
      </motion.div>

      {/* Level Selector */}
      <div className="inline-flex gap-1 p-1 rounded-xl bg-slate-100 dark:bg-white/[0.06] border border-slate-200/60 dark:border-white/[0.08]">
        {levels.map((level) => {
          const isActive = activeLevel === level.id
          return (
            <button
              key={level.id}
              onClick={() => setActiveLevel(level.id)}
              className={`
                relative flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer
                ${isActive
                  ? "text-white shadow-md"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }
              `}
            >
              {isActive && (
                <motion.div
                  layoutId="feeLevel"
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.45 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <School className="h-4 w-4" />
                {level.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* Fee Table */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeLevel}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="space-y-6"
        >
          <div className="overflow-hidden rounded-2xl border border-slate-200/60 dark:border-white/[0.08]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-white/[0.04]">
                  <th className="p-3.5 text-left font-semibold text-slate-700 dark:text-slate-300">
                    <span className="inline-flex items-center gap-1.5">
                      <Book className="h-4 w-4" /> Fee Type
                    </span>
                  </th>
                  <th className="p-3.5 text-left font-semibold text-slate-700 dark:text-slate-300">
                    <span className="inline-flex items-center gap-1.5">
                      <Calculator className="h-4 w-4" /> Amount
                    </span>
                  </th>
                  <th className="p-3.5 text-left font-semibold text-slate-700 dark:text-slate-300 hidden sm:table-cell">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" /> Frequency
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {getFeeRows(fees).map((fee, index) => (
                  <tr
                    key={fee.type}
                    className={`border-t border-slate-100 dark:border-white/[0.05] transition-colors hover:bg-slate-50/60 dark:hover:bg-white/[0.02] ${index % 2 === 0 ? "" : "bg-slate-50/30 dark:bg-white/[0.01]"
                      }`}
                  >
                    <td className="p-3.5 font-medium text-slate-800 dark:text-slate-200">
                      {fee.type}
                    </td>
                    <td className="p-3.5 font-semibold text-emerald-600 dark:text-emerald-400">
                      {fee.amount}
                    </td>
                    <td className="p-3.5 text-slate-500 dark:text-slate-400 hidden sm:table-cell">
                      {fee.frequency}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards */}
          <div className="grid gap-5 md:grid-cols-2">
            {/* Additional Costs */}
            <div className="rounded-2xl border border-slate-200/60 dark:border-white/[0.08] bg-white dark:bg-white/[0.03] p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10">
                  <Ticket className="h-4.5 w-4.5 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Additional Costs
                </h3>
              </div>
              <ul className="space-y-2.5">
                {additionalCosts.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-500 dark:text-slate-400">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Payment Details */}
            <div className="rounded-2xl border border-slate-200/60 dark:border-white/[0.08] bg-white dark:bg-white/[0.03] p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-500/10">
                  <CreditCard className="h-4.5 w-4.5 text-sky-600 dark:text-sky-400" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Payment Details
                </h3>
              </div>

              <div className="space-y-5">
                <div>
                  <h4 className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Methods
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.label}
                        className="flex items-center gap-2 rounded-lg bg-slate-50 dark:bg-white/[0.04] p-2.5 text-sm text-slate-600 dark:text-slate-300"
                      >
                        <method.icon className="h-4 w-4 text-emerald-500" />
                        {method.label}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Schedule
                  </h4>
                  <div className="space-y-1.5 text-sm">
                    {[
                      { term: "Term 1", due: "Due Aug 1" },
                      { term: "Term 2", due: "Due Dec 1" },
                      { term: "Term 3", due: "Due Apr 1" },
                    ].map((s) => (
                      <div
                        key={s.term}
                        className="flex justify-between py-1.5 text-slate-500 dark:text-slate-400"
                      >
                        <span>{s.term}</span>
                        <span className="font-medium text-slate-700 dark:text-slate-300">
                          {s.due}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Note */}
          <div className="rounded-xl border border-emerald-500/15 bg-emerald-50/50 dark:bg-emerald-500/[0.05] p-4 text-sm text-slate-600 dark:text-slate-400">
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">Note: </span>
            Late payment fee: PKR 50. Sibling discounts: 10% (2nd child), 15% (3rd+ children). Payment plans available upon request.
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}