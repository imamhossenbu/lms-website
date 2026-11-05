import React from "react";
import { Tag } from "lucide-react";
import type { BlogPost } from "@/lib/blog";
import { ToneBadge } from "@/components/ui/ToneBadge";
import { AuthorChip } from "./AuthorChip";

/** Under the article: its tags and a "written by" card. */
export function AuthorBox({ post }: { post: BlogPost }) {
  return (
    <div className="mt-14 space-y-6 border-t border-dash pt-8">
      {post.tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <Tag className="h-4 w-4 text-primary-300" />
          {post.tags.map((t) => (
            <ToneBadge key={t} tone="gray" size="sm" variant="pill">
              {t}
            </ToneBadge>
          ))}
        </div>
      )}
      <div className="flex items-center gap-4 rounded-2xl border border-dash bg-brand-orange-soft p-5">
        <AuthorChip size="md" name={post.authorName} avatarUrl={post.authorAvatarUrl} sub={post.authorRole || "Writes for the EduPro blog"} />
      </div>
    </div>
  );
}

export default AuthorBox;
