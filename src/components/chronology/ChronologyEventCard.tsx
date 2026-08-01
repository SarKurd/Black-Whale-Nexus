"use client";

import type { RefCallback } from "react";
import { EVENT_KIND_META } from "@/components/story/EventRecorder";
import { ConfidenceBadge } from "@/components/ui/kit";
import type { ChronologyPrecision } from "@/lib/chronology";
import { locationById, storylineById } from "@/lib/db";
import type { StoryEvent } from "@/lib/types";
import styles from "./Chronology.module.css";

export function ChronologyEventCard({
  event,
  sourceId,
  precision,
  side,
  selected,
  buttonRef,
  onSelect,
}: {
  event: StoryEvent;
  sourceId: string;
  precision: ChronologyPrecision | "pre-voyage" | "reveal";
  side: "left" | "right";
  selected: boolean;
  buttonRef?: RefCallback<HTMLButtonElement>;
  onSelect: () => void;
}) {
  const meta = EVENT_KIND_META[event.kind];
  const location = event.locationId
    ? locationById.get(event.locationId)
    : undefined;
  const storyline = event.storylineIds[0]
    ? storylineById.get(event.storylineIds[0])
    : undefined;
  const timeLabel = event.approxTime ?? "Time not recorded";

  return (
    <article
      id={`event-${event.id}`}
      data-chronology-event={event.id}
      data-chronology-source-id={sourceId}
      data-chronology-kind={precision}
      data-selected={selected ? "true" : "false"}
      className={`${styles.eventCard} ${
        side === "left" ? styles.eventLeft : styles.eventRight
      } dossier scroll-mt-44 border ${
        selected ? "border-gold bg-gold/8" : "border-line bg-panel/95"
      }`}
      style={{
        borderLeftColor: meta.color,
        borderLeftWidth: 2,
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        aria-label={`${event.title}, chapter ${event.chapter}, ${timeLabel}. Open incident record.`}
        className="block w-full p-3 text-left"
      >
        <span className="flex flex-wrap items-center gap-2">
          <span
            className="inline-flex h-6 w-6 shrink-0 items-center justify-center border font-mono text-xs"
            style={{ color: meta.color, borderColor: meta.color }}
            aria-hidden
          >
            {meta.glyph}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-faint">
            {meta.label}
          </span>
          <span className="h-px min-w-4 flex-1 bg-line" />
          <span className="font-mono text-[9px] tracking-wider text-teal">
            CH.{event.chapter}
          </span>
        </span>
        <span className="mt-2 block text-[15px] leading-snug text-ivory">
          {event.title}
        </span>
        <span className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
          <span
            className={`font-mono text-[9px] uppercase tracking-widest ${
              event.approxTime ? "text-gold" : "text-faint"
            }`}
          >
            {event.day !== undefined ? `Day ${event.day} · ` : ""}
            {timeLabel}
          </span>
          <ConfidenceBadge level={event.confidence} />
        </span>
        {(location || storyline) && (
          <span className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[9px] uppercase tracking-wider text-muted">
            {location && <span>⌖ {location.name}</span>}
            {storyline && <span>↳ {storyline.name}</span>}
          </span>
        )}
      </button>
      {selected && (
        <span className="absolute -right-px -top-px border border-gold bg-bg-deep px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-widest text-gold-bright">
          Selected
        </span>
      )}
    </article>
  );
}
