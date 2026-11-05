import React from "react";
import { getPlans } from "@/lib/plans";
import { Hero } from "@/components/home/Hero";
import { TrustedBy } from "@/components/home/trusted/TrustedBy";
import { FeatureGrid } from "@/components/home/FeatureGrid";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Showcase } from "@/components/home/showcase/Showcase";
import { LovedByEducators } from "@/components/home/love/LovedByEducators";
import { Faq } from "@/components/home/Faq";
import { FinalCta } from "@/components/home/FinalCta";
import { PlanCards } from "@/components/pricing/PlanCards";
import { SectionHeading } from "@/components/shared/SectionHeading";

/** Home: hero, trusted-by marquee, features, how it works, product tour, testimonials + live numbers, pricing, FAQ, closing CTA. */
export default async function HomePage() {
  const plans = await getPlans();
  const trialDays = Math.max(0, ...plans.map((p) => p.trialDays));
  return (
    <>
      <Hero trialDays={trialDays} />
      <TrustedBy />
      <FeatureGrid />
      <HowItWorks />
      <Showcase />
      <LovedByEducators />
      <section className="relative overflow-hidden">
        <div className="absolute -left-40 top-20 -z-10 h-128 w-128 rounded-full bg-brand-orange-10 blur-3xl" aria-hidden />
        <div className="absolute -bottom-40 -right-40 -z-10 h-128 w-128 rounded-full bg-brand-orange-10 blur-3xl" aria-hidden />
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <SectionHeading eyebrow="Simple, transparent pricing" title="Choose the perfect plan" highlight="plan" subtitle="Start with a free trial and upgrade anytime. No hidden fees." />
          <div className="mt-10">
            <PlanCards plans={plans} />
          </div>
        </div>
      </section>
      <Faq />
      <FinalCta />
    </>
  );
}
