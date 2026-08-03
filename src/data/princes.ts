import type { Prince } from "@/lib/types";

/**
 * Royal war-council records. Maternal assignments for middle queens vary by
 * source; uncertain lines say so in siblingNote. Guard counts approximate.
 */
export const princes: Prince[] = [
  {
    id: "prince-benjamin",
    characterId: "benjamin",
    rank: 1,
    motherName: "Unma",
    motherCharacterId: "unma",
    queenRank: 1,
    beastId: "beast-benjamin",
    personalAbilityId: "benjamin-baton",
    guardsOriginal: 15,
    guardCharacterIds: [
      "balsamilco",
      "babimyna",
      "coventoba",
      "musse",
      "vict",
      "shikaku",
      "furykov",
      "kanjidol",
      "yushohi",
      "chiyamasi",
      "butch",
      "rihan",
      "orau",
    ],
    publicStrategy:
      "Overt military dominance: control ship security, position soldiers as 'loaned guards' in every rival household, and win by attrition.",
    hiddenStrategy: {
      text: "Treat the embedded guards as an intelligence network reporting to Balsamilco, and use Kurapika's Nen class as a free window into rival capabilities.",
      revealCh: 363,
    },
    currentObjective: [
      {
        text: "Identify the chain user and tie him to the Kurta survivor.",
        revealCh: 361,
      },
      {
        text: "Absorb dead soldiers' abilities to compound his own strength.",
        revealCh: 389,
      },
      {
        text: "Under Special Martial Law: purge the rival princes' guards, assemble the princes in Grand Hall 1001, and be anointed successor before the poison kills him.",
        revealCh: 413,
      },
      {
        text: "Merge his Guardian Spirit Beast with his inheritance ability and persist past death as Kakin's watching 'god'.",
        revealCh: 413,
      },
    ],
    vulnerabilities: [
      {
        text: "His pledged-soldier system means each embedded spy is also a hostage to circumstance.",
        revealCh: 363,
      },
      {
        text: "Camilla's post-mortem ability makes his most obvious kill target a trap.",
        revealCh: 373,
      },
      {
        text: "His own mother chose Halkenburg: Unma coerced Furykov into dosing him with TSK-17. Roughly half a day of function remains once symptoms begin.",
        revealCh: 413,
      },
      {
        text: "Halkenburg's soul, riding Balsamilco, has already fired an arrow at him — his chief strategist is enemy ordnance.",
        revealCh: 413,
      },
      {
        text: "Beyond's curse on Furykov may even point at Benjamin himself — the bearer cannot rule it out, and neither can the reader.",
        revealCh: 415,
      },
      {
        text: "Moswana's peak-potency curse is in his eyes: a second death-clock Camilla rates at half a day, stacked on the TSK-17.",
        revealCh: 416,
      },
    ],
    riskHistory: [
      {
        ch: 358,
        risk: "low",
        why: "Largest private force aboard and first-rank legitimacy.",
      },
      {
        ch: 373,
        risk: "moderate",
        why: "Camilla's direct move proved elder princes are viable targets.",
      },
      {
        ch: 413,
        risk: "critical",
        why: "Poisoned with TSK-17 by his own guard; dying on a half-day clock while Halkenburg's arrow hunts him.",
      },
      {
        ch: 416,
        risk: "critical",
        why: "Two death-clocks running at once — ten functional hours of TSK-17 by his own count, and a peak-potency Have-Not curse seared into his eyes.",
      },
    ],
    assessment: {
      political:
        "Second only to the king in institutional power; the army treats him as heir presumptive.",
      military:
        "Commands the strongest overt force aboard — a private corps of trained Nen soldiers.",
      nen: "A trained Nen user — type never recorded — whose inheritance ability compounds with every loyal death; ceiling unknown.",
      intelligence:
        "Excellent by structure: embedded observers in most households, filtered through a first-rate strategist.",
    },
    developments: [
      {
        ch: 348,
        text: "Confirms the contest terms to Tserriednich by phone; his guards skip the Hunter Exam entirely, keeping their abilities off the Association's books.",
      },
      {
        ch: 361,
        text: "Guard-exchange gambit places his soldiers in rival suites.",
      },
      { ch: 373, text: "Repels Camilla's attack; she is detained." },
      { ch: 382, text: "Yushohi assassinates Salé-salé on his order." },
      {
        ch: 389,
        text: "Ability-inheritance mechanism demonstrated to the reader.",
      },
      {
        ch: 403,
        text: "The Balsamilco-Halkenburg courthouse trap fails; 'Balsamilco' reporting to him is now Halkenburg's soul.",
      },
      {
        ch: 410,
        text: "Declares Special Martial Law and takes the Justice Bureau as his command center.",
      },
      {
        ch: 413,
        text: "Discovers Furykov's TSK-17 poisoning and Unma's betrayal; accepts Furykov back and accelerates the purge, marking Camilla and Tserriednich for personal execution.",
      },
      {
        ch: 415,
        text: "Special Martial Law goes live at 2:15 p.m.: princes summoned to Room 1001 to hear him alone, weapons surrendered at the door, Royal-Army-only escorts — and the 'clemency' for Room 1014 doubles as a ship-wide hunt for the real Woble.",
      },
      {
        ch: 416,
        text: "Sweeps Tier 1 personally on ten functional hours: kills Camilla's servants, takes Moswana's decade-nursed curse in the eyes, counters with a silent TSK-17 release at Camilla's bedside, then breaches Room 1004, seizes Danjin as proof of Kurapika's teaching, and blasts Tserriednich mid-sentence.",
      },
    ],
    mysteryIds: ["my-nasubi-intent"],
  },
  {
    id: "prince-camilla",
    characterId: "camilla",
    rank: 2,
    motherName: "Duazul",
    motherCharacterId: "duazul",
    queenRank: 2,
    beastId: "beast-camilla",
    personalAbilityId: "camilla-cat",
    guardsOriginal: 12,
    guardCharacterIds: [
      "sarahell",
      "fukataki",
      "moswana",
      "bucket",
      "hignori",
      "umanma",
      "nukuocon",
      "gidal",
      "burvena",
      "lisamsetta",
      "kako",
      "mozbe",
      "meshush",
      "taler",
    ],
    publicStrategy:
      "Direct elimination of rivals, starting at the top — protocol and consequences be damned.",
    hiddenStrategy: {
      text: "Her recklessness is underwritten by a post-mortem revival ability: being killed is part of her arsenal. Meanwhile her Have-Not guards run a curse-assassin program against every rival prince.",
      revealCh: 373,
    },
    currentObjective: [
      {
        text: "Escape or exploit detention and resume her run at Benjamin.",
        revealCh: 365,
      },
      {
        text: "Let Sarahell's curse program do from confinement what her guns cannot.",
        revealCh: 389,
      },
      {
        text: "Outlast: drop into metabolic near-hibernation and survive confinement — and whatever Benjamin released — to the contest's end.",
        revealCh: 416,
      },
    ],
    vulnerabilities: [
      {
        text: "Detained and politically isolated after the failed attack.",
        revealCh: 364,
      },
      {
        text: "Her ability defends against killers, not against confinement.",
        revealCh: 373,
      },
      {
        text: "Benjamin watches her every move through the inherited Secret Window, knows she is a counteractive type, and has reserved her elimination for himself under martial law.",
        revealCh: 413,
      },
      {
        text: "Furykov's private analysis of Beyond's birth-curse puts her at the top of the target list — a Nen user as dangerous to the regime as Halkenburg, cursed to die when Furykov does.",
        revealCh: 415,
      },
      {
        text: "TSK-17 is in her lungs, and Benjamin's riddle frames the gap in Cat's Name: a death by disease — or by a killer already dead — may leave the cat nothing to crush and no life to pour back.",
        revealCh: 416,
      },
    ],
    riskHistory: [
      {
        ch: 358,
        risk: "moderate",
        why: "Aggression invites retaliation from stronger camps.",
      },
      {
        ch: 373,
        risk: "moderate",
        why: "In custody, surrounded by rivals' jurisdiction — but her revival ability makes straightforward assassination suicidal.",
      },
      {
        ch: 413,
        risk: "critical",
        why: "A dying Benjamin, armed with knowledge of her ability's type, is coming for her personally under martial law.",
      },
      {
        ch: 416,
        risk: "critical",
        why: "Silently infected with the bioweapon killing Benjamin himself — an attack routed precisely around her revival's trigger.",
      },
    ],
    assessment: {
      political:
        "Squandered court capital with open violence; her mother's rank still shields her.",
      military:
        "A Have-Not guard corps bound to her by emancipation debt — and repurposed as curse assassins.",
      nen: "Her counter-kill revival makes her the hardest prince to murder outright; Benjamin's analysts can only class her as a 'counteractive type'.",
      intelligence:
        "Thin conventionally; Sarahell's infiltration craft is the exception.",
    },
    developments: [
      {
        ch: 363,
        text: "Rebuffs the guard exchange and openly threatens Benjamin's men.",
      },
      {
        ch: 373,
        text: "Killed by Musse, revived by Cat's Name, arrested in Benjamin's quarters.",
      },
      {
        ch: 376,
        text: "Confined to the Room 302 VVIP area by court ruling; Benjamin monitors her via Secret Window.",
      },
      {
        ch: 389,
        text: "Have-Not curse-assassin program revealed; Sarahell takes the Woble assignment herself.",
      },
      {
        ch: 411,
        text: "Sends a single guard — the disguised Sarahell — into Kurapika's second class round.",
      },
      {
        ch: 416,
        text: "The decade-long Moswana gambit lands a half-day curse on Benjamin — at the price of Fukataki, a second servant, and Moswana herself. His reply: a silent TSK-17 release at her bedside, and the first riddle her revival cannot answer.",
      },
    ],
  },
  {
    id: "prince-zhang-lei",
    characterId: "zhang-lei",
    rank: 3,
    motherName: "Tang Zhao Li",
    motherCharacterId: "tang-zhao-li",
    queenRank: 3,
    siblingNote: "Only child of Queen Tang Zhao Li.",
    beastId: "beast-zhang-lei",
    guardsOriginal: 13,
    guardCharacterIds: ["sakata", "hashito", "tenftory", "slakka", "coventoba"],
    publicStrategy:
      "Patronage and negotiation: convert wealth into obligation, and obligation into survival.",
    hiddenStrategy: {
      text: "Use the Xi-Yu family as deniable capability in the lower tiers while keeping his own hands ceremonially clean.",
      revealCh: 377,
    },
    currentObjective: [
      {
        text: "Broker arrangements with other princes' camps rather than fight them.",
        revealCh: 366,
      },
      {
        text: "Bank the Woble–Tubeppa partial-surrender pledge and decode his beast's coin economy with Kurapika's help.",
        revealCh: 404,
      },
    ],
    vulnerabilities: [
      {
        text: "His coin-based beast is generous but defensively unimpressive.",
        revealCh: 366,
      },
      {
        text: "Dependence on Xi-Yu ties his fate to a mafia war he doesn't control.",
        revealCh: 380,
      },
      {
        text: "Killing a mafia benefactor is Benjamin's cleanest martial-law trigger — and Zhang Lei is the most reachable of the three.",
        revealCh: 404,
      },
    ],
    riskHistory: [
      {
        ch: 358,
        risk: "moderate",
        why: "High rank without Benjamin's army or Camilla's fangs.",
      },
      {
        ch: 380,
        risk: "moderate",
        why: "Mafia war destabilizes his proxy force but hasn't reached him.",
      },
      {
        ch: 410,
        risk: "high",
        why: "Slipped to Tier 2 through Onior's residence just before martial law; Benjamin's reconnaissance squad is dedicated to finding him.",
      },
    ],
    assessment: {
      political:
        "The best negotiator among the elder princes; builds bridges the others burn.",
      military: "Ordinary guard corps plus Xi-Yu as an off-books arm.",
      nen: "Beast manifests as coin production — an economic weapon, not a martial one.",
      intelligence:
        "Good commercial and mafia channels; weaker on rival households.",
    },
    developments: [
      { ch: 366, text: "Beast's coin manifestation glimpsed." },
      { ch: 390, text: "Meets mafia leadership as patron; terms undisclosed." },
      {
        ch: 402,
        text: "Receives the Woble–Tubeppa pledge: both renounce the throne in his favor if the three are the last standing.",
      },
      {
        ch: 404,
        text: "Kurapika reads his coins as a cumulative ability — Nen stored toward abilities in future holders — and receives two coins himself.",
      },
      {
        ch: 410,
        text: "Vanishes to Tier 2 via Onior's residence minutes before martial law; whereabouts unconfirmed.",
      },
    ],
  },
  {
    id: "prince-tserriednich",
    characterId: "tserriednich",
    rank: 4,
    motherName: "Unma",
    motherCharacterId: "unma",
    queenRank: 1,
    beastId: "beast-tserriednich",
    personalAbilityId: "parallel-future",
    guardsOriginal: 15,
    guardCharacterIds: ["theta", "salkov", "vantine", "danjin", "myuhan"],
    publicStrategy:
      "Charm the court, patronize the arts, and appear the reasonable alternative to Benjamin.",
    hiddenStrategy: {
      text: "Acquire Nen at forced-march speed from coerced Hunter instructors and enter the war as its strongest individual.",
      revealCh: 368,
    },
    currentObjective: [
      {
        text: "Complete Water Divination and weaponize his awakened ability.",
        revealCh: 375,
      },
      {
        text: "Cut Zetsu activation below one second and master the future-sight window.",
        revealCh: 402,
      },
      {
        text: "Die convincingly under Benjamin's gun — coffin sealed, witness scripted, ability secret — and re-enter the war unseen.",
        revealCh: 416,
      },
    ],
    vulnerabilities: [
      {
        text: "His teachers are enemies: Theta's curriculum is built around a planned killshot.",
        revealCh: 375,
      },
      {
        text: "His beast acts on its own aesthetic logic; he cannot perceive it.",
        revealCh: 376,
      },
      {
        text: "Morena's Heil-Ly, his own former proxy, has turned: a 'snake charmer' targets his guards and she plots to infect his circle with Contagion.",
        revealCh: 394,
      },
      {
        text: "Benjamin's martial-law pretext names him a bioterror conspirator — and Benjamin has reserved his death for himself.",
        revealCh: 413,
      },
    ],
    riskHistory: [
      {
        ch: 358,
        risk: "moderate",
        why: "High-value target but insulated by rank and guards.",
      },
      {
        ch: 375,
        risk: "moderate",
        why: "Growing power deters attackers; internal threat from Theta rises instead.",
      },
      {
        ch: 385,
        risk: "moderate",
        why: "Survived Theta's point-blank killshot without noticing it was real; his ability now deters even his teachers.",
      },
      {
        ch: 413,
        risk: "critical",
        why: "Named in Benjamin's martial-law casus belli; a dying first prince intends to kill him personally.",
      },
      {
        ch: 416,
        risk: "critical",
        why: "Took Benjamin's blast point-blank while holding Zetsu — survival now rides entirely on an unfinished, still-practiced ability and a staged death.",
      },
    ],
    assessment: {
      political:
        "Publicly the most cultured prince; privately radioactive to anyone who knows him.",
      military: "Solid household force, secondary to his personal trajectory.",
      nen: "A once-in-a-generation aptitude — days to milestones that take others months; specialist-class future sight emerging.",
      intelligence:
        "Reads people frighteningly well in person; institutionally average.",
    },
    developments: [
      {
        ch: 345,
        text: "On-page debut: two invited guests murdered in his hotel bath between succession errands.",
      },
      {
        ch: 349,
        text: "Completes the Seed Urn Ceremony — the first prince shown taking a Guardian Spirit Beast egg.",
      },
      { ch: 368, text: "Forces Theta to begin genuine Nen instruction." },
      {
        ch: 375,
        text: "Completes early aura control absurdly fast; Theta revises her plan.",
      },
      {
        ch: 385,
        text: "Theta's killshot hits an afterimage; his ten-second future sight manifests and his beast brands her face.",
      },
      {
        ch: 394,
        text: "Cuts ties with the Heil-Ly; his soldier friends on Tier 3 begin organizing against Morena — and Borksen is abducted.",
      },
      {
        ch: 402,
        text: "Zetsu activation falls below ten seconds under Salkov; below 3.5 by ch. 404.",
      },
      {
        ch: 413,
        text: "Named alongside Halkenburg as the bioterror pretext for Benjamin's martial law.",
      },
      {
        ch: 416,
        text: "Hands Salkov the feign-death protocol — coffin at once, report exactly what you saw, never speak of the ability — then takes Benjamin's blast mid-sentence, in Zetsu, exactly as staged.",
      },
    ],
    mysteryIds: ["my-tserriednich-god-beast"],
  },
  {
    id: "prince-tubeppa",
    characterId: "tubeppa",
    rank: 5,
    motherName: "Duazul",
    motherCharacterId: "duazul",
    queenRank: 2,
    siblingNote: "Full sibling of Camilla and Luzurus under Queen Duazul.",
    beastId: "beast-tubeppa",
    guardsOriginal: 12,
    guardCharacterIds: [
      "maor",
      "longhi",
      "rihan",
      "beeta",
      "konattsu",
      "mizaurouno",
      "heisen",
      "momiita",
      "ryubihhi",
      "pitakusu",
      "komiya",
    ],
    publicStrategy:
      "Technocratic neutrality: fund research, avoid provocation, survive on competence.",
    hiddenStrategy: {
      text: "Quietly recruit capable Nen users, including feelers toward Kurapika's circle, for a defensive alliance.",
      revealCh: 370,
    },
    currentObjective: [
      {
        text: "Secure a Nen-capable protective core before the war's middle phase.",
        revealCh: 370,
      },
      {
        text: "Lock in the Nen-enforced truce with Woble's camp and redirect Benjamin's attention toward Zhang Lei.",
        revealCh: 401,
      },
    ],
    vulnerabilities: [
      {
        text: "Lacks both an army and a court bloc; her science patronage buys no soldiers.",
        revealCh: 366,
      },
      {
        text: "Her guard Longhi is a Nen user and Beyond's cursed daughter — a fact Tubeppa herself does not know.",
        revealCh: 401,
      },
      {
        text: "Benjamin's embedded soldier Rihan watches her suite, and she reads herself as his camp's next target after Salé-salé.",
        revealCh: 388,
      },
    ],
    riskHistory: [
      { ch: 358, risk: "moderate", why: "Mid-rank prince without hard power." },
      {
        ch: 370,
        risk: "moderate",
        why: "Alliance feelers, if exposed, would paint a target on her.",
      },
      {
        ch: 401,
        risk: "moderate",
        why: "The Moonlight Act truce with Woble's camp and the Zhang Lei bloc give her real cover for the first time.",
      },
      {
        ch: 413,
        risk: "high",
        why: "Martial law suspends the truce's usefulness: Benjamin's purge treats every non-aligned prince's household as suspect.",
      },
    ],
    assessment: {
      political:
        "Respected but not loved; her constituency is industry, which doesn't vote in succession wars.",
      military: "Guard corps only.",
      nen: "Beast finally shown ch. 402 — a fuming, croaking conditional type whose trigger Rihan suspects is tied to her pacts.",
      intelligence: "Methodical and cautious; her camp leaks little.",
    },
    developments: [
      {
        ch: 370,
        text: "Maor's approaches toward the Nen class network noted.",
      },
      {
        ch: 401,
        text: "Longhi's Moonlight Act contract binds her camp to Woble's in an enforceable truce.",
      },
      {
        ch: 402,
        text: "Joint pledge with Woble: both renounce the throne for Zhang Lei if the three survive together. Her beast appears for the first time.",
      },
      {
        ch: 415,
        text: "Rihan's martial-law lockdown puts a pistol to her researcher's head; she shields the science staff, reads the declaration as either a trump card burned early or a premeditated cull of the senior princes, and goes to Room 1001 with the tests still running.",
      },
    ],
  },
  {
    id: "prince-tyson",
    characterId: "tyson",
    rank: 6,
    motherName: "Katrono",
    motherCharacterId: "katrono",
    queenRank: 4,
    siblingNote: "Only child of Queen Katrono.",
    beastId: "beast-tyson",
    guardsOriginal: 11,
    guardCharacterIds: [
      "izunavi",
      "giuliano",
      "madwig",
      "himonce",
      "anzel",
      "hyuga",
      "orau",
    ],
    hunterCharacterIds: ["izunavi", "giuliano"],
    publicStrategy:
      "Radiate love and joy; publish her gospel; assume goodwill is armor.",
    currentObjective: [
      {
        text: "Spread the Book of Tyson among guards and court.",
        revealCh: 366,
      },
    ],
    vulnerabilities: [
      {
        text: "Sincere unpreparedness: her camp treats the war as a misunderstanding.",
        revealCh: 366,
      },
    ],
    riskHistory: [
      {
        ch: 358,
        risk: "moderate",
        why: "Soft target by temperament, low priority by rank.",
      },
    ],
    assessment: {
      political:
        "Genuinely popular with staff and public; irrelevant to the court's power blocs.",
      military: "Minimal.",
      nen: "Beast reportedly enforces devotion around her gospel; mechanics thinly documented.",
      intelligence: "Effectively none.",
    },
    developments: [
      {
        ch: 350,
        text: "Hires Izunavi — one of Kurapika's five planted Hunters — off the pre-voyage bodyguard listings.",
      },
      { ch: 366, text: "Beast's influence over readers of her book hinted." },
    ],
  },
  {
    id: "prince-luzurus",
    characterId: "luzurus",
    rank: 7,
    motherName: "Duazul",
    motherCharacterId: "duazul",
    queenRank: 2,
    siblingNote: "Full sibling of Camilla and Tubeppa under Queen Duazul.",
    beastId: "beast-luzurus",
    guardsOriginal: 12,
    guardCharacterIds: [
      "basho",
      "ridge",
      "satobi",
      "kanjidol",
      "scairt",
      "rice",
      "famule",
      "bharate",
      "javietti",
      "gadeau",
      "odessa",
      "macne",
    ],
    hunterCharacterIds: ["basho", "ridge", "scairt"],
    publicStrategy:
      "Keep his head down and his pipe lit; appear too indolent to bother killing.",
    hiddenStrategy: {
      text: "Procure weapons and narcotics through Cha-R channels — self-defense and self-medication through the same pipeline. The indolence is partly cover: his reads on Kacho's letters and Benjamin's timing are consistently sharp.",
      revealCh: 378,
    },
    currentObjective: [
      {
        text: "Complete the contraband arrangement without exposing the household.",
        revealCh: 378,
      },
      {
        text: "Survive martial law by total non-resistance: weapons surrendered, drugs burned, Hunters deployed as tripwires.",
        revealCh: 414,
      },
    ],
    vulnerabilities: [
      {
        text: "His supply lines are a standing infiltration vector into his suite.",
        revealCh: 378,
      },
      {
        text: "Benjamin's soldier Kanjidol lives inside his household — and under martial law began stabbing his guards in their bunks.",
        revealCh: 414,
      },
    ],
    riskHistory: [
      {
        ch: 358,
        risk: "moderate",
        why: "Unthreatening posture, but mid-rank princes make convenient early kills.",
      },
      {
        ch: 380,
        risk: "high",
        why: "Mafia war turns his contraband channel into a battlefield.",
      },
      {
        ch: 414,
        risk: "critical",
        why: "Benjamin's purge is inside his walls: two guards stabbed in their sleep with both outcomes unresolved, Kanjidol active, martial-law soldiers at his door.",
      },
      {
        ch: 415,
        risk: "critical",
        why: "Missing during the purge with Rice, household framed for treason via Kanjidol's manufactured arrest — a fugitive prince is exactly what martial law wants to shoot.",
      },
    ],
    assessment: {
      political: "Written off by the court, which is partly the point.",
      military:
        "Guard corps plus two Hunters (Basho, Ridge) — and one enemy plant.",
      nen: "Beast suspected by the Tier 2 conspirators of causing Fugetsu's addiction-mark; unconfirmed.",
      intelligence:
        "His mafia channel cuts both ways — but his personal reads are the household's best asset.",
    },
    developments: [
      {
        ch: 348,
        text: "Every one of his bodyguard applicants fails the 289th Hunter Exam screen.",
      },
      {
        ch: 350,
        text: "Hires Basho — one of Kurapika's five planted Hunters — off the pre-voyage bodyguard listings.",
      },
      { ch: 378, text: "Cha-R procurement channel surfaces in the record." },
      {
        ch: 386,
        text: "Shikaku's staged suicide at his door drags his household into the Halkenburg investigation.",
      },
      {
        ch: 402,
        text: "Reads Kacho's letter as a deliberate wedge against Tserriednich and declines the bait.",
      },
      {
        ch: 414,
        text: "Anticipates martial law before the announcement: orders no resistance, drugs burned, and Ridge onto Kanjidol.",
      },
      {
        ch: 415,
        text: "Gone: when the martial-law lockdown reaches Room 1007, the prince and Rice are already missing — Satobi's guess is the Cha-R boss.",
      },
    ],
  },
  {
    id: "prince-salele",
    characterId: "salele",
    rank: 8,
    motherName: "Swinko-swinko",
    motherCharacterId: "swinko-swinko",
    queenRank: 5,
    siblingNote: "Only child of Queen Swinko-swinko.",
    beastId: "beast-salele",
    guardsOriginal: 10,
    guardCharacterIds: ["yushohi", "mushaho", "koroabde"],
    publicStrategy:
      "Float through the war on a barge of pleasures; be nobody's problem.",
    currentObjective: [
      {
        text: "None discernible beyond the next entertainment.",
        revealCh: 366,
      },
    ],
    vulnerabilities: [
      {
        text: "An entourage of strangers is an entourage of vectors.",
        revealCh: 366,
      },
      {
        text: "The vector that mattered was official: Benjamin's soldier Yushohi, rotated into his guard specifically to kill him.",
        revealCh: 382,
      },
    ],
    riskHistory: [
      {
        ch: 358,
        risk: "moderate",
        why: "Soft target profile among the middle ranks.",
      },
      {
        ch: 381,
        risk: "critical",
        why: "Benjamin's assassin inside the guard rotation.",
      },
      {
        ch: 382,
        risk: "eliminated",
        why: "Assassinated in his bed by Yushohi on the eighth night; publicly recorded as illness.",
      },
    ],
    assessment: {
      political: "None to speak of.",
      military: "Minimal — and infiltrated.",
      nen: "Beast reported in outline only; it did not save him.",
      intelligence: "His parties heard everything and he retained none of it.",
    },
    developments: [
      { ch: 366, text: "Household pattern established at the banquet." },
      {
        ch: 382,
        text: "Killed by Yushohi; his banquet absence blamed on illness. Rivals like Tubeppa infer the truth from the no-show.",
      },
      {
        ch: 413,
        text: "His Flame of Life burns in the burial chamber — eligibility formally extinguished.",
      },
    ],
  },
  {
    id: "prince-halkenburg",
    characterId: "halkenburg",
    rank: 9,
    motherName: "Duazul",
    motherCharacterId: "duazul",
    queenRank: 2,
    siblingNote:
      "Registered under Duazul's line alongside Camilla, Tubeppa, and Luzurus.",
    beastId: "beast-halkenburg",
    guardsOriginal: 12,
    guardCharacterIds: ["sumidori", "yuhirai"],
    publicStrategy:
      "Refuse the rite, denounce it publicly, and force reform by moral example.",
    hiddenStrategy: {
      text: "Once convinced abstention feeds the slaughter, accept the war — using an ability that spends his followers' lives, each shot a moral debt.",
      revealCh: 386,
    },
    currentObjective: [
      {
        text: "End the succession war with the minimum total bloodshed his conscience can carry.",
        revealCh: 375,
      },
      {
        text: "Win from inside Balsamilco's body: his own corpse buried, his eligibility intact, his arrow already loosed at Benjamin.",
        revealCh: 413,
      },
    ],
    vulnerabilities: [
      {
        text: "A guard corps of barely a dozen volunteers — men who followed him personally rather than by assignment.",
        revealCh: 359,
      },
      {
        text: "His weapon consumes the very followers whose loyalty defines him.",
        revealCh: 386,
      },
      {
        text: "His soul survives only as long as the borrowed body does — and Benjamin has deduced the trick and sent soldiers to Room 1009.",
        revealCh: 413,
      },
    ],
    riskHistory: [
      {
        ch: 358,
        risk: "high",
        why: "Publicly anti-war, minimally guarded, ideologically isolated.",
      },
      {
        ch: 375,
        risk: "moderate",
        why: "His beast's demonstrated lethality deters casual attack.",
      },
      {
        ch: 403,
        risk: "critical",
        why: "Body poisoned with TSK-17 by his own hand after the mind swap; a deliberate gamble with no undo.",
      },
      {
        ch: 404,
        risk: "critical",
        why: "His original body is dead, but his soul remains active inside Balsamilco and he is still contest-eligible. His survival now depends on a borrowed body inside enemy territory.",
      },
    ],
    assessment: {
      political:
        "The court's conscience and its irritant; genuine popular moral authority — his funeral drew crowds no other prince would.",
      military:
        "Guards disbanded below Tier 2 after his 'death'; his real force is twelve civilian volunteers powering the arrow.",
      nen: "A group-powered phenomenon fully mapped by ch. 404: The Boy Who Shoots the Arrow — forced mind swap, one mind awake at a time, own side holds priority, death defined as body AND mind. His own Nen type was never recorded.",
      intelligence:
        "Transformed: he now sees through Balsamilco's eyes inside Benjamin's own command loop.",
    },
    developments: [
      {
        ch: 350,
        text: "Posted no bodyguard listing; Kurapika profiles him off the six decoy ads, and Oito's trap catches applicants aiming for him.",
      },
      { ch: 359, text: "Publicly refuses the succession rite." },
      { ch: 375, text: "Beast marks his sleeping guards with seals." },
      {
        ch: 382,
        text: "Confronts Nasubi at gunpoint, awakens, and fires his first arrow: Shikaku's body taken, Sumidori's spent.",
      },
      {
        ch: 386,
        text: "Mind-swap mechanism probed via the staged Room 1007 suicide — the Shikaku-Sumidori experiment.",
      },
      {
        ch: 403,
        text: "Ambushes Balsamilco at the courthouse and swaps into his body.",
      },
      {
        ch: 404,
        text: "Poisons his own body with the stolen TSK-17; it dies that night while he runs the cover-up as 'Balsamilco'.",
      },
      {
        ch: 413,
        text: "His Flame of Life stays unlit; Nasubi confirms he is still fighting. Fires an arrow at Benjamin from Room 1009.",
      },
    ],
    mysteryIds: ["my-halkenburg-arrow-mechanics"],
  },
  {
    id: "prince-kacho",
    characterId: "kacho",
    rank: 10,
    motherName: "Seiko",
    motherCharacterId: "seiko",
    queenRank: 6,
    siblingNote: "Twin of Fugetsu.",
    beastId: "beast-kacho",
    guardsOriginal: 9,
    guardCharacterIds: [
      "melody",
      "loberry",
      "keeney",
      "yuri",
      "roccoli",
      "lizlura",
    ],
    hunterCharacterIds: ["melody", "keeney"],
    publicStrategy:
      "Perform contempt for everyone, especially her twin, so the pair never looks like a joint target.",
    hiddenStrategy: {
      text: "Everything is cover for one plan: get Fugetsu off the ship alive, whatever it costs Kacho.",
      revealCh: 381,
    },
    currentObjective: [
      {
        text: "Execute the twins' escape through Fugetsu's doors.",
        revealCh: 381,
      },
    ],
    vulnerabilities: [
      {
        text: "The escape plan required leaving protection and entering unmapped space.",
        revealCh: 381,
      },
    ],
    riskHistory: [
      {
        ch: 358,
        risk: "moderate",
        why: "Low-rank prince with a functioning guard detail.",
      },
      {
        ch: 381,
        risk: "critical",
        why: "Off-plan escape into passage space, beyond any guard's reach.",
      },
      { ch: 383, risk: "eliminated", why: "Killed covering Fugetsu's escape." },
    ],
    assessment: {
      political: "Deliberately friendless — camouflage that worked too well.",
      military: "Standard detail plus Melody.",
      nen: "Beast: a chorus of puppet figures; post-mortem persistence around Fugetsu unresolved.",
      intelligence: "Sharp personal reads; no network.",
    },
    developments: [
      {
        ch: 350,
        text: "Hires Melody — one of Kurapika's five planted Hunters — off the pre-voyage bodyguard listings.",
      },
      {
        ch: 381,
        text: "The act drops: the escape plan and the sisters' true bond revealed.",
      },
      {
        ch: 383,
        text: "Dies covering the lifeboat escape; something wearing her shape walks back with Fugetsu.",
      },
      {
        ch: 400,
        text: "The 'something' declares itself: her Guardian Spirit Beast, running a post-mortem campaign to make Fugetsu King from inside the Justice Bureau.",
      },
      {
        ch: 402,
        text: "Her posthumous letters — drafted with Kaiser's leaked intelligence — land on the desks of six princes.",
      },
    ],
  },
  {
    id: "prince-fugetsu",
    characterId: "fugetsu",
    rank: 11,
    motherName: "Seiko",
    motherCharacterId: "seiko",
    queenRank: 6,
    siblingNote: "Twin of Kacho.",
    beastId: "beast-fugetsu",
    guardsOriginal: 9,
    guardCharacterIds: [
      "ladiolus",
      "illardia",
      "bachaem",
      "ryoji",
      "toneaster",
    ],
    publicStrategy:
      "Endure; she never wanted the war and barely acknowledges it.",
    currentObjective: [
      {
        text: "Survive her grief; keep opening doors for reasons she can no longer articulate.",
        revealCh: 388,
      },
    ],
    vulnerabilities: [
      {
        text: "Post-Kacho psychological deterioration; her judgment can no longer be assumed.",
        revealCh: 388,
      },
      {
        text: "Her door ability tempts her into unguarded space no protector can pre-clear.",
        revealCh: 370,
      },
    ],
    riskHistory: [
      {
        ch: 358,
        risk: "moderate",
        why: "Low-priority target with a standard detail.",
      },
      {
        ch: 381,
        risk: "critical",
        why: "Escape attempt into unmapped passage space.",
      },
      {
        ch: 383,
        risk: "high",
        why: "Returned alive but psychologically compromised; ability keeps operating.",
      },
      {
        ch: 402,
        risk: "critical",
        why: "An enemy Nen mark is draining her toward death through her own ability; Benjamin gives her ten days. Basho's talisman and enforced rest are the only brakes.",
      },
    ],
    assessment: {
      political: "None; her line's survival is now her whole constituency.",
      military: "Standard detail plus Basho.",
      nen: "Beast conjures doors between known locations — strategically the most valuable single ability aboard.",
      intelligence: "None organized.",
    },
    developments: [
      { ch: 370, text: "Door ability used for unauthorized visits." },
      { ch: 383, text: "Escapes; Kacho does not." },
      {
        ch: 388,
        text: "Deterioration documented; the Kacho-presence appears in the record.",
      },
      {
        ch: 400,
        text: "Believes her door now works without daily limits — a belief the conspirators trace to an enemy mark on her shoulder.",
      },
      {
        ch: 402,
        text: "Delivers Kacho's letters door-to-door on Tier 1, mapping door destinations in every prince's suite along the way.",
      },
      {
        ch: 404,
        text: "Collapses into protected sleep at the Justice Bureau infirmary; the beast-'Kacho' begins visibly fading beside her.",
      },
      {
        ch: 415,
        text: "Room 1011 is sealed as an absent prince's quarters; Seiko orders that Fugetsu not leave the Ministry of Justice no matter what happens.",
      },
    ],
    mysteryIds: ["my-fugetsu-door-limits"],
  },
  {
    id: "prince-momoze",
    characterId: "momoze",
    rank: 12,
    motherName: "Sevanti",
    motherCharacterId: "sevanti",
    queenRank: 7,
    siblingNote:
      "Elder sibling of Marayam; all but six of her guards were reassigned to him.",
    beastId: "beast-momoze",
    guardsOriginal: 6,
    guardCharacterIds: [
      "nipaper",
      "vict",
      "tuffdy",
      "bladge",
      "laroc",
      "nagmum",
    ],
    publicStrategy:
      "Obedience: accept her mother's decisions, including the ones that doomed her.",
    currentObjective: [
      {
        text: "None recorded; she was given no resources to have one.",
        revealCh: 361,
      },
    ],
    vulnerabilities: [
      {
        text: "Guarded by reassigned strangers with no loyalty to her.",
        revealCh: 361,
      },
      {
        text: "Her beast manipulates its user's watchers, not her enemies — no personal shield.",
        revealCh: 367,
      },
    ],
    riskHistory: [
      {
        ch: 358,
        risk: "high",
        why: "Stripped household; loyalty-free guards.",
      },
      {
        ch: 367,
        risk: "critical",
        why: "Active killer inside the suite's watch rotation.",
      },
      {
        ch: 368,
        risk: "eliminated",
        why: "Strangled by one of her own watch guards while four stood outside the door.",
      },
    ],
    assessment: {
      political: "Sacrificed by her own line before the war began.",
      military: "Six borrowed watchers; in practice none that were hers.",
      nen: "Beast's manipulation effect documented mostly posthumously.",
      intelligence: "None.",
    },
    developments: [
      {
        ch: 350,
        text: "Hires Hanzo — one of Kurapika's five planted Hunters — off the pre-voyage bodyguard listings.",
      },
      { ch: 361, text: "Guard reassignment to Marayam recorded." },
      { ch: 368, text: "Killed; the war's first royal casualty." },
      {
        ch: 372,
        text: "Hanzo's double extracts a confession from her killer, the watcher Tuffdy, and executes him in his cell — filed as suicide.",
      },
    ],
    mysteryIds: ["my-momoze-assassin"],
  },
  {
    id: "prince-marayam",
    characterId: "marayam",
    rank: 13,
    motherName: "Sevanti",
    motherCharacterId: "sevanti",
    queenRank: 7,
    siblingNote: "Younger sibling of Momoze; inherited her guard detail.",
    beastId: "beast-marayam",
    guardsOriginal: 15,
    guardCharacterIds: [
      "hanzo",
      "biscuit",
      "belerainte",
      "vergei",
      "barrigen",
      "naipei",
    ],
    hunterCharacterIds: ["hanzo", "biscuit", "belerainte"],
    publicStrategy:
      "A child has no strategy; Sevanti's is fortress defense with double-staffed guards.",
    currentObjective: [
      {
        text: "Sevanti: keep the suite sealed and Marayam alive to the far shore.",
        revealCh: 361,
      },
    ],
    vulnerabilities: [
      {
        text: "His beast grows with him and no one — including his mother — knows toward what.",
        revealCh: 390,
      },
    ],
    riskHistory: [
      {
        ch: 358,
        risk: "moderate",
        why: "Fortified household, low symbolic value as a target.",
      },
      {
        ch: 390,
        risk: "moderate",
        why: "The beast's growth makes the suite itself an unknown quantity.",
      },
      {
        ch: 413,
        risk: "high",
        why: "Martial law demands his presence in Grand Hall 1001; his location reads as 'unknown' to Benjamin's camp, and Rihan will be dispatched if the household fails to appear.",
      },
    ],
    assessment: {
      political:
        "None personally; Sevanti spends what little the line has on him.",
      military: "Double-staffed detail including two elite Hunters.",
      nen: "Beast visibly evolving — snake to something larger; ceiling unknown.",
      intelligence: "None.",
    },
    developments: [
      {
        ch: 350,
        text: "Hires Biscuit — one of Kurapika's five planted Hunters — off the pre-voyage bodyguard listings.",
      },
      { ch: 361, text: "Momoze's guards absorbed into his detail." },
      {
        ch: 390,
        text: "Beast's continued growth alarms the household's Hunters.",
      },
      {
        ch: 415,
        text: "Bisky reads Saquelle's timed go-order and commits the camp to holing up: the Nen space is likely one-time-use, and leaving could reset, sleep, or erase the beast entirely.",
      },
    ],
    mysteryIds: ["my-marayam-beast-form"],
  },
  {
    id: "prince-woble",
    characterId: "woble",
    rank: 14,
    motherName: "Oito",
    motherCharacterId: "oito",
    queenRank: 8,
    beastId: "beast-woble",
    guardsOriginal: 11,
    guardCharacterIds: [
      "kurapika",
      "bill",
      "sayird",
      "kurton",
      "woody",
      "shimano",
      "babimyna",
      "sakata",
      "hashito",
    ],
    hunterCharacterIds: ["kurapika", "bill", "kurton"],
    publicStrategy:
      "An infant has none; Oito's is total dependence on Kurapika's competence.",
    hiddenStrategy: {
      text: "Kurapika's broadcast Nen class converts Room 1014 from the weakest suite into the war's intelligence hub.",
      revealCh: 368,
    },
    currentObjective: [
      {
        text: "Survive to landfall; disembark alive with Oito.",
        revealCh: 358,
      },
      {
        text: "Make ineligibility itself the shield: a Woble no one can find is a Woble no one can kill.",
        revealCh: 412,
      },
    ],
    vulnerabilities: [
      {
        text: "Lowest rank, no faction, and a suite that was being hollowed out by hidden killers from day one.",
        revealCh: 360,
      },
      {
        text: "Her defense is one man whose ability shortens his life every time he uses it.",
        revealCh: 370,
      },
      {
        text: "Sarahell — Camilla's curse assassin — sits in the Nen class disguised as a maid, accumulating a curse against the prince.",
        revealCh: 411,
      },
      {
        text: "If Beyond's curse triggers on Seed Urn participation rather than contest participation, the real Woble is cursed wherever she is — beyond any guard's reach.",
        revealCh: 414,
      },
    ],
    riskHistory: [
      {
        ch: 358,
        risk: "critical",
        why: "Universal first-kill prediction: lowest rank, weakest camp.",
      },
      {
        ch: 362,
        risk: "high",
        why: "Silent Majority attacks blunted; Kurapika's countermeasures holding.",
      },
      {
        ch: 370,
        risk: "moderate",
        why: "The Nen class makes Room 1014 politically useful alive to every camp.",
      },
      {
        ch: 412,
        risk: "moderate",
        why: "Ineligibility declared: the infant aboard is a decoy, the real prince unfindable. Priority as a target drops — but the curse question stays open and Sarahell's work continues.",
      },
      {
        ch: 415,
        risk: "high",
        why: "Special Martial Law doubles as a ship-wide manhunt: if the real Woble is found — or proven ashore — the deferrals end and Oito's line goes with them.",
      },
    ],
    assessment: {
      political:
        "None — which, under Kurapika's management, became a kind of neutrality.",
      military: "One Zodiac-class defender plus remnants of a gutted detail.",
      nen: "Beast observed only in fragmentary glimpses; behavior toward Oito notably non-hostile.",
      intelligence:
        "Paradoxically the best-informed camp aboard: Little Eye reconnaissance plus the class network.",
    },
    developments: [
      {
        ch: 350,
        text: "Queen Oito hires Kurapika through the fake 'Halkenburg' listing; her real ask is getting Woble off the ship.",
      },
      { ch: 359, text: "First guard deaths inside the sealed suite." },
      {
        ch: 368,
        text: "Oito's Little Eye cockroach reconnaissance maps hidden passages between royal suites.",
      },
      {
        ch: 368,
        text: "Nen class announced; rival guards enter Room 1014 as students.",
      },
      {
        ch: 401,
        text: "Longhi's Moonlight Act binds the camp into a Nen-enforced truce with Tubeppa.",
      },
      {
        ch: 402,
        text: "Joint pledge with Tubeppa to renounce the throne for Zhang Lei if the three survive together.",
      },
      {
        ch: 412,
        text: "Kurapika declares Woble ineligible: the infant aboard is Oito's nephew, the real prince off-ship at an unknown location.",
      },
      {
        ch: 414,
        text: "Mainland protection planned for the real Woble via Oito's coded-letter channel; Kurapika thinks of Gon and Killua.",
      },
      {
        ch: 415,
        text: "Benjamin's 'clemency': the substitute is ruled legally blameless and Oito's indictment deferred as prospective queen mother — both confined to the master bedroom while the ship is searched for the real prince.",
      },
    ],
    mysteryIds: ["my-woble-beast-ability", "my-silent-majority-user"],
  },
];
