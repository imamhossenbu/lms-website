"use client";

import React, { useEffect } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";

interface DivisionBadgeProps {
  /** Centre in stage units. */
  x: number;
  y: number;
  name: string;
  value: number;
  /** Division colour (CSS colour / var). */
  color: string;
  /** The Dhaka hub: bigger, solid and pulsing. */
  hub?: boolean;
  /** The division is hovered. */
  active?: boolean;
  /** Map is in view: pop in and count up. */
  show: boolean;
  /** Looping motion allowed (hub pulse). */
  live: boolean;
  delay: number;
}

/**
 * The number in the middle of a division on the map: a white (or, for the hub, coloured) disc whose number
 * counts up when it pops in, with the division name under it. Grows a little while its division is hovered.
 */
export function DivisionBadge({ x, y, name, value, color, hub = false, active = false, show, live, delay }: DivisionBadgeProps) {
  const reduce = useReducedMotion();
  const count = useMotionValue(0);
  const shown = useTransform(count, (v) => Math.round(v).toLocaleString("en-US"));
  const r = hub ? 25 : 18;

  useEffect(() => {
    if (!show) return;
    if (reduce) {
      count.set(value);
      return;
    }
    const controls = animate(count, value, { duration: 1.4, delay: delay + 0.1, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [show, reduce, value, delay, count]);

  return (
    <g transform={`translate(${x} ${y})`} pointerEvents="none">
      {hub &&
        live &&
        [0, 1].map((i) => (
          <motion.circle
            key={i}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="2"
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: [1, 1.9], opacity: [0.8, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: i * 1.2 }}
          />
        ))}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={show ? { scale: active ? 1.15 : 1, opacity: 1 } : undefined}
        transition={{ type: "spring", stiffness: 320, damping: 16, delay: active ? 0 : delay }}
      >
        <circle r={r} fill={hub ? color : "white"} stroke={hub ? "white" : color} strokeWidth={hub ? 3 : 2.5} />
        <motion.text
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={hub ? 15 : 12.5}
          fontWeight={700}
          fill={hub ? "white" : color}
          className="tabular-nums"
        >
          {shown}
        </motion.text>
        <text
          y={r + 12}
          textAnchor="middle"
          fontSize={hub ? 12.5 : 11}
          fontWeight={600}
          fill="var(--color-primary-500)"
          stroke="white"
          strokeWidth={3.5}
          strokeLinejoin="round"
          paintOrder="stroke"
        >
          {name}
        </text>
      </motion.g>
    </g>
  );
}

export default DivisionBadge;
