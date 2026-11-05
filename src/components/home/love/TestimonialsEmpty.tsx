"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Quote } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { EASE_OUT } from "@/components/motion/presets";

/** Shown instead of the carousel while no testimonial is published yet: invites academies to share theirs. */
export function TestimonialsEmpty() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: EASE_OUT }}
      className="mx-auto flex max-w-2xl flex-col items-center rounded-3xl border border-dashed border-brand-orange-20 bg-brand-orange-light/40 px-6 py-10 text-center"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
        <Quote className="h-7 w-7 rotate-180 fill-brand-orange text-brand-orange" aria-hidden />
      </span>
      <h3 className="mt-5 heading-h5 text-primary-500">Your academy&apos;s story could be here</h3>
      <p className="mt-2 max-w-md body-regular text-primary-300">
        We&apos;re collecting stories from the schools and coaching centres using EduPro. Running yours on EduPro? Tell us how it&apos;s going.
      </p>
      <ButtonLink href="/contact" variant="secondary" className="mt-6" icon={<ArrowRight className="h-4 w-4" />}>
        Share your story
      </ButtonLink>
    </motion.div>
  );
}

export default TestimonialsEmpty;
