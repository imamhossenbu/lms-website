"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { formatPrice } from "@/lib/plans";

/** Big monthly price that rolls to the new value when the billing cycle changes. */
export function PlanPrice({ amount }: { amount: number }) {
  return (
    <div className="flex items-end gap-2">
      <span className="relative inline-flex overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={amount}
            className="heading-section text-primary-500"
            initial={{ y: "70%", opacity: 0, filter: "blur(4px)" }}
            animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
            exit={{ y: "-70%", opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {formatPrice(amount)}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="body-l-medium text-primary-300 mb-1.5">/month</span>
    </div>
  );
}

export default PlanPrice;
