"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Building2, GraduationCap, Landmark, School, University } from "lucide-react";
import { BD_CITIES } from "@/lib/bangladesh";
import { MapSvg, STAGE } from "./MapSvg";
import { CityBeacon } from "./CityBeacon";

/** A city's position as a percentage of the map stage. */
const pct = (c: { x: number; y: number }) => ({ left: ((c.x + STAGE.mapX) / STAGE.width) * 100, top: ((c.y + STAGE.mapY) / STAGE.height) * 100 });

const BEACONS = [
  { ...pct(BD_CITIES.sylhet), city: "Sylhet", kind: "Schools", icon: School, beam: 64, delay: 0 },
  { ...pct(BD_CITIES.rajshahi), city: "Rajshahi", kind: "Coaching centres", icon: Building2, beam: 72, delay: 0.25 },
  { ...pct(BD_CITIES.khulna), city: "Khulna", kind: "Madrasas", icon: University, beam: 60, down: true, shift: -70, delay: 0.5 },
  { ...pct(BD_CITIES.chattogram), city: "Chattogram", kind: "Training institutes", icon: Landmark, beam: 44, down: true, shift: 90, delay: 0.75 },
];
const HUB = pct(BD_CITIES.dhaka);

/**
 * "Across Bangladesh" illustration, built in code: the animated map (MapSvg), a glowing EduPro hub over Dhaka and
 * light beacons rising from the other divisions.
 */
export function BangladeshNetwork() {
  const reduce = useReducedMotion();
  return (
    <div className="relative mx-auto w-full max-w-2xl" role="img" aria-label="Map of Bangladesh with schools connected to EduPro from Dhaka">
      <MapSvg />

      {/* EduPro hub over Dhaka. */}
      <motion.div
        className="absolute"
        style={{ left: `${HUB.left}%`, top: `${HUB.top}%`, x: "-50%", y: "-50%" }}
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 200, damping: 14, delay: 1.1 }}
      >
        {!reduce &&
          [0, 1].map((i) => (
            <motion.span
              key={i}
              className="absolute inset-0 rounded-3xl border-2 border-brand-orange-20"
              animate={{ scale: [1, 1.6], opacity: [0.7, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: 1.6 + i * 1.2 }}
            />
          ))}
        <motion.div
          animate={reduce ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative flex h-16 w-16 items-center justify-center rounded-3xl border border-white bg-white/80 shadow-2xl shadow-brand-orange/30 backdrop-blur sm:h-20 sm:w-20"
        >
          <GraduationCap className="h-8 w-8 text-brand-orange sm:h-10 sm:w-10" />
        </motion.div>
      </motion.div>

      {BEACONS.map((b) => (
        <CityBeacon key={b.city} {...b} />
      ))}
    </div>
  );
}

export default BangladeshNetwork;
