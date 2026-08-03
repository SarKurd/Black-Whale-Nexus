/**
 * Ship locations aboard the Black Whale.
 *
 * Canonicity is set honestly: named rooms and tiers are "canonical",
 * mafia territories are "approximate" (the manga never draws hard borders),
 * and the hidden passage network is "inferred" from scattered evidence.
 */

import type { ShipLocation } from "@/lib/types";

export const locations: ShipLocation[] = [
  // -------------------------------------------------------------------------
  // Off-ship locations
  // -------------------------------------------------------------------------
  {
    id: "beyond-hideout",
    name: "Beyond's Hideout",
    kind: "other",
    canonicity: "canonical",
    description:
      "The lair where Beyond Netero's ten hand-picked specialists assemble before the voyage: the room Ging walks into to buy the No. 2 seat at double pay, the venue for his lectures on the past Dark Continent expeditions, and the stage for Pariston's pre-issued loyalty test on Muherr's men.",
    introducedCh: 340,
  },
  {
    id: "whale-island",
    name: "Whale Island",
    kind: "other",
    canonicity: "canonical",
    description:
      "Gon's island home, where he returns after losing his Nen — on Ging's advice to treat the loss as a chance to go looking for 'something'. Mito puts him back to housework and a mountain of overdue paperwork; over dinner Gon admits that finding Ging, not staying beside him, was always the goal. The archive's one record of a subject stepping out of the war entirely.",
    introducedCh: 0,
  },
  {
    id: "meteor-city",
    name: "Meteor City",
    kind: "other",
    canonicity: "canonical",
    description:
      "The junkyard city of the discarded, whose people hold no records and officially do not exist — and whose children were stolen by outsiders until the city bought protection by supplying the Mafia with recruits. The Troupe's founding is staged here in flashback: church screenings of scavenged tapes, a band of children who decided they were a troupe, and Sarasa's murder, over whose grave Chrollo vowed to build a criminal haven that would lure her killers back. Chrollo also names the city as where he acquired The Sun and Moon.",
    introducedCh: 0,
  },
  {
    id: "hunter-hq",
    name: "Hunter Association HQ",
    kind: "other",
    canonicity: "canonical",
    description:
      "The Hunter Association's headquarters, where the Zodiacs convene. Beans interrupts Cheadle's first meeting as chairman with Kakin's expedition broadcast, Netero's posthumous DVDs are screened here, and Beyond Netero walks in to hand himself over. Beyond's holding cell — the site of his interview, his declaration of war, and the six-clause contract signing — sits within the building.",
    introducedCh: 340,
  },
  {
    id: "kakin-palace",
    name: "Kakin Royal Palace",
    kind: "other",
    canonicity: "canonical",
    description:
      "Seat of the Hui Guo Rou dynasty in the Kakin Empire. Nasubi broadcasts the Dark Continent voyage to the world from here, hosts the V6 signing ceremony that legitimizes the trip, and presents his fourteen princes — the future contestants of the succession war — to the public.",
    introducedCh: 349,
  },
  {
    id: "unknown-kakin-mainland",
    name: "Unknown location — Kakin mainland",
    kind: "other",
    canonicity: "unknown",
    description:
      "An undisclosed mainland refuge used by Oito's younger sister. The real Woble has been hidden here since before the Black Whale departed; even Oito does not know the address.",
    introducedCh: 412,
  },
  {
    id: "heavens-arena",
    name: "Heavens Arena",
    kind: "other",
    canonicity: "canonical",
    description:
      "The 251-floor fighting tower where Floor Master matches are broadcast worldwide. Hisoka and Chrollo stage their long-promised deathmatch here — a no-time-limit fight to the death sanctioned under arena rules, fought in front of a packed audience that Chrollo converts into weapons.",
    introducedCh: 351,
  },
  {
    id: "tserriednich-estate",
    name: "Tserriednich's Hotel",
    kind: "other",
    canonicity: "approximate",
    description:
      "The hotel the Fourth Prince claims as his solitary residence — asked if he lives there all alone, he answers that he never really feels lonely. Women invited up from dance clubs are charmed, questioned about themselves, and never leave: the tour ends on a bathroom painted with their blood as Tserriednich phones an aide to send in another pair. The building is shown on-page but never named or located; the archive records it as his pre-voyage killing ground.",
    introducedCh: 345,
  },
  {
    id: "black-whale",
    name: "Black Whale No. 1",
    kind: "other",
    canonicity: "canonical",
    description:
      "Kakin's colossal migration ship, carrying roughly 200,000 passengers toward the Dark Continent. Five tiers stratify the ship by class: royalty and dignitaries above, steerage masses below. For the duration of the voyage it is a sealed arena — nobody boards, nobody leaves.",
    controlHistory: [
      {
        ch: 358,
        value: "royal-family",
        note: "Kakin state vessel under royal authority.",
      },
    ],
    threatHistory: [
      {
        ch: 359,
        value: "tense",
        note: "Succession war begins the night of departure.",
      },
    ],
    connectedIds: ["tier-1", "tier-2", "tier-3", "tier-4", "tier-5"],
    introducedCh: 358,
  },
  {
    id: "tier-1",
    name: "Tier 1 — Royal Deck",
    kind: "tier",
    tier: 1,
    parentId: "black-whale",
    canonicity: "canonical",
    description:
      "The top tier: royal quarters, banquet hall, military headquarters, and VIP accommodations. Access is tightly controlled by the Kakin military. Nearly every succession-war killing in the first voyage days happens here, behind guarded doors.",
    controlHistory: [
      { ch: 358, value: "royal-family" },
      {
        ch: 361,
        value: "kakin-military",
        note: "Benjamin's soldiers posted as observers inside princes' quarters — de facto military penetration of the deck.",
      },
    ],
    threatHistory: [
      { ch: 358, value: "secure" },
      { ch: 359, value: "tense", note: "First bodyguard deaths in Room 1014." },
      {
        ch: 368,
        value: "lethal",
        note: "A prince is murdered; no one above suspicion.",
      },
      {
        ch: 413,
        value: "lethal",
        note: "Special Martial Law: rival princes' guards to be executed on sight (Hunter Association exempt).",
      },
      {
        ch: 415,
        value: "tense",
        note: "The consolidation order empties the royal deck toward Room 1001 — weapons surrendered, escorts left at the door.",
      },
    ],
    connectedIds: [
      "black-whale",
      "tier-2",
      "royal-quarters",
      "banquet-hall",
      "military-hq",
      "beyond-quarters",
      "nasubi-quarters",
      "vvip-area",
      "grand-hall-1001",
      "justice-bureau-hq",
      "ministry-of-justice",
      "tier-1-casino",
      "lifeboat-area",
      "onior-residence",
    ],
    introducedCh: 358,
  },
  {
    id: "tier-2",
    name: "Tier 2 — First Class",
    kind: "tier",
    tier: 2,
    parentId: "black-whale",
    canonicity: "canonical",
    description:
      "First-class cabins for wealthy passengers, senior officials, and Hunter Association personnel. Quieter than the decks above and below it, but a corridor for anyone moving between the royal deck and the lower ship.",
    threatHistory: [
      { ch: 359, value: "secure" },
      {
        ch: 378,
        value: "tense",
        note: "Mafia and Troupe movement between tiers passes through.",
      },
      {
        ch: 400,
        value: "contested",
        note: "The Heil-Ly's true hideout sits hidden between Tiers 2 and 3.",
      },
    ],
    connectedIds: [
      "black-whale",
      "tier-1",
      "tier-3",
      "ministry-of-justice",
      "heil-ly-hideout",
      "hidden-passage-network",
      "onior-residence",
    ],
    introducedCh: 359,
  },
  {
    id: "tier-3",
    name: "Tier 3 — Second Class",
    kind: "tier",
    tier: 3,
    parentId: "black-whale",
    canonicity: "canonical",
    description:
      "Mid-ship cabins and services, including the main medical facilities. By the mafia's partition of the lower decks this is the Heil-Ly's tier, and it becomes the war's active front once the Xi-Yu carry their manhunt into it.",
    controlHistory: [
      {
        ch: 362,
        revealCh: 377,
        value: "heil-ly",
        note: "One family per bottom tier: Tier 3 answers to the Heil-Ly.",
      },
    ],
    threatHistory: [
      { ch: 362, value: "tense" },
      {
        ch: 390,
        value: "contested",
        note: "Xi-Yu hunting Heil-Ly cells across the tier; soldiers shot dead in public.",
      },
      {
        ch: 409,
        value: "lethal",
        note: "Special Martial Law: civilians kneel against walls under shoot-on-sight orders.",
      },
    ],
    connectedIds: [
      "black-whale",
      "tier-2",
      "tier-4",
      "tier-3-medical",
      "tier-3-courthouse",
      "tier-3-cinema",
      "room-3101",
      "heil-ly-territory",
      "heil-ly-office",
      "heil-ly-hideout",
      "hidden-passage-network",
    ],
    introducedCh: 359,
  },
  {
    id: "tier-4",
    name: "Tier 4 — Third Class",
    kind: "tier",
    tier: 4,
    parentId: "black-whale",
    canonicity: "canonical",
    description:
      "Dense third-class berths. Mafia soldiers, hired muscle, and hidden Nen users mix with ordinary emigrants. Members of the Phantom Troupe move through this tier while hunting Hisoka.",
    controlHistory: [
      {
        ch: 362,
        revealCh: 377,
        value: "xi-yu",
        note: "One family per bottom tier: Tier 4 answers to the Xi-Yu.",
      },
    ],
    threatHistory: [
      { ch: 362, value: "tense" },
      {
        ch: 380,
        value: "contested",
        note: "Mafia war spills into third-class corridors.",
      },
    ],
    connectedIds: [
      "black-whale",
      "tier-3",
      "tier-5",
      "tier-4-central",
      "tier-4-conference-room",
      "xi-yu-territory",
      "xi-yu-base",
    ],
    introducedCh: 359,
  },
  {
    id: "tier-5",
    name: "Tier 5 — Steerage",
    kind: "tier",
    tier: 5,
    parentId: "black-whale",
    canonicity: "canonical",
    description:
      "The bottom of the ship: bunk halls, improvised markets, gambling dens, and almost no official policing. Theft and murder go unrecorded. The Phantom Troupe boards here, and the mafia families recruit from its population.",
    controlHistory: [
      {
        ch: 362,
        revealCh: 377,
        value: "cha-r",
        note: "One family per bottom tier: Tier 5 answers to the Cha-R.",
      },
    ],
    threatHistory: [
      { ch: 359, value: "tense" },
      { ch: 362, value: "contested" },
      {
        ch: 378,
        value: "lethal",
        note: "Open mafia killings; bodies disappear without inquiry.",
      },
      {
        ch: 415,
        value: "tense",
        note: "Soldiers flood the lower tiers at the declaration, subduing passengers at gunpoint.",
      },
    ],
    connectedIds: [
      "black-whale",
      "tier-4",
      "tier-5-market",
      "tier-5-dining-hall",
      "hall-37564",
      "cha-r-territory",
      "cha-r-office",
      "cha-r-warehouse",
      "xi-yu-territory",
      "hidden-passage-network",
    ],
    introducedCh: 359,
  },
  {
    id: "royal-quarters",
    name: "Royal Quarters Block",
    kind: "royal-quarters",
    tier: 1,
    parentId: "tier-1",
    canonicity: "canonical",
    description:
      "The guarded residential block housing all fourteen princes and their retinues. Each prince holds a private suite; corridors between them are patrolled, yet the first week proves the block is anything but safe.",
    controlHistory: [{ ch: 358, value: "royal-family" }],
    threatHistory: [
      { ch: 359, value: "tense" },
      {
        ch: 368,
        value: "lethal",
        note: "Momoze's death proves princes can be reached inside the block.",
      },
      {
        ch: 414,
        value: "lethal",
        note: "Benjamin's soldiers begin killing rival guards ahead of the 2:15 p.m. martial-law deadline.",
      },
    ],
    connectedIds: [
      "tier-1",
      "room-1014",
      "marayam-quarters",
      "room-1007",
      "grand-hall-1001",
      "benjamin-quarters",
      "camilla-quarters",
      "zhang-lei-quarters",
      "tserriednich-quarters",
      "room-1005",
      "room-1006",
      "room-1008",
      "halkenburg-quarters",
      "kacho-quarters",
      "fugetsu-quarters",
      "momoze-quarters",
      "banquet-hall",
      "vvip-area",
      "justice-bureau-hq",
      "hidden-passage-network",
    ],
    introducedCh: 358,
  },
  {
    id: "room-1014",
    name: "Room 1014 (Woble & Oito)",
    kind: "room",
    tier: 1,
    parentId: "royal-quarters",
    canonicity: "canonical",
    description:
      "Suite of the Fourteenth Prince Woble and Queen Oito, defended by Kurapika's understaffed detail. Site of the first Silent Majority killings, the Little Eye incident, and later the ship's strangest classroom: Kurapika's open Nen lectures.",
    controlHistory: [{ ch: 358, value: "woble-camp" }],
    threatHistory: [
      {
        ch: 359,
        value: "lethal",
        note: "Guards die one by one to an unseen attacker.",
      },
      {
        ch: 370,
        value: "tense",
        note: "Attacks subside once the room fills with rival camps' observers.",
      },
      {
        ch: 415,
        value: "tense",
        note: "Freedom shrinks to the master bedroom: deferred indictments, with any exit charged as flight from custody.",
      },
    ],
    connectedIds: ["marayam-quarters", "royal-quarters"],
    introducedCh: 358,
  },
  {
    id: "benjamin-quarters",
    name: "Room 1001 (Benjamin)",
    kind: "royal-quarters",
    tier: 1,
    parentId: "royal-quarters",
    canonicity: "canonical",
    description:
      "The First Prince's suite doubles as a command post. From here Benjamin and Balsamilco run a soldier network embedded in every rival prince's rooms, treating the succession war as a military campaign.",
    controlHistory: [{ ch: 358, value: "benjamin-camp" }],
    threatHistory: [
      {
        ch: 359,
        value: "secure",
        note: "The best-defended suite on the ship.",
      },
      {
        ch: 364,
        value: "tense",
        note: "Camilla's move against Benjamin reaches his doorstep.",
      },
    ],
    connectedIds: ["royal-quarters", "military-hq", "grand-hall-1001"],
    introducedCh: 358,
  },
  {
    id: "camilla-quarters",
    name: "Room 1002 (Camilla)",
    kind: "royal-quarters",
    tier: 1,
    parentId: "royal-quarters",
    canonicity: "canonical",
    description:
      "The Second Prince's suite. Camilla's contempt for the contest's rules empties it early — after her strike at Benjamin's camp she spends much of the voyage in custody rather than in residence.",
    controlHistory: [{ ch: 358, value: "camilla-camp" }],
    threatHistory: [
      {
        ch: 364,
        value: "tense",
        note: "Her detention leaves the camp leaderless.",
      },
    ],
    connectedIds: ["royal-quarters"],
    introducedCh: 358,
  },
  {
    id: "zhang-lei-quarters",
    name: "Room 1003 (Zhang Lei)",
    kind: "royal-quarters",
    tier: 1,
    parentId: "royal-quarters",
    canonicity: "canonical",
    description:
      "The Third Prince's suite, run like a statesman's office. Zhang Lei receives emissaries, cultivates the mafia families his household historically sponsored, and plays a longer political game than his siblings.",
    controlHistory: [{ ch: 358, value: "zhang-lei-camp" }],
    connectedIds: ["royal-quarters"],
    introducedCh: 358,
  },
  {
    id: "tserriednich-quarters",
    name: "Room 1004 (Tserriednich)",
    kind: "royal-quarters",
    tier: 1,
    parentId: "royal-quarters",
    canonicity: "canonical",
    description:
      "The Fourth Prince's suite, part salon and part private horror. Behind the connoisseur's front, Tserriednich undergoes Nen instruction from Theta at a pace that terrifies his own teacher, and his guardian beast watches everything.",
    controlHistory: [
      { ch: 358, value: "tserriednich-camp" },
      {
        ch: 416,
        value: "kakin-military",
        note: "Benjamin kicks in the door under Special Martial Law; the household kneels while his squad sweeps the suite.",
      },
    ],
    threatHistory: [
      { ch: 373, value: "tense", note: "Theta realizes what she is creating." },
      {
        ch: 416,
        value: "lethal",
        note: "The Fourth Prince is blasted across his own bedroom mid-sentence.",
      },
    ],
    connectedIds: ["royal-quarters"],
    introducedCh: 358,
  },
  {
    id: "room-1005",
    name: "Room 1005 (Tubeppa)",
    kind: "royal-quarters",
    tier: 1,
    parentId: "royal-quarters",
    canonicity: "canonical",
    description:
      "The Fifth Prince's suite, run like a research office. Maor and Longhi carry Kurapika's truce terms back here — signed on condition that Woble and Oito accompany him to Room 1005 — while Benjamin's observer Rihan stands at the wall, cataloguing the croaking, fume-wreathed Guardian Spirit Beast that finally materializes behind her.",
    controlHistory: [{ ch: 358, value: "tubeppa-camp" }],
    threatHistory: [
      {
        ch: 388,
        value: "tense",
        note: "Tubeppa reads Salé-salé's death from his banquet no-show and concludes she is Benjamin's next target.",
      },
      {
        ch: 415,
        value: "tense",
        note: "Rihan's lockdown at gunpoint: stand by until further orders, the prince to Room 1001 with Royal Army escorts only.",
      },
    ],
    connectedIds: ["royal-quarters"],
    introducedCh: 358,
  },
  {
    id: "room-1006",
    name: "Room 1006 (Tyson)",
    kind: "royal-quarters",
    tier: 1,
    parentId: "royal-quarters",
    canonicity: "canonical",
    description:
      "The Sixth Prince's suite, part salon and part stage: Tyson's retinue perform 'reborn' roles from her favorite fictions — the amnesiac hitman Madwig among them — while Izunavi watches from the wall, studying the strange calm her gospel of love induces in everyone who reads it.",
    controlHistory: [{ ch: 358, value: "tyson-camp" }],
    connectedIds: ["royal-quarters"],
    introducedCh: 358,
  },
  {
    id: "room-1008",
    name: "Room 1008 (Salé-salé)",
    kind: "royal-quarters",
    tier: 1,
    parentId: "royal-quarters",
    canonicity: "approximate",
    description:
      "The Eighth Prince's suite — never depicted under its own number, placed here by the block's numbering scheme. Salé-salé's pleasure barge occupies it until the eighth night, when Yushohi radios Benjamin that the assassination succeeded while the prince's entourage attempts CPR on a body that has already stopped breathing.",
    controlHistory: [{ ch: 358, value: "salele-camp" }],
    threatHistory: [
      {
        ch: 382,
        value: "lethal",
        note: "Salé-salé assassinated in his own bed; publicly waved off as 'illness'.",
      },
    ],
    connectedIds: ["royal-quarters"],
    introducedCh: 358,
  },
  {
    id: "halkenburg-quarters",
    name: "Room 1009 (Halkenburg)",
    kind: "royal-quarters",
    tier: 1,
    parentId: "royal-quarters",
    canonicity: "canonical",
    description:
      "The Ninth Prince's suite. Halkenburg entered the contest under protest, and his rooms become the stage for the arc's strangest phenomenon: his guards collapsing as one, and a bow-wielding guardian beast whose arrows swap the minds of shooter and target. After his body's death, his loyal followers keep operating the ability from inside — an arrow leaves Room 1009 aimed at Benjamin himself.",
    controlHistory: [{ ch: 358, value: "halkenburg-camp" }],
    threatHistory: [
      {
        ch: 362,
        value: "tense",
        note: "His entire guard detail falls unconscious at once.",
      },
      {
        ch: 413,
        value: "lethal",
        note: "An arrow is fired at Benjamin from inside; Benjamin's breachers converge on the room.",
      },
    ],
    connectedIds: ["royal-quarters"],
    introducedCh: 358,
  },
  {
    id: "kacho-quarters",
    name: "Room 1010 (Kacho)",
    kind: "royal-quarters",
    tier: 1,
    parentId: "royal-quarters",
    canonicity: "canonical",
    description:
      "The Tenth Prince's suite, shared with Queen Seiko. Kacho's abrasive public persona is theater; from these rooms she and her twin Fugetsu quietly plan the only strategy they believe can save them both — getting off the ship entirely. After Kacho's death the room sits under regulation, and by day twelve soldiers move to seal it outright.",
    controlHistory: [{ ch: 358, value: "kacho-camp" }],
    threatHistory: [
      {
        ch: 411,
        value: "contested",
        note: "Soldiers move to seal Room 1010; Seiko stalls them by phone.",
      },
    ],
    connectedIds: ["royal-quarters", "fugetsu-quarters"],
    introducedCh: 358,
  },
  {
    id: "fugetsu-quarters",
    name: "Room 1011 (Fugetsu)",
    kind: "royal-quarters",
    tier: 1,
    parentId: "royal-quarters",
    canonicity: "canonical",
    description:
      "The Eleventh Prince's suite. Fugetsu's guardian beast conjures doors that connect distant places at fixed hours — the escape route she shares with Kacho, and later a lonely habit that worries her guards as her condition deteriorates.",
    controlHistory: [{ ch: 358, value: "fugetsu-camp" }],
    threatHistory: [
      {
        ch: 400,
        value: "tense",
        note: "Fugetsu's worsening state after Kacho's loss alarms her detail.",
      },
      {
        ch: 415,
        value: "tense",
        note: "Sealed as an absent prince's room for the duration of martial law; Seiko orders no one admitted.",
      },
    ],
    connectedIds: ["royal-quarters", "kacho-quarters"],
    introducedCh: 358,
  },
  {
    id: "momoze-quarters",
    name: "Room 1012 (Momoze)",
    kind: "royal-quarters",
    tier: 1,
    parentId: "royal-quarters",
    canonicity: "canonical",
    description:
      "The Twelfth Prince's suite — the contest's first proof that a prince can die. Stripped of most of her guards by her own mother's reassignment order, Momoze was left asleep and effectively unprotected.",
    controlHistory: [{ ch: 358, value: "momoze-camp" }],
    threatHistory: [
      {
        ch: 367,
        value: "contested",
        note: "Guard detail gutted by reassignment to Marayam.",
      },
      { ch: 368, value: "lethal", note: "Momoze murdered in her own rooms." },
    ],
    connectedIds: ["royal-quarters", "marayam-quarters"],
    introducedCh: 358,
  },
  {
    id: "marayam-quarters",
    name: "Room 1013 (Marayam)",
    kind: "royal-quarters",
    tier: 1,
    parentId: "royal-quarters",
    canonicity: "canonical",
    description:
      "The Thirteenth Prince's household, next door to Room 1014. A child prince, an overprotective queen, a Justice Bureau chief who refuses to believe in Nen — and, from mid-voyage, an occupied duplicate of the room itself, hidden inside the guardian beast's one-way Nen space.",
    controlHistory: [{ ch: 358, value: "marayam-camp" }],
    threatHistory: [
      {
        ch: 368,
        value: "tense",
        note: "Inherits Momoze's guards, and possibly her killer's cover.",
      },
    ],
    connectedIds: [
      "royal-quarters",
      "room-1014",
      "momoze-quarters",
      "room-1013-nen-space",
    ],
    introducedCh: 358,
  },
  {
    id: "room-1013-nen-space",
    name: "Room 1013 — Beast Space",
    kind: "other",
    tier: 1,
    parentId: "marayam-quarters",
    canonicity: "canonical",
    description:
      "A perfect duplicate of Room 1013 conjured by Marayam's Guardian Spirit Beast, sealed behind a one-way boundary: leave, and you can neither return nor see inside. From the corridor the real room reads empty — which is why nobody can find the Thirteenth Prince.",
    controlHistory: [{ ch: 372, revealCh: 375, value: "marayam-camp" }],
    threatHistory: [
      {
        ch: 375,
        value: "secure",
        note: "The safest room aboard, provided you never step out.",
      },
      {
        ch: 415,
        value: "tense",
        note: "Benjamin's plant acknowledges a 2:15 go-order inside; the camp holes up rather than march Marayam out of a one-shot sanctuary.",
      },
    ],
    connectedIds: ["marayam-quarters"],
    introducedCh: 372,
  },
  {
    id: "banquet-hall",
    name: "Royal Banquet Hall",
    kind: "public-area",
    tier: 1,
    parentId: "tier-1",
    canonicity: "canonical",
    description:
      "The ceremonial hall where Nasubi hosts the princes' banquet in the voyage's first days. The only scene in the arc where all fourteen princes share a room — a diplomatic stage over a killing floor.",
    controlHistory: [{ ch: 358, value: "royal-family" }],
    threatHistory: [
      {
        ch: 365,
        value: "tense",
        note: "Fourteen camps, one room, every guard watching every other.",
      },
    ],
    connectedIds: ["royal-quarters", "tier-1", "lifeboat-area"],
    introducedCh: 358,
  },
  {
    id: "military-hq",
    name: "Kakin Military Headquarters",
    kind: "restricted",
    tier: 1,
    parentId: "tier-1",
    canonicity: "canonical",
    description:
      "Operations center of the Royal Army aboard ship, dominated in practice by Benjamin's faction. Surveillance feeds from the princes' quarters route here, and detainees of royal interest — Camilla among them — end up in its custody.",
    controlHistory: [
      { ch: 358, value: "kakin-military" },
      {
        ch: 361,
        value: "benjamin-camp",
        note: "Benjamin's officers effectively direct ship-side military operations.",
      },
    ],
    threatHistory: [
      {
        ch: 413,
        value: "lethal",
        note: "Special Martial Law converts the military apparatus into Benjamin's purge instrument.",
      },
    ],
    connectedIds: ["tier-1", "benjamin-quarters"],
    introducedCh: 358,
  },
  {
    id: "ministry-of-justice",
    name: "Ministry of Justice (Tier 2)",
    kind: "bureau",
    tier: 2,
    parentId: "tier-2",
    canonicity: "canonical",
    description:
      "The Justice apparatus's shipboard seat on Tier 2: prosecution offices, courtrooms, holding cells, and a VIP witness-protection wing. Melody, Fugetsu, and the beast wearing Kacho's shape shelter here under Kaiser's protection; Halkenburg's trial with Benjamin is scheduled — and ambushed — in its courthouse corridors. Under Special Martial Law it becomes Benjamin's joint-force command center.",
    controlHistory: [
      { ch: 381, value: "justice-bureau" },
      {
        ch: 410,
        value: "benjamin-camp",
        note: "Benjamin consolidates the three branches of government here by force.",
      },
    ],
    threatHistory: [
      { ch: 386, value: "secure", note: "The most neutral ground aboard." },
      {
        ch: 403,
        value: "tense",
        note: "Halkenburg's followers ambush Balsamilco inside the courthouse area.",
      },
      {
        ch: 410,
        value: "contested",
        note: "Occupied as the martial-law command center.",
      },
    ],
    connectedIds: ["tier-2", "tier-1"],
    introducedCh: 381,
  },
  {
    id: "nasubi-quarters",
    name: "King Nasubi's Quarters",
    kind: "royal-quarters",
    tier: 1,
    parentId: "tier-1",
    canonicity: "canonical",
    description:
      "The King's living quarters behind the VVIP gate — a gate Halkenburg petitions daily by letter, then storms at gunpoint, only for the bullet to freeze inches from his father's face. A room of extravagant paintings and scripted audiences; behind a secret door that only Nugui opens waits the princes' burial chamber.",
    controlHistory: [
      {
        ch: 376,
        value: "royal-family",
        note: "Access controlled by the VVIP gate guards; princes may see the King only at the Sunday banquets.",
      },
    ],
    threatHistory: [
      {
        ch: 382,
        value: "tense",
        note: "Halkenburg and five guards force their way in at gunpoint; the ritual itself shields the King.",
      },
      {
        ch: 413,
        value: "secure",
        note: "Only Nasubi, Nugui, and the priesthood pass the gate for Halkenburg's interment.",
      },
    ],
    connectedIds: ["tier-1", "vvip-area", "burial-chamber"],
    introducedCh: 376,
  },
  {
    id: "vvip-area",
    name: "Tier 1 VVIP Area",
    kind: "restricted",
    tier: 1,
    parentId: "tier-1",
    canonicity: "canonical",
    description:
      "The gated enclave above even the royal block: a taped-off entrance corridor, a civilian visit ledger, armed soldiers behind the cordon. Benjamin rules the war from his room here after Cleapatro's confinement ruling, Camilla sits under surveillance running her curse program, Halkenburg's closest men wait under watch, and the gate guards collect the Ninth Prince's daily letters to his father.",
    controlHistory: [
      {
        ch: 376,
        value: "kakin-military",
        note: "Cleapatro's ruling confines Benjamin and Camilla here under guard until Musse is found.",
      },
    ],
    threatHistory: [
      {
        ch: 376,
        value: "secure",
        note: "The most tightly gated space on Tier 1.",
      },
      {
        ch: 389,
        value: "tense",
        note: "The Have-Not curse program operates from Camilla's confinement inside.",
      },
      {
        ch: 408,
        revealCh: 413,
        value: "lethal",
        note: "Benjamin, poisoned and racing the clock, launches the martial-law purge from his room here.",
      },
    ],
    connectedIds: [
      "tier-1",
      "royal-quarters",
      "camilla-confinement",
      "nasubi-quarters",
    ],
    introducedCh: 376,
  },
  {
    id: "burial-chamber",
    name: "Princes' Burial Chamber",
    kind: "restricted",
    tier: 1,
    parentId: "nasubi-quarters",
    canonicity: "canonical",
    description:
      "A hidden vault within Nasubi's own quarters, opened by the butler Nugui: assigned chambers for each fallen prince, each with a fireplace for a 'Flame of Life.' Salé-salé, Kacho, and Momoze's flames burn; Halkenburg's chamber stays dark — his soul, and therefore his eligibility, survives his body.",
    controlHistory: [{ ch: 413, value: "royal-family" }],
    threatHistory: [
      {
        ch: 413,
        value: "secure",
        note: "Only Nasubi, Nugui, and the priesthood enter.",
      },
    ],
    connectedIds: ["nasubi-quarters"],
    introducedCh: 413,
  },
  {
    id: "camilla-confinement",
    name: "Room 302 (VVIP Confinement)",
    kind: "restricted",
    tier: 1,
    parentId: "vvip-area",
    canonicity: "canonical",
    description:
      "Camilla's confinement suite in the VVIP area, imposed by Supreme Magistrate Cleapatro after the Musse killing. Guarded and monitored — yet inside it Sarahell paints on a maid's face and walks out to curse the Fourteenth Prince, and Camilla waits, unkillable, for the board to come to her.",
    controlHistory: [
      {
        ch: 376,
        value: "kakin-military",
        note: "Confinement ordered pending the Musse investigation.",
      },
    ],
    threatHistory: [
      {
        ch: 389,
        value: "tense",
        note: "The Have-Not curse program operates from inside the confinement.",
      },
      {
        ch: 416,
        value: "lethal",
        note: "Benjamin's raid: two servants shot dead, Moswana's suicide casting, and a silent TSK-17 release at the prince's bedside.",
      },
    ],
    connectedIds: ["vvip-area"],
    introducedCh: 376,
  },
  {
    id: "grand-hall-1001",
    name: "Room 1001 'Grand Hall'",
    kind: "room",
    tier: 1,
    parentId: "royal-quarters",
    canonicity: "canonical",
    description:
      "Benjamin's vacated suite, redesignated under Special Martial Law as the 'Grand Hall' where the surviving princes are to be assembled by 2:30 p.m. on day twelve. A gathering framed as protective custody, functioning as a kill box.",
    controlHistory: [{ ch: 413, value: "benjamin-camp" }],
    threatHistory: [
      {
        ch: 413,
        value: "lethal",
        note: "The assembly point of Benjamin's endgame purge.",
      },
    ],
    connectedIds: ["royal-quarters", "benjamin-quarters", "tier-1"],
    introducedCh: 413,
  },
  {
    id: "room-1007",
    name: "Room 1007 (Luzurus)",
    kind: "royal-quarters",
    tier: 1,
    parentId: "royal-quarters",
    canonicity: "canonical",
    description:
      "The Seventh Prince's suite: movie screens, legal-gray drugs, hired Hunters, and a prince far sharper than his stoner image. Shikaku's staged suicide happens at its threshold; on day twelve Kanjidol stabs two sleeping guards ahead of martial law, with both outcomes unresolved, while Luzurus coolly orders no resistance and the drugs burned.",
    controlHistory: [{ ch: 358, value: "luzurus-camp" }],
    threatHistory: [
      {
        ch: 386,
        value: "tense",
        note: "Sumidori-in-Shikaku's suicide at the door marks the room as a stage in someone's plan.",
      },
      {
        ch: 414,
        value: "lethal",
        note: "Benjamin's embedded soldier begins killing the detail from inside.",
      },
      {
        ch: 415,
        value: "contested",
        note: "A prince and Rice missing, the household scrambling under a treason framing, and the bound Kanjidol grinning on-site.",
      },
    ],
    connectedIds: ["royal-quarters"],
    introducedCh: 358,
  },
  {
    id: "tier-1-casino",
    name: "Tier 1 VIP Casino",
    kind: "public-area",
    tier: 1,
    parentId: "tier-1",
    canonicity: "canonical",
    description:
      "A high-end casino on the royal deck: card tables running Square-X — the 'go to heaven' variant where a player cannot fold — and banks of slot machines. Hisoka resurfaces on-page here on the twelfth day, winning absurd hands and rolling triple sevens while monologuing about his tastes; Bonolenov, mid-decoy, spots the real man across the floor.",
    connectedIds: ["tier-1"],
    introducedCh: 405,
  },
  {
    id: "lifeboat-area",
    name: "Emergency Lifeboat Area",
    kind: "other",
    tier: 1,
    parentId: "tier-1",
    canonicity: "approximate",
    description:
      "The emergency boat deck and its launch tunnel, reached at a run from the banquet hall on the eighth night. Keeney led the entranced twins here, saw them into a lifeboat, and shot himself at the boats; the craft sped away down the tunnel until, near open water, the ritual's horde of hands closed in — Kacho pushed her sister back through a door and drifted out to sea, dead in the boat. The Justice Bureau reconstructed the escape from Keeney's note, and Fugetsu's Magical Worm can still open onto the area 'and access the inside of the very first boat'.",
    threatHistory: [
      {
        ch: 383,
        value: "lethal",
        note: "Leaving the ship is a contest violation the ritual enforces itself — the horde of hands takes any prince who tries.",
      },
    ],
    connectedIds: ["banquet-hall", "tier-1"],
    introducedCh: 383,
  },
  {
    id: "justice-bureau-hq",
    name: "Justice Bureau Office",
    kind: "bureau",
    tier: 1,
    parentId: "tier-1",
    canonicity: "approximate",
    description:
      "Shipboard office of Kakin's Justice Bureau, the civilian counterweight to the military. It supplies bodyguards to the younger princes and nominally investigates the deaths on Tier 1 — an investigation the succession contest makes farcical.",
    controlHistory: [{ ch: 359, value: "justice-bureau" }],
    connectedIds: ["tier-1", "royal-quarters"],
    introducedCh: 359,
  },
  {
    id: "beyond-quarters",
    name: "Beyond's Confinement Quarters",
    kind: "restricted",
    tier: 1,
    parentId: "tier-1",
    canonicity: "canonical",
    description:
      "The guarded suite where Beyond Netero rides out the voyage in comfortable custody, watched by the Zodiacs. He treats confinement as a scheduled stop on a journey he considers already won.",
    controlHistory: [
      {
        ch: 358,
        value: "zodiacs",
        note: "V5-sanctioned custody administered by the Zodiacs.",
      },
    ],
    threatHistory: [{ ch: 358, value: "secure" }],
    connectedIds: ["tier-1"],
    introducedCh: 358,
  },
  {
    id: "tier-3-medical",
    name: "Tier 3 Central Medical Clinic",
    kind: "medical",
    tier: 3,
    parentId: "tier-3",
    canonicity: "canonical",
    description:
      "The ship's main hospital complex, serving the middle tiers — chronically understaffed, with only five clinics covering the bottom three decks. Cheadle's Hunter medics work here, and Halkenburg's poisoned body passes through its wards before the royal medical team seizes the case.",
    threatHistory: [
      { ch: 380, value: "tense" },
      {
        ch: 404,
        value: "contested",
        note: "The royal and military medical teams force Cheadle's staff off Halkenburg's case.",
      },
    ],
    connectedIds: ["tier-3"],
    introducedCh: 359,
  },
  {
    id: "tier-3-courthouse",
    name: "Tier 3 Central Courthouse",
    kind: "bureau",
    tier: 3,
    parentId: "tier-3",
    canonicity: "canonical",
    description:
      "The central courthouse of the middle decks — the judicial arm of shipboard order for the second-class masses, one tier below the Ministry of Justice complex. Botobai posts himself here from departure day: with the Kakin military overstretched, he and Mizaistom have quietly taken command of the ship's private security.",
    connectedIds: ["tier-3"],
    introducedCh: 359,
  },
  {
    id: "room-3101",
    name: "Room 3101",
    kind: "room",
    tier: 3,
    parentId: "tier-3",
    canonicity: "canonical",
    description:
      "A first-class cabin on Tier 3 — the only room in the block without a bathroom wall, the ship's plumbing space behind it and a lamp-lit hidden room beyond that. Its front door is half of a two-way warp: entering from the corridor teleports the visitor into the Heil-Ly hideout, and the hideout's own door returns here — trap and secret passageway in one, as Nobunaga deduced. The Troupe reached the hidden room by cutting through neighboring Room 3102's bathroom wall, and Room 3131 elsewhere in the block served the family as a second jump point. Under Special Martial Law the room was cordoned and barricaded as a 'Case S' after three soldiers vanished inside — the report's 'Room 125' being Togashi's own corrected slip for 3101.",
    threatHistory: [
      {
        ch: 393,
        value: "lethal",
        note: "The front door feeds anyone who steps through it straight into the Heil-Ly's processing rooms; Corporal Maizan vanishes on entry.",
      },
      {
        ch: 410,
        value: "lethal",
        note: "Cordoned as a supernatural 'Case S' after three more soldiers vanish; barricade and armed guards posted.",
      },
    ],
    connectedIds: ["tier-3", "heil-ly-hideout", "hidden-passage-network"],
    introducedCh: 393,
  },
  {
    id: "tier-3-cinema",
    name: "Tier 3 Cinema Complex",
    kind: "public-area",
    tier: 3,
    parentId: "tier-3",
    canonicity: "canonical",
    description:
      "A multi-auditorium movie theater on the second-class deck. Xi-Yu men clear it hall by hall so Hinrigh can sit down in auditorium #8 beside 'Hisoka' and buy the magician out of the mafia war with a VVIP pass — a deal struck, unknown to anyone, with a disguised Bonolenov.",
    threatHistory: [
      {
        ch: 393,
        value: "tense",
        note: "Xi-Yu members screen the audience while the underboss negotiates.",
      },
    ],
    connectedIds: ["tier-3"],
    introducedCh: 393,
  },
  {
    id: "tier-4-conference-room",
    name: "Kakin Royal Army Conference Room (Tier 4)",
    kind: "restricted",
    tier: 4,
    parentId: "tier-4",
    canonicity: "canonical",
    description:
      "A Royal Army briefing room on the third-class deck — proof the military's footprint runs far below its Tier 1 headquarters. Mizaistom is at work here on departure day, closeted with a group of Kakin officials as the Zodiacs' liaison line into a force already stretched thin by the crime building in the lower tiers.",
    connectedIds: ["tier-4"],
    introducedCh: 359,
  },
  {
    id: "tier-4-central",
    name: "Tier 4 Central Concourse",
    kind: "public-area",
    tier: 4,
    parentId: "tier-4",
    canonicity: "approximate",
    description:
      "The main thoroughfare of the third-class deck: mess halls, stairwells, and crowds thick enough to hide in. A natural hunting ground for anyone tracking — or avoiding — the Phantom Troupe.",
    threatHistory: [
      { ch: 370, value: "tense" },
      {
        ch: 396,
        value: "contested",
        note: "Troupe members and mafia soldiers work the same crowds.",
      },
    ],
    connectedIds: ["tier-4", "tier-5-market"],
    introducedCh: 370,
  },
  {
    id: "tier-5-market",
    name: "Tier 5 Market Quarter",
    kind: "public-area",
    tier: 5,
    parentId: "tier-5",
    canonicity: "approximate",
    description:
      "Improvised stalls, food lines, and gambling in the steerage decks. The Troupe funds itself here within hours of boarding, and the mafia families tax everything that moves.",
    controlHistory: [
      {
        ch: 362,
        value: "cha-r",
        note: "Rackets nominally under family control; enforcement is thin.",
      },
    ],
    threatHistory: [
      { ch: 359, value: "tense" },
      { ch: 380, value: "contested" },
    ],
    connectedIds: ["tier-5", "tier-4-central"],
    introducedCh: 359,
  },
  {
    id: "tier-5-dining-hall",
    name: "Tier 5 Central Dining Hall",
    kind: "public-area",
    tier: 5,
    parentId: "tier-5",
    canonicity: "canonical",
    description:
      "The steerage deck's central mess — the one room all of Tier 5 passes through. The full Phantom Troupe convenes at its tables to pool what the Hisoka hunt has turned up, and Franklin later camps here alone, betting the magician will come to him.",
    threatHistory: [
      {
        ch: 377,
        value: "tense",
        note: "A Cha-R crew pulls guns to move the Troupe off a table; their leader stands them down and talks the Spiders into leaving instead.",
      },
    ],
    connectedIds: ["tier-5"],
    introducedCh: 377,
  },
  {
    id: "hall-37564",
    name: "Hall 37564",
    kind: "public-area",
    tier: 5,
    parentId: "tier-5",
    canonicity: "canonical",
    description:
      "A steerage hall on Tier 5 whose number reads 'minagoroshi' — massacre — in Japanese wordplay. The reader's first sight of the Phantom Troupe aboard: a passenger tells Chrollo he looks like a man about to kill someone and advises him to forget his worldly ties; Chrollo answers that ties are not forgotten, they are severed.",
    connectedIds: ["tier-5"],
    introducedCh: 366,
  },
  {
    id: "cha-r-territory",
    name: "Cha-R Family Territory",
    kind: "mafia-territory",
    tier: 5,
    parentId: "tier-5",
    canonicity: "approximate",
    description:
      "Lower-tier blocks claimed by the Cha-R family. The Troupe's hunt for Hisoka collides with Cha-R sovereignty: the family will not let outsiders search its floors, which is exactly why a fugitive might hide there.",
    controlHistory: [{ ch: 362, value: "cha-r" }],
    threatHistory: [
      { ch: 362, value: "tense" },
      {
        ch: 378,
        value: "contested",
        note: "Standoff with the Phantom Troupe over search rights.",
      },
    ],
    connectedIds: [
      "tier-5",
      "xi-yu-territory",
      "cha-r-office",
      "cha-r-warehouse",
    ],
    introducedCh: 362,
  },
  {
    id: "xi-yu-territory",
    name: "Xi-Yu Family Territory",
    kind: "mafia-territory",
    tier: 4,
    parentId: "tier-4",
    canonicity: "approximate",
    description:
      "Blocks held by the Xi-Yu family under Onior, with Hinrigh running street-level operations. Xi-Yu bears the brunt of the Heil-Ly's expansion and mounts the most organized counter-hunt of the mafia war.",
    controlHistory: [{ ch: 362, value: "xi-yu" }],
    threatHistory: [
      { ch: 362, value: "tense" },
      {
        ch: 378,
        value: "contested",
        note: "Heil-Ly infiltrators active inside Xi-Yu blocks.",
      },
    ],
    connectedIds: [
      "tier-4",
      "tier-5",
      "cha-r-territory",
      "heil-ly-territory",
      "xi-yu-base",
    ],
    introducedCh: 362,
  },
  {
    id: "heil-ly-territory",
    name: "Heil-Ly Family Territory",
    kind: "mafia-territory",
    tier: 3,
    parentId: "tier-3",
    canonicity: "approximate",
    description:
      "The Heil-Ly family's holdings — Tier 3, by the mafia's own one-family-per-tier partition — less a territory than a spreading infection. Under Morena the family abandons conventional racketeering for a cult-like cell network of freshly made Nen users with kill quotas, run not from the tier it nominally rules but from a hideout no blueprint admits exists.",
    controlHistory: [
      {
        ch: 362,
        revealCh: 377,
        value: "heil-ly",
        note: "Family turf under the mafia's one-family-per-tier partition of the lower decks.",
      },
      {
        ch: 377,
        value: "heil-ly",
        note: "Restructured into Morena's contagion cells; membership grows by initiation, not recruitment.",
      },
    ],
    threatHistory: [
      { ch: 362, value: "tense" },
      {
        ch: 377,
        value: "lethal",
        note: "Members level up by killing; anyone is a valid target.",
      },
    ],
    connectedIds: ["tier-3", "xi-yu-territory", "heil-ly-office"],
    introducedCh: 362,
  },
  {
    id: "cha-r-office",
    name: "Cha-R Family Office (Tier 5)",
    kind: "mafia-territory",
    tier: 5,
    parentId: "tier-5",
    canonicity: "canonical",
    description:
      "The Cha-R family's office and base of operations in Tier 5. Ken'i briefs the Phantom Troupe here on the footage of the warehouse intruder and pairs them with Tsudonke's squad; Tajao receives the Spiders at its door to explain the three-family code; and a rear door opens onto a passage leading to a higher tier — the family's private way out of steerage. Nobunaga leaves Luini's bisected corpse on its floor as the Troupe's declaration of war on the Heil-Ly.",
    controlHistory: [
      {
        ch: 380,
        value: "cha-r",
        note: "Family base; the Troupe operates out of it during the joint hunt.",
      },
    ],
    threatHistory: [
      {
        ch: 393,
        value: "tense",
        note: "Luini surfaces inside the office and is executed on the spot by Nobunaga.",
      },
    ],
    connectedIds: ["tier-5", "cha-r-territory", "cha-r-warehouse"],
    introducedCh: 380,
  },
  {
    id: "cha-r-warehouse",
    name: "Cha-R Warehouse (Tier 5)",
    kind: "restricted",
    tier: 5,
    parentId: "tier-5",
    canonicity: "canonical",
    description:
      "The Cha-R storage facility in Tier 5 where the Troupe's smuggled weapons ride out the voyage. Site of the Luini incident: the escorting underling vanishes mid-corridor from inside Nobunaga's En, the warehouse keepers disappear leaving a trail of dried blood, and Luini farms the remaining guards for levels while watching through a widened ceiling opening. Ken'i confronts the Spiders at its dead-end door, and the room where a warehouse guard's body turned up is later confirmed sealed.",
    controlHistory: [{ ch: 378, value: "cha-r" }],
    threatHistory: [
      {
        ch: 378,
        value: "tense",
        note: "The escorting underling vanishes from Nobunaga's En between one corner and the next.",
      },
      {
        ch: 379,
        value: "lethal",
        note: "Luini kills three more warehouse guards to reach level 24; the keepers are gone.",
      },
    ],
    connectedIds: ["tier-5", "cha-r-territory", "cha-r-office"],
    introducedCh: 378,
  },
  {
    id: "heil-ly-office",
    name: "Heil-Ly Family Office (Tier 3)",
    kind: "mafia-territory",
    tier: 3,
    parentId: "tier-3",
    canonicity: "approximate",
    description:
      "The Heil-Ly's official office on Tier 3 — an address the Kakin military is aware of, and therefore worth nothing. Under Morena the family's real operations run out of a hidden hideout no blueprint records; the office is what a mafia family is expected to leave standing where investigators expect to find it.",
    controlHistory: [{ ch: 395, value: "heil-ly" }],
    connectedIds: ["tier-3", "heil-ly-territory"],
    introducedCh: 395,
  },
  {
    id: "xi-yu-base",
    name: "Xi-Yu Family Base (Tier 4)",
    kind: "mafia-territory",
    tier: 4,
    parentId: "tier-4",
    canonicity: "approximate",
    description:
      "The Xi-Yu family's base on their home tier. Hinrigh returns here between sorties in the Heil-Ly manhunt — taking Onior's double order to find Hisoka and kill Morena on the walk back — and Lynch points roughed-up civilians to the Tier 4 hideout when they want compensation. Never shown inside: the family's public address in everything but coordinates.",
    controlHistory: [{ ch: 390, value: "xi-yu" }],
    connectedIds: ["tier-4", "xi-yu-territory"],
    introducedCh: 390,
  },
  {
    id: "onior-residence",
    name: "Onior's Residence (Tier 1)",
    kind: "room",
    tier: 1,
    parentId: "tier-1",
    canonicity: "approximate",
    description:
      "The Xi-Yu boss's luxurious suite, first shown as Onior dines and runs the family by phone; the 'second-track' bosses keep rooms on Tier 1 near the court that tolerates them (confirmed on-page ch. 384). Zhang Lei calls on Onior here to ask what the mafia knows of Nen, and a cross-bridge from inside the residence later becomes the prince's escape hatch to Tier 2.",
    controlHistory: [{ ch: 378, value: "xi-yu" }],
    threatHistory: [
      {
        ch: 410,
        value: "tense",
        note: "Benjamin's soldiers trace Zhang Lei's cross-bridge escape route through the residence.",
      },
    ],
    connectedIds: ["tier-1", "tier-2"],
    introducedCh: 378,
  },
  {
    id: "heil-ly-hideout",
    name: "Heil-Ly Hideout",
    kind: "mafia-territory",
    tier: 2,
    parentId: "tier-2",
    canonicity: "approximate",
    description:
      "The Heil-Ly's true base, wedged into the structural gap between Tiers 2 and 3 near the central gate — infrastructure planned before the Black Whale was even built, with five entrances and, at the card game's count, 21 members. Inside: a living room, a 'processing area' (the shower room) where abductees are killed for levels, a 'disposal area' (the laundry room) where the bodies are stripped and dismembered, a guarded 'door C', and a 'new processing area' for leveling past 50. One door pair warps two ways to Room 3101, and Room 3131 serves as a second jump point. Early reports place it simply 'on Tier 2'; Borksen's yes/no interrogation fixed the true position.",
    controlHistory: [
      {
        ch: 359,
        revealCh: 394,
        value: "heil-ly",
        note: "Family-held for the whole voyage; the space itself was planned into the ship before launch.",
      },
    ],
    threatHistory: [
      {
        ch: 394,
        value: "lethal",
        note: "The processing area doubles as the family's leveling ground; kills are logged like scores and the dead are dismembered in the laundry room.",
      },
    ],
    connectedIds: ["tier-2", "tier-3", "room-3101", "hidden-passage-network"],
    // Ch 384 only reveals an unlocated hideout exists; the interior is first
    // on-page in ch 394.
    introducedCh: 394,
  },
  {
    id: "hidden-passage-network",
    name: "Hidden Passage Network",
    kind: "passage",
    canonicity: "inferred",
    description:
      "Concealed circulation threaded through the ship's fabric: warp-linked doors, the structural spaces Luini's ability moved through, family-controlled doors between the lower tiers, and the waste and sewage processing plant wedged between Tiers 4 and 5 — subcontracted turf under Cha-R and Xi-Yu oversight, loose enough that killers posing as waste contractors could work an assembly line. Its two fixed anchors are charted separately: Room 3101's teleport trap and the Heil-Ly hideout between Tiers 2 and 3.",
    threatHistory: [
      {
        ch: 371,
        value: "contested",
        note: "Impossible movements imply unmapped spaces; ownership unclear.",
      },
      {
        ch: 392,
        value: "contested",
        note: "A wiring crew that worked an off-blueprint room was silenced.",
      },
      {
        ch: 406,
        value: "contested",
        note: "The sewage plant between Tiers 4 and 5 runs on subcontractors — oversight thin enough to hide murder as day labor.",
      },
    ],
    connectedIds: [
      "royal-quarters",
      "tier-2",
      "tier-3",
      "tier-5",
      "heil-ly-hideout",
      "room-3101",
    ],
    introducedCh: 371,
  },
];
