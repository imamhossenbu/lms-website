"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SHOWCASE, SHOWCASE_INTERVAL_MS } from "@/lib/showcase";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { MockSidebar } from "@/components/home/hero/dashboard/MockSidebar";
import { EASE_OUT } from "@/components/motion/presets";
import { ShowcaseList } from "./ShowcaseList";
import { SHOWCASE_SCREENS } from "./screens";

/**
 * "See it in action": pick a capability on the left and the product window on the right switches to that
 * screen. Auto-plays through the list (pauses while hovered, off for reduced motion); clicking takes over.
 */
export function Showcase() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [userPicked, setUserPicked] = useState(false);
  const playing = !reduce && !hovered && !userPicked;

  useEffect(() => {
    if (!playing) return;
    const t = window.setTimeout(() => setActive((i) => (i + 1) % SHOWCASE.length), SHOWCASE_INTERVAL_MS);
    return () => window.clearTimeout(t);
  }, [playing, active]);

  const item = SHOWCASE[active];
  const Screen = SHOWCASE_SCREENS[item.id];

  return (
    <section className="relative overflow-hidden" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="absolute -right-32 top-10 -z-10 h-128 w-128 rounded-full bg-brand-orange-10 blur-3xl" aria-hidden />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-14 pt-8 sm:px-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="See it in action"
            title="A complete platform for modern teaching"
            highlight="modern teaching"
            subtitle="Everything you need to create, teach, engage and grow your academy — in one place."
            align="left"
          />
          <div className="mt-8">
            <ShowcaseList
              active={active}
              playing={playing}
              onSelect={(i) => {
                setUserPicked(true);
                setActive(i);
              }}
            />
          </div>
        </div>

        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
        >
          <BrowserFrame url="admin.edupro.io">
            <div id="showcase-panel" role="tabpanel" aria-labelledby={`showcase-tab-${item.id}`} className="flex min-h-96 bg-gray-bg" aria-live="polite">
              <MockSidebar active={item.nav} animateIn={false} />
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={item.id}
                  className="flex min-w-0 flex-1"
                  initial={{ opacity: 0, x: 16, filter: "blur(4px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: -16, filter: "blur(4px)" }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                >
                  <Screen />
                </motion.div>
              </AnimatePresence>
            </div>
          </BrowserFrame>
        </motion.div>
      </div>
      <div className="flex justify-center pb-24">
        <ButtonLink href="/features" size="lg" icon={<ArrowRight className="h-5 w-5" />} className="h-14 px-8">
          Explore all features
        </ButtonLink>
      </div>
    </section>
  );
}

export default Showcase;
