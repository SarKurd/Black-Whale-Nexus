"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Suspense, useEffect, useMemo, useState } from "react";
import { LocationPanel } from "@/components/map/LocationPanel";
import { MapExplorer } from "@/components/map/MapExplorer";
import { computeOccupancy } from "@/components/map/occupancy";
import { SubjectTracker } from "@/components/map/SubjectTracker";
import { TierAccordion } from "@/components/map/TierAccordion";
import { characterById, factionById, locationById, locations } from "@/lib/db";
import { latestStamp, locationAt } from "@/lib/spoiler";
import { useEffectiveChapter } from "@/lib/store";
import { ARC_END, ARC_START } from "@/lib/types";
import { useUrlString } from "@/lib/urlState";

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
        <div className="flex w-full items-center gap-2 border-y border-line py-2 sm:w-auto sm:border-0 sm:py-0">
          <span className="intel-label">Voyage replay</span>
          <input
            type="range"
            min={ARC_START}
            max={ARC_END}
            value={ARC_END}
            className="min-w-0 flex-1 accent-[var(--gold)] sm:w-36 sm:flex-none"
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
  const [selectedValue, setSelectedValue] = useUrlString("location");
  const [chapterValue, setChapterValue] = useUrlString("at", "", (value) =>
    Number.isFinite(Number(value)),
  );
  const [trackedValue, setTrackedValue] = useUrlString("track");
  const [tierValue, setTierValue] = useUrlString("tier", "", (value) =>
    Number.isFinite(Number(value)),
  );
  const selectedId = selectedValue || null;
  const trackedId = trackedValue || null;
  const viewCh = chapterValue
    ? Math.min(Math.max(Math.round(Number(chapterValue)), ARC_START), ch)
    : null;
  const focusedTier = tierValue
    ? Math.round(Number(tierValue))
    : selectedId
      ? (locationById.get(selectedId)?.tier ?? null)
      : null;
  const [playing, setPlaying] = useState(false);

  // Preserve an explicitly shared replay chapter. If clearance drops below it,
  // clamp the pin so the URL never advertises inaccessible intelligence.
  useEffect(() => {
    if (chapterValue && Number(chapterValue) > ch) {
      setChapterValue(String(ch));
    }
    setPlaying(false);
  }, [ch, chapterValue, setChapterValue]);

  // While a compartment file is open, Escape closes it and the page is locked
  // so only the dossier's own content scrolls.
  useEffect(() => {
    if (!selectedId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedValue("");
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
  }, [selectedId, setSelectedValue]);

  // The scrubber can rewind below clearance but never above it.
  const displayCh = Math.min(viewCh ?? ch, ch);

  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => {
      const next = displayCh >= ch ? displayCh : displayCh + 1;
      setChapterValue(String(next));
    }, 700);
    return () => clearInterval(timer);
  }, [playing, displayCh, ch, setChapterValue]);

  useEffect(() => {
    if (playing && displayCh >= ch) setPlaying(false);
  }, [playing, displayCh, ch]);

  const occupancy = useMemo(() => computeOccupancy(displayCh), [displayCh]);

  useEffect(() => {
    if (!trackedId) return;
    const character = characterById.get(trackedId);
    if (!character) return;
    const resolved = locationAt(character, displayCh);
    if (!resolved) return;
    const location = locationById.get(resolved.locationId);
    if (location?.tier) setTierValue(String(location.tier));
  }, [trackedId, displayCh, setTierValue]);

  // Derived from what is rendered at displayCh so it can never outrun clearance.
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
    setChapterValue(String(Math.min(Math.max(n, ARC_START), ch)));
  }

  function togglePlay() {
    if (playing) {
      setPlaying(false);
      return;
    }
    if (displayCh >= ch) setChapterValue(String(ARC_START));
    setPlaying(true);
  }

  function selectLocation(locationId: string) {
    setSelectedValue(locationId);
    const tier = locationById.get(locationId)?.tier;
    if (tier) setTierValue(String(tier));
  }

  function closeLocation() {
    setSelectedValue("");
  }

  const transportDisabled = ch <= ARC_START;
  const transportButton =
    "flex min-h-7 min-w-7 items-center justify-center border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted transition-colors hover:border-gold-line hover:text-gold-bright disabled:pointer-events-none disabled:opacity-40";

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="intel-label-gold">Deck plans · conceptual</div>
          <h1 className="royal-heading text-3xl">Tactical Blueprint</h1>
        </div>
        <div className="flex w-full items-center gap-2 border-y border-line py-2 sm:w-auto sm:border-0 sm:py-0">
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
              setChapterValue(String(Math.min(Number(e.target.value), ch)));
            }}
            className="min-w-0 flex-1 accent-[var(--gold)] sm:w-36 sm:flex-none"
            aria-label="Ship state as of chapter"
            disabled={transportDisabled}
          />
          <span className="w-9 font-mono text-xs text-gold-bright">
            {displayCh}
          </span>
        </div>
      </div>

      <p className="mb-3 max-w-3xl text-xs text-muted">
        Replay the ship record chapter by chapter. Find a person or compartment,
        choose a tier, and open any location without losing your place in the
        plan.
      </p>

      <SubjectTracker
        ch={ch}
        displayCh={displayCh}
        trackedId={trackedId}
        onTrack={(id) => setTrackedValue(id ?? "")}
        onSelectLocation={selectLocation}
        onViewChapter={pinChapter}
      />

      <div className="min-w-0">
        {/* Desktop: overview → focused tier explorer. */}
        <div className="hidden lg:block">
          <MapExplorer
            displayCh={displayCh}
            occupancy={occupancy}
            selectedId={selectedId}
            focusedTier={focusedTier}
            onFocusTier={(tier) => setTierValue(tier ? String(tier) : "")}
            onSelect={selectLocation}
          />
        </div>

        {/* Mobile: tier-grouped accordion with the same data. */}
        <div className="lg:hidden">
          <TierAccordion
            displayCh={displayCh}
            occupancy={occupancy}
            selectedId={selectedId}
            onSelect={selectLocation}
          />
        </div>
      </div>

      {/* Compartment file — one modal presentation at every breakpoint. */}
      <AnimatePresence>
        {selectedId && (
          <motion.div
            key="compartment-backdrop"
            className="fixed inset-0 z-50 flex items-center justify-center bg-bg-deep/80 p-3 backdrop-blur-[2px] sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            onClick={closeLocation}
            role="dialog"
            aria-modal="true"
            aria-label="Compartment file"
          >
            <motion.div
              className="dossier dossier-gold corner-ticks flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden p-4 sm:p-5"
              initial={{ y: -8, opacity: 0, scale: 0.99 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -8, opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.15 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="-mr-2 overflow-y-auto pr-2">
                <LocationPanel
                  key={selectedId}
                  id={selectedId}
                  ch={displayCh}
                  occupancy={occupancy}
                  onSelect={selectLocation}
                  onViewChapter={pinChapter}
                  onClose={closeLocation}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <details className="mt-3 border border-line bg-bg-deep/30">
        <summary className="cursor-pointer px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-muted hover:text-parchment">
          Map legend · factions, threat, and certainty
        </summary>
        <div className="border-t border-line px-3 pb-3">
          {/* Faction key */}
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
                [
                  "Contested",
                  "color-mix(in srgb, var(--warn) 45%, transparent)",
                ],
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
            Geometry is conceptual — the manga does not provide precise deck
            plans. Approximate and inferred compartments are drawn with dashed
            lines and should be read as intelligence estimates, not
            architecture.
          </p>
        </div>
      </details>
    </div>
  );
}
