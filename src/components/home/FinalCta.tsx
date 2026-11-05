import React from "react";
import { ArrowRight } from "lucide-react";
import { signupUrl } from "@/lib/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/shared/Reveal";

/** Orange closing banner with the two main actions. */
export function FinalCta() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
      <Reveal>
        <div className="rounded-3xl bg-brand-orange px-6 py-14 text-center sm:px-12">
          <h2 className="heading-h2-bold text-white">Ready to take your academy online?</h2>
          <p className="body-l-medium text-white/85 mt-3 max-w-xl mx-auto">Start your free trial today, or talk to us and we&apos;ll show you around.</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href={signupUrl()} size="lg" variant="light" icon={<ArrowRight className="h-4 w-4" />}>
              Start free trial
            </ButtonLink>
            <ButtonLink href="/contact?topic=DEMO" size="lg" variant="ghost" className="text-white hover:text-white hover:bg-white/10">
              Book a demo
            </ButtonLink>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default FinalCta;
