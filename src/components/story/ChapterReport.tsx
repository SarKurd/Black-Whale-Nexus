"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { EventEntry, RecorderList } from "@/components/story/EventRecorder";
import { ArchiveNote, EntityLink, Monogram, Panel } from "@/components/ui/kit";
import {
  abilityById,
  chapterByNumber,
  characterById,
  eventById,
  locationById,
  mysteryById,
  sortedChapters,
  storylineById,
} from "@/lib/db";
import { useEffectiveChapter } from "@/lib/store";
import type { ChapterInfo, Mystery, NenAbility } from "@/lib/types";

interface DiffEntry {
  k: string;
  node: ReactNode;
}

/** One labeled group inside the "what changed" diff — +/−/Δ semantics. */
function DiffGroup({
  label,
  marker,
  color,
  items,
}: {
  label: string;
  marker: string;
  color: string;
  items: DiffEntry[];
}) {
  if (items.length === 0) return null;
  return (
    <div>
      <div className="intel-label mb-1" style={{ color }}>
        {label}
      </div>
      <ul className="space-y-1">
        {items.map((item) => (
          <li
            key={item.k}
            className="flex items-start gap-2 text-sm text-parchment"
          >
            <span
              className="mt-px w-4 shrink-0 text-center font-mono text-xs"
              style={{ color }}
              aria-hidden
            >
              {marker}
            </span>
            <span className="min-w-0">{item.node}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Plain diff sentences keyed by their own text (unique within a chapter). */
function textItems(arr?: string[]): DiffEntry[] {
  return (arr ?? []).map((t) => ({ k: t, node: t }));
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

export function ChapterReport({ num }: { num: string }) {
  const ch = useEffectiveChapter();
  const n = Number(num);
  const info = chapterByNumber.get(n);

  if (!info) notFound();

  if (n > ch) {
    return (
      <div className="mx-auto max-w-xl py-20 text-center">
        <div className="stamp mx-auto inline-block text-warn">
          Report sealed
        </div>
        <p className="mt-4 text-sm text-muted">
          Incident report for chapter {n} sits above your clearance (currently
          chapter {ch}). Raise clearance to break the seal.
        </p>
        <Link
          href="/chapters"
          className="mt-4 inline-block font-mono text-[10px] uppercase tracking-widest text-teal hover:text-gold-bright"
        >
          ← Back to the archive
        </Link>
      </div>
    );
  }

  const covered: ChapterInfo[] = sortedChapters;
  const idx = covered.findIndex((c) => c.number === n);
  const prev = idx > 0 ? covered[idx - 1] : undefined;
  const next =
    idx >= 0 && idx < covered.length - 1 ? covered[idx + 1] : undefined;

  const chapterEvents = info.eventIds
    .map((id) => eventById.get(id))
    .filter((e) => e !== undefined);
  const appearing = info.appearingCharacterIds.filter(
    (id) => (characterById.get(id)?.introducedCh ?? 0) <= ch,
  );
  const abilities = (info.abilitiesUsedIds ?? [])
    .map((id) => abilityById.get(id))
    .filter((a): a is NenAbility => a !== undefined && a.revealCh <= ch);
  const c = info.changes;
  const hasChanges =
    (c.newCharacters?.length ?? 0) > 0 ||
    (c.deaths?.length ?? 0) > 0 ||
    (c.newRelationships?.length ?? 0) > 0 ||
    (c.brokenAlliances?.length ?? 0) > 0 ||
    (c.movement?.length ?? 0) > 0 ||
    (c.newKnowledge?.length ?? 0) > 0 ||
    (c.newAbilities?.length ?? 0) > 0 ||
    (c.changedObjectives?.length ?? 0) > 0 ||
    (c.newThreats?.length ?? 0) > 0 ||
    (c.mysteriesIntroduced?.length ?? 0) > 0 ||
    (c.mysteriesAdvanced?.length ?? 0) > 0 ||
    (c.mysteriesResolved?.length ?? 0) > 0;

  return (
    <div className="space-y-4">
      {/* Report header */}
      <div className="dossier dossier-gold corner-ticks p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="intel-label-gold">
              Incident report · Chapter {info.number}
            </div>
            <h1 className="royal-heading mt-1 text-3xl">{info.title}</h1>
            <div className="mt-1 font-mono text-[11px] uppercase tracking-widest text-muted">
              {info.day ? `Voyage day ${info.day}` : "Voyage day unrecorded"}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {prev ? (
              <Link
                href={`/chapters/${prev.number}`}
                className="border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-teal hover:border-gold-line hover:text-gold-bright"
              >
                ← CH.{prev.number}
              </Link>
            ) : (
              <span className="border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-faint">
                First report
              </span>
            )}
            {next ? (
              next.number <= ch ? (
                <Link
                  href={`/chapters/${next.number}`}
                  className="border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-teal hover:border-gold-line hover:text-gold-bright"
                >
                  CH.{next.number} →
                </Link>
              ) : (
                <span className="stamp text-[10px] text-warn">
                  Next report sealed
                </span>
              )
            ) : (
              <span className="border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-faint">
                Latest report
              </span>
            )}
          </div>
        </div>
        <p className="mt-3 max-w-3xl border-t border-line pt-3 text-sm leading-relaxed text-parchment">
          {info.summary}
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {/* Event sequence */}
          <Panel label="Voyage recorder" title="Event sequence">
            {chapterEvents.length === 0 ? (
              <ArchiveNote>
                No discrete incidents indexed for this chapter.
              </ArchiveNote>
            ) : (
              <RecorderList>
                {chapterEvents.map((e) => (
                  <EventEntry key={e.id} event={e} showChapter={false} />
                ))}
              </RecorderList>
            )}
          </Panel>

          {/* WHAT CHANGED — signature diff section */}
          <Panel
            label="Differential analysis"
            title="What changed in this chapter?"
            gold
          >
            {!hasChanges ? (
              <ArchiveNote>
                The board did not move this chapter — no recorded state changes.
              </ArchiveNote>
            ) : (
              <div className="space-y-4">
                <DiffGroup
                  label="Entered the record"
                  marker="+"
                  color="var(--teal)"
                  items={(c.newCharacters ?? []).map((id) => ({
                    k: id,
                    node: <EntityLink id={id} />,
                  }))}
                />
                <DiffGroup
                  label="Deaths"
                  marker="−"
                  color="var(--blood)"
                  items={(c.deaths ?? []).map((id) => ({
                    k: id,
                    node: (
                      <span className="line-through decoration-[var(--blood)] decoration-1">
                        <EntityLink id={id} />
                      </span>
                    ),
                  }))}
                />
                <DiffGroup
                  label="New relationships"
                  marker="+"
                  color="var(--teal)"
                  items={textItems(c.newRelationships)}
                />
                <DiffGroup
                  label="Broken alliances"
                  marker="−"
                  color="var(--blood-bright)"
                  items={textItems(c.brokenAlliances)}
                />
                <DiffGroup
                  label="Movement"
                  marker="→"
                  color="var(--muted)"
                  items={textItems(c.movement)}
                />
                <DiffGroup
                  label="New knowledge"
                  marker="+"
                  color="var(--gold)"
                  items={textItems(c.newKnowledge)}
                />
                <DiffGroup
                  label="New abilities"
                  marker="+"
                  color="var(--violet)"
                  items={textItems(c.newAbilities)}
                />
                <DiffGroup
                  label="Changed objectives"
                  marker="Δ"
                  color="var(--warn)"
                  items={textItems(c.changedObjectives)}
                />
                <DiffGroup
                  label="New threats"
                  marker="!"
                  color="var(--blood-bright)"
                  items={textItems(c.newThreats)}
                />
                <DiffGroup
                  label="Mysteries introduced"
                  marker="?"
                  color="var(--gold)"
                  items={(c.mysteriesIntroduced ?? []).map((id) => ({
                    k: id,
                    node: <MysteryLink id={id} />,
                  }))}
                />
                <DiffGroup
                  label="Mysteries advanced"
                  marker="→"
                  color="var(--teal)"
                  items={(c.mysteriesAdvanced ?? []).map((id) => ({
                    k: id,
                    node: <MysteryLink id={id} />,
                  }))}
                />
                <DiffGroup
                  label="Mysteries resolved"
                  marker="✓"
                  color="var(--alive)"
                  items={(c.mysteriesResolved ?? []).map((id) => ({
                    k: id,
                    node: <MysteryLink id={id} />,
                  }))}
                />
              </div>
            )}
          </Panel>

          {/* Dialogue references */}
          {info.dialogueRefs && info.dialogueRefs.length > 0 && (
            <Panel label="Transcript fragments" title="Cited dialogue">
              <div className="space-y-3">
                {info.dialogueRefs.map((q) => (
                  <blockquote
                    key={q}
                    className="border-l-2 border-gold-line pl-3 text-sm italic leading-relaxed text-parchment"
                  >
                    <span className="mr-1 text-gold-dim" aria-hidden>
                      ❝
                    </span>
                    {q}
                  </blockquote>
                ))}
              </div>
            </Panel>
          )}
        </div>

        <div className="space-y-4">
          {/* Characters appearing */}
          <Panel label="Roster" title="Characters appearing">
            {appearing.length === 0 ? (
              <ArchiveNote>No indexed appearances.</ArchiveNote>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {appearing.map((id) => {
                  const char = characterById.get(id);
                  return (
                    <Link
                      key={id}
                      href={`/characters/${id}`}
                      className="group flex items-center gap-2 border border-line/70 bg-raised/50 px-2 py-1.5 transition-colors hover:border-gold-line"
                    >
                      <Monogram characterId={id} size="sm" />
                      <span className="truncate text-xs text-parchment group-hover:text-gold-bright">
                        {char?.name ?? id}
                      </span>
                    </Link>
                  );
                })}
              </div>
            )}
          </Panel>

          {/* Locations */}
          <Panel label="Ground" title="Locations">
            {info.locationIds.length === 0 ? (
              <ArchiveNote>No locations indexed.</ArchiveNote>
            ) : (
              <ul className="space-y-1.5">
                {info.locationIds.map((id) => (
                  <li key={id}>
                    <Link
                      href={`/map?location=${id}`}
                      className="text-sm text-teal hover:text-gold-bright"
                    >
                      {locationById.get(id)?.name ?? id}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Panel>

          {/* Storylines advanced */}
          <Panel label="Threads" title="Storylines advanced">
            {info.storylineIds.length === 0 ? (
              <ArchiveNote>No threads moved.</ArchiveNote>
            ) : (
              <ul className="space-y-1.5">
                {info.storylineIds.map((id) => {
                  const s = storylineById.get(id);
                  if (!s) return null;
                  return (
                    <li key={id}>
                      <Link
                        href={`/storylines/${id}`}
                        className="flex items-center gap-2 text-sm hover:text-gold-bright"
                        style={{ color: s.color }}
                      >
                        <span
                          className="h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ background: s.color }}
                        />
                        {s.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </Panel>

          {/* Nen used */}
          {abilities.length > 0 && (
            <Panel label="Nen registry" title="Abilities used">
              <ul className="space-y-1.5">
                {abilities.map((a) => (
                  <li key={a.id}>
                    <Link
                      href={`/nen/${a.id}`}
                      className="text-sm hover:text-gold-bright"
                      style={{ color: "var(--violet)" }}
                    >
                      {a.name}
                    </Link>
                    {a.userCharacterId && (
                      <span className="ml-2 text-xs text-muted">
                        — <EntityLink id={a.userCharacterId} />
                      </span>
                    )}
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
