"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { ArchiveNote } from "@/components/ui/kit";
import {
  ARC_END,
  ARC_START,
  type EventKind,
  type StoryEvent,
} from "@/lib/types";
import { EVENT_KIND_META } from "./EventRecorder";

/**
 * The "major" event kinds — the arc's turning points. Everything else
 * (conversation, decision, movement, investigation, discovery, other) is
 * routine and stays out of the landmark rail to keep it legible.
 */
export const LANDMARK_KINDS: EventKind[] = [
  "battle",
  "death",
  "assassination-attempt",
  "betrayal",
  "alliance",
  "nen-reveal",
  "ceremony",
];

// --- Rail geometry (mirrors the storyline map's scale) ---------------------
const PX_PER_CH = 46;
const PAD_L = 40;
const PAD_R = 40;
const CARD_W = 160;
const CARD_H = 62; // fits the chapter row + two title lines with padding
const STEM_0 = 30; // first-tier stem length from the rail
const TIER_STEP = CARD_H + 34; // stem per tier: card height plus a clear gap
const TOP_PAD = 34; // room for the clearance label + ruler ticks
const BOTTOM_PAD = 48; // chapter numbers + breathing room to the panel edge
const RAIL_W = PAD_L + (ARC_END - ARC_START) * PX_PER_CH + PAD_R;

function chX(chapter: number): number {
  const clamped = Math.min(Math.max(chapter, ARC_START), ARC_END);
  return PAD_L + (clamped - ARC_START) * PX_PER_CH;
}

interface Placed {
  event: StoryEvent;
  x: number;
  above: boolean;
  /** callout vertical offset from the rail, grows when neighbors crowd. */
  tier: number;
}

/**
 * Horizontal landmark timeline: every major event plotted on a chapter-scaled
 * rail, callouts alternating above/below with simple anti-overlap stacking.
 */
export function EventRail({
  events,
  chapter,
  highlightId,
  onSelect,
}: {
  events: StoryEvent[];
  chapter: number;
  highlightId?: string;
  onSelect?: (id: string) => void;
}) {
  const { placed, railY, railH } = useMemo(() => {
    const landmarks = events
      .filter((e) => LANDMARK_KINDS.includes(e.kind))
      .sort((a, b) => a.chapter - b.chapter || a.id.localeCompare(b.id));

    // Alternate above/below; within a side, bump to a higher tier when the
    // previous same-side callout is closer than a card width.
    const lastXBySide: Record<"above" | "below", number[]> = {
      above: [],
      below: [],
    };
    let maxAbove = 0;
    let maxBelow = 0;
    const items: Placed[] = landmarks.map((event, i) => {
      const x = chX(event.chapter);
      const above = i % 2 === 0;
      const side = above ? "above" : "below";
      // Find the lowest tier whose last x is far enough left.
      const tiers = lastXBySide[side];
      let tier = 0;
      while (tier < tiers.length && x - tiers[tier] < CARD_W + 8) tier += 1;
      tiers[tier] = x;
      if (above) maxAbove = Math.max(maxAbove, tier);
      else maxBelow = Math.max(maxBelow, tier);
      return { event, x, above, tier };
    });

    // A stacked callout reaches STEM_0 + tier*TIER_STEP from the rail, plus a
    // card. Size the rail so the deepest stack on each side clears the padding.
    const reach = (maxTier: number) => STEM_0 + maxTier * TIER_STEP + CARD_H;
    const above = reach(maxAbove);
    const below = reach(maxBelow);
    return {
      placed: items,
      railY: TOP_PAD + above,
      railH: TOP_PAD + above + below + BOTTOM_PAD,
    };
  }, [events]);

  const ticks: number[] = [];
  for (let t = ARC_START; t <= ARC_END; t += 5) ticks.push(t);
  const cursorX =
    chapter >= ARC_START ? chX(Math.min(chapter, ARC_END)) : PAD_L;

  if (placed.length === 0) {
    return (
      <ArchiveNote>
        No landmark events on record at this clearance and filter set.
      </ArchiveNote>
    );
  }

  return (
    <div className="dossier corner-ticks overflow-x-auto bg-bg-deep/50">
      <svg
        width={RAIL_W}
        height={railH}
        viewBox={`0 0 ${RAIL_W} ${railH}`}
        role="img"
        aria-label="Horizontal timeline of major events by chapter"
        className="block"
      >
        {/* Chapter ruler grid */}
        {ticks.map((t) => (
          <g key={t}>
            <line
              x1={chX(t)}
              y1={20}
              x2={chX(t)}
              y2={railH - 14}
              stroke="var(--line)"
              strokeOpacity={0.4}
            />
            <text
              x={chX(t)}
              y={railH - 4}
              textAnchor="middle"
              fill="var(--muted)"
              fontSize={9}
              fontFamily="var(--font-geist-mono), monospace"
              letterSpacing="0.1em"
            >
              {t}
            </text>
          </g>
        ))}

        {/* The rail */}
        <line
          x1={PAD_L}
          y1={railY}
          x2={chX(Math.min(chapter, ARC_END))}
          y2={railY}
          stroke="var(--gold-dim)"
          strokeWidth={1.5}
        />
        <line
          x1={chX(Math.min(chapter, ARC_END))}
          y1={railY}
          x2={RAIL_W - PAD_R}
          y2={railY}
          stroke="var(--line)"
          strokeDasharray="2 4"
        />

        {/* Clearance cursor */}
        <line
          x1={cursorX}
          y1={20}
          x2={cursorX}
          y2={railH - 14}
          stroke="var(--gold)"
          strokeWidth={1}
          strokeDasharray="3 3"
        />
        <text
          x={cursorX + 5}
          y={30}
          fill="var(--gold-bright)"
          fontSize={8}
          fontFamily="var(--font-geist-mono), monospace"
          letterSpacing="0.18em"
        >
          CLEARANCE {chapter}
        </text>

        {/* Landmarks */}
        {placed.map(({ event, x, above, tier }, i) => {
          const meta = EVENT_KIND_META[event.kind];
          const highlighted = event.id === highlightId;
          const stem = STEM_0 + tier * TIER_STEP;
          const cardY = above ? railY - stem - CARD_H : railY + stem;
          const cardX = Math.max(
            2,
            Math.min(x - CARD_W / 2, RAIL_W - CARD_W - 2),
          );
          const connectorY = above ? railY - stem : railY + stem;
          return (
            <motion.g
              key={event.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25, delay: Math.min(i * 0.012, 0.4) }}
              className={onSelect ? "cursor-pointer" : undefined}
              onClick={() => onSelect?.(event.id)}
            >
              {/* connector stem */}
              <line
                x1={x}
                y1={railY}
                x2={x}
                y2={connectorY}
                stroke={meta.color}
                strokeOpacity={0.5}
                strokeWidth={1}
              />
              {/* marker on the rail */}
              <circle
                cx={x}
                cy={railY}
                r={highlighted ? 6 : 4}
                fill={highlighted ? meta.color : "var(--panel)"}
                stroke={meta.color}
                strokeWidth={1.5}
              />
              {/* callout card */}
              <foreignObject
                x={cardX}
                y={cardY}
                width={CARD_W}
                height={CARD_H}
              >
                <div
                  className="border bg-panel/95 px-1.5 py-1"
                  style={{
                    borderColor: highlighted
                      ? "var(--gold-line)"
                      : "var(--line)",
                  }}
                >
                  <div className="flex items-center gap-1">
                    <span aria-hidden style={{ color: meta.color }}>
                      {meta.glyph}
                    </span>
                    <span
                      className="font-mono text-[8px] uppercase tracking-widest"
                      style={{ color: meta.color }}
                    >
                      Ch.{event.chapter}
                    </span>
                  </div>
                  <div className="mt-0.5 line-clamp-2 text-[10px] leading-tight text-ivory">
                    {event.title}
                  </div>
                </div>
              </foreignObject>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
