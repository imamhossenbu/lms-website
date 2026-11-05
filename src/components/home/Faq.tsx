"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { FAQS } from "@/lib/content";
import { signupUrl } from "@/lib/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { FaqIllustration } from "./faq/FaqIllustration";
import { FaqItem } from "./faq/FaqItem";

/** "Have questions? We've got answers": illustration + accordion (one open at a time) + trial CTA. */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative overflow-hidden">
      <div className="absolute -right-40 bottom-0 -z-10 h-128 w-128 rounded-full bg-brand-orange-10 blur-3xl" aria-hidden />
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <SectionHeading eyebrow="Frequently asked questions" title="Have questions? We've got answers" highlight="answers" subtitle="Everything you need to know about EduPro, in one place." className="max-w-4xl" />
        <div className="mt-14 grid items-center gap-10 lg:grid-cols-12">
          <div className="hidden lg:col-span-5 lg:block">
            <FaqIllustration />
          </div>
          <Stagger className="space-y-3 lg:col-span-7" stagger={0.06}>
            {FAQS.map((f, i) => (
              <StaggerItem key={f.q}>
                <FaqItem id={`faq-${i}`} question={f.q} answer={f.a} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
        <div className="mt-14 flex justify-center">
          <ButtonLink href={signupUrl()} size="lg" icon={<ArrowRight className="h-5 w-5" />} className="h-14 px-8">
            Start free trial
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

export default Faq;
