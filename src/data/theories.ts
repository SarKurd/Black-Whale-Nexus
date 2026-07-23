import type { Theory } from "@/lib/types";

/** The hypothesis room. Nothing here is canon; every card says so. */
export const theories: Theory[] = [
  {
    id: "th-hisoka-in-cha-r",
    claim: "Hisoka is hiding disguised inside the Cha-R family",
    summary:
      "The one territory that keeps returning clean sweeps is Cha-R's. A shapeshifting showman with Texture Surprise could wear a made man's face indefinitely — and the family's own boss would be the last to know.",
    statusHistory: [
      { ch: 380, value: "unresolved" },
      {
        ch: 390,
        value: "strengthened",
        note: "Repeated negative results in Cha-R territory read increasingly like a signature.",
      },
      {
        ch: 405,
        value: "weakened",
        note: "The reader sees Hisoka gambling openly in the Tier 1 VIP casino — not wearing a Cha-R soldier's face on Tier 5. Whether a mafia channel got him upstairs remains open, so the theory survives in altered form.",
      },
    ],
    supporting: [
      {
        chapter: 390,
        note: "Every other tier has produced traces, rumors, false positives — Cha-R's ground produces nothing.",
        confidence: "weak-inference",
      },
      {
        chapter: 0,
        note: "Texture Surprise makes long-term impersonation trivially sustainable.",
        confidence: "canonical",
      },
      {
        chapter: 405,
        note: "Chrollo's own guess: Hisoka reached Tier 1 as a VIP through a prince's invitation — sponsorship of some kind is still unexplained.",
        confidence: "strong-inference",
      },
    ],
    contradicting: [
      {
        chapter: 390,
        note: "No on-page hint has placed him there; the cleanliness may just be Cha-R's competence.",
        confidence: "weak-inference",
      },
      {
        chapter: 405,
        note: "He is physically on Tier 1, undisguised, at the VIP casino — hiding inside Cha-R's lower-tier ranks is off the table.",
        confidence: "canonical",
      },
    ],
    relatedCharacterIds: ["hisoka", "brocco", "ken-i", "chrollo"],
    chapters: [380, 390, 405],
    confidence: "theory",
    lastUpdatedCh: 405,
  },
  {
    id: "th-nasubi-dark-continent-rite",
    claim:
      "The succession war is a rite serving Kakin's Dark Continent contract",
    summary:
      "Nasubi's serenity while his children die suggests the war is not politics but liturgy — a forging process the voyage's true patrons require of Kakin's next ruler.",
    statusHistory: [
      { ch: 365, value: "unresolved" },
      {
        ch: 411,
        value: "strengthened",
        note: "Kurapika's four-stage reading confirms the war is liturgy — a national ritual with a vow, a bloodline offering, a gathering of the fallen, and a power payout.",
      },
      {
        ch: 413,
        value: "strengthened",
        note: "The burial chamber makes it architectural: dead princes interred beneath the king's quarters, their Flames of Life tracked as ritual instruments.",
      },
    ],
    supporting: [
      {
        chapter: 359,
        note: "The rite's timing is bound to the voyage itself, not to the king's health or court politics.",
        confidence: "weak-inference",
      },
      {
        chapter: 365,
        note: "Nasubi shows no grief and no favoritism — consistent with an officiant, not a father.",
        confidence: "weak-inference",
      },
      {
        chapter: 411,
        note: "Stage three is literally 'ceremonial gathering of the fallen to create a sacred energy convergence' — the deaths are inputs, not accidents.",
        confidence: "strong-inference",
      },
      {
        chapter: 413,
        note: "Nasubi presides over the hidden burial chamber personally, reading each child's soul-state like an instrument panel.",
        confidence: "canonical",
      },
    ],
    contradicting: [
      {
        chapter: 411,
        note: "The stated payout is Kakin's own prosperity and governance — a Dark Continent patron demanding it remains unproven; the ritual may be entirely domestic.",
        confidence: "weak-inference",
      },
    ],
    relatedCharacterIds: ["nasubi", "beyond", "kurapika"],
    chapters: [359, 365, 411, 413],
    confidence: "theory",
    lastUpdatedCh: 413,
  },
  {
    id: "th-fugetsu-door-to-continent",
    claim: "Fugetsu's doors will matter for reaching the Dark Continent",
    summary:
      "An ability that annihilates distance, aboard a voyage defined by an unreachable destination, held by a prince nobody is watching — narrative economics say the doors open on something bigger than corridors.",
    statusHistory: [
      { ch: 370, value: "unresolved" },
      {
        ch: 402,
        value: "weakened",
        note: "A door 'outside the ship' failed outright — the lifeboat was the reachable limit — and the apparent power growth turned out to be an enemy trap draining her.",
      },
    ],
    supporting: [
      {
        chapter: 370,
        note: "The doors are the arc's only unrestricted movement; their strategic ceiling is unexplored.",
        confidence: "weak-inference",
      },
    ],
    contradicting: [
      {
        chapter: 382,
        note: "The between-space kills; scaling the ability outward may be exactly what it punishes.",
        confidence: "weak-inference",
      },
      {
        chapter: 402,
        note: "The ability refused a destination outside the ship, and its 'evolution' was a parasitic mark, not growth.",
        confidence: "strong-inference",
      },
    ],
    relatedCharacterIds: ["fugetsu", "kacho"],
    chapters: [370, 382, 398, 402],
    confidence: "theory",
    lastUpdatedCh: 411,
  },
  {
    id: "th-tserriednich-time-beast",
    claim: "Tserriednich's beast is the engine of his time-perception ability",
    summary:
      "The prodigy's future-glimpse emerged only after his beast manifested at scale. The many-faced idol may be lending him its eyes — meaning his ceiling is the beast's, not his own.",
    statusHistory: [
      { ch: 392, value: "unresolved" },
      {
        ch: 402,
        value: "strengthened",
        note: "Salkov's instructor-eye analysis converges on the same model: something activates during Tserriednich's Zetsu, and the beast is the likeliest reservoir.",
      },
    ],
    supporting: [
      {
        chapter: 392,
        note: "Ability emergence coincided with the beast's active manifestation.",
        confidence: "weak-inference",
      },
      {
        chapter: 402,
        note: "Salkov theorizes the beast stores aura normally and fires when Zetsu cuts the prince's own flow — the only model that fits Theta's testimony.",
        confidence: "strong-inference",
      },
    ],
    contradicting: [
      {
        chapter: 375,
        note: "His raw aptitude alone stunned trained instructors before any beast involvement was visible.",
        confidence: "strong-inference",
      },
      {
        chapter: 404,
        note: "His Zetsu drills and the condensing aura ball look like personal skill compounding — the prodigy may simply be outgrowing the beast question.",
        confidence: "weak-inference",
      },
    ],
    relatedCharacterIds: ["tserriednich", "theta", "salkov"],
    chapters: [392, 402, 404],
    confidence: "theory",
    lastUpdatedCh: 404,
  },
  {
    id: "th-halkenburg-body-swap",
    claim: "Halkenburg's consciousness now inhabits a guard's body",
    summary:
      "If the arrow's price is what the aftermath implies, the man walking around as 'Halkenburg' may be a passenger in borrowed flesh — with everything that implies for the seal-marked guards still alive.",
    statusHistory: [
      { ch: 386, value: "unresolved" },
      {
        ch: 390,
        value: "strengthened",
        note: "Post-incident behavior patterns fit the transfer model.",
      },
      {
        ch: 404,
        value: "confirmed",
        note: "Halkenburg narrates it himself: the ability is a forced mind swap, and his consciousness currently occupies Balsamilco's body while his own body dies on a hospital bed.",
      },
    ],
    supporting: [
      {
        chapter: 386,
        note: "The aftermath's staging is most economically explained by transfer.",
        confidence: "strong-inference",
      },
      {
        chapter: 404,
        note: "Confirmed from the inside: Halkenburg-in-Balsamilco plans his own body's death and his post-mortem operating window.",
        confidence: "canonical",
      },
      {
        chapter: 413,
        note: "Nasubi's Flame of Life reading and Benjamin's deduction independently corroborate: the body died, the soul is still in play.",
        confidence: "canonical",
      },
    ],
    contradicting: [
      {
        chapter: 386,
        note: "(Historical) The scene admitted a reading where the arrow's effect was purely external — closed by the ch 404 confession.",
        confidence: "weak-inference",
      },
    ],
    relatedCharacterIds: ["halkenburg", "ladiolus", "sumidori", "balsamilco"],
    chapters: [385, 386, 390, 403, 404, 413],
    confidence: "canonical",
    lastUpdatedCh: 413,
  },
  {
    id: "th-morena-royal-blood",
    claim: "Morena's kinship claim to the royal line is literally true",
    summary:
      "Her grievance reads as personal, not political. If she is an unacknowledged Hui Guo Rou, the succession war has a fifteenth participant playing by no rite at all.",
    statusHistory: [
      { ch: 386, value: "unresolved" },
      {
        ch: 408,
        value: "disproven",
        note: "By her own vow-bound account she is not royalty at all: a Carnival Orphan who took the dead royal Morena Prudo's identity. The blood in her grievance is the royals' crime, not their lineage.",
      },
    ],
    supporting: [
      {
        chapter: 386,
        note: "Her stated hatred targets the family specifically, with the texture of biography.",
        confidence: "weak-inference",
      },
      {
        chapter: 408,
        note: "Half-right in the cruelest way: she was fathered during a Carne Levare 'feast' — royal blood as violation, not as claim.",
        confidence: "strong-inference",
      },
    ],
    contradicting: [
      {
        chapter: 408,
        note: "'The real Morena is in a grave marked for the current Morena' — the succession-rights kinship reading is dead.",
        confidence: "canonical",
      },
    ],
    relatedCharacterIds: ["morena", "nasubi"],
    chapters: [386, 405, 408],
    confidence: "theory",
    lastUpdatedCh: 408,
  },
  {
    id: "th-silent-majority-benefactor",
    claim: "Silent Majority's employer sits among the upper princes",
    summary:
      "The ability needed passage knowledge, funding, and a reason to hit the weakest camp first. That triangulates to a well-resourced camp testing its tools on a low-risk target before the real war.",
    statusHistory: [
      { ch: 362, value: "unresolved" },
      {
        ch: 371,
        value: "weakened",
        note: "Attacks stopped without any camp visibly cashing in the capability.",
      },
      {
        ch: 411,
        value: "unresolved",
        note: "The second class round reopens the file adjacent threads: a masked girl among the class murders and a 'snake charmer' hitting Tserriednich's guards — if either is the same asset, the employer question is live again.",
      },
    ],
    supporting: [
      {
        chapter: 361,
        note: "Passage-dependent attack routes imply insider knowledge of the royal deck.",
        confidence: "strong-inference",
      },
    ],
    contradicting: [
      {
        chapter: 371,
        note: "A rational camp would have redeployed the weapon; silence suggests a non-camp actor or a burned asset.",
        confidence: "weak-inference",
      },
    ],
    relatedCharacterIds: ["kurapika", "benjamin", "tserriednich"],
    chapters: [360, 362, 371],
    confidence: "theory",
    lastUpdatedCh: 411,
  },
  {
    id: "th-kacho-presence-is-beast",
    claim: "The Kacho beside Fugetsu is Kacho's beast completing its duty",
    summary:
      "Beasts die with their prince — usually. A post-mortem chorus-puppet wearing Kacho's face to keep Fugetsu functional would be the rite's cruelest mercy yet.",
    statusHistory: [
      { ch: 388, value: "unresolved" },
      {
        ch: 400,
        value: "confirmed",
        note: "'Kacho' reasons out her own nature on-page: a guardian spirit wearing Kacho's face and memories, visible to Fugetsu, sustained partly by Fugetsu's aura.",
      },
    ],
    supporting: [
      {
        chapter: 388,
        note: "The presence behaves protectively and only Fugetsu perceives it fully.",
        confidence: "weak-inference",
      },
      {
        chapter: 382,
        note: "Kacho's beast was a puppet chorus — mimicry is its native mode.",
        confidence: "strong-inference",
      },
      {
        chapter: 400,
        note: "The beast self-identifies: 'resurrected as a guardian spirit to protect Fugetsu' — and worries about the aura burden on her sister.",
        confidence: "canonical",
      },
      {
        chapter: 404,
        note: "Kneeling by the sleeping Fugetsu, the beast is shown beginning to fade — a post-mortem construct on a budget.",
        confidence: "canonical",
      },
    ],
    contradicting: [
      {
        chapter: 368,
        note: "(Historical) Momoze's beast ceased at her death — Kacho's persistence broke that precedent rather than the theory.",
        confidence: "weak-inference",
      },
    ],
    relatedCharacterIds: ["kacho", "fugetsu", "melody"],
    chapters: [382, 388, 400, 404, 411],
    confidence: "canonical",
    lastUpdatedCh: 411,
  },
  {
    id: "th-benjamin-camilla-trap",
    claim: "Benjamin's camp will trigger Camilla's revival ability blind",
    summary:
      "The camp most likely to execute a detained rival is the one camp that doesn't know her death is a loaded trap. The interrogators who learned her secret have every incentive to keep it from him.",
    statusHistory: [
      { ch: 404, value: "unresolved" },
      {
        ch: 413,
        value: "disproven",
        note: "Benjamin is not blind: Secret Window's leveled-up replay of Musse's final sight tells him Camilla is a counteractive-type. He reserves her for himself with a vial of TSK-17 in his shoe — a plan built around the trap, not into it.",
      },
    ],
    supporting: [
      {
        chapter: 404,
        note: "(Historical) Knowledge of the revival mechanism seemed compartmentalized outside Benjamin's network.",
        confidence: "weak-inference",
      },
    ],
    contradicting: [
      {
        chapter: 413,
        note: "Through Secret Window, Benjamin knows Camilla is a counteractive-type Nen user — the informational blindness the theory required is gone.",
        confidence: "canonical",
      },
      {
        chapter: 413,
        note: "His counter is bloodless by design: poison in his shoe rather than an attack that would feed Cat's Name a killer's life.",
        confidence: "strong-inference",
      },
    ],
    relatedCharacterIds: ["benjamin", "camilla", "balsamilco", "furykov"],
    chapters: [404, 413],
    confidence: "theory",
    lastUpdatedCh: 413,
  },
  {
    id: "th-benjamin-beast-merge-backfires",
    claim:
      "Benjamin's plan to merge with his Guardian Spirit Beast will fail — or transform him into something no longer eligible to win",
    summary:
      "A dying man betting everything on apotheosis: Benjamin intends to fuse Benjamin Baton with his beast and 'watch over Kakin as a God'. Nothing in the contest's visible rulebook covers a prince becoming his own beast — and the rite has punished every attempt to game it.",
    statusHistory: [{ ch: 413, value: "unresolved" }],
    supporting: [
      {
        chapter: 413,
        note: "The merge is his stated endgame, conceived under a death sentence measured in hours — desperation, not design.",
        confidence: "strong-inference",
      },
      {
        chapter: 413,
        note: "Furykov's terror that his curse could erase the beast's ability implies the merge has a single point of failure others can attack.",
        confidence: "strong-inference",
      },
      {
        chapter: 411,
        note: "Kurapika's ritual reading says the system maximizes a survivor through vows and limitations — shortcuts around 'surviving' are exactly what limitations punish.",
        confidence: "weak-inference",
      },
    ],
    contradicting: [
      {
        chapter: 413,
        note: "Nothing on-page has yet failed for him: the beast screeched spirits off Fugetsu on command, and Benjamin Baton has absorbed every dead soldier's ability as designed.",
        confidence: "weak-inference",
      },
      {
        chapter: 413,
        note: "Nasubi's own framing — power enough to 'sustain a Guardian Spirit Beast befitting a king' — suggests a beast-merged ruler may be the ritual's intended output, not a violation.",
        confidence: "weak-inference",
      },
    ],
    relatedCharacterIds: ["benjamin", "furykov", "unma", "halkenburg"],
    chapters: [411, 413],
    confidence: "theory",
    lastUpdatedCh: 413,
  },
  {
    id: "th-woble-is-curse-target",
    claim: "The real Woble, wherever she is, is a target of Beyond's curse",
    summary:
      "The camp's own working nightmare, promoted to planning assumption: if the curse keys on the Seed Urn Ceremony rather than contest participation, the daughter who performed the rite carries the mark ashore — beyond every defense Kurapika has built.",
    statusHistory: [{ ch: 414, value: "unresolved" }],
    supporting: [
      {
        chapter: 414,
        note: "Oito herself judges the Seed-Urn trigger likely: nobody was ever meant to do the ceremony and skip the contest.",
        confidence: "strong-inference",
      },
      {
        chapter: 414,
        note: "Kurapika's unexplained Nen surge near the infant fits a late, improvised curse activation aboard.",
        confidence: "weak-inference",
      },
      {
        chapter: 401,
        note: "Ten strong sacrifices against fourteen princes means the target map has slack — low-rank princes are not obviously exempt.",
        confidence: "weak-inference",
      },
    ],
    contradicting: [
      {
        chapter: 414,
        note: "If the trigger is full contest participation, Woble was never enrolled and is clean — the reading the camp is praying for.",
        confidence: "weak-inference",
      },
      {
        chapter: 401,
        note: "Longhi's own theory aims the curses at succession outcomes; a swapped-out infant with no throne odds is a poor use of a scarce sacrifice.",
        confidence: "weak-inference",
      },
    ],
    relatedCharacterIds: ["woble", "oito", "beyond", "kurapika", "bill"],
    chapters: [401, 412, 414],
    confidence: "theory",
    lastUpdatedCh: 414,
  },
];
