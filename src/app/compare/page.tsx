"use client";

import { motion } from "framer-motion";
import { type ReactNode, Suspense, useMemo } from "react";
import {
  ArchiveNote,
  ChapterRef,
  ConfidenceBadge,
  EntityLink,
  EntityList,
  StatusChip,
} from "@/components/ui/kit";
import {
  abilitiesByUser,
  abilityById,
  beastById,
  characterById,
  characters,
  charactersByFaction,
  charactersByPrince,
  factionById,
  factions,
  knowledgeByCharacter,
  nenAbilities,
  princeById,
  princes,
  relationshipsFor,
  storylines,
} from "@/lib/db";
import {
  currentIntelText,
  latestStamp,
  locationAt,
  relationshipEnded,
  relationshipVisible,
  statusAt,
} from "@/lib/spoiler";
import { useEffectiveChapter } from "@/lib/store";
import type {
  Character,
  CharacterKnowledge,
  Faction,
  NenAbility,
  Prince,
  RiskLevel,
} from "@/lib/types";
import { ARC_END } from "@/lib/types";
import { useUrlString } from "@/lib/urlState";

const COMPARE_TYPES = [
  "characters",
  "princes",
  "factions",
  "abilities",
] as const;
type CompareType = (typeof COMPARE_TYPES)[number];

const TYPE_LABEL: Record<CompareType, string> = {
  characters: "Characters",
  princes: "Princes",
  factions: "Factions",
  abilities: "Abilities",
};

const RISK_COLOR: Record<RiskLevel, string> = {
  low: "var(--alive)",
  moderate: "var(--warn)",
  high: "var(--warn)",
  critical: "var(--blood)",
  eliminated: "var(--faint)",
};

const ALLY_KINDS = ["allied", "secret-alliance"];
const HOSTILE_KINDS = ["enemy", "hunting", "targeting"];
const THREAT_KINDS = ["targeting", "hunting"];

function isCompareType(value: string | null): value is CompareType {
  return COMPARE_TYPES.includes(value as CompareType);
}

export default function ComparePage() {
  return (
    <Suspense fallback={<ComparePageFallback />}>
      <ComparePageInner />
    </Suspense>
  );
}

function ComparePageFallback() {
  return (
    <div>
      <div className="archive-page-header mb-6">
        <div className="intel-label-gold">Comparative analysis desk</div>
        <h1 className="royal-heading text-3xl">Side-by-Side Analysis</h1>
        <p className="mt-1 max-w-3xl text-xs text-muted">
          Put two files on the same desk. Every field is reconstructed as the
          record stood at chapter {ARC_END} — entities not yet on record cannot
          be selected.
        </p>
      </div>
    </div>
  );
}

function ComparePageInner() {
  const clearanceChapter = useEffectiveChapter();
  const [compareTypeValue, setCompareTypeValue] = useUrlString(
    "type",
    "characters",
    (value) => isCompareType(value),
  );
  const compareType = compareTypeValue as CompareType;
  const [idA, setIdA] = useUrlString("a");
  const [idB, setIdB] = useUrlString("b");

  // Only entities already on record at this clearance can be selected.
  const options = useMemo(
    () => optionsForType(compareType, clearanceChapter),
    [compareType, clearanceChapter],
  );

  const validA = options.some((o) => o.id === idA) ? idA : "";
  const validB = options.some((o) => o.id === idB) ? idB : "";
  const bothChosen = validA !== "" && validB !== "";

  const switchType = (t: CompareType) => {
    if (t === compareType) return;
    setCompareTypeValue(t);
    setIdA("");
    setIdB("");
  };

  return (
    <div>
      <div className="archive-page-header mb-6">
        <div className="intel-label-gold">Comparative analysis desk</div>
        <h1 className="royal-heading text-3xl">Side-by-Side Analysis</h1>
        <p className="mt-1 max-w-3xl text-xs text-muted">
          Put two files on the same desk. Every field is reconstructed as the
          record stood at chapter {clearanceChapter} — entities not yet on
          record cannot be selected.
        </p>
      </div>

      {/* Type switch */}
      <div className="mb-4 flex flex-wrap gap-1 border-b border-line">
        {COMPARE_TYPES.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => switchType(t)}
            aria-pressed={compareType === t}
            className={`-mb-px border-b-2 px-3 py-2 font-mono text-[11px] uppercase tracking-widest transition-colors ${
              compareType === t
                ? "border-gold text-gold-bright"
                : "border-transparent text-muted hover:text-parchment"
            }`}
          >
            {TYPE_LABEL[t]}
          </button>
        ))}
      </div>

      {/* Entity selects */}
      <div className="mb-5 grid gap-3 sm:grid-cols-2">
        <EntitySelect
          label="Subject A"
          value={validA}
          options={options}
          onChange={setIdA}
        />
        <EntitySelect
          label="Subject B"
          value={validB}
          options={options}
          onChange={setIdB}
        />
      </div>

      {!bothChosen ? (
        <ArchiveNote>
          Select two {TYPE_LABEL[compareType].toLowerCase()} above to open the
          comparison. {options.length} files are available at your clearance.
        </ArchiveNote>
      ) : (
        <ComparisonTable
          key={`${compareType}:${validA}:${validB}`}
          compareType={compareType}
          idA={validA}
          idB={validB}
          clearanceChapter={clearanceChapter}
        />
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Selects
// ---------------------------------------------------------------------------

interface EntityOption {
  id: string;
  label: string;
}

function optionsForType(type: CompareType, ch: number): EntityOption[] {
  switch (type) {
    case "characters":
      return characters
        .filter((c: Character) => c.introducedCh <= ch)
        .map((c: Character) => ({ id: c.id, label: c.name }))
        .sort((a: EntityOption, b: EntityOption) =>
          a.label.localeCompare(b.label),
        );
    case "princes":
      return princes
        .filter(
          (p: Prince) =>
            (characterById.get(p.characterId)?.introducedCh ?? 0) <= ch,
        )
        .sort((a: Prince, b: Prince) => a.rank - b.rank)
        .map((p: Prince) => ({
          id: p.id,
          label: `#${p.rank} ${characterById.get(p.characterId)?.name ?? p.id}`,
        }));
    case "factions":
      return factions
        .filter((f: Faction) => f.introducedCh <= ch)
        .map((f: Faction) => ({ id: f.id, label: f.name }))
        .sort((a: EntityOption, b: EntityOption) =>
          a.label.localeCompare(b.label),
        );
    case "abilities":
      return nenAbilities
        .filter((a: NenAbility) => a.revealCh <= ch)
        .map((a: NenAbility) => {
          const user = a.userCharacterId
            ? characterById.get(a.userCharacterId)?.name
            : undefined;
          return { id: a.id, label: user ? `${a.name} — ${user}` : a.name };
        })
        .sort((a: EntityOption, b: EntityOption) =>
          a.label.localeCompare(b.label),
        );
  }
}

function EntitySelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: EntityOption[];
  onChange: (id: string) => void;
}) {
  return (
    <label className="block">
      <span className="intel-label mb-1 block">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-line bg-panel px-2 py-1.5 text-sm text-parchment outline-none focus:border-gold-line"
      >
        <option value="">— select a file —</option>
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

// ---------------------------------------------------------------------------
// Comparison table
// ---------------------------------------------------------------------------

interface RowSpec {
  label: string;
  cell: (id: string) => ReactNode;
}

function ComparisonTable({
  compareType,
  idA,
  idB,
  clearanceChapter,
}: {
  compareType: CompareType;
  idA: string;
  idB: string;
  clearanceChapter: number;
}) {
  const rows = useMemo(
    () => buildRows(compareType, clearanceChapter),
    [compareType, clearanceChapter],
  );
  const nameA = headerName(compareType, idA);
  const nameB = headerName(compareType, idB);

  return (
    <div className="dossier corner-ticks">
      {/* Column headers — slide in from either side once both are chosen */}
      <div className="grid grid-cols-2 border-b border-line lg:grid-cols-[180px_1fr_1fr]">
        <div className="intel-label-gold hidden items-center px-4 py-3 lg:flex">
          Field
        </div>
        <motion.div
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25 }}
          className="border-r border-line px-4 py-3"
        >
          <div className="intel-label">Subject A</div>
          <div className="royal-heading truncate text-lg">{nameA}</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25 }}
          className="px-4 py-3"
        >
          <div className="intel-label">Subject B</div>
          <div className="royal-heading truncate text-lg">{nameB}</div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.08 }}
        className="px-4 pb-2"
      >
        {rows.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-1 gap-2 border-b border-line/60 py-2.5 last:border-0 lg:grid-cols-[164px_1fr_1fr] lg:gap-4"
          >
            <div className="intel-label pt-0.5">{row.label}</div>
            <div className="min-w-0">
              <div className="intel-label mb-0.5 lg:hidden">A · {nameA}</div>
              <div className="text-sm text-parchment">{row.cell(idA)}</div>
            </div>
            <div className="min-w-0">
              <div className="intel-label mb-0.5 lg:hidden">B · {nameB}</div>
              <div className="text-sm text-parchment">{row.cell(idB)}</div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function headerName(type: CompareType, id: string): string {
  if (type === "princes") {
    const p = princeById.get(id);
    return p ? (characterById.get(p.characterId)?.name ?? id) : id;
  }
  if (type === "characters") return characterById.get(id)?.name ?? id;
  if (type === "factions") return factionById.get(id)?.name ?? id;
  return abilityById.get(id)?.name ?? id;
}

function buildRows(type: CompareType, ch: number): RowSpec[] {
  switch (type) {
    case "characters":
      return buildCharacterRows(ch);
    case "princes":
      return buildPrinceRows(ch);
    case "factions":
      return buildFactionRows(ch);
    case "abilities":
      return buildAbilityRows(ch);
  }
}

// ---------------------------------------------------------------------------
// Shared cell primitives
// ---------------------------------------------------------------------------

function Dash() {
  return <span className="text-faint">—</span>;
}

function Bullets({ items }: { items: string[] }) {
  if (items.length === 0) return <Dash />;
  return (
    <ul className="list-inside list-disc space-y-0.5">
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}

function NotOnRecord() {
  return (
    <span className="font-mono text-[10px] uppercase tracking-wider text-faint">
      not on record
    </span>
  );
}

// ---------------------------------------------------------------------------
// Characters
// ---------------------------------------------------------------------------

function activeRelationships(characterId: string, ch: number) {
  return relationshipsFor(characterId).filter(
    (r) => relationshipVisible(r, ch) && !relationshipEnded(r, ch),
  );
}

function buildCharacterRows(ch: number): RowSpec[] {
  return [
    {
      label: "Status",
      cell: (id) => {
        const c = characterById.get(id);
        const st = c ? statusAt(c, ch) : undefined;
        return st ? <StatusChip status={st.status} note={st.note} /> : <Dash />;
      },
    },
    {
      label: "Role",
      cell: (id) => characterById.get(id)?.role ?? <Dash />,
    },
    {
      label: "Affiliation",
      cell: (id) => (
        <EntityList ids={characterById.get(id)?.factionIds ?? []} />
      ),
    },
    {
      label: "Serves",
      cell: (id) => {
        const princeId = characterById.get(id)?.servesPrinceId;
        return princeId ? <EntityLink id={princeId} /> : <Dash />;
      },
    },
    {
      label: "Current location",
      cell: (id) => {
        const c = characterById.get(id);
        const loc = c ? locationAt(c, ch) : undefined;
        return loc ? <EntityLink id={loc.locationId} /> : <NotOnRecord />;
      },
    },
    {
      label: "Objectives",
      cell: (id) => (
        <Bullets
          items={(characterById.get(id)?.objectives ?? [])
            .filter((o) => o.revealCh <= ch)
            .map((o) => o.text)}
        />
      ),
    },
    {
      label: "Secrets revealed",
      cell: (id) => {
        const revealed = (characterById.get(id)?.secrets ?? [])
          .filter((s) => s.revealCh <= ch)
          .sort((a, b) => a.revealCh - b.revealCh);
        const latest = revealed[revealed.length - 1];
        if (!latest) return <Dash />;
        return (
          <span>
            <span className="font-mono text-xs text-gold-bright">
              {revealed.length}
            </span>{" "}
            on file — latest:{" "}
            <span className="text-xs text-muted">{latest.text}</span>
          </span>
        );
      },
    },
    {
      label: "Allies / Enemies",
      cell: (id) => {
        const rels = activeRelationships(id, ch);
        const allies = rels.filter((r) => ALLY_KINDS.includes(r.kind)).length;
        const enemies = rels.filter((r) =>
          HOSTILE_KINDS.includes(r.kind),
        ).length;
        return (
          <span className="font-mono text-xs">
            <span className="text-teal">{allies} allied</span>
            <span className="text-faint"> · </span>
            <span className="text-blood-bright">{enemies} hostile</span>
          </span>
        );
      },
    },
    {
      label: "Threatened by",
      cell: (id) => {
        const hunters = activeRelationships(id, ch)
          .filter((r) => THREAT_KINDS.includes(r.kind) && r.to === id)
          .map((r) => r.from);
        return <EntityList ids={[...new Set(hunters)]} />;
      },
    },
    {
      label: "Nen type",
      cell: (id) => {
        const c = characterById.get(id);
        if (!c?.nenType || (c.nenTypeRevealCh ?? 0) > ch)
          return <NotOnRecord />;
        return <span className="capitalize">{c.nenType}</span>;
      },
    },
    {
      label: "Abilities revealed",
      cell: (id) => {
        const revealed = (abilitiesByUser.get(id) ?? [])
          .filter((ability) => ability.revealCh <= ch)
          .map((ability) => ability.id);
        return <EntityList ids={revealed} />;
      },
    },
    {
      label: "Information advantage",
      cell: (id) => {
        const holdings = (knowledgeByCharacter.get(id) ?? []).filter(
          (k: CharacterKnowledge) => (k.revealCh ?? k.sinceCh) <= ch,
        ).length;
        return (
          <span>
            <span className="font-mono text-xs text-gold-bright">
              {holdings}
            </span>{" "}
            tracked intelligence holdings
          </span>
        );
      },
    },
    {
      label: "Storylines",
      cell: (id) => {
        const names = storylines
          .filter((s) => s.introducedCh <= ch && s.participantIds.includes(id))
          .map((s) => s.name);
        if (names.length === 0) return <Dash />;
        return (
          <span className="text-xs">
            {names.map((n, i) => (
              <span key={n}>
                {i > 0 && <span className="text-faint"> · </span>}
                {n}
              </span>
            ))}
          </span>
        );
      },
    },
    {
      label: "Chapter appearances",
      cell: (id) => {
        const count = (characterById.get(id)?.chapterAppearances ?? []).filter(
          (n) => n <= ch,
        ).length;
        return (
          <span className="font-mono text-xs text-parchment">
            {count} chapters
          </span>
        );
      },
    },
  ];
}

// ---------------------------------------------------------------------------
// Princes — qualitative only, no numeric power scores.
// ---------------------------------------------------------------------------

function buildPrinceRows(ch: number): RowSpec[] {
  return [
    {
      label: "Rank",
      cell: (id) => {
        const p = princeById.get(id);
        return p ? (
          <span className="font-mono text-xs">Prince #{p.rank}</span>
        ) : (
          <Dash />
        );
      },
    },
    {
      label: "Mother",
      cell: (id) => {
        const p = princeById.get(id);
        if (!p) return <Dash />;
        return p.motherCharacterId ? (
          <EntityLink id={p.motherCharacterId} />
        ) : (
          <span>
            {p.motherName}
            {p.queenRank !== undefined && (
              <span className="ml-1.5 font-mono text-[10px] text-muted">
                (Queen #{p.queenRank})
              </span>
            )}
          </span>
        );
      },
    },
    {
      label: "Status",
      cell: (id) => {
        const p = princeById.get(id);
        const c = p ? characterById.get(p.characterId) : undefined;
        const st = c ? statusAt(c, ch) : undefined;
        return st ? <StatusChip status={st.status} note={st.note} /> : <Dash />;
      },
    },
    {
      label: "Guards remaining",
      cell: (id) => {
        const p = princeById.get(id);
        if (!p) return <Dash />;
        const guards = charactersByPrince.get(p.id) ?? [];
        const lost = guards.filter((g) => {
          const st = statusAt(g, ch);
          return st?.status === "dead" || st?.status === "presumed-dead";
        }).length;
        const remaining = Math.max(p.guardsOriginal - lost, 0);
        return (
          <span className="font-mono text-xs">
            <span
              style={{
                color:
                  remaining < p.guardsOriginal
                    ? "var(--warn)"
                    : "var(--parchment)",
              }}
            >
              {remaining}
            </span>
            <span className="text-faint"> / {p.guardsOriginal} original</span>
          </span>
        );
      },
    },
    {
      label: "Hunters assigned",
      cell: (id) => (
        <EntityList ids={princeById.get(id)?.hunterCharacterIds ?? []} />
      ),
    },
    {
      label: "Guardian beast",
      cell: (id) => {
        const p = princeById.get(id);
        const beast = p?.beastId ? beastById.get(p.beastId) : undefined;
        if (!beast || beast.firstSeenCh > ch) {
          return (
            <span className="font-mono text-[10px] uppercase tracking-wider text-faint">
              unrevealed
            </span>
          );
        }
        const snippet =
          beast.appearance.length > 110
            ? `${beast.appearance.slice(0, 110)}…`
            : beast.appearance;
        return (
          <span className="text-xs text-muted">
            {snippet} <ChapterRef ch={beast.firstSeenCh} />
          </span>
        );
      },
    },
    {
      label: "Personal ability",
      cell: (id) => {
        const abilityId = princeById.get(id)?.personalAbilityId;
        const ability = abilityId ? abilityById.get(abilityId) : undefined;
        if (!ability || ability.revealCh > ch) return <NotOnRecord />;
        return <EntityLink id={ability.id} />;
      },
    },
    {
      label: "Assassination risk",
      cell: (id) => {
        const p = princeById.get(id);
        const latest = (p?.riskHistory ?? [])
          .filter((r) => r.ch <= ch)
          .sort((a, b) => a.ch - b.ch)
          .at(-1);
        if (!latest) return <NotOnRecord />;
        return (
          <span>
            <span
              className="stamp mr-2 inline-block text-[9px]"
              style={{ color: RISK_COLOR[latest.risk] }}
            >
              {latest.risk}
            </span>
            <span className="text-xs text-muted">{latest.why}</span>
          </span>
        );
      },
    },
    {
      label: "Public strategy",
      cell: (id) => {
        const strategy = princeById.get(id)?.publicStrategy;
        return strategy ? (
          (currentIntelText(strategy, ch) ?? <NotOnRecord />)
        ) : (
          <Dash />
        );
      },
    },
    {
      label: "Hidden strategy",
      cell: (id) => {
        const hidden = princeById.get(id)?.hiddenStrategy;
        if (!hidden || hidden.revealCh > ch) return <NotOnRecord />;
        return (
          <span
            className="border-l-2 pl-2 text-xs"
            style={{ borderColor: "var(--violet)" }}
          >
            {hidden.text} <ChapterRef ch={hidden.revealCh} />
          </span>
        );
      },
    },
    {
      label: "Vulnerabilities",
      cell: (id) => (
        <Bullets
          items={(princeById.get(id)?.vulnerabilities ?? [])
            .filter((v) => v.revealCh <= ch)
            .map((v) => v.text)}
        />
      ),
    },
    {
      label: "Allies / Enemies",
      cell: (id) => {
        const p = princeById.get(id);
        if (!p) return <Dash />;
        const rels = activeRelationships(p.characterId, ch);
        const allies = rels.filter((r) => ALLY_KINDS.includes(r.kind)).length;
        const enemies = rels.filter((r) =>
          HOSTILE_KINDS.includes(r.kind),
        ).length;
        return (
          <span className="font-mono text-xs">
            <span className="text-teal">{allies} allied</span>
            <span className="text-faint"> · </span>
            <span className="text-blood-bright">{enemies} hostile</span>
          </span>
        );
      },
    },
    {
      label: "Recent developments",
      cell: (id) => {
        const recent = (princeById.get(id)?.developments ?? [])
          .filter((d) => d.ch <= ch)
          .sort((a, b) => a.ch - b.ch)
          .slice(-3);
        if (recent.length === 0) return <Dash />;
        return (
          <ul className="space-y-1">
            {recent.map((d) => (
              <li key={`${d.ch}-${d.text}`} className="text-xs text-muted">
                <ChapterRef ch={d.ch} /> {d.text}
              </li>
            ))}
          </ul>
        );
      },
    },
  ];
}

// ---------------------------------------------------------------------------
// Factions
// ---------------------------------------------------------------------------

function buildFactionRows(ch: number): RowSpec[] {
  return [
    {
      label: "Kind",
      cell: (id) => {
        const f = factionById.get(id);
        return f ? (
          <span className="font-mono text-xs uppercase tracking-wider">
            {f.kind}
          </span>
        ) : (
          <Dash />
        );
      },
    },
    {
      label: "Leader",
      cell: (id) => {
        const leaderId = factionById.get(id)?.leaderCharacterId;
        return leaderId ? <EntityLink id={leaderId} /> : <NotOnRecord />;
      },
    },
    {
      label: "Members on record",
      cell: (id) => {
        const count = (charactersByFaction.get(id) ?? []).filter(
          (c) => c.introducedCh <= ch,
        ).length;
        return (
          <span className="font-mono text-xs text-parchment">
            {count} identified
          </span>
        );
      },
    },
    {
      label: "Objectives",
      cell: (id) => (
        <Bullets
          items={(factionById.get(id)?.objectives ?? [])
            .filter((o) => o.revealCh <= ch)
            .map((o) => o.text)}
        />
      ),
    },
    {
      label: "Territory",
      cell: (id) => {
        const territory = factionById.get(id)?.territoryNote;
        return territory ? (
          (currentIntelText(territory, ch) ?? <NotOnRecord />)
        ) : (
          <Dash />
        );
      },
    },
    {
      label: "Controlled locations",
      cell: (id) => (
        <EntityList ids={factionById.get(id)?.controlledLocationIds ?? []} />
      ),
    },
    {
      label: "Operations",
      cell: (id) => {
        const count = (factionById.get(id)?.operations ?? []).filter(
          (o) => o.ch <= ch,
        ).length;
        return (
          <span className="font-mono text-xs text-parchment">
            {count} recorded
          </span>
        );
      },
    },
    {
      label: "Internal conflicts",
      cell: (id) => (
        <Bullets
          items={(factionById.get(id)?.internalConflicts ?? [])
            .filter((c) => c.revealCh <= ch)
            .map((c) => c.text)}
        />
      ),
    },
    {
      label: "Current status",
      cell: (id) => {
        const stamp = latestStamp(factionById.get(id)?.statusByChapter, ch);
        if (!stamp) return <NotOnRecord />;
        return (
          <span>
            <span className="stamp mr-2 inline-block text-[9px] text-teal">
              {stamp.value}
            </span>
            <ChapterRef ch={stamp.ch} />
          </span>
        );
      },
    },
  ];
}

// ---------------------------------------------------------------------------
// Abilities
// ---------------------------------------------------------------------------

function buildAbilityRows(ch: number): RowSpec[] {
  return [
    {
      label: "User",
      cell: (id) => {
        const userId = abilityById.get(id)?.userCharacterId;
        return userId ? <EntityLink id={userId} /> : <NotOnRecord />;
      },
    },
    {
      label: "Kind",
      cell: (id) => {
        const a = abilityById.get(id);
        return a ? (
          <span className="font-mono text-xs uppercase tracking-wider">
            {a.kind}
          </span>
        ) : (
          <Dash />
        );
      },
    },
    {
      label: "Nen type",
      cell: (id) => {
        const a = abilityById.get(id);
        return a ? <span className="capitalize">{a.nenType}</span> : <Dash />;
      },
    },
    {
      label: "Activation",
      cell: (id) => abilityById.get(id)?.activation ?? <Dash />,
    },
    {
      label: "Conditions",
      cell: (id) => <Bullets items={abilityById.get(id)?.conditions ?? []} />,
    },
    {
      label: "Restrictions",
      cell: (id) => <Bullets items={abilityById.get(id)?.restrictions ?? []} />,
    },
    {
      label: "Cost",
      cell: (id) => abilityById.get(id)?.cost ?? <Dash />,
    },
    {
      label: "Range",
      cell: (id) => abilityById.get(id)?.range ?? <Dash />,
    },
    {
      label: "Effects",
      cell: (id) => <Bullets items={abilityById.get(id)?.effects ?? []} />,
    },
    {
      label: "Weaknesses",
      cell: (id) => <Bullets items={abilityById.get(id)?.weaknesses ?? []} />,
    },
    {
      label: "Counters",
      cell: (id) => <Bullets items={abilityById.get(id)?.counters ?? []} />,
    },
    {
      label: "Awareness",
      cell: (id) => {
        const aware = (abilityById.get(id)?.awareCharacterIds ?? []).filter(
          (x) => x.sinceCh <= ch,
        ).length;
        return (
          <span>
            <span className="font-mono text-xs text-gold-bright">{aware}</span>{" "}
            {aware === 1 ? "person knows" : "people know"} it exists
          </span>
        );
      },
    },
    {
      label: "First seen / Revealed",
      cell: (id) => {
        const a = abilityById.get(id);
        if (!a) return <Dash />;
        return (
          <span className="flex items-center gap-2">
            <ChapterRef ch={a.firstSeenCh} />
            <span className="text-faint">→</span>
            <ChapterRef ch={a.revealCh} />
          </span>
        );
      },
    },
    {
      label: "Confidence",
      cell: (id) => {
        const a = abilityById.get(id);
        return a ? <ConfidenceBadge level={a.confidence} /> : <Dash />;
      },
    },
  ];
}
