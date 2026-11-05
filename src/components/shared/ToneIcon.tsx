import React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import type { ToneKey } from "@/lib/content";

const TONES: Record<ToneKey, string> = {
  orange: "bg-brand-orange-light text-brand-orange",
  blue: "bg-blue-14 text-blue",
  green: "bg-green-bg text-green",
  purple: "bg-purple-14 text-purple",
  yellow: "bg-yellow-bg text-yellow",
  red: "bg-red-14 text-red",
};

/** Rounded square with a tinted icon (feature cards, lists). */
export function ToneIcon({ icon: Icon, tone, size = "md", className }: { icon: LucideIcon; tone: ToneKey; size?: "sm" | "md" | "lg"; className?: string }) {
  const box = size === "lg" ? "h-14 w-14 rounded-2xl" : size === "sm" ? "h-9 w-9 rounded-lg" : "h-11 w-11 rounded-xl";
  const ic = size === "lg" ? "h-7 w-7" : size === "sm" ? "h-4 w-4" : "h-5 w-5";
  return (
    <span className={cn("flex shrink-0 items-center justify-center", box, TONES[tone], className)}>
      <Icon className={ic} />
    </span>
  );
}

export default ToneIcon;
