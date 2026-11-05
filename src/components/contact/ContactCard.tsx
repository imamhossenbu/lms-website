"use client";

import React, { Suspense } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { ToneBadge } from "@/components/ui/ToneBadge";
import { ContactForm } from "./ContactForm";
import { ContactFormSkeleton } from "./ContactFormSkeleton";

/** The form in a raised card with a header and the reply-time badge. */
export function ContactCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="relative rounded-3xl border border-white bg-white/90 p-6 shadow-2xl shadow-brand-orange/10 backdrop-blur sm:p-8"
    >
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3 border-b border-dash pb-5">
        <div>
          <h2 className="heading-h4 text-primary-500">Send us a message</h2>
          <p className="body-sm-regular mt-1 text-primary-300">Tell us what you teach and how many students you have.</p>
        </div>
        <ToneBadge tone="green" variant="pill" icon={<Clock className="h-3.5 w-3.5" />}>
          Replies within 1 working day
        </ToneBadge>
      </div>
      <Suspense fallback={<ContactFormSkeleton />}>
        <ContactForm />
      </Suspense>
    </motion.div>
  );
}

export default ContactCard;
