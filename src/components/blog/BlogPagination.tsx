import React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

/** Numbered pages for /blog; keeps the current ?category / ?q in every link. */
export function BlogPagination({ page, totalPages, query }: { page: number; totalPages: number; query: { q?: string; category?: string } }) {
  if (totalPages <= 1) return null;
  const href = (p: number) => {
    const sp = new URLSearchParams();
    if (query.category) sp.set("category", query.category);
    if (query.q) sp.set("q", query.q);
    if (p > 1) sp.set("page", String(p));
    return `/blog${sp.size ? `?${sp}` : ""}`;
  };
  const btn = "flex h-10 min-w-10 items-center justify-center rounded-xl border px-3 body-sm-medium transition-colors";
  return (
    <nav className="mt-14 flex items-center justify-center gap-2" aria-label="Pages">
      {page > 1 ? (
        <Link href={href(page - 1)} className={cn(btn, "border-dash bg-white text-primary-500 hover:border-brand-orange hover:text-brand-orange")} aria-label="Previous page">
          <ChevronLeft className="h-4 w-4" />
        </Link>
      ) : (
        <span className={cn(btn, "border-dash bg-white text-primary-300 opacity-50")} aria-hidden>
          <ChevronLeft className="h-4 w-4" />
        </span>
      )}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <Link
          key={p}
          href={href(p)}
          aria-current={p === page ? "page" : undefined}
          className={cn(btn, p === page ? "border-brand-orange bg-brand-orange text-white shadow-md shadow-brand-orange/30" : "border-dash bg-white text-primary-500 hover:border-brand-orange hover:text-brand-orange")}
        >
          {p}
        </Link>
      ))}
      {page < totalPages ? (
        <Link href={href(page + 1)} className={cn(btn, "border-dash bg-white text-primary-500 hover:border-brand-orange hover:text-brand-orange")} aria-label="Next page">
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <span className={cn(btn, "border-dash bg-white text-primary-300 opacity-50")} aria-hidden>
          <ChevronRight className="h-4 w-4" />
        </span>
      )}
    </nav>
  );
}

export default BlogPagination;
