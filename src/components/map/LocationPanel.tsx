"use client";

import {
  ArchiveNote,
  ChapterRef,
  EntityLink,
  StatusChip,
  Tag,
} from "@/components/ui/kit";
import {
  characterById,
  characters,
  deaths,
  events,
  factionById,
  locationById,
} from "@/lib/db";
import { latestStamp, statusAt } from "@/lib/spoiler";
import type { Character, DeathRecord, StoryEvent } from "@/lib/types";
import {
  ancestorChain,
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

function kindLabel(kind: string): string {
  return kind.replace(/-/g, " ");
}

export function LocationPanel({
  id,
  ch,
  occupancy,
  onSelect,
  onClose,
}: {
  id: string;
  ch: number;
  occupancy: Occupancy;
  onSelect: (locationId: string) => void;
  onClose: () => void;
}) {
  const loc = locationById.get(id);
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

  const eventsHere = allEvents
    .filter((e) => e.locationId === id && e.chapter <= ch)
    .sort((a, b) => a.chapter - b.chapter);

  const deathsHere = allDeaths
    .filter((d) => d.locationId === id && (d.revealCh ?? d.chapter) <= ch)
    .sort((a, b) => a.chapter - b.chapter);

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
        {loc.description}
      </p>

      {controlFaction && (
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
      {(current.length > 0 || remains.length === 0) && (
        <div className="mt-3 border-t border-line pt-2">
          <div className="intel-label mb-1">
            Current occupants ({current.length})
          </div>
          {current.length === 0 ? (
            <ArchiveNote>No tracked persons here at this chapter.</ArchiveNote>
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

      {remains.length > 0 && (
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

      {previous.length > 0 && (
        <div className="mt-3 border-t border-line pt-2">
          <div className="intel-label mb-1">Previous occupants</div>
          <ul className="space-y-1">
            {previous.map((v) => (
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

      {eventsHere.length > 0 && (
        <div className="mt-3 border-t border-line pt-2">
          <div className="intel-label mb-1">Incidents logged here</div>
          <ol className="space-y-1.5">
            {eventsHere.map((e) => (
              <li key={e.id} className="text-xs text-muted">
                <span className="mr-2">
                  <ChapterRef ch={e.chapter} />
                </span>
                <span className="text-parchment">{e.title}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {deathsHere.length > 0 && (
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
              </li>
            ))}
          </ul>
        </div>
      )}

      {connected.length > 0 && (
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

      {relatedChapters.length > 0 && (
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
