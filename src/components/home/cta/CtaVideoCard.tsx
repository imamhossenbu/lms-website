"use client";

import React, { useCallback, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Eye, Play } from "lucide-react";
import { DEMO_VIDEO } from "@/lib/site";
import { ToneBadge } from "@/components/ui/ToneBadge";
import { VideoModal } from "@/components/ui/VideoModal";

/**
 * A live lesson on EduPro: the video's poster frame with LIVE badge, viewer count, a breathing play button and a
 * progress bar that keeps filling. Clicking anywhere on it plays the video in a dialog on the page.
 */
export function CtaVideoCard() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.97 }}
        className="group block w-64 cursor-pointer rounded-3xl border border-white bg-white/80 p-2 text-left shadow-2xl shadow-brand-orange/20 backdrop-blur sm:w-80"
        aria-label={`Play video: ${DEMO_VIDEO.title}`}
      >
        <span className="relative block aspect-video overflow-hidden rounded-2xl bg-gray-bg">
          <Image
            src={DEMO_VIDEO.poster}
            alt=""
            fill
            sizes="320px"
            draggable={false}
            className="select-none object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-primary-500/40 via-transparent to-transparent" aria-hidden />

          <ToneBadge tone="red" size="sm" variant="pill" dot className="absolute left-2.5 top-2.5 bg-white font-semibold">
            LIVE
          </ToneBadge>
          <ToneBadge tone="gray" size="sm" variant="pill" icon={<Eye className="h-3 w-3" />} className="absolute right-2.5 top-2.5 border-transparent bg-primary-500/60 text-white backdrop-blur">
            86 watching
          </ToneBadge>

          {/* Play button */}
          <span className="absolute inset-0 flex items-center justify-center">
            {!reduce && (
              <motion.span
                className="absolute h-14 w-14 rounded-full bg-white/60"
                animate={{ scale: [1, 1.6], opacity: [0.7, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
              />
            )}
            <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg transition-transform duration-200 group-hover:scale-110">
              <Play className="ml-0.5 h-6 w-6 fill-brand-orange text-brand-orange" />
            </span>
          </span>

          {/* Progress */}
          <span className="absolute inset-x-3 bottom-2.5 h-1 overflow-hidden rounded-full bg-white/60">
            <motion.span
              className="absolute inset-y-0 left-0 rounded-full bg-brand-orange"
              initial={{ width: "18%" }}
              animate={reduce ? undefined : { width: ["18%", "86%"] }}
              transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            />
          </span>
        </span>
      </motion.button>

      <VideoModal open={open} onClose={close} src={DEMO_VIDEO.src} poster={DEMO_VIDEO.poster} title={DEMO_VIDEO.title} />
    </>
  );
}

export default CtaVideoCard;
