"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import {
  ArchiveNote,
  ChapterRef,
  ConfidenceBadge,
  EntityList,
} from "@/components/ui/kit";
import { theories } from "@/lib/db";
import { latestStamp } from "@/lib/spoiler";
import { useEffectiveChapter, useNexusStore } from "@/lib/store";
import type { Evidence, Theory, TheoryStatus } from "@/lib/types";

const THEORY_STATUS_LABEL: Record<TheoryStatus, string> = {
  unresolved: "Unresolved",
  strengthened: "Strengthened",
  weakened: "Weakened",
  confirmed: "Confirmed",
  disproven: "Disproven",
};

const THEORY_STATUS_COLOR: Record<TheoryStatus, string> = {
  unresolved: "var(--muted)",
  strengthened: "var(--teal)",
  weakened: "var(--warn)",
  confirmed: "var(--gold)",
  disproven: "var(--blood)",
};

export default function TheoriesPage() {
  const clearanceChapter = useEffectiveChapter();
  const hideTheories = useNexusStore((s) => s.hideTheories);
  const setHideTheories = useNexusStore((s) => s.setHideTheories);

  // A theory enters the room once its earliest relevant chapter is within
  // clearance; everything else stays out of sight entirely.
  const visibleTheories = useMemo<Theory[]>(
    () =>
      theories.filter((t: Theory) => {
        const firstChapter =
          t.chapters.length > 0 ? Math.min(...t.chapters) : 0;
        return firstChapter <= clearanceChapter;
      }),
    [clearanceChapter],
  );

  return (
    <div>
      <div className="mb-4">
        <div className="intel-label" style={{ color: "var(--violet)" }}>
          Speculative annex
        </div>
        <h1 className="royal-heading text-3xl">The Hypothesis Room</h1>
      </div>

      {/* Non-canon banner + global visibility toggle */}
      <div
        className="dossier corner-ticks mb-5 border-l-2 p-4"
        style={{ borderLeftColor: "var(--violet)" }}
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="max-w-2xl">
            <div
              className="intel-label mb-1"
              style={{ color: "var(--violet)" }}
            >
              Analyst notice — nothing here is canonical
            </div>
            <p className="text-sm leading-relaxed text-parchment">
              Everything in this room is reader speculation assembled by the
              archive&apos;s analysts. It is not part of the source material.
              Claims are tracked against evidence and re-assessed as chapters
              arrive, but even a &quot;confirmed&quot; hypothesis was a guess
              until canon caught up with it.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setHideTheories(!hideTheories)}
            aria-pressed={hideTheories}
            className={`shrink-0 border px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest transition-colors ${
              hideTheories
                ? "border-gold-line text-gold-bright"
                : "border-line text-muted hover:border-line-strong hover:text-parchment"
            }`}
          >
            {hideTheories ? "Show theory content" : "Hide theory content"}
          </button>
        </div>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-faint">
          This switch applies site-wide — hiding theories removes speculative
          content from dossiers and every other page, not just this room.
        </p>
      </div>

      {hideTheories ? (
        <ArchiveNote>
          Theory content is hidden by your preference. Nothing speculative is
          shown anywhere on the site — dossiers, the web, and this room stay
          canon-only until you switch it back on above.
        </ArchiveNote>
      ) : visibleTheories.length === 0 ? (
        <ArchiveNote>
          No hypotheses have been filed at chapter {clearanceChapter}. Raise
          your clearance to open the annex.
        </ArchiveNote>
      ) : (
        <div className="space-y-5">
          {visibleTheories.map((t, i) => (
            <TheoryCard
              key={t.id}
              theory={t}
              clearanceChapter={clearanceChapter}
              index={i}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function TheoryCard({
  theory,
  clearanceChapter,
  index,
}: {
  theory: Theory;
  clearanceChapter: number;
  index: number;
}) {
  const currentStatus: TheoryStatus =
    latestStamp(theory.statusHistory, clearanceChapter)?.value ?? "unresolved";
  const statusTrail = theory.statusHistory
    .filter((s) => (s.revealCh ?? s.ch) <= clearanceChapter)
    .sort((a, b) => a.ch - b.ch);
  const supporting = theory.supporting.filter(
    (e) => e.chapter <= clearanceChapter,
  );
  const contradicting = theory.contradicting.filter(
    (e) => e.chapter <= clearanceChapter,
  );
  const relevantChapters = theory.chapters
    .filter((n) => n <= clearanceChapter)
    .sort((a, b) => a - b);
  const assessedWithinClearance = theory.lastUpdatedCh <= clearanceChapter;

  return (
    <motion.section
      id={theory.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: Math.min(index, 6) * 0.04 }}
      className="dossier corner-ticks scroll-mt-24 border-l-2"
      style={{ borderLeftColor: "var(--violet)" }}
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-line px-4 py-3">
        <div className="min-w-0">
          <div className="intel-label" style={{ color: "var(--violet)" }}>
            Hypothesis · {theory.id.toUpperCase()}
          </div>
          <h2 className="royal-heading text-xl">{theory.claim}</h2>
        </div>
        <span
          className="stamp shrink-0 text-[11px]"
          style={{ color: THEORY_STATUS_COLOR[currentStatus] }}
        >
          {THEORY_STATUS_LABEL[currentStatus]}
        </span>
      </header>

      <div className="space-y-4 p-4">
        <p className="max-w-3xl text-sm leading-relaxed text-parchment">
          {theory.summary}
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted">
          <span className="flex items-center gap-1.5">
            <span className="intel-label">Analyst confidence</span>
            <ConfidenceBadge level={theory.confidence} />
          </span>
          <span className="flex items-center gap-1.5">
            <span className="intel-label">Last assessed</span>
            {assessedWithinClearance ? (
              <ChapterRef ch={theory.lastUpdatedCh} />
            ) : (
              <span className="font-mono text-[10px] uppercase tracking-wider text-faint">
                beyond clearance
              </span>
            )}
          </span>
          {(theory.relatedCharacterIds ?? []).length > 0 && (
            <span className="flex flex-wrap items-center gap-1.5">
              <span className="intel-label">Concerns</span>
              <EntityList ids={theory.relatedCharacterIds ?? []} />
            </span>
          )}
        </div>

        {/* Evidence columns */}
        <div className="grid gap-4 md:grid-cols-2">
          <TheoryEvidenceColumn
            heading="Supporting evidence"
            accent="var(--teal)"
            items={supporting}
            emptyNote="No support on record at this clearance."
          />
          <TheoryEvidenceColumn
            heading="Contradicting evidence"
            accent="var(--blood)"
            items={contradicting}
            emptyNote="Nothing on record contradicts this yet."
          />
        </div>

        {/* Relevant chapters */}
        {relevantChapters.length > 0 && (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <span className="intel-label">Relevant chapters</span>
            {relevantChapters.map((n) => (
              <ChapterRef key={n} ch={n} />
            ))}
          </div>
        )}

        {/* Assessment trail */}
        {statusTrail.length > 0 && (
          <div className="border-t border-line/60 pt-3">
            <div className="intel-label mb-2">Assessment trail</div>
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-2">
              {statusTrail.map((s, i) => (
                <li
                  key={`${s.ch}-${s.value}`}
                  className="flex items-center gap-2"
                >
                  {i > 0 && <span className="text-faint">→</span>}
                  <span className="flex items-center gap-1.5">
                    <ChapterRef ch={s.ch} />
                    <span
                      className="stamp text-[9px]"
                      style={{ color: THEORY_STATUS_COLOR[s.value] }}
                      title={s.note}
                    >
                      {THEORY_STATUS_LABEL[s.value]}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </motion.section>
  );
}

function TheoryEvidenceColumn({
  heading,
  accent,
  items,
  emptyNote,
}: {
  heading: string;
  accent: string;
  items: Evidence[];
  emptyNote: string;
}) {
  return (
    <div className="border border-line/60 p-3">
      <div
        className="intel-label mb-2 border-b border-line/60 pb-1.5"
        style={{ color: accent }}
      >
        {heading} · {items.length}
      </div>
      {items.length === 0 ? (
        <p className="font-mono text-[11px] tracking-wide text-faint">
          {emptyNote}
        </p>
      ) : (
        <ul className="space-y-2">
          {items.map((e) => (
            <li key={`${e.chapter}-${e.note}`} className="text-xs text-muted">
              <span className="mr-2 inline-flex items-center gap-2">
                <ChapterRef ch={e.chapter} />
                <ConfidenceBadge level={e.confidence} />
              </span>
              {e.note}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
