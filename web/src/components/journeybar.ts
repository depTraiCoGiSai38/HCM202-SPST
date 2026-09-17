import { STAGES } from '../data/stages';
import { AFTER_STAGES } from '../data/project';
import type { StageId } from '../data/types';
import { h } from '../lib/dom';
import { getVisited } from '../lib/state';

/**
 * Where am I in the journey. Nothing else.
 *
 * This replaces the permanent five-stage sidebar. The sidebar was a second way
 * to reach the same five stages the menu already reaches, and measured on a
 * stage screen at 1440px it contributed six of the eleven chrome controls
 * standing in front of the stage - a sidebar, a phase bar, a stop track and a
 * pager all on screen at once.
 *
 * What was lost by removing it is a click target; what it did that mattered -
 * saying which of five stages you are in and how much of the journey you have
 * opened - is what this strip does, and it does it without being a third thing
 * to navigate with. It holds no links and takes no focus.
 *
 * Basis: `nav-hierarchy` and `avoid-mixed-patterns`, SKILL.md section 9, as
 * general skill guidance - one primary navigation model per product, rather
 * than parallel systems addressing the same destinations. The counts above are
 * this project's own measurements, not the skill's.
 */

let barEl: HTMLElement | null = null;
let labelEl: HTMLElement | null = null;

/**
 * Destinations that are stops on the journey but not one of the five stages,
 * keyed by the address that reaches them.
 *
 * Keyed by hash, not by the router's name for the route: the two differ (the
 * router calls `#/noi-ket` `connect`), and keying by name left the strip blank
 * on four of the eight screens.
 */
const ELSEWHERE: Record<string, string> = {
  '#/hanh-trinh': 'Tổng quan hành trình',
  ...Object.fromEntries(AFTER_STAGES.map((d) => [d.route, d.label])),
};

export function createJourneyBar(): HTMLElement {
  const marks = h('ol', { class: 'jbar__marks', aria: { hidden: 'true' } });
  for (const stage of STAGES) {
    marks.appendChild(
      h('li', { class: 'jbar__mark', dataset: { stage: stage.id, visited: 'false' } }),
    );
  }

  // Two parts, so a narrow screen drops the period rather than cutting the
  // sentence mid-word. `compact-label-overflow`, SKILL.md section 5.
  const label = h(
    'p',
    { class: 'jbar__label' },
    h('span', { class: 'jbar__where' }),
    h('span', { class: 'jbar__period' }),
  );
  labelEl = label;

  barEl = h('div', { class: 'jbar', dataset: { show: 'false' } }, marks, label);
  return barEl;
}

/**
 * Reflect the current position.
 *
 * The strip stays out of the way on the opening screen, where the whole page is
 * already about orientation and a progress meter reading zero would be the
 * first thing a new viewer saw.
 */
export function updateJourneyBar(
  activeStageId: StageId | null,
  routeName: string,
  activeRoute: string,
): void {
  if (!barEl || !labelEl) return;

  const visited = getVisited();
  for (const mark of barEl.querySelectorAll<HTMLElement>('.jbar__mark')) {
    const id = mark.dataset['stage'] as StageId | undefined;
    if (!id) continue;
    mark.dataset['visited'] = visited.includes(id) ? 'true' : 'false';
    mark.dataset['here'] = id === activeStageId ? 'true' : 'false';
  }

  const whereEl = labelEl.querySelector('.jbar__where');
  const periodEl = labelEl.querySelector('.jbar__period');
  if (!whereEl || !periodEl) return;

  const stage = activeStageId ? STAGES.find((s) => s.id === activeStageId) : undefined;
  if (stage) {
    whereEl.textContent = `Chặng ${String(stage.ordinal)} / ${String(STAGES.length)}`;
    periodEl.textContent = stage.headingPeriod;
  } else {
    whereEl.textContent = ELSEWHERE[activeRoute] ?? '';
    periodEl.textContent = '';
  }

  barEl.dataset['show'] =
    routeName === 'opening' || whereEl.textContent === '' ? 'false' : 'true';
}

/** Test seam: drop module state between test cases. */
export function resetJourneyBarForTests(): void {
  barEl = null;
  labelEl = null;
}
