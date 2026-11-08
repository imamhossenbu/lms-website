"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, Lock, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/cn";
import { planHighlights, yearlySaving, type Plan } from "@/lib/plans";
import { usd, type CheckoutQuote } from "@/lib/checkout";
import { CycleToggle } from "@/components/pricing/CycleToggle";
import { PaymentLogos } from "@/components/shared/PaymentLogos";
import { ToneBadge } from "@/components/ui/ToneBadge";

interface OrderSummaryProps {
  plans: Plan[];
  planId: string;
  cycle: "MONTHLY" | "YEARLY";
  country: string;
  quote: CheckoutQuote | null;
  quoting: boolean;
  quoteError: string | null;
  onPlan: (id: string) => void;
  onCycle: (c: "MONTHLY" | "YEARLY") => void;
}

/** Right side of checkout: pick plan + cycle, what's included, price with tax for the country, and how payment works. */
export function OrderSummary({ plans, planId, cycle, country, quote, quoting, quoteError, onPlan, onCycle }: OrderSummaryProps) {
  const plan = plans.find((p) => p.id === planId) ?? plans[0];
  const row = "flex items-center justify-between body-regular";

  return (
    <div className="rounded-3xl border border-dash bg-white p-6 shadow-xl shadow-brand-orange/5 sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <h2 className="heading-h5 text-primary-500">Your plan</h2>
        <CycleToggle cycle={cycle} onChange={onCycle} />
      </div>

      <div className="mt-5 space-y-2.5" role="radiogroup" aria-label="Plan">
        {plans.map((p) => {
          const on = p.id === plan.id;
          const price = cycle === "YEARLY" ? p.priceYearly : p.priceMonthly;
          return (
            <motion.button
              key={p.id}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => onPlan(p.id)}
              whileTap={{ scale: 0.98 }}
              className={cn("relative flex w-full items-center justify-between gap-3 rounded-2xl border p-4 text-left transition-colors", on ? "border-transparent" : "border-dash hover:border-brand-orange-20")}
            >
              {on && <motion.span layoutId="checkout-plan" className="absolute inset-0 rounded-2xl border-2 border-brand-orange bg-brand-orange-soft" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
              <span className="relative flex items-center gap-3">
                <span className={cn("flex h-5 w-5 items-center justify-center rounded-full border-2", on ? "border-brand-orange bg-brand-orange" : "border-dash")}>
                  {on && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                </span>
                <span>
                  <span className="body-medium block text-primary-500">{p.name}</span>
                  <span className="body-xsm-regular text-primary-300">{p.tagline}</span>
                </span>
              </span>
              <span className="relative text-right">
                <span className="body-l-medium block font-semibold text-primary-500">{usd(price)}</span>
                <span className="whitespace-nowrap body-2xsm-regular text-primary-300">{cycle === "YEARLY" ? "per year" : "per month"}</span>
              </span>
              {p.highlighted && (
                <ToneBadge tone="orange" size="sm" variant="pill" className="absolute -top-2.5 right-4">
                  Popular
                </ToneBadge>
              )}
            </motion.button>
          );
        })}
      </div>

      <ul className="mt-5 space-y-2 border-t border-dash pt-5">
        {planHighlights(plan, plans).map((line) => (
          <li key={line} className="flex items-center gap-2.5 body-sm-regular text-primary-400">
            <Check className="h-4 w-4 shrink-0 text-brand-orange" strokeWidth={2.5} />
            {line}
          </li>
        ))}
      </ul>

      <div className="mt-5 space-y-2.5 rounded-2xl bg-gray-bg p-5">
        <AnimatePresence mode="wait" initial={false}>
          {quoteError ? (
            <motion.p key="err" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="body-sm-regular text-red">
              {quoteError}
            </motion.p>
          ) : (
            <motion.div key={`${planId}-${cycle}-${country}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-2.5">
              <div className={row}>
                <span className="text-primary-400">
                  {plan.name} · {cycle === "YEARLY" ? "1 year" : "1 month"}
                </span>
                <span className="text-primary-500">{quote ? usd(quote.subtotal) : "—"}</span>
              </div>
              <div className={row}>
                <span className="text-primary-400">Tax ({country})</span>
                <span className="text-primary-500">{quote ? usd(quote.tax) : "—"}</span>
              </div>
              {cycle === "YEARLY" && yearlySaving(plan) > 0 && (
                <div className={row}>
                  <span className="text-green">Yearly saving</span>
                  <span className="text-green">{yearlySaving(plan)}%</span>
                </div>
              )}
              <div className="flex items-center justify-between border-t border-dash pt-3">
                <span className="heading-h6-bold text-primary-500">Due today</span>
                <span className="flex items-center gap-2 heading-h4 text-primary-500">
                  {quoting && <Loader2 className="h-4 w-4 animate-spin text-brand-orange" />}
                  {quote ? usd(quote.total) : "—"}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-5 space-y-3">
        <PaymentLogos label="" className="justify-start gap-2" />
        <p className="flex items-start gap-2 body-xsm-regular text-primary-300">
          <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          You&apos;ll pay on SSLCommerz&apos;s secure page — bKash, Nagad, cards or internet banking. We never see your card or PIN.
        </p>
        <p className="flex items-start gap-2 body-xsm-regular text-primary-300">
          <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          Renews {cycle === "YEARLY" ? "yearly" : "monthly"}; cancel any time from Billing &amp; Plan.
        </p>
      </div>
    </div>
  );
}

export default OrderSummary;
