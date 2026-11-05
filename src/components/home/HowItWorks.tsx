import React from "react";
import { STEPS } from "@/lib/content";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";

/** Three numbered steps from sign-up to teaching. */
export function HowItWorks() {
  return (
    <section className="bg-gray-bg">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading eyebrow="How it works" title="Up and running in an afternoon" />
        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <li className="relative h-full rounded-2xl border border-dash bg-white p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-orange text-white heading-h6-bold">{i + 1}</span>
                <h3 className="heading-h5 text-primary-500 mt-5">{s.title}</h3>
                <p className="body-regular text-primary-300 mt-2">{s.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default HowItWorks;
