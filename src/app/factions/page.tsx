"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArchiveNote, EntityLink, SectionHeading } from "@/components/ui/kit";
import { charactersByFaction, factions } from "@/lib/db";
import { currentIntelText } from "@/lib/spoiler";
import { useEffectiveChapter } from "@/lib/store";
import type { Faction, FactionKind } from "@/lib/types";

// Typed alias — the data module is authored in parallel, so the raw export
// may be error-typed until it lands. This cast is a no-op once it exists.
const allFactions = factions as Faction[];

/** Registry groups — factions are filed by the kind of power they wield. */
const GROUPS: { id: string; label: string; kinds: FactionKind[] }[] = [
  {
    id: "royal",
    label: "Royal & prince camps",
    kinds: ["royal", "prince-camp"],
  },
  { id: "military", label: "Military & bureau", kinds: ["military", "bureau"] },
  { id: "hunter", label: "Hunters", kinds: ["hunter"] },
  { id: "mafia", label: "Mafia", kinds: ["mafia"] },
  { id: "troupe", label: "Troupe", kinds: ["troupe"] },
  { id: "other", label: "Other parties", kinds: ["other"] },
];

const KIND_LABEL: Record<FactionKind, string> = {
  royal: "Royal house",
  "prince-camp": "Prince camp",
  military: "Military",
  mafia: "Mafia",
  hunter: "Hunter",
  troupe: "Troupe",
  bureau: "Bureau",
  other: "Other",
};

export default function FactionsPage() {
  const ch = useEffectiveChapter();
  const [group, setGroup] = useState<string>("all");

  const grouped = useMemo(() => {
    const visible = allFactions.filter((f) => f.introducedCh <= ch);
    const sections = GROUPS.map((g) => ({
      group: g,
      items: visible
        .filter((f) => g.kinds.includes(f.kind))
        .sort((a, b) => a.name.localeCompare(b.name)),
    })).filter((s) => s.items.length > 0);
    return { visible, sections };
  }, [ch]);

  const shown =
    group === "all"
      ? grouped.sections
      : grouped.sections.filter((s) => s.group.id === group);

  return (
    <div>
      <div className="mb-5">
        <div className="intel-label-gold">Registry · Organizations</div>
        <h1 className="royal-heading text-3xl">Faction Registry</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted">
          Every organized power aboard the whale, filed by allegiance.
          Organizations not yet surfaced at chapter {ch} are withheld.
        </p>
      </div>

      <div className="mb-5 flex flex-wrap items-center gap-1.5">
        {[{ id: "all", label: "All" }, ...GROUPS].map((g) => (
          <button
            key={g.id}
            type="button"
            onClick={() => setGroup(g.id)}
            className={`border px-2 py-1 font-mono text-[10px] uppercase tracking-widest transition-colors ${
              group === g.id
                ? "border-gold-line bg-gold/10 text-gold-bright"
                : "border-line text-muted hover:text-parchment"
            }`}
          >
            {g.label}
          </button>
        ))}
        <span className="ml-auto font-mono text-[10px] tracking-widest text-faint">
          {grouped.visible.length} organizations on record
        </span>
      </div>

      {shown.length === 0 ? (
        <ArchiveNote>
          No organization files match at this clearance. Raise clearance to open
          the registry.
        </ArchiveNote>
      ) : (
        <div className="space-y-8">
          {shown.map((section) => (
            <section key={section.group.id}>
              <SectionHeading
                right={
                  <span className="font-mono text-[10px] tracking-widest text-faint">
                    {section.items.length} on file
                  </span>
                }
              >
                {section.group.label}
              </SectionHeading>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {section.items.map((f, i) => (
                  <FactionCard key={f.id} faction={f} ch={ch} index={i} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

function FactionCard({
  faction,
  ch,
  index,
}: {
  faction: Faction;
  ch: number;
  index: number;
}) {
  const memberCount = (charactersByFaction.get(faction.id) ?? []).filter(
    (c) => c.introducedCh <= ch,
  ).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: Math.min(index, 8) * 0.04 }}
      className="dossier corner-ticks group flex h-full min-w-0 flex-col transition-colors hover:border-gold-line"
    >
      {/* Faction color bar — the swatch used for this faction across the app. */}
      <div
        className="h-1 w-full shrink-0"
        style={{ background: faction.color }}
        aria-hidden
      />
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-baseline justify-between gap-2">
          <Link
            href={`/factions/${faction.id}`}
            className="royal-heading truncate text-lg text-ivory hover:text-gold-bright"
          >
            {faction.name}
          </Link>
          <span
            className="shrink-0 border px-1.5 py-px font-mono text-[9px] uppercase tracking-wider"
            style={{
              color: faction.color,
              borderColor: "color-mix(in srgb, currentColor 35%, transparent)",
            }}
          >
            {KIND_LABEL[faction.kind]}
          </span>
        </div>
        <p className="mt-1.5 line-clamp-3 flex-1 text-xs text-muted">
          {currentIntelText(faction.summary, ch) ??
            "Current-state overview sealed at this clearance."}
        </p>
        <div className="mt-3 space-y-1 border-t border-line/60 pt-2">
          <div className="flex items-baseline justify-between gap-2">
            <span className="intel-label">Leader</span>
            <span className="truncate text-sm">
              {faction.leaderCharacterId ? (
                <EntityLink id={faction.leaderCharacterId} />
              ) : (
                <span className="text-faint">Not on record</span>
              )}
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-2">
            <span className="intel-label">Members on file</span>
            <span className="font-mono text-sm tabular-nums text-parchment">
              {memberCount}
            </span>
          </div>
        </div>
        <Link
          href={`/factions/${faction.id}`}
          className="mt-3 inline-block font-mono text-[10px] uppercase tracking-widest text-teal hover:text-gold-bright"
        >
          Open intelligence file →
        </Link>
      </div>
    </motion.div>
  );
}
