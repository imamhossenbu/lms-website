import { ImageResponse } from "next/og";
import { getBlogPost } from "@/lib/blog";
import { OG_SIZE, OgCard } from "@/lib/og";

export const alt = "EduPro blog article";
export const size = OG_SIZE;
export const contentType = "image/png";

/** Share image for an article: its category and title on the branded card. */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const post = await getBlogPost((await params).slug).catch(() => null);
  return new ImageResponse(<OgCard eyebrow={post ? `Blog · ${post.category}` : "EduPro blog"} title={post?.title ?? "Ideas for teaching and growing online"} footer={post ? `${post.readMinutes} min read · by ${post.authorName}` : undefined} />, size);
}
