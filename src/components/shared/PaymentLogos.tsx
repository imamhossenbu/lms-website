"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { PaymentLogo, type PaymentMethod } from "@/components/ui/PaymentLogo";

const ALL: PaymentMethod[] = ["bkash", "nagad", "sslcommerz", "stripe"];

/** "Students pay with" + the payment providers' logos on white tiles that pop in and lift on hover. */
export function PaymentLogos({ label = "Students pay with", methods = ALL, className, align = "center" }: { label?: string; methods?: PaymentMethod[]; className?: string; align?: "center" | "left" }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", align === "center" ? "justify-center" : "justify-start", className)}>
      {label && <span className="body-sm-medium text-primary-400">{label}</span>}
      {methods.map((m, i) => (
        <motion.span
          key={m}
          initial={{ opacity: 0, y: 8, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.1 + i * 0.07 }}
          whileHover={{ y: -3 }}
          className="inline-flex h-12 items-center rounded-xl border border-dash bg-white px-4 shadow-xs"
        >
          <PaymentLogo method={m} />
        </motion.span>
      ))}
    </div>
  );
}

export default PaymentLogos;
