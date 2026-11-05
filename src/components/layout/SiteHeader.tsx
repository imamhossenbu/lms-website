"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { NAV_LINKS, loginUrl, signupUrl } from "@/lib/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Logo } from "./Logo";

/** Sticky header: logo, nav (animated active pill), Sign in + Start free trial; a slide-down menu on mobile. */
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cn("sticky top-0 z-40 border-b border-dash bg-white/95 backdrop-blur transition-shadow", (scrolled || open) && "shadow-sm")}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />

        <nav className="hidden md:flex items-center gap-2" aria-label="Main">
          {NAV_LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link key={l.href} href={l.href} className={cn("relative rounded-full px-5 py-2.5 body-l-medium transition-colors", active ? "text-brand-orange" : "text-primary-500 hover:text-brand-orange")}>
                {active && <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-brand-orange-light" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                <span className="relative">{l.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <ButtonLink href={loginUrl()} variant="ghost" size="lg" className="text-primary-500">
            Sign in
          </ButtonLink>
          <ButtonLink href={signupUrl()} size="lg" icon={<ArrowRight className="h-4 w-4" />}>
            Start free trial
          </ButtonLink>
        </div>

        <motion.button
          type="button"
          whileTap={{ scale: 0.92 }}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-dash bg-white text-primary-500"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </motion.button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-dash bg-white"
            aria-label="Mobile"
          >
            <div className="space-y-1 px-4 py-4">
              {NAV_LINKS.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className={cn("block rounded-lg px-3 py-2.5 body-medium", pathname === l.href ? "bg-brand-orange-light text-brand-orange" : "text-primary-500")}>
                  {l.label}
                </Link>
              ))}
              <div className="grid grid-cols-2 gap-2 pt-3">
                <ButtonLink href={loginUrl()} variant="secondary">
                  Sign in
                </ButtonLink>
                <ButtonLink href={signupUrl()}>Start free trial</ButtonLink>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

export default SiteHeader;
