import { API_URL, HAS_API } from "./site";

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
  if (!HAS_API) return [];
  try {
    const res = await fetch(`${API_URL}/saas/public/plans`, { next: { revalidate: 300 } });
    if (!res.ok) return [];
    const plans = (await res.json()) as Plan[];
    return plans.filter((p) => p.isPublic && !p.archived && p.priceMonthly > 0).sort((a, b) => a.priceMonthly - b.priceMonthly);
  } catch {
    return [];
  }
}

/**
 * The four selling points on a plan card, from the plan's real limits and features:
 * "Create up to N courses", a feature new in this plan, "Up to N students", another new feature
 * (falls back to the plan's own features when it adds nothing over the cheaper one).
 */
export function planHighlights(plan: Plan, plans: Plan[]): string[] {
  const n = (v: number | null) => (v === null ? null : v.toLocaleString("en-US"));
  const courses = n(plan.limits.courses) ? `Create up to ${n(plan.limits.courses)} courses` : "Unlimited courses";
  const students = n(plan.limits.students) ? `Up to ${n(plan.limits.students)} students` : "Unlimited students";
  const i = plans.findIndex((p) => p.id === plan.id);
  const cheaper = i > 0 ? plans[i - 1] : undefined;
  const own = FEATURE_LABELS.filter((f) => plan.features.includes(f.key));
  const added = own.filter((f) => !cheaper?.features.includes(f.key));
  const picks = (added.length ? added : own).slice(0, 2).map((f) => f.label);
  return [courses, picks[0], students, picks[1]].filter((x): x is string => !!x);
}
