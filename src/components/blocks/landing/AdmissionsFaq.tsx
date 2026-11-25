"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  ChevronDown,
  BookOpen,
  Bus,
  GraduationCap,
  Coins,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    icon: GraduationCap,
    question: "When can I apply for admission?",
    answer:
      "Our main admission cycle begins in January for the academic year starting in August. However, we accept applications throughout the year for mid-term admissions, subject to seat availability.",
  },
  {
    icon: GraduationCap,
    question: "How can I check the status of my application?",
    answer:
      "You can log in to the parent portal using the credentials provided during application submission to check your application status. Alternatively, you can contact our admissions office directly.",
  },
  {
    icon: BookOpen,
    question: "What is the student-teacher ratio at your school?",
    answer:
      "We maintain a student-teacher ratio of 1:16 in primary classes and 1:20 in middle and high school classes to ensure personalized attention for each student.",
  },
  {
    icon: Coins,
    question: "Do you offer financial aid or scholarships?",
    answer:
      "Yes, we offer merit-based scholarships and need-based financial aid. Applications for financial assistance should be submitted along with the admission application. Please contact our admissions office for more details.",
    note: "Scholarship applications deadline: March 15, 2026",
  },
  {
    icon: GraduationCap,
    question: "Is there a waiting list if classes are full?",
    answer:
      "Yes, when classes reach capacity, qualified applicants are placed on a waiting list. We contact families as soon as a spot becomes available.",
  },
  {
    icon: BookOpen,
    question: "What curriculum does the school follow?",
    answer:
      "Our school follows a comprehensive curriculum with collaboration with Oxford University Press, focusing on holistic development, 21st-century skills, and a 60% practical, activity-based learning approach.",
  },
  {
    icon: Bus,
    question: "Are there transportation services available?",
    answer:
      "Yes, we provide bus transportation services covering major areas. Transportation fees vary depending on the distance from the school.",
  },
  {
    icon: BookOpen,
    question: "What extracurricular activities are offered?",
    answer:
      "We offer a wide range of extracurricular activities including sports, performing arts, visual arts, robotics, debate, community service, and various academic clubs.",
  },
];

function FaqItem({
  faq,
  index,
}: {
  faq: (typeof faqs)[number];
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = faq.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
    >
      <div
        className={`rounded-xl border transition-all duration-300 ${
          isOpen
            ? "border-emerald-500/20 bg-emerald-50/30 shadow-sm dark:bg-emerald-500/[0.04]"
            : "border-slate-200/60 bg-white hover:border-slate-300 dark:border-white/[0.08] dark:bg-white/[0.03] dark:hover:border-white/[0.12]"
        }`}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left"
        >
          <div className="flex items-center gap-3.5">
            <div
              className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${
                isOpen
                  ? "bg-emerald-500/15"
                  : "bg-slate-100 dark:bg-white/[0.06]"
              } transition-colors`}
            >
              <Icon
                className={`h-4 w-4 ${isOpen ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400 dark:text-slate-500"} transition-colors`}
              />
            </div>
            <span className="text-sm font-semibold text-slate-800 md:text-base dark:text-slate-200">
              {faq.question}
            </span>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="flex-shrink-0"
          >
            <ChevronDown
              className={`h-5 w-5 ${isOpen ? "text-emerald-500" : "text-slate-400"} transition-colors`}
            />
          </motion.div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="px-5 pt-0 pb-5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                <div className="pl-11.5">
                  {faq.answer}
                  {faq.note && (
                    <div className="mt-3 rounded-lg border border-emerald-500/15 bg-emerald-50 p-3 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                      {faq.note}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export const AdmissionsFaq = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-slate-900 md:text-3xl dark:text-white">
          Frequently Asked{" "}
          <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
            Questions
          </span>
        </h2>
        <p className="mt-2 max-w-xl text-sm text-slate-500 dark:text-slate-400">
          Quick answers to the most common admissions questions.
        </p>
      </motion.div>

      {/* FAQ Items */}
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <FaqItem key={index} faq={faq} index={index} />
        ))}
      </div>

      {/* Still have questions? */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-2xl border border-slate-200/60 bg-gradient-to-br from-emerald-50/50 to-sky-50/30 p-6 text-center md:p-8 dark:border-white/[0.08] dark:from-emerald-500/[0.05] dark:to-sky-500/[0.03]"
      >
        <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
          Still have questions?
        </h3>
        <p className="mb-5 text-sm text-slate-500 dark:text-slate-400">
          Our admissions team is ready to assist you with any inquiries.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href="tel:+923187625415"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-500/20 transition-all hover:shadow-lg hover:brightness-110 sm:w-auto"
          >
            <Phone className="h-4 w-4" />
            Call Admissions
          </a>
          <a
            href="mailto:admissions@msns.edu.pk"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition-all hover:border-emerald-500/30 hover:shadow-sm sm:w-auto dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-slate-300"
          >
            <Mail className="h-4 w-4" />
            Email Inquiry
          </a>
        </div>
        <p className="mt-4 text-xs text-slate-400 dark:text-slate-500">
          Typical response time: within 24 hours
        </p>
      </motion.div>
    </div>
  );
};
