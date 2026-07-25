import type { DeathRecord } from "@/lib/types";

/**
 * Death ledger. Only named registry characters get records; mass casualties
 * among unnamed passengers appear in consequences prose.
 */
export const deaths: DeathRecord[] = [
  {
    id: "death-sandra",
    victimId: "sandra",
    killerId: "vincent",
    method:
      "Killed the moment she let him into Room 1014 — Vincent left the knife in her chest and claimed she had come at him with it, adding that she carried a vial of poison. 'Self-defense', by a soldier who had invited himself in on Benjamin's orders.",
    locationId: "room-1014",
    chapter: 363,
    witnessIds: ["kurapika", "bill", "oito"],
    awareCharacterIds: ["kurapika", "bill", "oito", "benjamin", "balsamilco"],
    investigation:
      "None beyond the room: Vincent's self-defense story died with him minutes later, and the household had no standing to prosecute a First Prince soldier anyway.",
    consequences: [
      "Opened the Room 1014 standoff that ended in Vincent's suicide.",
      "Oito's staff — already gutted by the first night — lost one of its two remaining maids.",
    ],
    confidence: "canonical",
    factionId: "woble-camp",
    princeContextId: "prince-woble",
  },
  {
    id: "death-vincent",
    victimId: "vincent",
    killerName: "Self-inflicted — poison capsule under interrogation",
    method:
      "Swallowed a poison capsule hidden in a molar after Kurapika and Bill restrained him and Kurapika bluffed that his chain could force a confession.",
    locationId: "room-1014",
    chapter: 364,
    witnessIds: ["kurapika", "bill", "oito"],
    awareCharacterIds: [
      "vincent",
      "kurapika",
      "bill",
      "oito",
      "benjamin",
      "balsamilco",
      "babimyna",
    ],
    investigation:
      "Kurapika delayed reporting the death while Room 1014 stabilized. Benjamin's command had followed the confrontation through Vincent's earpiece and sent Babimyna to replace him.",
    consequences: [
      "Babimyna replaced Vincent as Benjamin's observer inside Room 1014.",
      "Kurapika retained the stolen Air Blow in Stealth Dolphin.",
      "Benjamin also inherited Air Blow through Benjamin Baton after Vincent's death.",
    ],
    confidence: "canonical",
    factionId: "benjamin-camp",
    princeContextId: "prince-woble",
  },
  {
    id: "death-kortopi",
    victimId: "kortopi",
    killerId: "hisoka",
    method:
      "Decapitated in a public restroom hours after Heavens Arena, while Shalnark waited outside on the phone with Chrollo. Hisoka — officially among the arena's dead — walked out carrying the head and tossed it to Shalnark: the opening kill of his declared war on the Troupe.",
    chapter: 357,
    revealCh: 357,
    witnessIds: ["shalnark"],
    awareCharacterIds: ["hisoka", "shalnark", "machi", "chrollo"],
    investigation:
      "None shown; the Troupe needs no inquest — Machi already carried Hisoka's declaration that he would kill them all.",
    consequences: [
      "Gallery Fake lost to the Troupe — and presumably erased from Chrollo's book by the owner-death rule.",
      "The Troupe's copy-based reconnaissance and forgery capability died with him.",
      "First proof Hisoka's threat to Machi was operational within hours.",
    ],
    confidence: "canonical",
    factionId: "phantom-troupe",
  },
  {
    id: "death-shalnark",
    victimId: "shalnark",
    killerId: "hisoka",
    method:
      "Killed moments after catching Kortopi's severed head: a single massive strike as he charged Hisoka. His corpse was staged tied to a park swing, Kortopi's head at his feet, crows picking at both — a message, not a murder scene. 'Two down, ten to go.'",
    chapter: 357,
    revealCh: 357,
    awareCharacterIds: ["hisoka", "machi", "chrollo"],
    investigation:
      "None in-world; the Troupe answered by boarding the Black Whale and hunting Hisoka (chs 371, 377).",
    consequences: [
      "Black Voice lost — Chrollo still held the phone he had borrowed for the duel and never returned.",
      "The Troupe's Hisoka hunt became the standing order of their voyage.",
      "Illumi, hired by Hisoka himself to kill him, joined the Troupe for the hunt (ch 377).",
    ],
    confidence: "canonical",
    factionId: "phantom-troupe",
  },
  {
    id: "death-barrigen",
    victimId: "barrigen",
    suspectedKillerIds: ["loberry"],
    method:
      "Drained mid-class by Silent Majority's four conjured snakes — one snake needs 44 seconds, all four together empty a body of blood in eleven — worked through the possessed Loberry, whom only the user (and Loberry herself) could see the marionette standing beside. Sakata shot the snakes off the corpse.",
    locationId: "room-1014",
    chapter: 370,
    witnessIds: [
      "kurapika",
      "sakata",
      "hashito",
      "furykov",
      "belerainte",
      "loberry",
      "babimyna",
    ],
    awareCharacterIds: [
      "kurapika",
      "bill",
      "oito",
      "sevanti",
      "vergei",
      "cleapatro",
    ],
    investigation:
      "Loberry was detained as the visible suspect while Cleapatro's investigator observed for 72 hours; the class understood she was a puppet, but the operating user was never identified.",
    consequences: [
      "Proved Silent Majority could strike inside a room full of guards.",
      "Sakata pursued a case against Queen Seiko; Cleapatro denied it.",
      "The same method matched the five royal guards killed on night one — clearing Woble's beast of suspicion.",
    ],
    mysteryIds: ["my-silent-majority-user"],
    confidence: "canonical",
    factionId: "marayam-camp",
    princeContextId: "prince-marayam",
  },
  {
    id: "death-woody",
    victimId: "woody",
    suspectedKillerIds: [],
    method:
      "Found in the suite's bathroom on the voyage's first night, every drop of blood drained through multiple holes in his body — the first of five royal guards killed by the same silent method later used on Barrigen in front of the class.",
    locationId: "room-1014",
    chapter: 359,
    revealCh: 359,
    awareCharacterIds: ["kurapika", "bill", "oito"],
    investigation:
      "Filed with the other Silent Majority casualties; no in-world resolution.",
    consequences: ["Woble's original guard detail effectively gutted."],
    mysteryIds: ["my-silent-majority-user"],
    confidence: "strong-inference",
    factionId: "woble-camp",
    princeContextId: "prince-woble",
  },
  {
    id: "death-myuhan",
    victimId: "myuhan",
    suspectedKillerIds: [],
    method:
      "Found exsanguinated in Room 1014's toilet at 10:05 a.m. on the second day of Nen lessons — drained through holes in the body, the same silent method that killed Barrigen in front of the whole class the day before.",
    locationId: "room-1014",
    chapter: 376,
    revealCh: 376,
    awareCharacterIds: ["kurapika", "bill", "oito", "tserriednich", "theta"],
    investigation:
      "Filed with the classroom killings; Loberry was already detained when it happened, underscoring that the visible suspect was only a puppet. The operating user was never identified.",
    consequences: [
      "Proved the Silent Majority user kept operating inside Room 1014 despite the detention.",
      "Tserriednich's camp lost one of its two class representatives; Danjin carried on alone.",
    ],
    mysteryIds: ["my-silent-majority-user"],
    confidence: "canonical",
    factionId: "tserriednich-camp",
    princeContextId: "prince-tserriednich",
  },
  {
    id: "death-momoze",
    victimId: "momoze",
    killerId: "tuffdy",
    method:
      "Suffocated in her quarters on the voyage's first night by one of her own bodyguards — Oito, surveying through Little Eye, watched it happen in real time (ch 368), too late to stop it. Hanzo's clone-work identified the guard Tuffdy, who confessed and was executed by Hanzo's doppelganger the same night (ch 372).",
    locationId: "momoze-quarters",
    chapter: 368,
    witnessIds: ["oito"],
    awareCharacterIds: [
      "tuffdy",
      "sevanti",
      "slakka",
      "nipaper",
      "hanzo",
      "biscuit",
      "benjamin",
      "kurapika",
      "oito",
      "bill",
      "babimyna",
      "vergei",
    ],
    investigation:
      "Six off-duty guards were detained as suspects and Sevanti demanded their execution; because they belonged to higher-ranked queens, the official inquiry went nowhere. Hanzo solved it privately — Tuffdy's slip confessed his guilt (ch 372) — and Kurapika passed the identification to Vergei (ch 374); the official case never closed.",
    consequences: [
      "First royal casualty of the war.",
      "Every household re-audited its guard loyalty.",
      "Sevanti's fortress strategy around Marayam hardened.",
    ],
    mysteryIds: ["my-momoze-assassin"],
    confidence: "canonical",
    factionId: "momoze-camp",
    princeContextId: "prince-momoze",
  },
  {
    id: "death-kacho",
    victimId: "kacho",
    killerName: "The ritual's horde of hands (for fleeing the ship)",
    method:
      "Killed during the banquet-night lifeboat escape (ch 383): as the boat neared open water, a horde of hands closed in — the ritual's answer to a fleeing prince. Kacho pushed Fugetsu back through the Magical Worm door and was shown dead on the drifting lifeboat; the 'Kacho' who walked back through the door was her Guardian Spirit Beast, Without You.",
    locationId: "hidden-passage-network",
    chapter: 383,
    witnessIds: [],
    awareCharacterIds: ["melody", "kaiser"],
    investigation:
      "None in-world — officially Kacho returned alive; only the beast wearing her shape, and later Melody and Kaiser (ch 400), know the truth. Fugetsu herself believes her sister survived.",
    consequences: [
      "Fugetsu returned believing Kacho lives — the beast sustains the fiction.",
      "Without You manifests as Kacho and plans on Fugetsu's behalf.",
      "The escape proved a prince who tries to leave the ship dies — the contest's vows enforce themselves.",
    ],
    mysteryIds: ["my-fugetsu-door-limits"],
    confidence: "canonical",
    factionId: "kacho-camp",
    princeContextId: "prince-kacho",
  },
  {
    id: "death-keeney",
    victimId: "keeney",
    killerName: "Self-inflicted — a planned suicide covering the escape",
    method:
      "During the banquet's hypnotic performance he plugged his ears, walked Kacho and Fugetsu through the entranced hall to the lifeboats, waved them off, and shot himself — dying as the escape's sole 'coercer' so no living accomplice could be traced to the Hunter Association.",
    locationId: "hidden-passage-network",
    chapter: 383,
    witnessIds: [],
    awareCharacterIds: ["melody", "kaiser"],
    investigation:
      "The Justice Bureau retrieved his will the next day (ch 386): it framed the escape as his coercion, clearing Melody and corroborating the twins' account. Three princes moved to issue pardons and request an encore (ch 400); Melody kept his death from the beast wearing Kacho's shape.",
    consequences: [
      "The twins reached the lifeboat — Kacho died to the ritual at sea; Fugetsu returned believing they had both been coerced.",
      "Melody was exonerated and the Hunter Association's hand in the escape stayed invisible.",
    ],
    confidence: "canonical",
    factionId: "kacho-camp",
    princeContextId: "prince-kacho",
  },
  {
    id: "death-wolfe",
    victimId: "wolfe",
    killerId: "camilla",
    method:
      "Shot through the head at the entrance to Benjamin's quarters. Wolfe had his weapon on the approaching Camilla, but Benjamin's standing order not to fire on a prince held his trigger — and she exploited the hesitation. Her follow-up shots at Furykov failed against his Nen.",
    locationId: "benjamin-quarters",
    chapter: 373,
    witnessIds: ["furykov"],
    awareCharacterIds: ["camilla", "benjamin", "balsamilco", "furykov"],
    investigation:
      "Raised at the joint trial (ch 376): Camilla's captain argued self-defense across the whole incident, and the proceedings dissolved into the unwinnable search for Musse's body.",
    consequences: [
      "Proved Camilla would kill straight through Benjamin's no-fire order.",
      "The First and Second Princes both ended up confined under VVIP-area surveillance.",
    ],
    confidence: "canonical",
    factionId: "benjamin-camp",
    princeContextId: "prince-benjamin",
  },
  {
    id: "death-musse",
    victimId: "musse",
    killerId: "camilla",
    method:
      "Shot Camilla dead when she advanced on his gun — and was scooped up and crushed by Cat's Name, the counteractive revival beast his kill triggered. His last act was touching the prince, completing Secret Window's plant.",
    locationId: "camilla-quarters",
    chapter: 373,
    witnessIds: [],
    awareCharacterIds: ["camilla", "benjamin", "balsamilco", "furykov"],
    investigation:
      "Officially Musse is merely 'missing': Camilla's guards incinerated his belongings, her captain claimed self-defense in court, and Cleapatro confined both princes pending his discovery (ch 376) — a search that can never succeed.",
    consequences: [
      "Benjamin inherited Secret Window via the baton pledge and gained a permanent feed on Camilla.",
      "Camilla's revival ability entered Benjamin's files as a data point, fully understood only by ch 413.",
      "Both the First and Second Princes ended up under VVIP-area surveillance.",
    ],
    confidence: "canonical",
    factionId: "benjamin-camp",
    princeContextId: "prince-camilla",
  },
  {
    id: "death-salele",
    victimId: "salele",
    killerId: "yushohi",
    suspectedKillerIds: [],
    method:
      "Assassinated in his bed by Yushohi's Stand by Me stinger ball, days after Rihan's Predator devoured his devotion-smoke beast (ch 381, Day 5) and left him unguarded; found not breathing on Day 8, hours before the banquet. Publicly his absence was 'illness'.",
    locationId: "royal-quarters",
    chapter: 382,
    witnessIds: ["yushohi"],
    awareCharacterIds: ["yushohi", "benjamin", "balsamilco", "rihan"],
    investigation:
      "None in-world beyond the cover story; Tubeppa independently deduced the death from his banquet no-show (ch 388), and the burial chamber's lit Flame of Life quietly confirms it (ch 413).",
    consequences: [
      "Second prince eliminated by Benjamin's soldier program.",
      "Tubeppa concluded she was next and accelerated her Kurapika alliance.",
      "Proved the beast-then-prince two-step (Predator + assassin) works.",
    ],
    confidence: "canonical",
    factionId: "benjamin-camp",
    princeContextId: "prince-salele",
  },
  {
    id: "death-sumidori",
    victimId: "sumidori",
    killerId: "halkenburg",
    suspectedKillerIds: [],
    method:
      "Sumidori's soul — awake inside Shikaku's body since the arrow swapped them — walked to Luzurus's door, shouted 'Long live First Prince Benjamin!', and shot the body in the head: Halkenburg's deliberate experiment to map what body-death does to swapped souls. The soul inside died; Shikaku's own mind sleeps on in Sumidori's abandoned body.",
    locationId: "room-1007",
    chapter: 386,
    revealCh: 404,
    witnessIds: ["basho"],
    awareCharacterIds: [
      "halkenburg",
      "sumidori",
      "benjamin",
      "balsamilco",
      "basho",
      "luzurus",
    ],
    investigation:
      "Benjamin's camp spent chapters 388–389 reverse-engineering the suicide; Benjamin only assembled the full mind-swap explanation in ch 413.",
    consequences: [
      "Confirmed for Halkenburg that only one swapped mind wakes at a time and his side holds priority.",
      "Benjamin's palm star registered Shikaku's body as dead — the baton absorbed Culdcept.",
      "Benjamin's camp re-rated Halkenburg as the single biggest threat.",
    ],
    mysteryIds: ["my-halkenburg-arrow-mechanics"],
    confidence: "canonical",
    factionId: "halkenburg-camp",
    princeContextId: "prince-halkenburg",
  },
  // Vict deliberately carries NO death record: the arrow displaced his mind,
  // but his body lives on as a possessed vessel (ch 389/403). His status
  // history ("possessed") and my-halkenburg-arrow-mechanics carry the case.
  {
    id: "death-halkenburg",
    victimId: "halkenburg",
    killerId: "balsamilco",
    suspectedKillerIds: [],
    method:
      "Body death by TSK-17: Balsamilco carried the bioweapon vial into the courthouse to erase him, but Halkenburg's arrow swapped their minds first (ch 403) — so the prince, wearing Balsamilco's body, administered the poison to his own flesh and managed the 'sudden illness' cover story himself. Doctors failed to resuscitate the body in the early hours of Day 12; his soul did not die with it.",
    locationId: "tier-3-medical",
    chapter: 404,
    witnessIds: [],
    awareCharacterIds: [
      "halkenburg",
      "benjamin",
      "nasubi",
      "nugui",
      "unma",
      "kurapika",
    ],
    investigation:
      "Publicly announced as death by sudden illness with a state funeral; Kurapika privately concluded assassination (ch 411); the burial chamber told the real story — his Flame of Life never lit, and Nasubi declared him 'still fighting' (ch 413).",
    consequences: [
      "Halkenburg operates on inside Balsamilco's body — succession eligibility intact while his soul persists.",
      "Benjamin, believing the mission his own, was maneuvered into position for the ch 413 arrow.",
      "The funeral procession restructured ship security on three tiers.",
    ],
    mysteryIds: ["my-halkenburg-arrow-mechanics"],
    confidence: "canonical",
    factionId: "halkenburg-camp",
    princeContextId: "prince-halkenburg",
  },
  {
    id: "death-lynch",
    victimId: "lynch",
    killerId: "bonolenov",
    suspectedKillerIds: [],
    method:
      "Neck expertly twisted and broken after her truth-punch exposed the 'Hisoka' she'd found as a fake. Bonolenov, protecting Chrollo's decoy scheme, killed her, wore her shape to dismiss Zakuro, and left the body for a patrol to find.",
    locationId: "tier-3",
    chapter: 405,
    revealCh: 405,
    awareCharacterIds: ["bonolenov", "chrollo", "hinrigh", "zakuro"],
    investigation:
      "Soldiers wrote it off as a Heil-Ly hit; Hinrigh and Zakuro reasoned their way to 'someone impersonating Hisoka killed her' (ch 406) and swore revenge without naming the Troupe.",
    consequences: [
      "The Xi-Yu lost their lie-detector.",
      "Hinrigh's revenge vow points the mafia toward whoever wore Hisoka's face — a fuse under the Troupe alliance.",
    ],
    confidence: "canonical",
    factionId: "phantom-troupe",
  },
  {
    id: "death-padaille",
    victimId: "padaille",
    killerId: "hinrigh",
    method:
      "Cut down on Tier 3 with his own conjured weapon. His three-man ambush on the Xi-Yu underboss collapsed when Hinrigh's aura-reinforced handcuff-pigeons kept re-shackling him; each escape — drill, then axe — only handed Hinrigh the finishing tool, while Tevelares and Quorolle abandoned him to his fate.",
    locationId: "tier-3",
    chapter: 391,
    revealCh: 391,
    witnessIds: ["hinrigh"],
    awareCharacterIds: ["hinrigh", "morena"],
    investigation:
      "None — a mafia clash in a shadow war. His corpse marked the spot where the Heil-Ly's level-grown soldiers first met a professional and lost.",
    consequences: [
      "First Heil-Ly combatant lost to the Xi-Yu counterattack.",
      "Showed that Contagion's stolen levels don't buy technique — reinforced conjured restraints beat a level-29 head-on.",
    ],
    confidence: "canonical",
    factionId: "heil-ly",
  },
  {
    id: "death-luini",
    victimId: "luini",
    killerId: "nobunaga",
    suspectedKillerIds: [],
    method:
      "Katana through the head mid-monologue, then decapitated and bisected. Luini had walked into the Cha-R office to pitch the three Troupe members on an alliance — destroy the mafia families and the royal line, seize the Black Whale, sail back and end the old world — and Nobunaga answered the world-ending sales pitch by killing him on the spot.",
    locationId: "cha-r-territory",
    chapter: 393,
    revealCh: 393,
    witnessIds: ["nobunaga", "feitan", "phinks"],
    awareCharacterIds: ["nobunaga", "feitan", "phinks", "morena"],
    investigation:
      "No inquest — the Troupe displayed the corpse to the Cha-R as proof they had found the warehouse hitman, and declared they would destroy the Heil-Ly. Morena's people found the lower half against a wall and moved to recreate his ability.",
    consequences: [
      "Heil-Ly lost the infiltrator whose 'door' let them hunt prey from the hideout.",
      "The Phantom Troupe turned its attention to hunting Morena and the Heil-Ly.",
      "Morena's cell began engineering a replacement Emitter to rebuild the trap.",
    ],
    mysteryIds: ["my-morena-endgame"],
    confidence: "canonical",
    factionId: "heil-ly",
  },
];
