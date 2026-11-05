import React from "react";
import type { Metadata } from "next";
import { FEATURES } from "@/lib/content";
import { FeatureNav } from "@/components/features/FeatureNav";
import { FeatureSection } from "@/components/features/FeatureSection";
import { ExtrasGrid } from "@/components/features/ExtrasGrid";
import { FinalCta } from "@/components/home/FinalCta";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";

export const metadata: Metadata = {
  title: "Features",
  description: "Courses, live classes, quizzes, assignments, certificates, payments, community, analytics and team roles: everything EduPro includes.",
};

/** /features — hero, sticky feature nav (scroll-spy + URL hash), one section per feature with its screen, extras, CTA. */
export default function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="Features"
        title="Everything your academy needs, in one place"
        highlight="in one place"
        subtitle="From the first lesson to the final certificate — teaching, assessment, payments and reporting, all from one admin panel."
      />
      {/* The sticky nav only spans the feature sections. */}
      <div>
        <FeatureNav />
        {FEATURES.map((f, i) => (
          <FeatureSection key={f.id} featureId={f.id} index={i} />
        ))}
      </div>
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <SectionHeading eyebrow="And a lot more" title="Built for the way academies really work" highlight="really work" />
        <div className="mt-12">
          <ExtrasGrid />
        </div>
      </section>
      <FinalCta />
    </>
  );
}
