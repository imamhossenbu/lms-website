import type { MetadataRoute } from "next";
import { API_URL, SITE_URL } from "@/lib/site";
import type { BlogList } from "@/lib/blog";

export const revalidate = 3600;

const PAGES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/features", priority: 0.9, changeFrequency: "monthly" },
  { path: "/pricing", priority: 0.9, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.8, changeFrequency: "daily" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  { path: "/refund-policy", priority: 0.3, changeFrequency: "yearly" },
];

/** Every published post (all pages of the public blog API, plus the featured one). Empty if the API is down. */
async function blogPosts(): Promise<{ slug: string; publishedAt: string }[]> {
  const out: { slug: string; publishedAt: string }[] = [];
  try {
    for (let page = 1; page <= 40; page++) {
      const res = await fetch(`${API_URL}/saas/public/blog?limit=24&page=${page}`, { next: { revalidate: 3600 } });
      if (!res.ok) break;
      const body = (await res.json()) as BlogList;
      if (page === 1 && body.featured) out.push(body.featured);
      out.push(...body.data);
      if (page >= body.meta.totalPages) break;
    }
  } catch {
    /* sitemap still lists the static pages */
  }
  return out;
}

/** /sitemap.xml — static pages and every published blog article. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const posts = await blogPosts();
  return [
    ...PAGES.map((p) => ({ url: `${SITE_URL}${p.path}`, lastModified: now, changeFrequency: p.changeFrequency, priority: p.priority })),
    ...posts.map((p) => ({ url: `${SITE_URL}/blog/${p.slug}`, lastModified: new Date(p.publishedAt), changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
