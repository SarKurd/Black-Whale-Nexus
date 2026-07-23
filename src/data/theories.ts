import type { Theory } from "@/lib/types";

/** The hypothesis room. Nothing here is canon; every card says so. */
export const theories: Theory[] = [
  {
    id: "th-hisoka-in-cha-r",
    claim: "Hisoka is hiding disguised inside the Cha-R family",
    summary:
      "The one territory that keeps returning clean sweeps is Cha-R's. A shapeshifting showman with Texture Surprise could wear a made man's face indefinitely — and the family's own boss would be the last to know.",
    statusHistory: [
      {
        ch: 377,
        value: "unresolved",
        note: "The Troupe's sweep of Cha-R-controlled Tier 5 turns up nothing.",
      },
      {
        ch: 390,
        value: "strengthened",
        note: "The manhunt refocuses on Tiers 3 and 4 while Cha-R's home tier stays conspicuously quiet.",
      },
      {
        ch: 405,
        value: "weakened",
        note: "The reader sees Hisoka gambling openly in the Tier 1 VIP casino — not wearing a Cha-R soldier's face on Tier 5. Whether a mafia channel got him upstairs remains open, so the theory survives in altered form.",
      },
    ],
    supporting: [
      {
        chapter: 377,
        note: "The Troupe searched all of Tier 5 — Cha-R's home turf — for anyone over 190 cm and found nothing.",
        confidence: "canonical",
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
    chapters: [377, 390, 405],
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
      {
        ch: 371,
        value: "unresolved",
        note: "Nasubi calls his murdered daughter 'a foundation to the Great Kakin Tree' — an officiant's vocabulary, not a mourner's.",
      },
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
        chapter: 349,
        note: "The binding is written into the rules: only heirs who board the Black Whale and attend the departure ceremony may participate. The rite cannot happen without the voyage — by design.",
        confidence: "canonical",
      },
      {
        chapter: 342,
        note: "Kakin's V6 accession and the promise of a million ships frame the voyage as the founding act of a new era — the kind of undertaking a 'forged' god-king would exist to rule.",
        confidence: "weak-inference",
      },
      {
        chapter: 359,
        note: "The rite's timing is bound to the voyage itself, not to the king's health or court politics.",
        confidence: "weak-inference",
      },
      {
        chapter: 371,
        note: "Beside Momoze's corpse, surrounded by fourteen capsules, Nasubi shows no grief — his daughter, he says, 'still lives' in a brilliant lifestyle.",
        confidence: "canonical",
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
    chapters: [342, 349, 359, 371, 411, 413],
    confidence: "theory",
    lastUpdatedCh: 413,
  },
  {
    id: "th-fugetsu-door-to-continent",
    claim: "Fugetsu's doors will matter for reaching the Dark Continent",
    summary:
      "An ability that annihilates distance, aboard a voyage defined by an unreachable destination, held by a prince nobody is watching — narrative economics say the doors open on something bigger than corridors.",
    statusHistory: [
      { ch: 374, value: "unresolved" },
      {
        ch: 402,
        value: "weakened",
        note: "A door 'outside the ship' failed outright — the lifeboat was the reachable limit — and the apparent power growth turned out to be an enemy trap draining her.",
      },
    ],
    supporting: [
      {
        chapter: 374,
        note: "The doors are the arc's only unrestricted movement; their strategic ceiling is unexplored.",
        confidence: "weak-inference",
      },
    ],
    contradicting: [
      {
        chapter: 383,
        note: "Leaving the ship triggers lethal enforcement — a horde of hands took Kacho at the lifeboat. Scaling the doors outward runs straight into the rite's no-escape vow.",
        confidence: "strong-inference",
      },
      {
        chapter: 402,
        note: "The ability refused a destination outside the ship, and its 'evolution' was a parasitic mark, not growth.",
        confidence: "strong-inference",
      },
    ],
    relatedCharacterIds: ["fugetsu", "kacho"],
    chapters: [374, 383, 402],
    confidence: "theory",
    lastUpdatedCh: 411,
  },
  {
    id: "th-tserriednich-time-beast",
    claim: "Tserriednich's beast is the engine of his time-perception ability",
    summary:
      "The prodigy's future-glimpse emerged only after his beast manifested at scale. The many-faced idol may be lending him its eyes — meaning his ceiling is the beast's, not his own.",
    statusHistory: [
      {
        ch: 387,
        value: "unresolved",
        note: "The ten-second future vision runs only while Zetsu seals his aura — exactly when the beast fades from view.",
      },
      {
        ch: 402,
        value: "strengthened",
        note: "Salkov's instructor-eye analysis converges on the same model: something activates during Tserriednich's Zetsu, and the beast is the likeliest reservoir.",
      },
    ],
    supporting: [
      {
        chapter: 387,
        note: "The future-sight surfaced only under Zetsu, with the beast slowly disappearing as he sealed his aura — timing that ties the vision to something other than his own flow.",
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
        chapter: 384,
        note: "Theta watched him conjure a second Specialist beast — an 'alter ego' — by instinct alone; the prodigy manufactures monsters without the Seed Urn's help.",
        confidence: "strong-inference",
      },
      {
        chapter: 404,
        note: "His Zetsu drills and the condensing aura ball look like personal skill compounding — the prodigy may simply be outgrowing the beast question.",
        confidence: "weak-inference",
      },
    ],
    relatedCharacterIds: ["tserriednich", "theta", "salkov"],
    chapters: [384, 387, 402, 404],
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
        ch: 389,
        value: "strengthened",
        note: "Vict's garbled radio scream — 'a bow', 'invincible' — and Benjamin's star-count (Shikaku dead, Vict alive) fit the transfer-and-cost model.",
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
    chapters: [382, 386, 389, 403, 404, 413],
    confidence: "canonical",
    lastUpdatedCh: 413,
  },
  {
    id: "th-morena-royal-blood",
    claim: "Morena's kinship claim to the royal line is literally true",
    summary:
      "Her grievance reads as personal, not political. If she is an unacknowledged Hui Guo Rou, the succession war has a fifteenth participant playing by no rite at all.",
    statusHistory: [
      {
        ch: 378,
        value: "unresolved",
        note: "The official record at her debut: Nasubi's scarred illegitimate daughter, a second-track faker barred from succession.",
      },
      {
        ch: 408,
        value: "disproven",
        note: "By her own vow-bound account she is not royalty at all: a Carnival Orphan who took the dead royal Morena Prudo's identity. The blood in her grievance is the royals' crime, not their lineage.",
      },
    ],
    supporting: [
      {
        chapter: 378,
        note: "Her facial scars and boss title matched the record: illegitimate royal children are scarred at birth, and she is presented as Nasubi's illegitimate daughter.",
        confidence: "strong-inference",
      },
      {
        chapter: 384,
        note: "All three mafia bosses are 'Second-track Fakers' — illegitimate heirs compensated to stay in the shadows — a system her title placed her inside.",
        confidence: "canonical",
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
    chapters: [378, 384, 405, 408],
    confidence: "theory",
    lastUpdatedCh: 408,
  },
  {
    id: "th-silent-majority-benefactor",
    claim: "Silent Majority's employer sits among the upper princes",
    summary:
      "The ability needed passage knowledge, funding, and a reason to hit the weakest camp first. That triangulates to a well-resourced camp testing its tools on a low-risk target before the real war.",
    statusHistory: [
      { ch: 359, value: "unresolved" },
      {
        ch: 371,
        value: "weakened",
        note: "Attacks stopped without any camp visibly cashing in the capability.",
      },
      {
        ch: 411,
        value: "unresolved",
        note: "The second class round reopens adjacent threads: a masked girl among the class murders and a 'snake charmer' hitting Tserriednich's guards — if either is the same asset, the employer question is live again.",
      },
    ],
    supporting: [
      {
        chapter: 359,
        note: "The day-one hit killed five guards inside the royal quarters without a witness — access and timing that imply inside knowledge of Room 1014.",
        confidence: "strong-inference",
      },
      {
        chapter: 369,
        note: "The user was physically in the room when Silent Majority activated — one of the vetted attendees or staff — which narrows the employer pool to camps with a body inside.",
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
    chapters: [359, 369, 371, 411],
    confidence: "theory",
    lastUpdatedCh: 411,
  },
  {
    id: "th-kacho-presence-is-beast",
    claim: "The Kacho beside Fugetsu is Kacho's beast completing its duty",
    summary:
      "Beasts die with their prince — usually. A post-mortem chorus-puppet wearing Kacho's face to keep Fugetsu functional would be the rite's cruelest mercy yet.",
    statusHistory: [
      {
        ch: 383,
        value: "strengthened",
        note: "Without You's rules — the formless beast takes a dead twin's form to guard the survivor — are revealed in the same beat that shows Kacho dead on the lifeboat. The 'Kacho' who walked back through the door all but names herself.",
      },
      {
        ch: 400,
        value: "confirmed",
        note: "'Kacho' reasons out her own nature on-page: a guardian spirit wearing Kacho's face and memories, visible to Fugetsu, sustained partly by Fugetsu's aura.",
      },
    ],
    supporting: [
      {
        chapter: 383,
        note: "Without You revealed: Kacho's formless beast takes the form of a dead twin, protecting the living sister and staying by her side until death — as Kacho's body drifts out to sea.",
        confidence: "canonical",
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
        note: "(Historical) Momoze's beast was never seen again after her death — the precedent said beasts end with their prince, which argued the returned 'Kacho' had to be something else.",
        confidence: "weak-inference",
      },
    ],
    relatedCharacterIds: ["kacho", "fugetsu", "melody"],
    chapters: [383, 400, 404, 411],
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
        chapter: 402,
        note: "Nothing on-page has misfired for him: the beast autonomously screeched low-level spirits off Fugetsu — exactly the guardian work it was built for.",
        confidence: "weak-inference",
      },
      {
        chapter: 389,
        note: "Benjamin Baton has run as designed all arc — the stars on his hand log each pledged soldier's death as their abilities accrue to him.",
        confidence: "strong-inference",
      },
      {
        chapter: 411,
        note: "Kurapika's reconstruction of the ritual's payout — power enough to 'sustain a Guardian Spirit Beast befitting a king' — reads like a beast-merged ruler is the intended output, not a violation.",
        confidence: "weak-inference",
      },
    ],
    relatedCharacterIds: ["benjamin", "furykov", "unma", "halkenburg"],
    chapters: [389, 402, 411, 413],
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
  {
    id: "th-hisoka-culls-support-first",
    claim:
      "Hisoka is disarming Chrollo before dueling him — killing the Spiders whose abilities stock Skill Hunter's arsenal",
    summary:
      "The two Spiders he killed first are exactly the two whose powers nearly killed him at Heavens Arena: Shalnark's Black Voice and Kortopi's Gallery Fake. If the borrowed loadout dies with its owners, every kill is a page torn out of Chrollo's book before the rematch.",
    statusHistory: [
      {
        ch: 357,
        value: "unresolved",
        note: "Two kills in one afternoon, both of them the duel's ability-donors — pattern or proximity, the sample is two.",
      },
      {
        ch: 405,
        value: "unresolved",
        note: "No third Spider has died since boarding. He gambles openly in the Tier 1 casino and lets the hunters come to him — a lure posture, not a cull.",
      },
    ],
    supporting: [
      {
        chapter: 351,
        note: "Chrollo's arsenal for the duel was explicitly borrowed: Black Voice antennae and a stadium of Gallery Fake copies did the killing, not his own hands.",
        confidence: "canonical",
      },
      {
        chapter: 357,
        note: "Of ten possible targets, his first two are the donors of those exact abilities — killed within hours of his revival, before the Troupe even knew he was alive.",
        confidence: "strong-inference",
      },
    ],
    contradicting: [
      {
        chapter: 357,
        note: "The mundane reading: Shalnark and Kortopi were simply the pair who confirmed his 'death' at the morgue — the first Spiders findable that day. Opportunity, not strategy.",
        confidence: "weak-inference",
      },
      {
        chapter: 357,
        note: "Nothing on-page confirms Skill Hunter loses a stolen ability when its original owner dies — the disarmament premise itself is unproven.",
        confidence: "weak-inference",
      },
      {
        chapter: 405,
        note: "His behavior aboard is theatrical, not surgical: casino appearances and open taunts fit a man staging duels, not one methodically stripping assets.",
        confidence: "weak-inference",
      },
    ],
    relatedCharacterIds: ["hisoka", "chrollo", "shalnark", "kortopi", "machi"],
    chapters: [351, 356, 357, 405],
    confidence: "theory",
    lastUpdatedCh: 405,
  },
];
