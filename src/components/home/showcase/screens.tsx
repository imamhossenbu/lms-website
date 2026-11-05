"use client";

import React from "react";
import { Atom, Award, BookOpen, Calculator, CalendarDays, Clock, FlaskConical, Laptop, ListChecks, Receipt, Users, Video, Wallet } from "lucide-react";
import type { ShowcaseId } from "@/lib/showcase";
import { ScreenShell } from "./mock/ScreenShell";
import { MockListRow } from "./mock/MockListRow";

/** Sample data for the five preview screens (illustration only). */

function CoursesScreen() {
  return (
    <ScreenShell title="Courses" subtitle="Create, manage and organize your courses." action="Create course" tabs={["All Courses", "Published", "Draft", "Archived"]}>
      <MockListRow index={0} thumbIcon={Laptop} thumbClass="from-blue to-purple" title="HSC Physics Complete Course" meta={[{ icon: BookOpen, text: "24 lessons" }, { icon: Users, text: "318 students" }]} status="Published" statusTone="green" />
      <MockListRow index={1} thumbIcon={FlaskConical} thumbClass="from-purple to-red" title="HSC Chemistry" meta={[{ icon: BookOpen, text: "18 lessons" }, { icon: Users, text: "264 students" }]} status="Published" statusTone="green" />
      <MockListRow index={2} thumbIcon={Calculator} thumbClass="from-blue to-green" title="SSC Math" meta={[{ icon: BookOpen, text: "20 lessons" }, { icon: Users, text: "427 students" }]} status="Draft" statusTone="yellow" />
    </ScreenShell>
  );
}

function LiveScreen() {
  return (
    <ScreenShell title="Live Classes" subtitle="Schedule and run classes on Zoom or Google Meet." action="Schedule class" tabs={["Upcoming", "Live now", "Completed"]}>
      <MockListRow index={0} thumbIcon={Video} thumbClass="from-red to-brand-orange" title="Algebra revision" meta={[{ icon: CalendarDays, text: "Today, 7:00 PM" }, { icon: Users, text: "86 joined" }]} status="Live" statusTone="red" />
      <MockListRow index={1} thumbIcon={Atom} thumbClass="from-blue to-purple" title="Physics: Newton's laws" meta={[{ icon: CalendarDays, text: "Tomorrow, 5:00 PM" }, { icon: Clock, text: "60 min" }]} status="Scheduled" statusTone="blue" />
      <MockListRow index={2} thumbIcon={FlaskConical} thumbClass="from-purple to-red" title="Chemistry Q&A" meta={[{ icon: CalendarDays, text: "Fri, 6:30 PM" }, { icon: Clock, text: "45 min" }]} status="Scheduled" statusTone="blue" />
    </ScreenShell>
  );
}

function AssessScreen() {
  return (
    <ScreenShell title="Quizzes" subtitle="Test understanding and track every attempt." action="Create quiz" tabs={["All Quizzes", "Published", "Draft"]}>
      <MockListRow index={0} thumbIcon={ListChecks} thumbClass="from-blue to-green" title="Chapter 3: Motion" meta={[{ icon: ListChecks, text: "15 questions" }, { icon: Users, text: "212 attempts" }]} status="82% avg" statusTone="green" />
      <MockListRow index={1} thumbIcon={Calculator} thumbClass="from-yellow to-brand-orange" title="Algebra practice test" meta={[{ icon: ListChecks, text: "20 questions" }, { icon: Clock, text: "30 min" }]} status="Published" statusTone="green" />
      <MockListRow index={2} thumbIcon={FlaskConical} thumbClass="from-purple to-red" title="Organic chemistry basics" meta={[{ icon: ListChecks, text: "12 questions" }, { icon: Users, text: "Not started" }]} status="Draft" statusTone="yellow" />
    </ScreenShell>
  );
}

function CertificatesScreen() {
  return (
    <ScreenShell title="Certificates" subtitle="Issued automatically when a course is completed." action="New template" tabs={["Issued", "Eligible", "Templates"]}>
      <MockListRow index={0} thumbIcon={Award} thumbClass="from-yellow to-brand-orange" title="Nusrat Jahan · HSC Physics" meta={[{ icon: CalendarDays, text: "Issued Nov 4" }, { icon: Award, text: "EDU-PHY-0142" }]} status="Valid" statusTone="green" />
      <MockListRow index={1} thumbIcon={Award} thumbClass="from-blue to-purple" title="Rafiq Ahmed · SSC Math" meta={[{ icon: CalendarDays, text: "Issued Nov 2" }, { icon: Award, text: "EDU-MTH-0388" }]} status="Valid" statusTone="green" />
      <MockListRow index={2} thumbIcon={Award} thumbClass="from-green to-blue" title="Tania Islam · HSC Chemistry" meta={[{ icon: CalendarDays, text: "Completed today" }, { icon: Clock, text: "Auto-issue" }]} status="Eligible" statusTone="blue" />
    </ScreenShell>
  );
}

function PaymentsScreen() {
  return (
    <ScreenShell title="Payments" subtitle="Every order, refund and payout in one place." action="Create coupon" tabs={["All Orders", "Paid", "Refunded"]}>
      <MockListRow index={0} thumbIcon={Wallet} thumbClass="from-red to-purple" title="৳2,500 · HSC Physics" meta={[{ icon: Receipt, text: "bKash" }, { icon: CalendarDays, text: "Today" }]} status="Paid" statusTone="green" />
      <MockListRow index={1} thumbIcon={Wallet} thumbClass="from-blue to-green" title="৳1,800 · SSC Math" meta={[{ icon: Receipt, text: "SSLCommerz" }, { icon: CalendarDays, text: "Yesterday" }]} status="Paid" statusTone="green" />
      <MockListRow index={2} thumbIcon={Wallet} thumbClass="from-yellow to-brand-orange" title="৳2,200 · HSC Chemistry" meta={[{ icon: Receipt, text: "Stripe" }, { icon: CalendarDays, text: "Nov 3" }]} status="Refunded" statusTone="yellow" />
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
