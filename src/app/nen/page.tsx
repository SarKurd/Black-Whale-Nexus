"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useMemo } from "react";
import {
  ArchiveNote,
  ChapterRef,
  ConfidenceBadge,
  EntityLink,
  SectionHeading,
  Tag,
} from "@/components/ui/kit";
import { characters } from "@/data/characters";
import { beasts, nenAbilities } from "@/data/nen";
import { useEffectiveChapter } from "@/lib/store";
import type {
  AbilityKind,
  GuardianBeast,
  NenAbility,
  NenType,
} from "@/lib/types";
import { useUrlString } from "@/lib/urlState";

// The @/data modules are authored in parallel; these pins assert the intended
// element types so this file typechecks before the datasets land.
const allAbilities = nenAbilities as NenAbility[];
const allBeasts = beasts as GuardianBeast[];
const characterById = new Map(
  characters.map((character) => [character.id, character]),
);

const KIND_ORDER: { kind: AbilityKind; label: string; blurb: string }[] = [
  {
    kind: "personal",
    label: "Personal abilities",
    blurb: "Hatsu developed and wielded by the user themselves.",
  },
  {
    kind: "guardian-beast",
    label: "Guardian spirit beasts",
    blurb:
      "Parasitic protectors granted by the seed urn ceremony — one per prince.",
  },
  {
    kind: "parasitic",
    label: "Parasitic Nen",
    blurb: "Abilities that live on or in a host other than their maker.",
  },
  {
    kind: "post-mortem",
    label: "Post-mortem Nen",
    blurb: "Nen that persists — or strengthens — after its user's death.",
  },
  { kind: "curse", label: "Curses", blurb: "Malicious bindings and hexes." },
  {
    kind: "borrowed",
    label: "Borrowed abilities",
    blurb: "Powers stolen, copied, or lent from another user.",
  },
  {
    kind: "unknown",
    label: "Unclassified phenomena",
    blurb: "Observed effects whose classification is not on record.",
  },
];

const NEN_TYPES: NenType[] = [
  "enhancer",
  "transmuter",
  "emitter",
  "conjurer",
  "manipulator",
  "specialist",
  "unknown",
];

const ABILITY_STATUS_COLOR: Record<string, string> = {
  active: "var(--alive)",
  inactive: "var(--muted)",
  broken: "var(--blood)",
  unknown: "var(--faint)",
};

export default function NenPage() {
  const ch = useEffectiveChapter();
  const [typeParam, setTypeParam] = useUrlString("types", "");
  const [query, setQuery] = useUrlString("q", "");
  const typeFilter = useMemo(
    () =>
      new Set(
        typeParam
          .split(",")
          .filter((value) => NEN_TYPES.includes(value as NenType)) as NenType[],
      ),
    [typeParam],
  );

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (a: NenAbility): boolean => {
      if (typeFilter.size > 0 && !typeFilter.has(a.nenType)) return false;
      if (q.length === 0) return true;
      const userName = a.userCharacterId
        ? (characterById.get(a.userCharacterId)?.name ?? "")
        : "";
      return `${a.name} ${a.description} ${userName}`.toLowerCase().includes(q);
    };
  }, [typeFilter, query]);

  function toggleType(t: NenType) {
    const next = new Set(typeFilter);
    if (next.has(t)) next.delete(t);
    else next.add(t);
    setTypeParam(NEN_TYPES.filter((type) => next.has(type)).join(","));
  }

  const visibleBeasts = allBeasts.filter((b) => b.firstSeenCh <= ch);
  const sealedBeasts = allBeasts.length - visibleBeasts.length;

  return (
    <div>
      <div className="archive-page-header mb-6">
        <div className="intel-label-gold">Nen research archive</div>
        <h1 className="royal-heading text-3xl">Ability Files</h1>
        <p className="mt-2 max-w-3xl text-xs text-muted">
          Every observed or inferred Nen phenomenon aboard the Black Whale,
          filed by classification. Files unlock as your clearance chapter
          advances; sealed counts are shown so you know what you cannot yet
          read.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-5 flex flex-wrap items-center gap-2">
        {NEN_TYPES.map((t) => {
          const active = typeFilter.has(t);
          return (
            <button
              key={t}
              type="button"
              onClick={() => toggleType(t)}
              aria-pressed={active}
              className={`border px-2 py-1 font-mono text-[10px] uppercase tracking-widest transition-colors ${
                active
                  ? "border-gold-line text-gold-bright"
                  : "border-line text-muted hover:text-parchment"
              }`}
            >
              {t}
            </button>
          );
        })}
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search names, users, effects…"
          className="ml-auto w-56 border border-line bg-panel px-2 py-1.5 text-sm text-parchment outline-none placeholder:text-faint focus:border-gold-line"
          aria-label="Search abilities"
        />
      </div>

      <div className="space-y-8">
        {KIND_ORDER.map(({ kind, label, blurb }) => {
          const ofKind = allAbilities.filter((a) => a.kind === kind);
          if (ofKind.length === 0) return null;
          const unsealed = ofKind.filter((a) => a.revealCh <= ch);
          const sealed = ofKind.length - unsealed.length;
          const shown = unsealed.filter(matches);
          if (unsealed.length === 0 && sealed === 0) return null;
          return (
            <section key={kind}>
              <SectionHeading
                right={
                  <span className="font-mono text-[10px] text-faint">
                    {unsealed.length} on file
                  </span>
                }
              >
                {label}
              </SectionHeading>
              <p className="mb-3 text-xs text-faint">{blurb}</p>
              {shown.length > 0 && (
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {shown.map((a, index) => (
                    <AbilityCard key={a.id} ability={a} index={index} />
                  ))}
                </div>
              )}
              {shown.length === 0 && unsealed.length > 0 && (
                <ArchiveNote>No files match the current filters.</ArchiveNote>
              )}
              {sealed > 0 && (
                <div className="mt-3">
                  <ArchiveNote>
                    {sealed} file{sealed === 1 ? "" : "s"} sealed beyond current
                    clearance (chapter {ch}).
                  </ArchiveNote>
                </div>
              )}

              {/* Beast registry rides with the guardian-beast section. */}
              {kind === "guardian-beast" && (
                <div className="mt-5">
                  <div className="intel-label mb-2">
                    Beast sighting registry
                  </div>
                  {visibleBeasts.length === 0 ? (
                    <ArchiveNote>
                      No confirmed beast sightings at this clearance.
                    </ArchiveNote>
                  ) : (
                    <div className="grid gap-3 md:grid-cols-2">
                      {visibleBeasts.map((b, index) => (
                        <motion.div
                          key={b.id}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.2,
                            delay: Math.min(index, 10) * 0.03,
                          }}
                          className="dossier p-3"
                        >
                          <div className="flex flex-wrap items-baseline gap-2">
                            <span className="intel-label-gold">Beast of</span>
                            <EntityLink id={b.princeId} />
                            <span
                              className="ml-auto font-mono text-[9px] uppercase tracking-widest"
                              style={{
                                color:
                                  b.status === "destroyed"
                                    ? "var(--blood)"
                                    : b.status === "active"
                                      ? "var(--alive)"
                                      : "var(--muted)",
                              }}
                              title={b.statusNote}
                            >
                              {b.status}
                            </span>
                          </div>
                          <p className="mt-1.5 line-clamp-3 text-xs text-muted">
                            {b.appearance}
                          </p>
                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            <ConfidenceBadge level={b.confidence} />
                            <ChapterRef ch={b.firstSeenCh} />
                            {b.abilityId && (
                              <Link
                                href={`/nen/${b.abilityId}`}
                                className="ml-auto font-mono text-[10px] uppercase tracking-widest text-teal hover:text-gold-bright"
                              >
                                Observed effects →
                              </Link>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                  {sealedBeasts > 0 && (
                    <div className="mt-3">
                      <ArchiveNote>
                        {sealedBeasts} beast sighting
                        {sealedBeasts === 1 ? "" : "s"} sealed beyond current
                        clearance.
                      </ArchiveNote>
                    </div>
                  )}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}

function AbilityCard({
  ability,
  index,
}: {
  ability: NenAbility;
  index: number;
}) {
  const status = ability.status ?? "unknown";
  // One-line teaser: first sentence only (lookbehind regex needs ES2018+).
  const periodIdx = ability.description.indexOf(". ");
  const firstSentence =
    periodIdx === -1
      ? ability.description
      : ability.description.slice(0, periodIdx + 1);
  return (
    <motion.article
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: Math.min(index, 10) * 0.03 }}
      className="dossier group block min-w-0 p-3 transition-colors hover:border-gold-line"
    >
      <div className="flex items-baseline justify-between gap-2">
        <Link
          href={`/nen/${ability.id}`}
          className="min-w-0 truncate text-sm text-ivory transition-colors hover:text-gold-bright"
        >
          {ability.name}
          <span className="ml-1.5 text-teal" aria-hidden>
            →
          </span>
        </Link>
        <span
          className="shrink-0 font-mono text-[9px] uppercase tracking-widest"
          style={{ color: ABILITY_STATUS_COLOR[status] }}
        >
          {status}
        </span>
      </div>
      <p className="mt-1.5 line-clamp-2 text-xs text-muted">{firstSentence}</p>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-t border-line/60 pt-2">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {ability.userCharacterId ? (
            <EntityLink id={ability.userCharacterId} />
          ) : (
            <span className="font-mono text-[10px] uppercase tracking-widest text-warn">
              user unknown
            </span>
          )}
          <Tag>{ability.nenType}</Tag>
        </div>
        <div className="flex items-center gap-2">
          <ConfidenceBadge level={ability.confidence} />
          <ChapterRef ch={ability.revealCh} />
        </div>
      </div>
    </motion.article>
  );
}
