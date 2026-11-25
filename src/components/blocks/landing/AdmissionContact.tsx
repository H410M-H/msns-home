"use client";

import { Mail, Phone, Clock, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";

const contactItems = [
  {
    icon: Phone,
    title: "Phone",
    content: "+92 (318) 7625415",
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-500/10",
    link: "tel:+923187625415",
  },
  {
    icon: Mail,
    title: "Email",
    content: "admissions@msns.edu.pk",
    color: "text-sky-600 dark:text-sky-400",
    bgColor: "bg-sky-500/10",
    link: "mailto:admissions@msns.edu.pk",
  },
  {
    icon: Clock,
    title: "Office Hours",
    content: ["Mon – Fri: 8:00 AM – 4:00 PM", "Saturday: 9:00 AM – 12:00 PM"],
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-500/10",
  },
];

export const ContactAdmissions = () => {
  return (
    <div className="h-full rounded-2xl border border-slate-200/60 bg-white p-6 backdrop-blur-sm dark:border-white/[0.08] dark:bg-white/[0.03]">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-indigo-500 shadow-md shadow-sky-500/20">
          <CalendarDays className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Contact Admissions
        </h2>
      </div>

      <div className="space-y-3">
        {contactItems.map((item, index) => {
          const Icon = item.icon;
          const isLink = !!item.link;
          const Tag = isLink ? "a" : "div";

          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <Tag
                {...(isLink ? { href: item.link } : {})}
                className={`block rounded-xl border border-transparent bg-slate-50 p-4 transition-all duration-200 hover:border-slate-200 dark:bg-white/[0.04] dark:hover:border-white/10 ${isLink ? "cursor-pointer hover:shadow-sm" : ""} `}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg ${item.bgColor} flex-shrink-0`}
                  >
                    <Icon className={`h-4 w-4 ${item.color}`} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {item.title}
                    </h3>
                    {Array.isArray(item.content) ? (
                      item.content.map((line, i) => (
                        <p
                          key={i}
                          className="mt-0.5 text-xs text-slate-500 dark:text-slate-400"
                        >
                          {line}
                        </p>
                      ))
                    ) : (
                      <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                        {item.content}
                      </p>
                    )}
                  </div>
                </div>
              </Tag>
            </motion.div>
          );
        })}
      </div>

      <motion.a
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        href="/contact"
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-sky-500/20 transition-all hover:shadow-lg hover:brightness-110"
      >
        <CalendarDays className="h-4 w-4" />
        Schedule a Campus Tour
      </motion.a>
    </div>
  );
};
