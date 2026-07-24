"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArchiveNote,
  ChapterRef,
  ConfidenceBadge,
  DataRow,
  EntityLink,
  EntityList,
  Monogram,
  Panel,
  SectionHeading,
  StatusChip,
} from "@/components/ui/kit";
import {
  characterById,
  characters,
  deaths,
  factions,
  locationById,
  mysteryById,
  princeById,
} from "@/lib/db";
import { STATUS_COLOR, STATUS_LABEL, statusAt } from "@/lib/spoiler";
import { useEffectiveChapter } from "@/lib/store";
import type {
  Character,
  CharacterStatus,
  DeathRecord,
  Faction,
  Mystery,
} from "@/lib/types";

// Typed aliases — the data modules are authored in parallel, so the raw
// exports may be error-typed until they land. These casts are no-ops once
// the datasets exist.
const allDeaths = deaths as DeathRecord[];
const allCharacters = characters as Character[];
const allFactions = factions as Faction[];
const mysteryLookup = mysteryById as ReadonlyMap<string, Mystery>;

const CENSUS_ORDER: CharacterStatus[] = [
  "alive",
  "dead",
  "missing",
  "incapacitated",
  "possessed",
  "detained",
  "presumed-dead",
  "unknown",
];

/** Display name for a prince-context id (falls back to the raw id). */
function princeLabel(princeId: string): string {
  const prince = princeById.get(princeId);
  const c = prince ? characterById.get(prince.characterId) : undefined;
  return c?.name ?? princeId.replace("prince-", "Prince ");
}

export default function DeathsPage() {
  const ch = useEffectiveChapter();
  const [fromCh, setFromCh] = useState<string>("all");
  const [toCh, setToCh] = useState<string>("all");
  const [faction, setFaction] = useState<string>("all");
  const [killer, setKiller] = useState<"all" | "known" | "unknown">("all");
  const [prince, setPrince] = useState<string>("all");

  const census = useMemo(() => {
    const counts = Object.fromEntries(
      CENSUS_ORDER.map((s) => [s, 0]),
    ) as Record<CharacterStatus, number>;
    const unaccounted: { c: Character; st: CharacterStatus }[] = [];
    for (const c of allCharacters) {
      if (c.introducedCh > ch) continue;
      // Characters with no revealed status entry are filed as unknown.
      const status = statusAt(c, ch)?.status ?? "unknown";
      counts[status]++;
      if (status === "missing" || status === "unknown") {
        unaccounted.push({ c, st: status });
      }
    }
    unaccounted.sort((a, b) => a.c.name.localeCompare(b.c.name));
    return { counts, unaccounted };
  }, [ch]);

  const visibleDeaths = useMemo(
    () =>
      allDeaths
        .filter((d) => (d.revealCh ?? d.chapter) <= ch)
        .sort((a, b) => a.chapter - b.chapter),
    [ch],
  );

  const coveredChapters = useMemo(
    () =>
      [...new Set(visibleDeaths.map((d) => d.chapter))].sort((a, b) => a - b),
    [visibleDeaths],
  );

  const princeOptions = useMemo(
    () =>
      [
        ...new Set(
          visibleDeaths
            .map((d) => d.princeContextId)
            .filter((p): p is string => Boolean(p)),
        ),
      ].sort((a, b) => princeLabel(a).localeCompare(princeLabel(b))),
    [visibleDeaths],
  );

  const factionOptions = useMemo(
    () =>
      allFactions
        .filter((f) => f.introducedCh <= ch)
        .sort((a, b) => a.name.localeCompare(b.name)),
    [ch],
  );

  const records = useMemo(
    () =>
      visibleDeaths.filter((d) => {
        if (fromCh !== "all" && d.chapter < Number(fromCh)) return false;
        if (toCh !== "all" && d.chapter > Number(toCh)) return false;
        if (faction !== "all") {
          const victim = characterById.get(d.victimId);
          const inFaction =
            d.factionId === faction ||
            (victim?.factionIds.includes(faction) ?? false);
          if (!inFaction) return false;
        }
        // A killer counts as "known" if identified either by a registry id or
        // by a named non-registry cause (killerName).
        const killerKnown = Boolean(d.killerId || d.killerName);
        if (killer === "known" && !killerKnown) return false;
        if (killer === "unknown" && killerKnown) return false;
        if (prince !== "all" && d.princeContextId !== prince) return false;
        return true;
      }),
    [visibleDeaths, fromCh, toCh, faction, killer, prince],
  );

  return (
    <div>
      <div className="mb-5">
        <div className="intel-label-gold">Ledger · Casualty records</div>
        <h1 className="royal-heading text-3xl">Death & Status Tracker</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted">
          The casualty ledger of the succession war, reconstructed to your
          clearance. Deaths the story has not yet revealed at chapter {ch} are
          withheld.
        </p>
      </div>

      {/* Status census */}
      <Panel
        label="Census"
        title="Status of all persons on record"
        className="mb-4"
      >
        <div className="flex flex-wrap gap-x-8 gap-y-4">
          {CENSUS_ORDER.map((s) => (
            <div key={s}>
              <div
                className="font-mono text-2xl tabular-nums"
                style={{ color: STATUS_COLOR[s] }}
              >
                {census.counts[s]}
              </div>
              <div className="intel-label">{STATUS_LABEL[s]}</div>
            </div>
          ))}
        </div>
      </Panel>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-1.5">
          <span className="intel-label">From</span>
          <select
            value={fromCh}
            onChange={(e) => setFromCh(e.target.value)}
            className="border border-line bg-panel px-2 py-1.5 text-sm text-parchment outline-none"
          >
            <option value="all">Any</option>
            {coveredChapters.map((n) => (
              <option key={n} value={n}>
                Ch. {n}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-1.5">
          <span className="intel-label">To</span>
          <select
            value={toCh}
            onChange={(e) => setToCh(e.target.value)}
            className="border border-line bg-panel px-2 py-1.5 text-sm text-parchment outline-none"
          >
            <option value="all">Any</option>
            {coveredChapters.map((n) => (
              <option key={n} value={n}>
                Ch. {n}
              </option>
            ))}
          </select>
        </label>
        <select
          value={faction}
          onChange={(e) => setFaction(e.target.value)}
          className="border border-line bg-panel px-2 py-1.5 text-sm text-parchment outline-none"
        >
          <option value="all">All factions</option>
          {factionOptions.map((f) => (
            <option key={f.id} value={f.id}>
              {f.name}
            </option>
          ))}
        </select>
        <select
          value={prince}
          onChange={(e) => setPrince(e.target.value)}
          className="border border-line bg-panel px-2 py-1.5 text-sm text-parchment outline-none"
        >
          <option value="all">All prince contexts</option>
          {princeOptions.map((p) => (
            <option key={p} value={p}>
              {princeLabel(p)}
            </option>
          ))}
        </select>
        <div className="flex flex-wrap gap-1">
          {(["all", "known", "unknown"] as const).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setKiller(k)}
              className={`border px-2 py-1 font-mono text-[10px] uppercase tracking-widest transition-colors ${
                killer === k
                  ? "border-gold-line bg-gold/10 text-gold-bright"
                  : "border-line text-muted hover:text-parchment"
              }`}
            >
              {k === "all" ? "Any killer" : `Killer ${k}`}
            </button>
          ))}
        </div>
        <span className="ml-auto font-mono text-[10px] tracking-widest text-faint">
          {records.length} of {visibleDeaths.length} records
        </span>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Death records */}
        <div className="space-y-3 lg:col-span-2">
          {records.length === 0 ? (
            <ArchiveNote>
              No death records match at this clearance. The ledger stays empty
              until the story fills it.
            </ArchiveNote>
          ) : (
            records.map((d, i) => (
              <DeathRow key={d.id} record={d} ch={ch} index={i} />
            ))
          )}
        </div>

        {/* Still unaccounted for */}
        <div>
          <Panel label="Open cases" title="Still unaccounted for">
            {census.unaccounted.length === 0 ? (
              <ArchiveNote>
                Every person on record is accounted for at this clearance.
              </ArchiveNote>
            ) : (
              <div>
                {census.unaccounted.map(({ c, st }) => (
                  <div
                    key={c.id}
                    className="flex items-center gap-2.5 border-b border-line/60 py-1.5 last:border-0"
                  >
                    <Monogram characterId={c.id} size="sm" />
                    <div className="min-w-0 flex-1">
                      <EntityLink id={c.id} />
                      <div className="truncate text-xs text-muted">
                        {c.role}
                      </div>
                    </div>
                    <StatusChip status={st} />
                  </div>
                ))}
              </div>
            )}
          </Panel>
          <div className="mt-4">
            <SectionHeading>Archive note</SectionHeading>
            <p className="text-xs text-faint">
              A record enters this ledger only once the manga confirms or
              reveals the death. Suspected killers carry a warning badge until
              the record is closed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DeathRow({
  record,
  ch,
  index,
}: {
  record: DeathRecord;
  ch: number;
  index: number;
}) {
  const relatedMysteries = (record.mysteryIds ?? [])
    .map((mid) => mysteryLookup.get(mid))
    .filter((m): m is Mystery => Boolean(m && m.introducedCh <= ch));

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: Math.min(index, 8) * 0.04 }}
      className="dossier corner-ticks border-l-2 p-4"
      style={{ borderLeftColor: "var(--blood)" }}
    >
      <div className="flex flex-wrap items-center gap-3">
        <Monogram characterId={record.victimId} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-2">
            <EntityLink
              id={record.victimId}
              className="royal-heading text-lg"
            />
            <ChapterRef ch={record.chapter} />
            {record.revealCh !== undefined &&
              record.revealCh !== record.chapter && (
                <span className="font-mono text-[9px] uppercase tracking-widest text-faint">
                  revealed ch.{record.revealCh}
                </span>
              )}
          </div>
          <div className="text-xs text-muted">
            {characterById.get(record.victimId)?.role ?? "Identity unresolved"}
          </div>
        </div>
        <ConfidenceBadge level={record.confidence} />
      </div>

      <div className="mt-3">
        <DataRow label="Method">{record.method}</DataRow>
        <DataRow label="Location">
          {record.locationId ? (
            <Link
              href={`/map?location=${record.locationId}`}
              className="text-teal hover:text-gold-bright"
            >
              {locationById.get(record.locationId)?.name ?? record.locationId}
            </Link>
          ) : (
            <span className="text-faint">Not on record</span>
          )}
        </DataRow>
        <DataRow label="Killer">
          {record.killerId ? (
            <EntityLink id={record.killerId} />
          ) : (record.suspectedKillerIds ?? []).length > 0 ? (
            <span className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[9px] uppercase tracking-widest text-warn">
                suspected
              </span>
              <EntityList ids={record.suspectedKillerIds ?? []} />
            </span>
          ) : record.killerName ? (
            <span className="text-parchment">{record.killerName}</span>
          ) : (
            <span className="text-faint">Unknown</span>
          )}
        </DataRow>
        {(record.witnessIds ?? []).length > 0 && (
          <DataRow label="Witnesses">
            <EntityList ids={record.witnessIds ?? []} />
          </DataRow>
        )}
        {record.princeContextId && (
          <DataRow label="Prince context">
            <EntityLink id={record.princeContextId}>
              {princeLabel(record.princeContextId)}
            </EntityLink>
          </DataRow>
        )}
        {record.investigation && (
          <DataRow label="Investigation">{record.investigation}</DataRow>
        )}
        {(record.consequences ?? []).length > 0 && (
          <DataRow label="Consequences">
            <ul className="list-inside list-disc space-y-0.5">
              {(record.consequences ?? []).map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </DataRow>
        )}
        {relatedMysteries.length > 0 && (
          <DataRow label="Open questions">
            <ul className="space-y-0.5">
              {relatedMysteries.map((m) => (
                <li key={m.id}>
                  <Link
                    href={`/mysteries#${m.id}`}
                    className="text-teal hover:text-gold-bright"
                  >
                    {m.question}
                  </Link>
                </li>
              ))}
            </ul>
          </DataRow>
        )}
      </div>
    </motion.div>
  );
}
