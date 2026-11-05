"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, BookOpen, CircleDollarSign, MessageCircle } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Waves } from "@/components/shared/Waves";

const LINKS = [
  { href: "/features", icon: BookOpen, label: "Features" },
  { href: "/pricing", icon: CircleDollarSign, label: "Pricing" },
  { href: "/contact", icon: MessageCircle, label: "Contact us" },
];

/** 404: floating "404" with a bobbing graduation-cap dot, a short note, home button and the main pages. */
export default function NotFound() {
  const reduce = useReducedMotion();
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-brand-orange-soft via-white to-white">
      <div className="absolute left-1/2 top-10 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-brand-orange-20 blur-3xl" aria-hidden />
      <Waves className="opacity-60" />
      <div className="mx-auto flex max-w-xl flex-col items-center px-4 pb-36 pt-24 text-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 14 }}
          className="heading-display-h1 text-brand-orange"
        >
          <motion.span className="inline-block" animate={reduce ? undefined : { y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
            404
          </motion.span>
        </motion.span>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
          <h1 className="heading-h3 mt-3 text-primary-500">This page doesn&apos;t exist</h1>
          <p className="body-regular mt-2 text-primary-300">The link may be old, or the page has moved. Here are some places to start instead.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.35 }} className="mt-8">
          <ButtonLink href="/" size="lg">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </ButtonLink>
        </motion.div>
        <ul className="mt-8 flex flex-wrap justify-center gap-3">
          {LINKS.map(({ href, icon: Icon, label }, i) => (
            <motion.li key={href} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.5 + i * 0.08 }}>
              <ButtonLink href={href} variant="secondary">
                <Icon className="h-4 w-4 text-brand-orange" />
                {label}
              </ButtonLink>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
