"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useMemo } from "react";
import {
  ArchiveNote,
  ChapterRef,
  ConfidenceBadge,
  DataRow,
  EntityLink,
  Monogram,
  Panel,
  SectionHeading,
  StatusChip,
} from "@/components/ui/kit";
import { KIND_LABEL } from "@/components/viz/RelationshipGraph";
import {
  charactersByFaction,
  factionById,
  locationById,
  relationshipsFor,
} from "@/lib/db";
import {
  latestStamp,
  relationshipEnded,
  relationshipVisible,
  statusAt,
} from "@/lib/spoiler";
import { useEffectiveChapter } from "@/lib/store";
import type { FactionKind } from "@/lib/types";

const KIND_STAMP: Record<FactionKind, string> = {
  royal: "Royal house",
  "prince-camp": "Prince camp",
  military: "Military",
  mafia: "Mafia",
  hunter: "Hunter",
  troupe: "Troupe",
  bureau: "Bureau",
  other: "Other",
};

export function FactionFile({ id }: { id: string }) {
  const faction = factionById.get(id);
  const ch = useEffectiveChapter();

  const derived = useMemo(() => {
    if (!faction) return null;
    const members = (charactersByFaction.get(faction.id) ?? [])
      .filter((c) => c.introducedCh <= ch)
      .map((c) => ({ c, st: statusAt(c, ch) }))
      .sort((a, b) => a.c.name.localeCompare(b.c.name));
    const objectives = faction.objectives.filter((o) => o.revealCh <= ch);
    const operations = (faction.operations ?? [])
      .filter((o) => o.ch <= ch)
      .sort((a, b) => a.ch - b.ch);
    const conflicts = (faction.internalConflicts ?? []).filter(
      (x) => x.revealCh <= ch,
    );
    // All stamps the reader may see, oldest first; the latestStamp value is
    // the currently standing assessment and gets highlighted.
    const stamps = (faction.statusByChapter ?? [])
      .filter((s) => (s.revealCh ?? s.ch) <= ch)
      .sort((a, b) => a.ch - b.ch);
    const current = latestStamp(faction.statusByChapter, ch);
    const rels = relationshipsFor(faction.id).filter((r) =>
      relationshipVisible(r, ch),
    );
    return {
      members,
      objectives,
      operations,
      conflicts,
      stamps,
      current,
      rels,
    };
  }, [faction, ch]);

  if (!faction) notFound();
  if (faction.introducedCh > ch || !derived) {
    return (
      <div className="mx-auto max-w-xl py-20 text-center">
        <div className="stamp mx-auto inline-block text-warn">
          Sealed record
        </div>
        <p className="mt-4 text-sm text-muted">
          This organization has not entered the record at chapter {ch}. Raise
          your clearance to open the file.
        </p>
      </div>
    );
  }

  const d = derived;
  const initials = faction.name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const controlled = (faction.controlledLocationIds ?? []).filter(
    (locId) => (locationById.get(locId)?.introducedCh ?? 0) <= ch,
  );

  return (
    <div>
      {/* File header */}
      <div className="dossier dossier-gold corner-ticks mb-4 p-5">
        <div className="flex flex-wrap items-start gap-4">
          <div
            className="royal-heading flex h-20 w-20 shrink-0 items-center justify-center border text-2xl"
            style={{
              borderColor: faction.color,
              color: faction.color,
              background: `color-mix(in srgb, ${faction.color} 10%, var(--panel))`,
            }}
            aria-hidden
          >
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="intel-label-gold">
              Organization file · Registry of powers
            </div>
            <h1 className="royal-heading text-3xl">{faction.name}</h1>
            <p className="mt-1 max-w-2xl text-sm text-parchment">
              {faction.summary}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
              {faction.leaderCharacterId && (
                <span>
                  Leader: <EntityLink id={faction.leaderCharacterId} />
                </span>
              )}
              {faction.parentFactionId && (
                <span>
                  Reports to: <EntityLink id={faction.parentFactionId} />
                </span>
              )}
              <span>
                On record since <ChapterRef ch={faction.introducedCh} />
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span
              className="stamp inline-block text-[10px]"
              style={{ color: faction.color }}
            >
              {KIND_STAMP[faction.kind]}
            </span>
            {d.current && (
              <span className="max-w-48 text-right font-mono text-[10px] tracking-wider text-muted">
                {d.current.value}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {/* Roster */}
          <Panel
            label="Personnel"
            title="Roster"
            actions={
              <span className="font-mono text-[10px] tracking-widest text-faint">
                {d.members.length} on file
              </span>
            }
          >
            {d.members.length === 0 ? (
              <ArchiveNote>No members on record at this clearance.</ArchiveNote>
            ) : (
              <div>
                {d.members.map(({ c, st }, i) => {
                  const dead =
                    st?.status === "dead" || st?.status === "presumed-dead";
                  return (
                    <motion.div
                      key={c.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.2,
                        delay: Math.min(i, 10) * 0.03,
                      }}
                      className="flex items-center gap-2.5 border-b border-line/60 py-1.5 last:border-0"
                    >
                      <Monogram characterId={c.id} size="sm" />
                      <div className="min-w-0 flex-1">
                        <EntityLink
                          id={c.id}
                          className={dead ? "line-through opacity-60" : ""}
                        />
                        <div className="truncate text-xs text-muted">
                          {c.role}
                        </div>
                      </div>
                      {st && <StatusChip status={st.status} note={st.note} />}
                    </motion.div>
                  );
                })}
              </div>
            )}
          </Panel>

          {/* Objectives */}
          <Panel label="Operational analysis" title="Objectives">
            {d.objectives.length === 0 ? (
              <ArchiveNote>No stated objectives at this clearance.</ArchiveNote>
            ) : (
              <ul className="space-y-2">
                {d.objectives.map((o) => (
                  <li key={o.text} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1 w-1 shrink-0 bg-gold-dim" />
                    <span className="text-sm text-parchment">
                      {o.text} <ChapterRef ch={o.revealCh} />
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Panel>

          {/* Operations log */}
          <Panel label="Voyage recorder" title="Operations log">
            {d.operations.length === 0 ? (
              <ArchiveNote>No logged operations at this clearance.</ArchiveNote>
            ) : (
              <ol className="relative ml-3 space-y-3 border-l border-line pl-5">
                {d.operations.map((o) => (
                  <li key={`${o.ch}-${o.text}`} className="relative">
                    <span className="absolute -left-[26px] top-1.5 h-2 w-2 rounded-full border border-gold-dim bg-panel" />
                    <div className="flex flex-wrap items-baseline gap-2">
                      <ChapterRef ch={o.ch} />
                      <span className="text-sm text-parchment">{o.text}</span>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </Panel>

          {/* Internal conflicts */}
          {d.conflicts.length > 0 && (
            <Panel label="Counter-intelligence" title="Internal conflicts">
              <ul className="space-y-2">
                {d.conflicts.map((x) => (
                  <li
                    key={x.text}
                    className="border-l-2 pl-3"
                    style={{ borderColor: "var(--blood)" }}
                  >
                    <span className="text-sm text-parchment">{x.text}</span>{" "}
                    <ChapterRef ch={x.revealCh} />
                  </li>
                ))}
              </ul>
            </Panel>
          )}
        </div>

        <div className="space-y-4">
          {/* Territory & resources */}
          <Panel label="Holdings" title="Territory & resources">
            <DataRow label="Territory">
              {faction.territoryNote ?? (
                <span className="text-faint">Not on record</span>
              )}
            </DataRow>
            <DataRow label="Controlled areas">
              {controlled.length === 0 ? (
                <span className="text-faint">—</span>
              ) : (
                <ul className="space-y-0.5">
                  {controlled.map((locId) => (
                    <li key={locId}>
                      <Link
                        href={`/map?location=${locId}`}
                        className="text-teal hover:text-gold-bright"
                      >
                        {locationById.get(locId)?.name ?? locId}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </DataRow>
            <DataRow label="Resources">
              {(faction.resources ?? []).length === 0 ? (
                <span className="text-faint">—</span>
              ) : (
                <ul className="list-inside list-disc space-y-0.5">
                  {(faction.resources ?? []).map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              )}
            </DataRow>
          </Panel>

          {/* Status by chapter */}
          <Panel label="Assessment history" title="Status by chapter">
            {d.stamps.length === 0 ? (
              <ArchiveNote>
                No standing assessments at this clearance.
              </ArchiveNote>
            ) : (
              <ol className="relative ml-3 space-y-3 border-l border-line pl-4">
                {d.stamps.map((s) => {
                  const isCurrent =
                    d.current?.ch === s.ch && d.current?.value === s.value;
                  return (
                    <li key={`${s.ch}-${s.value}`} className="relative">
                      <span
                        className={`absolute -left-[21px] top-1.5 h-2 w-2 rounded-full border ${
                          isCurrent
                            ? "border-gold bg-gold/40"
                            : "border-line-strong bg-panel"
                        }`}
                      />
                      <div className="flex flex-wrap items-baseline gap-2">
                        <ChapterRef ch={s.ch} />
                        {isCurrent && (
                          <span className="font-mono text-[9px] uppercase tracking-widest text-gold">
                            standing
                          </span>
                        )}
                      </div>
                      <p
                        className={`text-sm ${
                          isCurrent ? "text-ivory" : "text-muted"
                        }`}
                      >
                        {s.value}
                      </p>
                      {s.note && <p className="text-xs text-faint">{s.note}</p>}
                    </li>
                  );
                })}
              </ol>
            )}
          </Panel>
        </div>
      </div>

      {/* Relations */}
      <div className="mt-4">
        <Panel label="Cross-reference" title="Relations">
          {d.rels.length === 0 ? (
            <ArchiveNote>No mapped relations at this clearance.</ArchiveNote>
          ) : (
            <div className="grid gap-2 lg:grid-cols-2">
              {d.rels.map((r) => {
                const other = r.from === faction.id ? r.to : r.from;
                const outgoing = r.from === faction.id;
                const ended = relationshipEnded(r, ch);
                return (
                  <div
                    key={r.id}
                    className={`dossier p-3 ${ended ? "opacity-50" : ""}`}
                  >
                    <div className="flex flex-wrap items-baseline gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                        {outgoing
                          ? KIND_LABEL[r.kind]
                          : `⟵ ${KIND_LABEL[r.kind]}`}
                      </span>
                      <EntityLink id={other} className="text-base" />
                      {r.secret && (
                        <span className="font-mono text-[9px] uppercase tracking-widest text-violet">
                          secret
                        </span>
                      )}
                      {!r.confirmed && (
                        <span className="font-mono text-[9px] uppercase tracking-widest text-warn">
                          suspected
                        </span>
                      )}
                      {ended && (
                        <span className="font-mono text-[9px] uppercase tracking-widest text-blood">
                          ended ch.{r.endCh}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-parchment">
                      {r.description}
                    </p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-2">
                      <ChapterRef ch={r.revealCh} />
                      {r.evidence[0] && (
                        <ConfidenceBadge level={r.evidence[0].confidence} />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Panel>
      </div>

      {faction.incomplete && (
        <div className="mt-4">
          <SectionHeading>Archive note</SectionHeading>
          <ArchiveNote>
            Partial file — the source material has not yet supplied the missing
            sections.
          </ArchiveNote>
        </div>
      )}
    </div>
  );
}
