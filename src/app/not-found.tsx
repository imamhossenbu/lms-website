import React from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-4 py-28 text-center">
      <span className="heading-display-h1 text-brand-orange">404</span>
      <h1 className="heading-h3 text-primary-500 mt-3">This page doesn&apos;t exist</h1>
      <p className="body-regular text-primary-300 mt-2">The link may be old, or the page has moved.</p>
      <ButtonLink href="/" className="mt-8">
        Back to home
      </ButtonLink>
    </section>
  );
}
