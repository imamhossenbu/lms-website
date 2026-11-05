import type { DivisionId } from "./bangladesh";

/**
 * Academies per division shown on the home-page map.
 * SAMPLE NUMBERS for the design — institutions don't record a division yet. Replace with real counts
 * (e.g. from an API) before launch.
 */
export const DIVISION_ACADEMIES: Record<DivisionId, number> = {
  dhaka: 128,
  chattogram: 64,
  rajshahi: 42,
  khulna: 38,
  rangpur: 31,
  sylhet: 27,
  mymensingh: 23,
  barishal: 19,
};
