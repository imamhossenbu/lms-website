import React from "react";
import { Logo } from "@/components/layout/Logo";
import { MiniWindow } from "@/components/ui/MiniWindow";
import { ClickingCursor } from "@/components/motion/ClickingCursor";

/** Step 1: the sign-up form (logo, two fields, the orange button being clicked). */
export function SignupIllustration() {
  return (
    <div className="relative mx-auto w-4/5">
      {/* Accent strokes. */}
      <div className="absolute -right-2 -top-6" aria-hidden>
        <span className="absolute left-0 top-0 h-4 w-1 rounded-full bg-brand-orange" />
        <span className="absolute left-3 top-1.5 h-4 w-1 rotate-45 rounded-full bg-brand-orange" />
        <span className="absolute left-5 top-6 h-1 w-4 -rotate-12 rounded-full bg-brand-orange" />
      </div>
      <MiniWindow>
        <div className="flex flex-col items-center gap-2.5 px-6 pb-5 pt-4">
          <Logo size="sm" asLink={false} />
          <span className="block h-6 w-full rounded-md bg-slate-100" />
          <span className="block h-6 w-full rounded-md bg-slate-100" />
          <span className="relative block h-6 w-full rounded-md bg-gradient-to-r from-brand-orange to-brand-orange-hover">
            <ClickingCursor className="absolute -bottom-3 right-2" />
          </span>
        </div>
      </MiniWindow>
    </div>
  );
}

export default SignupIllustration;
