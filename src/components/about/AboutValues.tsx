"use client";

import React from "react";
import { motion } from "framer-motion";
import { HeartHandshake, Lock, Sparkles, Target, type LucideIcon } from "lucide-react";
import type { ToneKey } from "@/lib/content";
import { ToneIcon } from "@/components/shared/ToneIcon";
import { Spotlight } from "@/components/motion/Spotlight";
import { SectionHeading } from "@/components/shared/SectionHeading";

const VALUES: { icon: LucideIcon; tone: ToneKey; title: string; text: string }[] = [
  { icon: Target, tone: "orange", title: "Simple first", text: "If a teacher needs a manual for it, we haven't finished designing it." },
  { icon: HeartHandshake, tone: "green", title: "Built with educators", text: "Features come from real classrooms and real admin offices, not from a checklist." },
  { icon: Lock, tone: "blue", title: "Your data, protected", text: "Strong sign-in rules, role-based access, activity history and daily backups." },
  { icon: Sparkles, tone: "purple", title: "Always improving", text: "We ship improvements every week and tell you what changed." },
];

/** "What we care about": four value cards with a spotlight hover. */
export function AboutValues() {
  return (
    <section className="bg-brand-orange-soft">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <SectionHeading eyebrow="What we care about" title="The principles behind every feature" highlight="every feature" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="h-full"
            >
              <Spotlight className="h-full rounded-2xl">
                <div className="group flex h-full flex-col rounded-2xl border border-dash bg-white p-6 shadow-xs transition-shadow hover:shadow-xl hover:shadow-brand-orange/10">
                  <ToneIcon icon={v.icon} tone={v.tone} size="lg" className="transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110" />
                  <h3 className="heading-h6-bold mt-5 text-primary-500">{v.title}</h3>
                  <p className="mt-2 body-regular text-primary-300">{v.text}</p>
                </div>
              </Spotlight>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutValues;
