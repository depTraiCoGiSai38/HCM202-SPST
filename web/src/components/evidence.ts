import { locatorText } from '../data/source';
import type { SourceRef } from '../data/types';
import { ICONS, clear, h, icon } from '../lib/dom';

/**
 * The evidence magnifier.
 *
 * PROJECT DECISION on placement only. The apparatus the course documents
 * require - exact location in the excerpt, verification status, registered
 * printing anomalies - stays on every claim, but it stops competing with the
 * narrative for the same visual space. It opens beside whatever the viewer is
 * reading, on demand, and it is reachable by pointer, keyboard and touch.
 *
 * Nothing is hidden by this: the full register is still published at
 * #/kiem-chung, and the trigger announces itself to assistive technology.
 */

export type EvidenceTone = 'locator' | 'status' | 'caution' | 'plain';

export interface EvidenceItem {
  label: string;
  value: string;
  tone?: EvidenceTone;
}

export interface EvidencePayload {
  title: string;
  items: EvidenceItem[];
}

/**
 * Compact locator wording for the audience, e.g. `tr. 29`.
 *
 * This is the short form used on the many inline evidence chips, where spelling
 * out the full source label on every claim would crowd the reading surface.
 * Every chip opens the magnifier, and the magnifier always shows the full
 * citation from `citeSource` plus the internal audit string from `auditRef`, so
 * the exact label and the PDF sheet an auditor needs are one interaction away.
 */
export function readLocator(at: SourceRef): string {
  return locatorText(at);
}


let panel: HTMLElement | null = null;
let titleEl: HTMLElement | null = null;
let bodyEl: HTMLElement | null = null;
let opener: HTMLElement | null = null;

function ensurePanel(): HTMLElement {
  if (panel) return panel;

  const title = h('p', { class: 'lens__title', id: 'lens-title' });
  const body = h('dl', { class: 'lens__body' });
  const close = h(
    'button',
    { class: 'btn btn--icon lens__close', type: 'button', aria: { label: 'Đóng kính lúp' } },
    icon(ICONS.close),
  );
  close.addEventListener('click', () => {
    closeLens();
  });

  const el = h(
    'div',
    {
      class: 'lens',
      hidden: true,
      role: 'dialog',
      tabIndex: -1,
      aria: { labelledby: 'lens-title' },
    },
    h('div', { class: 'lens__head' }, h('span', { class: 'lens__kicker', text: 'Bằng chứng' }), close),
    title,
    body,
  );

  document.body.appendChild(el);
  panel = el;
  titleEl = title;
  bodyEl = body;

  document.addEventListener('keydown', (ev) => {
    if (!panel || panel.hidden) return;
    if ((ev).key === 'Escape') {
      ev.preventDefault();
      closeLens();
    }
  });

  document.addEventListener('pointerdown', (ev) => {
    if (!panel || panel.hidden) return;
    const target = ev.target;
    if (target instanceof Node && (panel.contains(target) || opener?.contains(target))) return;
    closeLens();
  });

  return el;
}

function place(el: HTMLElement, anchor: HTMLElement): void {
  const rect = anchor.getBoundingClientRect();
  const pw = Math.min(el.offsetWidth || 340, window.innerWidth - 24);
  let left = rect.left + rect.width / 2 - pw / 2;
  left = Math.max(12, Math.min(left, window.innerWidth - pw - 12));

  const below = window.innerHeight - rect.bottom;
  const ph = el.offsetHeight || 220;
  const top = below > ph + 16 ? rect.bottom + 10 : Math.max(12, rect.top - ph - 10);

  el.style.insetInlineStart = `${String(Math.round(left))}px`;
  el.style.insetBlockStart = `${String(Math.round(top))}px`;
}

export function openLens(anchor: HTMLElement, payload: EvidencePayload): void {
  const el = ensurePanel();
  opener = anchor;

  if (titleEl) titleEl.textContent = payload.title;
  if (bodyEl) {
    clear(bodyEl);
    for (const item of payload.items) {
      bodyEl.appendChild(h('dt', { class: 'lens__label', text: item.label }));
      bodyEl.appendChild(
        h('dd', { class: 'lens__value', dataset: { tone: item.tone ?? 'plain' }, text: item.value }),
      );
    }
  }

  el.hidden = false;
  place(el, anchor);
  el.focus();
  anchor.setAttribute('aria-expanded', 'true');
}

export function closeLens(): void {
  if (!panel || panel.hidden) return;
  panel.hidden = true;
  if (opener) {
    opener.setAttribute('aria-expanded', 'false');
    if (opener.isConnected) opener.focus();
  }
  opener = null;
}

/**
 * The control that opens the magnifier for one claim.
 *
 * It has to be findable without shouting, and it has to look like part of the
 * product rather than a developer tool - so: a drawn lens, the apparatus face
 * rather than the monospace one, a hairline rather than a dashed rule, and a
 * full 44px target.
 */
export function lensTrigger(payload: EvidencePayload, label = 'Xem bằng chứng'): HTMLElement {
  const btn = h(
    'button',
    {
      class: 'lens-trigger',
      type: 'button',
      aria: { expanded: 'false', label: `Mở bằng chứng: ${payload.title}` },
    },
    icon(ICONS.lens),
    h('span', { class: 'lens-trigger__text', text: label }),
  );
  btn.addEventListener('click', () => {
    if (btn.getAttribute('aria-expanded') === 'true') closeLens();
    else openLens(btn, payload);
  });
  return btn;
}
