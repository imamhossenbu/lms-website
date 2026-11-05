"use client";

import React from "react";
import { motion } from "framer-motion";
import { Layers, Puzzle, Rocket, type LucideIcon } from "lucide-react";
import type { ToneKey } from "@/lib/content";
import { ToneIcon } from "@/components/shared/ToneIcon";
import { EASE_OUT } from "@/components/motion/presets";

const STEPS: { icon: LucideIcon; tone: ToneKey; title: string; text: string }[] = [
  { icon: Puzzle, tone: "red", title: "The problem", text: "Academies ran on a patchwork: a video app for classes, a spreadsheet for fees, a group chat for notices and paper certificates." },
  { icon: Layers, tone: "blue", title: "The idea", text: "One admin panel where a school or coaching centre can teach, assess, get paid and report — without hiring a tech team." },
  { icon: Rocket, tone: "green", title: "Today", text: "Courses, live classes, quizzes, certificates, payments, community and analytics, each with its own academy and branding." },
];

/** "Our story": the why behind EduPro beside a three-step timeline that draws in. */
export function AboutStory() {
  return (
    <section className="mx-auto grid max-w-7xl items-start gap-14 px-4 py-24 sm:px-6 lg:grid-cols-2">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, ease: EASE_OUT }}>
        <span className="inline-flex rounded-full bg-brand-orange-light px-4 py-1.5 body-sm-medium text-brand-orange">Our story</span>
        <h2 className="heading-h2-bold mt-5 text-primary-500">Teaching should be the hard part — not the software</h2>
        <div className="mt-6 space-y-4 body-l-regular text-primary-400">
          <p>
            Great teachers were spending their evenings copying attendance into spreadsheets, chasing fees by phone and resending class links. The tools they had were built for big
            universities or for single tutors, and almost nothing fitted the schools, coaching centres and training institutes in between.
          </p>
          <p>
            We built EduPro for them. Every academy gets its own online campus with its name and colours, and one admin panel for everything around the teaching — so teachers can get
            back to teaching.
          </p>
        </div>
      </motion.div>

      <ol className="relative space-y-6">
        <motion.span
          className="absolute bottom-8 left-7 top-8 w-0.5 origin-top rounded-full bg-gradient-to-b from-red via-blue to-green opacity-30"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: "easeOut", delay: 0.2 }}
          aria-hidden
        />
        {STEPS.map((s, i) => (
          <motion.li
            key={s.title}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.2 + i * 0.15 }}
            whileHover={{ x: 4 }}
            className="relative flex gap-5 rounded-2xl border border-dash bg-white p-5 shadow-xs"
          >
            <ToneIcon icon={s.icon} tone={s.tone} size="lg" />
            <span>
              <span className="heading-h6-bold block text-primary-500">{s.title}</span>
              <span className="mt-1.5 block body-regular text-primary-300">{s.text}</span>
            </span>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}

export default AboutStory;
