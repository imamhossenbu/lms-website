import type { LucideIcon } from "lucide-react";
import { Atom, BookMarked, Building2, Compass, GraduationCap, Landmark, Leaf, Lightbulb, Mountain, Sun } from "lucide-react";
import type { ToneKey } from "./content";

/**
 * "Trusted by" logo strip on the home page.
 *
 * ⚠️ PLACEHOLDER DATA — these are made-up institution names, not real customers. Replace them with real
 * customers (with their permission and their own logo files) before the site goes live; showing invented
 * customers to visitors is misleading. Set `SHOW_TRUSTED_BY` to false to hide the strip until then.
 */
export const SHOW_TRUSTED_BY = true;

export interface TrustedOrg {
  name: string;
  /** Placeholder mark until a real logo file is supplied. */
  icon: LucideIcon;
  tone: ToneKey;
}

export const TRUSTED_ORGS: TrustedOrg[] = [
  { name: "Brightpath Academy", icon: Lightbulb, tone: "orange" },
  { name: "Greenleaf School", icon: Leaf, tone: "green" },
  { name: "Nova Coaching", icon: Atom, tone: "blue" },
  { name: "Summit Tutorials", icon: Mountain, tone: "purple" },
  { name: "Sunrise Institute", icon: Sun, tone: "yellow" },
  { name: "Scholars' Hub", icon: BookMarked, tone: "red" },
  { name: "Compass Learning", icon: Compass, tone: "blue" },
  { name: "Heritage College", icon: Landmark, tone: "orange" },
  { name: "Metro Skills Centre", icon: Building2, tone: "green" },
  { name: "Pioneer Academy", icon: GraduationCap, tone: "purple" },
];
