import {
  AFTER_STAGES,
  CENTRAL_QUESTION,
  CENTRAL_QUESTION_STATUS,
  PRODUCT_SUBTITLE,
  PRODUCT_TITLE,
  SECTION_HEADING,
  SECTION_HEADING_AT,
} from '../data/project';
import { citeSource } from '../data/source';
import { STAGES, STAGE_BY_ID } from '../data/stages';
import { h, wholeDates } from '../lib/dom';
import { getVisited, motionSuppressed, nextUnvisited } from '../lib/state';
import { lensTrigger } from './evidence';
import { openingThread } from './thread';

/**
 * The opening.
 *
 * What changed and why. The Central Question used to be the first and largest
 * thing on the screen, set as the page heading, with the five named stages
 * beside it and the instructions below - 511 words measured in the first
 * screen at 1440px. A question that long cannot be read at a glance, so the
 * screen asked for a reading commitment before it had established what the
 * product is.
 *
 * Now the first screen carries identity, two lines of introduction and one
 * action. The Central Question keeps every character of its approved wording
 * and gets a section of its own directly below, where it has the room to be
 * read as a question rather than skimmed as a wall.
 *
 * Nothing about its approval state is softened: the status is one control away
 * on the same block, exactly as before.
 *
 * The screen carries no documentary figure. `FS-open` stays declared in
 * `data/figures.ts` and is reported on `#/kiem-chung`, the same arrangement the
 * product uses for an unfilled supporting slot.
 */

/**
 * The two lines that introduce the product.
 *
 * `PROJECT DECISION`. They describe what this product is and what the viewer
 * will do in it. They make no claim about history, so they carry no locator -
 * and they are kept to two sentences because the measured problem here was
 * volume, not absence.
 */
const INTRO =
  'Một trích đoạn giáo trình, dựng lại thành hành trình để đi qua. Năm chặng, theo đúng thứ tự và đúng tên gọi mà trích đoạn in ra.';

export function openingPage(): HTMLElement {
  const thread = openingThread();
  const visited = getVisited();
  const resumeAt = visited.length > 0 ? nextUnvisited() : null;
  const entryStage = (resumeAt ? STAGE_BY_ID.get(resumeAt) : undefined) ?? STAGES[0];
  if (!entryStage) throw new Error('No stages');

  const scene = h(
    'section',
    { class: 'scene' },
    hero(entryStage, visited.length),
    question(),
    h('div', { class: 'scene__draw' }, thread),
  );

  // The thread draws itself in only when motion is allowed. When it is not, it
  // is already in its final drawn state - nothing here is revealed only by
  // animation.
  if (!motionSuppressed()) {
    scene.dataset['draw'] = 'pending';
    requestAnimationFrame(() => {
      const run = scene.querySelector<SVGPathElement>('.thread__run');
      scene.dataset['draw'] = 'running';
      if (!run) return;

      const len = run.getTotalLength();
      run.style.strokeDasharray = String(len);
      run.style.strokeDashoffset = String(len);

      const anim = run.animate(
        [{ strokeDashoffset: String(len) }, { strokeDashoffset: '0' }],
        { duration: 2100, easing: 'cubic-bezier(0.22, 0.75, 0.3, 1)', fill: 'forwards' },
      );
      const settle = (): void => {
        run.style.strokeDasharray = '';
        run.style.strokeDashoffset = '';
      };
      anim.finished.then(settle, settle);
    });
  }

  return scene;
}

/**
 * The first screen: who this is, one action.
 *
 * One primary action and one secondary beside it, and nothing else competing.
 * Basis for keeping it to one: `primary-action` in SKILL.md Quick Reference
 * section 4 - each screen gets one primary call, with secondary actions
 * visually subordinate.
 *
 * Since 18-9-2026 this is a single column. The documentary position that used
 * to sit beside it is gone from this screen - see the note at the top of the
 * file - and the title takes the width instead of the picture.
 */
function hero(entryStage: (typeof STAGES)[number], visitedCount: number): HTMLElement {
  return h(
    'div',
    { class: 'hero' },
    h(
      'div',
      { class: 'hero__type' },
      h('p', { class: 'hero__label', text: PRODUCT_TITLE }),
      heroTitle(),
      h('p', { class: 'hero__intro', text: INTRO }),
      h(
        'div',
        { class: 'hero__act' },
        h(
          'a',
          { class: 'btn btn--primary btn--lg scene__go', href: `#/chang/${entryStage.id}` },
          h('span', {
            class: 'scene__go-lead',
            text: visitedCount > 0
              ? `Tiếp tục · chặng ${String(entryStage.ordinal)}`
              : `Bắt đầu · chặng ${String(entryStage.ordinal)}`,
          }),
          h('span', { class: 'scene__go-name' }, ...wholeDates(entryStage.headingPeriod)),
          h('span', { class: 'visually-hidden', text: `. ${entryStage.heading}` }),
        ),
        h('a', { class: 'btn scene__map', href: '#/hanh-trinh' }, h('span', { text: 'Xem toàn bộ 5 chặng' })),
      ),
      visitedCount > 0
        ? h('p', {
            class: 'scene__resume',
            text: `Bạn đã mở ${String(visitedCount)} trên ${String(STAGES.length)} chặng.`,
          })
        : null,
    ),
  );
}

/**
 * The subtitle, broken at its own comma.
 *
 * The sentence is two clauses - what the product covers, then what that adds up
 * to - and the comma is where it hinges. Left to wrap on its own the break
 * landed mid-clause (`... một quá trình` / `hình thành và phát triển`), which
 * splits the second idea across two lines. So the two clauses are set as two
 * block spans and each takes its own line.
 *
 * This is the same device `question()` uses on the Central Question below, for
 * the same reason, and it keeps the same guarantee: the two slices concatenate
 * back to the stored `PRODUCT_SUBTITLE` character for character, so nothing is
 * rewritten to make it fit and assistive technology reads one heading. No `<br>`
 * and no non-breaking space is used - `heading-line-balance` in the UI skill
 * rules both out - and each clause still wraps inside itself on a narrow screen
 * rather than overflowing.
 */
function heroTitle(): HTMLElement {
  const at = PRODUCT_SUBTITLE.indexOf(',');
  if (at < 0) return h('h1', { class: 'hero__title', text: PRODUCT_SUBTITLE });

  return h(
    'h1',
    { class: 'hero__title' },
    h('span', { class: 'hero__title-line', text: PRODUCT_SUBTITLE.slice(0, at + 1) }),
    // Keeps the separating space at the head of the second line, where it
    // collapses, so the heading's text content is unchanged.
    h('span', { class: 'hero__title-line', text: PRODUCT_SUBTITLE.slice(at + 1) }),
  );
}

/**
 * The Central Question, in a room of its own.
 *
 * The wording is the approved wording, character for character. The sentence
 * turns on `mà được`: what the process is NOT, then what it IS, and typography
 * is allowed to show that hinge. The two spans concatenate back to the stored
 * string exactly, which a unit test checks, and assistive technology reads the
 * whole sentence as one heading.
 */
const HINGE = 'mà được hình thành';

function question(): HTMLElement {
  const at = CENTRAL_QUESTION.indexOf(HINGE);
  const text =
    at < 0
      ? h('h2', { class: 'ask__text', text: CENTRAL_QUESTION })
      : h(
          'h2',
          { class: 'ask__text' },
          h('span', { class: 'ask__lead', text: CENTRAL_QUESTION.slice(0, at) }),
          h('span', { class: 'ask__rest', text: CENTRAL_QUESTION.slice(at) }),
        );

  return h(
    'section',
    { class: 'ask' },
    h('p', { class: 'ask__kicker', text: 'Câu hỏi dẫn đường' }),
    text,
    h(
      'div',
      { class: 'ask__foot' },
      lensTrigger(
        {
          title: 'Câu hỏi trung tâm',
          items: [
            { label: 'Trạng thái', value: CENTRAL_QUESTION_STATUS, tone: 'status' },
            {
              label: 'Vì sao',
              value:
                'Cả hai văn bản quy định đều yêu cầu sản phẩm giải quyết một câu hỏi trung tâm, nhưng không cung cấp sẵn nội dung câu hỏi. Câu trên là đề xuất của nhóm.',
              tone: 'plain',
            },
            { label: 'Phạm vi nội dung', value: SECTION_HEADING, tone: 'plain' },
            { label: 'Nguồn', value: citeSource(SECTION_HEADING_AT), tone: 'locator' },
          ],
        },
        'Câu hỏi này đã được duyệt chưa?',
      ),
    ),
    stageList(),
    howToRead(),
  );
}

/**
 * The three moves the product asks of a reader. `PROJECT DECISION`: it
 * describes this product's own shape, so it needs no locator and makes no claim
 * about the source.
 */
const HOW = [
  'Đi qua năm chặng theo đúng thứ tự trích đoạn in chúng.',
  'Ở mỗi bước ngoặt, dừng lại xem điều gì đã thay đổi.',
  'Cuối cùng nối năm chặng lại và trở về câu hỏi ở trên.',
];

function howToRead(): HTMLElement {
  const list = h('ol', { class: 'scene__how-list' });
  HOW.forEach((line, i) => {
    list.appendChild(
      h(
        'li',
        { class: 'scene__how-item' },
        h('span', { class: 'scene__how-n', text: String(i + 1), aria: { hidden: 'true' } }),
        h('span', { text: line }),
      ),
    );
  });

  const after = h('p', { class: 'scene__after' });
  after.appendChild(h('span', { class: 'scene__after-label', text: 'Cũng có thể vào thẳng:' }));
  AFTER_STAGES.forEach((entry, i) => {
    if (i > 0) after.appendChild(h('span', { class: 'scene__after-sep', text: '·', aria: { hidden: 'true' } }));
    after.appendChild(
      h(
        'a',
        { class: 'scene__after-link', href: entry.route },
        h('span', { text: entry.label }),
        h('span', { class: 'visually-hidden', text: `. ${entry.purpose}` }),
      ),
    );
  });

  return h(
    'div',
    { class: 'scene__how' },
    h('p', { class: 'scene__how-label', text: 'Cách đi' }),
    list,
    after,
  );
}

/**
 * The five stages, named.
 *
 * Each row shows the period part of the exact heading and carries the full
 * official heading for assistive technology, so the shortened form is never the
 * only name for a stage.
 */
function stageList(): HTMLElement {
  const visited = getVisited();
  const list = h('ol', { class: 'scene__stages' });

  for (const stage of STAGES) {
    list.appendChild(
      h(
        'li',
        { class: 'scene__stage', dataset: { visited: visited.includes(stage.id) ? 'true' : 'false' } },
        h(
          'a',
          { class: 'scene__stage-link', href: `#/chang/${stage.id}` },
          h('span', { class: 'scene__stage-n', text: String(stage.ordinal), aria: { hidden: 'true' } }),
          h(
            'span',
            { class: 'scene__stage-text' },
            h(
              'span',
              { class: 'scene__stage-period', aria: { hidden: 'true' } },
              ...wholeDates(stage.headingPeriod),
            ),
            h('span', { class: 'scene__stage-claim', aria: { hidden: 'true' }, text: stage.headingClaim }),
            h('span', { class: 'visually-hidden', text: stage.heading }),
          ),
        ),
      ),
    );
  }

  return h(
    'div',
    { class: 'scene__aside', role: 'group', aria: { label: 'Năm chặng bạn sẽ đi qua' } },
    h('p', { class: 'scene__aside-label', text: 'Bạn sẽ đi qua' }),
    list,
  );
}
