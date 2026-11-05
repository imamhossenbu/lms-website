import React from "react";
import { BadgeCheck } from "lucide-react";
import { GATEWAYS } from "@/lib/content";

/** "Collect payments with …" strip under the hero. */
export function PaymentsStrip() {
  return (
    <section className="border-y border-dash bg-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-6 sm:flex-row sm:justify-center sm:gap-8 sm:px-6">
        <span className="body-sm-medium text-primary-400">Collect course fees with</span>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {GATEWAYS.map((g) => (
            <span key={g} className="inline-flex items-center gap-1.5 rounded-full border border-dash bg-white px-4 py-1.5 body-sm-medium text-primary-500 whitespace-nowrap">
              <BadgeCheck className="h-4 w-4 text-green" />
              {g}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PaymentsStrip;
