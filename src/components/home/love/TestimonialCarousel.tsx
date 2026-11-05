"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Testimonial } from "@/lib/testimonials";
import { TestimonialCard } from "./TestimonialCard";

const GAP = 24;
const INTERVAL_MS = 4500;
const SPRING = { type: "spring", stiffness: 240, damping: 32, mass: 0.9 } as const;

/** Cards per view for a track width: 1 on phones, 2 on tablets, 3 on desktop. */
const perViewFor = (w: number) => (w < 640 ? 1 : w < 1024 ? 2 : 3);
const mod = (a: number, n: number) => ((a % n) + n) % n;

/**
 * Published testimonials on an endless track: it keeps sliding one card at a time on its own, and can be moved
 * with the arrows / dots or dragged (swipe on touch). The middle card of the view is always the orange one; the
 * track starts with the featured testimonial (if any) in the middle. The active dot fills up until the next slide.
 * Static for reduced motion.
 */
export function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [dragging, setDragging] = useState(false);
  const x = useMotionValue(0);
  const n = items.length;

  const perView = width ? perViewFor(width) : 3;
  const cardW = width ? (width - GAP * (perView - 1)) / perView : 0;
  const step = cardW + GAP;
  const loop = n > perView;
  const centre = Math.floor((perView - 1) / 2);

  // Endless loop: three copies of the list; the index lives in the middle copy and is re-centred after each slide.
  const slides = loop ? [...items, ...items, ...items] : items;
  const featuredAt = Math.max(0, items.findIndex((t) => t.featured));
  const [index, setIndex] = useState(() => (loop ? n + mod(featuredAt - 1, n) : 0));
  const indexRef = useRef(index);
  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Keep the track aligned when the width (and so the step) changes.
  useEffect(() => {
    if (step) x.set(-indexRef.current * step);
  }, [step, x]);

  const go = useCallback(
    (requested: number) => {
      if (!loop || !step) return;
      // If the index is outside the middle copy (e.g. the layout just switched to looping), re-centre first.
      const current = indexRef.current;
      const base = n + mod(current, n);
      if (base !== current) x.set(x.get() - (base - current) * step);
      const target = base + (requested - current);
      setIndex(target);
      animate(x, -target * step, {
        ...SPRING,
        onComplete: () => {
          // Jump back into the middle copy without a visible change.
          if (target < n || target >= 2 * n) {
            const wrapped = n + mod(target, n);
            x.set(-wrapped * step);
            setIndex(wrapped);
          }
        },
      });
    },
    [loop, n, step, x]
  );

  const autoplay = loop && !reduce && !dragging && step > 0;
  useEffect(() => {
    if (!autoplay) return;
    const t = window.setTimeout(() => go(index + 1), INTERVAL_MS);
    return () => window.clearTimeout(t);
  }, [autoplay, index, go]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    setDragging(false);
    const projected = x.get() + info.velocity.x * 0.2;
    go(Math.round(-projected / step));
  };

  const active = mod(index, Math.max(n, 1));

  return (
    <div aria-roledescription="carousel" aria-label="What educators say">
      <div ref={trackRef} className="-my-6 overflow-hidden py-6">
        <motion.div
          className={loop ? "flex cursor-grab items-stretch active:cursor-grabbing" : "flex items-stretch justify-center"}
          style={{ x, gap: GAP }}
          drag={loop ? "x" : false}
          dragMomentum={false}
          onDragStart={() => setDragging(true)}
          onDragEnd={onDragEnd}
        >
          {slides.map((t, i) => (
            <div key={`${t.id}-${i}`} className="shrink-0 select-none" style={{ width: cardW || `calc((100% - ${GAP * 2}px) / 3)` }}>
              <TestimonialCard t={t} highlighted={loop ? i === index + centre : perView === 3 && n === 3 ? i === 1 : n === 1} index={mod(i, 3)} />
            </div>
          ))}
        </motion.div>
      </div>

      {loop && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <ArrowButton label="Previous testimonials" onClick={() => go(index - 1)}>
            <ChevronLeft className="h-5 w-5" />
          </ArrowButton>
          <div className="flex items-center gap-2">
            {items.map((t, i) => (
              <motion.button
                key={t.id}
                type="button"
                onClick={() => go(index + (i - active))}
                animate={{ width: i === active ? 32 : 10 }}
                transition={SPRING}
                className="relative h-2.5 overflow-hidden rounded-full bg-brand-orange-20"
                aria-label={`Show testimonial ${i + 1}`}
                aria-current={i === active}
              >
                {i === active && (
                  <motion.span
                    key={`${index}-${autoplay}`}
                    className="absolute inset-y-0 left-0 rounded-full bg-brand-orange"
                    initial={{ width: autoplay ? "0%" : "100%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: autoplay ? INTERVAL_MS / 1000 : 0, ease: "linear" }}
                  />
                )}
              </motion.button>
            ))}
          </div>
          <ArrowButton label="Next testimonials" onClick={() => go(index + 1)}>
            <ChevronRight className="h-5 w-5" />
          </ArrowButton>
        </div>
      )}
    </div>
  );
}

function ArrowButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.92 }}
      onClick={onClick}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-dash bg-white text-primary-500 transition-colors hover:border-brand-orange hover:text-brand-orange"
    >
      {children}
    </motion.button>
  );
}

export default TestimonialCarousel;
