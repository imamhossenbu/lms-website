import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getPlans } from "@/lib/plans";
import { PlanCards } from "@/components/pricing/PlanCards";
import { CompareTable } from "@/components/pricing/CompareTable";
import { Faq } from "@/components/home/Faq";
import { SectionHeading } from "@/components/shared/SectionHeading";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple monthly or yearly plans for schools, coaching centres and training institutes, each with a free trial.",
};

/** /pricing — plan cards (live from the API), full comparison, FAQ and a custom-plan note. */
export default async function PricingPage() {
  const plans = await getPlans();
  return (
    <>
      <section className="bg-gradient-to-b from-brand-orange-soft to-white">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6">
          <SectionHeading eyebrow="Pricing" title="Pick the plan that fits your academy" subtitle="Start with a free trial. Switch plans or cancel any time from your admin panel." />
          <div className="mt-10">
            <PlanCards plans={plans} />
          </div>
        </div>
      </section>
      {plans.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
          <h2 className="heading-h4 text-primary-500 mb-5">Compare every plan</h2>
          <CompareTable plans={plans} />
          <p className="body-sm-regular text-primary-300 mt-5">
            Need more students, a custom contract or invoicing in BDT?{" "}
            <Link href="/contact?topic=SALES" className="text-brand-orange hover:underline">
              Talk to us
            </Link>
            .
          </p>
        </section>
      )}
      <Faq />
    </>
  );
}
