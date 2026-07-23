"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  type CSSProperties,
  Suspense,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  EVENT_KIND_META,
  EventEntry,
  RecorderList,
} from "@/components/story/EventRecorder";
import { ArchiveNote, SectionHeading } from "@/components/ui/kit";
import {
  chapterByNumber,
  characterById,
  characters,
  events,
  eventsByParticipant,
  eventsByStoryline,
  factions,
  locations,
  princeById,
  princes,
  storylineById,
  storylines,
} from "@/lib/db";
import { useEffectiveChapter } from "@/lib/store";
import type {
  Character,
  EventKind,
  Faction,
  Prince,
  ShipLocation,
  StoryEvent,
  Storyline,
} from "@/lib/types";

const MODES = [
  ["chapter", "Chapter"],
  ["day", "Voyage day"],
  ["storyline", "By storyline"],
  ["character", "By character"],
] as const;
type Mode = (typeof MODES)[number][0];

const ALL_KINDS = Object.keys(EVENT_KIND_META) as EventKind[];

/** Voyage day of an event: explicit, else derived from its chapter's day range. */
function eventDay(e: StoryEvent): number | undefined {
  if (e.day !== undefined) return e.day;
  const chapterDay = chapterByNumber.get(e.chapter)?.day;
  if (!chapterDay) return undefined;
  const parsed = Number.parseInt(chapterDay, 10);
  return Number.isNaN(parsed) ? undefined : parsed;
}

/** Group a chapter's events by their leading storyline for parallel columns. */
function splitByStoryline(evts: StoryEvent[]): [string, StoryEvent[]][] {
  const map = new Map<string, StoryEvent[]>();
  for (const e of evts) {
    const key = e.storylineIds[0] ?? "general";
    const list = map.get(key) ?? [];
    list.push(e);
    map.set(key, list);
  }
  return [...map.entries()];
}

export default function TimelinePage() {
  return (
    <Suspense>
      <TimelineInner />
    </Suspense>
  );
}

function TimelineInner() {
  const ch = useEffectiveChapter();
  const params = useSearchParams();
  const highlightId = params.get("event") ?? undefined;

  const [mode, setMode] = useState<Mode>("chapter");
  const [kindFilter, setKindFilter] = useState<EventKind[]>([]);
  const [princeFilter, setPrinceFilter] = useState("");
  const [factionFilter, setFactionFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [storylineSel, setStorylineSel] = useState("");
  const [characterSel, setCharacterSel] = useState("");

  // Scroll to a deep-linked event once it is rendered.
  useEffect(() => {
    if (!highlightId) return;
    const timer = setTimeout(() => {
      document
        .getElementById(highlightId)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 300);
    return () => clearTimeout(timer);
  }, [highlightId]);

  const cleared = useMemo(() => events.filter((e) => e.chapter <= ch), [ch]);

  const filtered = useMemo(() => {
    return cleared.filter((e) => {
      if (kindFilter.length > 0 && !kindFilter.includes(e.kind)) return false;
      if (princeFilter) {
        const prince = princeById.get(princeFilter);
        const touchesPrince = e.participantIds.some(
          (id) =>
            id === prince?.characterId ||
            characterById.get(id)?.servesPrinceId === princeFilter,
        );
        if (!touchesPrince) return false;
      }
      if (
        factionFilter &&
        !e.participantIds.some((id) =>
          characterById.get(id)?.factionIds.includes(factionFilter),
        )
      )
        return false;
      if (locationFilter && e.locationId !== locationFilter) return false;
      return true;
    });
  }, [cleared, kindFilter, princeFilter, factionFilter, locationFilter]);

  const chapterGroups = useMemo(() => {
    const map = new Map<number, StoryEvent[]>();
    for (const e of filtered) {
      const list = map.get(e.chapter) ?? [];
      list.push(e);
      map.set(e.chapter, list);
    }
    return [...map.entries()].sort((a, b) => a[0] - b[0]);
  }, [filtered]);

  const dayGroups = useMemo(() => {
    const map = new Map<number, StoryEvent[]>();
    const undated: StoryEvent[] = [];
    for (const e of filtered) {
      const day = eventDay(e);
      if (day === undefined) {
        undated.push(e);
        continue;
      }
      const list = map.get(day) ?? [];
      list.push(e);
      map.set(day, list);
    }
    const dated = [...map.entries()].sort((a, b) => a[0] - b[0]);
    for (const [, list] of dated) list.sort((a, b) => a.chapter - b.chapter);
    undated.sort((a, b) => a.chapter - b.chapter);
    return { dated, undated };
  }, [filtered]);

  const visibleStorylines = useMemo<Storyline[]>(
    () => storylines.filter((s: Storyline) => s.introducedCh <= ch),
    [ch],
  );
  const visibleCharacters = useMemo<Character[]>(
    () =>
      characters
        .filter((c: Character) => c.introducedCh <= ch)
        .sort((a: Character, b: Character) => a.name.localeCompare(b.name)),
    [ch],
  );
  const visiblePrinces = useMemo<Prince[]>(
    () =>
      princes.filter(
        (p: Prince) =>
          (characterById.get(p.characterId)?.introducedCh ?? 0) <= ch,
      ),
    [ch],
  );
  const visibleFactions = useMemo<Faction[]>(
    () =>
      factions
        .filter((f: Faction) => f.introducedCh <= ch)
        .sort((a: Faction, b: Faction) => a.name.localeCompare(b.name)),
    [ch],
  );
  const visibleLocations = useMemo<ShipLocation[]>(
    () =>
      locations
        .filter((l) => l.introducedCh <= ch)
        .sort((a, b) => a.name.localeCompare(b.name)),
    [ch],
  );

  // Membership set so per-thread lists reuse the chip/select filters cheaply.
  const filteredIds = useMemo(
    () => new Set(filtered.map((e) => e.id)),
    [filtered],
  );
  const applyEventFilters = (list: StoryEvent[]) =>
    list.filter((e) => filteredIds.has(e.id));

  const storylineEvents = storylineSel
    ? applyEventFilters(
        (eventsByStoryline.get(storylineSel) ?? []).filter(
          (e) => e.chapter <= ch,
        ),
      )
    : [];
  const characterEvents = characterSel
    ? applyEventFilters(
        (eventsByParticipant.get(characterSel) ?? []).filter(
          (e) => e.chapter <= ch,
        ),
      )
    : [];

  const selectClass =
    "border border-line bg-panel px-2 py-1.5 text-xs text-parchment outline-none";

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="intel-label-gold">Voyage recorder</div>
          <h1 className="royal-heading text-3xl">Timeline</h1>
          <p className="mt-1 max-w-2xl text-xs text-muted">
            Every incident on file, replayed in the order the archive holds it.
            Parallel columns mark threads unfolding simultaneously within a
            chapter. Nothing beyond your clearance is written here.
          </p>
        </div>
      </div>

      {/* Mode tabs */}
      <div className="mb-4 flex flex-wrap gap-1 border-b border-line">
        {MODES.map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setMode(value)}
            className={`-mb-px border-b-2 px-3 py-2 font-mono text-[11px] uppercase tracking-widest transition-colors ${
              mode === value
                ? "border-gold text-gold-bright"
                : "border-transparent text-muted hover:text-parchment"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="dossier corner-ticks mb-5 space-y-3 p-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="intel-label mr-1">Kind</span>
          {ALL_KINDS.map((k) => {
            const active = kindFilter.includes(k);
            const meta = EVENT_KIND_META[k];
            return (
              <button
                key={k}
                type="button"
                onClick={() =>
                  setKindFilter((prev) =>
                    prev.includes(k)
                      ? prev.filter((x) => x !== k)
                      : [...prev, k],
                  )
                }
                className="border px-1.5 py-px font-mono text-[9px] uppercase tracking-[0.12em] transition-colors"
                style={{
                  color: active ? meta.color : "var(--faint)",
                  borderColor: active
                    ? "color-mix(in srgb, currentColor 50%, transparent)"
                    : "var(--line)",
                  background: active
                    ? "color-mix(in srgb, currentColor 8%, transparent)"
                    : "transparent",
                }}
              >
                {meta.glyph} {meta.label}
              </button>
            );
          })}
          {kindFilter.length > 0 && (
            <button
              type="button"
              onClick={() => setKindFilter([])}
              className="ml-1 font-mono text-[9px] uppercase tracking-widest text-teal hover:text-gold-bright"
            >
              clear
            </button>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2">
            <span className="intel-label">Prince</span>
            <select
              value={princeFilter}
              onChange={(e) => setPrinceFilter(e.target.value)}
              className={selectClass}
            >
              <option value="">All camps</option>
              {visiblePrinces.map((p) => (
                <option key={p.id} value={p.id}>
                  {characterById.get(p.characterId)?.name ?? p.id}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2">
            <span className="intel-label">Faction</span>
            <select
              value={factionFilter}
              onChange={(e) => setFactionFilter(e.target.value)}
              className={selectClass}
            >
              <option value="">All factions</option>
              {visibleFactions.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2">
            <span className="intel-label">Location</span>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className={selectClass}
            >
              <option value="">Anywhere aboard</option>
              {visibleLocations.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name}
                </option>
              ))}
            </select>
          </label>
          <span className="ml-auto font-mono text-[10px] tracking-widest text-faint">
            {filtered.length} record{filtered.length === 1 ? "" : "s"} in view
          </span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.15 }}
        >
          {mode === "chapter" && (
            <ChapterModeView groups={chapterGroups} highlightId={highlightId} />
          )}

          {mode === "day" && (
            <div className="space-y-8">
              {dayGroups.dated.length === 0 &&
                dayGroups.undated.length === 0 && (
                  <ArchiveNote>
                    No incidents on file at this clearance and filter set.
                  </ArchiveNote>
                )}
              {dayGroups.dated.map(([day, evts]) => (
                <section key={day}>
                  <SectionHeading
                    right={
                      <span className="font-mono text-[10px] tracking-widest text-faint">
                        {evts.length} record{evts.length === 1 ? "" : "s"}
                      </span>
                    }
                  >
                    Day {day}
                  </SectionHeading>
                  <RecorderList>
                    {evts.map((e) => (
                      <EventEntry
                        key={e.id}
                        event={e}
                        highlighted={e.id === highlightId}
                      />
                    ))}
                  </RecorderList>
                </section>
              ))}
              {dayGroups.undated.length > 0 && (
                <section>
                  <SectionHeading>Undated</SectionHeading>
                  <RecorderList>
                    {dayGroups.undated.map((e) => (
                      <EventEntry
                        key={e.id}
                        event={e}
                        highlighted={e.id === highlightId}
                      />
                    ))}
                  </RecorderList>
                </section>
              )}
            </div>
          )}

          {mode === "storyline" && (
            <div>
              <label className="mb-4 flex flex-wrap items-center gap-2">
                <span className="intel-label">Thread</span>
                <select
                  value={storylineSel}
                  onChange={(e) => setStorylineSel(e.target.value)}
                  className={selectClass}
                >
                  <option value="">Select a storyline…</option>
                  {visibleStorylines.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
                {storylineSel && (
                  <Link
                    href={`/storylines/${storylineSel}`}
                    className="font-mono text-[10px] uppercase tracking-widest text-teal hover:text-gold-bright"
                  >
                    Open thread file →
                  </Link>
                )}
              </label>
              {!storylineSel ? (
                <ArchiveNote>
                  Select a storyline to replay its recorder entries.
                </ArchiveNote>
              ) : storylineEvents.length === 0 ? (
                <ArchiveNote>
                  No incidents on file for this thread at this clearance.
                </ArchiveNote>
              ) : (
                <RecorderList>
                  {storylineEvents.map((e) => (
                    <EventEntry
                      key={e.id}
                      event={e}
                      highlighted={e.id === highlightId}
                    />
                  ))}
                </RecorderList>
              )}
            </div>
          )}

          {mode === "character" && (
            <div>
              <label className="mb-4 flex flex-wrap items-center gap-2">
                <span className="intel-label">Subject</span>
                <select
                  value={characterSel}
                  onChange={(e) => setCharacterSel(e.target.value)}
                  className={selectClass}
                >
                  <option value="">Select a subject…</option>
                  {visibleCharacters.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                {characterSel && (
                  <Link
                    href={`/characters/${characterSel}`}
                    className="font-mono text-[10px] uppercase tracking-widest text-teal hover:text-gold-bright"
                  >
                    Open dossier →
                  </Link>
                )}
              </label>
              {!characterSel ? (
                <ArchiveNote>
                  Select a subject to replay their recorded movements.
                </ArchiveNote>
              ) : characterEvents.length === 0 ? (
                <ArchiveNote>
                  No incidents on file for this subject at this clearance.
                </ArchiveNote>
              ) : (
                <RecorderList>
                  {characterEvents.map((e) => (
                    <EventEntry
                      key={e.id}
                      event={e}
                      highlighted={e.id === highlightId}
                    />
                  ))}
                </RecorderList>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function ChapterModeView({
  groups,
  highlightId,
}: {
  groups: [number, StoryEvent[]][];
  highlightId?: string;
}) {
  if (groups.length === 0) {
    return (
      <ArchiveNote>
        No incidents on file at this clearance and filter set.
      </ArchiveNote>
    );
  }
  return (
    <div className="space-y-10">
      {groups.map(([num, evts]) => {
        const info = chapterByNumber.get(num);
        const columns = splitByStoryline(evts);
        return (
          <section key={num}>
            <div className="mb-3 flex items-baseline gap-3">
              <Link
                href={`/chapters/${num}`}
                className="font-mono text-lg tracking-widest text-gold hover:text-gold-bright"
              >
                CH.{num}
              </Link>
              {info && (
                <span className="royal-heading truncate text-base">
                  {info.title}
                </span>
              )}
              {info?.day && (
                <span className="font-mono text-[10px] uppercase tracking-widest text-faint">
                  Day {info.day}
                </span>
              )}
              <span className="h-px flex-1 bg-line" />
            </div>

            {columns.length > 1 ? (
              // Simultaneous threads: one column per storyline on lg screens.
              <div
                className="grid grid-cols-1 gap-x-6 gap-y-6 lg:[grid-template-columns:repeat(var(--cols),minmax(0,1fr))]"
                style={{ "--cols": columns.length } as CSSProperties}
              >
                {columns.map(([sid, colEvents]) => {
                  const storyline = storylineById.get(sid);
                  return (
                    <div key={sid} className="min-w-0">
                      <div className="mb-2 flex items-center gap-2 border-b border-line/60 pb-1.5">
                        <span
                          className="h-2 w-2 shrink-0 rounded-full"
                          style={{
                            background: storyline?.color ?? "var(--faint)",
                          }}
                        />
                        {storyline ? (
                          <Link
                            href={`/storylines/${storyline.id}`}
                            className="truncate font-mono text-[10px] uppercase tracking-widest hover:text-gold-bright"
                            style={{ color: storyline.color }}
                          >
                            {storyline.name}
                          </Link>
                        ) : (
                          <span className="font-mono text-[10px] uppercase tracking-widest text-faint">
                            General record
                          </span>
                        )}
                      </div>
                      <RecorderList>
                        {colEvents.map((e) => (
                          <EventEntry
                            key={e.id}
                            event={e}
                            highlighted={e.id === highlightId}
                            showChapter={false}
                          />
                        ))}
                      </RecorderList>
                    </div>
                  );
                })}
              </div>
            ) : (
              <RecorderList>
                {evts.map((e) => (
                  <EventEntry
                    key={e.id}
                    event={e}
                    highlighted={e.id === highlightId}
                    showChapter={false}
                  />
                ))}
              </RecorderList>
            )}
          </section>
        );
      })}
    </div>
  );
}
