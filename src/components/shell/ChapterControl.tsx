"use client";

import { useNexusStore } from "@/lib/store";
import { ARC_END, ARC_START } from "@/lib/types";
import { useMounted } from "@/lib/useMounted";

const MODES = [
  { id: "chapter", label: "Manga·Ch" },
  { id: "full", label: "Full" },
] as const;

/**
 * Global spoiler control: reading mode + chapter bound. Everything on the
 * site re-derives its state from this.
 */
export function ChapterControl({ large = false }: { large?: boolean }) {
  const mounted = useMounted();
  const mode = useNexusStore((s) => s.spoilerMode);
  const chapter = useNexusStore((s) => s.spoilerChapter);
  const setMode = useNexusStore((s) => s.setSpoilerMode);
  const setChapter = useNexusStore((s) => s.setSpoilerChapter);

  const effMode = mounted ? mode : "full";
  const effChapter = mounted ? chapter : ARC_END;

  return (
    <fieldset
      className={`flex items-center gap-3 border-0 p-0 ${large ? "flex-wrap" : ""}`}
      aria-label="Spoiler scope"
    >
      <div className="flex border border-line">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setMode(m.id)}
            className={`px-2 py-1 font-mono text-[10px] uppercase tracking-widest transition-colors ${
              effMode === m.id
                ? "bg-gold/15 text-gold-bright"
                : "text-muted hover:text-parchment"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>
      {effMode === "chapter" && (
        <div
          className={`flex items-center gap-2 ${large ? "min-w-64 flex-1" : ""}`}
        >
          <input
            type="range"
            min={ARC_START}
            max={ARC_END}
            value={effChapter}
            onChange={(e) => setChapter(Number(e.target.value))}
            className={`accent-[var(--gold)] ${large ? "w-full" : "w-24 lg:w-36"}`}
            aria-label="Spoiler chapter"
          />
          <span className="font-mono text-xs tracking-wider text-gold-bright">
            {effChapter}
          </span>
        </div>
      )}
    </fieldset>
  );
}
