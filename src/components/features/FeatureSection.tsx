"use client";

import React from "react";
import { LayoutGroup, motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/cn";
import { FEATURES } from "@/lib/content";
import { signupUrl } from "@/lib/site";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ToneIcon } from "@/components/shared/ToneIcon";
import { EASE_OUT } from "@/components/motion/presets";
import { FEATURE_SCREENS } from "@/components/home/showcase/screens";
import { PaymentLogos } from "@/components/shared/PaymentLogos";

/**
 * One feature on /features: number, tinted icon, title, summary and the key points beside a live-looking preview of
 * that screen in a browser window (sides alternate). Takes the feature id (icons are components, read on the client).
 */
export function FeatureSection({ featureId, index }: { featureId: string; index: number }) {
  const feature = FEATURES.find((f) => f.id === featureId);
  if (!feature) return null;
  const Screen = FEATURE_SCREENS[feature.id];
  const flip = index % 2 === 1;

  return (
    <section id={feature.id} className={cn("relative scroll-mt-32 overflow-hidden", flip ? "bg-brand-orange-soft" : "bg-white")}>
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-12">
        <motion.div
          className={cn("lg:col-span-5", flip && "lg:order-2")}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          <div className="flex items-center gap-4">
            <ToneIcon icon={feature.icon} tone={feature.tone} size="lg" />
            <span className="heading-h3 text-brand-orange opacity-40">{String(index + 1).padStart(2, "0")}</span>
          </div>
          <h2 className="heading-h2-bold mt-6 text-primary-500">{feature.title}</h2>
          <p className="body-xl-regular mt-3 text-primary-300">{feature.summary}</p>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {feature.points.map((p, i) => (
              <motion.li
                key={p}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.2 + i * 0.07 }}
                className="flex items-start gap-2.5 rounded-xl border border-dash bg-white p-3 body-sm-medium text-primary-500 shadow-xs"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-bg">
                  <Check className="h-3 w-3 text-green" />
                </span>
                {p}
              </motion.li>
            ))}
          </ul>
          {feature.id === "payments" && <PaymentLogos align="left" label="" className="mt-6" />}
          <ButtonLink href={signupUrl()} variant="secondary" className="mt-8" icon={<ArrowRight className="h-4 w-4" />}>
            Try it free
          </ButtonLink>
        </motion.div>

        <motion.div
          className={cn("relative lg:col-span-7", flip && "lg:order-1")}
          initial={{ opacity: 0, x: flip ? -40 : 40, scale: 0.97 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
        >
          <div className="absolute -inset-6 -z-10 rounded-full bg-brand-orange-10 blur-3xl" aria-hidden />
          <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.25 }}>
            <BrowserFrame url="admin.edupro.io">
              <div className="flex bg-gray-bg" aria-hidden>
                {Screen && (
                  <LayoutGroup id={feature.id}>
                    <Screen />
                  </LayoutGroup>
                )}
              </div>
            </BrowserFrame>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default FeatureSection;
