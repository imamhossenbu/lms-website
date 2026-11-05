import { API_URL, HAS_API } from "./site";

/** A published post as listed on /blog (no body). Managed in the Owner Console › Blog. */
export interface BlogCard {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverUrl: string;
  category: string;
  tags: string[];
  authorName: string;
  authorRole: string;
  authorAvatarUrl: string;
  readMinutes: number;
  featured: boolean;
  publishedAt: string;
}

export interface BlogPost extends BlogCard {
  content: string;
  updatedAt: string;
  related: BlogCard[];
}

export interface BlogList {
  data: BlogCard[];
  meta: { page: number; limit: number; total: number; totalPages: number };
  featured: BlogCard | null;
  categories: { name: string; count: number }[];
}

export interface BlogQuery {
  q?: string;
  category?: string;
  page?: number;
}

const EMPTY: BlogList = { data: [], meta: { page: 1, limit: 9, total: 0, totalPages: 1 }, featured: null, categories: [] };

/** Server-side; refreshed every minute. `null` when the API can't be reached (the page shows an error state). */
export async function getBlogPosts(query: BlogQuery): Promise<BlogList | null> {
  const qs = new URLSearchParams();
  if (query.q) qs.set("q", query.q);
  if (query.category) qs.set("category", query.category);
  if (query.page && query.page > 1) qs.set("page", String(query.page));
  if (!HAS_API) return EMPTY;
  try {
    const res = await fetch(`${API_URL}/saas/public/blog${qs.size ? `?${qs}` : ""}`, { next: { revalidate: 60 } });
    if (res.status === 400) return EMPTY;
    if (!res.ok) return null;
    return (await res.json()) as BlogList;
  } catch {
    return null;
  }
}

/** One published post, or `null` when it doesn't exist / isn't published. Throws when the API is down. */
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  if (!HAS_API) return null;
  const res = await fetch(`${API_URL}/saas/public/blog/${encodeURIComponent(slug)}`, { next: { revalidate: 60 } });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Blog API responded ${res.status}`);
  return (await res.json()) as BlogPost;
}

export const formatPostDate = (iso: string) => new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
