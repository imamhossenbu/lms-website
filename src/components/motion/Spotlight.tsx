"use client";

import React from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * Wraps a card: a soft brand-orange glow follows the pointer inside it (fades in on hover).
 * The child should be the card itself (rounded corners are inherited via `className`).
 */
export function Spotlight({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const glow = useMotionTemplate`radial-gradient(260px circle at ${x}px ${y}px, var(--color-brand-orange-10), transparent 70%)`;

  if (reduce) return <div className={cn("relative h-full", className)}>{children}</div>;

  return (
    <div
      className={cn("group relative h-full", className)}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
      }}
    >
      {children}
      <motion.div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: glow }} aria-hidden />
    </div>
  );
}

export default Spotlight;
