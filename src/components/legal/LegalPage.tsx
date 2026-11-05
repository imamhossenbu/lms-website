import React from "react";
import { CalendarDays, Scale } from "lucide-react";
import { LEGAL, type LegalDoc } from "@/lib/legal";
import { Markdown, extractHeadings } from "@/lib/markdown";
import { ArticleToc } from "@/components/blog/ArticleToc";
import { PageHero } from "@/components/shared/PageHero";
import { ToneBadge } from "@/components/ui/ToneBadge";
import { LegalKeyPoints } from "./LegalKeyPoints";
import { LegalNav } from "./LegalNav";

/** A legal document page: hero with the last-updated date, "in short" points, the full text, and a sidebar with contents, the other documents and contact. */
export function LegalPage({ doc }: { doc: LegalDoc }) {
  const headings = extractHeadings(doc.body);
  return (
    <>
      <PageHero eyebrow="Legal" eyebrowIcon={<Scale className="h-4 w-4" />} title={doc.title} subtitle={doc.summary}>
        <div className="flex justify-center">
          <ToneBadge tone="gray" variant="pill" icon={<CalendarDays className="h-3.5 w-3.5" />}>
            Last updated {LEGAL.lastUpdated}
          </ToneBadge>
        </div>
      </PageHero>
      <div className="mx-auto grid max-w-6xl gap-12 px-4 pb-24 sm:px-6 lg:grid-cols-12">
        <article className="min-w-0 lg:col-span-8">
          <LegalKeyPoints points={doc.keyPoints} />
          <div className="mt-6">
            <Markdown source={doc.body} />
          </div>
          {(LEGAL.legalEntity || LEGAL.address) && (
            <p className="mt-10 border-t border-dash pt-6 body-sm-regular text-primary-300">
              {[LEGAL.legalEntity, LEGAL.address].filter(Boolean).join(" · ")}
            </p>
          )}
        </article>
        <aside className="lg:col-span-4">
          <div className="space-y-5 lg:sticky lg:top-24">
            <ArticleToc headings={headings} />
            <LegalNav current={doc.slug} />
          </div>
        </aside>
      </div>
    </>
  );
}

export default LegalPage;
