import React from "react";
import { GraduationCap } from "lucide-react";
import { getPlatformStats } from "@/lib/stats";
import { getTestimonials } from "@/lib/testimonials";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { BangladeshNetwork } from "./map/BangladeshNetwork";
import { StatsStrip } from "./StatsStrip";
import { TestimonialCarousel } from "./TestimonialCarousel";
import { TestimonialsEmpty } from "./TestimonialsEmpty";

/**
 * "Loved by educators across Bangladesh": heading + animated map, the published testimonials (managed in the
 * Owner Console; swipeable track, or an invite when none is published) and the live platform numbers.
 */
export async function LovedByEducators() {
  const [stats, quotes] = await Promise.all([getPlatformStats(), getTestimonials()]);

  return (
    <section className="relative overflow-hidden">
      <div className="absolute -left-40 top-0 -z-10 h-128 w-128 rounded-full bg-brand-orange-10 blur-3xl" aria-hidden />
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-8 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Trusted by academies"
              eyebrowIcon={<GraduationCap className="h-4 w-4" />}
              title="Loved by educators across Bangladesh"
              highlight="Bangladesh"
              underline
              subtitle="See how schools and coaching centres are growing with EduPro."
              align="left"
            />
          </div>
          <div className="lg:col-span-7">
            <BangladeshNetwork />
          </div>
        </div>

        <div className="mt-14">{quotes.length > 0 ? <TestimonialCarousel items={quotes} /> : <TestimonialsEmpty />}</div>

        {stats && (
          <div className="mt-14">
            <StatsStrip stats={stats} />
          </div>
        )}
      </div>
    </section>
  );
}

export default LovedByEducators;
