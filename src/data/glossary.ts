import type { GlossaryTerm } from "@/lib/types";

/** Reference codex. introducedCh 0 = pre-arc concept, safe at anime clearance. */
export const glossary: GlossaryTerm[] = [
  // ── Nen ──────────────────────────────────────────────────────────────
  {
    id: "nen",
    term: "Nen",
    definition:
      "The discipline of using one's life energy (aura). The hidden substrate of every conflict aboard: abilities, beasts, curses, and contracts are all Nen.",
    category: "nen",
    introducedCh: 0,
  },
  {
    id: "aura",
    term: "Aura",
    definition:
      "Life energy emitted by all living beings. Trained users control its flow; untrained people leak it and see nothing.",
    category: "nen",
    relatedIds: ["nen"],
    introducedCh: 0,
  },
  {
    id: "four-principles",
    term: "Four Major Principles (Ten, Zetsu, Ren, Hatsu)",
    definition:
      "The foundation sequence: Ten holds aura at the body, Zetsu shuts it off, Ren amplifies it, Hatsu expresses it as a personal ability. Kurapika's Room 1014 class teaches exactly this ladder.",
    category: "nen",
    relatedIds: ["nen", "water-divination"],
    introducedCh: 0,
  },
  {
    id: "nen-types",
    term: "Nen categories",
    definition:
      "Six affinities — Enhancement, Transmutation, Emission, Conjuration, Manipulation, Specialization — arranged on a hexagon; efficiency falls with distance from one's native type. Emperor Time's whole point is ignoring this rule.",
    category: "nen",
    relatedIds: ["nen", "water-divination"],
    introducedCh: 0,
  },
  {
    id: "water-divination",
    term: "Water Divination",
    definition:
      "The affinity test: Ren into a glass of water with a floating leaf. Volume change = Enhancer, taste = Transmuter, color = Emitter (per the classical chart), impurities = Conjurer, leaf movement = Manipulator, anything else = Specialist. Tserriednich's result was 'anything else', emphatically.",
    category: "nen",
    relatedIds: ["nen-types"],
    introducedCh: 0,
  },
  {
    id: "vows-limitations",
    term: "Vows & Limitations",
    definition:
      "Self-imposed rules that strengthen an ability in proportion to their severity. Kurapika's chains are the arc's canonical example: Troupe-only, on pain of death.",
    category: "nen",
    relatedIds: ["nen"],
    introducedCh: 0,
  },
  {
    id: "parasitic-nen",
    term: "Parasitic-type Nen",
    definition:
      "Nen attached to an unwitting host, operating without the host's control or awareness. The Guardian Spirit Beasts are institutionalized parasitic Nen — a national rite built on the technique.",
    category: "nen",
    relatedIds: ["guardian-spirit-beast", "seed-urn-ceremony"],
    introducedCh: 359,
  },
  {
    id: "post-mortem-nen",
    term: "Post-mortem Nen",
    definition:
      "Nen that persists or strengthens after its user's death. Aboard, its confirmed exhibit is Kacho's Guardian Spirit Beast, which now walks and plans as Kacho herself beside Fugetsu; Beyond's death-triggered curse sacrifices belong to the same family of techniques.",
    category: "nen",
    relatedIds: ["nen", "beyond-curse-term"],
    introducedCh: 0,
  },
  {
    id: "guardian-spirit-beast",
    term: "Guardian Spirit Beast",
    definition:
      "A parasitic Nen construct granted to each of the fourteen princes by the Seed Urn Ceremony. Princes cannot perceive their own beast; observed beasts avoid directly harming other princes; every other rule is conjecture.",
    category: "arc",
    relatedIds: ["seed-urn-ceremony", "parasitic-nen"],
    introducedCh: 359,
  },
  {
    id: "seed-urn-ceremony",
    term: "Seed Urn Ceremony",
    definition:
      "The Kakin rite in which each prince feeds a ceremonial egg; the hatched construct becomes their Guardian Spirit Beast. Performed by Nasubi before departure — the war's starting gun.",
    category: "arc",
    relatedIds: ["guardian-spirit-beast", "succession-war"],
    introducedCh: 359,
  },
  {
    id: "emperor-time-term",
    term: "Emperor Time",
    definition:
      "Kurapika's Specialist state: 100% efficiency in all six Nen categories while his eyes are scarlet, billed at one hour of lifespan per second. See the Nen Archive for the full technical file.",
    category: "nen",
    relatedIds: ["nen-types", "vows-limitations"],
    introducedCh: 0,
  },
  {
    id: "stealth-dolphin-term",
    term: "Stealth Dolphin",
    definition:
      "Kurapika's Emperor Time construct for managing stolen abilities — including loaning them to others, one use at a time, after which they return to their original owner. See the Nen Archive file.",
    category: "nen",
    relatedIds: ["emperor-time-term"],
    introducedCh: 361,
  },

  // ── Kakin ────────────────────────────────────────────────────────────
  {
    id: "kakin-empire",
    term: "Kakin Empire",
    definition:
      "A rising superpower that traded absolute monarchy for a parliamentary façade two generations ago — and kept the absolute monarchy underneath. Sponsor of the Dark Continent voyage.",
    category: "kakin",
    introducedCh: 0,
  },
  {
    id: "hui-guo-rou",
    term: "Hui Guo Rou",
    definition:
      "Kakin's royal house: King Nasubi, eight queens, fourteen princes. The dynasty's succession is decided by the rite currently emptying the royal deck.",
    category: "kakin",
    relatedIds: ["succession-war"],
    introducedCh: 358,
  },
  {
    id: "succession-war",
    term: "The Succession War",
    definition:
      "The culling rite among Nasubi's fourteen children: one survivor takes the throne. Undeclared in public, lethal in private, and the organizing fact of everything aboard Tier 1. Per Kurapika's ch 411 reconstruction it is stage two of a four-stage national ritual bound by vows and limitations — a victor must emerge during the voyage, and if more than one prince survives, the Hui Guo Rou dynasty itself falls from power.",
    category: "arc",
    relatedIds: ["seed-urn-ceremony", "hui-guo-rou", "flame-of-life"],
    introducedCh: 359,
  },
  {
    id: "kakin-queens",
    term: "The eight queens",
    definition:
      "Nasubi's eight wives, ranked first to eighth. A prince's maternal rank sets their resources, court weight, and guard establishment — the war's starting inequality.",
    category: "kakin",
    relatedIds: ["hui-guo-rou"],
    introducedCh: 358,
  },
  {
    id: "justice-bureau-term",
    term: "Justice Bureau",
    definition:
      "Kakin's legal apparatus aboard: detentions, inquests, and the increasingly strained pretense that the royal deck's deaths are crimes rather than liturgy. Under Special Martial Law it becomes the prize itself — Benjamin claimed its building as his joint-force command center (ch 410).",
    category: "kakin",
    relatedIds: ["special-martial-law"],
    introducedCh: 360,
  },
  {
    id: "tsk-17",
    term: "TSK-17",
    definition:
      "A failed Kakin military bioweapon repurposed as the succession war's perfect silent killer: its proteins denature in under thirty seconds in open air, but inhaled in time it mimics stomach flu, kills by multiple organ failure within half a day, and accelerates decomposition until no autopsy can find it. It ended Halkenburg's body — administered by the prince himself from inside Balsamilco — and, via Furykov, is now killing Benjamin, who turned it once more: a silent release from his boot at Camilla's bedside, engineered to kill her without giving Cat's Name a killer.",
    category: "kakin",
    relatedIds: ["special-martial-law"],
    introducedCh: 403,
  },
  {
    id: "general-store-dealer",
    term: "General-Store Dealer (Yorozuya)",
    definition:
      "The ship's catalog store with an off-board delivery arm: drones and high-speed boats run personal requests to and from the mainland while the Black Whale is still in their operational zone, with orders closing two weeks after departure. Censorship was abolished, but the military takes custody of outgoing mail under the quarantine law — which is exactly why Room 1014's coded postcard to Yamato is a calculated risk.",
    category: "arc",
    relatedIds: ["special-martial-law"],
    introducedCh: 415,
  },
  {
    id: "special-martial-law",
    term: "Special Martial Law",
    definition:
      "Benjamin's Tier-1 takeover decree, declared 2:15 p.m. on Day 12 under a fabricated bio-terror conspiracy: all three branches of government consolidated under military force, royal soldiers authorized to shoot without warning, rival princes' personal guards executed on sight (Hunter Association members exempt), and the princes assembled in Grand Hall 1001. A dying man's race to be anointed successor.",
    category: "arc",
    relatedIds: ["tsk-17", "justice-bureau-term", "succession-war"],
    introducedCh: 408,
  },
  {
    id: "flame-of-life",
    term: "Flame of Life",
    definition:
      "A fireplace paired with each prince's chamber in the burial vault: it ignites when a prince truly dies and their succession eligibility ends. The Eighth, Tenth, and Twelfth Princes' flames burn; Halkenburg's corpse lies beside an unlit one — proof, as Nasubi puts it, that a prince persists as long as his soul resides in a body.",
    category: "arc",
    relatedIds: ["princes-burial-chamber", "succession-war"],
    introducedCh: 413,
  },
  {
    id: "princes-burial-chamber",
    term: "Princes' burial chamber",
    definition:
      "A hidden vault behind a secret door in Nasubi's Tier-1 quarters, tended by the priest Nugui: fallen princes are interred in assigned chambers by a ten-priest rite, each watched by its Flame of Life. Per Kurapika's reconstruction of the ritual, the ceremonial gathering of the fallen builds the 'sacred energy convergence' the next king will inherit.",
    category: "ship",
    relatedIds: ["flame-of-life", "seed-urn-ceremony"],
    introducedCh: 413,
  },
  {
    id: "have-nots-term",
    term: "Have-Nots",
    definition:
      "Kakin's lowest caste — historically barred from office and military rank, and once the exclusive source of 'afterlife companions' buried with failed princes. Camilla armed them with status, a ward of their own, and a shared suicide-curse ability (Yomotsu Hegui): carry a token of the target, hate daily, then burn it, drink the ashes, and die — the curse strips the target's aura and, at full strength, kills. Most of her fifteen aboard are Have-Not curse assassins, one an exorcist. Moswana's casting against Benjamin (ch 416) — a decade of devotion spent right in front of him, eyes locked — is the doctrine's first on-page proof.",
    category: "kakin",
    relatedIds: ["kakin-empire", "succession-war"],
    introducedCh: 389,
  },
  {
    id: "beyond-curse-term",
    term: "Beyond's curse (sacrificial marks)",
    definition:
      "The eye-shaped seals Beyond Netero placed on his secretly fathered children, turning them into curse sacrifices whose deaths fire a lethal curse at preset targets. Longhi and Furykov both bear the mark under the tongue. See the Nen Archive file for mechanics, such as they are known.",
    category: "nen",
    relatedIds: ["succession-war"],
    introducedCh: 401,
  },

  // ── Ship ─────────────────────────────────────────────────────────────
  {
    id: "black-whale",
    term: "Black Whale No. 1",
    definition:
      "Kakin's colossal flagship carrying roughly 200,000 souls toward the Dark Continent. Five tiers, stratified by class: royalty above, steerage below, war throughout.",
    category: "ship",
    relatedIds: ["ship-tiers"],
    introducedCh: 358,
  },
  {
    id: "ship-tiers",
    term: "Ship tiers",
    definition:
      "The Whale's five decks: Tier 1 (royalty and VIPs), Tier 2 (wealthy passengers), Tier 3 (middle class and crew), Tiers 4–5 (steerage and the mafia's hunting grounds). Movement between tiers is controlled — in theory.",
    category: "ship",
    relatedIds: ["black-whale"],
    introducedCh: 359,
  },
  {
    id: "room-1014-term",
    term: "Room 1014",
    definition:
      "Queen Oito and Prince Woble's suite on Tier 1: the war's first battlefield, the Nen class's schoolhouse, and the best-documented crime scene aboard.",
    category: "ship",
    relatedIds: ["black-whale"],
    introducedCh: 359,
  },
  {
    id: "hidden-passages-term",
    term: "Hidden passages",
    definition:
      "Concealed structural spaces threading the ship: the gaps Oito's cockroach slipped through between royal suites, the lifeboat tunnels under Tier 1, the Cha-R's unlisted doors between tiers, and the voids where Luini hunts.",
    category: "ship",
    relatedIds: ["room-1014-term"],
    introducedCh: 368,
  },
  {
    id: "dark-continent",
    term: "Dark Continent",
    definition:
      "The uncharted landmass beyond the known world's lake-ringed edge: five historical expeditions, five catastrophes, and the voyage's destination anyway.",
    category: "arc",
    relatedIds: ["dark-continent-expedition", "v5-v6"],
    introducedCh: 0,
  },
  {
    id: "dark-continent-expedition",
    term: "Dark Continent expedition",
    definition:
      "Two voyages wearing one hull: publicly, Kakin's royal pilgrimage to the sanctioned 'New Continent'; underneath, Beyond Netero's team bound for the true Dark Continent in defiance of the old treaty. Kakin bought legitimacy, Beyond bought a ride, the V6 bought supervision — and the Hunter Association is aboard to keep the leash on Beyond.",
    category: "arc",
    relatedIds: ["dark-continent", "v5-v6", "black-whale"],
    introducedCh: 340,
  },
  {
    id: "v5-v6",
    term: "V5 / V6",
    definition:
      "The five great powers whose 200-year-old Inviolability Treaty banned Dark Continent travel — the wall Beyond's announcement crashed into (ch 340). Unable to stop Kakin by anything short of war, the forum admitted it as a sixth member instead, becoming the V6 (confirmed ch 346): sanction the voyage, share the spoils, supervise the leash.",
    category: "arc",
    relatedIds: ["dark-continent", "dark-continent-expedition", "kakin-empire"],
    introducedCh: 340,
  },
  {
    id: "heavens-arena",
    term: "Heavens Arena",
    definition:
      "The 251-floor fighting tower where combatants climb toward Floor Master status. Site of the pre-voyage duel that reshaped the arc's board: Chrollo killed Hisoka before a paying audience (ch 356) — briefly. Hisoka's revival and war declaration followed him onto the ship.",
    category: "hunter",
    relatedIds: ["hunter-association-term"],
    introducedCh: 0,
  },

  // ── Mafia ────────────────────────────────────────────────────────────
  {
    id: "three-families",
    term: "The three families",
    definition:
      "Kakin's sanctioned mafia — Xi-Yu, Cha-R, Heil-Ly — each vassal to an elder prince (Zhang Lei, Luzurus, Tserriednich respectively). Their lower-tier war is the succession war's proxy front.",
    category: "mafia",
    relatedIds: ["xi-yu-term", "cha-r-term", "heil-ly-term"],
    introducedCh: 371,
  },
  {
    id: "xi-yu-term",
    term: "Xi-Yu family",
    definition:
      "Zhang Lei's family: the most professional of the three, run in the field by underboss Hinrigh. Currently fighting Heil-Ly's contagion war.",
    category: "mafia",
    relatedIds: ["three-families"],
    introducedCh: 371,
  },
  {
    id: "cha-r-term",
    term: "Cha-R family",
    definition:
      "Luzurus's family: old-guard smugglers holding Tier 5. Their territory's persistent failure to produce any trace of Hisoka has become a datum in itself.",
    category: "mafia",
    relatedIds: ["three-families"],
    introducedCh: 371,
  },
  {
    id: "heil-ly-term",
    term: "Heil-Ly family",
    definition:
      "Morena's family: nominally Tserriednich's vassals, actually a self-replicating network of Nen-empowered killers who level up by murdering. Less a gang than an outbreak.",
    category: "mafia",
    relatedIds: ["three-families"],
    introducedCh: 371,
  },
  {
    id: "silent-majority-term",
    term: "Silent Majority",
    definition:
      "The puppet-assassin ability that hunted Room 1014: a marionette visible only to its user and its current host possesses one of ten people in range, then conjures four many-mouthed snakes that drain a body of blood in eleven seconds. The user's face has never been shown.",
    category: "arc",
    relatedIds: ["room-1014-term"],
    introducedCh: 369,
  },

  // ── Hunter ───────────────────────────────────────────────────────────
  {
    id: "hunter-association-term",
    term: "Hunter Association",
    definition:
      "The licensed-Hunter organization, aboard in force: expedition staff, prince bodyguards, and the Zodiacs. Its charter aboard is security; its reality is triage.",
    category: "hunter",
    introducedCh: 0,
  },
  {
    id: "zodiacs-term",
    term: "Zodiacs",
    definition:
      "The Association's twelve-member executive council, each codenamed for a zodiac animal. Aboard to contain Beyond Netero; through the Rat (Kurapika), also watching the succession war.",
    category: "hunter",
    relatedIds: ["hunter-association-term"],
    introducedCh: 0,
  },
  {
    id: "provisional-hunters",
    term: "Provisional Hunters",
    definition:
      "Temporary licenses issued to staff the voyage — the recruitment channel that put many of the arc's bodyguards (Bill among them) aboard. Terms and vetting vary; several princes' 'Hunters' hold only this status.",
    category: "hunter",
    relatedIds: ["hunter-association-term"],
    introducedCh: 358,
  },
  {
    id: "three-sacred-treasures",
    term: "The Three Sacred Treasures",
    definition:
      "Kakin's succession regalia, and Chrollo's real prize aboard: the Seed Urn (the ceremonial urn of the contest), the Lotus Anchorite (a divine mummy that oversees it), and the Sword of Good Omens (passed to the next king). Chrollo believes stealing something of this national-treasure grade would satisfy the condition to evolve Skill Hunter.",
    category: "kakin",
    relatedIds: ["seed-urn-ceremony", "lotus-anchorite", "sword-of-good-omens"],
    introducedCh: 406,
  },
  {
    id: "lotus-anchorite",
    term: "Lotus Anchorite",
    definition:
      "One of Kakin's three sacred treasures: a divine mummy said to oversee the succession contest. Named among Chrollo's target regalia (ch 406).",
    category: "kakin",
    relatedIds: ["three-sacred-treasures", "succession-war"],
    introducedCh: 406,
  },
  {
    id: "sword-of-good-omens",
    term: "Sword of Good Omens",
    definition:
      "One of Kakin's three sacred treasures: the sword of succession, passed on to the next king. Named among Chrollo's target regalia (ch 406).",
    category: "kakin",
    relatedIds: ["three-sacred-treasures", "succession-war"],
    introducedCh: 406,
  },
];
