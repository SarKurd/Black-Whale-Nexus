"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import {
  ChapterRef,
  ConfidenceBadge,
  EntityLink,
  EntityList,
} from "@/components/ui/kit";
import { deathByVictim, locationById } from "@/lib/db";
import type { EventKind, StoryEvent } from "@/lib/types";

/**
 * Shared glyph/color scheme for event kinds. Death-adjacent kinds bleed red,
 * alliances read teal, Nen reveals violet, discoveries gold — everything else
 * stays in the archive's neutral register.
 */
export const EVENT_KIND_META: Record<
  EventKind,
  { label: string; glyph: string; color: string }
> = {
  battle: { label: "Battle", glyph: "⚔", color: "var(--blood-bright)" },
  death: { label: "Death", glyph: "✕", color: "var(--blood)" },
  "assassination-attempt": {
    label: "Assassination attempt",
    glyph: "⊘",
    color: "var(--blood)",
  },
  conversation: { label: "Conversation", glyph: "❝", color: "var(--muted)" },
  "nen-reveal": { label: "Nen reveal", glyph: "◈", color: "var(--violet)" },
  alliance: { label: "Alliance", glyph: "◇", color: "var(--teal)" },
  betrayal: { label: "Betrayal", glyph: "↯", color: "var(--warn)" },
  discovery: { label: "Discovery", glyph: "✦", color: "var(--gold)" },
  investigation: { label: "Investigation", glyph: "⌕", color: "var(--teal)" },
  movement: { label: "Movement", glyph: "→", color: "var(--muted)" },
  ceremony: { label: "Ceremony", glyph: "♦", color: "var(--gold-dim)" },
  decision: { label: "Decision", glyph: "◉", color: "var(--parchment)" },
  other: { label: "Record", glyph: "·", color: "var(--faint)" },
};

export function EventKindChip({ kind }: { kind: EventKind }) {
  const meta = EVENT_KIND_META[kind];
  return (
    <span
      className="inline-flex items-center gap-1.5 border px-1.5 py-px font-mono text-[9px] uppercase tracking-[0.15em]"
      style={{
        color: meta.color,
        borderColor: "color-mix(in srgb, currentColor 40%, transparent)",
      }}
    >
      <span aria-hidden>{meta.glyph}</span>
      {meta.label}
    </span>
  );
}

/** Vertical recorder rule. Children should be `EventEntry` items. */
export function RecorderList({ children }: { children: ReactNode }) {
  return (
    <ol className="relative ml-3 space-y-5 border-l border-line pl-5">
      {children}
    </ol>
  );
}

/**
 * One entry of the voyage recorder — kind chip, title, summary, participants,
 * location, casualties (struck red), collapsible consequences, confidence.
 */
export function EventEntry({
  event,
  highlighted = false,
  showChapter = true,
}: {
  event: StoryEvent;
  highlighted?: boolean;
  showChapter?: boolean;
}) {
  const meta = EVENT_KIND_META[event.kind];
  const location = event.locationId
    ? locationById.get(event.locationId)
    : undefined;

  return (
    <li id={event.id} className="relative scroll-mt-24">
      <span
        className="absolute -left-[26px] top-1.5 h-2.5 w-2.5 rounded-full border"
        style={{
          borderColor: meta.color,
          background: highlighted ? meta.color : "var(--panel)",
        }}
        aria-hidden
      />
      <div
        className={
          highlighted ? "-m-2 border border-gold-line bg-gold/5 p-2" : undefined
        }
      >
        <div className="flex flex-wrap items-center gap-2">
          <EventKindChip kind={event.kind} />
          {showChapter && <ChapterRef ch={event.chapter} />}
          {event.day !== undefined && (
            <span className="font-mono text-[9px] uppercase tracking-widest text-faint">
              Day {event.day}
              {event.approxTime ? ` · ${event.approxTime}` : ""}
            </span>
          )}
          <ConfidenceBadge level={event.confidence} />
        </div>
        <div className="mt-1 text-[15px] leading-snug text-ivory">
          {event.title}
        </div>
        <p className="mt-0.5 text-xs leading-relaxed text-muted">
          {event.summary}
        </p>

        <div className="mt-1.5 space-y-1">
          {event.participantIds.length > 0 && (
            <div className="flex flex-wrap items-baseline gap-x-2 text-xs">
              <span className="intel-label">Involved</span>
              <EntityList ids={event.participantIds} />
            </div>
          )}
          {event.witnessIds && event.witnessIds.length > 0 && (
            <div className="flex flex-wrap items-baseline gap-x-2 text-xs">
              <span className="intel-label">Witnessed by</span>
              <EntityList ids={event.witnessIds} />
            </div>
          )}
          {location && (
            <div className="flex flex-wrap items-baseline gap-x-2 text-xs">
              <span className="intel-label">Location</span>
              <Link
                href={`/map?location=${location.id}&ch=${event.chapter}`}
                className="text-teal hover:text-gold-bright"
              >
                {location.name}
              </Link>
            </div>
          )}
          {event.casualtyIds && event.casualtyIds.length > 0 && (
            <div className="flex flex-wrap items-baseline gap-x-2 text-xs">
              <span
                className="intel-label"
                style={{ color: "var(--blood-bright)" }}
              >
                Casualties
              </span>
              <span>
                {event.casualtyIds.map((id, i) => {
                  const deathRecord = deathByVictim.get(id);
                  const bodyOnly = deathRecord?.scope === "body";
                  return (
                    <span key={id}>
                      {i > 0 && <span className="text-faint"> · </span>}
                      {bodyOnly ? (
                        <EntityLink id={id} className="text-gold" />
                      ) : (
                        <span className="line-through decoration-[var(--blood)] decoration-1">
                          <EntityLink id={id} />
                        </span>
                      )}
                      {bodyOnly && (
                        <span className="ml-1 font-mono text-[9px] uppercase tracking-wider text-gold-bright">
                          body only · soul active
                        </span>
                      )}
                      {deathRecord && (
                        <Link
                          href={`/deaths#${id}`}
                          className={`ml-1 font-mono text-[9px] uppercase tracking-wider hover:text-gold-bright ${
                            bodyOnly ? "text-gold" : "text-blood-bright"
                          }`}
                        >
                          {bodyOnly ? "body record" : "record"} ▸
                        </Link>
                      )}
                    </span>
                  );
                })}
              </span>
            </div>
          )}
        </div>

        {event.consequences && event.consequences.length > 0 && (
          <details className="mt-1.5 group">
            <summary className="cursor-pointer list-none font-mono text-[10px] uppercase tracking-widest text-teal hover:text-gold-bright">
              <span className="mr-1 inline-block transition-transform group-open:rotate-90">
                ▸
              </span>
              Consequences ({event.consequences.length})
            </summary>
            <ul className="mt-1 space-y-0.5 border-l border-line/60 pl-3">
              {event.consequences.map((c) => (
                <li key={c} className="text-xs text-parchment">
                  {c}
                </li>
              ))}
            </ul>
          </details>
        )}
      </div>
    </li>
  );
}
