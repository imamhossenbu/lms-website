"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, CircleCheck, Headphones, Zap } from "lucide-react";
import { cn } from "@/lib/cn";
import { signupUrl } from "@/lib/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { EASE_OUT } from "@/components/motion/presets";

const PERKS = [
  { icon: CircleCheck, label: "Easy setup" },
  { icon: Zap, label: "No coding" },
  { icon: Headphones, label: "Dedicated support" },
];

/** Right side of the closing banner: heading, the two main actions and three reassurance perks. */
export function CtaCopy() {
  return (
    <div>
      <SectionHeading
        eyebrow="Get Started Today"
        title="Start your online academy with EduPro"
        highlight="EduPro"
        underline
        subtitle="Create courses, take live classes, manage students and grow your learning business — all in one place."
        align="left"
      />

      <motion.div
        className="mt-9 flex flex-col gap-3 sm:flex-row"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.35 }}
      >
        <ButtonLink href={signupUrl()} size="lg" icon={<ArrowRight className="h-5 w-5" />} className="h-14 px-8">
          Start free trial
        </ButtonLink>
        <ButtonLink href="/contact?topic=DEMO" size="lg" variant="secondary" className="h-14 px-8">
          <CalendarDays className="h-5 w-5" />
          Book a demo
        </ButtonLink>
      </motion.div>

      <ul className="mt-9 flex flex-wrap items-center gap-y-3">
        {PERKS.map(({ icon: Icon, label }, i) => (
          <motion.li
            key={label}
            className={cn("flex items-center gap-2.5 pr-5", i > 0 && "border-l border-dash pl-5")}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.5 + i * 0.1 }}
          >
            <Icon className="h-6 w-6 shrink-0 text-brand-orange" />
            <span className="body-medium whitespace-nowrap text-primary-500">{label}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export default CtaCopy;
