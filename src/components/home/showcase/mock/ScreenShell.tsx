"use client";

import React from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";

interface ScreenShellProps {
  title: string;
  subtitle: string;
  /** Orange header button label (e.g. "Create course"). */
  action: string;
  tabs: string[];
  /** Index of the selected tab. */
  activeTab?: number;
  children: React.ReactNode;
}

/** Page frame of a preview screen: title + subtitle + action button, underline tabs, then the list. */
export function ScreenShell({ title, subtitle, action, tabs, activeTab = 0, children }: ScreenShellProps) {
  return (
    <div className="min-w-0 flex-1 p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="heading-h4-semibold font-bold text-primary-500 block">{title}</span>
          <span className="body-2xsm-regular text-primary-300">{subtitle}</span>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-brand-orange px-3 py-2 body-xsm-medium text-white shadow-sm shadow-brand-orange/30 whitespace-nowrap">
          <Plus className="h-3.5 w-3.5" />
          {action}
        </span>
      </div>
      <div className="mt-4 flex gap-5 border-b border-dash">
        {tabs.map((t, i) => (
          <span key={t} className={cn("relative pb-2.5 body-xsm-medium whitespace-nowrap", i === activeTab ? "text-brand-orange" : "text-primary-400")}>
            {t}
            {i === activeTab && <motion.span layoutId="showcase-tab" className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-brand-orange" />}
          </span>
        ))}
      </div>
      <div className="mt-3 space-y-2.5">{children}</div>
    </div>
  );
}

export default ScreenShell;
