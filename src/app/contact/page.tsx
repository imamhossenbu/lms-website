import React, { Suspense } from "react";
import type { Metadata } from "next";
import { CalendarCheck, Clock, Headphones } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactFormSkeleton } from "@/components/contact/ContactFormSkeleton";
import { ToneIcon } from "@/components/shared/ToneIcon";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a demo, ask about pricing or get help with EduPro.",
};

const POINTS = [
  { icon: CalendarCheck, tone: "orange" as const, title: "Book a demo", text: "A 30-minute walkthrough of the admin panel, built around your academy." },
  { icon: Headphones, tone: "blue" as const, title: "Talk to sales", text: "Plans, bigger limits, contracts and payment questions." },
  { icon: Clock, tone: "green" as const, title: "Quick replies", text: "We answer every message within one working day." },
];

/** /contact — why to get in touch + the form (topic from ?topic=). */
export default function ContactPage() {
  return (
    <section className="bg-gradient-to-b from-brand-orange-soft to-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <span className="body-sm-medium text-brand-orange">Contact</span>
          <h1 className="heading-h1-bold text-primary-500 mt-2">Let&apos;s talk about your academy</h1>
          <p className="body-l-medium text-primary-300 mt-3">Tell us what you teach and how many students you have, and we&apos;ll help you get set up.</p>
          <ul className="mt-8 space-y-5">
            {POINTS.map((p) => (
              <li key={p.title} className="flex gap-4">
                <ToneIcon icon={p.icon} tone={p.tone} />
                <div>
                  <h2 className="heading-h6-bold text-primary-500">{p.title}</h2>
                  <p className="body-sm-regular text-primary-300 mt-1">{p.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-3">
          <Suspense fallback={<ContactFormSkeleton />}>
            <ContactForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
