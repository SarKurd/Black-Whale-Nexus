"use client";

import { useState } from "react";
import {
  ArchiveNote,
  ChapterRef,
  EntityLink,
  OrderToggle,
  type SortDirection,
  StatusChip,
  Tag,
} from "@/components/ui/kit";
import {
  ancestorChain,
  characterById,
  characters,
  deaths,
  events,
  factionById,
  locationById,
} from "@/lib/db";
import { currentIntelText, latestStamp, statusAt } from "@/lib/spoiler";
import type { Character, DeathRecord, StoryEvent } from "@/lib/types";
import {
  CANONICITY_COLOR,
  type Occupancy,
  THREAT_COLOR,
  type ThreatLevel,
} from "./occupancy";

// The @/data modules are authored in parallel; these pins assert the intended
// element types so this file typechecks before the datasets land.
const allCharacters = characters as Character[];
const allEvents = events as StoryEvent[];
const allDeaths = deaths as DeathRecord[];
type PanelTab = "summary" | "people" | "incidents";

function kindLabel(kind: string): string {
  return kind.replace(/-/g, " ");
}

/** Pin the voyage replay to a chapter without closing the compartment file. */
function ReplayAt({
  ch,
  onViewChapter,
}: {
  ch: number;
  onViewChapter: (ch: number) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onViewChapter(ch)}
      title={`Replay the map at chapter ${ch}`}
      className="ml-1.5 border border-line px-1 font-mono text-[9px] uppercase tracking-wider text-gold transition-colors hover:border-gold-line hover:text-gold-bright"
    >
      replay ▸
    </button>
  );
}

export function LocationPanel({
  id,
  ch,
  occupancy,
  onSelect,
  onViewChapter,
  onClose,
}: {
  id: string;
  ch: number;
  occupancy: Occupancy;
  onSelect: (locationId: string) => void;
  onViewChapter: (ch: number) => void;
  onClose: () => void;
}) {
  const loc = locationById.get(id);
  const [chronology, setChronology] = useState<SortDirection>("desc");
  const [activeTab, setActiveTab] = useState<PanelTab>("summary");
  if (!loc) return <ArchiveNote>No such compartment on file.</ArchiveNote>;
  if (loc.introducedCh > ch) {
    return (
      <div>
        <div className="flex items-start justify-between gap-2">
          <span className="stamp inline-block text-[10px] text-warn">
            Sealed compartment
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-faint hover:text-parchment"
          >
            ✕
          </button>
        </div>
        <p className="mt-3 text-sm text-muted">
          This location does not appear in the record at chapter {ch}. Raise
          your clearance to open the file.
        </p>
      </div>
    );
  }

  // Everything below or at this location counts as "here".
  const hereIds = new Set([id]);
  for (const other of locationById.keys()) {
    if (other !== id && ancestorChain(other).includes(id)) hereIds.add(other);
  }

  const current = (occupancy.byLocation.get(id) ?? []).filter(
    (o) => characterById.get(o.characterId) !== undefined,
  );
  const remains = (occupancy.remainsByLocation.get(id) ?? []).filter(
    (o) => characterById.get(o.characterId) !== undefined,
  );
  const currentIds = new Set([
    ...current.map((o) => o.characterId),
    ...remains.map((o) => o.characterId),
  ]);

  // Characters whose reader-visible trail passed directly through here.
  const previous = allCharacters
    .filter((c) => c.introducedCh <= ch && !currentIds.has(c.id))
    .map((c) => {
      const visits = c.locationHistory.filter(
        (entry) =>
          (entry.revealCh ?? entry.ch) <= ch && entry.locationId === id,
      );
      return visits.length > 0
        ? { characterId: c.id, lastCh: visits[visits.length - 1].ch }
        : null;
    })
    .filter((v): v is { characterId: string; lastCh: number } => v !== null)
    .sort((a, b) => b.lastCh - a.lastCh);

  const chronologicalEvents = allEvents
    .filter((e) => e.locationId === id && e.chapter <= ch)
    .sort((a, b) => a.chapter - b.chapter);
  const eventsHere =
    chronology === "desc" ? chronologicalEvents.reverse() : chronologicalEvents;

  const chronologicalDeaths = allDeaths
    .filter((d) => d.locationId === id && (d.revealCh ?? d.chapter) <= ch)
    .sort((a, b) => a.chapter - b.chapter);
  const deathsHere =
    chronology === "desc" ? chronologicalDeaths.reverse() : chronologicalDeaths;
  const orderedPrevious =
    chronology === "desc" ? previous : [...previous].reverse();

  const control = latestStamp(loc.controlHistory, ch);
  const controlFaction = control ? factionById.get(control.value) : undefined;
  const threat = latestStamp(loc.threatHistory, ch);
  const threatLevel = threat?.value as ThreatLevel | undefined;

  const connected = (loc.connectedIds ?? []).filter(
    (cid) =>
      (locationById.get(cid)?.introducedCh ?? Number.POSITIVE_INFINITY) <= ch,
  );

  const relatedChapters = [
    ...new Set([
      loc.introducedCh,
      ...eventsHere.map((e) => e.chapter),
      ...deathsHere.map((d) => d.chapter),
      ...(loc.controlHistory ?? [])
        .filter((s) => (s.revealCh ?? s.ch) <= ch)
        .map((s) => s.ch),
      ...(loc.threatHistory ?? [])
        .filter((s) => (s.revealCh ?? s.ch) <= ch)
        .map((s) => s.ch),
    ]),
  ].sort((a, b) => a - b);

  return (
    <div>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="intel-label-gold">
            Compartment file{loc.tier ? ` · Tier ${loc.tier}` : ""}
          </div>
          <div className="royal-heading text-lg">{loc.name}</div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 text-faint hover:text-parchment"
        >
          ✕
        </button>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        <Tag>{kindLabel(loc.kind)}</Tag>
        <span
          className="inline-block border px-1.5 py-px font-mono text-[9px] uppercase tracking-[0.15em]"
          style={{
            color: CANONICITY_COLOR[loc.canonicity],
            borderColor: "color-mix(in srgb, currentColor 40%, transparent)",
          }}
        >
          {loc.canonicity}
        </span>
        {threatLevel && (
          <span
            className="inline-block border px-1.5 py-px font-mono text-[9px] uppercase tracking-[0.15em]"
            style={{
              color: THREAT_COLOR[threatLevel],
              borderColor: "color-mix(in srgb, currentColor 40%, transparent)",
            }}
            title={threat?.note}
          >
            threat: {threatLevel}
          </span>
        )}
      </div>

      <p className="mt-2 text-xs leading-relaxed text-muted">
        {currentIntelText(loc.description, ch) ?? (
          <span className="text-faint">
            Full compartment survey sealed until voyage records are complete —
            see the stamped record below.
          </span>
        )}
      </p>

      <div
        className="mt-3 grid grid-cols-3 border border-line"
        role="tablist"
        aria-label="Compartment intelligence sections"
      >
        {(
          [
            ["summary", "Summary"],
            ["people", `People ${current.length + remains.length}`],
            ["incidents", `Incidents ${eventsHere.length + deathsHere.length}`],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={activeTab === value}
            onClick={() => setActiveTab(value)}
            className={`px-2 py-1.5 font-mono text-[9px] uppercase tracking-wider transition-colors ${
              activeTab === value
                ? "bg-gold/10 text-gold-bright"
                : "text-muted hover:bg-raised hover:text-parchment"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {activeTab === "summary" && (
        <div className="mt-2 grid grid-cols-3 gap-1.5">
          {[
            ["Present", current.length],
            ["Remains", remains.length],
            ["Incidents", eventsHere.length],
          ].map(([label, value]) => (
            <div key={label} className="border border-line bg-bg-deep/40 p-2">
              <div className="font-mono text-[8px] uppercase tracking-widest text-faint">
                {label}
              </div>
              <div className="royal-heading mt-0.5 text-lg text-ivory">
                {value}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "incidents" && (
        <div className="mt-3 flex items-center justify-between border-t border-line pt-2">
          <span className="intel-label">Chronology</span>
          <OrderToggle direction={chronology} onChange={setChronology} />
        </div>
      )}

      {activeTab === "summary" && controlFaction && (
        <div className="mt-3 border-t border-line pt-2">
          <div className="intel-label mb-1">Controlled by</div>
          <div className="flex items-center gap-2 text-sm">
            <span
              className="inline-block h-2 w-2"
              style={{ background: controlFaction.color }}
            />
            <EntityLink id={controlFaction.id} />
            <ChapterRef ch={control?.ch ?? loc.introducedCh} />
          </div>
          {control?.note && (
            <p className="mt-1 text-xs text-faint">{control.note}</p>
          )}
        </div>
      )}

      {/* A room holding only the dead skips the living-occupants block —
          "no tracked persons" above a list of remains reads absurd. */}
      {activeTab === "people" &&
        (current.length > 0 || remains.length === 0) && (
          <div className="mt-3 border-t border-line pt-2">
            <div className="intel-label mb-1">
              Current occupants ({current.length})
            </div>
            {current.length === 0 ? (
              <ArchiveNote>
                No tracked persons here at this chapter.
              </ArchiveNote>
            ) : (
              <ul className="space-y-1">
                {current.map((o) => {
                  const c = characterById.get(o.characterId);
                  const st = c ? statusAt(c, ch) : undefined;
                  return (
                    <li
                      key={o.characterId}
                      className="flex items-baseline justify-between gap-2 text-sm"
                    >
                      <EntityLink id={o.characterId} />
                      <span className="flex shrink-0 items-center gap-2">
                        {st && <StatusChip status={st.status} note={st.note} />}
                        <ChapterRef ch={o.sinceCh} />
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}

      {activeTab === "people" && remains.length > 0 && (
        <div className="mt-3 border-t border-line pt-2">
          <div className="intel-label mb-1" style={{ color: "var(--blood)" }}>
            Remains interred ({remains.length})
          </div>
          <ul className="space-y-1">
            {remains.map((o) => {
              const c = characterById.get(o.characterId);
              const st = c ? statusAt(c, ch) : undefined;
              return (
                <li
                  key={o.characterId}
                  className="flex items-baseline justify-between gap-2 text-sm"
                >
                  <EntityLink id={o.characterId} className="text-muted" />
                  <span className="flex shrink-0 items-center gap-2">
                    {st && <StatusChip status={st.status} note={st.note} />}
                    <ChapterRef ch={o.sinceCh} />
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {activeTab === "people" && previous.length > 0 && (
        <div className="mt-3 border-t border-line pt-2">
          <div className="intel-label mb-1">Previous occupants</div>
          <ul className="space-y-1">
            {orderedPrevious.map((v) => (
              <li
                key={v.characterId}
                className="flex items-baseline justify-between gap-2 text-sm"
              >
                <EntityLink id={v.characterId} className="text-muted" />
                <span className="shrink-0 font-mono text-[10px] text-faint">
                  last seen <ChapterRef ch={v.lastCh} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === "incidents" && eventsHere.length > 0 && (
        <div className="mt-3 border-t border-line pt-2">
          <div className="intel-label mb-1">Incidents logged here</div>
          <ol className="space-y-1.5">
            {eventsHere.map((e) => (
              <li key={e.id} className="text-xs text-muted">
                <span className="mr-2">
                  <ChapterRef ch={e.chapter} />
                </span>
                <span className="text-parchment">{e.title}</span>
                <ReplayAt ch={e.chapter} onViewChapter={onViewChapter} />
              </li>
            ))}
          </ol>
        </div>
      )}

      {activeTab === "incidents" && deathsHere.length > 0 && (
        <div className="mt-3 border-t border-line pt-2">
          <div className="intel-label mb-1" style={{ color: "var(--blood)" }}>
            Deaths on site
          </div>
          <ul className="space-y-1.5">
            {deathsHere.map((d) => (
              <li
                key={d.id}
                className="border-l-2 border-blood/60 pl-2 text-xs text-muted"
              >
                <EntityLink id={d.victimId} className="text-blood-bright" />{" "}
                <span className="mr-1">— {d.method}</span>
                <ChapterRef ch={d.chapter} />
                <ReplayAt ch={d.chapter} onViewChapter={onViewChapter} />
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === "summary" && connected.length > 0 && (
        <div className="mt-3 border-t border-line pt-2">
          <div className="intel-label mb-1">Connected compartments</div>
          <div className="flex flex-wrap gap-1.5">
            {connected.map((cid) => (
              <button
                key={cid}
                type="button"
                onClick={() => onSelect(cid)}
                className="border border-line px-1.5 py-px font-mono text-[10px] uppercase tracking-wider text-teal hover:border-gold-line hover:text-gold-bright"
              >
                {locationById.get(cid)?.name ?? cid}
              </button>
            ))}
          </div>
        </div>
      )}

      {activeTab === "summary" && relatedChapters.length > 0 && (
        <div className="mt-3 border-t border-line pt-2">
          <div className="intel-label mb-1">Related chapters</div>
          <div className="flex flex-wrap gap-x-2 gap-y-1">
            {relatedChapters.map((n) => (
              <ChapterRef key={n} ch={n} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
