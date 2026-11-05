"use client";

import React from "react";
import { motion } from "framer-motion";
import { MoreVertical, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { ToneBadge, type Tone } from "@/components/ui/ToneBadge";
import { PaymentLogo, type PaymentMethod } from "@/components/ui/PaymentLogo";

export interface MockMeta {
  icon: LucideIcon;
  text: string;
  /** Show this payment provider's logo instead of the icon + text. */
  logo?: PaymentMethod;
}

interface MockListRowProps {
  /** Thumbnail: icon on a gradient tile. */
  thumbIcon: LucideIcon;
  thumbClass: string;
  title: string;
  meta: MockMeta[];
  status: string;
  statusTone: Tone;
  /** Position in the list (stagger). */
  index: number;
}

/** One row of a preview list: thumbnail, title, meta line, status badge, ⋮. Slides in on (re)mount. */
export function MockListRow({ thumbIcon: Thumb, thumbClass, title, meta, status, statusTone, index }: MockListRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.08 + index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center gap-3 rounded-xl border border-dash bg-white p-2.5 shadow-xs"
    >
      <span className={cn("flex h-12 w-16 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br", thumbClass)}>
        <Thumb className="h-6 w-6 text-white" />
      </span>
      <div className="min-w-0 flex-1">
        <span className="body-sm-medium text-primary-500 block truncate">{title}</span>
        <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5">
          {meta.map(({ icon: Icon, text, logo }) =>
            logo ? (
              <PaymentLogo key={text} method={logo} size="xs" />
            ) : (
              <span key={text} className="inline-flex items-center gap-1 body-2xsm-regular text-primary-300 whitespace-nowrap">
                <Icon className="h-3 w-3" />
                {text}
              </span>
            )
          )}
        </div>
      </div>
      <ToneBadge tone={statusTone} size="sm">
        {status}
      </ToneBadge>
      <MoreVertical className="h-4 w-4 shrink-0 text-primary-300" />
    </motion.div>
  );
}

export default MockListRow;
