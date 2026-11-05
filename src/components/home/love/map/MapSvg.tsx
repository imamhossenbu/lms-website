"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { BD_DIVISIONS, BD_VIEWBOX, type DivisionId } from "@/lib/bangladesh";
import { DIVISION_ACADEMIES } from "@/lib/divisionStats";
import { DivisionBadge } from "./DivisionBadge";

/** Drawing box: the map sits in the middle of a wider stage so the orbit can swing around it. */
export const STAGE = { width: 660, height: BD_VIEWBOX.height + 10, mapX: 130, mapY: 5 };
const at = (p: { x: number; y: number }) => ({ x: p.x + STAGE.mapX, y: p.y + STAGE.mapY });

/** Division colours (theme tokens), picked so neighbours never share a hue. */
const COLORS: Record<DivisionId, string> = {
  rangpur: "var(--color-red)",
  rajshahi: "var(--color-yellow)",
  mymensingh: "var(--color-purple)",
  sylhet: "var(--color-blue)",
  dhaka: "var(--color-brand-orange)",
  khulna: "var(--color-teal)",
  barishal: "var(--color-pink)",
  chattogram: "var(--color-green)",
};

const HUB_ID: DivisionId = "dhaka";
const HUB = at(BD_DIVISIONS.find((d) => d.id === HUB_ID)!.label);

/** Points along a quadratic curve, for a dot that travels the connection. */
function curve(from: { x: number; y: number }, to: { x: number; y: number }, bend: number) {
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
 * Animated Bangladesh by division: the borders draw in, each division fills with its own colour one after another,
 * a number badge (academies on EduPro) pops up in the middle of each, and connections run from the Dhaka hub to
 * the others with pulses travelling along them. Hovering a division brightens it. A dashed orbit drifts around the
 * map. Looping motion starts only after the map has drawn in; static for reduced motion.
 */
export function MapSvg() {
  const reduce = useReducedMotion();
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [live, setLive] = useState(false);
  const [hovered, setHovered] = useState<DivisionId | null>(null);

  useEffect(() => {
    if (!inView || reduce) return;
    const t = window.setTimeout(() => setLive(true), 2600);
    return () => window.clearTimeout(t);
  }, [inView, reduce]);

  const links = useMemo(
    () => BD_DIVISIONS.filter((d) => d.id !== HUB_ID).map((d, i) => ({ id: d.id, ...curve(HUB, at(d.label), i % 2 ? -40 : 50) })),
    []
  );
  const orbit = useMemo(() => orbitPoints(STAGE.width / 2, STAGE.height / 2 + 20, 320, 110, -14), []);
  const orbitD = `M ${orbit.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" L ")} Z`;

  return (
    <svg ref={ref} viewBox={`0 0 ${STAGE.width} ${STAGE.height}`} className="h-auto w-full overflow-visible text-brand-orange" aria-hidden>
      <defs>
        <pattern id="bd-dots" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.1" fill="currentColor" opacity="0.12" />
        </pattern>
        <clipPath id="bd-clip">
          {BD_DIVISIONS.map((d) => (
            <path key={d.id} d={d.d} transform={`translate(${STAGE.mapX} ${STAGE.mapY})`} />
          ))}
        </clipPath>
        <filter id="bd-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="var(--color-brand-orange)" floodOpacity="0.1" />
        </filter>
      </defs>

      {/* Orbit behind the map: dashed ring whose dashes keep flowing, with a dot travelling round it. */}
      <motion.path
        d={orbitD}
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.4"
        strokeWidth="2"
        strokeDasharray="6 10"
        initial={{ opacity: 0 }}
        animate={!inView ? { opacity: 0 } : reduce ? { opacity: 1 } : { opacity: 1, strokeDashoffset: [0, -160] }}
        transition={{ opacity: { duration: 1, delay: 0.4 }, strokeDashoffset: { duration: 8, ease: "linear", repeat: Infinity } }}
      />
      {live && (
        <motion.circle
          r="5"
          fill="currentColor"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, cx: orbit.map((p) => p.x), cy: orbit.map((p) => p.y) }}
          transition={{ opacity: { duration: 0.6 }, default: { duration: 14, ease: "linear", repeat: Infinity } }}
        />
      )}

      {/* Divisions: borders draw, then each fills with its colour; hover brightens. */}
      <g transform={`translate(${STAGE.mapX} ${STAGE.mapY})`} filter="url(#bd-shadow)">
        {BD_DIVISIONS.map((d, i) => (
          <motion.path
            key={d.id}
            d={d.d}
            fill={COLORS[d.id]}
            stroke="white"
            strokeWidth="2"
            strokeLinejoin="round"
            className="cursor-pointer"
            onMouseEnter={() => setHovered(d.id)}
            onMouseLeave={() => setHovered(null)}
            initial={{ fillOpacity: 0 }}
            animate={inView ? { fillOpacity: hovered === d.id ? 0.5 : hovered ? 0.2 : 0.3 } : undefined}
            transition={{ duration: hovered === null && !live ? 0.6 : 0.25, delay: live ? 0 : 0.9 + i * 0.12 }}
          />
        ))}
        {BD_DIVISIONS.map((d) => (
          <motion.path
            key={`${d.id}-line`}
            d={d.d}
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.45"
            strokeWidth="1.5"
            strokeLinejoin="round"
            pointerEvents="none"
            initial={{ pathLength: 0, opacity: 1 }}
            animate={inView ? { pathLength: 1, opacity: 0 } : undefined}
            transition={{ pathLength: { duration: 1.4, ease: "easeInOut" }, opacity: { duration: 0.6, delay: 1.9 } }}
          />
        ))}
      </g>
      <motion.rect
        width={STAGE.width}
        height={STAGE.height}
        fill="url(#bd-dots)"
        clipPath="url(#bd-clip)"
        pointerEvents="none"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : undefined}
        transition={{ delay: 1.8, duration: 1 }}
      />

      {/* Connections from the Dhaka hub, each with a pulse running along it. */}
      {links.map((l, i) => (
        <g key={l.id} pointerEvents="none">
          <motion.path
            d={l.d}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="1 5"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 0.55 } : undefined}
            transition={{ duration: 0.6, delay: 2 + i * 0.08 }}
          />
          {live && (
            <motion.circle
              r="3.5"
              fill="white"
              stroke="currentColor"
              strokeWidth="2"
              initial={{ opacity: 0, cx: l.pts[0].x, cy: l.pts[0].y }}
              animate={{ cx: l.pts.map((p) => p.x), cy: l.pts.map((p) => p.y), opacity: [0, 1, 1, 0] }}
              transition={{ duration: 2.2, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.8, delay: i * 0.35 }}
            />
          )}
        </g>
      ))}

      {/* Number badges in the middle of each division. */}
      {BD_DIVISIONS.map((d, i) => (
        <DivisionBadge
          key={d.id}
          {...at(d.label)}
          name={d.name}
          value={DIVISION_ACADEMIES[d.id]}
          color={COLORS[d.id]}
          hub={d.id === HUB_ID}
          active={hovered === d.id}
          show={inView}
          live={live}
          delay={1.5 + i * 0.12}
        />
      ))}
    </svg>
  );
}

export default MapSvg;
