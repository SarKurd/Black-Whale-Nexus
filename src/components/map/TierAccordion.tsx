"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { factionById, locations } from "@/lib/db";
import { latestStamp } from "@/lib/spoiler";
import type { ShipLocation } from "@/lib/types";
import {
  assignToContainers,
  CANONICITY_MARK,
  isAboard,
  type Occupancy,
  type Occupant,
  occupantColor,
  THREAT_COLOR,
  type ThreatLevel,
} from "./occupancy";

const PASSAGE_ID = "hidden-passage-network";
const MAX_MICRO_DOTS = 6;

/** Mobile fallback for the SVG blueprint: same data, tier-grouped list. */
export function TierAccordion({
  displayCh,
  occupancy,
  selectedId,
  onSelect,
}: {
  displayCh: number;
  occupancy: Occupancy;
  selectedId: string | null;
  onSelect: (locationId: string) => void;
}) {
  const [openTiers, setOpenTiers] = useState<Set<number>>(new Set([1]));
  const tiers = locations
    .filter((l) => l.kind === "tier")
    .sort((a, b) => (a.tier ?? 0) - (b.tier ?? 0));
  const passage = locations.find(
    (l) => l.id === PASSAGE_ID && l.introducedCh <= displayCh,
  );
  const shoreLocs = locations.filter(
    (l) =>
      l.id !== "black-whale" &&
      l.id !== PASSAGE_ID &&
      !isAboard(l.id) &&
      l.introducedCh <= displayCh,
  );

  // The same honest per-container tally the blueprint uses: each person is
  // counted at the deepest row that is actually drawn, never twice.
  const { livingByRow, remainsByRow } = useMemo(() => {
    const drawn = new Set<string>(["black-whale"]);
    for (const l of locations) {
      if (l.introducedCh <= displayCh) drawn.add(l.id);
    }
    return {
      livingByRow: assignToContainers(occupancy.occupants, drawn),
      remainsByRow: assignToContainers(occupancy.remains, drawn),
    };
  }, [occupancy, displayCh]);

  function toggle(tier: number) {
    setOpenTiers((prev) => {
      const next = new Set(prev);
      if (next.has(tier)) next.delete(tier);
      else next.add(tier);
      return next;
    });
  }

  return (
    <div className="space-y-2">
      {shoreLocs.length > 0 && (
        <div className="dossier border-dashed">
          <div className="px-3 pt-2">
            <span className="intel-label">Shore records · off-ship</span>
          </div>
          <div className="space-y-1.5 px-3 pb-2 pt-1.5">
            {shoreLocs.map((loc) => (
              <LocationRow
                key={loc.id}
                loc={loc}
                displayCh={displayCh}
                occupants={livingByRow.get(loc.id) ?? []}
                remains={remainsByRow.get(loc.id)?.length ?? 0}
                selectedId={selectedId}
                onSelect={onSelect}
              />
            ))}
          </div>
        </div>
      )}
      <LocationRow
        loc={locations.find((l) => l.id === "black-whale")}
        displayCh={displayCh}
        occupants={livingByRow.get("black-whale") ?? []}
        remains={remainsByRow.get("black-whale")?.length ?? 0}
        countOverride={occupancy.aboardCount}
        selectedId={selectedId}
        onSelect={onSelect}
      />
      {tiers.map((tierLoc) => {
        const tier = tierLoc.tier ?? 0;
        const children = locations.filter(
          (l) =>
            l.tier === tier && l.kind !== "tier" && l.introducedCh <= displayCh,
        );
        const open = openTiers.has(tier);
        const count = occupancy.byLocation.get(tierLoc.id)?.length ?? 0;
        const headerThreat = latestStamp(tierLoc.threatHistory, displayCh)
          ?.value as ThreatLevel | undefined;
        return (
          <div key={tierLoc.id} className="dossier">
            <button
              type="button"
              onClick={() => toggle(tier)}
              className="flex w-full items-baseline justify-between gap-2 px-3 py-2 text-left"
            >
              <span
                className={`font-mono text-[11px] uppercase tracking-widest ${
                  tier === 1 ? "text-gold" : "text-muted"
                }`}
              >
                {tierLoc.name}
              </span>
              <span className="flex shrink-0 items-center gap-3 font-mono text-[10px] text-faint">
                {headerThreat && (
                  <span style={{ color: THREAT_COLOR[headerThreat] }}>
                    {headerThreat}
                  </span>
                )}
                {count} aboard
                <span>{open ? "−" : "+"}</span>
              </span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-1.5 border-t border-line px-3 py-2">
                    <LocationRow
                      loc={tierLoc}
                      label="Tier record"
                      displayCh={displayCh}
                      occupants={livingByRow.get(tierLoc.id) ?? []}
                      remains={remainsByRow.get(tierLoc.id)?.length ?? 0}
                      selectedId={selectedId}
                      onSelect={onSelect}
                    />
                    {children.map((loc) => (
                      <LocationRow
                        key={loc.id}
                        loc={loc}
                        displayCh={displayCh}
                        occupants={livingByRow.get(loc.id) ?? []}
                        remains={remainsByRow.get(loc.id)?.length ?? 0}
                        selectedId={selectedId}
                        onSelect={onSelect}
                      />
                    ))}
                    {children.length === 0 && (
                      <p className="font-mono text-[10px] text-faint">
                        No mapped compartments at this clearance.
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
      {passage && (
        <div className="dossier border-dashed">
          <div className="px-3 pt-2">
            <span className="intel-label">Off-plan · inferred</span>
          </div>
          <div className="px-3 pb-2">
            <LocationRow
              loc={passage}
              displayCh={displayCh}
              occupants={livingByRow.get(passage.id) ?? []}
              remains={remainsByRow.get(passage.id)?.length ?? 0}
              selectedId={selectedId}
              onSelect={onSelect}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function LocationRow({
  loc,
  label,
  displayCh,
  occupants,
  remains,
  countOverride,
  selectedId,
  onSelect,
}: {
  loc: ShipLocation | undefined;
  label?: string;
  displayCh: number;
  occupants: Occupant[];
  remains: number;
  /** Container rows (the ship root) report their full rollup, not the direct tally. */
  countOverride?: number;
  selectedId: string | null;
  onSelect: (locationId: string) => void;
}) {
  if (!loc) return null;
  const count = countOverride ?? occupants.length;
  const threat = latestStamp(loc.threatHistory, displayCh)?.value as
    | ThreatLevel
    | undefined;
  const controlId = latestStamp(loc.controlHistory, displayCh)?.value;
  const controlColor = controlId
    ? (factionById.get(controlId)?.color ?? "var(--line-strong)")
    : "var(--line)";
  const mark = CANONICITY_MARK[loc.canonicity];
  const selected = selectedId === loc.id;
  const shownDots = occupants.slice(0, MAX_MICRO_DOTS);
  const hiddenDots = occupants.length - shownDots.length;
  return (
    <button
      type="button"
      onClick={() => onSelect(loc.id)}
      className={`w-full border border-l-2 px-2 py-1.5 text-left transition-colors ${
        selected ? "border-gold-line" : "border-line hover:border-line-strong"
      }`}
      style={{ borderLeftColor: controlColor }}
    >
      <span className="flex w-full items-baseline justify-between gap-2">
        <span className="min-w-0 truncate text-sm text-parchment">
          {label ? `${loc.name} · ${label}` : loc.name}
          {mark && (
            <span className="ml-1.5 font-mono text-[9px] text-faint">
              {mark}
            </span>
          )}
        </span>
        <span className="flex shrink-0 items-center gap-2 font-mono text-[10px]">
          {threat && (
            <span style={{ color: THREAT_COLOR[threat] }}>{threat}</span>
          )}
          {remains > 0 && <span className="text-blood">† {remains}</span>}
          <span className="text-ivory">{count}</span>
        </span>
      </span>
      {shownDots.length > 0 && (
        <span className="mt-1 flex items-center gap-1">
          {shownDots.map((o) => (
            <span
              key={o.characterId}
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: occupantColor(o.characterId) }}
            />
          ))}
          {hiddenDots > 0 && (
            <span className="font-mono text-[9px] text-faint">
              +{hiddenDots}
            </span>
          )}
        </span>
      )}
    </button>
  );
}
