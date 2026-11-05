import React from "react";

/** Shape of the contact form while it loads: four inputs, two selects, the message box and the button. */
export function ContactFormSkeleton() {
  return (
    <div className="space-y-4 rounded-2xl border border-dash bg-white p-6 sm:p-8 animate-pulse" aria-busy="true" aria-label="Loading form">
      <div className="grid gap-4 sm:grid-cols-2">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-3 w-24 rounded bg-slate-200" />
            <div className="h-11 rounded-lg border border-dash bg-slate-100" />
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <div className="h-3 w-20 rounded bg-slate-200" />
        <div className="h-32 rounded-lg border border-dash bg-slate-100" />
      </div>
      <div className="h-12 w-40 rounded-xl bg-slate-200" />
    </div>
  );
}

export default ContactFormSkeleton;
