"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import type { Evidence } from "@/lib/types";
import { ChapterRef, ConfidenceBadge } from "./kit";

const FOCUSABLE =
  'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * A single, reusable source ledger for claims across the archive.
 * It keeps the page readable while making every supporting citation reachable.
 */
export function EvidenceDrawer({
  title,
  evidence,
  summary,
  label,
}: {
  title: string;
  evidence: Evidence[];
  summary?: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !drawerRef.current) return;
      const focusable = [
        ...drawerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ];
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      root.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      triggerRef.current?.focus();
    };
  }, [open]);

  if (evidence.length === 0) return null;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="inline-flex items-center gap-1 border border-line px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-teal transition-colors hover:border-gold-line hover:text-gold-bright"
      >
        <span aria-hidden>⌕</span>
        {label ??
          `${evidence.length} source${evidence.length === 1 ? "" : "s"}`}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex justify-end bg-bg-deep/80 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.14 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setOpen(false);
            }}
          >
            <motion.div
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className="dossier dossier-gold corner-ticks h-full w-full max-w-lg overflow-y-auto p-5 shadow-2xl"
              initial={{ x: 36 }}
              animate={{ x: 0 }}
              exit={{ x: 36 }}
              transition={{ type: "tween", duration: 0.18 }}
            >
              <div className="flex items-start justify-between gap-4 border-b border-line pb-3">
                <div>
                  <div className="intel-label-gold">Source ledger</div>
                  <h2 id={titleId} className="royal-heading mt-1 text-xl">
                    {title}
                  </h2>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  className="border border-line px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-muted hover:border-gold-line hover:text-parchment"
                  aria-label="Close evidence drawer"
                >
                  Close
                </button>
              </div>

              {summary && (
                <p className="mt-3 text-sm leading-relaxed text-parchment">
                  {summary}
                </p>
              )}

              <ol className="mt-4 space-y-3">
                {evidence.map((item, index) => (
                  <li
                    key={`${item.chapter}-${item.note}-${index}`}
                    className="border-l-2 border-gold-line bg-bg-deep/40 p-3"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[9px] text-faint">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <ChapterRef ch={item.chapter} />
                      <ConfidenceBadge level={item.confidence} />
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-parchment">
                      {item.note}
                    </p>
                  </li>
                ))}
              </ol>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
