import type { GuardianBeast, NenAbility } from "@/lib/types";

/**
 * Technical research archive. revealCh = when the READER learns mechanics;
 * firstSeenCh = first on-page sighting. 0 = pre-arc knowledge.
 */
export const nenAbilities: NenAbility[] = [
  // ── Kurapika ─────────────────────────────────────────────────────────
  {
    id: "emperor-time",
    name: "Emperor Time",
    userCharacterId: "kurapika",
    kind: "personal",
    nenType: "specialist",
    description:
      "In his scarlet-eyed state, Kurapika becomes a Specialist with 100% efficiency in every Nen category — a temporary mastery no natural affinity allows.",
    activation:
      "Scarlet Eyes state (emotional trigger or deliberate invocation).",
    conditions: ["Eyes must be scarlet."],
    restrictions: [
      "Bound to the scarlet-eye state; cannot be held indefinitely.",
    ],
    cost: "One hour of Kurapika's lifespan per second of activation.",
    range: "Self",
    targets: "Self-enhancement",
    effects: [
      "All six Nen categories usable at full efficiency.",
      "Enables borrowed abilities (via Stealth Dolphin) to run at full power.",
    ],
    weaknesses: [
      "Catastrophic lifespan cost.",
      "Visible eye change identifies him as a Kurta.",
    ],
    firstSeenCh: 0,
    revealCh: 370,
    uses: [
      {
        ch: 361,
        note: "Extended use lending Little Eye to Oito during the rat reconnaissance.",
      },
      {
        ch: 371,
        note: "Interrogation support during the body-double exposure.",
      },
    ],
    status: "active",
    awareCharacterIds: [
      { characterId: "bill", sinceCh: 370 },
      { characterId: "oito", sinceCh: 361 },
      { characterId: "babimyna", sinceCh: 362 },
    ],
    mysteryIds: ["my-kurapika-lifespan"],
    evidence: [
      {
        chapter: 370,
        note: "Cost quantified on-page: one hour per second.",
        confidence: "canonical",
      },
    ],
    confidence: "canonical",
  },
  {
    id: "dowsing-chain",
    name: "Dowsing Chain",
    userCharacterId: "kurapika",
    kind: "personal",
    nenType: "conjurer",
    description:
      "The pendulum chain on Kurapika's ring finger: a lie detector and locator that swings toward truth's absence.",
    activation: "Conjure the chain; pose questions or scan.",
    effects: [
      "Detects lies via involuntary aura response.",
      "Locates hidden objects and people.",
    ],
    firstSeenCh: 0,
    revealCh: 0,
    uses: [{ ch: 371, note: "Screens Room 1014's guards for hostile intent." }],
    status: "active",
    evidence: [
      {
        chapter: 371,
        note: "Class-room screening shown on-page.",
        confidence: "canonical",
      },
    ],
    confidence: "canonical",
  },
  {
    id: "holy-chain",
    name: "Holy Chain",
    userCharacterId: "kurapika",
    kind: "personal",
    nenType: "conjurer",
    description:
      "The healing chain on his thumb, mending wounds at enhanced speed.",
    activation: "Conjure and apply to injury.",
    effects: ["Rapid wound healing."],
    firstSeenCh: 0,
    revealCh: 0,
    status: "active",
    evidence: [
      {
        chapter: 0,
        note: "Established pre-arc (Yorknew).",
        confidence: "canonical",
      },
    ],
    confidence: "canonical",
  },
  {
    id: "steal-chain",
    name: "Steal Chain",
    userCharacterId: "kurapika",
    kind: "personal",
    nenType: "conjurer",
    description:
      "The chain on his index finger, developed for the voyage: it extracts a target's Nen ability into a syringe-like head for later lending.",
    activation: "Strike the target with the chain's syringe head.",
    conditions: ["Target's ability must be extracted while restrained."],
    effects: [
      "Removes a Nen ability from the target.",
      "Stored ability can be lent onward (see Stealth Dolphin).",
    ],
    firstSeenCh: 360,
    revealCh: 360,
    uses: [{ ch: 360, note: "Extracts Little Eye from Sayird." }],
    status: "active",
    awareCharacterIds: [
      { characterId: "bill", sinceCh: 360 },
      { characterId: "oito", sinceCh: 360 },
    ],
    evidence: [
      {
        chapter: 360,
        note: "Extraction from Sayird shown on-page.",
        confidence: "canonical",
      },
    ],
    confidence: "canonical",
  },
  {
    id: "chain-jail",
    name: "Chain Jail",
    userCharacterId: "kurapika",
    kind: "personal",
    nenType: "conjurer",
    description:
      "The binding chain on his middle finger, wrapping targets in unbreakable coils that also force Zetsu.",
    activation: "Strike and bind the target.",
    conditions: ["Usable only against Phantom Troupe members (Vow)."],
    restrictions: [
      "Breaking the Vow costs Kurapika his life (Judgment Chain self-imposed).",
    ],
    effects: ["Unbreakable restraint.", "Forces the target into Zetsu."],
    firstSeenCh: 0,
    revealCh: 0,
    status: "active",
    awareCharacterIds: [
      { characterId: "chrollo", sinceCh: 0 },
      { characterId: "hisoka", sinceCh: 0 },
    ],
    evidence: [
      {
        chapter: 0,
        note: "Established pre-arc (Yorknew, on Chrollo).",
        confidence: "canonical",
      },
    ],
    confidence: "canonical",
  },
  {
    id: "judgment-chain",
    name: "Judgment Chain",
    userCharacterId: "kurapika",
    kind: "personal",
    nenType: "conjurer",
    description:
      "The little-finger blade: it drives a condition into the target's heart; violation means death.",
    activation:
      "Pierce the target's heart with the chain blade; state the rule.",
    conditions: ["Stated rule must be violated for the blade to kill."],
    effects: ["Enforceable contract under pain of death."],
    firstSeenCh: 0,
    revealCh: 0,
    status: "active",
    evidence: [
      {
        chapter: 0,
        note: "Established pre-arc (on Chrollo).",
        confidence: "canonical",
      },
    ],
    confidence: "canonical",
  },
  {
    id: "stealth-dolphin",
    name: "Stealth Dolphin",
    userCharacterId: "kurapika",
    kind: "borrowed",
    nenType: "specialist",
    description:
      "A dolphin-shaped Emperor Time construct that manages stolen abilities: it can hand a stolen ability to another person, with usage instructions, for one activation.",
    activation:
      "Emperor Time active; dolphin manifests to broker the transfer.",
    conditions: [
      "Recipient accepts the lend.",
      "Ability returns after one full use.",
    ],
    cost: "Runs on Emperor Time (lifespan drain).",
    effects: [
      "Lends stolen abilities to third parties — even non-Nen users, at their peril.",
    ],
    weaknesses: ["Lending to a non-user exposes them to raw aura strain."],
    firstSeenCh: 360,
    revealCh: 361,
    uses: [
      { ch: 361, note: "Lends Little Eye to Oito for the rat reconnaissance." },
    ],
    status: "active",
    awareCharacterIds: [
      { characterId: "oito", sinceCh: 361 },
      { characterId: "bill", sinceCh: 361 },
    ],
    evidence: [
      {
        chapter: 361,
        note: "Lend mechanics narrated during the reconnaissance.",
        confidence: "canonical",
      },
    ],
    confidence: "canonical",
  },
  {
    id: "little-eye",
    name: "Little Eye",
    userCharacterId: "sayird",
    kind: "personal",
    nenType: "manipulator",
    description:
      "Sayird's beetle-drone ability: co-opt a small creature and pilot it remotely, seeing through its senses. Confiscated by Kurapika via Steal Chain.",
    activation: "Attach the ability to a small animal host.",
    conditions: ["Requires a living host creature."],
    effects: ["Remote reconnaissance through the host's senses."],
    weaknesses: [
      "Host fragility.",
      "User's body is defenseless during deep control.",
    ],
    firstSeenCh: 360,
    revealCh: 361,
    uses: [
      { ch: 361, note: "Oito's rat flight through the ship's hidden spaces." },
    ],
    status: "active",
    awareCharacterIds: [
      { characterId: "kurapika", sinceCh: 360 },
      { characterId: "oito", sinceCh: 361 },
    ],
    evidence: [
      {
        chapter: 361,
        note: "Mechanics shown during Oito's use.",
        confidence: "canonical",
      },
    ],
    confidence: "canonical",
  },

  // ── Princes ──────────────────────────────────────────────────────────
  {
    id: "benjamin-baton",
    name: "Benjamin Baton",
    userCharacterId: "benjamin",
    kind: "personal",
    nenType: "enhancer",
    description:
      "Benjamin inherits the Nen ability of any pledged subordinate who dies — each loyal death passes its owner's power up the chain of command. Stars on his palm, one per pledged soldier, tell him at a glance who still lives.",
    activation: "Automatic on a pledged soldier's death.",
    conditions: [
      "Subordinate must have formally pledged their ability to Benjamin.",
    ],
    effects: [
      "Permanent acquisition of dead subordinates' abilities (Vincent's Air Blow and Musse's Secret Window confirmed by ch 373).",
      "Palm stars double as a life-sign monitor for the pledged roster.",
    ],
    weaknesses: [
      "Growth requires his own people to die — a strategic moral hazard.",
    ],
    firstSeenCh: 373,
    revealCh: 373,
    uses: [
      { ch: 373, note: "Inheritance of Musse's Secret Window confirmed." },
      {
        ch: 389,
        note: "Reads his palm stars to confirm Shikaku dead and Vict alive.",
      },
      {
        ch: 413,
        note: "Facing death by TSK-17, Benjamin resolves to merge his Guardian Spirit Beast with the baton and 'become a god' watching over Kakin.",
      },
    ],
    status: "active",
    awareCharacterIds: [
      { characterId: "balsamilco", sinceCh: 358 },
      { characterId: "babimyna", sinceCh: 361 },
      { characterId: "furykov", sinceCh: 358 },
    ],
    evidence: [
      {
        chapter: 373,
        note: "Named on-page; Air Blow and Secret Window inheritance confirmed.",
        confidence: "canonical",
      },
      {
        chapter: 413,
        note: "Beast-merge 'god' plan stated in Benjamin's own monologue.",
        confidence: "canonical",
      },
    ],
    confidence: "canonical",
  },
  {
    id: "camilla-cat",
    name: "Cat's Name (revival counter)",
    userCharacterId: "camilla",
    kind: "personal",
    nenType: "specialist",
    description:
      "Camilla's counteractive-type ability: a giant cat manifests when she is killed, crushes her killer, and drips their converted life back into her mouth. Dying is her opening move.",
    activation: "Automatic upon Camilla's death at another's hands.",
    conditions: ["She must actually be killed by an aggressor."],
    effects: [
      "Kills her killer (Musse crushed on-page, ch 373).",
      "Restores Camilla using the killer's remaining life.",
    ],
    weaknesses: [
      "Useless against detention, starvation, or anything short of murder.",
      "Benjamin now knows she is a counteractive type (via Secret Window) and plans around triggering it, ch 413.",
    ],
    firstSeenCh: 373,
    revealCh: 373,
    uses: [
      {
        ch: 373,
        note: "Musse shoots Camilla dead; the cat crushes him and revives her.",
      },
    ],
    status: "active",
    awareCharacterIds: [
      { characterId: "benjamin", sinceCh: 413 },
      { characterId: "furykov", sinceCh: 413 },
    ],
    evidence: [
      {
        chapter: 373,
        note: "Full revival sequence shown on-page after Musse's shots.",
        confidence: "canonical",
      },
      {
        chapter: 413,
        note: "Benjamin identifies her as 'counteractive type' via the leveled-up Secret Window.",
        confidence: "canonical",
      },
    ],
    confidence: "canonical",
  },

  // ── Mafia / other ────────────────────────────────────────────────────
  {
    id: "morena-contagion",
    name: "Sinner's Bloodline (contagion)",
    userCharacterId: "morena",
    kind: "personal",
    nenType: "specialist",
    description:
      "Morena's Specialist 'game': she is the dealer-mother of up to 22 players, each granted a Nen ability tailored to their goals, leveling by kills. She describes it as a high-level hybrid crossing all five other categories — a pyramid scheme where children who bank enough points can become parents themselves. Her recruitment card game is itself part of the ability, with an anti-cheat clause that strips a cheater's choices to Yes or No.",
    activation:
      "Three conditions, in any order: the negotiation game ends in 'Yes'; Morena infects the recruit via a deep kiss; the recruit witnesses a Heil-Ly murder.",
    conditions: [
      "Cap of 22 concurrent 'children'.",
      "Growth requires kills (killing a Nen user is worth ten levels).",
      "Morena always knows each child's level, points, location, and status.",
      "The 'game' persists until cleared, the admin ceases to exist, or the host dies.",
    ],
    restrictions: [
      "Recruitment negotiations are bound by vow-backed honesty — cheating on her side would void the ability's strengthening.",
    ],
    effects: [
      "Mass-produces empowered killers with bespoke abilities.",
      "Recipients' abilities strengthen per murder.",
      "Cheaters in the recruitment game are locked to Yes/No answers (Borksen, ch 410).",
    ],
    weaknesses: [
      "Individually, fresh recipients are weak.",
      "The network dies with its nodes' exposure.",
    ],
    firstSeenCh: 377,
    revealCh: 408,
    uses: [
      {
        ch: 409,
        note: "Recruitment game against Borksen concludes; her cheat triggers the ability's Yes/No clause.",
      },
      {
        ch: 410,
        note: "Full onboarding rules explained to Borksen (level 0 until the murder-witness condition clears).",
      },
    ],
    status: "active",
    affectedCharacterIds: ["luini"],
    mysteryIds: ["my-morena-endgame"],
    evidence: [
      {
        chapter: 377,
        note: "Recruitment and leveling rules stated on-page.",
        confidence: "canonical",
      },
      {
        chapter: 410,
        note: "Dealer/22-player structure, three joining conditions, and anti-cheat clause explained by Morena herself.",
        confidence: "canonical",
      },
    ],
    confidence: "canonical",
  },
  {
    id: "silent-majority",
    name: "Silent Majority",
    kind: "unknown",
    nenType: "unknown",
    description:
      "The ability behind the Room 1014 killings: needle-marked passengers become remotely-operated killers who emerge from concealment, murder, and self-destruct into puppets. The true user has never been identified on-page.",
    activation: "Unknown; operates through implanted intermediaries.",
    conditions: [
      "Requires pre-placed intermediaries and, apparently, access routes (hidden passages).",
    ],
    effects: [
      "Deniable remote assassination.",
      "Intermediaries die or wipe on capture.",
    ],
    weaknesses: [
      "Intermediaries can be detected by careful Nen screening (En, Dowsing).",
    ],
    firstSeenCh: 359,
    revealCh: 362,
    uses: [
      {
        ch: 376,
        note: "Myuhan killed; the 'snake charmer' remains active deep into the voyage.",
      },
      {
        ch: 411,
        note: "Kurapika still weighs whether the unknown assassin will strike Tserriednich's guards again — user unidentified as of ch 414.",
      },
    ],
    status: "unknown",
    mysteryIds: ["my-silent-majority-user"],
    evidence: [
      {
        chapter: 362,
        note: "Puppet mechanism observed by Kurapika's countermeasures.",
        confidence: "canonical",
      },
      {
        chapter: 362,
        note: "User identity: never shown; attribution remains open.",
        confidence: "unknown",
      },
    ],
    confidence: "strong-inference",
  },

  // ── Pre-arc reference files ──────────────────────────────────────────
  {
    id: "skill-hunter",
    name: "Skill Hunter",
    userCharacterId: "chrollo",
    kind: "personal",
    nenType: "specialist",
    description:
      "Chrollo's book: he steals others' abilities under strict conditions and uses them from its pages.",
    activation: "Conjure Bandit's Secret; fulfill the four theft conditions.",
    conditions: [
      "See the ability used.",
      "Ask about it and receive answers.",
      "Target's palm on the cover.",
      "All within one hour.",
    ],
    effects: [
      "Permanent theft while the original owner lives (varies by later refinements).",
    ],
    firstSeenCh: 0,
    revealCh: 0,
    status: "active",
    evidence: [
      { chapter: 0, note: "Established pre-arc.", confidence: "canonical" },
    ],
    confidence: "canonical",
  },
  {
    id: "bungee-gum",
    name: "Bungee Gum",
    userCharacterId: "hisoka",
    kind: "personal",
    nenType: "transmuter",
    description:
      "Hisoka's aura with the properties of both rubber and gum — attachment, elasticity, and every murderous application in between.",
    effects: [
      "Adhesive/elastic aura attachable to targets.",
      "Concealable with Texture Surprise.",
    ],
    firstSeenCh: 0,
    revealCh: 0,
    status: "active",
    evidence: [
      { chapter: 0, note: "Established pre-arc.", confidence: "canonical" },
    ],
    confidence: "canonical",
  },

  // ── Guardian Spirit Beast abilities ──────────────────────────────────
  {
    id: "ab-beast-woble",
    name: "Woble's Beast (unnamed)",
    userCharacterId: "woble",
    kind: "guardian-beast",
    nenType: "unknown",
    description:
      "An amorphous, cloaked presence over the infant prince. Its effect has never been demonstrated on-page; its restraint toward Oito is itself a datum.",
    effects: ["Unknown."],
    firstSeenCh: 359,
    revealCh: 359,
    status: "unknown",
    mysteryIds: ["my-woble-beast-ability"],
    evidence: [
      {
        chapter: 359,
        note: "Manifestation glimpsed; no effect shown.",
        confidence: "canonical",
      },
    ],
    confidence: "unknown",
  },
  {
    id: "ab-beast-marayam",
    name: "Marayam's Beast (the hidden room)",
    userCharacterId: "marayam",
    kind: "guardian-beast",
    nenType: "conjurer",
    description:
      "A serpentine beast whose known power conjures a perfect duplicate of Room 1013 behind a one-way boundary: the household lives inside it, invisible and unreachable, while the real room reads empty. Biscuit identified the boundary type on-page; the beast also keeps growing with the child, toward a ceiling nobody knows.",
    activation:
      "Ambient; the duplicate room manifested around the household without Marayam's awareness.",
    conditions: [
      "One-way boundary: anyone who leaves cannot return or see inside (demonstrated by Belerainte, ch. 375).",
      "Those inside vanish from the real room's perspective.",
    ],
    effects: [
      "A concealed duplicate of the prince's quarters — the safest room aboard.",
      "Growth tracking the child's development; adult form unknown.",
      "Renders the household unlocatable — Benjamin's soldiers could not find Marayam even under Special Martial Law (ch. 413).",
    ],
    weaknesses: [
      "One-way exit bleeds the household's staff every time someone must go out.",
    ],
    firstSeenCh: 361,
    revealCh: 375,
    uses: [
      {
        ch: 372,
        note: "Room 1013 reads empty from outside; the household has been inside the duplicate.",
      },
      {
        ch: 375,
        note: "Belerainte exits and cannot re-enter; Biscuit classifies the boundary as one-way.",
      },
      {
        ch: 413,
        note: "Benjamin's martial-law sweep cannot locate Marayam; Rihan held in reserve.",
      },
    ],
    status: "active",
    awareCharacterIds: [
      { characterId: "biscuit", sinceCh: 375 },
      { characterId: "hanzo", sinceCh: 375 },
      { characterId: "vergei", sinceCh: 375 },
      { characterId: "belerainte", sinceCh: 375 },
      { characterId: "sevanti", sinceCh: 375 },
    ],
    mysteryIds: ["my-marayam-beast-form"],
    evidence: [
      {
        chapter: 375,
        note: "One-way Nen space demonstrated and attributed to the beast by Biscuit.",
        confidence: "canonical",
      },
      {
        chapter: 390,
        note: "Continued growth remarked on by the household's Hunters.",
        confidence: "canonical",
      },
    ],
    confidence: "canonical",
  },
  {
    id: "ab-beast-fugetsu",
    name: "Magical Worm (Fugetsu's beast)",
    userCharacterId: "fugetsu",
    kind: "guardian-beast",
    nenType: "conjurer",
    description:
      "Conjures paired doors — an Outgoing Door and a Door of Return — linking two locations, the only unrestricted movement aboard the sealed ship. Originally once per day; Fugetsu's late-voyage belief that she can use it freely traces to an enemy mark on her shoulder, and each use visibly drains her.",
    activation:
      "Fugetsu opens a conjured door; a twin door opens at the destination.",
    conditions: [
      "Fugetsu must have physically visited the destination beforehand.",
      "Baseline limit of one use per day (ch 402 recap); the 'unlimited' state is suspected enemy interference.",
      "The Outgoing Door closes when Fugetsu enters the tunnel; the Door of Return when her companion does — others may pass while a door stands open.",
      "Wishing for a location outside the ship produces no door.",
    ],
    effects: [
      "Point-to-point travel between decks and sealed sections.",
      "Return door now appears even when she travels alone (post-'breakthrough', ch 400).",
    ],
    weaknesses: [
      "The space between doors is not guaranteed safe — see Kacho's death.",
      "Overuse is wasting her: evil spirits gather on her Zetsu-weak aura (ch 400–402).",
    ],
    firstSeenCh: 370,
    revealCh: 370,
    status: "active",
    awareCharacterIds: [
      { characterId: "kacho", sinceCh: 370 },
      { characterId: "basho", sinceCh: 383 },
      { characterId: "melody", sinceCh: 400 },
      { characterId: "kaiser", sinceCh: 402 },
    ],
    mysteryIds: ["my-fugetsu-door-limits"],
    evidence: [
      {
        chapter: 370,
        note: "Door travel shown on-page.",
        confidence: "canonical",
      },
      {
        chapter: 402,
        note: "Door rules, prior-visit requirement, and the suspect shoulder mark laid out at the Justice Bureau.",
        confidence: "canonical",
      },
    ],
    confidence: "canonical",
  },
  {
    id: "ab-beast-halkenburg",
    name: "The Boy Who Shoots the Arrow: Grimmel the Dissonance",
    userCharacterId: "halkenburg",
    kind: "guardian-beast",
    nenType: "specialist",
    description:
      "Halkenburg's group ability, made possible by his Guardian Spirit Beast: a great bow whose arrow forces a mind swap. One marked follower is chosen at random and switches souls with whoever the arrow strikes. Halkenburg has methodically mapped its rules through experiments (Shikaku/Sumidori, Vict) and now runs it as a soul-warfare system — his own body's death did not end him.",
    activation:
      "Halkenburg draws the aura bow, powered by a group of seal-marked followers; the arrow can be aimed through walls with spotters.",
    conditions: [
      "Requires willing, seal-marked followers to power each shot.",
      "One follower's mind is randomly swapped with the arrow's victim.",
      "Only one of two swapped minds can be awake at a time; Halkenburg's side generally gets priority, bought by putting their lives on the line.",
      "If the body on his side dies first, the victim's mind returns home and gets waking priority — Halkenburg pre-empted this with sedatives, buying ~10 hours of control after his own body's death.",
    ],
    effects: [
      "Forced mind swap between a marked follower and the arrow's target.",
      "Body death does not equal soul death: Halkenburg's soul operates Balsamilco's body after his own body dies (ch 404–413).",
      "Followers can be marked remotely and en masse (a dozen civilians fainted simultaneously, ch 403).",
    ],
    weaknesses: [
      "Ammunition is his followers' lives and minds.",
      "The random swap can strand Halkenburg himself in an enemy body (it did — Balsamilco).",
      "Waking-priority rules create exploitable timing windows.",
    ],
    firstSeenCh: 375,
    revealCh: 404,
    uses: [
      {
        ch: 386,
        note: "Shikaku/Sumidori experiment: swap confirmed, Shikaku's body destroyed by forced suicide.",
      },
      {
        ch: 389,
        note: "Arrow fired at Vict, who was stationed to check Halkenburg.",
      },
      {
        ch: 403,
        note: "Arrow fired through a courthouse wall at Balsamilco — Halkenburg's own mind swaps into Benjamin's strategist.",
      },
      {
        ch: 413,
        note: "From inside Balsamilco, with his own body dead, Halkenburg fires an arrow at Benjamin himself.",
      },
    ],
    status: "active",
    awareCharacterIds: [
      { characterId: "balsamilco", sinceCh: 403 },
      { characterId: "benjamin", sinceCh: 413 },
      { characterId: "nasubi", sinceCh: 413 },
      { characterId: "nugui", sinceCh: 413 },
    ],
    mysteryIds: ["my-halkenburg-arrow-mechanics"],
    evidence: [
      {
        chapter: 375,
        note: "Seal-marking of sleeping guards shown.",
        confidence: "canonical",
      },
      {
        chapter: 404,
        note: "Halkenburg narrates the full ruleset — mind swap, waking priority, death conditions — in his own monologue.",
        confidence: "canonical",
      },
      {
        chapter: 413,
        note: "Nasubi confirms succession rights persist while the soul lives; arrow fired at Benjamin.",
        confidence: "canonical",
      },
    ],
    confidence: "canonical",
  },
  {
    id: "ab-beast-tserriednich",
    name: "Tserriednich's Beast (the many-faced idol)",
    userCharacterId: "tserriednich",
    kind: "guardian-beast",
    nenType: "unknown",
    description:
      "A towering, many-faced horror even by beast standards, apparently entangled with the prince's own awakening time-perception ability. Where the beast ends and his personal Nen begins is an open research question.",
    effects: [
      "Unknown; interaction with his future-glimpse ability suspected.",
    ],
    firstSeenCh: 361,
    revealCh: 376,
    status: "active",
    mysteryIds: ["my-tserriednich-god-beast"],
    evidence: [
      {
        chapter: 376,
        note: "Manifestation shown; mechanics undisclosed.",
        confidence: "canonical",
      },
    ],
    confidence: "weak-inference",
  },
  {
    id: "ab-beast-momoze",
    name: "Momoze's Beast (watcher-manipulator)",
    userCharacterId: "momoze",
    kind: "guardian-beast",
    nenType: "manipulator",
    description:
      "A beast that worked through those watching over its prince — documented largely after her death, as investigators reconstructed the suite's events.",
    effects: ["Manipulation of the prince's attendants (reconstructed)."],
    firstSeenCh: 367,
    revealCh: 368,
    status: "broken",
    evidence: [
      {
        chapter: 368,
        note: "Behavior reconstructed post-mortem.",
        confidence: "weak-inference",
      },
    ],
    confidence: "weak-inference",
  },
  {
    id: "ab-beast-benjamin",
    name: "Benjamin's Beast (unrevealed)",
    userCharacterId: "benjamin",
    kind: "guardian-beast",
    nenType: "unknown",
    description:
      "Manifestation glimpsed in silhouette among the beasts at the rite; no behavior documented.",
    effects: ["Unknown."],
    firstSeenCh: 361,
    revealCh: 361,
    status: "unknown",
    evidence: [
      { chapter: 361, note: "Silhouette only.", confidence: "unknown" },
    ],
    confidence: "unknown",
  },
  {
    id: "ab-beast-camilla",
    name: "Camilla's Beast (the coercer)",
    userCharacterId: "camilla",
    kind: "guardian-beast",
    nenType: "manipulator",
    description:
      "Distinct from her personal Cat's Name: per the class-arc elaborations, her beast coercively manipulates people once certain conditions are fulfilled. Which conditions, and on whom it has already been used, remain unconfirmed.",
    conditions: ["Unspecified fulfillment conditions precede the coercion."],
    effects: ["Coercive manipulation of conditioned targets."],
    firstSeenCh: 361,
    revealCh: 375,
    status: "active",
    evidence: [
      {
        chapter: 375,
        note: "Capability elaborated in the beast overviews accompanying the class arc.",
        confidence: "canonical",
      },
    ],
    confidence: "strong-inference",
  },
  {
    id: "ab-beast-zhang-lei",
    name: "Zhang Lei's Beast (coin bearer)",
    userCharacterId: "zhang-lei",
    kind: "guardian-beast",
    nenType: "conjurer",
    description:
      "Produces coins through the prince — objects whose full function (currency? tokens? contracts?) is only partly documented.",
    effects: ["Coin production; downstream function under analysis."],
    firstSeenCh: 366,
    revealCh: 366,
    status: "active",
    evidence: [
      {
        chapter: 366,
        note: "Coin manifestation shown.",
        confidence: "canonical",
      },
    ],
    confidence: "weak-inference",
  },
  {
    id: "ab-beast-tubeppa",
    name: "Tubeppa's Beast (the chemist)",
    userCharacterId: "tubeppa",
    kind: "guardian-beast",
    nenType: "conjurer",
    description:
      "Per the class-arc elaborations: a beast that can produce a variety of drugs within its body — but only with the help of a partner. The scientist prince's blessing is a laboratory with a co-signature requirement.",
    conditions: ["Requires a cooperating partner to produce."],
    effects: [
      "Drug synthesis within the beast's body (rules partially documented).",
    ],
    firstSeenCh: 361,
    revealCh: 375,
    status: "active",
    evidence: [
      {
        chapter: 375,
        note: "Capability elaborated in the beast overviews accompanying the class arc.",
        confidence: "canonical",
      },
    ],
    confidence: "strong-inference",
  },
  {
    id: "ab-beast-tyson",
    name: "Tyson's Beast (devotion enforcer)",
    userCharacterId: "tyson",
    kind: "guardian-beast",
    nenType: "manipulator",
    description:
      "Appears to act on readers of the Book of Tyson, binding them toward devotion; rules thinly documented.",
    conditions: ["Contact with her gospel appears implicated."],
    effects: [
      "Devotion/compliance effects on adherents (partially documented).",
    ],
    firstSeenCh: 366,
    revealCh: 366,
    status: "active",
    evidence: [
      {
        chapter: 366,
        note: "Adherent behavior suggestive; mechanics unconfirmed.",
        confidence: "weak-inference",
      },
    ],
    confidence: "weak-inference",
  },
  {
    id: "ab-beast-luzurus",
    name: "Luzurus's Beast (the trapper)",
    userCharacterId: "luzurus",
    kind: "guardian-beast",
    nenType: "manipulator",
    description:
      "Manipulates people by setting traps shaped like their own desires — the indolent prince's beast hunts through appetite. Documented in the class-arc beast overviews; its full rules and range remain unshown.",
    conditions: [
      "Target must take the desire-shaped bait (mechanism partially documented).",
    ],
    effects: ["Manipulation of those caught by a desire-trap."],
    firstSeenCh: 361,
    revealCh: 375,
    status: "active",
    evidence: [
      {
        chapter: 375,
        note: "Capability elaborated in the beast overviews accompanying the class arc.",
        confidence: "canonical",
      },
    ],
    confidence: "strong-inference",
  },
  {
    id: "ab-beast-salele",
    name: "Salé-salé's Beast (smoke of devotion)",
    userCharacterId: "salele",
    kind: "guardian-beast",
    nenType: "manipulator",
    description:
      "A beast whose smoke gradually turned those who inhaled it into the Eighth Prince's devotees — Benjamin's observer clocked full affection in ~8 hours for intimates, ~70 for others, and projected kingdom-scale mind control had he taken the throne. Devoured whole by Rihan's Predator, leaving the prince defenseless.",
    effects: [
      "Inhaled smoke escalates affection for Salé-salé over hours (observed on Koroabde).",
      "Extrapolated endgame: an absolute dictatorship of adoration.",
    ],
    firstSeenCh: 361,
    revealCh: 381,
    status: "broken",
    evidence: [
      {
        chapter: 381,
        note: "Rihan documents the smoke's timetable, then Predator consumes the beast in one bite.",
        confidence: "canonical",
      },
    ],
    confidence: "canonical",
  },
  {
    id: "ab-beast-kacho",
    name: "Kacho's Beast (the post-mortem twin)",
    userCharacterId: "kacho",
    kind: "post-mortem",
    nenType: "conjurer",
    description:
      "After Kacho's death, her Guardian Spirit Beast manifests AS Kacho — a walking, talking continuation of the Tenth Prince that stays beside Fugetsu, plans on her behalf, and passes through walls. 'Kacho' herself reasons she was resurrected as a guardian spirit for her twin; maintaining her appearance appears to draw on Fugetsu's aura.",
    conditions: [
      "Fugetsu seeing her confirms Kacho is out of the contest (princes cannot see their own beast, but can see others').",
      "Sustaining the manifestation appears to burden Fugetsu's weakening aura.",
    ],
    effects: [
      "Full post-mortem embodiment of Kacho: memory, personality, agency.",
      "Phases through walls and bookcases; accompanies Fugetsu on Tier 2 under Kaiser's protection at the Justice Bureau.",
      "Authored the 'last letters' delivered to the princes, ch 402–403.",
    ],
    weaknesses: [
      "Visibly fading as Fugetsu weakens (seen kneeling and dimming, ch 404).",
    ],
    firstSeenCh: 381,
    revealCh: 400,
    uses: [
      {
        ch: 400,
        note: "'Kacho' works with Melody and Kaiser inside the Justice Bureau; commits to making Fugetsu King.",
      },
      {
        ch: 402,
        note: "Plans the Luzurus operation and the prince-letter deliveries.",
      },
      {
        ch: 411,
        note: "Still tending Fugetsu in Kaiser's office as she sleeps.",
      },
    ],
    status: "active",
    awareCharacterIds: [
      { characterId: "melody", sinceCh: 383 },
      { characterId: "kaiser", sinceCh: 400 },
    ],
    evidence: [
      {
        chapter: 400,
        note: "'Kacho' explains her own post-mortem nature and its implications on-page.",
        confidence: "canonical",
      },
      {
        chapter: 404,
        note: "The beast is seen kneeling by Fugetsu's bed, slowly beginning to fade.",
        confidence: "canonical",
      },
    ],
    confidence: "canonical",
  },

  // ── Benjamin's soldiers ──────────────────────────────────────────────
  {
    id: "secret-window",
    name: "Secret Window",
    userCharacterId: "musse",
    kind: "personal",
    nenType: "unknown",
    description:
      "Musse's surveillance owls: Nen-beast birds that eavesdrop through walls or, planted by touch, telepathically relay everything a target does and says. After Camilla's cat killed Musse, Benjamin inherited the ability via Benjamin Baton — and prolonged use has leveled it up: it can now replay what Musse saw before his death.",
    activation:
      "Manifest an owl; the tracking bird requires physical contact with the target.",
    conditions: [
      "The planted bird is visible only to the user.",
      "Only one bird (or one of each type) can exist at a time.",
      "The replay function appears to unlock after prolonged continuous use on one target.",
    ],
    effects: [
      "Eavesdropping through physical barriers (shoulder owl).",
      "Persistent telepathic feed of a touched target's words and actions.",
      "Leveled up under Benjamin: rewinds to what Musse witnessed before dying (ch 413).",
    ],
    weaknesses: [
      "Planting the tracker requires getting within touching range — the attempt on Camilla cost Musse his life.",
    ],
    firstSeenCh: 366,
    revealCh: 373,
    uses: [
      {
        ch: 366,
        note: "Musse eavesdrops on Camilla's assassination planning through her door.",
      },
      {
        ch: 373,
        note: "Musse touches Camilla before dying, completing the plant; the feed passes to Benjamin.",
      },
      {
        ch: 413,
        note: "Benjamin watches Camilla's massage schedule live and reviews Musse's final observations — learning she is a counteractive type.",
      },
    ],
    status: "active",
    awareCharacterIds: [
      { characterId: "benjamin", sinceCh: 366 },
      { characterId: "balsamilco", sinceCh: 373 },
      { characterId: "furykov", sinceCh: 373 },
    ],
    evidence: [
      {
        chapter: 373,
        note: "Plant-by-touch and inheritance to Benjamin shown on-page.",
        confidence: "canonical",
      },
      {
        chapter: 413,
        note: "Level-up (replaying Musse's pre-death sight) stated in Benjamin's monologue.",
        confidence: "canonical",
      },
    ],
    confidence: "canonical",
  },
  {
    id: "combo-master",
    name: "Combo Master",
    userCharacterId: "furykov",
    kind: "personal",
    nenType: "specialist",
    description:
      "Furykov's Specialist analysis ability, formally explained only in ch 413: by cumulatively spending time near a target, he deciphers the full details of their ability — then can spend the same amount of time again to craft equipment that destroys, supplements, or amplifies it. It is the engine behind his uncanny knack for spotting Nen users and their types.",
    activation:
      "Passive accumulation of time in the target's vicinity; equipment creation is a second, equal time investment.",
    conditions: [
      "Deciphering time scales with the target ability's power.",
      "Equipment-creation time equals the deciphering time and resets if interrupted (deciphering does not).",
    ],
    restrictions: ["Cannot use Hatsu while deciphering or crafting."],
    effects: [
      "Full read of a target's ability mechanics.",
      "Bespoke anti-ability (or pro-ability) equipment.",
    ],
    weaknesses: ["Slow by design; useless in a surprise engagement."],
    firstSeenCh: 369,
    revealCh: 413,
    uses: [
      {
        ch: 370,
        note: "His user-and-type identification talent (the ability's visible edge) already in play during the first Nen classes.",
      },
      {
        ch: 413,
        note: "Mechanics formally introduced after his confession to Benjamin.",
      },
    ],
    status: "active",
    awareCharacterIds: [{ characterId: "benjamin", sinceCh: 413 }],
    evidence: [
      {
        chapter: 413,
        note: "Named and explained on-page. How the pre-413 'telltale signs' skill maps onto Combo Master is partly interpretive.",
        confidence: "canonical",
      },
    ],
    confidence: "canonical",
  },
  {
    id: "stand-by-me",
    name: "Stand by Me",
    userCharacterId: "yushohi",
    kind: "personal",
    nenType: "unknown",
    description:
      "Yushohi's assassination ability, rated the deadliest among Benjamin's fourteen soldiers: he attaches a tiny winged 'stinger ball' to a target and, after an incubation period, the target dies by undisclosed means. Salé-salé was its confirmed kill. By ch 414 Yushohi himself judges the tracking application no longer viable.",
    activation:
      "Summon a stinger ball — an insect-sized orb with four wings and a needle — and assign it a target.",
    conditions: [
      "Incubation period before death; far longer for non-Nen-users.",
      "Deactivates if the target moves more than ~20 meters from Yushohi (without notifying him).",
      "A discovered and removed stinger ball can never target that person again.",
    ],
    effects: [
      "Delayed, deniable assassination (Salé-salé, ch 382).",
      "The ball's buzz is audible only to Nen users — doubling as a user-detection test.",
    ],
    weaknesses: [
      "Yushohi's wide En leaves him defenseless inside it: he cannot combine En with Gyo, so anyone entering it is a lethal risk (self-assessed, ch 414).",
      "Kurapika's classes keep minting new Nen users, making a stealth attachment to a guarded prince practically impossible — he deems the stinger application dead for this contest.",
    ],
    firstSeenCh: 381,
    revealCh: 381,
    uses: [
      {
        ch: 381,
        note: "Stinger ball attached to Fugetsu during the surveillance handoff.",
      },
      { ch: 382, note: "Salé-salé assassinated; Yushohi radios Benjamin." },
      {
        ch: 414,
        note: "Yushohi audits his own kit outside Room 1009 and retires the stinger-ball application as no longer viable.",
      },
    ],
    status: "active",
    awareCharacterIds: [
      { characterId: "benjamin", sinceCh: 381 },
      { characterId: "balsamilco", sinceCh: 381 },
    ],
    evidence: [
      {
        chapter: 382,
        note: "Salé-salé's death confirmed by Yushohi's own report.",
        confidence: "canonical",
      },
      {
        chapter: 414,
        note: "En/Gyo incompatibility and stinger retirement from Yushohi's internal monologue.",
        confidence: "canonical",
      },
    ],
    confidence: "canonical",
  },
  {
    id: "muteking",
    name: "Muteking the Invincible Hero",
    userCharacterId: "chiyamasi",
    kind: "personal",
    nenType: "manipulator",
    description:
      "Chiyamasi's touch-charged invincibility: by maintaining contact with a voluntary target, he banks time — and the target then becomes invulnerable for exactly as long as the contact lasted. Used to breach Room 1009 at the start of Special Martial Law.",
    activation:
      "Sustained physical contact with a consenting target; invincibility runs once contact ends.",
    conditions: [
      "Target must be voluntary.",
      "Invincibility duration equals accumulated contact time.",
    ],
    cost: "After invincibility ends, the target suffers forced Zetsu for 100× the invincible duration, then takes recoil damage equal to a third of what was nullified.",
    effects: ["Temporary total invulnerability for an ally."],
    weaknesses: [
      "Brutal aftermath: the protected ally becomes a defenseless liability for far longer than they were invincible.",
    ],
    firstSeenCh: 413,
    revealCh: 414,
    uses: [
      {
        ch: 414,
        note: "Charges Yushohi with invincibility outside Room 1009; Yushohi accepts he may die once it lapses.",
      },
    ],
    status: "active",
    awareCharacterIds: [
      { characterId: "benjamin", sinceCh: 413 },
      { characterId: "yushohi", sinceCh: 414 },
    ],
    evidence: [
      {
        chapter: 414,
        note: "Mechanics and costs laid out during the Room 1009 breach.",
        confidence: "canonical",
      },
    ],
    confidence: "canonical",
  },

  // ── Contracts & curses ───────────────────────────────────────────────
  {
    id: "moonlight-act",
    name: "Transparent Words: Moonlight Act",
    userCharacterId: "longhi",
    kind: "personal",
    nenType: "manipulator",
    description:
      "Longhi's contract engine: a conditional Manipulation ability that binds voluntary signatories to written terms, rewarding compliance and punishing breach. Its vow — she must explain everything truthfully and in advance — makes her the rare negotiator whose fine print can be trusted. By ch 414 Bill floats it as the trap that could bind Beyond Netero himself.",
    activation:
      "Longhi produces an aura pen and paper; the counterparty signs of their own free will after full disclosure.",
    conditions: [
      "Signature must be voluntary — an absolute condition.",
      "Longhi must explain every term truthfully and without deceit before signing.",
    ],
    restrictions: [
      "She may never arbitrarily interpret a counterparty's actions as breach.",
    ],
    effects: [
      "Enforceable penalties (the Woble–Tubeppa pact's breach penalty: one week of forced Zetsu).",
      "Rewards on fulfillment (Kurapika's reward: one loaned use of Moonlight Act itself).",
      "Can loan the ability and restrict signatories' actions per the contract text.",
    ],
    weaknesses: ["Everything hinges on the counterparty agreeing to sign."],
    firstSeenCh: 400,
    revealCh: 401,
    uses: [
      {
        ch: 401,
        note: "The Woble–Tubeppa non-aggression contract signed by Kurapika, with the find-Beyond's-child condition attached.",
      },
      {
        ch: 414,
        note: "Bill proposes using Moonlight Act to trap Beyond in a binding contract during any negotiation over the curse.",
      },
    ],
    status: "active",
    awareCharacterIds: [
      { characterId: "kurapika", sinceCh: 401 },
      { characterId: "bill", sinceCh: 401 },
      { characterId: "oito", sinceCh: 401 },
    ],
    evidence: [
      {
        chapter: 401,
        note: "Full disclosure of mechanics, vow, and contract terms on-page.",
        confidence: "canonical",
      },
    ],
    confidence: "canonical",
  },
  {
    id: "beyond-curse",
    name: "Beyond's Sacrificial Curse (unnamed)",
    userCharacterId: "beyond",
    kind: "curse",
    nenType: "unknown",
    description:
      "A generational Nen attack: Beyond fathered children through sham marriages in the Kakin officer corps and marked them at birth as 'curse sacrifices'. Each mark — an eye-shaped seal, Longhi's and Furykov's under the tongue — awakened the child to Nen from birth and primes a lethal curse that activates on the bearer's death, aimed at a target set when the curse was placed. Ten 'strong' sacrifices are known to exist; targets and full rules remain unknown.",
    activation:
      "Triggers upon the cursed child's death; per Unma, Beyond can cause a child's death at any time to fire it.",
    conditions: [
      "Mark is visible only under Gyo.",
      "Cannot be purged by burning or excising the marked flesh (per the Nen user who examined Longhi).",
    ],
    effects: [
      "Curses a predetermined target to death on the sacrifice's demise.",
      "Side effect: bearers use Ten and Zetsu instinctively from birth.",
      "Furykov fears his curse could destroy a Guardian Spirit Beast's ability — or be reflected back onto himself (ch 413).",
    ],
    weaknesses: [
      "Exorcism remains a theoretical counter; no exorcist confirmed aboard.",
      "Reflection: Furykov plans to have Benjamin's death bounce the curse back at him.",
    ],
    firstSeenCh: 401,
    revealCh: 401,
    uses: [
      {
        ch: 413,
        note: "Furykov reveals his own eye-mark and Unma's 48-hour TSK-17 ultimatum backed by curse activation.",
      },
    ],
    status: "active",
    affectedCharacterIds: ["furykov", "beyond"],
    awareCharacterIds: [
      { characterId: "longhi", sinceCh: 401 },
      { characterId: "kurapika", sinceCh: 401 },
      { characterId: "bill", sinceCh: 401 },
      { characterId: "oito", sinceCh: 401 },
      { characterId: "furykov", sinceCh: 413 },
      { characterId: "benjamin", sinceCh: 413 },
      { characterId: "unma", sinceCh: 413 },
    ],
    mysteryIds: ["my-beyond-curse-targets"],
    evidence: [
      {
        chapter: 401,
        note: "Longhi's testimony and her own tongue-mark shown under Gyo.",
        confidence: "canonical",
      },
      {
        chapter: 413,
        note: "Furykov's mark, the destroy-a-beast fear, and the reflection gambit stated on-page; the curse's actual targets remain unconfirmed.",
        confidence: "canonical",
      },
    ],
    confidence: "strong-inference",
  },
];

/** One record per prince whose beast has been meaningfully observed. */
export const beasts: GuardianBeast[] = [
  {
    id: "beast-benjamin",
    princeId: "prince-benjamin",
    abilityId: "ab-beast-benjamin",
    appearance:
      "Silhouette among the manifested beasts; form undescribed in detail.",
    behaviorNote: "No documented action.",
    firstSeenCh: 361,
    status: "unknown",
    confidence: "unknown",
  },
  {
    id: "beast-camilla",
    princeId: "prince-camilla",
    abilityId: "ab-beast-camilla",
    appearance: "Undescribed in reliable detail.",
    behaviorNote:
      "Coercively manipulates people once unspecified conditions are met — distinct from her personal revival counter.",
    firstSeenCh: 361,
    status: "active",
    confidence: "strong-inference",
  },
  {
    id: "beast-zhang-lei",
    princeId: "prince-zhang-lei",
    abilityId: "ab-beast-zhang-lei",
    appearance: "A regal, robed figure attending the Third Prince.",
    behaviorNote: "Produces coins through the prince; placid otherwise.",
    firstSeenCh: 366,
    status: "active",
    confidence: "strong-inference",
  },
  {
    id: "beast-tserriednich",
    princeId: "prince-tserriednich",
    abilityId: "ab-beast-tserriednich",
    appearance:
      "A towering many-faced idol, among the most unsettling manifestations recorded.",
    behaviorNote:
      "Looms over the prince's Nen development; interaction with his awakening suspected.",
    firstSeenCh: 376,
    status: "active",
    confidence: "weak-inference",
  },
  {
    id: "beast-tubeppa",
    princeId: "prince-tubeppa",
    abilityId: "ab-beast-tubeppa",
    appearance: "Glimpsed in outline; a many-limbed apparatus.",
    behaviorNote:
      "Produces drugs within its body with the help of a partner (per the class-arc beast overviews).",
    firstSeenCh: 361,
    status: "active",
    confidence: "strong-inference",
  },
  {
    id: "beast-tyson",
    princeId: "prince-tyson",
    abilityId: "ab-beast-tyson",
    appearance: "An ornate winged figure associated with her gospel.",
    behaviorNote: "Appears to act on the Book of Tyson's readers.",
    firstSeenCh: 366,
    status: "active",
    confidence: "weak-inference",
  },
  {
    id: "beast-luzurus",
    princeId: "prince-luzurus",
    abilityId: "ab-beast-luzurus",
    appearance: "Rarely shown directly.",
    behaviorNote:
      "Sets manipulation traps shaped like its targets' desires (per the class-arc beast overviews).",
    firstSeenCh: 361,
    status: "active",
    confidence: "strong-inference",
  },
  {
    id: "beast-salele",
    princeId: "prince-salele",
    abilityId: "ab-beast-salele",
    appearance: "A smoke-wreathed presence attending the Eighth Prince.",
    behaviorNote:
      "Its smoke bred devotion in whoever inhaled it — until Rihan's Predator ate it whole (ch 381).",
    firstSeenCh: 361,
    status: "destroyed",
    statusNote:
      "Consumed by Rihan's Predator; Salé-salé was assassinated the next day.",
    confidence: "canonical",
  },
  {
    id: "beast-halkenburg",
    princeId: "prince-halkenburg",
    abilityId: "ab-beast-halkenburg",
    appearance: "A great bird-like presence with a drawn bow.",
    behaviorNote:
      "Marks followers with seals and powers the mind-swap arrow; it kept operating after the prince's body died, because his soul did too.",
    firstSeenCh: 375,
    status: "active",
    statusNote:
      "Halkenburg's body is dead (ch 404) but his Flame of Life is unlit — soul and ability remain in play (ch 413).",
    confidence: "canonical",
  },
  {
    id: "beast-kacho",
    princeId: "prince-kacho",
    abilityId: "ab-beast-kacho",
    appearance:
      "After the prince's death: Kacho herself, indistinguishable in manner and memory.",
    behaviorNote:
      "Manifests as Kacho and guards Fugetsu at the Justice Bureau — planning, scheming, and fading as her twin weakens.",
    firstSeenCh: 381,
    status: "active",
    statusNote:
      "Post-mortem manifestation confirmed by its own testimony (ch 400); observed fading (ch 404).",
    confidence: "canonical",
  },
  {
    id: "beast-fugetsu",
    princeId: "prince-fugetsu",
    abilityId: "ab-beast-fugetsu",
    appearance: "Rarely shown directly; its doors are its signature.",
    behaviorNote:
      "Conjures paired doors between known locations at the prince's wish.",
    firstSeenCh: 370,
    status: "active",
    confidence: "canonical",
  },
  {
    id: "beast-momoze",
    princeId: "prince-momoze",
    abilityId: "ab-beast-momoze",
    appearance: "Reconstructed from testimony rather than clear depiction.",
    behaviorNote: "Worked through the prince's watchers; ceased at her death.",
    firstSeenCh: 367,
    status: "destroyed",
    statusNote: "Beasts die with their prince.",
    confidence: "weak-inference",
  },
  {
    id: "beast-marayam",
    princeId: "prince-marayam",
    abilityId: "ab-beast-marayam",
    appearance: "Serpentine, and larger every time it is seen.",
    behaviorNote:
      "Conjures the one-way duplicate of Room 1013 the household hides in; grows with the child toward an unknown ceiling.",
    firstSeenCh: 361,
    status: "active",
    confidence: "canonical",
  },
  {
    id: "beast-woble",
    princeId: "prince-woble",
    abilityId: "ab-beast-woble",
    appearance: "An amorphous cloaked mass, all drape and no face.",
    behaviorNote: "Hovers over the infant; notably non-hostile toward Oito.",
    firstSeenCh: 359,
    status: "active",
    confidence: "strong-inference",
  },
];
