import React from "react";
import { HeroCopy } from "./hero/HeroCopy";
import { HeroVisual } from "./hero/HeroVisual";

/** Home hero: copy on the left, the tilted dashboard illustration on the right, on a soft orange wash. */
export function Hero({ trialDays }: { trialDays: number }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-orange-soft via-brand-orange-soft to-white">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 pb-20 pt-14 sm:px-6 md:pt-20 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <HeroCopy trialDays={trialDays} />
        </div>
        <div className="lg:col-span-7">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}

export default Hero;
