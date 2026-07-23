import type { DeathRecord } from "@/lib/types";

/**
 * Death ledger. Only named registry characters get records; mass casualties
 * among unnamed passengers appear in consequences prose.
 */
export const deaths: DeathRecord[] = [
  {
    id: "death-barrigen",
    victimId: "barrigen",
    suspectedKillerIds: ["loberry"],
    method:
      "Drained mid-class by Silent Majority's four snakes — eleven seconds to empty a body of blood — after the possessed Loberry's outcry pulled every eye exactly where the killer wanted them.",
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
      "Among the five royal guards killed in the suite on the voyage's first night — the same silent method later used on Barrigen in front of the class.",
    locationId: "room-1014",
    chapter: 359,
    revealCh: 360,
    awareCharacterIds: ["kurapika", "bill", "oito", "vergei"],
    investigation:
      "Filed with the other Silent Majority casualties; no in-world resolution.",
    consequences: ["Woble's original guard detail effectively gutted."],
    mysteryIds: ["my-silent-majority-user"],
    confidence: "strong-inference",
    factionId: "woble-camp",
    princeContextId: "prince-woble",
  },
  {
    id: "death-momoze",
    victimId: "momoze",
    suspectedKillerIds: ["slakka"],
    method:
      "Strangled in her quarters while her assigned guard slept. The reader glimpses the act; in-world, the case never closes.",
    locationId: "momoze-quarters",
    chapter: 368,
    witnessIds: [],
    awareCharacterIds: [
      "sevanti",
      "slakka",
      "nipaper",
      "hanzo",
      "biscuit",
      "benjamin",
      "kurapika",
    ],
    investigation:
      "Justice Bureau inquiry opened and stalled; the guards' testimony conflicts and no faction pressed for answers.",
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
    method:
      "Died in the passage space during the twins' escape, covering Fugetsu's crossing. The exact agent of death is only partially shown; the ship's record lists her as missing.",
    locationId: "hidden-passage-network",
    chapter: 382,
    witnessIds: ["fugetsu"],
    awareCharacterIds: ["fugetsu"],
    investigation:
      "None in-world — officially she is unaccounted for; only Fugetsu and the reader know.",
    consequences: [
      "Fugetsu returned alone, psychologically broken.",
      "A Kacho-like presence persists beside her twin — nature unresolved.",
      "The escape route proved the doors work and the space between them kills.",
    ],
    mysteryIds: ["my-fugetsu-door-limits"],
    confidence: "canonical",
    factionId: "kacho-camp",
    princeContextId: "prince-kacho",
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
      "Assassinated in his bed by Yushohi's Stand by Me stinger ball, one day after Rihan's Predator devoured his devotion-smoke beast and left him unguarded. Publicly his absence from the banquet was 'illness'.",
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
      "Body death by TSK-17: Balsamilco carried the nerve-agent vial into the courthouse to erase him, but Halkenburg's arrow swapped their minds first — so the prince, wearing Balsamilco's body, administered the poison to his own flesh and managed the 'stomach flu' cover story himself. His body died in hospital in the early hours of Day 12; his soul did not.",
    locationId: "tier-3-medical",
    chapter: 404,
    witnessIds: ["cheadle"],
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
];
