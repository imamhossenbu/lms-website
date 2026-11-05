import React from "react";
import { cn } from "@/lib/cn";

/** A small app window (three dots, no address bar) for spot illustrations inside cards. */
export function MiniWindow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-dash bg-white shadow-lg shadow-primary-500/5", className)}>
      <div className="flex gap-1 border-b border-dash bg-slate-50 px-3 py-2" aria-hidden>
        <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
        <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
        <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
      </div>
      {children}
    </div>
  );
}

/** Grey placeholder line used to suggest text in illustrations. */
export function GhostLine({ className }: { className?: string }) {
  return <span className={cn("block h-2 rounded-full bg-slate-200", className)} />;
}

export default MiniWindow;
