import {
  COMPARE_AXES,
  EXPERIENCE_LINKS,
  PRESENTATION_BEATS,
  PRESENTATION_BUDGET_MAX,
  PRESENTATION_BUDGET_MIN,
} from '../data/interactions';
import { CENTRAL_QUESTION, CORE_MESSAGE } from '../data/project';
import { STAGE_BY_ID } from '../data/stages';
import { RISK_BY_ID } from '../data/locators';
import type { PresentationBeat } from '../data/types';
import { ICONS, clear, h, icon } from '../lib/dom';
import { navigate } from '../lib/router';
import { journeyThread } from './thread';

/**
 * Presentation mode.
 *
 * A focused deck for the 10-12 minute classroom Showcase. It runs entirely
 * offline, needs no second device, and carries a minute budget per beat so the
 * speaker can see where they are inside the slot.
 */

interface Presentation {
  root: HTMLElement;
  open: () => void;
  close: () => void;
  isOpen: () => boolean;
}

function totalMinutes(): number {
  return PRESENTATION_BEATS.reduce((n, b) => n + b.minutes, 0);
}

function formatClock(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const mm = Math.floor(total / 60);
  const ss = total % 60;
  return `${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
}

export function createPresentation(): Presentation {
  let index = 0;
  let startedAt: number | null = null;
  let timer: number | null = null;
  let lastFocused: Element | null = null;

  const clock = h('output', { class: 'present__clock', text: '00:00' });
  const beatsBar = h('ol', { class: 'present__beats', aria: { hidden: 'true' } });
  const stage = h('div', { class: 'present__stage' });

  const notesPanel = h('aside', {
    class: 'present__notes',
    hidden: true,
    aria: { label: 'Ghi chú cho người nói' },
  });

  const notesBtn = h('button', {
    class: 'btn',
    type: 'button',
    text: 'Ghi chú',
    aria: { expanded: 'false' },
  });

  const budgetLabel = h('span', {
    class: 'present__budget',
    text: `Ngân sách ${String(PRESENTATION_BUDGET_MIN)}-${String(PRESENTATION_BUDGET_MAX)} phút · kịch bản ${String(totalMinutes())} phút`,
  });

  const prevBtn = h(
    'button',
    { class: 'btn', type: 'button', aria: { label: 'Nhịp trước' } },
    icon(ICONS.prev),
    h('span', { text: 'Trước' }),
  );
  const nextBtn = h(
    'button',
    { class: 'btn btn--primary', type: 'button', aria: { label: 'Nhịp sau' } },
    h('span', { text: 'Sau' }),
    icon(ICONS.next),
  );
  const timerBtn = h('button', { class: 'btn', type: 'button', text: 'Bắt đầu giờ' });
  const closeBtn = h(
    'button',
    { class: 'btn btn--icon', type: 'button', aria: { label: 'Thoát chế độ trình bày' } },
    icon(ICONS.close),
  );

  const root = h(
    'section',
    {
      class: 'present',
      hidden: true,
      role: 'dialog',
      aria: { modal: 'true', label: 'Chế độ trình bày' },
    },
    h(
      'div',
      { class: 'present__bar' },
      h('span', { class: 'present__label', text: 'Chế độ trình bày' }),
      clock,
      budgetLabel,
      h('div', { class: 'present__tools' }, notesBtn, timerBtn, closeBtn),
    ),
    beatsBar,
    stage,
    notesPanel,
    h(
      'div',
      { class: 'present__foot' },
      h('div', { class: 'present__nav' }, prevBtn),
      h('p', {
        class: 'present__hint',
        text: 'Mũi tên trái phải để chuyển nhịp · N để xem ghi chú · P để mở hoặc đóng · Esc để thoát',
      }),
      h('div', { class: 'present__nav' }, nextBtn),
    ),
  );

  function renderBeats(): void {
    clear(beatsBar);
    PRESENTATION_BEATS.forEach((_, i) => {
      beatsBar.appendChild(
        h('li', {
          class: 'present__beat',
          dataset: { state: i < index ? 'done' : i === index ? 'current' : 'todo' },
        }),
      );
    });
  }

  function renderSlide(): void {
    const beat = PRESENTATION_BEATS[index];
    if (!beat) return;

    clear(stage);
    stage.appendChild(slide(beat, index));
    renderNotes(beat);
    renderBeats();

    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === PRESENTATION_BEATS.length - 1;

    if (beat.route) navigate(beat.route);
  }

  /**
   * Speaker notes.
   *
   * The Showcase runs on one computer under the No-AI live rebuttal rule, so
   * there is no second screen to put these on. They are therefore hidden by
   * default and never part of the audience-facing slide; the speaker opens them
   * deliberately with the Notes button or the N key.
   */
  function renderNotes(beat: PresentationBeat): void {
    clear(notesPanel);
    notesPanel.appendChild(
      h('p', { class: 'present__notes-title', text: `Gợi ý cho người nói · ${beat.kicker}` }),
    );
    // One computer, one screen: opening this panel shows it to the room as
    // well. It is closed by default and the deck is complete without it, but
    // the speaker should know what they are putting on the wall.
    notesPanel.appendChild(
      h('p', {
        class: 'present__notes-warn',
        text: 'Chỉ có một màn hình: khi mở, khán giả cũng nhìn thấy bảng này.',
      }),
    );
    const list = h('ul', { class: 'present__notes-list' });
    for (const n of beat.notes) list.appendChild(h('li', { text: n }));
    notesPanel.appendChild(list);
    notesPanel.appendChild(
      h('p', {
        class: 'present__notes-minutes',
        text: `Dự kiến ${String(beat.minutes)} phút cho nhịp này`,
      }),
    );
  }

  function toggleNotes(): void {
    const open = notesPanel.hidden;
    notesPanel.hidden = !open;
    notesBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    root.dataset['notes'] = open ? 'open' : 'closed';
  }

  function go(delta: number): void {
    const next = index + delta;
    if (next < 0 || next >= PRESENTATION_BEATS.length) return;
    index = next;
    renderSlide();
  }

  function tick(): void {
    if (startedAt === null) return;
    const elapsed = Date.now() - startedAt;
    clock.value = formatClock(elapsed);
    clock.dataset['over'] = elapsed > PRESENTATION_BUDGET_MAX * 60_000 ? 'true' : 'false';
  }

  function toggleTimer(): void {
    if (startedAt === null) {
      startedAt = Date.now();
      timerBtn.textContent = 'Dừng giờ';
      timer = window.setInterval(tick, 1000);
      tick();
    } else {
      startedAt = null;
      if (timer !== null) window.clearInterval(timer);
      timer = null;
      timerBtn.textContent = 'Bắt đầu giờ';
    }
  }

  function onKey(ev: KeyboardEvent): void {
    if (root.hidden) return;
    if (ev.key === 'Escape') {
      ev.preventDefault();
      close();
    } else if (ev.key === 'ArrowRight' || ev.key === 'PageDown') {
      ev.preventDefault();
      go(1);
    } else if (ev.key === 'ArrowLeft' || ev.key === 'PageUp') {
      ev.preventDefault();
      go(-1);
    } else if (ev.key === 'Home') {
      ev.preventDefault();
      index = 0;
      renderSlide();
    } else if (ev.key === 'End') {
      ev.preventDefault();
      index = PRESENTATION_BEATS.length - 1;
      renderSlide();
    } else if (ev.key === 'n' || ev.key === 'N') {
      ev.preventDefault();
      toggleNotes();
    } else if (ev.key === 'Tab') {
      trapFocus(ev);
    }
  }

  function focusables(): HTMLElement[] {
    return [...root.querySelectorAll<HTMLElement>('button:not([disabled]), [href], [tabindex]')].filter(
      (el) => el.offsetParent !== null || el === document.activeElement,
    );
  }

  function trapFocus(ev: KeyboardEvent): void {
    const items = focusables();
    const first = items[0];
    const last = items[items.length - 1];
    if (!first || !last) return;
    if (ev.shiftKey && document.activeElement === first) {
      ev.preventDefault();
      last.focus();
    } else if (!ev.shiftKey && document.activeElement === last) {
      ev.preventDefault();
      first.focus();
    }
  }

  function open(): void {
    if (!root.hidden) return;
    lastFocused = document.activeElement;
    root.hidden = false;
    notesPanel.hidden = true;
    notesBtn.setAttribute('aria-expanded', 'false');
    root.dataset['notes'] = 'closed';
    document.body.dataset['presenting'] = 'true';
    renderSlide();
    nextBtn.focus();
  }

  function close(): void {
    if (root.hidden) return;
    root.hidden = true;
    delete document.body.dataset['presenting'];
    // Stepping through beats navigates routes, which re-renders the main
    // region. The element focused before opening may no longer be in the
    // document, so fall back to the content region rather than losing focus.
    if (lastFocused instanceof HTMLElement && lastFocused.isConnected) {
      lastFocused.focus();
    } else {
      document.getElementById('noi-dung')?.focus();
    }
  }

  prevBtn.addEventListener('click', () => {
    go(-1);
  });
  nextBtn.addEventListener('click', () => {
    go(1);
  });
  notesBtn.addEventListener('click', toggleNotes);
  timerBtn.addEventListener('click', toggleTimer);
  closeBtn.addEventListener('click', close);
  document.addEventListener('keydown', onKey);

  return { root, open, close, isOpen: () => !root.hidden };
}

/**
 * The audience-facing slide.
 *
 * One beat, one idea, nothing the room has to squint at. Before this, the
 * headline of beats 2 to 6 was literally `beat.notes[0]`, which projected
 * presenter guidance onto the wall. Each beat now leads with a real item of
 * stored content instead.
 *
 * PROJECT DECISION, and a presentation choice only: the map below selects which
 * already-stored item leads each beat. It adds no content and changes none.
 */
function slide(beat: PresentationBeat, index: number): HTMLElement {
  return h(
    'article',
    { class: 'slide', dataset: { beat: beat.id } },
    h(
      'p',
      { class: 'slide__kicker' },
      h('span', {
        class: 'slide__index',
        text: `${String(index + 1)} / ${String(PRESENTATION_BEATS.length)}`,
      }),
      h('span', { text: beat.kicker }),
    ),
    h('h2', { class: 'slide__title', text: beat.title }),
    h('div', { class: 'slide__body' }, feature(beat)),
  );
}

/**
 * The label a beat carries when the sentence on the wall is the group's, not
 * the excerpt's. The room cannot open a magnifier, so the attribution has to be
 * on the slide itself; the audit code stays in the evidence layer.
 */
function groupLabel(what: string): HTMLElement {
  return h(
    'p',
    { class: 'slide__attrib-label' },
    h('span', { text: what }),
    h('span', { class: 'slide__flag', text: 'DIỄN GIẢI CỦA NHÓM' }),
  );
}

function lead(text: string, kind = 'text'): HTMLElement {
  return h('p', { class: 'slide__lead', dataset: { kind }, text });
}

function feature(beat: PresentationBeat): HTMLElement {
  switch (beat.id) {
    case 'PB-1':
      // The Central Question is the group's own proposal, and it has not been
      // approved by anyone yet. Both facts belong on the wall: the room cannot
      // open a magnifier, and a question presented without its status reads as
      // settled. The full wording is never shortened, and the exact
      // `PROJECT DECISION - NEED LECTURER/TEAM APPROVAL` code stays in the
      // evidence layer on the opening screen and in the register.
      return h(
        'div',
        { class: 'slide__turn' },
        groupLabel('Câu hỏi trung tâm do nhóm đề xuất'),
        lead(CENTRAL_QUESTION, 'question'),
        h('p', { class: 'slide__status', text: 'Chờ nhóm và giảng viên phê duyệt' }),
      );

    case 'PB-2': {
      // The drawing itself is the point of this beat: five stages, two shared
      // boundaries, visible in one frame.
      return h(
        'div',
        { class: 'slide__draw' },
        journeyThread({ visited: [], activeId: null }),
      );
    }

    case 'PB-3': {
      const tp = STAGE_BY_ID.get('ky-2')?.turningPoints.find((t) => t.id === 'TP2');
      if (!tp) return lead(beat.title);
      // One idea on the wall: the marker and the change the excerpt names. The
      // positions either side of it are on the demo screen this beat routes to,
      // and in the speaker's own notes.
      return h(
        'div',
        { class: 'slide__turn' },
        h('p', { class: 'slide__marker', text: tp.marker }),
        groupLabel('Nhóm tóm tắt bước ngoặt'),
        h('p', { class: 'slide__shift', text: tp.shift }),
      );
    }

    case 'PB-4': {
      const axis = COMPARE_AXES[0];
      return h(
        'div',
        { class: 'slide__turn' },
        groupLabel('Trục đối sánh do nhóm đặt ra'),
        lead(axis ? axis.question : beat.title, 'question'),
      );
    }

    case 'PB-5': {
      const link = EXPERIENCE_LINKS[0];
      if (!link) return lead(beat.title);
      return h(
        'div',
        { class: 'slide__turn' },
        groupLabel('Cách ghép cặp của nhóm'),
        h(
          'div',
          { class: 'slide__pair' },
          h('p', { class: 'slide__pair-side', text: link.experience }),
          h('p', { class: 'slide__pair-arrow', text: '→', aria: { hidden: 'true' } }),
          h('p', { class: 'slide__pair-side', text: link.recognition }),
        ),
      );
    }

    case 'PB-6': {
      const risk = RISK_BY_ID.get('C2-R05');
      if (!risk) return lead(beat.title);
      // The room reads this. The audit code stays in the register at
      // #/kiem-chung and in the magnifier, not on the wall.
      const AUDIENCE_STATUS: Record<string, string> = {
        'DOCUMENT CONFLICT': 'Hai chỗ trong tài liệu không khớp nhau',
        'NEED VERIFICATION': 'Chưa đối chiếu với nguồn gốc',
      };
      return h(
        'div',
        { class: 'slide__risk' },
        h('p', { class: 'slide__marker', text: risk.id }),
        h('p', { class: 'slide__lead', dataset: { kind: 'text' }, text: risk.issue }),
        h('p', { class: 'slide__status', text: AUDIENCE_STATUS[risk.status] ?? risk.status }),
      );
    }

    case 'PB-7':
      return h(
        'div',
        { class: 'slide__turn' },
        groupLabel('Thông điệp cốt lõi của nhóm'),
        lead(CORE_MESSAGE, 'message'),
      );

    default:
      return lead(beat.title);
  }
}
