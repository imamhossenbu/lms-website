"use client";

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { RotateCcw, VideoOff, X } from "lucide-react";

interface VideoModalProps {
  open: boolean;
  onClose: () => void;
  src: string;
  poster?: string;
  /** Accessible name of the dialog. */
  title: string;
}

type Status = "loading" | "ready" | "error";

const noop = () => () => {};
/** True only in the browser (after hydration), so the portal never renders on the server. */
const useIsClient = () => useSyncExternalStore(noop, () => true, () => false);

/**
 * Plays a video in a centred dialog over the page: fades/scales in, closes on Esc, backdrop click or the ✕ button,
 * locks page scroll while open. Shows a skeleton with a spinner ring while the video buffers and a friendly error
 * with "Try again" if it can't be loaded.
 */
export function VideoModal({ open, onClose, src, poster, title }: VideoModalProps) {
  const [status, setStatus] = useState<Status>("loading");
  const [attempt, setAttempt] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const isClient = useIsClient();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const retry = () => {
    setStatus("loading");
    setAttempt((a) => a + 1);
  };

  if (!isClient) return null;
  return createPortal(
    <AnimatePresence onExitComplete={() => setStatus("loading")}>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-primary-500/70 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="relative w-full max-w-4xl"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button
              ref={closeRef}
              type="button"
              onClick={onClose}
              whileTap={{ scale: 0.92 }}
              className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
              aria-label="Close video"
            >
              <X className="h-5 w-5" />
            </motion.button>

            <div className="relative aspect-video overflow-hidden rounded-2xl bg-primary-500 shadow-2xl">
              {status !== "error" && (
                <video
                  key={attempt}
                  src={src}
                  poster={poster}
                  controls
                  autoPlay
                  playsInline
                  onCanPlay={() => setStatus("ready")}
                  onError={() => setStatus("error")}
                  className="h-full w-full object-contain"
                />
              )}

              {status === "loading" && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-primary-500/40">
                  <motion.span
                    className="h-14 w-14 rounded-full border-4 border-white/25 border-t-white"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                    aria-label="Loading video"
                  />
                </div>
              )}

              {status === "error" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white">
                    <VideoOff className="h-7 w-7" />
                  </span>
                  <span className="heading-h6-bold text-white">This video couldn&apos;t be loaded</span>
                  <span className="body-sm-regular max-w-sm text-white/70">Check your connection and try again.</span>
                  <motion.button
                    type="button"
                    onClick={retry}
                    whileTap={{ scale: 0.95 }}
                    className="mt-2 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 body-sm-medium text-primary-500 transition-colors hover:bg-brand-orange-light"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Try again
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default VideoModal;
