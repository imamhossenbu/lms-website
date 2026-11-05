"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Link2 } from "lucide-react";
import { toast } from "sonner";
import { SocialIcon } from "@/components/layout/footer/SocialIcon";

/** Copy link (with a toast) and share to X, LinkedIn and Facebook. */
export function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = React.useState(false);
  const url = () => window.location.href.split("#")[0];
  const open = (network: "x" | "linkedin" | "facebook") => {
    const u = encodeURIComponent(url());
    const t = encodeURIComponent(title);
    const href =
      network === "x" ? `https://twitter.com/intent/tweet?url=${u}&text=${t}` : network === "linkedin" ? `https://www.linkedin.com/sharing/share-offsite/?url=${u}` : `https://www.facebook.com/sharer/sharer.php?u=${u}`;
    window.open(href, "_blank", "noopener,noreferrer,width=640,height=560");
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url());
      setCopied(true);
      toast.success("Link copied", { description: "Paste it anywhere to share this article." });
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy the link", { description: "Copy it from the address bar instead." });
    }
  };
  const btn = "flex h-10 w-10 items-center justify-center rounded-xl border border-dash bg-white text-primary-500 transition-colors hover:border-brand-orange hover:text-brand-orange";

  return (
    <div className="rounded-2xl border border-dash bg-white p-5">
      <p className="body-xsm-medium font-semibold uppercase tracking-wide text-primary-400">Share this article</p>
      <div className="mt-4 flex gap-2">
        <motion.button type="button" whileTap={{ scale: 0.92 }} onClick={copy} className={btn} aria-label="Copy link">
          {copied ? <Check className="h-4 w-4 text-green" /> : <Link2 className="h-4 w-4" />}
        </motion.button>
        {(["x", "linkedin", "facebook"] as const).map((n) => (
          <motion.button key={n} type="button" whileTap={{ scale: 0.92 }} whileHover={{ y: -2 }} onClick={() => open(n)} className={btn} aria-label={`Share on ${n === "x" ? "X" : n === "linkedin" ? "LinkedIn" : "Facebook"}`}>
            <SocialIcon network={n} className="h-4 w-4" />
          </motion.button>
        ))}
      </div>
    </div>
  );
}

export default ShareButtons;
