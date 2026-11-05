"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

interface MouseTiltProps {
  children: React.ReactNode;
  /** Resting rotation (degrees) — the hero window leans back to the right. */
  baseX?: number;
  baseY?: number;
  /** How far the pointer can tilt it from rest (degrees). */
  range?: number;
  className?: string;
}

/** 3D tilt that follows the pointer on a soft spring and settles back to its resting angle on leave. */
export function MouseTilt({ children, baseX = 3, baseY = -8, range = 6, className }: MouseTiltProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 120, damping: 18, mass: 0.6 };
  const rotateY = useSpring(useTransform(px, (v) => baseY + v * range), spring);
  const rotateX = useSpring(useTransform(py, (v) => baseX - v * range), spring);

  if (reduce) return <div className={className}>{children}</div>;

  const onMove = (e: React.PointerEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className={className} style={{ perspective: 1600 }}>
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>{children}</motion.div>
    </div>
  );
}

export default MouseTilt;
