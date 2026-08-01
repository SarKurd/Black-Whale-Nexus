"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useMemo } from "react";
import { ordinal, RISK_COLOR, riskAt } from "@/components/princes/shared";
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
import {
  abilityById,
  beastById,
  characterById,
  locationById,
  mysteryById,
  princeById,
  princes,
} from "@/lib/db";
import { currentIntelText, locationAt, statusAt } from "@/lib/spoiler";
import { useEffectiveChapter } from "@/lib/store";
import type { Character, Mystery, Prince } from "@/lib/types";
import { ARC_START } from "@/lib/types";

export function PrinceProfile({ id }: { id: string }) {
  const p = princeById.get(id);
  const ch = useEffectiveChapter();

  const derived = useMemo(() => {
    if (!p) return null;
    const c = characterById.get(p.characterId);
    const st = c ? statusAt(c, ch) : undefined;
    const loc = c ? locationAt(c, ch) : undefined;
    const guards = p.guardCharacterIds
      .map((gid) => characterById.get(gid))
      .filter((g): g is Character => !!g && g.introducedCh <= ch)
      .map((g) => ({ g, st: statusAt(g, ch) }));
    const guardsAlive = guards.filter((x) => x.st?.status === "alive").length;
    const hunters = (p.hunterCharacterIds ?? []).filter(
      (hid) => (characterById.get(hid)?.introducedCh ?? 0) <= ch,
    );
    const beast = p.beastId ? beastById.get(p.beastId) : undefined;
    const beastSeen = !!beast && beast.firstSeenCh <= ch;
    const personalAbility = p.personalAbilityId
      ? abilityById.get(p.personalAbilityId)
      : undefined;
    const personalRevealed =
      !!personalAbility && personalAbility.revealCh <= ch;
    const objectives = p.currentObjective.filter((o) => o.revealCh <= ch);
    const vulnerabilities = p.vulnerabilities.filter((v) => v.revealCh <= ch);
    const risks = [...p.riskHistory]
      .filter((r) => r.ch <= ch)
      .sort((a, b) => b.ch - a.ch);
    const developments = [...p.developments]
      .filter((d) => d.ch <= ch)
      .sort((a, b) => b.ch - a.ch);
    // Casts guard against degraded inference while @/data modules are still
    // being authored — the runtime shapes are exactly these types.
    const linkedMysteries = (p.mysteryIds ?? [])
      .map((mid) => (mysteryById as Map<string, Mystery>).get(mid))
      .filter((m): m is Mystery => !!m && m.introducedCh <= ch);
    const siblings = (princes as Prince[])
      .filter((other) => other.id !== p.id)
      .sort((a, b) => a.rank - b.rank);
    const currentRisk = riskAt(p, ch);
    return {
      c,
      st,
      loc,
      guards,
      guardsAlive,
      hunters,
      beast,
      beastSeen,
      personalAbility,
      personalRevealed,
      objectives,
      vulnerabilities,
      risks,
      developments,
      linkedMysteries,
      siblings,
      currentRisk,
    };
  }, [p, ch]);

  if (!p) notFound();

  // Sealed treatment — anime-only clearance, or the prince is not yet on record.
  if (
    ch < ARC_START ||
    !derived ||
    (derived.c && derived.c.introducedCh > ch)
  ) {
    return (
      <div className="mx-auto max-w-xl py-20 text-center">
        <div className="stamp mx-auto inline-block text-warn">
          Sealed record
        </div>
        <p className="mt-4 text-sm text-muted">
          This royal file has not entered the record at chapter {ch}. Raise your
          clearance to open the profile.
        </p>
      </div>
    );
  }

  const d = derived;
  const name = d.c?.name ?? p.characterId;
  const location = d.loc ? locationById.get(d.loc.locationId) : undefined;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Royal file header */}
      <div className="archive-record-header dossier dossier-gold corner-ticks mb-4 p-5">
        <div className="flex items-start gap-4">
          <Monogram characterId={p.characterId} size="lg" />
          <div className="min-w-0 flex-1">
            <div className="intel-label-gold">
              Royal file · {ordinal(p.rank)} Prince of Kakin
            </div>
            <h1 className="royal-heading break-words text-2xl sm:text-3xl">
              {name}
            </h1>
            <div className="mt-1 text-sm text-parchment">
              Born to{" "}
              {p.motherCharacterId ? (
                <EntityLink id={p.motherCharacterId}>{p.motherName}</EntityLink>
              ) : (
                p.motherName
              )}
              {p.queenRank && (
                <span className="text-muted">
                  {" "}
                  · {ordinal(p.queenRank)} Queen
                </span>
              )}
            </div>
            {p.siblingNote && (
              <div className="mt-0.5 text-xs text-muted">{p.siblingNote}</div>
            )}
            <div className="mt-2 flex flex-wrap items-center gap-3">
              {d.st && <StatusChip status={d.st.status} note={d.st.note} />}
              {d.currentRisk && (
                <span
                  className="font-mono text-[10px] uppercase tracking-widest"
                  style={{ color: RISK_COLOR[d.currentRisk.risk] }}
                  title={d.currentRisk.why}
                >
                  risk: {d.currentRisk.risk}
                </span>
              )}
              {d.loc && (
                <span className="text-xs text-muted">
                  Last known:{" "}
                  <Link
                    href={`/map?location=${d.loc.locationId}`}
                    className="text-teal hover:text-gold-bright"
                  >
                    {location?.name ?? d.loc.locationId}
                  </Link>
                </span>
              )}
            </div>
          </div>
        </div>
        <nav
          aria-label="Prince file actions"
          className="mt-4 grid grid-cols-2 gap-2 border-t border-line/60 pt-3 sm:flex sm:justify-end"
        >
          <Link
            href={`/characters/${p.characterId}`}
            className="col-span-2 border border-gold-line px-2.5 py-1.5 text-center font-mono text-[10px] uppercase tracking-widest text-gold hover:text-gold-bright sm:col-auto"
          >
            Personnel dossier
          </Link>
          <Link
            href={`/web?focus=${p.characterId}`}
            className="border border-line px-2.5 py-1.5 text-center font-mono text-[10px] uppercase tracking-widest text-teal hover:border-gold-line hover:text-gold-bright"
          >
            Focus in web
          </Link>
          <Link
            href={`/compare?type=princes&a=${p.id}`}
            className="border border-line px-2.5 py-1.5 text-center font-mono text-[10px] uppercase tracking-widest text-teal hover:border-gold-line hover:text-gold-bright"
          >
            Compare
          </Link>
        </nav>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Main column */}
        <div className="space-y-4 lg:col-span-2">
          <Panel label="Campaign posture" title="Strategy">
            <DataRow label="Public">
              {currentIntelText(p.publicStrategy, ch) ?? (
                <span className="text-faint">
                  Current-state analysis sealed
                </span>
              )}
            </DataRow>
            {p.hiddenStrategy && p.hiddenStrategy.revealCh <= ch && (
              <DataRow label="Hidden">
                <span className="block border-l-2 border-violet pl-2.5">
                  <span className="mr-2 font-mono text-[9px] uppercase tracking-widest text-violet">
                    compartmented
                  </span>
                  <span className="text-violet">{p.hiddenStrategy.text}</span>
                  <span className="ml-2">
                    <ChapterRef ch={p.hiddenStrategy.revealCh} />
                  </span>
                </span>
              </DataRow>
            )}
            <div className="mt-3">
              <SectionHeading>Current objectives</SectionHeading>
              {d.objectives.length === 0 ? (
                <ArchiveNote>
                  No stated objectives at this clearance.
                </ArchiveNote>
              ) : (
                <ul className="space-y-1.5">
                  {d.objectives.map((o) => (
                    <li key={o.text} className="flex items-baseline gap-2.5">
                      <ChapterRef ch={o.revealCh} />
                      <span className="text-sm text-parchment">{o.text}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Panel>

          <Panel label="Analyst evaluation" title="Assessment">
            <DataRow label="Political">
              {currentIntelText(p.assessment.political, ch) ?? "Sealed"}
            </DataRow>
            <DataRow label="Military">
              {currentIntelText(p.assessment.military, ch) ?? "Sealed"}
            </DataRow>
            <DataRow label="Nen">
              {currentIntelText(p.assessment.nen, ch) ?? "Sealed"}
            </DataRow>
            <DataRow label="Intelligence">
              {currentIntelText(p.assessment.intelligence, ch) ?? "Sealed"}
            </DataRow>
          </Panel>

          <Panel label="Nen research file" title="Guardian spirit beast" gold>
            {d.beast && d.beastSeen ? (
              <>
                <p className="text-sm text-parchment">{d.beast.appearance}</p>
                <p className="mt-1 text-xs text-muted">
                  {d.beast.behaviorNote}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <ConfidenceBadge level={d.beast.confidence} />
                  <ChapterRef ch={d.beast.firstSeenCh} />
                  <span className="font-mono text-[9px] uppercase tracking-widest text-muted">
                    {d.beast.status}
                  </span>
                  {d.beast.abilityId && (
                    <Link
                      href={`/nen/${d.beast.abilityId}`}
                      className="font-mono text-[10px] uppercase tracking-widest text-teal hover:text-gold-bright"
                    >
                      Observed effects →
                    </Link>
                  )}
                </div>
                {d.beast.statusNote && (
                  <p className="mt-2 text-xs text-muted">
                    {d.beast.statusNote}
                  </p>
                )}
              </>
            ) : (
              <ArchiveNote>
                No manifestation on record at this clearance.
              </ArchiveNote>
            )}
          </Panel>

          {d.personalAbility && d.personalRevealed && (
            <Panel
              label={`Nen research file · ${d.personalAbility.nenType}`}
              title={d.personalAbility.name}
            >
              <p className="text-sm text-parchment">
                {d.personalAbility.description}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <ConfidenceBadge level={d.personalAbility.confidence} />
                <ChapterRef ch={d.personalAbility.revealCh} />
                <Link
                  href={`/nen/${d.personalAbility.id}`}
                  className="font-mono text-[10px] uppercase tracking-widest text-teal hover:text-gold-bright"
                >
                  Full technical file →
                </Link>
              </div>
            </Panel>
          )}

          <Panel label="Threat assessment" title="Risk ledger">
            {d.risks.length === 0 ? (
              <ArchiveNote>
                No risk assessments filed at this clearance.
              </ArchiveNote>
            ) : (
              <ol className="relative ml-3 space-y-4 border-l border-line pl-5">
                {d.risks.map((r) => (
                  <li key={`${r.ch}-${r.risk}`} className="relative">
                    <span
                      className="absolute -left-[26px] top-1.5 h-2 w-2 rounded-full border bg-panel"
                      style={{ borderColor: RISK_COLOR[r.risk] }}
                    />
                    <div className="flex flex-wrap items-baseline gap-2">
                      <ChapterRef ch={r.ch} />
                      <span
                        className="font-mono text-[10px] uppercase tracking-widest"
                        style={{ color: RISK_COLOR[r.risk] }}
                      >
                        {r.risk}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-muted">{r.why}</p>
                  </li>
                ))}
              </ol>
            )}
          </Panel>

          <Panel label="Voyage recorder" title="Developments">
            {d.developments.length === 0 ? (
              <ArchiveNote>
                No developments filed at this clearance.
              </ArchiveNote>
            ) : (
              <ol className="space-y-2.5">
                {d.developments.map((dev) => (
                  <li key={`${dev.ch}-${dev.text}`} className="flex gap-3">
                    <ChapterRef ch={dev.ch} />
                    <span className="min-w-0 text-sm text-parchment">
                      {dev.text}
                    </span>
                  </li>
                ))}
              </ol>
            )}
          </Panel>
        </div>

        {/* Side column */}
        <div className="space-y-4">
          <Panel label="Household" title="Retinue">
            <DataRow label="Guards">
              <span
                className="font-mono text-sm tabular-nums"
                style={{
                  color:
                    d.guardsAlive < p.guardsOriginal
                      ? "var(--warn)"
                      : "var(--parchment)",
                }}
              >
                {d.guardsAlive}/{p.guardsOriginal}
              </span>{" "}
              <span className="text-xs text-muted">remaining / original</span>
            </DataRow>
            {d.guards.length === 0 ? (
              <div className="mt-2">
                <ArchiveNote>No guard roster at this clearance.</ArchiveNote>
              </div>
            ) : (
              <ul className="mt-2 space-y-1">
                {d.guards.map(({ g, st }) => {
                  const fallen =
                    st?.status === "dead" || st?.status === "presumed-dead";
                  return (
                    <li
                      key={g.id}
                      className="flex items-baseline justify-between gap-2 border-b border-line/60 py-1 last:border-0"
                    >
                      <EntityLink
                        id={g.id}
                        className={fallen ? "line-through opacity-60" : ""}
                      />
                      {st && <StatusChip status={st.status} note={st.note} />}
                    </li>
                  );
                })}
              </ul>
            )}
            {d.hunters.length > 0 && (
              <div className="mt-3">
                <SectionHeading>Hunters assigned</SectionHeading>
                <ul className="space-y-1">
                  {d.hunters.map((hid) => (
                    <li key={hid} className="text-sm">
                      <EntityLink id={hid} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Panel>

          <Panel label="Counter-intelligence" title="Vulnerabilities">
            {d.vulnerabilities.length === 0 ? (
              <ArchiveNote>No exploitable weaknesses on file.</ArchiveNote>
            ) : (
              <ul className="space-y-2">
                {d.vulnerabilities.map((v) => (
                  <li key={v.text} className="border-l-2 border-warn/60 pl-2.5">
                    <p className="text-sm text-parchment">{v.text}</p>
                    <ChapterRef ch={v.revealCh} />
                  </li>
                ))}
              </ul>
            )}
          </Panel>

          {d.linkedMysteries.length > 0 && (
            <Panel label="Open questions" title="Connected mysteries">
              <ul className="space-y-2">
                {d.linkedMysteries.map((m) => (
                  <li key={m.id}>
                    <Link
                      href={`/mysteries#${m.id}`}
                      className="text-sm text-ivory hover:text-gold-bright"
                    >
                      {m.question}
                    </Link>
                    <p className="line-clamp-2 text-xs text-muted">
                      {m.summary}
                    </p>
                  </li>
                ))}
              </ul>
            </Panel>
          )}
        </div>
      </div>

      {/* Siblings strip */}
      <div className="mt-6">
        <SectionHeading>The royal line</SectionHeading>
        <div className="flex flex-wrap gap-1.5">
          {d.siblings.map((sib) => (
            <Link
              key={sib.id}
              href={`/princes/${sib.id}`}
              className="border border-line px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-muted transition-colors hover:border-gold-line hover:text-gold-bright"
            >
              <span className="mr-1.5 text-gold-dim">{ordinal(sib.rank)}</span>
              {characterById.get(sib.characterId)?.name ?? sib.characterId}
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
