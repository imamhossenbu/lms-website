"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MousePointer2 } from "lucide-react";
import { cn } from "@/lib/cn";

/** A pointer that drifts in and "clicks" (presses + ripple) on a loop — for product illustrations. */
export function ClickingCursor({ className, delay = 0 }: { className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <MousePointer2 className={cn("h-5 w-5 fill-white text-primary-500", className)} aria-hidden />;
  return (
    <motion.span
      className={cn("inline-flex", className)}
      animate={{ x: [10, 0, 0, 10], y: [10, 0, 0, 10], scale: [1, 1, 0.82, 1] }}
      transition={{ duration: 2.6, times: [0, 0.35, 0.5, 1], repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut", delay }}
      aria-hidden
    >
      <motion.span
        className="absolute -left-1 -top-1 h-4 w-4 rounded-full bg-brand-orange/40"
        animate={{ scale: [0, 0, 2.2, 0], opacity: [0, 0, 0.6, 0] }}
        transition={{ duration: 2.6, times: [0, 0.45, 0.6, 1], repeat: Infinity, repeatDelay: 1.2, delay }}
      />
      <MousePointer2 className="relative h-5 w-5 fill-white text-primary-500" />
    </motion.span>
  );
}

export default ClickingCursor;
