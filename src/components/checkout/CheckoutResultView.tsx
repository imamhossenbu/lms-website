"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock, Copy, Loader2, MailCheck, RotateCcw, XCircle } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/cn";
import { PANEL_URL } from "@/lib/site";
import { checkoutUrl, usd, type CheckoutResult } from "@/lib/checkout";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ToneBadge } from "@/components/ui/ToneBadge";
import { CheckoutSteps } from "./CheckoutSteps";

const STATES = {
  PAID: { icon: CheckCircle2, tone: "green" as const, ring: "bg-green-bg text-green", title: "Payment received — your academy is ready!", text: "Thanks for choosing EduPro. One last step: confirm your email to sign in." },
  PENDING: { icon: Clock, tone: "blue" as const, ring: "bg-blue-14 text-blue", title: "Confirming your payment…", text: "This usually takes a few seconds. Please keep this page open." },
  FAILED: { icon: XCircle, tone: "red" as const, ring: "bg-red-14 text-red", title: "The payment didn't go through", text: "No academy was created. You can try again — nothing was charged twice." },
  CANCELLED: { icon: XCircle, tone: "gray" as const, ring: "bg-gray-bg text-primary-400", title: "Payment cancelled", text: "You left the payment page before paying. Your details weren't saved as an academy." },
};

/** Floating dots behind the success icon. */
function Burst() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <>
      {Array.from({ length: 10 }, (_, i) => {
        const a = (i / 10) * Math.PI * 2;
        return (
          <motion.span
            key={i}
            className={cn("absolute left-1/2 top-1/2 h-2 w-2 rounded-full", i % 3 === 0 ? "bg-brand-orange" : i % 3 === 1 ? "bg-green" : "bg-yellow")}
            initial={{ x: 0, y: 0, opacity: 1, scale: 0.5 }}
            animate={{ x: Math.cos(a) * 70, y: Math.sin(a) * 70, opacity: 0, scale: 1 }}
            transition={{ duration: 1.1, ease: "easeOut", delay: 0.3 }}
          />
        );
      })}
    </>
  );
}

/** The checkout outcome. A pending payment re-checks every 3 s (up to a minute). */
export function CheckoutResultView({ result }: { result: CheckoutResult }) {
  const router = useRouter();
  const [tries, setTries] = useState(0);
  const pending = result.status === "PENDING";
  useEffect(() => {
    if (!pending || tries >= 20) return;
    const t = window.setTimeout(() => {
      setTries((n) => n + 1);
      router.refresh();
    }, 3000);
    return () => window.clearTimeout(t);
  }, [pending, tries, router]);

  const s = STATES[result.status];
  const Icon = s.icon;
  const paid = result.status === "PAID";
  const details = [
    { label: "Academy", value: result.institutionName },
    { label: "Address", value: result.subdomain },
    { label: "Plan", value: `${result.planName} · ${result.cycle === "YEARLY" ? "yearly" : "monthly"}` },
    { label: paid ? "Paid" : "Amount", value: `${usd(result.total)} ${result.currency}` },
    { label: "Account email", value: result.email },
  ];
  const copyRef = async () => {
    try {
      await navigator.clipboard.writeText(result.reference);
      toast.success("Reference copied", { description: result.reference });
    } catch {
      toast.error("Couldn't copy", { description: "Select the reference and copy it instead." });
    }
  };

  return (
    <div>
      <CheckoutSteps current={paid ? 2 : 1} />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="mx-auto mt-12 max-w-2xl rounded-3xl border border-dash bg-white p-8 text-center shadow-xl shadow-brand-orange/5 sm:p-10">
        <div className="relative mx-auto h-20 w-20">
          {paid && <Burst />}
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.1 }} className={cn("flex h-20 w-20 items-center justify-center rounded-3xl", s.ring)}>
            {pending ? <Loader2 className="h-10 w-10 animate-spin" /> : <Icon className="h-10 w-10" />}
          </motion.span>
        </div>
        <h2 className="heading-h3 mt-6 text-primary-500">{s.title}</h2>
        <p className="mx-auto mt-2 max-w-md body-regular text-primary-300">{result.error && !paid ? result.error : s.text}</p>

        <dl className="mt-8 divide-y divide-dash rounded-2xl border border-dash text-left">
          {details.map((d) => (
            <div key={d.label} className="flex items-center justify-between gap-4 px-5 py-3">
              <dt className="body-sm-regular text-primary-300">{d.label}</dt>
              <dd className="body-sm-medium text-right text-primary-500">{d.value}</dd>
            </div>
          ))}
          <div className="flex items-center justify-between gap-4 px-5 py-3">
            <dt className="body-sm-regular text-primary-300">Reference</dt>
            <dd className="flex items-center gap-2">
              <ToneBadge tone={s.tone} size="sm" variant="pill">
                {result.status === "PAID" ? "Paid" : result.status === "PENDING" ? "Confirming" : result.status === "CANCELLED" ? "Cancelled" : "Failed"}
              </ToneBadge>
              <button type="button" onClick={copyRef} className="inline-flex items-center gap-1 body-xsm-medium text-primary-400 hover:text-brand-orange" aria-label="Copy reference">
                {result.reference}
                <Copy className="h-3.5 w-3.5" />
              </button>
            </dd>
          </div>
        </dl>

        {paid && (
          <div className="mt-6 flex items-start gap-3 rounded-2xl bg-brand-orange-soft p-5 text-left">
            <MailCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" />
            <p className="body-sm-regular text-primary-400">
              We emailed a 6-digit code to <span className="font-medium text-primary-500">{result.email}</span>. Enter it on the next screen, then sign in with the password you chose.
            </p>
          </div>
        )}

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          {paid ? (
            <ButtonLink href={PANEL_URL ? `${PANEL_URL}/verify-email` : "/contact?topic=SUPPORT"} size="lg" icon={<ArrowRight className="h-4 w-4" />}>
              Verify email & sign in
            </ButtonLink>
          ) : pending ? null : (
            <ButtonLink href={checkoutUrl(result.planId, result.cycle)} size="lg">
              <RotateCcw className="h-4 w-4" />
              Try again
            </ButtonLink>
          )}
          <ButtonLink href={paid ? "/" : "/contact?topic=SUPPORT"} variant="secondary" size="lg">
            {paid ? "Back to the website" : "Contact support"}
          </ButtonLink>
        </div>
      </motion.div>
    </div>
  );
}

export default CheckoutResultView;
