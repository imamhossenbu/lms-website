import React from "react";
import { Atom, BookOpenText, Calculator, MoreVertical, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { ToneBadge } from "@/components/ui/ToneBadge";

interface MockCourse {
  title: string;
  status: "Published" | "Draft";
  icon: LucideIcon;
  /** Thumbnail gradient. */
  thumb: string;
}

const COURSES: MockCourse[] = [
  { title: "SSC Math Complete Course", status: "Published", icon: Calculator, thumb: "from-blue to-purple" },
  { title: "HSC Physics (1st Paper)", status: "Published", icon: Atom, thumb: "from-blue to-green" },
  { title: "English for Academic Success", status: "Draft", icon: BookOpenText, thumb: "from-yellow to-brand-orange" },
];

/** "Recent Courses" list of the hero dashboard. */
export function RecentCourses({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-xl border border-dash bg-white p-4 shadow-xs", className)}>
      <span className="body-sm-medium text-primary-500">Recent Courses</span>
      <ul className="mt-3 space-y-3.5">
        {COURSES.map(({ title, status, icon: Icon, thumb }) => (
          <li key={title} className="flex items-center gap-2.5">
            <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-white", thumb)}>
              <Icon className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <span className="body-xsm-medium text-primary-500 block truncate">{title}</span>
              <ToneBadge tone={status === "Published" ? "green" : "orange"} size="sm" className="mt-1">
                {status}
              </ToneBadge>
            </div>
            <MoreVertical className="h-4 w-4 shrink-0 text-primary-300" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentCourses;
