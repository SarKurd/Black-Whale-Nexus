"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { characterById, factionById, locationById, locations } from "@/lib/db";
import { latestStamp } from "@/lib/spoiler";
import type { ShipLocation } from "@/lib/types";
import {
  ancestorChain,
  CANONICITY_DASH,
  CANONICITY_MARK,
  type Occupancy,
  occupantColor,
  THREAT_TINT,
  type ThreatLevel,
} from "./occupancy";

/* Blueprint drawing constants (SVG user units). */
const VIEW_W = 1000;
const TOP_Y = 72;
const BOX_W = 118;
const BOX_H = 44;
const GAP = 8;
const LABEL_W = 100;
const PAD = 10;
const MAX_DOTS = 8;
const PASSAGE_ID = "hidden-passage-network";

/** Horizontal extent of each tier band — taper suggests the whale hull. */
const BAND_X: Record<number, [number, number]> = {
  1: [150, 900],
  2: [122, 928],
  3: [114, 934],
  4: [134, 914],
  5: [184, 862],
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
  cx: number;
  cy: number;
  color: string;
}

function shortName(name: string): string {
  const cleaned = name.replace(/\s*\(.*\)$/, "");
  return cleaned.length > 16 ? `${cleaned.slice(0, 15)}…` : cleaned;
}

/** Flow-layout of tier bands and their location boxes at a chapter. */
function computeLayout(displayCh: number): {
  bands: BandLayout[];
  bottomY: number;
  passage?: BoxLayout;
} {
  const bands: BandLayout[] = [];
  let y = TOP_Y;
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
  return { bands, bottomY: y, passage };
}

/**
 * Place occupancy dots: each character lands in the deepest drawn container
 * on their location chain (room box → tier band → skipped at ship root).
 */
function computeDots(
  occupancy: Occupancy,
  bands: BandLayout[],
  passage?: BoxLayout,
): DotLayout[] {
  const boxByLoc = new Map<string, BoxLayout>();
  for (const band of bands) {
    for (const box of band.boxes) boxByLoc.set(box.loc.id, box);
  }
  if (passage) boxByLoc.set(passage.loc.id, passage);
  const bandByLoc = new Map(bands.map((b) => [b.loc.id, b]));

  const dots: DotLayout[] = [];
  const slotCounter = new Map<string, number>();
  for (const occupant of occupancy.occupants) {
    const chain = ancestorChain(occupant.locationId);
    const targetId = chain.find((id) => boxByLoc.has(id) || bandByLoc.has(id));
    if (!targetId) continue;
    const slot = slotCounter.get(targetId) ?? 0;
    if (slot >= MAX_DOTS) continue;
    slotCounter.set(targetId, slot + 1);
    const color = occupantColor(occupant.characterId);
    const box = boxByLoc.get(targetId);
    if (box) {
      dots.push({
        characterId: occupant.characterId,
        cx: box.x + 9 + slot * 11,
        cy: box.y + box.h - 9,
        color,
      });
    } else {
      const band = bandByLoc.get(targetId);
      if (!band) continue;
      dots.push({
        characterId: occupant.characterId,
        cx: band.x0 + PAD + 4 + slot * 11,
        cy: band.y + band.h - 10,
        color,
      });
    }
  }
  return dots;
}

/** Whale silhouette wrapped around the stacked tier bands. */
function hullPath(bottomY: number): string {
  const midY = (TOP_Y + bottomY) / 2;
  const [t1x0, t1x1] = BAND_X[1];
  const [t5x0, t5x1] = BAND_X[5];
  return [
    `M ${t1x0} ${TOP_Y}`,
    // Bow (whale head) sweeping down the left side.
    `C ${t1x0 - 100} ${TOP_Y + 6} 34 ${midY - 70} 34 ${midY}`,
    `C 34 ${midY + 70} ${t5x0 - 110} ${bottomY - 6} ${t5x0} ${bottomY}`,
    `L ${t5x1} ${bottomY}`,
    // Tapering stern toward the tail.
    `C ${t5x1 + 56} ${bottomY - 10} 946 ${midY + 34} 956 ${midY}`,
    `C 946 ${midY - 34} ${t1x1 + 44} ${TOP_Y + 10} ${t1x1} ${TOP_Y}`,
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
  onSelect,
}: {
  displayCh: number;
  occupancy: Occupancy;
  selectedId: string | null;
  onSelect: (locationId: string) => void;
}) {
  const { bands, bottomY, passage } = useMemo(
    () => computeLayout(displayCh),
    [displayCh],
  );
  const dots = useMemo(
    () => computeDots(occupancy, bands, passage),
    [occupancy, bands, passage],
  );
  const midY = (TOP_Y + bottomY) / 2;
  const viewH = (passage ? passage.y + passage.h : bottomY) + 26;

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${viewH}`}
      className="h-auto w-full"
      aria-label="Black Whale cross-section blueprint"
    >
      <title>Black Whale No. 1 — conceptual cross-section</title>

      {/* Waterline */}
      <line
        x1={8}
        y1={TOP_Y - 22}
        x2={VIEW_W - 8}
        y2={TOP_Y - 22}
        stroke="var(--line)"
        strokeDasharray="8 5"
      />
      <text
        x={12}
        y={TOP_Y - 28}
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
          d={hullPath(bottomY)}
          fill="var(--bg-deep)"
          fillOpacity={0.5}
          stroke={
            selectedId === "black-whale"
              ? "var(--gold-bright)"
              : "var(--line-strong)"
          }
          strokeWidth={1.3}
        />
        {/* Tail fluke */}
        <path
          d={`M 956 ${midY} L 992 ${midY - 44} L 972 ${midY} L 992 ${midY + 44} Z`}
          fill="none"
          stroke="var(--line-strong)"
          strokeWidth={1.1}
        />
        {/* Dorsal fin */}
        <path
          d={`M 460 ${TOP_Y} C 480 ${TOP_Y - 26} 540 ${TOP_Y - 26} 560 ${TOP_Y} Z`}
          fill="none"
          stroke="var(--line-strong)"
          strokeWidth={1.1}
        />
        <text
          x={BAND_X[1][0]}
          y={TOP_Y - 34}
          fill="var(--gold)"
          style={{
            font: "10px var(--font-geist-mono), monospace",
            letterSpacing: "0.22em",
          }}
        >
          BLACK WHALE NO. 1 — CROSS-SECTION · {occupancy.occupants.length}{" "}
          TRACKED ABOARD
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
            count={occupancy.byLocation.get(box.loc.id)?.length ?? 0}
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
            count={occupancy.byLocation.get(passage.loc.id)?.length ?? 0}
            onSelect={onSelect}
            wide
          />
        </g>
      )}

      {/* Occupancy dots — one per tracked character, keyed for movement */}
      {dots.map((dot) => (
        <motion.circle
          key={dot.characterId}
          initial={false}
          animate={{ cx: dot.cx, cy: dot.cy }}
          transition={{ type: "spring", stiffness: 190, damping: 24 }}
          r={3.2}
          fill={dot.color}
          stroke="var(--bg-deep)"
          strokeWidth={0.8}
        >
          <title>
            {characterById.get(dot.characterId)?.name ?? dot.characterId}
          </title>
        </motion.circle>
      ))}
    </svg>
  );
}

function LocationBox({
  box,
  displayCh,
  selected,
  count,
  onSelect,
  wide,
}: {
  box: BoxLayout;
  displayCh: number;
  selected: boolean;
  count: number;
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
    </motion.g>
  );
}
