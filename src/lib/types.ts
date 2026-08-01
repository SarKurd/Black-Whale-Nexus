/**
 * Black Whale Nexus — content model.
 *
 * Everything is chapter-aware. The spoiler engine reconstructs the state of
 * the story at any chapter, so history is stored as stamped entries rather
 * than a single "latest" value. `revealCh` marks when the READER learns a
 * fact; `ch` on history entries marks when it becomes true in-universe.
 *
 * Chapter numbering follows the manga. This dataset covers the full
 * Succession War continuity: chapters 340–415 — from Beyond Netero's
 * expedition announcement through the current chapter. `0` on
 * `introducedCh` means the entity was known before chapter 340 (the 2011
 * anime ends at chapter 339, so anime-only viewers know it).
 */

export type Id = string;

export const ARC_START = 340;
export const ARC_END = 415;
export const PRE_ARC = 339;

/** How certain we are about a claim. Rendered as a visible indicator. */
export type Confidence =
  | "canonical"
  | "strong-inference"
  | "weak-inference"
  | "theory"
  | "unknown";

export interface Evidence {
  chapter: number;
  note: string;
  confidence: Confidence;
}

export type CharacterStatus =
  | "alive"
  | "dead"
  | "missing"
  | "incapacitated"
  | "possessed"
  | "detained"
  | "presumed-dead"
  | "unknown";

export type NenType =
  | "enhancer"
  | "transmuter"
  | "emitter"
  | "conjurer"
  | "manipulator"
  | "specialist"
  | "unknown";

/** A value that becomes true at chapter `ch` and is revealed to the reader at `revealCh` (defaults to `ch`). */
export interface Stamp<T> {
  ch: number;
  revealCh?: number;
  value: T;
  note?: string;
}

// ---------------------------------------------------------------------------
// Characters
// ---------------------------------------------------------------------------

export interface Objective {
  text: string;
  kind: "known" | "suspected" | "hidden";
  /** Chapter the reader learns of this objective. */
  revealCh: number;
  status?: "active" | "completed" | "failed" | "abandoned";
}

export interface Secret {
  text: string;
  /** Chapter the reader learns the secret. Before this it is not shown at all. */
  revealCh: number;
  /** Who else (character ids) knows the secret in-universe. */
  knownBy?: Id[];
  evidence?: Evidence[];
}

export interface FalseBelief {
  text: string;
  /** Chapter from which the character holds this belief. */
  ch: number;
  /** Chapter at which the belief is corrected/ends, if it does. */
  endCh?: number;
  truth?: string;
}

export interface Character {
  id: Id;
  name: string;
  aliases?: string[];
  /** Short role line, e.g. "First Prince of Kakin" or "Hui Guo Rou private soldier". */
  role: string;
  /**
   * Current-state dossier summary. Because this prose is not chapter-stamped,
   * readers below the archive boundary see only stamped bioReveals instead.
   */
  bio: string;
  /** Extra dossier paragraphs gated by reveal chapter. */
  bioReveals?: { revealCh: number; text: string }[];
  /** Two-letter monogram for the portrait placeholder. */
  monogram: string;
  factionIds: Id[];
  /** Prince (prince id) this character serves, if any. */
  servesPrinceId?: Id;
  superiorId?: Id;
  /** First chapter the character appears/matters in this dataset. 0 = pre-arc (anime-safe). */
  introducedCh: number;
  nenType?: NenType;
  /** When the reader learns the character's Nen type. */
  nenTypeRevealCh?: number;
  nenAbilityIds?: Id[];
  statusHistory: {
    ch: number;
    revealCh?: number;
    status: CharacterStatus;
    note?: string;
  }[];
  locationHistory: {
    ch: number;
    revealCh?: number;
    locationId: Id;
    note?: string;
  }[];
  objectives?: Objective[];
  secrets?: Secret[];
  falseBeliefs?: FalseBelief[];
  possessions?: { text: string; revealCh: number }[];
  /** Chapters (within dataset coverage) where this character notably appears. */
  chapterAppearances?: number[];
  tags?: string[];
  /** Marked when the dossier is knowingly partial. */
  incomplete?: boolean;
}

// ---------------------------------------------------------------------------
// Princes
// ---------------------------------------------------------------------------

export type RiskLevel = "low" | "moderate" | "high" | "critical" | "eliminated";

export interface Prince {
  id: Id;
  characterId: Id;
  rank: number; // 1..14
  motherName: string;
  motherCharacterId?: Id;
  queenRank?: number; // 1..8
  siblingNote?: string;
  beastId?: Id;
  personalAbilityId?: Id;
  guardsOriginal: number;
  guardCharacterIds: Id[];
  hunterCharacterIds?: Id[];
  publicStrategy: string;
  hiddenStrategy?: { text: string; revealCh: number };
  currentObjective: { text: string; revealCh: number }[];
  vulnerabilities: { text: string; revealCh: number }[];
  /** Assassination-risk assessment over time; each entry must justify itself. */
  riskHistory: { ch: number; risk: RiskLevel; why: string }[];
  /** Qualitative assessments — always explained, never bare numbers. */
  assessment: {
    political: string;
    military: string;
    nen: string;
    intelligence: string;
  };
  developments: { ch: number; text: string }[];
  mysteryIds?: Id[];
}

// ---------------------------------------------------------------------------
// Factions
// ---------------------------------------------------------------------------

export type FactionKind =
  | "royal"
  | "prince-camp"
  | "military"
  | "mafia"
  | "hunter"
  | "troupe"
  | "bureau"
  | "other";

export interface Faction {
  id: Id;
  name: string;
  kind: FactionKind;
  /** Desaturated hex used across the whole app for this faction. */
  color: string;
  /** Current-state summary; hidden when the archive is rewound. */
  summary: string;
  leaderCharacterId?: Id;
  parentFactionId?: Id;
  objectives: { text: string; revealCh: number }[];
  territoryNote?: string;
  controlledLocationIds?: Id[];
  resources?: string[];
  internalConflicts?: { text: string; revealCh: number }[];
  operations?: { text: string; ch: number }[];
  statusByChapter?: Stamp<string>[];
  introducedCh: number;
  incomplete?: boolean;
}

// ---------------------------------------------------------------------------
// Relationships
// ---------------------------------------------------------------------------

export type RelationshipKind =
  | "family"
  | "friend"
  | "partners"
  | "serves"
  | "commands"
  | "protects"
  | "allied"
  | "secret-alliance"
  | "enemy"
  | "monitoring"
  | "manipulating"
  | "hunting"
  | "targeting"
  | "suspects"
  | "trusts"
  | "distrusts"
  | "killed"
  | "hired"
  | "blackmailing"
  | "negotiating"
  | "mentoring"
  | "teaching-nen"
  | "possessed-by"
  | "controlled-by"
  | "member-of"
  | "former-member-of"
  | "knows-identity-of"
  | "knows-ability-of"
  | "hiding-info-from"
  | "located-with"
  | "romantic";

export interface Relationship {
  id: Id;
  /** Source entity — character id (or faction id for member-of style edges). */
  from: Id;
  to: Id;
  kind: RelationshipKind;
  /** true = from→to only; false = mutual. */
  directed: boolean;
  strength: "strong" | "moderate" | "weak";
  secret: boolean;
  confirmed: boolean; // false = suspected
  /** Chapter the relationship starts existing in-universe. */
  startCh: number;
  /** Chapter the reader learns about it (>= startCh unless retroactive reveal). */
  revealCh: number;
  endCh?: number;
  endNote?: string;
  /** Does the *target* know this relationship exists? e.g. monitoring is usually one-sided. */
  mutualAwareness: boolean;
  description: string;
  history?: { ch: number; text: string }[];
  evidence: Evidence[];
  eventIds?: Id[];
}

// ---------------------------------------------------------------------------
// Events & chapters
// ---------------------------------------------------------------------------

export type EventKind =
  | "battle"
  | "death"
  | "assassination-attempt"
  | "conversation"
  | "nen-reveal"
  | "alliance"
  | "betrayal"
  | "discovery"
  | "investigation"
  | "movement"
  | "ceremony"
  | "decision"
  | "other";

export interface StoryEvent {
  id: Id;
  title: string;
  summary: string;
  chapter: number;
  /** Voyage day aboard the Black Whale, when inferable. */
  day?: number;
  /**
   * For undated flashbacks whose occurrence is canonically earlier than a
   * known chapter-era event. Reveal Order continues to use `chapter`.
   */
  chronologyBeforeChapter?: number;
  /** Tie-breaker for records sharing the same undated chronology anchor. */
  chronologySequence?: number;
  approxTime?: string;
  kind: EventKind;
  locationId?: Id;
  participantIds: Id[];
  witnessIds?: Id[];
  casualtyIds?: Id[];
  storylineIds: Id[];
  consequences?: string[];
  /** Knowledge changes triggered: fact id + who + new state. */
  knowledgeChanges?: { factId: Id; characterId: Id; state: KnowledgeState }[];
  evidence?: Evidence[];
  confidence: Confidence;
}

export interface ChapterInfo {
  number: number;
  title: string;
  /** Voyage day(s) covered, when known. */
  day?: string;
  summary: string;
  eventIds: Id[];
  appearingCharacterIds: Id[];
  locationIds: Id[];
  storylineIds: Id[];
  abilitiesUsedIds?: Id[];
  /** "What changed" diff blocks — each entry is a human sentence. */
  changes: {
    newCharacters?: Id[];
    deaths?: Id[];
    newRelationships?: string[];
    brokenAlliances?: string[];
    movement?: string[];
    newKnowledge?: string[];
    newAbilities?: string[];
    changedObjectives?: string[];
    newThreats?: string[];
    mysteriesIntroduced?: Id[];
    mysteriesAdvanced?: Id[];
    mysteriesResolved?: Id[];
  };
  dialogueRefs?: string[];
}

// ---------------------------------------------------------------------------
// Locations
// ---------------------------------------------------------------------------

export type LocationKind =
  | "tier"
  | "royal-quarters"
  | "public-area"
  | "medical"
  | "restricted"
  | "corridor"
  | "mafia-territory"
  | "bureau"
  | "room"
  | "passage"
  | "other";

export type Canonicity = "canonical" | "approximate" | "inferred" | "unknown";

export interface ShipLocation {
  id: Id;
  name: string;
  kind: LocationKind;
  /** 1 (top, royal) .. 5 (bottom, steerage). undefined for the whole ship. */
  tier?: number;
  parentId?: Id;
  canonicity: Canonicity;
  description: string;
  controlHistory?: Stamp<Id /* faction id */>[];
  threatHistory?: Stamp<"secure" | "tense" | "contested" | "lethal">[];
  connectedIds?: Id[];
  introducedCh: number;
}

// ---------------------------------------------------------------------------
// Nen
// ---------------------------------------------------------------------------

export type AbilityKind =
  | "personal"
  | "guardian-beast"
  | "parasitic"
  | "post-mortem"
  | "curse"
  | "borrowed"
  | "unknown";

export interface NenAbility {
  id: Id;
  name: string;
  userCharacterId?: Id;
  kind: AbilityKind;
  nenType: NenType;
  description: string;
  activation?: string;
  conditions?: string[];
  restrictions?: string[];
  cost?: string;
  range?: string;
  targets?: string;
  effects: string[];
  weaknesses?: string[];
  counters?: string[];
  firstSeenCh: number;
  /** Chapter the reader learns the mechanics (may be later than first sight). */
  revealCh: number;
  uses?: { ch: number; note: string }[];
  status?: "active" | "inactive" | "broken" | "unknown";
  awareCharacterIds?: { characterId: Id; sinceCh: number }[];
  affectedCharacterIds?: Id[];
  mysteryIds?: Id[];
  evidence: Evidence[];
  confidence: Confidence;
}

export interface GuardianBeast {
  id: Id;
  princeId: Id;
  abilityId?: Id;
  appearance: string;
  behaviorNote: string;
  firstSeenCh: number;
  status: "active" | "destroyed" | "transferred" | "unknown";
  statusNote?: string;
  confidence: Confidence;
}

// ---------------------------------------------------------------------------
// Knowledge network
// ---------------------------------------------------------------------------

export type KnowledgeState =
  | "knows"
  | "suspects"
  | "believes-false"
  | "misunderstands"
  | "observed"
  | "was-told"
  | "hiding"
  | "unaware"
  | "reader-only";

export interface KnowledgeFact {
  id: Id;
  label: string;
  description: string;
  /** What kind of fact this is (drives grouping/icons). */
  kind:
    | "nen-ability"
    | "identity"
    | "murder"
    | "alliance"
    | "location"
    | "plan"
    | "beast-effect"
    | "passage"
    | "other";
  /** When the READER learns the fact. Before this the fact is hidden entirely. */
  readerRevealCh: number;
  relatedCharacterIds?: Id[];
  relatedAbilityIds?: Id[];
  relatedEventIds?: Id[];
}

export interface CharacterKnowledge {
  factId: Id;
  characterId: Id;
  state: KnowledgeState;
  /** When this character reached this state. */
  sinceCh: number;
  /** When the reader learns the character reached this state. */
  revealCh?: number;
  note?: string;
}

// ---------------------------------------------------------------------------
// Deaths
// ---------------------------------------------------------------------------

export interface DeathRecord {
  id: Id;
  victimId: Id;
  killerId?: Id;
  suspectedKillerIds?: Id[];
  /** Named killer/cause that is not a registry character (e.g. the contest's
   *  horde of hands). Used when no `killerId` applies but the cause is known. */
  killerName?: string;
  method: string;
  locationId?: Id;
  chapter: number;
  /** Chapter the reader learns of the death (post-hoc reveals). */
  revealCh?: number;
  witnessIds?: Id[];
  awareCharacterIds?: Id[];
  investigation?: string;
  consequences?: string[];
  mysteryIds?: Id[];
  confidence: Confidence;
  factionId?: Id;
  princeContextId?: Id;
}

// ---------------------------------------------------------------------------
// Storylines
// ---------------------------------------------------------------------------

export type StorylineNodeKind =
  | "begin"
  | "advance"
  | "split"
  | "merge"
  | "intersect"
  | "pause"
  | "restart"
  | "climax"
  | "trigger"
  | "end";

export interface Storyline {
  id: Id;
  name: string;
  color: string;
  /** Current-state summary; hidden when the archive is rewound. */
  summary: string;
  status: Stamp<"active" | "paused" | "resolved" | "escalating">[];
  participantIds: Id[];
  factionIds: Id[];
  objectives: string[];
  openQuestions: string[];
  dependsOnIds?: Id[];
  relatedIds?: Id[];
  nodes: {
    ch: number;
    kind: StorylineNodeKind;
    title: string;
    eventIds?: Id[];
    /** Other storyline this node links to (for merge/intersect/trigger). */
    linkId?: Id;
  }[];
  introducedCh: number;
}

// ---------------------------------------------------------------------------
// Mysteries & theories
// ---------------------------------------------------------------------------

export type MysteryStatus =
  | "open"
  | "partially-answered"
  | "likely-answered"
  | "resolved"
  | "disproven"
  | "dormant";

export interface Mystery {
  id: Id;
  question: string;
  summary: string;
  introducedCh: number;
  statusHistory: Stamp<MysteryStatus>[];
  relatedCharacterIds?: Id[];
  relatedEventIds?: Id[];
  evidenceFor: Evidence[];
  evidenceAgainst?: Evidence[];
  possibleExplanations: { text: string; confidence: Confidence }[];
  latestDevelopment?: { ch: number; text: string };
  /** If resolved: the canonical answer, gated on its reveal chapter. */
  resolution?: { ch: number; text: string };
}

export type TheoryStatus =
  | "unresolved"
  | "strengthened"
  | "weakened"
  | "confirmed"
  | "disproven";

export interface Theory {
  id: Id;
  claim: string;
  summary: string;
  statusHistory: Stamp<TheoryStatus>[];
  supporting: Evidence[];
  contradicting: Evidence[];
  relatedCharacterIds?: Id[];
  relatedEventIds?: Id[];
  chapters: number[];
  confidence: Confidence;
  lastUpdatedCh: number;
}

// ---------------------------------------------------------------------------
// Glossary
// ---------------------------------------------------------------------------

export interface GlossaryTerm {
  id: Id;
  term: string;
  definition: string;
  category: "nen" | "kakin" | "ship" | "mafia" | "hunter" | "arc";
  relatedIds?: Id[];
  introducedCh: number;
}
