import React from "react";
import { CtaCopy } from "./cta/CtaCopy";
import { CtaVisual } from "./cta/CtaVisual";
import { CtaWaves } from "./cta/CtaWaves";

/** Closing banner: the product on a tilted device (left) and "Start your online academy" with the main actions (right). */
export function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-brand-orange-soft via-white to-brand-orange-light">
      <div className="absolute -left-40 -top-40 -z-10 h-128 w-128 rounded-full bg-brand-orange-10 blur-3xl" aria-hidden />
      <CtaWaves />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-24 sm:px-6 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <CtaVisual />
        </div>
        <div className="lg:col-span-6 lg:pl-6">
          <CtaCopy />
        </div>
      </div>
    </section>
  );
}

export default FinalCta;
