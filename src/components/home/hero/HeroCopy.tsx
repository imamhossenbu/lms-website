"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays } from "lucide-react";
import { signupUrl } from "@/lib/site";
import { ButtonLink } from "@/components/ui/ButtonLink";

/** Left side of the hero: badge, headline, intro, the two CTAs and the trial note. */
export function HeroCopy({ trialDays }: { trialDays: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: "easeOut" }}>
      <span className="inline-flex items-center gap-2.5 rounded-full border border-brand-orange-20 bg-white/80 px-4 py-1.5 body-sm-medium text-primary-500 whitespace-nowrap shadow-xs">
        <span className="h-2 w-2 rounded-full bg-brand-orange" />
        The LMS for schools &amp; coaching centres
      </span>
      <h1 className="heading-hero text-primary-500 mt-6">
        Run your whole academy <span className="text-brand-orange">online</span>
      </h1>
      <p className="body-hero text-primary-300 mt-6 max-w-xl">
        Courses, live classes, quizzes, certificates and payments in one place, so you can spend your time teaching instead of juggling tools.
      </p>
      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href={signupUrl()} size="lg" icon={<ArrowRight className="h-5 w-5" />} className="h-14 px-7">
          Start free trial
        </ButtonLink>
        <ButtonLink href="/contact?topic=DEMO" size="lg" variant="secondary" className="h-14 px-7">
          <CalendarDays className="h-5 w-5" />
          Book a demo
        </ButtonLink>
      </div>
      {trialDays > 0 && <p className="body-regular text-primary-300 mt-5">{trialDays}-day free trial on every plan. Cancel any time.</p>}
    </motion.div>
  );
}

export default HeroCopy;
