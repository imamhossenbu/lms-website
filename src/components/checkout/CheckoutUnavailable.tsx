"use client";

import React from "react";
import { motion } from "framer-motion";
import { CalendarDays, ShoppingBag } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";

/** Shown when plans can't be loaded (API offline): book a demo instead. */
export function CheckoutUnavailable() {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mx-auto flex max-w-lg flex-col items-center rounded-3xl border border-dashed border-brand-orange-20 bg-brand-orange-soft px-6 py-14 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-brand-orange shadow-sm">
        <ShoppingBag className="h-7 w-7" />
      </span>
      <h2 className="heading-h5 mt-5 text-primary-500">Online checkout opens soon</h2>
      <p className="mt-2 body-regular text-primary-300">We&apos;re finishing the setup. Book a demo and we&apos;ll get your academy online with you.</p>
      <ButtonLink href="/contact?topic=DEMO" className="mt-6">
        <CalendarDays className="h-4 w-4" />
        Book a demo
      </ButtonLink>
    </motion.div>
  );
}

export default CheckoutUnavailable;
