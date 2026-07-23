"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { factionById, locations } from "@/lib/db";
import { latestStamp } from "@/lib/spoiler";
import type { ShipLocation } from "@/lib/types";
import {
  CANONICITY_MARK,
  type Occupancy,
  THREAT_COLOR,
  type ThreatLevel,
} from "./occupancy";

const PASSAGE_ID = "hidden-passage-network";

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
      <LocationRow
        loc={locations.find((l) => l.id === "black-whale")}
        displayCh={displayCh}
        occupancy={occupancy}
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
                      occupancy={occupancy}
                      selectedId={selectedId}
                      onSelect={onSelect}
                    />
                    {children.map((loc) => (
                      <LocationRow
                        key={loc.id}
                        loc={loc}
                        displayCh={displayCh}
                        occupancy={occupancy}
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
              occupancy={occupancy}
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
  occupancy,
  selectedId,
  onSelect,
}: {
  loc: ShipLocation | undefined;
  label?: string;
  displayCh: number;
  occupancy: Occupancy;
  selectedId: string | null;
  onSelect: (locationId: string) => void;
}) {
  if (!loc) return null;
  const count = occupancy.byLocation.get(loc.id)?.length ?? 0;
  const threat = latestStamp(loc.threatHistory, displayCh)?.value as
    | ThreatLevel
    | undefined;
  const controlId = latestStamp(loc.controlHistory, displayCh)?.value;
  const controlColor = controlId
    ? (factionById.get(controlId)?.color ?? "var(--line-strong)")
    : "var(--line)";
  const mark = CANONICITY_MARK[loc.canonicity];
  const selected = selectedId === loc.id;
  return (
    <button
      type="button"
      onClick={() => onSelect(loc.id)}
      className={`flex w-full items-baseline justify-between gap-2 border border-l-2 px-2 py-1.5 text-left transition-colors ${
        selected ? "border-gold-line" : "border-line hover:border-line-strong"
      }`}
      style={{ borderLeftColor: controlColor }}
    >
      <span className="min-w-0 truncate text-sm text-parchment">
        {label ? `${loc.name} · ${label}` : loc.name}
        {mark && (
          <span className="ml-1.5 font-mono text-[9px] text-faint">{mark}</span>
        )}
      </span>
      <span className="flex shrink-0 items-center gap-2 font-mono text-[10px]">
        {threat && (
          <span style={{ color: THREAT_COLOR[threat] }}>{threat}</span>
        )}
        <span className="text-ivory">{count}</span>
      </span>
    </button>
  );
}
