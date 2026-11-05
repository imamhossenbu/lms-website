import React from "react";
import type { Metadata } from "next";
import { EXTRAS, FEATURES } from "@/lib/content";
import { FeatureSection } from "@/components/features/FeatureSection";
import { FinalCta } from "@/components/home/FinalCta";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";

export const metadata: Metadata = {
  title: "Features",
  description: "Courses, live classes, quizzes, assignments, certificates, payments, community, analytics and team roles: everything EduPro includes.",
};

/** /features — one section per feature (anchor links from the home grid and footer) + extras + CTA. */
export default function FeaturesPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-brand-orange-soft to-white">
        <div className="mx-auto max-w-6xl px-4 pb-8 pt-16 sm:px-6">
          <SectionHeading eyebrow="Features" title="Everything your academy needs" subtitle="From the first lesson to the final certificate, EduPro covers teaching, assessment, payments and reporting." />
        </div>
      </section>
      {FEATURES.map((f, i) => (
        <FeatureSection key={f.id} feature={f} flip={i % 2 === 1} />
      ))}
      <section className="bg-gray-bg">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <SectionHeading title="And a lot more" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {EXTRAS.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-dash bg-white p-5">
                  <Icon className="h-5 w-5 text-brand-orange" />
                  <h3 className="heading-h6-bold text-primary-500 mt-3">{title}</h3>
                  <p className="body-sm-regular text-primary-300 mt-1.5">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <div className="pt-20">
        <FinalCta />
      </div>
    </>
  );
}
