"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "./presets";

interface Part {
  text: string;
  className?: string;
}

/**
 * Headline whose words rise in one by one (out of a blur). Pass `parts` to style phrases differently,
 * e.g. [{ text: "Run your whole academy" }, { text: "online", className: "text-brand-orange" }].
 */
export function RevealWords({ parts, delay = 0, stagger = 0.07, className }: { parts: Part[]; delay?: number; stagger?: number; className?: string }) {
  const reduce = useReducedMotion();
  const words = parts.flatMap((p) => p.text.split(" ").filter(Boolean).map((w) => ({ w, className: p.className })));
  if (reduce)
    return (
      <span className={className}>
        {parts.map((p, i) => (
          <span key={i} className={p.className}>
            {p.text}
            {i < parts.length - 1 ? " " : ""}
          </span>
        ))}
      </span>
    );
  return (
    <span className={className} aria-label={parts.map((p) => p.text).join(" ")}>
      {words.map(({ w, className: c }, i) => (
        <React.Fragment key={i}>
          {/* Space outside the clipped box: trailing spaces inside an inline-block are dropped. */}
          <span className="inline-block overflow-hidden pb-1 align-bottom" aria-hidden>
            <motion.span
              className={`inline-block ${c ?? ""}`}
              initial={{ y: "100%", opacity: 0, filter: "blur(8px)" }}
              animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.7, ease: EASE_OUT, delay: delay + i * stagger }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 && " "}
        </React.Fragment>
      ))}
    </span>
  );
}

export default RevealWords;
