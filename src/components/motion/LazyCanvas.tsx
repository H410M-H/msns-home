"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "~/lib/utils";

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Reserves space for a 3D scene and only mounts it once it's near the
 * viewport. `render(active)` receives whether the scene is currently on
 * screen so it can pause its frame loop. Visitors who prefer reduced motion,
 * or whose browser has no WebGL, get the static `fallback` instead.
 */
export function LazyCanvas({
  render,
  fallback,
  className,
}: {
  render: (active: boolean) => ReactNode;
  fallback: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const near = useInView(ref, { once: true, margin: "200px 0px" });
  const visible = useInView(ref, { margin: "0px" });
  const reduce = useReducedMotion();
  const [webgl, setWebgl] = useState<boolean | null>(null);

  useEffect(() => {
    setWebgl(hasWebGL());
  }, []);

  const show3D = near && webgl === true && !reduce;

  return (
    <div ref={ref} className={cn("relative", className)}>
      {/* The fallback stays underneath so there is never an empty frame. */}
      <div className="absolute inset-0">{fallback}</div>
      {show3D && <div className="absolute inset-0">{render(visible)}</div>}
    </div>
  );
}
