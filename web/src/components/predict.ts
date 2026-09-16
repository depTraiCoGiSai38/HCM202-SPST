import { COMPARE_AXES } from '../data/interactions';
import { STAGES, STAGE_BY_ID } from '../data/stages';
import type { CompareAxis, Stage, StageId } from '../data/types';
import { clear, h } from '../lib/dom';
import { lensTrigger, readLocator } from './evidence';

/**
 * A thinking beat before the reading begins.
 *
 * The problem this solves: the stage asks a question at its entrance and then
 * immediately starts answering it. A learner who is handed the answer straight
 * away never forms an expectation to compare it against, so there is nothing
 * for the reading to confirm or upset.
 *
 * The problem it must NOT solve by cheating: a guessing exercise needs wrong
 * options, and inventing a plausible-but-wrong sentence about the formation of
 * Hồ Chí Minh Thought would be exactly the fabrication the course documents put
 * in their most serious category. So nothing here is invented.
 *
 * Every option on screen is a real stored answer from `COMPARE_AXES` - the same
 * answers the comparison screen shows, each with its own location in the
 * excerpt. The task is not "true or false" but "which stage is this?": the
 * options that are wrong for THIS stage are right for another one, and the
 * feedback says which. That makes a wrong answer informative rather than merely
 * wrong, and it is the cross-stage relation the product exists to teach.
 *
 * Three further rules hold this in place:
 *
 *  - it is optional and shut by default. Reading is never gated behind it;
 *  - an axis whose answer for a stage records that the excerpt says nothing is
 *    never used, in either role. A blank is not a distractor;
 *  - there is no score, no streak and no praise. The feedback is the locators.
 */

export interface Quiz {
  axis: CompareAxis;
  /** The stage being asked about. */
  answerId: StageId;
  /** The stages whose answers are offered, in a fixed order. */
  options: StageId[];
}

/** An answer is usable only when the excerpt actually says something. */
function speaks(axis: CompareAxis, id: StageId): boolean {
  const a = axis.answers[id];
  return Boolean(a) && !a.caution;
}

/**
 * Pick the question for a stage, deterministically.
 *
 * Deterministic on purpose: the same stage must show the same question in a
 * rehearsal and at the Showcase. The rotation starts at a different axis per
 * stage so the five stages do not all ask the same thing.
 */
export function quizFor(stage: Stage): Quiz | null {
  const others = STAGES.filter((s) => s.id !== stage.id);

  for (let n = 0; n < COMPARE_AXES.length; n++) {
    const axis = COMPARE_AXES[(stage.ordinal - 1 + n) % COMPARE_AXES.length];
    if (!axis || !speaks(axis, stage.id)) continue;

    // Two other stages that also say something on this axis. Nearest first, so
    // the contrast is between neighbouring stages rather than the extremes.
    const distractors = others
      .filter((s) => speaks(axis, s.id))
      .sort((a, b) => Math.abs(a.ordinal - stage.ordinal) - Math.abs(b.ordinal - stage.ordinal))
      .slice(0, 2)
      .map((s) => s.id);

    if (distractors.length < 2) continue;

    // Fixed presentation order: by stage number, so the right answer is not
    // always in the same slot but is always in the same slot for this stage.
    const options = [stage.id, ...distractors].sort(
      (a, b) => (STAGE_BY_ID.get(a)?.ordinal ?? 0) - (STAGE_BY_ID.get(b)?.ordinal ?? 0),
    );

    return { axis, answerId: stage.id, options };
  }

  return null;
}

/**
 * The panel itself.
 *
 * Shut by default, and it says so on the trigger: this is an offer, not a gate.
 */
export function predictPanel(stage: Stage): HTMLElement | null {
  const found = quizFor(stage);
  if (!found) return null;
  // Bound once after the guard: `settle` below is a hoisted declaration, so the
  // narrowing on the original binding does not reach inside it.
  const quiz: Quiz = found;

  const body = h('div', { class: 'guess__body', hidden: true });
  const outcome = h('div', { class: 'guess__outcome', aria: { live: 'polite' } });
  let answered = false;

  const toggle = h(
    'button',
    {
      class: 'guess__toggle',
      type: 'button',
      aria: { expanded: 'false', controls: `guess-${stage.id}` },
    },
    h('span', { text: 'Thử đoán trước khi đọc' }),
    h('span', { class: 'guess__toggle-note', text: 'không bắt buộc' }),
  );
  body.id = `guess-${stage.id}`;

  toggle.addEventListener('click', () => {
    const open = body.hidden;
    body.hidden = !open;
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) body.querySelector<HTMLElement>('.guess__option')?.focus();
  });

  const list = h('div', { class: 'guess__options', role: 'group', aria: { label: quiz.axis.question } });

  function settle(picked: StageId, btn: HTMLButtonElement): void {
    const right = picked === quiz.answerId;
    const pickedStage = STAGE_BY_ID.get(picked);
    const thisStage = STAGE_BY_ID.get(quiz.answerId);
    if (!pickedStage || !thisStage) return;

    for (const other of list.querySelectorAll<HTMLButtonElement>('.guess__option')) {
      const id = other.dataset['stage'];
      other.dataset['state'] =
        id === quiz.answerId ? 'right' : id === picked ? 'wrong' : 'rest';
      // The answer is settled; keep the options readable but out of the tab
      // order so the keyboard moves on to the explanation.
      other.disabled = true;
    }
    btn.dataset['picked'] = 'true';

    const answer = quiz.axis.answers[quiz.answerId];
    const pickedAnswer = quiz.axis.answers[picked];

    clear(outcome);
    outcome.appendChild(
      h('p', {
        class: 'guess__verdict',
        dataset: { right: right ? 'true' : 'false' },
        text: right
          ? `Đúng — đó là câu trả lời của ${thisStage.headingPeriod.toLowerCase()}.`
          : `Câu bạn chọn là câu trả lời của ${pickedStage.headingPeriod.toLowerCase()}, không phải của chặng này.`,
      }),
    );

    if (!right) {
      outcome.appendChild(
        h(
          'p',
          { class: 'guess__where' },
          h('span', { class: 'guess__where-label', text: 'Của chặng này là' }),
          h('span', { text: answer.text }),
        ),
      );
    }

    outcome.appendChild(
      h(
        'p',
        { class: 'guess__locators' },
        h('span', { text: `Chặng này: ${readLocator(answer.at)}` }),
        right
          ? null
          : h('span', { text: ` · Câu bạn chọn: ${readLocator(pickedAnswer.at)}` }),
      ),
    );

    outcome.appendChild(
      h(
        'p',
        { class: 'guess__after' },
        h('span', { text: 'Giờ đọc chặng và đối chiếu. ' }),
        h('a', { href: '#/doi-sanh', text: 'Xem cả năm câu trả lời cho trục này' }),
      ),
    );

    answered = true;
  }

  for (const id of quiz.options) {
    const s = STAGE_BY_ID.get(id);
    const answer = quiz.axis.answers[id];
    if (!s || !answer) continue;

    const btn = h(
      'button',
      {
        class: 'guess__option',
        type: 'button',
        dataset: { stage: id, state: 'rest' },
        aria: { label: `Chọn: ${answer.text}` },
      },
      h('span', { class: 'guess__option-text', text: answer.text }),
    );
    btn.addEventListener('click', () => {
      if (answered) return;
      settle(id, btn);
    });
    list.appendChild(btn);
  }

  const reset = h('button', { class: 'guess__reset', type: 'button', text: 'Thử lại' });
  reset.addEventListener('click', () => {
    answered = false;
    clear(outcome);
    for (const other of list.querySelectorAll<HTMLButtonElement>('.guess__option')) {
      other.dataset['state'] = 'rest';
      delete other.dataset['picked'];
      other.disabled = false;
    }
    list.querySelector<HTMLElement>('.guess__option')?.focus();
  });

  body.appendChild(
    h(
      'p',
      { class: 'guess__lead' },
      h('span', { class: 'guess__lead-q', text: quiz.axis.question }),
      h('span', {
        class: 'guess__lead-hint',
        text: 'Ba câu dưới đây đều lấy từ trích đoạn, nhưng chỉ một câu là của chặng này.',
      }),
    ),
  );
  body.appendChild(list);
  body.appendChild(outcome);
  body.appendChild(
    h(
      'div',
      { class: 'guess__acts' },
      reset,
      lensTrigger(
        {
          title: 'Ba câu này lấy từ đâu',
          items: [
            { label: 'Trạng thái của trục câu hỏi', value: 'PROJECT DECISION', tone: 'status' },
            {
              label: 'Nghĩa là',
              value:
                'Câu hỏi đối sánh là do nhóm đặt, và mỗi câu trả lời là cách nhóm tóm tắt phần mà chặng đó in. Không câu nào được bịa ra để làm đáp án sai: mỗi câu đều là câu trả lời thật của một chặng, kèm vị trí trong trích đoạn.',
              tone: 'caution',
            },
            { label: 'Trục câu hỏi', value: quiz.axis.question, tone: 'plain' },
            {
              label: 'Các chặng được đưa ra',
              value: quiz.options
                .map((id) => {
                  const s = STAGE_BY_ID.get(id);
                  const a = quiz.axis.answers[id];
                  return s && a ? `Chặng ${String(s.ordinal)} — ${readLocator(a.at)}` : '';
                })
                .filter(Boolean)
                .join('; '),
              tone: 'locator',
            },
          ],
        },
        'Ba câu này của ai?',
      ),
    ),
  );

  // No provenance flag on the trigger: the entry question above already carries
  // one, and a second would suggest the offer itself is an interpretation. The
  // provenance of the three sentences sits inside, on the magnifier, where the
  // sentences are.
  return h('div', { class: 'guess' }, h('p', { class: 'guess__head' }, toggle), body);
}
