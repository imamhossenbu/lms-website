"use client";

import React from "react";
import { cn } from "@/lib/cn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

interface SectionHeadingProps {
  /** Small pill above the title. */
  eyebrow?: string;
  title: string;
  /** A word / phrase of `title` to colour orange (first match). */
  highlight?: string;
  /** Put the highlighted phrase on its own line. */
  highlightOnNewLine?: boolean;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}

/** Pill eyebrow + large title (optional orange highlight) + intro line, used at the top of each section. */
export function SectionHeading({ eyebrow, title, highlight, highlightOnNewLine, subtitle, align = "center", className }: SectionHeadingProps) {
  const at = highlight ? title.indexOf(highlight) : -1;
  return (
    <Stagger className={cn("max-w-3xl", align === "center" ? "mx-auto text-center" : "text-left", className)} stagger={0.1}>
      {eyebrow && (
        <StaggerItem>
          <span className="inline-flex rounded-full bg-brand-orange-light px-4 py-1.5 body-sm-medium text-brand-orange whitespace-nowrap">{eyebrow}</span>
        </StaggerItem>
      )}
      <StaggerItem as="h2" className="heading-section text-primary-500 mt-4">
        {at >= 0 ? (
          <>
            {title.slice(0, at)}
            <span className={cn("text-brand-orange", highlightOnNewLine && "block")}>{highlight}</span>
            {title.slice(at + highlight!.length)}
          </>
        ) : (
          title
        )}
      </StaggerItem>
      {subtitle && (
        <StaggerItem as="p" className="body-hero text-primary-300 mt-4">
          {subtitle}
        </StaggerItem>
      )}
    </Stagger>
  );
}

export default SectionHeading;
