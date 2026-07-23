"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { ArchiveNote, SectionHeading } from "@/components/ui/kit";
import { storylines } from "@/lib/db";
import { latestStamp } from "@/lib/spoiler";
import { useEffectiveChapter } from "@/lib/store";
import { ARC_END, ARC_START, type Storyline } from "@/lib/types";

const STATUS_COLOR: Record<string, string> = {
  active: "var(--teal)",
  escalating: "var(--blood-bright)",
  paused: "var(--warn)",
  resolved: "var(--alive)",
};

const NODE_KIND_LABEL: Record<string, string> = {
  begin: "BEGIN",
  advance: "ADVANCE",
  split: "SPLIT",
  merge: "MERGE",
  intersect: "INTERSECT",
  pause: "PAUSE",
  restart: "RESTART",
  climax: "CLIMAX",
  trigger: "TRIGGER",
  end: "END",
};

// --- Map geometry -----------------------------------------------------------
const LABEL_W = 200;
const PX_PER_CH = 16;
const PAD_RIGHT = 28;
const RULER_H = 36;
const LANE_H = 46;
const MAP_W = LABEL_W + (ARC_END - ARC_START) * PX_PER_CH + PAD_RIGHT;

function chX(chapter: number): number {
  const clamped = Math.min(Math.max(chapter, ARC_START), ARC_END);
  return LABEL_W + (clamped - ARC_START) * PX_PER_CH;
}

interface Lane {
  storyline: Storyline;
  index: number;
  y: number;
  /** Nodes at or below clearance, sorted by chapter. */
  visibleNodes: Storyline["nodes"];
  /** Where the lane's line stops: min(last node ch, clearance). */
  lineEndCh: number;
}

export default function StorylinesPage() {
  const ch = useEffectiveChapter();
  const router = useRouter();

  const { lanes, sealedCount } = useMemo(() => {
    const visible: Storyline[] = storylines
      .filter((s: Storyline) => s.introducedCh <= ch)
      .sort((a: Storyline, b: Storyline) => a.introducedCh - b.introducedCh);
    const laneList: Lane[] = visible.map((s, index) => {
      const sorted = [...s.nodes].sort((a, b) => a.ch - b.ch);
      const visibleNodes = sorted.filter((n) => n.ch <= ch);
      const lastCh = sorted.at(-1)?.ch ?? s.introducedCh;
      return {
        storyline: s,
        index,
        y: RULER_H + index * LANE_H + LANE_H / 2,
        visibleNodes,
        lineEndCh: Math.min(lastCh, ch),
      };
    });
    return {
      lanes: laneList,
      sealedCount: storylines.length - visible.length,
    };
  }, [ch]);

  const laneByStorylineId = useMemo(
    () => new Map(lanes.map((l) => [l.storyline.id, l])),
    [lanes],
  );

  const mapH = RULER_H + lanes.length * LANE_H + 18;
  const ticks: number[] = [];
  for (let t = ARC_START + 2; t <= ARC_END; t += 5) ticks.push(t);
  const cursorX = ch >= ARC_START ? chX(ch) : undefined;

  const openLane = (id: string) => router.push(`/storylines/${id}`);

  return (
    <div>
      <div className="mb-5">
        <div className="intel-label-gold">Mission map</div>
        <h1 className="royal-heading text-3xl">Storyline Explorer</h1>
        <p className="mt-1 max-w-2xl text-xs text-muted">
          Every thread of the succession war laid out as parallel rails — hollow
          circles begin a thread, large filled circles mark climaxes, squares
          end them, and curved connectors show where threads merge, intersect,
          or trigger one another. The gold cursor is your clearance; nothing
          right of it is drawn.
        </p>
      </div>

      {lanes.length === 0 ? (
        <ArchiveNote>
          No threads are on record at this clearance. The war has not begun.
        </ArchiveNote>
      ) : (
        <>
          {/* Branching map (lg and up) */}
          <div className="dossier corner-ticks hidden overflow-x-auto bg-bg-deep/50 lg:block">
            <svg
              width={MAP_W}
              height={mapH}
              viewBox={`0 0 ${MAP_W} ${mapH}`}
              role="img"
              aria-label="Storyline branching map across chapters"
              className="block"
            >
              {/* Chapter ruler + grid */}
              <line
                x1={LABEL_W}
                y1={RULER_H}
                x2={MAP_W - PAD_RIGHT + 8}
                y2={RULER_H}
                stroke="var(--line)"
              />
              {ticks.map((t) => (
                <g key={t}>
                  <line
                    x1={chX(t)}
                    y1={RULER_H - 5}
                    x2={chX(t)}
                    y2={mapH - 6}
                    stroke="var(--line)"
                    strokeOpacity={0.45}
                  />
                  <text
                    x={chX(t)}
                    y={RULER_H - 10}
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

              {/* Clearance cursor */}
              {cursorX !== undefined && (
                <g>
                  <line
                    x1={cursorX}
                    y1={10}
                    x2={cursorX}
                    y2={mapH - 4}
                    stroke="var(--gold)"
                    strokeWidth={1}
                    strokeDasharray="3 3"
                  />
                  <text
                    x={cursorX + 5}
                    y={14}
                    fill="var(--gold-bright)"
                    fontSize={8}
                    fontFamily="var(--font-geist-mono), monospace"
                    letterSpacing="0.18em"
                  >
                    CLEARANCE {ch}
                  </text>
                </g>
              )}

              {/* Cross-thread connectors (under the lanes) */}
              {lanes.map((lane) =>
                lane.visibleNodes
                  .filter(
                    (n) =>
                      n.linkId &&
                      ["merge", "intersect", "trigger"].includes(n.kind),
                  )
                  .map((n) => {
                    const target = n.linkId
                      ? laneByStorylineId.get(n.linkId)
                      : undefined;
                    if (!target) return null;
                    const x = chX(n.ch);
                    const midY = (lane.y + target.y) / 2;
                    const dash =
                      n.kind === "intersect"
                        ? "4 3"
                        : n.kind === "trigger"
                          ? "1.5 3"
                          : undefined;
                    return (
                      <path
                        key={`${lane.storyline.id}-${n.ch}-${n.kind}-${n.linkId}`}
                        d={`M ${x} ${lane.y} Q ${x + 30} ${midY} ${x} ${target.y}`}
                        fill="none"
                        stroke={lane.storyline.color}
                        strokeWidth={1}
                        strokeOpacity={0.55}
                        strokeDasharray={dash}
                      />
                    );
                  }),
              )}

              {/* Lanes */}
              {lanes.map((lane) => {
                const s = lane.storyline;
                const nodes = lane.visibleNodes;
                const segments: {
                  x1: number;
                  x2: number;
                  dashed: boolean;
                  k: string;
                }[] = [];
                for (let i = 0; i < nodes.length - 1; i++) {
                  segments.push({
                    x1: chX(nodes[i].ch),
                    x2: chX(nodes[i + 1].ch),
                    dashed: nodes[i].kind === "pause",
                    k: `${nodes[i].ch}-${nodes[i + 1].ch}`,
                  });
                }
                const last = nodes.at(-1);
                if (last && lane.lineEndCh > last.ch) {
                  segments.push({
                    x1: chX(last.ch),
                    x2: chX(lane.lineEndCh),
                    dashed: last.kind === "pause",
                    k: `${last.ch}-tail`,
                  });
                }
                return (
                  // SVG-native anchor keeps the lane keyboard-accessible;
                  // click is intercepted for client-side navigation.
                  <a
                    key={s.id}
                    href={`/storylines/${s.id}`}
                    className="cursor-pointer"
                    aria-label={`Open storyline file: ${s.name}`}
                    onClick={(e) => {
                      e.preventDefault();
                      openLane(s.id);
                    }}
                  >
                    {/* Lane hover strip */}
                    <rect
                      x={0}
                      y={lane.y - LANE_H / 2}
                      width={MAP_W}
                      height={LANE_H}
                      fill="transparent"
                      className="hover:fill-[rgba(179,149,74,0.05)]"
                    />
                    <text
                      x={10}
                      y={lane.y + 3}
                      fill={s.color}
                      fontSize={10}
                      fontFamily="var(--font-geist-mono), monospace"
                      letterSpacing="0.08em"
                    >
                      {s.name.length > 26 ? `${s.name.slice(0, 25)}…` : s.name}
                    </text>

                    {segments.map((seg) => (
                      <line
                        key={seg.k}
                        x1={seg.x1}
                        y1={lane.y}
                        x2={seg.x2}
                        y2={lane.y}
                        stroke={s.color}
                        strokeWidth={1.5}
                        strokeOpacity={seg.dashed ? 0.5 : 0.85}
                        strokeDasharray={seg.dashed ? "3 4" : undefined}
                      />
                    ))}

                    {nodes.map((n, i) => {
                      const x = chX(n.ch);
                      const title = `${NODE_KIND_LABEL[n.kind]} · ch.${n.ch} — ${n.title}`;
                      const entry = {
                        initial: { opacity: 0 },
                        animate: { opacity: 1 },
                        transition: {
                          duration: 0.25,
                          delay: lane.index * 0.04 + i * 0.02,
                        },
                      };
                      if (n.kind === "end") {
                        return (
                          <motion.rect
                            key={`${n.ch}-${n.kind}`}
                            {...entry}
                            x={x - 4.5}
                            y={lane.y - 4.5}
                            width={9}
                            height={9}
                            fill={s.color}
                          >
                            <title>{title}</title>
                          </motion.rect>
                        );
                      }
                      const isBegin = n.kind === "begin";
                      const isPause = n.kind === "pause";
                      const isClimax = n.kind === "climax";
                      return (
                        <motion.circle
                          key={`${n.ch}-${n.kind}`}
                          {...entry}
                          cx={x}
                          cy={lane.y}
                          r={isClimax ? 6.5 : isBegin || isPause ? 4.5 : 3.5}
                          fill={isBegin || isPause ? "var(--bg-deep)" : s.color}
                          stroke={s.color}
                          strokeWidth={1.5}
                          strokeDasharray={isPause ? "2 2" : undefined}
                        >
                          <title>{title}</title>
                        </motion.circle>
                      );
                    })}
                  </a>
                );
              })}
            </svg>
          </div>

          {/* Mobile fallback: simplified vertical list */}
          <div className="space-y-3 lg:hidden">
            {lanes.map((lane) => {
              const s = lane.storyline;
              return (
                <Link
                  key={s.id}
                  href={`/storylines/${s.id}`}
                  className="dossier block p-3 transition-colors hover:border-gold-line"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ background: s.color }}
                    />
                    <span
                      className="font-mono text-[11px] uppercase tracking-widest"
                      style={{ color: s.color }}
                    >
                      {s.name}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                    {lane.visibleNodes.map((n) => (
                      <span
                        key={`${n.ch}-${n.kind}`}
                        className="font-mono text-[9px] uppercase tracking-wider text-muted"
                      >
                        {NODE_KIND_LABEL[n.kind]}·{n.ch}
                      </span>
                    ))}
                    {lane.visibleNodes.length === 0 && (
                      <span className="font-mono text-[9px] uppercase tracking-wider text-faint">
                        no plotted nodes yet
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-3 hidden flex-wrap gap-x-5 gap-y-1 lg:flex">
            {[
              ["Hollow — thread begins", "○"],
              ["Large filled — climax", "●"],
              ["Square — thread ends", "■"],
              ["Dashed — paused", "◌"],
              ["Curve — merge / intersect / trigger", "⌒"],
            ].map(([label, glyph]) => (
              <span
                key={label}
                className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted"
              >
                <span aria-hidden>{glyph}</span>
                {label}
              </span>
            ))}
          </div>
        </>
      )}

      {/* Storyline cards */}
      <div className="mt-8">
        <SectionHeading
          right={
            sealedCount > 0 ? (
              <span className="font-mono text-[10px] tracking-widest text-faint">
                {sealedCount} thread{sealedCount === 1 ? "" : "s"} sealed beyond
                clearance
              </span>
            ) : undefined
          }
        >
          Thread files
        </SectionHeading>
        {lanes.length === 0 ? (
          <ArchiveNote>Nothing to file yet.</ArchiveNote>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {lanes.map(({ storyline: s }) => {
              const status = latestStamp(s.status, ch)?.value ?? "active";
              return (
                <Link
                  key={s.id}
                  href={`/storylines/${s.id}`}
                  className="dossier corner-ticks group flex flex-col p-4 transition-colors hover:border-gold-line"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex min-w-0 items-center gap-2">
                      <span
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{ background: s.color }}
                      />
                      <span className="royal-heading truncate text-base text-ivory group-hover:text-gold-bright">
                        {s.name}
                      </span>
                    </span>
                    <span
                      className="shrink-0 font-mono text-[9px] uppercase tracking-widest"
                      style={{
                        color: STATUS_COLOR[status] ?? "var(--muted)",
                      }}
                    >
                      {status}
                    </span>
                  </div>
                  <p className="mt-1.5 line-clamp-3 flex-1 text-xs leading-relaxed text-muted">
                    {s.summary}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-line/60 pt-2 font-mono text-[10px] uppercase tracking-widest text-muted">
                    <span>
                      {s.participantIds.length} participant
                      {s.participantIds.length === 1 ? "" : "s"}
                    </span>
                    <span
                      style={{
                        color:
                          s.openQuestions.length > 0
                            ? "var(--gold)"
                            : "var(--faint)",
                      }}
                    >
                      {s.openQuestions.length} open question
                      {s.openQuestions.length === 1 ? "" : "s"}
                    </span>
                    {/* Plain text ref — a nested link inside the card link is invalid HTML. */}
                    <span className="text-teal">CH.{s.introducedCh}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
