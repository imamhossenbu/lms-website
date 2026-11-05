"use client";

import React, { useSyncExternalStore } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Sparkles, X } from "lucide-react";

const KEY = "edupro-announcement-dismissed:ai-assistant";
const EVENT = "edupro-announcement";

const subscribe = (cb: () => void) => {
  window.addEventListener("storage", cb);
  window.addEventListener(EVENT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(EVENT, cb);
  };
};
/** Hidden on the server and until we know it wasn't dismissed (no flash for people who closed it). */
const useDismissed = () => useSyncExternalStore(subscribe, () => localStorage.getItem(KEY) === "1", () => true);

/** Slim orange strip above the header with the latest news; dismissing it is remembered in this browser. */
export function AnnouncementBar() {
  const dismissed = useDismissed();
  const close = () => {
    localStorage.setItem(KEY, "1");
    window.dispatchEvent(new Event(EVENT));
  };

  return (
    <AnimatePresence initial={false}>
      {!dismissed && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="relative overflow-hidden bg-gradient-to-r from-brand-orange via-brand-orange-hover to-brand-orange text-white"
        >
          <motion.span
            className="pointer-events-none absolute inset-y-0 w-1/4 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent"
            initial={{ left: "-30%" }}
            animate={{ left: "130%" }}
            transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut" }}
            aria-hidden
          />
          <div className="relative mx-auto flex max-w-7xl items-center justify-center gap-3 px-10 py-2 text-center">
            <Sparkles className="hidden h-4 w-4 shrink-0 sm:block" />
            <p className="body-xsm-medium">
              <span className="font-semibold">New:</span> the AI assistant drafts course outlines and quiz questions in seconds.{" "}
              <Link href="/features" className="group inline-flex items-center gap-1 font-semibold underline-offset-2 hover:underline">
                See what&apos;s new
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </p>
            <motion.button
              type="button"
              onClick={close}
              whileTap={{ scale: 0.9 }}
              className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/15 hover:text-white"
              aria-label="Dismiss announcement"
            >
              <X className="h-3.5 w-3.5" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AnnouncementBar;
