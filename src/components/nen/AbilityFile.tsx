"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { EvidenceDrawer } from "@/components/ui/EvidenceDrawer";
import {
  ArchiveNote,
  ChapterRef,
  ConfidenceBadge,
  DataRow,
  EntityLink,
  EntityList,
  Panel,
  Tag,
} from "@/components/ui/kit";
import { abilityById, mysteryById } from "@/lib/db";
import { useEffectiveChapter } from "@/lib/store";
import type { Mystery, NenAbility } from "@/lib/types";

// The @/data modules are authored in parallel; this pin asserts the intended
// map type so this file typechecks before the datasets land.
const mysteryLookup = mysteryById as unknown as Map<string, Mystery>;

const ABILITY_STATUS_COLOR: Record<string, string> = {
  active: "var(--alive)",
  inactive: "var(--muted)",
  broken: "var(--blood)",
  unknown: "var(--faint)",
};

const KIND_STAMP: Record<NenAbility["kind"], string> = {
  personal: "Personal hatsu",
  "guardian-beast": "Guardian beast",
  parasitic: "Parasitic",
  "post-mortem": "Post-mortem",
  curse: "Curse",
  borrowed: "Borrowed",
  unknown: "Unclassified",
};

export function AbilityFile({ id }: { id: string }) {
  const ability = abilityById.get(id);
  const ch = useEffectiveChapter();

  if (!ability) notFound();

  // Mechanics are sealed until the reader-reveal chapter passes.
  if (ability.revealCh > ch) {
    return (
      <div className="mx-auto max-w-xl py-20 text-center">
        <div className="stamp mx-auto inline-block text-warn">
          Sealed research file
        </div>
        <p className="mt-4 text-sm text-muted">
          {ability.firstSeenCh <= ch
            ? `An effect matching this file was sighted around chapter ${ability.firstSeenCh}, but its mechanics are not on record at chapter ${ch}.`
            : `This research file does not exist at chapter ${ch}.`}{" "}
          Raise your clearance to open it.
        </p>
      </div>
    );
  }

  const status = ability.status ?? "unknown";
  const uses = (ability.uses ?? []).filter((u) => u.ch <= ch);
  const aware = (ability.awareCharacterIds ?? []).filter(
    (a) => a.sinceCh <= ch,
  );
  const evidence = ability.evidence.filter((e) => e.chapter <= ch);
  const relatedMysteries = (ability.mysteryIds ?? [])
    .map((mid) => mysteryLookup.get(mid))
    .filter(
      (m): m is NonNullable<typeof m> =>
        m !== undefined && m.introducedCh <= ch,
    );
  const hasMechanics = Boolean(
    ability.conditions?.length || ability.restrictions?.length || ability.cost,
  );

  return (
    <div>
      {/* File header */}
      <div className="archive-record-header dossier dossier-gold corner-ticks mb-4 p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="intel-label-gold">
              Nen research file · {KIND_STAMP[ability.kind]}
            </div>
            <h1 className="royal-heading text-3xl">{ability.name}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <Tag>{ability.nenType}</Tag>
              {ability.userCharacterId ? (
                <span className="text-sm text-muted">
                  User: <EntityLink id={ability.userCharacterId} />
                </span>
              ) : (
                <span className="font-mono text-[10px] uppercase tracking-widest text-warn">
                  user unknown
                </span>
              )}
              <span
                className="font-mono text-[10px] uppercase tracking-widest"
                style={{ color: ABILITY_STATUS_COLOR[status] }}
              >
                {status}
              </span>
              <ConfidenceBadge level={ability.confidence} />
              <EvidenceDrawer
                title={`${ability.name} · evidence`}
                evidence={evidence}
                summary={ability.description}
              />
            </div>
          </div>
          <span className="stamp shrink-0 text-[10px] text-gold">
            {KIND_STAMP[ability.kind]}
          </span>
        </div>
      </div>

      {/* Mechanics diagram — only when the ability has real machinery. */}
      {hasMechanics && (
        <div className="dossier corner-ticks mb-4 bg-bg-deep/50 p-4">
          <div className="intel-label mb-3">Mechanics diagram</div>
          <MechanicsDiagram ability={ability} />
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Panel label="Assessment" title="Description">
            <p className="text-sm leading-relaxed text-parchment">
              {ability.description}
            </p>
          </Panel>

          <Panel label="Observed output" title="Effects">
            <ul className="space-y-1.5">
              {ability.effects.map((effect) => (
                <li key={effect} className="flex gap-2 text-sm text-parchment">
                  <span className="mt-1.5 h-1 w-1 shrink-0 bg-gold-dim" />
                  {effect}
                </li>
              ))}
            </ul>
          </Panel>

          {ability.weaknesses?.length || ability.counters?.length ? (
            <Panel label="Counter-analysis" title="Weaknesses & counters">
              {ability.weaknesses && ability.weaknesses.length > 0 && (
                <MonoList
                  label="Weaknesses"
                  items={ability.weaknesses}
                  tone="var(--warn)"
                />
              )}
              {ability.counters && ability.counters.length > 0 && (
                <MonoList
                  label="Counters"
                  items={ability.counters}
                  tone="var(--teal)"
                />
              )}
            </Panel>
          ) : null}

          {uses.length > 0 && (
            <Panel label="Field record" title="Recorded uses">
              <ol className="relative ml-3 space-y-3 border-l border-line pl-5">
                {uses.map((u) => (
                  <li key={`${u.ch}-${u.note}`} className="relative">
                    <span className="absolute -left-[26px] top-1.5 h-2 w-2 rounded-full border border-gold-dim bg-panel" />
                    <div className="flex flex-wrap items-baseline gap-2">
                      <ChapterRef ch={u.ch} />
                      <span className="text-sm text-parchment">{u.note}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </Panel>
          )}

          {evidence.length > 0 && (
            <Panel label="Sourcing" title="Evidence">
              <ul className="space-y-1.5">
                {evidence.map((e) => (
                  <li
                    key={`${e.chapter}-${e.note}`}
                    className="text-xs text-muted"
                  >
                    <span className="mr-2 inline-flex items-center gap-2">
                      <ChapterRef ch={e.chapter} />
                      <ConfidenceBadge level={e.confidence} />
                    </span>
                    {e.note}
                  </li>
                ))}
              </ul>
            </Panel>
          )}
        </div>

        <div className="space-y-4">
          <Panel label="File data" title="Parameters">
            {ability.activation && (
              <DataRow label="Activation">{ability.activation}</DataRow>
            )}
            {ability.range && <DataRow label="Range">{ability.range}</DataRow>}
            {ability.targets && (
              <DataRow label="Valid targets">{ability.targets}</DataRow>
            )}
            {ability.cost && (
              <DataRow label="Cost / vow">{ability.cost}</DataRow>
            )}
            <DataRow label="First seen">
              <ChapterRef ch={ability.firstSeenCh} />
            </DataRow>
            <DataRow label="Mechanics known">
              <ChapterRef ch={ability.revealCh} />
            </DataRow>
          </Panel>

          {ability.conditions && ability.conditions.length > 0 && (
            <Panel label="Bindings" title="Conditions">
              <MonoList items={ability.conditions} tone="var(--parchment)" />
            </Panel>
          )}

          {ability.restrictions && ability.restrictions.length > 0 && (
            <Panel label="Bindings" title="Restrictions">
              <MonoList items={ability.restrictions} tone="var(--warn)" />
            </Panel>
          )}

          {aware.length > 0 && (
            <Panel label="Exposure register" title="Who knows it exists">
              <ul className="space-y-1">
                {aware.map((a) => (
                  <li
                    key={a.characterId}
                    className="flex items-baseline justify-between gap-2 text-sm"
                  >
                    <EntityLink id={a.characterId} />
                    <ChapterRef ch={a.sinceCh} />
                  </li>
                ))}
              </ul>
            </Panel>
          )}

          {ability.affectedCharacterIds &&
            ability.affectedCharacterIds.length > 0 && (
              <Panel label="Casualty register" title="Affected persons">
                <EntityList ids={ability.affectedCharacterIds} />
              </Panel>
            )}

          {relatedMysteries.length > 0 && (
            <Panel label="Open questions" title="Related mysteries">
              <ul className="space-y-1.5">
                {relatedMysteries.map((m) => (
                  <li key={m.id}>
                    <Link
                      href={`/mysteries#${m.id}`}
                      className="text-sm text-parchment hover:text-gold-bright"
                    >
                      {m.question}
                    </Link>
                  </li>
                ))}
              </ul>
            </Panel>
          )}

          {uses.length === 0 && evidence.length === 0 && (
            <ArchiveNote>
              No field observations at this clearance — parameters above are
              archival.
            </ArchiveNote>
          )}
        </div>
      </div>
    </div>
  );
}

function MonoList({
  label,
  items,
  tone,
}: {
  label?: string;
  items: string[];
  tone: string;
}) {
  return (
    <div className="mb-3 last:mb-0">
      {label && <div className="intel-label mb-1">{label}</div>}
      <ul className="space-y-1">
        {items.map((item) => (
          <li
            key={item}
            className="border-l pl-2 font-mono text-[11px] leading-relaxed"
            style={{
              color: tone,
              borderColor: "color-mix(in srgb, currentColor 35%, transparent)",
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Mechanics flow diagram:
   [Activation] → [Conditions] → [Effects], with [Restrictions] and [Cost/Vow]
   hanging off the spine by thin arrowed connectors.
--------------------------------------------------------------------------- */

function MechanicsDiagram({ ability }: { ability: NenAbility }) {
  const hasConditions = Boolean(ability.conditions?.length);
  const hasSide = Boolean(ability.restrictions?.length || ability.cost);
  return (
    <div>
      <div className="flex flex-col items-stretch gap-1 md:flex-row md:items-center">
        <DiagramBox
          label="Activation"
          items={[ability.activation ?? "Trigger not on record"]}
        />
        <FlowArrow />
        {hasConditions && (
          <>
            <DiagramBox
              label="Conditions"
              items={ability.conditions ?? []}
              tone="var(--teal)"
            />
            <FlowArrow />
          </>
        )}
        <DiagramBox
          label="Effects"
          items={ability.effects}
          tone="var(--gold)"
        />
      </div>

      {hasSide && (
        <>
          <div className="flex justify-center md:justify-start md:pl-24">
            <svg width="10" height="22" aria-hidden="true">
              <line
                x1="5"
                y1="0"
                x2="5"
                y2="16"
                stroke="var(--line-strong)"
                strokeWidth="1"
              />
              <path
                d="M 1.5 15 L 5 21 L 8.5 15"
                fill="none"
                stroke="var(--line-strong)"
                strokeWidth="1"
              />
            </svg>
          </div>
          <div className="flex flex-col gap-3 md:flex-row">
            {ability.restrictions && ability.restrictions.length > 0 && (
              <DiagramBox
                label="Restrictions"
                items={ability.restrictions}
                tone="var(--warn)"
              />
            )}
            {ability.cost && (
              <DiagramBox
                label="Cost / vow"
                items={[ability.cost]}
                tone="var(--blood-bright)"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

function DiagramBox({
  label,
  items,
  tone = "var(--parchment)",
}: {
  label: string;
  items: string[];
  tone?: string;
}) {
  return (
    <div className="min-w-0 flex-1 border border-line-strong bg-panel p-2.5">
      <div className="intel-label mb-1.5" style={{ color: tone }}>
        {label}
      </div>
      <ul className="space-y-1">
        {items.map((item) => (
          <li
            key={item}
            className="font-mono text-[10px] leading-relaxed text-muted"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Thin connector with arrowhead; rotates for the stacked mobile layout. */
function FlowArrow(): ReactNode {
  return (
    <>
      <svg
        width="30"
        height="10"
        aria-hidden="true"
        className="hidden shrink-0 self-center md:block"
      >
        <line
          x1="0"
          y1="5"
          x2="23"
          y2="5"
          stroke="var(--line-strong)"
          strokeWidth="1"
        />
        <path
          d="M 22 1.5 L 28 5 L 22 8.5"
          fill="none"
          stroke="var(--line-strong)"
          strokeWidth="1"
        />
      </svg>
      <svg
        width="10"
        height="22"
        aria-hidden="true"
        className="self-center md:hidden"
      >
        <line
          x1="5"
          y1="0"
          x2="5"
          y2="16"
          stroke="var(--line-strong)"
          strokeWidth="1"
        />
        <path
          d="M 1.5 15 L 5 21 L 8.5 15"
          fill="none"
          stroke="var(--line-strong)"
          strokeWidth="1"
        />
      </svg>
    </>
  );
}
