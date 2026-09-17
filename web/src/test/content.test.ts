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
   * The registry is empty on purpose. These tests are the guard that keeps it
   * honest: a record may not appear without every provenance field filled, and
   * the reasons the slots are still blocked must stay published rather than
   * quietly disappearing when someone tidies up.
   */
  it('publishes a primary position for the opening and for every stage, plus one supporting position per stage', () => {
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
    expect(SOURCING_CHECKS.length).toBeGreaterThan(0);
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
      expect(fig.rights.length, fig.id).toBeGreaterThan(10);
      // Where a source makes attribution a condition of reuse, the string it
      // requires has to be stored so it can be displayed.
      expect(fig.credit.length, fig.id).toBeGreaterThan(10);
      expect(fig.rightsUrl, fig.id).toMatch(/^https:\/\//);
      // Identifying the subject is its own claim with its own basis.
      expect(fig.identification.length, fig.id).toBeGreaterThan(40);
    }
  });

  it('carries the one cleared photograph, sourced and unattached to any stage', () => {
    const open = FIGURES.find((f) => f.id === 'FS-open');
    expect(open, 'FS-open should be filled').toBeDefined();
    if (!open) return;

    // Held by a named institution, at a page anyone can open.
    expect(open.sourceUrl).toContain('gallica.bnf.fr/ark:/12148/btv1b9054078w');
    expect(open.sourceName).toContain('Bibliothèque nationale de France');
    expect(open.credit).toBe('Source gallica.bnf.fr / Bibliothèque nationale de France');

    /*
     * Not attached to a stage. The event in the BnF record is the Marseille
     * congress of December 1921, which the assigned excerpt does not cover -
     * the excerpt's congress is Tours, December 1920. Attaching this to a stage
     * because it looks apt is exactly the inference the project forbids.
     */
    expect(open.stageId).toBeNull();

    // The file is served from the product's own folder, not hotlinked.
    expect(open.file).toMatch(/^tu-lieu\//);
    expect(open.file).not.toMatch(/^https?:/);
  });

  it('never states a caption fact the source did not state', () => {
    for (const fig of FIGURES) {
      // Every date that appears in a caption must appear in the stored record
      // the caption is drawn from. This catches a date being "tidied up" into
      // the caption from somewhere else.
      const years = fig.caption.match(/\b(18|19|20)\d{2}\b/g) ?? [];
      for (const y of years) {
        expect(
          `${fig.caption} ${fig.rights} ${fig.identification}`,
          `${fig.id}: year ${y} in caption`,
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
    expect(figureFilledCount()).toBe(
      FIGURE_SLOTS.filter((slot) => FIGURES.some((f) => f.id === slot.id)).length,
    );
    expect(figureFilledCount()).toBeGreaterThan(0);
    expect(figureFilledCount()).toBeLessThan(FIGURE_SLOTS.length);
    // A cleared photograph exists, so the programme is no longer NOT YET EVIDENCED.
    expect(figureStatus()).toBe('NEED VERIFICATION');
    for (const slot of FIGURE_SLOTS) {
      const fig = FIGURES.find((f) => f.id === slot.id);
      expect(slotStatus(slot.id), slot.id).toBe(fig ? fig.status : 'NOT YET EVIDENCED');
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
      expect(slot.anchor.where, slot.id).not.toBe('entrance');
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
   */
  it('keeps the six provenance checks as separate fields', () => {
    for (const fig of FIGURES) {
      for (const [name, value] of [
        ['identification', fig.identification],
        ['eventCheck', fig.eventCheck],
        ['locationCheck', fig.locationCheck],
        ['offlineCheck', fig.offlineCheck],
        ['sourceUrl', fig.sourceUrl],
        ['rights', fig.rights],
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
    // The supplied file is an unauthenticated scan. Migrating the source does
    // not upgrade its provenance.
    expect(SOURCE.provenance).toBe('NEED VERIFICATION');
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
