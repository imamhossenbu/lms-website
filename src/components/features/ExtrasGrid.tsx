"use client";

import React from "react";
import { motion } from "framer-motion";
import { EXTRAS, type ToneKey } from "@/lib/content";
import { ToneIcon } from "@/components/shared/ToneIcon";
import { Spotlight } from "@/components/motion/Spotlight";

const TONES: ToneKey[] = ["purple", "blue", "green", "orange"];

/** "And a lot more": the smaller extras as spotlight cards that rise in and lift on hover. */
export function ExtrasGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {EXTRAS.map(({ icon, title, text }, i) => (
        <motion.div
          key={title}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          whileHover={{ y: -4 }}
          className="h-full"
        >
          <Spotlight className="h-full rounded-2xl">
            <div className="group flex h-full flex-col rounded-2xl border border-dash bg-white p-6 shadow-xs transition-shadow hover:shadow-xl hover:shadow-brand-orange/10">
              <ToneIcon icon={icon} tone={TONES[i % TONES.length]} size="lg" className="transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110" />
              <h3 className="heading-h6-bold mt-5 text-primary-500">{title}</h3>
              <p className="body-regular mt-2 text-primary-300">{text}</p>
            </div>
          </Spotlight>
        </motion.div>
      ))}
    </div>
  );
}

export default ExtrasGrid;
