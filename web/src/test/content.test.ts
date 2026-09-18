import { describe, expect, it } from 'vitest';

import { BOUNDARIES, EPILOGUE, EXCERPT_BOUNDARY, STAGES, ALL_QUOTATIONS } from '../data/stages';
import {
  ACTIVITY_BRIEFS,
  AFTER_STAGES,
  CENTRAL_QUESTION,
  STAGE_ENTRY,
  STAGE_ENTRY_STATUS,
} from '../data/project';
import { parse } from '../lib/router';
import { quizFor } from '../components/predict';
import {
  FIGURES,
  figureFilledCount,
  figureStatus,
  slotStatus,
  FIGURE_REQUIREMENTS,
  FIGURE_SLOTS,
  SOURCING_CHECKS,
} from '../data/figures';
import { splitForReading } from '../components/stagePage';
import { figureSlot, hasFigure, sourceItems } from '../components/figure';
import {
  LOCATORS,
  PRINTED_FORM_NOTES,
  RISKS,
  SUPERSEDED_RISKS,
  UNNOTED_MARKERS,
} from '../data/locators';
import { SOURCE, citeSource, isInExcerpt, pdfPageOf } from '../data/source';
import { COMPARE_AXES, EXPERIENCE_LINKS, PRESENTATION_BEATS, PRESENTATION_BUDGET_MAX, PRESENTATION_BUDGET_MIN } from '../data/interactions';

/**
 * These tests guard the academic invariants, not the visual design.
 *
 * They exist so that a later edit cannot quietly drop a heading, promote an
 * unverified locator, expand "Sdd", or let the presentation script drift
 * outside the Showcase slot.
 */

/**
 * The five exact headings as printed in `Giáo trình Tư tưởng Hồ Chí Minh - 2019`,
 * tr.28, 29, 31 and 33, read from the page scans at magnification.
 *
 * Two of these differ from the edition the product previously used, in ways that
 * are easy to reintroduce by accident, so they are pinned here character for
 * character: stage 2 opens on 6-6-1911 (not 5-6-1911, which belongs to stage 1),
 * and stage 5 does NOT contain the word `hoàn thiện`.
 */
const EXACT_HEADINGS = [
  'Thời kỳ từ ngày 5-6-1911 trở về trước: Hình thành tư tưởng yêu nước và chí hướng tìm con đường cứu nước mới',
  'Thời kỳ từ ngày 6-6-1911 đến ngày 30-12-1920: Hình thành tư tưởng cứu nước, giải phóng dân tộc Việt Nam theo con đường cách mạng vô sản',
  'Thời kỳ từ ngày 31-12-1920 đến ngày 3-2-1930: Hình thành những nội dung cơ bản tư tưởng về cách mạng Việt Nam',
  'Thời kỳ từ ngày 4-2-1930 đến ngày 28-1-1941: Vượt qua thử thách, giữ vững đường lối, phương pháp cách mạng Việt Nam đúng đắn, sáng tạo',
  'Thời kỳ từ ngày 29-1-1941 đến ngày 2-9-1969: Tư tưởng Hồ Chí Minh tiếp tục phát triển, soi đường cho sự nghiệp cách mạng của Đảng và nhân dân ta',
];

describe('the five exact period headings', () => {
  it('there are exactly five stages, numbered 1 to 5', () => {
    expect(STAGES).toHaveLength(5);
    expect(STAGES.map((s) => s.ordinal)).toEqual([1, 2, 3, 4, 5]);
  });

  it('each heading matches the exact Vietnamese wording, character for character', () => {
    expect(STAGES.map((s) => s.heading)).toEqual(EXACT_HEADINGS);
  });

  it('period and claim parts recompose into the full heading', () => {
    for (const s of STAGES) {
      expect(`${s.headingPeriod}: ${s.headingClaim}`).toBe(s.heading);
    }
  });

  it('short labels are never used as the heading text', () => {
    for (const s of STAGES) {
      expect(s.heading).not.toBe(s.shortLabel);
      expect(s.heading.length).toBeGreaterThan(s.shortLabel.length);
    }
  });

  it('no English stage alias leaks into academic content', () => {
    const aliases = ['Roots', 'Search', 'Formation', 'Test', 'Realization'];
    const blob = JSON.stringify(STAGES);
    for (const alias of aliases) {
      expect(blob).not.toContain(alias);
    }
  });
});

describe('locator candidates', () => {
  it('records exactly the ten printed notes', () => {
    expect(LOCATORS).toHaveLength(10);
  });

  it('never marks a locator as verified', () => {
    for (const l of LOCATORS) {
      expect(l.status).toBe('NEED VERIFICATION');
    }
  });

  /**
   * The count the Verify screen publishes, against the data it is drawn from.
   *
   * The register was once found publishing `0` here. The
   * summary filtered on the normalised spelling `Sđd`, which AGENTS.md forbids
   * the product from writing, so it matched none of the three printed `Sdd`
   * notes. The test below had asserted the 3 in the data the whole time;
   * nothing compared the data with what the screen said about it.
   */
  it('publishes the same abbreviation count the locator data holds', () => {
    const printedForm = LOCATORS.filter((l) => l.printed.includes('Sdd'));
    expect(printedForm).toHaveLength(3);
    // The normalised spelling must never be what the product counts or prints.
    expect(LOCATORS.filter((l) => l.printed.includes('Sđd'))).toHaveLength(0);
  });

  it('never expands the unresolved abbreviation, and keeps it as printed', () => {
    // The 2019 edition prints it as "Sdd", without the bar on the d.
    const sdd = LOCATORS.filter((l) => l.printed.includes('Sdd'));
    expect(sdd).toHaveLength(3);
    for (const l of sdd) {
      expect(l.caution).toBeDefined();
      expect(l.caution).toContain('Sdd');
      // Never silently normalised to the expected spelling, never expanded.
      expect(l.printed).not.toContain('Sách đã dẫn');
    }
  });

  it('records that the 2019 edition resolves the old page ambiguity in note L8', () => {
    const l8 = LOCATORS.find((l) => l.id === 'L8');
    // The retired excerpt printed an ambiguous "tr.l13"; the 2019 page prints "tr.113".
    expect(l8?.printed).toContain('tr.113');
    expect(l8?.printed).not.toContain('tr.l13');
    // The change is explained rather than applied silently.
    expect(l8?.caution).toContain('tr.l13');
  });

  it('keeps the restarted footnote numbering on tr.31 as printed', () => {
    const l5 = LOCATORS.find((l) => l.id === 'L5');
    expect(l5?.at.page).toBe(31);
    expect(l5?.at.note).toBe(1);
    expect(l5?.at.series).toBeDefined();
    // L3 is also note 1 on the same page. That is what the page prints.
    const l3 = LOCATORS.find((l) => l.id === 'L3');
    expect(l3?.at.page).toBe(31);
    expect(l3?.at.note).toBe(1);
  });

  it('every locator referenced by a stage or quotation exists', () => {
    const known = new Set(LOCATORS.map((l) => l.id));
    for (const s of STAGES) {
      for (const id of s.locatorIds) expect(known.has(id)).toBe(true);
    }
    for (const q of ALL_QUOTATIONS) {
      for (const id of q.locatorIds) expect(known.has(id)).toBe(true);
    }
  });

  it('lists the in-body publication markers that carry no numbered note', () => {
    expect(UNNOTED_MARKERS).toHaveLength(5);
  });
});

describe('chronology and text risks', () => {
  it('carries the eight risks registered against the 2019 edition', () => {
    expect(RISKS.map((r) => r.id)).toEqual([
      'GT-R01',
      'GT-R02',
      'GT-R03',
      'GT-R04',
      'GT-R05',
      'GT-R06',
      'GT-R07',
      'GT-R08',
    ]);
  });

  it('keeps the 6-6-1938 / Second World War sentence as a document conflict', () => {
    const r = RISKS.find((r) => r.id === 'GT-R02');
    expect(r?.status).toBe('DOCUMENT CONFLICT');
    expect(r?.issue).toContain('6-6-1938');
  });

  it('accounts for every risk the retired excerpt carried', () => {
    // Nothing may be dropped silently by the migration: each former risk is
    // either resolved by the 2019 edition or carried over to a current entry.
    expect(SUPERSEDED_RISKS).toHaveLength(9);
    const current = new Set(RISKS.map((r) => r.id));
    for (const sr of SUPERSEDED_RISKS) {
      expect(sr.formerId).toMatch(/^C2-R0[1-9]$/);
      if (sr.resolution === 'RESOLVED') {
        expect(sr.nowId).toBeUndefined();
      } else {
        expect(sr.nowId, `${sr.formerId} must point at a live risk`).toBeDefined();
        expect(current.has(sr.nowId as string)).toBe(true);
      }
    }
  });

  it('every risk referenced by a stage exists in the register', () => {
    const known = new Set(RISKS.map((r) => r.id));
    for (const s of STAGES) {
      for (const id of s.riskIds) expect(known.has(id)).toBe(true);
    }
  });

  it('keeps the periodisation tension inside stage 4, where the source prints it', () => {
    // The stage 4 heading stops at 28-1-1941 while its body narrates May 1941.
    const s4 = STAGES.find((s) => s.id === 'ky-4');
    expect(s4?.riskIds).toContain('GT-R03');
    expect(s4?.headingPeriod).toContain('28-1-1941');
    expect(JSON.stringify(s4?.development)).toContain('5-1941');
  });

  it('keeps the article-dating tension inside stage 3', () => {
    const s3 = STAGES.find((s) => s.id === 'ky-3');
    expect(s3?.riskIds).toContain('GT-R01');
    expect(s3?.markers).toContain('8-1919');
    expect(s3?.markers).toContain('4-11-1920');
  });
});

describe('journey geometry encodes the printed boundaries', () => {
  it('draws every joint as a clean cut, because the 2019 edition dates them exactly', () => {
    // The retired excerpt shared vague boundaries between consecutive headings,
    // so these ranges used to overlap. The 2019 edition prints consecutive days
    // on either side of every joint, so they must now meet exactly.
    for (let i = 0; i < STAGES.length - 1; i++) {
      const a = STAGES[i];
      const b = STAGES[i + 1];
      if (!a || !b) throw new Error('missing stage');
      expect(b.railStart, `stage ${String(i + 2)} must start where stage ${String(i + 1)} ends`).toBe(
        a.railEnd,
      );
    }
    expect(STAGES[0]?.railStart).toBe(0);
    expect(STAGES[STAGES.length - 1]?.railEnd).toBe(1);
  });

  it('names both dates on every joint and registers no boundary risk', () => {
    for (const b of BOUNDARIES) {
      expect(b.kind).toBe('exact');
      expect(b.riskId).toBeNull();
      // Two printed dates, separated by the joint marker.
      expect(b.label).toMatch(/^\d{1,2}-\d{1,2}-\d{4} › \d{1,2}-\d{1,2}-\d{4}$/);
    }
  });

  it('has one boundary marker between each adjacent pair of stages', () => {
    expect(BOUNDARIES).toHaveLength(4);
    for (let i = 0; i < BOUNDARIES.length; i++) {
      const b = BOUNDARIES[i];
      const a = STAGES[i];
      const next = STAGES[i + 1];
      expect(b?.between[0]).toBe(a?.id);
      expect(b?.between[1]).toBe(next?.id);
    }
  });
});

describe('excerpt boundary and epilogue', () => {
  it('keeps the post-1969 material outside stage 5', () => {
    const s5 = STAGES.find((s) => s.id === 'ky-5');
    const blob = JSON.stringify([s5?.context, s5?.development]);
    expect(blob).not.toContain('1975');
    expect(EPILOGUE.passages.join(' ')).toContain('1975');
    expect(EPILOGUE.status).toBe('NEED VERIFICATION');
  });

  it('records where the 2019 excerpt stops, including the section III material', () => {
    expect(EXCERPT_BOUNDARY.headings).toContain('III. GIÁ TRỊ TƯ TƯỞNG HỒ CHÍ MINH');
    expect(EXCERPT_BOUNDARY.headings).toContain('1. Đối với cách mạng Việt Nam');
    // Unlike the retired excerpt, the 2019 pages run on into the body of III.1.a.
    // That body is outside the assigned content and must be declared as such.
    expect(EXCERPT_BOUNDARY.headings).toHaveLength(3);
    expect(EXCERPT_BOUNDARY.note).toContain('ngoài nội dung được giao');
  });
});

describe('time markers keep the printed precision', () => {
  it('never upgrades a month-only or year-only marker to an exact date', () => {
    // A marker written as a bare year or month-year must not gain a day part.
    const monthOnly = /^\d{1,2}-\d{4}$/;
    const yearOnly = /^\d{4}$/;
    for (const s of STAGES) {
      for (const m of s.markers) {
        if (monthOnly.test(m) || yearOnly.test(m)) {
          expect(m).not.toMatch(/^\d{1,2}-\d{1,2}-\d{4}$/);
        }
      }
    }
  });

  it('keeps the stage 1 departure marker at exactly 5-6-1911', () => {
    const s1 = STAGES.find((s) => s.id === 'ky-1');
    expect(s1?.markers).toContain('5-6-1911');
    expect(s1?.markers).toContain('từ ngày 5-6-1911 trở về trước');
  });
});

describe('cross-stage comparison', () => {
  it('answers every axis for all five stages', () => {
    for (const axis of COMPARE_AXES) {
      for (const stage of STAGES) {
        const answer = axis.answers[stage.id];
        expect(answer, `${axis.id} is missing ${stage.id}`).toBeDefined();
        expect(answer.text.length).toBeGreaterThan(0);
        expect(isInExcerpt(answer.at)).toBe(true);
      }
    }
  });

  it('says so explicitly where the excerpt is silent, instead of filling in', () => {
    const silent = COMPARE_AXES.flatMap((a) =>
      Object.values(a.answers).filter((v) => v.caution?.includes('Không suy luận')),
    );
    expect(silent.length).toBeGreaterThan(0);
  });
});

describe('experience links', () => {
  it('every pair carries a location in the excerpt', () => {
    for (const l of EXPERIENCE_LINKS) {
      expect(isInExcerpt(l.at)).toBe(true);
      expect(l.experience.length).toBeGreaterThan(0);
      expect(l.recognition.length).toBeGreaterThan(0);
    }
  });

  it('every pair belongs to a real stage', () => {
    const ids = new Set(STAGES.map((s) => s.id));
    for (const l of EXPERIENCE_LINKS) expect(ids.has(l.stageId)).toBe(true);
  });

  it('pair ids are unique', () => {
    const ids = EXPERIENCE_LINKS.map((l) => l.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('presentation script', () => {
  it('fits inside the 10 to 12 minute Showcase slot', () => {
    const total = PRESENTATION_BEATS.reduce((n, b) => n + b.minutes, 0);
    expect(total).toBeGreaterThanOrEqual(PRESENTATION_BUDGET_MIN);
    expect(total).toBeLessThanOrEqual(PRESENTATION_BUDGET_MAX);
  });

  it('every beat has speaker notes', () => {
    for (const b of PRESENTATION_BEATS) {
      expect(b.notes.length).toBeGreaterThan(0);
      expect(b.minutes).toBeGreaterThan(0);
    }
  });

  it('every routed beat points at a route the product actually has', () => {
    const routes = new Set([
      '#/',
      '#/hanh-trinh',
      '#/doi-sanh',
      '#/noi-ket',
      '#/tong-hop',
      '#/kiem-chung',
      ...STAGES.map((s) => `#/chang/${s.id}`),
    ]);
    for (const b of PRESENTATION_BEATS) {
      if (b.route) expect(routes.has(b.route), `${b.id} -> ${b.route}`).toBe(true);
    }
  });
});

describe('printed-form register', () => {
  it('records both forms and never presents the normalised one as the source', () => {
    for (const n of PRINTED_FORM_NOTES) {
      expect(n.printed).not.toEqual(n.used);
      expect(isInExcerpt(n.at)).toBe(true);
      expect(n.where.length).toBeGreaterThan(0);
    }
  });

  it('carries only forms actually printed in the 2019 pages', () => {
    const registered = PRINTED_FORM_NOTES.filter((n) => n.registered).map((n) => n.printed);
    expect(registered).toContain('trở thành thành yếu tố chỉ đạo');
    expect(registered).toContain('chống thực dân pháp');
    expect(registered).toContain('thày giáo');

    // These four belonged to the retired excerpt and the 2019 pages print them
    // correctly, so carrying them over would assert a defect that is not there.
    expect(registered).not.toContain('bước ngoạt');
    expect(registered).not.toContain('Hòa hình lập lại');
    expect(registered).not.toContain('quân đội viễn Chính Mỹ');
    expect(registered).not.toContain('Cương lĩhh chính trị đầu tiên');
  });

  it('ids are unique', () => {
    const ids = PRINTED_FORM_NOTES.map((n) => n.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every passage that normalises a printed form carries a caution', () => {
    // P1-6 renders the 2019 spelling "thày giáo" as "thầy giáo"; it must say so
    // rather than absorb the difference.
    const s1 = STAGES.find((s) => s.id === 'ky-1');
    const p16 = s1?.context.find((p) => p.id === 'P1-6');
    expect(p16?.caution).toBeDefined();
    expect(p16?.caution).toContain('thày giáo');

    // Every registered printed form must be reachable from some passage caution
    // or from the register itself, so none of them is normalised in silence.
    const cautions = JSON.stringify(
      STAGES.flatMap((st) => [...st.context, ...st.development].map((x) => x.caution ?? '')),
    );
    for (const n of PRINTED_FORM_NOTES) {
      expect(cautions.includes(n.printed), `${n.id} (${n.printed}) is normalised silently`).toBe(
        true,
      );
    }
  });
});

describe('no fabricated evidence', () => {
  it('contains no invented survey, participant or feedback data', () => {
    const blob = JSON.stringify([STAGES, COMPARE_AXES, EXPERIENCE_LINKS, PRESENTATION_BEATS]);
    for (const banned of ['% người dùng', 'số người tham gia', 'khảo sát cho thấy', 'N =']) {
      expect(blob).not.toContain(banned);
    }
  });

  it('flags evaluative claims rather than restating them as established fact', () => {
    const evaluative = STAGES.flatMap((s) =>
      [...s.context, ...s.development].filter((p) => p.evaluative),
    );
    expect(evaluative.length).toBeGreaterThanOrEqual(8);
  });
});

describe('the Central Question is presented whole', () => {
  /**
   * The opening scene sets the question in two movements, splitting it at the
   * hinge below so the viewer can see what the process is NOT and what it IS.
   * The split is presentational only: if this marker ever stops matching
   * exactly once, the opening would silently stop splitting - or, worse, split
   * somewhere that changes the sense - so it is pinned here.
   */
  const HINGE = 'mà được hình thành';

  it('contains the hinge the opening splits on, exactly once', () => {
    expect(CENTRAL_QUESTION.split(HINGE)).toHaveLength(2);
  });

  it('splitting at the hinge loses nothing', () => {
    const at = CENTRAL_QUESTION.indexOf(HINGE);
    expect(CENTRAL_QUESTION.slice(0, at) + CENTRAL_QUESTION.slice(at)).toBe(CENTRAL_QUESTION);
  });

  it('is still one question, not a statement', () => {
    expect(CENTRAL_QUESTION.trim().endsWith('?')).toBe(true);
  });
});

describe('the question that opens each stage', () => {
  /**
   * The entry question is the group's own sentence standing in front of source
   * material. The one property that keeps it safe is that it asks rather than
   * asserts, so that property is pinned here rather than left to review.
   */
  it('exists for all five stages and for no other key', () => {
    expect(Object.keys(STAGE_ENTRY).sort()).toEqual(STAGES.map((s) => s.id).sort());
  });

  it('is always a question, never a statement', () => {
    for (const s of STAGES) {
      const entry = STAGE_ENTRY[s.id];
      expect(entry.question.trim().endsWith('?'), s.id).toBe(true);
    }
  });

  it('records what in the stage each question is built from', () => {
    for (const s of STAGES) {
      expect(STAGE_ENTRY[s.id].basis.length).toBeGreaterThan(40);
    }
  });

  it('is declared a project formulation, not source wording', () => {
    expect(STAGE_ENTRY_STATUS).toBe('PROJECT DECISION');
  });

  it('never carries an invented locator or a verification claim', () => {
    const blob = JSON.stringify(STAGE_ENTRY);
    for (const banned of ['tr.', 'Sđd', 'VERIFIED', 'đã kiểm chứng']) {
      expect(blob).not.toContain(banned);
    }
  });
});

describe('documentary photographs', () => {
  /**
   * Eight of the thirteen declared positions hold a record and five are still
   * blocked. These tests keep both halves honest: a record may not appear
   * without every provenance field filled, and the reasons the remaining slots
   * are blocked must stay published rather than quietly disappearing when
   * someone tidies up.
   */
  it('publishes a primary position for the opening and for every stage, plus one to three supporting positions per stage', () => {
    expect(FIGURE_SLOTS.filter((s) => s.stageId === null)).toHaveLength(1);
    for (const stage of STAGES) {
      const mine = FIGURE_SLOTS.filter((s) => s.stageId === stage.id);
      expect(mine.filter((s) => s.kind === 'primary'), stage.id).toHaveLength(1);
      // The brief asks for one to three supporting visuals per stage.
      const supporting = mine.filter((s) => s.kind === 'supporting').length;
      expect(supporting, stage.id).toBeGreaterThanOrEqual(1);
      expect(supporting, stage.id).toBeLessThanOrEqual(3);
    }
  });

  /**
   * A role must say why an image would be here, not where it sits.
   *
   * Every stage role was once the same sentence with the period swapped, which
   * answers "where does it go" and leaves "why is this image here" unanswered -
   * the question the brief requires each image to answer before it is used.
   */
  it('gives every position a narrative role rather than a placement', () => {
    const seen = new Set<string>();
    for (const slot of FIGURE_SLOTS) {
      expect(slot.role.length, slot.id).toBeGreaterThan(40);
      // No two positions may share a role: identical roles mean the roles are
      // describing the slot, not the job.
      expect(seen.has(slot.role), slot.id).toBe(false);
      seen.add(slot.role);
      // The discarded template, kept as an explicit guard.
      expect(slot.role, slot.id).not.toMatch(/^Tư liệu cho thời kỳ/);
    }
  });

  it('records what was checked and why each source did not clear a slot', () => {
    /*
     * PINNED 18-9-2026. `> 0` passed with a single entry, and no test in either
     * suite had ever read `outcome` - the one field that says whether a source
     * cleared, is unresolved, or was rejected. The Verify screen prints one row
     * per check, so the count is pinned the way the slot count is.
     */
    expect(SOURCING_CHECKS).toHaveLength(26);
    const byOutcome = (o: (typeof SOURCING_CHECKS)[number]['outcome']) =>
      SOURCING_CHECKS.filter((c) => c.outcome === o);
    expect(byOutcome('cleared')).toHaveLength(12);
    expect(byOutcome('unresolved')).toHaveLength(8);
    expect(byOutcome('rejected')).toHaveLength(6);
    for (const c of SOURCING_CHECKS) {
      expect(['cleared', 'unresolved', 'rejected'], `${c.id}.outcome`).toContain(c.outcome);
    }
    // No published figure may cite a page that a check rejected.
    const rejectedUrls = new Set(byOutcome('rejected').map((c) => c.url));
    for (const fig of FIGURES) {
      expect(rejectedUrls.has(fig.sourceUrl), `${fig.id} cites a rejected source`).toBe(false);
    }
    for (const c of SOURCING_CHECKS) {
      // A check is only a check if someone can open the page again.
      expect(c.url).toMatch(/^https:\/\//);
      expect(c.found.length).toBeGreaterThan(20);
      expect(c.blocker.length).toBeGreaterThan(40);
    }
  });

  it('keeps every field required before a photograph may be shown', () => {
    for (const fig of FIGURES) {
      expect(fig.file.length, fig.id).toBeGreaterThan(0);
      expect(fig.width, fig.id).toBeGreaterThan(0);
      expect(fig.height, fig.id).toBeGreaterThan(0);
      expect(fig.alt.length, fig.id).toBeGreaterThan(10);
      expect(fig.caption.length, fig.id).toBeGreaterThan(10);
      expect(fig.sourceName.length, fig.id).toBeGreaterThan(3);
      // A search-result link is not a source; the page itself must be named.
      expect(fig.sourceUrl, fig.id).toMatch(/^https:\/\//);
      expect(fig.sourceUrl, fig.id).not.toMatch(/google\.|bing\.|search\?/);
      expect(fig.holderRightsStatus.length, fig.id).toBeGreaterThan(10);
      expect(fig.reuseCondition.length, fig.id).toBeGreaterThan(10);
      // Where a source makes attribution a condition of reuse, the string it
      // requires has to be stored so it can be displayed.
      expect(fig.credit.length, fig.id).toBeGreaterThan(10);
      expect(fig.rightsUrl, fig.id).toMatch(/^https:\/\//);
      // Identifying the subject is its own claim with its own basis.
      expect(fig.identification.length, fig.id).toBeGreaterThan(40);
    }
  });

  /**
   * Every delivered file is a local file that exists.
   *
   * Two failures this catches, both of which would ship silently. A record
   * pointing at a file nobody copied renders a broken box with a caption and a
   * credit under it, which is worse than a blocked slot because it looks like a
   * document. And a record pointing at a remote address would make the product
   * depend on someone else's server and, for an archive that requires its own
   * source line, would be hotlinking rather than reuse.
   */
  it('delivers every document from a local file that is actually on disk', () => {
    /*
     * The list of files that really exist, taken from the build tool rather
     * than from a hand-kept constant, so it cannot go stale. `import.meta.glob`
     * without `eager` hands back the matching paths as keys and never reads the
     * bytes, which is what is wanted: this checks presence, not content.
     */
    const shipped = new Set(
      Object.keys(import.meta.glob('../../public/tu-lieu/*')).map((p) =>
        p.replace('../../public/', ''),
      ),
    );
    expect(shipped.size, 'no files found under public/tu-lieu').toBeGreaterThan(0);

    for (const fig of FIGURES) {
      expect(fig.file, fig.id).toMatch(/^tu-lieu\//);
      expect(fig.file, fig.id).not.toMatch(/^https?:/);
      expect(shipped.has(fig.file), `${fig.id}: missing ${fig.file}`).toBe(true);
    }
  });

  /**
   * No document is used twice.
   *
   * The brief for the documentary pass rules out repeated portrait cards, and
   * the cheapest way to break that rule is to point two positions at one file
   * so a stage that found nothing borrows the picture from a stage that did.
   */
  it('uses each document in exactly one position', () => {
    const files = FIGURES.map((f) => f.file);
    expect(new Set(files).size, files.join(', ')).toBe(files.length);
  });

  /**
   * The evidence axes stay separate.
   *
   * The sweep covers all SEVEN text axes that must be answered independently:
   * identity, event/date, place, offline packaging, the holder's own statement,
   * the holder's published condition, and the maker's position.
   *
   * They exist to be answered separately because they have different evidence
   * behind them. Copying a cleared answer from one field into another would let
   * a settled axis vouch for an unsettled one, which is precisely the reasoning
   * error the earlier passes made and corrected. Identical text in two axes is
   * the signature of that error, so it fails here.
   */
  it('keeps the evidence axes answered separately, never copied between each other', () => {
    for (const fig of FIGURES) {
      const axes = {
        identification: fig.identification,
        eventCheck: fig.eventCheck,
        locationCheck: fig.locationCheck,
        offlineCheck: fig.offlineCheck,
        holderRightsStatus: fig.holderRightsStatus,
        reuseCondition: fig.reuseCondition,
        creatorRightsCheck: fig.creatorRightsCheck,
      };
      for (const [name, value] of Object.entries(axes)) {
        expect(value.length, `${fig.id}.${name}`).toBeGreaterThan(30);
      }
      const values = Object.values(axes);
      expect(new Set(values).size, `${fig.id}: two axes carry identical text`).toBe(values.length);
    }
  });

  /**
   * The usage condition is published by whoever holds the document.
   *
   * A condition read off a third-party page says nothing about what the holder
   * permits. Requiring the two links to share a host is a blunt check, but it
   * is the one that would have caught the earlier mistake of judging an
   * institution from a line in somebody else's footer.
   */
  it('reads each usage condition on the holding institution’s own site', () => {
    for (const fig of FIGURES) {
      const host = (u: string) => new URL(u).hostname.replace(/^www\./, '');
      expect(host(fig.rightsUrl), fig.id).toBe(host(fig.sourceUrl));
    }
  });

  /**
   * An intermediary is never cited as the source.
   *
   * Images for this pass were discovered through a reference repository on the
   * machine. Discovery is not provenance: a code-hosting URL, or that
   * repository's name, appearing in a source field would be citing the courier
   * instead of the archive.
   */
  it('never names a code host or a reference repository as a source', () => {
    for (const fig of FIGURES) {
      const cited = `${fig.sourceName} ${fig.sourceUrl} ${fig.credit} ${fig.rightsUrl}`;
      for (const intermediary of ['github', 'gitlab', 'creative_product_HCM202', 'wikipedia', 'commons.wikimedia']) {
        expect(cited.toLowerCase(), `${fig.id}: ${intermediary}`).not.toContain(
          intermediary.toLowerCase(),
        );
      }
    }
  });

  /**
   * The Marseille plate.
   *
   * The record's own date, 26-12-1921, falls inside stage 3, so the picture sits
   * there and does a stage-specific job (`SC-24`). What this test guards is the
   * boundary that has nothing to do with its date: its EVENT, the Marseille
   * congress, is not covered by the excerpt, so the picture may sit in stage 3
   * and may never be used to illustrate that congress.
   */
  it('keeps the Marseille plate on the stage its own date belongs to, and off the event it records', () => {
    const plate = FIGURES.find((f) => f.id === 'FS-ky-3');
    expect(plate, 'FS-ky-3 should be filled').toBeDefined();
    if (!plate) return;

    // Held by a named institution, at a page anyone can open.
    expect(plate.sourceUrl).toContain('gallica.bnf.fr/ark:/12148/btv1b9054078w');
    expect(plate.sourceName).toContain('Bibliothèque nationale de France');
    expect(plate.credit).toBe('Source gallica.bnf.fr / Bibliothèque nationale de France');

    // Attached to stage 3, whose printed period contains the record's date.
    expect(plate.stageId).toBe('ky-3');
    const stage3 = STAGES.find((s) => s.id === 'ky-3');
    expect(stage3?.headingPeriod).toContain('31-12-1920');
    expect(stage3?.headingPeriod).toContain('3-2-1930');
    expect(plate.caption).toContain('26-12-1921');

    /*
     * And the limit travels with it. The event axis must still say, in the
     * product's own words, that the congress in the record is outside the
     * excerpt - otherwise the move would have quietly widened what the picture
     * claims, which is the thing the earlier placement existed to prevent.
     */
    expect(plate.eventCheck).toContain('Marseille');
    expect(plate.eventCheck).toContain('NGOÀI');

    // The file is served from the product's own folder, not hotlinked.
    expect(plate.file).toMatch(/^tu-lieu\//);
    expect(plate.file).not.toMatch(/^https?:/);
  });

  /**
   * The opening position is empty, declared, and says why.
   *
   * When its document moved to stage 3 the position could have been deleted.
   * It was not: AGENTS.md section 4 requires an empty evidence field to stay
   * visibly blocked, and a slot that vanishes takes its gap with it.
   *
   * The position is reported on `#/kiem-chung`, not on the opening screen, so
   * this data-level check is one of the two things standing between "reported
   * elsewhere" and "quietly deleted". The other is in `e2e/figures.spec.ts`.
   */
  it('keeps the opening position declared and empty after its document moved', () => {
    expect(FIGURES.find((f) => f.id === 'FS-open')).toBeUndefined();
    const slot = FIGURE_SLOTS.find((s) => s.id === 'FS-open');
    expect(slot, 'the opening position must stay declared').toBeDefined();
    /*
     * Pinned here: the slot is still a PRIMARY position at the entrance, so a
     * later edit cannot quietly demote the opening's gap into a supporting
     * position nobody renders. (Its NOT YET EVIDENCED status is already
     * entailed by the assertion above, so restating it would add nothing.)
     */
    expect(slot?.kind, 'the opening position stays a primary anchor').toBe('primary');
    expect(slot?.anchor.where, 'and it stays at the entrance').toBe('entrance');
    // The role says what would go here and that it is empty, not just where.
    expect(slot?.role).toContain('19-9-2026');
  });

  /**
   * Reuse is its own axis, and it may never be inferred from the holder.
   *
   * A holding institution speaks for the copy it digitised. For a photograph it
   * does not speak for whoever took the picture, and the two 1946 sheets make
   * that concrete by printing a photographer credit on the page. These checks
   * hold the four fields apart and stop a `USE` being handed to a photograph
   * whose maker's position is still open.
   */
  it('keeps the reuse decision separate from the holder’s own rights label', () => {
    for (const fig of FIGURES) {
      // The holder's statement and the holder's terms are different sentences.
      expect(fig.holderRightsStatus, fig.id).not.toBe(fig.reuseCondition);
      // Whatever the holder says, the maker axis must be answered on its own.
      expect(fig.creatorRightsCheck.length, `${fig.id}.creatorRightsCheck`).toBeGreaterThan(40);
      /*
       * TIGHTENED 19-9-2026. This line was `not.toBe('REJECT')`, which let the
       * undecided value `NEED VERIFICATION` through: a document could have been
       * published on a decision nobody had made, and this test would have
       * passed. Asserting the positive set excludes both, and subsumes the
       * union-membership check that used to sit above it.
       */
      expect(['USE', 'USE WITH CAUTION'], `${fig.id}: published on a real decision`).toContain(
        fig.reuse,
      );

      /*
       * The rule, enforced on the ITEM's nature rather than on whether a name
       * happens to be printed.
       *
       * The first version keyed on `printedCreatorCredit !== null`, which left
       * two holes. It did not bind the two Agence Meurisse plates at all - the
       * hard rule was pinned for them only by hard-coded id below, so the
       * ruling could have been reverted on them in silence. And it could not
       * explain `FS-ky-5-c`, a photograph the magazine printed with NO credit
       * line, which is `USE WITH CAUTION` anyway: an absent credit settles
       * nothing about who took the picture.
       *
       * So the discriminator is whether the record answers the maker question,
       * not whether the sheet prints a name. Every figure whose maker axis is
       * unestablished must carry the caution, whatever the item prints.
       */
      const makerUnsettled = fig.creatorRightsCheck.includes('CHƯA XÁC LẬP');
      if (makerUnsettled) {
        expect(fig.reuse, `${fig.id}: maker unsettled, cannot be plain USE`).toBe(
          'USE WITH CAUTION',
        );
      }
      if (fig.reuse === 'USE WITH CAUTION') {
        expect(fig.creatorRightsCheck, `${fig.id}: caution must state why`).toContain(
          'CHƯA XÁC LẬP',
        );
      }
      // An item that prints a maker credit always has an open maker question.
      if (fig.printedCreatorCredit !== null) {
        expect(fig.reuse, `${fig.id} names a maker on the item`).toBe('USE WITH CAUTION');
      }
    }

    /*
     * The two Meurisse plates and the two 1946 sheets are the four the rulings
     * were written for. Pinned by id as well, so the generic rule above cannot
     * be satisfied by quietly loosening every record at once.
     */
    for (const id of ['FS-ky-3', 'FS-ky-2-b', 'FS-ky-5', 'FS-ky-5-c']) {
      const fig = FIGURES.find((f) => f.id === id);
      expect(fig, id).toBeDefined();
      expect(fig?.reuse, id).toBe('USE WITH CAUTION');
      expect(fig?.creatorRightsCheck, id).toContain('CHƯA XÁC LẬP');
    }

    /*
     * The maker axis must be answered, and only two answers are legitimate.
     *
     * REPLACED TWICE on 19-9-2026, and both attempts are worth recording.
     * The first was two exact phrases no realistic regression would ever emit -
     * a no-op dressed as enforcement. The second was a negative regex for
     * "đã xác lập" not preceded by "CHƯA", which failed immediately and
     * correctly: `FS-ky-5` says "CHƯA XÁC LẬP, và không được đọc thành đã xác
     * lập" - a sentence warning AGAINST the claim, matched as though it made it.
     * A negative-phrase guard cannot tell assertion from prohibition.
     *
     * So the check is positive and exhaustive instead. Every figure's maker axis
     * must land on one of exactly two answers, and each answer forces its own
     * reuse decision. There is no third state to slip through, and no way to
     * satisfy this by deleting the sentence.
     */
    for (const fig of FIGURES) {
      const unsettled = fig.creatorRightsCheck.includes('CHƯA XÁC LẬP');
      const notRaised = fig.creatorRightsCheck.includes('KHÔNG PHÁT SINH');
      expect(
        unsettled || notRaised,
        `${fig.id}: creatorRightsCheck must say either CHƯA XÁC LẬP or KHÔNG PHÁT SINH`,
      ).toBe(true);
      // The two answers are mutually exclusive, and each forces its decision.
      expect(unsettled && notRaised, `${fig.id}: cannot claim both answers`).toBe(false);
      expect(fig.reuse, `${fig.id}: the answer must drive the decision`).toBe(
        unsettled ? 'USE WITH CAUTION' : 'USE',
      );
    }
  });

  it('never states a caption fact the source did not state', () => {
    for (const fig of FIGURES) {
      // Every date that appears in a caption must appear in the stored record
      // the caption is drawn from. This catches a date being "tidied up" into
      // the caption from somewhere else.
      const years = fig.caption.match(/\b(18|19|20)\d{2}\b/g) ?? [];
      for (const y of years) {
        /*
         * TIGHTENED 18-9-2026. The haystack used to begin with `fig.caption`,
         * which is where `y` was just extracted from, so the assertion held for
         * every possible dataset and guarded nothing. The point is that a year
         * printed in the caption must also be recorded on an axis that was
         * actually checked, so the caption itself is not part of the haystack.
         */
        expect(
          `${fig.holderRightsStatus} ${fig.reuseCondition} ${fig.identification} ${fig.eventCheck} ${fig.alt}`,
          `${fig.id}: year ${y} in caption is not recorded on any checked axis`,
        ).toContain(y);
      }
    }
  });

  it('states the conditions that must hold before a slot is filled', () => {
    expect(FIGURE_REQUIREMENTS.length).toBeGreaterThanOrEqual(4);
    const blob = FIGURE_REQUIREMENTS.join(' ');
    // The prohibition on AI portraits is part of the standing conditions, not
    // a note someone can drop.
    expect(blob).toContain('AI');
    expect(blob).toContain('chân dung');
  });

  /**
   * Nobody may write, anywhere in this registry, that a maker's own rights
   * position has been established - because for no record has it been.
   *
   * ADDED 18-9-2026. The Historical Image Integration report listed this guard
   * among the tests added on 19-9, and it did not exist: the suite bound the
   * DECISION (a record whose maker axis is unsettled cannot be plain `USE`) but
   * nothing stopped the prose itself from drifting into a claim of clearance.
   * The report described a real and cheap guard, so the guard is written here
   * rather than the claim deleted.
   *
   * The positive half matters more than the banned list: every record must
   * answer the maker question in exactly one of the two honest ways - the
   * question is open, or it does not arise because the item is a printed
   * document and not a photograph. There is no third answer available.
   */
  it('never claims a maker rights position has been established, in either language', () => {
    for (const fig of FIGURES) {
      const open = fig.creatorRightsCheck.includes('CHƯA XÁC LẬP');
      const notRaised = fig.creatorRightsCheck.includes('KHÔNG PHÁT SINH');
      expect(
        open || notRaised,
        `${fig.id}.creatorRightsCheck must answer the maker question as open or not-raised`,
      ).toBe(true);
      // The two answers are exclusive: a record may not hedge between them.
      expect(open && notRaised, `${fig.id}: the two maker answers are exclusive`).toBe(false);
    }

    const blob = JSON.stringify([FIGURES, SOURCING_CHECKS]).toLowerCase();
    for (const banned of [
      'đã xác lập quyền',
      'quyền của người chụp đã được',
      'đã kiểm chứng quyền',
      'photographer rights verified',
      'photographer rights established',
      'creator rights verified',
      'creator rights established',
      'rights are cleared',
      'all rights cleared',
    ]) {
      expect(blob, `the registry must never assert: ${banned}`).not.toContain(
        banned.toLowerCase(),
      );
    }
  });

  it('never ships a generated, restored or colourised portrait', () => {
    const blob = JSON.stringify(FIGURES);
    for (const banned of ['midjourney', 'dall-e', 'stable-diffusion', 'generated', 'AI-upscaled']) {
      expect(blob.toLowerCase()).not.toContain(banned.toLowerCase());
    }
  });

  /**
   * The register may not drift from the data in either direction.
   *
   * It once reported that no photograph had cleared, because the summary status
   * was a hand-written constant that nobody moved when the first one did. That
   * is a false statement about evidence, which AGENTS.md treats as seriously as
   * the opposite error. These derive-from-data guards make it impossible for
   * the two to disagree again.
   */
  it('derives the documentary status from the records, in both directions', () => {
    /*
     * PINNED 18-9-2026, because the previous form could not fail.
     *
     * Both sides of the old assertion were the same expression: it compared
     * `figureFilledCount()` with a copy of `figureFilledCount()`'s own body, and
     * `slotStatus` with a copy of `slotStatus`'s body. A register that drifted
     * would have drifted on both sides together. The counts are therefore
     * written out, the way the Verify screen writes them out, so that adding or
     * emptying a position has to be stated here deliberately.
     */
    expect(FIGURE_SLOTS).toHaveLength(13);
    expect(FIGURES).toHaveLength(8);
    expect(figureFilledCount()).toBe(8);
    expect(FIGURE_SLOTS.length - figureFilledCount()).toBe(5);
    expect(
      FIGURE_SLOTS.filter((slot) => !FIGURES.some((f) => f.id === slot.id)).map((s) => s.id).sort(),
    ).toEqual(['FS-ky-1', 'FS-ky-2', 'FS-ky-4', 'FS-ky-4-b', 'FS-open']);
    // A cleared photograph exists, so the programme is no longer NOT YET EVIDENCED.
    expect(figureStatus()).toBe('NEED VERIFICATION');

    /*
     * Every record's own evidence status, against the controlled vocabulary
     * rather than against itself. Before this line nothing in either suite ever
     * read `fig.status`: a figure silently promoted to `VERIFIED IN FILE` would
     * have kept rendering its chip and the whole run would have stayed green.
     *
     * This is a DELIBERATE PIN, not a claim that the value can never change.
     * The file's own contract says `status` may go beyond `NEED VERIFICATION`
     * once a human has opened `sourceUrl` and read the condition quoted in
     * `reuseCondition`. No human has done that for any of the eight records, so
     * the honest current value is the one pinned here. When a human does verify
     * one, this line goes red and has to be changed by hand - which is the
     * point: promoting a record past `NEED VERIFICATION` is exactly the edit
     * that must never happen quietly.
     */
    for (const fig of FIGURES) {
      expect(fig.status, `${fig.id}.status`).toBe('NEED VERIFICATION');
    }
    for (const slot of FIGURE_SLOTS) {
      const fig = FIGURES.find((f) => f.id === slot.id);
      if (fig) expect(slotStatus(slot.id), slot.id).toBe(fig.status);
      else expect(slotStatus(slot.id), slot.id).toBe('NOT YET EVIDENCED');
    }
  });

  /**
   * The picture is on screen only because the decision says it may be.
   *
   * `figureSlot()` decides to render a photograph from membership in `FIGURES`
   * alone; `reuse` is read only to pick a tone. So nothing coupled the decision
   * to the rendering: a record whose `reuse` slipped back to `NEED VERIFICATION`
   * would have gone on being displayed, credited and enlargeable while the data
   * said nobody had decided it could be. This walks every declared position
   * through the real renderer and holds both halves of that invariant.
   */
  it('renders a photograph only where an affirmative reuse decision exists, and a blocked line everywhere else', () => {
    for (const slot of FIGURE_SLOTS) {
      const el = figureSlot(slot.id, slot.role);
      const fig = FIGURES.find((f) => f.id === slot.id);
      const img = el.querySelector('img');

      if (!fig) {
        expect(hasFigure(slot.id), slot.id).toBe(false);
        expect(img, `${slot.id} must not render a picture`).toBeNull();
        expect(el.className, slot.id).toContain('figure--blocked');
        // The gap states itself rather than disappearing.
        expect(el.textContent, slot.id).toContain('CHƯA CÓ NGUỒN');
        expect(el.textContent, slot.id).toContain(slot.role);
        continue;
      }

      // Anything rendered carries a decision from the affirmative set - never
      // the undecided value, never a refusal.
      expect(['USE', 'USE WITH CAUTION'], `${slot.id} is rendered on decision ${fig.reuse}`)
        .toContain(fig.reuse);
      expect(img, `${slot.id} must render its picture`).not.toBeNull();
      expect(img?.getAttribute('src'), slot.id).toBe(fig.file);
      expect(img?.getAttribute('alt'), slot.id).toBe(fig.alt);
      // The credit is a licence condition, so it is on the surface, not behind a control.
      expect(el.textContent, `${slot.id} must show its required credit`).toContain(fig.credit);

      // The evidence status is not in the caption; it is checked where it
      // lives, in this figure's own `Nguồn và điều kiện` panel.
      const statuses = sourceItems(fig)
        .filter((row) => row.label === 'Trạng thái')
        .map((row) => row.value);
      expect(statuses, `${slot.id} must still carry its evidence status`).toContain(fig.status);
    }
  });

  /**
   * A supporting figure must name a real place in the stage flow.
   *
   * The placement lives in the data so a document cannot drift away from the
   * claim it evidences. That only holds if every declared anchor resolves to a
   * station that actually exists in that stage - otherwise the figure silently
   * never renders and nobody notices.
   */
  it('anchors every supporting position to a station that exists in its stage', () => {
    for (const slot of FIGURE_SLOTS) {
      if (slot.kind === 'primary') {
        expect(slot.anchor.where, slot.id).toBe('entrance');
        continue;
      }
      expect(['passage', 'turn', 'quote'], slot.id).toContain(slot.anchor.where);
      const stage = STAGES.find((st) => st.id === slot.stageId);
      expect(stage, slot.id).toBeDefined();
      if (!stage || slot.anchor.where === 'entrance') continue;

      const id = slot.anchor.id;
      const found =
        slot.anchor.where === 'turn'
          ? stage.turningPoints.some((t) => t.id === id)
          : slot.anchor.where === 'quote'
            ? stage.quotations.includes(id)
            : [...stage.context, ...stage.development].some((p) => p.id === id);
      expect(found, `${slot.id} -> ${slot.anchor.where} ${id}`).toBe(true);
    }
  });

  /**
   * A record and the position it fills must agree about which stage they are
   * on. A figure whose `stageId` disagreed with its slot would render in one
   * place and be reported in another.
   */
  it('keeps every filled record on the same stage as the position it fills', () => {
    for (const fig of FIGURES) {
      const slot = FIGURE_SLOTS.find((sl) => sl.id === fig.id);
      expect(slot, fig.id).toBeDefined();
      if (slot) expect(fig.stageId, fig.id).toBe(slot.stageId);
    }
  });

  /**
   * The brief for this product requires identity, event/date, location, source,
   * rights and offline packaging to be maintained SEPARATELY, so that a cleared
   * axis can never carry an uncleared one. Each has its own field and each must
   * actually say something.
   *
   * SIX axes, SEVEN fields, and the difference is deliberate: the rights axis
   * was split in two on 19-9 - `holderRightsStatus` for what the holder says
   * about the copy it digitised, `reuseCondition` for the terms it publishes -
   * because letting one string answer both let a `domaine public` label read as
   * though it settled the photographer's position. The heading used to say
   * "seven provenance checks", which put it in conflict with this docstring;
   * it now names both numbers so neither can be mistaken for the other.
   */
  it('keeps the six provenance checks as separate fields, the rights check split across two of them', () => {
    for (const fig of FIGURES) {
      for (const [name, value] of [
        ['identification', fig.identification],
        ['eventCheck', fig.eventCheck],
        ['locationCheck', fig.locationCheck],
        ['offlineCheck', fig.offlineCheck],
        ['sourceUrl', fig.sourceUrl],
        ['holderRightsStatus', fig.holderRightsStatus],
        ['reuseCondition', fig.reuseCondition],
      ] as const) {
        expect(value.length, `${fig.id}.${name}`).toBeGreaterThan(10);
      }
      // The axes must not be copies of one another.
      expect(fig.eventCheck).not.toBe(fig.identification);
      expect(fig.locationCheck).not.toBe(fig.eventCheck);
    }
  });
});

describe('the optional guess uses only real stored answers', () => {
  /**
   * A guessing exercise needs options that are wrong, and inventing one would
   * put a plausible-but-false sentence about the formation of Hồ Chí Minh
   * Thought on screen. These tests are the guard against that: every option
   * must be a stored answer belonging to a real stage, and the blanks - the
   * axes where the excerpt says nothing - must never be used in either role.
   */
  it('offers a question for every stage', () => {
    for (const s of STAGES) {
      expect(quizFor(s), s.id).not.toBeNull();
    }
  });

  it('every option is a stored answer of a real stage, never invented text', () => {
    for (const s of STAGES) {
      const quiz = quizFor(s);
      if (!quiz) throw new Error(`no quiz for ${s.id}`);
      for (const id of quiz.options) {
        const answer = quiz.axis.answers[id];
        expect(answer, `${s.id} -> ${id}`).toBeDefined();
        // The option text is the stored answer, character for character.
        expect(answer.text.length).toBeGreaterThan(0);
        expect(isInExcerpt(answer.at)).toBe(true);
      }
    }
  });

  it('never uses an axis where the excerpt says nothing, in either role', () => {
    for (const s of STAGES) {
      const quiz = quizFor(s);
      if (!quiz) throw new Error(`no quiz for ${s.id}`);
      for (const id of quiz.options) {
        // A blank is not a distractor; those answers carry a caution saying the
        // excerpt is silent, and must be excluded.
        expect(quiz.axis.answers[id].caution, `${s.id} -> ${id}`).toBeUndefined();
      }
    }
  });

  it('offers exactly three options, one of them this stage, all distinct', () => {
    for (const s of STAGES) {
      const quiz = quizFor(s);
      if (!quiz) throw new Error(`no quiz for ${s.id}`);
      expect(quiz.options).toHaveLength(3);
      expect(quiz.options).toContain(s.id);
      expect(new Set(quiz.options).size).toBe(3);
      expect(quiz.answerId).toBe(s.id);
    }
  });

  it('is deterministic, so a rehearsal and the Showcase show the same screen', () => {
    for (const s of STAGES) {
      const a = quizFor(s);
      const b = quizFor(s);
      expect(a?.axis.id).toBe(b?.axis.id);
      expect(a?.options).toEqual(b?.options);
    }
  });

  it('does not ask every stage the same question', () => {
    const axes = STAGES.map((s) => quizFor(s)?.axis.id);
    expect(new Set(axes).size).toBeGreaterThan(1);
  });
});

describe('what comes after the five stages is reachable', () => {
  /**
   * Three of these four screens had no link anywhere in the product: they were
   * reachable only by typing the address. This test exists so that a route can
   * never again be added to the product without a way in, and so that a way in
   * can never point at a route the router does not have.
   */
  it('names four destinations, each with a purpose', () => {
    expect(AFTER_STAGES).toHaveLength(4);
    for (const entry of AFTER_STAGES) {
      expect(entry.label.length).toBeGreaterThan(0);
      expect(entry.purpose.length).toBeGreaterThan(20);
    }
  });

  it('every destination resolves to a real route', () => {
    for (const entry of AFTER_STAGES) {
      expect(parse(entry.route).name, entry.route).not.toBe('notfound');
    }
  });

  it('separates the three activities from the verification register', () => {
    expect(AFTER_STAGES.filter((e) => e.kind === 'activity')).toHaveLength(3);
    expect(AFTER_STAGES.filter((e) => e.kind === 'register')).toHaveLength(1);
  });

  it('every activity says what it is for and how to work it', () => {
    for (const entry of AFTER_STAGES) {
      if (entry.kind !== 'activity') continue;
      const key = entry.route.replace('#/', '');
      const it = ACTIVITY_BRIEFS[key];
      expect(it, key).toBeDefined();
      expect(it?.goal.length).toBeGreaterThan(20);
      expect(it?.how.length).toBeGreaterThan(20);
    }
  });

  it('promises no effect the product has not measured', () => {
    const blob = JSON.stringify([AFTER_STAGES, ACTIVITY_BRIEFS]);
    for (const banned of ['hiệu quả', '%', 'chứng minh', 'giúp bạn nhớ']) {
      expect(blob).not.toContain(banned);
    }
  });
});

describe('a passage too long for one screen is split, never shortened', () => {
  it('cuts only at sentence boundaries and loses nothing', () => {
    const long = STAGES.flatMap((s) => [...s.context, ...s.development]).filter(
      (p) => p.text.trim().split(/\s+/).length > 90,
    );
    // If this ever becomes zero the splitting code is dead and should go.
    expect(long.length).toBeGreaterThan(0);

    for (const p of long) {
      const parts = splitForReading(p.text);
      expect(parts.length).toBeGreaterThan(1);
      // Concatenating the parts reproduces the stored text, whitespace aside.
      expect(parts.join(' ').replace(/\s+/g, ' ').trim()).toBe(
        p.text.replace(/\s+/g, ' ').trim(),
      );
      // No part may end mid-sentence.
      for (const part of parts.slice(0, -1)) {
        expect(part.trim()).toMatch(/[.?!]$/);
      }
    }
  });

  it('never cuts a single-sentence passage, however long', () => {
    expect(splitForReading('Một câu rất dài không có dấu chấm nào ở giữa cả', 3)).toHaveLength(1);
  });

  it('leaves a passage inside the budget alone', () => {
    const short = 'Một câu ngắn.';
    expect(splitForReading(short)).toEqual([short]);
  });
});

describe('the migrated base source', () => {
  it('is the 2019 textbook, with the excerpt page range it actually has', () => {
    expect(SOURCE.name).toBe('Giáo trình Tư tưởng Hồ Chí Minh - 2019');
    expect(SOURCE.firstPage).toBe(28);
    expect(SOURCE.lastPage).toBe(35);
    expect(SOURCE.pdfPages).toBe(8);
    /*
     * The scan was compared against the official printed edition, so provenance
     * is no longer open. What is pinned here is that the claim never stands on
     * its own: whatever `provenance` says, `provenanceCheck` must name the
     * edition, the pages compared and the result, so the check can be repeated.
     */
    expect(SOURCE.provenance).not.toBe('NEED VERIFICATION');
    expect(SOURCE.provenanceCheck).toContain('Bộ Giáo dục và Đào tạo');
    expect(SOURCE.provenanceCheck).toContain('2019');
    expect(SOURCE.provenanceCheck).toContain('tr.28-35');
  });

  /*
   * The excerpt being authentic does not make its footnotes checked. Each of
   * the ten cites a different book, and none of those has been opened, so the
   * locators keep their own status - see `locators.ts`.
   */
  it('does not let the authenticated excerpt promote its own footnotes', () => {
    for (const l of LOCATORS) {
      expect(l.status, `${l.id} cites another work and is not checked by the excerpt`).toBe(
        'NEED VERIFICATION',
      );
    }
  });

  it('maps every printed page onto a sheet of the supplied file', () => {
    expect(pdfPageOf(SOURCE.firstPage)).toBe(1);
    expect(pdfPageOf(SOURCE.lastPage)).toBe(SOURCE.pdfPages);
  });

  it('builds every public citation from the exact label and a printed page', () => {
    const refs = [
      ...STAGES.map((st) => st.at),
      ...STAGES.flatMap((st) => [...st.context, ...st.development].map((p) => p.at)),
      ...ALL_QUOTATIONS.map((q) => q.at),
      ...LOCATORS.map((l) => l.at),
      ...EXPERIENCE_LINKS.map((l) => l.at),
      ...COMPARE_AXES.flatMap((a) => Object.values(a.answers).map((v) => v.at)),
      ...PRINTED_FORM_NOTES.map((n) => n.at),
      EPILOGUE.at,
    ];
    expect(refs.length).toBeGreaterThan(80);
    for (const r of refs) {
      expect(isInExcerpt(r), JSON.stringify(r)).toBe(true);
      expect(citeSource(r)).toMatch(/^Giáo trình Tư tưởng Hồ Chí Minh - 2019, tr\. \d{2}(–\d{2})?/);
    }
  });

  it('never lets the retired excerpt back in as a public citation', () => {
    // The migration audit trail is allowed to name the old risk ids; the
    // academic content the audience reads is not allowed to name the old file,
    // its PDF pages, or the later edition.
    const published = JSON.stringify([
      STAGES,
      ALL_QUOTATIONS,
      LOCATORS,
      RISKS,
      COMPARE_AXES,
      EXPERIENCE_LINKS,
      PRINTED_FORM_NOTES,
      BOUNDARIES,
      EPILOGUE,
      EXCERPT_BOUNDARY,
    ]);
    expect(published).not.toContain('C2 PDF');
    expect(published).not.toContain('C2-02');
    expect(published).not.toContain('C2-R');
    expect(published).not.toContain('Giáo trình Tư tưởng Hồ Chí Minh - 2021');
    expect(published).not.toContain('printed p.');
  });

  it('keeps the retired ids only in the migration audit trail', () => {
    expect(SUPERSEDED_RISKS.map((r) => r.formerId)).toContain('C2-R01');
  });
});
