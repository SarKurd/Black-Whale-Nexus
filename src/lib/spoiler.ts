/**
 * Spoiler engine — pure helpers that reconstruct story state at a chapter.
 *
 * Convention: `revealCh === 0` (or `introducedCh === 0`) means "known before
 * the arc" and is visible in every mode, including anime-only.
 */

import type {
  Character,
  CharacterStatus,
  Mystery,
  MysteryStatus,
  Relationship,
  Stamp,
} from "@/lib/types";

/** Is something revealed to the reader at chapter `at`? */
export function revealed(revealCh: number | undefined, at: number): boolean {
  if (revealCh === undefined) return true;
  return revealCh <= at;
}

/** Latest stamped value whose reveal chapter has passed. */
export function latestStamp<T>(
  stamps: Stamp<T>[] | undefined,
  at: number,
): Stamp<T> | undefined {
  if (!stamps || stamps.length === 0) return undefined;
  let best: Stamp<T> | undefined;
  for (const s of stamps) {
    const rev = s.revealCh ?? s.ch;
    if (rev <= at && (!best || s.ch >= best.ch)) best = s;
  }
  return best;
}

export interface StatusAt {
  status: CharacterStatus;
  note?: string;
  sinceCh: number;
}

/** Character status as the reader knows it at chapter `at`. */
export function statusAt(c: Character, at: number): StatusAt | undefined {
  let best: StatusAt | undefined;
  let bestCh = -1;
  for (const s of c.statusHistory) {
    const rev = s.revealCh ?? s.ch;
    if (rev <= at && s.ch >= bestCh) {
      bestCh = s.ch;
      best = { status: s.status, note: s.note, sinceCh: s.ch };
    }
  }
  return best;
}

export interface LocationAt {
  locationId: string;
  note?: string;
  sinceCh: number;
}

/** Character location as the reader knows it at chapter `at`. */
export function locationAt(c: Character, at: number): LocationAt | undefined {
  let best: LocationAt | undefined;
  let bestCh = -1;
  for (const l of c.locationHistory) {
    const rev = l.revealCh ?? l.ch;
    if (rev <= at && l.ch >= bestCh) {
      bestCh = l.ch;
      best = { locationId: l.locationId, note: l.note, sinceCh: l.ch };
    }
  }
  return best;
}

/** Is the character on the board at all at chapter `at`? */
export function characterVisible(c: Character, at: number): boolean {
  return c.introducedCh <= at;
}

/**
 * Is a relationship visible at chapter `at`?
 * Visible from its reveal chapter; if it ended AND the ending is within view,
 * it is still visible (rendered as "former") — callers can check `endedAt`.
 */
export function relationshipVisible(r: Relationship, at: number): boolean {
  return r.revealCh <= at;
}

/** Has the relationship ended by chapter `at` (as the reader knows)? */
export function relationshipEnded(r: Relationship, at: number): boolean {
  return r.endCh !== undefined && r.endCh <= at;
}

/** Mystery status at chapter `at`. */
export function mysteryStatusAt(m: Mystery, at: number): MysteryStatus {
  const s = latestStamp(m.statusHistory, at);
  return s?.value ?? "open";
}

/** Human labels. */
export const STATUS_LABEL: Record<CharacterStatus, string> = {
  alive: "Alive",
  dead: "Deceased",
  missing: "Missing",
  incapacitated: "Incapacitated",
  possessed: "Possessed",
  detained: "Detained",
  "presumed-dead": "Presumed dead",
  unknown: "Unknown",
};

export const STATUS_COLOR: Record<CharacterStatus, string> = {
  alive: "var(--alive)",
  dead: "var(--blood)",
  missing: "var(--warn)",
  incapacitated: "var(--warn)",
  possessed: "var(--violet)",
  detained: "var(--muted)",
  "presumed-dead": "var(--blood)",
  unknown: "var(--faint)",
};

export const CONFIDENCE_LABEL = {
  canonical: "Canonical",
  "strong-inference": "Strong inference",
  "weak-inference": "Weak inference",
  theory: "Theory",
  unknown: "Unknown",
} as const;

export const CONFIDENCE_COLOR = {
  canonical: "var(--gold)",
  "strong-inference": "var(--teal)",
  "weak-inference": "var(--muted)",
  theory: "var(--violet)",
  unknown: "var(--faint)",
} as const;
