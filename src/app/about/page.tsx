import React from "react";
import type { Metadata } from "next";
import { Info } from "lucide-react";
import { getPlatformStats } from "@/lib/stats";
import { AboutBuiltFor } from "@/components/about/AboutBuiltFor";
import { AboutStory } from "@/components/about/AboutStory";
import { AboutValues } from "@/components/about/AboutValues";
import { StatsStrip } from "@/components/home/love/StatsStrip";
import { FinalCta } from "@/components/home/FinalCta";
import { PageHero } from "@/components/shared/PageHero";

export const metadata: Metadata = {
  title: "About",
  description: "Why we built EduPro: one platform for schools, coaching centres and training institutes to teach online, assess, get paid and grow.",
};

/** /about — hero with the live platform numbers, our story, values, built for local academies, CTA. */
export default async function AboutPage() {
  const stats = await getPlatformStats();
  return (
    <>
      <PageHero
        eyebrow="About EduPro"
        eyebrowIcon={<Info className="h-4 w-4" />}
        title="We help academies teach online, their own way"
        highlight="their own way"
        subtitle="EduPro gives schools, coaching centres and training institutes one platform for courses, live classes, exams, certificates and fees."
      >
        {stats && (
          <div className="mx-auto max-w-6xl">
            <StatsStrip stats={stats} />
          </div>
        )}
      </PageHero>
      <AboutStory />
      <AboutValues />
      <AboutBuiltFor />
      <FinalCta />
    </>
  );
}
