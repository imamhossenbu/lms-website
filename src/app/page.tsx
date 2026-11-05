import React from "react";
import Link from "next/link";
import { getPlans } from "@/lib/plans";
import { Hero } from "@/components/home/Hero";
import { TrustedBy } from "@/components/home/trusted/TrustedBy";
import { FeatureGrid } from "@/components/home/FeatureGrid";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Showcase } from "@/components/home/showcase/Showcase";
import { Faq } from "@/components/home/Faq";
import { FinalCta } from "@/components/home/FinalCta";
import { PlanCards } from "@/components/pricing/PlanCards";
import { SectionHeading } from "@/components/shared/SectionHeading";

/** Home: hero, trusted-by marquee, features, how it works, product tour, pricing, FAQ, closing CTA. */
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
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading eyebrow="Pricing" title="Simple plans that grow with you" subtitle="Every plan includes courses, quizzes, assignments and payments. Pick the size that fits." />
        <div className="mt-10">
          <PlanCards plans={plans} />
        </div>
        <p className="text-center body-sm-regular text-primary-300 mt-8">
          Compare every limit and feature on the{" "}
          <Link href="/pricing" className="text-brand-orange hover:underline">
            pricing page
          </Link>
          .
        </p>
      </section>
      <Faq />
      <FinalCta />
    </>
  );
}
