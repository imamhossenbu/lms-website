"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { EASE_OUT } from "@/components/motion/presets";

interface FaqItemProps {
  id: string;
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}

/** One question card: the open one gets an orange border, a soft orange fill and an orange chevron. */
export function FaqItem({ id, question, answer, open, onToggle }: FaqItemProps) {
  return (
    <motion.div
      layout
      transition={{ layout: { duration: 0.3, ease: EASE_OUT } }}
      className={cn(
        "overflow-hidden rounded-2xl border transition-colors duration-300",
        open ? "border-brand-orange bg-gradient-to-b from-brand-orange-soft to-white shadow-lg shadow-brand-orange/10" : "border-dash bg-white hover:border-brand-orange-20"
      )}
    >
      <button type="button" onClick={onToggle} aria-expanded={open} aria-controls={`${id}-answer`} id={`${id}-question`} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left">
        <span className="heading-h6-bold tracking-tight text-primary-500">{question}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 22 }} className={cn("shrink-0", open ? "text-brand-orange" : "text-primary-400")}>
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-answer`}
            role="region"
            aria-labelledby={`${id}-question`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
          >
            <motion.p initial={{ y: -6 }} animate={{ y: 0 }} className="px-6 pb-6 body-regular text-primary-400">
              {answer}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default FaqItem;
