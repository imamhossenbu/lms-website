"use client";

import React from "react";
import { ArrowRight, GraduationCap } from "lucide-react";
import { signupUrl } from "@/lib/site";
import { ButtonLink } from "@/components/ui/ButtonLink";

/** Small "try EduPro" card in the article sidebar. */
export function ArticleCtaCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-orange to-brand-orange-hover p-6 text-white shadow-xl shadow-brand-orange/25">
      <span className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-white/10" aria-hidden />
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
        <GraduationCap className="h-5 w-5" />
      </span>
      <p className="heading-h6-bold mt-4">Put this into practice</p>
      <p className="mt-1.5 body-sm-regular text-white/85">Run courses, live classes and payments from one admin panel.</p>
      <ButtonLink href={signupUrl()} variant="light" className="mt-5 w-full" icon={<ArrowRight className="h-4 w-4" />}>
        Start free trial
      </ButtonLink>
    </div>
  );
}

export default ArticleCtaCard;
