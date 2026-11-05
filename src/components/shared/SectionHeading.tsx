import React from "react";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  /** Small pill above the title. */
  eyebrow?: string;
  title: string;
  /** A word / phrase of `title` to colour orange (first match). */
  highlight?: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}

/** Pill eyebrow + large title (optional orange highlight) + intro line, used at the top of each section. */
export function SectionHeading({ eyebrow, title, highlight, subtitle, align = "center", className }: SectionHeadingProps) {
  const at = highlight ? title.indexOf(highlight) : -1;
  return (
    <div className={cn("max-w-3xl", align === "center" ? "mx-auto text-center" : "text-left", className)}>
      {eyebrow && <span className="inline-flex rounded-full bg-brand-orange-light px-4 py-1.5 body-sm-medium text-brand-orange whitespace-nowrap">{eyebrow}</span>}
      <h2 className="heading-section text-primary-500 mt-4">
        {at >= 0 ? (
          <>
            {title.slice(0, at)}
            <span className="text-brand-orange">{highlight}</span>
            {title.slice(at + highlight!.length)}
          </>
        ) : (
          title
        )}
      </h2>
      {subtitle && <p className="body-hero text-primary-300 mt-4">{subtitle}</p>}
    </div>
  );
}

export default SectionHeading;
