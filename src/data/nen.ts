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
    revealCh: 364,
    uses: [
      {
        ch: 361,
        note: "Activated to summon Stealth Dolphin after the Steal Chain extraction from Sayird.",
      },
      {
        ch: 364,
        note: "Held active to lend Little Eye to Oito; Kurapika notes the one-hour-per-second price to himself.",
      },
      {
        ch: 368,
        note: "Twelve continuous hours covering the insect reconnaissance — ends in a nine-hour blackout for both Kurapika and Oito (ch 369).",
      },
    ],
    status: "active",
    awareCharacterIds: [
      { characterId: "bill", sinceCh: 364 },
      { characterId: "oito", sinceCh: 364 },
      { characterId: "babimyna", sinceCh: 388 },
    ],
    mysteryIds: ["my-kurapika-lifespan"],
    evidence: [
      {
        chapter: 364,
        note: "Cost quantified in Kurapika's own reasoning: one hour of lifespan per second.",
        confidence: "canonical",
      },
      {
        chapter: 369,
        note: "Overrun rule surfaces: past roughly three hours, he blacks out for around three times the excess.",
        confidence: "strong-inference",
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
      "The chain on his index finger, developed for the voyage: its syringe head drains a target's aura and extracts one of their Nen abilities, forcing a Zetsu-like state during the drain.",
    activation: "Pierce the target with the chain's syringe head.",
    conditions: [
      "No condition beyond piercing the target; the drain itself immobilizes them.",
      "The victim cannot use the stolen ability until it is returned.",
    ],
    effects: [
      "Removes a Nen ability from the target — even one about to activate.",
      "Stored ability can be lent onward (see Stealth Dolphin).",
      "Possession survives the original owner's death (Vincent's Air Blow).",
    ],
    firstSeenCh: 361,
    revealCh: 361,
    uses: [
      { ch: 361, note: "Extracts Little Eye from Sayird." },
      { ch: 364, note: "Drains Vincent and steals his ability mid-standoff." },
    ],
    status: "active",
    awareCharacterIds: [
      { characterId: "bill", sinceCh: 361 },
      { characterId: "oito", sinceCh: 361 },
    ],
    evidence: [
      {
        chapter: 361,
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
      "A dolphin-shaped Emperor Time construct that manages stolen abilities: it analyzes an equipped ability (name, functions, conditions) and can loan it to another person — even a non-user — for exactly one activation, coaching them by telepathy through a conjured earpiece.",
    activation:
      "Emperor Time active; the dolphin-cross design on Steal Chain's barrel grows into the construct.",
    conditions: [
      "A loaned ability is used once, then returns to its original owner (Sayird regained Little Eye after Oito's use, ch 369).",
      "Emperor Time cannot be ended while the dolphin holds an ability — it must be used at least once to be dismissed.",
      "Loaned abilities run on the aura Steal Chain drained from the owner, so they fire at original power.",
    ],
    cost: "Runs on Emperor Time (lifespan drain) for as long as an ability is loaded or loaned.",
    effects: [
      "Lends stolen abilities to third parties — even non-Nen users.",
      "Semi-forces a non-user's aura nodes open, effectively awakening them to Nen.",
    ],
    weaknesses: [
      "The loan chains Kurapika to Emperor Time until the recipient uses the ability.",
    ],
    firstSeenCh: 361,
    revealCh: 364,
    uses: [
      {
        ch: 364,
        note: "Loans Little Eye to Oito, opening the insect-reconnaissance channel.",
      },
    ],
    status: "active",
    awareCharacterIds: [
      { characterId: "oito", sinceCh: 364 },
      { characterId: "bill", sinceCh: 364 },
    ],
    evidence: [
      {
        chapter: 364,
        note: "Loan mechanics shown during the transfer to Oito.",
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
    nenType: "emitter",
    description:
      "Sayird's reconnaissance ability (Emission with a Manipulation component): launch an aura ball at a small creature to capture and pilot it, seeing and hearing everything it does. Stolen by Kurapika's Steal Chain and loaned to Oito; after her single use ended, the ability returned to Sayird.",
    activation: "Launch an aura ball at a small living creature.",
    conditions: [
      "Host must be a living creature no larger than a hamster.",
      "Cannot be used on beings conjured from aura.",
      "Consumes so little aura that a novice can sustain it for hours; it survives even the user passing out.",
    ],
    effects: [
      "Remote reconnaissance through the host's senses.",
      "The controlled animal retains the user's ability to see aura.",
    ],
    weaknesses: [
      "Host fragility — flies and roaches have many predators.",
      "Fast animals are hard to capture in the first place.",
    ],
    firstSeenCh: 361,
    revealCh: 361,
    uses: [
      { ch: 361, note: "Stolen from Sayird by Steal Chain." },
      { ch: 364, note: "Loaned to Oito; first flown on an inconspicuous fly." },
      {
        ch: 368,
        note: "Oito's cockroach sweep of the royal suites — she witnesses Momoze's murder as it happens.",
      },
    ],
    status: "active",
    awareCharacterIds: [
      { characterId: "kurapika", sinceCh: 361 },
      { characterId: "bill", sinceCh: 361 },
      { characterId: "oito", sinceCh: 364 },
    ],
    evidence: [
      {
        chapter: 361,
        note: "Mechanics explained by Bill during the steal.",
        confidence: "canonical",
      },
      {
        chapter: 369,
        note: "Ability returns to Sayird after Oito's completed use.",
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
    nenType: "unknown",
    description:
      "Benjamin inherits the Nen ability of any sworn subordinate who dies — each loyal death passes its owner's power up the chain of command. Four stars on his right palm, one under each finger, mark the inherited slots and read as a life-sign monitor; whether he can hold more than four abilities is unconfirmed. Its Nen type is unconfirmed but resembles Specialization.",
    activation: "Automatic on a sworn soldier's death.",
    conditions: [
      "The soldier must have graduated Kakin's Royal Military Academy and serve in Benjamin's private army, sworn to him.",
      "Inheritance works even if the ability was active — or stolen — at the moment of death (Vincent's Air Blow, taken by Kurapika, still registered).",
    ],
    effects: [
      "Permanent acquisition of dead subordinates' abilities (Vincent's Air Blow and Musse's Secret Window confirmed by ch 373; Shikaku's Culdcept by ch 389).",
      "The palm stars double as a life-sign monitor for the sworn roster.",
    ],
    weaknesses: [
      "Growth requires his own people to die — a strategic moral hazard.",
      "It is unclear whether the four stars cap how many abilities he can hold.",
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
    name: "Cat's Name",
    userCharacterId: "camilla",
    kind: "personal",
    nenType: "specialist",
    description:
      "Camilla's counteractive-type ability: when she is killed, a giant cat manifests behind her killer, crushes them in its paws, and extracts their life force — the tip of its tail glows white and pours the essence into Camilla's mouth, healing and resurrecting her. Dying is her opening move; it draws on post-mortem Nen for power.",
    activation: "Automatic upon Camilla's death at another's hands.",
    conditions: [
      "She must actually be killed by an aggressor.",
      "She courted death in Zetsu — whether Zetsu is required for the trigger, or merely made being killed easier, is unresolved.",
    ],
    effects: [
      "Kills her killer (Musse crushed on-page, ch 373).",
      "Restores Camilla using the killer's remaining life.",
    ],
    weaknesses: [
      "Useless against detention, starvation, or anything short of murder — she cannot negate damage without dying.",
      "Benjamin now knows she is a counteractive type (via the leveled-up Secret Window) and plans around triggering it, ch 413.",
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
      { characterId: "furykov", sinceCh: 373 },
      { characterId: "balsamilco", sinceCh: 389 },
      { characterId: "benjamin", sinceCh: 413 },
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
    name: "Contagion",
    userCharacterId: "morena",
    kind: "personal",
    nenType: "unknown",
    description:
      "Morena's 'game' (lit. 'Etude of Love'): as 'Member Zero' she infects up to 22 people through her saliva. Members level up by killing — a civilian is worth 1 level, a Nen user 10, a prince 50 — manifest a bespoke ability at level 20, and at level 100 become a Member Zero able to found their own community. Morena herself sits at level 45 and believes the ability is an advanced hybrid of the other Nen categories. Her recruitment card game is itself part of the ability, with an anti-cheat clause that strips a cheater's choices to Yes or No.",
    activation:
      "Three conditions, in any order: her negotiation card game ends with 'Yes' as the recruit's last card; Morena kisses the recruit; the recruit witnesses Morena or an ally commit murder.",
    conditions: [
      "Cap of 22 concurrent members plus Morena.",
      "Until all three joining conditions clear, a kissed target is level 0 and gains nothing.",
      "Morena always knows each member's level, points, location, and status.",
      "Effects persist until the target or Morena dies — or, per her app metaphor, until the 'game' is cleared.",
    ],
    restrictions: [
      "The card game is a vow-backed limitation: she stakes disclosure of Contagion's workings against the player's stake of their life.",
    ],
    effects: [
      "Mass-produces empowered killers with bespoke abilities.",
      "Recipients' aura grows with every level gained by murder.",
      "Cheaters in the recruitment game are locked to Yes/No answers (Borksen, ch 410).",
    ],
    weaknesses: [
      "Individually, fresh recipients are weak.",
      "The network dies with its nodes' exposure.",
    ],
    firstSeenCh: 378,
    revealCh: 378,
    uses: [
      {
        ch: 378,
        note: "Morena briefs her 22 followers: level values announced, havoc unleashed on the lower tiers.",
      },
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
        chapter: 378,
        note: "Name and leveling rules stated on-page at the Heil-Ly gathering.",
        confidence: "canonical",
      },
      {
        chapter: 410,
        note: "Dealer/22-member structure, three joining conditions, and anti-cheat clause explained by Morena herself.",
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
      "The ability behind the Room 1014 killings (lit. 'They Were Eleven!'): the user operates a marionette visible only to themselves and their current puppet, possesses one of the ten people within its range, and conjures four many-mouthed snakes that riddle the victim with holes and drain their blood — 44 seconds for one snake, eleven for all four. The true user has never been identified on-page.",
    activation:
      "The marionette selects a host from the ten people within range; the snakes strike when attention is drawn elsewhere.",
    conditions: [
      "Only the user and the possessed can see the marionette.",
      "Targets must be among the ten within the marionette's range.",
      "If the marionette is deactivated without killing anyone, the 'curse' rebounds onto the user — a risk that powers the ability.",
    ],
    effects: [
      "Deniable remote assassination through possessed intermediaries.",
      "The conjured snakes are visible to everyone — a deliberate risk-for-power trade (Bill's analysis, ch 371).",
    ],
    weaknesses: [
      "Deactivating mid-operation without a kill rebounds on the user.",
      "Kurapika reads it as visually-directed remote control — Conjuration plus Manipulation (ch 376).",
    ],
    firstSeenCh: 359,
    revealCh: 370,
    uses: [
      {
        ch: 359,
        note: "Five of Woble's guards, Woody among them, drained on the first night — attributed by the identical method.",
      },
      {
        ch: 370,
        note: "Barrigen drained mid-class through the possessed Loberry; the marionette and snakes shown from the user's own point of view.",
      },
      {
        ch: 376,
        note: "Myuhan killed; the 'snake charmer' remains active deep into the voyage — user unidentified as of ch 414.",
      },
    ],
    status: "unknown",
    mysteryIds: ["my-silent-majority-user"],
    evidence: [
      {
        chapter: 370,
        note: "Marionette, ten-in-range rule, rebound clause, and snake timings all shown from the user's POV.",
        confidence: "canonical",
      },
      {
        chapter: 370,
        note: "User identity: never shown; attribution remains open.",
        confidence: "unknown",
      },
    ],
    confidence: "canonical",
  },

  // ── Pre-arc reference files ──────────────────────────────────────────
  {
    id: "skill-hunter",
    name: "Skill Hunter",
    userCharacterId: "chrollo",
    kind: "personal",
    nenType: "specialist",
    description:
      "Chrollo's book, Bandit's Secret: he steals others' abilities under strict conditions and uses them from its pages. The Heavens Arena duel added Double Face — a bookmark of his own design that keeps a marked page's ability live with the book closed, freeing both hands and even running two stolen abilities at once, at the price of extra conditions.",
    activation:
      "Conjure Bandit's Secret; open to the desired page (or hold it via the Double Face bookmark).",
    conditions: [
      "Theft: see the ability used.",
      "Theft: ask about it and receive answers.",
      "Theft: target's palm on the cover.",
      "Theft: all within one hour.",
      "Use: the book must be open to the ability's page — unless Double Face bookmarks it (ch 351).",
    ],
    restrictions: [
      "A stolen ability vanishes from the book when its original owner dies — unless post-mortem-strengthened Nen keeps it there, as with The Sun and Moon (ch 352).",
      "The original owner loses the stolen ability while Chrollo holds it.",
      "Only one Double Face bookmark exists; using it layers additional (unstated) conditions onto the ability.",
    ],
    effects: [
      "Permanent theft while the original owner lives (varies by later refinements).",
      "With Double Face: book-free combat and two stolen abilities running simultaneously.",
    ],
    firstSeenCh: 0,
    revealCh: 0,
    uses: [
      {
        ch: 351,
        note: "Heavens Arena duel opens: Black Voice antennae in the judge, then The Sun and Moon — Double Face revealed as the enabler for two-handed and paired abilities.",
      },
      {
        ch: 352,
        note: "The full duel arsenal laid out for Hisoka: Order Stamp, Gallery Fake, Convert Hands — plus the rule that owner-death erases a page, and the Sun and Moon exception.",
      },
      {
        ch: 355,
        note: "The combo at scale: Gallery Fake copies, sun-marked via Double Face, commanded through Order Stamp, detonated on a Black Voice puppet's touch — hundreds of expendable bombs.",
      },
      {
        ch: 377,
        note: "Shizuku's fortune request fails: Neon's page has vanished from the book — first evidence her owner is dead.",
      },
    ],
    status: "active",
    awareCharacterIds: [{ characterId: "hisoka", sinceCh: 0 }],
    evidence: [
      { chapter: 0, note: "Established pre-arc.", confidence: "canonical" },
      {
        chapter: 351,
        note: "Double Face bookmark shown and explained by Chrollo himself mid-duel.",
        confidence: "canonical",
      },
      {
        chapter: 352,
        note: "Owner-death page loss and the post-mortem exception stated by Chrollo.",
        confidence: "canonical",
      },
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
      "Hisoka's aura with the properties of both rubber and gum — attachment, elasticity, and every murderous application in between. The Heavens Arena duel added its most extreme entry: instructed before death to restart his heart and lungs, it revived him as post-mortem Nen (ch 357).",
    effects: [
      "Adhesive/elastic aura attachable to targets.",
      "Concealable with Texture Surprise.",
      "Programmable: accepted a standing order — issued while dying — to pump his heart and lungs after death, and executed it (ch 357).",
      "Field surgery: seals wounds and forms rubber prostheses for lost limbs (ch 357).",
    ],
    firstSeenCh: 0,
    revealCh: 0,
    uses: [
      {
        ch: 351,
        note: "Duel opener: gum from his own foot to the manipulated judge's chest, reeling the puppet in as a projectile.",
      },
      {
        ch: 353,
        note: "Severed puppet heads on gum lines — one from the left hand, one from the left leg — the second catches Chrollo in the face.",
      },
      {
        ch: 354,
        note: "Gum pre-laid on audience members' backs launches them at Chrollo; a leg-line catch slams the 'Chrollo' decoy to the floor.",
      },
      {
        ch: 355,
        note: "Five puppets on five finger-strands swung as a human hammer against the marked horde.",
      },
      {
        ch: 357,
        note: "The revival: pre-death instruction pumps his heart and lungs back to life; then gum stops the bleeding, builds a left hand and right leg, and pins Machi for the war declaration.",
      },
    ],
    status: "active",
    awareCharacterIds: [
      { characterId: "chrollo", sinceCh: 0 },
      { characterId: "machi", sinceCh: 0 },
    ],
    evidence: [
      { chapter: 0, note: "Established pre-arc.", confidence: "canonical" },
      {
        chapter: 357,
        note: "Post-mortem revival shown on-page in flashback: Hisoka addresses Bungee Gum by name and orders it to bring him back.",
        confidence: "canonical",
      },
    ],
    confidence: "canonical",
  },
  {
    id: "texture-surprise",
    name: "Texture Surprise",
    userCharacterId: "hisoka",
    kind: "personal",
    nenType: "conjurer",
    description:
      "Aura applied to any smooth, flat surface — paper, cloth, skin, even pure Bungee Gum — manifesting false imagery: over a thousand textures, undetectable by sight, touch, or aura perception, and visible even to non-Nen users. Hisoka's disguise, forgery, and wound-concealment kit.",
    activation: "Apply aura to a flat surface and impress the false texture.",
    restrictions: [
      "Surface must be smooth and flat.",
      "A texture whose feel mismatches the underlying surface can be exposed by touch.",
    ],
    effects: [
      "Visual forgery of surfaces and writing.",
      "Conceals wounds and alters his own appearance — layered over Bungee Gum prostheses after the duel (ch 357).",
      "No detectable aura while active; works on non-Nen observers.",
    ],
    firstSeenCh: 0,
    revealCh: 0,
    uses: [
      {
        ch: 357,
        note: "Post-revival reconstruction: recreates the flesh blown off his face and skins the Bungee Gum prostheses standing in for his left hand and right leg.",
      },
      {
        ch: 359,
        note: "Presumed working disguise aboard the Black Whale — every sweep for a 190 cm magician has failed since boarding.",
      },
    ],
    status: "active",
    awareCharacterIds: [{ characterId: "machi", sinceCh: 357 }],
    evidence: [
      {
        chapter: 0,
        note: "Established pre-arc (Kastro fight, Yorknew prophecy forgeries).",
        confidence: "canonical",
      },
      {
        chapter: 357,
        note: "On-page: applied over Bungee Gum to rebuild his face and limbs.",
        confidence: "canonical",
      },
    ],
    confidence: "canonical",
  },
  {
    id: "gallery-fake",
    name: "Gallery Fake",
    userCharacterId: "kortopi",
    kind: "personal",
    nenType: "conjurer",
    description:
      "Kortopi's copier ('Divine Left Hand, Demonic Right Hand'): touch an object with the left hand, conjure an exact replica with the right. Living things replicate as lifeless bodies; copies last 24 hours and can be tracked through the originals like En. In the Heavens Arena duel Chrollo ran it borrowed through Skill Hunter, mass-producing audience copies as Order Stamp puppets.",
    activation: "Left hand touches the original; right hand conjures the copy.",
    restrictions: [
      "Copies of living beings are inanimate (humans copy as corpses).",
      "Conjured objects can be copied in form but not in effect.",
      "Copies vanish after 24 hours — unless protected by a Sun and Moon mark's post-mortem Nen (ch 354).",
    ],
    effects: [
      "Exact physical replicas of touched objects, at a copy every couple of seconds.",
      "Original-to-copy tracking (En-like) while copies persist.",
      "Duel combo: copies of spectators and the dead judge served as Order Stamp puppet stock — 200+ at once.",
    ],
    firstSeenCh: 0,
    revealCh: 0,
    uses: [
      {
        ch: 352,
        note: "Chrollo (borrowed via Skill Hunter) copies the dead judge to demonstrate that Order Stamp moves a copy even though it cannot move a corpse.",
      },
      {
        ch: 353,
        note: "A crowd of ~30 spectator copies, bookmarked via Double Face, charges Hisoka under Order Stamp's 'break Hisoka'.",
      },
      {
        ch: 355,
        note: "Production line at full tilt: hundreds of sun-marked copies flood the arena as expendable bombs.",
      },
    ],
    status: "inactive",
    awareCharacterIds: [
      { characterId: "chrollo", sinceCh: 0 },
      { characterId: "hisoka", sinceCh: 0 },
    ],
    evidence: [
      {
        chapter: 0,
        note: "Mechanics (copying, 24-hour limit, tracking) established pre-arc in Yorknew.",
        confidence: "canonical",
      },
      {
        chapter: 352,
        note: "Kortopi lent it to Chrollo for the duel — named on-page as Kortopi's ability.",
        confidence: "canonical",
      },
      {
        chapter: 357,
        note: "Kortopi killed by Hisoka; the page presumably vanished from Bandit's Secret per the owner-death rule.",
        confidence: "strong-inference",
      },
    ],
    confidence: "canonical",
  },
  {
    id: "black-voice",
    name: "Black Voice",
    userCharacterId: "shalnark",
    kind: "personal",
    nenType: "manipulator",
    description:
      "Shalnark's 'Mobile Fate Director': plant a physical antenna in a target and puppet them totally through a phone — direct control, spoken orders, or autopilot. Two targets at once, one of whom can be Shalnark himself (his berserk self-manipulation mode). Chrollo borrowed it for the Heavens Arena duel, phone and all.",
    activation:
      "Stick an antenna into the target (usually the neck); operate via the paired phone.",
    conditions: [
      "The antennae are real, finite objects — losable, reelable, and limited to two.",
      "Control lasts until the antenna is removed or the target dies.",
    ],
    effects: [
      "Total mind-and-body control of up to two antennaed targets.",
      "Voice commands through the phone reach puppets remotely.",
      "Self-use ('autopilot') trades memory and days of muscle pain for a massive combat boost — and blocks rival Manipulators.",
    ],
    weaknesses: [
      "Antenna supply: Chrollo ended the duel with both spent (ch 357).",
      "A visible antenna warns anyone who knows the ability.",
    ],
    firstSeenCh: 0,
    revealCh: 0,
    uses: [
      {
        ch: 351,
        note: "Chrollo (borrowed) opens the duel with it: antenna in the judge, second antenna held as a feint that keeps Hisoka guessing at every approach.",
      },
      {
        ch: 354,
        note: "A spectator converted into a Chrollo lookalike and puppeted as bait — Hisoka 'kills' the decoy.",
      },
      {
        ch: 355,
        note: "An antennaed announcer relays 'break Hisoka' arena-wide; a squatting puppet's 'now' touches sun to moon and detonates the severed head in Hisoka's hand.",
      },
    ],
    status: "inactive",
    awareCharacterIds: [
      { characterId: "chrollo", sinceCh: 0 },
      { characterId: "hisoka", sinceCh: 351 },
    ],
    evidence: [
      {
        chapter: 351,
        note: "Named and demonstrated by Chrollo mid-duel as Shalnark's ability.",
        confidence: "canonical",
      },
      {
        chapter: 352,
        note: "Two-at-a-time limit stated in Chrollo's own comparison with Order Stamp.",
        confidence: "canonical",
      },
      {
        chapter: 357,
        note: "Shalnark killed by Hisoka before the phone could be returned; the page presumably vanished from the book.",
        confidence: "strong-inference",
      },
    ],
    confidence: "canonical",
  },
  {
    id: "sun-and-moon",
    name: "The Sun and Moon",
    userCharacterId: "chrollo",
    kind: "borrowed",
    nenType: "unknown",
    description:
      "Stolen from Meteor City's late elder ('Paired Destruction'): a sun-plus mark on Chrollo's left palm, a moon-minus on his right. Marked targets become bombs — the two symbols detonate on contact. Because the elder's Nen intensified after his death, the ability survives in Bandit's Secret against Skill Hunter's owner-death rule, and its marks are indelible until they explode.",
    activation:
      "Touch the target with either palm to impress its mark; detonation when a sun mark meets a moon mark.",
    conditions: [
      "Instant touch leaves a weak mark (small blast); a full-power bomb needs 3–5 seconds of contact — chargeable even after application by further touch.",
      "Both marks must touch to detonate.",
    ],
    restrictions: [
      "Marks cannot be removed — they persist until detonation, book open or closed.",
      "Two-handed use normally conflicts with holding the book; Double Face (or bookmarking the other ability and marking one-handed) is the workaround.",
    ],
    effects: [
      "Turns people, corpses, and Nen copies into contact-triggered bombs; a full charge kills bystanders, not just the bearer.",
      "Post-mortem protection transfers: a Gallery Fake copy bearing a mark does not vanish when the copy ability deactivates (ch 354) — the loophole that beat Hisoka's deductions.",
      "A marked body stays a bomb even in pieces: the severed head Hisoka carried took his fingers (ch 355), the body it came from took his leg (ch 356).",
    ],
    firstSeenCh: 351,
    revealCh: 351,
    uses: [
      {
        ch: 351,
        note: "Debut: the judge's hand and back marked mid-melee; first small blast startles Hisoka off the corpse.",
      },
      {
        ch: 353,
        note: "Sun marks stamped across the Gallery Fake crowd — every puppet chasing Hisoka is also a bomb.",
      },
      {
        ch: 355,
        note: "The severed head in Hisoka's left hand detonates on a Black Voice puppet's touch, destroying four fingers.",
      },
      {
        ch: 356,
        note: "Maximum-power body bomb takes Hisoka's right lower leg; self-destruct orders to the swarm bury him in explosions.",
      },
    ],
    status: "active",
    awareCharacterIds: [{ characterId: "hisoka", sinceCh: 351 }],
    evidence: [
      {
        chapter: 351,
        note: "Mechanics — plus/minus palms, instant vs 3–5 second charge — explained by Chrollo on-page.",
        confidence: "canonical",
      },
      {
        chapter: 352,
        note: "Origin (Meteor City's elder, message-bombs against outsiders) and the post-mortem retention rule stated.",
        confidence: "canonical",
      },
      {
        chapter: 354,
        note: "Marked copies persist beyond Gallery Fake's deactivation — post-death Nen overriding another ability's restriction.",
        confidence: "canonical",
      },
    ],
    confidence: "canonical",
  },
  {
    id: "order-stamp",
    name: "Order Stamp",
    userCharacterId: "chrollo",
    kind: "borrowed",
    nenType: "manipulator",
    description:
      "Stolen ability ('Proof of Humanity'): a conjured stamp bearing the kanji for 'person' that, pressed to a puppet's forehead, binds it to spoken commands. A 'puppet' is any lifeless object with its head attached — which excludes corpses (the original owner refused to see them as objects) but not Nen copies of corpses, the loophole Chrollo built the duel around.",
    activation:
      "Stamp the puppet's forehead; issue vocal commands (relayable through Black Voice).",
    conditions: [
      "Target must be lifeless with its head attached: beheading a puppet ends its stamp.",
      "Corpses cannot be controlled; Gallery Fake copies of corpses can.",
      "Commands must stay simple; copies of people can balk at orders against the original's nature — 'break' works where 'kill' fails.",
    ],
    effects: [
      "Mass control: 200+ stamped puppets at once, versus Black Voice's total-control-of-two.",
      "Puppets ordered to 'break Hisoka' single-mindedly attempt decapitation.",
    ],
    weaknesses: [
      "Simple-command ceiling; no fine control.",
      "Decapitation frees a puppet — Hisoka farmed the horde for weapons.",
    ],
    firstSeenCh: 352,
    revealCh: 352,
    uses: [
      {
        ch: 352,
        note: "Demonstrated on a Gallery Fake copy of the dead judge — Chrollo narrates the corpse/copy distinction and the 'break' workaround.",
      },
      {
        ch: 353,
        note: "The first stamped crowd of ~30 copies hunts Hisoka through the stands.",
      },
      {
        ch: 356,
        note: "Swarm directives: puppets ordered to find Hisoka on the second floor and self-destruct beside him.",
      },
    ],
    status: "active",
    awareCharacterIds: [{ characterId: "hisoka", sinceCh: 352 }],
    evidence: [
      {
        chapter: 352,
        note: "Full mechanics, including the original owner's corpse/puppet distinction, explained by Chrollo.",
        confidence: "canonical",
      },
      {
        chapter: 355,
        note: "Scale demonstrated: hundreds of stamped copies under coordinated orders.",
        confidence: "canonical",
      },
    ],
    confidence: "canonical",
  },

  // ── Guardian Spirit Beast abilities ──────────────────────────────────
  {
    id: "ab-beast-woble",
    name: "Woble's Beast (unconfirmed)",
    userCharacterId: "woble",
    kind: "guardian-beast",
    nenType: "unknown",
    description:
      "The great open question of Room 1014: Kurapika sensed aura rising from the cradle on Day 1 (ch 358), but no beast has ever clearly shown itself or acted. After the swap revelation (ch 412) even its existence is in doubt — the real Woble fed the Seed Urn but is off-ship; the boy aboard never did.",
    effects: ["Unknown; never demonstrated on-page."],
    firstSeenCh: 358,
    revealCh: 358,
    status: "unknown",
    mysteryIds: ["my-woble-beast-ability"],
    evidence: [
      {
        chapter: 358,
        note: "Aura surge sensed from the cradle by Kurapika; nothing visible.",
        confidence: "canonical",
      },
      {
        chapter: 412,
        note: "Neither swapped infant completed the full rite — whether a beast attached at all is unknown.",
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
    firstSeenCh: 360,
    revealCh: 375,
    uses: [
      {
        ch: 373,
        note: "Hanzo enters Room 1013 and finds Marayam gone — the household has been inside the duplicate.",
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
        chapter: 372,
        note: "Accelerated defensive growth noted by Biscuit and Hanzo after Momoze's death.",
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
    nenType: "unknown",
    description:
      "A symbiotic teleportation ability (lit. 'Secret Door'): the beast exists as a wormhole. An 'Outgoing Door' — a copy of the twins' childhood playground entrance — opens onto a tunnel to a wished-for location; the 'Door of Return' originally answered to Kacho alone. Baseline was one door per day, each use visibly draining Fugetsu; her late-voyage 'unlimited' use, and the bug-bite mark found on her shoulder blade, are suspected enemy interference.",
    activation:
      "Fugetsu wishes for a destination and the Outgoing Door appears; she crawls through the tunnel and emerges from a hatch.",
    conditions: [
      "Baseline of one door per day — Fugetsu's own working theory by ch 376.",
      "The Outgoing Door closes when Fugetsu enters the tunnel; the Door of Return when her companion does — others may pass while a door stands open (ch 402 recap).",
      "Wishing for a location outside the ship produces no door (tested, ch 402).",
      "The Door of Return originally opened only where Kacho chose, and only Kacho could open it (ch 383).",
    ],
    effects: [
      "Point-to-point travel between decks and sealed sections — the only unrestricted movement aboard.",
      "Post-'breakthrough' (ch 400): usable many times a day, and the return door appears even when she travels alone — possibly empowered by Kacho's death, possibly enemy work.",
    ],
    weaknesses: [
      "The space beyond the doors is not guaranteed safe — see Kacho's death.",
      "Overuse is wasting her: evil spirits gather on her Zetsu-weak aura (ch 400–402).",
    ],
    firstSeenCh: 374,
    revealCh: 383,
    status: "active",
    awareCharacterIds: [
      { characterId: "kacho", sinceCh: 374 },
      { characterId: "melody", sinceCh: 377 },
      { characterId: "yushohi", sinceCh: 381 },
      { characterId: "rihan", sinceCh: 381 },
      { characterId: "kaiser", sinceCh: 400 },
    ],
    mysteryIds: ["my-fugetsu-door-limits"],
    evidence: [
      {
        chapter: 374,
        note: "First door: a tunnel from Fugetsu's room ending at Kacho's bed.",
        confidence: "canonical",
      },
      {
        chapter: 383,
        note: "Named on-page; twin-cooperative mechanics (Fugetsu out, Kacho back) explained.",
        confidence: "canonical",
      },
      {
        chapter: 402,
        note: "Door-closing rules, the no-exit-from-ship test, and the suspect shoulder mark laid out at the Justice Bureau.",
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
    nenType: "enhancer",
    description:
      "Halkenburg's group ability, made possible by his Guardian Spirit Beast — an Enhancer with a symbiotic 'party form' that also solicits: it marks people's left hands with a conjured pinion feather, knocking them out and editing the memory of it. Marked followers are half-awakened to Nen, and their pooled aura powers a great bow whose arrow forces a mind swap — one marked follower is chosen and switches souls with whoever the arrow strikes. Halkenburg has methodically mapped its rules through experiments (Shikaku/Sumidori, Vict) and now runs it as a soul-warfare system — his own body's death did not end him.",
    activation:
      "Halkenburg draws the aura bow, powered by a group of pinion-marked followers; the arrow pierces any defense and can be aimed through walls with spotters.",
    conditions: [
      "Requires marked followers to power each shot; the pinion fades after ten minutes on anyone without loyalty to Halkenburg.",
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
        ch: 382,
        note: "First arrow, fired at Shikaku after the confrontation with Nasubi — it pierces Culdcept's card shield; Sumidori's mind takes over Shikaku's body.",
      },
      {
        ch: 386,
        note: "Shikaku/Sumidori experiment: Sumidori-in-Shikaku's-body shoots itself outside Room 1007 to map what body-death does to swapped souls.",
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
        chapter: 372,
        note: "Yuhirai's testimony: guards found feather marks on their hands (ch 369) with no memory of passing out.",
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
    name: "Tserriednich's Beast (the woman-headed horse)",
    userCharacterId: "tserriednich",
    kind: "guardian-beast",
    nenType: "unknown",
    description:
      "A horse-like horror with a beautiful woman's head on an extendable neck — stiletto hooves, a flail for a tail, hidden extra eyes, and a hinged face that opens on serrated teeth. It vanishes while the prince holds Zetsu and returns the instant he stops; it threatened and branded Theta after her failed kill (ch 385). Distinct from the jester-like 'alter ego' Specialist beast the prince created by instinct during training (ch 384).",
    effects: [
      "Unknown; it guards the prince and punishes deception — Theta was warned she would 'cease to be human' if she deceived him again (ch 385).",
    ],
    firstSeenCh: 362,
    revealCh: 362,
    status: "active",
    mysteryIds: ["my-tserriednich-god-beast"],
    evidence: [
      {
        chapter: 362,
        note: "Manifestation shown looming over Theta; mechanics undisclosed.",
        confidence: "canonical",
      },
      {
        chapter: 384,
        note: "A second, self-made 'alter ego' Nen beast appears beside the Guardian Spirit Beast, terrifying Theta.",
        confidence: "canonical",
      },
    ],
    confidence: "weak-inference",
  },
  {
    id: "ab-beast-momoze",
    name: "Momoze's Beast (the 'are you free?' mouse)",
    userCharacterId: "momoze",
    kind: "guardian-beast",
    nenType: "manipulator",
    description:
      "A cartoonish, person-and-a-half-tall mouse — a pseudo-coercive Manipulator. It phases through walls asking people if they are 'free': answer no, and a miniature replica pesters you until you relent; answer yes, and a spider-like Nen beast implanted in your ear seizes your body. It took Sayird in Room 1014 and made him kill three guards (ch 360–361).",
    conditions: [
      "Consent question: control begins only on an affirmative answer.",
      "The ear-spider feeds on the host's aura, not Momoze's — starve it and it flees, freeing the host.",
      "Controlling even one person fatigued Momoze badly (ch 366).",
    ],
    effects: [
      "Full body control of consenting targets via the implanted spider.",
      "The strain left Momoze aura-drained — and undefended the night she was murdered (Kurapika's analysis, ch 368).",
    ],
    firstSeenCh: 360,
    revealCh: 361,
    status: "broken",
    evidence: [
      {
        chapter: 361,
        note: "Sayird's possession and forced killings shown on-page.",
        confidence: "canonical",
      },
      {
        chapter: 368,
        note: "Kurapika links the beast's aura drain to Momoze's fatal vulnerability.",
        confidence: "canonical",
      },
    ],
    confidence: "canonical",
  },
  {
    id: "ab-beast-benjamin",
    name: "Benjamin's Beast (the deathbed deity)",
    userCharacterId: "benjamin",
    kind: "guardian-beast",
    nenType: "unknown",
    description:
      "A terrifying creature perched on the First Prince's shoulders — Balsamilco called it 'valiant, befitting the next King' (ch 363). Long undemonstrated, it screeched low-level evil spirits away from Fugetsu (ch 402); per Furykov (ch 413), its true power activates on Benjamin's death: it can turn him into a guardian deity of Kakin — a Guardian Spirit Beast in his own right, watching over future kings, potentially replacing the Seed Urn ceremony itself, with Benjamin Baton intact.",
    effects: [
      "Dispels lesser evil spirits (shown, ch 402).",
      "Post-mortem apotheosis: Benjamin as Kakin's guardian deity, retaining Benjamin Baton (per Furykov, ch 413).",
    ],
    firstSeenCh: 362,
    revealCh: 413,
    status: "active",
    evidence: [
      {
        chapter: 363,
        note: "Seen resting on Benjamin's shoulders; described by Balsamilco.",
        confidence: "canonical",
      },
      {
        chapter: 413,
        note: "Deity mechanism explained by Furykov; Benjamin builds his endgame on it.",
        confidence: "strong-inference",
      },
    ],
    confidence: "strong-inference",
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
    weaknesses: [
      "It did not manifest when Musse shot Camilla — whether her Zetsu, her momentary death, or something else suppressed it is unknown (ch 373, 389).",
    ],
    firstSeenCh: 362,
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
    name: "Zhang Lei's Beast (the coin mint)",
    userCharacterId: "zhang-lei",
    kind: "guardian-beast",
    nenType: "conjurer",
    description:
      "A floating dharmachakra wreathed in black flame that ejects a coin from its mouth roughly daily. Someone who holds a coin and fulfills certain conditions gains various abilities (ch 375–376). A coin's number climbs from '1' to '10' after ten days (ch 389–390), its back design changes with its holder (ch 403–404), and returning a coin resets its value. Kurapika reads it as a cumulative Conjuration ability storing Nen against the day Zhang Lei is king — with a possible pseudo-coercive loyalty edge.",
    conditions: [
      "Coin effects hinge on undisclosed conditions met by the holder.",
      "Value compounds tenfold per ten days held; handing a coin back resets it.",
    ],
    effects: [
      "Daily coin production (first coins pocketed by Coventoba and gifted to Tenftory, ch 372–389).",
      "Deferred, distributed power: circulated coins bank Nen for after the succession (Kurapika's analysis, ch 404).",
    ],
    firstSeenCh: 362,
    revealCh: 375,
    status: "active",
    evidence: [
      {
        chapter: 374,
        note: "Coin ejection from the beast's mouth shown.",
        confidence: "canonical",
      },
      {
        chapter: 404,
        note: "Number/design experiments run with Kurapika; cumulative-Conjuration reading given on-page.",
        confidence: "canonical",
      },
    ],
    confidence: "strong-inference",
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
      "Manifested facing Rihan right after the Woble–Tubeppa pact — read by him as a conditional type (ch 402).",
    ],
    firstSeenCh: 362,
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
    name: "Tyson's Beast (the eye-wog levy)",
    userCharacterId: "tyson",
    kind: "guardian-beast",
    nenType: "emitter",
    description:
      "An Emitter with a diffusive levy-type ability: a winged heart with one giant eye that lays lizard-sized 'eye-wogs'. The eye-wogs perch on anyone who encounters Tyson's teachings, collecting aura as a tithe and paying it back as happiness — the more thoroughly one reads the Book of Tyson, the deeper the bliss. Breaking the book's single taboo brings harsh punishment.",
    conditions: [
      "Attachment follows contact with the Book of Tyson's teachings.",
      "Happiness scales with how devoutly the book has been read.",
    ],
    effects: [
      "Continuous small aura levy on adherents (eye-wogs on Izunavi and Giuliano, ch 372).",
      "Bestowed euphoria; a taboo-breach punishment clause, contents unknown.",
    ],
    firstSeenCh: 362,
    revealCh: 375,
    status: "active",
    evidence: [
      {
        chapter: 375,
        note: "Type, eye-wogs, and levy mechanics laid out in the beast overviews.",
        confidence: "canonical",
      },
    ],
    confidence: "canonical",
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
    firstSeenCh: 362,
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
      "A diffusive induction-type Manipulator tied to the prince's libido: it intermittently breathes white smoke (average radius ~7 m) that sways inhalers toward Salé-salé — after enough exposure a small clone forms above their head and spreads the same smoke in a 2 m radius. Rihan clocked full affection at ~8 hours for the well-disposed, ~70 for the indifferent, and projected kingdom-scale mind control had he taken the throne. Devoured whole by his Predator, leaving the prince defenseless.",
    conditions: [
      "Smoke and clones are visible only to Nen users; not inhaling — even just blowing the smoke away — prevents infection.",
    ],
    effects: [
      "Inhaled smoke escalates affection for Salé-salé over hours (observed on Koroabde, whose clone Predator ate first).",
      "Infected carriers spread the influence themselves.",
      "Extrapolated endgame: an absolute dictatorship of adoration.",
    ],
    weaknesses: [
      "Mirroring its prince, it has no ability to defend itself (Rihan, ch 381).",
    ],
    firstSeenCh: 362,
    revealCh: 374,
    status: "broken",
    evidence: [
      {
        chapter: 374,
        note: "Rihan's running analysis identifies the goodwill-inducing smoke.",
        confidence: "canonical",
      },
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
    name: "Without You",
    userCharacterId: "kacho",
    kind: "post-mortem",
    nenType: "unknown",
    description:
      "Kacho's formless Guardian Spirit Beast, named on-page in ch 383 (lit. 'Season of Two'): its ability triggers when one of the twins dies — it assumes the dead sister's appearance, personality, and memories and stays to protect the survivor until her death. Since ch 383 it walks and plans as Kacho beside Fugetsu, visible to everyone; 'Kacho' herself reasons she was resurrected as a guardian spirit, and maintaining her appearance appears to draw on Fugetsu's aura.",
    conditions: [
      "Activates only on the death of one twin; it protects the other until she, too, dies.",
      "Fugetsu seeing her confirms Kacho is out of the contest (princes cannot see their own beast).",
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
    firstSeenCh: 383,
    revealCh: 383,
    uses: [
      {
        ch: 383,
        note: "Steps out of the Magical Worm door as Kacho moments after the real Kacho dies on the lifeboat; escorts Fugetsu home.",
      },
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
      { characterId: "melody", sinceCh: 400 },
      { characterId: "kaiser", sinceCh: 400 },
    ],
    evidence: [
      {
        chapter: 383,
        note: "Ability named and its twin-death trigger explained on-page as Kacho dies.",
        confidence: "canonical",
      },
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
      "Musse's surveillance owls (lit. 'Rear Window Bird'): up to three owl-shaped 'Birds' — one eavesdrops through walls and distance from the user's shoulder; another, planted by touch, telepathically relays everything a target does and says. After Camilla's cat killed Musse, Benjamin inherited the ability via Benjamin Baton — and prolonged use has leveled it up: it can now replay what Musse saw before his death.",
    activation:
      "Manifest an owl; the tracking bird requires physical contact with the target.",
    conditions: [
      "The planted bird is visible only to the user.",
      "Only one bird (or one of each type) can exist at a time.",
      "The replay function unlocks after prolonged continuous use on one target — possibly ten days.",
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
        note: "Stinger ball attached to Fugetsu after her first door escape, before he swaps posts with Rihan.",
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
    firstSeenCh: 401,
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
      "Furykov's fear is not being Benjamin's curse-bearer per se, but that his curse could destroy the ability of Benjamin's Guardian Spirit Beast — reflecting it back onto himself by killing Benjamin first is his chosen counter (ch 413).",
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
  {
    id: "disgusting-telephone",
    name: "Disgusting Telephone",
    userCharacterId: "chrollo",
    kind: "borrowed",
    nenType: "conjurer",
    description:
      "A stolen ability (lit. 'Love Dial 6700'), originally Narumi McGait's and run by Chrollo through Skill Hunter. Conjures a love-themed cell phone that searches for an 'ideal partner' matching input criteria: a 6-to-20-digit number appears, and dialing it guides the caller toward the target's location. Chrollo turns the matchmaker into a manhunt tool — its synergy with Skill Hunter lets him locate Nen users carrying the abilities he wants, Hisoka above all.",
    activation:
      "Conjure the phone, input the target's criteria to get a number, then dial it for locating guidance.",
    conditions: [
      "Limited number of calls per day (exact allowance, and whether it varies, unknown).",
      "The target must be within Nen range; if merely far, the phone says so without pinpointing them.",
    ],
    effects: [
      "Generates a dial-number for anyone matching the entered criteria.",
      "Guides the caller toward the target, or reports 'out of Nen range' and advises waiting or relocating.",
    ],
    weaknesses: [
      "Only guides — it neither delivers nor subdues the target.",
      "Range-limited by distance and separation: from the Tier 3 funeral crowd it could tell Chrollo only that Hisoka was 'up above'.",
      "Cooldown between failed calls; the daily cap forces patience.",
    ],
    firstSeenCh: 406,
    revealCh: 406,
    uses: [
      {
        ch: 351,
        note: "Chrollo notes the locating behaved 'the same back at Heavens Arena', implying he held it during the duel with Hisoka.",
      },
      {
        ch: 406,
        note: "In the Tier 3 funeral crowd he dials for Hisoka; told the target is beyond signal range, he concludes Hisoka is on Tier 1 and weighs going up.",
      },
    ],
    status: "active",
    awareCharacterIds: [{ characterId: "chrollo", sinceCh: 351 }],
    evidence: [
      {
        chapter: 406,
        note: "Chrollo conjures the phone and works the dial-and-relocate process on-page; named 'Disgusting Telephone' / 'Love Dial 6700', stolen from Narumi McGait.",
        confidence: "canonical",
      },
    ],
    confidence: "canonical",
  },
];

/** One record per prince whose beast has been meaningfully observed. */
export const beasts: GuardianBeast[] = [
  {
    id: "beast-benjamin",
    princeId: "prince-benjamin",
    abilityId: "ab-beast-benjamin",
    appearance:
      "A fearsome creature perched on the First Prince's shoulders — 'valiant, befitting the next King' per Balsamilco (ch 363).",
    behaviorNote:
      "Screeched low-level evil spirits away from Fugetsu (ch 402); per Furykov it can deify Benjamin after death, Benjamin Baton intact (ch 413).",
    firstSeenCh: 362,
    status: "active",
    confidence: "strong-inference",
  },
  {
    id: "beast-camilla",
    princeId: "prince-camilla",
    abilityId: "ab-beast-camilla",
    appearance: "Undescribed in reliable detail.",
    behaviorNote:
      "Coercively manipulates people once unspecified conditions are met — distinct from her personal revival counter. Notably absent when Musse shot her.",
    firstSeenCh: 362,
    status: "active",
    confidence: "strong-inference",
  },
  {
    id: "beast-zhang-lei",
    princeId: "prince-zhang-lei",
    abilityId: "ab-beast-zhang-lei",
    appearance:
      "A floating dharma-wheel bordered by black flames, a small face at its hub, hovering near the Third Prince.",
    behaviorNote:
      "Ejects a coin from its mouth roughly daily; mildly sentient — it watched Oito avert her eyes (ch 365).",
    firstSeenCh: 362,
    status: "active",
    confidence: "strong-inference",
  },
  {
    id: "beast-tserriednich",
    princeId: "prince-tserriednich",
    abilityId: "ab-beast-tserriednich",
    appearance:
      "A woman-headed, horse-like monster — stiletto hooves, flail tail, an extendable neck, and a hinged face that opens on serrated teeth.",
    behaviorNote:
      "Vanishes during the prince's Zetsu and returns when it ends; branded and threatened Theta after her failed kill (ch 385).",
    firstSeenCh: 362,
    status: "active",
    confidence: "weak-inference",
  },
  {
    id: "beast-tubeppa",
    princeId: "prince-tubeppa",
    abilityId: "ab-beast-tubeppa",
    appearance:
      "A large toad-like creature covered in stubs, with spoked wheels for feet.",
    behaviorNote:
      "Produces drugs within its body with the help of a partner (per the class-arc beast overviews); croaked and fumed at Rihan right after the Woble pact (ch 402).",
    firstSeenCh: 362,
    status: "active",
    confidence: "strong-inference",
  },
  {
    id: "beast-tyson",
    princeId: "prince-tyson",
    abilityId: "ab-beast-tyson",
    appearance:
      "A heart shape with four small wings and one giant central eye; it lays lizard-sized, eye-headed 'eye-wogs'.",
    behaviorNote:
      "Its eye-wogs collect aura from readers of the Book of Tyson and pay it back as happiness; breaking the book's taboo brings punishment.",
    firstSeenCh: 362,
    status: "active",
    confidence: "canonical",
  },
  {
    id: "beast-luzurus",
    princeId: "prince-luzurus",
    abilityId: "ab-beast-luzurus",
    appearance: "Rarely shown directly.",
    behaviorNote:
      "Sets manipulation traps shaped like its targets' desires (per the class-arc beast overviews).",
    firstSeenCh: 362,
    status: "active",
    confidence: "strong-inference",
  },
  {
    id: "beast-salele",
    princeId: "prince-salele",
    abilityId: "ab-beast-salele",
    appearance:
      "A many-mouthed, smoke-breathing presence attending the Eighth Prince, tied to his libido.",
    behaviorNote:
      "Its smoke bred devotion in whoever inhaled it — until Rihan's Predator ate it whole (ch 381).",
    firstSeenCh: 362,
    status: "destroyed",
    statusNote:
      "Consumed by Rihan's Predator on Day 5 (ch 381); Salé-salé was assassinated days later, by Day 8 (ch 382).",
    confidence: "canonical",
  },
  {
    id: "beast-halkenburg",
    princeId: "prince-halkenburg",
    abilityId: "ab-beast-halkenburg",
    appearance:
      "A feathered, apish, one-eyed ogre with horns, perched on Halkenburg's shoulders.",
    behaviorNote:
      "Marks followers' left hands with conjured pinion feathers and powers the mind-swap arrow; it kept operating after the prince's body died, because his soul did too.",
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
      "Formless until activation; after the prince's death: Kacho herself, indistinguishable in manner and memory, visible even to Fugetsu.",
    behaviorNote:
      "Manifests as Kacho ('Without You') and guards Fugetsu at the Justice Bureau — planning, scheming, phasing through walls, and fading as her twin weakens.",
    firstSeenCh: 383,
    status: "active",
    statusNote:
      "Post-mortem manifestation explained on-page at activation (ch 383) and by its own testimony (ch 400); observed fading (ch 404).",
    confidence: "canonical",
  },
  {
    id: "beast-fugetsu",
    princeId: "prince-fugetsu",
    abilityId: "ab-beast-fugetsu",
    appearance:
      "Exists as a wormhole; its childhood-playground doors are its only visible face.",
    behaviorNote:
      "Opens a door to a wished-for location aboard the ship — baseline once a day, unbounded (and suspect) since ch 400.",
    firstSeenCh: 374,
    status: "active",
    confidence: "canonical",
  },
  {
    id: "beast-momoze",
    princeId: "prince-momoze",
    abilityId: "ab-beast-momoze",
    appearance:
      "A cartoonish mouse about twice human height, vertical eyes on its forehead, a heart-shaped patch on its belly.",
    behaviorNote:
      "Asked bystanders if they were 'free' and seized any who said yes — Sayird killed three guards under its control (ch 360–361); it faded as Momoze's aura ran out.",
    firstSeenCh: 360,
    status: "destroyed",
    statusNote: "Beasts die with their prince.",
    confidence: "canonical",
  },
  {
    id: "beast-marayam",
    princeId: "prince-marayam",
    abilityId: "ab-beast-marayam",
    appearance:
      "A graceful legged dragon, serpentine and larger every time it is seen.",
    behaviorNote:
      "Wandered into Room 1014 on Day 1 (ch 360); conjures the one-way duplicate of Room 1013 the household hides in; grows with the child toward an unknown ceiling.",
    firstSeenCh: 360,
    status: "active",
    confidence: "canonical",
  },
  {
    id: "beast-woble",
    princeId: "prince-woble",
    abilityId: "ab-beast-woble",
    appearance:
      "Never clearly depicted — the only trace is an aura surge Kurapika sensed from the cradle (ch 358).",
    behaviorNote:
      "No documented action; after the swap revelation (ch 412), whether the infant aboard has a Guardian Spirit Beast at all is unknown.",
    firstSeenCh: 358,
    status: "unknown",
    confidence: "unknown",
  },
];
