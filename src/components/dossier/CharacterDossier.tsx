"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { notFound } from "next/navigation";
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
  Tag,
} from "@/components/ui/kit";
import { KIND_LABEL } from "@/components/viz/RelationshipGraph";
import {
  abilitiesByUser,
  beastById,
  chapterByNumber,
  characterById,
  deathByVictim,
  eventsByParticipant,
  factById,
  factionById,
  knowledgeByCharacter,
  locationById,
  mysteries,
  princeByCharacterId,
  relationshipsFor,
  storylines,
  theories,
} from "@/lib/db";
import {
  currentIntelText,
  locationAt,
  relationshipEnded,
  relationshipVisible,
  statusAt,
} from "@/lib/spoiler";
import { useEffectiveChapter, useNexusStore } from "@/lib/store";
import type { KnowledgeState, Relationship } from "@/lib/types";

const TABS = [
  "Dossier",
  "Relationships",
  "Timeline",
  "Knowledge",
  "Nen",
  "Locations",
  "Chapters",
  "Mysteries",
  "Theories",
] as const;
type Tab = (typeof TABS)[number];

const KNOWLEDGE_STATE_LABEL: Record<KnowledgeState, string> = {
  knows: "Knows",
  suspects: "Suspects",
  "believes-false": "Believes falsely",
  misunderstands: "Misunderstands",
  observed: "Observed directly",
  "was-told": "Was told",
  hiding: "Is hiding",
  unaware: "Unaware",
  "reader-only": "Reader-only",
};

export function CharacterDossier({ id }: { id: string }) {
  const c = characterById.get(id);
  const ch = useEffectiveChapter();
  const hideTheories = useNexusStore((s) => s.hideTheories);
  const [tab, setTab] = useState<Tab>("Dossier");

  const derived = useMemo(() => {
    if (!c) return null;
    const st = statusAt(c, ch);
    const loc = locationAt(c, ch);
    const rels = relationshipsFor(c.id).filter((r) =>
      relationshipVisible(r, ch),
    );
    const targeting = rels.filter(
      (r) =>
        ["targeting", "hunting"].includes(r.kind) &&
        r.to === c.id &&
        !relationshipEnded(r, ch),
    );
    const abilityKnowers = rels.filter(
      (r) => r.kind === "knows-ability-of" && r.to === c.id,
    );
    const abilities = abilitiesByUser.get(c.id) ?? [];
    const visibleAbilities = abilities.filter((a) => a.revealCh <= ch);
    const hiddenAbilityCount = abilities.length - visibleAbilities.length;
    const evs = (eventsByParticipant.get(c.id) ?? []).filter(
      (e) => e.chapter <= ch,
    );
    const know = (knowledgeByCharacter.get(c.id) ?? []).filter(
      (k) => (k.revealCh ?? k.sinceCh) <= ch,
    );
    const myMysteries = mysteries.filter(
      (m) => m.introducedCh <= ch && m.relatedCharacterIds?.includes(c.id),
    );
    const myTheories = theories.filter((t) =>
      t.relatedCharacterIds?.includes(c.id),
    );
    const myStorylines = storylines.filter(
      (s) => s.introducedCh <= ch && s.participantIds.includes(c.id),
    );
    const prince = princeByCharacterId.get(c.id);
    const death = deathByVictim.get(c.id);
    return {
      st,
      loc,
      rels,
      targeting,
      abilityKnowers,
      visibleAbilities,
      hiddenAbilityCount,
      evs,
      know,
      myMysteries,
      myTheories,
      myStorylines,
      prince,
      death,
    };
  }, [c, ch]);

  if (!c) notFound();
  if (c.introducedCh > ch || !derived) {
    return (
      <div className="mx-auto max-w-xl py-20 text-center">
        <div className="stamp mx-auto inline-block text-warn">
          Sealed record
        </div>
        <p className="mt-4 text-sm text-muted">
          This subject has not entered the record at chapter {ch}. Raise your
          clearance to open the file.
        </p>
      </div>
    );
  }

  const d = derived;
  const faction = c.factionIds[0]
    ? factionById.get(c.factionIds[0])
    : undefined;

  return (
    <div>
      {/* File header */}
      <div className="dossier dossier-gold corner-ticks mb-4 p-5">
        <div className="flex flex-wrap items-start gap-4">
          <Monogram characterId={c.id} size="lg" />
          <div className="min-w-0 flex-1">
            <div className="intel-label-gold">
              Personnel file · {faction?.name ?? "Unaffiliated"}
            </div>
            <h1 className="royal-heading text-3xl">{c.name}</h1>
            {c.aliases && c.aliases.length > 0 && (
              <div className="font-mono text-[11px] tracking-wider text-muted">
                a.k.a. {c.aliases.join(" · ")}
              </div>
            )}
            <div className="mt-1 text-sm text-parchment">{c.role}</div>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              {d.st && <StatusChip status={d.st.status} note={d.st.note} />}
              {d.loc && (
                <span className="text-xs text-muted">
                  Last known:{" "}
                  <Link
                    href={`/map?location=${d.loc.locationId}`}
                    className="text-teal hover:text-gold-bright"
                  >
                    {locationById.get(d.loc.locationId)?.name ??
                      d.loc.locationId}
                  </Link>
                </span>
              )}
              {(c.tags ?? [])
                // Fate-revealing tags stay sealed until the status change is on record.
                .filter(
                  (t) =>
                    t !== "victim" ||
                    d.st?.status === "dead" ||
                    d.st?.status === "presumed-dead",
                )
                .map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
            </div>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <Link
              href={`/web?focus=${c.id}`}
              className="border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-teal hover:border-gold-line hover:text-gold-bright"
            >
              Focus in web
            </Link>
            <Link
              href={`/compare?type=characters&a=${c.id}`}
              className="border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-teal hover:border-gold-line hover:text-gold-bright"
            >
              Compare
            </Link>
            {d.prince && (
              <Link
                href={`/princes/${d.prince.id}`}
                className="border border-gold-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-gold hover:text-gold-bright"
              >
                Royal profile
              </Link>
            )}
          </div>
        </div>
        {d.targeting.length > 0 && (
          <div className="mt-3 border-t border-line pt-2 text-sm">
            <span className="stamp mr-3 inline-block text-[10px] text-blood-bright">
              Under threat
            </span>
            <span className="text-muted">Currently targeted by </span>
            {d.targeting.map((r, i) => (
              <span key={r.id}>
                {i > 0 && <span className="text-faint"> · </span>}
                <EntityLink id={r.from} />
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="mb-4 flex flex-wrap gap-1 border-b border-line">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`-mb-px border-b-2 px-3 py-2 font-mono text-[11px] uppercase tracking-widest transition-colors ${
              tab === t
                ? "border-gold text-gold-bright"
                : "border-transparent text-muted hover:text-parchment"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.15 }}
        >
          {tab === "Dossier" && <DossierTab c={c} d={d} ch={ch} />}
          {tab === "Relationships" && <RelationshipsTab c={c} d={d} ch={ch} />}
          {tab === "Timeline" && <TimelineTab d={d} />}
          {tab === "Knowledge" && <KnowledgeTab d={d} />}
          {tab === "Nen" && <NenTab c={c} d={d} ch={ch} />}
          {tab === "Locations" && <LocationsTab c={c} ch={ch} />}
          {tab === "Chapters" && <ChaptersTab c={c} ch={ch} />}
          {tab === "Mysteries" && <MysteriesTab d={d} ch={ch} />}
          {tab === "Theories" && (
            <TheoriesTab d={d} ch={ch} hideTheories={hideTheories} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

interface Derived {
  st: ReturnType<typeof statusAt>;
  loc: ReturnType<typeof locationAt>;
  rels: Relationship[];
  targeting: Relationship[];
  abilityKnowers: Relationship[];
  visibleAbilities: NonNullable<ReturnType<typeof abilitiesByUser.get>>;
  hiddenAbilityCount: number;
  evs: NonNullable<ReturnType<typeof eventsByParticipant.get>>;
  know: NonNullable<ReturnType<typeof knowledgeByCharacter.get>>;
  myMysteries: typeof mysteries;
  myTheories: typeof theories;
  myStorylines: typeof storylines;
  prince: ReturnType<typeof princeByCharacterId.get>;
  death: ReturnType<typeof deathByVictim.get>;
}

type Char = NonNullable<ReturnType<typeof characterById.get>>;

function DossierTab({ c, d, ch }: { c: Char; d: Derived; ch: number }) {
  const objectives = (c.objectives ?? []).filter((o) => o.revealCh <= ch);
  const secrets = (c.secrets ?? []).filter((s) => s.revealCh <= ch);
  const beliefs = (c.falseBeliefs ?? []).filter(
    (b) => b.ch <= ch && (b.endCh === undefined || b.endCh > ch),
  );
  const possessions = (c.possessions ?? []).filter((p) => p.revealCh <= ch);

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        <Panel label="Assessment" title="Summary">
          {currentIntelText(c.bio, ch) ? (
            <p className="text-sm leading-relaxed text-parchment">
              {currentIntelText(c.bio, ch)}
            </p>
          ) : (
            <ArchiveNote>
              Current-state assessment sealed at this clearance. Cleared addenda
              appear below.
            </ArchiveNote>
          )}
          {(c.bioReveals ?? [])
            .filter((b) => b.revealCh <= ch)
            .map((b) => (
              <p
                key={b.revealCh}
                className="mt-3 border-l-2 border-gold-line pl-3 text-sm leading-relaxed text-parchment"
              >
                <span className="intel-label-gold mr-2">
                  Addendum ch.{b.revealCh}
                </span>
                {b.text}
              </p>
            ))}
          {c.incomplete && (
            <div className="mt-3">
              <ArchiveNote>
                Partial file — the source material has not yet supplied the
                missing sections.
              </ArchiveNote>
            </div>
          )}
        </Panel>

        {objectives.length > 0 && (
          <Panel label="Operational analysis" title="Objectives">
            <div className="space-y-2">
              {objectives.map((o) => (
                <div key={o.text} className="flex items-start gap-2.5">
                  <span
                    className="mt-0.5 shrink-0 border px-1.5 py-px font-mono text-[9px] uppercase tracking-widest"
                    style={{
                      color:
                        o.kind === "hidden"
                          ? "var(--violet)"
                          : o.kind === "suspected"
                            ? "var(--warn)"
                            : "var(--teal)",
                      borderColor:
                        "color-mix(in srgb, currentColor 35%, transparent)",
                    }}
                  >
                    {o.kind}
                  </span>
                  <span className="text-sm text-parchment">
                    {o.text}
                    {o.status && o.status !== "active" && (
                      <span className="ml-2 font-mono text-[10px] uppercase tracking-widest text-faint">
                        [{o.status}]
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </Panel>
        )}

        {secrets.length > 0 && (
          <Panel label="Compartmented" title="Known secrets" gold>
            <div className="space-y-3">
              {secrets.map((s) => (
                <div key={s.text} className="border-l-2 border-gold-line pl-3">
                  <p className="text-sm text-parchment">{s.text}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted">
                    <span>Revealed</span> <ChapterRef ch={s.revealCh} />
                    {s.knownBy && s.knownBy.length > 0 && (
                      <>
                        <span>· In-world known to</span>
                        <EntityList ids={s.knownBy} />
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        )}

        {beliefs.length > 0 && (
          <Panel label="Counter-intelligence" title="False beliefs held">
            <div className="space-y-2.5">
              {beliefs.map((b) => (
                <div key={b.text}>
                  <p className="text-sm text-parchment">
                    <span className="mr-2 font-mono text-[10px] uppercase tracking-widest text-warn">
                      believes
                    </span>
                    {b.text}
                  </p>
                  {b.truth && (
                    <p className="mt-0.5 pl-4 text-xs text-muted">
                      Reality: {b.truth}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Panel>
        )}
      </div>

      <div className="space-y-4">
        <Panel label="File data" title="Particulars">
          <DataRow label="Affiliation">
            <EntityList ids={c.factionIds} />
          </DataRow>
          {c.servesPrinceId && (
            <DataRow label="Serves">
              <EntityLink id={c.servesPrinceId} />
            </DataRow>
          )}
          {c.superiorId && (
            <DataRow label="Superior">
              <EntityLink id={c.superiorId} />
            </DataRow>
          )}
          <DataRow label="Nen type">
            {c.nenType && (c.nenTypeRevealCh ?? 0) <= ch ? (
              <span className="capitalize">{c.nenType}</span>
            ) : (
              <span className="text-faint">Not on record</span>
            )}
          </DataRow>
          <DataRow label="Introduced">
            <ChapterRef ch={c.introducedCh} />
          </DataRow>
          {d.death && (d.death.revealCh ?? d.death.chapter) <= ch && (
            <DataRow label="Death record">
              <Link
                href="/deaths"
                className="text-blood-bright hover:text-gold-bright"
              >
                Ch.{d.death.chapter} — {d.death.method}
              </Link>
            </DataRow>
          )}
          {possessions.length > 0 && (
            <DataRow label="Possessions">
              <ul className="list-inside list-disc space-y-0.5">
                {possessions.map((p) => (
                  <li key={p.text}>{p.text}</li>
                ))}
              </ul>
            </DataRow>
          )}
        </Panel>

        {d.myStorylines.length > 0 && (
          <Panel label="Threads" title="Connected storylines">
            <ul className="space-y-1.5">
              {d.myStorylines.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/storylines/${s.id}`}
                    className="flex items-center gap-2 text-sm text-parchment hover:text-gold-bright"
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: s.color }}
                    />
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Panel>
        )}

        {d.abilityKnowers.length > 0 && (
          <Panel label="Exposure" title="Who knows their Nen">
            <ul className="space-y-1">
              {d.abilityKnowers.map((r) => (
                <li
                  key={r.id}
                  className="flex items-baseline justify-between text-sm"
                >
                  <EntityLink id={r.from} />
                  <ChapterRef ch={r.revealCh} />
                </li>
              ))}
            </ul>
          </Panel>
        )}
      </div>
    </div>
  );
}

const REL_GROUPS: { label: string; kinds: string[] }[] = [
  { label: "Kinship & court", kinds: ["family", "romantic"] },
  {
    label: "Chain of command",
    kinds: ["serves", "commands", "hired", "member-of", "former-member-of"],
  },
  {
    label: "Protection & trust",
    kinds: ["protects", "trusts", "mentoring", "teaching-nen"],
  },
  { label: "Alliances", kinds: ["allied", "secret-alliance", "negotiating"] },
  { label: "Hostilities", kinds: ["enemy", "hunting", "targeting", "killed"] },
  {
    label: "Suspicion & surveillance",
    kinds: [
      "suspects",
      "distrusts",
      "monitoring",
      "manipulating",
      "blackmailing",
    ],
  },
  {
    label: "Information",
    kinds: ["knows-identity-of", "knows-ability-of", "hiding-info-from"],
  },
  {
    label: "Control & position",
    kinds: ["possessed-by", "controlled-by", "located-with"],
  },
];

function RelationshipsTab({ c, d, ch }: { c: Char; d: Derived; ch: number }) {
  if (d.rels.length === 0)
    return (
      <ArchiveNote>No mapped relationships at this clearance.</ArchiveNote>
    );
  return (
    <div className="space-y-5">
      {REL_GROUPS.map((g) => {
        const rows = d.rels.filter((r) => g.kinds.includes(r.kind));
        if (rows.length === 0) return null;
        return (
          <div key={g.label}>
            <SectionHeading>{g.label}</SectionHeading>
            <div className="grid gap-2 lg:grid-cols-2">
              {rows.map((r) => {
                const other = r.from === c.id ? r.to : r.from;
                const outgoing = r.from === c.id;
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
                      {!r.mutualAwareness && (
                        <span className="font-mono text-[9px] uppercase tracking-widest text-faint">
                          one-sided
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
                      <Link
                        href={`/web?focus=${other}`}
                        className="ml-auto font-mono text-[9px] uppercase tracking-widest text-teal hover:text-gold-bright"
                      >
                        Web →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function TimelineTab({ d }: { d: Derived }) {
  if (d.evs.length === 0)
    return <ArchiveNote>No recorded incidents at this clearance.</ArchiveNote>;
  return (
    <ol className="relative ml-3 space-y-4 border-l border-line pl-5">
      {d.evs.map((e) => (
        <li key={e.id} className="relative">
          <span className="absolute -left-[26px] top-1.5 h-2 w-2 rounded-full border border-gold-dim bg-panel" />
          <div className="flex flex-wrap items-baseline gap-2">
            <ChapterRef ch={e.chapter} />
            <span className="text-sm text-ivory">{e.title}</span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-faint">
              {e.kind}
            </span>
          </div>
          <p className="mt-0.5 text-xs text-muted">{e.summary}</p>
        </li>
      ))}
    </ol>
  );
}

function KnowledgeTab({ d }: { d: Derived }) {
  if (d.know.length === 0)
    return (
      <ArchiveNote>
        No tracked intelligence holdings at this clearance.
      </ArchiveNote>
    );
  const grouped = new Map<KnowledgeState, typeof d.know>();
  for (const k of d.know) {
    const list = grouped.get(k.state) ?? [];
    list.push(k);
    grouped.set(k.state, list);
  }
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {[...grouped.entries()].map(([state, rows]) => (
        <Panel
          key={state}
          label="Intelligence holding"
          title={KNOWLEDGE_STATE_LABEL[state]}
        >
          <ul className="space-y-2">
            {rows.map((k) => {
              const fact = factById.get(k.factId);
              return (
                <li key={`${k.factId}-${k.state}`}>
                  <Link
                    href={`/knowledge?fact=${k.factId}`}
                    className="text-sm text-parchment hover:text-gold-bright"
                  >
                    {fact?.label ?? k.factId}
                  </Link>
                  <div className="text-xs text-muted">
                    since <ChapterRef ch={k.sinceCh} />
                    {k.note && <span> — {k.note}</span>}
                  </div>
                </li>
              );
            })}
          </ul>
        </Panel>
      ))}
    </div>
  );
}

function NenTab({ c, d, ch }: { c: Char; d: Derived; ch: number }) {
  const prince = d.prince;
  const beast = prince?.beastId ? beastById.get(prince.beastId) : undefined;
  return (
    <div className="space-y-4">
      {d.visibleAbilities.length === 0 &&
        d.hiddenAbilityCount === 0 &&
        !beast && (
          <ArchiveNote>No Nen file exists for this subject.</ArchiveNote>
        )}
      {d.visibleAbilities.map((a) => (
        <Panel
          key={a.id}
          label={`Nen research file · ${a.nenType}`}
          title={a.name}
        >
          <p className="text-sm text-parchment">{a.description}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <ConfidenceBadge level={a.confidence} />
            <ChapterRef ch={a.revealCh} />
            <Link
              href={`/nen/${a.id}`}
              className="font-mono text-[10px] uppercase tracking-widest text-teal hover:text-gold-bright"
            >
              Full technical file →
            </Link>
          </div>
        </Panel>
      ))}
      {d.hiddenAbilityCount > 0 && (
        <ArchiveNote>
          {d.hiddenAbilityCount} ability file(s) sealed beyond chapter {ch}.
        </ArchiveNote>
      )}
      {beast && beast.firstSeenCh <= ch && (
        <Panel label="Guardian spirit beast" title={`Beast of ${c.name}`} gold>
          <p className="text-sm text-parchment">{beast.appearance}</p>
          <p className="mt-1 text-xs text-muted">{beast.behaviorNote}</p>
          <div className="mt-2 flex items-center gap-2">
            <ConfidenceBadge level={beast.confidence} />
            <ChapterRef ch={beast.firstSeenCh} />
            {beast.abilityId && (
              <Link
                href={`/nen/${beast.abilityId}`}
                className="font-mono text-[10px] uppercase tracking-widest text-teal hover:text-gold-bright"
              >
                Observed effects →
              </Link>
            )}
          </div>
        </Panel>
      )}
      {d.abilityKnowers.length > 0 && (
        <Panel
          label="Exposure register"
          title="Everyone who knows their ability"
        >
          <ul className="grid gap-1 sm:grid-cols-2">
            {d.abilityKnowers.map((r) => (
              <li
                key={r.id}
                className="flex items-baseline justify-between text-sm"
              >
                <EntityLink id={r.from} />
                <span className="flex items-center gap-2">
                  {!r.confirmed && (
                    <span className="font-mono text-[9px] uppercase text-warn">
                      suspected
                    </span>
                  )}
                  <ChapterRef ch={r.revealCh} />
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      )}
    </div>
  );
}

function LocationsTab({ c, ch }: { c: Char; ch: number }) {
  const trail = c.locationHistory
    .filter((l) => (l.revealCh ?? l.ch) <= ch)
    .sort((a, b) => b.ch - a.ch);
  if (trail.length === 0)
    return <ArchiveNote>No movement records at this clearance.</ArchiveNote>;
  return (
    <ol className="relative ml-3 space-y-4 border-l border-line pl-5">
      {trail.map((l, i) => {
        const loc = locationById.get(l.locationId);
        return (
          <li key={`${l.ch}-${l.locationId}`} className="relative">
            <span
              className={`absolute -left-[26px] top-1.5 h-2 w-2 rounded-full border ${
                i === 0
                  ? "border-gold bg-gold/40"
                  : "border-line-strong bg-panel"
              }`}
            />
            <div className="flex flex-wrap items-baseline gap-2">
              <ChapterRef ch={l.ch} />
              <Link
                href={`/map?location=${l.locationId}&ch=${l.revealCh ?? l.ch}`}
                className="text-sm text-teal hover:text-gold-bright"
              >
                {loc?.name ?? l.locationId}
              </Link>
              {i === 0 && (
                <span className="font-mono text-[9px] uppercase tracking-widest text-gold">
                  current
                </span>
              )}
              {loc && loc.canonicity !== "canonical" && (
                <span className="font-mono text-[9px] uppercase tracking-widest text-faint">
                  {loc.canonicity}
                </span>
              )}
            </div>
            {l.note && <p className="text-xs text-muted">{l.note}</p>}
          </li>
        );
      })}
    </ol>
  );
}

function ChaptersTab({ c, ch }: { c: Char; ch: number }) {
  const apps = (c.chapterAppearances ?? []).filter((n) => n <= ch);
  if (apps.length === 0)
    return <ArchiveNote>No chapter appearances at this clearance.</ArchiveNote>;
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {apps.map((n) => {
        const info = chapterByNumber.get(n);
        return (
          <Link
            key={n}
            href={`/chapters/${n}`}
            className="dossier group p-3 transition-colors hover:border-gold-line"
          >
            <div className="font-mono text-[10px] tracking-widest text-gold">
              CH.{n}
            </div>
            <div className="text-sm text-ivory group-hover:text-gold-bright">
              {info?.title ?? "Not individually indexed"}
            </div>
            {info && (
              <p className="mt-1 line-clamp-2 text-xs text-muted">
                {info.summary}
              </p>
            )}
          </Link>
        );
      })}
    </div>
  );
}

function MysteriesTab({ d, ch }: { d: Derived; ch: number }) {
  if (d.myMysteries.length === 0)
    return <ArchiveNote>No open questions attach to this file.</ArchiveNote>;
  return (
    <div className="space-y-3">
      {d.myMysteries.map((m) => (
        <Link
          key={m.id}
          href={`/mysteries#${m.id}`}
          className="dossier block p-3 transition-colors hover:border-gold-line"
        >
          <div className="text-sm text-ivory">{m.question}</div>
          <p className="mt-1 line-clamp-2 text-xs text-muted">
            {currentIntelText(m.summary, ch) ??
              "Current-state case summary sealed."}
          </p>
          <div className="mt-1.5 flex items-center gap-2">
            <ChapterRef ch={m.introducedCh} />
          </div>
        </Link>
      ))}
    </div>
  );
}

function TheoriesTab({
  d,
  ch,
  hideTheories,
}: {
  d: Derived;
  ch: number;
  hideTheories: boolean;
}) {
  if (hideTheories)
    return (
      <ArchiveNote>
        Theory content is globally hidden in your preferences (Theory Room →
        visibility).
      </ArchiveNote>
    );
  if (d.myTheories.length === 0)
    return (
      <ArchiveNote>No analyst hypotheses attach to this file.</ArchiveNote>
    );
  return (
    <div className="space-y-3">
      {d.myTheories.map((t) => (
        <Link
          key={t.id}
          href={`/theories#${t.id}`}
          className="dossier block border-l-2 border-l-violet p-3 transition-colors hover:border-gold-line"
        >
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-[9px] uppercase tracking-widest text-violet">
              theory
            </span>
            <span className="text-sm text-ivory">{t.claim}</span>
          </div>
          <p className="mt-1 line-clamp-2 text-xs text-muted">
            {currentIntelText(t.summary, ch) ??
              "Current-state analysis sealed."}
          </p>
        </Link>
      ))}
    </div>
  );
}
