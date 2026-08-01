"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Suspense, useMemo } from "react";
import {
  EVENT_KIND_META,
  EventKindChip,
} from "@/components/story/EventRecorder";
import {
  ArchiveNote,
  ChapterRef,
  EntityLink,
  EntityList,
  Monogram,
  Panel,
  SectionHeading,
  Tag,
} from "@/components/ui/kit";
import {
  factById,
  type KnowledgePropagation,
  knowledgeByFact,
  knowledgeFacts,
  knowledgePropagationByFact,
} from "@/lib/db";
import { useEffectiveChapter } from "@/lib/store";
import type {
  CharacterKnowledge,
  KnowledgeFact,
  KnowledgeState,
  StoryEvent,
} from "@/lib/types";
import { ARC_START } from "@/lib/types";
import { useUrlString } from "@/lib/urlState";

// The @/data modules are authored in parallel; these pins assert the intended
// types so this file typechecks before the datasets land.
const allFacts = knowledgeFacts as KnowledgeFact[];
const factLookup = factById as unknown as Map<string, KnowledgeFact>;
const rowsByFact = knowledgeByFact as unknown as Map<
  string,
  CharacterKnowledge[]
>;

const FACT_KIND_ORDER: { kind: KnowledgeFact["kind"]; label: string }[] = [
  { kind: "nen-ability", label: "Nen abilities" },
  { kind: "identity", label: "Identities" },
  { kind: "murder", label: "Murders" },
  { kind: "alliance", label: "Alliances" },
  { kind: "location", label: "Locations" },
  { kind: "plan", label: "Plans" },
  { kind: "beast-effect", label: "Beast effects" },
  { kind: "passage", label: "Passages" },
  { kind: "other", label: "Other intelligence" },
];

/** Bucket order for the clearance board — most certain to least aware. */
const STATE_ORDER: KnowledgeState[] = [
  "knows",
  "observed",
  "was-told",
  "suspects",
  "misunderstands",
  "believes-false",
  "hiding",
  "unaware",
  "reader-only",
];

const STATE_LABEL: Record<KnowledgeState, string> = {
  knows: "Knows",
  observed: "Observed",
  "was-told": "Was told",
  suspects: "Suspects",
  misunderstands: "Misunderstands",
  "believes-false": "Believes falsely",
  hiding: "Hiding it",
  unaware: "Unaware",
  "reader-only": "Reader-only",
};

const STATE_COLOR: Record<KnowledgeState, string> = {
  knows: "var(--teal)",
  observed: "var(--teal)",
  "was-told": "var(--parchment)",
  suspects: "var(--warn)",
  misunderstands: "var(--warn)",
  "believes-false": "var(--blood)",
  hiding: "var(--violet)",
  unaware: "var(--faint)",
  "reader-only": "var(--gold)",
};

/** Rows the reader is allowed to see at clearance `ch`. */
function visibleRows(factId: string, ch: number): CharacterKnowledge[] {
  return (rowsByFact.get(factId) ?? []).filter(
    (row) => (row.revealCh ?? row.sinceCh) <= ch,
  );
}

export default function KnowledgePage() {
  return (
    <Suspense fallback={<KnowledgePageFallback />}>
      <KnowledgePageInner />
    </Suspense>
  );
}

function KnowledgePageFallback() {
  return (
    <div>
      <div className="archive-page-header mb-6">
        <div className="intel-label-gold">Intelligence-clearance network</div>
        <h1 className="royal-heading text-3xl">Who Knows What</h1>
        <p className="mt-2 max-w-3xl text-xs text-muted">
          Every tracked fact aboard the ship, and every character&apos;s
          relationship to it — knowledge, suspicion, false belief, or blissful
          ignorance. Select a fact to open its clearance board.
        </p>
      </div>
    </div>
  );
}

function KnowledgePageInner() {
  const ch = useEffectiveChapter();
  const [selectedFactId, setSelectedFactId] = useUrlString("fact");

  const visibleFacts = useMemo(
    () => allFacts.filter((f) => f.readerRevealCh <= ch),
    [ch],
  );
  const sealedCount = allFacts.length - visibleFacts.length;

  const selectedFact =
    selectedFactId !== "" ? factLookup.get(selectedFactId) : undefined;
  const factIsOpen =
    selectedFact !== undefined && selectedFact.readerRevealCh <= ch;

  return (
    <div>
      <div className="archive-page-header mb-6">
        <div className="intel-label-gold">Intelligence-clearance network</div>
        <h1 className="royal-heading text-3xl">Who Knows What</h1>
        <p className="mt-2 max-w-3xl text-xs text-muted">
          Every tracked fact aboard the ship, and every character&apos;s
          relationship to it — knowledge, suspicion, false belief, or blissful
          ignorance. Select a fact to open its clearance board.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[300px_1fr]">
        {/* Fact ledger */}
        <div className="space-y-5">
          {FACT_KIND_ORDER.map(({ kind, label }) => {
            const ofKind = visibleFacts.filter((f) => f.kind === kind);
            if (ofKind.length === 0) return null;
            return (
              <div key={kind}>
                <SectionHeading>{label}</SectionHeading>
                <ul className="space-y-1">
                  {ofKind.map((fact) => {
                    const holders = new Set(
                      visibleRows(fact.id, ch).map((r) => r.characterId),
                    ).size;
                    const active = selectedFactId === fact.id;
                    return (
                      <li key={fact.id}>
                        <button
                          type="button"
                          onClick={() => setSelectedFactId(fact.id)}
                          aria-pressed={active}
                          className={`flex w-full items-baseline justify-between gap-2 border border-l-2 px-2 py-1.5 text-left text-sm transition-colors ${
                            active
                              ? "border-gold-line text-gold-bright"
                              : "border-line text-parchment hover:border-line-strong"
                          }`}
                        >
                          <span className="min-w-0">{fact.label}</span>
                          <span className="shrink-0 font-mono text-[10px] text-faint">
                            {holders}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
          {sealedCount > 0 && (
            <ArchiveNote>
              {sealedCount} fact{sealedCount === 1 ? "" : "s"} sealed beyond
              current clearance (chapter {ch}).
            </ArchiveNote>
          )}
        </div>

        {/* Clearance board */}
        <div className="min-w-0">
          <AnimatePresence mode="wait">
            {factIsOpen && selectedFact ? (
              <motion.div
                key={selectedFact.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
              >
                <ClearanceBoard fact={selectedFact} ch={ch} />
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ArchiveNote>
                  {selectedFactId && !factIsOpen
                    ? "That fact is sealed beyond your current clearance."
                    : "Select a fact from the ledger to open its clearance board."}
                </ArchiveNote>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function ClearanceBoard({ fact, ch }: { fact: KnowledgeFact; ch: number }) {
  const rows = visibleRows(fact.id, ch);
  const buckets = STATE_ORDER.map((state) => ({
    state,
    rows: rows
      .filter((r) => r.state === state)
      .sort((a, b) => a.sinceCh - b.sinceCh),
  })).filter((b) => b.rows.length > 0);

  return (
    <div className="space-y-4">
      <Panel label="Tracked fact" title={fact.label} gold>
        <div className="mb-2">
          <Tag>{fact.kind}</Tag>
          <span className="ml-3 text-xs text-muted">
            Reader clearance since <ChapterRef ch={fact.readerRevealCh} />
          </span>
        </div>
        <p className="text-sm leading-relaxed text-parchment">
          {fact.description}
        </p>
        {(fact.relatedCharacterIds?.length ||
          fact.relatedAbilityIds?.length) && (
          <div className="mt-3 space-y-1 border-t border-line pt-2 text-xs">
            {fact.relatedCharacterIds &&
              fact.relatedCharacterIds.length > 0 && (
                <div>
                  <span className="intel-label mr-2">Persons</span>
                  <EntityList ids={fact.relatedCharacterIds} />
                </div>
              )}
            {fact.relatedAbilityIds && fact.relatedAbilityIds.length > 0 && (
              <div>
                <span className="intel-label mr-2">Abilities</span>
                <EntityList ids={fact.relatedAbilityIds} />
              </div>
            )}
          </div>
        )}
      </Panel>

      <SpreadStrip rows={rows} ch={ch} />

      <PropagationRecord fact={fact} ch={ch} />

      {buckets.length === 0 ? (
        <ArchiveNote>
          No character-level intelligence recorded at this clearance.
        </ArchiveNote>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {buckets.map(({ state, rows: bucketRows }) => (
            <Panel
              key={state}
              label={
                state === "reader-only"
                  ? "Eyes only — you, the reader"
                  : `${bucketRows.length} on record`
              }
              title={
                <span style={{ color: STATE_COLOR[state] }}>
                  {STATE_LABEL[state]}
                </span>
              }
              gold={state === "reader-only"}
            >
              <ul className="space-y-2">
                {bucketRows.map((row) => (
                  <li
                    key={`${row.characterId}-${row.sinceCh}`}
                    className="flex items-start gap-2.5"
                  >
                    <Monogram characterId={row.characterId} size="sm" />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <EntityLink id={row.characterId} />
                        <ChapterRef ch={row.sinceCh} />
                      </div>
                      {row.note && (
                        <p className="text-xs text-muted">{row.note}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </Panel>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Knowledge-spread strip: a mini timeline (arc start → clearance) with one
   dot per knowledge row at its sinceCh, colored by state — how the secret
   traveled through the ship.
--------------------------------------------------------------------------- */

const STRIP_W = 640;
const STRIP_H = 64;
const STRIP_PAD = 26;

function SpreadStrip({ rows, ch }: { rows: CharacterKnowledge[]; ch: number }) {
  if (rows.length === 0) return null;
  const span = Math.max(1, ch - ARC_START);
  const xFor = (sinceCh: number): number =>
    STRIP_PAD +
    ((Math.min(Math.max(sinceCh, ARC_START), ch) - ARC_START) / span) *
      (STRIP_W - STRIP_PAD * 2);

  // Stack dots that share a chapter so they stay individually visible.
  const stackIndex = new Map<number, number>();
  const dots = [...rows]
    .sort((a, b) => a.sinceCh - b.sinceCh)
    .map((row) => {
      const clamped = Math.min(Math.max(row.sinceCh, ARC_START), ch);
      const idx = stackIndex.get(clamped) ?? 0;
      stackIndex.set(clamped, idx + 1);
      return {
        key: `${row.characterId}-${row.state}-${row.sinceCh}`,
        cx: xFor(row.sinceCh),
        cy: STRIP_H - 18 - Math.min(idx, 4) * 8,
        color: STATE_COLOR[row.state],
        state: row.state,
      };
    });

  return (
    <div className="dossier bg-bg-deep/50 p-3">
      <div className="intel-label mb-1">Knowledge spread</div>
      <svg
        viewBox={`0 0 ${STRIP_W} ${STRIP_H}`}
        className="h-auto w-full"
        aria-label="Timeline of when each character reached their knowledge state"
      >
        <title>Knowledge spread over the voyage</title>
        <line
          x1={STRIP_PAD}
          y1={STRIP_H - 12}
          x2={STRIP_W - STRIP_PAD}
          y2={STRIP_H - 12}
          stroke="var(--line-strong)"
          strokeWidth="1"
        />
        <text
          x={STRIP_PAD}
          y={STRIP_H - 2}
          fill="var(--faint)"
          style={{ font: "8px var(--font-geist-mono), monospace" }}
        >
          CH.{ARC_START}
        </text>
        <text
          x={STRIP_W - STRIP_PAD}
          y={STRIP_H - 2}
          textAnchor="end"
          fill="var(--gold)"
          style={{ font: "8px var(--font-geist-mono), monospace" }}
        >
          CH.{ch}
        </text>
        {dots.map((dot) => (
          <motion.circle
            key={dot.key}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, cx: dot.cx, cy: dot.cy }}
            transition={{ duration: 0.2 }}
            r={3}
            fill={dot.color}
            stroke="var(--bg-deep)"
            strokeWidth={0.8}
          >
            <title>{STATE_LABEL[dot.state]}</title>
          </motion.circle>
        ))}
      </svg>
      <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
        {(
          [
            ["Knows", "var(--teal)"],
            ["Suspects", "var(--warn)"],
            ["Believes falsely", "var(--blood)"],
            ["Hiding it", "var(--violet)"],
            ["Reader-only", "var(--gold)"],
          ] as const
        ).map(([label, color]) => (
          <span
            key={label}
            className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-muted"
          >
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: color }}
            />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Transmission record: the chain of events that moved each character to a
   knowledge state — who learned (or was misled) about the fact, when, and
   through which incident. Sourced from StoryEvent.knowledgeChanges.
--------------------------------------------------------------------------- */

function PropagationRecord({ fact, ch }: { fact: KnowledgeFact; ch: number }) {
  const hops = knowledgePropagationByFact.get(fact.id) ?? [];
  if (hops.length === 0) return null;

  const cleared = hops.filter((hop) => hop.event.chapter <= ch);
  const sealedHops = hops.length - cleared.length;

  // Consecutive hops from the same event render as one entry.
  const entries: { event: StoryEvent; changes: KnowledgePropagation[] }[] = [];
  for (const hop of cleared) {
    const last = entries[entries.length - 1];
    if (last && last.event.id === hop.event.id) last.changes.push(hop);
    else entries.push({ event: hop.event, changes: [hop] });
  }

  return (
    <Panel label="Transmission record" title="How the intelligence traveled">
      {entries.length === 0 ? (
        <ArchiveNote>
          Every traced transmission of this fact is sealed beyond current
          clearance (chapter {ch}).
        </ArchiveNote>
      ) : (
        <ol className="relative ml-1.5 space-y-4 border-l border-line pl-5">
          {entries.map(({ event, changes }) => (
            <li key={event.id} className="relative">
              <span
                className="absolute -left-[25px] top-1 h-2 w-2 rounded-full border"
                style={{
                  borderColor: EVENT_KIND_META[event.kind].color,
                  background: "var(--panel)",
                }}
                aria-hidden
              />
              <div className="flex flex-wrap items-center gap-2">
                <ChapterRef ch={event.chapter} />
                {event.day !== undefined && (
                  <span className="font-mono text-[9px] uppercase tracking-widest text-faint">
                    Day {event.day}
                    {event.approxTime ? ` · ${event.approxTime}` : ""}
                  </span>
                )}
                <EventKindChip kind={event.kind} />
              </div>
              <Link
                href={`/chronology?event=${event.id}`}
                className="mt-0.5 block text-sm leading-snug text-ivory hover:text-gold-bright"
              >
                {event.title}
              </Link>
              <ul className="mt-1 space-y-0.5">
                {changes.map((change) => (
                  <li
                    key={`${change.characterId}-${change.state}`}
                    className="flex flex-wrap items-baseline gap-x-2 text-xs"
                  >
                    <EntityLink id={change.characterId} />
                    <span className="text-faint" aria-hidden>
                      →
                    </span>
                    <span
                      className="font-mono text-[10px] uppercase tracking-widest"
                      style={{ color: STATE_COLOR[change.state] }}
                    >
                      {STATE_LABEL[change.state]}
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      )}
      {sealedHops > 0 && entries.length > 0 && (
        <div className="mt-3">
          <ArchiveNote>
            {sealedHops} later transmission{sealedHops === 1 ? "" : "s"} sealed
            beyond current clearance (chapter {ch}).
          </ArchiveNote>
        </div>
      )}
    </Panel>
  );
}
