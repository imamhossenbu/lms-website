import type { Metadata } from "next";
import { PRIVACY } from "@/lib/legal";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = { title: PRIVACY.title, description: PRIVACY.summary };

export default function PrivacyPage() {
  return <LegalPage doc={PRIVACY} />;
}
