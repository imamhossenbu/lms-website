import React from "react";
import { Mic, PhoneOff, Play, UserRound, Video } from "lucide-react";
import { cn } from "@/lib/cn";
import { GhostLine, MiniWindow } from "@/components/ui/MiniWindow";

const PARTICIPANTS = ["from-blue to-purple", "from-green to-blue", "from-purple to-red", "from-yellow to-brand-orange"];

/** Step 3: a live class — the teacher's video with a LIVE badge and call controls, and the attendee list. */
export function LiveClassIllustration() {
  return (
    <MiniWindow className="mx-auto w-11/12">
      <div className="flex gap-3 p-3">
        <div className="relative flex flex-1 flex-col overflow-hidden rounded-lg bg-gradient-to-br from-slate-200 to-slate-100">
          <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-md bg-red px-1.5 py-0.5 body-2xsm-regular text-white whitespace-nowrap">
            <Play className="h-2.5 w-2.5 fill-white" /> Live
          </span>
          <div className="flex flex-1 items-end justify-center pt-6">
            <span className="flex h-16 w-16 items-end justify-center overflow-hidden rounded-t-full bg-gradient-to-b from-brand-navy to-primary-400">
              <UserRound className="h-12 w-12 translate-y-2 text-white/90" />
            </span>
          </div>
          <div className="flex items-center justify-center gap-2 bg-brand-navy py-1.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/15 text-white">
              <Mic className="h-3 w-3" />
            </span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/15 text-white">
              <Video className="h-3 w-3" />
            </span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red text-white">
              <PhoneOff className="h-3 w-3" />
            </span>
          </div>
        </div>
        <ul className="w-2/5 space-y-2.5 py-1">
          {PARTICIPANTS.map((g) => (
            <li key={g} className="flex items-center gap-2">
              <span className={cn("h-6 w-6 shrink-0 rounded-full bg-gradient-to-br", g)} />
              <div className="flex-1 space-y-1">
                <GhostLine className="w-full" />
                <GhostLine className="w-2/3 bg-slate-100" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </MiniWindow>
  );
}

export default LiveClassIllustration;
