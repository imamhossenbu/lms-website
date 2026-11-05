import React from "react";
import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { cn } from "@/lib/cn";

interface LogoProps {
  /** "light" for dark backgrounds. */
  tone?: "dark" | "light";
  size?: "sm" | "md";
  /** Render without the home link (e.g. inside an illustration). */
  asLink?: boolean;
  className?: string;
}

/** EduPro mark (orange gradient tile + cap) and wordmark. */
export function Logo({ tone = "dark", size = "md", asLink = true, className }: LogoProps) {
  const tile = size === "sm" ? "h-7 w-7 rounded-lg" : "h-10 w-10 rounded-xl";
  const icon = size === "sm" ? "h-4 w-4" : "h-5 w-5";
  const word = size === "sm" ? "body-l-medium font-bold" : "heading-h4-semibold font-bold";
  const content = (
    <>
      <span className={cn("flex items-center justify-center bg-gradient-to-br from-brand-orange to-brand-orange-hover text-white shadow-md shadow-brand-orange/30", tile)}>
        <GraduationCap className={icon} />
      </span>
      <span className={cn(word, "tracking-tight", tone === "light" ? "text-white" : "text-primary-500")}>
        Edu<span className="text-brand-orange">Pro</span>
      </span>
    </>
  );
  const cls = cn("inline-flex items-center gap-2.5 shrink-0", className);
  return asLink ? (
    <Link href="/" className={cls} aria-label="EduPro home">
      {content}
    </Link>
  ) : (
    <span className={cls}>{content}</span>
  );
}

export default Logo;
