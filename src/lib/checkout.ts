import { z } from "zod";
import { API_URL } from "./site";

/** Countries the platform supports (same list as the API). */
export const COUNTRIES = [
  "Bangladesh",
  "India",
  "Pakistan",
  "Nepal",
  "Sri Lanka",
  "United Arab Emirates",
  "Saudi Arabia",
  "Malaysia",
  "Singapore",
  "United Kingdom",
  "United States",
  "Canada",
  "Australia",
  "Germany",
  "Nigeria",
  "Kenya",
] as const;

export const ACADEMY_TYPES = [
  { value: "COACHING", label: "Coaching centre" },
  { value: "SCHOOL", label: "School" },
  { value: "UNIVERSITY", label: "College / university" },
  { value: "COMPANY", label: "Training institute / company" },
  { value: "CREATOR", label: "Independent teacher" },
] as const;

export const SLUG_RE = /^[a-z0-9](?:[a-z0-9-]{1,30}[a-z0-9])$/;
export const ROOT_DOMAIN = "edupro.com";

/** Checkout form (mirrors the API's StartCheckoutDto rules). */
export const checkoutSchema = z.object({
  institutionName: z.string().trim().min(2, "Enter your academy's name").max(80, "Keep it under 80 characters"),
  type: z.enum(["COACHING", "SCHOOL", "UNIVERSITY", "COMPANY", "CREATOR"], { message: "Choose an academy type" }),
  slug: z.string().trim().toLowerCase().regex(SLUG_RE, "3–32 lowercase letters, numbers or hyphens (not at the start or end)"),
  country: z.enum(COUNTRIES, { message: "Choose a country" }),
  name: z.string().trim().min(2, "Enter your name").max(80),
  email: z.string().trim().email("Enter a valid email address").max(120),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9][0-9 ()-]{6,18}$/, "Enter a valid phone number"),
  password: z
    .string()
    .min(8, "At least 8 characters")
    .max(128)
    .regex(/[A-Za-z]/, "Include at least one letter")
    .regex(/[0-9]/, "Include at least one number"),
  agreeTerms: z.boolean().refine((v) => v, "Please accept the Terms and Privacy Policy"),
});
export type CheckoutValues = z.infer<typeof checkoutSchema>;

export interface CheckoutQuote {
  planId: string;
  planName: string;
  cycle: "MONTHLY" | "YEARLY";
  subtotal: number;
  tax: number;
  total: number;
  currency: "USD";
}

export interface CheckoutResult {
  reference: string;
  status: "PENDING" | "PAID" | "FAILED" | "CANCELLED";
  planId: string;
  planName: string;
  cycle: "MONTHLY" | "YEARLY";
  total: number;
  currency: string;
  institutionName: string;
  subdomain: string;
  email: string;
  paidAt: string | null;
  error: string;
}

/** Turns an API error body into one friendly sentence. */
async function apiError(res: Response, fallback: string) {
  if (res.status === 429) return "Too many tries in a short time — please wait a minute.";
  const body = (await res.json().catch(() => null)) as { message?: string | string[] } | null;
  return [body?.message].flat().filter(Boolean)[0] ?? fallback;
}

export async function fetchQuote(planId: string, cycle: string, country: string, signal?: AbortSignal): Promise<CheckoutQuote> {
  const qs = new URLSearchParams({ planId, cycle, country });
  const res = await fetch(`${API_URL}/saas/public/checkout/quote?${qs}`, { signal });
  if (!res.ok) throw new Error(await apiError(res, "Couldn't price this plan."));
  return res.json();
}

export async function checkSlug(slug: string, signal?: AbortSignal): Promise<{ available: boolean; reason?: string }> {
  const res = await fetch(`${API_URL}/saas/public/slug-availability?slug=${encodeURIComponent(slug)}`, { signal });
  if (!res.ok) return { available: false, reason: await apiError(res, "Couldn't check this subdomain.") };
  return res.json();
}

export async function startCheckout(values: CheckoutValues & { planId: string; cycle: string }): Promise<{ reference: string; gatewayUrl: string }> {
  const res = await fetch(`${API_URL}/saas/public/checkout`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
  if (!res.ok) throw new Error(await apiError(res, "Please check your details and try again."));
  return res.json();
}

/** Server-side: the result page's data (null when unknown or the API is offline). */
export async function getCheckoutResult(reference: string): Promise<CheckoutResult | null> {
  if (!API_URL || !reference) return null;
  const res = await fetch(`${API_URL}/saas/public/checkout/${encodeURIComponent(reference)}`, { cache: "no-store" }).catch(() => null);
  if (!res || !res.ok) return null;
  return res.json();
}

/** "$82.95" / "$79". */
export const usd = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 })}`;

/** Website checkout link for a plan and cycle. */
export const checkoutUrl = (planId: string, cycle: "MONTHLY" | "YEARLY" = "MONTHLY") => `/checkout?plan=${encodeURIComponent(planId)}&cycle=${cycle}`;
