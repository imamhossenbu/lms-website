import React from "react";
import type { LucideIcon } from "lucide-react";
import type { ToneKey } from "@/lib/content";
import { ToneIcon } from "@/components/shared/ToneIcon";

/** One KPI tile of the hero dashboard: tinted icon, big number, label. */
export function MockKpiCard({ icon, tone, value, label }: { icon: LucideIcon; tone: ToneKey; value: string; label: string }) {
  return (
    <div className="rounded-xl border border-dash bg-white p-3.5 shadow-xs">
      <ToneIcon icon={icon} tone={tone} size="sm" />
      <span className="heading-h4-semibold font-bold text-primary-500 block mt-2.5">{value}</span>
      <span className="body-2xsm-regular text-primary-300">{label}</span>
    </div>
  );
}

export default MockKpiCard;
