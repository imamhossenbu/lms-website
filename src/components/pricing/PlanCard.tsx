"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Check, Crown, Gem, Rocket, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { formatPrice, planHighlights, yearlySaving, type Plan } from "@/lib/plans";
import { signupUrl } from "@/lib/site";
import { checkoutUrl } from "@/lib/checkout";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Spotlight } from "@/components/motion/Spotlight";
import { PlanPrice } from "./PlanPrice";

/** Icon per plan position (cheapest first); extra plans reuse the last one. */
const PLAN_ICONS: LucideIcon[] = [Rocket, Building2, Crown, Gem];

interface PlanCardProps {
  plan: Plan;
  /** All plans shown (cheapest first) — for the icon and "what's new" points. */
  plans: Plan[];
  cycle: "MONTHLY" | "YEARLY";
  index?: number;
}

/** One plan: icon, name, tagline, price for the cycle, four selling points, "Buy now" (website checkout) and a free-trial link (panel sign-up; both pre-select the plan). */
export function PlanCard({ plan, plans, cycle, index = 0 }: PlanCardProps) {
  const yearly = cycle === "YEARLY";
  const Icon = PLAN_ICONS[Math.min(index, PLAN_ICONS.length - 1)];
  const saving = yearlySaving(plan);
  const popular = plan.highlighted;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className={cn("h-full", popular && "lg:-my-2")}
    >
      <Spotlight className="rounded-3xl">
        <div
          className={cn(
            "relative flex h-full flex-col rounded-3xl border bg-white p-7 transition-shadow duration-300",
            popular ? "border-brand-orange bg-gradient-to-b from-brand-orange-soft to-white shadow-2xl shadow-brand-orange/15" : "border-dash shadow-sm hover:shadow-xl hover:shadow-primary-500/5"
          )}
        >
          {popular && (
            <span className="absolute -top-3.5 right-8 rounded-full bg-brand-orange px-4 py-1.5 body-sm-medium text-white shadow-md shadow-brand-orange/30 whitespace-nowrap">
              Most Popular
            </span>
          )}
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-orange-light text-brand-orange">
            <Icon className="h-7 w-7" />
          </span>
          <h3 className="heading-h3-bold tracking-tight text-primary-500 mt-5">{plan.name}</h3>
          <p className="body-l-regular text-primary-300 mt-2 min-h-14">{plan.tagline}</p>

          <div className="mt-6">
            <PlanPrice amount={yearly ? Math.round(plan.priceYearly / 12) : plan.priceMonthly} />
            <p className="body-sm-regular text-primary-300 mt-1 min-h-5">
              {yearly ? `${formatPrice(plan.priceYearly)} billed yearly${saving ? ` · save ${saving}%` : ""}` : "Billed monthly"}
            </p>
          </div>

          <ul className="mt-6 flex-1 space-y-3.5">
            {planHighlights(plan, plans).map((line) => (
              <li key={line} className="flex items-center gap-3 body-regular text-primary-400">
                <Check className="h-5 w-5 shrink-0 text-brand-orange" strokeWidth={2.5} />
                {line}
              </li>
            ))}
          </ul>

          <ButtonLink
            href={checkoutUrl(plan.id, cycle)}
            variant={popular ? "primary" : "secondary"}
            size="lg"
            icon={<ArrowRight className="h-4 w-4" />}
            className="mt-8 h-14 w-full"
          >
            Buy now
          </ButtonLink>
          <Link href={signupUrl(plan.id, cycle)} className="mt-3 text-center body-sm-medium text-primary-400 transition-colors hover:text-brand-orange">
            or start a {plan.trialDays > 0 ? `${plan.trialDays}-day ` : ""}free trial
          </Link>
        </div>
      </Spotlight>
    </motion.div>
  );
}

export default PlanCard;
