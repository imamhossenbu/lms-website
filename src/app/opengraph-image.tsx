import { ImageResponse } from "next/og";
import { OG_SIZE, OgCard } from "@/lib/og";

export const alt = "EduPro — run your academy online";
export const size = OG_SIZE;
export const contentType = "image/png";

/** Default share image for every page without its own. */
export default function Image() {
  return new ImageResponse(<OgCard eyebrow="The LMS for schools & coaching centres" title="Run your academy online — courses, live classes, exams and fees in one place" />, size);
}
