import type { LucideIcon } from "lucide-react";
import {
  Award,
  BarChart3,
  BookOpen,
  ClipboardCheck,
  CreditCard,
  Globe,
  MessagesSquare,
  Radio,
  ShieldCheck,
  Sparkles,
  Users,
  Bell,
} from "lucide-react";

/** Everything the website says about the product, in one place (home + features pages). */

export type ToneKey = "orange" | "blue" | "green" | "purple" | "yellow" | "red";

export interface Feature {
  id: string;
  icon: LucideIcon;
  tone: ToneKey;
  title: string;
  summary: string;
  points: string[];
}

export const FEATURES: Feature[] = [
  {
    id: "courses",
    icon: BookOpen,
    tone: "orange",
    title: "Courses & lessons",
    summary: "Build courses with modules, video, text and resources in a guided course builder.",
    points: ["Video, text and downloadable resources", "Drip schedules and prerequisite lessons", "Free preview lessons for visitors", "Categories and sub-categories"],
  },
  {
    id: "live",
    icon: Radio,
    tone: "red",
    title: "Live classes",
    summary: "Schedule Zoom or Google Meet classes, track attendance and answer questions.",
    points: ["Attendance taken for you", "Q&A and class resources", "Reminders before every class", "Recordings attached afterwards"],
  },
  {
    id: "assessments",
    icon: ClipboardCheck,
    tone: "blue",
    title: "Quizzes & assignments",
    summary: "Graded quizzes, rubric-based assignments and instant results for students.",
    points: ["Multiple choice, true/false and short answers", "Time limits and attempt limits", "Rubrics and written feedback", "Results and insights per question"],
  },
  {
    id: "certificates",
    icon: Award,
    tone: "yellow",
    title: "Certificates",
    summary: "Design certificates once and issue them automatically when a course is completed.",
    points: ["Template designer", "Automatic issuing on completion", "Public verification code", "Revoke and restore with a reason"],
  },
  {
    id: "payments",
    icon: CreditCard,
    tone: "green",
    title: "Payments",
    summary: "Sell courses and collect fees with bKash, SSLCommerz or Stripe.",
    points: ["Orders, refunds and receipts", "Coupons and discounts", "Invoices with your branding", "Revenue reports"],
  },
  {
    id: "community",
    icon: MessagesSquare,
    tone: "purple",
    title: "Community",
    summary: "Discussions per course where students ask, answer and learn from each other.",
    points: ["Accepted answers", "Pin, lock and moderate", "Reports and moderation queue", "Tags and categories"],
  },
  {
    id: "analytics",
    icon: BarChart3,
    tone: "blue",
    title: "Analytics",
    summary: "See enrolments, completion, revenue and engagement at a glance.",
    points: ["Course and student progress", "Instructor performance", "Revenue over time", "Export to CSV"],
  },
  {
    id: "team",
    icon: Users,
    tone: "orange",
    title: "Team & roles",
    summary: "Invite instructors and staff with exactly the access they need.",
    points: ["Custom roles and permissions", "Two-factor sign-in for admins", "Activity history", "Owner controls"],
  },
];

/** Smaller extras shown as a compact list. */
export const EXTRAS: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Sparkles, title: "AI assistant", text: "Draft course outlines and quiz questions in seconds." },
  { icon: Bell, title: "Notifications", text: "Announcements by email and in-app, with templates." },
  { icon: Globe, title: "Your own domain", text: "Run the academy on your domain with your branding." },
  { icon: ShieldCheck, title: "Secure by default", text: "Password policies, lockout, IP allowlist and daily backups." },
];

export const STEPS = [
  { title: "Create your academy", text: "Sign up, name your institution and pick a plan. Your free trial starts right away." },
  { title: "Add courses and people", text: "Build courses, invite instructors and enrol students or let them buy online." },
  { title: "Teach and grow", text: "Run live classes, grade work, issue certificates and watch your numbers grow." },
];

export const FAQS = [
  { q: "Who is EduPro for?", a: "Schools, coaching centres, training institutes and independent teachers who want to teach online, sell courses and manage students in one place." },
  { q: "Is there a free trial?", a: "Yes. Every paid plan starts with a free trial, so you can set up your academy and try every feature of the plan before you pay." },
  { q: "Which payment methods can my students use?", a: "You can connect bKash, SSLCommerz and Stripe. Students pay for courses on your academy and you see every order and refund in the admin panel." },
  { q: "Can I use my own domain and branding?", a: "Yes. The Pro plan and above let you connect your own domain and remove EduPro branding." },
  { q: "Can I change plans later?", a: "Yes. Upgrade or downgrade any time from Billing in your admin panel; the change is prorated." },
  { q: "Is my data safe?", a: "Each academy's data is kept separate, admin accounts can require two-factor sign-in, and automatic backups run every night." },
];

/** Payment gateways the platform supports (shown as a strip, no logos). */
export const GATEWAYS = ["bKash", "SSLCommerz", "Stripe"];
