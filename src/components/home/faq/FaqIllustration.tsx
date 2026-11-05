"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/components/motion/presets";

/** The cap-on-books illustration beside the FAQ: fades in, then floats gently; edges fade into the page. */
export function FaqIllustration() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: EASE_OUT }}
      className="relative mx-auto w-full max-w-md"
    >
      <div className="absolute inset-8 -z-10 rounded-full bg-brand-orange-10 blur-3xl" aria-hidden />
      <motion.div animate={reduce ? undefined : { y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
        <Image
          src="/images/faq-illustration.png"
          alt="A graduation cap on a stack of books beside a plant, with a question-mark speech bubble"
          width={880}
          height={880}
          className="h-auto w-full"
          style={{ maskImage: "radial-gradient(closest-side, black 88%, transparent)", WebkitMaskImage: "radial-gradient(closest-side, black 88%, transparent)" }}
          sizes="(min-width: 1024px) 440px, 80vw"
        />
      </motion.div>
    </motion.div>
  );
}

export default FaqIllustration;
