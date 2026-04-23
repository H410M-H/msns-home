"use client"

import { BookOpenCheck, Cake, School, Star, BadgeCheck } from "lucide-react"
import { motion } from "framer-motion"

const ageRequirements = [
  { grade: "Nursery", age: "3 years" },
  { grade: "Pre-Kindergarten", age: "4 years" },
  { grade: "Kindergarten", age: "5 years" },
  { grade: "Grade 1", age: "6 years" },
  { grade: "Other Grades", age: "Age appropriate for the grade level" },
]

const academicConsiderations = [
  "Performance in the entrance assessment",
  "Previous academic records",
  "Teacher recommendations (for transfers)",
  "Interview performance",
]

const additionalConsiderations = [
  "Student character and values alignment with our school philosophy",
  "Participation in extracurricular activities",
  "Special talents or abilities",
  "Siblings of current students (priority consideration)",
  "Children of alumni (priority consideration)",
]

export const AdmissionsCriteria = () => {
  return (
    <div className="space-y-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
          Admissions{" "}
          <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
            Criteria
          </span>
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl">
          Understand our age, academic, and holistic requirements for each grade level.
        </p>
      </motion.div>

      {/* Age Requirements */}
      <motion.div
        className="rounded-2xl border border-slate-200/60 dark:border-white/[0.08] bg-white dark:bg-white/[0.03] overflow-hidden"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="p-5 pb-0 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10">
            <Cake className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Age Requirements
          </h3>
        </div>

        <div className="p-5">
          <div className="overflow-hidden rounded-xl border border-slate-200/60 dark:border-white/[0.08]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-white/[0.04]">
                  <th className="p-3.5 text-left font-semibold text-slate-700 dark:text-slate-300">
                    Grade Level
                  </th>
                  <th className="p-3.5 text-left font-semibold text-slate-700 dark:text-slate-300">
                    Age Requirement (as of Jan 31, 2026)
                  </th>
                </tr>
              </thead>
              <tbody>
                {ageRequirements.map((req, index) => (
                  <tr
                    key={req.grade}
                    className={`border-t border-slate-100 dark:border-white/[0.05] transition-colors hover:bg-slate-50/60 dark:hover:bg-white/[0.02] ${
                      index % 2 === 0 ? "bg-transparent" : "bg-slate-50/30 dark:bg-white/[0.01]"
                    }`}
                  >
                    <td className="p-3.5 font-medium text-slate-800 dark:text-slate-200">
                      {req.grade}
                    </td>
                    <td className="p-3.5 text-slate-500 dark:text-slate-400">
                      {req.age}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Academic Requirements */}
      <motion.div
        className="rounded-2xl border border-slate-200/60 dark:border-white/[0.08] bg-white dark:bg-white/[0.03] p-5 md:p-6"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10">
            <BookOpenCheck className="h-5 w-5 text-sky-600 dark:text-sky-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Academic Requirements
          </h3>
        </div>

        <p className="mb-5 text-sm text-slate-500 dark:text-slate-400">
          We seek students who demonstrate academic potential and a willingness to learn. Admission decisions are based on:
        </p>

        <ul className="grid gap-3 sm:grid-cols-2">
          {academicConsiderations.map((item, index) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + index * 0.06 }}
              className="flex items-center gap-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] p-3.5 border border-transparent hover:border-sky-500/15 transition-colors"
            >
              <School className="h-4 w-4 text-sky-500 flex-shrink-0" />
              <span className="text-sm text-slate-600 dark:text-slate-300">{item}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Additional Considerations */}
      <motion.div
        className="rounded-2xl border border-slate-200/60 dark:border-white/[0.08] bg-white dark:bg-white/[0.03] p-5 md:p-6"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10">
            <Star className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Additional Considerations
          </h3>
        </div>

        <p className="mb-5 text-sm text-slate-500 dark:text-slate-400">
          While academic performance is important, we also consider:
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          {additionalConsiderations.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 + index * 0.06 }}
              className="flex items-start gap-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] p-3.5 border border-transparent hover:border-purple-500/15 transition-colors"
            >
              <BadgeCheck className="mt-0.5 h-4 w-4 text-purple-500 flex-shrink-0" />
              <span className="text-sm text-slate-600 dark:text-slate-300">{item}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}