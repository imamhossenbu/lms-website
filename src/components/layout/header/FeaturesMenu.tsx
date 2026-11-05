"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";
import { FEATURES } from "@/lib/content";
import { ToneIcon } from "@/components/shared/ToneIcon";

/**
 * Desktop mega menu under "Features": the eight features (icon, title, one line) in two columns, plus a promo card
 * linking to the full features page. Items fade in with a short stagger.
 */
export function FeaturesMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.98 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="w-3xl overflow-hidden rounded-3xl border border-dash bg-white shadow-2xl shadow-primary-500/10"
      role="menu"
    >
      <div className="grid grid-cols-12">
        <ul className="col-span-8 grid grid-cols-2 gap-1 p-3">
          {FEATURES.map((f, i) => (
            <motion.li key={f.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: 0.03 * i }}>
              <Link
                href={`/features#${f.id}`}
                onClick={onNavigate}
                role="menuitem"
                className="group flex items-start gap-3 rounded-2xl p-3 transition-colors hover:bg-brand-orange-soft"
              >
                <ToneIcon icon={f.icon} tone={f.tone} size="sm" className="transition-transform duration-200 group-hover:scale-110" />
                <span className="min-w-0">
                  <span className="body-sm-medium block text-primary-500 group-hover:text-brand-orange">{f.title}</span>
                  <span className="body-2xsm-regular mt-0.5 line-clamp-2 block text-primary-300">{f.summary}</span>
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
        <div className="col-span-4 flex flex-col justify-between bg-gradient-to-br from-brand-orange-light via-brand-orange-soft to-white p-5">
          <div>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-orange text-white shadow-md shadow-brand-orange/30">
              <PlayCircle className="h-5 w-5" />
            </span>
            <p className="heading-h6-bold mt-4 text-primary-500">See every feature in action</p>
            <p className="body-xsm-regular mt-1.5 text-primary-300">Real admin screens for courses, live classes, payments and more.</p>
          </div>
          <Link
            href="/features"
            onClick={onNavigate}
            role="menuitem"
            className="group mt-5 inline-flex items-center gap-1.5 body-sm-medium text-brand-orange"
          >
            Explore all features
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default FeaturesMenu;
