"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CalendarCheck, Headphones, MessagesSquare, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import type { ToneKey } from "@/lib/content";
import { ToneIcon } from "@/components/shared/ToneIcon";

const CARDS: { topic: string; icon: LucideIcon; tone: ToneKey; title: string; text: string }[] = [
  { topic: "DEMO", icon: CalendarCheck, tone: "orange", title: "Book a demo", text: "A 30-minute walkthrough of the admin panel, built around your academy." },
  { topic: "SALES", icon: MessagesSquare, tone: "blue", title: "Pricing & plans", text: "Bigger limits, contracts, BDT invoicing and payment questions." },
  { topic: "SUPPORT", icon: Headphones, tone: "green", title: "Support", text: "Already on EduPro? Tell us what's wrong and we'll help." },
];

/**
 * What the visitor wants to talk about, as selectable cards. Each sets `?topic=` (the form follows), and the
 * selected card gets the sliding orange outline. Render inside <Suspense>.
 */
export function TopicCards() {
  const params = useSearchParams();
  const pathname = usePathname();
  const current = params.get("topic") ?? "DEMO";

  return (
    <ul className="space-y-3">
      {CARDS.map((c, i) => {
        const on = c.topic === current;
        const q = new URLSearchParams(params.toString());
        q.set("topic", c.topic);
        return (
          <motion.li key={c.topic} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}>
            <Link
              href={`${pathname}?${q.toString()}`}
              scroll={false}
              replace
              aria-current={on ? "true" : undefined}
              className={cn("group relative flex items-start gap-4 rounded-2xl border bg-white p-4 transition-shadow hover:shadow-lg hover:shadow-brand-orange/10", on ? "border-transparent" : "border-dash")}
            >
              {on && <motion.span layoutId="topic-outline" className="absolute inset-0 rounded-2xl border-2 border-brand-orange" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
              <ToneIcon icon={c.icon} tone={c.tone} className="transition-transform duration-300 group-hover:scale-110" />
              <span className="relative">
                <span className="heading-h6-bold block text-primary-500">{c.title}</span>
                <span className="body-sm-regular mt-1 block text-primary-300">{c.text}</span>
              </span>
            </Link>
          </motion.li>
        );
      })}
    </ul>
  );
}

/** Same three cards while the URL loads. */
export function TopicCardsSkeleton() {
  return (
    <ul className="space-y-3 animate-pulse" aria-busy="true">
      {[0, 1, 2].map((i) => (
        <li key={i} className="flex gap-4 rounded-2xl border border-dash bg-white p-4">
          <span className="h-11 w-11 shrink-0 rounded-xl bg-slate-200" />
          <span className="flex-1 space-y-2">
            <span className="block h-4 w-32 rounded bg-slate-200" />
            <span className="block h-3 w-full rounded bg-slate-100" />
            <span className="block h-3 w-2/3 rounded bg-slate-100" />
          </span>
        </li>
      ))}
    </ul>
  );
}

export default TopicCards;
