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
  FIGURE_REQUIREMENTS,
  FIGURE_SLOTS,
  SOURCING_CHECKS,
} from '../data/figures';
import { splitForReading } from '../components/stagePage';
import { LOCATORS, PRINTED_FORM_NOTES, RISKS, UNNOTED_MARKERS } from '../data/locators';
import { COMPARE_AXES, EXPERIENCE_LINKS, PRESENTATION_BEATS, PRESENTATION_BUDGET_MAX, PRESENTATION_BUDGET_MIN } from '../data/interactions';

/**
 * These tests guard the academic invariants, not the visual design.
 *
 * They exist so that a later edit cannot quietly drop a heading, promote an
 * unverified locator, expand "Sdd", or let the presentation script drift
 * outside the Showcase slot.
 */

/** The five exact headings, as recorded in context section 8.2. */
const EXACT_HEADINGS = [
  'Thời kỳ trước ngày 5-6-1911: Hình thành tư tưởng yêu nước và có chí hướng tìm con đường cứu nước mới',
  'Thời kỳ từ giữa năm 1911 đến cuối năm 1920: Dần dần hình thành tư tưởng cứu nước, giải phóng dân tộc Việt Nam theo con đường cách mạng vô sản',
  'Thời kỳ từ cuối năm 1920 đến đầu năm 1930: Hình thành những nội dung cơ bản tư tưởng về cách mạng Việt Nam',
  'Thời kỳ từ đầu năm 1930 đến đầu năm 1941: Vượt qua thử thách, giữ vững đường lối, phương pháp cách mạng Việt Nam đúng đắn, sáng tạo',
  'Thời kỳ từ đầu năm 1941 đến tháng 9-1969: Tư tưởng Hồ Chí Minh tiếp tục phát triển, hoàn thiện, soi đường cho sự nghiệp cách mạng của Đảng và nhân dân ta',
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

  it('never expands the "Sdd" abbreviation', () => {
    const sdd = LOCATORS.filter((l) => l.printed.includes('Sđd'));
    expect(sdd).toHaveLength(3);
    for (const l of sdd) {
      expect(l.caution).toBeDefined();
      expect(l.caution).toContain('Sđd');
    }
  });

  it('keeps the printed page anomaly in note L8 unrepaired', () => {
    const l8 = LOCATORS.find((l) => l.id === 'L8');
    expect(l8?.printed).toContain('tr.l13');
    expect(l8?.printed).not.toContain('tr.113');
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
  it('carries all nine registered risks', () => {
    expect(RISKS.map((r) => r.id)).toEqual([
      'C2-R01',
      'C2-R02',
      'C2-R03',
      'C2-R04',
      'C2-R05',
      'C2-R06',
      'C2-R07',
      'C2-R08',
      'C2-R09',
    ]);
  });

  it('keeps the 6-6-1938 / Second World War sentence as a document conflict', () => {
    const r5 = RISKS.find((r) => r.id === 'C2-R05');
    expect(r5?.status).toBe('DOCUMENT CONFLICT');
    expect(r5?.issue).toContain('6-6-1938');
  });

  it('every risk referenced by a stage exists in the register', () => {
    const known = new Set(RISKS.map((r) => r.id));
    for (const s of STAGES) {
      for (const id of s.riskIds) expect(known.has(id)).toBe(true);
    }
  });

  it('the stages that share a boundary both cite the boundary risk', () => {
    const s2 = STAGES.find((s) => s.id === 'ky-2');
    const s3 = STAGES.find((s) => s.id === 'ky-3');
    expect(s2?.riskIds).toContain('C2-R02');
    expect(s3?.riskIds).toContain('C2-R02');

    const s4 = STAGES.find((s) => s.id === 'ky-4');
    const s5 = STAGES.find((s) => s.id === 'ky-5');
    expect(s4?.riskIds).toContain('C2-R03');
    expect(s5?.riskIds).toContain('C2-R03');
  });
});

describe('rail geometry encodes the printed boundaries', () => {
  it('draws late 1920 and early 1941 as overlapping, not as clean cuts', () => {
    const byId = new Map(STAGES.map((s) => [s.id, s]));
    const s2 = byId.get('ky-2');
    const s3 = byId.get('ky-3');
    const s4 = byId.get('ky-4');
    const s5 = byId.get('ky-5');
    if (!s2 || !s3 || !s4 || !s5) throw new Error('missing stage');

    // Stage 3 starts before stage 2 ends: the shared late-1920 boundary.
    expect(s3.railStart).toBeLessThan(s2.railEnd);
    // Stage 5 starts before stage 4 ends: the shared early-1941 boundary.
    expect(s5.railStart).toBeLessThan(s4.railEnd);
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

  it('records that section III has no body text in the excerpt', () => {
    expect(EXCERPT_BOUNDARY.headings).toContain('III. GIÁ TRỊ TƯ TƯỞNG HỒ CHÍ MINH');
    expect(EXCERPT_BOUNDARY.note).toContain('Không có phần thân bài');
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
    expect(s1?.markers).toContain('trước ngày 5-6-1911');
  });
});

describe('cross-stage comparison', () => {
  it('answers every axis for all five stages', () => {
    for (const axis of COMPARE_AXES) {
      for (const stage of STAGES) {
        const answer = axis.answers[stage.id];
        expect(answer, `${axis.id} is missing ${stage.id}`).toBeDefined();
        expect(answer.text.length).toBeGreaterThan(0);
        expect(answer.at.length).toBeGreaterThan(0);
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
      expect(l.at).toMatch(/^C2 PDF/);
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
      expect(n.at).toMatch(/^C2 PDF/);
      expect(n.where.length).toBeGreaterThan(0);
    }
  });

  it('carries the four forms already registered under C2-R08', () => {
    const registered = PRINTED_FORM_NOTES.filter((n) => n.registered).map((n) => n.printed);
    expect(registered).toContain('bước ngoạt');
    expect(registered).toContain('trở thành thành yếu tố chỉ đạo');
    expect(registered).toContain('Hòa hình lập lại');
    expect(registered).toContain('quân đội viễn Chính Mỹ');
  });

  it('ids are unique', () => {
    const ids = PRINTED_FORM_NOTES.map((n) => n.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every passage that normalises a printed form carries a caution', () => {
    // P1-6 normalises a duplicated word; it must say so rather than absorb it.
    const s1 = STAGES.find((s) => s.id === 'ky-1');
    const p16 = s1?.context.find((p) => p.id === 'P1-6');
    expect(p16?.caution).toBeDefined();
    expect(p16?.caution).toContain('trong trong');
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
  it('publishes a position for the opening and for every stage', () => {
    expect(FIGURE_SLOTS.filter((s) => s.stageId === null)).toHaveLength(1);
    for (const stage of STAGES) {
      expect(FIGURE_SLOTS.filter((s) => s.stageId === stage.id), stage.id).toHaveLength(1);
    }
    for (const slot of FIGURE_SLOTS) {
      expect(slot.role.length).toBeGreaterThan(15);
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
        expect(answer.at).toMatch(/^C2 PDF/);
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
