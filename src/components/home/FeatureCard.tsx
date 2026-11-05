"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FEATURES } from "@/lib/content";
import { ToneIcon } from "@/components/shared/ToneIcon";
import { Spotlight } from "@/components/motion/Spotlight";

/**
 * One feature tile: tinted icon, title, one-line summary; links to its section on /features.
 * Takes the feature id (icons are components, so the data is read here on the client).
 */
export function FeatureCard({ featureId, index }: { featureId: string; index: number }) {
  const feature = FEATURES.find((f) => f.id === featureId);
  if (!feature) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: (index % 4) * 0.06 }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <Spotlight className="rounded-2xl">
      <Link
        href={`/features#${feature.id}`}
        className="group/card flex h-full flex-col rounded-2xl border border-dash bg-white p-5 shadow-xs transition-all duration-300 hover:border-brand-orange-20 hover:shadow-xl hover:shadow-brand-orange/10"
      >
        <ToneIcon icon={feature.icon} tone={feature.tone} size="lg" className="transition-transform duration-300 ease-out group-hover/card:-rotate-6 group-hover/card:scale-110" />
        <h3 className="heading-h6-bold tracking-tight text-primary-500 mt-5">{feature.title}</h3>
        <p className="body-regular text-primary-300 mt-2">{feature.summary}</p>
      </Link>
      </Spotlight>
    </motion.div>
  );
}

export default FeatureCard;
