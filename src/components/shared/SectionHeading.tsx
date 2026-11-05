import React from "react";
import { cn } from "@/lib/cn";

/** Eyebrow + title + subtitle used at the top of each section. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" ? "mx-auto text-center" : "text-left", className)}>
      {eyebrow && <span className="body-sm-medium text-brand-orange">{eyebrow}</span>}
      <h2 className="heading-h2-bold text-primary-500 mt-2">{title}</h2>
      {subtitle && <p className="body-l-medium text-primary-300 mt-3">{subtitle}</p>}
    </div>
  );
}
