"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Site-wide motion settings. `reducedMotion="user"` makes every framer-motion
 * animation honour the visitor's "reduce motion" OS setting: transforms and
 * layout animations are skipped, opacity still fades.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ type: "spring", stiffness: 140, damping: 22, mass: 0.9 }}
    >
      {children}
    </MotionConfig>
  );
}
