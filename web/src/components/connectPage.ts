import { auditRef, citeSource } from '../data/source';
import { EXPERIENCE_LINKS } from '../data/interactions';
import { continueJourney, whatNext } from './whatnext';
import { STAGES, STAGE_BY_ID } from '../data/stages';
import type { ExperienceLink, StageId } from '../data/types';
import { clear, h } from '../lib/dom';
import { motionSuppressed } from '../lib/state';
import { brief } from './brief';
import { type EvidenceItem, lensTrigger, readLocator } from './evidence';

/**
 * Joining an experience to the recognition the excerpt attaches to it.
 *
 * The viewer picks a stage and works through that stage's pairs. Choosing a
 * practice and then a recognition joins the two ends into one continuous piece
 * of thread, and the location in the excerpt appears with it.
 *
 * On which pairs are offered: all twelve, arranged by stage. An earlier version
 * used `EXPERIENCE_LINKS.slice(0, 8)`, which silently dropped every pair in
 * stage 5 and one in stage 4 for no stated reason. Taking the first n of an
 * array is not a selection anyone can defend, so the selection is gone: every
 * stage offers its own pairs, and all twelve are reachable.
 *
 * This is not a test. There is no score, no timer and no ranking - a wrong
 * attempt says so and lets the viewer try again.
 */

const BY_STAGE = new Map<StageId, ExperienceLink[]>(
  STAGES.map((s) => [s.id, EXPERIENCE_LINKS.filter((l) => l.stageId === s.id)]),
);

/**
 * Why a pairing missed, rather than only that it missed.
 *
 * "Chưa khớp" tells a learner they were wrong and leaves them to guess again.
 * What they actually need is the method: the excerpt puts each recognition next
 * to the practice that produced it, so the place to look is the location. Both
 * locations are stored data, so naming them adds nothing to the source - and it
 * points at the excerpt rather than handing over the answer.
 */
function missReason(picked: ExperienceLink, chosen: ExperienceLink): string {
  if (auditRef(picked.at) !== auditRef(chosen.at)) {
    return `Chưa khớp. Trải nghiệm bạn đang giữ nằm ở ${readLocator(picked.at)}, còn nhận thức vừa chọn nằm ở ${readLocator(chosen.at)}. Trích đoạn đặt mỗi nhận thức ngay cạnh việc đã làm ra nó, nên hai vị trí khác nhau là dấu hiệu chúng không đi cùng nhau.`;
  }
  return `Chưa khớp. Hai mục cùng nằm ở ${readLocator(picked.at)}, nên hãy đọc lại thứ tự câu trong đoạn: nhận thức đi liền sau việc đã làm ra nó, không phải sau việc kế tiếp.`;
}

export function connectPage(): HTMLElement {
  let stageId: StageId = 'ky-1';
  let pickedExperience: string | null = null;
  const joined = new Set<string>();

  const board = h('div', { class: 'join__board' });
  const status = h('p', { class: 'join__status', aria: { live: 'polite' } });
  const tabs = h('div', { class: 'join__stages', role: 'group', aria: { label: 'Chọn chặng' } });

  function pairs(): ExperienceLink[] {
    return BY_STAGE.get(stageId) ?? [];
  }

  function evidenceFor(link: ExperienceLink): EvidenceItem[] {
    const items: EvidenceItem[] = [
      { label: 'Mã cặp', value: link.id, tone: 'plain' },
      { label: 'Nguồn', value: citeSource(link.at), tone: 'locator' },
      { label: 'Vị trí, nguyên dạng lưu trữ', value: auditRef(link.at), tone: 'plain' },
      { label: 'Trạng thái của cách ghép cặp', value: 'PROJECT DECISION', tone: 'status' },
      {
        label: 'Nghĩa là',
        value:
          'Trích đoạn có đặt trải nghiệm này cạnh nhận thức này, nhưng cách chia thành từng cặp và cách rút gọn câu chữ là của nhóm.',
        tone: 'caution',
      },
    ];
    if (link.caution) items.push({ label: 'Lưu ý', value: link.caution, tone: 'caution' });
    return items;
  }

  /**
   * Where focus should land after the board is rebuilt.
   *
   * Every interaction here clears and re-creates the board, which detaches the
   * button the keyboard was standing on and drops focus to the document. Each
   * call therefore names its successor, and the rebuild restores it.
   */
  type Refocus =
    | { kind: 'end'; id: string; side: 'experience' | 'recognition' }
    | { kind: 'lens'; id: string }
    | { kind: 'first' }
    | null;

  function restore(want: Refocus): void {
    if (!want) return;
    const sel =
      want.kind === 'end'
        ? `.join__row[data-id="${want.id}"] .join__end[data-side="${want.side}"]`
        : want.kind === 'lens'
          ? `.join__row[data-id="${want.id}"] .join__found .lens-trigger`
          : '.join__end[data-side="experience"]';
    const el = board.querySelector<HTMLElement>(sel);
    // A joined row disables both its ends, so fall back to the next live
    // control rather than focusing something that cannot take it.
    const target =
      el && !(el as HTMLButtonElement).disabled
        ? el
        : board.querySelector<HTMLElement>('.join__end:not(:disabled), .lens-trigger');
    target?.focus();
  }

  function render(want: Refocus = null): void {
    clear(board);
    const list = pairs();

    const done = list.filter((l) => joined.has(l.id)).length;
    status.textContent =
      done === list.length
        ? `Đã nối xong ${String(list.length)} cặp của chặng này.`
        : `Chọn một trải nghiệm bên trái, rồi chọn nhận thức mà trích đoạn gắn vào nó. Đã nối ${String(done)} trên ${String(list.length)}.`;

    for (const link of list) {
      const isJoined = joined.has(link.id);

      const row = h('div', {
        class: 'join__row',
        dataset: { state: isJoined ? 'joined' : 'open', id: link.id },
      });

      const left = h(
        'button',
        {
          class: 'join__end',
          type: 'button',
          dataset: { side: 'experience' },
          disabled: isJoined,
          aria: {
            pressed: pickedExperience === link.id ? 'true' : 'false',
            label: `Trải nghiệm: ${link.experience}`,
          },
        },
        h('span', { class: 'join__end-label', text: 'Trải nghiệm' }),
        h('span', { class: 'join__end-text', text: link.experience }),
      );

      const right = h(
        'button',
        {
          class: 'join__end',
          type: 'button',
          dataset: { side: 'recognition' },
          disabled: isJoined,
          aria: { label: `Nhận thức: ${link.recognition}` },
        },
        h('span', { class: 'join__end-label', text: 'Nhận thức' }),
        h('span', { class: 'join__end-text', text: link.recognition }),
      );

      // The joint between the two ends: slack thread while they are apart,
      // one taut line once they are joined.
      const seam = h('span', { class: 'join__seam', aria: { hidden: 'true' } });

      left.addEventListener('click', () => {
        pickedExperience = pickedExperience === link.id ? null : link.id;
        render({ kind: 'end', id: link.id, side: 'experience' });
      });

      right.addEventListener('click', () => {
        if (!pickedExperience) {
          status.textContent = 'Chọn một trải nghiệm bên trái trước.';
          return;
        }
        if (pickedExperience === link.id) {
          joined.add(link.id);
          pickedExperience = null;
          // Both ends of this row are now disabled; the locator that just
          // appeared is the meaningful next thing to land on.
          render({ kind: 'lens', id: link.id });
          return;
        }
        // Wrong pairing: say why, keep the choice, let them try again.
        const held = list.find((l) => l.id === pickedExperience);
        row.dataset['state'] = 'missed';
        status.textContent = held
          ? missReason(held, link)
          : 'Chưa khớp. Trích đoạn gắn nhận thức này vào một trải nghiệm khác.';
        if (!motionSuppressed()) {
          window.setTimeout(() => {
            if (row.isConnected && row.dataset['state'] === 'missed') row.dataset['state'] = 'open';
          }, 900);
        } else {
          row.dataset['state'] = 'open';
        }
      });

      row.appendChild(left);
      row.appendChild(seam);
      row.appendChild(right);

      if (isJoined) {
        row.appendChild(
          h(
            'p',
            { class: 'join__found' },
            h('span', { class: 'join__found-mark', text: '—', aria: { hidden: 'true' } }),
            lensTrigger({ title: link.id, items: evidenceFor(link) }, readLocator(link.at)),
          ),
        );
      }

      board.appendChild(row);
    }

    restore(want);
  }

  for (const stage of STAGES) {
    const count = (BY_STAGE.get(stage.id) ?? []).length;
    const btn = h(
      'button',
      {
        class: 'join__stage',
        type: 'button',
        aria: {
          pressed: stage.id === stageId ? 'true' : 'false',
          label: `Chặng ${String(stage.ordinal)}, ${stage.headingPeriod}: ${String(count)} cặp`,
        },
      },
      h('span', { class: 'join__stage-n', text: String(stage.ordinal) }),
      // The count used to be printed on all five buttons at once. Five item
      // counts standing permanently above the activity is the reading of a
      // database, not of a journey - and the number only matters for the stage
      // actually chosen, where the line below now carries it. It stays in the
      // accessible name of every button, so nothing is lost to a screen reader.
    );
    btn.addEventListener('click', () => {
      stageId = stage.id;
      pickedExperience = null;
      for (const other of tabs.querySelectorAll('.join__stage')) {
        other.setAttribute('aria-pressed', other === btn ? 'true' : 'false');
      }
      // The stage buttons survive the rebuild, so focus stays where it is.
      render();
    });
    tabs.appendChild(btn);
  }

  const heading = h('p', { class: 'join__heading' });
  const syncHeading = (): void => {
    const s = STAGE_BY_ID.get(stageId);
    if (!s) return;
    const n = (BY_STAGE.get(s.id) ?? []).length;
    heading.textContent = `${s.headingPeriod} · ${String(n)} cặp`;
  };

  const tabsWrap = h('div', { class: 'join__stages-wrap' }, tabs, heading);
  tabs.addEventListener('click', syncHeading);

  const section = h(
    'section',
    { class: 'join' },
    h(
      'header',
      { class: 'join__head' },
      h('p', { class: 'atlas__kicker', text: 'Nối kết' }),
      h('h1', { class: 'atlas__title', text: 'Trải nghiệm nào dẫn tới nhận thức nào' }),
      brief('noi-ket'),
      h(
        'p',
        { class: 'duo__note' },
        h('span', { class: 'station__flag', text: 'DIỄN GIẢI CỦA NHÓM' }),
        h('span', {
          text: 'Cả mười hai cặp đều lấy từ trích đoạn, nhưng cách chia thành từng cặp và cách rút gọn câu chữ là của nhóm. Mỗi cặp đều kèm vị trí để đối chiếu.',
        }),
      ),
    ),
    tabsWrap,
    status,
    board,
    whatNext({
      lead: 'Mỗi nhận thức trong trích đoạn đều đi liền với một việc đã làm.',
      primary: continueJourney(),
      secondary: { label: 'Đối sánh hai chặng', href: '#/doi-sanh' },
    }),
  );

  syncHeading();
  render();
  return section;
}
