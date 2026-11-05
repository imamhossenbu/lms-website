import React from "react";
import Image from "next/image";
import { BookOpen, CreditCard, GraduationCap, Megaphone, Newspaper, Sparkles, Video, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

const GRADIENTS = [
  "from-brand-orange to-yellow",
  "from-blue to-purple",
  "from-green to-blue",
  "from-purple to-red",
  "from-red to-brand-orange",
  "from-yellow to-green",
];
const ICONS: Record<string, LucideIcon> = {
  guides: BookOpen,
  teaching: GraduationCap,
  product: Sparkles,
  "product updates": Megaphone,
  payments: CreditCard,
  "live classes": Video,
};
/** Fixed colours for the usual categories; anything else picks one from its name. */
const CATEGORY_GRADIENT: Record<string, string> = {
  "live classes": "from-blue to-purple",
  teaching: "from-green to-blue",
  payments: "from-yellow to-brand-orange",
  guides: "from-brand-orange to-red",
  product: "from-purple to-red",
  "product updates": "from-purple to-blue",
};
const hash = (s: string) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);

/**
 * A post's cover: its image when it has one, otherwise a branded cover (gradient picked from the category, dot
 * grain, category icon) so every card looks finished.
 */
export function BlogCover({ coverUrl, title, category, sizes, priority, className }: { coverUrl: string; title: string; category: string; sizes: string; priority?: boolean; className?: string }) {
  if (coverUrl)
    return (
      <span className={cn("relative block overflow-hidden bg-gray-bg", className)}>
        <Image src={coverUrl} alt={title} fill sizes={sizes} priority={priority} className="object-cover transition-transform duration-700 group-hover:scale-105" />
      </span>
    );
  const Icon = ICONS[category.toLowerCase()] ?? Newspaper;
  return (
    <span className={cn("relative flex items-center justify-center overflow-hidden bg-gradient-to-br", CATEGORY_GRADIENT[category.toLowerCase()] ?? GRADIENTS[hash(category) % GRADIENTS.length], className)} aria-hidden>
      <svg className="absolute inset-0 h-full w-full text-white opacity-20">
        <defs>
          <pattern id={`dots-${hash(title)}`} width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.3" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#dots-${hash(title)})`} />
      </svg>
      <span className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white/15" />
      <span className="absolute -left-8 -top-8 h-28 w-28 rounded-full bg-white/10" />
      <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-white shadow-lg backdrop-blur transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
        <Icon className="h-8 w-8" />
      </span>
    </span>
  );
}

export default BlogCover;
