"use client";

import React, { useRef } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { SHOW_TRUSTED_BY, TRUSTED_ORGS } from "@/lib/trustedBy";
import { OrgLogo } from "./OrgLogo";

/** One full loop takes this long. */
const LOOP_MS = 40_000;

/**
 * "Trusted by" marquee under the hero: two copies of the logo row move left by one copy's width and wrap,
 * so the strip scrolls endlessly. It pauses while hovered, fades at both edges, and stays still (wrapped
 * into rows) for people who prefer reduced motion.
 */
export function TrustedBy() {
  const reduce = useReducedMotion();
  const paused = useRef(false);
  const progress = useMotionValue(0);
  const x = useTransform(progress, (p) => `${-p * 50}%`);

  useAnimationFrame((_, delta) => {
    if (reduce || paused.current) return;
    progress.set((progress.get() + delta / LOOP_MS) % 1);
  });

  if (!SHOW_TRUSTED_BY || TRUSTED_ORGS.length === 0) return null;

  const row = (copy: number) => (
    <div className="flex shrink-0 items-center gap-14 pr-14" aria-hidden={copy > 0}>
      {TRUSTED_ORGS.map((org) => (
        <OrgLogo key={`${copy}-${org.name}`} org={org} />
      ))}
    </div>
  );

  return (
    <section className="bg-white py-10" aria-label="Institutions using EduPro">
      <p className="text-center body-sm-medium text-primary-300">Trusted by schools, coaching centres and training institutes</p>
      <div className="relative mt-7 overflow-hidden" onMouseEnter={() => (paused.current = true)} onMouseLeave={() => (paused.current = false)}>
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />
        {reduce ? (
          <div className="flex flex-wrap justify-center gap-x-14 gap-y-6 px-4">
            {TRUSTED_ORGS.map((org) => (
              <OrgLogo key={org.name} org={org} />
            ))}
          </div>
        ) : (
          <motion.div className="flex w-max" style={{ x }}>
            {row(0)}
            {row(1)}
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default TrustedBy;
