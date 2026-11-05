"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, CreditCard, Globe, Smartphone, Video, Wallet } from "lucide-react";
import { EASE_OUT } from "@/components/motion/presets";

const POINTS = [
  "Collect fees with bKash and SSLCommerz — or Stripe for students abroad",
  "Live classes on the Zoom or Google Meet accounts you already have",
  "Your academy's own name, logo, colours and domain",
  "Certificates students can verify online with a code",
  "Roles for teachers, accountants and admins, with two-factor sign-in",
];
const CHIPS = [
  { icon: Wallet, label: "bKash", x: "8%", y: "12%" },
  { icon: CreditCard, label: "SSLCommerz", x: "52%", y: "4%" },
  { icon: Video, label: "Zoom", x: "62%", y: "44%" },
  { icon: Video, label: "Google Meet", x: "4%", y: "52%" },
  { icon: Globe, label: "Your domain", x: "34%", y: "78%" },
  { icon: Smartphone, label: "Any device", x: "70%", y: "82%" },
];

/** "Built for academies in Bangladesh": checklist beside floating chips of the tools academies use. */
export function AboutBuiltFor() {
  const reduce = useReducedMotion();
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-14 px-4 py-24 sm:px-6 lg:grid-cols-2">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, ease: EASE_OUT }}>
        <span className="inline-flex rounded-full bg-brand-orange-light px-4 py-1.5 body-sm-medium text-brand-orange">Made for local academies</span>
        <h2 className="heading-h2-bold mt-5 text-primary-500">Built for the way academies in Bangladesh work</h2>
        <ul className="mt-7 space-y-3.5">
          {POINTS.map((p, i) => (
            <motion.li key={p} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: 0.15 + i * 0.07 }} className="flex items-start gap-3 body-l-regular text-primary-400">
              <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-bg">
                <Check className="h-3.5 w-3.5 text-green" />
              </span>
              {p}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <div className="relative h-96 overflow-hidden rounded-3xl border border-dash bg-gradient-to-br from-brand-orange-light via-white to-blue-14">
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-orange-20 blur-3xl" aria-hidden />
        {CHIPS.map(({ icon: Icon, label, x, y }, i) => (
          <motion.span
            key={label}
            className="absolute"
            style={{ left: x, top: y }}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 240, damping: 16, delay: 0.2 + i * 0.1 }}
          >
            <motion.span
              animate={reduce ? undefined : { y: [0, i % 2 ? 8 : -8, 0] }}
              transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-2xl border border-white bg-white/90 px-4 py-3 shadow-xl shadow-brand-orange/10 backdrop-blur"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-orange to-brand-orange-hover text-white">
                <Icon className="h-4 w-4" />
              </span>
              <span className="body-sm-medium text-primary-500">{label}</span>
            </motion.span>
          </motion.span>
        ))}
      </div>
    </section>
  );
}

export default AboutBuiltFor;
