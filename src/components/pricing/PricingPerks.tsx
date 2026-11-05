"use client";

import React from "react";
import { CalendarCheck, CreditCard, RefreshCcw, ShieldCheck } from "lucide-react";
import { PerkList } from "@/components/shared/PerkList";

/** Reassurance row under the plan cards. */
export function PricingPerks({ trialDays }: { trialDays: number }) {
  return (
    <div className="mt-12 flex justify-center">
      <PerkList
        delay={0.2}
        className="justify-center"
        perks={[
          { icon: CalendarCheck, label: trialDays > 0 ? `${trialDays}-day free trial` : "Free trial" },
          { icon: RefreshCcw, label: "Cancel anytime" },
          { icon: CreditCard, label: "bKash, SSLCommerz & Stripe" },
          { icon: ShieldCheck, label: "Secure, daily backups" },
        ]}
      />
    </div>
  );
}

export default PricingPerks;
