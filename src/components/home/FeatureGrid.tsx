import React from "react";
import { ArrowRight } from "lucide-react";
import { FEATURES } from "@/lib/content";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FeatureCard } from "./FeatureCard";

/** "Everything to run your academy": 8 feature tiles (4 × 2) and a link to the full features page. */
export function FeatureGrid() {
  return (
    <section className="relative overflow-hidden">
      {/* Soft orange wave in the bottom-right corner. */}
      <div className="absolute -bottom-40 -right-40 -z-10 h-128 w-128 rounded-full bg-brand-orange-10 blur-3xl" aria-hidden />
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <SectionHeading
          eyebrow="All the tools you need"
          title="Everything to run your academy"
          highlight="academy"
          subtitle="Build courses, take live classes, assess learning, issue certificates, get paid and manage your team — all in one platform."
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.id} featureId={f.id} index={i} />
          ))}
        </div>
        <div className="mt-14 flex justify-center">
          <ButtonLink href="/features" size="lg" icon={<ArrowRight className="h-5 w-5" />} className="h-14 px-8">
            Explore all features
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

export default FeatureGrid;
