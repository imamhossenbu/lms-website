import type { LucideIcon } from "lucide-react";
import { Award, ClipboardCheck, CreditCard, Play, Video } from "lucide-react";
import type { MockNavLabel } from "@/components/home/hero/dashboard/MockSidebar";

export type ShowcaseId = "courses" | "live" | "assess" | "certificates" | "payments";

export interface ShowcaseItem {
  id: ShowcaseId;
  icon: LucideIcon;
  title: string;
  text: string;
  /** Sidebar item highlighted in the preview. */
  nav: MockNavLabel;
}

/** "See it in action": each item switches the product preview on the right. */
export const SHOWCASE: ShowcaseItem[] = [
  { id: "courses", icon: Play, title: "Build courses", text: "Create structured courses with videos and lessons.", nav: "Courses" },
  { id: "live", icon: Video, title: "Run live classes", text: "Teach in real time with Zoom or Google Meet.", nav: "Live Classes" },
  { id: "assess", icon: ClipboardCheck, title: "Assess learning", text: "Create quizzes and assignments to track progress.", nav: "Quizzes" },
  { id: "certificates", icon: Award, title: "Issue certificates", text: "Give branded certificates automatically.", nav: "Certificates" },
  { id: "payments", icon: CreditCard, title: "Get paid easily", text: "Sell courses and collect fees with bKash, SSLCommerz or Stripe.", nav: "Payments" },
];

/** How long each item stays before the preview moves on (auto-play). */
export const SHOWCASE_INTERVAL_MS = 6000;
