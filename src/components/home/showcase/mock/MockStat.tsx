"use client";

import React from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

export type MockStatTone = "orange" | "green" | "blue" | "purple" | "red" | "yellow";

export interface MockStatData {
  icon: LucideIcon;
  label: string;
  value: string;
  /** Small trend note under the value, e.g. "+12% this month". */
  note: string;
  tone: MockStatTone;
}

const TONES: Record<MockStatTone, string> = {
  orange: "bg-brand-orange-light text-brand-orange",
  green: "bg-green-bg text-green",
  blue: "bg-blue-14 text-blue",
  purple: "bg-purple-14 text-purple",
  red: "bg-red-14 text-red",
  yellow: "bg-yellow-14 text-yellow",
};

/** A small KPI tile at the top of a preview screen: tinted icon chip, value, label and a trend note. */
export function MockStat({ icon: Icon, label, value, note, tone, index }: MockStatData & { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="flex min-w-0 items-center gap-2.5 rounded-xl border border-dash bg-white p-2.5 shadow-xs"
    >
      <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", TONES[tone])}>
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0">
        <span className="body-sm-medium block font-semibold text-primary-500">{value}</span>
        <span className="body-2xsm-regular block truncate text-primary-300">{label}</span>
        <span className="body-2xsm-regular block truncate text-green">{note}</span>
      </span>
    </motion.div>
  );
}

export default MockStat;
