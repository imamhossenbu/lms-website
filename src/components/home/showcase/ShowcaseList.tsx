"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { SHOWCASE, SHOWCASE_INTERVAL_MS } from "@/lib/showcase";

interface ShowcaseListProps {
  active: number;
  onSelect: (index: number) => void;
  /** Auto-play running: the active item shows its countdown bar. */
  playing: boolean;
}

/** The five capabilities as tabs; the active one is highlighted and shows a progress bar while auto-playing. */
export function ShowcaseList({ active, onSelect, playing }: ShowcaseListProps) {
  return (
    <div role="tablist" aria-label="Product tour" className="space-y-2">
      {SHOWCASE.map((item, i) => {
        const Icon = item.icon;
        const isActive = i === active;
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={`showcase-tab-${item.id}`}
            aria-selected={isActive}
            aria-controls="showcase-panel"
            onClick={() => onSelect(i)}
            className="relative flex w-full items-center gap-4 overflow-hidden rounded-2xl px-4 py-3.5 text-left transition-colors hover:bg-slate-50"
          >
            {isActive && (
              <motion.span layoutId="showcase-active" className="absolute inset-0 rounded-2xl border-l-2 border-brand-orange bg-brand-orange-light" transition={{ type: "spring", stiffness: 380, damping: 34 }} />
            )}
            <span
              className={cn(
                "relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition-colors",
                isActive ? "border-brand-orange-20 bg-white text-brand-orange" : "border-dash bg-slate-50 text-primary-500"
              )}
            >
              <Icon className="h-5 w-5" />
            </span>
            <span className="relative min-w-0">
              <span className="heading-h6-bold tracking-tight text-primary-500 block">{item.title}</span>
              <span className="body-sm-regular text-primary-300 block mt-0.5">{item.text}</span>
            </span>
            {isActive && playing && (
              <motion.span
                key={`bar-${active}`}
                className="absolute bottom-0 left-0 h-0.5 bg-brand-orange"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: SHOWCASE_INTERVAL_MS / 1000, ease: "linear" }}
                aria-hidden
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

export default ShowcaseList;
