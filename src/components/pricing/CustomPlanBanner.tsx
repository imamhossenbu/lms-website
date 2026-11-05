"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Building2, CalendarDays } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { EASE_OUT } from "@/components/motion/presets";

/** "Need a custom plan?" card for big institutions: floating building tile, copy, Talk to sales / Book a demo. */
export function CustomPlanBanner() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
      className="relative overflow-hidden rounded-3xl border border-brand-orange-20 bg-gradient-to-br from-brand-orange-light via-white to-brand-orange-soft p-8 sm:p-10"
    >
      <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-orange-10 blur-2xl" aria-hidden />
      <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center">
        <motion.span
          animate={reduce ? undefined : { y: [0, -6, 0], rotate: [0, -3, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-orange to-brand-orange-hover text-white shadow-lg shadow-brand-orange/30"
        >
          <Building2 className="h-8 w-8" />
        </motion.span>
        <div className="flex-1">
          <h3 className="heading-h4 text-primary-500">Running a large institution or a group of schools?</h3>
          <p className="mt-2 max-w-2xl body-regular text-primary-300">
            Get higher limits, a custom contract, invoicing in BDT and onboarding help for your teachers. We&apos;ll put together a plan that fits.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/contact?topic=SALES" icon={<ArrowRight className="h-4 w-4" />}>
            Talk to sales
          </ButtonLink>
          <ButtonLink href="/contact?topic=DEMO" variant="secondary">
            <CalendarDays className="h-4 w-4" />
            Book a demo
          </ButtonLink>
        </div>
      </div>
    </motion.div>
  );
}

export default CustomPlanBanner;
