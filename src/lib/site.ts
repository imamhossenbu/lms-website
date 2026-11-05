const DEV = process.env.NODE_ENV !== "production";
const clean = (u: string) => u.replace(/\/$/, "");

/**
 * Where the website links to and reads from (set per environment). In development they default to the local
 * servers; in production a missing value means "not online yet" — the site then skips the API (empty states)
 * and sends sign-up / sign-in buttons to the contact page instead of a dead localhost link.
 */
/** This website's public address (canonical URLs, sitemap, share images). On Vercel it falls back to the project's production domain. */
export const SITE_URL = clean(
  process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3002")
);
export const API_URL = clean(process.env.NEXT_PUBLIC_API_URL || (DEV ? "http://localhost:4077" : ""));
export const PANEL_URL = clean(process.env.NEXT_PUBLIC_PANEL_URL || (DEV ? "http://localhost:3000" : ""));
/** The backend API is configured (false = plans, blog, testimonials and the contact form are offline). */
export const HAS_API = API_URL !== "";

/** Panel sign-up, optionally with a plan and billing cycle pre-selected. */
export const signupUrl = (plan?: string, cycle?: "MONTHLY" | "YEARLY") => {
  const q = new URLSearchParams();
  if (plan) q.set("plan", plan);
  if (cycle) q.set("cycle", cycle);
  const s = q.toString();
  if (!PANEL_URL) return "/contact?topic=DEMO";
  return `${PANEL_URL}/signup${s ? `?${s}` : ""}`;
};
export const loginUrl = () => (PANEL_URL ? `${PANEL_URL}/login` : "/contact?topic=SUPPORT");

/** Main navigation. `mega` = opens the features menu on desktop. */
export const NAV_LINKS: { href: string; label: string; mega?: boolean }[] = [
  { href: "/features", label: "Features", mega: true },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/**
 * Lesson video played from the closing banner. Default: "A Male Teacher Giving Online Classes" by Diva Plavalaguna
 * on Pexels (free to use under the Pexels license) — set NEXT_PUBLIC_DEMO_VIDEO_URL to the real EduPro demo.
 */
export const DEMO_VIDEO = {
  src: process.env.NEXT_PUBLIC_DEMO_VIDEO_URL || "https://videos.pexels.com/video-files/6985689/6985689-hd_1920_1080_25fps.mp4",
  /** Frame from the default video; set NEXT_PUBLIC_DEMO_VIDEO_POSTER together with the URL. */
  poster: process.env.NEXT_PUBLIC_DEMO_VIDEO_POSTER || "/images/cta-lesson-poster.jpg",
  title: "A live lesson on EduPro",
};
