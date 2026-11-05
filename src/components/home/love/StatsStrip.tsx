"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, GraduationCap, PlayCircle, Users, type LucideIcon } from "lucide-react";
import type { PlatformStats } from "@/lib/stats";
import { CountUp } from "@/components/motion/CountUp";
import { EASE_OUT } from "@/components/motion/presets";

const ITEMS: { key: keyof PlatformStats; label: string; icon: LucideIcon }[] = [
  { key: "institutions", label: "Institutions", icon: Users },
  { key: "students", label: "Students", icon: GraduationCap },
  { key: "liveClasses", label: "Live classes", icon: PlayCircle },
  { key: "courses", label: "Published courses", icon: BookOpen },
];

/** Live platform numbers (from the API) in one rounded bar; each counts up when it scrolls into view. */
export function StatsStrip({ stats }: { stats: PlatformStats }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
      className="grid grid-cols-2 gap-y-6 rounded-3xl border border-brand-orange-10 bg-gradient-to-r from-brand-orange-soft via-white to-brand-orange-soft px-6 py-7 shadow-sm lg:grid-cols-4 lg:divide-x lg:divide-dash"
    >
      {ITEMS.map(({ key, label, icon: Icon }, i) => (
        <div key={key} className="flex items-center justify-center gap-4 px-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-orange-light text-brand-orange shadow-sm shadow-brand-orange/10">
            <Icon className="h-7 w-7" />
          </span>
          <span>
            <CountUp to={stats[key] as number} delay={i * 0.1} className="heading-h1-bold text-primary-500 block" />
            <span className="body-regular text-primary-300">{label}</span>
          </span>
        </div>
      ))}
    </motion.div>
  );
}

export default StatsStrip;
