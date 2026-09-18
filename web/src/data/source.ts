/**
 * The primary academic source of this product.
 *
 * MIGRATED 2026-09-17: the academic base source moved from the earlier assigned
 * excerpt `C2-02.pdf` (an excerpt of a later textbook edition, carrying Studocu
 * provenance marks) to `Giáo trình Tư tưởng Hồ Chí Minh - 2019.pdf`.
 * See SOURCE_MIGRATION_2019_REPORT.md for the full migration record.
 *
 * Three things are kept apart on purpose, because the course documents require a
 * printed locator while an auditor still needs to find the page in the supplied file:
 *
 *   - the source FILE            -> `SOURCE.file`
 *   - the PDF page in that file  -> `pdfPageOf(ref)`, internal audit use only
 *   - the PRINTED textbook page  -> `ref.page`, the ONLY page shown as a public locator
 *
 * The public citation never shows a PDF page and never names the old excerpt.
 */

import type { SourceRef } from './types';

/**
 * Identity of the base source.
 *
 * The supplied file is an image-only scan produced by `PDF-XChange Lite 11.0.1`.
 * Its provenance was open until the group compared it, page for page, against
 * the official printed edition; `provenanceCheck` below records that check in
 * full, and Folder 08 carries the same record.
 *
 * What the check covers is THIS FILE against THAT EDITION. It says nothing about
 * the ten footnotes printed inside the excerpt: those cite other books entirely
 * (Hồ Chí Minh Toàn tập, Văn kiện Đảng, two biographies) and are checked one by
 * one in `locators.ts`, where each still carries its own status.
 */
export const SOURCE = {
  id: 'GT-HCM-2019',
  /** The exact public citation label. Never abbreviated in an actual citation. */
  name: 'Giáo trình Tư tưởng Hồ Chí Minh - 2019',
  file: 'Giáo trình Tư tưởng Hồ Chí Minh - 2019.pdf',
  sha256: 'a520532c4f5034aa7bdf69e7e63459a748c5899bd7e525ea313bec3ad70f720a',
  /** Printed textbook pages contained in the supplied excerpt. */
  firstPage: 28,
  lastPage: 35,
  pdfPages: 8,
  /*
   * `VERIFIED IN FILE` is the controlled label from AGENTS.md section 3, and it
   * deliberately UNDERSTATES what was done: that label only promises wording was
   * found in a supplied PDF, while the check below went further and compared the
   * file against the printed edition. The vocabulary has no stronger term, so
   * the cautious one is used and the full claim lives in `provenanceCheck`.
   */
  provenance: 'VERIFIED IN FILE',
  /**
   * The edition compared against, the pages compared, and the result - in the
   * words of the person who did it. This is the group's own attestation, and it
   * is written out in full so that anyone can repeat exactly the same check.
   */
  provenanceCheck:
    'Đối chiếu với: Bộ Giáo dục và Đào tạo, Giáo trình Tư tưởng Hồ Chí Minh (Dành cho bậc đại học – không chuyên ngành lý luận chính trị), Hà Nội, 2019. Phạm vi đối chiếu: tr.28-35, đúng bằng phạm vi trích đoạn được giao. Kết quả: khớp hoàn toàn. Người đối chiếu: nhóm 02. Ngày: 19-9-2026.',
} as const;

/**
 * The excerpt's PDF page for a printed page.
 *
 * The offset is EVIDENCED, not assumed: the printed number was read at the foot of
 * every one of the eight pages (PDF 1 = tr.28 ... PDF 8 = tr.35). It is used only
 * for internal audit strings, never for a public locator.
 */
export function pdfPageOf(page: number): number {
  return page - (SOURCE.firstPage - 1);
}

/** Build a reference to one printed page, or to the smallest accurate page range. */
export function ref(page: number, pageEnd?: number): SourceRef {
  return pageEnd !== undefined && pageEnd !== page ? { page, pageEnd } : { page };
}

/** Build a reference to a numbered footnote printed on a page. */
export function noteRef(page: number, note: number, series?: string): SourceRef {
  return series !== undefined ? { page, note, series } : { page, note };
}

function pages(r: SourceRef): string {
  return r.pageEnd !== undefined && r.pageEnd !== r.page
    ? `tr. ${String(r.page)}–${String(r.pageEnd)}`
    : `tr. ${String(r.page)}`;
}

/**
 * Compact public locator, e.g. `tr. 29` or `tr. 29–31`.
 *
 * Used for the many inline evidence chips, where repeating the full source label
 * on every claim would crowd the reading surface. Every chip opens the evidence
 * magnifier, which always shows the full citation from `citeSource` alongside it,
 * so the exact label is never more than one interaction away.
 */
export function locatorText(r: SourceRef): string {
  const base = pages(r);
  return r.note !== undefined ? `${base}, chú thích ${String(r.note)}` : base;
}

/**
 * The full public citation, e.g.
 * `Giáo trình Tư tưởng Hồ Chí Minh - 2019, tr. 29`.
 *
 * This is the form used wherever the product actually CITES the textbook: the
 * source drawer, the verification tables, quotation footers and each stage's
 * source line.
 */
export function citeSource(r: SourceRef): string {
  return `${SOURCE.name}, ${locatorText(r)}`;
}

/**
 * The internal audit string, which additionally exposes the PDF page so an auditor
 * can open the supplied file at the right sheet. Shown only in the magnifier's
 * "nguyên dạng lưu trữ" row and in the verification view, never as the citation.
 */
export function auditRef(r: SourceRef): string {
  const pdfStart = pdfPageOf(r.page);
  const pdfEnd = r.pageEnd !== undefined ? pdfPageOf(r.pageEnd) : undefined;
  const pdf =
    pdfEnd !== undefined && pdfEnd !== pdfStart
      ? `PDF tr. ${String(pdfStart)}–${String(pdfEnd)}`
      : `PDF tr. ${String(pdfStart)}`;
  return `${SOURCE.name} · ${locatorText(r)} · ${pdf}`;
}

/** True when the reference lies inside the supplied excerpt. */
export function isInExcerpt(r: SourceRef): boolean {
  const end = r.pageEnd ?? r.page;
  return (
    r.page >= SOURCE.firstPage &&
    end <= SOURCE.lastPage &&
    end >= r.page &&
    Number.isInteger(r.page) &&
    Number.isInteger(end)
  );
}
