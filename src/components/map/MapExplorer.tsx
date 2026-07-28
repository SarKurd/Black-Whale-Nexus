"use client";

import { useMemo } from "react";
import { characterById, factionById, locations } from "@/lib/db";
import { latestStamp } from "@/lib/spoiler";
import type { ShipLocation } from "@/lib/types";
import { useUrlString } from "@/lib/urlState";
import {
  assignToContainers,
  CANONICITY_DASH,
  CANONICITY_MARK,
  isAboard,
  type Occupancy,
  type Occupant,
  occupantColor,
  THREAT_COLOR,
  THREAT_TINT,
  type ThreatLevel,
} from "./occupancy";

const PASSAGE_ID = "hidden-passage-network";

const LAYERS = [
  ["activity", "Activity"],
  ["threat", "Threat"],
  ["control", "Control"],
  ["certainty", "Certainty"],
] as const;

type MapLayer = (typeof LAYERS)[number][0];

const TIER_WIDTH: Record<number, string> = {
  1: "78%",
  2: "86%",
  3: "92%",
  4: "84%",
  5: "72%",
};

interface FactionCluster {
  id: string;
  name: string;
  color: string;
  count: number;
}

function threatAt(loc: ShipLocation, ch: number): ThreatLevel | undefined {
  return latestStamp(loc.threatHistory, ch)?.value as ThreatLevel | undefined;
}

function controlAt(loc: ShipLocation, ch: number) {
  const controlId = latestStamp(loc.controlHistory, ch)?.value;
  return controlId ? factionById.get(controlId) : undefined;
}

function factionClusters(occupants: Occupant[]): FactionCluster[] {
  const groups = new Map<string, FactionCluster>();
  for (const occupant of occupants) {
    const character = characterById.get(occupant.characterId);
    const faction = character?.factionIds[0]
      ? factionById.get(character.factionIds[0])
      : undefined;
    const color = faction?.color ?? occupantColor(occupant.characterId);
    const id = faction?.id ?? "unaffiliated";
    const current = groups.get(id);
    if (current) {
      current.count += 1;
    } else {
      groups.set(id, {
        id,
        name: faction?.name ?? "Unaffiliated",
        color,
        count: 1,
      });
    }
  }
  return [...groups.values()]
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    .slice(0, 3);
}

function ThreatBadge({ threat }: { threat?: ThreatLevel }) {
  if (!threat) return null;
  return (
    <span
      className="border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest"
      style={{
        color: THREAT_COLOR[threat],
        borderColor: "color-mix(in srgb, currentColor 38%, transparent)",
      }}
    >
      {threat}
    </span>
  );
}

function LayerControl({
  layer,
  onChange,
}: {
  layer: MapLayer;
  onChange: (layer: MapLayer) => void;
}) {
  return (
    <fieldset className="flex flex-wrap border border-line">
      <legend className="sr-only">Map intelligence layer</legend>
      {LAYERS.map(([value, label]) => (
        <button
          key={value}
          type="button"
          onClick={() => onChange(value)}
          aria-pressed={layer === value}
          className={`px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors ${
            layer === value
              ? "bg-gold/10 text-gold-bright"
              : "text-muted hover:bg-raised hover:text-parchment"
          }`}
        >
          {label}
        </button>
      ))}
    </fieldset>
  );
}

export function MapExplorer({
  displayCh,
  occupancy,
  selectedId,
  focusedTier,
  onFocusTier,
  onSelect,
}: {
  displayCh: number;
  occupancy: Occupancy;
  selectedId: string | null;
  focusedTier: number | null;
  onFocusTier: (tier: number | null) => void;
  onSelect: (locationId: string) => void;
}) {
  const [layerValue, setLayerValue] = useUrlString(
    "layer",
    "activity",
    (value) => LAYERS.some(([layer]) => layer === value),
  );
  const [activeOnlyValue, setActiveOnlyValue] = useUrlString(
    "active",
    "all",
    (value) => value === "all" || value === "only",
  );
  const [showShoreValue, setShowShoreValue] = useUrlString(
    "shore",
    "hidden",
    (value) => value === "hidden" || value === "shown",
  );
  const layer = layerValue as MapLayer;
  const activeOnly = activeOnlyValue === "only";
  const showShore = showShoreValue === "shown";

  const visibleLocations = useMemo(
    () => locations.filter((loc) => loc.introducedCh <= displayCh),
    [displayCh],
  );
  const tiers = useMemo(
    () =>
      visibleLocations
        .filter((loc) => loc.kind === "tier")
        .sort((a, b) => (a.tier ?? 0) - (b.tier ?? 0)),
    [visibleLocations],
  );
  const shoreLocations = useMemo(
    () =>
      visibleLocations.filter(
        (loc) =>
          loc.id !== "black-whale" &&
          loc.id !== PASSAGE_ID &&
          !isAboard(loc.id),
      ),
    [visibleLocations],
  );
  const passage = visibleLocations.find((loc) => loc.id === PASSAGE_ID);

  const { livingByContainer, remainsByContainer } = useMemo(() => {
    const drawn = new Set(visibleLocations.map((loc) => loc.id));
    drawn.add("black-whale");
    return {
      livingByContainer: assignToContainers(occupancy.occupants, drawn),
      remainsByContainer: assignToContainers(occupancy.remains, drawn),
    };
  }, [occupancy, visibleLocations]);

  const focusedTierLoc =
    focusedTier === null
      ? undefined
      : tiers.find((loc) => loc.tier === focusedTier);
  const focusedRooms =
    focusedTier === null
      ? []
      : visibleLocations.filter(
          (loc) => loc.tier === focusedTier && loc.kind !== "tier",
        );

  return (
    <section className="dossier corner-ticks bg-bg-deep/60 p-3 sm:p-4">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3 border-b border-line pb-3">
        <div>
          <div className="intel-label-gold">
            {focusedTierLoc
              ? "Focused deck plan"
              : "Ship intelligence overview"}
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            {focusedTierLoc && (
              <button
                type="button"
                onClick={() => onFocusTier(null)}
                className="font-mono text-[10px] uppercase tracking-widest text-teal hover:text-gold-bright"
              >
                ← Ship overview
              </button>
            )}
            <h2 className="royal-heading text-xl">
              {focusedTierLoc?.name ?? "Black Whale No. 1"}
            </h2>
          </div>
          <p className="mt-1 max-w-2xl text-xs text-muted">
            {focusedTierLoc
              ? "Readable compartment files for this tier. Select a room to keep its intelligence visible alongside the plan."
              : "Choose a tier to inspect its rooms. The whole-ship view prioritizes orientation and current activity."}
          </p>
        </div>
        <LayerControl layer={layer} onChange={setLayerValue} />
      </div>

      {focusedTierLoc ? (
        <TierDetail
          tier={focusedTierLoc}
          rooms={focusedRooms}
          layer={layer}
          displayCh={displayCh}
          occupancy={occupancy}
          livingByContainer={livingByContainer}
          remainsByContainer={remainsByContainer}
          selectedId={selectedId}
          activeOnly={activeOnly}
          onActiveOnlyChange={(next) =>
            setActiveOnlyValue(next ? "only" : "all")
          }
          onSelect={onSelect}
        />
      ) : (
        <ShipOverview
          tiers={tiers}
          shoreLocations={shoreLocations}
          passage={passage}
          layer={layer}
          displayCh={displayCh}
          occupancy={occupancy}
          livingByContainer={livingByContainer}
          remainsByContainer={remainsByContainer}
          showShore={showShore}
          onShowShoreChange={(next) =>
            setShowShoreValue(next ? "shown" : "hidden")
          }
          onFocusTier={onFocusTier}
          onSelect={onSelect}
          selectedId={selectedId}
        />
      )}
    </section>
  );
}

function ShipOverview({
  tiers,
  shoreLocations,
  passage,
  layer,
  displayCh,
  occupancy,
  livingByContainer,
  remainsByContainer,
  showShore,
  onShowShoreChange,
  onFocusTier,
  onSelect,
  selectedId,
}: {
  tiers: ShipLocation[];
  shoreLocations: ShipLocation[];
  passage?: ShipLocation;
  layer: MapLayer;
  displayCh: number;
  occupancy: Occupancy;
  livingByContainer: Map<string, Occupant[]>;
  remainsByContainer: Map<string, Occupant[]>;
  showShore: boolean;
  onShowShoreChange: (show: boolean) => void;
  onFocusTier: (tier: number) => void;
  onSelect: (locationId: string) => void;
  selectedId: string | null;
}) {
  const unknownAboard = livingByContainer.get("black-whale")?.length ?? 0;

  return (
    <div>
      <div className="mb-4 grid grid-cols-3 gap-2">
        {[
          ["Tracked aboard", occupancy.aboardCount],
          ["Ashore", occupancy.ashoreCount],
          ["Position unknown", unknownAboard],
        ].map(([label, value]) => (
          <div key={label} className="border border-line bg-panel/50 p-2.5">
            <div className="font-mono text-[9px] uppercase tracking-widest text-faint">
              {label}
            </div>
            <div className="royal-heading mt-0.5 text-xl text-ivory">
              {value}
            </div>
          </div>
        ))}
      </div>

      <div className="relative overflow-hidden border border-line bg-bg-deep/70 px-3 py-5 sm:px-8">
        <svg
          viewBox="0 0 1000 600"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full text-line-strong"
          aria-hidden="true"
        >
          <path
            d="M 150 28 C 70 44 34 160 42 300 C 34 430 86 556 190 570 L 812 570 C 900 558 944 410 956 300 C 944 180 914 52 834 28 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M 956 300 L 995 250 L 976 300 L 995 350 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>

        <div className="relative mx-auto flex max-w-4xl flex-col gap-2 py-2">
          <div className="mb-1 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
            Black Whale No. 1 · Chapter {displayCh}
          </div>
          {tiers.map((tierLoc) => (
            <TierBand
              key={tierLoc.id}
              tier={tierLoc}
              layer={layer}
              displayCh={displayCh}
              occupancy={occupancy}
              livingByContainer={livingByContainer}
              remainsByContainer={remainsByContainer}
              onFocusTier={onFocusTier}
            />
          ))}
        </div>
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => onShowShoreChange(!showShore)}
          className="flex items-center justify-between border border-dashed border-line px-3 py-2 text-left hover:border-line-strong"
        >
          <span>
            <span className="block font-mono text-[10px] uppercase tracking-widest text-muted">
              Shore records
            </span>
            <span className="text-xs text-faint">
              {shoreLocations.length} mapped locations · {occupancy.ashoreCount}{" "}
              tracked
            </span>
          </span>
          <span className="font-mono text-xs text-gold">
            {showShore ? "−" : "+"}
          </span>
        </button>
        {passage && (
          <button
            type="button"
            onClick={() => onSelect(passage.id)}
            className={`flex items-center justify-between border border-dashed px-3 py-2 text-left transition-colors ${
              selectedId === passage.id
                ? "border-gold-line"
                : "border-line hover:border-line-strong"
            }`}
          >
            <span>
              <span className="block text-sm text-parchment">
                {passage.name}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-faint">
                Off-plan · inferred
              </span>
            </span>
            <span className="font-mono text-xs text-violet">Open →</span>
          </button>
        )}
      </div>

      {showShore && (
        <div className="mt-2 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {shoreLocations.map((loc) => (
            <RoomCard
              key={loc.id}
              loc={loc}
              layer={layer}
              displayCh={displayCh}
              occupants={livingByContainer.get(loc.id) ?? []}
              remains={remainsByContainer.get(loc.id)?.length ?? 0}
              selected={selectedId === loc.id}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function TierBand({
  tier,
  layer,
  displayCh,
  occupancy,
  livingByContainer,
  remainsByContainer,
  onFocusTier,
}: {
  tier: ShipLocation;
  layer: MapLayer;
  displayCh: number;
  occupancy: Occupancy;
  livingByContainer: Map<string, Occupant[]>;
  remainsByContainer: Map<string, Occupant[]>;
  onFocusTier: (tier: number) => void;
}) {
  const tierNumber = tier.tier ?? 0;
  const rooms = locations.filter(
    (loc) =>
      loc.tier === tierNumber &&
      loc.kind !== "tier" &&
      loc.introducedCh <= displayCh,
  );
  const threat = threatAt(tier, displayCh);
  const control = controlAt(tier, displayCh);
  const aboard = occupancy.byLocation.get(tier.id)?.length ?? 0;
  const remains = occupancy.remainsByLocation.get(tier.id)?.length ?? 0;
  const activeRooms = rooms.filter((room) => {
    const roomThreat = threatAt(room, displayCh);
    return (
      (livingByContainer.get(room.id)?.length ?? 0) > 0 ||
      (remainsByContainer.get(room.id)?.length ?? 0) > 0 ||
      (roomThreat !== undefined && roomThreat !== "secure")
    );
  }).length;
  const uncertain = rooms.filter((room) => room.canonicity !== "canonical");
  const canonical = rooms.length - uncertain.length;

  let layerDetail = `${activeRooms} active · ${rooms.length} mapped rooms`;
  if (layer === "threat") {
    layerDetail = `${threat ?? "unrated"} tier · ${remains} remains recorded`;
  } else if (layer === "control") {
    layerDetail = control?.name ?? "No controlling faction recorded";
  } else if (layer === "certainty") {
    layerDetail = `${canonical} canonical · ${uncertain.length} estimated`;
  }

  return (
    <button
      type="button"
      onClick={() => onFocusTier(tierNumber)}
      className="group mx-auto grid min-h-16 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border border-line-strong bg-panel/95 px-3 py-2.5 text-left shadow-[0_8px_24px_rgba(0,0,0,0.16)] transition-colors hover:border-gold-line hover:bg-raised focus-visible:border-gold-bright focus-visible:outline-none"
      style={{
        width: TIER_WIDTH[tierNumber] ?? "82%",
        background:
          layer === "threat" && threat
            ? THREAT_TINT[threat]
            : "color-mix(in srgb, var(--panel) 95%, transparent)",
        borderLeftColor: control?.color ?? "var(--line-strong)",
        borderLeftWidth: 3,
      }}
    >
      <span className="min-w-0">
        <span className="flex flex-wrap items-center gap-2">
          <span
            className={`font-mono text-xs uppercase tracking-[0.18em] ${
              tierNumber === 1 ? "text-gold" : "text-parchment"
            }`}
          >
            {tier.name}
          </span>
          <ThreatBadge threat={threat} />
        </span>
        <span className="mt-1 block text-xs text-muted">{layerDetail}</span>
      </span>
      <span className="text-right">
        <span className="block royal-heading text-xl text-ivory">{aboard}</span>
        <span className="font-mono text-[9px] uppercase tracking-wider text-faint">
          aboard · open →
        </span>
      </span>
    </button>
  );
}

function TierDetail({
  tier,
  rooms,
  layer,
  displayCh,
  occupancy,
  livingByContainer,
  remainsByContainer,
  selectedId,
  activeOnly,
  onActiveOnlyChange,
  onSelect,
}: {
  tier: ShipLocation;
  rooms: ShipLocation[];
  layer: MapLayer;
  displayCh: number;
  occupancy: Occupancy;
  livingByContainer: Map<string, Occupant[]>;
  remainsByContainer: Map<string, Occupant[]>;
  selectedId: string | null;
  activeOnly: boolean;
  onActiveOnlyChange: (active: boolean) => void;
  onSelect: (locationId: string) => void;
}) {
  const tierThreat = threatAt(tier, displayCh);
  const tierControl = controlAt(tier, displayCh);
  const aboard = occupancy.byLocation.get(tier.id)?.length ?? 0;
  const remains = occupancy.remainsByLocation.get(tier.id)?.length ?? 0;
  const visibleRooms = activeOnly
    ? rooms.filter((room) => {
        const threat = threatAt(room, displayCh);
        return (
          (livingByContainer.get(room.id)?.length ?? 0) > 0 ||
          (remainsByContainer.get(room.id)?.length ?? 0) > 0 ||
          (threat !== undefined && threat !== "secure")
        );
      })
    : rooms;

  return (
    <div>
      <div className="mb-3 grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
        <button
          type="button"
          onClick={() => onSelect(tier.id)}
          className={`flex items-center justify-between gap-3 border border-l-[3px] px-3 py-2 text-left transition-colors ${
            selectedId === tier.id
              ? "border-gold-line"
              : "border-line hover:border-line-strong"
          }`}
          style={{
            borderLeftColor: tierControl?.color ?? "var(--line-strong)",
          }}
        >
          <span>
            <span className="text-sm text-parchment">
              Tier intelligence file
            </span>
            <span className="mt-0.5 block text-xs text-muted">
              {tierControl?.name ?? "Control unrecorded"} · {rooms.length}{" "}
              mapped compartments
            </span>
          </span>
          <span className="flex items-center gap-2">
            <ThreatBadge threat={tierThreat} />
            {remains > 0 && (
              <span className="font-mono text-[10px] text-blood">
                † {remains}
              </span>
            )}
            <span className="royal-heading text-xl text-ivory">{aboard}</span>
          </span>
        </button>
        <button
          type="button"
          onClick={() => onActiveOnlyChange(!activeOnly)}
          aria-pressed={activeOnly}
          className={`border px-3 py-2 font-mono text-[10px] uppercase tracking-widest transition-colors ${
            activeOnly
              ? "border-gold-line bg-gold/10 text-gold-bright"
              : "border-line text-muted hover:border-line-strong hover:text-parchment"
          }`}
        >
          Active only
        </button>
      </div>

      <div className="grid gap-2 sm:grid-cols-2 2xl:grid-cols-3">
        {visibleRooms.map((loc) => (
          <RoomCard
            key={loc.id}
            loc={loc}
            layer={layer}
            displayCh={displayCh}
            occupants={livingByContainer.get(loc.id) ?? []}
            remains={remainsByContainer.get(loc.id)?.length ?? 0}
            selected={selectedId === loc.id}
            onSelect={onSelect}
          />
        ))}
      </div>

      {visibleRooms.length === 0 && (
        <div className="border border-dashed border-line p-5 text-center text-sm text-muted">
          No active compartments match this view.
        </div>
      )}
    </div>
  );
}

function RoomCard({
  loc,
  layer,
  displayCh,
  occupants,
  remains,
  selected,
  onSelect,
}: {
  loc: ShipLocation;
  layer: MapLayer;
  displayCh: number;
  occupants: Occupant[];
  remains: number;
  selected: boolean;
  onSelect: (locationId: string) => void;
}) {
  const threat = threatAt(loc, displayCh);
  const control = controlAt(loc, displayCh);
  const clusters = factionClusters(occupants);
  const mark = CANONICITY_MARK[loc.canonicity];
  const certaintyLabel =
    loc.canonicity === "canonical" ? "canonical" : loc.canonicity;

  let background = "color-mix(in srgb, var(--panel) 92%, transparent)";
  if (layer === "threat" && threat) background = THREAT_TINT[threat];
  if (layer === "control" && control) {
    background = `color-mix(in srgb, ${control.color} 10%, var(--panel))`;
  }

  return (
    <button
      type="button"
      onClick={() => onSelect(loc.id)}
      className={`group min-h-28 border border-l-[3px] p-3 text-left transition-colors focus-visible:border-gold-bright focus-visible:outline-none ${
        selected
          ? "border-gold-line shadow-[0_0_0_1px_var(--gold-line)]"
          : "border-line hover:border-line-strong"
      }`}
      style={{
        background,
        borderLeftColor: control?.color ?? "var(--line-strong)",
        borderStyle: CANONICITY_DASH[loc.canonicity] ? "dashed" : "solid",
      }}
    >
      <span className="flex items-start justify-between gap-3">
        <span className="min-w-0 text-sm leading-snug text-parchment">
          {loc.name}
          {mark && (
            <span className="ml-1.5 font-mono text-[9px] text-faint">
              {mark}
            </span>
          )}
        </span>
        <span className="shrink-0 border border-line bg-bg-deep/60 px-2 py-0.5 font-mono text-xs text-ivory">
          {occupants.length}
        </span>
      </span>

      <span className="mt-2 flex min-h-5 flex-wrap items-center gap-1.5">
        {layer === "certainty" ? (
          <span className="font-mono text-[9px] uppercase tracking-widest text-violet">
            {certaintyLabel}
          </span>
        ) : layer === "control" ? (
          <span className="truncate text-xs text-muted">
            {control?.name ?? "Control unrecorded"}
          </span>
        ) : (
          <ThreatBadge threat={threat} />
        )}
        {remains > 0 && (
          <span className="border border-blood/30 px-1.5 py-0.5 font-mono text-[9px] text-blood">
            † {remains}
          </span>
        )}
      </span>

      <span className="mt-2 flex items-center gap-2 border-t border-line/70 pt-2">
        {clusters.length > 0 ? (
          clusters.map((cluster) => (
            <span
              key={cluster.id}
              className="inline-flex min-w-0 items-center gap-1 text-[10px] text-faint"
              title={`${cluster.name}: ${cluster.count}`}
            >
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ background: cluster.color }}
              />
              <span className="font-mono">{cluster.count}</span>
            </span>
          ))
        ) : (
          <span className="font-mono text-[9px] uppercase tracking-widest text-faint">
            No tracked occupants
          </span>
        )}
        <span className="ml-auto font-mono text-[9px] uppercase tracking-wider text-teal opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          Open file →
        </span>
      </span>
    </button>
  );
}
