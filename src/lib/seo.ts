import type { Metadata } from "next";
import type {
  ChapterInfo,
  Character,
  Faction,
  NenAbility,
  Prince,
  Storyline,
} from "@/lib/types";

export const SITE_NAME = "Black Whale Nexus";
export const SITE_DESCRIPTION =
  "A chapter-aware intelligence archive for the Hunter × Hunter Succession War from chapter 340 onward, covering the fourteen princes, their guards, the mafia families, the Phantom Troupe, and every thread aboard the Black Whale.";

const DEFAULT_SITE_URL = "https://black-whale-nexus.sarbast.dev";

export const SITE_URL = new URL(
  process.env.SITE_URL ?? process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL,
);

export interface SeoPage {
  title: string;
  heading: string;
  description: string;
  path: `/${string}` | "/";
  section?: {
    name: string;
    path: `/${string}`;
  };
}

function normalizeDescription(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

export function toMetaDescription(value: string, maxLength = 160): string {
  const normalized = normalizeDescription(value);
  if (normalized.length <= maxLength) return normalized;

  const clipped = normalized.slice(0, maxLength - 1);
  const lastSpace = clipped.lastIndexOf(" ");
  const clean =
    lastSpace >= Math.floor(maxLength * 0.7)
      ? clipped.slice(0, lastSpace)
      : clipped;
  return `${clean.replace(/[,:;.!?\s]+$/g, "")}…`;
}

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

// og:image / twitter:image come from the opengraph-image.tsx file convention
// in each route segment, which overrides any config-based images and stays in
// sync with the generated build-time cards.
export function createPageMetadata(page: SeoPage): Metadata {
  const description = toMetaDescription(page.description);
  const brandedTitle = `${page.title} — ${SITE_NAME}`;

  return {
    title: page.title,
    description,
    alternates: {
      canonical: page.path,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: page.path,
      siteName: SITE_NAME,
      title: brandedTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: brandedTitle,
      description,
    },
  };
}

export const missingRecordMetadata: Metadata = {
  title: "Record Not Found",
  robots: {
    index: false,
    follow: false,
  },
};

export const STATIC_PAGE_SEO = {
  "/": {
    title: SITE_NAME,
    heading: SITE_NAME,
    description: SITE_DESCRIPTION,
    path: "/",
  },
  "/characters": {
    title: "Succession War Characters",
    heading: "Character Dossiers",
    description:
      "Browse chapter-aware dossiers for the princes, guards, Hunters, mafia members, Phantom Troupe, and other Hunter × Hunter Succession War characters.",
    path: "/characters",
  },
  "/princes": {
    title: "The Fourteen Princes of Kakin",
    heading: "Royal War Council",
    description:
      "Compare all fourteen Kakin princes, their mothers, guards, strategies, Nen beasts, vulnerabilities, and changing risk across the Succession War.",
    path: "/princes",
  },
  "/factions": {
    title: "Succession War Factions",
    heading: "Faction Registry",
    description:
      "Explore the royal camps, Kakin military, mafia families, Hunters, Phantom Troupe, and competing organizations aboard Black Whale No. 1.",
    path: "/factions",
  },
  "/nen": {
    title: "Nen Abilities and Guardian Spirit Beasts",
    heading: "Ability Files",
    description:
      "Research the Nen abilities, conditions, restrictions, costs, counters, and Guardian Spirit Beasts revealed during the Succession War.",
    path: "/nen",
  },
  "/glossary": {
    title: "Succession War Glossary",
    heading: "Reference Codex",
    description:
      "A spoiler-aware glossary of Hunter × Hunter Succession War terminology, Kakin institutions, Nen concepts, factions, and ship locations.",
    path: "/glossary",
  },
  "/web": {
    title: "Succession War Relationship Web",
    heading: "Relationship Web",
    description:
      "Explore alliances, rivalries, surveillance, family ties, secret deals, and hostile relationships across the Black Whale as they evolve by chapter.",
    path: "/web",
  },
  "/storylines": {
    title: "Succession War Storylines",
    heading: "Storyline Archive",
    description:
      "Follow the parallel storylines of Kurapika, the Kakin princes, Benjamin's army, the mafia war, Morena, Hisoka, and the Phantom Troupe.",
    path: "/storylines",
  },
  "/chapters": {
    title: "Hunter × Hunter Chapters 340 Onward",
    heading: "Chapter Archive",
    description:
      "Read detailed summaries and what-changed reports for Hunter × Hunter from chapter 340 onward, beginning with the Dark Continent announcement.",
    path: "/chapters",
  },
  "/map": {
    title: "Black Whale No. 1 Map",
    heading: "Tactical Blueprint",
    description:
      "Explore a chapter-aware map of Black Whale No. 1, including its five tiers, royal quarters, military zones, public decks, and mafia territories.",
    path: "/map",
  },
  "/knowledge": {
    title: "Who Knows What in the Succession War",
    heading: "Who Knows What",
    description:
      "Track which Succession War characters know, suspect, misunderstand, conceal, or remain unaware of every major secret aboard the Black Whale.",
    path: "/knowledge",
  },
  "/deaths": {
    title: "Succession War Death and Status Tracker",
    heading: "Death & Status Tracker",
    description:
      "A chapter-aware ledger of confirmed deaths, presumed deaths, missing characters, killers, investigations, and consequences in the Succession War.",
    path: "/deaths",
  },
  "/mysteries": {
    title: "Succession War Mysteries",
    heading: "Open Mysteries",
    description:
      "Investigate unresolved Succession War questions, evidence, competing explanations, later developments, and canon answers gated by chapter.",
    path: "/mysteries",
  },
  "/compare": {
    title: "Compare Succession War Characters and Factions",
    heading: "Side-by-Side Analysis",
    description:
      "Compare two Succession War characters, princes, factions, or Nen abilities side by side at any chapter of the Black Whale voyage.",
    path: "/compare",
  },
  "/theories": {
    title: "Succession War Theories",
    heading: "Hypothesis Room",
    description:
      "Review clearly labeled Hunter × Hunter Succession War theories alongside their supporting evidence, contradictions, confidence, and current status.",
    path: "/theories",
  },
  // Keep new sections at the end: sectionOgCard numbers them by declaration
  // order, and earlier cards must keep their file numbers.
  "/declassified": {
    title: "Newly Declassified Intel",
    heading: "Declassification Digest",
    description:
      "Review everything newly declassified between two chapter clearances of the Succession War — deaths revealed, characters entering the record, knowledge gained, and mysteries advanced.",
    path: "/declassified",
  },
  "/chronology": {
    title: "Succession War Event Archive",
    heading: "Event Archive",
    description:
      "Explore the Succession War in in-universe order or replay its events in the chapter order Togashi revealed them.",
    path: "/chronology",
  },
} as const satisfies Record<string, SeoPage>;

export function characterSeo(character: Character): SeoPage {
  return {
    title: `${character.name} Dossier`,
    heading: character.name,
    description: `${character.role}. ${character.bio}`,
    path: `/characters/${character.id}`,
    section: { name: "Characters", path: "/characters" },
  };
}

export function chapterSeo(chapter: ChapterInfo): SeoPage {
  return {
    title: `Hunter × Hunter Chapter ${chapter.number}: ${chapter.title}`,
    heading: `Chapter ${chapter.number}: ${chapter.title}`,
    description: chapter.summary,
    path: `/chapters/${chapter.number}`,
    section: { name: "Chapters 340 Onward", path: "/chapters" },
  };
}

export function princeSeo(prince: Prince, character: Character): SeoPage {
  return {
    title: `Prince ${character.name} — Rank ${prince.rank}`,
    heading: character.name,
    description: `${character.role}. ${prince.publicStrategy}`,
    path: `/princes/${prince.id}`,
    section: { name: "The Fourteen Princes", path: "/princes" },
  };
}

export function factionSeo(faction: Faction): SeoPage {
  return {
    title: `${faction.name} Faction File`,
    heading: faction.name,
    description: faction.summary,
    path: `/factions/${faction.id}`,
    section: { name: "Factions", path: "/factions" },
  };
}

export function abilitySeo(ability: NenAbility): SeoPage {
  return {
    title: `${ability.name} — Nen Ability`,
    heading: ability.name,
    description: ability.description,
    path: `/nen/${ability.id}`,
    section: { name: "Nen Abilities", path: "/nen" },
  };
}

export function storylineSeo(storyline: Storyline): SeoPage {
  return {
    title: `${storyline.name} Storyline`,
    heading: storyline.name,
    description: storyline.summary,
    path: `/storylines/${storyline.id}`,
    section: { name: "Storylines", path: "/storylines" },
  };
}
