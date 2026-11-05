/**
 * Facts the legal pages depend on. DRAFT — have these pages reviewed by a lawyer and fill in the registered
 * company details before launch.
 */
export const LEGAL = {
  /** Trading name used throughout the documents. */
  company: "EduPro",
  /** Registered legal entity and address (fill in before launch; shown when set). */
  legalEntity: process.env.NEXT_PUBLIC_LEGAL_ENTITY || "",
  address: process.env.NEXT_PUBLIC_LEGAL_ADDRESS || "",
  /** Where people send privacy / legal questions. */
  contactPath: "/contact?topic=SUPPORT",
  governingLaw: "the laws of Bangladesh",
  courts: "the courts of Dhaka, Bangladesh",
  /** First paid subscription charge can be refunded within this many days. */
  subscriptionRefundDays: 7,
  lastUpdated: "November 5, 2026",
};

export interface LegalDoc {
  slug: "privacy" | "terms" | "refund-policy";
  title: string;
  /** Short line under the title. */
  summary: string;
  /** Plain-language key points shown in a box before the full text. */
  keyPoints: string[];
  /** Body in Markdown (## sections become the contents list). */
  body: string;
}
