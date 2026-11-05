import React from "react";
import { Award, Bell, CalendarDays, PlayCircle, Users } from "lucide-react";
import { MockSidebar } from "./MockSidebar";
import { MockKpiCard } from "./MockKpiCard";
import { EnrolmentChart } from "./EnrolmentChart";
import { RecentCourses } from "./RecentCourses";

/**
 * The admin dashboard as drawn in the hero: sidebar, welcome header, 4 KPI tiles, enrolment chart and recent
 * courses. An illustration with sample numbers, built from the design tokens (not a screenshot).
 */
export function DashboardMock() {
  return (
    <div className="flex bg-gray-bg" aria-hidden>
      <MockSidebar />
      <div className="min-w-0 flex-1 space-y-3.5 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="heading-h5 font-bold text-primary-500 block">Welcome back!</span>
            <span className="body-2xsm-regular text-primary-300">Here&apos;s what&apos;s happening in your academy.</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-dash bg-white text-primary-400">
              <Bell className="h-4 w-4" />
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-orange to-yellow body-xsm-medium text-white">NJ</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <MockKpiCard icon={Users} tone="green" value="1,248" label="Students" />
          <MockKpiCard icon={PlayCircle} tone="blue" value="24" label="Courses" />
          <MockKpiCard icon={CalendarDays} tone="purple" value="12" label="Live Classes" />
          <MockKpiCard icon={Award} tone="yellow" value="986" label="Certificates" />
        </div>
        <div className="grid gap-3 lg:grid-cols-9">
          <EnrolmentChart className="lg:col-span-4" />
          <RecentCourses className="lg:col-span-5" />
        </div>
      </div>
    </div>
  );
}

export default DashboardMock;
