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
  "A spoiler-aware Hunter × Hunter Succession War archive with Kakin princes, characters, chapters, Nen abilities, timelines, mysteries, and a Black Whale map.";

const DEFAULT_SITE_URL = "https://black-whale-nexus.sarbast.dev";

export const SITE_URL = new URL(
  process.env.SITE_URL ?? process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL,
);

// Keep this date aligned with significant public content or structured-data
// releases. Deployments may override it without changing source.
export const SITE_LAST_MODIFIED =
  process.env.SITE_LAST_MODIFIED ?? "2026-09-23";

export interface SeoEntity extends Record<string, unknown> {
  "@type": string;
  "@id": string;
}

export interface SeoPage {
  title: string;
  heading: string;
  description: string;
  path: `/${string}` | "/";
  section?: {
    name: string;
    path: `/${string}`;
  };
  /** Primary schema.org entity described by this page. */
  mainEntity?: SeoEntity;
}

export const COMIC_SERIES_ID = `${SITE_URL.origin}/#hunter-x-hunter-series`;

export const COMIC_SERIES_SCHEMA = {
  "@type": "ComicSeries",
  "@id": COMIC_SERIES_ID,
  name: "Hunter × Hunter",
  alternateName: "Hunter x Hunter",
  author: { "@type": "Person", name: "Yoshihiro Togashi" },
} as const;

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
  const documentTitle = brandedTitle.length <= 65 ? brandedTitle : page.title;

  return {
    title: { absolute: documentTitle },
    description,
    alternates: {
      canonical: page.path,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: page.path,
      siteName: SITE_NAME,
      title: documentTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: documentTitle,
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
    heading: "Hunter × Hunter Succession War Characters",
    description:
      "Browse chapter-aware dossiers for the princes, guards, Hunters, mafia members, Phantom Troupe, and other Hunter × Hunter Succession War characters.",
    path: "/characters",
  },
  "/princes": {
    title: "The Fourteen Princes of Kakin",
    heading: "The Fourteen Kakin Princes",
    description:
      "Compare all fourteen Kakin princes, their mothers, guards, strategies, Nen beasts, vulnerabilities, and changing risk across the Succession War.",
    path: "/princes",
  },
  "/factions": {
    title: "Succession War Factions",
    heading: "Hunter × Hunter Succession War Factions",
    description:
      "Explore the royal camps, Kakin military, mafia families, Hunters, Phantom Troupe, and competing organizations aboard Black Whale No. 1.",
    path: "/factions",
  },
  "/nen": {
    title: "Nen Abilities and Guardian Spirit Beasts",
    heading: "Hunter × Hunter Nen Abilities",
    description:
      "Research the Nen abilities, conditions, restrictions, costs, counters, and Guardian Spirit Beasts revealed during the Succession War.",
    path: "/nen",
  },
  "/glossary": {
    title: "Succession War Glossary",
    heading: "Hunter × Hunter Succession War Glossary",
    description:
      "A spoiler-aware glossary of Hunter × Hunter Succession War terminology, Kakin institutions, Nen concepts, factions, and ship locations.",
    path: "/glossary",
  },
  "/web": {
    title: "Succession War Relationship Web",
    heading: "Succession War Relationship Web",
    description:
      "Explore alliances, rivalries, surveillance, family ties, secret deals, and hostile relationships across the Black Whale as they evolve by chapter.",
    path: "/web",
  },
  "/storylines": {
    title: "Succession War Storylines",
    heading: "Hunter × Hunter Succession War Storylines",
    description:
      "Follow the parallel storylines of Kurapika, the Kakin princes, Benjamin's army, the mafia war, Morena, Hisoka, and the Phantom Troupe.",
    path: "/storylines",
  },
  "/chapters": {
    title: "Hunter × Hunter Chapters 340 Onward",
    heading: "Hunter × Hunter Chapter Archive",
    description:
      "Read detailed summaries and what-changed reports for Hunter × Hunter from chapter 340 onward, beginning with the Dark Continent announcement.",
    path: "/chapters",
  },
  "/map": {
    title: "Black Whale No. 1 Map",
    heading: "Black Whale No. 1 Map",
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
    heading: "Succession War Event Archive",
    description:
      "Explore the Succession War in in-universe order or replay its events in the chapter order Togashi revealed them.",
    path: "/chronology",
  },
} as const satisfies Record<string, SeoPage>;

export function characterSeo(character: Character): SeoPage {
  const path = `/characters/${character.id}` as const;

  return {
    title: `${character.name} — Hunter × Hunter Character`,
    heading: character.name,
    description: `${character.role}. ${character.bio}`,
    path,
    section: { name: "Characters", path: "/characters" },
    mainEntity: {
      "@type": "Person",
      "@id": `${absoluteUrl(path)}#character`,
      url: absoluteUrl(path),
      name: character.name,
      description: character.role,
      disambiguatingDescription: "Fictional character in Hunter × Hunter",
    },
  };
}

export function chapterSeo(chapter: ChapterInfo): SeoPage {
  const path = `/chapters/${chapter.number}` as const;

  return {
    title: `Hunter × Hunter Chapter ${chapter.number}: ${chapter.title}`,
    heading: `Chapter ${chapter.number}: ${chapter.title}`,
    description: chapter.summary,
    path,
    section: { name: "Chapters 340 Onward", path: "/chapters" },
    mainEntity: {
      "@type": "ComicIssue",
      "@id": `${absoluteUrl(path)}#comic-issue`,
      url: absoluteUrl(path),
      issueNumber: chapter.number,
      name: `Hunter × Hunter Chapter ${chapter.number}: ${chapter.title}`,
      partOfSeries: { "@id": COMIC_SERIES_ID },
    },
  };
}

export function princeSeo(prince: Prince, character: Character): SeoPage {
  const path = `/princes/${prince.id}` as const;
  const characterPath = `/characters/${character.id}` as const;

  return {
    title: `${character.name} — Kakin Prince Rank ${prince.rank}`,
    heading: character.name,
    description: `${character.role}. ${prince.publicStrategy}`,
    path,
    section: { name: "The Fourteen Princes", path: "/princes" },
    mainEntity: {
      "@type": "Person",
      "@id": `${absoluteUrl(characterPath)}#character`,
      url: absoluteUrl(characterPath),
      name: character.name,
      description: character.role,
      disambiguatingDescription: "Fictional character in Hunter × Hunter",
    },
  };
}

export function factionSeo(faction: Faction): SeoPage {
  const path = `/factions/${faction.id}` as const;

  return {
    title: `${faction.name} — Hunter × Hunter Faction`,
    heading: faction.name,
    description: faction.summary,
    path,
    section: { name: "Factions", path: "/factions" },
    mainEntity: {
      "@type": "Organization",
      "@id": `${absoluteUrl(path)}#organization`,
      url: absoluteUrl(path),
      name: faction.name,
      description: faction.summary,
      disambiguatingDescription: "Fictional organization in Hunter × Hunter",
    },
  };
}

export function abilitySeo(ability: NenAbility): SeoPage {
  const path = `/nen/${ability.id}` as const;
  const displayName =
    ability.id === "moswana-curse" ? `Moswana's ${ability.name}` : ability.name;

  return {
    title: `${displayName} — Hunter × Hunter Nen Ability`,
    heading: ability.name,
    description: ability.description,
    path,
    section: { name: "Nen Abilities", path: "/nen" },
    mainEntity: {
      "@type": "Thing",
      "@id": `${absoluteUrl(path)}#nen-ability`,
      url: absoluteUrl(path),
      name: displayName,
      description: ability.description,
      disambiguatingDescription: "Fictional Nen ability in Hunter × Hunter",
    },
  };
}

export function storylineSeo(storyline: Storyline): SeoPage {
  const path = `/storylines/${storyline.id}` as const;
  const isSuccessionWarHub = storyline.id === "succession-contest";

  return {
    title: isSuccessionWarHub
      ? "Hunter × Hunter Succession War Explained"
      : `${storyline.name} — Hunter × Hunter Storyline`,
    heading: isSuccessionWarHub
      ? "Hunter × Hunter Succession War: The Succession Contest"
      : storyline.name,
    description: isSuccessionWarHub
      ? `A chapter-by-chapter guide to the Hunter × Hunter Succession War, its fourteen Kakin princes, rules, alliances, deaths, and turning points. ${storyline.summary}`
      : storyline.summary,
    path,
    section: { name: "Storylines", path: "/storylines" },
    mainEntity: {
      "@type": "Thing",
      "@id": `${absoluteUrl(path)}#storyline`,
      url: absoluteUrl(path),
      name: storyline.name,
      description: storyline.summary,
      disambiguatingDescription: "Storyline in the Hunter × Hunter manga",
    },
  };
}
