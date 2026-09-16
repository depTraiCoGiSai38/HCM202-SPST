import { BOUNDARIES, STAGES } from '../data/stages';
import { AFTER_STAGES } from '../data/project';
import { RISK_BY_ID } from '../data/locators';
import type { StageId } from '../data/types';
import { getVisited, progressFraction } from '../lib/state';
import { ICONS, h, icon } from '../lib/dom';

/**
 * The persistent five-stage journey indicator.
 *
 * It is present on every view. Its distinguishing feature is that it draws the
 * period boundaries the way C2 prints them: where two consecutive headings use
 * the same boundary, the rail shows a shared-boundary marker rather than a cut.
 * Basis: risks C2-R01, C2-R02, C2-R03.
 */

let railEl: HTMLElement | null = null;
let fillEl: HTMLElement | null = null;
let toggleEl: HTMLButtonElement | null = null;

export function createRail(): HTMLElement {
  const list = h('ol', { class: 'rail__list' });

  STAGES.forEach((stage, i) => {
    list.appendChild(stageItem(stage.id));
    const boundary = BOUNDARIES[i];
    if (boundary) list.appendChild(boundaryItem(boundary));
  });

  const fill = h('div', { class: 'rail__progress-fill' });
  fillEl = fill;

  /*
   * On a stage screen the rail is a progress indicator, not a second table of
   * contents: it collapses to five marks so that the thread and the current
   * stop stay the thing being looked at. The viewer can open it at any time,
   * and it opens itself on screens where it is the main way around.
   */
  const toggle = h(
    'button',
    { class: 'rail__toggle', type: 'button', aria: { expanded: 'true' } },
    icon(ICONS.next),
    h('span', { class: 'rail__toggle-text', text: 'Thu gọn' }),
  );
  toggleEl = toggle;

  toggle.addEventListener('click', () => {
    if (!railEl) return;
    setRailCompact(railEl.dataset['compact'] !== 'true');
  });

  /*
   * What comes after the five stages.
   *
   * Three of these four screens had no link anywhere in the product before this
   * list existed: the comparison, the joining activity and the register were
   * reachable only by typing the address. They are kept visually subordinate to
   * the five stages, which remain the spine, but they are now reachable.
   */
  const aside = h('ul', { class: 'rail__aside' });
  for (const entry of AFTER_STAGES) {
    aside.appendChild(
      h(
        'li',
        { class: 'rail__aside-item', dataset: { route: entry.route, kind: entry.kind } },
        h(
          'a',
          { class: 'rail__aside-link', href: entry.route },
          h('span', { class: 'rail__aside-label', text: entry.label }),
          h('span', { class: 'visually-hidden', text: `. ${entry.purpose}` }),
        ),
      ),
    );
  }

  railEl = h(
    'nav',
    {
      class: 'rail',
      dataset: { compact: 'false' },
      aria: { label: 'Năm chặng của quá trình hình thành và phát triển' },
    },
    h(
      'div',
      { class: 'rail__bar' },
      h('p', { class: 'rail__heading', text: 'Hành trình · 5 chặng' }),
      toggle,
    ),
    list,
    // The progress bar belongs to the five stages, so it stays with them. Put
    // after the destinations it reads as an indicator under whichever of them
    // happens to sit above it.
    h('div', { class: 'rail__progress', aria: { hidden: 'true' } }, fill),
    // Wrapped so the rule that separates the five stages from the four
    // destinations belongs to the group, and survives the heading being
    // collapsed on a stage screen or hidden on a phone.
    h('div', { class: 'rail__after' }, h('p', { class: 'rail__aside-heading', text: 'Sau năm chặng' }), aside),
  );

  return railEl;
}

function stageItem(id: StageId): HTMLElement {
  const stage = STAGES.find((s) => s.id === id);
  if (!stage) throw new Error(`Unknown stage: ${id}`);

  const link = h(
    'a',
    {
      class: 'rail__link',
      href: `#/chang/${stage.id}`,
    },
    h('span', { class: 'rail__ordinal', text: `Chặng ${String(stage.ordinal)}` }),
    // The period part of the exact heading. The full heading is announced to
    // assistive technology so the short form is never the only label.
    h('span', { class: 'rail__period', text: stage.headingPeriod, aria: { hidden: 'true' } }),
    h('span', { class: 'visually-hidden', text: stage.heading }),
  );

  return h('li', { class: 'rail__item', dataset: { stage: stage.id } }, link);
}

function boundaryItem(boundary: (typeof BOUNDARIES)[number]): HTMLElement {
  const risk = boundary.riskId ? RISK_BY_ID.get(boundary.riskId) : undefined;
  const title = risk
    ? `Ranh giới dùng chung: ${boundary.label}. ${risk.id} - ${risk.title}`
    : `Ranh giới dùng chung: ${boundary.label}`;

  return h(
    'li',
    { class: 'rail__boundary', dataset: { kind: boundary.kind } },
    h(
      'span',
      { class: 'rail__boundary-mark', title },
      h('span', { text: boundary.label }),
      h('span', { class: 'visually-hidden', text: ` — ${title}` }),
    ),
  );
}

/** Collapse the rail to marks, or open it back out to labels. */
export function setRailCompact(compact: boolean): void {
  if (!railEl) return;
  railEl.dataset['compact'] = compact ? 'true' : 'false';
  if (toggleEl) {
    toggleEl.setAttribute('aria-expanded', compact ? 'false' : 'true');
    const label = toggleEl.querySelector('.rail__toggle-text');
    if (label) label.textContent = compact ? 'Mở rộng' : 'Thu gọn';
  }
}

/** Reflect the current stage or screen, and which stages have been opened. */
export function updateRail(activeStageId: StageId | null, activeRoute?: string): void {
  if (!railEl) return;
  const visited = getVisited();

  for (const item of railEl.querySelectorAll<HTMLElement>('.rail__aside-item')) {
    const link = item.querySelector('a');
    if (!link) continue;
    // aria-current="page" rather than "step": these are destinations, not
    // positions inside the five-stage sequence.
    if (item.dataset['route'] === activeRoute) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  }

  for (const item of railEl.querySelectorAll<HTMLElement>('.rail__item')) {
    const id = item.dataset['stage'] as StageId | undefined;
    if (!id) continue;
    if (id === activeStageId) item.setAttribute('aria-current', 'step');
    else item.removeAttribute('aria-current');
    item.dataset['visited'] = visited.includes(id) ? 'true' : 'false';
  }

  if (fillEl) fillEl.style.inlineSize = `${String(Math.round(progressFraction() * 100))}%`;

  const active = activeStageId
    ? railEl.querySelector<HTMLElement>(`.rail__item[data-stage="${activeStageId}"]`)
    : null;
  if (active && typeof active.scrollIntoView === 'function') {
    active.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }
}

/** Test seam: drop module state between test cases. */
export function resetRailForTests(): void {
  railEl = null;
  fillEl = null;
  toggleEl = null;
}
