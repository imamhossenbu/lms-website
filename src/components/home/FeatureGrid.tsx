"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FEATURES } from "@/lib/content";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ToneIcon } from "@/components/shared/ToneIcon";

/** "Everything you need" — one card per feature, staggered in, each linking to its section on /features. */
export function FeatureGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHeading eyebrow="Everything in one place" title="All the tools to teach, sell and grow" subtitle="Stop stitching together video links, spreadsheets and payment pages. EduPro brings your whole academy under one roof." />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: (i % 4) * 0.06 }}
            whileHover={{ y: -3 }}
          >
            <Link href={`/features#${f.id}`} className="group flex h-full flex-col rounded-2xl border border-dash bg-white p-5 transition-shadow hover:shadow-lg">
              <ToneIcon icon={f.icon} tone={f.tone} />
              <h3 className="heading-h6-bold text-primary-500 mt-4">{f.title}</h3>
              <p className="body-sm-regular text-primary-300 mt-2 flex-1">{f.summary}</p>
              <span className="mt-4 inline-flex items-center gap-1 body-sm-medium text-brand-orange">
                Learn more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default FeatureGrid;
