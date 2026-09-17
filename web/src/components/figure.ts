import {
  type DocumentaryFigure,
  FIGURES,
  FIGURE_REQUIREMENTS,
} from '../data/figures';
import { ICONS, chipForStatus, clear, h, icon } from '../lib/dom';
import { motionSuppressed } from '../lib/state';
import { lensTrigger } from './evidence';

/**
 * A documentary figure, or the documented absence of one.
 *
 * The product has slots for photographs and no photograph that has cleared its
 * source and usage condition. Two ways of handling that would be wrong: leaving
 * a decorative grey rectangle that looks like a loading failure, or quietly
 * rendering nothing so the gap disappears from view. The first misrepresents
 * the product, the second hides an open question.
 *
 * So a slot with nothing in it renders one quiet line saying the position is
 * blocked and why, in the same amber the product already uses for "not yet
 * evidenced", with the full record a click away. It is small enough not to
 * occupy the reading, and present enough that nobody ships it by accident.
 *
 * When a record is cleared and added to `FIGURES`, the same call renders the
 * photograph instead. Nothing else in the product changes.
 */

/** Whether a position currently holds a cleared photograph. */
export function hasFigure(slotId: string): boolean {
  return figureFor(slotId) !== undefined;
}

function figureFor(slotId: string): DocumentaryFigure | undefined {
  return FIGURES.find((f) => f.id === slotId);
}

/**
 * The image itself.
 *
 * `width`/`height` are always written to the element so the box is reserved
 * before the file arrives and nothing below it jumps, and `alt` always carries
 * the stored description. Nothing is ever overlaid on the picture, and it is
 * never cropped by CSS: the frame takes the image's own ratio.
 */
function picture(fig: DocumentaryFigure): HTMLElement {
  const img = h('img', {
    class: 'figure__img',
    src: fig.file,
    alt: fig.alt,
    loading: 'lazy',
    decoding: 'async',
  });
  img.width = fig.width;
  img.height = fig.height;
  img.style.aspectRatio = `${String(fig.width)} / ${String(fig.height)}`;
  return img;
}

function sourceItems(fig: DocumentaryFigure): { label: string; value: string; tone: 'plain' | 'locator' | 'status' | 'caution' }[] {
  return [
    { label: 'Nơi giữ tài liệu', value: fig.sourceName, tone: 'plain' },
    { label: 'Trang gốc', value: fig.sourceUrl, tone: 'locator' },
    { label: 'Ghi nguồn bắt buộc', value: fig.credit, tone: 'locator' },
    { label: 'Điều kiện sử dụng, nguyên văn', value: fig.rights, tone: 'plain' },
    { label: 'Trang đã đọc điều kiện', value: fig.rightsUrl, tone: 'locator' },
    { label: 'Chú thích', value: fig.caption, tone: 'plain' },
    // The six checks the brief requires to be maintained separately, each as its
    // own row: identity, event/date, location, source, rights, offline. Merging
    // any two of them would let a cleared one carry an uncleared one.
    { label: 'Nhận diện người trong ảnh', value: fig.identification, tone: 'caution' },
    { label: 'Sự kiện và niên đại', value: fig.eventCheck, tone: 'caution' },
    { label: 'Địa điểm', value: fig.locationCheck, tone: 'caution' },
    { label: 'Đóng gói ngoại tuyến', value: fig.offlineCheck, tone: 'plain' },
    { label: 'Mô tả cho trình đọc màn hình', value: fig.alt, tone: 'plain' },
    { label: 'Trạng thái', value: fig.status, tone: 'status' },
  ];
}

/**
 * The blocked state.
 *
 * It names the position, says what is missing, and carries the full requirement
 * list in the magnifier. It claims nothing about any photograph, because there
 * is none.
 */
function blocked(role: string): HTMLElement {
  return h(
    'div',
    { class: 'figure figure--blocked' },
    h(
      'p',
      { class: 'figure__blocked-line' },
      h('span', { class: 'station__flag', text: 'CHƯA CÓ NGUỒN' }),
      h('span', { class: 'figure__blocked-role', text: role }),
    ),
    lensTrigger(
      {
        title: 'Vị trí ảnh tư liệu đang bị chặn',
        items: [
          { label: 'Vị trí này dùng để', value: role, tone: 'plain' },
          { label: 'Trạng thái', value: 'NOT YET EVIDENCED', tone: 'status' },
          {
            label: 'Vì sao trống',
            value:
              'Chưa có ảnh nào vừa mở được trang nguồn để kiểm, vừa có điều kiện sử dụng cho phép dùng lại, VÀ có căn cứ gắn vào đúng chặng này. Một ảnh đã qua được nguồn và điều kiện sử dụng và đang ở màn mở đầu, nhưng sự kiện trong bản ghi của nó nằm ngoài phạm vi trích đoạn, nên nó không được gắn vào chặng nào. Những nguồn đã kiểm và kết quả từng nguồn nằm ở trang Kiểm chứng.',
            tone: 'caution',
          },
          ...FIGURE_REQUIREMENTS.map((r, i) => ({
            label: `Điều kiện ${String(i + 1)}`,
            value: r,
            tone: 'plain' as const,
          })),
        ],
      },
      'Vì sao chưa có ảnh?',
    ),
  );
}


/**
 * A figure slot.
 *
 * `role` is what the position is for, used in the blocked state so the gap
 * explains itself without the caller having to.
 */
export function figureSlot(slotId: string, role: string): HTMLElement {
  const fig = figureFor(slotId);
  if (!fig) return blocked(role);

  const frame = h('div', { class: 'figure__frame' }, picture(fig));

  const open = h(
    'button',
    { class: 'figure__open', type: 'button', aria: { label: `Xem lớn: ${fig.alt}` } },
    icon(ICONS.plus),
    h('span', { text: 'Xem lớn' }),
  );
  open.addEventListener('click', () => {
    openFigure(fig, open);
  });

  return h(
    'figure',
    { class: 'figure' },
    frame,
    h(
      'figcaption',
      { class: 'figure__cap' },
      h('span', { class: 'figure__cap-text', text: fig.caption }),
      // The attribution the source requires, on the surface. Gallica makes
      // keeping this line a condition of free reuse, so it is not something the
      // design gets to tuck away.
      h('span', { class: 'figure__cap-credit', text: fig.credit }),
      h('span', { class: 'figure__cap-status' }, chipForStatus(fig.status)),
    ),
    h('div', { class: 'figure__acts' }, open, lensTrigger({ title: fig.caption, items: sourceItems(fig) }, 'Nguồn và điều kiện')),
  );
}

/* ======================================================================
   The enlarged view
   ====================================================================== */

let dialog: HTMLElement | null = null;
let opener: HTMLElement | null = null;

/**
 * Enlarging a document.
 *
 * Opened deliberately, closed by Escape, by the close control or by clicking
 * outside, and focus returns to the control that opened it. Nothing is ever
 * drawn over the picture, and the caption and source travel with it so the
 * enlarged view is not a context-free image.
 */
function ensureDialog(): HTMLElement {
  if (dialog) return dialog;

  const close = h(
    'button',
    { class: 'btn btn--icon shade__close', type: 'button', aria: { label: 'Đóng ảnh lớn' } },
    icon(ICONS.close),
  );
  close.addEventListener('click', () => {
    closeFigure();
  });

  const el = h(
    'div',
    { class: 'shade', hidden: true, role: 'dialog', tabIndex: -1, aria: { modal: 'true', labelledby: 'shade-cap' } },
    h('div', { class: 'shade__bar' }, close),
    h('div', { class: 'shade__body' }),
  );

  el.addEventListener('pointerdown', (ev) => {
    // Clicking the backdrop closes; clicking the picture or the caption does not.
    if (ev.target === el) closeFigure();
  });

  document.addEventListener('keydown', (ev) => {
    if (!dialog || dialog.hidden) return;
    if (ev.key === 'Escape') {
      ev.preventDefault();
      closeFigure();
      return;
    }
    // A dialog keeps the keyboard inside it while it is open.
    if (ev.key !== 'Tab') return;
    const focusable = dialog.querySelectorAll<HTMLElement>('button, [href], [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!first || !last) return;
    if (ev.shiftKey && document.activeElement === first) {
      ev.preventDefault();
      last.focus();
    } else if (!ev.shiftKey && document.activeElement === last) {
      ev.preventDefault();
      first.focus();
    }
  });

  document.body.appendChild(el);
  dialog = el;
  return el;
}

export function openFigure(fig: DocumentaryFigure, from: HTMLElement): void {
  const el = ensureDialog();
  opener = from;

  const body = el.querySelector('.shade__body');
  if (body) {
    clear(body);
    body.appendChild(picture(fig));
    body.appendChild(
      h(
        'figcaption',
        { class: 'shade__cap', id: 'shade-cap' },
        h('span', { class: 'shade__cap-text', text: fig.caption }),
        // The required attribution travels with the picture, including here.
        h('span', { class: 'shade__cap-source', text: fig.credit }),
      ),
    );
  }

  el.hidden = false;
  el.dataset['enter'] = motionSuppressed() ? 'off' : 'on';
  el.focus();
}

export function closeFigure(): void {
  if (!dialog || dialog.hidden) return;
  dialog.hidden = true;
  if (opener?.isConnected) opener.focus();
  opener = null;
}
