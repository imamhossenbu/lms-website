"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { NAV_LINKS } from "@/lib/site";
import { FeaturesMenu } from "./FeaturesMenu";

/**
 * Centre navigation, editorial style: each item carries a small orange index number, and an orange line runs
 * along the header's bottom edge under the hovered item (or the current page). "Features" opens the mega menu
 * (hover, click or keyboard; Esc / outside click closes it).
 */
export function DesktopNav() {
  const pathname = usePathname();
  const [hover, setHover] = useState<string | null>(null);
  const [menu, setMenu] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  const openMenu = () => {
    window.clearTimeout(closeTimer.current);
    setMenu(true);
  };
  const closeMenuSoon = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMenu(false), 120);
  };

  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    const onDown = (e: MouseEvent) => !wrapRef.current?.contains(e.target as Node) && setMenu(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onDown);
    };
  }, [menu]);

  const activeHref = NAV_LINKS.find((l) => (l.mega ? pathname.startsWith("/features") : !l.href.includes("#") && pathname === l.href))?.href ?? null;
  const lineAt = hover ?? activeHref;

  return (
    <div ref={wrapRef} className="relative hidden h-full lg:block" onMouseLeave={() => setHover(null)}>
      <nav className="flex h-full items-stretch" aria-label="Main">
        {NAV_LINKS.map((l, i) => {
          const on = lineAt === l.href;
          const cls = cn("group relative flex h-full items-center gap-1.5 px-4 body-sm-medium transition-colors", on ? "text-brand-orange" : "text-primary-500 hover:text-brand-orange");
          const body = (
            <>
              <span className="body-2xsm-regular -mt-2 font-semibold text-brand-orange opacity-60 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <span>{l.label}</span>
              {l.mega && (
                <motion.span animate={{ rotate: menu ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="h-3.5 w-3.5" />
                </motion.span>
              )}
              {on && <motion.span layoutId="nav-line" className="absolute inset-x-3 -bottom-px h-0.5 bg-brand-orange" transition={{ type: "spring", stiffness: 420, damping: 36 }} />}
            </>
          );

          if (l.mega)
            return (
              <div key={l.href} className="h-full" onMouseEnter={() => { setHover(l.href); openMenu(); }} onMouseLeave={closeMenuSoon}>
                <button type="button" onClick={() => setMenu((v) => !v)} aria-expanded={menu} aria-haspopup="menu" className={cls}>
                  {body}
                </button>
              </div>
            );
          return (
            <Link key={l.href} href={l.href} onMouseEnter={() => setHover(l.href)} className={cls} aria-current={activeHref === l.href ? "page" : undefined}>
              {body}
            </Link>
          );
        })}
      </nav>

      <AnimatePresence>
        {menu && (
          <div key="features-menu" className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2" onMouseEnter={openMenu} onMouseLeave={closeMenuSoon}>
            <FeaturesMenu onNavigate={() => setMenu(false)} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default DesktopNav;
