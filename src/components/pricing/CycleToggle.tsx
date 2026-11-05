"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

const OPTIONS: { value: "MONTHLY" | "YEARLY"; label: string }[] = [
  { value: "MONTHLY", label: "Monthly" },
  { value: "YEARLY", label: "Yearly" },
];

/** Monthly / Yearly pill switch with a sliding orange thumb. */
export function CycleToggle({ cycle, onChange }: { cycle: "MONTHLY" | "YEARLY"; onChange: (c: "MONTHLY" | "YEARLY") => void }) {
  return (
    <div className="inline-flex items-center rounded-full border border-dash bg-white p-1.5 shadow-xs" role="radiogroup" aria-label="Billing cycle">
      {OPTIONS.map((o) => {
        const active = cycle === o.value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o.value)}
            className={cn("relative w-32 rounded-full py-2.5 body-medium transition-colors whitespace-nowrap", active ? "text-white" : "text-primary-400 hover:text-primary-500")}
          >
            {active && (
              <motion.span layoutId="cycle-pill" className="absolute inset-0 rounded-full bg-brand-orange shadow-md shadow-brand-orange/30" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
            )}
            <span className="relative">{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default CycleToggle;
