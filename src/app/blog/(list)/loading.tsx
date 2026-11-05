import React from "react";
import { BlogListSkeleton } from "@/components/blog/BlogListSkeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <div className="mx-auto mb-14 flex max-w-2xl animate-pulse flex-col items-center gap-4">
        <span className="h-8 w-24 rounded-full bg-slate-200" />
        <span className="h-12 w-full rounded bg-slate-200" />
        <span className="h-4 w-3/4 rounded bg-slate-100" />
      </div>
      <BlogListSkeleton />
    </div>
  );
}
