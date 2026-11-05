"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { FooterLink } from "@/lib/footer";
import { ToneBadge } from "@/components/ui/ToneBadge";
import { EASE_OUT } from "@/components/motion/presets";

/** One footer column: heading + links (a link without `href` shows as muted text with a "Soon" badge). */
export function FooterColumn({ title, links, index }: { title: string; links: FooterLink[]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.1 + index * 0.08 }}
    >
      <h3 className="heading-h6-bold text-primary-500">{title}</h3>
      <ul className="mt-5 space-y-3.5">
        {links.map((l) => (
          <li key={l.label}>
            {l.href ? (
              <Link href={l.href} className="group inline-flex items-center whitespace-nowrap body-regular text-primary-400 transition-colors hover:text-brand-orange">
                <span className="relative">
                  {l.label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-brand-orange transition-all duration-300 group-hover:w-full" aria-hidden />
                </span>
              </Link>
            ) : (
              <span className="inline-flex items-center gap-2 whitespace-nowrap body-regular text-primary-300">
                {l.label}
                <ToneBadge tone="gray" size="sm" variant="pill">
                  Soon
                </ToneBadge>
              </span>
            )}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default FooterColumn;
