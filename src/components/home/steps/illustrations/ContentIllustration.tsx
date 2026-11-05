"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CloudUpload, FileText, ListChecks, Play } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ToneKey } from "@/lib/content";
import { ToneIcon } from "@/components/shared/ToneIcon";
import { GhostLine, MiniWindow } from "@/components/ui/MiniWindow";
import { ClickingCursor } from "@/components/motion/ClickingCursor";

const ROWS: { icon: LucideIcon; tone: ToneKey }[] = [
  { icon: Play, tone: "blue" },
  { icon: FileText, tone: "red" },
  { icon: ListChecks, tone: "blue" },
];

/** Step 2: a lesson list (video, PDF, quiz) and a dashed upload box with the cursor. */
export function ContentIllustration() {
  const reduce = useReducedMotion();
  return (
    <MiniWindow className="mx-auto w-4/5">
      <div className="flex items-center gap-4 p-4">
        <ul className="flex-1 space-y-2.5">
          {ROWS.map(({ icon, tone }, i) => (
            <li key={i} className="flex items-center gap-2.5">
              <ToneIcon icon={icon} tone={tone} size="sm" />
              <div className="flex-1 space-y-1.5">
                <GhostLine className="w-4/5" />
                <GhostLine className="w-1/2 bg-slate-100" />
              </div>
            </li>
          ))}
        </ul>
        <div className="relative flex h-16 w-20 shrink-0 items-center justify-center rounded-lg border-2 border-dashed border-blue/30 bg-blue-14">
          {/* Dashed edge that brightens and fades, inviting a drop. */}
          <motion.span
            className="absolute -inset-0.5 rounded-lg border-2 border-dashed border-blue"
            animate={reduce ? undefined : { opacity: [0.2, 0.9, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />
          <motion.span animate={reduce ? undefined : { y: [0, -4, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
            <CloudUpload className="h-6 w-6 text-blue" />
          </motion.span>
          <ClickingCursor className="absolute -bottom-3 -right-2" delay={0.6} />
        </div>
      </div>
    </MiniWindow>
  );
}

export default ContentIllustration;
