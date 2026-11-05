import { z } from "zod";

export const TOPICS = [
  { value: "DEMO", label: "Book a demo" },
  { value: "SALES", label: "Pricing & plans" },
  { value: "SUPPORT", label: "Support" },
  { value: "PARTNERSHIP", label: "Partnership" },
  { value: "OTHER", label: "Something else" },
] as const;

export const SIZES = [
  { value: "", label: "Select…" },
  { value: "1-100", label: "1 – 100 students" },
  { value: "101-500", label: "101 – 500 students" },
  { value: "501-2000", label: "501 – 2,000 students" },
  { value: "2000+", label: "More than 2,000" },
] as const;

/** Mirrors the API's ContactRequestDto rules. */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80, "Name is too long"),
  email: z.string().trim().email("Enter a valid email address").max(160),
  phone: z
    .string()
    .trim()
    .regex(/^$|^[+\d][\d\s()-]{5,20}$/, "Enter a valid phone number"),
  institutionName: z.string().trim().max(120, "Institution name is too long"),
  studentCount: z.enum(["", "1-100", "101-500", "501-2000", "2000+"]),
  topic: z.enum(["DEMO", "SALES", "SUPPORT", "PARTNERSHIP", "OTHER"]),
  message: z.string().trim().min(10, "Tell us a bit more (at least 10 characters)").max(2000, "Message is too long (2000 characters max)"),
  /** Honeypot (hidden from people). */
  website: z.string(),
});

export type ContactValues = z.infer<typeof contactSchema>;
