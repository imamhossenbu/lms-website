import React from "react";
import type { Metadata } from "next";
import { getPlans } from "@/lib/plans";
import { PlanCards } from "@/components/pricing/PlanCards";
import { CompareTable } from "@/components/pricing/CompareTable";
import { CustomPlanBanner } from "@/components/pricing/CustomPlanBanner";
import { PricingPerks } from "@/components/pricing/PricingPerks";
import { Faq } from "@/components/home/Faq";
import { FinalCta } from "@/components/home/FinalCta";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple monthly or yearly plans for schools, coaching centres and training institutes, each with a free trial.",
};

/** /pricing — hero with the live plan cards, reassurance perks, full comparison, custom-plan banner, FAQ, CTA. */
export default async function PricingPage() {
  const plans = await getPlans();
  const trialDays = Math.max(0, ...plans.map((p) => p.trialDays));
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Simple pricing for every academy"
        highlight="every academy"
        subtitle="Start with a free trial. Switch plans or cancel any time from your admin panel — no hidden fees."
      >
        <PlanCards plans={plans} />
        <PricingPerks trialDays={trialDays} />
      </PageHero>

      {plans.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <SectionHeading eyebrow="Compare plans" title="Every limit and feature, side by side" highlight="side by side" />
          <div className="mt-10">
            <CompareTable plans={plans} />
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6">
        <CustomPlanBanner />
      </section>

      <Faq />
      <FinalCta />
    </>
  );
}
