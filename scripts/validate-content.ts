/**
 * Content validation: referential integrity across all data files.
 * Run with: npx tsx scripts/validate-content.ts
 *
 * Also regenerates docs/DATA_STATS.md so the agent-facing docs never go stale.
 */

import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { chapters } from "../src/data/chapters";
import { characters } from "../src/data/characters";
import { deaths } from "../src/data/deaths";
import { events } from "../src/data/events";
import { factions } from "../src/data/factions";
import { glossary } from "../src/data/glossary";
import { characterKnowledge, knowledgeFacts } from "../src/data/knowledge";
import { locations } from "../src/data/locations";
import { mysteries } from "../src/data/mysteries";
import { beasts, nenAbilities } from "../src/data/nen";
import { princes } from "../src/data/princes";
import { relationships } from "../src/data/relationships";
import { storylines } from "../src/data/storylines";
import { theories } from "../src/data/theories";

const charIds = new Set(characters.map((c) => c.id));
const princeIds = new Set(princes.map((p) => p.id));
const factionIds = new Set(factions.map((f) => f.id));
const locationIds = new Set(locations.map((l) => l.id));
const eventIds = new Set(events.map((e) => e.id));
const storylineIds = new Set(storylines.map((s) => s.id));
const abilityIds = new Set(nenAbilities.map((a) => a.id));
const beastIds = new Set(beasts.map((b) => b.id));
const mysteryIds = new Set(mysteries.map((m) => m.id));
const factIds = new Set(knowledgeFacts.map((f) => f.id));
const entityIds = new Set([...charIds, ...factionIds]);
const characterById = new Map(characters.map((c) => [c.id, c]));
const chapterByNumber = new Map(chapters.map((c) => [c.number, c]));

let errors = 0;
let warnings = 0;

function err(msg: string) {
  errors++;
  console.error(`  ERROR ${msg}`);
}
function warn(msg: string) {
  warnings++;
  console.warn(`  warn  ${msg}`);
}

function checkRefs(
  owner: string,
  ids: (string | undefined)[] | undefined,
  set: Set<string>,
  field: string,
) {
  for (const id of ids ?? []) {
    if (id !== undefined && !set.has(id))
      err(`${owner}.${field}: unknown id "${id}"`);
  }
}

console.log("characters…");
for (const c of characters) {
  checkRefs(c.id, c.factionIds, factionIds, "factionIds");
  checkRefs(
    c.id,
    c.servesPrinceId ? [c.servesPrinceId] : [],
    princeIds,
    "servesPrinceId",
  );
  checkRefs(c.id, c.superiorId ? [c.superiorId] : [], charIds, "superiorId");
  checkRefs(c.id, c.nenAbilityIds, abilityIds, "nenAbilityIds");
  checkRefs(
    c.id,
    c.locationHistory.map((l) => l.locationId),
    locationIds,
    "locationHistory",
  );
  for (const s of c.secrets ?? [])
    checkRefs(c.id, s.knownBy, charIds, "secrets.knownBy");
  if (c.statusHistory.length === 0) err(`${c.id}: empty statusHistory`);
  if (c.locationHistory.length === 0) warn(`${c.id}: empty locationHistory`);
  if (c.monogram.length > 3) warn(`${c.id}: monogram too long`);
  for (const ch of c.chapterAppearances ?? []) {
    if (!chapterByNumber.has(ch))
      err(`${c.id}.chapterAppearances: unknown chapter ${ch}`);
  }
}

console.log("princes…");
for (const p of princes) {
  checkRefs(p.id, [p.characterId], charIds, "characterId");
  checkRefs(
    p.id,
    p.motherCharacterId ? [p.motherCharacterId] : [],
    charIds,
    "motherCharacterId",
  );
  checkRefs(p.id, p.beastId ? [p.beastId] : [], beastIds, "beastId");
  checkRefs(
    p.id,
    p.personalAbilityId ? [p.personalAbilityId] : [],
    abilityIds,
    "personalAbilityId",
  );
  checkRefs(p.id, p.guardCharacterIds, charIds, "guardCharacterIds");
  checkRefs(p.id, p.hunterCharacterIds, charIds, "hunterCharacterIds");
  checkRefs(p.id, p.mysteryIds, mysteryIds, "mysteryIds");
}

console.log("factions…");
for (const f of factions) {
  checkRefs(
    f.id,
    f.leaderCharacterId ? [f.leaderCharacterId] : [],
    charIds,
    "leaderCharacterId",
  );
  checkRefs(
    f.id,
    f.parentFactionId ? [f.parentFactionId] : [],
    factionIds,
    "parentFactionId",
  );
  checkRefs(
    f.id,
    f.controlledLocationIds,
    locationIds,
    "controlledLocationIds",
  );
}

console.log("relationships…");
const relIds = new Set<string>();
for (const r of relationships) {
  if (relIds.has(r.id)) err(`duplicate relationship id ${r.id}`);
  relIds.add(r.id);
  checkRefs(r.id, [r.from, r.to], entityIds, "from/to");
  checkRefs(r.id, r.eventIds, eventIds, "eventIds");
  if (r.revealCh < r.startCh && r.startCh !== 0)
    warn(
      `${r.id}: revealCh ${r.revealCh} < startCh ${r.startCh} (retroactive reveal — confirm intended)`,
    );
}

console.log("events…");
for (const e of events) {
  checkRefs(e.id, e.participantIds, charIds, "participantIds");
  checkRefs(e.id, e.witnessIds, charIds, "witnessIds");
  checkRefs(e.id, e.casualtyIds, charIds, "casualtyIds");
  checkRefs(
    e.id,
    e.locationId ? [e.locationId] : [],
    locationIds,
    "locationId",
  );
  checkRefs(e.id, e.storylineIds, storylineIds, "storylineIds");
  for (const k of e.knowledgeChanges ?? []) {
    checkRefs(e.id, [k.factId], factIds, "knowledgeChanges.factId");
    checkRefs(e.id, [k.characterId], charIds, "knowledgeChanges.characterId");
  }
}

console.log("chapters…");
for (const c of chapters) {
  const o = `ch${c.number}`;
  checkRefs(o, c.eventIds, eventIds, "eventIds");
  checkRefs(o, c.appearingCharacterIds, charIds, "appearingCharacterIds");
  checkRefs(o, c.locationIds, locationIds, "locationIds");
  checkRefs(o, c.storylineIds, storylineIds, "storylineIds");
  checkRefs(o, c.abilitiesUsedIds, abilityIds, "abilitiesUsedIds");
  checkRefs(o, c.changes.newCharacters, charIds, "changes.newCharacters");
  checkRefs(o, c.changes.deaths, charIds, "changes.deaths");
  for (const id of c.appearingCharacterIds) {
    const character = characterById.get(id);
    if (character && character.introducedCh > c.number)
      err(
        `${o}.appearingCharacterIds: ${id} precedes introducedCh ${character.introducedCh}`,
      );
  }
  checkRefs(
    o,
    c.changes.mysteriesIntroduced,
    mysteryIds,
    "changes.mysteriesIntroduced",
  );
  checkRefs(
    o,
    c.changes.mysteriesAdvanced,
    mysteryIds,
    "changes.mysteriesAdvanced",
  );
  checkRefs(
    o,
    c.changes.mysteriesResolved,
    mysteryIds,
    "changes.mysteriesResolved",
  );
}

console.log("locations…");
for (const l of locations) {
  checkRefs(l.id, l.parentId ? [l.parentId] : [], locationIds, "parentId");
  checkRefs(l.id, l.connectedIds, locationIds, "connectedIds");
  for (const s of l.controlHistory ?? [])
    checkRefs(l.id, [s.value], factionIds, "controlHistory.value");
}

// LocationPanel navigates from each record's own connectedIds list, so the
// graph must be undirected: no self-loops, no duplicates, every link mutual.
{
  const connectedByLoc = new Map(
    locations.map((l) => [l.id, new Set(l.connectedIds ?? [])]),
  );
  for (const l of locations) {
    const seen = new Set<string>();
    for (const cid of l.connectedIds ?? []) {
      if (cid === l.id) err(`${l.id}.connectedIds: self-loop`);
      if (seen.has(cid)) err(`${l.id}.connectedIds: duplicate ${cid}`);
      seen.add(cid);
      if (connectedByLoc.has(cid) && !connectedByLoc.get(cid)?.has(l.id))
        err(`${l.id}.connectedIds: ${cid} does not link back`);
    }
  }
}

// Nothing may become reader-visible inside a location before the location
// itself enters the record at its introducedCh.
{
  const introByLoc = new Map(locations.map((l) => [l.id, l.introducedCh]));
  for (const e of events) {
    const intro = e.locationId ? introByLoc.get(e.locationId) : undefined;
    if (intro !== undefined && e.chapter < intro)
      err(
        `${e.id}: chapter ${e.chapter} precedes ${e.locationId} introducedCh ${intro}`,
      );
  }
  for (const d of deaths) {
    const intro = d.locationId ? introByLoc.get(d.locationId) : undefined;
    if (intro !== undefined && (d.revealCh ?? d.chapter) < intro)
      err(
        `${d.id}: visible ch${d.revealCh ?? d.chapter} precedes ${d.locationId} introducedCh ${intro}`,
      );
  }
  for (const c of characters) {
    for (const entry of c.locationHistory) {
      const intro = introByLoc.get(entry.locationId);
      if (intro !== undefined && (entry.revealCh ?? entry.ch) < intro)
        err(
          `${c.id}.locationHistory: ch${entry.ch} at ${entry.locationId} visible before its introducedCh ${intro}`,
        );
    }
  }
}

console.log("nen…");
for (const a of nenAbilities) {
  checkRefs(
    a.id,
    a.userCharacterId ? [a.userCharacterId] : [],
    charIds,
    "userCharacterId",
  );
  checkRefs(
    a.id,
    (a.awareCharacterIds ?? []).map((x) => x.characterId),
    charIds,
    "awareCharacterIds",
  );
  checkRefs(a.id, a.affectedCharacterIds, charIds, "affectedCharacterIds");
  checkRefs(a.id, a.mysteryIds, mysteryIds, "mysteryIds");
  for (const use of a.uses ?? []) {
    const chapter = chapterByNumber.get(use.ch);
    if (!chapter) {
      err(`${a.id}.uses: unknown chapter ${use.ch}`);
      continue;
    }
    if (a.revealCh <= use.ch && !chapter.abilitiesUsedIds?.includes(a.id))
      err(
        `${a.id}.uses: ch${use.ch} omits revealed ability from abilitiesUsedIds`,
      );
  }
}
for (const b of beasts) {
  checkRefs(b.id, [b.princeId], princeIds, "princeId");
  checkRefs(b.id, b.abilityId ? [b.abilityId] : [], abilityIds, "abilityId");
}

console.log("knowledge…");
for (const f of knowledgeFacts) {
  checkRefs(f.id, f.relatedCharacterIds, charIds, "relatedCharacterIds");
  checkRefs(f.id, f.relatedAbilityIds, abilityIds, "relatedAbilityIds");
  checkRefs(f.id, f.relatedEventIds, eventIds, "relatedEventIds");
}
for (const k of characterKnowledge) {
  const o = `${k.factId}:${k.characterId}`;
  checkRefs(o, [k.factId], factIds, "factId");
  checkRefs(o, [k.characterId], charIds, "characterId");
}

console.log("deaths…");
for (const d of deaths) {
  checkRefs(d.id, [d.victimId], charIds, "victimId");
  checkRefs(d.id, d.killerId ? [d.killerId] : [], charIds, "killerId");
  checkRefs(d.id, d.suspectedKillerIds, charIds, "suspectedKillerIds");
  checkRefs(d.id, d.witnessIds, charIds, "witnessIds");
  checkRefs(d.id, d.awareCharacterIds, charIds, "awareCharacterIds");
  checkRefs(
    d.id,
    d.locationId ? [d.locationId] : [],
    locationIds,
    "locationId",
  );
  checkRefs(d.id, d.mysteryIds, mysteryIds, "mysteryIds");
  checkRefs(d.id, d.factionId ? [d.factionId] : [], factionIds, "factionId");
  checkRefs(
    d.id,
    d.princeContextId ? [d.princeContextId] : [],
    princeIds,
    "princeContextId",
  );
  const victim = characters.find((c) => c.id === d.victimId);
  if (
    victim &&
    d.scope !== "body" &&
    !victim.statusHistory.some(
      (s) => s.status === "dead" || s.status === "presumed-dead",
    )
  )
    warn(`${d.id}: victim ${d.victimId} has no dead status entry`);
}

console.log("storylines…");
for (const s of storylines) {
  checkRefs(s.id, s.participantIds, charIds, "participantIds");
  checkRefs(s.id, s.factionIds, factionIds, "factionIds");
  checkRefs(s.id, s.dependsOnIds, storylineIds, "dependsOnIds");
  checkRefs(s.id, s.relatedIds, storylineIds, "relatedIds");
  for (const n of s.nodes) {
    checkRefs(`${s.id}@${n.ch}`, n.eventIds, eventIds, "nodes.eventIds");
    checkRefs(
      `${s.id}@${n.ch}`,
      n.linkId ? [n.linkId] : [],
      storylineIds,
      "nodes.linkId",
    );
  }
}

console.log("mysteries & theories…");
for (const m of mysteries) {
  checkRefs(m.id, m.relatedCharacterIds, charIds, "relatedCharacterIds");
  checkRefs(m.id, m.relatedEventIds, eventIds, "relatedEventIds");
}
for (const t of theories) {
  checkRefs(t.id, t.relatedCharacterIds, charIds, "relatedCharacterIds");
  checkRefs(t.id, t.relatedEventIds, eventIds, "relatedEventIds");
}

console.log("glossary…");
const allIds = new Set([
  ...entityIds,
  ...locationIds,
  ...abilityIds,
  ...storylineIds,
  ...mysteryIds,
  ...glossary.map((g) => g.id),
]);
for (const g of glossary) checkRefs(g.id, g.relatedIds, allIds, "relatedIds");

const counts: [string, number][] = [
  ["characters", characters.length],
  ["princes", princes.length],
  ["factions", factions.length],
  ["relationships", relationships.length],
  ["events", events.length],
  ["chapters", chapters.length],
  ["locations", locations.length],
  ["nen abilities", nenAbilities.length],
  ["guardian beasts", beasts.length],
  ["knowledge facts", knowledgeFacts.length],
  ["knowledge rows", characterKnowledge.length],
  ["deaths", deaths.length],
  ["storylines", storylines.length],
  ["mysteries", mysteries.length],
  ["theories", theories.length],
  ["glossary terms", glossary.length],
];

console.log(`\nCounts: ${counts.map(([k, n]) => `${n} ${k}`).join(", ")}`);
console.log(`Validation: ${errors} errors, ${warnings} warnings`);

// Regenerate the machine-readable stats snapshot so docs never go stale.
// This file is committed; the mandatory validate step keeps it current.
// Chapter span is derived from the data, not hardcoded.
const chapterNums = chapters.map((c) => c.number).sort((a, b) => a - b);
const stats = [
  "# Data snapshot (generated)",
  "",
  "> Auto-written by `scripts/validate-content.ts` on every run. Do not edit by",
  "> hand — re-run the validator instead. Referenced by `docs/DATA_GUIDE.md`.",
  "",
  `- Chapter coverage: **${chapterNums[0]}–${chapterNums[chapterNums.length - 1]}**`,
  `- Validation at last run: **${errors} errors, ${warnings} warnings**`,
  "",
  "| Collection | Count |",
  "| --- | --- |",
  ...counts.map(([k, n]) => `| ${k} | ${n} |`),
  "",
].join("\n");
writeFileSync(resolve(import.meta.dirname, "../docs/DATA_STATS.md"), stats);

if (errors > 0) process.exit(1);
