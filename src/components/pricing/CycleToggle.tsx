"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

/** Monthly / Yearly switch with a sliding pill and the yearly saving. */
export function CycleToggle({ cycle, onChange, saving }: { cycle: "MONTHLY" | "YEARLY"; onChange: (c: "MONTHLY" | "YEARLY") => void; saving: number }) {
  const options: { value: "MONTHLY" | "YEARLY"; label: string }[] = [
    { value: "MONTHLY", label: "Monthly" },
    { value: "YEARLY", label: "Yearly" },
  ];
  return (
    <div className="inline-flex items-center rounded-full border border-dash bg-white p-1" role="radiogroup" aria-label="Billing cycle">
      {options.map((o) => {
        const active = cycle === o.value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o.value)}
            className={cn("relative rounded-full px-5 py-2 body-sm-medium transition-colors whitespace-nowrap", active ? "text-white" : "text-primary-400 hover:text-primary-500")}
          >
            {active && <motion.span layoutId="cycle-pill" className="absolute inset-0 rounded-full bg-brand-orange" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
            <span className="relative inline-flex items-center gap-2">
              {o.label}
              {o.value === "YEARLY" && saving > 0 && <span className={cn("rounded-full px-1.5 body-2xsm-regular", active ? "bg-white/20 text-white" : "bg-green-bg text-green")}>Save {saving}%</span>}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default CycleToggle;
