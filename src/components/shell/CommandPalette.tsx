"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { type SearchItem, searchIndex } from "@/generated/searchIndex";
import { useEffectiveChapter } from "@/lib/store";

const KIND_COLOR: Record<string, string> = {
  Character: "var(--ivory)",
  Prince: "var(--gold)",
  Faction: "var(--teal)",
  Chapter: "var(--muted)",
  Ability: "var(--violet)",
  Location: "var(--teal)",
  Storyline: "var(--warn)",
  Event: "var(--muted)",
  Mystery: "var(--warn)",
  Theory: "var(--violet)",
  Term: "var(--faint)",
  Fact: "var(--teal)",
};

export function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const ch = useEffectiveChapter();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const visible = searchIndex.filter((i) => i.revealCh <= ch);
    if (!q) {
      return visible
        .filter((i) => i.kind === "Character" || i.kind === "Prince")
        .slice(0, 12);
    }
    const terms = q.split(/\s+/);
    return visible
      .map((i) => {
        let score = 0;
        for (const t of terms) {
          if (!i.hay.includes(t)) return null;
          score += i.label.toLowerCase().startsWith(t)
            ? 3
            : i.label.toLowerCase().includes(t)
              ? 2
              : 1;
        }
        return { i, score };
      })
      .filter((r): r is { i: SearchItem; score: number } => r !== null)
      .sort((a, b) => b.score - a.score)
      .slice(0, 20)
      .map((r) => r.i);
  }, [query, ch]);

  useEffect(() => {
    setSelected(0);
  }, []);

  useEffect(() => {
    if (open) {
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      setQuery("");
      setSelected(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
    return () => previousFocusRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = [
        ...dialogRef.current.querySelectorAll<HTMLElement>(
          'input, button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const go = useCallback(
    (item: SearchItem) => {
      onClose();
      router.push(item.href);
    },
    [onClose, router],
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center bg-bg-deep/80 pt-[12vh] backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12 }}
          onClick={onClose}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Search the archive"
            className="dossier dossier-gold corner-ticks w-full max-w-xl"
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 border-b border-line px-4 py-3">
              <span className="intel-label-gold">Query</span>
              <input
                ref={inputRef}
                value={query}
                aria-label="Search archive"
                aria-controls="archive-search-results"
                aria-activedescendant={
                  results[selected]
                    ? `archive-result-${results[selected].kind}-${results[selected].id}`
                    : undefined
                }
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setSelected((s) => Math.min(s + 1, results.length - 1));
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setSelected((s) => Math.max(s - 1, 0));
                  } else if (e.key === "Enter" && results[selected]) {
                    go(results[selected]);
                  } else if (e.key === "Escape") {
                    onClose();
                  }
                }}
                placeholder="Search characters, princes, abilities, chapters, mysteries…"
                className="w-full bg-transparent text-sm text-ivory outline-none placeholder:text-faint"
              />
              <kbd className="border border-line px-1 font-mono text-[9px] text-faint">
                ESC
              </kbd>
            </div>
            <ul
              id="archive-search-results"
              className="max-h-[50vh] overflow-y-auto py-1"
              aria-label="Search results"
            >
              {results.length === 0 && (
                <li className="px-4 py-6 text-center font-mono text-xs text-faint">
                  No records within current clearance.
                </li>
              )}
              {results.map((item, i) => (
                <li key={`${item.kind}-${item.id}`}>
                  <button
                    id={`archive-result-${item.kind}-${item.id}`}
                    type="button"
                    onClick={() => go(item)}
                    onMouseEnter={() => setSelected(i)}
                    aria-current={i === selected ? "true" : undefined}
                    className={`flex w-full items-baseline gap-3 px-4 py-2 text-left ${
                      i === selected ? "bg-gold/10" : ""
                    }`}
                  >
                    <span
                      className="w-16 shrink-0 font-mono text-[9px] uppercase tracking-widest"
                      style={{ color: KIND_COLOR[item.kind] ?? "var(--muted)" }}
                    >
                      {item.kind}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm text-ivory">
                        {item.label}
                      </span>
                      <span className="block truncate text-xs text-muted">
                        {item.sub}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
