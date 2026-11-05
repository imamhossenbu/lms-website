"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { FEATURES } from "@/lib/content";
import { NAV_LINKS, loginUrl, signupUrl } from "@/lib/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ToneIcon } from "@/components/shared/ToneIcon";

/** Slide-down menu for small screens: links (Features expands to the feature list) and the two actions. */
export function MobileMenu({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();
  const [features, setFeatures] = useState(false);

  return (
    <motion.nav
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="overflow-hidden lg:hidden"
      aria-label="Mobile"
    >
      <div className="space-y-1 px-1 pb-4 pt-2">
        {NAV_LINKS.map((l, i) => (
          <motion.div key={l.href} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }}>
            {l.mega ? (
              <>
                <button
                  type="button"
                  onClick={() => setFeatures((v) => !v)}
                  aria-expanded={features}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 body-medium text-primary-500"
                >
                  {l.label}
                  <motion.span animate={{ rotate: features ? 180 : 0 }}>
                    <ChevronDown className="h-4 w-4" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {features && (
                    <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="grid grid-cols-2 gap-1 overflow-hidden px-2">
                      {FEATURES.map((f) => (
                        <li key={f.id}>
                          <Link href={`/features#${f.id}`} onClick={onClose} className="flex items-center gap-2 rounded-xl p-2 body-sm-medium text-primary-500 hover:bg-brand-orange-soft">
                            <ToneIcon icon={f.icon} tone={f.tone} size="sm" />
                            <span className="truncate">{f.title}</span>
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <Link
                href={l.href}
                onClick={onClose}
                className={cn("block rounded-xl px-3 py-2.5 body-medium", pathname === l.href ? "bg-brand-orange-light text-brand-orange" : "text-primary-500")}
              >
                {l.label}
              </Link>
            )}
          </motion.div>
        ))}
        <div className="grid grid-cols-2 gap-2 pt-3">
          <ButtonLink href={loginUrl()} variant="secondary">
            Sign in
          </ButtonLink>
          <ButtonLink href={signupUrl()}>Start free trial</ButtonLink>
        </div>
      </div>
    </motion.nav>
  );
}

export default MobileMenu;
