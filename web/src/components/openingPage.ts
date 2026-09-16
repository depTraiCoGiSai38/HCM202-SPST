import {
  AFTER_STAGES,
  CENTRAL_QUESTION,
  CENTRAL_QUESTION_STATUS,
  SECTION_HEADING,
  SECTION_HEADING_AT,
} from '../data/project';
import { FIGURE_SLOTS } from '../data/figures';
import { STAGES, STAGE_BY_ID } from '../data/stages';
import { figureSlot } from './figure';
import { h } from '../lib/dom';
import { getVisited, motionSuppressed, nextUnvisited } from '../lib/state';
import { lensTrigger } from './evidence';
import { openingThread } from './thread';

/**
 * The opening scene.
 *
 * One question, one drawing, one way forward. The verification apparatus is not
 * deleted from this screen - it is one keystroke away on the magnifier - but it
 * no longer greets the viewer as a wall of status labels.
 *
 * The drawing is the five-stage thread itself, so the structure of the whole
 * product is legible before the viewer has read a single passage.
 *
 * Beside the question stands a named list of the five stages. The drawing alone
 * showed that there are five of something and that they descend; it could not
 * say what they are. Someone arriving for the first time needs to know what
 * they are about to explore before they are asked to start, and the five exact
 * headings are the only honest answer to that - so they are here, in the same
 * shortened-label-plus-full-heading form the rail and the overview use.
 */

const OPEN_SLOT = FIGURE_SLOTS.find((s) => s.id === 'FS-open') ?? {
  id: 'FS-open',
  stageId: null,
  role: 'Ảnh dẫn nhập ở màn mở đầu.',
};

export function openingPage(): HTMLElement {
  const thread = openingThread();
  const visited = getVisited();
  const resumeAt = visited.length > 0 ? nextUnvisited() : null;
  // Where the one primary action leads: the first stage not yet opened, or
  // stage one for someone arriving for the first time.
  const entryStage = (resumeAt ? STAGE_BY_ID.get(resumeAt) : undefined) ?? STAGES[0];
  if (!entryStage) throw new Error('No stages');

  const scene = h(
    'section',
    { class: 'scene' },
    h(
      'div',
      { class: 'scene__grid' },
      h(
        'div',
        { class: 'scene__type' },
        h(
          'p',
          { class: 'scene__kicker' },
          h('span', { text: SECTION_HEADING }),
          h('span', { class: 'scene__at', text: SECTION_HEADING_AT }),
        ),
        centralQuestion(),
        /*
         * One concrete first action.
         *
         * "Bắt đầu hành trình" named no destination and led to a map, so the
         * first click bought orientation rather than progress. The primary
         * action now names the stage it opens and goes there; the map stays,
         * one step to the side, for anyone who wants to see the shape first.
         */
        h(
          'div',
          { class: 'scene__act' },
          h(
            'a',
            { class: 'btn btn--primary btn--lg scene__go', href: `#/chang/${entryStage.id}` },
            h('span', {
              class: 'scene__go-lead',
              text: visited.length > 0
                ? `Tiếp tục · chặng ${String(entryStage.ordinal)}`
                : `Bắt đầu · chặng ${String(entryStage.ordinal)}`,
            }),
            h('span', { class: 'scene__go-name', text: entryStage.headingPeriod }),
            h('span', { class: 'visually-hidden', text: `. ${entryStage.heading}` }),
          ),
          h(
            'a',
            { class: 'btn scene__map', href: '#/hanh-trinh' },
            h('span', { text: 'Xem bản đồ năm chặng' }),
          ),
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
                { label: 'Vị trí', value: SECTION_HEADING_AT, tone: 'locator' },
              ],
            },
            'Câu hỏi này đã được duyệt chưa?',
          ),
        ),
        // Where the viewer left off, offered only once there is somewhere to
        // return to. It never claims a stage was understood, only opened.
        // Progress only. Where to go next is the primary action above, so this
        // no longer repeats it as a second link.
        visited.length > 0
          ? h('p', {
              class: 'scene__resume',
              text: resumeAt
                ? `Bạn đã mở ${String(visited.length)} trên ${String(STAGES.length)} chặng.`
                : `Bạn đã mở cả ${String(STAGES.length)} chặng.`,
            })
          : null,
      ),
      // On one column the named stages come before the instructions: knowing
      // what is in the product matters more than knowing how to work it.
      preview(),
      howToRead(),
    ),
    h('div', { class: 'scene__draw' }, thread),
  );

  // The thread draws itself in only when motion is allowed. When it is not, it
  // is already in its final drawn state - nothing here is revealed only by
  // animation.
  //
  // The draw is animated directly rather than through a CSS transition on a
  // `pathLength`-normalised dash: that form rendered the run short in Chrome,
  // leaving the last stage missing. Here the dash is measured from the path and
  // removed again once the animation finishes, so the resting state is simply a
  // solid line with no dash arithmetic left in it.
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
 * The three moves the product asks of a reader, said before it asks for any of
 * them. `PROJECT DECISION`: it describes this product's own shape, so it needs
 * no locator and makes no claim about the source.
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
 * Each row shows the period part of the exact heading, as the rail and the
 * overview do, and carries the full official heading for assistive technology
 * so the shortened form is never the only name for a stage.
 */
function preview(): HTMLElement {
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
            h('span', { class: 'scene__stage-period', aria: { hidden: 'true' }, text: stage.headingPeriod }),
            h('span', { class: 'scene__stage-claim', aria: { hidden: 'true' }, text: stage.headingClaim }),
            h('span', { class: 'visually-hidden', text: stage.heading }),
          ),
        ),
      ),
    );
  }

  return h(
    'aside',
    { class: 'scene__aside', aria: { label: 'Năm chặng bạn sẽ đi qua' } },
    h('p', { class: 'scene__aside-label', text: 'Bạn sẽ đi qua' }),
    list,
    // The documentary position for this screen, beside the question rather than
    // under the whole page. It holds a photograph once one has cleared its
    // source and its usage condition, and says so plainly while none has.
    h('div', { class: 'scene__figure' }, figureSlot('FS-open', OPEN_SLOT.role)),
  );
}

/**
 * The Central Question, set in two movements.
 *
 * The sentence turns on `mà được`: what the process is NOT, then what it IS.
 * Typography is allowed to show that hinge, so the viewer reads a question
 * rather than a wall. The text is never cut, reordered or rewritten - the two
 * spans concatenate back to the stored string exactly, which a unit test
 * checks, and assistive technology reads the whole sentence as one heading.
 */
const HINGE = 'mà được hình thành';

function centralQuestion(): HTMLElement {
  const at = CENTRAL_QUESTION.indexOf(HINGE);
  if (at < 0) {
    return h('h1', { class: 'scene__question', text: CENTRAL_QUESTION });
  }

  return h(
    'h1',
    { class: 'scene__question' },
    h('span', { class: 'scene__q-lead', text: CENTRAL_QUESTION.slice(0, at) }),
    h('span', { class: 'scene__q-rest', text: CENTRAL_QUESTION.slice(at) }),
  );
}
