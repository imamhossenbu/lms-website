"use client";

import React from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { EASE_OUT } from "@/components/motion/presets";

export interface Perk {
  icon: LucideIcon;
  label: string;
}

/** A row of reassurance perks (orange icon + label) separated by thin dividers; items rise in one after another. */
export function PerkList({ perks, className, delay = 0.5 }: { perks: Perk[]; className?: string; delay?: number }) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-y-3", className)}>
      {perks.map(({ icon: Icon, label }, i) => (
        <motion.li
          key={label}
          className={cn("flex items-center gap-2.5 pr-5", i > 0 && "border-l border-dash pl-5")}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: EASE_OUT, delay: delay + i * 0.1 }}
        >
          <Icon className="h-6 w-6 shrink-0 text-brand-orange" />
          <span className="body-medium whitespace-nowrap text-primary-500">{label}</span>
        </motion.li>
      ))}
    </ul>
  );
}

export default PerkList;
