/** Graph presets — named node subsets for the Relationship Web. */

import {
  characters,
  charactersByFaction,
  charactersByPrince,
  deaths,
  relationships,
} from "@/lib/db";

export interface GraphPreset {
  id: string;
  label: string;
  description: string;
  nodeIds: () => Set<string>;
}

function factionMembers(...factionIds: string[]): Set<string> {
  const ids = new Set<string>();
  for (const f of factionIds) {
    ids.add(f);
    for (const c of charactersByFaction.get(f) ?? []) ids.add(c.id);
  }
  return ids;
}

function princeNetwork(princeId: string, characterId: string): Set<string> {
  const ids = new Set<string>([characterId]);
  for (const c of charactersByPrince.get(princeId) ?? []) ids.add(c.id);
  return ids;
}

/** Everyone one edge away from a seed set (via any relationship). */
function expand(seed: Set<string>): Set<string> {
  const out = new Set(seed);
  for (const r of relationships) {
    if (seed.has(r.from)) out.add(r.to);
    if (seed.has(r.to)) out.add(r.from);
  }
  return out;
}

function edgeKindNodes(kinds: string[], secretOnly = false): Set<string> {
  const ids = new Set<string>();
  for (const r of relationships) {
    if (!kinds.includes(r.kind)) continue;
    if (secretOnly && !r.secret) continue;
    ids.add(r.from);
    ids.add(r.to);
  }
  return ids;
}

export const graphPresets: GraphPreset[] = [
  {
    id: "all",
    label: "Full network",
    description: "Every tracked entity aboard the Black Whale.",
    nodeIds: () => new Set(characters.map((c) => c.id)),
  },
  {
    id: "royal-family",
    label: "Royal family",
    description: "The king, his eight queens, and fourteen princes.",
    nodeIds: () =>
      new Set(
        characters
          .filter(
            (c) => c.tags?.includes("prince") || c.tags?.includes("royal"),
          )
          .map((c) => c.id),
      ),
  },
  {
    id: "kurapika-network",
    label: "Kurapika's network",
    description: "Everyone connected to the Rat of the Zodiacs.",
    nodeIds: () => expand(new Set(["kurapika"])),
  },
  {
    id: "woble-protection",
    label: "Woble's protection network",
    description: "Room 1014 — defenders, watchers, and infiltrators.",
    nodeIds: () => expand(princeNetwork("prince-woble", "woble").add("oito")),
  },
  {
    id: "benjamin-forces",
    label: "Benjamin's forces",
    description: "The First Prince's soldiers and where they are embedded.",
    nodeIds: () => expand(factionMembers("benjamin-camp")),
  },
  {
    id: "tserriednich-network",
    label: "Tserriednich's network",
    description: "The Fourth Prince's household and its double agents.",
    nodeIds: () => expand(princeNetwork("prince-tserriednich", "tserriednich")),
  },
  {
    id: "halkenburg-followers",
    label: "Halkenburg's followers",
    description: "The Ninth Prince and the guards marked by his beast.",
    nodeIds: () => expand(princeNetwork("prince-halkenburg", "halkenburg")),
  },
  {
    id: "phantom-troupe",
    label: "Phantom Troupe",
    description: "The Spider aboard, and its prey.",
    nodeIds: () => expand(factionMembers("phantom-troupe")),
  },
  {
    id: "heil-ly",
    label: "Heil-Ly",
    description: "Morena's family of made killers.",
    nodeIds: () => expand(factionMembers("heil-ly")),
  },
  {
    id: "xi-yu",
    label: "Xi-Yu",
    description: "Hinrigh's side of the mafia war.",
    nodeIds: () => expand(factionMembers("xi-yu")),
  },
  {
    id: "cha-r",
    label: "Cha-R",
    description: "The old-guard family holding Tier 5.",
    nodeIds: () => expand(factionMembers("cha-r")),
  },
  {
    id: "hunter-association",
    label: "Hunter Association",
    description: "Zodiacs, pros, and the Beyond problem.",
    nodeIds: () =>
      expand(
        factionMembers("hunter-association", "zodiacs", "beyond-expedition"),
      ),
  },
  {
    id: "nen-students",
    label: "Nen students",
    description: "Kurapika's classroom in Room 1014.",
    nodeIds: () => edgeKindNodes(["teaching-nen", "mentoring"]),
  },
  {
    id: "assassination-network",
    label: "Assassination network",
    description: "Who is hunting, targeting, or killing whom.",
    nodeIds: () => edgeKindNodes(["hunting", "targeting", "killed"]),
  },
  {
    id: "active-conflicts",
    label: "Active conflicts",
    description: "Open hostilities across the ship.",
    nodeIds: () => edgeKindNodes(["enemy", "hunting", "targeting"]),
  },
  {
    id: "secret-alliances",
    label: "Secret alliances",
    description: "Pacts that officially do not exist.",
    nodeIds: () =>
      edgeKindNodes(["secret-alliance", "allied", "negotiating"], true),
  },
  {
    id: "mafia-war",
    label: "Mafia war",
    description: "Three families and their patron princes.",
    nodeIds: () => factionMembers("heil-ly", "xi-yu", "cha-r"),
  },
  {
    id: "deceased-impact",
    label: "Deceased-character impact",
    description: "The dead, their killers, and who felt it.",
    nodeIds: () => {
      const ids = new Set<string>();
      for (const d of deaths) {
        ids.add(d.victimId);
        if (d.killerId) ids.add(d.killerId);
        for (const s of d.suspectedKillerIds ?? []) ids.add(s);
        for (const w of d.witnessIds ?? []) ids.add(w);
      }
      return ids;
    },
  },
  {
    id: "silent-majority",
    label: "Silent Majority",
    description: "Everyone connected to the killings in Room 1014.",
    nodeIds: () =>
      expand(
        new Set(
          deaths
            .filter((d) => d.mysteryIds?.includes("my-silent-majority-user"))
            .flatMap((d) => [d.victimId, ...(d.suspectedKillerIds ?? [])]),
        ),
      ),
  },
];

export const presetById = new Map(graphPresets.map((p) => [p.id, p]));
