"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ChapterControl } from "@/components/shell/ChapterControl";
import {
  ArchiveNote,
  ChapterRef,
  EntityLink,
  Monogram,
  Panel,
  SectionHeading,
  StatusChip,
} from "@/components/ui/kit";
import { DeferredRelationshipGraph } from "@/components/viz/DeferredRelationshipGraph";
import { investigationPaths } from "@/data/paths";
import {
  characterById,
  characters,
  events,
  knowledgeByFact,
  knowledgeFacts,
  locationById,
  mysteries,
  nenAbilities,
  princes,
  relationships,
  sortedChapters,
  storylines,
} from "@/lib/db";
import { presetById } from "@/lib/presets";
import {
  latestStamp,
  locationAt,
  mysteryStatusAt,
  relationshipEnded,
  relationshipVisible,
  statusAt,
} from "@/lib/spoiler";
import { useEffectiveChapter } from "@/lib/store";
import { ARC_START } from "@/lib/types";

const RISK_COLOR: Record<string, string> = {
  low: "var(--alive)",
  moderate: "var(--teal)",
  high: "var(--warn)",
  critical: "var(--blood-bright)",
  eliminated: "var(--faint)",
};

export default function CommandCenter() {
  const ch = useEffectiveChapter();

  const intel = useMemo(() => {
    const visible = characters.filter((c) => c.introducedCh <= ch);
    const statuses = visible.map((c) => ({ c, st: statusAt(c, ch) }));
    const active = statuses.filter((s) => s.st?.status === "alive");
    const dead = statuses.filter(
      (s) => s.st?.status === "dead" || s.st?.status === "presumed-dead",
    );
    const missing = statuses.filter((s) => s.st?.status === "missing");

    const liveRels = relationships.filter(
      (r) => relationshipVisible(r, ch) && !relationshipEnded(r, ch),
    );
    const conflicts = liveRels.filter((r) =>
      ["enemy", "hunting", "targeting"].includes(r.kind),
    );
    const alliances = liveRels.filter((r) =>
      ["allied", "secret-alliance"].includes(r.kind),
    );
    const openMysteries = mysteries.filter(
      (m) =>
        m.introducedCh <= ch &&
        !["resolved", "disproven"].includes(mysteryStatusAt(m, ch)),
    );
    const recentEvents = events
      .filter((e) => e.chapter <= ch)
      .sort((a, b) => b.chapter - a.chapter)
      .slice(0, 7);
    const recentAbilities = nenAbilities
      .filter((a) => a.revealCh <= ch && a.revealCh >= ARC_START)
      .sort((a, b) => b.revealCh - a.revealCh)
      .slice(0, 5);
    const activeStorylines = storylines
      .filter((s) => s.introducedCh <= ch)
      .map((s) => ({ s, st: latestStamp(s.status, ch)?.value ?? "active" }))
      .filter((x) => x.st === "active" || x.st === "escalating");

    // Ship-tier activity: living characters per tier.
    const tierCounts = [0, 0, 0, 0, 0];
    for (const { c, st } of statuses) {
      if (st?.status !== "alive") continue;
      const loc = locationAt(c, ch);
      if (!loc) continue;
      let node = locationById.get(loc.locationId);
      while (node && node.tier === undefined && node.parentId) {
        node = locationById.get(node.parentId);
      }
      if (node?.tier) tierCounts[node.tier - 1]++;
    }

    // Reader-only intel: facts revealed to us that nobody aboard fully holds.
    const readerOnly = knowledgeFacts.filter((f) => {
      if (f.readerRevealCh > ch) return false;
      const rows = knowledgeByFact.get(f.id) ?? [];
      return rows.some((r) => r.state === "reader-only" && r.sinceCh <= ch);
    });

    const currentChapter = sortedChapters.filter((c) => c.number <= ch).at(-1);
    const day = sortedChapters
      .filter((c) => c.number <= ch && c.day)
      .at(-1)?.day;

    const RISK_ORDER: Record<string, number> = { critical: 0, high: 1 };
    const highRisk = princes
      .map((p) => {
        const risk = [...p.riskHistory]
          .filter((r) => r.ch <= ch)
          .sort((a, b) => a.ch - b.ch)
          .at(-1);
        return { p, risk };
      })
      .filter((x) => x.risk && ["high", "critical"].includes(x.risk.risk))
      .sort(
        (a, b) =>
          RISK_ORDER[a.risk?.risk ?? ""] - RISK_ORDER[b.risk?.risk ?? ""],
      );

    return {
      visible,
      active,
      dead,
      missing,
      conflicts,
      alliances,
      openMysteries,
      recentEvents,
      recentAbilities,
      activeStorylines,
      tierCounts,
      readerOnly,
      currentChapter,
      day,
      highRisk,
    };
  }, [ch]);

  const preArc = ch < ARC_START;
  const webNodes = useMemo(
    () => presetById.get("active-conflicts")?.nodeIds() ?? new Set<string>(),
    [],
  );

  return (
    <div className="space-y-6">
      {/* Masthead */}
      <div className="dossier dossier-gold corner-ticks relative overflow-hidden px-6 py-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="intel-label-gold">
              Kingdom of Kakin · Bureau of Succession Intelligence
            </div>
            <h1 className="royal-heading mt-1 text-3xl sm:text-4xl">
              Black Whale Nexus
            </h1>
            <p className="mt-2 max-w-xl text-sm text-muted">
              Live situation archive for the succession war aboard Black Whale
              No.&nbsp;1. Records reconstructed to your clearance level —
              nothing appears before the story reveals it.
            </p>
          </div>
          <div className="ml-auto min-w-0 max-w-full text-right">
            <div className="intel-label">Record state</div>
            <div className="royal-heading text-2xl text-gold-bright">
              {preArc ? "Pre-voyage" : `Chapter ${ch}`}
            </div>
            <div className="font-mono text-[11px] tracking-wider text-muted">
              {preArc
                ? "The whale has not sailed"
                : `Voyage day ${intel.day ?? "—"} · ${
                    intel.currentChapter
                      ? `“${intel.currentChapter.title}”`
                      : "between filed reports"
                  }`}
            </div>
          </div>
        </div>
        <div className="mt-4 border-t border-line pt-3">
          <ChapterControl large />
        </div>
      </div>

      {preArc && (
        <ArchiveNote>
          Anime-only clearance: the succession war has not begun. Records cover
          only figures known before boarding. Raise clearance to open the
          archive.
        </ArchiveNote>
      )}

      {/* Situation board */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Panel
          label="Situation ledger"
          title="State of the war"
          className="lg:col-span-1"
        >
          <div className="space-y-1">
            {(
              [
                [
                  "Characters on record",
                  intel.visible.length,
                  "var(--parchment)",
                ],
                ["Active", intel.active.length, "var(--alive)"],
                ["Confirmed dead", intel.dead.length, "var(--blood)"],
                ["Missing / unlocated", intel.missing.length, "var(--warn)"],
                [
                  "Open conflicts",
                  intel.conflicts.length,
                  "var(--blood-bright)",
                ],
                ["Standing alliances", intel.alliances.length, "var(--teal)"],
                [
                  "Unresolved mysteries",
                  intel.openMysteries.length,
                  "var(--gold)",
                ],
              ] as const
            ).map(([label, n, color]) => (
              <div
                key={label}
                className="flex items-baseline justify-between border-b border-line/60 py-1.5 last:border-0"
              >
                <span className="text-sm text-muted">{label}</span>
                <span
                  className="font-mono text-lg tabular-nums"
                  style={{ color }}
                >
                  {n}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <SectionHeading>Activity by tier</SectionHeading>
            <div className="space-y-1.5">
              {intel.tierCounts.map((n, i) => {
                const max = Math.max(...intel.tierCounts, 1);
                return (
                  <div
                    key={`tier-${i + 1}`}
                    className="flex items-center gap-2"
                  >
                    <span className="intel-label w-10">T{i + 1}</span>
                    <div className="h-2 flex-1 border border-line/60 bg-bg-deep">
                      <div
                        className="h-full bg-teal/60 transition-all duration-500"
                        style={{ width: `${(n / max) * 100}%` }}
                      />
                    </div>
                    <span className="w-6 text-right font-mono text-[10px] text-muted">
                      {n}
                    </span>
                  </div>
                );
              })}
            </div>
            <Link
              href="/map"
              className="mt-2 inline-block font-mono text-[10px] uppercase tracking-widest text-teal hover:text-gold-bright"
            >
              Open tactical blueprint →
            </Link>
          </div>
        </Panel>

        {/* Prince status */}
        <Panel
          label="Royal war council"
          title="The fourteen princes"
          className="lg:col-span-2"
          actions={
            <Link
              href="/princes"
              className="intel-label text-teal hover:text-gold-bright"
            >
              Full council →
            </Link>
          }
        >
          {preArc ? (
            <ArchiveNote>Sealed until the voyage begins.</ArchiveNote>
          ) : (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4">
              {princes.map((p) => {
                const c = characterById.get(p.characterId);
                if (!c) return null;
                const st = statusAt(c, ch);
                const risk = [...p.riskHistory]
                  .filter((r) => r.ch <= ch)
                  .sort((a, b) => a.ch - b.ch)
                  .at(-1);
                return (
                  <Link
                    key={p.id}
                    href={`/princes/${p.id}`}
                    className="group flex items-start gap-2.5 border border-line/70 bg-raised/50 px-2.5 py-2 transition-colors hover:border-gold-line"
                  >
                    <Monogram characterId={c.id} size="sm" />
                    <span className="min-w-0">
                      <span className="block truncate text-sm text-ivory group-hover:text-gold-bright">
                        {c.name}
                      </span>
                      <span className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                        {st && <StatusChip status={st.status} />}
                        {risk && (
                          <span
                            className="shrink-0 font-mono text-[9px] uppercase tracking-widest"
                            style={{ color: RISK_COLOR[risk.risk] }}
                            title={risk.why}
                          >
                            {risk.risk}
                          </span>
                        )}
                      </span>
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
          {intel.highRisk.length > 0 && (
            <div className="mt-3 border-t border-line pt-3">
              <div
                className="intel-label mb-2"
                style={{ color: "var(--blood-bright)" }}
              >
                Elevated threat · {intel.highRisk.length}
              </div>
              <ul className="space-y-1.5">
                {intel.highRisk.map(({ p, risk }) => (
                  <li key={p.id} className="flex items-baseline gap-2">
                    <span
                      className="mt-px w-14 shrink-0 font-mono text-[9px] uppercase tracking-widest"
                      style={{ color: RISK_COLOR[risk?.risk ?? "high"] }}
                    >
                      {risk?.risk}
                    </span>
                    <span className="min-w-0">
                      <EntityLink id={p.characterId} className="text-sm" />
                      <span className="ml-1.5 text-xs leading-snug text-muted">
                        {risk?.why}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Recent events */}
        <Panel
          label="Voyage recorder"
          title="Recent major events"
          actions={
            <Link
              href="/chronology"
              className="intel-label text-teal hover:text-gold-bright"
            >
              Event Archive →
            </Link>
          }
        >
          {intel.recentEvents.length === 0 ? (
            <ArchiveNote>No incidents on file at this clearance.</ArchiveNote>
          ) : (
            <ol className="space-y-2.5">
              {intel.recentEvents.map((e) => (
                <li key={e.id} className="flex gap-3">
                  <ChapterRef ch={e.chapter} />
                  <div className="min-w-0">
                    <div className="text-sm leading-snug text-ivory">
                      {e.title}
                    </div>
                    <div className="line-clamp-2 text-xs text-muted">
                      {e.summary}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </Panel>

        {/* Active storylines */}
        <Panel
          label="Mission map"
          title="Active storylines"
          actions={
            <Link
              href="/storylines"
              className="intel-label text-teal hover:text-gold-bright"
            >
              All threads →
            </Link>
          }
        >
          {intel.activeStorylines.length === 0 ? (
            <ArchiveNote>No active operations at this clearance.</ArchiveNote>
          ) : (
            <ul className="space-y-2">
              {intel.activeStorylines.map(({ s, st }) => (
                <li key={s.id}>
                  <Link
                    href={`/storylines/${s.id}`}
                    className="group flex items-center gap-2.5"
                  >
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{
                        background: s.color,
                        boxShadow:
                          st === "escalating"
                            ? `0 0 6px ${s.color}`
                            : undefined,
                      }}
                    />
                    <span className="flex-1 truncate text-sm text-parchment group-hover:text-gold-bright">
                      {s.name}
                    </span>
                    <span
                      className="font-mono text-[9px] uppercase tracking-widest"
                      style={{
                        color:
                          st === "escalating"
                            ? "var(--blood-bright)"
                            : "var(--muted)",
                      }}
                    >
                      {st}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-4">
            <SectionHeading>Recently revealed Nen</SectionHeading>
            {intel.recentAbilities.length === 0 ? (
              <ArchiveNote>No new ability files.</ArchiveNote>
            ) : (
              <ul className="space-y-1.5">
                {intel.recentAbilities.map((a) => (
                  <li
                    key={a.id}
                    className="flex items-baseline justify-between gap-2"
                  >
                    <Link
                      href={`/nen/${a.id}`}
                      className="truncate text-sm hover:text-gold-bright"
                      style={{ color: "var(--violet)" }}
                    >
                      {a.name}
                    </Link>
                    <ChapterRef ch={a.revealCh} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Panel>

        {/* Reader-only intel */}
        <Panel label="Eyes only" title="What only you know" gold>
          <p className="mb-3 text-xs text-muted">
            Intelligence the story has shown the reader that no faction aboard
            possesses.
          </p>
          {intel.readerOnly.length === 0 ? (
            <ArchiveNote>Nothing above ambient knowledge yet.</ArchiveNote>
          ) : (
            <ul className="space-y-2">
              {intel.readerOnly.map((f) => (
                <li key={f.id}>
                  <Link
                    href={`/knowledge?fact=${f.id}`}
                    className="group block border-l-2 border-gold-line pl-2.5"
                  >
                    <span className="block text-sm text-ivory group-hover:text-gold-bright">
                      {f.label}
                    </span>
                    <span className="line-clamp-2 block text-xs text-muted">
                      {f.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>

      {/* Conflict web */}
      {!preArc && (
        <Panel
          label="Investigation board"
          title="Active conflict network"
          actions={
            <Link
              href="/web"
              className="intel-label text-teal hover:text-gold-bright"
            >
              Open full web →
            </Link>
          }
        >
          <div className="h-72 border border-line/60 bg-bg-deep/50">
            <DeferredRelationshipGraph nodeIds={webNodes} chapter={ch} />
          </div>
          <p className="mt-2 font-mono text-[10px] tracking-wider text-faint">
            Red edges: hostilities · dashed: secret · click a node to open its
            dossier
          </p>
        </Panel>
      )}

      {/* Begin investigation */}
      <div>
        <SectionHeading
          right={
            <span className="font-mono text-[10px] tracking-widest text-faint">
              {investigationPaths.length} guided paths
            </span>
          }
        >
          Begin investigation
        </SectionHeading>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {investigationPaths.map((p) => (
            <div
              key={p.id}
              className="dossier corner-ticks group p-4 transition-colors hover:border-gold-line"
            >
              <div className="royal-heading text-base text-ivory">
                {p.title}
              </div>
              <p className="mt-1 text-xs text-muted">{p.blurb}</p>
              <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
                {p.steps.map((s, i) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="font-mono text-[10px] uppercase tracking-wider text-teal hover:text-gold-bright"
                  >
                    {i + 1}. {s.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
