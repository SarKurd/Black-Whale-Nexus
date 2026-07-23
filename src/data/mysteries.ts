import type { Mystery } from "@/lib/types";

/** The analyst case board: unresolved questions, honestly bounded. */
export const mysteries: Mystery[] = [
  {
    id: "my-silent-majority-user",
    question: "Who operates Silent Majority?",
    summary:
      "The marionette-and-curse-snake ability that drained five of Oito's guards on day one and then stalked Kurapika's Nen classes. Only the user and the person it possesses can see the marionette, and deactivating it without a kill rebounds the curse — on a user who has never been identified.",
    introducedCh: 359,
    statusHistory: [
      {
        ch: 359,
        value: "open",
        note: "Five royal guards found drained of blood, their bodies riddled with holes.",
      },
      {
        ch: 370,
        value: "partially-answered",
        note: "Mechanism revealed on-page — marionette, four blood-draining snakes, rebound-on-failure — but the user stays unknown.",
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
      "woody",
      "loberry",
      "barrigen",
      "longhi",
    ],
    evidenceFor: [
      {
        chapter: 359,
        note: "Woody and four other guards killed identically: blood drained through holes across the body — a Nen attack, per Kurapika.",
        confidence: "canonical",
      },
      {
        chapter: 370,
        note: "Barrigen dies the same way mid-class; the snakes are shown, and the chapter-359 killings are attributed to Silent Majority — clearing Woble's beast.",
        confidence: "canonical",
      },
      {
        chapter: 376,
        note: "Myuhan killed by Silent Majority during the lessons — the user keeps operating inside Room 1014.",
        confidence: "canonical",
      },
    ],
    evidenceAgainst: [
      {
        chapter: 371,
        note: "After Barrigen the attacks paused while Loberry — merely the possessed viewer — sat under arrest; no camp moved to exploit or claim the weapon.",
        confidence: "weak-inference",
      },
    ],
    possibleExplanations: [
      {
        text: "A prince's household weapon operated at arm's length — Queen Seiko's camp drew the formal suspicion (Loberry arrested, a court investigator posted), but nothing was proven.",
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
      "Every faction with muscle aboard hunted the magician across five tiers and two hundred thousand passengers — until chapter 405 put him, undisguised, at a Tier 1 VIP casino. The residual question is whose invitation covers him.",
    introducedCh: 371,
    statusHistory: [
      {
        ch: 371,
        value: "open",
        note: "Chrollo is positive Hisoka is aboard; the Troupe starts hunting anyone over 190 cm.",
      },
      {
        ch: 405,
        value: "resolved",
        note: "The reader sees him at the Tier 1 VIP casino. Who sponsors him remains unknown, and the hunters below are chasing a Troupe decoy.",
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
        chapter: 371,
        note: "Chrollo states he is certain Hisoka is on the ship; Machi demands the kill and the Troupe fans out.",
        confidence: "canonical",
      },
      {
        chapter: 405,
        note: "On-page at the Tier 1 casino, playing Square-X and slots — exactly where Chrollo guessed: a VIP via some prince's invitation.",
        confidence: "canonical",
      },
    ],
    evidenceAgainst: [
      {
        chapter: 377,
        note: "The Troupe's sweep of Tier 5 for anyone over 190 cm produced nothing — the first of several clean lower-tier results.",
        confidence: "canonical",
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
      text: "Chrollo's conjured phone-locator confirms his quarry is 'up above'; Hinrigh deduces the Tier 3 'Hisoka' was a decoy — Lynch died for spotting it — and the Xi-Yu vow revenge on whoever wore the face.",
    },
    resolution: {
      ch: 405,
      text: "He has been on Tier 1 the whole time — gambling openly at the VIP casino, exactly as Chrollo surmised: a VIP through some prince's invitation. Which prince sponsors him, and what he is waiting for, remain open.",
    },
  },
  {
    id: "my-beast-system-rules",
    question: "What rules govern the Guardian Spirit Beasts?",
    summary:
      "Parasitic constructs granted by urn and egg: princes cannot perceive their own, beasts appear unable to directly harm other princes, and nobody aboard was given the manual.",
    introducedCh: 360,
    statusHistory: [
      { ch: 360, value: "open" },
      {
        ch: 362,
        value: "partially-answered",
        note: "Nasubi's monologue states the two base rules: beasts may not kill each other, and may not directly attack other beast-bearers.",
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
        chapter: 360,
        note: "The manifestations are classified as parasitic-type: they feed on the host's aura, and the princes themselves cannot see them.",
        confidence: "canonical",
      },
      {
        chapter: 362,
        note: "Nasubi's own narration: the beasts protect, but it is up to the princes to figure out how to kill their brethren.",
        confidence: "canonical",
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
      "It began as eleven guards found unconscious with feather marks; it ended as the arc's most documented ability. The road between ran through one fired shot, a body-swap experiment, and a confession narrated over the user's own dying body.",
    introducedCh: 362,
    statusHistory: [
      {
        ch: 362,
        value: "open",
        note: "Halkenburg finds all eleven of his guards unconscious under mysterious circumstances.",
      },
      {
        ch: 382,
        value: "partially-answered",
        note: "First shot fired at Shikaku: the arrow robs the target of its will 'in exchange for the body of one of his men'.",
      },
      {
        ch: 386,
        value: "likely-answered",
        note: "The Sumidori–Shikaku experiment points to a full mind swap, not mere manipulation.",
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
        chapter: 372,
        note: "Every guard woke with a feather mark on the back of the hand and no memory of blacking out — Kurapika reads it as soliciting-type Manipulation with memory revision.",
        confidence: "canonical",
      },
      {
        chapter: 382,
        note: "The first firing, on-page: the arrow pierces Shikaku's Culdcept shield, one of Halkenburg's own guards drops, and the narration states the will-for-body exchange. Once the bow is drawn, the arrow cannot be intercepted.",
        confidence: "canonical",
      },
      {
        chapter: 386,
        note: "The Sumidori–Shikaku experiment: Sumidori's mind wakes inside Shikaku's body, marches to Room 1007, and shoots itself — then Sumidori wakes at home, confirming the swap.",
        confidence: "canonical",
      },
      {
        chapter: 404,
        note: "Full rule set stated: forced mind swap between the arrow's victim and one randomly chosen member of the willing group; only one swapped mind wakes at a time, own side has priority.",
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
      "The many-faced idol looming over the Fourth Prince may be entangled with his emerging time-perception ability — and Theta has already spotted a second, instinct-born beast beside the first. The boundary between beast and prodigy is undocumented.",
    introducedCh: 362,
    statusHistory: [
      { ch: 362, value: "open" },
      {
        ch: 384,
        value: "open",
        note: "Theta identifies a second Specialist Nen beast — an 'alter ego' Tserriednich created by instinct, without intent — beside the Seed Urn beast.",
      },
      {
        ch: 402,
        value: "partially-answered",
        note: "The training data narrows it: something activates during his Zetsu, and even his instructors can't see the beast.",
      },
    ],
    relatedCharacterIds: ["tserriednich", "theta", "salkov"],
    evidenceFor: [
      {
        chapter: 362,
        note: "The Guardian Spirit Beast is revealed alongside the other upper princes' beasts.",
        confidence: "canonical",
      },
      {
        chapter: 384,
        note: "Theta, terrified, watches a second Specialist beast — his 'alter ego' — form behind him during training, separate from the ceremony's beast.",
        confidence: "canonical",
      },
      {
        chapter: 387,
        note: "The mechanics from his own perspective: a vision ten seconds into the future that runs only while Zetsu seals his aura — with the beast fading from view as he closes off.",
        confidence: "canonical",
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
      "One power is confirmed: the beast hides the household inside a one-way duplicate of Room 1013. What remains open is the growth — the dragon-like beast keeps enlarging and hardening defensively, and nobody knows its adult form or what else it will be able to do.",
    introducedCh: 360,
    statusHistory: [
      { ch: 360, value: "open" },
      {
        ch: 375,
        value: "partially-answered",
        note: "The one-way duplicate-room space is confirmed and attributed to the beast; its final form is not.",
      },
    ],
    relatedCharacterIds: ["marayam", "sevanti", "hanzo", "biscuit"],
    evidenceFor: [
      {
        chapter: 366,
        note: "Hanzo and Biscuit note the beast is visibly growing.",
        confidence: "canonical",
      },
      {
        chapter: 372,
        note: "The Hunters observe the growth accelerating and turning more defensive after Momoze's death.",
        confidence: "canonical",
      },
      {
        chapter: 375,
        note: "Belerainte's one-way exit test proves the household sits inside a duplicate Room 1013 — Biscuit attributes the space to Marayam's beast.",
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
      text: "Marayam's location is unknown even to Benjamin's camp as martial law begins — the one square the First Prince cannot see, with Saquelle assigned to it and Rihan held in reserve.",
    },
  },
  {
    id: "my-kurapika-lifespan",
    question: "How much life does Kurapika have left?",
    summary:
      "Emperor Time bills one hour of lifespan per second. Only one partial total has ever appeared on-page — roughly five years for the first twelve-hour marathon — and the ledger has kept growing since: interrogations, the Oito questioning, two rounds of classes.",
    introducedCh: 364,
    statusHistory: [
      {
        ch: 364,
        value: "partially-answered",
        note: "Rate known; balance unknown.",
      },
      {
        ch: 369,
        value: "partially-answered",
        note: "First partial tally: about five years spent in one stretch, plus a nine-hour blackout.",
      },
    ],
    relatedCharacterIds: ["kurapika", "bill", "melody"],
    evidenceFor: [
      {
        chapter: 364,
        note: "Cost rate stated canonically: one hour of lifespan for every second of Emperor Time.",
        confidence: "canonical",
      },
      {
        chapter: 369,
        note: "About twelve hours of uptime billed roughly five years and knocked him (and Oito) out for nine hours.",
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
      "Not territory, not tribute, not the succession. Her Contagion multiplies killers toward some terminal state she first described only in fragments of grievance.",
    introducedCh: 378,
    statusHistory: [
      {
        ch: 378,
        value: "open",
        note: "Motive fragments at her debut: destroy 'this dung heap of a world'.",
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
        chapter: 378,
        note: "Her debut: Contagion bestowed by kiss on 22 followers, the scarred-illegitimate-child grievance against a royal family that 'selfishly procreates, fears, doubts, and scars', and the vow to destroy 'this dung heap of a world'.",
        confidence: "canonical",
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
        text: "The recruitment drive implies missing pieces: Perigord already reserved as the 'organ', Dogman sniffing the ship for unawakened Specialists, and a Heavens Arena Floor Master flagged as an exciting candidate — her endgame still needs specific abilities it lacks.",
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
      "Answered on-page for the reader: Tuffdy, one of her six detained royal guards, strangled her with his ability The Touch while apparently asleep in his own bed. Hanzo tricked him into self-incrimination and killed him, staging a suicide. What canon never answered: who, if anyone, gave the order.",
    introducedCh: 366,
    statusHistory: [
      {
        ch: 366,
        value: "open",
        note: "Her guards are each planning to kill her in a way obvious to their employer but not to the authorities.",
      },
      {
        ch: 368,
        value: "open",
        note: "Momoze strangled; her six royal guards detained for court-martial.",
      },
      {
        ch: 372,
        value: "resolved",
        note: "Hanzo identifies Tuffdy, extracts a confession, and avenges Momoze — the kill staged as suicide.",
      },
    ],
    relatedCharacterIds: [
      "momoze",
      "hanzo",
      "biscuit",
      "sevanti",
      "vergei",
      "nipaper",
      "vict",
      "kurapika",
    ],
    evidenceFor: [
      {
        chapter: 366,
        note: "Momoze's royal guards — seeded by the higher queens — each plan a deniable kill; the death is a question of which one moves first.",
        confidence: "canonical",
      },
      {
        chapter: 368,
        note: "Strangulation on-page while the guards were outside her room; the six (Vict, Nipaper, Bladge, Laroc, Tuffdy, Nagmum) are detained; Sevanti demands their execution.",
        confidence: "canonical",
      },
      {
        chapter: 372,
        note: "Hanzo narrows the suspects to Tuffdy and Nagmum, baits Tuffdy into confessing, and learns the method: The Touch, used from his own bed. Hanzo kills him and stages it as suicide.",
        confidence: "canonical",
      },
      {
        chapter: 374,
        note: "Kurapika names Tuffdy as the murderer to Vergei, explaining the crime was committed while Tuffdy lay in bed.",
        confidence: "canonical",
      },
      {
        chapter: 375,
        note: "Hanzo confirms to Biscuit that he killed Momoze's assassin.",
        confidence: "canonical",
      },
    ],
    possibleExplanations: [
      {
        text: "Resolved: Tuffdy, via The Touch. The residual question is his employer — each royal guard answered to one of the seven higher queens, and no camp has been tied to the order on-page.",
        confidence: "canonical",
      },
      {
        text: "Officially the case stays muddy in-universe: Tuffdy's death reads as a suicide, and outside Room 1013's circle only Vergei has been told the truth.",
        confidence: "strong-inference",
      },
    ],
    latestDevelopment: {
      ch: 374,
      text: "Kurapika trades the killer's identity to Vergei for a shot at a coalition; the official file — six suspects, one 'suicide' — is never corrected on-page.",
    },
    resolution: {
      ch: 372,
      text: "Tuffdy — one of the six royal guards the higher queens seeded into Momoze's detail — killed her with his ability The Touch, committing the murder while apparently asleep in his own bed. Hanzo deduced it, tricked him into self-incrimination, killed him, and staged the death as a suicide. Which camp, if any, ordered the hit was never revealed.",
    },
  },
  {
    id: "my-woble-beast-ability",
    question: "What can Woble's beast actually do?",
    summary:
      "The most-watched infant aboard has the least-seen guardian: through fourteen chapters of surveillance the beast has never once shown itself — first suspected of the day-one killings, then cleared, then simply absent from every observer's report.",
    introducedCh: 360,
    statusHistory: [
      {
        ch: 360,
        value: "open",
        note: "Prime suspect for the drained guards — an infant fresh from the Seed Urn rite.",
      },
      {
        ch: 370,
        value: "open",
        note: "Cleared of the day-one killings: Silent Majority's snakes did them.",
      },
      {
        ch: 386,
        value: "open",
        note: "Still refusing to manifest; Babimyna suspects a counterattacking type — or an infant too young to power one.",
      },
      {
        ch: 412,
        value: "open",
        note: "The question mutates: the baby aboard is a substitute who never did the Seed Urn rite — so does a beast watch this cradle at all?",
      },
    ],
    relatedCharacterIds: ["woble", "oito", "kurapika", "shimano"],
    evidenceFor: [
      {
        chapter: 370,
        note: "Barrigen's death by the same snakes disproves the theory that Woble's beast killed the five guards.",
        confidence: "canonical",
      },
      {
        chapter: 386,
        note: "Babimyna's overdue report: Woble's beast 'isn't showing itself' — he can't tell if Woble is too young or the beast is a counterattacking type.",
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
        text: "The beast attached at the ceremony and follows the rite-taker — meaning it may be with the real Woble ashore, and nothing at all watches the cradle in Room 1014.",
        confidence: "theory",
      },
      {
        text: "The beast binds to the recognized 'Prince Woble' identity, substitute included — its invisibility reflecting an infant with no will to serve.",
        confidence: "theory",
      },
      {
        text: "A counterattacking type that only manifests when the prince is directly attacked — Babimyna's working hypothesis.",
        confidence: "weak-inference",
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
      "Range, frequency, passenger rules, and — after Kacho — what the rite does to a prince who steps off the ship. The ability keeps working; the manual keeps not existing.",
    introducedCh: 374,
    statusHistory: [
      { ch: 374, value: "open" },
      {
        ch: 383,
        value: "partially-answered",
        note: "Leaving the ship kills: a horde of hands takes Kacho at the lifeboat, and the mechanics of Magical Worm are laid out.",
      },
      {
        ch: 402,
        value: "partially-answered",
        note: "The 'unlimited uses' were a trap: an enemy mark on Fugetsu's shoulder blade fakes the upgrades while draining her.",
      },
    ],
    relatedCharacterIds: ["fugetsu", "kacho", "basho", "melody"],
    evidenceFor: [
      {
        chapter: 374,
        note: "First door: the tunnel-playset passage from Fugetsu's wall to the top of Kacho's bed.",
        confidence: "canonical",
      },
      {
        chapter: 376,
        note: "Second door on the fourth day — Fugetsu theorizes a once-a-day (or once-per-24-hours) limit.",
        confidence: "canonical",
      },
      {
        chapter: 383,
        note: "Magical Worm's rules revealed: cooperative twin beasts, Fugetsu steering the way out and Kacho the way back — and Kacho dead on the lifeboat after the hands closed in.",
        confidence: "canonical",
      },
      {
        chapter: 400,
        note: "Sudden 'improvements': multiple daily uses, solo return doors, exploration without Kacho — paired with collapsing health.",
        confidence: "canonical",
      },
      {
        chapter: 402,
        note: "Melody identifies a Nen mark on Fugetsu's shoulder blade and diagnoses trap-induced addiction; canonical limits require visiting a destination before a door can reach it, and a door 'outside the ship' refused to form.",
        confidence: "canonical",
      },
    ],
    possibleExplanations: [
      {
        text: "Base rules now legible: doors connect only to previously visited places, cannot leave the ship (the lifeboat is the boundary case), and close behind the sisters on defined triggers. The 'multi-use' behavior is enemy interference, not growth.",
        confidence: "strong-inference",
      },
      {
        text: "The rite itself polices the hull: the horde of hands that took Kacho enforces the no-escape vow, and any door out would meet the same enforcement.",
        confidence: "theory",
      },
    ],
    latestDevelopment: {
      ch: 411,
      text: "Fugetsu sleeps soundly under the Justice Bureau's protection, spent; Melody's verdict stands — she won't last if she keeps using the ability, and only 'Kacho' keeps her tethered.",
    },
  },
  {
    id: "my-nasubi-intent",
    question: "What does King Nasubi actually intend?",
    summary:
      "A genial monarch who fed fourteen children into a culling rite. Tradition, faith in the Dark Continent's demands, or a design nobody has read yet.",
    introducedCh: 349,
    statusHistory: [
      {
        ch: 349,
        value: "open",
        note: "The succession rules arrive with the Seed Urn: every heir who wants the throne unknowingly swallows a Guardian Spirit Beast egg. The king knows what the jar does; the children don't.",
      },
      {
        ch: 411,
        value: "partially-answered",
        note: "Kurapika's ritual-stages analysis gives the war a stated purpose: forging a god-king for Kakin's next era.",
      },
    ],
    relatedCharacterIds: ["nasubi", "benjamin", "halkenburg", "beyond"],
    evidenceFor: [
      {
        chapter: 340,
        note: "He announces the voyage as 'putting all of humanity's dreams on their back' — and ignores the V5's formal request to withdraw. The expedition is the point, not a means.",
        confidence: "canonical",
      },
      {
        chapter: 342,
        note: "The scale of stated ambition: 200,000 aboard the Black Whale now, one million ships promised later. Whatever the rite forges, it is sized for an era, not a reign.",
        confidence: "canonical",
      },
      {
        chapter: 349,
        note: "The rules bind the contest to the voyage itself — only heirs who board and attend the departure ceremony participate — and the Seed Urn is presented as the first king's rite, inspired by the 'Worm Toxin': unworthy vessels are not fit to rule.",
        confidence: "canonical",
      },
      {
        chapter: 361,
        note: "When Halkenburg asks to withdraw from a contest that will kill his siblings, Nasubi smiles and tells him to do as he wishes.",
        confidence: "canonical",
      },
      {
        chapter: 371,
        note: "Standing over Momoze's corpse among fourteen capsules: 'she has become a foundation to the Great Kakin Tree' — his daughter, he insists, still lives.",
        confidence: "canonical",
      },
      {
        chapter: 382,
        note: "A bullet freezes inches from his face; he tells Halkenburg to fire three shots if he means to kill, that he is 'part of the ritual now, unable to die until it ends' — then lectures him on the trolley problem.",
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
      "The Black Whale's plans lie. Mafia families move between tiers through routes no passenger list covers, a wired room appears on no blueprint, and the Heil-Ly's base occupies a void between decks — with Nen warp-doors stitching the gaps together.",
    introducedCh: 377,
    statusHistory: [
      {
        ch: 377,
        value: "open",
        note: "Movement between the bottom three tiers runs officially through the army — or unofficially through the mafia.",
      },
      {
        ch: 393,
        value: "partially-answered",
        note: "Room 3101: a first-class cabin with a bathroom wall on no plan, and a teleport trap behind the front door.",
      },
      {
        ch: 409,
        value: "partially-answered",
        note: "The biggest hidden space yet: the Heil-Ly's hideout occupies a void between Tiers 2 and 3, planned before the ship was built.",
      },
    ],
    relatedCharacterIds: ["luini", "morena", "hinrigh", "ken-i"],
    evidenceFor: [
      {
        chapter: 377,
        note: "Each mafia family controls a tier, and moving between the bottom three requires the army's blessing or the mafia's routes.",
        confidence: "canonical",
      },
      {
        chapter: 384,
        note: "The Cha-R office door connects toward the upper tiers, and the Heil-Ly are said to have 'their own door through Tserriednich'.",
        confidence: "canonical",
      },
      {
        chapter: 392,
        note: "A corrupt soldier sells the tip: wiring crews built a room that appears on no ship plan, and the workers were silenced.",
        confidence: "canonical",
      },
      {
        chapter: 395,
        note: "Hinrigh's camcorder-cat footage proves the Heil-Ly re-enter the standard cabins from directions no corridor allows — teleportation, not crawlspaces.",
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
    introducedCh: 411,
    statusHistory: [
      {
        ch: 411,
        value: "open",
        note: "Kurapika ends the second class by declaring Woble ineligible for the contest — without yet saying why.",
      },
      {
        ch: 412,
        value: "open",
        note: "The chain-verified swap confession puts the real Woble ashore, whereabouts unknown by design.",
      },
    ],
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
        text: "The activation runs on its own conditions as a limitation — the reading Kurapika favors over Bill's live-switch alternative — with Beyond holding no trigger, which would make negotiation, not capture, the only lever.",
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
  {
    id: "my-beyond-endgame",
    question: "What is Beyond actually planning once ashore?",
    summary:
      "He surrendered on purpose, signed a life-in-prison contract without blinking, and told his captors to their faces that his 'true goal lies after landing'. Every layer peeled since — the mole, the curse children, the lawsuit mountain — has been preparation for something still unstated.",
    introducedCh: 340,
    statusHistory: [
      {
        ch: 340,
        value: "open",
        note: "The announcement itself is the first move: a worldwide broadcast that forces the V5's hand and makes hunting him the Zodiacs' job.",
      },
      {
        ch: 349,
        value: "open",
        note: "Kurapika's chains verify the truce is genuine — which only sharpens the question of what the truce is buying time for.",
      },
      {
        ch: 401,
        value: "partially-answered",
        note: "One layer surfaces: a decades-old program seeding Kakin's military with his curse-bearing children. The endgame has been running since before the voyage was announced.",
      },
    ],
    relatedCharacterIds: [
      "beyond",
      "pariston",
      "saiyu",
      "ging",
      "kurapika",
      "mizaistom",
      "nasubi",
    ],
    evidenceFor: [
      {
        chapter: 341,
        note: "Netero's posthumous DVD: Beyond has already been to the Dark Continent and brought threats back — this voyage is a return trip, and he knows exactly where he wants to go.",
        confidence: "canonical",
      },
      {
        chapter: 342,
        note: "From his cell he predicts the Zodiacs will end up releasing him and joining him — the confidence of a man reading from a script the others haven't seen.",
        confidence: "canonical",
      },
      {
        chapter: 345,
        note: "He signs the IPA contract, then counts what remains on his fingers: 'capacity, means, and contract' — the checklist of a plan, not a surrender.",
        confidence: "canonical",
      },
      {
        chapter: 349,
        note: "On tape, chain-verified: he'll behave in Hui Guo Rou's interest until landing, and his true goal lies after that. Mizaistom and Kurapika expect Saiyu's breakout play at landfall, with Pariston as architect.",
        confidence: "canonical",
      },
      {
        chapter: 401,
        note: "Longhi's reveal: the curse-sacrifice program predates the voyage by a generation — Beyond plants fuses measured in decades.",
        confidence: "canonical",
      },
      {
        chapter: 412,
        note: "1,047 dismissed lawsuits hauled into his cell, handed to him 'at random' by the Zodiacs' own mole — the paper mountain is either a grievance archive or a delivery channel.",
        confidence: "weak-inference",
      },
    ],
    evidenceAgainst: [
      {
        chapter: 349,
        note: "The simple reading holds so far: no escape before landing, verified true by lie-detection. His stated dream — unsupervised exploration of the untouched Dark Continent — explains most of the behavior without a hidden layer.",
        confidence: "canonical",
      },
      {
        chapter: 345,
        note: "The contract's teeth are real: one broken rule means life in prison, and he accepted the terms without negotiation.",
        confidence: "canonical",
      },
    ],
    possibleExplanations: [
      {
        text: "Exactly what he says: slip his escorts after landfall — via Saiyu and Pariston's staged breakout — and explore the new world unsupervised.",
        confidence: "strong-inference",
      },
      {
        text: "The curse network and the 'children of legal wives' loophole make Kakin's throne itself part of the plan: prune the succession, seat his own child, and inherit a nation-sized expedition sponsor.",
        confidence: "theory",
      },
      {
        text: "The prize is something specific he saw on his first trip and could not take alone — the voyage, the king, and the Zodiacs are all logistics for retrieving it.",
        confidence: "theory",
      },
    ],
    latestDevelopment: {
      ch: 412,
      text: "Business as usual in the cell: bickering with Kakin's Supreme Magistrate over his dismissed lawsuits while Kanzai hand-searches the boxes for contraband and Saiyu 'randomly' passes him papers.",
    },
  },
];
