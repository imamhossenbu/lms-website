"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, CircleCheck, Headphones, Zap } from "lucide-react";
import { signupUrl } from "@/lib/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PerkList } from "@/components/shared/PerkList";
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

      <PerkList perks={PERKS} className="mt-9" />
    </div>
  );
}

export default CtaCopy;
