"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  ArchiveNote,
  ChapterRef,
  ConfidenceBadge,
  EntityList,
} from "@/components/ui/kit";
import { mysteries } from "@/lib/db";
import { mysteryStatusAt } from "@/lib/spoiler";
import { useEffectiveChapter } from "@/lib/store";
import type { Evidence, Mystery, MysteryStatus } from "@/lib/types";

const STATUS_ORDER: MysteryStatus[] = [
  "open",
  "partially-answered",
  "likely-answered",
  "resolved",
  "disproven",
  "dormant",
];

const MYSTERY_STATUS_LABEL: Record<MysteryStatus, string> = {
  open: "Open",
  "partially-answered": "Partially answered",
  "likely-answered": "Likely answered",
  resolved: "Resolved",
  disproven: "Disproven",
  dormant: "Dormant",
};

const MYSTERY_STATUS_COLOR: Record<MysteryStatus, string> = {
  open: "var(--warn)",
  "partially-answered": "var(--teal)",
  "likely-answered": "var(--teal)",
  resolved: "var(--gold)",
  disproven: "var(--faint)",
  dormant: "var(--muted)",
};

interface CaseEntry {
  mystery: Mystery;
  status: MysteryStatus;
}

export default function MysteriesPage() {
  const clearanceChapter = useEffectiveChapter();
  const [statusFilter, setStatusFilter] = useState<MysteryStatus | null>(null);

  // Only cases that have entered the record at this clearance, with their
  // status reconstructed as of the clearance chapter.
  const visibleCases = useMemo<CaseEntry[]>(
    () =>
      mysteries
        .filter((m: Mystery) => m.introducedCh <= clearanceChapter)
        .map((m: Mystery) => ({
          mystery: m,
          status: mysteryStatusAt(m, clearanceChapter),
        })),
    [clearanceChapter],
  );

  const countsByStatus = useMemo(() => {
    const counts = new Map<MysteryStatus, number>();
    for (const v of visibleCases)
      counts.set(v.status, (counts.get(v.status) ?? 0) + 1);
    return counts;
  }, [visibleCases]);

  const shownCases = statusFilter
    ? visibleCases.filter((v) => v.status === statusFilter)
    : visibleCases;

  return (
    <div>
      <div className="mb-4">
        <div className="intel-label-gold">Analyst case board</div>
        <h1 className="royal-heading text-3xl">Open Mysteries</h1>
        <p className="mt-1 max-w-3xl text-xs text-muted">
          Every unanswered question in the record, with the evidence on both
          sides. Case status is reconstructed as of chapter {clearanceChapter}—
          canonical answers stay sealed until your clearance reaches them.
        </p>
      </div>

      {/* Status filter chips */}
      <div className="mb-5 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setStatusFilter(null)}
          className={`border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest transition-colors ${
            statusFilter === null
              ? "border-gold-line text-gold-bright"
              : "border-line text-muted hover:text-parchment"
          }`}
        >
          All cases · {visibleCases.length}
        </button>
        {STATUS_ORDER.map((status) => {
          const count = countsByStatus.get(status) ?? 0;
          const active = statusFilter === status;
          return (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(active ? null : status)}
              disabled={count === 0}
              className={`border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                active ? "border-current" : "border-line hover:border-current"
              }`}
              style={{ color: MYSTERY_STATUS_COLOR[status] }}
            >
              {MYSTERY_STATUS_LABEL[status]} · {count}
            </button>
          );
        })}
      </div>

      {shownCases.length === 0 ? (
        <ArchiveNote>
          No case files match this filter at chapter {clearanceChapter}. Raise
          your clearance or clear the filter.
        </ArchiveNote>
      ) : (
        <div className="space-y-5">
          {shownCases.map((v, i) => (
            <CaseFile
              key={v.mystery.id}
              mystery={v.mystery}
              status={v.status}
              clearanceChapter={clearanceChapter}
              index={i}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function CaseFile({
  mystery,
  status,
  clearanceChapter,
  index,
}: {
  mystery: Mystery;
  status: MysteryStatus;
  clearanceChapter: number;
  index: number;
}) {
  const evidenceFor = mystery.evidenceFor.filter(
    (e) => e.chapter <= clearanceChapter,
  );
  const evidenceAgainst = (mystery.evidenceAgainst ?? []).filter(
    (e) => e.chapter <= clearanceChapter,
  );
  const statusTrail = mystery.statusHistory
    .filter((s) => (s.revealCh ?? s.ch) <= clearanceChapter)
    .sort((a, b) => a.ch - b.ch);
  const development =
    mystery.latestDevelopment &&
    mystery.latestDevelopment.ch <= clearanceChapter
      ? mystery.latestDevelopment
      : undefined;
  const resolutionVisible =
    mystery.resolution !== undefined &&
    mystery.resolution.ch <= clearanceChapter;
  const resolutionSealed =
    mystery.resolution !== undefined &&
    mystery.resolution.ch > clearanceChapter;

  return (
    <motion.section
      id={mystery.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: Math.min(index, 6) * 0.04 }}
      className="dossier corner-ticks scroll-mt-24"
    >
      {/* Case header */}
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-line px-4 py-3">
        <div className="min-w-0">
          <div className="intel-label-gold">
            Case file · {mystery.id.toUpperCase()}
          </div>
          <h2 className="royal-heading text-xl">{mystery.question}</h2>
        </div>
        <span
          className="stamp shrink-0 text-[11px]"
          style={{ color: MYSTERY_STATUS_COLOR[status] }}
        >
          {MYSTERY_STATUS_LABEL[status]}
        </span>
      </header>

      <div className="space-y-4 p-4">
        <p className="max-w-3xl text-sm leading-relaxed text-parchment">
          {mystery.summary}
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted">
          <span className="flex items-center gap-1.5">
            <span className="intel-label">Introduced</span>
            <ChapterRef ch={mystery.introducedCh} />
          </span>
          {(mystery.relatedCharacterIds ?? []).length > 0 && (
            <span className="flex flex-wrap items-center gap-1.5">
              <span className="intel-label">Persons of interest</span>
              <EntityList ids={mystery.relatedCharacterIds ?? []} />
            </span>
          )}
        </div>

        {/* Evidence columns */}
        <div className="grid gap-4 md:grid-cols-2">
          <EvidenceColumn
            heading="Evidence for"
            accent="var(--teal)"
            items={evidenceFor}
            emptyNote="Nothing on record supports this yet."
          />
          <EvidenceColumn
            heading="Evidence against"
            accent="var(--blood)"
            items={evidenceAgainst}
            emptyNote="No counter-evidence on record."
          />
        </div>

        {/* Possible explanations */}
        {mystery.possibleExplanations.length > 0 && (
          <div>
            <div className="intel-label mb-2">Possible explanations</div>
            <div className="space-y-2">
              {mystery.possibleExplanations.map((ex) => {
                const speculative =
                  ex.confidence === "theory" || ex.confidence === "unknown";
                return (
                  <div
                    key={ex.text}
                    className={`flex items-start gap-2.5 border-l-2 pl-3 ${
                      speculative ? "border-violet" : "border-line-strong"
                    }`}
                  >
                    <span className="mt-0.5 shrink-0">
                      <ConfidenceBadge level={ex.confidence} />
                    </span>
                    <span
                      className={`text-sm ${
                        speculative ? "italic text-muted" : "text-parchment"
                      }`}
                    >
                      {ex.text}
                      {speculative && (
                        <span className="ml-2 font-mono text-[9px] uppercase tracking-widest text-violet">
                          non-canonical
                        </span>
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Latest development */}
        {development && (
          <div className="border border-line bg-raised px-3 py-2">
            <div className="intel-label mb-1">Latest development</div>
            <p className="text-sm text-parchment">
              <ChapterRef ch={development.ch} />{" "}
              <span className="ml-1">{development.text}</span>
            </p>
          </div>
        )}

        {/* Resolution — only when the reveal chapter is within clearance */}
        {resolutionVisible && mystery.resolution && (
          <div className="dossier-gold border bg-raised p-3">
            <div className="mb-1.5 flex flex-wrap items-center gap-2.5">
              <span className="stamp text-[10px] text-gold-bright">
                Case closed
              </span>
              <span className="intel-label-gold">Canonical answer</span>
              <ChapterRef ch={mystery.resolution.ch} />
            </div>
            <p className="text-sm leading-relaxed text-ivory">
              {mystery.resolution.text}
            </p>
          </div>
        )}
        {resolutionSealed && (
          <ArchiveNote>
            A canonical answer exists beyond your clearance. Raise your
            clearance to unseal it.
          </ArchiveNote>
        )}

        {/* Status history mini-trail */}
        {statusTrail.length > 0 && (
          <div className="border-t border-line/60 pt-3">
            <div className="intel-label mb-2">Status trail</div>
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
                      style={{ color: MYSTERY_STATUS_COLOR[s.value] }}
                      title={s.note}
                    >
                      {MYSTERY_STATUS_LABEL[s.value]}
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

function EvidenceColumn({
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
