/**
 * Story events — the atomic timeline of the Succession War, chapters 358–414.
 *
 * Ids follow `ev-<chapter>-<slug>`; the chapter is where the READER learns
 * the beat. Days are voyage days (departure = day 1); canon time anchors:
 * ch 361 = +2h, ch 369 = day 2, ch 376 = day 3, ch 382–383 banquet = day 8,
 * ch 388 = day 10, ch 403 = day 11, ch 407–414 = day 12 (ch 411 states
 * 8 a.m. of the twelfth day).
 */

import type { StoryEvent } from "@/lib/types";

export const events: StoryEvent[] = [
  // -------------------------------------------------------------------------
  // Ch 340–345 — pre-voyage: the announcement and the Zodiacs' response
  // -------------------------------------------------------------------------
  {
    id: "ev-340-kakin-announcement",
    title: "Nasubi announces the Dark Continent voyage",
    summary:
      "Beans interrupts Cheadle's first Zodiac meeting as chairman with a broadcast: Kakin's King Nasubi Hui Guo Rou declares that the voyage to the Dark Continent will launch from Kakin. Having 'technically' become a new nation thirty years ago, Kakin never signed the V5 treaty forbidding the trip.",
    chapter: 340,
    kind: "other",
    locationId: "hunter-hq",
    participantIds: [
      "nasubi",
      "cheadle",
      "mizaistom",
      "kanzai",
      "pyon",
      "botobai",
      "gel",
      "saccho",
      "ginta",
      "saiyu",
      "cluck",
    ],
    storylineIds: ["expedition-prep"],
    consequences: [
      "The V5 treaty regime is outflanked by a technicality",
      "The Hunter Association is dragged into Dark Continent politics",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-340-beyond-revealed",
    title: "Beyond Netero steps forward as expedition leader",
    summary:
      "Nasubi introduces the man Kakin hired to lead the expedition: Beyond Netero, son of the late chairman Isaac Netero — a son the Zodiacs never knew existed. Beyond invites the whole world to come to Kakin and join the journey to the 'new world'.",
    chapter: 340,
    kind: "discovery",
    locationId: "hunter-hq",
    participantIds: ["beyond", "nasubi", "cheadle"],
    storylineIds: ["expedition-prep", "beyond-netero"],
    knowledgeChanges: [
      { factId: "fact-beyond-plan", characterId: "cheadle", state: "suspects" },
    ],
    consequences: [
      "Netero's posthumous DVD contingency is triggered",
      "The Association must reckon with its founder's hidden family",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-340-v5-hunt-order",
    title: "The V5 order the Zodiacs to hunt Beyond",
    summary:
      "Cheadle reveals that Ging and Pariston have resigned from the Zodiacs — and that the V5 have handed the remaining ten a special assignment: hunt down Beyond Netero. Pariston, meanwhile, already stands among Beyond's ten core followers.",
    chapter: 340,
    kind: "decision",
    locationId: "hunter-hq",
    participantIds: ["cheadle", "ging", "pariston", "beyond"],
    storylineIds: ["expedition-prep", "beyond-netero"],
    consequences: [
      "Two Zodiac seats open — later filled by Leorio and Kurapika",
      "The Association and Beyond's team are set on a collision course",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-341-netero-dvd",
    title: "Netero's second DVD: precede my son",
    summary:
      "The Zodiacs watch the DVD Netero left for exactly this contingency. Beyond once defied his father on a Dark Continent trip, took an unexplored route, and brought back new threats — so Netero banned him and the Association from the Continent until his own death. His final request: the Association should reach the Dark Continent before Beyond does.",
    chapter: 341,
    kind: "discovery",
    locationId: "hunter-hq",
    participantIds: [
      "cheadle",
      "mizaistom",
      "kanzai",
      "pyon",
      "botobai",
      "gel",
      "saccho",
      "ginta",
      "saiyu",
      "cluck",
    ],
    storylineIds: ["expedition-prep", "beyond-netero"],
    consequences: [
      "Cheadle accepts the mission on behalf of the Zodiacs",
      "The Association's rivalry with Beyond becomes a dead man's request",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-341-beyond-surrenders",
    title: "Beyond turns himself in",
    summary:
      "Mid-argument about how to hunt him, the Zodiacs get a call from Beyond Netero himself — and then the man walks in. He instructs them to tell the V5 that they have 'captured' Beyond Netero, converting his own arrest into the opening move of his negotiation.",
    chapter: 341,
    kind: "decision",
    locationId: "hunter-hq",
    participantIds: ["beyond", "cheadle", "mizaistom", "botobai", "saiyu"],
    storylineIds: ["expedition-prep", "beyond-netero"],
    knowledgeChanges: [
      { factId: "fact-beyond-plan", characterId: "beyond", state: "hiding" },
    ],
    consequences: [
      "Custody of Beyond becomes the Zodiacs' leverage — and their burden",
      "Every subsequent 'concession' Beyond makes is a move he planned",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-342-beyond-declares-war",
    title: "Beyond declares war on the Zodiacs",
    summary:
      "Interviewed in his cell, Beyond predicts the Zodiacs will end up releasing him and joining his voyage, then formally declares war on them; Cheadle accepts and has the exchange recorded. The plan crystallizes: Beyond travels imprisoned, watched, and released only on-site — while he counts on contacting his companions anyway.",
    chapter: 342,
    kind: "conversation",
    locationId: "hunter-hq",
    participantIds: [
      "beyond",
      "cheadle",
      "mizaistom",
      "saccho",
      "kanzai",
      "gel",
    ],
    storylineIds: ["expedition-prep", "beyond-netero"],
    consequences: [
      "The Zodiacs commit to going to the Dark Continent with Beyond",
      "Saccho volunteers as Beyond's warden",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-342-v6-proposal",
    title: "The V5 weigh becoming the V6",
    summary:
      "With only military options left to stop Kakin, the V5 and the International Permit Agency tally the grim ledger — 149 known attempts on the Dark Continent, 28 survivors, 3 reintegrated — and conclude it is better to usher Kakin into the fold as a sixth member and steer the voyage than to fight it.",
    chapter: 342,
    kind: "decision",
    participantIds: ["nasubi"],
    storylineIds: ["expedition-prep"],
    consequences: [
      "Kakin's voyage moves from rogue act toward sanctioned expedition",
      "The Hunter Association is slotted in as the trip's chaperone",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-342-black-whale-presented",
    title: "The Black Whale is presented to the world",
    summary:
      "Kakin unveils its transport vessel: the Black Whale, built to carry 200,000 people, first of a planned fleet meant to move a hundred million emigrants in five years. The maiden voyage will carry Beyond Netero, King Nasubi, and his fourteen princes; civilian berths go by lottery.",
    chapter: 342,
    kind: "other",
    participantIds: ["nasubi", "beyond"],
    storylineIds: ["expedition-prep", "succession-contest"],
    consequences: [
      "The stage of the coming succession war enters the story",
      "All fourteen princes are committed to the same sealed ship",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-342-ging-confronts-pariston",
    title: "Ging challenges Pariston in Beyond's lair",
    summary:
      "Ging walks into the expedition team's hideout and calls Pariston's bluff: if the governments stall, Pariston is ready to unleash 5,000 Chimera Ant soldiers he has been sheltering. Ging announces he will no longer let Pariston do as he pleases — he wants to 'play by himself'.",
    chapter: 342,
    kind: "conversation",
    participantIds: ["ging", "pariston"],
    storylineIds: ["expedition-prep"],
    consequences: [
      "Ging inserts himself into Beyond's team as Pariston's counterweight",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-343-leorio-recruited",
    title: "Cheadle recruits Leorio to the Zodiacs",
    summary:
      "Cheadle phones Leorio and offers him a Zodiac seat, sweetening it with a place in her own medical program for the voyage. Leorio accepts — and immediately asks whether the second vacant chair is still open, because he has someone in mind.",
    chapter: 343,
    kind: "decision",
    participantIds: ["cheadle", "leorio"],
    storylineIds: ["expedition-prep"],
    consequences: [
      "Leorio fills Kanzai's flank as the new Boar",
      "Kurapika's recruitment is set in motion by his friend",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-343-mizaistom-recruits-kurapika",
    title: "Mizaistom offers Kurapika the Rat's seat — and Tserriednich",
    summary:
      "Mizaistom tracks Kurapika down and invites him to the Zodiacs at Leorio's recommendation. Kurapika refuses until Mizaistom names the price of joining: the Association knows who holds the largest collection of Scarlet Eyes — Kakin's Fourth Prince, Tserriednich Hui Guo Rou. Kurapika joins.",
    chapter: 343,
    kind: "alliance",
    participantIds: ["mizaistom", "kurapika", "tserriednich"],
    storylineIds: ["expedition-prep"],
    consequences: [
      "Kurapika becomes the Rat — for the eyes, not the voyage",
      "His collision course with the Fourth Prince is fixed years before boarding",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-344-leorio-kurapika-call",
    title: "Leorio reconnects Kurapika to the group",
    summary:
      "On the drive to Association headquarters, Kurapika takes Leorio's call. Leorio assures him Gon is fine, asks for an e-mail address Kurapika still refuses to give, and tells him his talents are more useful with the Zodiacs.",
    chapter: 344,
    kind: "conversation",
    participantIds: ["leorio", "kurapika"],
    storylineIds: ["expedition-prep"],
    confidence: "canonical",
  },
  {
    id: "ev-344-kurapika-last-eyes",
    title: "Kurapika faces the last collector",
    summary:
      "At the memorial holding the Scarlet Eyes he has recovered, Kurapika studies Tserriednich's photograph and counts the cost of every retrieval. The Fourth Prince is the last collector with the last group of eyes — including Pairo's — leaving Kurapika to wonder what remains when the journey ends and there is no home to return to.",
    chapter: 344,
    kind: "discovery",
    participantIds: ["kurapika", "tserriednich"],
    storylineIds: ["expedition-prep"],
    consequences: [
      "Tserriednich becomes the final target of Kurapika's recovery mission",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-344-ging-buys-team",
    title: "Ging buys the No. 2 seat",
    summary:
      "Rather than fight Beyond's followers, Ging offers to double whatever Beyond paid each of them, upfront, in exchange for the No. 2 position Pariston holds. The team splits over the money — and Ging coolly identifies them all as expert Temp Hunters, about 25 of the Association's 200.",
    chapter: 344,
    kind: "decision",
    participantIds: ["ging", "pariston"],
    storylineIds: ["expedition-prep"],
    consequences: [
      "Ging supplants Pariston as nominal No. 2 of Beyond's team",
      "Pariston privately admits Ging is the first person he has ever hated",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-344-gon-nen-lost",
    title: "Gon cannot use Nen",
    summary:
      "Trying to activate his aura, Gon finds nothing answers. Ging later frames it as a return to 'normal' — the price of the contract that gave Gon impossible power against Neferpitou — and tells him to be thankful that was all it cost.",
    chapter: 344,
    kind: "discovery",
    participantIds: ["gon"],
    storylineIds: ["expedition-prep"],
    consequences: ["Gon is written out of the coming voyage's power game"],
    confidence: "canonical",
  },
  {
    id: "ev-344-five-threats-briefing",
    title: "Ging briefs the team on the Five Threats",
    summary:
      "Ging details the five calamities humanity dragged home from the Dark Continent — Brion, Ai, Hellbell, Pap, and the Zobae immortality disease — all deadlier than the Chimera Ants, with containment the only countermeasure. He caps it with a bombshell: the legendary guidebook 'Journey to the New World' is still being written, and its author is Don Freecss.",
    chapter: 344,
    kind: "discovery",
    participantIds: ["ging"],
    storylineIds: ["expedition-prep"],
    consequences: [
      "Beyond's preference for unexplored routes implies a possible sixth threat",
      "The Freecss name is stitched into the Dark Continent's deep history",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-345-gon-whale-island",
    title: "Gon goes home",
    summary:
      "On Ging's advice to use the loss as a chance to look for 'something', Gon returns to Whale Island and Mito. Over dinner he admits that finding Ging was the goal, not staying with him — and that without Nen, following his father would only hold him back.",
    chapter: 345,
    kind: "movement",
    locationId: "whale-island",
    participantIds: ["gon"],
    storylineIds: ["expedition-prep"],
    confidence: "canonical",
  },
  {
    id: "ev-345-tserriednich-murders",
    title: "Tserriednich's hotel bathroom",
    summary:
      "The Fourth Prince invites two starstruck women to his hotel, chats pleasantly, then phones an aide to order a fresh pair — from a bathroom painted in their blood. In one page the target of Kurapika's mission is revealed as a practiced serial killer.",
    chapter: 345,
    kind: "death",
    locationId: "tserriednich-estate",
    participantIds: ["tserriednich"],
    storylineIds: ["expedition-prep"],
    consequences: [
      "Mizaistom's warning about the prince's 'darker side' is grimly confirmed for the reader",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-345-beyond-contract",
    title: "Beyond signs the six-clause contract",
    summary:
      "At the IPA's direction, Cheadle presents Beyond a contract: 24-hour watch, a tracking anklet, monitored communications, no resistance, all discoveries to the V6, no disclosure — one violation means life in prison. Beyond reads it, signs, stabs the pen through the pad, and notes only three things remain: capacity, means, and contract.",
    chapter: 345,
    kind: "decision",
    locationId: "hunter-hq",
    participantIds: ["beyond", "cheadle"],
    storylineIds: ["expedition-prep", "beyond-netero"],
    knowledgeChanges: [
      { factId: "fact-beyond-plan", characterId: "cheadle", state: "suspects" },
    ],
    consequences: [
      "Beyond's custody is formalized on paper he clearly plans around",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-345-kurapika-draws-the-line",
    title: "Kurapika names his limit with Tserriednich",
    summary:
      "Mizaistom asks what happens after the Scarlet Eyes are recovered. Kurapika says he wants nothing else from Tserriednich and will yield to almost any demand, but adds that two collectors who once preferred death both surrendered the eyes without dying. He expects the Fourth Prince to do the same.",
    chapter: 345,
    kind: "conversation",
    participantIds: ["kurapika", "mizaistom", "tserriednich"],
    storylineIds: ["expedition-prep"],
    confidence: "canonical",
  },
  // -------------------------------------------------------------------------
  // Ch 346–350 — the Zodiacs regroup; Kakin's contest takes shape
  // -------------------------------------------------------------------------
  {
    id: "ev-346-v6-and-roles",
    title: "The V6 is born; the Zodiacs take their stations",
    summary:
      "Cheadle briefs the full Zodiacs — new Rat and Boar included — that the V5 has admitted Kakin and become the V6, and that the Five Threats have been re-ranked above the Chimera Ants. The mission: capture at least one Threat, survive the trip home, and manage Beyond throughout. The twelve split into Science, Intelligence, Defense, and Flora/Fauna teams.",
    chapter: 346,
    kind: "decision",
    locationId: "hunter-hq",
    participantIds: [
      "cheadle",
      "kurapika",
      "leorio",
      "mizaistom",
      "botobai",
      "saiyu",
      "kanzai",
      "gel",
      "saccho",
      "ginta",
      "cluck",
      "pyon",
    ],
    storylineIds: ["expedition-prep"],
    consequences: [
      "Kurapika is codenamed Rat; Leorio, Boar",
      "Kurapika lands on the Intelligence team, handling Beyond and Kakin secrets",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-346-mole-suspected",
    title: "Kurapika names the possibility of a Zodiac mole",
    summary:
      "In his first meeting, Kurapika asks whether anyone has identified Beyond's allies inside the Association — Beyond planned around his father's death for years, so infiltration is certain. Mizaistom hustles him out and admits he and Cheadle reached the same conclusion: the mole may sit among the Zodiacs themselves, and it must never be mentioned aloud again.",
    chapter: 346,
    kind: "investigation",
    locationId: "hunter-hq",
    participantIds: ["kurapika", "mizaistom", "cheadle"],
    storylineIds: ["expedition-prep", "beyond-netero"],
    consequences: [
      "Kurapika and Mizaistom begin a private counter-intelligence operation",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-346-muherr-ultimatum",
    title: "The mercenaries force the No. 2 question",
    summary:
      "A month on, Beyond's assassins have all failed the 289th Hunter Exam — rumor says the new Rat can read minds. Muherr's soldiers present Ging and Pariston two options: one of them leaves the team. Ging offers a third — the assassins leave — and Pariston a fourth: the assassins die.",
    chapter: 346,
    kind: "conversation",
    participantIds: ["ging", "pariston", "kurapika"],
    storylineIds: ["expedition-prep"],
    confidence: "canonical",
  },
  {
    id: "ev-347-staged-ambush",
    title: "Ging dismantles the staged ambush",
    summary:
      "Muherr's henchmen open fire with conjured guns; Ging knocks them all out using an imitation of Leorio's remote-punch ability — he can copy any physical technique he has been hit with — then reveals he knew the whole attack was Pariston's stage play to scout his abilities.",
    chapter: 347,
    kind: "battle",
    participantIds: ["ging", "pariston"],
    storylineIds: ["expedition-prep"],
    consequences: [
      "Ging's mimicry talent enters the record",
      "Pariston's probe fails — and deepens his fixation on Ging",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-347-ging-number-two",
    title: "Ging is accepted as No. 2 — on soldiers' terms",
    summary:
      "Muherr explains why the money offer nearly broke the team: soldiers run on trust, and a rumor of being bought is ostracism. Ging apologizes, routes the money into the Norwell Fund for fallen soldiers' families — binding himself under mercenary account rules — and is accepted as No. 2, with Muherr holding absolute battlefield command.",
    chapter: 347,
    kind: "alliance",
    participantIds: ["ging", "pariston"],
    storylineIds: ["expedition-prep"],
    consequences: [
      "Ging's authority is nominal by his own design; Pariston declines to reclaim the seat",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-348-dowsing-screening",
    title: "Dowsing Chain guards the Hunter Exam",
    summary:
      "The 289th exam's final phase is an interview about Beyond's expedition, with Kurapika behind the glass running his Dowsing Chain as a lie detector. Beyond's plants are weeded out — though Kurapika notes the chain would fail against anyone whose memory had been altered.",
    chapter: 348,
    kind: "investigation",
    locationId: "hunter-hq",
    participantIds: ["kurapika", "mizaistom", "cheadle"],
    storylineIds: ["expedition-prep"],
    consequences: [
      "Spies are kept out of the Association's new intake — but not off the ship",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-348-succession-decree",
    title: "Nasubi's decree: the survivor becomes king",
    summary:
      "Benjamin phones Tserriednich mid-lion-wrestling with their father's decision: whoever survives the expedition becomes Kakin's next king. Tserriednich thanks God and promises his older brother the throne is his. Both princes' camps begin maneuvering their bodyguards around the Hunter Exam results.",
    chapter: 348,
    kind: "decision",
    participantIds: ["benjamin", "tserriednich", "nasubi"],
    storylineIds: ["succession-contest"],
    consequences: [
      "The succession war exists before anyone boards — as a royal decree",
      "Tserriednich's five guards pass the exam as Provisional Hunters; Luzurus's all fail",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-348-saiyu-mole",
    title: "The mole is Saiyu",
    summary:
      "Under cover of the Zodiacs' new ability-sharing session — staged by Mizaistom to 'strengthen cooperation' — Kurapika watches through a hidden camera with his Dowsing Chain. The traitor feeding Beyond's side is Saiyu, the Monkey.",
    chapter: 348,
    kind: "discovery",
    locationId: "hunter-hq",
    participantIds: ["kurapika", "mizaistom", "saiyu"],
    storylineIds: ["expedition-prep", "beyond-netero"],
    consequences: [
      "Two Zodiacs now share a secret the other nine would condemn",
      "Saiyu is left in place, unaware, as a monitored asset",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-349-succession-rules",
    title: "The rules of the succession war",
    summary:
      "Nasubi's messenger lays out the terms to Tserriednich: only children of the eight legal wives may compete, only if they board the Black Whale and attend the departure ceremony, and the war begins when the ship's horn finishes sounding — any death before that cancels everything. All fourteen princes are enumerated for the first time.",
    chapter: 349,
    kind: "decision",
    locationId: "kakin-palace",
    participantIds: ["tserriednich", "nasubi"],
    storylineIds: ["succession-contest"],
    consequences: [
      "The Black Whale's maiden voyage is formally a duel arena for fourteen heirs",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-349-seed-urn",
    title: "Tserriednich completes the Seed Urn ceremony",
    summary:
      "Tserriednich drops his blood into the ritual pot said to be conjured by Kakin's first king in imitation of the Worm Toxin poison-magic. A fairy feeds him an egg: every participant unknowingly hosts the seed of a Guardian Spirit Beast, a protector shaped by its host's character. Nasubi's creed: 'vessels' unfit to rule will be culled.",
    chapter: 349,
    kind: "ceremony",
    locationId: "kakin-palace",
    participantIds: ["tserriednich", "nasubi"],
    storylineIds: ["succession-contest"],
    consequences: [
      "The Guardian Spirit Beasts — the arc's parasitic Nen engine — are seeded",
      "The succession war is revealed as ritual, not mere politics",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-349-beyond-festival-refusal",
    title: "Beyond shrugs at the festival bargain",
    summary:
      "Mizaistom offers Beyond attendance at Kakin's departure-eve celebration in exchange for naming the Zodiac spy. Beyond corrects him twice: he knows of no spy, and he does not care about the ceremony — Kakin will pressure the V6, and the Zodiacs themselves will end up begging him to attend. Kurapika, reviewing the tape, confirms every word is true.",
    chapter: 349,
    kind: "conversation",
    locationId: "hunter-hq",
    participantIds: ["beyond", "mizaistom", "kurapika"],
    storylineIds: ["expedition-prep", "beyond-netero"],
    knowledgeChanges: [
      {
        factId: "fact-beyond-plan",
        characterId: "mizaistom",
        state: "suspects",
      },
    ],
    consequences: [
      "Pariston, not Beyond, is pegged as the mastermind running Saiyu",
      "Kurapika and Mizaistom plan to arrest Saiyu just before landing — telling no one",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-349-princes-hiring",
    title: "Six princes post for bodyguards",
    summary:
      "Word reaches Kurapika, Mizaistom, and Cheadle: six unidentified Kakin princes are hiring bodyguards for the celebration and the voyage, with preference for Hunters. Every spy screened out of the exam now has a side door onto the ship.",
    chapter: 349,
    kind: "discovery",
    participantIds: ["kurapika", "mizaistom", "cheadle"],
    storylineIds: ["expedition-prep", "succession-contest"],
    consequences: [
      "The Association's careful screening is rendered porous overnight",
      "Kurapika sees his route toward Tserriednich",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-350-kurapika-recruits-hunters",
    title: "Kurapika assembles his infiltration team",
    summary:
      "Kurapika recruits Biscuit, Basho, Izunavi, Hanzo, and Melody to apply to the six princes' postings and feed him information — anything that gets him physical contact with Tserriednich, at which point everyone may abort with full pay. He profiles the six near-identical listings to guess which one is Halkenburg's.",
    chapter: 350,
    kind: "alliance",
    participantIds: [
      "kurapika",
      "biscuit",
      "basho",
      "izunavi",
      "hanzo",
      "melody",
    ],
    storylineIds: ["expedition-prep", "succession-contest"],
    consequences: [
      "Five veteran Hunters are seeded across five princes' guard details",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-350-oito-hires-kurapika",
    title: "Queen Oito's trap — and her true offer",
    summary:
      "The posting Kurapika pegged as Halkenburg's belongs to Queen Oito, mother of the infant Fourteenth Prince: the vagueness was bait for assassins and fake followers, whose self-interest makes them useful shields. She reveals the succession war outright and offers ten times the fee for the real job — get her and Woble off the ship alive. Kurapika accepts, with conditions.",
    chapter: 350,
    kind: "alliance",
    participantIds: ["kurapika", "oito", "woble"],
    storylineIds: ["expedition-prep", "succession-contest", "kurapika-woble"],
    consequences: [
      "The arc's central contract — Room 1014's whole reason to exist — is signed",
      "Kurapika learns the contest's true nature months before boarding",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-350-guard-placements",
    title: "The infiltrators land their posts",
    summary:
      "The applications resolve: Izunavi is hired by Tyson, Biscuit by Marayam, Basho by Luzurus, Melody by Kacho, and Hanzo by Momoze. Kurapika's network now touches six royal households — none of them Tserriednich's.",
    chapter: 350,
    kind: "movement",
    participantIds: ["izunavi", "biscuit", "basho", "melody", "hanzo"],
    storylineIds: ["expedition-prep", "succession-contest"],
    consequences: [
      "The bodyguard placements that define the voyage's first act are fixed",
    ],
    confidence: "canonical",
  },
  // -------------------------------------------------------------------------
  // Ch 351–357 — Heavens Arena: Hisoka vs. Chrollo
  // -------------------------------------------------------------------------
  {
    id: "ev-351-deathmatch-begins",
    title: "Hisoka vs. Chrollo — a sanctioned fight to the death",
    summary:
      "Chrollo's debut match as a Heavens Arena Floor Master is against the challenger who chose him: Hisoka. Hisoka wants no exhibition; Chrollo agrees to a battle to the death under arena rules, weapons allowed, in front of a paying audience.",
    chapter: 351,
    kind: "battle",
    locationId: "heavens-arena",
    participantIds: ["hisoka", "chrollo"],
    storylineIds: ["heavens-arena-duel"],
    consequences: [
      "The fight Hisoka postponed York New for finally happens — on Chrollo's terms",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-351-chrollo-arsenal",
    title: "Chrollo unveils his borrowed arsenal",
    summary:
      "Chrollo plants Black Voice antennas in the judge, then shows the marks of The Sun and Moon — a dead Meteor City elder's ability that turns touched targets into bombs — and Double Face, a bookmark that lets him keep one stolen page active with the book closed. He promises three more abilities before the kill.",
    chapter: 351,
    kind: "nen-reveal",
    locationId: "heavens-arena",
    participantIds: ["chrollo", "hisoka"],
    storylineIds: ["heavens-arena-duel"],
    consequences: [
      "Chrollo's years avoiding Hisoka are recast as preparation, not flight",
      "Two-ability combos make Skill Hunter a different weapon than at York New",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-352-puppet-system",
    title: "Order Stamp, Gallery Fake, Convert Hands",
    summary:
      "Chrollo completes the lecture: Order Stamp drives simple-command puppets, Gallery Fake (Kortopi's ability) copies bodies to puppet, and Convert Hands swaps appearances. The trap inside the tutorial: The Sun and Moon outlives its dead owner, so its marks are permanent — and, as Hisoka will learn too late, they protect marked copies from vanishing.",
    chapter: 352,
    kind: "nen-reveal",
    locationId: "heavens-arena",
    participantIds: ["chrollo", "hisoka"],
    storylineIds: ["heavens-arena-duel"],
    consequences: [
      "Chrollo's kill-chain is assembled in the open, daring Hisoka to solve it",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-352-convert-hands",
    title: "The last borrowed ability: Convert Hands",
    summary:
      "Chrollo shows the fifth stolen tool — Convert Hands, an arrow on each palm: his right hand makes a target look like Chrollo, while his left makes Chrollo look like the target; touching with both swaps their appearances. Double Face lets him keep one ability active while opening another page, allowing the five-tool plan to operate as a sequence rather than all at once.",
    chapter: 352,
    kind: "nen-reveal",
    locationId: "heavens-arena",
    participantIds: ["hisoka", "chrollo"],
    storylineIds: ["heavens-arena-duel"],
    consequences: [
      "Hisoka can no longer trust that any face in the arena is really Chrollo's",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-353-audience-weaponized",
    title: "The audience becomes the weapon",
    summary:
      "Chrollo disappears into the stands, copies spectators with Gallery Fake, stamps the copies, and sends a horde with one order: 'break Hisoka' — sever the head. Between waves he strikes Hisoka himself from disguise, kicking him loose whenever the puppets pin his attention.",
    chapter: 353,
    kind: "battle",
    locationId: "heavens-arena",
    participantIds: ["chrollo", "hisoka"],
    storylineIds: ["heavens-arena-duel"],
    consequences: [
      "The deathmatch stops being a duel: Hisoka now fights the venue itself",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-353-puppet-swarm",
    title: "Thirty puppets and a hidden striker",
    summary:
      "Chrollo's sequence resolves for Hisoka: bookmark Gallery Fake, copy a crowd, stamp them with Order Stamp, command 'break Hisoka.' Roughly thirty marked audience-copies swarm him while the disguised Chrollo strikes from behind between waves. Hisoka bungees to the ceiling, beheads puppets to buy seconds, and starts hunting the one real body in the crowd.",
    chapter: 353,
    kind: "battle",
    locationId: "heavens-arena",
    participantIds: ["hisoka", "chrollo"],
    storylineIds: ["heavens-arena-duel"],
    consequences: [
      "Hisoka must find Chrollo before the ten-minute paramedic window closes",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-354-decoy-kill",
    title: "Hisoka kills 'Chrollo' — a decoy",
    summary:
      "Hisoka runs down and slams the Chrollo he can see; the broken body is an audience member reshaped by Convert Hands and driven by Black Voice. Working backward through the impossible ability sequence, Hisoka lands on the real problem: a puppet marked by The Sun and Moon never vanishes.",
    chapter: 354,
    kind: "battle",
    locationId: "heavens-arena",
    participantIds: ["hisoka", "chrollo"],
    storylineIds: ["heavens-arena-duel"],
    consequences: [
      "Every remaining 'corpse' in the arena is potentially a live bomb",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-355-hand-destroyed",
    title: "The severed head detonates in Hisoka's hand",
    summary:
      "A puppet seizes the announcer's headset and broadcasts 'break Hisoka'; hundreds of marked spectator-copies flood the ring. Hisoka swings a Bungee Gum hammer of puppets to hold the line — until Chrollo, via Black Voice, touches moon to sun and detonates the severed head Hisoka has carried all fight, obliterating four fingers of his right hand.",
    chapter: 355,
    kind: "battle",
    locationId: "heavens-arena",
    participantIds: ["chrollo", "hisoka"],
    storylineIds: ["heavens-arena-duel"],
    consequences: ["Hisoka's own favorite prop was the bomb the whole time"],
    confidence: "canonical",
  },
  {
    id: "ev-355-sun-moon-trap",
    title: "The Sun and Moon deduction",
    summary:
      "Hisoka corrects his own model: The Sun and Moon needs only the left hand, so it runs while another ability is bookmarked — and copies marked by it survive because the dead owner's intensified Nen shields them. Chrollo can charge a body into a full-power bomb after landing the mark, then trigger it through a Black-Voice puppet. Every 'corpse' Hisoka has been swinging is a delayed detonation.",
    chapter: 355,
    kind: "nen-reveal",
    locationId: "heavens-arena",
    participantIds: ["hisoka", "chrollo"],
    storylineIds: ["heavens-arena-duel"],
    consequences: [
      "The severed heads Hisoka fights with are Chrollo's planted ordnance",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-356-hisoka-death",
    title: "Hisoka dies",
    summary:
      "Bomb puppets leap from the balconies; an explosion takes Hisoka's right lower leg, thrown bodies ground him, and the horde closes in. In the final blast Hisoka suffocates under the press of flesh and smoke. The match — and, by every measure available, Hisoka's life — is over.",
    chapter: 356,
    kind: "death",
    locationId: "heavens-arena",
    participantIds: ["chrollo", "hisoka"],
    casualtyIds: ["hisoka"],
    storylineIds: ["heavens-arena-duel"],
    consequences: [
      "Chrollo wins the deathmatch outright, with massive civilian collateral",
      "News reports list Hisoka among the casualties",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-356-suicide-barrage",
    title: "The suicide-bomb barrage buries Hisoka",
    summary:
      "Chrollo chains the traps: a first sun-marked body detonates, then he orders puppets to the second floor to self-destruct against Hisoka. A leaping cluster blows off Hisoka's lower right leg; Chrollo hurls audience members to pin him as he reaches for Bungee Gum, and the swarm closes over him under one final blast — the sequence that leaves him dead beneath the pile.",
    chapter: 356,
    kind: "battle",
    locationId: "heavens-arena",
    participantIds: ["hisoka", "chrollo"],
    storylineIds: ["heavens-arena-duel"],
    consequences: [
      "Chrollo walks away the winner; the arena is left a crater of bodies",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-357-hisoka-revival",
    title: "Bungee Gum restarts a dead man's heart",
    summary:
      "As Machi prepares to stitch the corpse out of professional courtesy, Hisoka's aura surges: before dying he ordered Bungee Gum to activate after death — Nen intensifies post-mortem — and pump his heart and lungs. He wakes, confirms with Machi that he was really dead, and patches his ruined face, hand, and leg with Bungee Gum and Texture Surprise.",
    chapter: 357,
    kind: "nen-reveal",
    locationId: "heavens-arena",
    participantIds: ["hisoka", "machi"],
    storylineIds: ["heavens-arena-duel", "troupe-hisoka-hunt"],
    knowledgeChanges: [
      { factId: "fact-hisoka-alive", characterId: "machi", state: "knows" },
      { factId: "fact-hisoka-alive", characterId: "chrollo", state: "unaware" },
    ],
    consequences: [
      "The public record says Hisoka died at Heavens Arena — and stays wrong",
      "Post-mortem Nen jumps from lore to demonstrated fact",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-357-hisoka-declares-war",
    title: "Hisoka declares war on the Spiders",
    summary:
      "Hisoka pins Machi with Bungee Gum and gives her a message for the Troupe: he is done picking his battles — he will hunt and fight the Spiders wherever they are, one by one, until every one of them is dead.",
    chapter: 357,
    kind: "decision",
    locationId: "heavens-arena",
    participantIds: ["hisoka", "machi"],
    storylineIds: ["heavens-arena-duel", "troupe-hisoka-hunt"],
    consequences: [
      "The hunter-and-prey roles of the coming voyage are set — in both directions",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-357-chrollo-heist-plan",
    title: "Chrollo sets the Troupe on the Black Whale",
    summary:
      "On the phone with Shalnark, Chrollo lays out the next job: the Kakin royal family is inviting civilian passengers on the voyage, and the ship will carry a considerable treasure. The Troupe will board the Black Whale, steal it, and reunite the whole Spider at sea.",
    chapter: 357,
    kind: "decision",
    participantIds: ["chrollo", "shalnark"],
    storylineIds: ["troupe-hisoka-hunt"],
    consequences: [
      "The Phantom Troupe's presence aboard is planned before departure — for treasure, not for Hisoka",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-357-kortopi-shalnark-killed",
    title: "Kortopi and Shalnark are murdered",
    summary:
      "Minutes after the phone call, Hisoka walks out of a public bathroom carrying Kortopi's severed head, tosses it to Shalnark, and kills him with a single strike while he catches it. He leaves Shalnark's body tied to a swing with Kortopi's head at its feet: 'two down, ten to go.'",
    chapter: 357,
    kind: "death",
    participantIds: ["hisoka", "shalnark", "kortopi"],
    casualtyIds: ["kortopi", "shalnark"],
    storylineIds: ["troupe-hisoka-hunt", "heavens-arena-duel"],
    consequences: [
      "The Troupe's boarding of the Black Whale gains a second motive: revenge",
      "Gallery Fake and Black Voice die with their owners — Chrollo's book loses both pages",
    ],
    confidence: "canonical",
  },
  // -------------------------------------------------------------------------
  // Ch 358 — "Eve", day 0 (pre-departure)
  // -------------------------------------------------------------------------
  {
    id: "ev-358-kurapika-accepts",
    title: "Kurapika accepts the Woble contract",
    summary:
      "Kurapika serves as bodyguard to the infant Fourteenth Prince Woble and Queen Oito — a posting he took because a pair of Scarlet Eyes is held by the Fourth Prince. He promises Oito they will look for a way to avoid the succession battle altogether.",
    chapter: 358,
    kind: "decision",
    locationId: "room-1014",
    participantIds: ["kurapika", "oito", "woble"],
    storylineIds: ["kurapika-woble", "succession-contest"],
    consequences: [
      "Kurapika enters the succession war on the weakest side",
      "His true mission — contact with Tserriednich — must run through the war",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-358-ship-structure",
    title: "The Black Whale's rules are laid out",
    summary:
      "Five tiers, royal family on top, steerage below; martial law throughout; phone lines and corridors military-controlled; the Tier 2/3 bulkhead openable only from above. Balsamilco tells Benjamin's soldiers the first two tiers are the contest's only 'hunting grounds' and holds 'Operation Assault' in reserve.",
    chapter: 358,
    kind: "other",
    locationId: "black-whale",
    participantIds: ["balsamilco", "benjamin", "kurapika", "oito"],
    storylineIds: ["succession-contest", "benjamin-military"],
    consequences: [
      "Kurapika earmarks the Tier 2/3 bulkhead as a possible escape route for Oito and Woble",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-358-zodiacs-stretched",
    title: "The Zodiacs are stretched thin before departure",
    summary:
      "Mizaistom warns Kurapika that crime on Tiers 3–4 already outruns Kakin's preparations — a fraction of the needed clinics and doctors boarded — and that he and Botobai must reinforce ship security instead of attending Zodiac meetings.",
    chapter: 358,
    kind: "conversation",
    locationId: "black-whale",
    participantIds: ["mizaistom", "kurapika"],
    storylineIds: ["ship-security-crisis", "beyond-netero"],
    confidence: "canonical",
  },
  {
    id: "ev-358-cradle-aura",
    title: "Aura rises from Woble's cradle",
    summary:
      "Kurapika senses a burst of aura from the infant's cradle and turns to find nothing. The first hint that something invisible already lives with the Fourteenth Prince.",
    chapter: 358,
    kind: "discovery",
    locationId: "room-1014",
    participantIds: ["kurapika", "woble"],
    storylineIds: ["kurapika-woble", "succession-contest"],
    knowledgeChanges: [
      {
        factId: "fact-woble-beast",
        characterId: "kurapika",
        state: "suspects",
      },
    ],
    confidence: "canonical",
  },

  // -------------------------------------------------------------------------
  // Ch 359 — "Departure", day 1
  // -------------------------------------------------------------------------
  {
    id: "ev-359-departure",
    title: "The Black Whale departs",
    summary:
      "The Black Whale leaves port on a two-month voyage: three weeks in known waters, five in uncharted seas. The moment the gangways lift, the contest's arena is sealed — no prince leaves until landfall.",
    chapter: 359,
    day: 1,
    kind: "ceremony",
    locationId: "black-whale",
    participantIds: ["nasubi", "beyond", "kurapika", "oito", "woble"],
    storylineIds: ["succession-contest", "beyond-netero"],
    confidence: "canonical",
  },
  {
    id: "ev-359-leorio-medical-post",
    title: "Leorio takes his post in the Tier 3 clinic",
    summary:
      "As the ship departs, Leorio works under Cheadle in the central medical clinic, carrying and organizing supplies for the severely understaffed voyage.",
    chapter: 359,
    day: 1,
    kind: "movement",
    locationId: "tier-3-medical",
    participantIds: ["leorio", "cheadle"],
    storylineIds: ["ship-security-crisis"],
    confidence: "canonical",
  },
  {
    id: "ev-359-five-guards-drained",
    title: "Five royal guards die drained of blood",
    summary:
      "Within the first two hours of the voyage, five of Queen Oito's higher-queen-appointed royal guards are found dead, their blood drawn out through small wounds. No intruder, no witness — the debut of the ability later named Silent Majority.",
    chapter: 359,
    day: 1,
    kind: "death",
    locationId: "room-1014",
    participantIds: ["vincent", "kurapika", "bill", "oito"],
    storylineIds: ["silent-majority", "kurapika-woble"],
    consequences: ["Room 1014's detail begins shrinking from day one"],
    knowledgeChanges: [
      {
        factId: "fact-silent-majority-exists",
        characterId: "kurapika",
        state: "suspects",
      },
    ],
    confidence: "canonical",
  },
  {
    id: "ev-359-twins-pact",
    title: "Kacho's plan for the twins",
    summary:
      "Kacho resolves to 'work with' Fugetsu to kill the other princes — and, if the two of them are last, to beg their father to spare Fugetsu. Melody, listening nearby, wonders if the princess is fooling herself.",
    chapter: 359,
    day: 1,
    kind: "decision",
    locationId: "banquet-hall",
    participantIds: ["kacho", "fugetsu"],
    storylineIds: ["kacho-fugetsu"],
    confidence: "canonical",
  },
  {
    id: "ev-359-dowsing-standoff",
    title: "Kurapika draws gun and pendulum on his own room",
    summary:
      "With five guards dead, Kurapika levels his pistol and Dowsing Chain at everyone in Room 1014 and begins interrogating the survivors. Trust inside the detail dies the same night the guards do.",
    chapter: 359,
    day: 1,
    kind: "investigation",
    locationId: "room-1014",
    participantIds: ["kurapika", "bill", "sayird", "oito"],
    storylineIds: ["kurapika-woble", "silent-majority"],
    confidence: "canonical",
  },

  // -------------------------------------------------------------------------
  // Ch 360 — "Parasite", day 1
  // -------------------------------------------------------------------------
  {
    id: "ev-360-succession-briefing",
    title: "Kurapika briefs the room on the succession war",
    summary:
      "Kurapika tells everyone in Room 1014 what only the royal guards knew: the voyage is a war of heirs. The seven royal guards, he reveals, were chosen by the seven higher queens to spy on Oito — protection contingent on their clients' interests.",
    chapter: 360,
    day: 1,
    kind: "conversation",
    locationId: "room-1014",
    participantIds: ["kurapika", "bill", "sayird", "shimano", "oito"],
    storylineIds: ["kurapika-woble", "succession-contest"],
    confidence: "canonical",
  },
  {
    id: "ev-360-beasts-manifest",
    title: "Guardian Spirit Beasts crowd into Room 1014",
    summary:
      "Multiple parasitic Nen beasts manifest in Woble's quarters, visible to Nen users and no one else. The princes themselves do not know the creatures exist.",
    chapter: 360,
    day: 1,
    kind: "discovery",
    locationId: "room-1014",
    participantIds: ["kurapika", "oito", "woble"],
    storylineIds: ["succession-contest", "kurapika-woble"],
    knowledgeChanges: [
      {
        factId: "fact-beast-parasitic-nature",
        characterId: "kurapika",
        state: "knows",
      },
    ],
    confidence: "canonical",
  },
  {
    id: "ev-360-emergency-broadcast",
    title: "Kurapika's all-channels broadcast",
    summary:
      "Kurapika gives his name over the ship's emergency channels and announces that Nen beasts have appeared in his quarters — deliberately detonating the contest's secrecy to force every camp onto the same uncertain footing.",
    chapter: 360,
    day: 1,
    kind: "decision",
    locationId: "room-1014",
    participantIds: ["kurapika"],
    storylineIds: ["kurapika-woble", "succession-contest"],
    consequences: [
      "The surprise value of Benjamin's planned Nen assault is nullified",
      "Every camp now knows a Nen professional guards the Fourteenth",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-360-sayird-possession",
    title: "A possessed Sayird kills three guards",
    summary:
      "Sayird, puppeted by a Guardian Spirit Beast, kills Kurton and the last two royal guards. Kurapika resolves to stop him and take him alive — the enemy, whatever it is, can wear the detail's own people.",
    chapter: 360,
    day: 1,
    kind: "death",
    locationId: "room-1014",
    participantIds: ["sayird", "kurapika", "bill", "oito"],
    storylineIds: ["kurapika-woble", "silent-majority"],
    confidence: "canonical",
  },

  // -------------------------------------------------------------------------
  // Ch 361 — "Withdraw", day 1 (+2h)
  // -------------------------------------------------------------------------
  {
    id: "ev-361-steal-chain-reveal",
    title: "Steal Chain takes Little Eye",
    summary:
      "Kurapika's index-finger chain is shown: it drains a target's aura into forced Zetsu and borrows one ability for one use. He strips Little Eye — a Nen ball that captures and pilots small creatures — from the restrained Sayird, who is then arrested for the killings.",
    chapter: 361,
    day: 1,
    kind: "nen-reveal",
    locationId: "room-1014",
    participantIds: ["kurapika", "sayird"],
    storylineIds: ["kurapika-woble"],
    knowledgeChanges: [
      { factId: "fact-little-eye", characterId: "kurapika", state: "knows" },
    ],
    consequences: [
      "Room 1014 is down to two guards and two servants from eleven and four",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-361-sevanti-reassignment",
    title: "Sevanti guts Momoze's detail",
    summary:
      "Two hours into the voyage, Queen Sevanti orders Momoze's personal guards and servants transferred wholesale to her little brother Marayam — the child Sevanti judges worth saving. The Twelfth Prince is left with only the higher queens' spy-guards.",
    chapter: 361,
    day: 1,
    kind: "decision",
    locationId: "marayam-quarters",
    participantIds: ["sevanti", "momoze", "marayam", "vergei"],
    storylineIds: ["succession-contest", "ship-security-crisis"],
    consequences: ["Momoze becomes the contest's softest target"],
    confidence: "canonical",
  },
  {
    id: "ev-361-momoze-beast-id",
    title: "The hamster beast is Momoze's",
    summary:
      "The reader learns the small beast that puppeted Sayird belongs to Prince Momoze — a girl whose guardian kills for her without her knowledge or consent.",
    chapter: 361,
    day: 1,
    kind: "nen-reveal",
    locationId: "momoze-quarters",
    participantIds: ["momoze"],
    storylineIds: ["silent-majority", "succession-contest"],
    confidence: "canonical",
  },
  {
    id: "ev-361-halkenburg-withdraw",
    title: "Halkenburg asks to withdraw; Nasubi shrugs",
    summary:
      "The Ninth Prince, whose cyclops-like Guardian Spirit Beast is revealed this chapter, tells his father he wants out of the succession battle. Nasubi's answer — 'do as you wish' — commits him to a contest that has no exit clause.",
    chapter: 361,
    day: 1,
    kind: "conversation",
    locationId: "banquet-hall",
    participantIds: ["halkenburg", "nasubi"],
    storylineIds: ["halkenburg-movement", "succession-contest"],
    confidence: "canonical",
  },
  {
    id: "ev-361-escape-routes",
    title: "Bill's three escape routes",
    summary:
      "Bill lays out the only ways Oito and Woble could ever leave the ship: Kurton's transforming ability (dead with him), Pariston Hill, or Beyond Netero. Every surviving option runs through someone untrustworthy.",
    chapter: 361,
    day: 1,
    kind: "conversation",
    locationId: "room-1014",
    participantIds: ["bill", "kurapika", "oito"],
    storylineIds: ["kurapika-woble", "beyond-netero"],
    confidence: "canonical",
  },

  // -------------------------------------------------------------------------
  // Ch 362 — "Resolve", day 1
  // -------------------------------------------------------------------------
  {
    id: "ev-362-tubeppa-tserriednich-alliance",
    title: "Tubeppa allies with Tserriednich",
    summary:
      "The Fifth Prince forms an alliance with the Fourth — chemistry and depravity shaking hands — while the elder princes' Guardian Spirit Beasts are shown to the reader for the first time.",
    chapter: 362,
    day: 1,
    kind: "alliance",
    locationId: "royal-quarters",
    participantIds: ["tubeppa", "tserriednich"],
    storylineIds: ["succession-contest"],
    confidence: "canonical",
  },
  {
    id: "ev-362-beast-rules",
    title: "The beasts' non-aggression rule",
    summary:
      "A working rule of the system emerges from Nasubi's monologue: Guardian Spirit Beasts do not kill each other and do not directly attack other beasts' hosts. The war they enable must be fought through humans.",
    chapter: 362,
    day: 1,
    kind: "discovery",
    locationId: "royal-quarters",
    participantIds: [
      "nasubi",
      "benjamin",
      "camilla",
      "zhang-lei",
      "tserriednich",
    ],
    storylineIds: ["succession-contest"],
    confidence: "canonical",
  },
  {
    id: "ev-362-theta-resolve",
    title: "Theta decides to teach Tserriednich — her way",
    summary:
      "Theta and Salkov are the only Nen users among the Fourth Prince's guards. Theta resolves to handle his instruction personally, planning to throttle the growth of a man whose potential for evil she already knows firsthand.",
    chapter: 362,
    day: 1,
    kind: "decision",
    locationId: "tserriednich-quarters",
    participantIds: ["theta", "salkov", "tserriednich"],
    storylineIds: ["tserriednich-nen"],
    confidence: "canonical",
  },
  {
    id: "ev-362-halkenburg-guards-collapse",
    title: "Halkenburg's guards collapse as one",
    summary:
      "The Ninth Prince finds his entire loyal guard detail unconscious around him under circumstances no one can explain — the first outward sign of whatever his beast is doing.",
    chapter: 362,
    day: 1,
    kind: "discovery",
    locationId: "halkenburg-quarters",
    participantIds: ["halkenburg"],
    storylineIds: ["halkenburg-movement"],
    confidence: "canonical",
  },

  // -------------------------------------------------------------------------
  // Ch 363 — "Nen Beast", day 1
  // -------------------------------------------------------------------------
  {
    id: "ev-363-benjamin-defensive-turn",
    title: "Balsamilco turns Benjamin defensive",
    summary:
      "Benjamin's opening plan — kill Tserriednich first — is shelved on Balsamilco's advice: Benjamin cannot see the beasts, and Kurapika's broadcast burned the assault's surprise. Instead Benjamin's soldiers will embed as rival princes' guards, report everything, and hold license to kill 'in self-defense.'",
    chapter: 363,
    day: 1,
    kind: "decision",
    locationId: "benjamin-quarters",
    participantIds: ["benjamin", "balsamilco"],
    storylineIds: ["benjamin-military", "succession-contest"],
    consequences: [
      "Every rival camp will host one of Benjamin's Nen soldiers by legal right",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-363-zhang-lei-briefed",
    title: "Zhang Lei learns the beasts exist",
    summary:
      "The Third Prince is briefed on Room 1014's losses and the existence of Nen beasts — news to him and his entire guard corps. In a separate audience, Nasubi tells Camilla and Benjamin that even interpreting the 'sole survivor' rule is part of the contest.",
    chapter: 363,
    day: 1,
    kind: "conversation",
    locationId: "zhang-lei-quarters",
    participantIds: ["zhang-lei", "nasubi", "camilla", "benjamin"],
    storylineIds: ["succession-contest"],
    confidence: "canonical",
  },
  {
    id: "ev-363-vincent-kills-sandra",
    title: "Vincent kills the servant Sandra",
    summary:
      "Benjamin's soldier Vincent forces his way into Room 1014 as its assigned 'guard' and kills the servant Sandra with a knife in the name of self-defense — the military machine testing exactly how much murder its paperwork can absorb.",
    chapter: 363,
    day: 1,
    kind: "death",
    locationId: "room-1014",
    participantIds: ["vincent", "sandra", "kurapika", "bill", "oito"],
    casualtyIds: ["sandra"],
    storylineIds: ["benjamin-military", "kurapika-woble"],
    confidence: "canonical",
  },

  // -------------------------------------------------------------------------
  // Ch 364 — "Speculation", day 1
  // -------------------------------------------------------------------------
  {
    id: "ev-364-vincent-suicide",
    title: "Vincent's aura is stolen; he takes his own life",
    summary:
      "Kurapika drains Vincent with Steal Chain and bluffs an ability that 'forces confessions.' Vincent kills himself rather than talk; Balsamilco suspects the bluff is meant to paint Kurapika as a Manipulator. Benjamin sends Babimyna as Vincent's replacement.",
    chapter: 364,
    day: 1,
    kind: "death",
    locationId: "room-1014",
    participantIds: [
      "vincent",
      "kurapika",
      "bill",
      "balsamilco",
      "benjamin",
      "babimyna",
    ],
    storylineIds: ["kurapika-woble", "benjamin-military"],
    confidence: "canonical",
  },
  {
    id: "ev-364-little-eye-to-oito",
    title: "Little Eye is loaned to Oito",
    summary:
      "Via Stealth Dolphin, Kurapika transfers the stolen Little Eye to Queen Oito, linking their minds until she deactivates it. The queen who boarded expecting to die becomes the room's reconnaissance operator.",
    chapter: 364,
    day: 1,
    kind: "nen-reveal",
    locationId: "room-1014",
    participantIds: ["kurapika", "oito"],
    storylineIds: ["kurapika-woble"],
    confidence: "canonical",
  },
  {
    id: "ev-364-emperor-time-price",
    title: "Emperor Time's price is stated",
    summary:
      "The reader learns the cost under everything Kurapika does: while Emperor Time runs, every second burns one hour of his lifespan.",
    chapter: 364,
    day: 1,
    kind: "nen-reveal",
    locationId: "room-1014",
    participantIds: ["kurapika"],
    storylineIds: ["kurapika-woble"],
    knowledgeChanges: [
      {
        factId: "fact-emperor-time-cost",
        characterId: "kurapika",
        state: "hiding",
      },
    ],
    confidence: "canonical",
  },

  // -------------------------------------------------------------------------
  // Ch 365 — "Choice", day 1
  // -------------------------------------------------------------------------
  {
    id: "ev-365-zhang-lei-truce",
    title: "Zhang Lei offers a truce",
    summary:
      "Shimano routes the switchboard to Zhang Lei against Kurapika's instructions — and it pays off. Visiting Room 1003, Kurapika explains Nen basics and reveals the beasts were seeded at the Seed Urn ceremony in exchange for a truce. Benjamin, kept waiting, hangs up.",
    chapter: 365,
    day: 1,
    kind: "alliance",
    locationId: "zhang-lei-quarters",
    participantIds: ["zhang-lei", "kurapika", "shimano", "oito"],
    storylineIds: ["kurapika-woble", "succession-contest"],
    confidence: "canonical",
  },
  {
    id: "ev-365-tubeppa-truce-offer",
    title: "Tubeppa bids for the same intelligence",
    summary:
      "The Fifth Prince offers her own truce in exchange for beast intelligence; her captain Maor gives Kurapika one hour to resolve the Benjamin-soldier problem before visiting. Room 1014's information is now the block's most liquid currency.",
    chapter: 365,
    day: 1,
    kind: "conversation",
    locationId: "room-1014",
    participantIds: ["tubeppa", "maor", "kurapika"],
    storylineIds: ["kurapika-woble", "succession-contest"],
    confidence: "canonical",
  },

  // -------------------------------------------------------------------------
  // Ch 366 — "To Each His Own", day 1 (+4h)
  // -------------------------------------------------------------------------
  {
    id: "ev-366-sakata-hashito-loan",
    title: "Zhang Lei lends Sakata and Hashito",
    summary:
      "The Third Prince sends two personal guards to reinforce Room 1014 until the next banquet — with Benjamin's observer Coventoba staying at his side and Queen Duazul's Slakka tagging along on First Queen Unma's orders. Every gift comes chaperoned.",
    chapter: 366,
    day: 1,
    kind: "movement",
    locationId: "room-1014",
    participantIds: [
      "sakata",
      "hashito",
      "slakka",
      "zhang-lei",
      "coventoba",
      "kurapika",
    ],
    storylineIds: ["kurapika-woble", "succession-contest"],
    confidence: "canonical",
  },
  {
    id: "ev-366-camilla-plot",
    title: "Camilla plots Benjamin's death; Musse listens",
    summary:
      "Camilla plans to kill Benjamin first, then Halkenburg, and orders her mother Duazul to get close to the Ninth. Benjamin's soldier Musse eavesdrops and plans to secure physical proof with his ability, Secret Window.",
    chapter: 366,
    day: 1,
    kind: "conversation",
    locationId: "camilla-quarters",
    participantIds: ["camilla", "musse", "duazul"],
    storylineIds: ["succession-contest", "benjamin-military"],
    confidence: "canonical",
  },
  {
    id: "ev-366-chrollo-aboard",
    title: "Chrollo shown in Tier 5's Hall 37564",
    summary:
      "The reader's first sight of the Phantom Troupe aboard: Chrollo, alone, in a steerage hall whose number reads 'massacre' in wordplay. The succession war is not the only lethal game on the ship.",
    chapter: 366,
    day: 1,
    kind: "discovery",
    locationId: "hall-37564",
    participantIds: ["chrollo"],
    storylineIds: ["troupe-hisoka-hunt"],
    confidence: "canonical",
  },

  // -------------------------------------------------------------------------
  // Ch 367 — "Synchronization", day 1
  // -------------------------------------------------------------------------
  {
    id: "ev-367-oito-little-eye",
    title: "Oito pilots a cockroach into Room 1013",
    summary:
      "Oito activates Little Eye, captures a cockroach, and steers it into Marayam's quarters — while Babimyna, Slakka, and the visiting guards are led to believe the surveillance ability is Bill's. Babimyna quietly keeps En over the whole room.",
    chapter: 367,
    day: 1,
    kind: "investigation",
    locationId: "room-1014",
    participantIds: ["oito", "kurapika", "bill", "babimyna", "maor", "slakka"],
    storylineIds: ["kurapika-woble"],
    confidence: "canonical",
  },
  {
    id: "ev-367-nen-class-offer",
    title: "Kurapika offers to teach Nen to every camp",
    summary:
      "Trading openly with the guards in the room, Kurapika claims he can teach the basics of Nen in two weeks — and that he will teach anyone who wishes to learn. The classroom gambit is born as an information exchange.",
    chapter: 367,
    day: 1,
    kind: "decision",
    locationId: "room-1014",
    participantIds: ["kurapika", "bill", "maor", "babimyna", "sakata"],
    storylineIds: ["nen-classes", "kurapika-woble"],
    consequences: [
      "Room 1014 pivots from shrinking fortress to intelligence hub",
    ],
    confidence: "canonical",
  },

  // -------------------------------------------------------------------------
  // Ch 368 — "Foul Play", day 1 night
  // -------------------------------------------------------------------------
  {
    id: "ev-368-momoze-killed",
    title: "Momoze is strangled in her sleep",
    summary:
      "The contest claims its first prince on its first night: Momoze, stripped of her own guards by her mother's order, is strangled by an unknown figure. Her six remaining royal guards are detained for court-martial.",
    chapter: 368,
    day: 1,
    approxTime: "night",
    kind: "death",
    locationId: "momoze-quarters",
    participantIds: ["momoze"],
    casualtyIds: ["momoze"],
    storylineIds: ["succession-contest", "ship-security-crisis"],
    consequences: [
      "Every underprotected camp recalculates its survival odds overnight",
    ],
    knowledgeChanges: [
      { factId: "fact-momoze-death", characterId: "sevanti", state: "knows" },
      { factId: "fact-momoze-death", characterId: "vergei", state: "knows" },
    ],
    confidence: "canonical",
  },
  {
    id: "ev-368-kurapika-blackout",
    title: "Emperor Time knocks Kurapika out",
    summary:
      "Nearly three hours of continuous Emperor Time — roughly 450 days of lifespan — drops Kurapika without warning, to Bill's shock. The room's strongest defender has a hard limit, and now his closest ally has seen it.",
    chapter: 368,
    day: 1,
    kind: "other",
    locationId: "room-1014",
    participantIds: ["kurapika", "bill", "oito"],
    storylineIds: ["kurapika-woble"],
    knowledgeChanges: [
      {
        factId: "fact-emperor-time-cost",
        characterId: "bill",
        state: "observed",
      },
    ],
    confidence: "canonical",
  },
  {
    id: "ev-368-class-scheduled",
    title: "The Nen class is scheduled; princes RSVP",
    summary:
      "Training is set for 9 a.m. the next day, two attendees per prince. Every camp accepts except Tyson's and Camilla's — the roster itself the first piece of intelligence the classes produce.",
    chapter: 368,
    day: 1,
    kind: "decision",
    locationId: "room-1014",
    participantIds: ["kurapika", "bill"],
    storylineIds: ["nen-classes"],
    confidence: "canonical",
  },

  // -------------------------------------------------------------------------
  // Ch 369 — "Limits", day 2
  // -------------------------------------------------------------------------
  {
    id: "ev-369-kurapika-wakes",
    title: "Nine hours dark: the three-hour rule",
    summary:
      "Kurapika wakes after nine hours — Oito, linked through Stealth Dolphin, slept exactly as long. He works out Emperor Time's rule of thumb: about a three-hour limit, with a blackout lasting three times as long once he exceeds it, and roughly five years of lifespan already spent.",
    chapter: 369,
    day: 2,
    kind: "discovery",
    locationId: "room-1014",
    participantIds: ["kurapika", "oito", "bill"],
    storylineIds: ["kurapika-woble"],
    confidence: "canonical",
  },
  {
    id: "ev-369-oito-awakened",
    title: "Oito's aura nodes open",
    summary:
      "Using Stealth Dolphin has forcibly opened Queen Oito's nodes: she can now use Nen. The cockroach she piloted, meanwhile, was eaten by Tserriednich's Guardian Spirit Beast — surveillance has its own predators.",
    chapter: 369,
    day: 2,
    kind: "nen-reveal",
    locationId: "room-1014",
    participantIds: ["oito", "kurapika"],
    storylineIds: ["kurapika-woble"],
    confidence: "canonical",
  },
  {
    id: "ev-369-first-class",
    title: "First Nen class convenes — with four ringers",
    summary:
      "Sixteen students from rival camps fill Room 1014. Furykov, himself a hidden expert, counts four attendees faking ignorance of Nen. The classroom is a chessboard from its first morning.",
    chapter: 369,
    day: 2,
    kind: "other",
    locationId: "room-1014",
    participantIds: [
      "kurapika",
      "bill",
      "furykov",
      "belerainte",
      "babimyna",
      "loberry",
      "ladiolus",
      "yuhirai",
      "maor",
      "longhi",
      "satobi",
      "tenftory",
      "barrigen",
    ],
    storylineIds: ["nen-classes", "silent-majority"],
    confidence: "canonical",
  },
  {
    id: "ev-369-tserriednich-ultimatum",
    title: "Tserriednich's two-week ultimatum",
    summary:
      "The Fourth Prince orders his attending guards to kill everyone in the class if they cannot learn Nen within two weeks. Kurapika's school acquires a countdown it does not know about.",
    chapter: 369,
    day: 2,
    kind: "decision",
    locationId: "tserriednich-quarters",
    participantIds: ["tserriednich", "kurapika", "belerainte"],
    storylineIds: ["tserriednich-nen", "nen-classes"],
    confidence: "canonical",
  },
  {
    id: "ev-369-silent-majority-activated",
    title: "Silent Majority activates in the classroom",
    summary:
      "An unidentified user activates the ability Silent Majority inside Woble's quarters — the sealed-room killer has walked in through the front door with the students.",
    chapter: 369,
    day: 2,
    kind: "nen-reveal",
    locationId: "room-1014",
    participantIds: ["kurapika"],
    storylineIds: ["silent-majority", "nen-classes"],
    knowledgeChanges: [
      {
        factId: "fact-silent-majority-exists",
        characterId: "kurapika",
        state: "unaware",
      },
    ],
    confidence: "canonical",
  },

  // -------------------------------------------------------------------------
  // Ch 370 — "Observation", day 2
  // -------------------------------------------------------------------------
  {
    id: "ev-370-barrigen-killed",
    title: "Silent Majority kills Barrigen mid-class",
    summary:
      "Four snakes drain Barrigen's blood in the same manner as day one's five guards — disproving the theory that Woble's beast was responsible. Only the user and the possessed can see the ability's marionette; if it deactivates without killing, the curse rebounds on its user.",
    chapter: 370,
    day: 2,
    kind: "death",
    locationId: "room-1014",
    participantIds: ["barrigen", "kurapika", "bill"],
    casualtyIds: ["barrigen"],
    storylineIds: ["silent-majority", "nen-classes"],
    knowledgeChanges: [
      {
        factId: "fact-silent-majority-exists",
        characterId: "kurapika",
        state: "knows",
      },
      {
        factId: "fact-woble-beast",
        characterId: "kurapika",
        state: "believes-false",
      },
    ],
    confidence: "canonical",
  },
  {
    id: "ev-370-furykov-reads-kurapika",
    title: "Furykov profiles Kurapika from aura alone",
    summary:
      "From minute differences invisible to anyone else, Furykov concludes Kurapika is a Conjurer who activates his abilities with his right hand. Babimyna, in parallel, decides the 'confession-forcing Manipulator' story is cover for something else.",
    chapter: 370,
    day: 2,
    kind: "investigation",
    locationId: "room-1014",
    participantIds: ["furykov", "babimyna", "kurapika"],
    storylineIds: ["nen-classes", "benjamin-military"],
    knowledgeChanges: [
      {
        factId: "fact-kurapika-is-chain-user",
        characterId: "furykov",
        state: "suspects",
      },
      {
        factId: "fact-kurapika-is-chain-user",
        characterId: "babimyna",
        state: "suspects",
      },
    ],
    confidence: "canonical",
  },

  // -------------------------------------------------------------------------
  // Ch 371 — "Mission", day 2
  // -------------------------------------------------------------------------
  {
    id: "ev-371-loberry-arrested",
    title: "Loberry arrested; Queen Seiko under suspicion",
    summary:
      "Sakata and Hashito detain Loberry on suspicion of killing Barrigen, and the ship's supreme court sends an investigator to Room 1010 to probe Queen Seiko as an accomplice. The wrong people pay for the snake killings first.",
    chapter: 371,
    day: 2,
    kind: "investigation",
    locationId: "room-1014",
    participantIds: ["loberry", "sakata", "hashito", "cleapatro"],
    storylineIds: ["silent-majority", "ship-security-crisis"],
    confidence: "canonical",
  },
  {
    id: "ev-371-dowsing-clears-detail",
    title: "Dowsing Chain clears Bill and Shimano",
    summary:
      "Kurapika confirms with the pendulum that neither Bill nor Shimano is the assassin in Room 1014, and plans to test the class attendees when he can. He also entertains a structural thought: if one prince withdrew, the beasts' contract might break entirely.",
    chapter: 371,
    day: 2,
    kind: "investigation",
    locationId: "room-1014",
    participantIds: ["kurapika", "bill", "shimano"],
    storylineIds: ["kurapika-woble", "silent-majority"],
    confidence: "canonical",
  },
  {
    id: "ev-371-three-families",
    title: "The three families and their princes",
    summary:
      "Kakin's three mafia families boarded to stake territory on the New Continent, each with a direct line to a prince: Xi-Yu to Zhang Lei, Heil-Ly to Tserriednich, Cha-R to Luzurus. Five Spiders surface in Tier 5, hunting a man taller than 190 centimeters.",
    chapter: 371,
    day: 2,
    kind: "discovery",
    locationId: "tier-5",
    participantIds: ["phinks", "franklin", "feitan", "nobunaga", "machi"],
    storylineIds: ["mafia-war", "troupe-hisoka-hunt"],
    knowledgeChanges: [
      {
        factId: "fact-mafia-three-families",
        characterId: "phinks",
        state: "knows",
      },
      {
        factId: "fact-hisoka-aboard",
        characterId: "chrollo",
        state: "knows",
      },
    ],
    confidence: "canonical",
  },

  // -------------------------------------------------------------------------
  // Ch 372 — "Disappearance", day 2
  // -------------------------------------------------------------------------
  {
    id: "ev-372-tuffdy-revealed",
    title: "Momoze's killer identified: Tuffdy",
    summary:
      "The reader learns the Twelfth Prince was assassinated by her own detained guard Tuffdy, using the ability The Touch. Hanzo avenges her the same chapter, killing Tuffdy and staging it as suicide.",
    chapter: 372,
    day: 2,
    kind: "death",
    locationId: "royal-quarters",
    participantIds: ["hanzo", "momoze"],
    storylineIds: ["succession-contest", "ship-security-crisis"],
    knowledgeChanges: [
      { factId: "fact-momoze-death", characterId: "hanzo", state: "knows" },
      {
        factId: "fact-momoze-death",
        characterId: "kurapika",
        state: "was-told",
      },
    ],
    confidence: "canonical",
  },
  {
    id: "ev-372-room-1013-vanished",
    title: "Room 1013 stands empty",
    summary:
      "Hanzo discovers Marayam's quarters deserted, occupied only by a smaller, more sinister copy of the prince's dragon beast. The Thirteenth Prince's household has been swallowed by something.",
    chapter: 372,
    day: 2,
    kind: "discovery",
    locationId: "marayam-quarters",
    participantIds: ["hanzo", "marayam"],
    storylineIds: ["succession-contest", "kurapika-woble"],
    confidence: "canonical",
  },
  {
    id: "ev-372-half-awakened",
    title: "The half-awakened students",
    summary:
      "Three of Furykov's four 'ringers' turn out not to know they can use Nen: Loberry was initiated by Silent Majority's manipulation, Shedule and Yuhirai by Halkenburg's beast, which left feather marks and revised its victims' memories. The fourth ringer — a real expert hiding in plain sight — remains unfound.",
    chapter: 372,
    day: 2,
    kind: "discovery",
    locationId: "room-1014",
    participantIds: ["kurapika", "yuhirai", "loberry", "sakata"],
    storylineIds: ["nen-classes", "halkenburg-movement", "silent-majority"],
    knowledgeChanges: [
      {
        factId: "fact-halkenburg-ability",
        characterId: "kurapika",
        state: "suspects",
      },
    ],
    confidence: "canonical",
  },
  {
    id: "ev-372-camilla-departs",
    title: "Camilla walks out to kill Benjamin",
    summary:
      "Camilla leaves her quarters for Benjamin's, telling Musse to cooperate or die. The first direct prince-on-prince strike of the contest is in motion.",
    chapter: 372,
    day: 2,
    kind: "movement",
    locationId: "camilla-quarters",
    participantIds: ["camilla", "musse"],
    storylineIds: ["succession-contest", "benjamin-military"],
    confidence: "canonical",
  },

  // -------------------------------------------------------------------------
  // Ch 373 — "Inheritance", day 2
  // -------------------------------------------------------------------------
  {
    id: "ev-373-musse-kills-camilla",
    title: "Musse shoots Camilla dead — briefly",
    summary:
      "Cornered into Camilla's assassination run, Musse shoots and kills the Second Prince. Her counteractive ability Cat's Name revives her at the cost of her killer's life: Musse dies on the spot, and Camilla orders his belongings burned.",
    chapter: 373,
    day: 2,
    kind: "death",
    locationId: "royal-quarters",
    participantIds: ["camilla", "musse"],
    casualtyIds: ["musse"],
    storylineIds: ["succession-contest", "benjamin-military"],
    knowledgeChanges: [
      {
        factId: "fact-camilla-ability",
        characterId: "camilla",
        state: "knows",
      },
    ],
    evidence: [
      {
        chapter: 373,
        note: "Before dying, Musse touched the Prince — completing Secret Window's condition to observe her.",
        confidence: "canonical",
      },
    ],
    confidence: "canonical",
  },
  {
    id: "ev-373-camilla-shoots-benjamin",
    title: "Camilla shoots Benjamin at Room 1001",
    summary:
      "Killing one of Unma's reassigned guards on the way, Camilla walks into Benjamin's quarters and shoots him. He defends himself with his aura but does not retaliate, and has her arrested instead.",
    chapter: 373,
    day: 2,
    kind: "assassination-attempt",
    locationId: "benjamin-quarters",
    participantIds: ["camilla", "benjamin"],
    storylineIds: ["succession-contest", "benjamin-military"],
    consequences: [
      "The first open prince-on-prince violence, defused by Benjamin's restraint",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-373-benjamin-baton-reveal",
    title: "Benjamin Baton: the inheritance engine",
    summary:
      "Benjamin's own ability is revealed: he inherits the Nen abilities of loyal soldiers who die under his command. Vincent's Air Blow and Musse's Secret Window already sit as stars in his palm — every posted observer is also a premium collected on death.",
    chapter: 373,
    day: 2,
    kind: "nen-reveal",
    locationId: "benjamin-quarters",
    participantIds: ["benjamin", "balsamilco"],
    storylineIds: ["benjamin-military", "succession-contest"],
    knowledgeChanges: [
      {
        factId: "fact-benjamin-inheritance",
        characterId: "balsamilco",
        state: "knows",
      },
    ],
    confidence: "canonical",
  },

  // -------------------------------------------------------------------------
  // Ch 374 — "Ability", day 2 (37.5h)
  // -------------------------------------------------------------------------
  {
    id: "ev-374-vergei-negotiation",
    title: "Kurapika and Vergei trade over the phone",
    summary:
      "Kurapika tells Vergei that Room 1013 has been 'transported somewhere else' and names Tuffdy as Momoze's murderer. Vergei, contacting them from a room that no longer physically exists, rejects every request to check outside his own door.",
    chapter: 374,
    day: 3,
    kind: "conversation",
    locationId: "room-1014",
    participantIds: ["kurapika", "vergei", "sakata"],
    storylineIds: ["kurapika-woble", "ship-security-crisis"],
    confidence: "canonical",
  },
  {
    id: "ev-374-fugetsu-door",
    title: "Fugetsu's Nen door manifests",
    summary:
      "A door appears before the Eleventh Prince, opening onto a tunnel that ends at her twin's bed. The beast that will define the twins' escape — and their tragedy — introduces itself as a childhood game made real.",
    chapter: 374,
    day: 3,
    kind: "nen-reveal",
    locationId: "fugetsu-quarters",
    participantIds: ["fugetsu", "kacho"],
    storylineIds: ["kacho-fugetsu"],
    confidence: "canonical",
  },
  {
    id: "ev-374-rihan-predator",
    title: "Rihan sets Predator on Salé-salé's beast",
    summary:
      "Benjamin's soldier Rihan reveals Predator: from deliberate ignorance, he analyzes a target ability and conjures its natural predator. He designates Salé-salé's smoke-charming Guardian Spirit Beast — the first move in a quiet beast-hunting program.",
    chapter: 374,
    day: 3,
    kind: "nen-reveal",
    locationId: "royal-quarters",
    participantIds: ["rihan", "salele"],
    storylineIds: ["benjamin-military", "succession-contest"],
    confidence: "canonical",
  },
  {
    id: "ev-374-zhanglei-coins",
    title: "Zhang Lei's beast mints a second coin",
    summary:
      "The Third Prince's beast ejects another coin stamped '1'. Benjamin's observer Coventoba — who secretly pocketed the first — is the only person who knows there are two.",
    chapter: 374,
    day: 3,
    kind: "discovery",
    locationId: "zhang-lei-quarters",
    participantIds: ["zhang-lei", "coventoba"],
    storylineIds: ["succession-contest"],
    confidence: "canonical",
  },

  // -------------------------------------------------------------------------
  // Ch 375 — "Persuasion", day 2–3
  // -------------------------------------------------------------------------
  {
    id: "ev-375-beast-intel",
    title: "Beast dossiers accumulate",
    summary:
      "The princes' beast dossiers grow: Tyson's 'eye-wogs' harvest aura from readers of her book, Tubeppa's beast brews drugs with a partner, Luzurus's sets desire-shaped traps, Halkenburg's enhances a fellowship's Nen. Shikaku, Benjamin's observer assigned to Halkenburg, suspects memory revision and requests backup.",
    chapter: 375,
    day: 3,
    kind: "investigation",
    locationId: "royal-quarters",
    participantIds: ["shikaku", "balsamilco", "benjamin"],
    storylineIds: ["benjamin-military", "succession-contest"],
    confidence: "canonical",
  },
  {
    id: "ev-375-biscuit-vergei",
    title: "Biscuit converts Vergei; Room 1013 explained",
    summary:
      "Biscuit drops her disguise to demonstrate Nen to the disbelieving Vergei, who signs on as her student. The Hunters inside Room 1013 deduce they are in a one-way Nen space copied from the real room — almost certainly the work of Marayam's beast, protecting by imprisoning.",
    chapter: 375,
    day: 3,
    kind: "discovery",
    locationId: "marayam-quarters",
    participantIds: ["biscuit", "vergei", "marayam", "sevanti", "belerainte"],
    storylineIds: ["kurapika-woble", "succession-contest"],
    confidence: "canonical",
  },
  {
    id: "ev-375-halkenburg-march",
    title: "Halkenburg marches on his father's door",
    summary:
      "The Ninth Prince leaves his quarters with five personal guards to demand the contest's cancellation in person — the pacifist's first physical move against the system.",
    chapter: 375,
    day: 3,
    kind: "movement",
    locationId: "halkenburg-quarters",
    participantIds: ["halkenburg"],
    storylineIds: ["halkenburg-movement"],
    confidence: "canonical",
  },

  // -------------------------------------------------------------------------
  // Ch 376 — "Determination", day 3–4
  // -------------------------------------------------------------------------
  {
    id: "ev-376-benjamin-camilla-confined",
    title: "Cleapatro confines Benjamin and Camilla",
    summary:
      "Tried before the Supreme Magistrate over the deaths of Musse and Wolfe, both elder princes are confined to the VVIP area under monitoring until Musse is found — a search that cannot succeed, since Benjamin quietly watches Camilla through the dead man's Secret Window.",
    chapter: 376,
    day: 3,
    kind: "decision",
    locationId: "camilla-confinement",
    participantIds: ["cleapatro", "benjamin", "camilla"],
    storylineIds: [
      "succession-contest",
      "benjamin-military",
      "ship-security-crisis",
    ],
    consequences: [
      "Rooms 1001 and 1002 are to be searched; both princes rule from confinement",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-376-halkenburg-letters",
    title: "A letter a day until the king answers",
    summary:
      "Denied access to Nasubi's quarters, Halkenburg hands the gate guards a letter and vows to return with another every day. Princes may see the king only at Sunday banquets; he intends to make the rule embarrassing.",
    chapter: 376,
    day: 3,
    kind: "decision",
    locationId: "vvip-area",
    participantIds: ["halkenburg"],
    storylineIds: ["halkenburg-movement"],
    confidence: "canonical",
  },
  {
    id: "ev-376-myuhan-killed",
    title: "Silent Majority takes Myuhan",
    summary:
      "Tserriednich's guard Myuhan becomes the snake ability's next victim. Danjin reports it to the Fourth Prince, who theorizes the Nen classes themselves might be Kurapika's manipulation condition — and demands proof of innocence when the course ends.",
    chapter: 376,
    day: 3,
    kind: "death",
    locationId: "room-1014",
    participantIds: ["myuhan", "kurapika", "sakata", "tserriednich"],
    casualtyIds: ["myuhan"],
    storylineIds: ["silent-majority", "tserriednich-nen"],
    confidence: "canonical",
  },
  {
    id: "ev-376-tserriednich-specialist",
    title: "Tserriednich is a Specialist",
    summary:
      "Water divination returns the rarest result. Theta privately re-plans her timeline — Zetsu in eleven more days — while her student outpaces every estimate she makes.",
    chapter: 376,
    day: 3,
    kind: "nen-reveal",
    locationId: "tserriednich-quarters",
    participantIds: ["tserriednich", "theta"],
    storylineIds: ["tserriednich-nen"],
    knowledgeChanges: [
      {
        factId: "fact-tserriednich-awakening",
        characterId: "theta",
        state: "knows",
      },
    ],
    confidence: "canonical",
  },
  {
    id: "ev-376-door-rhythm",
    title: "The door keeps a schedule",
    summary:
      "Fugetsu's door reappears on the fourth day, and she theorizes it can manifest once per day. The twins now have an escape mechanism with a timetable.",
    chapter: 376,
    day: 4,
    kind: "discovery",
    locationId: "fugetsu-quarters",
    participantIds: ["fugetsu"],
    storylineIds: ["kacho-fugetsu"],
    confidence: "canonical",
  },

  // -------------------------------------------------------------------------
  // Ch 377 — "Scheme", day 4
  // -------------------------------------------------------------------------
  {
    id: "ev-377-escape-plan-set",
    title: "The banquet escape plan is set",
    summary:
      "Kacho will escape with Fugetsu during the next Sunday banquet's music show — performers staged in the passageway, the acts piped through every Tier 1 speaker. Melody coordinates through Mosquitone Morse code; nobody in either camp knows what Kacho's own beast is.",
    chapter: 377,
    day: 4,
    kind: "decision",
    locationId: "kacho-quarters",
    participantIds: ["kacho", "melody", "seiko"],
    storylineIds: ["kacho-fugetsu"],
    confidence: "canonical",
  },
  {
    id: "ev-377-troupe-assembly",
    title: "The full Troupe assembles in Tier 5",
    summary:
      "All Spiders gather in the central dining hall: Illumi Zoldyck has replaced Uvogin at Hisoka's own request — with a contract to be honored if Illumi kills him. Tier 5 has been swept clean of Hisoka; Chrollo orders his death prioritized, methods free.",
    chapter: 377,
    day: 4,
    kind: "decision",
    locationId: "tier-5-dining-hall",
    participantIds: [
      "chrollo",
      "nobunaga",
      "phinks",
      "feitan",
      "machi",
      "franklin",
      "shizuku",
      "bonolenov",
      "kalluto",
      "illumi",
    ],
    storylineIds: ["troupe-hisoka-hunt"],
    knowledgeChanges: [
      { factId: "fact-hisoka-aboard", characterId: "illumi", state: "knows" },
    ],
    consequences: [
      "Chrollo reveals Neon Nostrade's ability has vanished from his book — implying her death",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-377-family-tiers",
    title: "One family per tier",
    summary:
      "The Heil-Ly hold Tier 3, the Xi-Yu Tier 4, the Cha-R Tier 5; moving between the lower tiers requires the army's stamp or the mafia's. Unregistered passengers boarded outside the manifest — the ship has a shadow population.",
    chapter: 377,
    day: 4,
    kind: "discovery",
    locationId: "tier-5-dining-hall",
    participantIds: ["chrollo"],
    storylineIds: ["mafia-war", "troupe-hisoka-hunt"],
    knowledgeChanges: [
      {
        factId: "fact-mafia-three-families",
        characterId: "nobunaga",
        state: "knows",
      },
    ],
    confidence: "canonical",
  },

  // -------------------------------------------------------------------------
  // Ch 378 — "Balance", day 4
  // -------------------------------------------------------------------------
  {
    id: "ev-378-bosses-debut",
    title: "Three bosses, all royal blood",
    summary:
      "Onior Longbao (Xi-Yu) and Brocco Li (Cha-R) are Nasubi's half-brothers; Morena Prudo (Heil-Ly) is his illegitimate daughter. Kakin scars its kings' bastards at birth and permits them to exist only in society's shadows.",
    chapter: 378,
    day: 5,
    kind: "discovery",
    locationId: "tier-5",
    participantIds: ["onior", "brocco", "morena"],
    storylineIds: ["mafia-war", "heil-ly-morena"],
    confidence: "canonical",
  },
  {
    id: "ev-378-contagion-revealed",
    title: "Contagion: murder as a leveling system",
    summary:
      "Morena's ability infects a community of 23 including herself: members gain power by killing — one level per civilian, ten per Nen user, fifty per prince. Level 20 grants an ability; level 100 lets a member seed their own community. Her stated aim is havoc, starting with the ship.",
    chapter: 378,
    day: 5,
    kind: "nen-reveal",
    locationId: "heil-ly-territory",
    participantIds: ["morena", "terebellum", "yokotani", "voconte"],
    storylineIds: ["heil-ly-morena", "mafia-war"],
    knowledgeChanges: [
      {
        factId: "fact-morena-contagion",
        characterId: "morena",
        state: "knows",
      },
    ],
    confidence: "canonical",
  },
  {
    id: "ev-378-hisoka-bounty",
    title: "The families join the Hisoka hunt",
    summary:
      "Onior and Brocco order their underbosses to find Hisoka before the Troupe does: Ken'i floats ten million per tip, Hinrigh plans ID checks through Queen Tang Zhao Li's influence. Everyone wants the clown found — nobody wants him fought.",
    chapter: 378,
    day: 5,
    kind: "decision",
    locationId: "tier-5",
    participantIds: ["ken-i", "hinrigh", "onior", "brocco"],
    storylineIds: ["mafia-war", "troupe-hisoka-hunt"],
    confidence: "canonical",
  },

  // -------------------------------------------------------------------------
  // Ch 379 — "Collaboration", day 4–5
  // -------------------------------------------------------------------------
  {
    id: "ev-379-luini-warehouse",
    title: "Luini farms the Cha-R warehouse",
    summary:
      "The Heil-Ly's Luini kills three more Cha-R guards to reach level 24, using a corpse to infiltrate and mark the family's hideout for his sealed-room transportation ability. His accomplice Cashew feeds Mizaistom a testimony of curated lies to gauge the Association's investigators.",
    chapter: 379,
    day: 5,
    kind: "death",
    locationId: "cha-r-warehouse",
    participantIds: ["luini", "mizaistom"],
    storylineIds: ["heil-ly-morena", "mafia-war"],
    confidence: "canonical",
  },
  {
    id: "ev-379-keni-troupe-overture",
    title: "Ken'i proposes an alliance to the Spiders",
    summary:
      "The Cha-R underboss offers Nobunaga, Phinks, and Feitan a working arrangement: hunt the warehouse killer for the family. Franklin, unimpressed by searching, decides to simply wait for Hisoka in Tier 5.",
    chapter: 379,
    day: 5,
    kind: "alliance",
    locationId: "cha-r-warehouse",
    participantIds: ["ken-i", "nobunaga", "phinks", "feitan", "franklin"],
    storylineIds: ["troupe-hisoka-hunt", "mafia-war"],
    confidence: "canonical",
  },

  // -------------------------------------------------------------------------
  // Ch 380 — "Alarm", day 5
  // -------------------------------------------------------------------------
  {
    id: "ev-380-mizaistom-warning",
    title: "Mizaistom links the murders to the contest",
    summary:
      "To skeptical Kakin officers, Mizaistom argues the Tier 3 murders are succession-driven: powers bought with human sacrifice will keep demanding it, and the under-policed lower decks will burn first. He urges redeploying soldiers downward.",
    chapter: 380,
    day: 5,
    kind: "conversation",
    locationId: "tier-3",
    participantIds: ["mizaistom"],
    storylineIds: ["ship-security-crisis", "heil-ly-morena"],
    confidence: "canonical",
  },
  {
    id: "ev-380-illumi-confirms-troupe",
    title: "Illumi confirms: all Spiders aboard",
    summary:
      "Caught in a Tier 3 curfew sweep with Kalluto, Illumi tells Mizaistom plainly that every Troupe member is on the ship — then refuses to elaborate. Mizaistom weighs whether to burden Kurapika with the news.",
    chapter: 380,
    day: 5,
    kind: "discovery",
    locationId: "tier-3",
    participantIds: ["illumi", "kalluto", "mizaistom"],
    storylineIds: ["troupe-hisoka-hunt", "ship-security-crisis"],
    confidence: "canonical",
  },
  {
    id: "ev-380-fugetsu-caught",
    title: "The 'stowaway' is Prince Fugetsu",
    summary:
      "A person with no ID turns up on Tier 3: the Eleventh Prince, with no explanation of how she left the royal deck. Mizaistom imposes a gag order and takes her into protective interrogation himself.",
    chapter: 380,
    day: 5,
    kind: "discovery",
    locationId: "tier-3",
    participantIds: ["fugetsu", "mizaistom"],
    storylineIds: ["kacho-fugetsu", "ship-security-crisis"],
    confidence: "canonical",
  },

  // -------------------------------------------------------------------------
  // Ch 381 — "Predation", day 5
  // -------------------------------------------------------------------------
  {
    id: "ev-381-fugetsu-returned",
    title: "Fugetsu is questioned and returned",
    summary:
      "Mizaistom escorts Fugetsu back to Tier 1 under 72-hour monitoring, to be lifted before Sunday's banquet. Her teleportation is now known to the Hunters — and, through Yushohi's report, to Benjamin's camp.",
    chapter: 381,
    day: 5,
    kind: "movement",
    locationId: "tier-1",
    participantIds: ["fugetsu", "mizaistom", "seiko", "melody"],
    storylineIds: ["kacho-fugetsu", "ship-security-crisis"],
    confidence: "canonical",
  },
  {
    id: "ev-381-hunter-code",
    title: "'Assist Princes escape fully'",
    summary:
      "Mizaistom's phoned instructions to Melody carry a hidden Hunter-code message ordering the opposite of their surface meaning: help the twins escape. The Zodiac quietly chooses the princes over the mission's neutrality.",
    chapter: 381,
    day: 5,
    kind: "conversation",
    locationId: "kacho-quarters",
    participantIds: ["mizaistom", "melody"],
    storylineIds: ["kacho-fugetsu"],
    evidence: [
      {
        chapter: 383,
        note: "The code — first number signals reading the nth word of each sentence — is decoded for the reader two chapters later.",
        confidence: "canonical",
      },
    ],
    confidence: "canonical",
  },
  {
    id: "ev-381-predator-eats-beast",
    title: "Predator devours Salé-salé's beast",
    summary:
      "Rihan confirms the smoke beast's dictatorship mechanics — maximum devotion in close associates within hours — then summons Predator, which consumes the Guardian Spirit Beast whole. Drained for 48 hours, he swaps posts with Yushohi, whose Nen is 'most suitable for assassinations.'",
    chapter: 381,
    day: 5,
    kind: "battle",
    locationId: "royal-quarters",
    participantIds: ["rihan", "yushohi", "salele"],
    storylineIds: ["benjamin-military", "succession-contest"],
    consequences: ["The Eighth Prince is left defenseless without knowing it"],
    confidence: "canonical",
  },

  // -------------------------------------------------------------------------
  // Ch 382 — "Awakening", day 8
  // -------------------------------------------------------------------------
  {
    id: "ev-382-halkenburg-confronts-nasubi",
    title: "Halkenburg puts a gun to the king",
    summary:
      "Four days of letters lowered the guards' vigilance; Halkenburg and five guards draw on them and he walks to his father demanding the contest's suspension. His bullet freezes mid-air before Nasubi's face — the king cannot die until the ritual ends. Turning the gun on himself, Halkenburg's own beast catches the round.",
    chapter: 382,
    day: 8,
    kind: "assassination-attempt",
    locationId: "nasubi-quarters",
    participantIds: ["halkenburg", "nasubi", "nugui"],
    storylineIds: ["halkenburg-movement", "succession-contest"],
    consequences: [
      "Nasubi poses the trolley problem: change the country by becoming king, or watch",
      "Halkenburg 'awakens' — he will win the contest to end the system",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-382-arrow-shikaku",
    title: "The arrow takes Shikaku",
    summary:
      "Ordered by Benjamin to kill the returning Halkenburg, Shikaku's conjured Culdcept card is pierced by an aura arrow from the prince's bow. One of Halkenburg's guards drops; Shikaku rises asking for the Prince's orders — the ability robs the target's will at the cost of one follower's body.",
    chapter: 382,
    day: 8,
    kind: "nen-reveal",
    locationId: "halkenburg-quarters",
    participantIds: ["halkenburg", "shikaku", "benjamin"],
    storylineIds: ["halkenburg-movement", "benjamin-military"],
    knowledgeChanges: [
      {
        factId: "fact-halkenburg-ability",
        characterId: "halkenburg",
        state: "knows",
      },
    ],
    confidence: "canonical",
  },
  {
    id: "ev-382-salesale-assassinated",
    title: "Salé-salé is assassinated",
    summary:
      "With the Eighth Prince's beast already devoured, Yushohi completes the kill: Salé-salé stops breathing in his bed as attendants scream for help, and Yushohi radios Benjamin that the mission succeeded. Officially, illness.",
    chapter: 382,
    day: 8,
    approxTime: "evening",
    kind: "death",
    locationId: "royal-quarters",
    participantIds: ["yushohi", "salele", "benjamin"],
    casualtyIds: ["salele"],
    storylineIds: ["benjamin-military", "succession-contest"],
    consequences: ["The contest's second prince dies; the cover story holds"],
    confidence: "canonical",
  },

  // -------------------------------------------------------------------------
  // Ch 383 — "Escape", day 8 (banquet night)
  // -------------------------------------------------------------------------
  {
    id: "ev-383-melody-flute",
    title: "Melody's flute entrances the royal deck",
    summary:
      "At the banquet concert — Salé-salé's absence excused as illness — Melody plays with full sincerity, projecting a vista of mountains and butterflies to everyone in earshot, princes in their quarters included, over the Tier 1 loudspeakers. Three minutes of ship-wide trance.",
    chapter: 383,
    day: 8,
    approxTime: "night",
    kind: "other",
    locationId: "banquet-hall",
    participantIds: ["melody", "nasubi", "kacho", "fugetsu"],
    storylineIds: ["kacho-fugetsu"],
    confidence: "canonical",
  },
  {
    id: "ev-383-lifeboat-escape",
    title: "The lifeboat escape — and Keeney's price",
    summary:
      "Under cover of the trance, the pianist Keeney leads the twins past unconscious soldiers to a lifeboat, then shoots himself so no accomplice can implicate the Association. A widower looking for a place to die, he chose saving the twins as his.",
    chapter: 383,
    day: 8,
    approxTime: "night",
    kind: "death",
    locationId: "lifeboat-area",
    participantIds: ["kacho", "fugetsu", "melody"],
    storylineIds: ["kacho-fugetsu"],
    confidence: "canonical",
  },
  {
    id: "ev-383-kacho-death",
    title: "Kacho dies in the tunnel of hands",
    summary:
      "As the lifeboat nears open water a horde of hands closes in — leaving the ship means death for a contest participant. Kacho pushes her sister through a door back aboard; a 'Kacho' follows moments later, and the real one drifts out to sea, dead in the boat. Her formless beast, Without You, now wears her shape to protect the living twin.",
    chapter: 383,
    day: 8,
    approxTime: "night",
    kind: "death",
    locationId: "lifeboat-area",
    participantIds: ["kacho", "fugetsu"],
    casualtyIds: ["kacho"],
    storylineIds: ["kacho-fugetsu", "succession-contest"],
    knowledgeChanges: [
      { factId: "fact-kacho-death", characterId: "fugetsu", state: "unaware" },
    ],
    consequences: [
      "The twins' beasts are revealed as cooperative: Fugetsu's Magical Worm carries out, Kacho's Without You carries back",
      "Fugetsu believes her sister returned alive",
    ],
    confidence: "canonical",
  },

  // -------------------------------------------------------------------------
  // Ch 384 — "War", days 7–8 (flashback) and after
  // -------------------------------------------------------------------------
  {
    id: "ev-384-mafia-war-protocol",
    title: "The rules that make the war official",
    summary:
      "Ken'i and Vice Boss Tajao explain the custom: hits between families must be squared between bosses within 24 hours, with the boss off home turf when it happens. Over 300 workers are missing, Morena's Tier 1 room is empty, and no call has come — war with the Heil-Ly is now all but unavoidable.",
    chapter: 384,
    day: 7,
    kind: "conversation",
    locationId: "cha-r-office",
    participantIds: ["ken-i", "nobunaga", "phinks", "feitan"],
    storylineIds: ["mafia-war", "heil-ly-morena", "troupe-hisoka-hunt"],
    consequences: ["Nobunaga offers to kill the Heil-Ly boss personally"],
    confidence: "canonical",
  },
  {
    id: "ev-384-tserriednich-cuts-morena",
    title: "Tserriednich washes his hands of Morena",
    summary:
      "On the phone, the Fourth Prince confirms his family's mafia arm has slipped his leash — Morena has been below decks since boarding — and tells the caller to do as they please. Behind him, Theta watches a second, self-made Specialist beast coalesce beside his Guardian Spirit Beast.",
    chapter: 384,
    day: 7,
    kind: "conversation",
    locationId: "tserriednich-quarters",
    participantIds: ["tserriednich", "theta"],
    storylineIds: ["tserriednich-nen", "heil-ly-morena"],
    knowledgeChanges: [
      {
        factId: "fact-tserriednich-awakening",
        characterId: "theta",
        state: "observed",
      },
    ],
    confidence: "canonical",
  },

  // -------------------------------------------------------------------------
  // Ch 385 — "Warning", day 8 night
  // -------------------------------------------------------------------------
  {
    id: "ev-385-theta-shoots",
    title: "Theta shoots her student through the head",
    summary:
      "Mid-Zetsu-lesson, with the beast temporarily absent, Theta puts a bullet through Tserriednich's skull — and the corpse vanishes. He materializes behind her, alive, praising the 'training.' Whatever he did during Zetsu, her one clean chance is gone.",
    chapter: 385,
    day: 8,
    approxTime: "night",
    kind: "assassination-attempt",
    locationId: "tserriednich-quarters",
    participantIds: ["theta", "tserriednich"],
    storylineIds: ["tserriednich-nen"],
    confidence: "canonical",
  },
  {
    id: "ev-385-beast-brands-theta",
    title: "The beast's warning: two lies left",
    summary:
      "Tserriednich's Guardian Spirit Beast warns Theta against deceiving its host again: the nick already on her cheek was a first warning for her lies. A second lie brands her face; a third brings 'a punishment worse than death.' Salkov begs her to stop; she cannot.",
    chapter: 385,
    day: 8,
    kind: "nen-reveal",
    locationId: "tserriednich-quarters",
    participantIds: ["theta", "salkov", "tserriednich"],
    storylineIds: ["tserriednich-nen"],
    confidence: "canonical",
  },

  // -------------------------------------------------------------------------
  // Ch 386 — "Hypothesis", day 9
  // -------------------------------------------------------------------------
  {
    id: "ev-386-mind-swap-experiments",
    title: "Halkenburg experiments on his own ability",
    summary:
      "With Sumidori's soul confirmed inside Shikaku's body, Halkenburg lays out four hypotheses for where Shikaku's mind went and begins methodical testing. His awakened resolve has turned the pacifist into the arc's most rigorous experimental scientist.",
    chapter: 386,
    day: 9,
    kind: "investigation",
    locationId: "halkenburg-quarters",
    participantIds: ["halkenburg", "shikaku", "sumidori"],
    storylineIds: ["halkenburg-movement"],
    confidence: "canonical",
  },
  {
    id: "ev-386-shikaku-suicide",
    title: "'Long live Prince Benjamin' — Shikaku's body dies",
    summary:
      "Sumidori-in-Shikaku rings Luzurus's doorbell, shouts loyalty to Benjamin, and shoots the body in the head — a staged suicide at a staged address. The body left in Halkenburg's quarters then wakes, but whose mind returned is not disclosed; Benjamin names Halkenburg his biggest threat while the experiment's result remains sealed until chapter 404.",
    chapter: 386,
    day: 9,
    kind: "death",
    locationId: "room-1007",
    participantIds: [
      "shikaku",
      "sumidori",
      "halkenburg",
      "benjamin",
      "balsamilco",
      "basho",
    ],
    storylineIds: [
      "halkenburg-movement",
      "benjamin-military",
      "luzurus-investigation",
    ],
    consequences: [
      "Benjamin summons Kanjidol from Room 1007 for a full debrief",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-386-melody-held",
    title: "Melody held — and courted — at the Justice Bureau",
    summary:
      "Keeney's suicide note claims he acted alone, but several princes, impressed by what they saw at the banquet, 'invite' Melody to their suites. The Bureau keeps her long precisely to keep her out of their hands.",
    chapter: 386,
    day: 9,
    kind: "investigation",
    locationId: "ministry-of-justice",
    participantIds: ["melody", "kaiser"],
    storylineIds: ["kacho-fugetsu", "ship-security-crisis"],
    confidence: "canonical",
  },
  {
    id: "ev-386-water-divination-class",
    title: "Kurapika brings water divination to class",
    summary:
      "Kurapika demonstrates the test — revealing himself a Specialist to every camp's observers — and singles out the servant Ladiolus's aura to prove Nen talent ignores gender and muscle. Type results will be taken behind closed doors, payment for the course.",
    chapter: 386,
    day: 9,
    kind: "other",
    locationId: "room-1014",
    participantIds: [
      "kurapika",
      "bill",
      "babimyna",
      "furykov",
      "ladiolus",
      "satobi",
    ],
    storylineIds: ["nen-classes"],
    confidence: "canonical",
  },

  // -------------------------------------------------------------------------
  // Ch 387 — "Recreation", day 8 (Tserriednich's perspective)
  // -------------------------------------------------------------------------
  {
    id: "ev-387-future-sight",
    title: "Ten seconds ahead: the Zetsu vision",
    summary:
      "The shooting replayed from the prince's side: full Zetsu grants Tserriednich a vision ten seconds into the future, during which the world sees only his past self. He toyed with Theta, watched her draw in the vision, and simply stepped aside. He resolves to compress Zetsu entry below one second and 'dominate the succession — and the world.'",
    chapter: 387,
    day: 8,
    kind: "nen-reveal",
    locationId: "tserriednich-quarters",
    participantIds: ["tserriednich", "theta"],
    storylineIds: ["tserriednich-nen"],
    knowledgeChanges: [
      {
        factId: "fact-tserriednich-awakening",
        characterId: "tserriednich",
        state: "knows",
      },
    ],
    confidence: "canonical",
  },

  // -------------------------------------------------------------------------
  // Ch 388 — "Reflection", days 9–10
  // -------------------------------------------------------------------------
  {
    id: "ev-388-forced-awakening",
    title: "The awakening assembly line",
    summary:
      "Behind closed doors, Kurapika borrows Bill's Erigeron through Stealth Dolphin and 'attacks' students with it, semi-coercively opening their nodes: Ladiolus, Maor, Yuri, and Satobi emerge visibly changed. Furykov confirms no manipulation; Babimyna quietly catalogues what Kurapika's right hand can do.",
    chapter: 388,
    day: 10,
    kind: "nen-reveal",
    locationId: "room-1014",
    participantIds: [
      "kurapika",
      "bill",
      "maor",
      "ladiolus",
      "satobi",
      "furykov",
      "babimyna",
    ],
    storylineIds: ["nen-classes", "kurapika-woble"],
    consequences: [
      "Tubeppa authorizes deeper alliance talks and more students",
      "Rival camps' guards begin becoming real Nen users",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-388-bill-confession",
    title: "Bill explains why he stays",
    summary:
      "Bill admits Beyond stationed him aboard, but guarding a baby was his own choice; Vincent's murder of Sandra and Kurapika's honesty with Oito turned a coward into a resolved one. The room's most quietly loaded loyalty is put on record.",
    chapter: 388,
    day: 10,
    kind: "conversation",
    locationId: "room-1014",
    participantIds: ["bill", "kurapika"],
    storylineIds: ["kurapika-woble", "beyond-netero"],
    confidence: "canonical",
  },
  {
    id: "ev-388-tubeppa-deduces",
    title: "Tubeppa reads Salé-salé's death correctly",
    summary:
      "The Fifth Prince reasons from the missed banquet performance that her brother was killed, and from the soldier rotation that she is Benjamin's next target. She starts building countermeasures and concludes she needs a partner like Kurapika.",
    chapter: 388,
    day: 10,
    kind: "investigation",
    locationId: "room-1005",
    participantIds: ["tubeppa", "maor"],
    storylineIds: ["succession-contest", "benjamin-military"],
    confidence: "canonical",
  },

  // -------------------------------------------------------------------------
  // Ch 389 — "Curse", days 9–10
  // -------------------------------------------------------------------------
  {
    id: "ev-389-balsamilco-analysis",
    title: "Balsamilco dissects the Shikaku incident",
    summary:
      "Debriefing Kanjidol, Balsamilco raises three objections to the obvious theory — including his cornerstone hypothesis that princes (and their beasts) cannot directly kill princes, since royal-murder is capital even for royals. The key question he assigns: why did Shikaku die in front of Room 1007?",
    chapter: 389,
    day: 9,
    kind: "investigation",
    locationId: "benjamin-quarters",
    participantIds: ["balsamilco", "benjamin", "kanjidol"],
    storylineIds: [
      "benjamin-military",
      "halkenburg-movement",
      "luzurus-investigation",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-389-vict-taken",
    title: "Vict's scream on the radio",
    summary:
      "A fourth aura rumbling, then Vict's breaking voice — something about a bow, about Halkenburg being invincible — then screaming. Benjamin's palm stars confirm Shikaku dead but Vict alive: taken, not killed. Balsamilco proposes arresting Halkenburg to sever him from his men.",
    chapter: 389,
    day: 10,
    kind: "battle",
    locationId: "halkenburg-quarters",
    participantIds: ["vict", "halkenburg", "benjamin", "balsamilco"],
    storylineIds: ["halkenburg-movement", "benjamin-military"],
    consequences: [
      "Halkenburg is taken into custody pending trial — the stage Benjamin intends to strike on",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-389-have-nots-curse",
    title: "Camilla's curse assassins revealed",
    summary:
      "Camilla elevated Kakin's casteless Have-Nots into her personal army, and they revived the old 'afterlife companion' rite as Nen: eleven curse-bearers, one per surviving rival prince, each carrying a token of their target and strengthening the curse daily — strongest if they die by suicide close to the target's eyes.",
    chapter: 389,
    day: 10,
    kind: "nen-reveal",
    locationId: "camilla-confinement",
    participantIds: ["camilla", "sarahell", "fukataki"],
    storylineIds: ["succession-contest"],
    knowledgeChanges: [
      {
        factId: "fact-camilla-ability",
        characterId: "sarahell",
        state: "knows",
      },
    ],
    confidence: "canonical",
  },
  {
    id: "ev-389-sarahell-mission",
    title: "Sarahell takes the Woble curse herself",
    summary:
      "With the twins in custody and beasts shielding most princes, the captain of Camilla's guard volunteers for the hardest target list: she will attend Kurapika's next round of classes and curse the Fourteenth Prince from inside Room 1014.",
    chapter: 389,
    day: 10,
    kind: "decision",
    locationId: "camilla-confinement",
    participantIds: ["sarahell", "fukataki"],
    storylineIds: ["succession-contest", "nen-classes"],
    confidence: "canonical",
  },
  {
    id: "ev-389-coventoba-coin",
    title: "Coventoba's stolen coin ticks 1 → 10",
    summary:
      "The coin Benjamin's observer secretly pocketed on day one changes value. Zhang Lei's beast is running a compounding scheme nobody yet understands — including the thief holding its seed capital.",
    chapter: 389,
    day: 10,
    kind: "discovery",
    locationId: "zhang-lei-quarters",
    participantIds: ["coventoba", "zhang-lei", "tenftory"],
    storylineIds: ["succession-contest", "benjamin-military"],
    confidence: "canonical",
  },
  {
    id: "ev-389-basho-postmortem-theory",
    title: "Basho suspects Nen after death",
    summary:
      "Feigning agreement with Kanjidol's suspicions, Basho privately concludes the opposite: Benjamin's own men staged the Room 1007 incident, and an ability that activates on Shikaku's suicide — post-mortem Nen — is in play. He adds it to the watch list beside the beasts.",
    chapter: 389,
    day: 10,
    kind: "investigation",
    locationId: "room-1007",
    participantIds: ["basho", "kanjidol", "luzurus"],
    storylineIds: ["luzurus-investigation", "halkenburg-movement"],
    confidence: "canonical",
  },

  // -------------------------------------------------------------------------
  // Ch 390–391 — "Clash", day 10
  // -------------------------------------------------------------------------
  {
    id: "ev-390-zhanglei-onior",
    title: "Zhang Lei calls on the Xi-Yu boss",
    summary:
      "The Third Prince visits Onior in person, asking after the beasts and Nen. The Second-track Faker knows nothing himself but promises to ask his younger members — the succession contest and the mafia formally shake hands.",
    chapter: 390,
    day: 10,
    kind: "alliance",
    locationId: "onior-residence",
    participantIds: ["zhang-lei", "onior", "coventoba"],
    storylineIds: ["mafia-war", "succession-contest"],
    confidence: "canonical",
  },
  {
    id: "ev-390-onior-orders",
    title: "Onior's double order: Hisoka and Morena",
    summary:
      "Onior directs Hinrigh to find Hisoka on Tier 3 while ceding Tier 4's search to the Spiders — keeping the Troupe where the family can watch it — and to kill Morena along the way.",
    chapter: 390,
    day: 10,
    kind: "decision",
    locationId: "tier-4",
    participantIds: ["onior", "hinrigh", "lynch", "zakuro"],
    storylineIds: ["mafia-war", "heil-ly-morena", "troupe-hisoka-hunt"],
    confidence: "canonical",
  },
  {
    id: "ev-390-tier3-clash",
    title: "First open clash on Tier 3",
    summary:
      "Hinrigh's team corners Heil-Ly members registered as civilians — a legal trap, since mafia attacking civilians means catastrophe. When soldiers move them along, Hinrigh's Biohazard turns their gun barrels into snakes that shoot both men dead. The war stops pretending.",
    chapter: 390,
    day: 10,
    kind: "battle",
    locationId: "tier-3",
    participantIds: ["hinrigh", "lynch", "zakuro"],
    storylineIds: ["mafia-war", "heil-ly-morena"],
    knowledgeChanges: [
      {
        factId: "fact-morena-contagion",
        characterId: "lynch",
        state: "knows",
      },
    ],
    confidence: "canonical",
  },
  {
    id: "ev-391-padaille-killed",
    title: "Hinrigh kills Padaille",
    summary:
      "Three leveled Heil-Ly members ambush Hinrigh; his handcuff-pigeons shrug off bullets and shackle the weapon-limbed Padaille, whose own conjured axe is pushed into his skull. The survivors flee to ask Morena for instructions.",
    chapter: 391,
    day: 10,
    kind: "battle",
    locationId: "tier-3",
    participantIds: ["hinrigh", "padaille"],
    casualtyIds: ["padaille"],
    storylineIds: ["mafia-war", "heil-ly-morena"],
    confidence: "canonical",
  },

  // -------------------------------------------------------------------------
  // Ch 392 — "Information", day 10
  // -------------------------------------------------------------------------
  {
    id: "ev-392-misha-hao",
    title: "Misha Hao walks the dead away",
    summary:
      "Padaille's corpse stands up and leaves the plaza carrying a dead woman with a bullet-holed head: Misha Hao, the Xi-Yu's late undertaker, whose post-mortem ability quietly disposes of anyone killed by a family member. The mafia's cleanup runs on a ghost.",
    chapter: 392,
    day: 10,
    kind: "nen-reveal",
    locationId: "tier-3",
    participantIds: ["hinrigh"],
    storylineIds: ["mafia-war"],
    confidence: "canonical",
  },
  {
    id: "ev-392-hidden-room-tip",
    title: "A corporal sells the hidden room",
    summary:
      "For fifty million, a soldier tells Hinrigh about silenced wiring workers and a room that appears on no ship plan — surely the Heil-Ly's, if the Xi-Yu has no secret hideout of its own. The blueprints have been lying since launch.",
    chapter: 392,
    day: 10,
    kind: "discovery",
    locationId: "tier-3",
    participantIds: ["hinrigh"],
    storylineIds: ["mafia-war", "heil-ly-morena"],
    knowledgeChanges: [
      {
        factId: "fact-hidden-passages",
        characterId: "hinrigh",
        state: "knows",
      },
    ],
    confidence: "canonical",
  },
  {
    id: "ev-392-hisoka-found",
    title: "'Hisoka' is found on Tier 3",
    summary:
      "Zakuro's blood-drop search flags a tall man with his hair down: Lynch's soul-punch confirms nothing before she is dropped by a reflex counter, and the terrified Zakuro takes the man's overwhelming aura as proof. The reader will learn in ch 405 that this Hisoka is Bonolenov, planted by Chrollo to be found.",
    chapter: 392,
    day: 10,
    kind: "discovery",
    locationId: "tier-3",
    participantIds: ["zakuro", "lynch", "bonolenov"],
    storylineIds: ["troupe-hisoka-hunt", "mafia-war"],
    knowledgeChanges: [
      {
        factId: "fact-hisoka-aboard",
        characterId: "hinrigh",
        state: "believes-false",
      },
    ],
    evidence: [
      {
        chapter: 405,
        note: "Retroactive reveal: Chrollo ordered Bonolenov to impersonate Hisoka so the mafia would 'find' him first.",
        confidence: "canonical",
      },
    ],
    confidence: "canonical",
  },

  // -------------------------------------------------------------------------
  // Ch 393 — "Plea", day 10
  // -------------------------------------------------------------------------
  {
    id: "ev-393-luini-killed",
    title: "Nobunaga executes Luini",
    summary:
      "Luini surfaces at the Cha-R office proposing the Troupe help him kill both families, the royals, and then the old world. Nobunaga stabs him mid-pitch, bisects the corpse, and leaves it as the Troupe's declaration of war on the Heil-Ly.",
    chapter: 393,
    day: 10,
    kind: "death",
    locationId: "cha-r-office",
    participantIds: ["nobunaga", "phinks", "feitan", "luini"],
    casualtyIds: ["luini"],
    storylineIds: ["troupe-hisoka-hunt", "heil-ly-morena", "mafia-war"],
    confidence: "canonical",
  },
  {
    id: "ev-393-cinema-deal",
    title: "The cinema pact with 'Hisoka'",
    summary:
      "In auditorium 8, Hinrigh offers the found 'Hisoka' a VVIP room on Tier 1 to sit out the mafia war, invoking the doctrine of balance. 'Hisoka' accepts on one condition — he will not refuse a fight the Troupe starts. The mafia believes it has contained a man who was never there.",
    chapter: 393,
    day: 10,
    kind: "alliance",
    locationId: "tier-3-cinema",
    participantIds: ["hinrigh", "bonolenov"],
    storylineIds: ["troupe-hisoka-hunt", "mafia-war"],
    confidence: "canonical",
  },
  {
    id: "ev-393-room-3101-trap",
    title: "Room 3101 swallows a corporal",
    summary:
      "Led to the hidden room, Corporal Maizan steps inside and vanishes; an unbothered old man — someone's projected double — invites the underbosses in after him. The Heil-Ly's front door is a teleport trap.",
    chapter: 393,
    day: 10,
    kind: "discovery",
    locationId: "room-3101",
    participantIds: ["hinrigh", "ken-i"],
    storylineIds: ["heil-ly-morena", "mafia-war"],
    knowledgeChanges: [
      { factId: "fact-hidden-passages", characterId: "ken-i", state: "knows" },
    ],
    confidence: "canonical",
  },

  // -------------------------------------------------------------------------
  // Ch 394 — "Hypothesis", day 10
  // -------------------------------------------------------------------------
  {
    id: "ev-394-morena-next-moves",
    title: "Morena plans to infect Tserriednich's camp",
    summary:
      "Expecting her hideout's exposure, Morena assigns Sodom and Dogman to capture one of the Fourth Prince's personal soldiers and infect them with Contagion — a tracking device made of loyalty. The roster of her leveled killers, day jobs and all, parades past the reader.",
    chapter: 394,
    day: 10,
    kind: "decision",
    locationId: "heil-ly-hideout",
    participantIds: ["morena"],
    storylineIds: ["heil-ly-morena"],
    confidence: "canonical",
  },
  {
    id: "ev-394-tserriednich-friends",
    title: "The Fourth Prince's five friends",
    summary:
      "Five ordinary soldiers on Tier 3 — Tserriednich's actual friends since academy days — piece together Nen, Morena, and their prince's silence from barracks gossip and Borksen's tip about Theta. They set up a transfer-request early-warning system for the coming purge.",
    chapter: 394,
    day: 10,
    kind: "conversation",
    locationId: "tier-3",
    participantIds: ["tserriednich", "gipper", "otocin", "momolly", "borksen"],
    storylineIds: ["heil-ly-morena", "ship-security-crisis"],
    confidence: "canonical",
  },

  // -------------------------------------------------------------------------
  // Ch 395–397 — "Founding", flashback (Meteor City)
  // -------------------------------------------------------------------------
  {
    id: "ev-395-troupe-origins",
    title: "Meteor City: the Power Cleaners troupe",
    summary:
      "A flashback opens the Troupe's origin: child Chrollo dubbing foreign videos in a church, Pakunoda, Sheila, and Sarasa voicing the heroines, a furious Uvogin hunting him over a stolen tape. A theater company begins to form in a city whose children are stolen for sport.",
    chapter: 395,
    kind: "other",
    locationId: "meteor-city",
    participantIds: [
      "chrollo",
      "nobunaga",
      "phinks",
      "feitan",
      "machi",
      "franklin",
    ],
    storylineIds: ["troupe-hisoka-hunt"],
    confidence: "canonical",
  },
  {
    id: "ev-396-troupe-named",
    title: "The troupe takes its name",
    summary:
      "The screening's tape jams and Chrollo carries the show live, winning over even Uvogin. The children claim recurring roles, decide they are a troupe — 'each of us is worth a hundred members' — and Sarasa leaves alone for sorting duty as a van of child-snatchers, quota already met, considers one more.",
    chapter: 396,
    kind: "decision",
    locationId: "meteor-city",
    participantIds: [
      "chrollo",
      "nobunaga",
      "phinks",
      "feitan",
      "machi",
      "franklin",
    ],
    storylineIds: ["troupe-hisoka-hunt"],
    confidence: "canonical",
  },
  {
    id: "ev-397-sarasa-murder",
    title: "Sarasa's murder and the Spider's birth",
    summary:
      "Sarasa is abducted, dismembered, and staged with a filmed message by outsiders who prey on Meteor City. Over her grave Chrollo vows to build a criminal haven that will lure her killers back, live as a villain the world shudders at, and kill — and Uvogin names him the Troupe's head.",
    chapter: 397,
    kind: "death",
    locationId: "meteor-city",
    participantIds: [
      "chrollo",
      "nobunaga",
      "phinks",
      "feitan",
      "machi",
      "franklin",
    ],
    storylineIds: ["troupe-hisoka-hunt"],
    consequences: [
      "The Phantom Troupe's founding purpose is revenge dressed as banditry",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-397-spider-founded",
    title: "The Spider is named",
    summary:
      "Chrollo asks Uvogin for three years to build his power and a system for Meteor City; Uvogin answers that if Chrollo is the head, he will follow him until he dies. Eight children raise their fingers, and the group that will terrify the world takes its shape.",
    chapter: 397,
    kind: "decision",
    locationId: "meteor-city",
    participantIds: [
      "chrollo",
      "nobunaga",
      "phinks",
      "feitan",
      "machi",
      "franklin",
    ],
    storylineIds: ["troupe-hisoka-hunt"],
    confidence: "canonical",
  },

  // -------------------------------------------------------------------------
  // Ch 398–399 — "Search" / "Expulsion", day 10
  // -------------------------------------------------------------------------
  {
    id: "ev-398-hinrigh-oyster",
    title: "Hinrigh swallows the transmitter",
    summary:
      "After the Spiders map the trap as a continuous 'land mine' type, Hinrigh turns a transmitter into a raw oyster with Biohazard, swallows it, and walks into the teleporter himself — betting his life that the Troupe will follow the signal.",
    chapter: 398,
    day: 10,
    kind: "decision",
    locationId: "tier-3",
    participantIds: ["hinrigh", "nobunaga", "phinks", "feitan"],
    storylineIds: ["mafia-war", "heil-ly-morena"],
    confidence: "canonical",
  },
  {
    id: "ev-399-yokotani-lsdf",
    title: "Yokotani's invincible guards expel Nobunaga",
    summary:
      "Inside the hideout, the Heil-Ly lawyer Yokotani activates A Battle of Wits: 'LSDF' — untouchable puppet guards that charge intruders with their actual crimes and eject them. Nobunaga is carried out and warped back to Room 3101; Hinrigh hides the oyster transmitter before his own expulsion.",
    chapter: 399,
    day: 10,
    kind: "battle",
    locationId: "heil-ly-hideout",
    participantIds: [
      "nobunaga",
      "hinrigh",
      "terebellum",
      "yokotani",
      "voconte",
    ],
    storylineIds: ["heil-ly-morena", "mafia-war"],
    consequences: [
      "The hideout's defense rewards non-aggression: the more serious the crime, the stronger the guards",
    ],
    confidence: "canonical",
  },

  // -------------------------------------------------------------------------
  // Ch 400 — "Secrecy", day 10
  // -------------------------------------------------------------------------
  {
    id: "ev-400-hideout-above",
    title: "The transmitter points upward",
    summary:
      "Tracking the swallowed oyster, the Spiders place the Heil-Ly hideout up on Tier 2 — meaning Morena has technically never been on her own turf, exploiting the very custom that legitimizes the war. Nobunaga starts to respect the enemy's architect.",
    chapter: 400,
    day: 10,
    kind: "discovery",
    locationId: "tier-4",
    participantIds: ["nobunaga", "phinks", "feitan"],
    storylineIds: ["heil-ly-morena", "mafia-war"],
    confidence: "canonical",
  },
  {
    id: "ev-400-kacho-beast-council",
    title: "The beast that thinks it is Kacho",
    summary:
      "At the Justice Bureau, the 'Kacho' who came back declares herself likely a guardian spirit resurrected to protect Fugetsu — and out of the contest either way. She orders the grieving Melody to stand up: they will make Fugetsu king, and Fugetsu must not learn the truth.",
    chapter: 400,
    day: 10,
    kind: "discovery",
    locationId: "ministry-of-justice",
    participantIds: ["kacho", "melody", "kaiser"],
    storylineIds: ["kacho-fugetsu"],
    knowledgeChanges: [
      { factId: "fact-kacho-death", characterId: "kacho", state: "knows" },
      { factId: "fact-kacho-death", characterId: "kaiser", state: "knows" },
    ],
    confidence: "canonical",
  },
  {
    id: "ev-400-kaiser-proposal",
    title: "Kaiser proposes poisoning the higher princes",
    summary:
      "The Bureau investigator handling Melody — heartbeat 'precise as an atomic clock' — proposes wiping out the higher-ranked princes with slow poison during her performances, and confesses he loves her. Melody agrees while privately assuming he is manipulated or a mastermind's tool.",
    chapter: 400,
    day: 10,
    kind: "decision",
    locationId: "ministry-of-justice",
    participantIds: ["kaiser", "melody", "kacho"],
    storylineIds: ["kacho-fugetsu", "special-martial-law"],
    confidence: "canonical",
  },
  {
    id: "ev-400-martial-law-primer",
    title: "The Special Martial Law failsafe",
    summary:
      "Kaiser hands Steiner a panic device and explains the stakes: the Justice Bureau is the ship's last neutral institution, and the moment special martial law is declared it becomes a dictator's base — insurgents charged and executed within ten minutes. Steiner realizes he has just been designated the surviving witness.",
    chapter: 400,
    day: 10,
    kind: "conversation",
    locationId: "ministry-of-justice",
    participantIds: ["kaiser"],
    storylineIds: ["special-martial-law", "ship-security-crisis"],
    knowledgeChanges: [
      {
        factId: "fact-special-martial-law",
        characterId: "kaiser",
        state: "suspects",
      },
    ],
    confidence: "canonical",
  },
  {
    id: "ev-400-fugetsu-addiction",
    title: "Fugetsu's doors multiply — and drain her",
    summary:
      "Fugetsu reports a 'breakthrough': her once-a-day ability now works repeatedly, and she is euphoric, exhausted, and gray. Melody hears evil spirits gathering around a heartbeat as weak as Zetsu. Something has marked the Eleventh Prince and is feeding on her use of her own power.",
    chapter: 400,
    day: 10,
    kind: "discovery",
    locationId: "ministry-of-justice",
    participantIds: ["fugetsu", "kacho", "melody"],
    storylineIds: ["kacho-fugetsu"],
    confidence: "canonical",
  },
  {
    id: "ev-400-longhi-approach",
    title: "Longhi drops the mask",
    summary:
      "In line for the awakening, Tubeppa's guard Longhi tells Kurapika water divination is unnecessary — she already uses Nen — and asks him to hear a contract. After hearing her out, Kurapika agrees to collaborate with Prince Tubeppa.",
    chapter: 400,
    day: 10,
    kind: "conversation",
    locationId: "room-1014",
    participantIds: ["longhi", "kurapika", "bill"],
    storylineIds: ["kurapika-woble", "nen-classes"],
    confidence: "canonical",
  },

  // -------------------------------------------------------------------------
  // Ch 401 — "Moonlight", day 10
  // -------------------------------------------------------------------------
  {
    id: "ev-401-moonlight-act",
    title: "Moonlight Act: contracts written in aura",
    summary:
      "Longhi's Transparent Words — Moonlight Act conjures pen and paper for limited-term contracts: signatories can be loaned her ability or bound by restrictions, enforceable by a week of forced Zetsu. Its absolute condition — voluntary signature after full, truthful disclosure — makes her the one guard on the ship who cannot lie about her terms.",
    chapter: 401,
    day: 10,
    kind: "nen-reveal",
    locationId: "room-1014",
    participantIds: ["longhi", "kurapika", "bill", "oito"],
    storylineIds: ["kurapika-woble"],
    confidence: "canonical",
  },
  {
    id: "ev-401-longhi-beyond-daughter",
    title: "Longhi is Beyond's daughter",
    summary:
      "Longhi reveals she is Beyond Netero's biological child — one of many, born of fake marriages Beyond arranged with Kakin officers for thirty years, raised to become princes' guards. She learned the truth only when her inherited traits failed to add up.",
    chapter: 401,
    day: 10,
    kind: "discovery",
    locationId: "room-1014",
    participantIds: ["longhi", "kurapika", "bill", "oito"],
    storylineIds: ["beyond-netero", "kurapika-woble"],
    knowledgeChanges: [
      {
        factId: "fact-beyond-curse",
        characterId: "kurapika",
        state: "was-told",
      },
    ],
    confidence: "canonical",
  },
  {
    id: "ev-401-curse-sacrifices",
    title: "The curse sacrifices under the tongue",
    summary:
      "Longhi lifts her tongue to show a sealed curse — malevolent Nen set to release on her death, unpurgeable, planted by her own father. She and her half-sister Makaha are two of ten 'strong curse sacrifices'; the targets, she believes, are the princes. Beyond has been rigging the succession contest since before it existed.",
    chapter: 401,
    day: 10,
    kind: "nen-reveal",
    locationId: "room-1014",
    participantIds: ["longhi", "kurapika", "bill"],
    storylineIds: ["beyond-netero", "succession-contest"],
    knowledgeChanges: [
      { factId: "fact-beyond-curse", characterId: "longhi", state: "knows" },
      { factId: "fact-beyond-curse", characterId: "bill", state: "was-told" },
    ],
    confidence: "canonical",
  },
  {
    id: "ev-401-beyond-child-theory",
    title: "'One of the princes is Beyond's child'",
    summary:
      "Longhi rejects Kurapika's Benjamin theory: her greedy father would not spend decades of preparation on someone unrelated. Oito confirms the loophole — eligibility requires only being a 'child of a legal wife' of Nasubi. Longhi's contract condition follows: find Beyond's child among the princes. Her true plan: kill them herself.",
    chapter: 401,
    day: 10,
    kind: "discovery",
    locationId: "room-1014",
    participantIds: ["longhi", "kurapika", "bill", "oito"],
    storylineIds: ["beyond-netero", "succession-contest", "kurapika-woble"],
    confidence: "canonical",
  },
  {
    id: "ev-401-beyond-requests-meeting",
    title: "Beyond asks for a visitor",
    summary:
      "In his Tier 1 cell, between banter with Kanzai about writing his own novel, Beyond says there is someone he wants to talk to and asks for a meeting to be arranged. The caged figurehead starts moving pieces.",
    chapter: 401,
    day: 10,
    approxTime: "2:00 p.m.",
    kind: "decision",
    locationId: "beyond-quarters",
    participantIds: ["beyond"],
    storylineIds: ["beyond-netero"],
    confidence: "canonical",
  },

  // -------------------------------------------------------------------------
  // Ch 402 — "Letter", days 10–11
  // -------------------------------------------------------------------------
  {
    id: "ev-402-three-way-pact",
    title: "The Zhang Lei succession pact",
    summary:
      "Tenftory relays the deal to Zhang Lei: if he, Tubeppa, and Woble are the last three standing, the other two renounce the throne in his favor — in writing — in exchange for Sakata and Hashito's indefinite support. A partial-surrender framework nobody is sure the ritual even permits.",
    chapter: 402,
    day: 10,
    kind: "alliance",
    locationId: "zhang-lei-quarters",
    participantIds: [
      "tenftory",
      "zhang-lei",
      "coventoba",
      "tubeppa",
      "maor",
      "longhi",
      "kurapika",
      "oito",
      "woble",
    ],
    storylineIds: ["succession-contest", "kurapika-woble"],
    confidence: "canonical",
  },
  {
    id: "ev-402-tsk17-prepared",
    title: "Balsamilco arms himself with TSK-17",
    summary:
      "Alone, Balsamilco loads a shoe-mounted dispersal rig with a failed military pathogen (later named TSK-17) that denatures in seconds in open air but kills by organ failure in half a day if inhaled — then erases itself from the corpse. His resolve: erase Halkenburg with it.",
    chapter: 402,
    day: 10,
    kind: "decision",
    locationId: "benjamin-quarters",
    participantIds: ["balsamilco"],
    storylineIds: [
      "benjamin-military",
      "halkenburg-movement",
      "special-martial-law",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-402-letters-plan",
    title: "Kacho's posthumous letters open every door",
    summary:
      "Kaiser escorts Fugetsu to hand-deliver 'Kacho's final letters' to each prince — cover for marking rooms Fugetsu's door can later reach, and for watching each prince react to Bureau-leaked secrets. Benjamin's beast incidentally screeches Fugetsu's evil spirits away; Basho slips her a protective haiku charm.",
    chapter: 402,
    day: 11,
    kind: "movement",
    locationId: "royal-quarters",
    participantIds: [
      "kaiser",
      "fugetsu",
      "kacho",
      "melody",
      "benjamin",
      "butch",
      "tubeppa",
      "tyson",
      "luzurus",
      "basho",
      "kanjidol",
    ],
    storylineIds: ["kacho-fugetsu", "special-martial-law"],
    consequences: [
      "Kaiser confirms Benjamin is waiting for grounds to declare martial law",
      "Luzurus reads the letter as bait and hands it straight back to the Bureau",
    ],
    confidence: "canonical",
  },

  // -------------------------------------------------------------------------
  // Ch 403 — "Results", day 11
  // -------------------------------------------------------------------------
  {
    id: "ev-403-kacho-letter-plan",
    title: "Kurapika turns Kacho's letter into leverage",
    summary:
      "Kurapika tells Oito that escape from the ship is impossible but the ritual still contains an opening. With her permission, he schedules Kacho's letter for publication during the second Nen class — hoping to calm the lower princes, prevent the higher camps from panicking over exposed secrets, and draw them into negotiations.",
    chapter: 403,
    day: 11,
    kind: "decision",
    locationId: "room-1014",
    participantIds: ["kurapika", "oito", "kacho"],
    storylineIds: ["kurapika-woble", "nen-classes", "kacho-fugetsu"],
    confidence: "canonical",
  },
  {
    id: "ev-403-courthouse-ambush",
    title: "The courthouse ambush",
    summary:
      "Balsamilco walks into the Tier 2 Ministry of Justice confident Halkenburg has no followers near — and finds Vict signing to him in military code, strangers watching from corridor ends, and twelve civilian supporters powering the bow around the corner. Halkenburg fires Grimmel the Dissonance through the wall.",
    chapter: 403,
    day: 11,
    approxTime: "morning",
    kind: "battle",
    locationId: "ministry-of-justice",
    participantIds: ["balsamilco", "halkenburg", "vict"],
    storylineIds: ["halkenburg-movement", "benjamin-military"],
    consequences: [
      "Halkenburg's ability works with devoted civilians — not only his guards",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-403-balsamilco-possessed",
    title: "Halkenburg wears Balsamilco",
    summary:
      "The arrow lands: Halkenburg's mind now pilots Benjamin's chief strategist while his own body lies 'ill.' On the phone, Benjamin suspects manipulation, cannot prove it, and orders 'results' anyway — playing along with the thing wearing his captain.",
    chapter: 403,
    day: 11,
    kind: "betrayal",
    locationId: "ministry-of-justice",
    participantIds: ["halkenburg", "balsamilco", "benjamin"],
    storylineIds: ["halkenburg-movement", "benjamin-military"],
    knowledgeChanges: [
      {
        factId: "fact-halkenburg-possession",
        characterId: "benjamin",
        state: "suspects",
      },
      {
        factId: "fact-halkenburg-possession",
        characterId: "halkenburg",
        state: "knows",
      },
    ],
    confidence: "canonical",
  },
  {
    id: "ev-403-unma-call",
    title: "Unma blesses her real son's choice",
    summary:
      "The First Queen takes a call, approves 'the kind of choice you would make,' and tells Prince Halkenburg she is proud of him — quietly confirming the letter's rumor that Benjamin's own mother bore the Ninth Prince and hid him with Duazul for his safety.",
    chapter: 403,
    day: 11,
    kind: "conversation",
    locationId: "tier-1",
    participantIds: ["unma", "halkenburg"],
    storylineIds: ["halkenburg-movement", "benjamin-military"],
    evidence: [
      {
        chapter: 403,
        note: "Kacho's letter to Benjamin lays out the Unma–Halkenburg theory; Unma's call makes it near-certain.",
        confidence: "strong-inference",
      },
    ],
    confidence: "strong-inference",
  },
  {
    id: "ev-403-worio-message",
    title: "'Halkenburg is going to die soon'",
    summary:
      "Kaiser traces a stray fainting to Worio Bay, a Bureau staffer bearing Halkenburg's pinion mark, pre-briefed to speak if Kaiser raised Nen on his own. The message waiting for him: the Ninth Prince intends to die — soon — and expected Kaiser to come asking.",
    chapter: 403,
    day: 11,
    kind: "discovery",
    locationId: "ministry-of-justice",
    participantIds: ["kaiser", "halkenburg"],
    storylineIds: ["halkenburg-movement", "special-martial-law"],
    confidence: "canonical",
  },

  // -------------------------------------------------------------------------
  // Ch 404 — "Speculation", days 11–12
  // -------------------------------------------------------------------------
  {
    id: "ev-404-coin-analysis",
    title: "Kurapika prices the coins",
    summary:
      "Invited to Room 1003, Kurapika reads Zhang Lei's beast as a cumulative Conjurer: held coins compound tenfold every ten days, on track to open their holders' nodes within months, with 10^64 the value where abilities could manifest — a king's mint for mass-producing Nen users after coronation. He keeps the pseudo-coercive loyalty implication, and Coventoba's theft, to himself.",
    chapter: 404,
    day: 11,
    kind: "investigation",
    locationId: "zhang-lei-quarters",
    participantIds: ["kurapika", "zhang-lei", "tenftory", "coventoba", "oito"],
    storylineIds: ["succession-contest", "kurapika-woble"],
    confidence: "canonical",
  },
  {
    id: "ev-404-halkenburg-medical-handoff",
    title: "Cheadle's team receives Halkenburg",
    summary:
      "Leorio joins Cheadle and four other assistants rushing the collapsed Ninth Prince through the Tier 3 hospital. Cheadle orders bloodwork, imaging, and forensic testing, but Benjamin's royal and military medical teams force the Association staff out before the poison finishes its work.",
    chapter: 404,
    day: 11,
    kind: "movement",
    locationId: "tier-3-medical",
    participantIds: ["halkenburg", "cheadle", "leorio"],
    storylineIds: ["halkenburg-movement", "ship-security-crisis"],
    confidence: "canonical",
  },
  {
    id: "ev-404-mind-swap-doctrine",
    title: "The full mechanics of the mind swap",
    summary:
      "Halkenburg-in-Balsamilco narrates his ability's rules, proven on Shikaku, Sumidori, and Vict: one mind awake at a time, his side holding priority; when the possessed side's original body dies, the victim's mind returns home and the intruder sleeps. His plan: kill his own body, ride Balsamilco for roughly ten hours, and win the contest as a dead man.",
    chapter: 404,
    day: 11,
    kind: "nen-reveal",
    locationId: "tier-3-medical",
    participantIds: ["halkenburg", "balsamilco"],
    storylineIds: ["halkenburg-movement"],
    knowledgeChanges: [
      {
        factId: "fact-halkenburg-possession",
        characterId: "halkenburg",
        state: "knows",
      },
    ],
    confidence: "canonical",
  },
  {
    id: "ev-404-halkenburg-body-dies",
    title: "Halkenburg's body dies",
    summary:
      "Poisoned with TSK-17 by his own possessed hand, Halkenburg's body fails despite resuscitation as day twelve begins. Benjamin dictates a stately funeral — procession, send-off, guards as pallbearers — believing his order to Balsamilco was simply carried out. 'Balsamilco' thanks his brother, privately.",
    chapter: 404,
    day: 12,
    approxTime: "early hours",
    kind: "death",
    locationId: "tier-3-medical",
    participantIds: ["halkenburg", "benjamin", "balsamilco", "cheadle"],
    casualtyIds: ["halkenburg"],
    storylineIds: [
      "halkenburg-movement",
      "benjamin-military",
      "succession-contest",
    ],
    consequences: [
      "Officially the fourth royal death of the voyage — but the soul persists in Balsamilco",
      "Charges against Halkenburg's guards are dropped so they can carry his casket",
    ],
    knowledgeChanges: [
      {
        factId: "fact-halkenburg-possession",
        characterId: "benjamin",
        state: "unaware",
      },
    ],
    confidence: "canonical",
  },
  {
    id: "ev-404-second-round-set",
    title: "A second round of classes — with Camilla's guard",
    summary:
      "Kurapika sets round two for 9 a.m. Thursday and notes the anomaly: Camilla, who ignored round one, is sending exactly one guard. He orders Bill and Shimano to keep that student as far from Woble as shifts allow.",
    chapter: 404,
    day: 11,
    kind: "decision",
    locationId: "room-1014",
    participantIds: [
      "kurapika",
      "bill",
      "shimano",
      "babimyna",
      "sakata",
      "hashito",
    ],
    storylineIds: ["nen-classes", "kurapika-woble"],
    confidence: "canonical",
  },

  // -------------------------------------------------------------------------
  // Ch 405 — "Performance", day 12
  // -------------------------------------------------------------------------
  {
    id: "ev-405-hisoka-casino",
    title: "Hisoka, on-page, in the Tier 1 casino",
    summary:
      "The real Hisoka surfaces at last: winning absurd hands at the VIP casino, rolling triple sevens, and monologuing that group abilities and ceremony-made beasts turn him off — he wants one person, one-on-one, to love to death. He has been above the hunt the entire time.",
    chapter: 405,
    day: 12,
    kind: "discovery",
    locationId: "tier-1-casino",
    participantIds: ["hisoka"],
    storylineIds: ["troupe-hisoka-hunt"],
    knowledgeChanges: [
      {
        factId: "fact-hisoka-aboard",
        characterId: "bonolenov",
        state: "knows",
      },
    ],
    confidence: "canonical",
  },
  {
    id: "ev-405-bonolenov-decoy",
    title: "The decoy Hisoka was Bonolenov",
    summary:
      "Chrollo's balance play is revealed: Bonolenov impersonated Hisoka so the mafia would 'find' and stash him, freeing the Troupe's search. Lynch's soul-punch pierced the act, so he killed her, spared the unknowing Zakuro as a messenger, and now spots the real Hisoka across the casino floor.",
    chapter: 405,
    day: 12,
    kind: "betrayal",
    locationId: "tier-1-casino",
    participantIds: ["bonolenov", "chrollo", "lynch", "zakuro", "hisoka"],
    casualtyIds: ["lynch"],
    storylineIds: ["troupe-hisoka-hunt", "mafia-war"],
    consequences: [
      "The mafia's contained 'Hisoka' evaporates; the Xi-Yu has a murdered officer",
      "The Troupe holds the #9 seat open — every Spider wants Hisoka before Chrollo does",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-405-dogman-hunt",
    title: "Dogman hunts specialists at the funeral",
    summary:
      "Morena greenlights her endgame's first step: Dogman, level 62, can smell Nen types at five meters and certainty at a sniff. He and Sodom — whose kidnap ability works only on non-users — will trawl the funeral crowds for what Morena is looking for.",
    chapter: 405,
    day: 12,
    kind: "movement",
    locationId: "heil-ly-hideout",
    participantIds: ["morena"],
    storylineIds: ["heil-ly-morena"],
    confidence: "canonical",
  },
  {
    id: "ev-405-keni-joker",
    title: "Ken'i answers to Morena",
    summary:
      "After Tajao pledges the Cha-R and Xi-Yu's full support to the Troupe's Heil-Ly extermination, Ken'i privately addresses Morena in his thoughts — 'we have a problem' — and weighs deploying their 'joker,' all but confirming the Cha-R underboss is hers.",
    chapter: 405,
    day: 12,
    kind: "betrayal",
    locationId: "cha-r-office",
    participantIds: ["ken-i", "nobunaga", "phinks", "feitan"],
    storylineIds: ["heil-ly-morena", "mafia-war", "troupe-hisoka-hunt"],
    confidence: "strong-inference",
  },

  // -------------------------------------------------------------------------
  // Ch 406 — "Regalia", day 12
  // -------------------------------------------------------------------------
  {
    id: "ev-406-processing-area",
    title: "The waste plant between the tiers",
    summary:
      "Tajao leads three Spiders up through the ship's outermost shell and the sewage plant between Tiers 4 and 5 — subcontracted turf where, Nobunaga realizes, killers posing as waste contractors could murder on an assembly line. Phinks and Feitan continue up; Nobunaga turns back toward the Heil-Ly.",
    chapter: 406,
    day: 12,
    kind: "movement",
    locationId: "hidden-passage-network",
    participantIds: ["nobunaga", "phinks", "feitan"],
    storylineIds: ["troupe-hisoka-hunt", "mafia-war", "heil-ly-morena"],
    confidence: "canonical",
  },
  {
    id: "ev-406-lynch-found",
    title: "Lynch's body — and Hinrigh's deduction",
    summary:
      "Lynch is found with her neck professionally broken. Working backward from Zakuro's account, Hinrigh reconstructs the truth: the found 'Hisoka' was a fake; Lynch's ability exposed him, so he killed her and impersonated her to steer the mafia's conclusions. The Xi-Yu vows revenge on the culprit, whoever it is.",
    chapter: 406,
    day: 12,
    kind: "investigation",
    locationId: "tier-3",
    participantIds: ["hinrigh", "zakuro", "lynch"],
    storylineIds: ["mafia-war", "troupe-hisoka-hunt"],
    confidence: "canonical",
  },
  {
    id: "ev-406-disgusting-telephone",
    title: "Chrollo dials for Hisoka",
    summary:
      "In the Tier 3 funeral crowd Chrollo conjures Disgusting Telephone — a stolen locator that generates a dial-number for a target and guides the caller in. Hisoka reads as within range but unpinnable, then 'out of Nen range': Chrollo concludes his quarry is on Tier 1 and weighs the risk of going up.",
    chapter: 406,
    day: 12,
    kind: "investigation",
    locationId: "tier-3",
    participantIds: ["chrollo"],
    storylineIds: ["troupe-hisoka-hunt"],
    consequences: [
      "Chrollo places Hisoka 'up above' on Tier 1 — narrowing the hunt without reaching him",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-406-chrollo-treasures",
    title: "Chrollo targets the three sacred treasures",
    summary:
      "Amid the funeral crowds, Chrollo reveals his real prize: the Seed Urn, the Lotus Anchorite, and the Sword of Good Omens — the ritual engine of Kakin's prosperity, surely kept on Tier 1. Stealing something of national-treasure grade would evolve Skill Hunter into the weapon he needs to finish Hisoka for good.",
    chapter: 406,
    day: 12,
    kind: "decision",
    locationId: "tier-3",
    participantIds: ["chrollo"],
    storylineIds: ["troupe-hisoka-hunt", "succession-contest"],
    consequences: [
      "A conjured phone ability places Chrollo's quarry 'up above' — beyond his current range",
    ],
    confidence: "canonical",
  },

  // -------------------------------------------------------------------------
  // Ch 407 — "Negotiation", day 12
  // -------------------------------------------------------------------------
  {
    id: "ev-407-borksen-abducted",
    title: "Borksen vanishes from the funeral crowd",
    summary:
      "Thirty minutes after her last check-in, the soldier Borksen — one of Tserriednich's five friends — is gone without witnesses. Her squad, bound by their own no-rescue pact, can only theorize; the reader sees her wake across a card table from Morena.",
    chapter: 407,
    day: 12,
    approxTime: "1:00 p.m.",
    kind: "movement",
    locationId: "tier-3",
    participantIds: ["morena", "borksen", "otocin", "momolly"],
    storylineIds: ["heil-ly-morena"],
    confidence: "canonical",
  },
  {
    id: "ev-407-negotiation-game",
    title: "Morena's negotiation game",
    summary:
      "Recruitment as ritual: seven face-up cards for the 'parent,' five face-down for the 'child,' the last card standing the answer. Yes means joining; X voids the whole negotiation; the price of No is deferred to its own explanation card. Borksen, reading three traps deep, agrees to play.",
    chapter: 407,
    day: 12,
    kind: "other",
    locationId: "heil-ly-hideout",
    participantIds: ["morena", "borksen", "yokotani", "voconte"],
    storylineIds: ["heil-ly-morena"],
    confidence: "canonical",
  },

  // -------------------------------------------------------------------------
  // Ch 408 — "Negotiation: Part 2", day 12
  // -------------------------------------------------------------------------
  {
    id: "ev-408-morena-backstory",
    title: "The carnival orphan wearing Morena's name",
    summary:
      "'Morena Prudo' is in a marked grave; the woman across the table is a Carne Levare orphan — child of a villager forced to 'entertain' visiting royalty, scarred at birth, sorted as 'flesh' by the Heil-Ly's trafficking ring, and used for twenty years before taking the family over. Her goal: Kakin's destruction, then humanity's.",
    chapter: 408,
    day: 12,
    kind: "discovery",
    locationId: "heil-ly-hideout",
    participantIds: ["morena", "borksen", "yokotani", "voconte"],
    storylineIds: ["heil-ly-morena"],
    consequences: [
      "The carnival still runs: a '20-year batch of orphans arrived last year — Kakin has not changed",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-408-specialist-hunt",
    title: "Why Borksen: a specialist for the critical role",
    summary:
      "Morena explains her Contagion openly — a mother-and-22-children pyramid granting abilities toward shared goals — and why Borksen matters: she is an unawakened Specialist, one in three thousand, needed for the ability that fills Morena's most critical slot. Her sniffer has already flagged other specialists aboard, including an excited note about a Heavens Arena Floor Master.",
    chapter: 408,
    day: 12,
    kind: "nen-reveal",
    locationId: "heil-ly-hideout",
    participantIds: ["morena", "borksen", "yokotani", "voconte"],
    storylineIds: ["heil-ly-morena"],
    knowledgeChanges: [
      {
        factId: "fact-morena-contagion",
        characterId: "morena",
        state: "knows",
      },
    ],
    confidence: "canonical",
  },
  {
    id: "ev-408-sml-alarm",
    title: "The alarm: Special Martial Law is declared",
    summary:
      "Mid-game, the ship's speakers announce Special Martial Law — not a drill. Every royal soldier now holds shoot-without-warning authority; the game between Morena and Borksen continues under the sirens of the ship's new order.",
    chapter: 408,
    day: 12,
    approxTime: "2:15 p.m.",
    kind: "other",
    locationId: "black-whale",
    participantIds: ["morena", "borksen", "yokotani", "voconte"],
    storylineIds: ["special-martial-law", "heil-ly-morena"],
    knowledgeChanges: [
      {
        factId: "fact-special-martial-law",
        characterId: "morena",
        state: "knows",
      },
    ],
    confidence: "canonical",
  },

  // -------------------------------------------------------------------------
  // Ch 409 — "Negotiation: Part 3", day 12
  // -------------------------------------------------------------------------
  {
    id: "ev-409-sml-broadcast",
    title: "Tier by tier, the ship kneels",
    summary:
      "The broadcast climbs the ship tier by tier: Tier 3 civilians kneel against walls under shoot-to-kill orders; Tier 2 returns to rooms, hands visible; Tier 1 awaits military inspection. Borksen mines the announcement order for her position — and realizes the hideout hears every tier's broadcast.",
    chapter: 409,
    day: 12,
    kind: "other",
    locationId: "black-whale",
    participantIds: ["morena", "borksen", "yokotani", "voconte"],
    storylineIds: ["special-martial-law", "ship-security-crisis"],
    confidence: "canonical",
  },
  {
    id: "ev-409-hideout-between-tiers",
    title: "The hideout sits between Tiers 2 and 3",
    summary:
      "Through yes/no questioning Borksen extracts the answer that reframes the whole war: the Heil-Ly base occupies the space between Tiers 2 and 3, near the central gate, with five entrances and 21 members — infrastructure planned before the Black Whale was built.",
    chapter: 409,
    day: 12,
    kind: "discovery",
    locationId: "heil-ly-hideout",
    participantIds: ["morena", "borksen", "yokotani", "voconte"],
    storylineIds: ["heil-ly-morena"],
    knowledgeChanges: [
      { factId: "fact-hidden-passages", characterId: "morena", state: "knows" },
    ],
    confidence: "canonical",
  },
  {
    id: "ev-409-kiss-conditions",
    title: "The kiss and the three conditions",
    summary:
      "Borksen buys back the X card by granting Morena's 'small request' — a kiss that Morena openly declares is one of her ability's infection conditions. Joining requires all three: a final Yes, Morena's kiss, and witnessing a Heil-Ly murder. One of the three is now done without Borksen ever agreeing.",
    chapter: 409,
    day: 12,
    kind: "other",
    locationId: "heil-ly-hideout",
    participantIds: ["morena", "borksen", "yokotani", "voconte"],
    storylineIds: ["heil-ly-morena"],
    confidence: "canonical",
  },

  // -------------------------------------------------------------------------
  // Ch 410 — "Negotiation: Part 4", day 12
  // -------------------------------------------------------------------------
  {
    id: "ev-410-borksen-forced-yes",
    title: "The cheat clause claims Borksen",
    summary:
      "Borksen marked the Return card while double-checking her face-down cards — and the game itself is Morena's ability, its manipulation triggering on any cheat. Screaming inside a body that only points and says 'Yes,' Borksen joins the Heil-Ly at level 0, assumes Morena sees through her eyes, and asks for a tour of her new comrades.",
    chapter: 410,
    day: 12,
    kind: "betrayal",
    locationId: "heil-ly-hideout",
    participantIds: ["morena", "borksen", "yokotani", "voconte"],
    storylineIds: ["heil-ly-morena"],
    consequences: [
      "Morena gains her specialist — and a mole who intends to fight from inside",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-410-benjamin-takeover",
    title: "Benjamin seizes the three branches",
    summary:
      "Forty minutes into martial law, Benjamin walks into the Justice Bureau and informs Mizaistom, Botobai, and Kaiser that the government is now consolidated under military force, with the Bureau as his command center and the three of them as witnesses. His pretext: bio-terrorism 'orchestrated by Tserriednich and Halkenburg.'",
    chapter: 410,
    day: 12,
    kind: "decision",
    locationId: "ministry-of-justice",
    participantIds: ["benjamin", "mizaistom", "kaiser"],
    storylineIds: [
      "special-martial-law",
      "benjamin-military",
      "ship-security-crisis",
    ],
    knowledgeChanges: [
      {
        factId: "fact-special-martial-law",
        characterId: "mizaistom",
        state: "knows",
      },
    ],
    confidence: "canonical",
  },
  {
    id: "ev-410-benjamin-dying",
    title: "Benjamin is on the clock",
    summary:
      "The reader learns why the First Prince is moving so fast: he is infected, roughly 9.5 hours from coma and 12 from death. He means to purge the remaining princes and be anointed successor in time to pass the throne to his child under the State of Emergency Act. Botobai reads his pallor; Kaiser counts his hours.",
    chapter: 410,
    day: 12,
    kind: "discovery",
    locationId: "ministry-of-justice",
    participantIds: ["benjamin", "kaiser", "mizaistom"],
    storylineIds: ["special-martial-law", "benjamin-military"],
    confidence: "canonical",
  },

  // -------------------------------------------------------------------------
  // Ch 411 — "Announcement", day 12, 8:00 a.m. (rewind before the declaration)
  // -------------------------------------------------------------------------
  {
    id: "ev-411-balsamilco-impersonation",
    title: "'Balsamilco' calls Benjamin from the Ministry of Justice",
    summary:
      "At 8 a.m. on the twelfth day, Halkenburg — inside Balsamilco — phones Benjamin from Tier 2: the funeral departs at 1 p.m., the will exempts the princes from attending, and 'Balsamilco' will return once Halkenburg's guards are disbanded below Tier 2. Benjamin acknowledges his brother's puppet without knowing it.",
    chapter: 411,
    day: 12,
    approxTime: "8:00 a.m.",
    kind: "conversation",
    locationId: "ministry-of-justice",
    participantIds: ["halkenburg", "balsamilco", "benjamin"],
    storylineIds: ["halkenburg-movement", "benjamin-military"],
    knowledgeChanges: [
      {
        factId: "fact-halkenburg-possession",
        characterId: "halkenburg",
        state: "knows",
      },
    ],
    confidence: "canonical",
  },
  {
    id: "ev-411-kaiser-shelter",
    title: "Kaiser's office shelters the survivors",
    summary:
      "On Tier 2, Kaiser hosts the Fugetsu protection cell: the sleeping prince, Melody, and the beast-Kacho who frets that her own upkeep drains her sister. Kaiser's read on the funeral: grand, solemn, and to be survived before whatever comes next.",
    chapter: 411,
    day: 12,
    kind: "conversation",
    locationId: "ministry-of-justice",
    participantIds: ["kaiser", "kacho", "melody"],
    storylineIds: ["kacho-fugetsu", "special-martial-law"],
    confidence: "canonical",
  },
  {
    id: "ev-411-sarahell-infiltration",
    title: "Sarahell walks into class as a maid",
    summary:
      "In Room 302, Camilla's captain paints on a new face, dons a maid's uniform, and joins the Nen class to curse Woble: a week's accumulation from a distance, five days with something Woble has used, instant if she can die looking into the prince's eyes. Room 1014 sees only a servant.",
    chapter: 411,
    day: 12,
    kind: "movement",
    locationId: "room-1014",
    participantIds: ["sarahell", "fukataki"],
    storylineIds: ["succession-contest", "nen-classes"],
    confidence: "canonical",
  },
  {
    id: "ev-411-second-class-opens",
    title: "Round two: eighteen students, two classes",
    summary:
      "Kurapika opens the second round — eighteen students now — splitting an introductory class (Nen in two weeks) from a beginner class (one major principle per week), with aligned princes allowed one extra student each. Furykov calculates the effect: guards spread thin, military strength equalized, the contest turned defensive.",
    chapter: 411,
    day: 12,
    kind: "other",
    locationId: "room-1014",
    participantIds: [
      "kurapika",
      "bill",
      "shimano",
      "sakata",
      "hashito",
      "furykov",
      "babimyna",
      "belerainte",
      "satobi",
      "tenftory",
      "maor",
      "slakka",
      "sarahell",
      "ladiolus",
      "gipper",
    ],
    storylineIds: ["nen-classes", "kurapika-woble"],
    confidence: "canonical",
  },
  {
    id: "ev-411-ritual-structure",
    title: "The contest is stage two of a four-stage ritual",
    summary:
      "Kurapika lectures the class on why only one heir may survive: a vow-and-limitation engine in four stages — the prayer and pledge, the offering of the king's own bloodline, the ceremonial gathering of the fallen into a sacred convergence, and rule through the resulting power. The deliberately-left loophole: more than one survivor breaks the ritual.",
    chapter: 411,
    day: 12,
    kind: "discovery",
    locationId: "room-1014",
    participantIds: ["kurapika", "furykov", "tenftory", "maor"],
    storylineIds: ["succession-contest", "nen-classes"],
    consequences: [
      "If no sole victor emerges during the voyage, the Hui Guo Rou dynasty falls from power",
      "Furykov hears it as encouragement to eliminate the lower princes quickly",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-411-woble-ineligible",
    title: "Kurapika declares Woble ineligible",
    summary:
      "Closing the lecture, Kurapika announces to every camp's observers that the Fourteenth Prince is not eligible to participate in the Succession Contest. In the bedroom, Oito lies awake, eyes open. The gambit lands one chapter before the reader learns what it rests on.",
    chapter: 411,
    day: 12,
    kind: "decision",
    locationId: "room-1014",
    participantIds: ["kurapika", "oito", "woble"],
    storylineIds: ["kurapika-woble", "succession-contest"],
    confidence: "canonical",
  },

  // -------------------------------------------------------------------------
  // Ch 412 — "Question", days 10 and 12
  // -------------------------------------------------------------------------
  {
    id: "ev-412-woble-swap-reveal",
    title: "The Woble swap",
    summary:
      "Flashback, two days earlier: Bill catches Oito alternating masculine and feminine pronunciations of 'Woble' — the same distinction as Shimanu/Shimano. Under the Dowsing Chain, Oito admits the baby aboard is a boy, her younger sister's son. Her real daughter Woble, who underwent the Seed Urn ceremony, is off-ship with the sister, location unknown even to Oito.",
    chapter: 412,
    day: 10,
    kind: "discovery",
    locationId: "room-1014",
    participantIds: [
      "oito",
      "kurapika",
      "bill",
      "shimano",
      "woble",
      "woble-substitute",
      "sakata",
      "babimyna",
    ],
    storylineIds: ["kurapika-woble", "succession-contest"],
    knowledgeChanges: [
      { factId: "fact-woble-swap", characterId: "kurapika", state: "knows" },
      { factId: "fact-woble-swap", characterId: "bill", state: "knows" },
      { factId: "fact-woble-swap", characterId: "oito", state: "knows" },
    ],
    consequences: [
      "Oito's pronunciation trick let her pass every chain interrogation without lying",
      "Neither the boy aboard nor the absent girl properly satisfies the contest's terms",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-412-class-reactions",
    title: "The class weighs the announcement; Slakka walks",
    summary:
      "Given until 10 a.m. to decide, every student returns except Slakka. Kurapika reassesses: Benjamin's threat reduced, the higher princes likely to assume the real Woble is hidden aboard, the alliances with Zhang Lei and Tubeppa intact — and speaking with Beyond may now be the fastest route to the curse.",
    chapter: 412,
    day: 12,
    kind: "decision",
    locationId: "room-1014",
    participantIds: ["kurapika", "slakka", "sakata"],
    storylineIds: ["nen-classes", "kurapika-woble"],
    confidence: "canonical",
  },
  {
    id: "ev-412-cleapatro-beyond",
    title: "Cleapatro buries Beyond in his own lawsuits",
    summary:
      "The magistrate arrives at Beyond's cell with boxes: all 1,047 suits he filed as plaintiff, thrown out. Kanzai and Saiyu screen documents while prisoner and judge bicker about Kakin's idea of human rights — a comic scene seeding contact between Beyond and the court.",
    chapter: 412,
    day: 12,
    kind: "conversation",
    locationId: "beyond-quarters",
    participantIds: ["beyond", "cleapatro"],
    storylineIds: ["beyond-netero"],
    confidence: "canonical",
  },

  // -------------------------------------------------------------------------
  // Ch 413 — "Loyalty", day 12, ~1:45–2:15 p.m.
  // -------------------------------------------------------------------------
  {
    id: "ev-413-burial-chamber",
    title: "The unlit Flame of Life",
    summary:
      "Priests carry Halkenburg's casket through a hidden door in Nasubi's quarters into the Princes' Burial Chamber, laying him between Salé-salé and Kacho. His fireplace stays dark where his siblings' 'Flames of Life' burn — and Nasubi states it plainly: as long as the soul lives in a body, the right of succession stands. Halkenburg is still fighting.",
    chapter: 413,
    day: 12,
    kind: "ceremony",
    locationId: "burial-chamber",
    participantIds: ["nasubi", "nugui", "halkenburg"],
    storylineIds: ["halkenburg-movement", "succession-contest"],
    knowledgeChanges: [
      {
        factId: "fact-halkenburg-possession",
        characterId: "nasubi",
        state: "knows",
      },
    ],
    confidence: "canonical",
  },
  {
    id: "ev-413-arrow-at-benjamin",
    title: "An arrow flies at Benjamin from Room 1009",
    summary:
      "Bound to a chair in his own late quarters, Halkenburg-in-Balsamilco fires Grimmel the Dissonance at the First Prince, powered by the same followers from the Ministry ambush. Benjamin, feeling the rumble, finally assembles the truth — Balsamilco is Halkenburg, and the soul outlived the body — and dispatches soldiers to Room 1009.",
    chapter: 413,
    day: 12,
    kind: "battle",
    locationId: "halkenburg-quarters",
    participantIds: ["halkenburg", "balsamilco", "benjamin", "butch"],
    storylineIds: [
      "halkenburg-movement",
      "benjamin-military",
      "special-martial-law",
    ],
    knowledgeChanges: [
      {
        factId: "fact-halkenburg-possession",
        characterId: "benjamin",
        state: "knows",
      },
    ],
    confidence: "canonical",
  },
  {
    id: "ev-413-benjamin-poisoned",
    title: "Benjamin vomits: TSK-17",
    summary:
      "Mid-crisis, Benjamin retches and recognizes his own weapon's symptoms. The safe shows only Balsamilco's vial missing — so the dose came from somewhere else. Working the timeline, he lands on Furykov, who leaned close while delivering news, and on the only person who could bypass every safeguard: his mother.",
    chapter: 413,
    day: 12,
    kind: "betrayal",
    locationId: "vvip-area",
    participantIds: ["benjamin", "furykov"],
    storylineIds: ["benjamin-military", "special-martial-law"],
    confidence: "canonical",
  },
  {
    id: "ev-413-furykov-confession",
    title: "Furykov: Beyond's son, Unma's hostage",
    summary:
      "Furykov confesses freely: he poisoned Benjamin under Queen Unma's 48-hour ultimatum — she is backing Halkenburg — and he is Beyond Netero's son, carrying the eye-mark curse under his tongue. His true fear was the curse erasing Benjamin's Guardian Spirit Beast's ability; if Benjamin dies to the poison instead, the curse reflects back onto Furykov, sparing the beast. Benjamin, following the logic, accepts him back.",
    chapter: 413,
    day: 12,
    kind: "discovery",
    locationId: "vvip-area",
    participantIds: ["furykov", "benjamin"],
    storylineIds: ["benjamin-military", "beyond-netero", "special-martial-law"],
    knowledgeChanges: [
      {
        factId: "fact-furykov-beyond-son",
        characterId: "benjamin",
        state: "knows",
      },
      { factId: "fact-beyond-curse", characterId: "benjamin", state: "knows" },
    ],
    confidence: "canonical",
  },
  {
    id: "ev-413-sml-declared",
    title: "Special Martial Law, 2:15 p.m.",
    summary:
      "Citing a Tserriednich–Halkenburg conspiracy, Benjamin schedules Special Martial Law for 2:15 p.m.: rival princes' guards executed on sight (Hunter Association members exempt), princes assembled in Room 1001, the 'Grand Hall,' by 2:30. His private goal: merge with his Guardian Spirit Beast's ability and transcend kingship — to watch over Kakin as a god.",
    chapter: 413,
    day: 12,
    approxTime: "2:15 p.m.",
    kind: "decision",
    locationId: "vvip-area",
    participantIds: ["benjamin", "butch", "furykov"],
    storylineIds: [
      "special-martial-law",
      "benjamin-military",
      "succession-contest",
    ],
    knowledgeChanges: [
      {
        factId: "fact-special-martial-law",
        characterId: "benjamin",
        state: "knows",
      },
    ],
    consequences: [
      "Secret Window, leveled up by long use, shows Benjamin what Musse saw in life: Camilla is a counteractive-type Nen user",
      "Camilla and Tserriednich are reserved for Benjamin personally; a TSK-17 vial rides in his shoe",
      "Kanjidol draws a knife; Coventoba panics as the orders land",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-413-grand-hall-assembly",
    title: "Assembly order: the 'Grand Hall', 2:30 p.m.",
    summary:
      "Benjamin's martial-law package redesignates his vacated Room 1001 as the 'Grand Hall' and orders the surviving princes assembled there. Saquelle handles the still-missing Marayam; Rihan is to be dispatched after anyone not present by 2:30 p.m. Protective custody on paper — a kill box in function.",
    chapter: 413,
    day: 12,
    approxTime: "2:30 p.m.",
    kind: "decision",
    // Ch 413 stages the order in Benjamin's VVIP room, not the Grand Hall.
    locationId: "vvip-area",
    participantIds: ["benjamin", "butch", "furykov"],
    storylineIds: [
      "special-martial-law",
      "benjamin-military",
      "succession-contest",
    ],
    consequences: [
      "grand-hall-1001 becomes the terminus of every surviving prince's path",
      "Rihan's Predator is held as the enforcement mechanism for no-shows",
    ],
    confidence: "canonical",
  },

  // -------------------------------------------------------------------------
  // Ch 414 — "Friends", day 12, ~2:00 p.m.
  // -------------------------------------------------------------------------
  {
    id: "ev-414-kanjidol-murders",
    title: "Kanjidol attacks Luzurus's sleeping guards",
    summary:
      "Fifteen minutes before the deadline, Kanjidol stabs two of Luzurus's bodyguards in their bunks, savoring it — martial law means never having to think again. Behind him, the lower-bunk victim slowly raises an arm, leaving both outcomes unresolved.",
    chapter: 414,
    day: 12,
    kind: "assassination-attempt",
    locationId: "room-1007",
    participantIds: ["kanjidol"],
    storylineIds: [
      "special-martial-law",
      "benjamin-military",
      "luzurus-investigation",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-414-luzurus-orders",
    title: "Luzurus reads the play and stands down",
    summary:
      "Told Benjamin's riflemen already flank Room 1009, Luzurus — far sharper than his stoner image — calls it: martial law is starting, resistance is suicide. He orders all guards disarmed and gathered, the drugs burned immediately, and sends Ridge to keep Benjamin's embedded soldier 'busy,' since Hunters are exempt from the kill order.",
    chapter: 414,
    day: 12,
    kind: "decision",
    locationId: "room-1007",
    participantIds: ["luzurus", "basho", "ridge"],
    storylineIds: ["luzurus-investigation", "special-martial-law"],
    confidence: "canonical",
  },
  {
    id: "ev-414-ridge-kanjidol",
    title: "Ridge finds the victims — and Kanjidol",
    summary:
      "Ridge opens the servants' quarters on Kanjidol kneeling over a bleeding guard. 'Self-defense,' says the man with the knife. Both flare their aura; both jump. The first Hunter-versus-soldier fight of martial law begins while the victims' conditions remain unknown.",
    chapter: 414,
    day: 12,
    kind: "battle",
    locationId: "room-1007",
    participantIds: ["ridge", "kanjidol"],
    storylineIds: ["special-martial-law", "luzurus-investigation"],
    confidence: "canonical",
  },
  {
    id: "ev-414-room-1009-breach",
    title: "Yushohi and Chiyamasi set to breach Room 1009",
    summary:
      "No answer at Halkenburg's door means treason against the Royal Army. Yushohi — an En user whose Stand By Me leaves him nearly defenseless while extended — audits his own odds of dying; Chiyamasi activates Muteking the Invincible Hero, accumulating time-limited invincibility with a hand on his partner's shoulder. Yushohi's En detects exactly one person inside.",
    chapter: 414,
    day: 12,
    kind: "movement",
    locationId: "halkenburg-quarters",
    participantIds: ["yushohi", "chiyamasi"],
    storylineIds: [
      "special-martial-law",
      "halkenburg-movement",
      "benjamin-military",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-414-curse-council",
    title: "Room 1014 war-games Beyond's curse",
    summary:
      "Kurapika lays out the unknown that decides everything: does the curse trigger on contest participation — sparing the boy — or on the Seed Urn ceremony, which the real Woble performed? A surge of Nen he half-sensed near the baby early on keeps the worst case live. The only sure source is Beyond himself, and asking is a trap.",
    chapter: 414,
    day: 12,
    kind: "conversation",
    locationId: "room-1014",
    participantIds: [
      "kurapika",
      "oito",
      "bill",
      "shimano",
      "woble",
      "woble-substitute",
    ],
    storylineIds: ["kurapika-woble", "beyond-netero"],
    knowledgeChanges: [
      { factId: "fact-beyond-curse", characterId: "oito", state: "was-told" },
      { factId: "fact-woble-swap", characterId: "shimano", state: "knows" },
    ],
    consequences: [
      "Shimano admits she knew the baby was a boy from the first diaper change — and stayed",
    ],
    confidence: "canonical",
  },
  {
    id: "ev-414-bill-turns",
    title: "Bill turns on Beyond",
    summary:
      "Beyond's own plant renounces him: after the curse revelations, Bill proposes trapping his former master in a Moonlight Act contract, and floats the larger heresy — the Association uniting to stop the Succession Contest itself, break the curses, and raise the clean princes as a new era's symbols.",
    chapter: 414,
    day: 12,
    kind: "betrayal",
    locationId: "room-1014",
    participantIds: ["bill", "kurapika"],
    storylineIds: ["beyond-netero", "kurapika-woble"],
    confidence: "canonical",
  },
  {
    id: "ev-414-yamato-channel",
    title: "The Yamato mail channel",
    summary:
      "Pressed on whether she kept a lifeline, Oito reveals a relative at a post office in Yamato: coded letters without return addresses, answered with the address filled in, wholly off the record. Kurapika — thinking of the friends he trusts more than himself, Gon and Killua — swears the missing Woble will be protected.",
    chapter: 414,
    day: 12,
    kind: "decision",
    locationId: "room-1014",
    participantIds: ["oito", "kurapika", "bill"],
    storylineIds: ["kurapika-woble"],
    consequences: [
      "An off-ship search for the real Woble becomes possible for the first time",
    ],
    confidence: "canonical",
  },
];
