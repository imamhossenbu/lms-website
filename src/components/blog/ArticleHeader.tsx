"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CalendarDays, Clock } from "lucide-react";
import { formatPostDate, type BlogPost } from "@/lib/blog";
import { ToneBadge } from "@/components/ui/ToneBadge";
import { EASE_OUT } from "@/components/motion/presets";
import { AuthorChip } from "./AuthorChip";
import { BlogCover } from "./BlogCover";

/** Article top: back link, category, title, summary, author / date / reading time, then the wide cover. */
export function ArticleHeader({ post }: { post: BlogPost }) {
  const item = (d: number) => ({ initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, ease: EASE_OUT, delay: d } });
  return (
    <header className="relative isolate overflow-hidden bg-gradient-to-b from-brand-orange-soft via-white to-white">
      <div className="absolute -left-32 -top-24 -z-10 h-96 w-96 rounded-full bg-brand-orange-20 blur-3xl" aria-hidden />
      <div className="mx-auto max-w-4xl px-4 pt-12 text-center sm:px-6">
        <motion.div {...item(0)}>
          <Link href="/blog" className="group inline-flex items-center gap-2 body-sm-medium text-primary-400 transition-colors hover:text-brand-orange">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            All articles
          </Link>
        </motion.div>
        <motion.div {...item(0.05)} className="mt-6 flex justify-center">
          <ToneBadge tone="orange" variant="pill">
            {post.category}
          </ToneBadge>
        </motion.div>
        <motion.h1 {...item(0.1)} className="heading-section mt-5 text-primary-500">
          {post.title}
        </motion.h1>
        <motion.p {...item(0.15)} className="mx-auto mt-4 max-w-2xl body-hero text-primary-300">
          {post.excerpt}
        </motion.p>
        <motion.div {...item(0.2)} className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <AuthorChip size="md" name={post.authorName} avatarUrl={post.authorAvatarUrl} sub={post.authorRole || "EduPro"} className="text-left" />
          <span className="hidden h-8 w-px bg-dash sm:block" aria-hidden />
          <span className="inline-flex items-center gap-1.5 body-sm-regular text-primary-400">
            <CalendarDays className="h-4 w-4 text-brand-orange" />
            <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
          </span>
          <span className="inline-flex items-center gap-1.5 body-sm-regular text-primary-400">
            <Clock className="h-4 w-4 text-brand-orange" />
            {post.readMinutes} min read
          </span>
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0, y: 30, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.25 }} className="mx-auto mt-12 max-w-6xl px-4 sm:px-6">
        <BlogCover coverUrl={post.coverUrl} title={post.title} category={post.category} sizes="(min-width: 1152px) 1152px, 100vw" priority className="aspect-21/9 rounded-3xl shadow-2xl shadow-brand-orange/10" />
      </motion.div>
    </header>
  );
}

export default ArticleHeader;
