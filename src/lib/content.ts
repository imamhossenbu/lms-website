import type { LucideIcon } from "lucide-react";
import { Award, BarChart3, Bell, ClipboardList, CreditCard, Globe, Layers, MonitorPlay, Play, ShieldCheck, Sparkles, UserCog, UserPlus, Users, Video } from "lucide-react";

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
    icon: MonitorPlay,
    tone: "green",
    title: "Courses & lessons",
    summary: "Create structured courses with videos, files and lessons.",
    points: ["Video, text and downloadable resources", "Drip schedules and prerequisite lessons", "Free preview lessons for visitors", "Categories and sub-categories"],
  },
  {
    id: "live",
    icon: Video,
    tone: "blue",
    title: "Live classes",
    summary: "Run live classes with Zoom or Google Meet integration.",
    points: ["Attendance taken for you", "Q&A and class resources", "Reminders before every class", "Recordings attached afterwards"],
  },
  {
    id: "assessments",
    icon: ClipboardList,
    tone: "purple",
    title: "Quizzes & assignments",
    summary: "Test understanding and keep track of student progress.",
    points: ["Multiple choice, true/false and short answers", "Time limits and attempt limits", "Rubrics and written feedback", "Results and insights per question"],
  },
  {
    id: "certificates",
    icon: Award,
    tone: "yellow",
    title: "Certificates",
    summary: "Issue branded certificates automatically after completion.",
    points: ["Template designer", "Automatic issuing on completion", "Public verification code", "Revoke and restore with a reason"],
  },
  {
    id: "payments",
    icon: CreditCard,
    tone: "red",
    title: "Sell courses & collect fees",
    summary: "Monetize your courses and collect payments with bKash, SSLCommerz or Stripe.",
    points: ["Orders, refunds and receipts", "Coupons and discounts", "Invoices with your branding", "Revenue reports"],
  },
  {
    id: "community",
    icon: Users,
    tone: "green",
    title: "Student community",
    summary: "Keep your learners engaged with a built-in community.",
    points: ["Accepted answers", "Pin, lock and moderate", "Reports and moderation queue", "Tags and categories"],
  },
  {
    id: "analytics",
    icon: BarChart3,
    tone: "blue",
    title: "Analytics",
    summary: "See enrolments, revenue and learning progress at a glance.",
    points: ["Course and student progress", "Instructor performance", "Revenue over time", "Export to CSV"],
  },
  {
    id: "team",
    icon: UserCog,
    tone: "purple",
    title: "Team & roles",
    summary: "Manage your team with role-based access and approvals.",
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

export interface Step {
  id: "create" | "content" | "teach";
  icon: LucideIcon;
  tone: ToneKey;
  title: string;
  text: string;
}

export const STEPS: Step[] = [
  { id: "create", icon: UserPlus, tone: "orange", title: "Create your academy", text: "Sign up, set up your institute and get your own online academy in minutes." },
  { id: "content", icon: Layers, tone: "blue", title: "Add your content", text: "Build courses, upload lessons, set up live classes, quizzes and assignments." },
  { id: "teach", icon: Play, tone: "green", title: "Start teaching", text: "Enroll students, take live classes, collect payments and grow your academy." },
];

export const FAQS = [
  { q: "Who is EduPro for?", a: "Schools, coaching centres, training institutes and independent teachers who want to teach online, sell courses and manage students in one place." },
  { q: "Is there a free trial?", a: "Yes. Every paid plan starts with a free trial, so you can set up your academy and try every feature of the plan before you pay." },
  { q: "Which payment methods can my students use?", a: "You can connect bKash, SSLCommerz and Stripe. Students pay for courses on your academy and you see every order and refund in the admin panel." },
  { q: "Can I use my own domain and branding?", a: "Yes. The Pro plan and above let you connect your own domain and remove EduPro branding." },
  { q: "Can I change plans later?", a: "Yes. Upgrade or downgrade any time from Billing in your admin panel; the change is prorated." },
  { q: "Is my data safe?", a: "Each academy's data is kept separate, admin accounts can require two-factor sign-in, and automatic backups run every night." },
];
