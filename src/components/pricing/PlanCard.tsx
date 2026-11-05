"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import { FEATURE_LABELS, LIMIT_LABELS, formatLimit, formatPrice, type Plan } from "@/lib/plans";
import { signupUrl } from "@/lib/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ToneBadge } from "@/components/ui/ToneBadge";

/** One plan: name, tagline, price for the cycle, limits, features and a trial CTA (pre-selects the plan). */
export function PlanCard({ plan, cycle, index = 0 }: { plan: Plan; cycle: "MONTHLY" | "YEARLY"; index?: number }) {
  const yearly = cycle === "YEARLY";
  const price = yearly ? plan.priceYearly / 12 : plan.priceMonthly;
  const included = FEATURE_LABELS.filter((f) => plan.features.includes(f.key));

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: index * 0.07 }}
      className={cn("relative flex h-full flex-col rounded-2xl border bg-white p-6", plan.highlighted ? "border-brand-orange shadow-xl shadow-brand-orange/10" : "border-dash")}
    >
      {plan.highlighted && (
        <ToneBadge tone="orange" size="sm" className="absolute -top-3 left-6">
          Most popular
        </ToneBadge>
      )}
      <h3 className="heading-h5 text-primary-500">{plan.name}</h3>
      <p className="body-sm-regular text-primary-300 mt-1.5 min-h-10">{plan.tagline}</p>
      <div className="mt-5 flex items-end gap-1">
        <span className="heading-h1-bold text-primary-500">{formatPrice(price)}</span>
        <span className="body-sm-regular text-primary-300 mb-1.5">/ month</span>
      </div>
      <p className="body-xsm-regular text-primary-300 mt-1">{yearly ? `${formatPrice(plan.priceYearly)} billed yearly` : "Billed monthly"}</p>

      <ButtonLink href={signupUrl(plan.id, cycle)} variant={plan.highlighted ? "primary" : "secondary"} className="mt-6 w-full">
        {plan.trialDays > 0 ? `Start ${plan.trialDays}-day free trial` : "Get started"}
      </ButtonLink>

      <ul className="mt-6 space-y-2.5 border-t border-dash pt-5">
        {LIMIT_LABELS.map((l) => (
          <li key={l.key} className="flex items-center justify-between gap-3 body-sm-regular">
            <span className="text-primary-400">{l.label}</span>
            <span className="body-sm-medium text-primary-500">{formatLimit(plan.limits[l.key], l.unit)}</span>
          </li>
        ))}
      </ul>
      <ul className="mt-5 space-y-2.5 border-t border-dash pt-5">
        {included.map((f) => (
          <li key={f.key} className="flex items-center gap-2.5 body-sm-regular text-primary-500">
            <Check className="h-4 w-4 shrink-0 text-green" />
            {f.label}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default PlanCard;
