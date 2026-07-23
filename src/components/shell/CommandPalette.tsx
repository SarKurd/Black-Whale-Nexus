"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  characterById,
  characters,
  events,
  factions,
  glossary,
  knowledgeFacts,
  locations,
  mysteries,
  nenAbilities,
  princes,
  sortedChapters,
  storylines,
  theories,
} from "@/lib/db";
import { useEffectiveChapter } from "@/lib/store";
import { ARC_END } from "@/lib/types";

interface SearchItem {
  id: string;
  label: string;
  sub: string;
  kind: string;
  href: string;
  /** Concatenated haystack, lowercase. */
  hay: string;
  /** Hidden until the reader reaches this chapter. */
  revealCh: number;
}

function buildIndex(): SearchItem[] {
  const items: SearchItem[] = [];
  for (const c of characters) {
    items.push({
      id: c.id,
      label: c.name,
      sub: c.role,
      kind: "Character",
      href: `/characters/${c.id}`,
      hay: `${c.name} ${(c.aliases ?? []).join(" ")} ${c.role} ${(c.tags ?? []).join(" ")}`.toLowerCase(),
      revealCh: c.introducedCh,
    });
  }
  for (const p of princes) {
    const c = characterById.get(p.characterId);
    items.push({
      id: p.id,
      label: `Prince ${c?.name ?? p.characterId}`,
      sub: `${ordinal(p.rank)} Prince of Kakin`,
      kind: "Prince",
      href: `/princes/${p.id}`,
      hay: `prince ${c?.name} ${ordinal(p.rank)} ${p.motherName}`.toLowerCase(),
      revealCh: 358,
    });
  }
  for (const f of factions) {
    items.push({
      id: f.id,
      label: f.name,
      sub: "Faction",
      kind: "Faction",
      href: `/factions/${f.id}`,
      hay: `${f.name} ${f.summary}`.toLowerCase(),
      revealCh: f.introducedCh,
    });
  }
  for (const ch of sortedChapters) {
    items.push({
      id: `ch-${ch.number}`,
      label: `Chapter ${ch.number}: ${ch.title}`,
      sub: ch.summary.slice(0, 80),
      kind: "Chapter",
      href: `/chapters/${ch.number}`,
      hay: `chapter ${ch.number} ${ch.title} ${ch.summary}`.toLowerCase(),
      revealCh: ch.number,
    });
  }
  for (const a of nenAbilities) {
    items.push({
      id: a.id,
      label: a.name,
      sub: `Nen · ${a.nenType}`,
      kind: "Ability",
      href: `/nen/${a.id}`,
      hay: `${a.name} ${a.description} ${a.nenType}`.toLowerCase(),
      revealCh: a.revealCh,
    });
  }
  for (const l of locations) {
    items.push({
      id: l.id,
      label: l.name,
      sub: `Location${l.tier ? ` · Tier ${l.tier}` : ""}`,
      kind: "Location",
      href: `/map?location=${l.id}`,
      hay: `${l.name} ${l.description}`.toLowerCase(),
      revealCh: l.introducedCh,
    });
  }
  for (const s of storylines) {
    items.push({
      id: s.id,
      label: s.name,
      sub: "Storyline",
      kind: "Storyline",
      href: `/storylines/${s.id}`,
      hay: `${s.name} ${s.summary}`.toLowerCase(),
      revealCh: s.introducedCh,
    });
  }
  for (const e of events) {
    items.push({
      id: e.id,
      label: e.title,
      sub: `Event · Ch.${e.chapter}`,
      kind: "Event",
      href: `/timeline?event=${e.id}`,
      hay: `${e.title} ${e.summary}`.toLowerCase(),
      revealCh: e.chapter,
    });
  }
  for (const m of mysteries) {
    items.push({
      id: m.id,
      label: m.question,
      sub: "Mystery",
      kind: "Mystery",
      href: `/mysteries#${m.id}`,
      hay: `${m.question} ${m.summary}`.toLowerCase(),
      revealCh: m.introducedCh,
    });
  }
  for (const t of theories) {
    items.push({
      id: t.id,
      label: t.claim,
      sub: "Theory",
      kind: "Theory",
      href: `/theories#${t.id}`,
      hay: `${t.claim} ${t.summary}`.toLowerCase(),
      revealCh: Math.min(...t.chapters, ARC_END),
    });
  }
  for (const g of glossary) {
    items.push({
      id: g.id,
      label: g.term,
      sub: "Glossary",
      kind: "Term",
      href: `/glossary#${g.id}`,
      hay: `${g.term} ${g.definition}`.toLowerCase(),
      revealCh: g.introducedCh,
    });
  }
  for (const f of knowledgeFacts) {
    items.push({
      id: f.id,
      label: f.label,
      sub: "Intel fact",
      kind: "Fact",
      href: `/knowledge?fact=${f.id}`,
      hay: `${f.label} ${f.description}`.toLowerCase(),
      revealCh: f.readerRevealCh,
    });
  }
  return items;
}

function ordinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] ?? s[v] ?? s[0]);
}

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
  const index = useMemo(buildIndex, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const visible = index.filter((i) => i.revealCh <= ch);
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
  }, [query, index, ch]);

  useEffect(() => {
    setSelected(0);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelected(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

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
            <ul className="max-h-[50vh] overflow-y-auto py-1">
              {results.length === 0 && (
                <li className="px-4 py-6 text-center font-mono text-xs text-faint">
                  No records within current clearance.
                </li>
              )}
              {results.map((item, i) => (
                <li key={`${item.kind}-${item.id}`}>
                  <button
                    type="button"
                    onClick={() => go(item)}
                    onMouseEnter={() => setSelected(i)}
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
