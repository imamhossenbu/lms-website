"use client";

import React from "react";
import { CalendarCheck, Lock, RefreshCcw, ShieldCheck } from "lucide-react";
import { PerkList } from "@/components/shared/PerkList";
import { PaymentLogos } from "@/components/shared/PaymentLogos";

/** Reassurance row under the plan cards, then the payment providers' logos. */
export function PricingPerks({ trialDays }: { trialDays: number }) {
  return (
    <div className="mt-12 flex flex-col items-center gap-6">
      <PerkList
        delay={0.2}
        className="justify-center"
        perks={[
          { icon: CalendarCheck, label: trialDays > 0 ? `${trialDays}-day free trial` : "Free trial" },
          { icon: RefreshCcw, label: "Cancel anytime" },
          { icon: Lock, label: "Secure checkout" },
          { icon: ShieldCheck, label: "Secure, daily backups" },
        ]}
      />
      <PaymentLogos />
    </div>
  );
}

export default PricingPerks;
