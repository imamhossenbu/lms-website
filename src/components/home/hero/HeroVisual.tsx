"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { MouseTilt } from "@/components/motion/MouseTilt";
import { EASE_OUT } from "@/components/motion/presets";
import { DashboardMock } from "./dashboard/DashboardMock";

/**
 * Right side of the hero: soft orange glows, accent strokes and the dashboard window, which swings in,
 * then floats gently and tilts towards the pointer.
 */
export function HeroVisual() {
  const reduce = useReducedMotion();
  return (
    <div className="relative">
      <motion.div
        className="absolute -right-10 -top-16 -z-10 h-96 w-96 rounded-full bg-brand-orange-20 blur-3xl"
        animate={reduce ? undefined : { scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <div className="absolute -bottom-10 -left-10 -z-10 h-72 w-72 rounded-full bg-brand-orange-10 blur-3xl" aria-hidden />
      <motion.div
        className="absolute -right-3 -top-8 hidden lg:block"
        initial={{ opacity: 0, scale: 0.4, rotate: -20 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 14, delay: 1.1 }}
        aria-hidden
      >
        <span className="absolute left-0 top-2 h-6 w-1.5 -rotate-12 rounded-full bg-brand-orange" />
        <span className="absolute left-4 top-5 h-6 w-1.5 rotate-45 rounded-full bg-brand-orange" />
        <span className="absolute left-6 top-12 h-1.5 w-6 -rotate-12 rounded-full bg-brand-orange" />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 40, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1, ease: EASE_OUT, delay: 0.25 }}>
        <motion.div animate={reduce ? undefined : { y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.3 }}>
          <MouseTilt>
            <BrowserFrame url="admin.edupro.io">
              <DashboardMock />
            </BrowserFrame>
          </MouseTilt>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default HeroVisual;
