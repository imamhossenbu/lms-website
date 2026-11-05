import React from "react";
import { ArrowRight } from "lucide-react";
import { STEPS } from "@/lib/content";
import { signupUrl } from "@/lib/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { StepCard } from "./steps/StepCard";
import { FlowArrow } from "./steps/FlowArrow";

/** "How it works": three step cards joined by arrows (desktop) and a trial CTA. */
export function HowItWorks() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute -left-40 -top-40 -z-10 h-128 w-128 rounded-full bg-brand-orange-10 blur-3xl" aria-hidden />
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6">
        <SectionHeading
          eyebrow="How it works"
          title="Get your online academy up and running in 3 simple steps"
          highlight="in 3 simple steps"
          highlightOnNewLine
          subtitle="Set up your academy, add your content and start teaching — it's that simple."
          className="max-w-4xl"
        />
        <ol className="mt-14 flex flex-col items-stretch gap-6 lg:flex-row lg:gap-4">
          {STEPS.map((s, i) => (
            <React.Fragment key={s.id}>
              <li className="flex-1 list-none">
                <StepCard index={i} />
              </li>
              {i < STEPS.length - 1 && (
                <li className="hidden shrink-0 list-none items-center justify-center lg:flex" aria-hidden>
                  <FlowArrow />
                </li>
              )}
            </React.Fragment>
          ))}
        </ol>
        <div className="mt-14 flex justify-center">
          <ButtonLink href={signupUrl()} size="lg" icon={<ArrowRight className="h-5 w-5" />} className="h-14 px-8">
            Start free trial
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
