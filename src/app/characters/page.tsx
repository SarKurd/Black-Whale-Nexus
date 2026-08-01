"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useMemo } from "react";
import {
  ArchiveNote,
  Monogram,
  SectionHeading,
  StatusChip,
  Tag,
} from "@/components/ui/kit";
import { characters } from "@/data/characters";
import { factions } from "@/data/factions";
import { statusAt } from "@/lib/spoiler";
import { useEffectiveChapter } from "@/lib/store";
import type { CharacterStatus } from "@/lib/types";
import { useUrlString } from "@/lib/urlState";

const factionById = new Map(factions.map((faction) => [faction.id, faction]));

const STATUS_FILTERS: (CharacterStatus | "all")[] = [
  "all",
  "alive",
  "dead",
  "missing",
  "detained",
  "possessed",
  "unknown",
];

export default function CharactersPage() {
  const ch = useEffectiveChapter();
  const [query, setQuery] = useUrlString("q", "");
  const [faction, setFaction] = useUrlString("faction", "all");
  const [statusValue, setStatus] = useUrlString("status", "all", (value) =>
    STATUS_FILTERS.includes(value as CharacterStatus | "all"),
  );
  const status = statusValue as CharacterStatus | "all";

  const visibleFactions = useMemo(
    () =>
      factions
        .filter((f) => f.introducedCh <= ch)
        .sort((a, b) => a.name.localeCompare(b.name)),
    [ch],
  );

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return characters
      .filter((c) => c.introducedCh <= ch)
      .map((c) => ({ c, st: statusAt(c, ch) }))
      .filter(({ c, st }) => {
        if (faction !== "all" && !c.factionIds.includes(faction)) return false;
        if (status !== "all" && st?.status !== status) return false;
        if (
          q &&
          !`${c.name} ${(c.aliases ?? []).join(" ")} ${c.role}`
            .toLowerCase()
            .includes(q)
        )
          return false;
        return true;
      })
      .sort((a, b) => a.c.name.localeCompare(b.c.name));
  }, [ch, query, faction, status]);

  return (
    <div>
      <div className="archive-page-header mb-6">
        <div className="intel-label-gold">Registry · Personnel files</div>
        <h1 className="royal-heading text-3xl">Character Dossiers</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted">
          Every person of interest aboard, reconstructed to your clearance.
          Subjects not yet introduced at chapter {ch} are withheld.
        </p>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Filter character dossiers"
          placeholder="Filter by name, alias, role…"
          className="w-64 border border-line bg-panel px-3 py-1.5 text-sm text-ivory outline-none placeholder:text-faint focus:border-gold-line"
        />
        <select
          value={faction}
          onChange={(e) => setFaction(e.target.value)}
          aria-label="Filter characters by faction"
          className="border border-line bg-panel px-2 py-1.5 text-sm text-parchment outline-none"
        >
          <option value="all">All factions</option>
          {visibleFactions.map((f) => (
            <option key={f.id} value={f.id}>
              {f.name}
            </option>
          ))}
        </select>
        <div className="flex flex-wrap gap-1">
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatus(s)}
              aria-pressed={status === s}
              className={`border px-2 py-1 font-mono text-[10px] uppercase tracking-widest transition-colors ${
                status === s
                  ? "border-gold-line bg-gold/10 text-gold-bright"
                  : "border-line text-muted hover:text-parchment"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <span className="ml-auto font-mono text-[10px] tracking-widest text-faint">
          {rows.length} on file
        </span>
      </div>

      {rows.length === 0 ? (
        <ArchiveNote>No personnel records match at this clearance.</ArchiveNote>
      ) : (
        <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
          {rows.map(({ c, st }, index) => {
            const fac = c.factionIds[0]
              ? factionById.get(c.factionIds[0])
              : undefined;
            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.2,
                  delay: Math.min(index, 12) * 0.02,
                }}
              >
                <Link
                  href={`/characters/${c.id}`}
                  className="dossier corner-ticks group flex h-full min-w-0 gap-3 p-3 transition-colors hover:border-gold-line"
                >
                  <Monogram characterId={c.id} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="truncate text-base text-ivory group-hover:text-gold-bright">
                        {c.name}
                      </span>
                      {st && <StatusChip status={st.status} />}
                    </div>
                    <div className="truncate text-xs text-muted">{c.role}</div>
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      {fac && (
                        <span
                          className="border px-1.5 py-px font-mono text-[9px] uppercase tracking-wider"
                          style={{
                            color: fac.color,
                            borderColor:
                              "color-mix(in srgb, currentColor 35%, transparent)",
                          }}
                        >
                          {fac.name}
                        </span>
                      )}
                      {c.incomplete && <Tag>partial file</Tag>}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}

      <div className="mt-8">
        <SectionHeading>Archive note</SectionHeading>
        <p className="max-w-2xl text-xs text-faint">
          Dossiers marked “partial file” are knowingly incomplete — the manga
          has not yet supplied the missing sections. Nothing here is invented to
          fill gaps.
        </p>
      </div>
    </div>
  );
}
