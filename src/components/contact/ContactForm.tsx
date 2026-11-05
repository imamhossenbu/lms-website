"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/cn";
import { API_URL } from "@/lib/site";
import { InputField } from "@/components/ui/InputField";
import { PrimaryButton } from "@/components/ui/primary-button";
import { SIZES, TOPICS, contactSchema, type ContactValues } from "./contactSchema";

const selectCls = "w-full h-11 rounded-lg border bg-white px-3 body-sm-regular text-primary-500 outline-none transition-all focus:border-brand-orange";

const asTopic = (v: string | null) => (TOPICS.some((t) => t.value === v) ? (v as ContactValues["topic"]) : null);

/**
 * Contact / demo form → POST /saas/public/contact. The topic is kept in sync with `?topic=DEMO|SALES|…` both ways
 * (topic cards on the page change it, and picking a topic updates the URL). Render inside <Suspense>.
 */
export function ContactForm() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const urlTopic = asTopic(params.get("topic"));
  const initialTopic = urlTopic ?? "DEMO";
  const [sent, setSent] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: { name: "", email: "", phone: "", institutionName: "", studentCount: "", topic: initialTopic, message: "", website: "" },
  });

  // URL → form (topic cards / back button).
  useEffect(() => {
    if (urlTopic) setValue("topic", urlTopic, { shouldValidate: true });
  }, [urlTopic, setValue]);

  const topicField = register("topic");
  const onTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    void topicField.onChange(e);
    const q = new URLSearchParams(params.toString());
    q.set("topic", e.target.value);
    router.replace(`${pathname}?${q.toString()}`, { scroll: false });
  };

  const onSubmit = async (values: ContactValues) => {
    const id = toast.loading("Sending your message...", { description: "This only takes a moment." });
    try {
      const res = await fetch(`${API_URL}/saas/public/contact`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { message?: string | string[] } | null;
        const msg = [body?.message].flat().filter(Boolean)[0];
        throw new Error(res.status === 429 ? "Too many messages in a short time. Please try again in a minute." : msg || "Please check the form and try again.");
      }
      toast.success("Message sent", { id, description: "Thanks! We'll get back to you within one working day." });
      setSent(values.name.split(" ")[0]);
      reset();
    } catch (err) {
      toast.error("Couldn't send your message", { id, description: err instanceof Error ? err.message : "Please try again." });
    }
  };

  return (
    <AnimatePresence mode="wait">
      {sent !== null ? (
        <motion.div key="done" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="py-6 text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-green" />
          <h2 className="heading-h4 text-primary-500 mt-4">Thanks{sent ? `, ${sent}` : ""}!</h2>
          <p className="body-regular text-primary-300 mt-2">Your message is with our team. We&apos;ll reply by email within one working day.</p>
          <button type="button" onClick={() => setSent(null)} className="mt-6 body-sm-medium text-brand-orange hover:underline">
            Send another message
          </button>
        </motion.div>
      ) : (
        <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <InputField id="contact-name" label="Your name" required placeholder="e.g. Nusrat Jahan" autoComplete="name" error={errors.name?.message} {...register("name")} />
            <InputField id="contact-email" label="Work email" required type="email" placeholder="you@school.edu.bd" autoComplete="email" error={errors.email?.message} {...register("email")} />
            <InputField id="contact-phone" label="Phone" placeholder="+880 1XXX-XXXXXX" autoComplete="tel" error={errors.phone?.message} {...register("phone")} />
            <InputField id="contact-institution" label="Institution" placeholder="School or coaching centre" autoComplete="organization" error={errors.institutionName?.message} {...register("institutionName")} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-topic" className="mb-1.5 block body-sm-regular text-primary-400">
                What would you like to talk about? <span className="text-red">*</span>
              </label>
              <select id="contact-topic" className={cn(selectCls, errors.topic ? "border-red" : "border-dash")} {...topicField} onChange={onTopicChange}>
                {TOPICS.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="contact-size" className="mb-1.5 block body-sm-regular text-primary-400">
                How many students?
              </label>
              <select id="contact-size" className={cn(selectCls, "border-dash")} {...register("studentCount")}>
                {SIZES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="contact-message" className="mb-1.5 block body-sm-regular text-primary-400">
              Message <span className="text-red">*</span>
            </label>
            <textarea
              id="contact-message"
              rows={5}
              placeholder="Tell us about your academy and what you need..."
              className={cn("w-full rounded-lg border p-3 body-sm-regular text-primary-500 outline-none transition-all placeholder:text-primary-300 focus:border-brand-orange resize-none", errors.message ? "border-red" : "border-dash")}
              {...register("message")}
            />
            {errors.message && <p className="mt-1 body-2xsm-regular text-red">{errors.message.message}</p>}
          </div>
          {/* Honeypot: off-screen and skipped by keyboard / screen readers. */}
          <input type="text" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-full h-0 w-0 opacity-0" {...register("website")} />
          <PrimaryButton type="submit" size="lg" isLoading={isSubmitting} disabled={isSubmitting} className="w-full sm:w-auto" icon={<Send className="h-4 w-4" />}>
            {isSubmitting ? "Sending..." : "Send message"}
          </PrimaryButton>
          <p className="body-xsm-regular text-primary-300">
            We use your details only to reply to you. See our{" "}
            <Link href="/privacy" className="text-brand-orange hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

export default ContactForm;
