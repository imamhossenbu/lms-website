"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { List } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Heading } from "@/lib/markdown";

/** "On this page": the article's headings; the one being read is marked by a sliding orange bar. */
export function ArticleToc({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState(headings[0]?.id ?? "");

  useEffect(() => {
    // The current heading = the last one whose top has passed 30% of the viewport.
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.3;
      let current = headings[0]?.id ?? "";
      for (const h of headings) {
        const el = document.getElementById(h.id);
        if (el && el.getBoundingClientRect().top <= line) current = h.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [headings]);

  if (!headings.length) return null;
  return (
    <nav aria-label="On this page" className="rounded-2xl border border-dash bg-white p-5">
      <p className="flex items-center gap-2 body-xsm-medium font-semibold uppercase tracking-wide text-primary-400">
        <List className="h-4 w-4" />
        On this page
      </p>
      <ul className="relative mt-4 space-y-1 border-l border-dash">
        {headings.map((h) => {
          const on = h.id === active;
          return (
            <li key={h.id} className="relative">
              {on && <motion.span layoutId="toc-bar" className="absolute -left-px top-0 h-full w-0.5 bg-brand-orange" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
              <a
                href={`#${h.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                  window.history.replaceState(null, "", `#${h.id}`);
                  setActive(h.id);
                }}
                className={cn("block py-1.5 pr-2 body-sm-regular transition-colors", h.level === 3 ? "pl-7" : "pl-4", on ? "font-medium text-brand-orange" : "text-primary-400 hover:text-primary-500")}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default ArticleToc;
