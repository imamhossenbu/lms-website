import React from "react";
import Link from "next/link";
import { FileText, MessageCircle, ReceiptText, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/cn";
import { LEGAL } from "@/lib/legal";
import { ButtonLink } from "@/components/ui/ButtonLink";

const DOCS = [
  { href: "/privacy", label: "Privacy Policy", icon: ShieldCheck },
  { href: "/terms", label: "Terms of Service", icon: FileText },
  { href: "/refund-policy", label: "Refund Policy", icon: ReceiptText },
];

/** Sidebar: the other legal documents (current one marked) and a "questions?" card. */
export function LegalNav({ current }: { current: string }) {
  return (
    <div className="space-y-5">
      <nav aria-label="Legal documents" className="rounded-2xl border border-dash bg-white p-3">
        {DOCS.map(({ href, label, icon: Icon }) => {
          const on = href === `/${current}`;
          return (
            <Link
              key={href}
              href={href}
              aria-current={on ? "page" : undefined}
              className={cn("flex items-center gap-3 rounded-xl px-3 py-2.5 body-sm-medium transition-colors", on ? "bg-brand-orange-light text-brand-orange" : "text-primary-400 hover:bg-gray-bg hover:text-primary-500")}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="rounded-2xl border border-dash bg-white p-5">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-orange-light text-brand-orange">
          <MessageCircle className="h-5 w-5" />
        </span>
        <p className="heading-h6-bold mt-4 text-primary-500">Questions?</p>
        <p className="mt-1 body-sm-regular text-primary-300">We&apos;ll explain anything in these documents — usually within one working day.</p>
        <ButtonLink href={LEGAL.contactPath} variant="secondary" className="mt-4 w-full">
          Contact us
        </ButtonLink>
      </div>
    </div>
  );
}

export default LegalNav;
