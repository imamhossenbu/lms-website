"use client";

import React, { useState } from "react";
import Link from "next/link";
import { yearlySaving, type Plan } from "@/lib/plans";
import { CycleToggle } from "./CycleToggle";
import { PlanCard } from "./PlanCard";

/** Cycle toggle + plan cards (home teaser and /pricing). Shows a contact link when the plans couldn't load. */
export function PlanCards({ plans }: { plans: Plan[] }) {
  const [cycle, setCycle] = useState<"MONTHLY" | "YEARLY">("MONTHLY");
  const saving = Math.max(0, ...plans.map(yearlySaving));

  if (!plans.length)
    return (
      <div className="mx-auto max-w-lg rounded-2xl border border-dash bg-white p-8 text-center">
        <p className="body-medium text-primary-500">Plans are taking a moment to load.</p>
        <p className="body-sm-regular text-primary-300 mt-2">
          Refresh the page, or{" "}
          <Link href="/contact?topic=SALES" className="text-brand-orange hover:underline">
            ask us for pricing
          </Link>
          .
        </p>
      </div>
    );

  return (
    <div>
      <div className="flex justify-center">
        <CycleToggle cycle={cycle} onChange={setCycle} saving={saving} />
      </div>
      <div className={`mt-10 grid gap-5 sm:grid-cols-2 ${plans.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
        {plans.map((p, i) => (
          <PlanCard key={p.id} plan={p} cycle={cycle} index={i} />
        ))}
      </div>
    </div>
  );
}

export default PlanCards;
