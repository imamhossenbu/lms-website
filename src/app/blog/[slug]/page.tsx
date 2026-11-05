import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPost } from "@/lib/blog";
import { Markdown, extractHeadings } from "@/lib/markdown";
import { ArticleCtaCard } from "@/components/blog/ArticleCtaCard";
import { ArticleHeader } from "@/components/blog/ArticleHeader";
import { ArticleToc } from "@/components/blog/ArticleToc";
import { AuthorBox } from "@/components/blog/AuthorBox";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { FinalCta } from "@/components/home/FinalCta";
import { SectionHeading } from "@/components/shared/SectionHeading";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = await getBlogPost((await params).slug).catch(() => null);
  if (!post) return { title: "Article not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { type: "article", title: post.title, description: post.excerpt, publishedTime: post.publishedAt, authors: [post.authorName] },
  };
}

/** /blog/[slug] — article header + cover, the Markdown body beside a sticky sidebar (contents, share, CTA), tags + author, related posts. */
export default async function BlogPostPage({ params }: Params) {
  const post = await getBlogPost((await params).slug);
  if (!post) notFound();
  const headings = extractHeadings(post.content);

  return (
    <>
      <ArticleHeader post={post} />
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12">
        <article className="min-w-0 lg:col-span-8">
          <Markdown source={post.content} />
          <AuthorBox post={post} />
        </article>
        <aside className="lg:col-span-4">
          <div className="space-y-5 lg:sticky lg:top-24">
            <ArticleToc headings={headings} />
            <ShareButtons title={post.title} />
            <ArticleCtaCard />
          </div>
        </aside>
      </div>
      {post.related.length > 0 && (
        <section className="bg-brand-orange-soft">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
            <SectionHeading eyebrow="Keep reading" title="More from the blog" highlight="the blog" />
            <div className="mt-12">
              <BlogGrid posts={post.related} />
            </div>
          </div>
        </section>
      )}
      <FinalCta />
    </>
  );
}
