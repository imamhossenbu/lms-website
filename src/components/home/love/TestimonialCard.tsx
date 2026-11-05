"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import type { Testimonial } from "@/lib/testimonials";
import { EASE_OUT } from "@/components/motion/presets";

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const FADE = "transition-colors duration-500";

/**
 * One quote card: quote mark, quote, avatar (photo or initials), name and role. `highlighted` (the middle card of
 * the carousel) cross-fades to the solid orange look and lifts slightly, so it changes smoothly while sliding.
 */
export function TestimonialCard({ t, index, highlighted }: { t: Testimonial; index: number; highlighted: boolean }) {
  const on = highlighted;
  return (
    <motion.figure
      initial={{ opacity: 0, y: 24, rotate: index === 0 ? -1.5 : index === 2 ? 1.5 : 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: EASE_OUT }}
      className="h-full"
    >
      <motion.div
        animate={{ scale: on ? 1.03 : 1 }}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.45, ease: EASE_OUT }}
        className={cn("relative flex h-full flex-col overflow-hidden rounded-3xl border p-7", FADE, on ? "border-brand-orange shadow-2xl shadow-brand-orange/25" : "border-dash bg-white shadow-sm")}
      >
        {/* Orange layer fades in for the highlighted card. */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-brand-orange to-brand-orange-hover"
          initial={false}
          animate={{ opacity: on ? 1 : 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          aria-hidden
        >
          <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-white/10" />
        </motion.div>

        <Quote className={cn("relative h-9 w-9 shrink-0 rotate-180", FADE, on ? "fill-white text-white" : "fill-brand-orange text-brand-orange")} aria-hidden />
        <blockquote className={cn("relative mt-5 flex-1 body-l-regular", FADE, on ? "text-white" : "text-primary-500")}>“{t.quote}”</blockquote>
        <figcaption className="relative mt-7 flex items-center gap-4">
          {t.avatarUrl ? (
            <Image
              src={t.avatarUrl}
              alt={t.name}
              width={56}
              height={56}
              draggable={false}
              className={cn("h-14 w-14 shrink-0 rounded-full object-cover ring-2", on ? "ring-white" : "ring-brand-orange-light")}
            />
          ) : (
            <span className={cn("flex h-14 w-14 shrink-0 items-center justify-center rounded-full heading-h6-bold", FADE, on ? "bg-white text-brand-orange" : "bg-brand-orange-light text-brand-orange")}>
              {initials(t.name)}
            </span>
          )}
          <span>
            <span className={cn("heading-h6-bold block tracking-tight", FADE, on ? "text-white" : "text-primary-500")}>{t.name}</span>
            <span className={cn("body-sm-regular", FADE, on ? "text-white/85" : "text-primary-300")}>{t.role}</span>
          </span>
        </figcaption>
      </motion.div>
    </motion.figure>
  );
}

export default TestimonialCard;
