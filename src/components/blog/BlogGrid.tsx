"use client";

import React from "react";
import { AnimatePresence } from "framer-motion";
import type { BlogCard as Card } from "@/lib/blog";
import { BlogCard } from "./BlogCard";

/** The post cards; filtering animates cards in and out. */
export function BlogGrid({ posts }: { posts: Card[] }) {
  return (
    <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence mode="popLayout">
        {posts.map((p, i) => (
          <BlogCard key={p.id} post={p} index={i} />
        ))}
      </AnimatePresence>
    </div>
  );
}

export default BlogGrid;
