"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface CityBeaconProps {
  city: string;
  kind: string;
  icon: LucideIcon;
  /** City position as a percentage of the map stage. */
  left: number;
  top: number;
  /** Beam height in px (taller beams lift the label clear of the map). */
  beam?: number;
  /** Beam hangs below the city instead of rising (keeps the label off busy parts of the map). */
  down?: boolean;
  /** Horizontal offset of the label from the beam, in px. */
  shift?: number;
  delay?: number;
}

/**
 * A light beam rising from (or hanging below) a city on the map, topped by a glass label (icon chip, city, kind). The beam grows up
 * from the pin, the label pops onto it, then floats gently while a spark keeps climbing the beam.
 */
export function CityBeacon({ city, kind, icon: Icon, left, top, beam = 56, down = false, shift = 0, delay = 0 }: CityBeaconProps) {
  const reduce = useReducedMotion();
  const start = 1.8 + delay;
  return (
    <div
      className={down ? "pointer-events-none absolute flex flex-col-reverse items-center" : "pointer-events-none absolute flex flex-col items-center"}
      style={{ left: `${left}%`, top: `${top}%`, transform: down ? "translate(-50%, 0)" : "translate(-50%, -100%)" }}
    >
      {/* Label */}
      <motion.div
        style={{ x: shift }}
        initial={{ opacity: 0, y: down ? -14 : 14, scale: 0.85 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: start + 0.45 }}
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, -5, 0] }}
          transition={{ duration: 3.6 + delay, repeat: Infinity, ease: "easeInOut", delay: start + 1 }}
          className="pointer-events-auto flex items-center gap-2.5 whitespace-nowrap rounded-2xl border border-white bg-white/85 py-2 pl-2 pr-4 shadow-xl shadow-brand-orange/15 backdrop-blur"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-orange to-brand-orange-hover text-white shadow-md shadow-brand-orange/30">
            <Icon className="h-4 w-4" />
          </span>
          <span className="leading-tight">
            <span className="body-xsm-medium block text-primary-500">{city}</span>
            <span className="body-2xsm-regular text-primary-300">{kind}</span>
          </span>
        </motion.div>
      </motion.div>

      {/* Beam */}
      <motion.span
        className={
          down
            ? "relative mb-1 w-0.5 origin-top overflow-hidden rounded-full bg-gradient-to-b from-brand-orange to-brand-orange/0"
            : "relative mt-1 w-0.5 origin-bottom overflow-hidden rounded-full bg-gradient-to-t from-brand-orange to-brand-orange/0"
        }
        style={{ height: beam }}
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut", delay: start }}
      >
        {!reduce && (
          <motion.span
            className="absolute left-0 h-3 w-0.5 rounded-full bg-white"
            initial={{ top: down ? "0%" : "100%", opacity: 0 }}
            animate={{ top: down ? ["0%", "100%"] : ["100%", "0%"], opacity: [0, 1, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeIn", delay: start + 0.8 + delay }}
          />
        )}
      </motion.span>
    </div>
  );
}

export default CityBeacon;
