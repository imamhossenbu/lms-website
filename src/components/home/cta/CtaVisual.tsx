"use client";

import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { MouseTilt } from "@/components/motion/MouseTilt";
import { EASE_OUT } from "@/components/motion/presets";
import { CtaDashboard } from "./CtaDashboard";
import { CtaVideoCard } from "./CtaVideoCard";

/**
 * Left side of the closing banner: the dashboard on a tilted tablet-style device that follows the pointer, a
 * floating graduation-cap tile and a live-lesson video card. The dashboard remounts when it scrolls into view so
 * its counters and chart animate where the visitor can see them.
 */
export function CtaVisual() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <div ref={ref} className="relative pb-16 pl-2 pr-6 pt-14 sm:pb-20">
      <div className="absolute left-1/2 top-1/2 -z-10 h-112 w-112 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-orange-20 blur-3xl" aria-hidden />

      <motion.div
        initial={{ opacity: 0, x: -40, rotate: -2 }}
        animate={inView ? { opacity: 1, x: 0, rotate: 0 } : undefined}
        transition={{ duration: 0.9, ease: EASE_OUT }}
      >
        <motion.div animate={reduce ? undefined : { y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
          <MouseTilt baseX={6} baseY={10} range={5}>
            <div className="rounded-4xl border border-white bg-white/70 p-2.5 shadow-2xl shadow-brand-orange/20 backdrop-blur">
              <div className="overflow-hidden rounded-3xl border border-dash">
                <CtaDashboard key={inView ? "shown" : "waiting"} />
              </div>
            </div>
          </MouseTilt>
        </motion.div>
      </motion.div>

      {/* Floating graduation-cap tile. */}
      <motion.div
        className="absolute right-24 top-0 hidden sm:block"
        initial={{ opacity: 0, scale: 0.4, rotate: -15 }}
        animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
        transition={{ type: "spring", stiffness: 240, damping: 14, delay: 0.6 }}
        aria-hidden
      >
        <motion.span
          animate={reduce ? undefined : { y: [0, -10, 0], rotate: [0, 4, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-24 w-24 items-center justify-center rounded-3xl border border-white bg-white/85 shadow-2xl shadow-brand-orange/30 backdrop-blur"
        >
          <GraduationCap className="h-12 w-12 text-brand-orange" />
        </motion.span>
      </motion.div>

      {/* Live lesson card. */}
      <motion.div
        className="absolute bottom-0 left-0 hidden sm:block"
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : undefined}
        transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.9 }}
      >
        <motion.div animate={reduce ? undefined : { y: [0, 8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}>
          <CtaVideoCard />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default CtaVisual;
