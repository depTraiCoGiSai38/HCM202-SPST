import {
  type DocumentaryFigure,
  FIGURES,
  FIGURE_REQUIREMENTS,
} from '../data/figures';
import { ICONS, clear, h, icon } from '../lib/dom';
import { motionSuppressed } from '../lib/state';
import { lensTrigger } from './evidence';

/**
 * A documentary figure, or the documented absence of one.
 *
 * The product declares more positions for documents than it has documents that
 * have cleared a checkable source and a usage condition. Two ways of handling
 * the difference would be wrong: leaving a decorative grey rectangle that looks
 * like a loading failure, or quietly rendering nothing so the gap disappears
 * from view. The first misrepresents the product, the second hides an open
 * question.
 *
 * So a PRIMARY slot with nothing in it renders one quiet line saying the
 * position is blocked and why, in the same amber the product already uses for
 * "not yet evidenced", with the full record a click away. A SUPPORTING slot is
 * deliberately different: `supportFor()` in `stagePage.ts` renders it only once
 * it is filled, because a blocked line dropped into the middle of the reading
 * would repeat the gap rather than report it. An unfilled supporting position is
 * therefore invisible in the stage and visible in the register on `#/kiem-chung`.
 * `FS-ky-4-b` is currently in exactly that state. It is small enough not to
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

export function sourceItems(fig: DocumentaryFigure): { label: string; value: string; tone: 'plain' | 'locator' | 'status' | 'caution' | 'decision' }[] {
  return [
    { label: 'Nơi giữ tài liệu', value: fig.sourceName, tone: 'plain' },
    { label: 'Trang gốc', value: fig.sourceUrl, tone: 'locator' },
    { label: 'Ghi nguồn bắt buộc', value: fig.credit, tone: 'locator' },
    /*
     * Reuse, as four rows rather than one.
     *
     * A single row used to carry the holder's rights label, the holder's reuse
     * terms and a conclusion, which let the first be read as settling the last.
     * For a photograph they are not the same question: the holder speaks for
     * the copy it digitised, not for the person who took the picture. Split on
     * 19-9-2026 so that a reader meets the unresolved one on its own line.
     */
    { label: 'Nơi giữ tuyên bố gì', value: fig.holderRightsStatus, tone: 'plain' },
    { label: 'Điều kiện dùng lại, nguyên văn', value: fig.reuseCondition, tone: 'plain' },
    { label: 'Trang đã đọc điều kiện', value: fig.rightsUrl, tone: 'locator' },
    {
      label: 'Ghi người tạo lập in trên hiện vật',
      // A missing credit line is stated as a missing credit line. It is not
      // evidence that nobody made the thing.
      value:
        fig.printedCreatorCredit ??
        'Hiện vật không in dòng ghi NGƯỜI CHỤP nào. Chữ ký hoặc tên tác giả VĂN BẢN in trên hiện vật, nếu có, nằm ở dòng “Nhận diện người trong ảnh” và ở “Quyền của người tạo lập” — không phải ở dòng này.',
      tone: 'plain',
    },
    { label: 'Quyền của người tạo lập', value: fig.creatorRightsCheck, tone: 'caution' },
    /*
     * The tone is chosen from the value, not fixed on the row.
     *
     * Every `status` row is painted in the same amber, which is right when all
     * of a row's values are unresolved states. This row is not like that: it
     * carries either `USE` or `USE WITH CAUTION`, and painting them identically
     * would erase the one distinction the row exists to make - in the only
     * place a stage reader ever meets it. So an open decision takes the amber
     * and a settled one takes the quiet marker face, which is how the register
     * table on the verification page already reads.
     */
    {
      label: 'Quyết định dùng lại',
      value: fig.reuse,
      tone: fig.reuse.includes('CAUTION') ? 'status' : 'decision',
    },
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
              'Vị trí này còn trống vì chưa có tài liệu nào vừa mở được trang bản ghi của cơ quan giữ hiện vật để kiểm, vừa đọc được nguyên văn điều kiện sử dụng, VÀ có căn cứ gắn vào đúng chặng này. Ba điều kiện ấy phải cùng đạt; thiếu một là chưa điền. Trang Kiểm chứng in đủ năm điều kiện, toàn bộ các nguồn đã mở và kết quả của từng nguồn. Ở đó không phải vị trí trống nào cũng có một dòng lý do của riêng nó: hai vị trí của chặng 4 có, ghi ở SC-25; những vị trí còn lại chỉ có bản ghi chung của các lần kiểm nguồn.',
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
      // No status chip here by design: the evidence status is carried by the
      // `Trạng thái` row of the `Nguồn và điều kiện` panel below, and by the
      // register on `#/kiem-chung`. The credit line above is a licence
      // condition, not a design choice, and must stay on the surface.
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
