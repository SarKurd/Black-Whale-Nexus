"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  type CSSProperties,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { CharacterPicker } from "@/components/story/CharacterPicker";
import { EventRail, LANDMARK_KINDS } from "@/components/story/EventRail";
import {
  EVENT_KIND_META,
  EventEntry,
  RecorderList,
} from "@/components/story/EventRecorder";
import {
  ArchiveNote,
  ChapterRef,
  OrderToggle,
  SectionHeading,
  type SortDirection,
} from "@/components/ui/kit";
import {
  ancestorChain,
  chapterByNumber,
  characterById,
  characters,
  eventById,
  events,
  eventsByParticipant,
  eventsByStoryline,
  factions,
  locationById,
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
import { updateUrlState, useUrlString } from "@/lib/urlState";

const MODES = [
  ["landmarks", "Landmarks"],
  ["chapter", "Chapter"],
  ["day", "Voyage day"],
  ["storyline", "By storyline"],
  ["character", "By character"],
] as const;
type Mode = (typeof MODES)[number][0];

const ALL_KINDS = Object.keys(EVENT_KIND_META) as EventKind[];

type MovementRecord = Character["locationHistory"][number];
type TimelineRow =
  | { kind: "event"; event: StoryEvent }
  | { kind: "move"; move: MovementRecord };
type DaySection = {
  key: string;
  label: string;
  events: StoryEvent[];
  showMeta: boolean;
};

/** Voyage day of an event: explicit, else derived from its chapter's day range. */
function eventDay(e: StoryEvent): number | undefined {
  if (e.day !== undefined) return e.day;
  const chapterDay = chapterByNumber.get(e.chapter)?.day;
  if (!chapterDay) return undefined;
  const parsed = Number.parseInt(chapterDay, 10);
  return Number.isNaN(parsed) ? undefined : parsed;
}

const TIME_WORD_RANK: Record<string, number> = {
  "early hours": 3 * 60,
  morning: 9 * 60,
  afternoon: 13 * 60,
  evening: 19 * 60,
  night: 22 * 60,
};

/** Minutes-of-day ordinal for an approxTime string, clock or word form. */
function timeRank(approxTime?: string): number | undefined {
  if (!approxTime) return undefined;
  const clock = approxTime.match(/(\d{1,2}):(\d{2})\s*([ap])\.m\./);
  if (clock) {
    let hours = Number(clock[1]) % 12;
    if (clock[3] === "p") hours += 12;
    return hours * 60 + Number(clock[2]);
  }
  return TIME_WORD_RANK[approxTime.toLowerCase()];
}

/**
 * Chapter order first; within a chapter, refine by time of day only when
 * every event in that chapter carries one — mixed runs keep their authored
 * narrative order (a partial-time comparator would not be transitive).
 */
function sortDayEvents(list: StoryEvent[]): StoryEvent[] {
  const sorted = [...list].sort((a, b) => a.chapter - b.chapter);
  const out: StoryEvent[] = [];
  let i = 0;
  while (i < sorted.length) {
    let j = i;
    while (j < sorted.length && sorted[j].chapter === sorted[i].chapter) j += 1;
    const run = sorted.slice(i, j);
    const ranks = run.map((e) => timeRank(e.approxTime));
    if (run.length > 1 && ranks.every((r) => r !== undefined))
      run.sort(
        (a, b) =>
          (timeRank(a.approxTime) as number) -
          (timeRank(b.approxTime) as number),
      );
    out.push(...run);
    i = j;
  }
  return out;
}

function sortEventsByChapter(
  list: StoryEvent[],
  direction: SortDirection,
): StoryEvent[] {
  const chronological = [...list].sort((a, b) => a.chapter - b.chapter);
  return direction === "desc" ? chronological.reverse() : chronological;
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
    <Suspense fallback={<TimelinePageFallback />}>
      <TimelineInner />
    </Suspense>
  );
}

function TimelinePageFallback() {
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
    </div>
  );
}

function TimelineInner() {
  const ch = useEffectiveChapter();
  const params = useSearchParams();
  const highlightId = params.get("event") ?? undefined;

  const [modeValue, setModeValue] = useUrlString("mode", "landmarks", (value) =>
    MODES.some(([mode]) => mode === value),
  );
  const mode = modeValue as Mode;
  const [kindValue, setKindValue] = useUrlString("kinds");
  const kindFilter = useMemo(
    () =>
      kindValue
        .split(",")
        .filter((kind): kind is EventKind =>
          ALL_KINDS.includes(kind as EventKind),
        ),
    [kindValue],
  );
  const [princeFilter, setPrinceFilter] = useUrlString("prince");
  const [factionFilter, setFactionFilter] = useUrlString("faction");
  const [locationFilter, setLocationFilter] = useUrlString("location");
  const [storylineSel, setStorylineSel] = useUrlString("storyline");
  const [characterSel, setCharacterSel] = useUrlString("character");
  const [chronologyValue, setChronologyValue] = useUrlString(
    "order",
    "desc",
    (value) => value === "asc" || value === "desc",
  );
  const chronology = chronologyValue as SortDirection;
  const setChronology = (value: SortDirection) => setChronologyValue(value);
  const setMode = useCallback(
    (value: Mode) => setModeValue(value),
    [setModeValue],
  );

  // With no kind chips active the rail shows the landmark set; active chips
  // override it, so filtering by "decision" no longer yields an empty rail.
  const activeKinds = kindFilter.length > 0 ? kindFilter : LANDMARK_KINDS;

  // A deep-linked event must land in a mode that renders it: the default
  // landmarks rail omits routine kinds entirely. Each id is handled once so
  // the reader can still switch modes afterwards.
  const handledHighlight = useRef<string | null>(null);
  useEffect(() => {
    if (!highlightId || handledHighlight.current === highlightId) return;
    handledHighlight.current = highlightId;
    const target = eventById.get(highlightId);
    if (!target || target.chapter > ch) return;
    const rendersTarget =
      mode === "chapter" ||
      mode === "day" ||
      (mode === "landmarks" && activeKinds.includes(target.kind));
    if (!rendersTarget) setMode("chapter");
  }, [highlightId, ch, mode, activeKinds, setMode]);

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

  function jumpToChapter(num: number) {
    setMode("chapter");
    setTimeout(() => {
      document
        .getElementById(`ch-${num}`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 250);
  }

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
      // A location filter means "anywhere in here": events in Room 1014 match
      // a Tier 1 filter via the parent chain.
      if (
        locationFilter &&
        !(e.locationId && ancestorChain(e.locationId).includes(locationFilter))
      )
        return false;
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
    const groups = [...map.entries()].map(
      ([num, list]) =>
        [num, chronology === "desc" ? [...list].reverse() : list] as [
          number,
          StoryEvent[],
        ],
    );
    return groups.sort((a, b) =>
      chronology === "desc" ? b[0] - a[0] : a[0] - b[0],
    );
  }, [filtered, chronology]);

  const dayGroups = useMemo(() => {
    const map = new Map<number, StoryEvent[]>();
    const preVoyage: StoryEvent[] = [];
    const undated: StoryEvent[] = [];
    for (const e of filtered) {
      const day = eventDay(e);
      if (day === undefined) {
        // Days only exist aboard — everything before boarding is pre-voyage,
        // not missing data.
        (e.chapter < 358 ? preVoyage : undated).push(e);
        continue;
      }
      const list = map.get(day) ?? [];
      list.push(e);
      map.set(day, list);
    }
    const dated: [number, StoryEvent[]][] = [...map.entries()]
      .sort((a, b) => a[0] - b[0])
      .map(([day, list]) => [day, sortDayEvents(list)]);
    preVoyage.sort((a, b) => a.chapter - b.chapter);
    undated.sort((a, b) => a.chapter - b.chapter);
    return { dated, preVoyage, undated };
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
    ? sortEventsByChapter(
        applyEventFilters(
          (eventsByStoryline.get(storylineSel) ?? []).filter(
            (e) => e.chapter <= ch,
          ),
        ),
        chronology,
      )
    : [];
  const characterEvents = characterSel
    ? applyEventFilters(
        (eventsByParticipant.get(characterSel) ?? []).filter(
          (e) => e.chapter <= ch,
        ),
      )
    : [];
  const subjectMoves = characterSel
    ? (characterById.get(characterSel)?.locationHistory ?? []).filter(
        (move) => (move.revealCh ?? move.ch) <= ch,
      )
    : [];
  // The subject's chronology: recorded incidents interleaved with their
  // reader-visible position changes; an arrival sorts before that chapter's
  // events.
  const chronologicalCharacterRows: TimelineRow[] = [
    ...characterEvents.map((event) => ({ kind: "event" as const, event })),
    ...subjectMoves.map((move) => ({ kind: "move" as const, move })),
  ].sort((a, b) => {
    const chA = a.kind === "event" ? a.event.chapter : a.move.ch;
    const chB = b.kind === "event" ? b.event.chapter : b.move.ch;
    return (
      chA - chB || (a.kind === "move" ? 0 : 1) - (b.kind === "move" ? 0 : 1)
    );
  });
  const characterRows =
    chronology === "desc"
      ? [...chronologicalCharacterRows].reverse()
      : chronologicalCharacterRows;

  const daySections = useMemo<DaySection[]>(() => {
    const orderEvents = (list: StoryEvent[]) =>
      chronology === "desc" ? [...list].reverse() : list;
    const preVoyage: DaySection[] =
      dayGroups.preVoyage.length > 0
        ? [
            {
              key: "pre-voyage",
              label: "Pre-voyage",
              events: orderEvents(dayGroups.preVoyage),
              showMeta: true,
            },
          ]
        : [];
    const dated = dayGroups.dated.map(([day, list]) => ({
      key: `day-${day}`,
      label: `Day ${day}`,
      events: orderEvents(list),
      showMeta: true,
    }));
    const undated: DaySection[] =
      dayGroups.undated.length > 0
        ? [
            {
              key: "undated",
              label: "Undated",
              events: orderEvents(dayGroups.undated),
              showMeta: false,
            },
          ]
        : [];
    return chronology === "desc"
      ? [...undated, ...dated.reverse(), ...preVoyage]
      : [...preVoyage, ...dated, ...undated];
  }, [dayGroups, chronology]);

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
            aria-pressed={mode === value}
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
                onClick={() => {
                  const next = active
                    ? kindFilter.filter((x) => x !== k)
                    : [...kindFilter, k];
                  setKindValue(next.join(","));
                }}
                aria-pressed={active}
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
              onClick={() => setKindValue("")}
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
          <div className="ml-auto flex items-center gap-2">
            {mode !== "landmarks" && (
              <OrderToggle direction={chronology} onChange={setChronology} />
            )}
            <span className="font-mono text-[10px] tracking-widest text-faint">
              {filtered.length} record{filtered.length === 1 ? "" : "s"} in view
            </span>
          </div>
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
          {mode === "landmarks" && (
            <>
              {/* Horizontal rail on wider screens */}
              <div className="hidden sm:block">
                <EventRail
                  events={filtered}
                  chapter={ch}
                  kinds={activeKinds}
                  highlightId={highlightId}
                  onSelect={(id) => updateUrlState({ event: id }, "push")}
                  onOverflow={jumpToChapter}
                  onMissingHighlight={() => setMode("chapter")}
                />
                <p className="mt-2 font-mono text-[10px] tracking-wider text-faint">
                  {kindFilter.length > 0
                    ? `Showing your selected kinds — ${kindFilter
                        .map((k) => EVENT_KIND_META[k].label.toLowerCase())
                        .join(", ")}.`
                    : "Major turning points only — battles, deaths, betrayals, alliances, Nen reveals, and ceremonies."}{" "}
                  The gold cursor marks your clearance. Tap a card to open it; a
                  +N pill holds a crowded chapter's remainder.
                </p>
              </div>
              {/* Compact chronological list on small screens */}
              <div className="sm:hidden">
                <div className="mb-3 flex justify-end">
                  <OrderToggle
                    direction={chronology}
                    onChange={setChronology}
                  />
                </div>
                <RecorderList>
                  {sortEventsByChapter(
                    filtered.filter((e) => activeKinds.includes(e.kind)),
                    chronology,
                  ).map((e) => (
                    <EventEntry
                      key={e.id}
                      event={e}
                      highlighted={e.id === highlightId}
                    />
                  ))}
                </RecorderList>
              </div>
            </>
          )}

          {mode === "chapter" && (
            <ChapterModeView groups={chapterGroups} highlightId={highlightId} />
          )}

          {mode === "day" && (
            <div className="space-y-8">
              {dayGroups.dated.length === 0 &&
                dayGroups.preVoyage.length === 0 &&
                dayGroups.undated.length === 0 && (
                  <ArchiveNote>
                    No incidents on file at this clearance and filter set.
                  </ArchiveNote>
                )}
              {daySections.map((section) => (
                <section key={section.key}>
                  <SectionHeading
                    right={
                      section.showMeta ? (
                        <DayMeta events={section.events} label="records" />
                      ) : undefined
                    }
                  >
                    {section.label}
                  </SectionHeading>
                  <RecorderList>
                    {section.events.map((e) => (
                      <EventEntry
                        key={e.id}
                        event={e}
                        highlighted={e.id === highlightId}
                      />
                    ))}
                  </RecorderList>
                </section>
              ))}
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
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="intel-label">Subject</span>
                <CharacterPicker
                  candidates={visibleCharacters}
                  value={characterSel}
                  onChange={setCharacterSel}
                />
                {characterSel && (
                  <Link
                    href={`/characters/${characterSel}`}
                    className="font-mono text-[10px] uppercase tracking-widest text-teal hover:text-gold-bright"
                  >
                    Open dossier →
                  </Link>
                )}
              </div>
              {!characterSel ? (
                <ArchiveNote>
                  Find a subject to replay their recorded movements.
                </ArchiveNote>
              ) : characterRows.length === 0 ? (
                <ArchiveNote>
                  No incidents on file for this subject at this clearance.
                </ArchiveNote>
              ) : (
                <RecorderList>
                  {characterRows.map((row) =>
                    row.kind === "event" ? (
                      <EventEntry
                        key={row.event.id}
                        event={row.event}
                        highlighted={row.event.id === highlightId}
                      />
                    ) : (
                      <MovementEntry
                        key={`move-${row.move.ch}-${row.move.locationId}`}
                        move={row.move}
                      />
                    ),
                  )}
                </RecorderList>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function DayMeta({ events, label }: { events: StoryEvent[]; label: string }) {
  const min = Math.min(...events.map((e) => e.chapter));
  const max = Math.max(...events.map((e) => e.chapter));
  return (
    <span className="font-mono text-[10px] tracking-widest text-faint">
      CH.{min}
      {max !== min ? `–${max}` : ""} · {events.length} {label}
    </span>
  );
}

function MovementEntry({ move }: { move: MovementRecord }) {
  const location = locationById.get(move.locationId);
  return (
    <li className="relative">
      <span
        className="absolute -left-[29px] top-0.5 font-mono text-[11px] text-muted"
        aria-hidden
      >
        →
      </span>
      <div className="flex flex-wrap items-baseline gap-x-2 text-xs">
        <ChapterRef ch={move.ch} />
        <span className="font-mono text-[10px] uppercase tracking-widest text-faint">
          moves to
        </span>
        <Link
          href={`/map?location=${move.locationId}&ch=${move.revealCh ?? move.ch}`}
          className="text-teal hover:text-gold-bright"
        >
          {location?.name ?? move.locationId}
        </Link>
        {move.note && <span className="text-faint">— {move.note}</span>}
      </div>
    </li>
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
      <nav
        aria-label="Jump to chapter"
        className="-mx-1 flex gap-1 overflow-x-auto border-b border-line bg-bg-deep/90 px-1 py-1.5 backdrop-blur lg:sticky lg:top-[41px] lg:z-20"
      >
        {groups.map(([num]) => (
          <button
            key={num}
            type="button"
            onClick={() =>
              document
                .getElementById(`ch-${num}`)
                ?.scrollIntoView({ behavior: "smooth", block: "start" })
            }
            className="shrink-0 border border-transparent px-1.5 py-0.5 font-mono text-[10px] tracking-wider text-muted transition-colors hover:border-line hover:text-gold-bright"
          >
            {num}
          </button>
        ))}
      </nav>
      {groups.map(([num, evts]) => {
        const info = chapterByNumber.get(num);
        const columns = splitByStoryline(evts);
        return (
          <section key={num} id={`ch-${num}`} className="scroll-mt-24">
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
