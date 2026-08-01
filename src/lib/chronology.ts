import type { StoryEvent } from "@/lib/types";

export type ChronologyPrecision =
  | "exact"
  | "approximate"
  | "period"
  | "unknown";

export interface ParsedChronologyTime {
  key: string;
  label: string;
  precision: ChronologyPrecision;
  /** Stable within-day ordinal. Clock values are minutes after midnight. */
  rank: number;
}

export interface ChronologyTimeGroup {
  key: string;
  label: string;
  precision: Exclude<ChronologyPrecision, "unknown">;
  rank: number;
  events: StoryEvent[];
  /** True when exact and approximate records share the same clock minute. */
  mixedPrecision: boolean;
}

export interface ChronologySection {
  key: string;
  label: string;
  shortLabel: string;
  kind: "pre-voyage" | "day" | "unplaced";
  day?: number;
  events: StoryEvent[];
  timeGroups: ChronologyTimeGroup[];
  untimedEvents: StoryEvent[];
  firstChapter: number;
  lastChapter: number;
}

export interface RevealSection {
  key: string;
  label: string;
  shortLabel: string;
  kind: "chapter";
  chapter: number;
  events: StoryEvent[];
}

const PERIODS: Record<string, { label: string; rank: number }> = {
  "early hours": { label: "Early hours", rank: 3 * 60 },
  morning: { label: "Morning", rank: 9 * 60 },
  afternoon: { label: "Afternoon", rank: 13 * 60 },
  evening: { label: "Evening", rank: 19 * 60 },
  night: { label: "Night", rank: 22 * 60 },
};

function formatClock(minutes: number): string {
  const hours24 = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const period = hours24 >= 12 ? "p.m." : "a.m.";
  const hours12 = hours24 % 12 || 12;
  return `${hours12}:${String(mins).padStart(2, "0")} ${period}`;
}

/**
 * Parse only the time vocabulary that the archive actually records. Unknown
 * strings stay unplaced rather than being assigned a guessed clock value.
 */
export function parseChronologyTime(
  value?: string,
): ParsedChronologyTime | undefined {
  if (!value) return undefined;
  const normalized = value.trim();
  const clock = normalized.match(/^(≈)?\s*(\d{1,2}):(\d{2})\s*([ap])\.m\.$/i);
  if (clock) {
    const minute = Number(clock[3]);
    const rawHour = Number(clock[2]);
    if (rawHour < 1 || rawHour > 12 || minute > 59) return undefined;
    let hour = rawHour % 12;
    if (clock[4].toLowerCase() === "p") hour += 12;
    const rank = hour * 60 + minute;
    const approximate = Boolean(clock[1]);
    return {
      key: `clock-${rank}`,
      label: `${approximate ? "≈" : ""}${formatClock(rank)}`,
      precision: approximate ? "approximate" : "exact",
      rank,
    };
  }

  const period = PERIODS[normalized.toLowerCase()];
  if (period) {
    return {
      key: `period-${normalized.toLowerCase().replaceAll(" ", "-")}`,
      label: period.label,
      precision: "period",
      rank: period.rank,
    };
  }
  return undefined;
}

function makeSection(
  key: string,
  label: string,
  shortLabel: string,
  kind: ChronologySection["kind"],
  sectionEvents: StoryEvent[],
  day?: number,
): ChronologySection {
  const sourceOrder = new Map(
    sectionEvents.map((event, index) => [event.id, index]),
  );
  const grouped = new Map<
    string,
    {
      parsed: ParsedChronologyTime;
      events: StoryEvent[];
      precisions: Set<ChronologyPrecision>;
    }
  >();
  const untimedEvents: StoryEvent[] = [];

  for (const event of sectionEvents) {
    const parsed = parseChronologyTime(event.approxTime);
    if (!parsed) {
      untimedEvents.push(event);
      continue;
    }
    const existing = grouped.get(parsed.key);
    if (existing) {
      existing.events.push(event);
      existing.precisions.add(parsed.precision);
    } else {
      grouped.set(parsed.key, {
        parsed,
        events: [event],
        precisions: new Set([parsed.precision]),
      });
    }
  }

  const timeGroups: ChronologyTimeGroup[] = [...grouped.values()]
    .map(({ parsed, events, precisions }) => {
      const hasExact = precisions.has("exact");
      const hasApproximate = precisions.has("approximate");
      const mixedPrecision = hasExact && hasApproximate;
      return {
        key: parsed.key,
        label: mixedPrecision ? formatClock(parsed.rank) : parsed.label,
        precision: mixedPrecision
          ? "approximate"
          : (parsed.precision as ChronologyTimeGroup["precision"]),
        rank: parsed.rank,
        events: [...events].sort(
          (a, b) => (sourceOrder.get(a.id) ?? 0) - (sourceOrder.get(b.id) ?? 0),
        ),
        mixedPrecision,
      };
    })
    .sort((a, b) => a.rank - b.rank || a.key.localeCompare(b.key));

  const chapters = sectionEvents.map((event) => event.chapter);
  return {
    key,
    label,
    shortLabel,
    kind,
    day,
    events: sectionEvents,
    timeGroups,
    untimedEvents,
    firstChapter: Math.min(...chapters),
    lastChapter: Math.max(...chapters),
  };
}

/**
 * Build an occurrence-first chronology. Day is authoritative; chapter order
 * is used only inside explicitly unplaced collections and never promoted to a
 * precise in-universe timestamp.
 */
export function buildChronology(events: StoryEvent[]): ChronologySection[] {
  const preVoyage: StoryEvent[] = [];
  const unplaced: StoryEvent[] = [];
  const byDay = new Map<number, StoryEvent[]>();

  for (const event of events) {
    if (event.day !== undefined) {
      const list = byDay.get(event.day) ?? [];
      list.push(event);
      byDay.set(event.day, list);
    } else if (
      event.chronologyBeforeChapter !== undefined ||
      event.chapter < 359
    ) {
      preVoyage.push(event);
    } else {
      unplaced.push(event);
    }
  }

  const sections: ChronologySection[] = [];
  if (preVoyage.length > 0) {
    preVoyage.sort((eventA, eventB) => {
      const anchorA = eventA.chronologyBeforeChapter ?? eventA.chapter;
      const anchorB = eventB.chronologyBeforeChapter ?? eventB.chapter;
      if (anchorA !== anchorB) return anchorA - anchorB;
      const anchoredA = eventA.chronologyBeforeChapter !== undefined ? 0 : 1;
      const anchoredB = eventB.chronologyBeforeChapter !== undefined ? 0 : 1;
      if (anchoredA !== anchoredB) return anchoredA - anchoredB;
      const sequenceA = eventA.chronologySequence ?? Number.MAX_SAFE_INTEGER;
      const sequenceB = eventB.chronologySequence ?? Number.MAX_SAFE_INTEGER;
      return sequenceA - sequenceB || eventA.chapter - eventB.chapter;
    });
    sections.push(
      makeSection(
        "pre-voyage",
        "Pre-voyage record",
        "Pre",
        "pre-voyage",
        preVoyage,
      ),
    );
  }
  for (const [day, dayEvents] of [...byDay.entries()].sort(
    (a, b) => a[0] - b[0],
  )) {
    sections.push(
      makeSection(
        `day-${day}`,
        `Voyage day ${day}`,
        `D${day}`,
        "day",
        dayEvents,
        day,
      ),
    );
  }
  if (unplaced.length > 0) {
    sections.push(
      makeSection(
        "unplaced",
        "Outside the voyage clock",
        "Unplaced",
        "unplaced",
        unplaced,
      ),
    );
  }
  return sections;
}

/**
 * Build the reader-facing sequence: chapters ascend in publication order and
 * records within a chapter retain their authored archive order.
 */
export function buildRevealOrder(events: StoryEvent[]): RevealSection[] {
  const byChapter = new Map<number, StoryEvent[]>();
  for (const event of events) {
    const chapterEvents = byChapter.get(event.chapter) ?? [];
    chapterEvents.push(event);
    byChapter.set(event.chapter, chapterEvents);
  }

  return [...byChapter.entries()]
    .sort(([chapterA], [chapterB]) => chapterA - chapterB)
    .map(([chapter, chapterEvents]) => ({
      key: `chapter-${chapter}`,
      label: `Chapter ${chapter}`,
      shortLabel: `CH.${chapter}`,
      kind: "chapter" as const,
      chapter,
      events: chapterEvents,
    }));
}
