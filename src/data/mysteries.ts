import type { Mystery } from "@/lib/types";

/** The analyst case board: unresolved questions, honestly bounded. */
export const mysteries: Mystery[] = [
  {
    id: "my-silent-majority-user",
    question: "Who operates Silent Majority?",
    summary:
      "The puppet-assassin ability that hunted Room 1014 works through needle-marked intermediaries who self-destruct on capture. Its true user has never appeared on-page.",
    introducedCh: 360,
    statusHistory: [
      { ch: 360, value: "open" },
      {
        ch: 371,
        value: "partially-answered",
        note: "Mechanism understood; user still unknown.",
      },
      {
        ch: 401,
        value: "partially-answered",
        note: "One suspect eliminated: Longhi, the class's likeliest candidate, denies the snake ability is hers — and Kurapika's chain never moves.",
      },
    ],
    relatedCharacterIds: [
      "kurapika",
      "oito",
      "bill",
      "sayird",
      "woody",
      "loberry",
      "barrigen",
      "longhi",
    ],
    evidenceFor: [
      {
        chapter: 362,
        note: "Puppet remains and needle marks recovered from the suite's attackers.",
        confidence: "canonical",
      },
      {
        chapter: 361,
        note: "Attack geometry requires knowledge of the hidden passages.",
        confidence: "strong-inference",
      },
    ],
    evidenceAgainst: [
      {
        chapter: 368,
        note: "No prince camp has behaved as if it controls the ability — including the ones who benefit.",
        confidence: "weak-inference",
      },
    ],
    possibleExplanations: [
      {
        text: "A prince's household weapon operated at arm's length (14th-floor suspicion cycles through several camps).",
        confidence: "theory",
      },
      {
        text: "A Guardian Spirit Beast acting autonomously on its prince's behalf.",
        confidence: "theory",
      },
      {
        text: "A mafia or third-party asset predating the voyage's royal politics.",
        confidence: "theory",
      },
    ],
    latestDevelopment: {
      ch: 414,
      text: "Room 1014's defenders still speak of 'the unknown Nen assassin' as live; the second class round warns of a girl in a mask and a 'snake charmer' hunting Tserriednich's guards, and Kurapika felt an unexplained Nen surge near the prince.",
    },
  },
  {
    id: "my-hisoka-whereabouts",
    question: "Where is Hisoka?",
    summary:
      "Every faction with muscle aboard is hunting the magician. Two hundred thousand passengers, five tiers, and not one confirmed sighting since departure.",
    introducedCh: 359,
    statusHistory: [
      { ch: 359, value: "open" },
      {
        ch: 405,
        value: "open",
        note: "The reader glimpses him at the Tier 1 VIP casino — but who shelters him and where he nests remain unknown; the hunters below are chasing a Troupe decoy.",
      },
    ],
    relatedCharacterIds: [
      "hisoka",
      "chrollo",
      "machi",
      "illumi",
      "hinrigh",
      "bonolenov",
    ],
    evidenceFor: [
      {
        chapter: 359,
        note: "His war on the Troupe gives him every reason to be where they are.",
        confidence: "strong-inference",
      },
      {
        chapter: 405,
        note: "On-page at the Tier 1 casino, playing Square-X and slots — exactly where Chrollo guessed: a VIP via some prince's invitation.",
        confidence: "canonical",
      },
    ],
    evidenceAgainst: [
      {
        chapter: 390,
        note: "Sweeps of Tiers 3–5 have produced nothing — a negative result strange enough to be a clue.",
        confidence: "strong-inference",
      },
    ],
    possibleExplanations: [
      {
        text: "Confirmed on Tier 1 as of the twelfth day — the open question is which prince's invitation covers him, and where he goes when martial law empties the casinos.",
        confidence: "strong-inference",
      },
      {
        text: "Chrollo's Nen phone places his target 'up above' — the endgame converges on the royal deck.",
        confidence: "strong-inference",
      },
    ],
    latestDevelopment: {
      ch: 406,
      text: "The mafia's manhunt is chasing a Troupe decoy; the real Hisoka gambles openly on Tier 1 while Chrollo's locator confirms his quarry is somewhere overhead.",
    },
  },
  {
    id: "my-beast-system-rules",
    question: "What rules govern the Guardian Spirit Beasts?",
    summary:
      "Parasitic constructs granted by urn and egg: princes cannot perceive their own, beasts appear unable to directly harm other princes, and nobody aboard was given the manual.",
    introducedCh: 359,
    statusHistory: [
      { ch: 359, value: "open" },
      {
        ch: 376,
        value: "partially-answered",
        note: "Non-aggression between beasts and princes observed repeatedly.",
      },
      {
        ch: 411,
        value: "partially-answered",
        note: "Kurapika lays out the frame: the contest is stage two of a four-stage national ritual, its lethality a vow-and-limitation engine for the future king's power.",
      },
    ],
    relatedCharacterIds: ["nasubi", "kurapika", "woble", "marayam", "kacho"],
    evidenceFor: [
      {
        chapter: 361,
        note: "Kurapika classifies the manifestations as parasitic-type.",
        confidence: "canonical",
      },
      {
        chapter: 376,
        note: "Beasts observed declining direct violence against rival princes.",
        confidence: "strong-inference",
      },
      {
        chapter: 400,
        note: "Kacho's beast persists past her death, wearing her face to guard Fugetsu — post-mortem duty is on the rulebook.",
        confidence: "canonical",
      },
      {
        chapter: 411,
        note: "Kurapika's class lecture: sole-survivor vow, deliberate escape clause, and the risk that incomplete ritual topples the dynasty.",
        confidence: "strong-inference",
      },
    ],
    possibleExplanations: [
      {
        text: "The rite binds beasts to indirect action: empowering, manipulating, never striking princes directly.",
        confidence: "strong-inference",
      },
      {
        text: "The beasts' behavior mirrors each prince's disposition rather than fixed rules.",
        confidence: "theory",
      },
      {
        text: "Eligibility runs on souls, not bodies: Nasubi's burial chamber tracks each prince's 'Flame of Life', and Halkenburg's never went out.",
        confidence: "strong-inference",
      },
    ],
    latestDevelopment: {
      ch: 413,
      text: "Nasubi confirms at the burial chamber that succession rights persist 'as long as the soul resides within a body' — the system's death condition is soul-death, not body-death.",
    },
  },
  {
    id: "my-halkenburg-arrow-mechanics",
    question: "How exactly does Halkenburg's arrow work?",
    summary:
      "One shot has been fired. The aftermath implies consciousness transfer into a marked guard's body and a life spent as ammunition — inference, not demonstration.",
    introducedCh: 375,
    statusHistory: [
      { ch: 375, value: "open" },
      {
        ch: 386,
        value: "likely-answered",
        note: "Transfer-and-cost model fits all observed evidence.",
      },
      {
        ch: 404,
        value: "resolved",
        note: "Halkenburg narrates the full mechanics over his own dying body.",
      },
    ],
    relatedCharacterIds: [
      "halkenburg",
      "ladiolus",
      "sumidori",
      "yuhirai",
      "benjamin",
      "balsamilco",
      "shikaku",
      "vict",
    ],
    evidenceFor: [
      {
        chapter: 375,
        note: "Seal-marking of the sleeping guards shown on-page.",
        confidence: "canonical",
      },
      {
        chapter: 386,
        note: "The Shikaku-Sumidori experiment: only one swapped mind wakes at a time, own side has priority.",
        confidence: "canonical",
      },
      {
        chapter: 404,
        note: "Full rule set stated: forced mind swap between the arrow's victim and one randomly chosen member of the willing group.",
        confidence: "canonical",
      },
    ],
    possibleExplanations: [
      {
        text: "Resolved: The Boy Who Shoots the Arrow — Grimmel the Dissonance forces a mind swap between the struck target and a random volunteer from Halkenburg's group; participation demands willingness to die for the cause.",
        confidence: "canonical",
      },
    ],
    latestDevelopment: {
      ch: 413,
      text: "The remaining frontier is what Halkenburg is testing NOW: soul-only persistence after his body's death, and a fresh arrow already flying at Benjamin.",
    },
    resolution: {
      ch: 404,
      text: "The arrow forcibly swaps minds: whoever it strikes exchanges consciousness with one randomly selected member of Halkenburg's assembled, willing followers. Only one swapped mind is awake at a time, with the caster's side holding priority; if the follower's original body dies first, the victim's mind returns home and coexists with the trespasser, victim taking priority. Contest 'death' appears to require both body and soul — which is why Halkenburg, wearing Balsamilco, outlived his own corpse.",
    },
  },
  {
    id: "my-tserriednich-god-beast",
    question:
      "What is Tserriednich's beast — and where does it end and his own Nen begin?",
    summary:
      "The many-faced idol looming over the Fourth Prince may be entangled with his emerging time-perception ability. The boundary between beast and prodigy is undocumented.",
    introducedCh: 376,
    statusHistory: [
      { ch: 376, value: "open" },
      {
        ch: 402,
        value: "partially-answered",
        note: "The training data narrows it: something activates during his Zetsu, and even his instructors can't see the beast.",
      },
    ],
    relatedCharacterIds: ["tserriednich", "theta", "salkov"],
    evidenceFor: [
      {
        chapter: 376,
        note: "Beast manifestation shown at scale.",
        confidence: "canonical",
      },
      {
        chapter: 392,
        note: "Future-glimpse ability emerges during training with the beast present.",
        confidence: "strong-inference",
      },
      {
        chapter: 402,
        note: "Salkov's analysis: an ability seems to trigger during Tserriednich's Zetsu — an outlier even among specialists — while the jester-like beast stays invisible to him.",
        confidence: "strong-inference",
      },
    ],
    possibleExplanations: [
      {
        text: "The beast stores aura under normal conditions and activates its power when Tserriednich enters Zetsu (Salkov's working model).",
        confidence: "strong-inference",
      },
      {
        text: "The beast amplifies or hosts his time-perception ability.",
        confidence: "theory",
      },
      {
        text: "Two independent phenomena that happen to share a monster.",
        confidence: "theory",
      },
    ],
    latestDevelopment: {
      ch: 404,
      text: "Zetsu activation down past 3.5 seconds in three days; a ball of aura condenses between his hands as his instructors quietly lose faith in their own ceilings.",
    },
  },
  {
    id: "my-marayam-beast-form",
    question: "What is Marayam's beast growing into?",
    summary:
      "One power is confirmed: the beast hides the household inside a one-way duplicate of Room 1013. What remains open is the growth — the serpent enlarges with the child, and nobody knows its adult form or what else it will be able to do.",
    introducedCh: 361,
    statusHistory: [
      { ch: 361, value: "open" },
      {
        ch: 375,
        value: "partially-answered",
        note: "The one-way duplicate-room space is confirmed and attributed to the beast; its final form is not.",
      },
    ],
    relatedCharacterIds: ["marayam", "sevanti", "hanzo", "biscuit"],
    evidenceFor: [
      {
        chapter: 390,
        note: "Household Hunters remark on the growth rate.",
        confidence: "canonical",
      },
    ],
    possibleExplanations: [
      {
        text: "Scales with the child's emotional development toward an unknown adult form.",
        confidence: "theory",
      },
      {
        text: "Accumulating defensive capacity in proportion to perceived threat.",
        confidence: "theory",
      },
    ],
    latestDevelopment: {
      ch: 413,
      text: "Marayam's location has gone dark even to Benjamin's machine — under martial law his camp is the one square the First Prince cannot see, with Rihan held in reserve against it.",
    },
  },
  {
    id: "my-kurapika-lifespan",
    question: "How much life does Kurapika have left?",
    summary:
      "Emperor Time bills one hour per second. The ledger of his cumulative usage — Yorknew, the reconnaissance, the interrogations, the classes — has never been totaled on-page.",
    introducedCh: 370,
    statusHistory: [
      {
        ch: 370,
        value: "partially-answered",
        note: "Rate known; balance unknown.",
      },
    ],
    relatedCharacterIds: ["kurapika", "bill", "melody"],
    evidenceFor: [
      {
        chapter: 370,
        note: "Cost rate stated canonically.",
        confidence: "canonical",
      },
      {
        chapter: 370,
        note: "Visible aging/exhaustion after extended activations.",
        confidence: "canonical",
      },
    ],
    possibleExplanations: [
      {
        text: "Years already spent; his remaining span is measured in decades at best.",
        confidence: "strong-inference",
      },
    ],
    latestDevelopment: {
      ch: 414,
      text: "The ledger keeps growing off-page: dowsing interrogations, the Oito questioning, two rounds of classes. He has sworn his life on friends ashore protecting Woble — an oath whose collateral is exactly the span in question.",
    },
  },
  {
    id: "my-morena-endgame",
    question: "What does Morena actually want?",
    summary:
      "Not territory, not tribute, not the succession. Her contagion multiplies killers toward some terminal state she has only described in fragments of grievance.",
    introducedCh: 377,
    statusHistory: [
      { ch: 377, value: "open" },
      {
        ch: 386,
        value: "partially-answered",
        note: "Kinship grievance against the royal line surfaced.",
      },
      {
        ch: 408,
        value: "likely-answered",
        note: "She states it plainly to Borksen: destroy Kakin, then keep going until humanity is destroyed.",
      },
    ],
    relatedCharacterIds: ["morena", "luini", "hinrigh"],
    evidenceFor: [
      {
        chapter: 386,
        note: "Her stated kinship claim and hatred of the Hui Guo Rou line.",
        confidence: "strong-inference",
      },
      {
        chapter: 408,
        note: "Under her own no-cheating vow: a Carnival Orphan sorted as 'flesh' for twenty years, her stated goal Kakin's destruction and then humanity's.",
        confidence: "canonical",
      },
    ],
    possibleExplanations: [
      {
        text: "The stated goal is the real one: annihilation as answer to Carne Levare — the ship's closed world is her once-in-a-lifetime kill box.",
        confidence: "strong-inference",
      },
      {
        text: "The 'destroy humanity' clause is rhetoric; the operational goal is the royal family and Kakin's order, with Contagion as the engine.",
        confidence: "theory",
      },
      {
        text: "The hunt for a second specialist — the 'organ' role, the Floor Master lead — implies a specific ability her endgame still lacks.",
        confidence: "strong-inference",
      },
    ],
    latestDevelopment: {
      ch: 410,
      text: "Borksen recruited (by a rigged card game and her own cheating); the hideout sits hidden between Tiers 2 and 3, built into the ship before it ever sailed.",
    },
  },
  {
    id: "my-momoze-assassin",
    question: "Who killed Momoze?",
    summary:
      "The reader saw hands in the dark; the ship saw nothing. The Bureau's case stalled between sleeping guards and conflicting testimony.",
    introducedCh: 368,
    statusHistory: [
      { ch: 368, value: "open" },
      {
        ch: 370,
        value: "dormant",
        note: "No faction pressed the investigation.",
      },
      {
        ch: 411,
        value: "dormant",
        note: "Still nobody's case — but the class-murder thread it resembles has grown new suspects.",
      },
    ],
    relatedCharacterIds: ["momoze", "slakka", "nipaper", "sevanti"],
    evidenceFor: [
      {
        chapter: 368,
        note: "Strangulation during Slakka's watch; the guard slept or claims to have.",
        confidence: "canonical",
      },
    ],
    evidenceAgainst: [
      {
        chapter: 368,
        note: "No camp visibly benefited enough to claim the kill even privately.",
        confidence: "weak-inference",
      },
      {
        chapter: 412,
        note: "Slakka walks freely into the second class round and needles Sakata — not the posture of a man dodging a murder file.",
        confidence: "weak-inference",
      },
    ],
    possibleExplanations: [
      {
        text: "The watching guard, coerced or suborned by a rival camp.",
        confidence: "theory",
      },
      {
        text: "An external intruder using the same access routes as the Room 1014 attacks.",
        confidence: "theory",
      },
      {
        text: "The same unidentified assassin behind the class-round killings — the 'girl in a mask' Belerainte now warns about.",
        confidence: "theory",
      },
    ],
    latestDevelopment: {
      ch: 411,
      text: "Belerainte admits nobody was ever caught for the first-round murders and tells Naipei to report any girl in a mask — the closest thing the case has to a live lead.",
    },
  },
  {
    id: "my-woble-beast-ability",
    question: "What can Woble's beast actually do?",
    summary:
      "The most-watched infant aboard has the least-understood guardian: an amorphous drape that has never acted, whose tolerance of Oito already bends the assumed rules.",
    introducedCh: 359,
    statusHistory: [
      { ch: 359, value: "open" },
      {
        ch: 412,
        value: "open",
        note: "The question mutates: the baby aboard is a substitute who never did the Seed Urn rite — so whose beast, if anyone's, is the drape over the cradle?",
      },
    ],
    relatedCharacterIds: ["woble", "oito", "kurapika", "shimano"],
    evidenceFor: [
      {
        chapter: 359,
        note: "Manifestation observed; zero demonstrated effects.",
        confidence: "canonical",
      },
      {
        chapter: 412,
        note: "Neither the daughter (rite, no boarding) nor the nephew (boarding, no rite) completed both eligibility steps — the beast's very existence over this child needs re-deriving.",
        confidence: "strong-inference",
      },
    ],
    possibleExplanations: [
      {
        text: "The beast attached at the ceremony and follows the rite-taker — meaning it may be with the real Woble ashore, and the drape in Room 1014 is something else or nothing.",
        confidence: "theory",
      },
      {
        text: "The beast binds to the recognized 'Prince Woble' identity, substitute included — its passivity reflecting an infant with no will to serve.",
        confidence: "theory",
      },
      {
        text: "A passive shield tuned to the infant's dependence — protecting the mother protects the prince.",
        confidence: "theory",
      },
    ],
    latestDevelopment: {
      ch: 414,
      text: "Kurapika recalls a split-second Nen surge near the infant that he never identified — possibly the assassin, possibly Beyond's curse being activated late.",
    },
  },
  {
    id: "my-fugetsu-door-limits",
    question: "What are the limits of Fugetsu's doors?",
    summary:
      "Range, frequency, passenger rules, and — after Kacho — what exactly inhabits the space between the doors. The ability keeps working; the manual keeps not existing.",
    introducedCh: 370,
    statusHistory: [
      { ch: 370, value: "open" },
      {
        ch: 382,
        value: "partially-answered",
        note: "The between-space can kill; one prince's death demonstrates it.",
      },
      {
        ch: 402,
        value: "partially-answered",
        note: "The 'unlimited uses' were a trap: an enemy mark on Fugetsu's shoulder fakes the upgrades while draining her.",
      },
    ],
    relatedCharacterIds: ["fugetsu", "kacho", "basho", "melody"],
    evidenceFor: [
      {
        chapter: 370,
        note: "Successful point-to-point transits shown.",
        confidence: "canonical",
      },
      {
        chapter: 382,
        note: "Kacho did not survive the crossing that Fugetsu did.",
        confidence: "canonical",
      },
      {
        chapter: 400,
        note: "Sudden 'improvements': multiple daily uses, solo return doors, exploration without Kacho — paired with collapsing health.",
        confidence: "canonical",
      },
      {
        chapter: 402,
        note: "Melody identifies a Nen mark on Fugetsu's shoulder blade and diagnoses trap-induced addiction; canonical limits require visiting a destination before a door can reach it.",
        confidence: "canonical",
      },
    ],
    possibleExplanations: [
      {
        text: "Base rules now legible: doors connect only to previously visited places, cannot leave the ship (the lifeboat is the boundary case), and close behind the sisters on defined triggers. The 'multi-use' behavior is enemy interference, not growth.",
        confidence: "strong-inference",
      },
      {
        text: "Something native to the passage space enforces a toll — Kacho's death remains its only data point.",
        confidence: "theory",
      },
    ],
    latestDevelopment: {
      ch: 411,
      text: "Fugetsu sleeps under triple guard on Tier 2, spent; Melody's verdict stands — she won't last if she keeps using the ability, and only 'Kacho' keeps her tethered.",
    },
  },
  {
    id: "my-nasubi-intent",
    question: "What does King Nasubi actually intend?",
    summary:
      "A genial monarch who fed fourteen children into a culling rite. Tradition, faith in the Dark Continent's demands, or a design nobody has read yet.",
    introducedCh: 359,
    statusHistory: [
      { ch: 359, value: "open" },
      {
        ch: 411,
        value: "partially-answered",
        note: "Kurapika's ritual-stages analysis gives the war a stated purpose: forging a god-king for Kakin's next era.",
      },
    ],
    relatedCharacterIds: ["nasubi", "benjamin", "halkenburg"],
    evidenceFor: [
      {
        chapter: 359,
        note: "He administered the Seed Urn rite personally and without visible reluctance.",
        confidence: "canonical",
      },
      {
        chapter: 411,
        note: "Kurapika's four-stage reading: vow and prayer, offering the bloodline, gathering the fallen into a sacred convergence, then ruling with the generated power — with dynastic collapse as the cost of failure.",
        confidence: "strong-inference",
      },
      {
        chapter: 413,
        note: "Nasubi personally attends the hidden burial chamber, reads the Flames of Life, and declares Halkenburg 'still fighting' — he understands the rite's soul-level machinery.",
        confidence: "canonical",
      },
    ],
    possibleExplanations: [
      {
        text: "The officiant knows exactly what he built: the contest is stage two of a national ritual he administers with full knowledge, down to tracking each child's soul in the burial chamber.",
        confidence: "strong-inference",
      },
      {
        text: "The rite serves the Dark Continent contract in ways the princes are not told.",
        confidence: "theory",
      },
    ],
    latestDevelopment: {
      ch: 413,
      text: "In the burial chamber between Salé-salé and Kacho, Nasubi confirms the contest's true death condition — succession rights persist while the soul persists — and shows no surprise at any of it.",
    },
  },
  {
    id: "my-secret-passages-extent",
    question: "How far does the hidden passage network reach?",
    summary:
      "Oito's rat mapped a fragment of the royal deck's concealed spaces. Luini's infiltrations imply the network — or abilities that mimic one — reaches much further.",
    introducedCh: 361,
    statusHistory: [
      { ch: 361, value: "open" },
      {
        ch: 390,
        value: "partially-answered",
        note: "Structural infiltration confirmed beyond the royal block.",
      },
      {
        ch: 409,
        value: "partially-answered",
        note: "The biggest hidden space yet: the Heil-Ly's hideout occupies a void between Tiers 2 and 3, planned before the ship was built.",
      },
    ],
    relatedCharacterIds: ["oito", "kurapika", "luini", "morena", "hinrigh"],
    evidenceFor: [
      {
        chapter: 361,
        note: "Rat reconnaissance mapped concealed routes around the royal quarters.",
        confidence: "canonical",
      },
      {
        chapter: 390,
        note: "Luini moves through structural spaces on lower tiers.",
        confidence: "strong-inference",
      },
      {
        chapter: 392,
        note: "A corrupt soldier sells the tip: wiring crews built a room that appears on no ship plan, and the workers were silenced.",
        confidence: "canonical",
      },
      {
        chapter: 409,
        note: "Borksen's broadcast triangulation plus the central-gate rumbling pin the Heil-Ly hideout between Tiers 2 and 3.",
        confidence: "canonical",
      },
      {
        chapter: 406,
        note: "Cha-R runs its own hidden route through the ship's outermost gap up to Tier 2.",
        confidence: "canonical",
      },
    ],
    possibleExplanations: [
      {
        text: "The concealed spaces predate the voyage — mafia families and whoever commissioned them built voids into the Black Whale itself, with Nen warp-doors stitching them together.",
        confidence: "strong-inference",
      },
      {
        text: "Multiple disconnected spaces, unified only by the abilities exploiting them.",
        confidence: "theory",
      },
    ],
    latestDevelopment: {
      ch: 410,
      text: "The military finds Room 3101's teleport trap and the hidden connection during martial law sweeps — the first official confirmation that the ship's plans lie.",
    },
  },

  // ── New cases opened by the 407-414 run ──────────────────────────────
  {
    id: "my-woble-location",
    question: "Where is the real Prince Woble?",
    summary:
      "The infant in Room 1014 is Oito's nephew. Her actual daughter — the child who performed the Seed Urn rite — left with Oito's younger sister before departure, destination deliberately unknown even to the queen.",
    introducedCh: 412,
    statusHistory: [{ ch: 412, value: "open" }],
    relatedCharacterIds: ["woble", "oito", "kurapika", "bill", "shimano"],
    evidenceFor: [
      {
        chapter: 412,
        note: "Oito's chain-verified confession: daughter ashore with her sister, whereabouts unknown to her by design.",
        confidence: "canonical",
      },
      {
        chapter: 414,
        note: "Pyon's mainland search has produced no official matches yet.",
        confidence: "canonical",
      },
    ],
    evidenceAgainst: [
      {
        chapter: 414,
        note: "Kurapika cannot yet rule out that Woble is aboard — Oito's ignorance cuts both ways, and the military will assume the worst-case placement.",
        confidence: "strong-inference",
      },
    ],
    possibleExplanations: [
      {
        text: "Hidden ashore under the sister's care — reachable only through the coded-letter channel via the Yamato post office relative.",
        confidence: "strong-inference",
      },
      {
        text: "Aboard the ship after all, smuggled on separately — the scenario Benjamin's faction is obliged to assume.",
        confidence: "theory",
      },
    ],
    latestDevelopment: {
      ch: 414,
      text: "Kurapika reframes ignorance as armor: if Woble isn't aboard, she is untouchable, and every camp must keep searching anyway. Contact plan: an unaddressed coded letter through Oito's relative in Yamato.",
    },
  },
  {
    id: "my-beyond-curse-targets",
    question: "Who bears Beyond's curse, and what triggers it?",
    summary:
      "Beyond seeded Kakin's military with his own children — curse sacrifices sealed under the tongue since birth, each primed to curse a target to death when the bearer dies. Ten 'strong' sacrifices are known to exist; the target list and the activation switch are not.",
    introducedCh: 401,
    statusHistory: [
      { ch: 401, value: "open" },
      {
        ch: 413,
        value: "partially-answered",
        note: "A second bearer surfaces: Furykov, whose curse Unma weaponized against Benjamin.",
      },
    ],
    relatedCharacterIds: [
      "beyond",
      "longhi",
      "furykov",
      "kurapika",
      "woble",
      "benjamin",
      "unma",
      "bill",
    ],
    evidenceFor: [
      {
        chapter: 401,
        note: "Longhi's reveal: the fake-marriage program, the under-tongue seals, ten strong sacrifices, targets presumed to be princes.",
        confidence: "canonical",
      },
      {
        chapter: 413,
        note: "Furykov shows Benjamin his own seal and fears his curse could erase the beast's ability — bearers themselves don't know their targets.",
        confidence: "canonical",
      },
      {
        chapter: 414,
        note: "Kurapika's trigger analysis: contest participation vs. Seed Urn participation decides whether the real Woble is in the blast radius.",
        confidence: "canonical",
      },
    ],
    evidenceAgainst: [
      {
        chapter: 401,
        note: "Everything past the seals' existence is reconstruction — Beyond has confirmed nothing, and Longhi concedes her target theory is speculation.",
        confidence: "weak-inference",
      },
    ],
    possibleExplanations: [
      {
        text: "Each sacrifice is keyed to one prince; death of the bearer releases the curse at its target, letting Beyond prune the succession without lifting a finger.",
        confidence: "theory",
      },
      {
        text: "The activation runs on its own conditions as a limitation (Bill's reading), with Beyond holding no live switch — which would make negotiation, not capture, the only lever.",
        confidence: "theory",
      },
      {
        text: "One of the fourteen princes is Beyond's own child — the loophole in 'children of legal wives' — and the curses clear the board for that heir.",
        confidence: "theory",
      },
    ],
    latestDevelopment: {
      ch: 414,
      text: "Room 1014 resolves to act as though Woble is cursed: unravel the curse at its source or find Woble and an exorcist. Bill floats turning the whole Association against the contest; Beyond himself remains the only authoritative source, and probably a trap.",
    },
  },
];
