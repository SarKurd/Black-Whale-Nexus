"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { LocationPanel } from "@/components/map/LocationPanel";
import { computeOccupancy } from "@/components/map/occupancy";
import { ShipBlueprint } from "@/components/map/ShipBlueprint";
import { TierAccordion } from "@/components/map/TierAccordion";
import { useEffectiveChapter } from "@/lib/store";
import { ARC_END, ARC_START } from "@/lib/types";

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

  // The Voyage replay slider is a local rewind for stepping the ship state
  // back through the voyage. When the global clearance changes, snap it back
  // to follow — otherwise an earlier value pins here and drifts out of sync.
  useEffect(() => {
    void ch;
    setViewCh(null);
  }, [ch]);

  // While the compartment modal is open: Escape closes it and the page body
  // scroll is locked so only the modal's own content scrolls.
  useEffect(() => {
    if (!selectedId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedId(null);
    };
    window.addEventListener("keydown", onKey);
    // The scroll container is <html>, not <body>, so lock the root element.
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      root.style.overflow = previousOverflow;
    };
  }, [selectedId]);

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
            max={ARC_END}
            value={displayCh}
            onChange={(e) => setViewCh(Math.min(Number(e.target.value), ch))}
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
      </div>

      {/* Compartment file — a centered modal over the whole page. */}
      <AnimatePresence>
        {selectedId && (
          <motion.div
            key="compartment-backdrop"
            className="fixed inset-0 z-50 flex items-center justify-center bg-bg-deep/80 p-4 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            onClick={() => setSelectedId(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Compartment file"
          >
            <motion.div
              className="dossier dossier-gold corner-ticks flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden p-4"
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="-mr-2 overflow-y-auto pr-2">
                <LocationPanel
                  id={selectedId}
                  ch={displayCh}
                  occupancy={occupancy}
                  onSelect={setSelectedId}
                  onClose={() => setSelectedId(null)}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
