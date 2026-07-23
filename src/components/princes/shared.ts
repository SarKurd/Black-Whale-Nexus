/**
 * Shared helpers for the Royal War Council pages.
 */

import type { Prince, RiskLevel } from "@/lib/types";

/** Risk-level palette — matches the command-center usage. */
export const RISK_COLOR: Record<RiskLevel, string> = {
  low: "var(--alive)",
  moderate: "var(--teal)",
  high: "var(--warn)",
  critical: "var(--blood-bright)",
  eliminated: "var(--faint)",
};

export const RISK_LEVELS: RiskLevel[] = [
  "low",
  "moderate",
  "high",
  "critical",
  "eliminated",
];

/** 1 → "1st", 2 → "2nd", 11 → "11th" … */
export function ordinal(rankNumber: number): string {
  const remainderHundred = rankNumber % 100;
  if (remainderHundred >= 11 && remainderHundred <= 13)
    return `${rankNumber}th`;
  switch (rankNumber % 10) {
    case 1:
      return `${rankNumber}st`;
    case 2:
      return `${rankNumber}nd`;
    case 3:
      return `${rankNumber}rd`;
    default:
      return `${rankNumber}th`;
  }
}

export type RiskEntry = Prince["riskHistory"][number];

/** Latest risk assessment on record at chapter `at` (in-universe stamped). */
export function riskAt(prince: Prince, at: number): RiskEntry | undefined {
  let best: RiskEntry | undefined;
  for (const entry of prince.riskHistory) {
    if (entry.ch <= at && (!best || entry.ch >= best.ch)) best = entry;
  }
  return best;
}
