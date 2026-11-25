"use client";

import { motion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";

const springIn = {
  type: "spring",
  stiffness: 120,
  damping: 20,
  mass: 0.8,
} as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay in seconds. */
  delay?: number;
  /** Vertical travel in px (0 for a pure fade). */
  y?: number;
  as?: "div" | "section" | "li" | "article";
};

const motionTags = {
  div: motion.div,
  section: motion.section,
  li: motion.li,
  article: motion.article,
} satisfies Record<NonNullable<RevealProps["as"]>, ElementType>;

/**
 * Scroll-triggered spring reveal for below-the-fold content. Don't wrap the
 * page's LCP element (main heading or hero image) in this: it starts hidden.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  as = "div",
}: RevealProps) {
  const Tag = motionTags[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ ...springIn, delay }}
    >
      {children}
    </Tag>
  );
}

const groupVariants: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 26, scale: 0.98 },
  shown: { opacity: 1, y: 0, scale: 1, transition: springIn },
};

/** Container that staggers its `RevealItem` children into view. */
export function RevealGroup({
  children,
  className,
  as = "div",
  margin = "0px 0px -10% 0px",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
  /** IntersectionObserver root margin; use "0px" for content near the fold. */
  margin?: `${number}px` | `${number}px ${number}px ${number}% ${number}px`;
}) {
  const Tag = as === "ul" ? motion.ul : as === "ol" ? motion.ol : motion.div;
  return (
    <Tag
      className={className}
      variants={groupVariants}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin }}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const Tag = as === "li" ? motion.li : motion.div;
  return (
    <Tag className={className} variants={itemVariants}>
      {children}
    </Tag>
  );
}
