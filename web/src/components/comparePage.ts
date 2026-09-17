import { auditRef, citeSource } from '../data/source';
import { COMPARE_AXES } from '../data/interactions';
import { continueJourney, whatNext } from './whatnext';
import { STAGES, STAGE_BY_ID } from '../data/stages';
import type { CompareAxis, SourceRef, StageId } from '../data/types';
import { clear, h } from '../lib/dom';
import { brief } from './brief';
import { type EvidenceItem, lensTrigger, readLocator } from './evidence';
import { compareThread } from './thread';

/**
 * One question, two places on the thread.
 *
 * The viewer picks a comparison axis and two stages. The two answers appear at
 * the positions those stages occupy on the journey, on two segments of the same
 * thread, so the distance between them is spatial rather than asserted.
 *
 * Nothing on this screen analyses the two answers. No keyword is highlighted,
 * no difference is computed: any such reading would be a new claim about the
 * source. The screen puts the two answers where they belong and stops there.
 *
 * Provenance, stated once at the top of the screen: the axes are questions the
 * group wrote, and each answer is the group's compression of what that stage
 * prints. See the note on COMPARE_AXES in src/data/interactions.ts.
 */

const AXIS_NOTE =
  'Bốn trục câu hỏi dưới đây do nhóm đặt ra để đối chiếu năm chặng. Trích đoạn không in sẵn những câu hỏi này, và mỗi câu trả lời là cách nhóm tóm tắt phần mà chặng đó in.';

/**
 * The comparison screen.
 *
 * `pair` arrives from the address when the journey invited the learner here -
 * after stage 2 the invitation compares the two stages just walked. Anything
 * that is not a real stage id is ignored rather than trusted, and the defaults
 * stand.
 */
export function comparePage(pair?: { left?: string | undefined; right?: string | undefined }): HTMLElement {
  const known = (id: string | undefined): StageId | null =>
    id && STAGE_BY_ID.has(id as StageId) ? (id as StageId) : null;

  let axis: CompareAxis = COMPARE_AXES[0] as CompareAxis;
  let left: StageId = known(pair?.left) ?? 'ky-1';
  let right: StageId = known(pair?.right) ?? 'ky-3';
  // Comparing a stage with itself says nothing; fall back rather than render it.
  if (left === right) {
    left = 'ky-1';
    right = 'ky-3';
  }

  const axisRow = h('div', { class: 'duo__axes', role: 'group' });
  const board = h('div', { class: 'duo__board' });
  const live = h('p', { class: 'visually-hidden', aria: { live: 'polite' } });

  function render(): void {
    clear(board);

    const a = STAGE_BY_ID.get(left);
    const b = STAGE_BY_ID.get(right);
    if (!a || !b) return;

    const ansA = axis.answers[left];
    const ansB = axis.answers[right];

    board.appendChild(
      h(
        'p',
        { class: 'duo__question' },
        h('span', { class: 'duo__q-mark', text: '?', aria: { hidden: 'true' } }),
        h('span', { text: axis.question }),
      ),
    );

    // The two segments, drawn at the positions these stages occupy on the
    // journey. Everything the drawing says comes from railStart/railEnd.
    board.appendChild(compareThread(a, b));

    const side = (
      stage: typeof a,
      answer: { text: string; at: SourceRef; caution?: string },
      which: 'a' | 'b',
    ): HTMLElement => {
      const items: EvidenceItem[] = [
        { label: 'Trục đối sánh', value: axis.question, tone: 'plain' },
        { label: 'Trạng thái của câu trả lời', value: 'PROJECT DECISION', tone: 'status' },
        {
          label: 'Nghĩa là',
          value:
            'Câu trả lời này là cách nhóm tóm tắt phần mà chặng đó in, không phải câu in nguyên văn trong trích đoạn.',
          tone: 'caution',
        },
        { label: 'Nguồn', value: citeSource(answer.at), tone: 'locator' },
        { label: 'Vị trí, nguyên dạng lưu trữ', value: auditRef(answer.at), tone: 'plain' },
        { label: 'Tiêu đề chính thức của chặng', value: stage.heading, tone: 'plain' },
      ];
      if (answer.caution) items.push({ label: 'Lưu ý', value: answer.caution, tone: 'caution' });

      return h(
        'article',
        { class: 'duo__side', dataset: { which } },
        h(
          'p',
          { class: 'duo__side-head' },
          h('span', { class: 'duo__ord', text: String(stage.ordinal) }),
          h('span', { class: 'duo__period', text: stage.headingPeriod }),
          h('span', { class: 'visually-hidden', text: stage.heading }),
        ),
        h('p', { class: 'duo__answer', text: answer.text }),
        h(
          'div',
          { class: 'duo__side-foot' },
          answer.caution
            ? h('span', { class: 'station__flag', text: 'trích đoạn không nói' })
            : null,
          lensTrigger({ title: `Chặng ${String(stage.ordinal)}`, items }, readLocator(answer.at)),
        ),
      );
    };

    const pair = h('div', { class: 'duo__pair' });
    if (ansA) pair.appendChild(side(a, ansA, 'a'));
    if (ansB) pair.appendChild(side(b, ansB, 'b'));
    board.appendChild(pair);

    // The closing line is the group's reading of the two answers, so it is
    // labelled as such wherever it appears.
    board.appendChild(
      left === right
        ? h('p', {
            class: 'duo__read',
            text: 'Bạn đang so sánh một chặng với chính nó. Chọn hai chặng khác nhau để thấy chỗ đổi hướng.',
          })
        : h(
            'div',
            { class: 'duo__read-block' },
            h(
              'p',
              { class: 'turn__shift-label' },
              h('span', { text: 'Nhóm đọc hai câu trả lời này' }),
              h('span', { class: 'station__flag', text: 'DIỄN GIẢI CỦA NHÓM' }),
            ),
            h('p', {
              class: 'duo__read',
              text: `Cùng một câu hỏi, nhưng câu trả lời của ${a.headingPeriod.toLowerCase()} và của ${b.headingPeriod.toLowerCase()} không giống nhau.`,
            }),
            lensTrigger(
              {
                title: 'Câu kết luận này của ai',
                items: [
                  { label: 'Trạng thái', value: 'PROJECT DECISION', tone: 'status' },
                  {
                    label: 'Nghĩa là',
                    value:
                      'Nhóm đặt hai câu trả lời cạnh nhau và nhận xét rằng chúng khác nhau. Trích đoạn không viết câu nhận xét này. Màn hình không tự phân tích chỗ khác nhau, vì làm vậy sẽ tạo thêm một diễn giải nữa.',
                    tone: 'caution',
                  },
                ],
              },
              'Câu này của ai?',
            ),
          ),
    );

    live.textContent = `Đang đối sánh ${a.headingPeriod} với ${b.headingPeriod} trên trục: ${axis.question}`;
  }

  for (const ax of COMPARE_AXES) {
    const btn = h('button', {
      class: 'duo__axis',
      type: 'button',
      text: ax.question,
      aria: { pressed: ax.id === axis.id ? 'true' : 'false' },
    });
    btn.addEventListener('click', () => {
      axis = ax;
      for (const other of axisRow.querySelectorAll('.duo__axis')) {
        other.setAttribute('aria-pressed', other === btn ? 'true' : 'false');
      }
      render();
    });
    axisRow.appendChild(btn);
  }

  const picker = (
    label: string,
    initial: StageId,
    onPick: (id: StageId) => void,
  ): HTMLElement => {
    const row = h('div', { class: 'duo__picker', role: 'group', aria: { label } });
    row.appendChild(h('span', { class: 'duo__picker-label', text: label }));
    for (const stage of STAGES) {
      const btn = h('button', {
        class: 'duo__pick',
        type: 'button',
        text: String(stage.ordinal),
        aria: {
          pressed: stage.id === initial ? 'true' : 'false',
          label: `${label}: chặng ${String(stage.ordinal)}, ${stage.headingPeriod}`,
        },
      });
      btn.addEventListener('click', () => {
        onPick(stage.id);
        for (const other of row.querySelectorAll('.duo__pick')) {
          other.setAttribute('aria-pressed', other === btn ? 'true' : 'false');
        }
        render();
      });
      row.appendChild(btn);
    }
    return row;
  };

  const section = h(
    'section',
    { class: 'duo' },
    h(
      'header',
      { class: 'duo__head' },
      h('p', { class: 'atlas__kicker', text: 'Đối sánh' }),
      h('h1', { class: 'atlas__title', text: 'Cùng một câu hỏi, hai chỗ trên sợi chỉ' }),
      brief('doi-sanh'),
      h(
        'p',
        { class: 'duo__note' },
        h('span', { class: 'station__flag', text: 'DIỄN GIẢI CỦA NHÓM' }),
        h('span', { text: AXIS_NOTE }),
      ),
    ),
    h('p', { class: 'duo__axes-label', text: 'Chọn một trục câu hỏi' }),
    axisRow,
    h(
      'div',
      { class: 'duo__pickers' },
      picker('Chặng bên trái', left, (id) => {
        left = id;
      }),
      picker('Chặng bên phải', right, (id) => {
        right = id;
      }),
    ),
    board,
    live,
    whatNext({
      lead: 'Cùng một câu hỏi, hai chặng, hai câu trả lời khác nhau — đó là điều trích đoạn ghi lại.',
      primary: continueJourney(),
      secondary: { label: 'Nối trải nghiệm với nhận thức', href: '#/noi-ket' },
    }),
  );

  render();
  return section;
}
