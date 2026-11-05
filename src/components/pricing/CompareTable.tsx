"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/cn";
import { FEATURE_LABELS, LIMIT_LABELS, formatLimit, type Plan } from "@/lib/plans";
import { ToneBadge } from "@/components/ui/ToneBadge";

const HEAD = "px-3.5 py-3 body-xsm-medium font-semibold text-primary-400";
const CELL = "px-3.5 py-3 text-center body-sm-regular text-primary-500";
const LABEL = "sticky left-0 bg-white px-3.5 py-3 text-left body-sm-medium text-primary-400";

/** A row that slides in when the table scrolls into view (short stagger). */
function Row({ index, className, children }: { index: number; className?: string; children: React.ReactNode }) {
  return (
    <motion.tr
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.3, delay: Math.min(index, 12) * 0.03 }}
      className={cn("divide-x divide-dash transition-colors hover:bg-gray-bg", className)}
    >
      {children}
    </motion.tr>
  );
}

/** Group heading row ("Limits", "Features"). */
function GroupRow({ label, span }: { label: string; span: number }) {
  return (
    <tr className="bg-brand-orange-soft">
      <td colSpan={span} className="px-3.5 py-2 body-xsm-medium font-semibold uppercase tracking-wide text-brand-orange">
        {label}
      </td>
    </tr>
  );
}

/**
 * Every limit and feature side by side: grouped rows, column + row borders, the popular plan's column tinted,
 * sticky first column for small screens.
 */
export function CompareTable({ plans }: { plans: Plan[] }) {
  if (!plans.length) return null;
  const features = FEATURE_LABELS.filter((f) => plans.some((p) => p.features.includes(f.key)));
  const tint = (p: Plan) => (p.highlighted ? "bg-brand-orange-soft" : "");
  let i = 0;

  return (
    <div className="overflow-x-auto rounded-2xl border border-dash bg-white shadow-sm">
      <table className="w-full min-w-xl border-collapse">
        <thead className="bg-gray-bg">
          <tr className="divide-x divide-dash border-b border-dash">
            <th className={cn(HEAD, "sticky left-0 bg-gray-bg text-left")}>Compare plans</th>
            {plans.map((p) => (
              <th key={p.id} className={cn(HEAD, "text-center", p.highlighted && "bg-brand-orange-light")}>
                <span className="inline-flex items-center gap-2">
                  <span className="body-sm-medium text-primary-500">{p.name}</span>
                  {p.highlighted && (
                    <ToneBadge tone="orange" size="sm" variant="pill">
                      Popular
                    </ToneBadge>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-dash">
          <GroupRow label="Limits" span={plans.length + 1} />
          {LIMIT_LABELS.map((l) => (
            <Row key={l.key} index={i++}>
              <td className={LABEL}>{l.label}</td>
              {plans.map((p) => (
                <td key={p.id} className={cn(CELL, tint(p))}>
                  {formatLimit(p.limits[l.key], l.unit)}
                </td>
              ))}
            </Row>
          ))}
          <Row index={i++}>
            <td className={LABEL}>Free trial</td>
            {plans.map((p) => (
              <td key={p.id} className={cn(CELL, tint(p))}>
                {p.trialDays > 0 ? `${p.trialDays} days` : "—"}
              </td>
            ))}
          </Row>
          {features.length > 0 && <GroupRow label="Features" span={plans.length + 1} />}
          {features.map((f) => (
            <Row key={f.key} index={i++}>
              <td className={LABEL}>{f.label}</td>
              {plans.map((p) => (
                <td key={p.id} className={cn(CELL, tint(p))}>
                  {p.features.includes(f.key) ? (
                    <span className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-green-bg">
                      <Check className="h-3.5 w-3.5 text-green" aria-label="Included" />
                    </span>
                  ) : (
                    <Minus className="mx-auto h-4 w-4 text-primary-300" aria-label="Not included" />
                  )}
                </td>
              ))}
            </Row>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CompareTable;
