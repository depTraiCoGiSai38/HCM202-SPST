import { citeSource } from '../data/source';
import { LOCATOR_BY_ID } from '../data/locators';
import { QUOTATION_BY_ID } from '../data/stages';
import type { Quotation } from '../data/types';
import { chipForStatus, h } from '../lib/dom';

/**
 * The source apparatus.
 *
 * Sources sit beside the content they belong to: in a margin column on wide
 * screens, and in a disclosure directly under the block on narrow ones. Each
 * entry reproduces the printed note verbatim and carries its status. Nothing
 * here is presented as a verified citation.
 */

function sourceEntry(locatorId: string): HTMLElement | null {
  const loc = LOCATOR_BY_ID.get(locatorId);
  if (!loc) return null;

  return h(
    'li',
    { class: 'source' },
    h('span', { class: 'source__id', text: `Ứng viên định vị ${loc.id}` }),
    h('p', { class: 'source__printed', text: loc.printed }),
    h('p', { class: 'source__at', text: citeSource(loc.at) }),
    h('p', { class: 'source__attached', text: `Gắn với: ${loc.attachedTo}` }),
    loc.caution ? h('p', { class: 'source__caution', text: loc.caution }) : null,
    chipForStatus(loc.status),
  );
}

export function sourceList(locatorIds: readonly string[]): HTMLElement {
  const list = h('ul', { class: 'source-list' });
  let count = 0;
  for (const id of locatorIds) {
    const entry = sourceEntry(id);
    if (entry) {
      list.appendChild(entry);
      count += 1;
    }
  }
  if (count === 0) {
    list.appendChild(
      h(
        'li',
        { class: 'source' },
        h('p', {
          class: 'source__at',
          text: 'Phần này của trích đoạn không in chú thích số nào. Không dùng chú thích ở gần để hợp thức hoá nội dung ở đây.',
        }),
        chipForStatus('NEED VERIFICATION'),
      ),
    );
  }
  return list;
}

/** Wide-screen margin apparatus. */
export function marginNote(title: string, locatorIds: readonly string[]): HTMLElement {
  return h(
    'aside',
    { class: 'margin-note', aria: { label: title } },
    h('p', { class: 'margin-note__title', text: title }),
    sourceList(locatorIds),
  );
}

/** Narrow-screen apparatus, collapsed under the content it belongs to. */
export function sourceDrawer(title: string, locatorIds: readonly string[]): HTMLElement {
  const count = locatorIds.filter((id) => LOCATOR_BY_ID.has(id)).length;
  return h(
    'details',
    { class: 'source-drawer' },
    h(
      'summary',
      {},
      h('span', { text: title }),
      h('span', {
        class: 'marker',
        text: count > 0 ? `${String(count)} ứng viên` : 'không có chú thích',
      }),
    ),
    h('div', { class: 'source-drawer__body' }, sourceList(locatorIds)),
  );
}

/** A quotation rendered with its attribution and its locator candidates. */
export function quotationBlock(q: Quotation): HTMLElement {
  const locators = q.locatorIds
    .map((id) => LOCATOR_BY_ID.get(id))
    .filter((l): l is NonNullable<typeof l> => Boolean(l));

  const foot = h('footer', { class: 'quote__attr' }, h('span', { text: q.attribution }));

  if (locators.length > 0) {
    for (const loc of locators) {
      foot.appendChild(
        h('span', {
          class: 'marker',
          text: ` · ${loc.id}: ${loc.printed}`,
        }),
      );
    }
  } else {
    foot.appendChild(
      h('span', { class: 'marker', text: ' · Không có chú thích số kèm theo trong trích đoạn.' }),
    );
  }
  foot.appendChild(h('span', { class: 'marker', text: ` · ${citeSource(q.at)}` }));

  return h(
    'figure',
    { class: 'quote' },
    h('blockquote', { class: 'quote__text' }, h('p', { text: `“${q.text}”` })),
    foot,
    q.caution ? h('p', { class: 'source__caution', text: q.caution }) : null,
  );
}

export function quotationById(id: string): HTMLElement | null {
  const q = QUOTATION_BY_ID.get(id);
  return q ? quotationBlock(q) : null;
}
