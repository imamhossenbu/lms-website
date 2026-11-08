import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Newspaper } from "lucide-react";
import { getBlogPosts } from "@/lib/blog";
import { BlogEmpty } from "@/components/blog/BlogEmpty";
import { BlogFilters, BlogFiltersSkeleton } from "@/components/blog/BlogFilters";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { BlogPagination } from "@/components/blog/BlogPagination";
import { FeaturedPost } from "@/components/blog/FeaturedPost";
import { FinalCta } from "@/components/home/FinalCta";
import { PageHero } from "@/components/shared/PageHero";

export const metadata: Metadata = {
  title: "Blog",
  description: "Guides and ideas for teaching online, running live classes, assessing students and growing your academy with EduPro.",
};

type Search = { q?: string; category?: string; page?: string };

/** /blog — hero, featured post, category chips + search (in the URL), the post grid with pages, CTA. */
export default async function BlogPage({ searchParams }: { searchParams: Promise<Search> }) {
  const sp = await searchParams;
  const query = { q: sp.q?.slice(0, 100) || undefined, category: sp.category?.slice(0, 40) || undefined, page: Math.max(1, Number(sp.page) || 1) };
  const list = await getBlogPosts(query);
  const filtered = !!(query.q || query.category);
  const nothing = list && !list.featured && list.data.length === 0;

  return (
    <>
      <PageHero
        eyebrow="Blog"
        eyebrowIcon={<Newspaper className="h-4 w-4" />}
        title="Ideas for teaching and growing online"
        highlight="growing online"
        subtitle="Practical guides on courses, live classes, assessments and payments — written for schools, coaching centres and training institutes."
      />
      <section className="mx-auto max-w-7xl px-4 pb-24 pt-14 sm:px-6">
        {!list ? (
          <BlogEmpty kind="error" />
        ) : nothing && !filtered ? (
          <BlogEmpty kind="none" />
        ) : (
          <>
            {list.featured && <FeaturedPost post={list.featured} />}
            <div className="mt-12">
              <Suspense fallback={<BlogFiltersSkeleton />}>
                <BlogFilters categories={list.categories} />
              </Suspense>
            </div>
            <div className="mt-8">{list.data.length ? <BlogGrid posts={list.data} /> : <BlogEmpty kind="noResults" />}</div>
            <BlogPagination page={list.meta.page} totalPages={list.meta.totalPages} query={query} />
          </>
        )}
      </section>
      <FinalCta />
    </>
  );
}
