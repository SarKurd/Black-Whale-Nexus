"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { EventEntry, RecorderList } from "@/components/story/EventRecorder";
import {
  ArchiveNote,
  ChapterRef,
  EntityLink,
  EntityList,
  Monogram,
  OrderToggle,
  Panel,
  type SortDirection,
} from "@/components/ui/kit";
import { characterById, eventsByStoryline, storylineById } from "@/lib/db";
import {
  currentIntelText,
  currentIntelVisible,
  latestStamp,
} from "@/lib/spoiler";
import { useEffectiveChapter } from "@/lib/store";
import type { StorylineNodeKind } from "@/lib/types";
import { useUrlString } from "@/lib/urlState";

const STATUS_COLOR: Record<string, string> = {
  active: "var(--teal)",
  escalating: "var(--blood-bright)",
  paused: "var(--warn)",
  resolved: "var(--alive)",
};

const NODE_META: Record<StorylineNodeKind, { label: string; color: string }> = {
  begin: { label: "BEGIN", color: "var(--alive)" },
  advance: { label: "ADVANCE", color: "var(--muted)" },
  split: { label: "SPLIT", color: "var(--warn)" },
  merge: { label: "MERGE", color: "var(--teal)" },
  intersect: { label: "INTERSECT", color: "var(--teal)" },
  pause: { label: "PAUSE", color: "var(--faint)" },
  restart: { label: "RESTART", color: "var(--parchment)" },
  climax: { label: "CLIMAX", color: "var(--gold-bright)" },
  trigger: { label: "TRIGGER", color: "var(--violet)" },
  end: { label: "END", color: "var(--gold)" },
};

export function StorylineFile({ id }: { id: string }) {
  const ch = useEffectiveChapter();
  const s = storylineById.get(id);
  const [chronologyValue, setChronologyValue] = useUrlString(
    "order",
    "desc",
    (value) => value === "asc" || value === "desc",
  );
  const chronology = chronologyValue as SortDirection;
  const setChronology = (value: SortDirection) => setChronologyValue(value);

  if (!s) notFound();

  if (s.introducedCh > ch) {
    return (
      <div className="mx-auto max-w-xl py-20 text-center">
        <div className="stamp mx-auto inline-block text-warn">
          Sealed thread
        </div>
        <p className="mt-4 text-sm text-muted">
          This thread has not entered the record at chapter {ch}. Raise your
          clearance to open the file.
        </p>
        <Link
          href="/storylines"
          className="mt-4 inline-block font-mono text-[10px] uppercase tracking-widest text-teal hover:text-gold-bright"
        >
          ← Back to the mission map
        </Link>
      </div>
    );
  }

  const status = latestStamp(s.status, ch)?.value ?? "active";
  const statusNote = latestStamp(s.status, ch)?.note;
  const nodes = [...s.nodes]
    .filter((n) => n.ch <= ch)
    .sort((a, b) => (chronology === "desc" ? b.ch - a.ch : a.ch - b.ch));
  const hiddenNodeCount = s.nodes.length - nodes.length;
  const chronologicalEvents = [...(eventsByStoryline.get(s.id) ?? [])]
    .filter((e) => e.chapter <= ch)
    .sort((a, b) => a.chapter - b.chapter);
  const threadEvents =
    chronology === "desc" ? chronologicalEvents.reverse() : chronologicalEvents;
  const participants = s.participantIds.filter(
    (pid) => (characterById.get(pid)?.introducedCh ?? 0) <= ch,
  );
  const related = [
    ...(s.dependsOnIds ?? []).map((rid) => ({ rid, rel: "depends on" })),
    ...(s.relatedIds ?? []).map((rid) => ({ rid, rel: "related" })),
  ].filter(({ rid }) => (storylineById.get(rid)?.introducedCh ?? 0) <= ch);
  const currentSummary = currentIntelText(s.summary, ch);
  const showCurrentAnalysis = currentIntelVisible(ch);

  return (
    <div className="space-y-4">
      {/* Thread header */}
      <div
        className="dossier dossier-gold corner-ticks p-5"
        style={{ borderLeft: `3px solid ${s.color}` }}
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="intel-label-gold">Thread file · Storyline</div>
            <h1 className="royal-heading mt-1 flex items-center gap-3 text-3xl">
              <span
                className="inline-block h-3 w-3 shrink-0 rounded-full"
                style={{ background: s.color }}
                aria-hidden
              />
              {s.name}
            </h1>
          </div>
          <div className="text-right">
            <span
              className="stamp inline-block text-xs"
              style={{ color: STATUS_COLOR[status] ?? "var(--muted)" }}
              title={statusNote}
            >
              {status}
            </span>
            <div className="mt-1.5 font-mono text-[10px] tracking-widest text-muted">
              opened <ChapterRef ch={s.introducedCh} />
            </div>
          </div>
        </div>
        <p className="mt-3 max-w-3xl border-t border-line pt-3 text-sm leading-relaxed text-parchment">
          {currentSummary ??
            "Current-state overview sealed; the cleared thread trace remains available below."}
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {/* Node timeline */}
          <Panel
            label="Thread trace"
            title="How the thread has run"
            actions={
              <OrderToggle direction={chronology} onChange={setChronology} />
            }
          >
            {nodes.length === 0 ? (
              <ArchiveNote>No plotted nodes at this clearance yet.</ArchiveNote>
            ) : (
              <ol className="relative ml-3 space-y-4 border-l border-line pl-5">
                {nodes.map((n) => {
                  const meta = NODE_META[n.kind];
                  return (
                    <li
                      key={`${n.ch}-${n.kind}-${n.title}`}
                      className="relative"
                    >
                      <span
                        className="absolute -left-[26px] top-1.5 h-2.5 w-2.5 rounded-full border"
                        style={{
                          borderColor: meta.color,
                          background:
                            n.kind === "climax" || n.kind === "end"
                              ? meta.color
                              : "var(--panel)",
                        }}
                        aria-hidden
                      />
                      <div className="flex flex-wrap items-baseline gap-2">
                        <span
                          className="font-mono text-[9px] uppercase tracking-[0.15em]"
                          style={{ color: meta.color }}
                        >
                          {meta.label}
                        </span>
                        <ChapterRef ch={n.ch} />
                        <span className="text-sm text-ivory">{n.title}</span>
                      </div>
                      {n.linkId && (
                        <div className="mt-0.5 text-xs text-muted">
                          <span className="mr-1 text-faint" aria-hidden>
                            ⇄
                          </span>
                          crosses thread <EntityLink id={n.linkId} />
                        </div>
                      )}
                      {n.eventIds && n.eventIds.length > 0 && (
                        <div className="mt-0.5 flex flex-wrap gap-x-3 text-xs">
                          {n.eventIds.map((eid) => (
                            <Link
                              key={eid}
                              href={`/timeline?event=${eid}`}
                              className="font-mono text-[9px] uppercase tracking-widest text-teal hover:text-gold-bright"
                            >
                              recorder entry →
                            </Link>
                          ))}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ol>
            )}
            {hiddenNodeCount > 0 && (
              <div className="mt-3">
                <ArchiveNote>
                  {hiddenNodeCount} further node
                  {hiddenNodeCount === 1 ? "" : "s"} sealed beyond chapter {ch}.
                </ArchiveNote>
              </div>
            )}
          </Panel>

          {/* Recorder entries */}
          <Panel
            label="Voyage recorder"
            title="Incidents on this thread"
            actions={
              <OrderToggle direction={chronology} onChange={setChronology} />
            }
          >
            {threadEvents.length === 0 ? (
              <ArchiveNote>
                No incidents indexed for this thread at this clearance.
              </ArchiveNote>
            ) : (
              <RecorderList>
                {threadEvents.map((e) => (
                  <EventEntry key={e.id} event={e} />
                ))}
              </RecorderList>
            )}
          </Panel>
        </div>

        <div className="space-y-4">
          {/* Objectives */}
          <Panel label="Operational aims" title="Objectives">
            {!showCurrentAnalysis || s.objectives.length === 0 ? (
              <ArchiveNote>No stated objectives.</ArchiveNote>
            ) : (
              <ul className="space-y-1.5">
                {s.objectives.map((o) => (
                  <li key={o} className="flex items-start gap-2 text-sm">
                    <span className="mt-px text-gold-dim" aria-hidden>
                      ▸
                    </span>
                    <span className="text-parchment">{o}</span>
                  </li>
                ))}
              </ul>
            )}
          </Panel>

          {/* Open questions */}
          <Panel label="Analyst queries" title="Open questions" gold>
            {!showCurrentAnalysis || s.openQuestions.length === 0 ? (
              <ArchiveNote>No outstanding queries.</ArchiveNote>
            ) : (
              <ul className="space-y-2">
                {s.openQuestions.map((q) => (
                  <li
                    key={q}
                    className="border-l-2 border-gold-line pl-2.5 font-mono text-[11px] leading-relaxed tracking-wide text-parchment"
                  >
                    <span className="mr-1.5 text-gold" aria-hidden>
                      {"Q //"}
                    </span>
                    {q}
                  </li>
                ))}
              </ul>
            )}
          </Panel>

          {/* Participants */}
          <Panel label="Cast" title="Participants">
            {participants.length === 0 ? (
              <ArchiveNote>No participants on record yet.</ArchiveNote>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {participants.map((pid) => {
                  const c = characterById.get(pid);
                  return (
                    <Link
                      key={pid}
                      href={`/characters/${pid}`}
                      className="group flex items-center gap-2 border border-line/70 bg-raised/50 px-2 py-1.5 transition-colors hover:border-gold-line"
                    >
                      <Monogram characterId={pid} size="sm" />
                      <span className="truncate text-xs text-parchment group-hover:text-gold-bright">
                        {c?.name ?? pid}
                      </span>
                    </Link>
                  );
                })}
              </div>
            )}
          </Panel>

          {/* Factions */}
          {s.factionIds.length > 0 && (
            <Panel label="Blocs" title="Factions involved">
              <EntityList ids={s.factionIds} />
            </Panel>
          )}

          {/* Dependencies / related */}
          {related.length > 0 && (
            <Panel label="Cross-references" title="Connected threads">
              <ul className="space-y-1.5">
                {related.map(({ rid, rel }) => (
                  <li
                    key={`${rel}-${rid}`}
                    className="flex items-baseline gap-2 text-sm"
                  >
                    <span className="font-mono text-[9px] uppercase tracking-widest text-faint">
                      {rel}
                    </span>
                    <EntityLink id={rid} />
                  </li>
                ))}
              </ul>
            </Panel>
          )}
        </div>
      </div>
    </div>
  );
}
