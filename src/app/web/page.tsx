"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import {
  ArchiveNote,
  ChapterRef,
  ConfidenceBadge,
  EntityLink,
  Monogram,
  StatusChip,
} from "@/components/ui/kit";
import {
  type GraphSelection,
  KIND_LABEL,
  RelationshipGraph,
} from "@/components/viz/RelationshipGraph";
import { characterById, relationships } from "@/lib/db";
import { graphPresets, presetById } from "@/lib/presets";
import { statusAt } from "@/lib/spoiler";
import { useEffectiveChapter } from "@/lib/store";
import { ARC_START } from "@/lib/types";

export default function WebPage() {
  return (
    <Suspense>
      <WebPageInner />
    </Suspense>
  );
}

function WebPageInner() {
  const ch = useEffectiveChapter();
  const params = useSearchParams();
  const focusParam = params.get("focus") ?? undefined;
  const presetParam = params.get("preset") ?? undefined;

  const [presetId, setPresetId] = useState(presetParam ?? "all");
  const [viewCh, setViewCh] = useState<number | null>(null);
  const [selection, setSelection] = useState<GraphSelection | null>(
    focusParam ? { kind: "node", id: focusParam } : null,
  );

  useEffect(() => {
    if (presetParam && presetById.has(presetParam)) setPresetId(presetParam);
  }, [presetParam]);

  // Displayed chapter can rewind below clearance but never above it.
  const displayCh = Math.min(viewCh ?? ch, ch);

  const nodeIds = useMemo(() => {
    const preset = presetById.get(presetId) ?? presetById.get("all");
    const ids = preset?.nodeIds() ?? new Set<string>();
    if (focusParam) ids.add(focusParam);
    return ids;
  }, [presetId, focusParam]);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="intel-label-gold">Investigation board</div>
          <h1 className="royal-heading text-3xl">Relationship Web</h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={presetId}
            onChange={(e) => {
              setPresetId(e.target.value);
              setSelection(null);
            }}
            className="border border-line bg-panel px-2 py-1.5 text-sm text-parchment outline-none"
            aria-label="Graph preset"
          >
            {graphPresets.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
          <div className="flex items-center gap-2">
            <span className="intel-label">Evolve</span>
            <input
              type="range"
              min={ARC_START}
              max={ch}
              value={displayCh}
              onChange={(e) => setViewCh(Number(e.target.value))}
              className="w-36 accent-[var(--gold)]"
              aria-label="Network as of chapter"
              disabled={ch <= ARC_START}
            />
            <span className="w-9 font-mono text-xs text-gold-bright">
              {displayCh > ARC_START ? displayCh : "pre"}
            </span>
          </div>
        </div>
      </div>

      <p className="mb-3 max-w-3xl text-xs text-muted">
        {presetById.get(presetId)?.description} — Solid edges are public and
        confirmed, dashed are secret, dotted are suspected. Drag to pan, scroll
        to zoom, click nodes or edges for the intelligence file. The slider
        replays how the network grew, up to your clearance.
      </p>

      <div className="relative">
        <div className="dossier corner-ticks h-[72vh] min-h-[480px] bg-bg-deep/60">
          <RelationshipGraph
            nodeIds={nodeIds}
            chapter={displayCh}
            focusId={focusParam}
            selection={selection}
            onSelect={setSelection}
          />
        </div>

        <AnimatePresence>
          {selection && (
            <motion.aside
              key={`${selection.kind}-${selection.id}`}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.18 }}
              className="dossier dossier-gold corner-ticks absolute right-3 top-3 max-h-[calc(100%-24px)] w-80 overflow-y-auto p-4"
            >
              {selection.kind === "node" ? (
                <NodePanel
                  id={selection.id}
                  ch={displayCh}
                  onClose={() => setSelection(null)}
                />
              ) : (
                <EdgePanel
                  id={selection.id}
                  ch={displayCh}
                  onClose={() => setSelection(null)}
                />
              )}
            </motion.aside>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
        {[
          ["Kinship", "var(--gold)"],
          ["Service", "#5d6b8c"],
          ["Alliance / knowledge", "#4a7a78"],
          ["Protection / trust", "#6f8f6a"],
          ["Hostile", "var(--blood)"],
          ["Suspicion", "#8c5d5d"],
          ["Surveillance", "var(--warn)"],
          ["Covert control", "var(--violet)"],
        ].map(([label, color]) => (
          <span
            key={label}
            className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted"
          >
            <span
              className="inline-block h-px w-5"
              style={{ background: color }}
            />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

function NodePanel({
  id,
  ch,
  onClose,
}: {
  id: string;
  ch: number;
  onClose: () => void;
}) {
  const c = characterById.get(id);
  if (!c) return <ArchiveNote>Unknown entity.</ArchiveNote>;
  const st = statusAt(c, ch);
  const degree = relationships.filter(
    (r) => (r.from === id || r.to === id) && r.revealCh <= ch,
  ).length;
  return (
    <div>
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <Monogram characterId={id} />
          <div>
            <div className="text-base text-ivory">{c.name}</div>
            <div className="text-xs text-muted">{c.role}</div>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-faint hover:text-parchment"
        >
          ✕
        </button>
      </div>
      <div className="mt-2 flex items-center gap-3">
        {st && <StatusChip status={st.status} />}
        <span className="font-mono text-[10px] tracking-widest text-muted">
          {degree} edges
        </span>
      </div>
      <p className="mt-2 line-clamp-4 text-xs text-muted">{c.bio}</p>
      <Link
        href={`/characters/${id}`}
        className="mt-3 inline-block border border-gold-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-gold hover:text-gold-bright"
      >
        Open dossier →
      </Link>
    </div>
  );
}

function EdgePanel({
  id,
  ch,
  onClose,
}: {
  id: string;
  ch: number;
  onClose: () => void;
}) {
  const r = relationships.find((x) => x.id === id);
  if (!r) return <ArchiveNote>Unknown record.</ArchiveNote>;
  const ended = r.endCh !== undefined && r.endCh <= ch;
  return (
    <div>
      <div className="flex items-start justify-between gap-2">
        <div className="intel-label-gold">Intelligence file</div>
        <button
          type="button"
          onClick={onClose}
          className="text-faint hover:text-parchment"
        >
          ✕
        </button>
      </div>
      <div className="mt-1 text-base text-ivory">
        <EntityLink id={r.from} />{" "}
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
          {KIND_LABEL[r.kind]}
        </span>{" "}
        <EntityLink id={r.to} />
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {r.secret && (
          <span className="border border-violet/40 px-1.5 font-mono text-[9px] uppercase tracking-widest text-violet">
            secret
          </span>
        )}
        {!r.confirmed && (
          <span className="border border-warn/40 px-1.5 font-mono text-[9px] uppercase tracking-widest text-warn">
            suspected
          </span>
        )}
        <span className="border border-line px-1.5 font-mono text-[9px] uppercase tracking-widest text-muted">
          {r.strength}
        </span>
        {!r.mutualAwareness && (
          <span className="border border-line px-1.5 font-mono text-[9px] uppercase tracking-widest text-faint">
            target unaware
          </span>
        )}
        {ended && (
          <span className="border border-blood/40 px-1.5 font-mono text-[9px] uppercase tracking-widest text-blood">
            ended ch.{r.endCh}
          </span>
        )}
      </div>
      <p className="mt-2 text-sm text-parchment">{r.description}</p>
      {r.history && r.history.length > 0 && (
        <div className="mt-3">
          <div className="intel-label mb-1">How it changed</div>
          <ol className="space-y-1.5">
            {r.history
              .filter((h) => h.ch <= ch)
              .map((h) => (
                <li key={h.ch} className="flex gap-2 text-xs text-muted">
                  <ChapterRef ch={h.ch} />
                  <span>{h.text}</span>
                </li>
              ))}
          </ol>
        </div>
      )}
      <div className="mt-3">
        <div className="intel-label mb-1">Evidence</div>
        <ul className="space-y-1.5">
          {r.evidence.map((e) => (
            <li key={`${e.chapter}-${e.note}`} className="text-xs text-muted">
              <span className="mr-2 inline-flex items-center gap-2">
                <ChapterRef ch={e.chapter} />
                <ConfidenceBadge level={e.confidence} />
              </span>
              {e.note}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-3 border-t border-line pt-2 text-xs text-muted">
        Known since <ChapterRef ch={r.revealCh} />
        {r.startCh !== r.revealCh && (
          <span>
            {" "}
            · existed since <ChapterRef ch={r.startCh} />
          </span>
        )}
        {!r.mutualAwareness && (
          <span>
            {" "}
            · the other party does not know this relationship exists.
          </span>
        )}
      </div>
    </div>
  );
}
