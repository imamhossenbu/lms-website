import React from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "light";
  size?: "md" | "lg";
  icon?: React.ReactNode;
  className?: string;
}

const VARIANTS = {
  primary: "bg-brand-orange text-white hover:bg-brand-orange-hover edupro-glow-btn",
  secondary: "bg-white text-primary-500 border border-dash hover:bg-slate-50",
  ghost: "text-primary-400 hover:text-primary-500 hover:bg-slate-100",
  light: "bg-white text-brand-orange hover:bg-brand-orange-light",
};
const SIZES = { md: "h-10 px-4 body-sm-medium", lg: "h-12 px-6 body-medium" };

/** A link styled like the panel's buttons (internal routes via next/link, external URLs as <a>). */
export function ButtonLink({ href, children, variant = "primary", size = "md", icon, className }: ButtonLinkProps) {
  const cls = cn("inline-flex items-center justify-center gap-2 rounded-xl whitespace-nowrap transition-all active:scale-95", VARIANTS[variant], SIZES[size], className);
  const body = (
    <>
      {children}
      {icon}
    </>
  );
  return href.startsWith("/") ? (
    <Link href={href} className={cls}>
      {body}
    </Link>
  ) : (
    <a href={href} className={cls}>
      {body}
    </a>
  );
}
