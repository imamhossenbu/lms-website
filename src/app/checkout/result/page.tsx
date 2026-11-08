import React from "react";
import type { Metadata } from "next";
import { SearchX } from "lucide-react";
import { getCheckoutResult } from "@/lib/checkout";
import { CheckoutResultView } from "@/components/checkout/CheckoutResultView";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata: Metadata = { title: "Checkout result", robots: { index: false } };
export const dynamic = "force-dynamic";

/** /checkout/result?ref= — where SSLCommerz sends the browser back (via the API) after paying, failing or cancelling. */
export default async function CheckoutResultPage({ searchParams }: { searchParams: Promise<{ ref?: string }> }) {
  const ref = ((await searchParams).ref ?? "").slice(0, 64);
  const result = await getCheckoutResult(ref);
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-brand-orange-soft via-white to-white">
      <div className="absolute -right-32 -top-24 -z-10 h-112 w-112 rounded-full bg-brand-orange-20 blur-3xl" aria-hidden />
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-14 sm:px-6">
        {result ? (
          <CheckoutResultView result={result} />
        ) : (
          <div className="mx-auto flex max-w-lg flex-col items-center rounded-3xl border border-dashed border-brand-orange-20 bg-white px-6 py-14 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-orange-light text-brand-orange">
              <SearchX className="h-7 w-7" />
            </span>
            <h1 className="heading-h5 mt-5 text-primary-500">We couldn&apos;t find this checkout</h1>
            <p className="mt-2 body-regular text-primary-300">The link may be incomplete. If you paid, contact us with your payment reference and we&apos;ll sort it out.</p>
            <ButtonLink href="/contact?topic=SUPPORT" className="mt-6">
              Contact support
            </ButtonLink>
          </div>
        )}
      </div>
    </section>
  );
}
