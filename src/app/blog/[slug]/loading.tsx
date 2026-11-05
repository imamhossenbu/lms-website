import React from "react";

/** Article while it loads: header lines, cover, body paragraphs and the sidebar cards. */
export default function Loading() {
  return (
    <div className="animate-pulse" aria-busy="true" aria-label="Loading article">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 pt-12">
        <span className="h-4 w-24 rounded bg-slate-100" />
        <span className="h-7 w-28 rounded-full bg-slate-200" />
        <span className="h-10 w-full rounded bg-slate-200" />
        <span className="h-10 w-3/4 rounded bg-slate-200" />
        <span className="h-4 w-2/3 rounded bg-slate-100" />
        <div className="flex items-center gap-3">
          <span className="h-11 w-11 rounded-full bg-slate-200" />
          <span className="h-4 w-48 rounded bg-slate-100" />
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-6xl px-4 sm:px-6">
        <div className="aspect-21/9 rounded-3xl bg-slate-100" />
      </div>
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-8">
          {[100, 95, 88, 100, 70, 0, 92, 100, 80].map((w, i) => (w ? <span key={i} className="block h-4 rounded bg-slate-100" style={{ width: `${w}%` }} /> : <span key={i} className="block h-7 w-1/2 rounded bg-slate-200" />))}
        </div>
        <div className="space-y-5 lg:col-span-4">
          <div className="space-y-3 rounded-2xl border border-dash p-5">
            <span className="block h-3 w-28 rounded bg-slate-200" />
            {[80, 60, 70, 50].map((w, i) => (
              <span key={i} className="block h-3.5 rounded bg-slate-100" style={{ width: `${w}%` }} />
            ))}
          </div>
          <div className="h-40 rounded-2xl bg-slate-100" />
        </div>
      </div>
    </div>
  );
}
