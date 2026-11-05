import React from "react";

/** One card's outline: cover, badge + time, two title lines, summary, author row. */
export function BlogCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl border border-dash bg-white">
      <div className="aspect-video bg-slate-100" />
      <div className="space-y-3 p-6">
        <div className="flex justify-between">
          <span className="h-5 w-20 rounded-full bg-slate-200" />
          <span className="h-4 w-16 rounded bg-slate-100" />
        </div>
        <span className="block h-5 w-11/12 rounded bg-slate-200" />
        <span className="block h-5 w-2/3 rounded bg-slate-200" />
        <span className="block h-3.5 w-full rounded bg-slate-100" />
        <span className="block h-3.5 w-4/5 rounded bg-slate-100" />
        <div className="flex items-center gap-2.5 border-t border-dash pt-4">
          <span className="h-8 w-8 rounded-full bg-slate-200" />
          <span className="space-y-1.5">
            <span className="block h-3 w-24 rounded bg-slate-200" />
            <span className="block h-2.5 w-16 rounded bg-slate-100" />
          </span>
        </div>
      </div>
    </div>
  );
}

/** /blog while it loads: featured post block, filter row and a grid of card outlines. */
export function BlogListSkeleton() {
  return (
    <div className="animate-pulse" aria-busy="true" aria-label="Loading articles">
      <div className="grid overflow-hidden rounded-3xl border border-dash bg-white lg:grid-cols-2">
        <div className="aspect-video bg-slate-100 lg:aspect-auto lg:min-h-80" />
        <div className="space-y-4 p-10">
          <span className="block h-6 w-28 rounded-full bg-slate-200" />
          <span className="block h-8 w-11/12 rounded bg-slate-200" />
          <span className="block h-8 w-2/3 rounded bg-slate-200" />
          <span className="block h-4 w-full rounded bg-slate-100" />
          <span className="block h-4 w-4/5 rounded bg-slate-100" />
          <div className="flex items-center gap-3 pt-3">
            <span className="h-11 w-11 rounded-full bg-slate-200" />
            <span className="h-4 w-40 rounded bg-slate-100" />
          </div>
        </div>
      </div>
      <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <BlogCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export default BlogListSkeleton;
