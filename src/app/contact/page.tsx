import React, { Suspense } from "react";
import type { Metadata } from "next";
import { ContactCard } from "@/components/contact/ContactCard";
import { NextSteps } from "@/components/contact/NextSteps";
import { TopicCards, TopicCardsSkeleton } from "@/components/contact/TopicCards";
import { PageHero } from "@/components/shared/PageHero";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a demo, ask about pricing or get help with EduPro.",
};

/** /contact — hero, topic cards (synced with ?topic=) + what happens next, and the form card. */
export default function ContactPage() {
  return (
    <PageHero
      eyebrow="Contact"
      title="Let's talk about your academy"
      highlight="your academy"
      subtitle="Book a demo, ask about plans or get help — we answer every message within one working day."
    >
      <div className="mx-auto grid max-w-6xl items-start gap-8 text-left lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-5">
          <Suspense fallback={<TopicCardsSkeleton />}>
            <TopicCards />
          </Suspense>
          <NextSteps />
        </div>
        <div className="lg:col-span-7">
          <ContactCard />
        </div>
      </div>
    </PageHero>
  );
}
