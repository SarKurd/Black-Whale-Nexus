"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import {
  ordinal,
  RISK_COLOR,
  RISK_LEVELS,
  riskAt,
} from "@/components/princes/shared";
import { ArchiveNote, Monogram, StatusChip } from "@/components/ui/kit";
import {
  beastById,
  characterById,
  charactersByPrince,
  princes,
  sortedChapters,
} from "@/lib/db";
import { currentIntelText, statusAt } from "@/lib/spoiler";
import { useEffectiveChapter } from "@/lib/store";
import type { Character, Prince } from "@/lib/types";
import { ARC_START } from "@/lib/types";
import { useUrlString } from "@/lib/urlState";

const VIEWS = [
  "Council",
  "Strategic table",
  "Succession ring",
  "Evolution",
] as const;
type View = (typeof VIEWS)[number];

/** Everything a view needs about one prince, reconstructed at chapter `ch`. */
interface PrinceIntel {
  p: Prince;
  c: Character | undefined;
  status: ReturnType<typeof statusAt>;
  guardsAlive: number;
  beastSeen: boolean;
  risk: ReturnType<typeof riskAt>;
  objective: string | undefined;
}

function buildIntel(ch: number): PrinceIntel[] {
  return [...princes]
    .sort((a, b) => a.rank - b.rank)
    .map((p) => {
      const c = characterById.get(p.characterId);
      const household = charactersByPrince.get(p.id) ?? [];
      const guardsAlive = household.filter(
        (member) => statusAt(member, ch)?.status === "alive",
      ).length;
      const beast = p.beastId ? beastById.get(p.beastId) : undefined;
      const objective = [...p.currentObjective]
        .filter((o) => o.revealCh <= ch)
        .sort((a, b) => a.revealCh - b.revealCh)
        .at(-1)?.text;
      return {
        p,
        c,
        status: c ? statusAt(c, ch) : undefined,
        guardsAlive,
        beastSeen: !!beast && beast.firstSeenCh <= ch,
        risk: riskAt(p, ch),
        objective,
      };
    });
}

export default function RoyalWarCouncilPage() {
  const ch = useEffectiveChapter();
  const [viewValue, setViewValue] = useUrlString("view", "Council", (value) =>
    VIEWS.includes(value as View),
  );
  const view = viewValue as View;

  const intel = useMemo(() => buildIntel(ch), [ch]);
  const preArc = ch < ARC_START;

  return (
    <div>
      <div className="mb-5">
        <div className="intel-label-gold">
          Registry · The royal line of Kakin
        </div>
        <h1 className="royal-heading text-3xl">Royal War Council</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted">
          The fourteen heirs of Nasubi Hui Guo Rou, ranked by birth order and
          tracked through the succession war. All assessments reconstructed to
          chapter {ch}.
        </p>
      </div>

      {preArc ? (
        <div className="mx-auto max-w-xl py-16 text-center">
          <div className="stamp mx-auto inline-block text-warn">
            Sealed record
          </div>
          <div className="mt-5 text-left">
            <ArchiveNote>
              Anime-only clearance: the succession ceremony has not been
              performed and the war council file remains sealed. Raise your
              clearance past chapter {ARC_START} to open the royal registry.
            </ArchiveNote>
          </div>
        </div>
      ) : (
        <>
          {/* View toggle */}
          <div className="mb-4 flex flex-wrap gap-1 border-b border-line">
            {VIEWS.map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setViewValue(v)}
                aria-pressed={view === v}
                className={`-mb-px border-b-2 px-3 py-2 font-mono text-[11px] uppercase tracking-widest transition-colors ${
                  view === v
                    ? "border-gold text-gold-bright"
                    : "border-transparent text-muted hover:text-parchment"
                }`}
              >
                {v}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
            >
              {view === "Council" && <CouncilView intel={intel} />}
              {view === "Strategic table" && (
                <StrategicTable intel={intel} ch={ch} />
              )}
              {view === "Succession ring" && (
                <>
                  <div className="hidden md:block">
                    <SuccessionRing intel={intel} />
                  </div>
                  {/* The radial chart needs room — fall back to cards on small screens. */}
                  <div className="md:hidden">
                    <ArchiveNote>
                      The succession ring requires a wider display. Showing the
                      council roster instead.
                    </ArchiveNote>
                    <div className="mt-3">
                      <CouncilView intel={intel} />
                    </div>
                  </div>
                </>
              )}
              {view === "Evolution" && <EvolutionBoard intel={intel} ch={ch} />}
            </motion.div>
          </AnimatePresence>
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------------- */
/* Council — rich prince cards in rank order                                  */
/* ------------------------------------------------------------------------- */

function CouncilView({ intel }: { intel: PrinceIntel[] }) {
  if (intel.length === 0)
    return (
      <ArchiveNote>No royal records on file at this clearance.</ArchiveNote>
    );
  return (
    <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
      {intel.map(
        ({ p, c, status, guardsAlive, beastSeen, risk, objective }, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: i * 0.02 }}
          >
            <Link
              href={`/princes/${p.id}`}
              className="dossier corner-ticks group flex h-full gap-3 p-3 transition-colors hover:border-gold-line"
            >
              <Monogram characterId={p.characterId} />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="intel-label-gold">
                    {ordinal(p.rank)} Prince
                  </span>
                  {risk && (
                    <span
                      className="font-mono text-[9px] uppercase tracking-widest"
                      style={{ color: RISK_COLOR[risk.risk] }}
                      title={risk.why}
                    >
                      {risk.risk}
                    </span>
                  )}
                </div>
                <div className="truncate text-base text-ivory group-hover:text-gold-bright">
                  {c?.name ?? p.characterId}
                </div>
                <div className="truncate text-xs text-muted">
                  of Queen {p.motherName}
                </div>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                  {status && (
                    <StatusChip status={status.status} note={status.note} />
                  )}
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                    Guards{" "}
                    <span
                      className="tabular-nums"
                      style={{
                        color:
                          guardsAlive < p.guardsOriginal
                            ? "var(--warn)"
                            : "var(--parchment)",
                      }}
                    >
                      {guardsAlive}/{p.guardsOriginal}
                    </span>
                  </span>
                  {beastSeen && (
                    <span className="font-mono text-[9px] uppercase tracking-widest text-violet">
                      beast on record
                    </span>
                  )}
                </div>
                {objective && (
                  <p className="mt-1.5 line-clamp-2 text-xs text-muted">
                    <span className="intel-label mr-1.5">Objective</span>
                    {objective}
                  </p>
                )}
              </div>
            </Link>
          </motion.div>
        ),
      )}
    </div>
  );
}

/* ------------------------------------------------------------------------- */
/* Strategic table — dense comparison grid                                    */
/* ------------------------------------------------------------------------- */

function StrategicTable({ intel, ch }: { intel: PrinceIntel[]; ch: number }) {
  if (intel.length === 0)
    return (
      <ArchiveNote>No royal records on file at this clearance.</ArchiveNote>
    );
  return (
    <div className="dossier corner-ticks overflow-x-auto">
      <table className="w-full min-w-[960px] border-collapse text-left">
        <thead>
          <tr className="border-b border-line">
            {[
              "Rank",
              "Prince",
              "Mother",
              "Status",
              "Guards",
              "Risk",
              "Public strategy",
              "Hidden strategy",
              "Vuln.",
            ].map((h) => (
              <th key={h} className="intel-label px-3 py-2 font-normal">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {intel.map(({ p, c, status, guardsAlive, risk }) => {
            const hiddenRevealed =
              p.hiddenStrategy && p.hiddenStrategy.revealCh <= ch;
            const vulnCount = p.vulnerabilities.filter(
              (v) => v.revealCh <= ch,
            ).length;
            return (
              <tr
                key={p.id}
                className="border-b border-line/60 align-top last:border-0 hover:bg-raised/50"
              >
                <td className="px-3 py-2 font-mono text-[11px] tracking-wider text-gold">
                  {ordinal(p.rank)}
                </td>
                <td className="px-3 py-2">
                  <Link
                    href={`/princes/${p.id}`}
                    className="whitespace-nowrap text-sm text-ivory hover:text-gold-bright"
                  >
                    {c?.name ?? p.characterId}
                  </Link>
                </td>
                <td className="whitespace-nowrap px-3 py-2 text-xs text-muted">
                  {p.motherName}
                </td>
                <td className="whitespace-nowrap px-3 py-2">
                  {status ? (
                    <StatusChip status={status.status} note={status.note} />
                  ) : (
                    <span className="text-faint">—</span>
                  )}
                </td>
                <td className="whitespace-nowrap px-3 py-2 font-mono text-xs tabular-nums text-parchment">
                  {guardsAlive}/{p.guardsOriginal}
                </td>
                <td className="whitespace-nowrap px-3 py-2">
                  {risk ? (
                    <span
                      className="font-mono text-[10px] uppercase tracking-widest"
                      style={{ color: RISK_COLOR[risk.risk] }}
                      title={risk.why}
                    >
                      {risk.risk}
                    </span>
                  ) : (
                    <span className="text-faint">—</span>
                  )}
                </td>
                <td className="min-w-[220px] px-3 py-2 text-xs text-parchment">
                  {currentIntelText(p.publicStrategy, ch) ?? (
                    <span className="text-faint">Sealed</span>
                  )}
                </td>
                <td className="min-w-[220px] px-3 py-2 text-xs">
                  {hiddenRevealed ? (
                    <span className="border-l-2 border-violet pl-2 text-violet">
                      {p.hiddenStrategy?.text}
                    </span>
                  ) : (
                    <span className="text-faint">—</span>
                  )}
                </td>
                <td className="px-3 py-2 text-center font-mono text-xs tabular-nums text-warn">
                  {vulnCount > 0 ? (
                    vulnCount
                  ) : (
                    <span className="text-faint">0</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------------------- */
/* Succession ring — radial SVG diagram                                       */
/* ------------------------------------------------------------------------- */

function SuccessionRing({ intel }: { intel: PrinceIntel[] }) {
  const router = useRouter();
  if (intel.length === 0)
    return (
      <ArchiveNote>No royal records on file at this clearance.</ArchiveNote>
    );

  const width = 780;
  const height = 720;
  const cx = width / 2;
  const cy = height / 2;
  const ringRadius = 258;
  const labelRadius = 302;
  const maxGuards = Math.max(1, ...intel.map((x) => x.guardsAlive));

  return (
    <div className="dossier corner-ticks p-4">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="mx-auto block w-full max-w-3xl"
        role="img"
        aria-label="Succession ring — the fourteen princes arranged by rank"
      >
        {/* Faint orbit */}
        <circle
          cx={cx}
          cy={cy}
          r={ringRadius}
          fill="none"
          stroke="var(--line)"
          strokeDasharray="2 6"
        />

        {/* Central Kakin seal */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <circle
            cx={cx}
            cy={cy}
            r={64}
            fill="var(--panel)"
            stroke="var(--gold-dim)"
          />
          <circle
            cx={cx}
            cy={cy}
            r={54}
            fill="none"
            stroke="var(--gold-line)"
          />
          <text
            x={cx}
            y={cy - 2}
            textAnchor="middle"
            fill="var(--gold)"
            style={{
              fontFamily: "var(--font-cinzel), serif",
              fontSize: 20,
              letterSpacing: "0.2em",
            }}
          >
            KAKIN
          </text>
          <text
            x={cx}
            y={cy + 18}
            textAnchor="middle"
            fill="var(--muted)"
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 8,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
            }}
          >
            SUCCESSION
          </text>
        </motion.g>

        {intel.map(({ p, c, status, guardsAlive, risk }, i) => {
          const angle = ((i * 360) / intel.length - 90) * (Math.PI / 180);
          const x = cx + ringRadius * Math.cos(angle);
          const y = cy + ringRadius * Math.sin(angle);
          const lx = cx + labelRadius * Math.cos(angle);
          const ly = cy + labelRadius * Math.sin(angle);
          const st = status?.status ?? "unknown";
          const dead = st === "dead" || st === "presumed-dead";
          const detained = st === "detained" || st === "incapacitated";
          const stroke = dead
            ? "var(--blood)"
            : detained
              ? "var(--muted)"
              : "var(--gold)";
          const r = 11 + (guardsAlive / maxGuards) * 13;
          const anchor =
            Math.abs(Math.cos(angle)) < 0.35
              ? "middle"
              : Math.cos(angle) > 0
                ? "start"
                : "end";
          return (
            <motion.g
              key={p.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 + i * 0.045 }}
              onClick={() => router.push(`/princes/${p.id}`)}
              className="cursor-pointer"
            >
              <title>
                {`${ordinal(p.rank)} Prince ${c?.name ?? p.characterId} — ${st}, ${guardsAlive}/${p.guardsOriginal} guards${risk ? `, risk ${risk.risk}` : ""}`}
              </title>
              {/* Spoke */}
              <line
                x1={cx + 68 * Math.cos(angle)}
                y1={cy + 68 * Math.sin(angle)}
                x2={x - (r + 4) * Math.cos(angle)}
                y2={y - (r + 4) * Math.sin(angle)}
                stroke="var(--line)"
                strokeWidth={1}
              />
              {/* Node — size follows remaining guards, color follows status */}
              <circle
                cx={x}
                cy={y}
                r={r}
                fill={
                  dead
                    ? "color-mix(in srgb, var(--blood) 14%, var(--panel))"
                    : "color-mix(in srgb, var(--gold) 8%, var(--panel))"
                }
                stroke={stroke}
                strokeWidth={dead || detained ? 1 : 1.5}
                opacity={detained ? 0.7 : 1}
              />
              {dead && (
                <>
                  <line
                    x1={x - r * 0.55}
                    y1={y - r * 0.55}
                    x2={x + r * 0.55}
                    y2={y + r * 0.55}
                    stroke="var(--blood)"
                    strokeWidth={1.5}
                  />
                  <line
                    x1={x - r * 0.55}
                    y1={y + r * 0.55}
                    x2={x + r * 0.55}
                    y2={y - r * 0.55}
                    stroke="var(--blood)"
                    strokeWidth={1.5}
                  />
                </>
              )}
              {!dead && (
                <text
                  x={x}
                  y={y + 3.5}
                  textAnchor="middle"
                  fill={stroke}
                  style={{
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontSize: 9,
                  }}
                >
                  {p.rank}
                </text>
              )}
              {/* Risk tick under the node */}
              {risk && (
                <circle
                  cx={x}
                  cy={y + r + 6}
                  r={2}
                  fill={RISK_COLOR[risk.risk]}
                />
              )}
              {/* Label */}
              <text
                x={lx}
                y={ly - 4}
                textAnchor={anchor}
                fill="var(--gold-dim)"
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 8,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                {ordinal(p.rank)}
              </text>
              <text
                x={lx}
                y={ly + 8}
                textAnchor={anchor}
                fill={dead ? "var(--muted)" : "var(--ivory)"}
                style={{ fontSize: 11 }}
              >
                {c?.name ?? p.characterId}
              </text>
            </motion.g>
          );
        })}
      </svg>
      <p className="mt-2 text-center font-mono text-[10px] tracking-wider text-faint">
        Node size: guards remaining · gold ring: alive · blood ×: deceased ·
        dim: detained · dot below: current risk · click a prince to open the
        royal profile
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------------- */
/* Evolution — chapter-by-chapter risk heat board                             */
/* ------------------------------------------------------------------------- */

function EvolutionBoard({ intel, ch }: { intel: PrinceIntel[]; ch: number }) {
  const coveredChapters = sortedChapters.filter((info) => info.number <= ch);
  if (intel.length === 0 || coveredChapters.length === 0)
    return <ArchiveNote>No chapter coverage at this clearance.</ArchiveNote>;
  return (
    <div className="dossier corner-ticks p-4">
      <div className="overflow-x-auto pb-2">
        <table className="border-collapse">
          <thead>
            <tr>
              <th
                className="sticky left-0 z-10 bg-panel pr-3"
                aria-label="Prince"
              />
              {coveredChapters.map((info) => (
                <th
                  key={info.number}
                  className="px-px pb-1 align-bottom font-normal"
                >
                  <span
                    className="block font-mono text-[8px] tracking-wider text-faint"
                    style={{ writingMode: "vertical-rl" }}
                  >
                    {info.number}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {intel.map(({ p, c }) => (
              <tr key={p.id}>
                <td className="sticky left-0 z-10 whitespace-nowrap bg-panel py-px pr-3">
                  <Link
                    href={`/princes/${p.id}`}
                    className="font-mono text-[10px] uppercase tracking-wider text-parchment hover:text-gold-bright"
                  >
                    <span className="mr-1.5 text-gold-dim">{p.rank}</span>
                    {c?.name ?? p.characterId}
                  </Link>
                </td>
                {coveredChapters.map((info) => {
                  const entry = riskAt(p, info.number);
                  return (
                    <td key={info.number} className="p-px">
                      <Link
                        href={`/chapters/${info.number}`}
                        className="block h-5 w-5 border border-line/40 transition-colors hover:border-gold"
                        style={{
                          background: entry
                            ? `color-mix(in srgb, ${RISK_COLOR[entry.risk]} 55%, var(--bg-deep))`
                            : "var(--bg-deep)",
                        }}
                        title={
                          entry
                            ? `${c?.name ?? p.characterId} · ch.${info.number} — ${entry.risk}: ${entry.why}`
                            : `${c?.name ?? p.characterId} · ch.${info.number} — no assessment on file`
                        }
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-4 border-t border-line pt-2">
        <span className="intel-label">Risk key</span>
        {RISK_LEVELS.map((level) => (
          <span key={level} className="flex items-center gap-1.5">
            <span
              className="inline-block h-2.5 w-2.5 border border-line/40"
              style={{
                background: `color-mix(in srgb, ${RISK_COLOR[level]} 55%, var(--bg-deep))`,
              }}
            />
            <span className="font-mono text-[9px] uppercase tracking-widest text-muted">
              {level}
            </span>
          </span>
        ))}
        <span className="ml-auto font-mono text-[10px] tracking-wider text-faint">
          click a cell to open the chapter record
        </span>
      </div>
    </div>
  );
}
