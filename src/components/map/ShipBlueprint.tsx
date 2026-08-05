"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { characterById, factionById, locationById, locations } from "@/lib/db";
import { latestStamp } from "@/lib/spoiler";
import type { ShipLocation } from "@/lib/types";
import {
  assignToContainers,
  CANONICITY_DASH,
  CANONICITY_MARK,
  isAboard,
  type Occupancy,
  type Occupant,
  occupantColor,
  THREAT_TINT,
  type ThreatLevel,
} from "./occupancy";

/* Blueprint drawing constants (SVG user units). */
const VIEW_W = 1000;
const SHORE_TOP = 24;
const BOX_W = 118;
const BOX_H = 44;
const GAP = 8;
const LABEL_W = 100;
const PAD = 10;
const MAX_DOTS = 8;
const PASSAGE_ID = "hidden-passage-network";

/**
 * Horizontal extent of each tier band. Tier 1 is the topside ship riding on
 * the whale's back; the body bulges around Tiers 2–5 and is widest at Tier 4,
 * matching the manga cutaway (ch. 340s cross-section).
 */
const BAND_X: Record<number, [number, number]> = {
  1: [160, 905],
  2: [135, 915],
  3: [95, 940],
  4: [80, 948],
  5: [185, 845],
};

interface BoxLayout {
  loc: ShipLocation;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface BandLayout {
  loc: ShipLocation;
  x0: number;
  x1: number;
  y: number;
  h: number;
  boxes: BoxLayout[];
}

interface DotLayout {
  characterId: string;
  targetId: string;
  cx: number;
  cy: number;
  color: string;
}

interface OverflowLayout {
  targetId: string;
  x: number;
  y: number;
  count: number;
}

function shortName(name: string): string {
  const cleaned = name.replace(/\s*\(.*\)$/, "");
  return cleaned.length > 16 ? `${cleaned.slice(0, 15)}…` : cleaned;
}

/** Flow-layout of shore strip, tier bands, and location boxes at a chapter. */
function computeLayout(displayCh: number): {
  shore: BoxLayout[];
  topY: number;
  bands: BandLayout[];
  bottomY: number;
  passage?: BoxLayout;
} {
  const shoreLocs = locations.filter(
    (l) =>
      l.id !== "black-whale" &&
      !isAboard(l.id) &&
      l.id !== PASSAGE_ID &&
      l.introducedCh <= displayCh,
  );
  const shoreX0 = 150;
  const shorePerRow = Math.max(
    1,
    Math.floor((900 - shoreX0 + GAP) / (BOX_W + GAP)),
  );
  const shore: BoxLayout[] = shoreLocs.map((loc, i) => ({
    loc,
    x: shoreX0 + (i % shorePerRow) * (BOX_W + GAP),
    y: SHORE_TOP + Math.floor(i / shorePerRow) * (BOX_H + GAP),
    w: BOX_W,
    h: BOX_H,
  }));
  const shoreH =
    shore.length > 0
      ? Math.ceil(shore.length / shorePerRow) * (BOX_H + GAP)
      : 0;
  const topY = SHORE_TOP + shoreH + 58;

  const bands: BandLayout[] = [];
  let y = topY;
  for (let tier = 1; tier <= 5; tier += 1) {
    const tierLoc = locations.find((l) => l.kind === "tier" && l.tier === tier);
    if (!tierLoc) continue;
    const [x0, x1] = BAND_X[tier];
    const innerX = x0 + LABEL_W + PAD;
    const innerW = x1 - PAD - innerX;
    const perRow = Math.max(1, Math.floor((innerW + GAP) / (BOX_W + GAP)));
    const children = locations.filter(
      (l) =>
        l.tier === tier && l.kind !== "tier" && l.introducedCh <= displayCh,
    );
    const rows = Math.ceil(children.length / perRow);
    const h = Math.max(60, rows * (BOX_H + GAP) - GAP + PAD * 2);
    const boxes: BoxLayout[] = children.map((loc, i) => ({
      loc,
      x: innerX + (i % perRow) * (BOX_W + GAP),
      y: y + PAD + Math.floor(i / perRow) * (BOX_H + GAP),
      w: BOX_W,
      h: BOX_H,
    }));
    bands.push({ loc: tierLoc, x0, x1, y, h, boxes });
    y += h;
  }
  // The inferred passage network has no tier — it hangs below the hull.
  const passageLoc = locationById.get(PASSAGE_ID);
  const passage =
    passageLoc && passageLoc.introducedCh <= displayCh
      ? { loc: passageLoc, x: 184, y: y + 34, w: 660, h: 42 }
      : undefined;
  return { shore, topY, bands, bottomY: y, passage };
}

/**
 * Place occupancy dots from the per-container assignment. A tracked subject
 * always claims the first slot of their container, bypassing the cap; every
 * container that overflows gets a "+N" marker instead of silently dropping.
 */
function computeDots(
  byContainer: Map<string, Occupant[]>,
  boxByLoc: Map<string, BoxLayout>,
  bandByLoc: Map<string, BandLayout>,
  trackedId: string | null,
): { dots: DotLayout[]; overflows: OverflowLayout[] } {
  const dots: DotLayout[] = [];
  const overflows: OverflowLayout[] = [];
  for (const [targetId, bucket] of byContainer) {
    const ordered = trackedId
      ? [
          ...bucket.filter((o) => o.characterId === trackedId),
          ...bucket.filter((o) => o.characterId !== trackedId),
        ]
      : bucket;
    const shown = ordered.slice(0, MAX_DOTS);
    const hidden = ordered.length - shown.length;
    const box = boxByLoc.get(targetId);
    const band = box ? undefined : bandByLoc.get(targetId);
    if (!box && !band) continue;
    const baseX = box ? box.x + 9 : (band as BandLayout).x0 + PAD + 4;
    const cy = box
      ? box.y + box.h - 9
      : (band as BandLayout).y + (band as BandLayout).h - 10;
    shown.forEach((occupant, slot) => {
      dots.push({
        characterId: occupant.characterId,
        targetId,
        cx: baseX + slot * 11,
        cy,
        color: occupantColor(occupant.characterId),
      });
    });
    if (hidden > 0) {
      overflows.push({
        targetId,
        x: baseX + shown.length * 11 - 3,
        y: cy + 3,
        count: hidden,
      });
    }
  }
  return { dots, overflows };
}

/**
 * Whale-body silhouette wrapped around Tiers 2–5 only — Tier 1 is the ship
 * on the whale's back. Widest at the waterline (Tier 4), tucked in at the
 * Tier 5 underbelly, with the tail root at the lower right.
 */
function hullPath(deckY: number, waterY: number, bottomY: number): string {
  return [
    `M 170 ${deckY}`,
    // Head: bulge out to the left, widest at the waterline.
    `C 88 ${deckY + 6} 40 ${waterY - 56} 40 ${waterY}`,
    `C 40 ${waterY + 52} 96 ${bottomY - 20} 178 ${bottomY}`,
    `L 850 ${bottomY}`,
    // Underside sweeping back to the low tail root.
    `C 910 ${bottomY - 4} 938 ${bottomY - 12} 952 ${bottomY - 26}`,
    // Up the stern to the widest point, then over the shoulder to the deck.
    `C 962 ${waterY + 44} 964 ${waterY + 12} 960 ${waterY}`,
    `C 954 ${waterY - 58} 924 ${deckY + 10} 895 ${deckY}`,
    // Gentle camber of the whale's back where the ship sits.
    `C 700 ${deckY - 10} 360 ${deckY - 10} 170 ${deckY}`,
    "Z",
  ].join(" ");
}

/** Two-lobed tail fluke at the lower right, angled down like the manga. */
function flukePath(bottomY: number): string {
  const rootX = 950;
  const rootY = bottomY - 28;
  return [
    `M ${rootX} ${rootY}`,
    `L ${rootX + 44} ${rootY - 20}`,
    `L ${rootX + 24} ${rootY + 6}`,
    `L ${rootX + 48} ${rootY + 34}`,
    "Z",
  ].join(" ");
}

function interactiveProps(onActivate: () => void) {
  return {
    role: "button" as const,
    tabIndex: 0,
    onClick: onActivate,
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onActivate();
      }
    },
    style: { cursor: "pointer", outline: "none" },
  };
}

export function ShipBlueprint({
  displayCh,
  occupancy,
  selectedId,
  trackedId,
  onSelect,
}: {
  displayCh: number;
  occupancy: Occupancy;
  selectedId: string | null;
  trackedId: string | null;
  onSelect: (locationId: string) => void;
}) {
  const { shore, topY, bands, bottomY, passage } = useMemo(
    () => computeLayout(displayCh),
    [displayCh],
  );

  const { boxByLoc, bandByLoc, livingByContainer, remainsByContainer } =
    useMemo(() => {
      const boxes = new Map<string, BoxLayout>();
      for (const band of bands) {
        for (const box of band.boxes) boxes.set(box.loc.id, box);
      }
      for (const box of shore) boxes.set(box.loc.id, box);
      if (passage) boxes.set(passage.loc.id, passage);
      const bandsById = new Map(bands.map((b) => [b.loc.id, b]));
      const drawnIds = new Set([
        "black-whale",
        ...boxes.keys(),
        ...bandsById.keys(),
      ]);
      return {
        boxByLoc: boxes,
        bandByLoc: bandsById,
        livingByContainer: assignToContainers(occupancy.occupants, drawnIds),
        remainsByContainer: assignToContainers(occupancy.remains, drawnIds),
      };
    }, [bands, shore, passage, occupancy]);

  const { dots, overflows } = useMemo(
    () => computeDots(livingByContainer, boxByLoc, bandByLoc, trackedId),
    [livingByContainer, boxByLoc, bandByLoc, trackedId],
  );

  const bandOf = (tier: number) => bands.find((b) => b.loc.tier === tier);
  const tier1 = bandOf(1);
  // Deck line: where the topside ship meets the whale's back.
  const deckY = tier1 ? tier1.y + tier1.h : topY;
  // The body is widest at Tier 4 — that's where the manga puts the waterline.
  const waterlineY = bandOf(4)?.y ?? (deckY + bottomY) / 2;
  const viewH = (passage ? passage.y + passage.h : bottomY) + 26;

  const directCount = (id: string) => livingByContainer.get(id)?.length ?? 0;
  const remainsCount = (id: string) => remainsByContainer.get(id)?.length ?? 0;

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${viewH}`}
      className="h-auto w-full"
      aria-label="Black Whale cross-section blueprint"
    >
      <title>Black Whale No. 1 — conceptual cross-section</title>

      {/* Shore strip */}
      {shore.length > 0 && (
        <g>
          <text
            x={12}
            y={SHORE_TOP - 8}
            fill="var(--faint)"
            style={{
              font: "9px var(--font-geist-mono), monospace",
              letterSpacing: "0.22em",
            }}
          >
            SHORE RECORDS — OFF-SHIP FILES
          </text>
          {shore.map((box) => (
            <LocationBox
              key={box.loc.id}
              box={box}
              displayCh={displayCh}
              selected={selectedId === box.loc.id}
              count={directCount(box.loc.id)}
              remains={remainsCount(box.loc.id)}
              onSelect={onSelect}
            />
          ))}
        </g>
      )}

      {/* Waterline */}
      <line
        x1={8}
        y1={waterlineY}
        x2={VIEW_W - 8}
        y2={waterlineY}
        stroke="var(--line)"
        strokeDasharray="8 5"
      />
      <text
        x={12}
        y={waterlineY - 6}
        fill="var(--faint)"
        style={{
          font: "9px var(--font-geist-mono), monospace",
          letterSpacing: "0.18em",
        }}
      >
        WL
      </text>

      {/* Ship root — the hull itself is the black-whale record. */}
      <g {...interactiveProps(() => onSelect("black-whale"))}>
        <path
          d={hullPath(deckY, waterlineY, bottomY)}
          fill="var(--bg-deep)"
          fillOpacity={0.5}
          stroke={
            selectedId === "black-whale"
              ? "var(--gold-bright)"
              : "var(--line-strong)"
          }
          strokeWidth={1.3}
        />
        {/* Tail fluke at the lower right, trailing below the stern */}
        <path
          d={flukePath(bottomY)}
          fill="var(--bg-deep)"
          fillOpacity={0.5}
          stroke="var(--line-strong)"
          strokeWidth={1.1}
        />
        {/* Topside ship (Tier 1) riding on the whale's back */}
        {tier1 && (
          <path
            d={[
              // Raked bow rising from the deck line at the left.
              `M ${tier1.x0 - 34} ${deckY}`,
              `L ${tier1.x0} ${tier1.y}`,
              `L ${tier1.x1} ${tier1.y}`,
              // Near-vertical stern back down to the deck.
              `L ${tier1.x1 + 18} ${deckY}`,
            ].join(" ")}
            fill="var(--bg-deep)"
            fillOpacity={0.5}
            stroke={
              selectedId === "black-whale"
                ? "var(--gold-bright)"
                : "var(--line-strong)"
            }
            strokeWidth={1.3}
          />
        )}
        {/* Bridge mast atop the superstructure */}
        {tier1 && (
          <path
            d={[
              `M ${(tier1.x0 + tier1.x1) / 2 - 40} ${tier1.y}`,
              `L ${(tier1.x0 + tier1.x1) / 2 - 32} ${tier1.y - 14}`,
              `L ${(tier1.x0 + tier1.x1) / 2 + 32} ${tier1.y - 14}`,
              `L ${(tier1.x0 + tier1.x1) / 2 + 40} ${tier1.y}`,
            ].join(" ")}
            fill="none"
            stroke="var(--line-strong)"
            strokeWidth={1.1}
          />
        )}
        <text
          x={BAND_X[1][0]}
          y={topY - 8}
          fill="var(--gold)"
          style={{
            font: "10px var(--font-geist-mono), monospace",
            letterSpacing: "0.22em",
          }}
        >
          BLACK WHALE NO. 1 — CROSS-SECTION · {occupancy.aboardCount} TRACKED
          ABOARD
          {occupancy.ashoreCount > 0
            ? ` · ${occupancy.ashoreCount} ASHORE`
            : ""}
          {(livingByContainer.get("black-whale")?.length ?? 0) > 0
            ? ` · ${livingByContainer.get("black-whale")?.length} POSITION UNKNOWN`
            : ""}
        </text>
      </g>

      {/* Tier bands */}
      {bands.map((band) => {
        const threat = latestStamp(band.loc.threatHistory, displayCh)?.value as
          | ThreatLevel
          | undefined;
        const controlId = latestStamp(
          band.loc.controlHistory,
          displayCh,
        )?.value;
        const controlColor = controlId
          ? (factionById.get(controlId)?.color ?? "var(--line-strong)")
          : undefined;
        const isTier1 = band.loc.tier === 1;
        const selected = selectedId === band.loc.id;
        const count = occupancy.byLocation.get(band.loc.id)?.length ?? 0;
        const bandRemains = remainsCount(band.loc.id);
        const [name, subName] = band.loc.name.split(" — ");
        return (
          <g
            key={band.loc.id}
            {...interactiveProps(() => onSelect(band.loc.id))}
          >
            <rect
              x={band.x0}
              y={band.y}
              width={band.x1 - band.x0}
              height={band.h}
              fill={threat ? THREAT_TINT[threat] : "transparent"}
              stroke={
                selected
                  ? "var(--gold-bright)"
                  : isTier1
                    ? "var(--gold-line)"
                    : "var(--line-strong)"
              }
              strokeWidth={selected ? 1.4 : isTier1 ? 1.2 : 0.8}
            />
            {controlColor && (
              <rect
                x={band.x0}
                y={band.y}
                width={2}
                height={band.h}
                fill={controlColor}
              />
            )}
            <text
              x={band.x0 + PAD + 2}
              y={band.y + 18}
              fill={isTier1 ? "var(--gold)" : "var(--muted)"}
              style={{
                font: "10px var(--font-geist-mono), monospace",
                letterSpacing: "0.2em",
              }}
            >
              {name.toUpperCase()}
            </text>
            {subName && (
              <text
                x={band.x0 + PAD + 2}
                y={band.y + 31}
                fill="var(--faint)"
                style={{
                  font: "8px var(--font-geist-mono), monospace",
                  letterSpacing: "0.14em",
                }}
              >
                {subName.toUpperCase()}
              </text>
            )}
            <text
              x={band.x0 + PAD + 2}
              y={band.y + 45}
              fill="var(--parchment)"
              style={{ font: "9px var(--font-geist-mono), monospace" }}
            >
              {count} aboard
            </text>
            {bandRemains > 0 && (
              <text
                x={band.x1 - PAD}
                y={band.y + band.h - 6}
                textAnchor="end"
                fill="var(--blood)"
                style={{ font: "9px var(--font-geist-mono), monospace" }}
              >
                † {bandRemains}
              </text>
            )}
          </g>
        );
      })}

      {/* Location boxes (animated so they glide when the layout reflows) */}
      {bands.flatMap((band) =>
        band.boxes.map((box) => (
          <LocationBox
            key={box.loc.id}
            box={box}
            displayCh={displayCh}
            selected={selectedId === box.loc.id}
            count={directCount(box.loc.id)}
            remains={remainsCount(box.loc.id)}
            onSelect={onSelect}
          />
        )),
      )}

      {/* Off-plan inferred passage network below the keel */}
      {passage && (
        <g>
          <line
            x1={VIEW_W / 2}
            y1={bottomY}
            x2={VIEW_W / 2}
            y2={passage.y}
            stroke="var(--line-strong)"
            strokeDasharray="2 3"
          />
          <LocationBox
            box={passage}
            displayCh={displayCh}
            selected={selectedId === passage.loc.id}
            count={directCount(passage.loc.id)}
            remains={remainsCount(passage.loc.id)}
            onSelect={onSelect}
            wide
          />
        </g>
      )}

      {/* Occupancy dots — one per tracked character, keyed for movement */}
      {dots.map((dot) => {
        const tracked = trackedId === dot.characterId;
        return (
          <motion.circle
            key={dot.characterId}
            initial={false}
            animate={{
              cx: dot.cx,
              cy: dot.cy,
              opacity: trackedId && !tracked ? 0.35 : 1,
            }}
            transition={{ type: "spring", stiffness: 190, damping: 24 }}
            r={tracked ? 4.6 : 3.2}
            fill={dot.color}
            stroke={tracked ? "var(--gold-bright)" : "var(--bg-deep)"}
            strokeWidth={tracked ? 1.2 : 0.8}
            onClick={() => onSelect(dot.targetId)}
            style={{ cursor: "pointer" }}
            aria-hidden="true"
          >
            <title>
              {characterById.get(dot.characterId)?.name ?? dot.characterId}
            </title>
          </motion.circle>
        );
      })}

      {overflows.map((o) => (
        <text
          key={o.targetId}
          x={o.x}
          y={o.y}
          fill="var(--faint)"
          style={{ font: "8px var(--font-geist-mono), monospace" }}
        >
          +{o.count}
        </text>
      ))}
    </svg>
  );
}

function LocationBox({
  box,
  displayCh,
  selected,
  count,
  remains,
  onSelect,
  wide,
}: {
  box: BoxLayout;
  displayCh: number;
  selected: boolean;
  count: number;
  remains: number;
  onSelect: (locationId: string) => void;
  wide?: boolean;
}) {
  const { loc } = box;
  const threat = latestStamp(loc.threatHistory, displayCh)?.value as
    | ThreatLevel
    | undefined;
  const controlId = latestStamp(loc.controlHistory, displayCh)?.value;
  const controlColor = controlId
    ? (factionById.get(controlId)?.color ?? undefined)
    : undefined;
  const mark = CANONICITY_MARK[loc.canonicity];
  return (
    <motion.g
      initial={false}
      animate={{ x: box.x, y: box.y }}
      transition={{ type: "spring", stiffness: 190, damping: 26 }}
      {...interactiveProps(() => onSelect(loc.id))}
    >
      <title>{loc.name}</title>
      <rect
        width={box.w}
        height={box.h}
        fill="var(--panel-2)"
        fillOpacity={0.85}
      />
      <rect
        width={box.w}
        height={box.h}
        fill={threat ? THREAT_TINT[threat] : "transparent"}
        stroke={selected ? "var(--gold-bright)" : "var(--line-strong)"}
        strokeWidth={selected ? 1.4 : 0.9}
        strokeDasharray={CANONICITY_DASH[loc.canonicity]}
      />
      {controlColor && <rect width={2} height={box.h} fill={controlColor} />}
      <text
        x={7}
        y={14}
        fill="var(--parchment)"
        style={{
          font: "9px var(--font-geist-mono), monospace",
          letterSpacing: "0.05em",
        }}
      >
        {wide ? loc.name : shortName(loc.name)}
      </text>
      {mark && (
        <text
          x={box.w - (count > 0 ? 26 : 8)}
          y={14}
          textAnchor="end"
          fill="var(--faint)"
          style={{ font: "8px var(--font-geist-mono), monospace" }}
        >
          {mark}
        </text>
      )}
      {count > 0 && (
        <text
          x={box.w - 7}
          y={14}
          textAnchor="end"
          fill="var(--ivory)"
          style={{ font: "9px var(--font-geist-mono), monospace" }}
        >
          {count}
        </text>
      )}
      {remains > 0 && (
        <text
          x={box.w - 7}
          y={26}
          textAnchor="end"
          fill="var(--blood)"
          style={{ font: "8px var(--font-geist-mono), monospace" }}
        >
          † {remains}
        </text>
      )}
    </motion.g>
  );
}
