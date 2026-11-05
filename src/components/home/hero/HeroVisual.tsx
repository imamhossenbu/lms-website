"use client";

import React from "react";
import { motion } from "framer-motion";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { DashboardMock } from "./dashboard/DashboardMock";

/** Right side of the hero: soft orange blob, accent strokes and the tilted dashboard window. */
export function HeroVisual() {
  return (
    <div className="relative" style={{ perspective: 1600 }}>
      {/* Soft orange shape behind the window. */}
      <div className="absolute -right-10 -top-16 -z-10 h-96 w-96 rounded-full bg-brand-orange-20 blur-3xl" aria-hidden />
      <div className="absolute -bottom-10 -left-10 -z-10 h-72 w-72 rounded-full bg-brand-orange-10 blur-3xl" aria-hidden />
      {/* Accent strokes at the top-right corner. */}
      <div className="absolute -right-3 -top-8 hidden lg:block" aria-hidden>
        <span className="absolute left-0 top-2 h-6 w-1.5 -rotate-12 rounded-full bg-brand-orange" />
        <span className="absolute left-4 top-5 h-6 w-1.5 rotate-45 rounded-full bg-brand-orange" />
        <span className="absolute left-6 top-12 h-1.5 w-6 -rotate-12 rounded-full bg-brand-orange" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30, rotateY: -14, rotateX: 6 }}
        animate={{ opacity: 1, y: 0, rotateY: -8, rotateX: 3 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
        whileHover={{ rotateY: -3, rotateX: 1 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <BrowserFrame url="admin.edupro.io">
          <DashboardMock />
        </BrowserFrame>
      </motion.div>
    </div>
  );
}

export default HeroVisual;
