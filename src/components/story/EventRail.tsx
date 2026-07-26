"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
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
const MAX_TIER = 2; // deeper stacks collapse into per-chapter "+N" pills
const TOP_PAD = 34; // room for the clearance label + ruler ticks
const BOTTOM_PAD = 48; // chapter numbers + breathing room to the panel edge
const RAIL_W = PAD_L + (ARC_END - ARC_START) * PX_PER_CH + PAD_R;

function chX(chapter: number): number {
  const clamped = Math.min(Math.max(chapter, ARC_START), ARC_END);
  return PAD_L + (clamped - ARC_START) * PX_PER_CH;
}

interface Placed {
  event: StoryEvent;
  /** marker position: the event's true chapter x. */
  x: number;
  /** card center: `x` nudged inward so edge cards stay on the canvas. */
  cx: number;
  above: boolean;
  /** callout vertical offset from the rail, grows when neighbors crowd. */
  tier: number;
}

/**
 * Callout placement: each card takes the emptier side's lowest free tier;
 * ties alternate. Cards that would stack past MAX_TIER collapse into a
 * per-chapter overflow pill instead of growing the rail without bound.
 * Collision math runs on the card centers as drawn, edge clamp included.
 */
function placeCallouts(landmarks: StoryEvent[]): {
  placed: Placed[];
  overflow: Map<number, number>;
} {
  const tiersBySide: Record<"above" | "below", number[]> = {
    above: [],
    below: [],
  };
  const lowestFreeTier = (side: "above" | "below", cx: number) => {
    const tiers = tiersBySide[side];
    let tier = 0;
    while (tier < tiers.length && cx - tiers[tier] < CARD_W + 8) tier += 1;
    return tier;
  };
  const placed: Placed[] = [];
  const overflow = new Map<number, number>();
  let flip = true;
  for (const event of landmarks) {
    const x = chX(event.chapter);
    const cx = Math.min(Math.max(x, 2 + CARD_W / 2), RAIL_W - CARD_W / 2 - 2);
    const aboveTier = lowestFreeTier("above", cx);
    const belowTier = lowestFreeTier("below", cx);
    if (Math.min(aboveTier, belowTier) > MAX_TIER) {
      overflow.set(event.chapter, (overflow.get(event.chapter) ?? 0) + 1);
      continue;
    }
    let above: boolean;
    if (aboveTier !== belowTier) above = aboveTier < belowTier;
    else {
      above = flip;
      flip = !flip;
    }
    const tier = above ? aboveTier : belowTier;
    tiersBySide[above ? "above" : "below"][tier] = cx;
    placed.push({ event, x, cx, above, tier });
  }
  return { placed, overflow };
}

/**
 * Horizontal landmark timeline: major events plotted on a chapter-scaled
 * rail. Scrolls itself to the highlighted event or the clearance cursor.
 */
export function EventRail({
  events,
  chapter,
  kinds = LANDMARK_KINDS,
  highlightId,
  onSelect,
  onOverflow,
  onMissingHighlight,
}: {
  events: StoryEvent[];
  chapter: number;
  kinds?: EventKind[];
  highlightId?: string;
  onSelect?: (id: string) => void;
  onOverflow: (chapter: number) => void;
  /** The highlighted event is in the data but fell into an overflow pill. */
  onMissingHighlight?: () => void;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const { placed, overflow, railY, railH } = useMemo(() => {
    const landmarks = events
      .filter((e) => kinds.includes(e.kind))
      .sort((a, b) => a.chapter - b.chapter || a.id.localeCompare(b.id));
    const { placed, overflow } = placeCallouts(landmarks);

    let maxAbove = 0;
    let maxBelow = 0;
    for (const p of placed) {
      if (p.above) maxAbove = Math.max(maxAbove, p.tier);
      else maxBelow = Math.max(maxBelow, p.tier);
    }
    // A stacked callout reaches STEM_0 + tier*TIER_STEP from the rail, plus a
    // card. Size the rail so the deepest stack on each side clears the padding.
    const reach = (maxTier: number) => STEM_0 + maxTier * TIER_STEP + CARD_H;
    const above = reach(maxAbove);
    const below = reach(maxBelow);
    return {
      placed,
      overflow,
      railY: TOP_PAD + above,
      railH: TOP_PAD + above + below + BOTTOM_PAD,
    };
  }, [events, kinds]);

  const ticks: number[] = [];
  for (let t = ARC_START; t <= ARC_END; t += 5) ticks.push(t);
  const cursorX =
    chapter >= ARC_START ? chX(Math.min(chapter, ARC_END)) : PAD_L;

  const lastFocusX = useRef<number | null>(null);
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const highlightX = highlightId
      ? placed.find((p) => p.event.id === highlightId)?.x
      : undefined;
    if (highlightId && highlightX === undefined) {
      const target = events.find((e) => e.id === highlightId);
      if (target && kinds.includes(target.kind)) onMissingHighlight?.();
    }
    const focusX = highlightX ?? cursorX;
    // Only move when the focus target itself moved — filter recomputes must
    // not discard the reader's manual scroll position.
    if (lastFocusX.current === focusX) return;
    lastFocusX.current = focusX;
    // A target already on screen (e.g. a card the reader just clicked) stays
    // where it is instead of jumping to the anchor position.
    const inView =
      focusX >= scroller.scrollLeft + 40 &&
      focusX <= scroller.scrollLeft + scroller.clientWidth - 40;
    if (inView) return;
    scroller.scrollLeft = Math.max(0, focusX - scroller.clientWidth * 0.6);
  }, [highlightId, placed, cursorX, events, kinds, onMissingHighlight]);

  if (placed.length === 0 && overflow.size === 0) {
    return (
      <ArchiveNote>
        No landmark events on record at this clearance and filter set.
      </ArchiveNote>
    );
  }

  return (
    <div
      ref={scrollerRef}
      className="dossier corner-ticks overflow-x-auto bg-bg-deep/50"
    >
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
        {placed.map(({ event, x, cx, above, tier }, i) => {
          const meta = EVENT_KIND_META[event.kind];
          const highlighted = event.id === highlightId;
          const stem = STEM_0 + tier * TIER_STEP;
          const cardY = above ? railY - stem - CARD_H : railY + stem;
          const cardX = cx - CARD_W / 2;
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
              <foreignObject x={cardX} y={cardY} width={CARD_W} height={CARD_H}>
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

        {/* Per-chapter overflow pills — stacks past MAX_TIER live in the
            chapter view instead of growing the rail without bound. */}
        {[...overflow.entries()].map(([num, count]) => (
          // biome-ignore lint/a11y/useSemanticElements: SVG cannot contain an HTML button; the group supplies equivalent keyboard and button semantics.
          <g
            key={num}
            className="cursor-pointer"
            role="button"
            tabIndex={0}
            aria-label={`${count} more landmark${count === 1 ? "" : "s"} in chapter ${num} — open the chapter view`}
            onClick={() => onOverflow(num)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onOverflow(num);
              }
            }}
          >
            <rect
              x={chX(num) + 7}
              y={railY - 8}
              width={30}
              height={16}
              rx={2}
              fill="var(--panel)"
              stroke="var(--gold-line)"
            />
            <text
              x={chX(num) + 22}
              y={railY + 3.5}
              textAnchor="middle"
              fill="var(--gold-bright)"
              fontSize={9}
              fontFamily="var(--font-geist-mono), monospace"
            >
              +{count}
            </text>
            <title>{`${count} more landmark${count === 1 ? "" : "s"} in chapter ${num} — open the chapter view`}</title>
          </g>
        ))}
      </svg>
    </div>
  );
}
