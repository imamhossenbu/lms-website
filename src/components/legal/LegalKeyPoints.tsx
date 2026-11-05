"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";

/** "In short": the plain-language key points of a legal document, above its full text. */
export function LegalKeyPoints({ points }: { points: string[] }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="rounded-2xl border border-brand-orange-20 bg-brand-orange-soft p-6">
      <p className="flex items-center gap-2 body-sm-medium font-semibold uppercase tracking-wide text-brand-orange">
        <Sparkles className="h-4 w-4" />
        In short
      </p>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {points.map((p, i) => (
          <motion.li key={p} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.3 + i * 0.07 }} className="flex items-start gap-2.5 body-regular text-primary-500">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green" />
            {p}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export default LegalKeyPoints;
