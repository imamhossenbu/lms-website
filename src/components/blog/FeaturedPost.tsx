"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Star } from "lucide-react";
import { formatPostDate, type BlogCard } from "@/lib/blog";
import { ToneBadge } from "@/components/ui/ToneBadge";
import { EASE_OUT } from "@/components/motion/presets";
import { BlogCover } from "./BlogCover";
import { AuthorChip } from "./AuthorChip";

/** The featured post as a wide card at the top of /blog: big cover on one side, story on the other. */
export function FeaturedPost({ post }: { post: BlogCard }) {
  return (
    <motion.article initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.3 }}>
      <Link
        href={`/blog/${post.slug}`}
        className="group grid overflow-hidden rounded-3xl border border-dash bg-white shadow-xl shadow-brand-orange/5 transition-shadow duration-300 hover:shadow-2xl hover:shadow-brand-orange/15 lg:grid-cols-2"
      >
        <BlogCover coverUrl={post.coverUrl} title={post.title} category={post.category} sizes="(min-width: 1024px) 640px, 100vw" priority className="aspect-video lg:aspect-auto lg:h-full lg:min-h-80" />
        <div className="flex flex-col justify-center p-7 sm:p-10">
          <div className="flex flex-wrap items-center gap-2">
            <ToneBadge tone="orange" size="sm" variant="pill" icon={<Star className="h-3 w-3 fill-current" />}>
              Featured
            </ToneBadge>
            <ToneBadge tone="gray" size="sm" variant="pill">
              {post.category}
            </ToneBadge>
          </div>
          <h2 className="heading-h2-bold mt-5 text-primary-500 transition-colors group-hover:text-brand-orange">{post.title}</h2>
          <p className="mt-3 line-clamp-3 body-l-regular text-primary-300">{post.excerpt}</p>
          <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
            <AuthorChip
              size="md"
              name={post.authorName}
              avatarUrl={post.authorAvatarUrl}
              sub={
                <span className="inline-flex items-center gap-1.5">
                  {formatPostDate(post.publishedAt)} · <Clock className="h-3.5 w-3.5" /> {post.readMinutes} min read
                </span>
              }
            />
            <span className="inline-flex items-center gap-2 body-sm-medium text-brand-orange">
              Read article
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default FeaturedPost;
