import { BOUNDARIES, STAGES } from '../data/stages';
import { AFTER_STAGES } from '../data/project';
import { RISK_BY_ID } from '../data/locators';
import type { Stage } from '../data/types';
import { h } from '../lib/dom';
import { getVisited, motionSuppressed, nextUnvisited } from '../lib/state';
import { lensTrigger } from './evidence';
import { VB_H, journeyThread, levelFor } from './thread';

/**
 * The five stages as one drawn thread.
 *
 * The thing this screen has to make visible is that the five headings are not
 * five separate boxes: two consecutive headings share a boundary, so in those
 * regions two stages are drawn at once. The old band diagram said this in a
 * paragraph underneath. Here the drawing itself says it, and the paragraph
 * shrinks to a caption.
 */

/**
 * The thread draws itself once, stage by stage.
 *
 * What it is for: the drawing's whole claim is that the five headings are one
 * continuous process, not five boxes. Drawn all at once that reads as a static
 * diagram; drawn in printed order, left to right, the eye follows the same path
 * the reader is about to walk, and the two places where two lines run at once
 * are seen to overlap rather than merely to be adjacent.
 *
 * It is one gesture on one object, it runs once, and it reveals nothing: with
 * motion switched off every line is simply already there, which is also what a
 * second visit gets. Nobody has to wait for it - the links are live throughout.
 */
function drawThread(svg: SVGSVGElement): void {
  if (motionSuppressed()) return;

  const lines = [...svg.querySelectorAll<SVGPathElement>('.thread__line')];
  const joints = [...svg.querySelectorAll<SVGPathElement>('.thread__joint')];
  if (lines.length === 0) return;

  svg.dataset['drawing'] = 'true';

  requestAnimationFrame(() => {
    lines.forEach((line, i) => {
      const len = line.getTotalLength();
      if (!Number.isFinite(len) || len === 0) return;
      line.style.strokeDasharray = String(len);
      line.style.strokeDashoffset = String(len);
      const anim = line.animate(
        [{ strokeDashoffset: String(len) }, { strokeDashoffset: '0' }],
        { duration: 420, delay: i * 190, easing: 'cubic-bezier(0.22, 0.75, 0.3, 1)', fill: 'forwards' },
      );
      const settle = (): void => {
        line.style.strokeDasharray = '';
        line.style.strokeDashoffset = '';
      };
      anim.finished.then(settle, settle);
    });

    // The joints follow the line they come from, so an overlap is seen being
    // made rather than appearing beside a line that is already finished.
    joints.forEach((joint, i) => {
      joint.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 260,
        delay: 190 * (i + 1) + 240,
        easing: 'ease-out',
        fill: 'backwards',
      });
    });

    window.setTimeout(() => {
      delete svg.dataset['drawing'];
    }, lines.length * 190 + 420);
  });
}

export function journeyPage(): HTMLElement {
  const visited = getVisited();
  const thread = journeyThread({ visited, activeId: null });
  drawThread(thread);

  const overlay = h('div', { class: 'atlas__overlay' });

  for (const stage of STAGES) {
    overlay.appendChild(stageMark(stage, thread));
  }

  STAGES.forEach((stage, i) => {
    const next = STAGES[i + 1];
    const boundary = BOUNDARIES[i];
    if (!next || !boundary) return;

    const mid = (stage.railEnd + next.railStart) / 2;
    // Sit high on the joint, not at its midpoint: the midpoint is exactly where
    // the next stage's label grows upward from its own line.
    const top = levelFor(stage.ordinal);
    const y = top + (levelFor(next.ordinal) - top) * 0.16;
    const risk = boundary.riskId ? RISK_BY_ID.get(boundary.riskId) : undefined;

    const mark = h(
      'span',
      {
        class: 'atlas__boundary',
        dataset: { kind: boundary.kind },
        ...(risk ? { title: `${risk.id} — ${risk.title}` } : {}),
      },
      h('span', { class: 'atlas__boundary-label', text: boundary.label }),
    );
    mark.style.insetInlineStart = `${String(mid * 100)}%`;
    mark.style.insetBlockStart = `${String((y / VB_H) * 100)}%`;
    overlay.appendChild(mark);
  });

  return h(
    'section',
    { class: 'atlas' },
    h(
      'header',
      { class: 'atlas__head' },
      h('p', { class: 'atlas__kicker', text: 'Tổng quan' }),
      h('h1', { class: 'atlas__title', text: 'Một sợi, năm chặng' }),
      h('p', {
        class: 'atlas__lede',
        text: 'Chọn một chặng để đi vào. Chỗ hai đường cùng chạy là chỗ hai tiêu đề liền nhau dùng chung một ranh giới.',
      }),
    ),
    h('div', { class: 'atlas__stage' }, thread, overlay),
    chain(visited),
    onward(visited),
    h(
      'div',
      { class: 'atlas__foot' },
      h('p', {
        class: 'atlas__caption',
        text: 'Bản vẽ thể hiện thứ tự, độ dài tương đối và chỗ chồng lấn. Nó không phải một thước đo thời gian.',
      }),
      lensTrigger(
        {
          title: 'Bản vẽ này đọc như thế nào',
          items: [
            { label: 'Chiều ngang của một đường', value: 'Khoảng railStart–railEnd của chặng đó. Đây là lựa chọn trình bày của nhóm, không phải số đo lấy từ trích đoạn.', tone: 'plain' },
            { label: 'Hai đường cùng chạy', value: 'Hai tiêu đề liền nhau dùng chung một ranh giới, đúng như bản in.', tone: 'plain' },
            { label: 'Mối nối đứt nét', value: 'Ranh giới mờ giữa chặng 1 và chặng 2. Xem C2-R01.', tone: 'caution' },
            { label: 'Một chấm trên đường', value: 'Một bước ngoặt do chính trích đoạn ghi nhận.', tone: 'plain' },
            { label: 'Một vạch dưới đường', value: 'Một mốc thời gian được in trong chặng, giữ nguyên độ chính xác đã in.', tone: 'plain' },
            { label: 'Vị trí cụ thể của vạch và chấm', value: 'Chia đều trong chặng. Đây là cách vẽ, không phải thời điểm chính xác.', tone: 'caution' },
          ],
        },
        'Bản vẽ mã hoá điều gì?',
      ),
    ),
  );
}

/**
 * The five stages written out, with the joint between each pair named.
 *
 * The drawing above says how many stages there are, how long each runs and
 * where two of them overlap. What it cannot say is what any of them is about,
 * or what the joint between two of them is called - and "how the five relate to
 * one another" is the thing this screen exists to make legible. So the same
 * five stages are written here, each with the claim half of its own official
 * heading, and the shared boundary is printed between the two rows that use it.
 *
 * Nothing here is new content: the period, the claim and the boundary label are
 * all stored source material, and the count of turning points is a count of
 * entries the excerpt itself records.
 */
function chain(visited: readonly string[]): HTMLElement {
  const list = h('ol', { class: 'chain__list' });

  STAGES.forEach((stage, i) => {
    const turns = stage.turningPoints.length;

    list.appendChild(
      h(
        'li',
        {
          class: 'chain__item',
          dataset: { visited: visited.includes(stage.id) ? 'true' : 'false' },
        },
        h(
          'a',
          { class: 'chain__link', href: `#/chang/${stage.id}` },
          h('span', { class: 'chain__n', text: String(stage.ordinal), aria: { hidden: 'true' } }),
          h(
            'span',
            { class: 'chain__text' },
            h('span', { class: 'chain__period', aria: { hidden: 'true' }, text: stage.headingPeriod }),
            h('span', { class: 'chain__claim', aria: { hidden: 'true' }, text: stage.headingClaim }),
            h('span', { class: 'visually-hidden', text: stage.heading }),
          ),
          h('span', {
            class: 'chain__turns',
            text: turns === 1 ? '1 bước ngoặt' : `${String(turns)} bước ngoặt`,
          }),
        ),
      ),
    );

    const next = STAGES[i + 1];
    const boundary = BOUNDARIES[i];
    if (!next || !boundary) return;

    const risk = boundary.riskId ? RISK_BY_ID.get(boundary.riskId) : undefined;
    list.appendChild(
      h(
        'li',
        { class: 'chain__joint', dataset: { kind: boundary.kind } },
        h('span', {
          class: 'chain__joint-kind',
          text: boundary.kind === 'blurred' ? 'Ranh giới in mờ' : 'Ranh giới dùng chung',
        }),
        h('span', { class: 'chain__joint-label', text: boundary.label }),
        risk ? h('span', { class: 'chain__joint-risk', text: risk.id }) : null,
      ),
    );
  });

  return h(
    'section',
    { class: 'chain' },
    h('h2', { class: 'chain__title', text: 'Mỗi chặng nói gì, và nối với nhau ở đâu' }),
    list,
  );
}

/**
 * Where to go next.
 *
 * The overview previously ended at the diagram, so a viewer who had walked the
 * five stages had nowhere obvious to go, and the three activities had no link
 * anywhere in the product at all. This block names the next step and keeps the
 * way back visible.
 */
function onward(visited: readonly string[]): HTMLElement {
  const resume = nextUnvisited();
  const all = visited.length === STAGES.length;

  const cards = h('div', { class: 'onward__cards' });
  for (const entry of AFTER_STAGES) {
    cards.appendChild(
      h(
        'a',
        { class: 'onward__card', href: entry.route, dataset: { kind: entry.kind } },
        h('span', { class: 'onward__card-label', text: entry.label }),
        h('span', { class: 'onward__card-purpose', text: entry.purpose }),
      ),
    );
  }

  return h(
    'section',
    { class: 'onward' },
    h(
      'div',
      { class: 'onward__now' },
      h('h2', { class: 'onward__title', text: 'Bạn đang ở đâu' }),
      h('p', {
        class: 'onward__state',
        text: all
          ? `Đã mở cả ${String(STAGES.length)} chặng.`
          : `Đã mở ${String(visited.length)} trên ${String(STAGES.length)} chặng.`,
      }),
      resume
        ? h(
            'a',
            { class: 'btn btn--primary', href: `#/chang/${resume}` },
            h('span', {
              text: visited.length === 0 ? 'Vào chặng 1' : 'Đi tới chặng chưa mở',
            }),
          )
        : h('a', { class: 'btn btn--primary', href: '#/tong-hop' }, h('span', { text: 'Sang phần tổng hợp' })),
    ),
    cards,
  );
}

/** One focusable link per stage, laid over the drawing at its own position. */
function stageMark(stage: Stage, thread: SVGSVGElement): HTMLElement {
  const link = h(
    'a',
    { class: 'atlas__stage-link', href: `#/chang/${stage.id}`, dataset: { stage: stage.id } },
    h('span', { class: 'atlas__ordinal', text: String(stage.ordinal) }),
    h('span', { class: 'atlas__period', text: stage.headingPeriod, aria: { hidden: 'true' } }),
    // The exact heading is what assistive technology announces, so the short
    // period label is never the only name for the stage.
    h('span', { class: 'visually-hidden', text: stage.heading }),
  );

  link.style.insetInlineStart = `${String(stage.railStart * 100)}%`;
  link.style.insetBlockStart = `${String((levelFor(stage.ordinal) / VB_H) * 100)}%`;
  /*
   * How much room is left between this label's own start and the right edge of
   * the drawing. The stylesheet takes the smaller of this and its own maximum,
   * so a label near the end of the thread cannot run off the page - which is
   * what happened to stage 5 once the text was scaled up.
   */
  link.style.setProperty('--atlas-room', `${String((1 - stage.railStart) * 100)}%`);

  const highlight = (on: boolean): void => {
    const line = thread.querySelector<SVGPathElement>(`.thread__line[data-stage="${stage.id}"]`);
    if (line) line.dataset['hover'] = on ? 'true' : 'false';
  };
  link.addEventListener('pointerenter', () => {
    highlight(true);
  });
  link.addEventListener('pointerleave', () => {
    highlight(false);
  });
  link.addEventListener('focus', () => {
    highlight(true);
  });
  link.addEventListener('blur', () => {
    highlight(false);
  });

  return link;
}
