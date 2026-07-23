import type { Faction } from "@/lib/types";

/** Group intelligence files. Colors are desaturated for the dark navy palette. */
export const factions: Faction[] = [
  {
    id: "royal-family",
    name: "Hui Guo Rou Royal Family",
    kind: "royal",
    color: "#b3954a",
    summary:
      "The Kakin dynasty: King Nasubi, eight queens, fourteen princes — and a succession rite that requires all but one child to die.",
    leaderCharacterId: "nasubi",
    objectives: [
      {
        text: "Produce a single heir through the Seed Urn rite.",
        revealCh: 359,
      },
    ],
    territoryNote: "Tier 1 royal block.",
    controlledLocationIds: ["royal-quarters", "banquet-hall"],
    resources: ["State treasury", "Royal Army", "Justice Bureau jurisdiction"],
    internalConflicts: [
      {
        text: "The war itself: every prince camp against every other.",
        revealCh: 359,
      },
    ],
    operations: [
      { text: "Seed Urn Ceremony performed before departure.", ch: 359 },
    ],
    statusByChapter: [
      { ch: 359, value: "Rite begun; façade of unity maintained in public." },
      { ch: 368, value: "First royal casualty (Momoze); façade cracking." },
      {
        ch: 383,
        value: "Second royal death (Kacho); attrition phase underway.",
      },
      {
        ch: 404,
        value:
          "Four princes down (Momoze, Kacho, Salé-salé, Halkenburg's body); Halkenburg's Flame of Life stays unlit and Nasubi calls him still fighting.",
      },
      {
        ch: 413,
        value:
          "Special Martial Law: Benjamin's soldiers purge rival guards while the dying first prince races to be anointed. The rite itself is at risk — Kurapika's deduction says the dynasty falls if more than one prince survives the voyage.",
      },
    ],
    introducedCh: 358,
  },
  {
    id: "benjamin-camp",
    name: "First Prince Benjamin's Camp",
    kind: "prince-camp",
    color: "#8c4a4a",
    summary:
      "The war's largest private force: pledged Nen soldiers embedded across rival households as 'loaned guards', reporting to strategist Balsamilco.",
    leaderCharacterId: "benjamin",
    parentFactionId: "royal-family",
    objectives: [
      { text: "Take the throne by strength and attrition.", revealCh: 358 },
      {
        text: "Map the rival Hunters' and beasts' abilities through embedded observers.",
        revealCh: 363,
      },
    ],
    territoryNote: "Benjamin's suite plus the army command post.",
    controlledLocationIds: ["benjamin-quarters", "military-hq"],
    resources: [
      "Pledged Nen soldiers",
      "Royal Army channels",
      "Embedded observer network",
    ],
    operations: [
      {
        text: "Fourteen soldiers placed as rival princes' 'royal guards' — the guard-exchange espionage gambit.",
        ch: 363,
      },
      {
        text: "Yushohi's assassination of Salé-salé under the illness cover story.",
        ch: 382,
      },
      {
        text: "Kill order against Halkenburg via the embedded Shikaku — answered by the first arrow.",
        ch: 382,
      },
      {
        text: "Balsamilco's TSK-17 courthouse mission against Halkenburg — intercepted by the arrow.",
        ch: 403,
      },
      {
        text: "Special Martial Law declared; Justice Bureau seized as command center; purge of rival princes' guards begins.",
        ch: 410,
      },
      {
        text: "Kanjidol, Yushohi, and Chiyamasi activated against Luzurus's household and Room 1009.",
        ch: 414,
      },
    ],
    statusByChapter: [
      { ch: 366, value: "Observer network operational in most rival suites." },
      {
        ch: 389,
        value: "Inheritance mechanism compounding the prince's strength.",
      },
      {
        ch: 403,
        value:
          "Command compromised: the 'Balsamilco' reporting in is Halkenburg's soul.",
      },
      {
        ch: 413,
        value:
          "Ruthless endgame on a half-day clock: the prince is poisoned, martial law is in force, and every soldier is executing the purge.",
      },
    ],
    introducedCh: 358,
  },
  {
    id: "camilla-camp",
    name: "Second Prince Camilla's Camp",
    kind: "prince-camp",
    color: "#8c5d75",
    summary:
      "A cult of personality around the war's most aggressive prince, decapitated early by her detention — though her ability makes 'decapitated' provisional.",
    leaderCharacterId: "camilla",
    parentFactionId: "royal-family",
    objectives: [
      {
        text: "Put Camilla on the throne over her siblings' bodies.",
        revealCh: 363,
      },
    ],
    controlledLocationIds: ["camilla-quarters"],
    resources: [
      "Devoted Have-Not personal guards",
      "Sarahell's disguise and curse craft",
      "A standby Nen exorcist",
    ],
    operations: [
      { text: "Direct strike toward Benjamin's household.", ch: 373 },
      {
        text: "Have-Not curse-assassin program: one assassin per rival prince.",
        ch: 389,
      },
      {
        text: "Sarahell infiltrates Kurapika's Nen class as a maid to curse Woble.",
        ch: 411,
      },
    ],
    statusByChapter: [
      {
        ch: 373,
        value:
          "Leader killed, revived by her own ability, and detained; camp leaderless but intact.",
      },
      {
        ch: 376,
        value:
          "Leader confined to Room 302 in the VVIP area under court ruling — and under Benjamin's Secret Window.",
      },
      {
        ch: 389,
        value:
          "Confined but plotting: the curse program runs on Sarahell's timetable while Camilla waits.",
      },
      {
        ch: 413,
        value:
          "Marked: a dying Benjamin, briefed on her ability's type, has reserved her death for himself.",
      },
    ],
    introducedCh: 358,
  },
  {
    id: "zhang-lei-camp",
    name: "Third Prince Zhang Lei's Camp",
    kind: "prince-camp",
    color: "#7a7250",
    summary:
      "A merchant court: patronage, negotiation, and a mafia family on retainer.",
    leaderCharacterId: "zhang-lei",
    parentFactionId: "royal-family",
    objectives: [
      {
        text: "Survive by obligation networks; win by being the last acceptable option.",
        revealCh: 361,
      },
    ],
    controlledLocationIds: ["zhang-lei-quarters"],
    resources: [
      "Wealth (amplified by his beast's coins)",
      "Xi-Yu family patronage",
    ],
    operations: [
      {
        text: "Patron-level visit to Onior's Tier 1 residence for Nen intelligence.",
        ch: 390,
      },
      {
        text: "Coin-economy analysis with Kurapika; alliance channel through Tenftory.",
        ch: 404,
      },
    ],
    statusByChapter: [
      { ch: 380, value: "Xi-Yu proxy engaged in the lower-tier war." },
      {
        ch: 402,
        value:
          "Holds the Woble–Tubeppa partial-surrender pledge: the bloc's designated last man standing.",
      },
      {
        ch: 410,
        value:
          "Leader vanished to Tier 2 through Onior's residence minutes before martial law; Benjamin's scouts hunting.",
      },
    ],
    introducedCh: 358,
  },
  {
    id: "tserriednich-camp",
    name: "Fourth Prince Tserriednich's Camp",
    kind: "prince-camp",
    color: "#6d5a86",
    summary:
      "A cultured household orbiting a monster: coerced Hunter instructors, a private gallery of atrocities, and the fastest Nen ascent on record.",
    leaderCharacterId: "tserriednich",
    parentFactionId: "royal-family",
    objectives: [
      { text: "Deliver the prince to the throne.", revealCh: 358 },
      {
        text: "(Theta's counter-objective) Kill him before he finishes learning.",
        revealCh: 385,
      },
    ],
    controlledLocationIds: ["tserriednich-quarters"],
    resources: [
      "First Queen's court resources",
      "Coerced Hunter instructors",
      "Scarlet-eye collection",
    ],
    internalConflicts: [
      {
        text: "Theta and Salkov's secret plan against their own principal.",
        revealCh: 385,
      },
    ],
    operations: [{ text: "Forced-march Nen instruction begins.", ch: 366 }],
    statusByChapter: [
      {
        ch: 376,
        value:
          "Water Divination confirms a Specialist whose progress is outpacing his instructors' containment plan.",
      },
      {
        ch: 385,
        value:
          "Theta's killshot fails against the prince's future sight; the beast nicks her cheek as a first warning.",
      },
      {
        ch: 394,
        value:
          "Ties with the Heil-Ly proxy cut; loyal soldiers on Tier 3 organize against Morena and requisition Borksen as their Nen adviser.",
      },
      {
        ch: 404,
        value:
          "Zetsu drills under Salkov collapse from ten seconds toward one; the household's balance of terror is now entirely the prince's.",
      },
      {
        ch: 413,
        value:
          "Named a bioterror conspirator in Benjamin's martial-law pretext; the dying first prince claims his death personally.",
      },
    ],
    introducedCh: 358,
  },
  {
    id: "tubeppa-camp",
    name: "Fifth Prince Tubeppa's Camp",
    kind: "prince-camp",
    color: "#5d7a8c",
    summary: "Technocrats without an army, shopping quietly for Nen talent.",
    leaderCharacterId: "tubeppa",
    parentFactionId: "royal-family",
    objectives: [
      {
        text: "Assemble a defensive Nen core via discreet recruitment.",
        revealCh: 370,
      },
    ],
    resources: ["Industrial and chemical interests"],
    operations: [
      { text: "Feelers toward Kurapika's class network via Maor.", ch: 370 },
      {
        text: "Moonlight Act truce with Woble's camp, negotiated by Longhi.",
        ch: 401,
      },
      {
        text: "Joint renunciation pledge with Woble in Zhang Lei's favor.",
        ch: 402,
      },
    ],
    statusByChapter: [
      {
        ch: 402,
        value:
          "Anchored in the Zhang Lei–Tubeppa–Woble bloc; her beast finally shows itself.",
      },
    ],
    introducedCh: 358,
    incomplete: true,
  },
  {
    id: "tyson-camp",
    name: "Sixth Prince Tyson's Camp",
    kind: "prince-camp",
    color: "#8c7a5d",
    summary: "A gospel of love with a guard rotation; sincerity as strategy.",
    leaderCharacterId: "tyson",
    parentFactionId: "royal-family",
    objectives: [
      { text: "Spread the Book of Tyson; assume the best.", revealCh: 366 },
    ],
    introducedCh: 358,
    incomplete: true,
  },
  {
    id: "luzurus-camp",
    name: "Seventh Prince Luzurus's Camp",
    kind: "prince-camp",
    color: "#6b8c5d",
    summary: "An indolent front over a working contraband pipeline to Cha-R.",
    leaderCharacterId: "luzurus",
    parentFactionId: "royal-family",
    objectives: [
      { text: "Stay unthreatening; stay supplied.", revealCh: 366 },
      { text: "Arm the household through mafia channels.", revealCh: 378 },
    ],
    operations: [
      { text: "Cha-R procurement channel active.", ch: 378 },
      {
        text: "Martial-law survival protocol: weapons surrendered, drugs burned, Hunters posted as tripwires.",
        ch: 414,
      },
    ],
    statusByChapter: [
      {
        ch: 414,
        value:
          "Under direct assault from within: Benjamin's plant Kanjidol kills two guards in their bunks; Ridge engages him.",
      },
    ],
    introducedCh: 358,
    incomplete: true,
  },
  {
    id: "salele-camp",
    name: "Eighth Prince Salé-salé's Camp",
    kind: "prince-camp",
    color: "#8c8c5d",
    summary: "A floating salon; strategy indistinguishable from recreation.",
    leaderCharacterId: "salele",
    parentFactionId: "royal-family",
    objectives: [{ text: "None discernible.", revealCh: 366 }],
    statusByChapter: [
      {
        ch: 382,
        value:
          "Principal assassinated in his bed by Benjamin's embedded soldier Yushohi; household dissolved under the illness cover story.",
      },
    ],
    introducedCh: 358,
    incomplete: true,
  },
  {
    id: "halkenburg-camp",
    name: "Ninth Prince Halkenburg's Movement",
    kind: "prince-camp",
    color: "#5d8c86",
    summary:
      "Seven volunteers and a conscience: the only camp that opposes the war itself — armed with an ability that spends its own members.",
    leaderCharacterId: "halkenburg",
    parentFactionId: "royal-family",
    objectives: [
      { text: "Abolish the succession rite.", revealCh: 359 },
      {
        text: "Fight the war on the prince's moral terms once abstention fails.",
        revealCh: 375,
      },
    ],
    controlledLocationIds: ["halkenburg-quarters"],
    resources: ["Seven seal-marked volunteer guards", "Public moral authority"],
    internalConflicts: [
      {
        text: "Every use of the prince's power consumes a follower — loyalty as ammunition.",
        revealCh: 386,
      },
    ],
    operations: [
      {
        text: "The first arrow: Benjamin's embedded assassin Shikaku struck down at the cost of Sumidori's body.",
        ch: 382,
      },
      {
        text: "The courthouse counter-ambush: Balsamilco struck by the arrow, the prince's soul installed in the enemy's strategist.",
        ch: 403,
      },
      {
        text: "Arrow fired at Benjamin from Room 1009, powered by twelve civilian volunteers.",
        ch: 413,
      },
    ],
    statusByChapter: [
      {
        ch: 375,
        value:
          "Guards marked by the beast; nature of the mark unclear to them.",
      },
      {
        ch: 386,
        value: "One guard's life spent; the mechanism's price now understood.",
      },
      {
        ch: 404,
        value:
          "Principal's body dead by his own design; the movement's real strength is now twelve civilians and a borrowed body.",
      },
      {
        ch: 411,
        value:
          "Formally disbanded: personal guards reassigned below Tier 2 after the state funeral. The fight continues invisibly.",
      },
    ],
    introducedCh: 358,
  },
  {
    id: "kacho-camp",
    name: "Tenth Prince Kacho's Camp",
    kind: "prince-camp",
    color: "#8c6b5d",
    summary: "A household built around an act — and dissolved by its success.",
    leaderCharacterId: "kacho",
    parentFactionId: "royal-family",
    objectives: [
      {
        text: "(True objective) Get Fugetsu off the ship alive.",
        revealCh: 381,
      },
    ],
    controlledLocationIds: ["kacho-quarters"],
    operations: [
      {
        text: "The twins' escape attempt under cover of the banquet.",
        ch: 383,
      },
      {
        text: "Posthumous letter campaign against the higher princes, run by the beast-'Kacho' with Kaiser's leaked intelligence.",
        ch: 402,
      },
    ],
    statusByChapter: [
      {
        ch: 383,
        value: "Principal dead; household absorbed into Fugetsu's protection.",
      },
      {
        ch: 400,
        value:
          "Reborn as a conspiracy: her Guardian Spirit Beast, Melody, and Kaiser plot Fugetsu's survival — and coronation — from the Justice Bureau.",
      },
    ],
    introducedCh: 358,
  },
  {
    id: "fugetsu-camp",
    name: "Eleventh Prince Fugetsu's Camp",
    kind: "prince-camp",
    color: "#5d6b8c",
    summary:
      "A grieving principal, a door-making beast, and guards protecting someone who keeps stepping outside the walls.",
    leaderCharacterId: "fugetsu",
    parentFactionId: "royal-family",
    objectives: [
      {
        text: "Keep Fugetsu alive through her own deterioration.",
        revealCh: 383,
      },
      {
        text: "(The Tier 2 conspiracy) Find and stop the ability draining her; then make her King.",
        revealCh: 402,
      },
    ],
    controlledLocationIds: ["fugetsu-quarters"],
    statusByChapter: [
      {
        ch: 402,
        value:
          "Principal marked by an enemy ability and fading; protected sleep at the Justice Bureau infirmary under Kaiser's arrangements.",
      },
    ],
    introducedCh: 358,
  },
  {
    id: "momoze-camp",
    name: "Twelfth Prince Momoze's Household",
    kind: "prince-camp",
    color: "#75758c",
    summary:
      "A household in name only: trained guards reassigned, replaced by strangers, and dissolved by murder within ten days of sailing.",
    leaderCharacterId: "momoze",
    parentFactionId: "royal-family",
    objectives: [
      { text: "None; the household existed to absorb risk.", revealCh: 361 },
    ],
    statusByChapter: [
      { ch: 368, value: "Principal murdered; household dissolved." },
    ],
    introducedCh: 358,
  },
  {
    id: "marayam-camp",
    name: "Thirteenth Prince Marayam's Household",
    kind: "prince-camp",
    color: "#5d8c6b",
    summary:
      "Sevanti's fortress: double-staffed guards, elite Hunters, and a beast growing in the nursery.",
    leaderCharacterId: "sevanti",
    parentFactionId: "royal-family",
    objectives: [
      { text: "Seal the suite; deliver the child alive.", revealCh: 361 },
    ],
    controlledLocationIds: ["marayam-quarters"],
    resources: ["Momoze's reassigned guards", "Hanzo and Biscuit"],
    internalConflicts: [
      {
        text: "Vergei's Nen denial obstructs every countermeasure — until Biscuit transforms in front of him.",
        revealCh: 375,
      },
    ],
    introducedCh: 358,
  },
  {
    id: "woble-camp",
    name: "Fourteenth Prince Woble's Household",
    kind: "prince-camp",
    color: "#c8bfa6",
    summary:
      "Room 1014: the weakest camp on paper, run by the sharpest operator aboard. Its Nen class made the war's bottom rung its information clearinghouse.",
    leaderCharacterId: "kurapika",
    parentFactionId: "royal-family",
    objectives: [
      { text: "Keep Woble and Oito alive to landfall.", revealCh: 358 },
      {
        text: "Convert the suite into an intelligence hub via the Nen class.",
        revealCh: 368,
      },
    ],
    controlledLocationIds: ["room-1014"],
    resources: [
      "Kurapika (Zodiac-class)",
      "Little Eye reconnaissance",
      "Class-network goodwill",
    ],
    internalConflicts: [
      {
        text: "Embedded Benjamin observers inside the suite itself.",
        revealCh: 364,
      },
    ],
    operations: [
      {
        text: "Little Eye insect reconnaissance across the royal deck (fly, then cockroach) — the lend that made Oito the murder's only witness.",
        ch: 364,
      },
      { text: "Nen class opens to rival households.", ch: 368 },
    ],
    statusByChapter: [
      { ch: 360, value: "Under systematic attack from inside the walls." },
      { ch: 368, value: "Class gambit converts weakness into leverage." },
      {
        ch: 402,
        value:
          "Hub of a three-camp bloc: Nen-enforced truce with Tubeppa, coin diplomacy with Zhang Lei, Kacho's letter in hand.",
      },
      {
        ch: 412,
        value:
          "The ineligibility gambit lands: 'Woble' is revealed as a decoy and the real prince unfindable — the camp's weakness converted into invincibility, if the curse question holds.",
      },
    ],
    introducedCh: 358,
  },
  {
    id: "kakin-military",
    name: "Kakin Royal Army",
    kind: "military",
    color: "#5d6b7a",
    summary:
      "The state's armed force aboard, in practice heavily aligned with the First Prince who commands within it.",
    leaderCharacterId: "benjamin",
    objectives: [
      {
        text: "Maintain order aboard; enforce royal authority.",
        revealCh: 359,
      },
    ],
    controlledLocationIds: ["military-hq"],
    resources: [
      "Ship security apparatus",
      "Heavy equipment",
      "Legal authority",
    ],
    internalConflicts: [
      {
        text: "Institutional duty vs. de facto service to Benjamin's candidacy.",
        revealCh: 363,
      },
      {
        text: "Tserriednich's soldier friends on Tier 3 quietly organize their own survival network, betting the army's chain of command will be turned against them.",
        revealCh: 394,
      },
    ],
    operations: [
      {
        text: "Special Martial Law enforcement: tier lockdowns, shoot-on-sight authority, execution of rival princes' guards.",
        ch: 409,
      },
    ],
    statusByChapter: [
      {
        ch: 410,
        value:
          "Fully weaponized behind Benjamin: martial law in force, three branches of government under consolidation at the Justice Bureau.",
      },
    ],
    introducedCh: 358,
  },
  {
    id: "justice-bureau",
    name: "Kakin Justice Bureau",
    kind: "bureau",
    color: "#6b7a8c",
    summary:
      "The kingdom's legal arm aboard: detentions, investigations, and the polite fiction that law still applies on a ship running a murder rite.",
    objectives: [
      {
        text: "Process the war's casualties as ordinary crimes.",
        revealCh: 364,
      },
    ],
    controlledLocationIds: ["justice-bureau-hq"],
    operations: [
      { text: "Camilla's detention after the Musse shooting.", ch: 373 },
      { text: "Momoze death investigation (inconclusive).", ch: 368 },
      {
        text: "Witness protection of Fugetsu, Melody, and the beast-'Kacho' on Tier 2 — cover for Kaiser's private conspiracy.",
        ch: 400,
      },
      {
        text: "The Balsamilco–Halkenburg trial, postponed by the courthouse ambush.",
        ch: 403,
      },
    ],
    statusByChapter: [
      {
        ch: 410,
        value:
          "Seized as Benjamin's martial-law command center; Kaiser, Mizaistom, and Botobai stand witness and stall for time.",
      },
    ],
    introducedCh: 360,
  },
  {
    id: "hunter-association",
    name: "Hunter Association",
    kind: "hunter",
    color: "#6b8c5d",
    summary:
      "Licensed Hunters aboard in every capacity: expedition staff, prince bodyguards, and the Zodiacs running both the voyage's security and its quietest investigations.",
    leaderCharacterId: "cheadle",
    objectives: [
      {
        text: "Deliver the expedition; contain Beyond; keep 200,000 passengers out of the crossfire.",
        revealCh: 359,
      },
    ],
    resources: ["Zodiacs", "Pro Hunter network", "V5 mandate"],
    operations: [
      {
        text: "Hunter bodyguard placements across prince households.",
        ch: 359,
      },
    ],
    introducedCh: 0,
  },
  {
    id: "zodiacs",
    name: "Zodiacs",
    kind: "hunter",
    color: "#8c8c3d",
    summary:
      "The Association's twelve-member executive, aboard to guard Beyond and — through their newest member, the Rat — to watch Kakin's princes.",
    leaderCharacterId: "cheadle",
    parentFactionId: "hunter-association",
    objectives: [
      { text: "Contain Beyond Netero.", revealCh: 0 },
      {
        text: "Run Kurapika as an intelligence channel into the succession war.",
        revealCh: 359,
      },
    ],
    controlledLocationIds: ["beyond-quarters"],
    introducedCh: 0,
  },
  {
    id: "phantom-troupe",
    name: "Phantom Troupe",
    kind: "troupe",
    color: "#4a5673",
    summary:
      "The Spider, aboard as stowaways in the lower tiers: eleven legs sweeping two hundred thousand passengers for the one man who is hunting them back.",
    leaderCharacterId: "chrollo",
    objectives: [
      { text: "Find and kill Hisoka.", revealCh: 359 },
      {
        text: "Plunder the Black Whale's upper decks before landfall.",
        revealCh: 379,
      },
    ],
    territoryNote: "No fixed territory; sweep routes through Tiers 3–5.",
    resources: ["Eleven elite Nen users", "Total mutual loyalty"],
    operations: [
      { text: "Ship-wide search grid for Hisoka.", ch: 363 },
      { text: "Collisions with mafia patrols in the lower tiers.", ch: 378 },
      {
        text: "Bonolenov deployed as a fake Hisoka so the mafia 'finds' him and stands down.",
        ch: 392,
      },
      {
        text: "Alliance with Cha-R and Xi-Yu against the Heil-Ly; Nobunaga kills Luini at the Cha-R office.",
        ch: 393,
      },
      {
        text: "Chrollo's private hunt for Kakin's three sacred treasures — the condition to evolve Skill Hunter against Hisoka.",
        ch: 406,
      },
    ],
    statusByChapter: [
      { ch: 377, value: "Sweep expanding; Illumi and Kalluto integrated." },
      { ch: 390, value: "Hisoka still unfound; patience thinning." },
      {
        ch: 405,
        value:
          "Nobunaga, Phinks, and Feitan committed against the Heil-Ly with mafia backing; Bonolenov shadows the real Hisoka on Tier 1; every member privately racing to kill Hisoka before Chrollo can.",
      },
    ],
    introducedCh: 0,
  },
  {
    id: "heil-ly",
    name: "Heil-Ly Family",
    kind: "mafia",
    color: "#8c5240",
    summary:
      "Morena's family: not a mafia so much as an epidemic. Members receive her contagion ability and grow stronger with every murder, seeded through the ship like spores.",
    leaderCharacterId: "morena",
    objectives: [
      {
        text: "Multiply killers until the ship's order collapses.",
        revealCh: 377,
      },
      {
        text: "(Morena) Revenge on the royal line she claims kinship with.",
        revealCh: 386,
      },
    ],
    territoryNote:
      "Nominal Tier 3 holdings; real presence is wherever her infected walk.",
    controlledLocationIds: ["heil-ly-territory"],
    resources: ["Morena's contagion ability", "Expendable empowered killers"],
    operations: [
      {
        text: "Seeded killers begin operating outside family territory.",
        ch: 378,
      },
      { text: "Luini's structural infiltrations.", ch: 392 },
      {
        text: "Dogman's ability-sniffing sweep of Halkenburg's funeral crowd; Borksen abducted as the Specialist candidate.",
        ch: 405,
      },
      {
        text: "Morena's negotiation card game recruits Borksen — via the ability's own anti-cheating trap.",
        ch: 410,
      },
    ],
    statusByChapter: [
      { ch: 377, value: "Contagion network revealed to the reader." },
      { ch: 380, value: "Open war with Xi-Yu." },
      {
        ch: 399,
        value:
          "Main hideout — a Nen-space between Tiers 2 and 3 — breached and repelled: Yokotani's invincible guards expel Nobunaga and Hinrigh, but a transmitter stays behind.",
      },
      {
        ch: 410,
        value:
          "21 members, levels climbing on industrialized murder in the waste-processing areas; Borksen secured at Level 0; the 'beginning of the end' declared.",
      },
    ],
    introducedCh: 371,
  },
  {
    id: "xi-yu",
    name: "Xi-Yu Family",
    kind: "mafia",
    color: "#4a7a78",
    summary:
      "Zhang Lei's family: the most professional of the three, fighting a conventional gang war against an unconventional enemy.",
    leaderCharacterId: "onior",
    objectives: [
      { text: "Crush Heil-Ly's spreading killers.", revealCh: 377 },
      {
        text: "Manage the Troupe problem without a war nobody would win.",
        revealCh: 378,
      },
    ],
    territoryNote: "Tier 4 holdings.",
    controlledLocationIds: ["xi-yu-territory"],
    resources: ["Hinrigh's field organization", "Zhang Lei's patronage"],
    operations: [
      { text: "Anti-Heil-Ly sweeps under Hinrigh.", ch: 378 },
      {
        text: "Hinrigh's transmitter play inside the Heil-Ly hideout, in joint operation with the Troupe.",
        ch: 398,
      },
    ],
    statusByChapter: [
      { ch: 380, value: "Escalating losses to empowered Heil-Ly killers." },
      {
        ch: 406,
        value:
          "Lynch murdered by the fake-Hisoka impostor; the family swears vengeance on the culprit while holding the anti-Heil-Ly front with Cha-R and the Troupe.",
      },
    ],
    introducedCh: 371,
  },
  {
    id: "cha-r",
    name: "Cha-R Family",
    kind: "mafia",
    color: "#a89e86",
    summary:
      "The old guard: Luzurus's family, holding entrenched Tier 5 positions, running contraband upward and finding no trace of Hisoka in its own backyard.",
    leaderCharacterId: "brocco",
    objectives: [
      {
        text: "Hold territory; profit from the war's demand for contraband.",
        revealCh: 377,
      },
    ],
    territoryNote: "Tier 5 holdings.",
    controlledLocationIds: ["cha-r-territory"],
    resources: [
      "Entrenched positions",
      "Luzurus's patronage",
      "Smuggling channels",
    ],
    internalConflicts: [
      {
        text: "Underboss Ken'i secretly answers to Morena, feeding her the coalition's progress.",
        revealCh: 405,
      },
    ],
    operations: [
      { text: "Contraband channel to Luzurus's household.", ch: 378 },
      {
        text: "Hosts the Troupe at its Tier 5 office; Tajao opens the hidden route toward Tier 2 for the anti-Heil-Ly push.",
        ch: 405,
      },
    ],
    statusByChapter: [
      {
        ch: 405,
        value:
          "Committed against the Heil-Ly alongside Xi-Yu and the Troupe — while underboss Ken'i, secretly Morena's man, warns her the Troupe is ahead of schedule and weighs playing 'their joker': the Hisoka the family has stashed away.",
      },
    ],
    introducedCh: 371,
  },
  {
    id: "beyond-expedition",
    name: "Beyond's Expedition",
    kind: "other",
    color: "#7a6b8c",
    summary:
      "The civilian expedition to the Dark Continent that the whole voyage nominally serves — its leader in custody, its ranks salted with agendas (Ging, Pariston) that dwarf the manifest. Since ch. 401 the file reads differently: Beyond's real network is a generation of secret, cursed children seeded through Kakin's guard corps.",
    leaderCharacterId: "beyond",
    objectives: [
      { text: "Reach and survey the Dark Continent.", revealCh: 0 },
      {
        text: "Steer the succession through the curse-sacrifice children — ten strong curses for fourteen princes, possibly toward an heir of Beyond's own blood.",
        revealCh: 401,
      },
    ],
    controlledLocationIds: ["beyond-quarters"],
    resources: [
      "Specialist roster",
      "Beyond's charisma and preparation",
      "Cursed children embedded in prince details (Longhi, Furykov, Makaha, others unnamed)",
      "A 1,047-lawsuit legal siege (Beyond as plaintiff — every case dismissed by Supreme Magistrate Cleapatro)",
    ],
    internalConflicts: [
      { text: "Ging vs. Pariston, permanently.", revealCh: 0 },
      {
        text: "The children are turning: Longhi plots to kill any prince of Beyond's blood; Furykov gamed Unma's coercion for his own ends; Bill has renounced him outright.",
        revealCh: 401,
      },
    ],
    operations: [
      {
        text: "Unma weaponizes Furykov's curse to force the TSK-17 poisoning of Benjamin — Beyond's seal doing work he may never have ordered.",
        ch: 413,
      },
    ],
    statusByChapter: [
      {
        ch: 412,
        value:
          "Leader still in comfortable custody, requesting meetings and filing lawsuits; his curse network is now the war's deepest open question.",
      },
    ],
    introducedCh: 0,
  },
];
