"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { formatPostDate, type BlogCard as Card } from "@/lib/blog";
import { ToneBadge } from "@/components/ui/ToneBadge";
import { BlogCover } from "./BlogCover";
import { AuthorChip } from "./AuthorChip";

/** A post in the /blog grid: cover, category, title, summary, author, date and reading time. Rises in, lifts on hover. */
export function BlogCard({ post, index }: { post: Card; index: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.08 }}
      whileHover={{ y: -6 }}
      className="h-full"
    >
      <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col overflow-hidden rounded-3xl border border-dash bg-white shadow-xs transition-shadow duration-300 hover:shadow-2xl hover:shadow-brand-orange/10">
        <BlogCover coverUrl={post.coverUrl} title={post.title} category={post.category} sizes="(min-width: 1024px) 400px, 100vw" className="aspect-video" />
        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center justify-between gap-3">
            <ToneBadge tone="orange" size="sm" variant="pill">
              {post.category}
            </ToneBadge>
            <span className="inline-flex items-center gap-1 whitespace-nowrap body-xsm-regular text-primary-300">
              <Clock className="h-3.5 w-3.5" />
              {post.readMinutes} min read
            </span>
          </div>
          <h3 className="heading-h5 mt-4 line-clamp-2 text-primary-500 transition-colors group-hover:text-brand-orange">{post.title}</h3>
          <p className="mt-2 line-clamp-3 flex-1 body-regular text-primary-300">{post.excerpt}</p>
          <div className="mt-6 flex items-center justify-between gap-3 border-t border-dash pt-4">
            <AuthorChip name={post.authorName} avatarUrl={post.authorAvatarUrl} sub={formatPostDate(post.publishedAt)} />
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-dash text-primary-400 transition-all duration-300 group-hover:rotate-45 group-hover:border-brand-orange group-hover:bg-brand-orange group-hover:text-white">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default BlogCard;
