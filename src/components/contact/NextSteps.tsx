"use client";

import React from "react";
import { motion } from "framer-motion";
import { Inbox, MailCheck, Rocket } from "lucide-react";

const STEPS = [
  { icon: Inbox, title: "We read your message", text: "A real person on our team, not a bot." },
  { icon: MailCheck, title: "We reply within a working day", text: "By email, with times for a call if you want one." },
  { icon: Rocket, title: "Your academy goes live", text: "We help you set up courses, payments and your team." },
];

/** "What happens next": a vertical timeline whose line draws down as the steps appear. */
export function NextSteps() {
  return (
    <div className="rounded-2xl border border-dash bg-white/70 p-5 backdrop-blur">
      <h2 className="body-sm-medium font-semibold uppercase tracking-wide text-primary-400">What happens next</h2>
      <ol className="relative mt-4 space-y-5">
        <motion.span
          className="absolute bottom-3 left-4 top-3 w-0.5 origin-top rounded-full bg-brand-orange-20"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.9, delay: 0.6, ease: "easeOut" }}
          aria-hidden
        />
        {STEPS.map(({ icon: Icon, title, text }, i) => (
          <motion.li key={title} className="relative flex gap-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.7 + i * 0.15 }}>
            <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-orange text-white shadow-md shadow-brand-orange/30">
              <Icon className="h-4 w-4" />
            </span>
            <span>
              <span className="body-medium block text-primary-500">{title}</span>
              <span className="body-sm-regular text-primary-300">{text}</span>
            </span>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

export default NextSteps;
