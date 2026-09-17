import { CENTRAL_QUESTION, CORE_MESSAGE, CORE_MESSAGE_STATUS } from '../data/project';
import { whatNext } from './whatnext';
import { BOUNDARIES, STAGES } from '../data/stages';
import type { Stage, StageId } from '../data/types';
import { clear, h } from '../lib/dom';
import { brief } from './brief';
import { lensTrigger } from './evidence';
import { synthesisThread } from './thread';

/**
 * Rebuilding the thread.
 *
 * Five segments, one per stage, each carrying its exact official heading. The
 * viewer places them in order; when the order is right the segments join into
 * one continuous line, and only then does the Central Question come back.
 *
 * The segments are offered in a fixed order rather than a shuffled one: the
 * same screen has to behave identically in a rehearsal and at the Showcase.
 */

/** A fixed presentation order, chosen once so the screen is reproducible. */
const BANK_ORDER: StageId[] = ['ky-3', 'ky-1', 'ky-5', 'ky-2', 'ky-4'];

/** The dated joints between consecutive headings, as the 2019 edition prints them. */
function boundaryLabels(): string {
  return BOUNDARIES.map((b) => b.label).join(', ');
}

export function synthesisPage(): HTMLElement {
  const placed: (Stage | null)[] = [null, null, null, null, null];
  let picked: Stage | null = null;

  const thread = synthesisThread();
  const slots = h('ol', { class: 'weave__slots' });
  const bank = h('div', { class: 'weave__bank' });
  const outcome = h('div', { class: 'weave__outcome', aria: { live: 'polite' } });

  const isComplete = (): boolean => placed.every((s) => s !== null);
  const isCorrect = (): boolean => placed.every((s, i) => s?.ordinal === i + 1);

  function paintThread(): void {
    for (let i = 0; i < 5; i++) {
      const seg = thread.querySelector<SVGElement>(`.weave__seg[data-slot="${String(i)}"]`);
      if (!seg) continue;
      const stage = placed[i];
      seg.dataset['state'] = !stage ? 'empty' : stage.ordinal === i + 1 ? 'right' : 'wrong';
    }
    thread.dataset['joined'] = isComplete() && isCorrect() ? 'true' : 'false';
  }

  /**
   * Where focus should land after the board is rebuilt.
   *
   * Placing, lifting or picking a segment re-creates both the slot list and the
   * bank, detaching the control the keyboard was standing on. Each call names
   * its successor so focus follows the action instead of falling to the body.
   */
  type Refocus =
    | { kind: 'slot'; index: number }
    | { kind: 'piece'; id: StageId }
    | { kind: 'done' }
    | { kind: 'first' }
    | null;

  function restore(want: Refocus): void {
    if (!want) return;

    if (want.kind === 'done') {
      // The payoff: put the reader on the result, not back in the controls.
      outcome.querySelector<HTMLElement>('.weave__question')?.focus();
      return;
    }

    const el =
      want.kind === 'slot'
        ? slots.querySelector<HTMLElement>(
            `.weave__slot[data-slot="${String(want.index)}"] .weave__slot-btn`,
          )
        : want.kind === 'piece'
          ? [...bank.querySelectorAll<HTMLElement>('.weave__piece')].find(
              (b) => b.dataset['stage'] === want.id,
            )
          : bank.querySelector<HTMLElement>('.weave__piece');

    // A segment placed into the last empty slot leaves nothing in the bank, so
    // fall back to any live control rather than focusing a detached one.
    (el ?? bank.querySelector<HTMLElement>('.weave__piece') ?? slots.querySelector<HTMLElement>('.weave__slot-btn'))?.focus();
  }

  function render(want: Refocus = null): void {
    clear(slots);
    clear(bank);
    clear(outcome);

    for (let i = 0; i < 5; i++) {
      const stage = placed[i];

      const btn = h(
        'button',
        {
          class: 'weave__slot-btn',
          type: 'button',
          aria: {
            label: stage
              ? `Vị trí ${String(i + 1)}: ${stage.heading}. Bấm để lấy ra.`
              : `Vị trí ${String(i + 1)}, còn trống.`,
          },
        },
        h('span', { class: 'weave__slot-n', text: String(i + 1) }),
        stage
          ? h('span', { class: 'weave__slot-text', text: stage.heading })
          : h('span', {
              class: 'weave__slot-text weave__slot-text--empty',
              text: 'Đặt một đoạn vào đây',
            }),
      );

      btn.addEventListener('click', () => {
        if (stage) {
          // Lifting a segment out sends it back to the bank; follow it there.
          placed[i] = null;
          render({ kind: 'piece', id: stage.id });
          return;
        }
        if (picked) {
          placed[i] = picked;
          picked = null;
          render(
            placed.every((p, k) => p?.ordinal === k + 1) ? { kind: 'done' } : { kind: 'slot', index: i },
          );
        }
      });

      const slot = h(
        'li',
        {
          class: 'weave__slot',
          dataset: {
            slot: String(i),
            state: !stage ? 'empty' : stage.ordinal === i + 1 ? 'right' : 'wrong',
          },
        },
        btn,
      );
      slots.appendChild(slot);
    }

    for (const id of BANK_ORDER) {
      const stage = STAGES.find((s) => s.id === id);
      if (!stage) continue;
      if (placed.some((p) => p?.id === stage.id)) continue;

      const chip = h(
        'button',
        {
          class: 'weave__piece',
          type: 'button',
          dataset: { stage: stage.id },
          aria: {
            pressed: picked?.id === stage.id ? 'true' : 'false',
            label: `Đoạn: ${stage.heading}`,
          },
        },
        h('span', { class: 'weave__piece-line', aria: { hidden: 'true' } }),
        h('span', { class: 'weave__piece-text', text: stage.heading }),
      );
      chip.addEventListener('click', () => {
        picked = picked?.id === stage.id ? null : stage;
        render({ kind: 'piece', id: stage.id });
      });
      bank.appendChild(chip);
    }

    if (bank.childElementCount === 0) {
      const wrong = placed.filter((s, i) => s !== null && s.ordinal !== i + 1).length;
      bank.appendChild(
        h('p', {
          class: 'weave__bank-empty',
          text: isCorrect()
            ? 'Năm đoạn đã nối thành một đường liền.'
            : wrong === 1
              ? 'Đã đặt hết, còn một đoạn chưa đúng chỗ. Mỗi tiêu đề mở đầu bằng mốc thời gian của chính nó — đọc mốc ấy để biết đoạn nào đứng trước. Bấm vào một đoạn để lấy ra và thử lại.'
              : `Đã đặt hết, còn ${String(wrong)} đoạn chưa đúng chỗ. Mỗi tiêu đề mở đầu bằng mốc thời gian của chính nó — đọc mốc ấy để biết đoạn nào đứng trước. Bấm vào một đoạn để lấy ra và thử lại.`,
        }),
      );
    }

    paintThread();
    const finished = isComplete() && isCorrect();

    if (finished) {
      outcome.appendChild(
        h(
          'div',
          { class: 'weave__done' },
          // Why the five make one line rather than five, said with the joints
          // the excerpt itself prints between consecutive headings.
          h('p', { class: 'atlas__kicker', text: 'Vì sao năm đoạn là một đường' }),
          h('p', {
            class: 'weave__why',
            text: `Bốn mối nối giữa năm chặng đều là hai ngày kế tiếp nhau — ${boundaryLabels()} — nên mỗi chỗ nối là một vết cắt xác định, không phải một khoảng chồng lấn.`,
          }),
          h('p', { class: 'atlas__kicker', text: 'Trở lại câu hỏi trung tâm' }),
          // Focusable so the keyboard lands on the result, not past it.
          h('p', { class: 'weave__question', tabIndex: -1, text: CENTRAL_QUESTION }),
          h(
            'p',
            { class: 'turn__shift-label' },
            h('span', { text: 'Thông điệp cốt lõi của nhóm' }),
            h('span', { class: 'station__flag', text: 'DIỄN GIẢI CỦA NHÓM' }),
          ),
          h('p', { class: 'weave__message', text: CORE_MESSAGE }),
          lensTrigger(
            {
              title: 'Thông điệp cốt lõi',
              items: [
                { label: 'Trạng thái', value: CORE_MESSAGE_STATUS, tone: 'status' },
                {
                  label: 'Nghĩa là',
                  value:
                    'Đây là câu do nhóm viết để tóm tắt trích đoạn trong một câu. Nó chưa được người xem và giảng viên xác nhận.',
                  tone: 'caution',
                },
              ],
            },
            'Câu này đã được xác nhận chưa?',
          ),
        ),
      );
    }

    restore(want);
  }

  const reset = h('button', { class: 'btn', type: 'button', text: 'Làm lại' });
  reset.addEventListener('click', () => {
    placed.fill(null);
    picked = null;
    // The reset button itself survives the rebuild, but the first segment is
    // where the viewer starts again.
    render({ kind: 'first' });
  });

  const section = h(
    'section',
    { class: 'weave' },
    h(
      'header',
      { class: 'weave__head' },
      h('p', { class: 'atlas__kicker', text: 'Tổng hợp' }),
      h('h1', { class: 'atlas__title', text: 'Dựng lại sợi chỉ từ năm đoạn' }),
      brief('tong-hop'),
      h('p', {
        class: 'atlas__lede',
        text: 'Mỗi đoạn mang nguyên văn một tiêu đề chính thức. Đặt năm đoạn đúng trình tự thì chúng nối thành một đường liền.',
      }),
    ),
    thread,
    slots,
    bank,
    h('div', { class: 'weave__actions' }, reset),
    outcome,
    whatNext({
      lead: 'Năm chặng đã dựng lại thành một đường. Câu hỏi trung tâm ở màn mở đầu là nơi hành trình này bắt đầu và kết thúc.',
      primary: { label: 'Trở về câu hỏi dẫn đường', href: '#/' },
      secondary: { label: 'Xem điểm cần kiểm chứng', href: '#/kiem-chung' },
    }),
  );

  render();
  return section;
}
