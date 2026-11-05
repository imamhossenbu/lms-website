"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Eye, Play } from "lucide-react";
import { ToneBadge } from "@/components/ui/ToneBadge";

/** Frame of a lesson video, cropped from the section's design artwork (AI-generated, not a real person). */
const LESSON_FRAME = "/images/cta-instructor.png";

/**
 * A live lesson playing on EduPro: the lesson frame with a breathing play button, LIVE badge with viewer count,
 * and a progress bar that keeps filling.
 */
export function CtaVideoCard() {
  const reduce = useReducedMotion();
  return (
    <div className="w-64 rounded-3xl border border-white bg-white/80 p-2 shadow-2xl shadow-brand-orange/20 backdrop-blur sm:w-80">
      <div className="relative overflow-hidden rounded-2xl bg-gray-bg" style={{ aspectRatio: "470 / 270" }}>
        <Image src={LESSON_FRAME} alt="Instructor teaching a live class" fill sizes="320px" draggable={false} className="select-none object-cover" />

        <ToneBadge tone="red" size="sm" variant="pill" dot className="absolute left-2.5 top-2.5 bg-white font-semibold">
          LIVE
        </ToneBadge>
        <ToneBadge tone="gray" size="sm" variant="pill" icon={<Eye className="h-3 w-3" />} className="absolute right-2.5 top-2.5 bg-primary-500/60 text-white backdrop-blur">
          86 watching
        </ToneBadge>

        {/* Play button, sitting exactly over the play mark in the frame. */}
        <div className="absolute flex aspect-square items-center justify-center" style={{ left: "53.2%", top: "58.5%", width: "25%", transform: "translate(-50%, -50%)" }}>
          {!reduce && (
            <motion.span
              className="absolute inset-0 rounded-full bg-white/60"
              animate={{ scale: [1, 1.5], opacity: [0.7, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
            />
          )}
          <motion.span whileHover={{ scale: 1.08 }} className="relative flex h-full w-full items-center justify-center rounded-full bg-white shadow-lg">
            <Play className="ml-0.5 h-6 w-6 fill-brand-orange text-brand-orange" />
          </motion.span>
        </div>

        {/* Progress */}
        <div className="absolute inset-x-3 bottom-2.5 h-1 overflow-hidden rounded-full bg-white/60">
          <motion.span
            className="absolute inset-y-0 left-0 rounded-full bg-brand-orange"
            initial={{ width: "18%" }}
            animate={reduce ? undefined : { width: ["18%", "86%"] }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>
    </div>
  );
}

export default CtaVideoCard;
