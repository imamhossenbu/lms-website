"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { Waves } from "./Waves";

interface PageHeroProps {
  eyebrow: string;
  eyebrowIcon?: React.ReactNode;
  title: string;
  /** Phrase of the title in orange with the hand-drawn underline. */
  highlight?: string;
  subtitle?: string;
  /** Content under the heading (chips, toggles, cards…). */
  children?: React.ReactNode;
  className?: string;
}

/**
 * Top of an inner page (pricing, features, contact…), in the home page's style: soft orange gradient with
 * drifting glows and a dot grid, the page's h1 with eyebrow + underlined highlight, optional content, waves below.
 */
export function PageHero({ eyebrow, eyebrowIcon, title, highlight, subtitle, children, className }: PageHeroProps) {
  const reduce = useReducedMotion();
  return (
    <section className={`relative isolate overflow-hidden bg-gradient-to-b from-brand-orange-soft via-white to-white ${className ?? ""}`}>
      <motion.div
        className="absolute -left-32 -top-24 -z-10 h-112 w-112 rounded-full bg-brand-orange-20 blur-3xl"
        animate={reduce ? undefined : { x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <motion.div
        className="absolute -right-32 top-10 -z-10 h-96 w-96 rounded-full bg-brand-orange-10 blur-3xl"
        animate={reduce ? undefined : { x: [0, -30, 0], y: [0, 30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <svg className="absolute inset-0 -z-10 h-full w-full text-brand-orange opacity-20" aria-hidden>
        <defs>
          <pattern id="page-hero-dots" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="currentColor" />
          </pattern>
          <radialGradient id="page-hero-fade" cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="black" />
          </radialGradient>
          <mask id="page-hero-mask">
            <rect width="100%" height="100%" fill="url(#page-hero-fade)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#page-hero-dots)" mask="url(#page-hero-mask)" />
      </svg>
      <Waves className="opacity-60" />

      <div className="mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pt-20">
        <SectionHeading as="h1" onMount eyebrow={eyebrow} eyebrowIcon={eyebrowIcon} title={title} highlight={highlight} underline={!!highlight} subtitle={subtitle} />
        {children && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.35 }} className="mt-10">
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default PageHero;
