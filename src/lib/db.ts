/**
 * Aggregated content database. All content lives in src/data as typed,
 * chapter-aware records; this module builds the lookup maps and simple
 * derived indexes every page uses.
 */

import { chapters } from "@/data/chapters";
import { characters } from "@/data/characters";
import { deaths } from "@/data/deaths";
import { events } from "@/data/events";
import { factions } from "@/data/factions";
import { glossary } from "@/data/glossary";
import { characterKnowledge, knowledgeFacts } from "@/data/knowledge";
import { locations } from "@/data/locations";
import { mysteries } from "@/data/mysteries";
import { beasts, nenAbilities } from "@/data/nen";
import { princes } from "@/data/princes";
import { relationships } from "@/data/relationships";
import { storylines } from "@/data/storylines";
import { theories } from "@/data/theories";
import type {
  ChapterInfo,
  Character,
  DeathRecord,
  Faction,
  GuardianBeast,
  NenAbility,
  Prince,
  Relationship,
  ShipLocation,
  StoryEvent,
  Storyline,
} from "@/lib/types";

export {
  beasts,
  chapters,
  characterKnowledge,
  characters,
  deaths,
  events,
  factions,
  glossary,
  knowledgeFacts,
  locations,
  mysteries,
  nenAbilities,
  princes,
  relationships,
  storylines,
  theories,
};

function indexBy<T, K extends keyof T>(items: T[], key: K): Map<T[K], T> {
  return new Map(items.map((i) => [i[key], i]));
}

export const characterById: Map<string, Character> = indexBy(characters, "id");
export const princeById: Map<string, Prince> = indexBy(princes, "id");
export const factionById: Map<string, Faction> = indexBy(factions, "id");
export const locationById: Map<string, ShipLocation> = indexBy(locations, "id");
export const eventById: Map<string, StoryEvent> = indexBy(events, "id");
export const storylineById: Map<string, Storyline> = indexBy(storylines, "id");
export const abilityById: Map<string, NenAbility> = indexBy(nenAbilities, "id");
export const beastById: Map<string, GuardianBeast> = indexBy(beasts, "id");
export const chapterByNumber: Map<number, ChapterInfo> = indexBy(
  chapters,
  "number",
);
export const mysteryById = indexBy(mysteries, "id");
export const theoryById = indexBy(theories, "id");
export const factById = indexBy(knowledgeFacts, "id");
export const deathByVictim: Map<string, DeathRecord> = indexBy(
  deaths,
  "victimId",
);

export const princeByCharacterId: Map<string, Prince> = new Map(
  princes.map((p) => [p.characterId, p]),
);

/** Abilities grouped by the character that uses them. */
export const abilitiesByUser: Map<string, NenAbility[]> = (() => {
  const map = new Map<string, NenAbility[]>();
  for (const a of nenAbilities) {
    if (!a.userCharacterId) continue;
    const list = map.get(a.userCharacterId) ?? [];
    list.push(a);
    map.set(a.userCharacterId, list);
  }
  return map;
})();

/** All relationship edges touching an entity (character or faction id). */
export const relationshipsByEntity: Map<string, Relationship[]> = (() => {
  const map = new Map<string, Relationship[]>();
  for (const r of relationships) {
    for (const id of [r.from, r.to]) {
      const list = map.get(id) ?? [];
      list.push(r);
      map.set(id, list);
    }
  }
  return map;
})();

export function relationshipsFor(entityId: string): Relationship[] {
  return relationshipsByEntity.get(entityId) ?? [];
}

/** Events involving a character. */
export const eventsByParticipant: Map<string, StoryEvent[]> = (() => {
  const map = new Map<string, StoryEvent[]>();
  for (const e of events) {
    for (const id of e.participantIds) {
      const list = map.get(id) ?? [];
      list.push(e);
      map.set(id, list);
    }
  }
  for (const list of map.values()) list.sort((a, b) => a.chapter - b.chapter);
  return map;
})();

export const eventsByChapter: Map<number, StoryEvent[]> = (() => {
  const map = new Map<number, StoryEvent[]>();
  for (const e of events) {
    const list = map.get(e.chapter) ?? [];
    list.push(e);
    map.set(e.chapter, list);
  }
  return map;
})();

export const eventsByStoryline: Map<string, StoryEvent[]> = (() => {
  const map = new Map<string, StoryEvent[]>();
  for (const e of events) {
    for (const id of e.storylineIds) {
      const list = map.get(id) ?? [];
      list.push(e);
      map.set(id, list);
    }
  }
  for (const list of map.values()) list.sort((a, b) => a.chapter - b.chapter);
  return map;
})();

/** Characters serving a given prince (by prince id). */
export const charactersByPrince: Map<string, Character[]> = (() => {
  const map = new Map<string, Character[]>();
  for (const c of characters) {
    if (!c.servesPrinceId) continue;
    const list = map.get(c.servesPrinceId) ?? [];
    list.push(c);
    map.set(c.servesPrinceId, list);
  }
  return map;
})();

/** Characters in a faction. */
export const charactersByFaction: Map<string, Character[]> = (() => {
  const map = new Map<string, Character[]>();
  for (const c of characters) {
    for (const f of c.factionIds) {
      const list = map.get(f) ?? [];
      list.push(c);
      map.set(f, list);
    }
  }
  return map;
})();

/** Knowledge rows grouped by fact. */
export const knowledgeByFact = (() => {
  const map = new Map<string, typeof characterKnowledge>();
  for (const k of characterKnowledge) {
    const list = map.get(k.factId) ?? [];
    list.push(k);
    map.set(k.factId, list);
  }
  return map;
})();

/** Knowledge rows grouped by character. */
export const knowledgeByCharacter = (() => {
  const map = new Map<string, typeof characterKnowledge>();
  for (const k of characterKnowledge) {
    const list = map.get(k.characterId) ?? [];
    list.push(k);
    map.set(k.characterId, list);
  }
  return map;
})();

export const sortedChapters = [...chapters].sort((a, b) => a.number - b.number);

/** Display name for any entity id across all content types. */
export function entityName(id: string): string {
  return (
    characterById.get(id)?.name ??
    factionById.get(id)?.name ??
    locationById.get(id)?.name ??
    abilityById.get(id)?.name ??
    storylineById.get(id)?.name ??
    mysteryById.get(id)?.question ??
    princeById.get(id)?.id.replace("prince-", "Prince ") ??
    id
  );
}

/** Route for any entity id. */
export function entityHref(id: string): string {
  if (characterById.has(id)) return `/characters/${id}`;
  if (princeById.has(id)) return `/princes/${id}`;
  if (factionById.has(id)) return `/factions/${id}`;
  if (locationById.has(id)) return `/map?location=${id}`;
  if (abilityById.has(id)) return `/nen/${id}`;
  if (storylineById.has(id)) return `/storylines/${id}`;
  if (mysteryById.has(id)) return `/mysteries#${id}`;
  if (theoryById.has(id)) return `/theories#${id}`;
  if (factById.has(id)) return `/knowledge?fact=${id}`;
  return "/";
}
