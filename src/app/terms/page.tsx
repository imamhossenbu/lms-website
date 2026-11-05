import type { Metadata } from "next";
import { TERMS } from "@/lib/legal";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = { title: TERMS.title, description: TERMS.summary };

export default function TermsPage() {
  return <LegalPage doc={TERMS} />;
}
