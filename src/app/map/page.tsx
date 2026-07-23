"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { LocationPanel } from "@/components/map/LocationPanel";
import { computeOccupancy } from "@/components/map/occupancy";
import { ShipBlueprint } from "@/components/map/ShipBlueprint";
import { TierAccordion } from "@/components/map/TierAccordion";
import { useEffectiveChapter } from "@/lib/store";
import { ARC_START } from "@/lib/types";

export default function MapPage() {
  return (
    <Suspense>
      <MapPageInner />
    </Suspense>
  );
}

function MapPageInner() {
  const ch = useEffectiveChapter();
  const params = useSearchParams();
  const locationParam = params.get("location");

  const [selectedId, setSelectedId] = useState<string | null>(locationParam);
  const [viewCh, setViewCh] = useState<number | null>(null);

  useEffect(() => {
    if (locationParam) setSelectedId(locationParam);
  }, [locationParam]);

  // The scrubber can rewind below clearance but never above it.
  const displayCh = Math.min(viewCh ?? ch, ch);

  const occupancy = useMemo(() => computeOccupancy(displayCh), [displayCh]);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="intel-label-gold">Deck plans · conceptual</div>
          <h1 className="royal-heading text-3xl">Tactical Blueprint</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="intel-label">Voyage replay</span>
          <input
            type="range"
            min={ARC_START}
            max={ch}
            value={displayCh}
            onChange={(e) => setViewCh(Number(e.target.value))}
            className="w-36 accent-[var(--gold)]"
            aria-label="Ship state as of chapter"
            disabled={ch <= ARC_START}
          />
          <span className="w-9 font-mono text-xs text-gold-bright">
            {displayCh > ARC_START ? displayCh : "pre"}
          </span>
        </div>
      </div>

      <p className="mb-3 max-w-3xl text-xs text-muted">
        Cross-section of Black Whale No. 1, tier by tier. Each compartment shows
        who the record places there — dots are colored by faction, tints mark
        threat level, and the left edge marks controlling faction. Drag the
        replay slider to watch movement across the voyage, up to your clearance.
        Click any compartment for its file.
      </p>

      <div className="relative">
        {/* Desktop: the SVG blueprint */}
        <div className="dossier corner-ticks hidden bg-bg-deep/60 p-4 lg:block">
          <ShipBlueprint
            displayCh={displayCh}
            occupancy={occupancy}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </div>

        {/* Mobile: tier-grouped accordion with the same data */}
        <div className="lg:hidden">
          <TierAccordion
            displayCh={displayCh}
            occupancy={occupancy}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </div>

        <AnimatePresence>
          {selectedId && (
            <motion.aside
              key={selectedId}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.18 }}
              className="dossier dossier-gold corner-ticks absolute right-0 top-0 max-h-full w-full overflow-y-auto p-4 sm:right-3 sm:top-3 sm:max-h-[calc(100%-24px)] sm:w-80"
            >
              <LocationPanel
                id={selectedId}
                ch={displayCh}
                occupancy={occupancy}
                onSelect={setSelectedId}
                onClose={() => setSelectedId(null)}
              />
            </motion.aside>
          )}
        </AnimatePresence>
      </div>

      {/* Legend — canonicity is explicit, geometry is honest. */}
      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5">
        {(
          [
            ["Canonical", undefined],
            ["Approximate ≈", "5 3"],
            ["Inferred", "2 3"],
            ["Unknown ?", "1 4"],
          ] as const
        ).map(([label, dash]) => (
          <span
            key={label}
            className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted"
          >
            <svg width="26" height="10" aria-hidden="true">
              <rect
                x={1}
                y={1}
                width={24}
                height={8}
                fill="none"
                stroke="var(--line-strong)"
                strokeDasharray={dash}
              />
            </svg>
            {label}
          </span>
        ))}
        {(
          [
            ["Tense", "color-mix(in srgb, var(--warn) 25%, transparent)"],
            ["Contested", "color-mix(in srgb, var(--warn) 45%, transparent)"],
            ["Lethal", "color-mix(in srgb, var(--blood) 45%, transparent)"],
          ] as const
        ).map(([label, tint]) => (
          <span
            key={label}
            className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted"
          >
            <span
              className="inline-block h-2.5 w-2.5 border border-line-strong"
              style={{ background: tint }}
            />
            {label}
          </span>
        ))}
      </div>
      <p className="mt-2 font-mono text-[10px] tracking-wide text-faint">
        Geometry is conceptual — the manga does not provide precise deck plans.
        Approximate and inferred compartments are drawn with dashed lines and
        should be read as intelligence estimates, not architecture.
      </p>
    </div>
  );
}
