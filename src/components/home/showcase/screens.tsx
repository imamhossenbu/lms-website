"use client";

import React from "react";
import {
  Atom,
  Award,
  BadgeCheck,
  Banknote,
  BookOpen,
  Calculator,
  CalendarDays,
  Clock,
  Dna,
  FlaskConical,
  Globe,
  Laptop,
  ListChecks,
  Palette,
  Radio,
  Receipt,
  Target,
  TrendingUp,
  Undo2,
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

export const SHOWCASE_SCREENS: Record<ShowcaseId, React.ComponentType> = {
  courses: CoursesScreen,
  live: LiveScreen,
  assess: AssessScreen,
  certificates: CertificatesScreen,
  payments: PaymentsScreen,
};
