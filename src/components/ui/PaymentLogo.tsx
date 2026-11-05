import React from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

export type PaymentMethod = "bkash" | "nagad" | "sslcommerz" | "stripe";

/**
 * Official marks (from each company's own site / app listing; Stripe from Wikimedia Commons, public domain).
 * `ratio` = width ÷ height of the file.
 */
const LOGOS: Record<PaymentMethod, { src: string; label: string; ratio: number; icon?: boolean }> = {
  bkash: { src: "/images/payments/bkash.png", label: "bKash", ratio: 1, icon: true },
  nagad: { src: "/images/payments/nagad.png", label: "Nagad", ratio: 2400 / 1086 },
  sslcommerz: { src: "/images/payments/sslcommerz.png", label: "SSLCommerz", ratio: 462 / 100 },
  stripe: { src: "/images/payments/stripe.svg", label: "Stripe", ratio: 2.39 },
};
const HEIGHTS = { xs: 14, sm: 22, md: 30 };
/** bKash's brand pink, for the wordmark next to its app icon (a fixed brand colour, no theme token). */
const BKASH_PINK = "#E2136E";

/** A payment provider's real logo at a fixed height; bKash shows its app icon + wordmark. */
export function PaymentLogo({ method, size = "sm", className }: { method: PaymentMethod; size?: keyof typeof HEIGHTS; className?: string }) {
  const { src, label, ratio, icon } = LOGOS[method];
  const h = HEIGHTS[size];
  if (icon)
    return (
      <span className={cn("inline-flex shrink-0 items-center gap-1.5", className)}>
        <Image src={src} alt="" width={h} height={h} className="rounded-md" style={{ width: h, height: h }} />
        <span className="font-bold tracking-tight" style={{ color: BKASH_PINK, fontSize: h * 0.72, lineHeight: 1 }}>
          {label}
        </span>
      </span>
    );
  return <Image src={src} alt={label} width={Math.round(h * ratio)} height={h} className={cn("shrink-0 object-contain", className)} style={{ width: Math.round(h * ratio), height: h }} />;
}

export default PaymentLogo;
