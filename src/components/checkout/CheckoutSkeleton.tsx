import React from "react";

/** Checkout while it loads: steps, two form cards with inputs, the terms + pay button, and the order summary. */
export function CheckoutSkeleton() {
  const input = (
    <div className="space-y-2">
      <div className="h-3 w-24 rounded bg-slate-200" />
      <div className="h-11 rounded-lg border border-dash bg-slate-100" />
    </div>
  );
  return (
    <div className="animate-pulse" aria-busy="true" aria-label="Loading checkout">
      <div className="mx-auto flex max-w-xl items-center gap-3">
        {[0, 1, 2].map((i) => (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center gap-2">
              <div className="h-11 w-11 rounded-2xl bg-slate-200" />
              <div className="h-3 w-20 rounded bg-slate-100" />
            </div>
            {i < 2 && <div className="mb-6 h-0.5 flex-1 rounded bg-slate-100" />}
          </React.Fragment>
        ))}
      </div>
      <div className="mt-12 grid gap-8 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-7">
          {[0, 1].map((c) => (
            <div key={c} className="space-y-4 rounded-3xl border border-dash bg-white p-8">
              <div className="h-5 w-36 rounded bg-slate-200" />
              <div className="h-3.5 w-64 rounded bg-slate-100" />
              <div className="grid gap-4 sm:grid-cols-2">
                {input}
                {input}
                {input}
                {input}
              </div>
            </div>
          ))}
          <div className="space-y-4 rounded-3xl border border-dash bg-white p-8">
            <div className="h-4 w-3/4 rounded bg-slate-100" />
            <div className="h-12 rounded-xl bg-slate-200" />
          </div>
        </div>
        <div className="space-y-3 rounded-3xl border border-dash bg-white p-7 lg:col-span-5">
          <div className="flex justify-between">
            <div className="h-5 w-24 rounded bg-slate-200" />
            <div className="h-10 w-40 rounded-full bg-slate-100" />
          </div>
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-16 rounded-2xl border border-dash bg-slate-50" />
          ))}
          <div className="h-32 rounded-2xl bg-slate-100" />
          <div className="flex gap-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-12 w-20 rounded-xl border border-dash bg-slate-50" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutSkeleton;
