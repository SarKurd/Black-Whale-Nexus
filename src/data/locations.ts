/**
 * Ship locations aboard the Black Whale.
 *
 * Canonicity is set honestly: named rooms and tiers are "canonical",
 * mafia territories are "approximate" (the manga never draws hard borders),
 * and the hidden passage network is "inferred" from scattered evidence.
 */

import type { ShipLocation } from "@/lib/types";

export const locations: ShipLocation[] = [
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
    ],
    connectedIds: [
      "tier-2",
      "royal-quarters",
      "banquet-hall",
      "military-hq",
      "beyond-quarters",
      "burial-chamber",
      "camilla-confinement",
      "grand-hall-1001",
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
    connectedIds: ["tier-1", "tier-3", "ministry-of-justice"],
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
      "Mid-ship cabins and services, including the main medical facilities. The three Kakin mafia families hold overlapping interests here, and it becomes an active front once the Heil-Ly begin expanding.",
    controlHistory: [
      {
        ch: 362,
        value: "cha-r",
        note: "Divided among the three families; boundaries approximate.",
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
    connectedIds: ["tier-2", "tier-4", "tier-3-medical"],
    introducedCh: 362,
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
    threatHistory: [
      { ch: 362, value: "tense" },
      {
        ch: 380,
        value: "contested",
        note: "Mafia war spills into third-class corridors.",
      },
    ],
    connectedIds: ["tier-3", "tier-5", "tier-4-central"],
    introducedCh: 362,
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
        value: "cha-r",
        note: "Lower-tier rackets split among the families; effective control is local and shifting.",
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
    ],
    connectedIds: [
      "tier-4",
      "tier-5-market",
      "cha-r-territory",
      "xi-yu-territory",
      "heil-ly-territory",
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
      "room-1014",
      "marayam-quarters",
      "room-1007",
      "grand-hall-1001",
      "benjamin-quarters",
      "camilla-quarters",
      "zhang-lei-quarters",
      "tserriednich-quarters",
      "halkenburg-quarters",
      "kacho-quarters",
      "fugetsu-quarters",
      "momoze-quarters",
      "marayam-quarters",
      "banquet-hall",
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
    ],
    connectedIds: ["room-1014", "royal-quarters"],
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
    connectedIds: ["royal-quarters", "military-hq"],
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
    controlHistory: [{ ch: 358, value: "tserriednich-camp" }],
    threatHistory: [
      { ch: 373, value: "tense", note: "Theta realizes what she is creating." },
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
    connectedIds: ["royal-quarters", "room-1014", "momoze-quarters"],
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
    connectedIds: ["royal-quarters", "tier-1"],
    introducedCh: 365,
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
    introducedCh: 361,
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
    id: "burial-chamber",
    name: "Princes' Burial Chamber",
    kind: "restricted",
    tier: 1,
    parentId: "tier-1",
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
    connectedIds: ["tier-1"],
    introducedCh: 413,
  },
  {
    id: "camilla-confinement",
    name: "Room 302 (VVIP Confinement)",
    kind: "restricted",
    tier: 1,
    parentId: "tier-1",
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
    ],
    connectedIds: ["tier-1"],
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
    connectedIds: ["royal-quarters", "benjamin-quarters"],
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
      "The Seventh Prince's suite: movie screens, legal-gray drugs, hired Hunters, and a prince far sharper than his stoner image. Shikaku's staged suicide happens at its threshold; on day twelve Kanjidol murders its sleeping guards ahead of martial law while Luzurus coolly orders no resistance and the drugs burned.",
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
    ],
    connectedIds: ["royal-quarters"],
    introducedCh: 358,
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
    name: "Tier 3 Medical Center",
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
    introducedCh: 380,
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
    connectedIds: ["tier-5", "xi-yu-territory", "heil-ly-territory"],
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
    connectedIds: ["tier-4", "cha-r-territory", "heil-ly-territory"],
    introducedCh: 362,
  },
  {
    id: "heil-ly-territory",
    name: "Heil-Ly Family Territory",
    kind: "mafia-territory",
    tier: 5,
    parentId: "tier-5",
    canonicity: "approximate",
    description:
      "The Heil-Ly family's lower-tier holdings — less a territory than a spreading infection. Under Morena the family abandons conventional racketeering for a cult-like cell network of freshly made Nen users with kill quotas.",
    controlHistory: [
      { ch: 362, value: "heil-ly" },
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
    connectedIds: ["tier-5", "cha-r-territory", "xi-yu-territory"],
    introducedCh: 362,
  },
  {
    id: "hidden-passage-network",
    name: "Hidden Passage Network",
    kind: "passage",
    canonicity: "inferred",
    description:
      "Concealed spaces threaded through the ship: the unmapped room behind Room 3101's bathroom wall, warp-linked doors, waste conduits between Tiers 4 and 5 that the Cha-R and Xi-Yu control, and — the largest of all — the Heil-Ly's hideout built into the gap between Tiers 2 and 3, planned before the Black Whale was even launched.",
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
        ch: 409,
        value: "lethal",
        note: "The between-tiers hideout doubles as the Heil-Ly's leveling ground; its 'processing area' holds piles of dead.",
      },
    ],
    connectedIds: ["royal-quarters", "tier-2", "tier-3", "tier-5"],
    introducedCh: 371,
  },
];
