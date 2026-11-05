import React from "react";
import { CloudUpload, FileText, ListChecks, MousePointer2, Play } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ToneKey } from "@/lib/content";
import { ToneIcon } from "@/components/shared/ToneIcon";
import { GhostLine, MiniWindow } from "@/components/ui/MiniWindow";

const ROWS: { icon: LucideIcon; tone: ToneKey }[] = [
  { icon: Play, tone: "blue" },
  { icon: FileText, tone: "red" },
  { icon: ListChecks, tone: "blue" },
];

/** Step 2: a lesson list (video, PDF, quiz) and a dashed upload box with the cursor. */
export function ContentIllustration() {
  return (
    <MiniWindow className="mx-auto w-4/5">
      <div className="flex items-center gap-4 p-4">
        <ul className="flex-1 space-y-2.5">
          {ROWS.map(({ icon, tone }, i) => (
            <li key={i} className="flex items-center gap-2.5">
              <ToneIcon icon={icon} tone={tone} size="sm" />
              <div className="flex-1 space-y-1.5">
                <GhostLine className="w-4/5" />
                <GhostLine className="w-1/2 bg-slate-100" />
              </div>
            </li>
          ))}
        </ul>
        <div className="relative flex h-16 w-20 shrink-0 items-center justify-center rounded-lg border-2 border-dashed border-blue/40 bg-blue-14">
          <CloudUpload className="h-6 w-6 text-blue" />
          <MousePointer2 className="absolute -bottom-3 -right-2 h-5 w-5 fill-white text-primary-500" />
        </div>
      </div>
    </MiniWindow>
  );
}

export default ContentIllustration;
