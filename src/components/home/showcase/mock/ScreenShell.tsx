"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus, Search, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/cn";
import { MockStat, type MockStatData } from "./MockStat";

interface ScreenShellProps {
  title: string;
  subtitle: string;
  /** Orange header button label (e.g. "Create course"). */
  action: string;
  /** KPI tiles above the tabs (three fit the window). */
  stats: MockStatData[];
  tabs: string[];
  /** Index of the selected tab. */
  activeTab?: number;
  /** Search box placeholder in the toolbar. */
  searchPlaceholder: string;
  /** Footer text, e.g. "Showing 5 of 24 courses". */
  footer: string;
  children: React.ReactNode;
}

/**
 * Page frame of a preview screen, laid out like the real admin panel: title + action, KPI tiles, underline tabs,
 * a search / filter toolbar, the list, and a paging footer.
 */
export function ScreenShell({ title, subtitle, action, stats, tabs, activeTab = 0, searchPlaceholder, footer, children }: ScreenShellProps) {
  return (
    <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="heading-h4-semibold block font-bold text-primary-500">{title}</span>
          <span className="body-2xsm-regular text-primary-300">{subtitle}</span>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg bg-brand-orange px-3 py-2 body-xsm-medium text-white shadow-sm shadow-brand-orange/30">
          <Plus className="h-3.5 w-3.5" />
          {action}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2.5">
        {stats.map((s, i) => (
          <MockStat key={s.label} {...s} index={i} />
        ))}
      </div>

      <div className="mt-4 flex items-end justify-between gap-3 border-b border-dash">
        <div className="flex gap-5">
          {tabs.map((t, i) => (
            <span key={t} className={cn("relative whitespace-nowrap pb-2.5 body-xsm-medium", i === activeTab ? "text-brand-orange" : "text-primary-400")}>
              {t}
              {i === activeTab && <motion.span layoutId="showcase-tab" className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-brand-orange" />}
            </span>
          ))}
        </div>
        <div className="mb-2 hidden items-center gap-1.5 sm:flex">
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-dash bg-white px-2.5 py-1.5 body-2xsm-regular text-primary-300">
            <Search className="h-3 w-3" />
            {searchPlaceholder}
          </span>
          <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-dash bg-white text-primary-400">
            <SlidersHorizontal className="h-3 w-3" />
          </span>
        </div>
      </div>

      <div className="mt-3 space-y-2">{children}</div>

      <div className="mt-auto flex items-center justify-between pt-3">
        <span className="body-2xsm-regular text-primary-300">{footer}</span>
        <div className="flex items-center gap-1">
          <span className="flex h-6 w-6 items-center justify-center rounded-md border border-dash bg-white text-primary-300">
            <ChevronLeft className="h-3 w-3" />
          </span>
          {[1, 2, 3].map((n) => (
            <span
              key={n}
              className={cn("flex h-6 w-6 items-center justify-center rounded-md body-2xsm-regular", n === 1 ? "bg-brand-orange text-white" : "border border-dash bg-white text-primary-400")}
            >
              {n}
            </span>
          ))}
          <span className="flex h-6 w-6 items-center justify-center rounded-md border border-dash bg-white text-primary-300">
            <ChevronRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </div>
  );
}

export default ScreenShell;
