import React from "react";
import { Lock } from "lucide-react";
import { cn } from "@/lib/cn";

interface BrowserFrameProps {
  /** Shown in the address bar, e.g. "admin.edupro.io". */
  url: string;
  children: React.ReactNode;
  className?: string;
}

/** A desktop browser window (traffic lights + address bar) around a product illustration. */
export function BrowserFrame({ url, children, className }: BrowserFrameProps) {
  return (
    <div className={cn("overflow-hidden rounded-2xl border border-dash bg-white shadow-2xl shadow-brand-orange/15", className)}>
      <div className="flex items-center gap-3 border-b border-dash bg-slate-50 px-4 py-3">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-3 w-3 rounded-full bg-red" />
          <span className="h-3 w-3 rounded-full bg-yellow" />
          <span className="h-3 w-3 rounded-full bg-green" />
        </div>
        <div className="mx-auto flex w-full max-w-sm items-center justify-center gap-1.5 rounded-lg bg-white px-3 py-1.5 border border-dash">
          <Lock className="h-3 w-3 text-green" />
          <span className="body-xsm-medium text-primary-400 truncate">{url}</span>
        </div>
        <span className="w-12" aria-hidden />
      </div>
      {children}
    </div>
  );
}

export default BrowserFrame;
