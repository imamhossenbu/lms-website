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

/** Main navigation. `mega` = opens the features menu on desktop. */
export const NAV_LINKS: { href: string; label: string; mega?: boolean }[] = [
  { href: "/features", label: "Features", mega: true },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
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
