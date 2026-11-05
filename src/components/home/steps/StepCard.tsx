"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { STEPS, type Step, type ToneKey } from "@/lib/content";
import { ToneIcon } from "@/components/shared/ToneIcon";
import { SignupIllustration } from "./illustrations/SignupIllustration";
import { ContentIllustration } from "./illustrations/ContentIllustration";
import { LiveClassIllustration } from "./illustrations/LiveClassIllustration";

const ILLUSTRATION: Record<Step["id"], React.ComponentType> = {
  create: SignupIllustration,
  content: ContentIllustration,
  teach: LiveClassIllustration,
};

/** Number badge + the soft wave behind the illustration, per tone. */
const TONE_STYLE: Partial<Record<ToneKey, { badge: string; wave: string }>> = {
  orange: { badge: "bg-brand-orange-light text-brand-orange", wave: "bg-brand-orange-10" },
  blue: { badge: "bg-blue-14 text-blue", wave: "bg-blue-14" },
  green: { badge: "bg-green-bg text-green", wave: "bg-green-bg" },
};

/**
 * One "How it works" step: tinted icon, number badge, title, text and its illustration on a soft wave.
 * Takes the step index (step data holds icon components, so it's read here on the client).
 */
export function StepCard({ index }: { index: number }) {
  const step = STEPS[index];
  if (!step) return null;
  const Illustration = ILLUSTRATION[step.id];
  const tone = TONE_STYLE[step.tone] ?? TONE_STYLE.orange!;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-dash bg-white p-6 shadow-xs"
    >
      <div className="flex items-start justify-between">
        <ToneIcon icon={step.icon} tone={step.tone} size="lg" />
        <span className={cn("flex h-10 w-10 items-center justify-center rounded-full heading-h6-bold", tone.badge)}>{index + 1}</span>
      </div>
      <h3 className="heading-h3-bold tracking-tight text-primary-500 mt-5">{step.title}</h3>
      <p className="body-regular text-primary-300 mt-2">{step.text}</p>
      <div className="relative mt-8 flex flex-1 items-end pb-2">
        <div className={cn("absolute -bottom-16 -left-10 -right-10 h-40 rounded-t-full", tone.wave)} aria-hidden />
        <div className="relative w-full">
          <Illustration />
        </div>
      </div>
    </motion.div>
  );
}

export default StepCard;
