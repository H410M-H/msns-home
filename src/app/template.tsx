"use client";

import { motion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

// A template re-mounts on every navigation. The first mount (the hard page
// load, and every server render) shows content without animation so the
// server HTML is visible at once and LCP isn't delayed. Later client-side
// navigations get a short spring-in.
let hasNavigated = false;

export default function Template({ children }: { children: ReactNode }) {
  const [animate] = useState(() => hasNavigated);

  useEffect(() => {
    hasNavigated = true;
  }, []);

  // Only opacity and translate: a lingering filter or transform would make
  // this wrapper the containing block for position: fixed popups.
  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 16 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 170, damping: 24, mass: 0.8 }}
    >
      {children}
    </motion.div>
  );
}
