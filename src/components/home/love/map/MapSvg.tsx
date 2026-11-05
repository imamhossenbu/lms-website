"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { BD_CITIES, BD_PATH } from "@/lib/bangladesh";

/** Drawing box: the map (400 × 557) sits in the middle of an 800 × 560 stage. */
export const STAGE = { width: 800, height: 560, mapX: 200, mapY: 2 };
const at = (c: { x: number; y: number }) => ({ x: c.x + STAGE.mapX, y: c.y + STAGE.mapY });

const HUB = at(BD_CITIES.dhaka);
const SPOKES = [BD_CITIES.sylhet, BD_CITIES.chattogram, BD_CITIES.rajshahi, BD_CITIES.khulna].map(at);

/** Points along a quadratic curve, for a dot that travels the connection. */
function curve(from: { x: number; y: number }, to: { x: number; y: number }, bend = 60) {
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2 - bend;
  const pts = Array.from({ length: 21 }, (_, i) => {
    const t = i / 20;
    return { x: (1 - t) ** 2 * from.x + 2 * (1 - t) * t * mx + t ** 2 * to.x, y: (1 - t) ** 2 * from.y + 2 * (1 - t) * t * my + t ** 2 * to.y };
  });
  return { d: `M ${from.x} ${from.y} Q ${mx} ${my} ${to.x} ${to.y}`, pts };
}

/** Points around the tilted orbit ellipse. */
function orbitPoints(cx: number, cy: number, rx: number, ry: number, deg: number, n = 48) {
  const r = (deg * Math.PI) / 180;
  return Array.from({ length: n + 1 }, (_, i) => {
    const a = (i / n) * Math.PI * 2;
    const x = rx * Math.cos(a);
    const y = ry * Math.sin(a);
    return { x: cx + x * Math.cos(r) - y * Math.sin(r), y: cy + x * Math.sin(r) + y * Math.cos(r) };
  });
}

/**
 * Animated Bangladesh: outline draws in and fills (orange gradient + dot grain), a dashed orbit drifts with a
 * travelling dot, connections draw from Dhaka to the other cities with pulses running along them, and every
 * city pin breathes. Static for reduced motion.
 */
export function MapSvg() {
  const reduce = useReducedMotion();
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  // Looping dots and pulses only start once the outline and connections have drawn in, so nothing shows early.
  const [live, setLive] = useState(false);
  useEffect(() => {
    if (!inView || reduce) return;
    const t = window.setTimeout(() => setLive(true), 2300);
    return () => window.clearTimeout(t);
  }, [inView, reduce]);
  const links = useMemo(() => SPOKES.map((s, i) => curve(HUB, s, i % 2 ? -50 : 60)), []);
  const orbit = useMemo(() => orbitPoints(400, 300, 380, 120, -14), []);
  const orbitD = `M ${orbit.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" L ")} Z`;

  return (
    <svg ref={ref} viewBox={`0 0 ${STAGE.width} ${STAGE.height}`} className="h-auto w-full overflow-visible text-brand-orange" aria-hidden>
      <defs>
        <linearGradient id="bd-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-brand-orange-light)" />
          <stop offset="100%" stopColor="var(--color-brand-orange-20)" />
        </linearGradient>
        <pattern id="bd-dots" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill="currentColor" opacity="0.18" />
        </pattern>
        <clipPath id="bd-clip">
          <path d={BD_PATH} transform={`translate(${STAGE.mapX} ${STAGE.mapY})`} />
        </clipPath>
      </defs>

      {/* Map: outline draws, then fill + grain fade in. */}
      <g transform={`translate(${STAGE.mapX} ${STAGE.mapY})`}>
        <motion.path d={BD_PATH} fill="url(#bd-fill)" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : undefined} transition={{ duration: 1, delay: 0.9 }} />
        <motion.path
          d={BD_PATH}
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.35"
          strokeWidth="2"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : undefined}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        />
      </g>
      <motion.rect width={STAGE.width} height={STAGE.height} fill="url(#bd-dots)" clipPath="url(#bd-clip)" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : undefined} transition={{ delay: 1.3, duration: 1 }} />

      {/* Orbit: dashed ring whose dashes keep flowing (pathLength would override the dashes), with a dot travelling round it. */}
      <motion.path
        d={orbitD}
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.45"
        strokeWidth="2"
        strokeDasharray="6 10"
        initial={{ opacity: 0 }}
        animate={!inView ? { opacity: 0 } : reduce ? { opacity: 1 } : { opacity: 1, strokeDashoffset: [0, -160] }}
        transition={{ opacity: { duration: 1, delay: 0.4 }, strokeDashoffset: { duration: 8, ease: "linear", repeat: Infinity } }}
      />
      {live && (
        <motion.circle r="5" fill="currentColor" initial={{ opacity: 0 }} animate={{ opacity: 1, cx: orbit.map((p) => p.x), cy: orbit.map((p) => p.y) }} transition={{ opacity: { duration: 0.6 }, default: { duration: 14, ease: "linear", repeat: Infinity } }} />
      )}

      {/* Connections from Dhaka, each with a pulse running along it. */}
      {links.map((l, i) => (
        <g key={i}>
          <motion.path
            d={l.d}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeOpacity="0.7"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : undefined}
            transition={{ duration: 0.9, delay: 1.4 + i * 0.2, ease: "easeOut" }}
          />
          {live && (
            <motion.circle
              r="3.5"
              fill="white"
              stroke="currentColor"
              strokeWidth="2"
              initial={{ opacity: 0, cx: l.pts[0].x, cy: l.pts[0].y }}
              animate={{ cx: l.pts.map((p) => p.x), cy: l.pts.map((p) => p.y), opacity: [0, 1, 1, 0] }}
              transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.6, delay: i * 0.5 }}
            />
          )}
        </g>
      ))}

      {/* City pins. */}
      {SPOKES.map((c, i) => (
        <g key={i}>
          {live && (
            <motion.circle cx={c.x} cy={c.y} r="6" fill="currentColor" initial={{ opacity: 0 }} animate={{ r: [6, 18], opacity: [0.45, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: i * 0.4 }} />
          )}
          <motion.circle cx={c.x} cy={c.y} r="6" fill="currentColor" stroke="white" strokeWidth="2.5" initial={{ scale: 0 }} animate={inView ? { scale: 1 } : { scale: 0 }} transition={{ type: "spring", stiffness: 300, damping: 14, delay: 1.6 + i * 0.2 }} />
        </g>
      ))}
    </svg>
  );
}

export default MapSvg;
