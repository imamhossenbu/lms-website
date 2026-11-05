"use client";

import React from "react";
import { ArrowRight, CalendarDays } from "lucide-react";
import { signupUrl } from "@/lib/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { RevealWords } from "@/components/motion/RevealWords";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { PulseDot } from "@/components/motion/PulseDot";

/** Left side of the hero: badge, word-by-word headline, intro, the two CTAs and the trial note (staggered in). */
export function HeroCopy({ trialDays }: { trialDays: number }) {
  return (
    <Stagger onMount stagger={0.12}>
      <StaggerItem>
        <span className="inline-flex items-center gap-2.5 rounded-full border border-brand-orange-20 bg-white/80 px-4 py-1.5 body-sm-medium text-primary-500 whitespace-nowrap shadow-xs">
          <PulseDot />
          The LMS for schools &amp; coaching centres
        </span>
      </StaggerItem>
      <h1 className="heading-hero text-primary-500 mt-6">
        <RevealWords parts={[{ text: "Run your whole academy" }, { text: "online", className: "text-brand-orange" }]} delay={0.15} />
      </h1>
      <StaggerItem>
        <p className="body-hero text-primary-300 mt-6 max-w-xl">
          Courses, live classes, quizzes, certificates and payments in one place, so you can spend your time teaching instead of juggling tools.
        </p>
      </StaggerItem>
      <StaggerItem className="mt-9 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href={signupUrl()} size="lg" icon={<ArrowRight className="h-5 w-5" />} className="h-14 px-7">
          Start free trial
        </ButtonLink>
        <ButtonLink href="/contact?topic=DEMO" size="lg" variant="secondary" className="h-14 px-7">
          <CalendarDays className="h-5 w-5" />
          Book a demo
        </ButtonLink>
      </StaggerItem>
      {trialDays > 0 && (
        <StaggerItem>
          <p className="body-regular text-primary-300 mt-5">{trialDays}-day free trial on every plan. Cancel any time.</p>
        </StaggerItem>
      )}
    </Stagger>
  );
}

export default HeroCopy;
