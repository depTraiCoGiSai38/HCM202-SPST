/**
 * Data model for the HCM202 study apparatus.
 *
 * Provenance labels follow HCM202_PROJECT_CONTEXT_v3.0_FORENSIC_FINAL.md section 1.
 * They are operational project labels, not terms quoted from the three PDFs.
 */

export type Provenance =
  | 'SOURCE CONTENT'
  | 'PROJECT DECISION'
  | 'PROJECT INPUT'
  | 'NEED VERIFICATION'
  | 'NOT YET EVIDENCED'
  | 'DOCUMENT VARIANCE'
  | 'DOCUMENT CONFLICT';

/** A printed footnote candidate in C2. Never promoted to a verified locator here. */
export interface LocatorCandidate {
  id: string;
  /** Verbatim text of the printed note, reproduced without expansion. */
  printed: string;
  /** Where the note appears, using the context file's locator convention. */
  at: string;
  /** What the note sits next to. A nearby note never authenticates a whole paragraph. */
  attachedTo: string;
  status: Provenance;
  /** Extra caution, e.g. unresolved `Sdd`. */
  caution?: string;
}

/** A verbatim quotation printed inside the C2 excerpt. */
export interface Quotation {
  id: string;
  text: string;
  /** Who/what C2 attributes the words to, as C2 frames it. */
  attribution: string;
  locatorIds: string[];
  at: string;
  caution?: string;
}

/** One paragraph-level statement, faithfully paraphrased or quoted from C2. */
export interface Passage {
  id: string;
  /** Faithful paraphrase in Vietnamese, or a marked quotation. */
  text: string;
  at: string;
  /** Marks evaluative / causal language that C2 asserts but does not evidence. */
  evaluative?: boolean;
  caution?: string;
}

/** A moment the excerpt itself presents as a change in direction. */
export interface TurningPoint {
  id: string;
  /** Exact time marker as printed in C2. Never upgraded to a finer precision. */
  marker: string;
  title: string;
  /** What the excerpt shows as the position before this moment. */
  before: string;
  /** What the excerpt shows as the position after it. */
  after: string;
  /**
   * Group-authored synthesis naming the shift, grounded in before/after and
   * passageIds; treated as PROJECT DECISION unless independently verified.
   */
  shift: string;
  passageIds: string[];
  quotationIds: string[];
  caution?: string;
}

/** A link the excerpt itself draws between lived practice and a recognition. */
export interface ExperienceLink {
  id: string;
  stageId: StageId;
  /** The practical activity / experience, as C2 states it. */
  experience: string;
  /** The recognition or development C2 attaches to it. */
  recognition: string;
  at: string;
  caution?: string;
}

export type StageId = 'ky-1' | 'ky-2' | 'ky-3' | 'ky-4' | 'ky-5';

export interface Stage {
  id: StageId;
  /** 1..5, the number printed in C2. */
  ordinal: number;
  /**
   * The exact Vietnamese heading. Never replaced by an English alias or a short label.
   * Source: HCM202_PROJECT_CONTEXT_v3.0_FORENSIC_FINAL.md section 8.2.
   */
  heading: string;
  /** The period part of the heading, before the colon. */
  headingPeriod: string;
  /** The characterisation part of the heading, after the colon. */
  headingClaim: string;
  /** Internal navigation aid only. Never used in academic content. */
  shortLabel: string;
  at: string;
  /** Fractional positions 0..1 used only to draw the rail, including overlaps. */
  railStart: number;
  railEnd: number;
  /** Opening framing sentence of the section, faithfully rendered. */
  opening: string;
  context: Passage[];
  development: Passage[];
  turningPoints: TurningPoint[];
  /** Ids of quotations printed under this stage. */
  quotations: string[];
  locatorIds: string[];
  /** Time markers printed under this stage, at the printed precision only. */
  markers: string[];
  /** Chronology / text risks registered against this stage. */
  riskIds: string[];
  /** Things the excerpt does NOT say, which must not be filled in. */
  boundaries: string[];
}

export interface RiskNote {
  id: string;
  title: string;
  issue: string;
  handling: string;
  status: Provenance;
}

export interface CompareAxis {
  id: string;
  question: string;
  /** One answer per stage, drawn only from that stage's printed content. */
  answers: Record<StageId, { text: string; at: string; caution?: string }>;
}

export interface PresentationBeat {
  id: string;
  /** Minute budget for this beat inside the 10-12 minute Showcase slot. */
  minutes: number;
  kicker: string;
  title: string;
  /** Speaker-facing bullets. These are presenter notes, not academic claims. */
  notes: string[];
  /** Optional route the demo should be on for this beat. */
  route?: string;
  /** Optional verbatim material to show. */
  quotationId?: string;
}
