/**
 * Occupancy derivation for the Black Whale blueprint.
 *
 * A character "occupies" every location on the chain from their resolved
 * position up to the ship root, so a tier band can report everyone on the
 * tier while a room reports only the people actually inside it.
 */

import { characterById, characters, factionById, locationById } from "@/lib/db";
import { locationAt, statusAt } from "@/lib/spoiler";

/** Location id chain from `locationId` up through every parent to the root. */
export function ancestorChain(locationId: string): string[] {
  const chain: string[] = [];
  let currentId: string | undefined = locationId;
  // Guard against accidental parentId cycles in the dataset.
  let guard = 0;
  while (currentId && guard < 16) {
    chain.push(currentId);
    currentId = locationById.get(currentId)?.parentId;
    guard += 1;
  }
  return chain;
}

export interface Occupant {
  characterId: string;
  /** Deepest resolved location id at the viewed chapter. */
  locationId: string;
  /** Chapter the character arrived at that location. */
  sinceCh: number;
}

export interface Occupancy {
  /** Every placed LIVING character, in stable dataset order. */
  occupants: Occupant[];
  /** Rollup: location id → living occupants at it or at any descendant. */
  byLocation: Map<string, Occupant[]>;
  /**
   * The dead whose bodies rest at a location (interments, unrecovered
   * remains). Kept out of the occupant counts and dots — a burial chamber
   * has residents of a different kind.
   */
  remainsByLocation: Map<string, Occupant[]>;
}

/** Reader-visible occupancy of every location at chapter `ch`. */
export function computeOccupancy(ch: number): Occupancy {
  const occupants: Occupant[] = [];
  const byLocation = new Map<string, Occupant[]>();
  const remainsByLocation = new Map<string, Occupant[]>();
  for (const character of characters) {
    if (character.introducedCh > ch) continue;
    const resolved = locationAt(character, ch);
    if (!resolved) continue;
    const occupant: Occupant = {
      characterId: character.id,
      locationId: resolved.locationId,
      sinceCh: resolved.sinceCh,
    };
    const status = statusAt(character, ch)?.status;
    if (status === "dead" || status === "presumed-dead") {
      for (const id of ancestorChain(resolved.locationId)) {
        const list = remainsByLocation.get(id) ?? [];
        list.push(occupant);
        remainsByLocation.set(id, list);
      }
      continue;
    }
    occupants.push(occupant);
    for (const id of ancestorChain(resolved.locationId)) {
      const list = byLocation.get(id) ?? [];
      list.push(occupant);
      byLocation.set(id, list);
    }
  }
  return { occupants, byLocation, remainsByLocation };
}

/** Primary-faction color used for a character's occupancy dot. */
export function occupantColor(characterId: string): string {
  const character = characterById.get(characterId);
  const faction = character?.factionIds[0]
    ? factionById.get(character.factionIds[0])
    : undefined;
  return faction?.color ?? "var(--gold-dim)";
}

export type ThreatLevel = "secure" | "tense" | "contested" | "lethal";

/** Subtle background tint per threat level (secure stays untinted). */
export const THREAT_TINT: Record<ThreatLevel, string> = {
  secure: "transparent",
  tense: "color-mix(in srgb, var(--warn) 8%, transparent)",
  contested: "color-mix(in srgb, var(--warn) 15%, transparent)",
  lethal: "color-mix(in srgb, var(--blood) 15%, transparent)",
};

export const THREAT_COLOR: Record<ThreatLevel, string> = {
  secure: "var(--alive)",
  tense: "var(--warn)",
  contested: "var(--warn)",
  lethal: "var(--blood)",
};

/** Stroke dash per canonicity — blueprint convention for uncertain geometry. */
export const CANONICITY_DASH: Record<string, string | undefined> = {
  canonical: undefined,
  approximate: "5 3",
  inferred: "2 3",
  unknown: "1 4",
};

export const CANONICITY_MARK: Record<string, string> = {
  canonical: "",
  approximate: "≈",
  inferred: "inf",
  unknown: "?",
};

export const CANONICITY_COLOR: Record<string, string> = {
  canonical: "var(--gold)",
  approximate: "var(--warn)",
  inferred: "var(--violet)",
  unknown: "var(--faint)",
};
