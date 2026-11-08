"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, CreditCard, PartyPopper, UserRound, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

const STEPS: { icon: LucideIcon; label: string }[] = [
  { icon: UserRound, label: "Your details" },
  { icon: CreditCard, label: "Secure payment" },
  { icon: PartyPopper, label: "Academy ready" },
];

/** Three-step progress: details → payment (on SSLCommerz) → ready. The line between steps fills as you go. */
export function CheckoutSteps({ current }: { current: 0 | 1 | 2 }) {
  return (
    <ol className="mx-auto flex max-w-xl items-center" aria-label="Checkout progress">
      {STEPS.map(({ icon: Icon, label }, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={label} className={cn("flex items-center", i < STEPS.length - 1 && "flex-1")}>
            <div className="flex flex-col items-center gap-2">
              <motion.span
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: i * 0.08 }}
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-2xl border-2 transition-colors",
                  done ? "border-green bg-green text-white" : active ? "border-brand-orange bg-brand-orange text-white shadow-lg shadow-brand-orange/30" : "border-dash bg-white text-primary-300"
                )}
              >
                {done ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
              </motion.span>
              <span className={cn("whitespace-nowrap body-xsm-medium", active ? "text-brand-orange" : done ? "text-green" : "text-primary-300")}>{label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <span className="relative mx-3 mb-6 h-0.5 flex-1 overflow-hidden rounded-full bg-dash">
                <motion.span className="absolute inset-y-0 left-0 bg-green" initial={{ width: 0 }} animate={{ width: done ? "100%" : "0%" }} transition={{ duration: 0.6, ease: "easeOut" }} />
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}

export default CheckoutSteps;
