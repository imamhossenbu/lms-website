"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/** A small brand dot with a ring that keeps pulsing outwards ("live" / "new" indicator). */
export function PulseDot() {
  const reduce = useReducedMotion();
  return (
    <span className="relative flex h-2 w-2" aria-hidden>
      {!reduce && (
        <motion.span
          className="absolute inset-0 rounded-full bg-brand-orange"
          animate={{ scale: [1, 2.6], opacity: [0.55, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      <span className="relative h-2 w-2 rounded-full bg-brand-orange" />
    </span>
  );
}

export default PulseDot;
