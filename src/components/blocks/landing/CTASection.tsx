"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { ChevronRight } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="text-primary-foreground bg-green-700 px-4 py-16 md:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <motion.h2
          className="mb-4 text-3xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Ready to Join Our Community?
        </motion.h2>
        <motion.p
          className="mb-8 text-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Take the first step towards a bright future with M.S. Naz High School.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link href="/admission">
            <Button
              size="lg"
              className="rounded-full bg-emerald-500 px-8 py-6 text-lg text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-emerald-600"
            >
              Start Your Journey <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
