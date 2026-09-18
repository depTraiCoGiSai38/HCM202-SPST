import { AFTER_STAGES } from '../data/project';
import { BOUNDARIES, STAGES } from '../data/stages';
import type { StageId } from '../data/types';
import { ICONS, h, icon, wholeDates } from '../lib/dom';
import { getVisited } from '../lib/state';

/**
 * One place to go anywhere.
 *
 * The problem this solves was measured, not felt. On a stage screen at 1440px
 * the product had six navigation systems in the first screen at once - masthead,
 * the five-stage rail, a four-destination list, the phase bar, the stop track
 * and the prev/next pager - and fourteen of the thirty-six controls in that
 * screen belonged to chrome rather than to the stage. On a 390px phone it was
 * worse in proportion: four navigation systems still stacked above the reading,
 * and fourteen chrome controls against two content controls on the comparison,
 * synthesis and verification screens alike.
 *
 * So the standing navigation collapses into one. Every destination - the five
 * stages, the overview, the three activities, the verification register - is
 * reachable from here and from nowhere else in the chrome, and here opens only
 * when it is asked for. What stays permanently on screen is a strip that says
 * which stage you are in and holds no links; see journeybar.ts.
 *
 * Basis: `nav-hierarchy` and `avoid-mixed-patterns` in SKILL.md Quick Reference
 * section 9. Those are the skill's general guidance; two CLI searches for a
 * matching rule returned nothing on topic, which the report records rather than
 * dressing up as a result.
 */

let panel: HTMLElement | null = null;
let opener: HTMLElement | null = null;

function stageRow(id: StageId, activeStage: StageId | null, visited: readonly StageId[]): HTMLElement {
  const stage = STAGES.find((s) => s.id === id);
  if (!stage) throw new Error(`Unknown stage: ${id}`);

  return h(
    'li',
    { class: 'menu__stage', dataset: { visited: visited.includes(id) ? 'true' : 'false' } },
    h(
      'a',
      {
        class: 'menu__stage-link',
        href: `#/chang/${stage.id}`,
        ...(stage.id === activeStage ? { aria: { current: 'step' } } : {}),
      },
      h('span', { class: 'menu__stage-n', text: String(stage.ordinal), aria: { hidden: 'true' } }),
      h(
        'span',
        { class: 'menu__stage-text' },
        h(
          'span',
          { class: 'menu__stage-period', aria: { hidden: 'true' } },
          ...wholeDates(stage.headingPeriod),
        ),
        h('span', { class: 'menu__stage-claim', aria: { hidden: 'true' }, text: stage.headingClaim }),
        // The exact official heading is what assistive technology announces, so
        // the shortened form is never the only name for a stage.
        h('span', { class: 'visually-hidden', text: stage.heading }),
      ),
    ),
  );
}

function body(activeStage: StageId | null, activeRoute: string): HTMLElement {
  const visited = getVisited();

  const stages = h('ol', { class: 'menu__stages' });
  STAGES.forEach((stage, i) => {
    stages.appendChild(stageRow(stage.id, activeStage, visited));
    const boundary = BOUNDARIES[i];
    if (!boundary || i === STAGES.length - 1) return;
    stages.appendChild(
      h(
        'li',
        { class: 'menu__joint', dataset: { kind: boundary.kind } },
        h('span', { text: boundary.label }),
      ),
    );
  });

  const after = h('ul', { class: 'menu__after' });
  for (const entry of AFTER_STAGES) {
    after.appendChild(
      h(
        'li',
        { class: 'menu__after-item', dataset: { kind: entry.kind } },
        h(
          'a',
          {
            class: 'menu__after-link',
            href: entry.route,
            ...(entry.route === activeRoute ? { aria: { current: 'page' } } : {}),
          },
          h('span', { class: 'menu__after-label', text: entry.label }),
          h('span', { class: 'menu__after-purpose', text: entry.purpose }),
        ),
      ),
    );
  }

  /*
   * A navigation landmark, not a bare list.
   *
   * This is the product's only navigation system, and it was not reachable as
   * one: the sheet was a dialog containing two unlabelled lists, so a screen
   * reader's landmark list offered no way into it. It is now the single `nav`
   * in the product, named.
   */
  return h(
    'nav',
    { class: 'menu__body', aria: { label: 'Mục lục hành trình' } },
    h(
      'a',
      {
        class: 'menu__map',
        href: '#/hanh-trinh',
        ...(activeRoute === '#/hanh-trinh' ? { aria: { current: 'page' } } : {}),
      },
      h('span', { class: 'menu__map-label', text: 'Bản đồ hành trình' }),
      h('span', { class: 'menu__map-note', text: 'Năm chặng và bốn ranh giới xác định' }),
    ),
    h('p', { class: 'menu__heading', id: 'menu-title', text: 'Năm chặng' }),
    stages,
    h('p', { class: 'menu__heading', text: 'Sau năm chặng' }),
    after,
  );
}

function ensure(): HTMLElement {
  if (panel) return panel;

  const close = h(
    'button',
    { class: 'btn btn--icon menu__close', type: 'button', aria: { label: 'Đóng mục lục' } },
    icon(ICONS.close),
  );
  close.addEventListener('click', () => {
    closeMenu();
  });

  const el = h(
    'div',
    {
      class: 'menu',
      hidden: true,
      role: 'dialog',
      tabIndex: -1,
      aria: { modal: 'true', labelledby: 'menu-title' },
    },
    h('div', { class: 'menu__scrim' }),
    h('div', { class: 'menu__sheet' }, h('div', { class: 'menu__bar' }, close), body(null, '#/')),
  );

  el.addEventListener('pointerdown', (ev) => {
    if (ev.target instanceof Element && ev.target.classList.contains('menu__scrim')) closeMenu();
  });

  // Choosing a destination closes the sheet; the route change does the rest.
  el.addEventListener('click', (ev) => {
    if (ev.target instanceof Element && ev.target.closest('a[href]')) closeMenu();
  });

  document.addEventListener('keydown', (ev) => {
    if (!panel || panel.hidden) return;
    if (ev.key === 'Escape') {
      ev.preventDefault();
      closeMenu();
      return;
    }
    if (ev.key !== 'Tab') return;
    // A dialog keeps the keyboard inside it while it is open.
    const items = [...panel.querySelectorAll<HTMLElement>('a[href], button')].filter(
      (n) => n.offsetParent !== null,
    );
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
  });

  document.body.appendChild(el);
  panel = el;
  return el;
}

/**
 * Rebuild the contents so the current position is marked wherever the viewer is.
 *
 * A route change always closes the sheet. Clicking a destination inside it does
 * that already, but a route can also change from the browser's own Back and
 * Forward, and a modal left standing over a screen the viewer did not open it
 * from is disorienting - and it is a dialog, so it also holds the keyboard.
 */
export function syncMenu(activeStage: StageId | null, activeRoute: string): void {
  const el = ensure();
  if (!el.hidden) closeMenu();
  const sheet = el.querySelector('.menu__sheet');
  const old = el.querySelector('.menu__body');
  const next = body(activeStage, activeRoute);
  if (sheet && old) sheet.replaceChild(next, old);
  else if (sheet) sheet.appendChild(next);
}

export function openMenu(from: HTMLElement): void {
  const el = ensure();
  opener = from;
  el.hidden = false;
  from.setAttribute('aria-expanded', 'true');
  el.querySelector<HTMLElement>('.menu__map')?.focus();
}

export function closeMenu(): void {
  if (!panel || panel.hidden) return;
  panel.hidden = true;
  opener?.setAttribute('aria-expanded', 'false');
  if (opener?.isConnected) opener.focus();
  opener = null;
}

export function isMenuOpen(): boolean {
  return Boolean(panel && !panel.hidden);
}
