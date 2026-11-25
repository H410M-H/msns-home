"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useState, type PointerEvent, type ReactNode } from "react";
import { cn } from "~/lib/utils";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Classes for the outer perspective wrapper (e.g. grid placement). */
  wrapperClassName?: string;
  /** Maximum tilt in degrees. */
  max?: number;
  /** Show a soft light that follows the pointer. */
  glare?: boolean;
};

/**
 * Card with kinetic 3D tilt that follows the pointer on a spring.
 * Inert on touch screens and when the visitor prefers reduced motion,
 * so it never interferes with scrolling or tapping.
 */
export function TiltCard({
  children,
  className,
  wrapperClassName,
  max = 8,
  glare = true,
}: TiltCardProps) {
  const reduce = useReducedMotion();
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFinePointer(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const enabled = finePointer && !reduce;

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 180, damping: 18, mass: 0.6 };
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring);
  const glareX = useTransform(px, (v) => `${v * 100}%`);
  const glareY = useTransform(py, (v) => `${v * 100}%`);
  const glareBg = useMotionTemplate`radial-gradient(420px circle at ${glareX} ${glareY}, rgba(255,255,255,0.18), transparent 45%)`;

  function handleMove(e: PointerEvent<HTMLDivElement>) {
    if (!enabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  function reset() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <div className={cn("[perspective:1000px]", wrapperClassName)}>
      <motion.div
        onPointerMove={handleMove}
        onPointerLeave={reset}
        style={
          enabled
            ? { rotateX, rotateY, transformStyle: "preserve-3d" }
            : undefined
        }
        className={cn("group relative will-change-transform", className)}
      >
        {children}
        {glare && enabled && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: glareBg }}
          />
        )}
      </motion.div>
    </div>
  );
}
