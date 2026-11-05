import React from "react";
import type { SocialNetwork } from "@/lib/footer";

/** Simple brand marks (24 × 24, currentColor) — lucide has no brand icons. */
export function SocialIcon({ network, className }: { network: SocialNetwork; className?: string }) {
  switch (network) {
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
          <path d="M14 8h3V4h-3c-2.8 0-5 2.2-5 5v2H7v4h2v9h4v-9h3l1-4h-4V9c0-.6.4-1 1-1z" />
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
          <path d="M6 5h12a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4zm4 4v6l5-3z" fillRule="evenodd" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
          <circle cx="5" cy="5" r="2.2" />
          <rect x="3" y="9" width="4" height="12" rx="0.5" />
          <path d="M10 9h3.8v1.8C14.4 9.7 15.8 8.7 18 8.7c3.4 0 4 2.3 4 5.3V21h-4v-6.2c0-1.5-.1-3.1-2-3.1s-2.1 1.5-2.1 3V21H10z" />
        </svg>
      );
    case "x":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
          <path d="M18.9 2h3.4l-7.4 8.5L23.6 22h-6.8l-5.3-7-6.1 7H2l7.9-9L1.6 2h7l4.8 6.4zm-1.2 18h1.9L7.4 3.9H5.4z" />
        </svg>
      );
  }
}

export default SocialIcon;
