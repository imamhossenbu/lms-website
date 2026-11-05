import type { Metadata } from "next";
import { REFUND } from "@/lib/legal";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = { title: REFUND.title, description: REFUND.summary };

export default function RefundPolicyPage() {
  return <LegalPage doc={REFUND} />;
}
