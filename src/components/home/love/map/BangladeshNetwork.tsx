"use client";

import React from "react";
import { MapSvg } from "./MapSvg";

/**
 * "Across Bangladesh" illustration, built in code: the animated division map (MapSvg) with the number of
 * academies in each division and connections from the Dhaka hub.
 */
export function BangladeshNetwork() {
  return (
    <div className="relative mx-auto w-full max-w-2xl" role="img" aria-label="Map of Bangladesh's eight divisions with the number of academies using EduPro in each">
      <MapSvg />
    </div>
  );
}

export default BangladeshNetwork;
