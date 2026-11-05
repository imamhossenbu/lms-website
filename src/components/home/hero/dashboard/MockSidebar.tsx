"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, BarChart3, BookOpen, ClipboardCheck, CreditCard, FileText, LayoutDashboard, Settings, Users, Video } from "lucide-react";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/layout/Logo";

const ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: BookOpen, label: "Courses" },
  { icon: Video, label: "Live Classes" },
  { icon: Users, label: "Students" },
  { icon: ClipboardCheck, label: "Quizzes" },
  { icon: FileText, label: "Assignments" },
  { icon: Award, label: "Certificates" },
  { icon: CreditCard, label: "Payments" },
  { icon: BarChart3, label: "Analytics" },
  { icon: Settings, label: "Team Settings" },
];

/** Admin panel sidebar for the hero illustration (first item active). */
export function MockSidebar() {
  return (
    <aside className="hidden sm:flex w-40 shrink-0 flex-col gap-1 border-r border-dash bg-white px-2.5 py-4">
      <Logo size="sm" asLink={false} className="px-2 pb-4" />
      {ITEMS.map(({ icon: Icon, label }, i) => (
        <motion.span
          key={label}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.55 + i * 0.04 }}
          className={cn(
            "flex items-center gap-2.5 rounded-lg px-3 py-2 body-xsm-medium whitespace-nowrap",
            i === 0 ? "bg-gradient-to-r from-brand-orange to-brand-orange-hover text-white shadow-sm shadow-brand-orange/30" : "text-primary-400"
          )}
        >
          <Icon className="h-3.5 w-3.5" />
          {label}
        </motion.span>
      ))}
    </aside>
  );
}

export default MockSidebar;
