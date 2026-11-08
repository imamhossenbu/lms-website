import React, { Suspense } from "react";
import type { Metadata } from "next";
import { ShoppingBag } from "lucide-react";
import { getPlans } from "@/lib/plans";
import { HAS_API } from "@/lib/site";
import { CheckoutView } from "@/components/checkout/CheckoutView";
import { CheckoutSkeleton } from "@/components/checkout/CheckoutSkeleton";
import { CheckoutUnavailable } from "@/components/checkout/CheckoutUnavailable";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Buy an EduPro plan and get your academy online today. Pay securely with bKash, Nagad, cards or internet banking through SSLCommerz.",
  robots: { index: false },
};

/** /checkout?plan=&cycle= — academy + account details and the order summary; payment happens on SSLCommerz. */
export default async function CheckoutPage() {
  const plans = HAS_API ? await getPlans() : [];
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-brand-orange-soft via-white to-white">
      <div className="absolute -left-32 -top-24 -z-10 h-112 w-112 rounded-full bg-brand-orange-20 blur-3xl" aria-hidden />
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-12 sm:px-6">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-orange-light px-4 py-1.5 body-sm-medium text-brand-orange">
            <ShoppingBag className="h-4 w-4" />
            Checkout
          </span>
          <h1 className="heading-section mt-4 text-primary-500">Get your academy online today</h1>
          <p className="body-hero mt-3 text-primary-300">A few details, a secure payment, and your admin panel is ready.</p>
        </div>
        {plans.length ? (
          <Suspense fallback={<CheckoutSkeleton />}>
            <CheckoutView plans={plans} />
          </Suspense>
        ) : (
          <CheckoutUnavailable />
        )}
      </div>
    </section>
  );
}
