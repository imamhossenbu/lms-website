import React from "react";
import { Check, Minus } from "lucide-react";
import { FEATURE_LABELS, LIMIT_LABELS, formatLimit, type Plan } from "@/lib/plans";

/** Every limit and feature side by side (column borders, sticky first column on small screens). */
export function CompareTable({ plans }: { plans: Plan[] }) {
  if (!plans.length) return null;
  const features = FEATURE_LABELS.filter((f) => plans.some((p) => p.features.includes(f.key)));
  const head = "px-3.5 py-3 body-xsm-medium text-primary-400 font-semibold";
  const cell = "px-3.5 py-3 body-sm-regular text-primary-500 text-center";

  return (
    <div className="overflow-x-auto rounded-2xl border border-dash bg-white">
      <table className="w-full min-w-xl border-collapse">
        <thead className="bg-slate-50">
          <tr className="divide-x divide-dash border-b border-dash">
            <th className={`${head} text-left sticky left-0 bg-slate-50`}>Compare plans</th>
            {plans.map((p) => (
              <th key={p.id} className={`${head} text-center`}>
                {p.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-dash">
          {LIMIT_LABELS.map((l) => (
            <tr key={l.key} className="divide-x divide-dash hover:bg-slate-50/60">
              <td className="px-3.5 py-3 body-sm-medium text-primary-400 sticky left-0 bg-white">{l.label}</td>
              {plans.map((p) => (
                <td key={p.id} className={cell}>
                  {formatLimit(p.limits[l.key], l.unit)}
                </td>
              ))}
            </tr>
          ))}
          {features.map((f) => (
            <tr key={f.key} className="divide-x divide-dash hover:bg-slate-50/60">
              <td className="px-3.5 py-3 body-sm-medium text-primary-400 sticky left-0 bg-white">{f.label}</td>
              {plans.map((p) => (
                <td key={p.id} className={cell}>
                  {p.features.includes(f.key) ? (
                    <Check className="mx-auto h-4 w-4 text-green" aria-label="Included" />
                  ) : (
                    <Minus className="mx-auto h-4 w-4 text-primary-300" aria-label="Not included" />
                  )}
                </td>
              ))}
            </tr>
          ))}
          <tr className="divide-x divide-dash">
            <td className="px-3.5 py-3 body-sm-medium text-primary-400 sticky left-0 bg-white">Free trial</td>
            {plans.map((p) => (
              <td key={p.id} className={cell}>
                {p.trialDays > 0 ? `${p.trialDays} days` : "—"}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CompareTable;
