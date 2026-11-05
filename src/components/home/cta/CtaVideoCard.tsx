"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Eye, Play } from "lucide-react";
import { ToneBadge } from "@/components/ui/ToneBadge";

const INSTRUCTOR = "https://api.dicebear.com/9.x/notionists/png?seed=EduPro%20Instructor&size=256&backgroundColor=transparent";

/**
 * A live lesson playing on EduPro: classroom backdrop with a whiteboard, an illustrated instructor, a breathing
 * play button, LIVE badge with viewer count, and a progress bar that keeps filling.
 */
export function CtaVideoCard() {
  const reduce = useReducedMotion();
  return (
    <div className="w-64 rounded-3xl border border-white bg-white/80 p-2 shadow-2xl shadow-brand-orange/20 backdrop-blur sm:w-72">
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-blue-14 via-gray-bg to-brand-orange-light">
        {/* Whiteboard */}
        <div className="absolute right-4 top-9 h-2/5 w-2/5 rounded-lg border border-white bg-white/70 p-2 shadow-xs">
          <span className="block h-1.5 w-2/3 rounded-full bg-primary-300/30" />
          <span className="mt-1.5 block h-1.5 w-1/2 rounded-full bg-primary-300/25" />
          <span className="mt-1.5 block h-1.5 w-3/5 rounded-full bg-brand-orange-20" />
        </div>
        {/* Instructor */}
        <Image src={INSTRUCTOR} alt="" width={256} height={256} draggable={false} className="absolute -bottom-5 left-2 h-36 w-36 select-none object-contain" />

        <ToneBadge tone="red" size="sm" variant="pill" dot className="absolute left-2.5 top-2.5 bg-white font-semibold">
          LIVE
        </ToneBadge>
        <ToneBadge tone="gray" size="sm" variant="pill" icon={<Eye className="h-3 w-3" />} className="absolute right-2.5 top-2.5 bg-primary-500/60 text-white backdrop-blur">
          86 watching
        </ToneBadge>

        {/* Play */}
        <div className="absolute inset-y-0 right-0 flex w-1/2 items-center justify-center">
          {!reduce && (
            <motion.span
              className="absolute h-14 w-14 rounded-full bg-white/60"
              animate={{ scale: [1, 1.5], opacity: [0.7, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
            />
          )}
          <motion.span whileHover={{ scale: 1.08 }} className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg">
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
