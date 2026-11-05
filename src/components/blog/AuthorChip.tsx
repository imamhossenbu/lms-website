import React from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { initials } from "@/lib/blog";

/** Author photo (or initials) + name, with an optional second line. */
export function AuthorChip({ name, avatarUrl, sub, size = "sm", className }: { name: string; avatarUrl: string; sub?: React.ReactNode; size?: "sm" | "md"; className?: string }) {
  const box = size === "md" ? "h-11 w-11" : "h-8 w-8";
  return (
    <span className={cn("flex min-w-0 items-center gap-2.5", className)}>
      {avatarUrl ? (
        <Image src={avatarUrl} alt={name} width={44} height={44} className={cn(box, "shrink-0 rounded-full object-cover ring-2 ring-white")} />
      ) : (
        <span className={cn(box, "flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-orange to-brand-orange-hover body-2xsm-regular font-semibold text-white ring-2 ring-white")}>{initials(name)}</span>
      )}
      <span className="min-w-0">
        <span className={cn("block truncate text-primary-500", size === "md" ? "body-medium" : "body-sm-medium")}>{name}</span>
        {sub && <span className="block truncate body-xsm-regular text-primary-300">{sub}</span>}
      </span>
    </span>
  );
}

export default AuthorChip;
