"use client";

import React from "react";
import { motion } from "framer-motion";
import { CloudOff, Newspaper, SearchX } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";

const STATES = {
  none: { icon: Newspaper, title: "The first articles are on their way", text: "We're writing guides on teaching online, running live classes and growing an academy. Check back soon." },
  noResults: { icon: SearchX, title: "No articles match", text: "Try another word or pick a different category." },
  error: { icon: CloudOff, title: "Articles couldn't load", text: "Please refresh the page in a moment." },
};

/** Empty / no-results / error states for the blog list. */
export function BlogEmpty({ kind }: { kind: keyof typeof STATES }) {
  const { icon: Icon, title, text } = STATES[kind];
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mx-auto flex max-w-lg flex-col items-center rounded-3xl border border-dashed border-brand-orange-20 bg-brand-orange-soft px-6 py-14 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-brand-orange shadow-sm">
        <Icon className="h-7 w-7" />
      </span>
      <h2 className="heading-h5 mt-5 text-primary-500">{title}</h2>
      <p className="mt-2 body-regular text-primary-300">{text}</p>
      {kind === "noResults" && (
        <ButtonLink href="/blog" variant="secondary" className="mt-6">
          Show all articles
        </ButtonLink>
      )}
    </motion.div>
  );
}

export default BlogEmpty;
