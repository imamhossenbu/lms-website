"use client";

import React from "react";
import { motion } from "framer-motion";
import { FOOTER_COLUMNS, SOCIAL_LINKS } from "@/lib/footer";
import { Waves } from "@/components/shared/Waves";
import { EASE_OUT } from "@/components/motion/presets";
import { Logo } from "./Logo";
import { FooterColumn } from "./footer/FooterColumn";
import { SocialIcon } from "./footer/SocialIcon";
import { BackToTop } from "./footer/BackToTop";

const SOCIAL_BTN =
  "flex h-11 w-11 items-center justify-center rounded-xl border border-dash bg-white text-primary-500 shadow-xs transition-colors";

/**
 * Light footer: logo + blurb + social buttons, a divider, four link columns (Product, Company, Resources, Legal),
 * then copyright and "Back to top". Soft orange waves along the bottom.
 */
export function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden bg-gradient-to-b from-brand-orange-light via-white to-brand-orange-light">
      <Waves className="bottom-auto top-0 rotate-180 opacity-60" />
      <Waves />
      <div className="mx-auto max-w-7xl px-4 pb-40 pt-20 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-12">
          <motion.div
            className="lg:col-span-4 lg:border-r lg:border-dash lg:pr-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
          >
            <Logo />
            <p className="mt-5 max-w-xs body-l-regular text-primary-400">A complete platform to create, teach, manage and grow your online academy.</p>
            <ul className="mt-7 flex gap-3">
              {SOCIAL_LINKS.map((s) => (
                <li key={s.network}>
                  {s.href ? (
                    <motion.a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.92 }}
                      className={`${SOCIAL_BTN} hover:border-brand-orange hover:text-brand-orange`}
                      aria-label={`EduPro on ${s.label}`}
                    >
                      <SocialIcon network={s.network} className="h-5 w-5" />
                    </motion.a>
                  ) : (
                    <span className={`${SOCIAL_BTN} cursor-default`} title={`${s.label} page coming soon`} aria-label={`${s.label} (coming soon)`}>
                      <SocialIcon network={s.network} className="h-5 w-5" />
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 lg:col-span-8 lg:pl-4">
            {FOOTER_COLUMNS.map((c, i) => (
              <FooterColumn key={c.title} title={c.title} links={c.links} index={i} />
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-dash pt-7 sm:flex-row sm:items-center">
          <p className="body-regular text-primary-400">© {new Date().getFullYear()} EduPro. All rights reserved.</p>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
