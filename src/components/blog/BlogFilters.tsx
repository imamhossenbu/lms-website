"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, Search, X } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Category chips (animated active pill) and a search box for /blog. Both live in the URL (?category=, ?q=) so a
 * reload or a shared link shows the same list; changing either goes back to page 1. Render inside <Suspense>.
 */
export function BlogFilters({ categories }: { categories: { name: string; count: number }[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const active = params.get("category") ?? "";
  const urlQ = params.get("q") ?? "";
  const [q, setQ] = useState(urlQ);
  const [pending, setPending] = useState(false);

  const push = (next: { category?: string; q?: string }) => {
    const sp = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(next)) {
      if (v) sp.set(k, v);
      else sp.delete(k);
    }
    sp.delete("page");
    router.replace(`${pathname}${sp.size ? `?${sp}` : ""}`, { scroll: false });
  };

  // Debounced search → URL.
  useEffect(() => {
    if (q.trim() === urlQ) return;
    const t = window.setTimeout(() => {
      setPending(false);
      push({ q: q.trim() });
    }, 350);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  const chips = [{ name: "", label: "All posts", count: categories.reduce((n, c) => n + c.count, 0) }, ...categories.map((c) => ({ name: c.name, label: c.name, count: c.count }))];

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      {/* Phones: one swipeable row. Wider screens: chips wrap so every category stays visible. */}
      <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto pb-1 md:flex-wrap md:overflow-visible" role="tablist" aria-label="Categories">
        {chips.map((c) => {
          const on = c.name === active;
          return (
            <motion.button
              key={c.name || "all"}
              type="button"
              role="tab"
              aria-selected={on}
              whileTap={{ scale: 0.95 }}
              onClick={() => push({ category: c.name })}
              className={cn("relative inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl border px-4 py-2 body-sm-medium transition-colors", on ? "border-transparent text-white" : "border-dash bg-white text-primary-400 hover:text-brand-orange")}
            >
              {on && <motion.span layoutId="blog-category" className="absolute inset-0 rounded-xl bg-brand-orange shadow-md shadow-brand-orange/30" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
              <span className="relative">{c.label}</span>
              <span className={cn("relative rounded-md px-1.5 body-2xsm-regular", on ? "bg-white/20 text-white" : "bg-gray-bg text-primary-300")}>{c.count}</span>
            </motion.button>
          );
        })}
      </div>
      <label className="relative block w-full shrink-0 md:w-72">
        <span className="sr-only">Search articles</span>
        {pending ? <Loader2 className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-brand-orange" /> : <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-primary-300" />}
        <input
          type="search"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setPending(true);
          }}
          maxLength={100}
          placeholder="Search articles…"
          className="h-11 w-full rounded-xl border border-dash bg-white pl-10 pr-10 body-sm-regular text-primary-500 outline-none transition-colors placeholder:text-primary-300 focus:border-brand-orange"
        />
        {q && (
          <button type="button" onClick={() => setQ("")} className="absolute right-2.5 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-primary-300 hover:bg-gray-bg hover:text-primary-500" aria-label="Clear search">
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </label>
    </div>
  );
}

/** Chips + search box outline while the URL loads. */
export function BlogFiltersSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-4 md:flex-row md:items-center md:justify-between" aria-busy="true">
      <div className="flex gap-2">
        {[24, 20, 28, 20].map((w, i) => (
          <span key={i} className="h-10 rounded-xl border border-dash bg-slate-100" style={{ width: `${w * 4}px` }} />
        ))}
      </div>
      <span className="h-11 w-full rounded-xl border border-dash bg-slate-100 md:w-72" />
    </div>
  );
}

export default BlogFilters;
