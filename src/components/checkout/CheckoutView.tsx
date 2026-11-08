"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CheckCircle2, Eye, EyeOff, Loader2, Lock, XCircle } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/cn";
import type { Plan } from "@/lib/plans";
import { ACADEMY_TYPES, COUNTRIES, ROOT_DOMAIN, SLUG_RE, checkSlug, checkoutSchema, fetchQuote, startCheckout, usd, type CheckoutQuote, type CheckoutValues } from "@/lib/checkout";
import { InputField } from "@/components/ui/InputField";
import { PrimaryButton } from "@/components/ui/primary-button";
import { CheckoutSteps } from "./CheckoutSteps";
import { OrderSummary } from "./OrderSummary";

const selectCls = "h-11 w-full rounded-lg border bg-white px-3 body-sm-regular text-primary-500 outline-none transition-colors focus:border-brand-orange";
const card = "rounded-3xl border border-dash bg-white p-6 shadow-sm sm:p-8";
const toSlug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 32)
    .replace(/-+$/, "");

/**
 * /checkout: academy + account details (rhf + zod, subdomain availability, password show/hide) beside the order
 * summary. Plan and cycle live in the URL (?plan=&cycle=). Paying opens SSLCommerz; the academy is created only
 * after the gateway confirms the payment. Render inside <Suspense>.
 */
export function CheckoutView({ plans }: { plans: Plan[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const planId = plans.some((p) => p.id === params.get("plan")) ? params.get("plan")! : (plans.find((p) => p.highlighted) ?? plans[0]).id;
  const cycle = params.get("cycle") === "YEARLY" ? "YEARLY" : "MONTHLY";

  const setUrl = (next: { plan?: string; cycle?: string }) => {
    const sp = new URLSearchParams(params.toString());
    Object.entries(next).forEach(([k, v]) => v && sp.set(k, v));
    router.replace(`${pathname}?${sp}`, { scroll: false });
  };

  const {
    register,
    control,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    mode: "onTouched",
    defaultValues: { institutionName: "", type: "COACHING", slug: "", country: "Bangladesh", name: "", email: "", phone: "", password: "", agreeTerms: false },
  });
  const [institutionName, slug, country] = useWatch({ control, name: ["institutionName", "slug", "country"] });
  const [showPassword, setShowPassword] = useState(false);
  /** Subdomain typed by hand (then it stops following the academy name). */
  const [slugEdited, setSlugEdited] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  // Subdomain follows the academy name until edited by hand.
  useEffect(() => {
    if (!slugEdited) setValue("slug", toSlug(institutionName ?? ""), { shouldValidate: false });
  }, [institutionName, slugEdited, setValue]);

  // Live price + tax for plan / cycle / country.
  const [quote, setQuote] = useState<CheckoutQuote | null>(null);
  const [quoteError, setQuoteError] = useState<string | null>(null);
  const [quoting, setQuoting] = useState(true);
  useEffect(() => {
    const ctrl = new AbortController();
    const t = window.setTimeout(() => {
      setQuoting(true);
      fetchQuote(planId, cycle, country, ctrl.signal)
        .then((q) => {
          setQuote(q);
          setQuoteError(null);
        })
        .catch((e) => !ctrl.signal.aborted && setQuoteError(e instanceof Error ? e.message : "Couldn't price this plan."))
        .finally(() => !ctrl.signal.aborted && setQuoting(false));
    }, 150);
    return () => {
      ctrl.abort();
      window.clearTimeout(t);
    };
  }, [planId, cycle, country]);

  // Subdomain availability (debounced).
  const [slugState, setSlugState] = useState<{ slug: string; available: boolean; reason?: string } | null>(null);
  useEffect(() => {
    const s = (slug ?? "").trim();
    if (!SLUG_RE.test(s)) return;
    const ctrl = new AbortController();
    const t = window.setTimeout(() => {
      checkSlug(s, ctrl.signal)
        .then((r) => setSlugState({ slug: s, ...r }))
        .catch(() => undefined);
    }, 400);
    return () => {
      ctrl.abort();
      window.clearTimeout(t);
    };
  }, [slug]);
  const slugStatus = slugState && slugState.slug === (slug ?? "").trim() ? slugState : null;

  const onSubmit = async (values: CheckoutValues) => {
    if (slugStatus && !slugStatus.available) {
      setError("slug", { message: slugStatus.reason ?? "This subdomain is taken" });
      return;
    }
    const id = toast.loading("Opening secure payment...", { description: "You'll be taken to SSLCommerz to pay." });
    try {
      const { gatewayUrl } = await startCheckout({ ...values, planId, cycle });
      toast.success("Redirecting to SSLCommerz", { id, description: "Complete the payment to create your academy." });
      setRedirecting(true);
      window.location.assign(gatewayUrl);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Please try again.";
      if (/subdomain/i.test(msg)) setError("slug", { message: msg });
      if (/email/i.test(msg)) setError("email", { message: msg });
      toast.error("Couldn't start the payment", { id, description: msg });
    }
  };

  const busy = isSubmitting || redirecting;
  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, ease: "easeOut" }}>
      <CheckoutSteps current={0} />
      <form noValidate onSubmit={handleSubmit(onSubmit, () => toast.error("Check the highlighted fields", { description: "A few details are missing." }))} className="mt-12 grid items-start gap-8 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-7">
          <section className={card}>
            <h2 className="heading-h5 text-primary-500">Your academy</h2>
            <p className="body-sm-regular mt-1 text-primary-300">This is how students and staff will see you.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <InputField id="co-academy" label="Academy name" required placeholder="e.g. Pathshala Coaching Centre" error={errors.institutionName?.message} {...register("institutionName")} />
              <div>
                <label htmlFor="co-type" className="mb-1.5 block body-sm-regular text-primary-400">
                  Type <span className="text-red">*</span>
                </label>
                <select id="co-type" className={cn(selectCls, errors.type ? "border-red" : "border-dash")} {...register("type")}>
                  {ACADEMY_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <InputField
                  id="co-slug"
                  label="Your academy's address"
                  required
                  placeholder="pathshala"
                  error={errors.slug?.message ?? (slugStatus && !slugStatus.available ? slugStatus.reason : undefined)}
                  rightElement={
                    <span className="flex items-center gap-2 whitespace-nowrap body-sm-regular text-primary-300">
                      .{ROOT_DOMAIN}
                      {slugStatus && (slugStatus.available ? <CheckCircle2 className="h-4 w-4 text-green" aria-label="Available" /> : <XCircle className="h-4 w-4 text-red" aria-label="Taken" />)}
                    </span>
                  }
                  {...register("slug", { onChange: () => setSlugEdited(true) })}
                />
                {slugStatus?.available && !errors.slug && <p className="mt-1 body-xsm-regular text-green">Great — {slug}.{ROOT_DOMAIN} is available.</p>}
              </div>
              <div>
                <label htmlFor="co-country" className="mb-1.5 block body-sm-regular text-primary-400">
                  Country <span className="text-red">*</span>
                </label>
                <select id="co-country" className={cn(selectCls, errors.country ? "border-red" : "border-dash")} {...register("country")}>
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          <section className={card}>
            <h2 className="heading-h5 text-primary-500">Your account</h2>
            <p className="body-sm-regular mt-1 text-primary-300">You&apos;ll be the academy&apos;s owner and sign in with these details.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <InputField id="co-name" label="Your name" required placeholder="e.g. Tanvir Hasan" autoComplete="name" error={errors.name?.message} {...register("name")} />
              <InputField id="co-phone" label="Phone" required placeholder="+880 1XXX-XXXXXX" autoComplete="tel" error={errors.phone?.message} {...register("phone")} />
              <InputField id="co-email" label="Work email" required type="email" placeholder="you@academy.com" autoComplete="email" error={errors.email?.message} {...register("email")} />
              <InputField
                id="co-password"
                label="Password"
                required
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="8+ characters, a letter and a number"
                error={errors.password?.message}
                rightElement={
                  <button type="button" onClick={() => setShowPassword((v) => !v)} className="text-primary-300 hover:text-brand-orange" aria-label={showPassword ? "Hide password" : "Show password"}>
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                }
                {...register("password")}
              />
            </div>
          </section>

          <section className={card}>
            <Controller
              control={control}
              name="agreeTerms"
              render={({ field }) => (
                <label className="flex cursor-pointer items-start gap-3 body-sm-regular text-primary-400">
                  <input type="checkbox" checked={field.value} onChange={(e) => field.onChange(e.target.checked)} onBlur={field.onBlur} className="mt-0.5 h-4 w-4 accent-brand-orange" />
                  <span>
                    I agree to the{" "}
                    <Link href="/terms" target="_blank" className="text-brand-orange hover:underline">
                      Terms of Service
                    </Link>
                    ,{" "}
                    <Link href="/privacy" target="_blank" className="text-brand-orange hover:underline">
                      Privacy Policy
                    </Link>{" "}
                    and{" "}
                    <Link href="/refund-policy" target="_blank" className="text-brand-orange hover:underline">
                      Refund Policy
                    </Link>
                    .
                  </span>
                </label>
              )}
            />
            {errors.agreeTerms && <p className="mt-1.5 body-xsm-regular text-red">{errors.agreeTerms.message}</p>}
            <PrimaryButton type="submit" size="lg" isLoading={busy} disabled={busy || !quote} className="mt-6 w-full" icon={<Lock className="h-4 w-4" />}>
              {redirecting ? "Redirecting to SSLCommerz..." : isSubmitting ? "Opening secure payment..." : quote ? `Pay ${usd(quote.total)} securely` : "Pay securely"}
            </PrimaryButton>
            <p className="mt-3 flex items-center justify-center gap-1.5 body-xsm-regular text-primary-300">
              {busy && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              Your academy is created as soon as the payment is confirmed.
            </p>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:col-span-5">
          <OrderSummary
            plans={plans}
            planId={planId}
            cycle={cycle}
            country={country ?? "Bangladesh"}
            quote={quote}
            quoting={quoting}
            quoteError={quoteError}
            onPlan={(id) => setUrl({ plan: id })}
            onCycle={(c) => setUrl({ cycle: c })}
          />
        </aside>
      </form>
    </motion.div>
  );
}

export default CheckoutView;
