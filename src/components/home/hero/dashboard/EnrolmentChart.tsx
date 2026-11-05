"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
/** Enrolments per point (0–1000 scale), two points per month. */
const VALUES = [130, 230, 300, 280, 330, 420, 560, 520, 640, 760, 880, 960];
const TICKS = [1000, 750, 500, 250, 0];
const W = 300;
const H = 120;

const x = (i: number) => (i / (VALUES.length - 1)) * W;
const y = (v: number) => H - (v / 1000) * H;

/** Smooth line through the points (Catmull-Rom → cubic Bézier). */
function smoothPath(pts: [number, number][]) {
  return pts.reduce((d, [px, py], i, a) => {
    if (i === 0) return `M ${px} ${py}`;
    const [x0, y0] = a[i - 2] ?? a[i - 1];
    const [x1, y1] = a[i - 1];
    const [x3, y3] = a[i + 1] ?? [px, py];
    const c1 = [x1 + (px - x0) / 6, y1 + (py - y0) / 6];
    const c2 = [px - (x3 - x1) / 6, py - (y3 - y1) / 6];
    return `${d} C ${c1[0]} ${c1[1]}, ${c2[0]} ${c2[1]}, ${px} ${py}`;
  }, "");
}

/** "Student Enrolments" line + area chart of the hero dashboard (draws itself in). */
export function EnrolmentChart({ className }: { className?: string }) {
  const pts = VALUES.map((v, i) => [x(i), y(v)] as [number, number]);
  const line = smoothPath(pts);
  const area = `${line} L ${W} ${H} L 0 ${H} Z`;
  const [lx, ly] = pts[pts.length - 1];

  return (
    <div className={cn("rounded-xl border border-dash bg-white p-4 shadow-xs", className)}>
      <span className="body-sm-medium text-primary-500">Student Enrolments</span>
      <div className="mt-3 flex gap-2">
        <div className="flex flex-col justify-between pb-5 body-2xsm-regular text-primary-300 text-right">
          {TICKS.map((t) => (
            <span key={t}>{t.toLocaleString("en-US")}</span>
          ))}
        </div>
        <div className="flex-1 min-w-0">
          <svg viewBox={`0 0 ${W} ${H}`} className="h-32 w-full overflow-visible text-brand-orange" preserveAspectRatio="none" aria-hidden>
            <defs>
              <linearGradient id="enrol-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.22" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path d={area} fill="url(#enrol-fill)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.9 }} />
            <motion.path
              d={line}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
            />
            <motion.circle cx={lx} cy={ly} r="4" fill="currentColor" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5, type: "spring", stiffness: 300 }} />
          </svg>
          <div className="mt-1.5 flex justify-between body-2xsm-regular text-primary-300">
            {MONTHS.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnrolmentChart;
