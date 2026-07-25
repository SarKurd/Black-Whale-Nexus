"use client";

import { useMemo, useState } from "react";
import { Monogram } from "@/components/ui/kit";
import type { Character } from "@/lib/types";

/** Typeahead over a pre-gated candidate list, with portrait rows. */
export function CharacterPicker({
  candidates,
  value,
  onChange,
}: {
  candidates: Character[];
  value: string;
  onChange: (characterId: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    const hits = candidates.filter((c) => c.name.toLowerCase().includes(q));
    hits.sort((a, b) => {
      const aStarts = a.name.toLowerCase().startsWith(q) ? 0 : 1;
      const bStarts = b.name.toLowerCase().startsWith(q) ? 0 : 1;
      return aStarts - bStarts || a.name.localeCompare(b.name);
    });
    return hits.slice(0, 8);
  }, [query, candidates]);

  // Resolving from the pre-gated candidates keeps a stale selection from
  // rendering a beyond-clearance name after the reader lowers clearance.
  const selected = value ? candidates.find((c) => c.id === value) : undefined;

  return (
    <span className="flex flex-wrap items-center gap-2">
      <span className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
          }}
          placeholder={selected ? "Switch subject…" : "Name…"}
          aria-label="Find a subject"
          className="w-44 border border-line bg-transparent px-2 py-1 font-mono text-xs text-parchment placeholder:text-faint focus:border-gold-line focus:outline-none"
        />
        {open && matches.length > 0 && (
          <ul
            className="absolute left-0 top-full z-40 mt-1 w-56 border border-line-strong bg-bg-deep/95 backdrop-blur-[2px]"
            onMouseDown={(e) => e.preventDefault()}
          >
            {matches.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(c.id);
                    setQuery("");
                    setOpen(false);
                  }}
                  className="flex w-full items-center gap-2 px-2 py-1.5 text-left text-xs text-parchment hover:bg-raised hover:text-gold-bright"
                >
                  <Monogram characterId={c.id} size="sm" />
                  <span className="min-w-0 truncate">{c.name}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </span>
      {selected && (
        <span className="flex items-center gap-2 border border-line px-2 py-1">
          <Monogram characterId={selected.id} size="sm" />
          <span className="font-mono text-xs uppercase tracking-widest text-gold-bright">
            {selected.name}
          </span>
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Clear subject"
            className="font-mono text-[10px] text-faint hover:text-gold-bright"
          >
            ✕
          </button>
        </span>
      )}
    </span>
  );
}
