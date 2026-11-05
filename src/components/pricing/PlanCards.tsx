"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CircleDollarSign } from "lucide-react";
import type { Plan } from "@/lib/plans";
import { HAS_API } from "@/lib/site";
import { CycleToggle } from "./CycleToggle";
import { PlanCard } from "./PlanCard";

/** Cycle toggle + plan cards (home and /pricing). Empty state with a contact link when the plans couldn't load. */
export function PlanCards({ plans }: { plans: Plan[] }) {
  const [cycle, setCycle] = useState<"MONTHLY" | "YEARLY">("MONTHLY");

  if (!plans.length)
    return (
      <div className="mx-auto max-w-lg rounded-2xl border border-dash bg-white p-8 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-orange-light text-brand-orange">
          <CircleDollarSign className="h-6 w-6" />
        </span>
        <p className="body-medium text-primary-500 mt-4">{HAS_API ? "Plans are taking a moment to load." : "Our plans will be listed here very soon."}</p>
        <p className="body-sm-regular text-primary-300 mt-2">
          {HAS_API ? "Refresh the page, or " : "In the meantime, "}
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
        <CycleToggle cycle={cycle} onChange={setCycle} />
      </div>
      <div className={`mt-12 grid items-stretch gap-6 sm:grid-cols-2 ${plans.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
        {plans.map((p, i) => (
          <PlanCard key={p.id} plan={p} plans={plans} cycle={cycle} index={i} />
        ))}
      </div>
    </div>
  );
}

export default PlanCards;
