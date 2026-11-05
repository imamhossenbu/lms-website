"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";

/** Pill button at the bottom of the footer that scrolls smoothly back to the top of the page. */
export function BackToTop() {
  const reduce = useReducedMotion();
  return (
    <motion.button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="group inline-flex items-center gap-2 rounded-xl border border-dash bg-white px-4 py-2.5 body-sm-medium text-primary-500 shadow-xs transition-colors hover:border-brand-orange hover:text-brand-orange"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-orange-light text-brand-orange transition-transform duration-300 group-hover:-translate-y-0.5">
        <ArrowUp className="h-3.5 w-3.5" />
      </span>
      Back to top
    </motion.button>
  );
}

export default BackToTop;
