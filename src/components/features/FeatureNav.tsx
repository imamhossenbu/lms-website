"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { FEATURES } from "@/lib/content";

/** Short chip labels (the full titles don't fit on one row). */
const SHORT: Record<string, string> = {
  courses: "Courses",
  live: "Live classes",
  assessments: "Quizzes",
  certificates: "Certificates",
  payments: "Payments",
  community: "Community",
  analytics: "Analytics",
  team: "Team & roles",
};

/**
 * Sticky bar of feature chips under the header. Highlights the section in view (animated pill), scrolls smoothly
 * to a section on click and keeps the URL hash in sync, so a reload lands on the same feature.
 */
export function FeatureNav() {
  const [active, setActive] = useState(FEATURES[0].id);

  useEffect(() => {
    const sections = FEATURES.map((f) => document.getElementById(f.id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
    setActive(id);
  };

  return (
    <nav aria-label="Features" className="sticky top-20 z-30 border-b border-dash bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:justify-center">
        {FEATURES.map(({ id, icon: Icon, title }) => {
          const on = id === active;
          return (
            <motion.a
              key={id}
              href={`#${id}`}
              onClick={go(id)}
              whileTap={{ scale: 0.95 }}
              aria-current={on ? "true" : undefined}
              className={cn("relative inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 body-sm-medium transition-colors", on ? "text-white" : "text-primary-400 hover:text-brand-orange")}
            >
              {on && <motion.span layoutId="feature-nav-pill" className="absolute inset-0 rounded-full bg-brand-orange shadow-md shadow-brand-orange/30" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
              <Icon className="relative h-4 w-4" />
              <span className="relative">{SHORT[id] ?? title}</span>
            </motion.a>
          );
        })}
      </div>
    </nav>
  );
}

export default FeatureNav;
