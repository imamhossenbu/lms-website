"use client";

import React from "react";
import {
  Atom,
  Award,
  BadgeCheck,
  Banknote,
  BarChart3,
  BookOpen,
  Calculator,
  CalendarDays,
  Clock,
  Dna,
  FlaskConical,
  Globe,
  Laptop,
  KeyRound,
  ListChecks,
  MessageSquare,
  Palette,
  Pin,
  Radio,
  Receipt,
  ShieldCheck,
  Target,
  TrendingUp,
  Undo2,
  UserCog,
  Users,
  Video,
  Wallet,
} from "lucide-react";
import type { ShowcaseId } from "@/lib/showcase";
import { ScreenShell } from "./mock/ScreenShell";
import { MockListRow } from "./mock/MockListRow";

/** Sample data for the five preview screens (illustration only). */

function CoursesScreen() {
  return (
    <ScreenShell
      title="Courses"
      subtitle="Create, manage and organize your courses."
      action="Create course"
      stats={[
        { icon: BookOpen, label: "Published courses", value: "24", note: "+3 this month", tone: "orange" },
        { icon: Users, label: "Enrolled students", value: "1,842", note: "+12% this month", tone: "blue" },
        { icon: TrendingUp, label: "Avg. completion", value: "78%", note: "+5% vs last term", tone: "green" },
      ]}
      tabs={["All Courses", "Published", "Draft", "Archived"]}
      searchPlaceholder="Search courses"
      footer="Showing 5 of 24 courses"
    >
      <MockListRow index={0} thumbIcon={Laptop} thumbClass="from-blue to-purple" title="HSC Physics Complete Course" meta={[{ icon: BookOpen, text: "24 lessons" }, { icon: Users, text: "318 students" }]} status="Published" statusTone="green" />
      <MockListRow index={1} thumbIcon={FlaskConical} thumbClass="from-purple to-red" title="HSC Chemistry" meta={[{ icon: BookOpen, text: "18 lessons" }, { icon: Users, text: "264 students" }]} status="Published" statusTone="green" />
      <MockListRow index={2} thumbIcon={Calculator} thumbClass="from-blue to-green" title="SSC Math" meta={[{ icon: BookOpen, text: "20 lessons" }, { icon: Users, text: "427 students" }]} status="Published" statusTone="green" />
      <MockListRow index={3} thumbIcon={Globe} thumbClass="from-green to-blue" title="Spoken English for Beginners" meta={[{ icon: BookOpen, text: "16 lessons" }, { icon: Users, text: "196 students" }]} status="Published" statusTone="green" />
      <MockListRow index={4} thumbIcon={Palette} thumbClass="from-yellow to-brand-orange" title="Graphic Design Basics" meta={[{ icon: BookOpen, text: "12 lessons" }, { icon: Users, text: "Not launched" }]} status="Draft" statusTone="yellow" />
    </ScreenShell>
  );
}

function LiveScreen() {
  return (
    <ScreenShell
      title="Live Classes"
      subtitle="Schedule and run classes on Zoom or Google Meet."
      action="Schedule class"
      stats={[
        { icon: Radio, label: "Live right now", value: "2", note: "142 joined now", tone: "red" },
        { icon: CalendarDays, label: "This week", value: "18", note: "+4 vs last week", tone: "blue" },
        { icon: Users, label: "Avg. attendance", value: "91%", note: "+6% this month", tone: "green" },
      ]}
      tabs={["Upcoming", "Live now", "Completed"]}
      searchPlaceholder="Search classes"
      footer="Showing 5 of 18 classes this week"
    >
      <MockListRow index={0} thumbIcon={Video} thumbClass="from-red to-brand-orange" title="Algebra revision" meta={[{ icon: CalendarDays, text: "Today, 7:00 PM" }, { icon: Users, text: "86 joined" }]} status="Live" statusTone="red" />
      <MockListRow index={1} thumbIcon={Dna} thumbClass="from-green to-blue" title="Biology: Cell division" meta={[{ icon: CalendarDays, text: "Today, 8:30 PM" }, { icon: Users, text: "56 joined" }]} status="Live" statusTone="red" />
      <MockListRow index={2} thumbIcon={Atom} thumbClass="from-blue to-purple" title="Physics: Newton's laws" meta={[{ icon: CalendarDays, text: "Tomorrow, 5:00 PM" }, { icon: Clock, text: "60 min" }]} status="Scheduled" statusTone="blue" />
      <MockListRow index={3} thumbIcon={FlaskConical} thumbClass="from-purple to-red" title="Chemistry Q&A" meta={[{ icon: CalendarDays, text: "Fri, 6:30 PM" }, { icon: Clock, text: "45 min" }]} status="Scheduled" statusTone="blue" />
      <MockListRow index={4} thumbIcon={Globe} thumbClass="from-yellow to-brand-orange" title="IELTS Speaking practice" meta={[{ icon: CalendarDays, text: "Sat, 10:00 AM" }, { icon: Clock, text: "90 min" }]} status="Scheduled" statusTone="blue" />
    </ScreenShell>
  );
}

function AssessScreen() {
  return (
    <ScreenShell
      title="Quizzes"
      subtitle="Test understanding and track every attempt."
      action="Create quiz"
      stats={[
        { icon: ListChecks, label: "Active quizzes", value: "36", note: "+5 this month", tone: "purple" },
        { icon: Target, label: "Attempts", value: "4,210", note: "+18% this month", tone: "blue" },
        { icon: TrendingUp, label: "Average score", value: "76%", note: "+4% vs last term", tone: "green" },
      ]}
      tabs={["All Quizzes", "Published", "Draft"]}
      searchPlaceholder="Search quizzes"
      footer="Showing 5 of 36 quizzes"
    >
      <MockListRow index={0} thumbIcon={ListChecks} thumbClass="from-blue to-green" title="Chapter 3: Motion" meta={[{ icon: ListChecks, text: "15 questions" }, { icon: Users, text: "212 attempts" }]} status="82% avg" statusTone="green" />
      <MockListRow index={1} thumbIcon={Calculator} thumbClass="from-yellow to-brand-orange" title="Algebra practice test" meta={[{ icon: ListChecks, text: "20 questions" }, { icon: Clock, text: "30 min" }]} status="Published" statusTone="green" />
      <MockListRow index={2} thumbIcon={Dna} thumbClass="from-green to-blue" title="Genetics weekly test" meta={[{ icon: ListChecks, text: "25 questions" }, { icon: Users, text: "168 attempts" }]} status="74% avg" statusTone="green" />
      <MockListRow index={3} thumbIcon={Globe} thumbClass="from-blue to-purple" title="English grammar: Tenses" meta={[{ icon: ListChecks, text: "30 questions" }, { icon: Clock, text: "40 min" }]} status="Published" statusTone="green" />
      <MockListRow index={4} thumbIcon={FlaskConical} thumbClass="from-purple to-red" title="Organic chemistry basics" meta={[{ icon: ListChecks, text: "12 questions" }, { icon: Users, text: "Not started" }]} status="Draft" statusTone="yellow" />
    </ScreenShell>
  );
}

function CertificatesScreen() {
  return (
    <ScreenShell
      title="Certificates"
      subtitle="Issued automatically when a course is completed."
      action="New template"
      stats={[
        { icon: Award, label: "Issued", value: "962", note: "+84 this month", tone: "yellow" },
        { icon: BadgeCheck, label: "Verified online", value: "1,305", note: "QR checks", tone: "green" },
        { icon: Clock, label: "Eligible now", value: "27", note: "Auto-issue on", tone: "blue" },
      ]}
      tabs={["Issued", "Eligible", "Templates"]}
      searchPlaceholder="Search students"
      footer="Showing 5 of 962 certificates"
    >
      <MockListRow index={0} thumbIcon={Award} thumbClass="from-yellow to-brand-orange" title="Nusrat Jahan · HSC Physics" meta={[{ icon: CalendarDays, text: "Issued Nov 4" }, { icon: Award, text: "EDU-PHY-0142" }]} status="Valid" statusTone="green" />
      <MockListRow index={1} thumbIcon={Award} thumbClass="from-blue to-purple" title="Rafiq Ahmed · SSC Math" meta={[{ icon: CalendarDays, text: "Issued Nov 2" }, { icon: Award, text: "EDU-MTH-0388" }]} status="Valid" statusTone="green" />
      <MockListRow index={2} thumbIcon={Award} thumbClass="from-purple to-red" title="Mim Akter · Spoken English" meta={[{ icon: CalendarDays, text: "Issued Nov 1" }, { icon: Award, text: "EDU-ENG-0217" }]} status="Valid" statusTone="green" />
      <MockListRow index={3} thumbIcon={Award} thumbClass="from-green to-blue" title="Tania Islam · HSC Chemistry" meta={[{ icon: CalendarDays, text: "Completed today" }, { icon: Clock, text: "Auto-issue" }]} status="Eligible" statusTone="blue" />
      <MockListRow index={4} thumbIcon={Award} thumbClass="from-red to-brand-orange" title="Sakib Hossain · Graphic Design" meta={[{ icon: CalendarDays, text: "Completed today" }, { icon: Clock, text: "Auto-issue" }]} status="Eligible" statusTone="blue" />
    </ScreenShell>
  );
}

function PaymentsScreen() {
  return (
    <ScreenShell
      title="Payments"
      subtitle="Every order, refund and payout in one place."
      action="Create coupon"
      stats={[
        { icon: Banknote, label: "Revenue this month", value: "৳4.8L", note: "+22% vs last month", tone: "green" },
        { icon: Receipt, label: "Paid orders", value: "312", note: "+41 this week", tone: "blue" },
        { icon: Undo2, label: "Refunds", value: "1.2%", note: "Low and steady", tone: "orange" },
      ]}
      tabs={["All Orders", "Paid", "Refunded"]}
      searchPlaceholder="Search orders"
      footer="Showing 5 of 312 orders"
    >
      <MockListRow index={0} thumbIcon={Wallet} thumbClass="from-red to-purple" title="৳2,500 · HSC Physics" meta={[{ icon: Receipt, text: "bKash" }, { icon: CalendarDays, text: "Today" }]} status="Paid" statusTone="green" />
      <MockListRow index={1} thumbIcon={Wallet} thumbClass="from-blue to-green" title="৳1,800 · SSC Math" meta={[{ icon: Receipt, text: "SSLCommerz" }, { icon: CalendarDays, text: "Today" }]} status="Paid" statusTone="green" />
      <MockListRow index={2} thumbIcon={Wallet} thumbClass="from-green to-blue" title="৳3,000 · Spoken English" meta={[{ icon: Receipt, text: "Nagad" }, { icon: CalendarDays, text: "Yesterday" }]} status="Paid" statusTone="green" />
      <MockListRow index={3} thumbIcon={Wallet} thumbClass="from-purple to-red" title="৳1,500 · Graphic Design" meta={[{ icon: Receipt, text: "bKash" }, { icon: CalendarDays, text: "Nov 3" }]} status="Pending" statusTone="blue" />
      <MockListRow index={4} thumbIcon={Wallet} thumbClass="from-yellow to-brand-orange" title="৳2,200 · HSC Chemistry" meta={[{ icon: Receipt, text: "Stripe" }, { icon: CalendarDays, text: "Nov 3" }]} status="Refunded" statusTone="yellow" />
    </ScreenShell>
  );
}


function CommunityScreen() {
  return (
    <ScreenShell
      title="Community"
      subtitle="Questions, answers and discussions from your students."
      action="New post"
      stats={[
        { icon: MessageSquare, label: "Posts this week", value: "148", note: "+26 vs last week", tone: "blue" },
        { icon: BadgeCheck, label: "Answered", value: "92%", note: "Avg. 2h to answer", tone: "green" },
        { icon: ShieldCheck, label: "Reports open", value: "1", note: "Moderation queue", tone: "orange" },
      ]}
      tabs={["Latest", "Unanswered", "Pinned"]}
      searchPlaceholder="Search posts"
      footer="Showing 5 of 148 posts"
    >
      <MockListRow index={0} thumbIcon={Pin} thumbClass="from-brand-orange to-yellow" title="Welcome! Read before posting" meta={[{ icon: MessageSquare, text: "12 replies" }, { icon: Users, text: "Admin" }]} status="Pinned" statusTone="orange" />
      <MockListRow index={1} thumbIcon={Atom} thumbClass="from-blue to-purple" title="Why does acceleration stay constant here?" meta={[{ icon: MessageSquare, text: "6 replies" }, { icon: Users, text: "Rafiq A." }]} status="Answered" statusTone="green" />
      <MockListRow index={2} thumbIcon={Calculator} thumbClass="from-blue to-green" title="Shortcut for quadratic factorisation?" meta={[{ icon: MessageSquare, text: "9 replies" }, { icon: Users, text: "Mim A." }]} status="Answered" statusTone="green" />
      <MockListRow index={3} thumbIcon={FlaskConical} thumbClass="from-purple to-red" title="Organic naming rules — any tips?" meta={[{ icon: MessageSquare, text: "2 replies" }, { icon: Users, text: "Tania I." }]} status="Open" statusTone="blue" />
      <MockListRow index={4} thumbIcon={Globe} thumbClass="from-green to-blue" title="Speaking practice partners" meta={[{ icon: MessageSquare, text: "15 replies" }, { icon: Users, text: "Sakib H." }]} status="Open" statusTone="blue" />
    </ScreenShell>
  );
}

function AnalyticsScreen() {
  return (
    <ScreenShell
      title="Analytics"
      subtitle="Enrolments, revenue and progress across your academy."
      action="Export CSV"
      stats={[
        { icon: Users, label: "New students", value: "326", note: "+14% this month", tone: "blue" },
        { icon: Banknote, label: "Revenue", value: "৳4.8L", note: "+22% this month", tone: "green" },
        { icon: TrendingUp, label: "Completion", value: "78%", note: "+5% vs last term", tone: "purple" },
      ]}
      tabs={["Courses", "Students", "Instructors", "Revenue"]}
      searchPlaceholder="Filter courses"
      footer="Last 30 days · updated just now"
    >
      <MockListRow index={0} thumbIcon={Laptop} thumbClass="from-blue to-purple" title="HSC Physics Complete Course" meta={[{ icon: Users, text: "318 students" }, { icon: TrendingUp, text: "84% completion" }]} status="Top course" statusTone="green" />
      <MockListRow index={1} thumbIcon={Calculator} thumbClass="from-blue to-green" title="SSC Math" meta={[{ icon: Users, text: "427 students" }, { icon: TrendingUp, text: "76% completion" }]} status="+18%" statusTone="green" />
      <MockListRow index={2} thumbIcon={FlaskConical} thumbClass="from-purple to-red" title="HSC Chemistry" meta={[{ icon: Users, text: "264 students" }, { icon: TrendingUp, text: "71% completion" }]} status="+9%" statusTone="green" />
      <MockListRow index={3} thumbIcon={Globe} thumbClass="from-green to-blue" title="Spoken English for Beginners" meta={[{ icon: Users, text: "196 students" }, { icon: TrendingUp, text: "62% completion" }]} status="Steady" statusTone="blue" />
      <MockListRow index={4} thumbIcon={BarChart3} thumbClass="from-yellow to-brand-orange" title="Drop-off: Lesson 7, Graphic Design" meta={[{ icon: Users, text: "41 students" }, { icon: TrendingUp, text: "Needs attention" }]} status="Review" statusTone="yellow" />
    </ScreenShell>
  );
}

function TeamScreen() {
  return (
    <ScreenShell
      title="Team"
      subtitle="Invite teachers and staff with the right permissions."
      action="Invite member"
      stats={[
        { icon: Users, label: "Team members", value: "14", note: "3 invited this month", tone: "blue" },
        { icon: UserCog, label: "Custom roles", value: "4", note: "Teacher, Accountant…", tone: "purple" },
        { icon: KeyRound, label: "2FA enabled", value: "100%", note: "All admins", tone: "green" },
      ]}
      tabs={["Members", "Roles", "Activity"]}
      searchPlaceholder="Search members"
      footer="Showing 5 of 14 members"
    >
      <MockListRow index={0} thumbIcon={KeyRound} thumbClass="from-brand-orange to-red" title="Tanvir Hasan · Owner" meta={[{ icon: ShieldCheck, text: "Full access" }, { icon: Clock, text: "Active now" }]} status="Owner" statusTone="orange" />
      <MockListRow index={1} thumbIcon={UserCog} thumbClass="from-blue to-purple" title="Nusrat Jahan · Admin" meta={[{ icon: ShieldCheck, text: "2FA on" }, { icon: Clock, text: "5 min ago" }]} status="Admin" statusTone="blue" />
      <MockListRow index={2} thumbIcon={Atom} thumbClass="from-green to-blue" title="Rafiq Ahmed · Physics teacher" meta={[{ icon: BookOpen, text: "3 courses" }, { icon: Clock, text: "1 h ago" }]} status="Teacher" statusTone="green" />
      <MockListRow index={3} thumbIcon={Banknote} thumbClass="from-yellow to-brand-orange" title="Sadia Islam · Accountant" meta={[{ icon: Receipt, text: "Payments only" }, { icon: Clock, text: "Yesterday" }]} status="Custom role" statusTone="purple" />
      <MockListRow index={4} thumbIcon={Users} thumbClass="from-purple to-red" title="arif@greenvalley.edu" meta={[{ icon: CalendarDays, text: "Invited Nov 3" }, { icon: Clock, text: "Pending" }]} status="Invited" statusTone="yellow" />
    </ScreenShell>
  );
}

export const SHOWCASE_SCREENS: Record<ShowcaseId, React.ComponentType> = {
  courses: CoursesScreen,
  live: LiveScreen,
  assess: AssessScreen,
  certificates: CertificatesScreen,
  payments: PaymentsScreen,
};

/** Preview screen for each feature section on /features (keyed by feature id). */
export const FEATURE_SCREENS: Record<string, React.ComponentType> = {
  courses: CoursesScreen,
  live: LiveScreen,
  assessments: AssessScreen,
  certificates: CertificatesScreen,
  payments: PaymentsScreen,
  community: CommunityScreen,
  analytics: AnalyticsScreen,
  team: TeamScreen,
};
