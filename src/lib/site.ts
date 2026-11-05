/** Where the website links to and reads from (set per environment). */
export const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4077").replace(/\/$/, "");
export const PANEL_URL = (process.env.NEXT_PUBLIC_PANEL_URL || "http://localhost:3000").replace(/\/$/, "");

/** Panel sign-up, optionally with a plan and billing cycle pre-selected. */
export const signupUrl = (plan?: string, cycle?: "MONTHLY" | "YEARLY") => {
  const q = new URLSearchParams();
  if (plan) q.set("plan", plan);
  if (cycle) q.set("cycle", cycle);
  const s = q.toString();
  return `${PANEL_URL}/signup${s ? `?${s}` : ""}`;
};
export const loginUrl = () => `${PANEL_URL}/login`;

export const NAV_LINKS = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
] as const;
