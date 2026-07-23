/** Guided "Begin Investigation" entry points. */

export interface InvestigationPath {
  id: string;
  title: string;
  blurb: string;
  steps: { label: string; href: string }[];
}

export const investigationPaths: InvestigationPath[] = [
  {
    id: "fourteen-princes",
    title: "Understand the fourteen princes",
    blurb: "The war council view: rank, mothers, beasts, guards, and risk.",
    steps: [
      { label: "Royal war council", href: "/princes" },
      {
        label: "Succession contest storyline",
        href: "/storylines/succession-contest",
      },
      { label: "Compare two princes", href: "/compare?type=princes" },
    ],
  },
  {
    id: "kurapika-woble",
    title: "Follow Kurapika and Woble",
    blurb:
      "Room 1014: an infant prince, a dying bodyguard, and a broadcast gambit.",
    steps: [
      { label: "Kurapika dossier", href: "/characters/kurapika" },
      {
        label: "Woble protection network",
        href: "/web?preset=woble-protection",
      },
      {
        label: "Kurapika & Woble storyline",
        href: "/storylines/kurapika-woble",
      },
    ],
  },
  {
    id: "benjamin-forces",
    title: "Understand Benjamin's forces",
    blurb: "Soldiers embedded in every household, reporting to one strategist.",
    steps: [
      { label: "Benjamin dossier", href: "/characters/benjamin" },
      { label: "Benjamin's forces graph", href: "/web?preset=benjamin-forces" },
      {
        label: "Military strategy storyline",
        href: "/storylines/benjamin-military",
      },
    ],
  },
  {
    id: "tserriednich",
    title: "Follow Tserriednich's development",
    blurb:
      "A connoisseur of atrocity learns Nen at a speed that terrifies his teacher.",
    steps: [
      { label: "Tserriednich dossier", href: "/characters/tserriednich" },
      {
        label: "Nen development storyline",
        href: "/storylines/tserriednich-nen",
      },
      { label: "Theta's gamble", href: "/characters/theta" },
    ],
  },
  {
    id: "halkenburg",
    title: "Understand Halkenburg's movement",
    blurb:
      "The prince who refused the war — and the beast that answered anyway.",
    steps: [
      { label: "Halkenburg dossier", href: "/characters/halkenburg" },
      { label: "Movement storyline", href: "/storylines/halkenburg-movement" },
      {
        label: "Arrow mechanics mystery",
        href: "/mysteries#my-halkenburg-arrow-mechanics",
      },
    ],
  },
  {
    id: "silent-majority",
    title: "Investigate Silent Majority",
    blurb:
      "Guards die one by one in a sealed royal suite. Nobody saw anything.",
    steps: [
      {
        label: "Silent Majority storyline",
        href: "/storylines/silent-majority",
      },
      {
        label: "The unresolved user",
        href: "/mysteries#my-silent-majority-user",
      },
      { label: "Death records", href: "/deaths" },
    ],
  },
  {
    id: "kacho-fugetsu",
    title: "Follow Kacho and Fugetsu",
    blurb: "Twin princesses, a door between rooms, and one ticket out.",
    steps: [
      { label: "Kacho dossier", href: "/characters/kacho" },
      { label: "Fugetsu dossier", href: "/characters/fugetsu" },
      { label: "Escape storyline", href: "/storylines/kacho-fugetsu" },
    ],
  },
  {
    id: "mafia-conflict",
    title: "Understand the mafia conflict",
    blurb: "Three families, three patron princes, and a shrinking lower deck.",
    steps: [
      { label: "Mafia war storyline", href: "/storylines/mafia-war" },
      { label: "Faction registry", href: "/factions" },
      { label: "Mafia war graph", href: "/web?preset=mafia-war" },
    ],
  },
  {
    id: "morena",
    title: "Follow Morena and Heil-Ly",
    blurb: "A contagion of killers spreading up through the tiers.",
    steps: [
      { label: "Morena dossier", href: "/characters/morena" },
      { label: "Heil-Ly escalation", href: "/storylines/heil-ly-morena" },
      { label: "Her endgame mystery", href: "/mysteries#my-morena-endgame" },
    ],
  },
  {
    id: "phantom-troupe",
    title: "Follow the Phantom Troupe",
    blurb: "Twelve legs sweeping the lower tiers for one magician.",
    steps: [
      { label: "Phantom Troupe faction", href: "/factions/phantom-troupe" },
      { label: "Troupe graph", href: "/web?preset=phantom-troupe" },
      {
        label: "Hisoka hunt storyline",
        href: "/storylines/troupe-hisoka-hunt",
      },
    ],
  },
  {
    id: "hisoka-search",
    title: "Follow the search for Hisoka",
    blurb: "Everyone is hunting him. No one has found him.",
    steps: [
      { label: "Hisoka dossier", href: "/characters/hisoka" },
      {
        label: "Whereabouts mystery",
        href: "/mysteries#my-hisoka-whereabouts",
      },
      { label: "Theories", href: "/theories" },
    ],
  },
  {
    id: "ship-structure",
    title: "Understand the Black Whale structure",
    blurb:
      "Five tiers, 200,000 passengers, and a geography nobody fully knows.",
    steps: [
      { label: "Tactical blueprint", href: "/map" },
      {
        label: "Hidden passages mystery",
        href: "/mysteries#my-secret-passages-extent",
      },
      { label: "Ship glossary", href: "/glossary" },
    ],
  },
  {
    id: "beast-system",
    title: "Learn the Guardian Spirit Beast system",
    blurb:
      "Parasitic Nen granted by urn and egg — with rules no prince was told.",
    steps: [
      { label: "Nen research archive", href: "/nen" },
      {
        label: "Beast system mystery",
        href: "/mysteries#my-beast-system-rules",
      },
      { label: "Seed Urn Ceremony", href: "/glossary#seed-urn-ceremony" },
    ],
  },
  {
    id: "catch-up",
    title: "Catch up from a selected chapter",
    blurb: "Set your clearance, then replay the record chapter by chapter.",
    steps: [
      { label: "Chapter incident reports", href: "/chapters" },
      { label: "Voyage timeline", href: "/timeline" },
    ],
  },
];
