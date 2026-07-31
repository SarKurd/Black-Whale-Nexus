"use client";

import Link from "next/link";
import { type ReactNode, useMemo } from "react";
import {
  ArchiveNote,
  ChapterRef,
  EntityLink,
  Panel,
} from "@/components/ui/kit";
import { mysteryById, sortedChapters } from "@/lib/db";
import { useEffectiveChapter, useStoreHydrated } from "@/lib/store";
import type { ChapterInfo, Mystery } from "@/lib/types";
import { ARC_END, ARC_START, PRE_ARC } from "@/lib/types";
import { useUrlString } from "@/lib/urlState";

// ---------------------------------------------------------------------------
// Digest aggregation — pure derivation from the per-chapter `changes` diffs
// ---------------------------------------------------------------------------

interface StampedId {
  id: string;
  ch: number;
}

interface StampedText {
  text: string;
  ch: number;
}

/** One mystery with every chapter in range that touched it. */
interface MysteryDelta {
  id: string;
  chapters: number[];
}

interface Digest {
  chaptersOpened: ChapterInfo[];
  newCharacters: StampedId[];
  deaths: StampedId[];
  newRelationships: StampedText[];
  brokenAlliances: StampedText[];
  movement: StampedText[];
  newKnowledge: StampedText[];
  newAbilities: StampedText[];
  changedObjectives: StampedText[];
  newThreats: StampedText[];
  mysteriesIntroduced: MysteryDelta[];
  mysteriesAdvanced: MysteryDelta[];
  mysteriesResolved: MysteryDelta[];
}

/** Everything that changed in chapters (fromCh, toCh], in chapter order. */
function buildDigest(fromCh: number, toCh: number): Digest {
  const chaptersOpened = sortedChapters.filter(
    (c) => c.number > fromCh && c.number <= toCh,
  );

  const newCharacters: StampedId[] = [];
  const deaths: StampedId[] = [];
  const seenCharacters = new Set<string>();
  const seenDeaths = new Set<string>();
  const newRelationships: StampedText[] = [];
  const brokenAlliances: StampedText[] = [];
  const movement: StampedText[] = [];
  const newKnowledge: StampedText[] = [];
  const newAbilities: StampedText[] = [];
  const changedObjectives: StampedText[] = [];
  const newThreats: StampedText[] = [];
  const mysteriesIntroduced = new Map<string, number[]>();
  const mysteriesAdvanced = new Map<string, number[]>();
  const mysteriesResolved = new Map<string, number[]>();

  const collectIds = (
    target: StampedId[],
    seen: Set<string>,
    ids: string[] | undefined,
    ch: number,
  ) => {
    for (const id of ids ?? []) {
      if (seen.has(id)) continue;
      seen.add(id);
      target.push({ id, ch });
    }
  };
  const collectTexts = (
    target: StampedText[],
    texts: string[] | undefined,
    ch: number,
  ) => {
    for (const text of texts ?? []) target.push({ text, ch });
  };
  const collectMysteries = (
    target: Map<string, number[]>,
    ids: string[] | undefined,
    ch: number,
  ) => {
    for (const id of ids ?? []) {
      const chapters = target.get(id);
      if (chapters) chapters.push(ch);
      else target.set(id, [ch]);
    }
  };

  for (const chapter of chaptersOpened) {
    const delta = chapter.changes;
    collectIds(
      newCharacters,
      seenCharacters,
      delta.newCharacters,
      chapter.number,
    );
    collectIds(deaths, seenDeaths, delta.deaths, chapter.number);
    collectTexts(newRelationships, delta.newRelationships, chapter.number);
    collectTexts(brokenAlliances, delta.brokenAlliances, chapter.number);
    collectTexts(movement, delta.movement, chapter.number);
    collectTexts(newKnowledge, delta.newKnowledge, chapter.number);
    collectTexts(newAbilities, delta.newAbilities, chapter.number);
    collectTexts(changedObjectives, delta.changedObjectives, chapter.number);
    collectTexts(newThreats, delta.newThreats, chapter.number);
    collectMysteries(
      mysteriesIntroduced,
      delta.mysteriesIntroduced,
      chapter.number,
    );
    collectMysteries(
      mysteriesAdvanced,
      delta.mysteriesAdvanced,
      chapter.number,
    );
    collectMysteries(
      mysteriesResolved,
      delta.mysteriesResolved,
      chapter.number,
    );
  }

  const toDeltas = (source: Map<string, number[]>): MysteryDelta[] =>
    [...source.entries()].map(([id, chapters]) => ({ id, chapters }));

  return {
    chaptersOpened,
    newCharacters,
    deaths,
    newRelationships,
    brokenAlliances,
    movement,
    newKnowledge,
    newAbilities,
    changedObjectives,
    newThreats,
    mysteriesIntroduced: toDeltas(mysteriesIntroduced),
    mysteriesAdvanced: toDeltas(mysteriesAdvanced),
    mysteriesResolved: toDeltas(mysteriesResolved),
  };
}

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

interface DigestRow {
  key: string;
  node: ReactNode;
  chapters: number[];
}

/** One labeled diff group — same +/−/Δ semantics as the chapter report. */
function DigestGroup({
  label,
  marker,
  color,
  rows,
}: {
  label: string;
  marker: string;
  color: string;
  rows: DigestRow[];
}) {
  if (rows.length === 0) return null;
  return (
    <div>
      <div className="intel-label mb-1" style={{ color }}>
        {label}
      </div>
      <ul className="space-y-1">
        {rows.map((row) => (
          <li
            key={row.key}
            className="flex items-start gap-2 text-sm text-parchment"
          >
            <span
              className="mt-px w-4 shrink-0 text-center font-mono text-xs"
              style={{ color }}
              aria-hidden
            >
              {marker}
            </span>
            <span className="min-w-0 flex-1">{row.node}</span>
            <span className="flex shrink-0 flex-wrap justify-end gap-x-1.5 pt-0.5">
              {row.chapters.map((n) => (
                <ChapterRef key={n} ch={n} />
              ))}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MysteryLink({ id }: { id: string }) {
  // mysteryById's inferred typing collapses while the data modules are being
  // authored in parallel; the id key is the map's contract.
  const m = (mysteryById as Map<string, Mystery>).get(id);
  return (
    <Link
      href={`/mysteries#${id}`}
      className="text-gold underline decoration-dotted underline-offset-2 hover:text-gold-bright hover:decoration-solid"
    >
      {m?.question ?? id}
    </Link>
  );
}

function idRows(entries: StampedId[], strike = false): DigestRow[] {
  return entries.map((entry) => ({
    key: entry.id,
    node: strike ? (
      <span className="line-through decoration-[var(--blood)] decoration-1">
        <EntityLink id={entry.id} />
      </span>
    ) : (
      <EntityLink id={entry.id} />
    ),
    chapters: [entry.ch],
  }));
}

function textRows(entries: StampedText[]): DigestRow[] {
  return entries.map((entry) => ({
    key: `${entry.ch}:${entry.text}`,
    node: entry.text,
    chapters: [entry.ch],
  }));
}

function mysteryRows(entries: MysteryDelta[]): DigestRow[] {
  return entries.map((entry) => ({
    key: entry.id,
    node: <MysteryLink id={entry.id} />,
    chapters: entry.chapters,
  }));
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

const CHAPTER_PARAM = /^\d{1,4}$/;

function clampChapter(value: number, low: number, high: number): number {
  return Math.min(Math.max(value, low), high);
}

export default function DeclassifiedPage() {
  const hydrated = useStoreHydrated();
  const effectiveChapter = useEffectiveChapter();
  const [fromParam, setFromParam] = useUrlString("from", "", (value) =>
    CHAPTER_PARAM.test(value),
  );
  const [toParam, setToParam] = useUrlString("to", "", (value) =>
    CHAPTER_PARAM.test(value),
  );

  // Resolved bounds: digest covers chapters (fromCh, toCh], never beyond
  // clearance. fromCh caps at toCh - 1, so the range is never empty — the
  // page lands on the latest report at clearance.
  const requestedTo = toParam === "" ? null : Number(toParam);
  const toCh = clampChapter(
    requestedTo ?? effectiveChapter,
    ARC_START,
    effectiveChapter,
  );
  // At full clearance there is nothing left to unseal, however large the
  // requested bound — the truncation note would be a lie.
  const truncated =
    requestedTo !== null &&
    requestedTo > effectiveChapter &&
    effectiveChapter < ARC_END;
  const requestedFrom = fromParam === "" ? null : Number(fromParam);
  const fromCh = clampChapter(requestedFrom ?? toCh - 1, PRE_ARC, toCh - 1);

  const digest = useMemo(() => buildDigest(fromCh, toCh), [fromCh, toCh]);
  const mysteriesMoved = new Set(
    [
      ...digest.mysteriesIntroduced,
      ...digest.mysteriesAdvanced,
      ...digest.mysteriesResolved,
    ].map((m) => m.id),
  ).size;
  const hasChanges =
    digest.newCharacters.length > 0 ||
    digest.deaths.length > 0 ||
    digest.newRelationships.length > 0 ||
    digest.brokenAlliances.length > 0 ||
    digest.movement.length > 0 ||
    digest.newKnowledge.length > 0 ||
    digest.newAbilities.length > 0 ||
    digest.changedObjectives.length > 0 ||
    digest.newThreats.length > 0 ||
    mysteriesMoved > 0;

  // "From" ranges over every chapter but the last at clearance; picking one
  // snaps "to" onto the next chapter (see onChange), and "to" then offers
  // anything from there up — the range can never be empty or inverted.
  const fromOptions: number[] = [];
  for (let n = PRE_ARC; n < effectiveChapter; n++) fromOptions.push(n);
  const toOptions: number[] = [];
  for (let n = Math.max(fromCh + 1, ARC_START); n <= effectiveChapter; n++)
    toOptions.push(n);

  const rangeLabel =
    fromCh + 1 === toCh ? `CH.${toCh}` : `CH.${fromCh + 1}–${toCh}`;

  return (
    <div>
      <div className="mb-5">
        <div className="intel-label-gold">Clearance delta</div>
        <h1 className="royal-heading text-3xl">Declassification Digest</h1>
        <p className="mt-1 max-w-3xl text-xs text-muted">
          Pick two chapters and this desk gathers everything that entered the
          record between them — deaths revealed, new arrivals, movements,
          knowledge gained, mysteries moved — so a returning analyst can catch
          up in one pass. Nothing above your clearance is ever shown.
        </p>
      </div>

      {!hydrated ? (
        <ArchiveNote>Consulting the clearance ledger…</ArchiveNote>
      ) : (
        <>
          {/* Range controls */}
          <div className="mb-5 flex flex-wrap items-end gap-3">
            <label className="block">
              <span className="intel-label mb-1 block">From chapter</span>
              <select
                value={String(fromCh)}
                onChange={(e) => {
                  const nextFrom = Number(e.target.value);
                  setFromParam(e.target.value);
                  // Only snap "to" when the pick would invert the range —
                  // a still-valid "to" stays where the reader put it.
                  if (nextFrom >= toCh) {
                    setToParam(String(nextFrom + 1));
                  }
                }}
                className="border border-line bg-panel px-2 py-1.5 font-mono text-sm text-parchment outline-none focus:border-gold-line"
              >
                {fromOptions.map((n) => (
                  <option key={n} value={n}>
                    {n === PRE_ARC ? "Pre-voyage (before 340)" : `Chapter ${n}`}
                  </option>
                ))}
              </select>
            </label>
            <span className="pb-2 font-mono text-xs text-faint" aria-hidden>
              →
            </span>
            <label className="block">
              <span className="intel-label mb-1 block">To chapter</span>
              <select
                value={String(toCh)}
                onChange={(e) => setToParam(e.target.value)}
                className="border border-line bg-panel px-2 py-1.5 font-mono text-sm text-parchment outline-none focus:border-gold-line"
              >
                {toOptions.map((n) => (
                  <option key={n} value={n}>
                    Chapter {n}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {truncated && (
            <div className="mb-4">
              <ArchiveNote>
                Part of the requested range sits above your clearance — the
                digest is truncated at chapter {effectiveChapter}. Raise
                clearance to unseal the rest.
              </ArchiveNote>
            </div>
          )}

          {/* Summary strip */}
          <div className="mb-4 flex flex-wrap gap-x-4 gap-y-1 border-y border-line/60 py-2 font-mono text-[10px] uppercase tracking-widest">
            <span className="text-muted">
              {digest.chaptersOpened.length} report
              {digest.chaptersOpened.length === 1 ? "" : "s"} opened
            </span>
            <span
              style={{
                color:
                  digest.deaths.length > 0 ? "var(--blood)" : "var(--faint)",
              }}
            >
              {digest.deaths.length} death
              {digest.deaths.length === 1 ? "" : "s"}
            </span>
            <span
              style={{
                color:
                  digest.newCharacters.length > 0
                    ? "var(--teal)"
                    : "var(--faint)",
              }}
            >
              {digest.newCharacters.length} entered the record
            </span>
            <span
              style={{
                color: mysteriesMoved > 0 ? "var(--gold)" : "var(--faint)",
              }}
            >
              {mysteriesMoved} myster{mysteriesMoved === 1 ? "y" : "ies"} moved
            </span>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Panel
                label="Differential analysis"
                title={`What changed · ${rangeLabel}`}
                gold
              >
                {!hasChanges ? (
                  <ArchiveNote>
                    The board did not move in this range — no recorded state
                    changes.
                  </ArchiveNote>
                ) : (
                  <div className="space-y-4">
                    <DigestGroup
                      label="Entered the record"
                      marker="+"
                      color="var(--teal)"
                      rows={idRows(digest.newCharacters)}
                    />
                    <DigestGroup
                      label="Deaths"
                      marker="−"
                      color="var(--blood)"
                      rows={idRows(digest.deaths, true)}
                    />
                    <DigestGroup
                      label="New relationships"
                      marker="+"
                      color="var(--teal)"
                      rows={textRows(digest.newRelationships)}
                    />
                    <DigestGroup
                      label="Broken alliances"
                      marker="−"
                      color="var(--blood-bright)"
                      rows={textRows(digest.brokenAlliances)}
                    />
                    <DigestGroup
                      label="Movement"
                      marker="→"
                      color="var(--muted)"
                      rows={textRows(digest.movement)}
                    />
                    <DigestGroup
                      label="New knowledge"
                      marker="+"
                      color="var(--gold)"
                      rows={textRows(digest.newKnowledge)}
                    />
                    <DigestGroup
                      label="New abilities"
                      marker="+"
                      color="var(--violet)"
                      rows={textRows(digest.newAbilities)}
                    />
                    <DigestGroup
                      label="Changed objectives"
                      marker="Δ"
                      color="var(--warn)"
                      rows={textRows(digest.changedObjectives)}
                    />
                    <DigestGroup
                      label="New threats"
                      marker="!"
                      color="var(--blood-bright)"
                      rows={textRows(digest.newThreats)}
                    />
                    <DigestGroup
                      label="Mysteries introduced"
                      marker="?"
                      color="var(--gold)"
                      rows={mysteryRows(digest.mysteriesIntroduced)}
                    />
                    <DigestGroup
                      label="Mysteries advanced"
                      marker="→"
                      color="var(--teal)"
                      rows={mysteryRows(digest.mysteriesAdvanced)}
                    />
                    <DigestGroup
                      label="Mysteries resolved"
                      marker="✓"
                      color="var(--alive)"
                      rows={mysteryRows(digest.mysteriesResolved)}
                    />
                  </div>
                )}
              </Panel>
            </div>

            <div>
              <Panel label="Report log" title="Reports opened">
                <div className="max-h-[32rem] space-y-1.5 overflow-y-auto pr-1">
                  {digest.chaptersOpened.map((c) => (
                    <Link
                      key={c.number}
                      href={`/chapters/${c.number}`}
                      className="group flex items-baseline gap-3 border border-line/70 bg-raised/50 px-3 py-2 transition-colors hover:border-gold-line"
                    >
                      <span className="shrink-0 font-mono text-base tracking-widest text-gold">
                        {c.number}
                      </span>
                      <span className="min-w-0 truncate text-xs text-parchment group-hover:text-gold-bright">
                        {c.title}
                      </span>
                      {c.day && (
                        <span className="ml-auto shrink-0 font-mono text-[9px] uppercase tracking-widest text-faint">
                          Day {c.day}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </Panel>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
