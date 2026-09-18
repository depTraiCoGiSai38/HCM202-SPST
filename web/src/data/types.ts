/**
 * Data model for the HCM202 study apparatus.
 *
 * Provenance labels follow HCM202_PROJECT_CONTEXT_v3.0_FORENSIC_FINAL.md section 1.
 * They are operational project labels, not terms quoted from the three PDFs.
 */

export type Provenance =
  | 'SOURCE REQUIREMENT'
  | 'SOURCE CONTENT'
  | 'PROJECT DECISION'
  | 'PROJECT INPUT'
  | 'VERIFIED IN FILE'
  | 'NEED VERIFICATION'
  | 'NOT YET EVIDENCED'
  | 'DOCUMENT VARIANCE'
  | 'DOCUMENT CONFLICT'
  | 'REJECTED';

/**
 * A location in the primary textbook source.
 *
 * `page` is the PRINTED textbook page and is the only page ever shown as a public
 * locator. The PDF page of the supplied scan is derived from it by `pdfPageOf` in
 * `./source` and is used for internal audit strings only. Keeping the printed page
 * as the stored value, rather than the PDF page, means the public citation can
 * never accidentally be built from a file-relative number.
 */
export interface SourceRef {
  /** Printed textbook page. */
  page: number;
  /** Last printed page when the claim spans pages. Use the smallest accurate range. */
  pageEnd?: number;
  /** Printed footnote number on that page, when the reference is to a note. */
  note?: number;
  /**
   * Which run of notes the number belongs to, for a page that restarts its
   * footnote numbering. The 2019 source does this on tr.31.
   */
  series?: string;
}

/**
 * A printed footnote candidate in the source excerpt.
 * Never promoted to a verified locator here.
 */
export interface LocatorCandidate {
  id: string;
  /** Verbatim text of the printed note, reproduced without expansion. */
  printed: string;
  /** Where the note appears in the primary source. */
  at: SourceRef;
  /** What the note sits next to. A nearby note never authenticates a whole paragraph. */
  attachedTo: string;
  status: Provenance;
  /** Extra caution, e.g. unresolved `Sdd`. */
  caution?: string;
}

/** A verbatim quotation printed inside the source excerpt. */
export interface Quotation {
  id: string;
  text: string;
  /** Who/what the textbook attributes the words to, as it frames it. */
  attribution: string;
  locatorIds: string[];
  at: SourceRef;
  caution?: string;
}

/** One paragraph-level statement, faithfully paraphrased or quoted from the source. */
export interface Passage {
  id: string;
  /** Faithful paraphrase in Vietnamese, or a marked quotation. */
  text: string;
  at: SourceRef;
  /** Marks evaluative / causal language the textbook asserts but does not evidence. */
  evaluative?: boolean;
  caution?: string;
}

/** A moment the excerpt itself presents as a change in direction. */
export interface TurningPoint {
  id: string;
  /** Exact time marker as printed in the source. Never upgraded to a finer precision. */
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
  /** The practical activity / experience, as the source states it. */
  experience: string;
  /** The recognition or development the source attaches to it. */
  recognition: string;
  at: SourceRef;
  caution?: string;
}

export type StageId = 'ky-1' | 'ky-2' | 'ky-3' | 'ky-4' | 'ky-5';

export interface Stage {
  id: StageId;
  /** 1..5, the number printed in the source. */
  ordinal: number;
  /**
   * The exact Vietnamese heading as printed in `Giáo trình Tư tưởng Hồ Chí Minh - 2019`.
   * Never replaced by an English alias or a short label.
   */
  heading: string;
  /** The period part of the heading, before the colon. */
  headingPeriod: string;
  /** The characterisation part of the heading, after the colon. */
  headingClaim: string;
  /** Internal navigation aid only. Never used in academic content. */
  shortLabel: string;
  at: SourceRef;
  /**
   * Fractional positions 0..1 along the journey line.
   *
   * They draw the thread, the overview diagram and the comparison diagram. The
   * `rail` in the name is historical - the sidebar these were first written for
   * no longer exists.
   *
   * MIGRATED 2026-09-17: these ranges used to OVERLAP, because the previous base
   * excerpt printed vague, shared stage boundaries (`cuối năm 1920` on both sides
   * of a joint, and so on). The 2019 edition prints exact consecutive dates
   * instead - 30-12-1920 then 31-12-1920 - so the ranges are now contiguous and
   * disjoint. The overlap was evidence-driven and so is its removal.
   */
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
  answers: Record<StageId, { text: string; at: SourceRef; caution?: string }>;
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
