"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/** Arrow between step cards that keeps nudging forward. */
export function FlowArrow() {
  const reduce = useReducedMotion();
  return (
    <motion.span className="inline-flex text-brand-orange" animate={reduce ? undefined : { x: [0, 6, 0], opacity: [0.6, 1, 0.6] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
      <ArrowRight className="h-6 w-6" />
    </motion.span>
  );
}

export default FlowArrow;
