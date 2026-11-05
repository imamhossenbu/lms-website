"use client";

import React from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import type { ToneKey } from "@/lib/content";
import { ToneIcon } from "@/components/shared/ToneIcon";
import { CountUp } from "@/components/motion/CountUp";
import { EASE_OUT } from "@/components/motion/presets";

interface MockKpiCardProps {
  icon: LucideIcon;
  tone: ToneKey;
  value: number;
  label: string;
  /** Position in the row (staggers the entrance and the count). */
  index?: number;
}

/** One KPI tile of the hero dashboard: tinted icon, a number that counts up, label. */
export function MockKpiCard({ icon, tone, value, label, index = 0 }: MockKpiCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.7 + index * 0.08 }}
      className="rounded-xl border border-dash bg-white p-3.5 shadow-xs"
    >
      <ToneIcon icon={icon} tone={tone} size="sm" />
      <CountUp to={value} delay={0.8 + index * 0.08} className="heading-h4-semibold font-bold text-primary-500 block mt-2.5" />
      <span className="body-2xsm-regular text-primary-300">{label}</span>
    </motion.div>
  );
}

export default MockKpiCard;
