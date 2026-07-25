"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { LocationPanel } from "@/components/map/LocationPanel";
import { computeOccupancy } from "@/components/map/occupancy";
import { ShipBlueprint } from "@/components/map/ShipBlueprint";
import { SubjectTracker } from "@/components/map/SubjectTracker";
import { TierAccordion } from "@/components/map/TierAccordion";
import { characterById, factionById, locations } from "@/lib/db";
import { latestStamp } from "@/lib/spoiler";
import { useEffectiveChapter } from "@/lib/store";
import { ARC_END, ARC_START } from "@/lib/types";

export default function MapPage() {
  return (
    <Suspense fallback={<MapPageFallback />}>
      <MapPageInner />
    </Suspense>
  );
}

function MapPageFallback() {
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
            value={ARC_END}
            className="w-36 accent-[var(--gold)]"
            aria-label="Ship state as of chapter"
            disabled
            readOnly
          />
          <span className="w-9 font-mono text-xs text-gold-bright">
            {ARC_END}
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
    </div>
  );
}

function MapPageInner() {
  const ch = useEffectiveChapter();
  const params = useSearchParams();
  const locationParam = params.get("location");
  const chParam = params.get("ch");

  const [selectedId, setSelectedId] = useState<string | null>(locationParam);
  // Incoming ?ch= pins the replay to a chapter; the displayCh clamp below
  // keeps a shared link from ever raising someone past their own clearance.
  const [viewCh, setViewCh] = useState<number | null>(() => {
    const n = Number(chParam);
    return chParam !== null && Number.isFinite(n)
      ? Math.max(ARC_START, Math.round(n))
      : null;
  });
  const [trackedId, setTrackedId] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (locationParam) setSelectedId(locationParam);
  }, [locationParam]);

  // The Voyage replay slider is a local rewind for stepping the ship state
  // back through the voyage. When the global clearance changes, snap it back
  // to follow — otherwise an earlier value pins here and drifts out of sync.
  // Skipped on mount so an incoming ?ch= deep link survives.
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    void ch;
    setViewCh(null);
    setPlaying(false);
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

  // Autoplay: one chapter per beat, pausing at the clearance boundary.
  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => {
      setViewCh((prev) => {
        const current = Math.min(prev ?? ch, ch);
        return current >= ch ? current : current + 1;
      });
    }, 700);
    return () => clearInterval(timer);
  }, [playing, ch]);

  useEffect(() => {
    if (playing && displayCh >= ch) setPlaying(false);
  }, [playing, displayCh, ch]);

  const occupancy = useMemo(() => computeOccupancy(displayCh), [displayCh]);

  // Faction key derived from what is actually rendered at this chapter —
  // spoiler-safe by construction, and the fallback color is named honestly.
  const factionKey = useMemo(() => {
    const ids = new Set<string>();
    let unaffiliated = false;
    for (const occupant of occupancy.occupants) {
      const factionId = characterById.get(occupant.characterId)?.factionIds[0];
      if (factionId && factionById.has(factionId)) ids.add(factionId);
      else unaffiliated = true;
    }
    for (const loc of locations) {
      if (loc.introducedCh > displayCh) continue;
      const controlId = latestStamp(loc.controlHistory, displayCh)?.value;
      if (controlId && factionById.has(controlId)) ids.add(controlId);
    }
    const entries = [...ids]
      .map((id) => factionById.get(id))
      .filter((f): f is NonNullable<typeof f> => f !== undefined)
      .sort((a, b) => a.name.localeCompare(b.name));
    return { entries, unaffiliated };
  }, [occupancy, displayCh]);

  function pinChapter(n: number) {
    setPlaying(false);
    setViewCh(Math.min(Math.max(n, ARC_START), ch));
  }

  function togglePlay() {
    if (playing) {
      setPlaying(false);
      return;
    }
    if (displayCh >= ch) setViewCh(ARC_START);
    setPlaying(true);
  }

  const transportDisabled = ch <= ARC_START;
  const transportButton =
    "border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted transition-colors hover:border-gold-line hover:text-gold-bright disabled:pointer-events-none disabled:opacity-40";

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="intel-label-gold">Deck plans · conceptual</div>
          <h1 className="royal-heading text-3xl">Tactical Blueprint</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="intel-label">Voyage replay</span>
          <button
            type="button"
            className={transportButton}
            onClick={() => pinChapter(displayCh - 1)}
            disabled={transportDisabled || displayCh <= ARC_START}
            aria-label="Step back one chapter"
          >
            ‹
          </button>
          <button
            type="button"
            className={transportButton}
            onClick={togglePlay}
            disabled={transportDisabled}
            aria-label={playing ? "Pause replay" : "Play replay"}
          >
            {playing ? "❚❚" : "▸"}
          </button>
          <button
            type="button"
            className={transportButton}
            onClick={() => pinChapter(displayCh + 1)}
            disabled={transportDisabled || displayCh >= ch}
            aria-label="Step forward one chapter"
          >
            ›
          </button>
          <input
            type="range"
            min={ARC_START}
            max={ARC_END}
            value={displayCh}
            onChange={(e) => {
              setPlaying(false);
              setViewCh(Math.min(Number(e.target.value), ch));
            }}
            className="w-36 accent-[var(--gold)]"
            aria-label="Ship state as of chapter"
            disabled={transportDisabled}
          />
          <span className="w-9 font-mono text-xs text-gold-bright">
            {displayCh}
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

      <SubjectTracker
        ch={ch}
        displayCh={displayCh}
        trackedId={trackedId}
        onTrack={setTrackedId}
        onViewChapter={pinChapter}
      />

      <div className="relative">
        {/* Desktop: the SVG blueprint */}
        <div className="dossier corner-ticks hidden bg-bg-deep/60 p-4 lg:block">
          <ShipBlueprint
            displayCh={displayCh}
            occupancy={occupancy}
            selectedId={selectedId}
            trackedId={trackedId}
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
                  onViewChapter={pinChapter}
                  onClose={() => setSelectedId(null)}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Faction key — derived from the dots and stripes on screen right now,
          so it can never name a faction ahead of the reader's clearance. */}
      {(factionKey.entries.length > 0 || factionKey.unaffiliated) && (
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5">
          <span className="intel-label">Faction key</span>
          {factionKey.entries.map((f) => (
            <span
              key={f.id}
              className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted"
            >
              <span
                className="inline-block h-2.5 w-2.5 rounded-full border border-bg-deep"
                style={{ background: f.color }}
              />
              {f.name}
            </span>
          ))}
          {factionKey.unaffiliated && (
            <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full border border-bg-deep"
                style={{ background: "var(--gold-dim)" }}
              />
              Unaffiliated
            </span>
          )}
        </div>
      )}

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
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted">
          <span className="font-mono text-[10px] text-blood">†</span>
          Remains interred
        </span>
      </div>
      <p className="mt-2 font-mono text-[10px] tracking-wide text-faint">
        Geometry is conceptual — the manga does not provide precise deck plans.
        Approximate and inferred compartments are drawn with dashed lines and
        should be read as intelligence estimates, not architecture.
      </p>
    </div>
  );
}
