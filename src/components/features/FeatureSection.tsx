import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Feature } from "@/lib/content";
import { Reveal } from "@/components/shared/Reveal";
import { ToneIcon } from "@/components/shared/ToneIcon";

/** One feature on /features: text + bullet points beside a large tinted panel (sides alternate). */
export function FeatureSection({ feature, flip }: { feature: Feature; flip: boolean }) {
  return (
    <section id={feature.id} className="scroll-mt-24 border-b border-dash last:border-b-0">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2">
        <Reveal className={cn(flip && "md:order-2")}>
          <ToneIcon icon={feature.icon} tone={feature.tone} size="lg" />
          <h2 className="heading-h2-bold text-primary-500 mt-5">{feature.title}</h2>
          <p className="body-l-medium text-primary-300 mt-3">{feature.summary}</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {feature.points.map((p) => (
              <li key={p} className="flex items-start gap-2.5 body-regular text-primary-500">
                <Check className="h-5 w-5 shrink-0 text-green mt-0.5" />
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1} className={cn(flip && "md:order-1")}>
          <div className="flex aspect-video items-center justify-center rounded-3xl border border-dash bg-gray-bg">
            <ToneIcon icon={feature.icon} tone={feature.tone} size="lg" className="h-24 w-24 rounded-3xl" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default FeatureSection;
