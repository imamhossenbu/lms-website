import { API_URL } from "./site";

export type FeatureKey =
  | "liveClasses"
  | "certificates"
  | "community"
  | "aiAssistant"
  | "advancedAnalytics"
  | "customDomain"
  | "whiteLabel"
  | "apiAccess"
  | "prioritySupport";

export interface Plan {
  id: string;
  name: string;
  tagline: string;
  priceMonthly: number;
  priceYearly: number;
  limits: { students: number | null; courses: number | null; teamMembers: number | null; storageGb: number | null };
  features: FeatureKey[];
  highlighted: boolean;
  isPublic: boolean;
  trialDays: number;
  archived: boolean;
}

/** Plan features in display order, with the wording the website uses. */
export const FEATURE_LABELS: { key: FeatureKey; label: string }[] = [
  { key: "certificates", label: "Certificates" },
  { key: "community", label: "Community discussions" },
  { key: "liveClasses", label: "Live classes" },
  { key: "aiAssistant", label: "AI assistant" },
  { key: "advancedAnalytics", label: "Advanced analytics" },
  { key: "customDomain", label: "Your own domain" },
  { key: "whiteLabel", label: "White-label branding" },
  { key: "apiAccess", label: "API access" },
  { key: "prioritySupport", label: "Priority support" },
];

export const LIMIT_LABELS: { key: keyof Plan["limits"]; label: string; unit?: string }[] = [
  { key: "students", label: "Students" },
  { key: "courses", label: "Courses" },
  { key: "teamMembers", label: "Team members" },
  { key: "storageGb", label: "Storage", unit: "GB" },
];

export const formatLimit = (n: number | null, unit?: string) => (n === null ? "Unlimited" : `${n.toLocaleString("en-US")}${unit ? ` ${unit}` : ""}`);
export const formatPrice = (n: number) => `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
/** Yearly saving vs 12 × monthly, in whole percent (0 when none). */
export const yearlySaving = (p: Plan) => (p.priceMonthly > 0 ? Math.max(0, Math.round((1 - p.priceYearly / (p.priceMonthly * 12)) * 100)) : 0);

/** Public, paid plans in price order (server-side; refreshed every 5 minutes). Empty when the API is down. */
export async function getPlans(): Promise<Plan[]> {
  try {
    const res = await fetch(`${API_URL}/saas/public/plans`, { next: { revalidate: 300 } });
    if (!res.ok) return [];
    const plans = (await res.json()) as Plan[];
    return plans.filter((p) => p.isPublic && !p.archived && p.priceMonthly > 0).sort((a, b) => a.priceMonthly - b.priceMonthly);
  } catch {
    return [];
  }
}
