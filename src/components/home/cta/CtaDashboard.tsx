"use client";

import React from "react";
import { ArrowUp, Bell, CalendarDays, PlayCircle, Search, Users } from "lucide-react";
import { MockSidebar } from "@/components/home/hero/dashboard/MockSidebar";
import { MockKpiCard } from "@/components/home/hero/dashboard/MockKpiCard";
import { EnrolmentChart } from "@/components/home/hero/dashboard/EnrolmentChart";
import { ToneBadge } from "@/components/ui/ToneBadge";

/** Admin dashboard drawn inside the closing-banner device: search bar, welcome line, three KPIs and the enrolment chart. */
export function CtaDashboard() {
  return (
    <div className="flex bg-gray-bg" aria-hidden>
      <MockSidebar />
      <div className="min-w-0 flex-1 space-y-3.5 p-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 flex-1 items-center gap-2 rounded-full border border-dash bg-white px-3 body-2xsm-regular text-primary-300">
            <Search className="h-3.5 w-3.5" />
            Search courses, students…
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-dash bg-white text-primary-400">
            <Bell className="h-4 w-4" />
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-orange to-yellow body-xsm-medium text-white">TH</span>
        </div>
        <div>
          <span className="heading-h5 block font-bold text-primary-500">Welcome back! 👋</span>
          <span className="body-2xsm-regular text-primary-300">Here&apos;s how your academy is doing this week.</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <MockKpiCard icon={Users} tone="green" value={1284} label="Students" index={0} />
          <MockKpiCard icon={PlayCircle} tone="blue" value={36} label="Courses" index={1} />
          <MockKpiCard icon={CalendarDays} tone="purple" value={12} label="Live Classes" index={2} />
        </div>
        <EnrolmentChart
          title="Course Enrollments"
          badge={
            <ToneBadge tone="green" size="sm" icon={<ArrowUp className="h-3 w-3" />}>
              +18%
            </ToneBadge>
          }
        />
      </div>
    </div>
  );
}

export default CtaDashboard;
