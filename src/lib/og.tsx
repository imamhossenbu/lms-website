import React from "react";

/** Share-image size (Open Graph / X). */
export const OG_SIZE = { width: 1200, height: 630 };

/**
 * The branded share card drawn by `next/og` (Satori). It can't read CSS variables or classes, so the brand
 * colours are written out here — they match --color-brand-orange / --color-primary-500 in globals.css.
 */
const ORANGE = "#FF5B00";
const NAVY = "#0F172A";
const MUTED = "#64748B";

export function OgCard({ eyebrow, title, footer = "edupro · LMS for schools & coaching centres" }: { eyebrow: string; title: string; footer?: string }) {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "linear-gradient(135deg, #FFF4ED 0%, #FFFFFF 55%, #FFE7D6 100%)", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div style={{ width: 72, height: 72, borderRadius: 20, background: ORANGE, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 40, fontWeight: 800 }}>E</div>
        <div style={{ display: "flex", fontSize: 44, fontWeight: 800, color: NAVY }}>
          Edu<span style={{ color: ORANGE }}>Pro</span>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", alignSelf: "flex-start", padding: "10px 22px", borderRadius: 999, background: "rgba(255,91,0,0.12)", color: ORANGE, fontSize: 28, fontWeight: 600 }}>{eyebrow}</div>
        <div style={{ display: "flex", fontSize: title.length > 60 ? 58 : 72, fontWeight: 800, color: NAVY, lineHeight: 1.08, letterSpacing: -2, maxWidth: 1000 }}>{title}</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 26, color: MUTED }}>
        <span>{footer}</span>
        <div style={{ display: "flex", width: 220, height: 10, borderRadius: 999, background: ORANGE }} />
      </div>
    </div>
  );
}
