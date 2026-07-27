"use client";

import { useMemo, useRef, useState } from "react";
import { Monogram, StatusChip } from "@/components/ui/kit";
import { characterById, characters, locationById, locations } from "@/lib/db";
import { locationAt, statusAt } from "@/lib/spoiler";
import { ARC_START } from "@/lib/types";
import { CANONICITY_COLOR, isAboard } from "./occupancy";

/**
 * "Track subject" — find a character, pin them on the blueprint, and walk
 * their reader-visible movement log. Candidates and log entries are gated by
 * the clearance chapter `ch`; the readout reflects the replayed `displayCh`.
 */
export function SubjectTracker({
  ch,
  displayCh,
  trackedId,
  onTrack,
  onSelectLocation,
  onViewChapter,
}: {
  ch: number;
  displayCh: number;
  trackedId: string | null;
  onTrack: (characterId: string | null) => void;
  onSelectLocation: (locationId: string) => void;
  onViewChapter: (ch: number) => void;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    const visibleCharacters = characters
      .filter((c) => c.introducedCh <= ch && c.name.toLowerCase().includes(q))
      .map((character) => ({
        kind: "character" as const,
        id: character.id,
        name: character.name,
        character,
      }));
    const visibleLocations = locations
      .filter(
        (location) =>
          location.introducedCh <= ch &&
          location.name.toLowerCase().includes(q),
      )
      .map((location) => ({
        kind: "location" as const,
        id: location.id,
        name: location.name,
        location,
      }));
    return [...visibleCharacters, ...visibleLocations]
      .sort((a, b) => {
        const aStarts = a.name.toLowerCase().startsWith(q) ? 0 : 1;
        const bStarts = b.name.toLowerCase().startsWith(q) ? 0 : 1;
        return (
          aStarts - bStarts ||
          (a.kind === b.kind ? 0 : a.kind === "character" ? -1 : 1) ||
          a.name.localeCompare(b.name)
        );
      })
      .slice(0, 10);
  }, [query, ch]);

  const tracked = trackedId ? characterById.get(trackedId) : undefined;
  const resolved =
    tracked && tracked.introducedCh <= displayCh
      ? locationAt(tracked, displayCh)
      : undefined;
  const location = resolved ? locationById.get(resolved.locationId) : undefined;
  const status = tracked ? statusAt(tracked, displayCh) : undefined;

  const log = useMemo(() => {
    if (!tracked) return [];
    return tracked.locationHistory
      .filter((entry) => (entry.revealCh ?? entry.ch) <= ch)
      .slice()
      .sort((a, b) => a.ch - b.ch);
  }, [tracked, ch]);

  const activeLogCh = useMemo(() => {
    let best = -1;
    for (const entry of log) {
      const rev = entry.revealCh ?? entry.ch;
      if (rev <= displayCh && entry.ch >= best) best = entry.ch;
    }
    return best;
  }, [log, displayCh]);

  return (
    <div className="mb-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="intel-label">Find on map</span>
        <div className="relative min-w-52 flex-1 sm:max-w-sm">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Person or location…"
            aria-label="Find a person or location on the map"
            className="w-full border border-line bg-transparent px-2.5 py-1.5 font-mono text-xs text-parchment placeholder:text-faint focus:border-gold-line focus:outline-none"
          />
          {matches.length > 0 && (
            <ul className="absolute left-0 top-full z-40 mt-1 w-full min-w-72 border border-line-strong bg-bg-deep/95 backdrop-blur-[2px]">
              {matches.map((match) => (
                <li key={`${match.kind}-${match.id}`}>
                  <button
                    type="button"
                    onClick={() => {
                      if (match.kind === "character") onTrack(match.id);
                      else onSelectLocation(match.id);
                      setQuery("");
                    }}
                    className="flex w-full items-center gap-2 px-2 py-1.5 text-left text-xs text-parchment hover:bg-raised hover:text-gold-bright"
                  >
                    {match.kind === "character" ? (
                      <Monogram characterId={match.id} size="sm" />
                    ) : (
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-line font-mono text-[9px] uppercase text-teal">
                        L
                      </span>
                    )}
                    <span className="min-w-0 flex-1 truncate">
                      {match.name}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-faint">
                      {match.kind}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {tracked && (
          <button
            type="button"
            onClick={() => onTrack(null)}
            className="border border-line px-1.5 py-1 font-mono text-[10px] uppercase tracking-wider text-faint hover:border-gold-line hover:text-gold-bright"
          >
            ✕ clear
          </button>
        )}
      </div>

      {tracked && (
        <div className="mt-2 border border-line bg-bg-deep/60 p-2">
          <div className="flex items-center gap-2.5">
            <Monogram characterId={tracked.id} size="sm" />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-widest text-gold-bright">
                  {tracked.name}
                </span>
                {status && (
                  <StatusChip status={status.status} note={status.note} />
                )}
              </div>
              <div className="mt-0.5 font-mono text-[10px] tracking-wide text-muted">
                {tracked.introducedCh > displayCh ? (
                  <>Not yet in the record at ch {displayCh}.</>
                ) : !resolved || !location ? (
                  <>Position unrecorded at ch {displayCh}.</>
                ) : (
                  <>
                    {!isAboard(location.id) && (
                      <span className="text-warn">OFF SHIP — </span>
                    )}
                    <span className="text-parchment">
                      {location.name.toUpperCase()}
                    </span>
                    <span className="text-faint">
                      {" "}
                      · since ch {resolved.sinceCh}
                    </span>
                    <span
                      className="ml-2 uppercase"
                      style={{ color: CANONICITY_COLOR[location.canonicity] }}
                    >
                      {location.canonicity}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {log.length > 0 && (
            <div className="mt-2 flex flex-wrap items-center gap-1.5 border-t border-line pt-2">
              <span className="intel-label">Movement log</span>
              {log.map((entry) => {
                const active = entry.ch === activeLogCh;
                const jumpCh = Math.max(entry.revealCh ?? entry.ch, ARC_START);
                return (
                  <button
                    key={`${entry.ch}-${entry.revealCh ?? entry.ch}-${entry.locationId}`}
                    type="button"
                    onClick={() => onViewChapter(jumpCh)}
                    title={entry.note}
                    className={`border px-1.5 py-px font-mono text-[10px] tracking-wider transition-colors ${
                      active
                        ? "border-gold-line text-gold-bright"
                        : "border-line text-muted hover:border-line-strong hover:text-parchment"
                    }`}
                  >
                    ch {entry.ch}
                    {entry.revealCh && entry.revealCh !== entry.ch
                      ? ` (rev.${entry.revealCh})`
                      : ""}
                    {" ▸ "}
                    {locationById.get(entry.locationId)?.name ??
                      entry.locationId}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
