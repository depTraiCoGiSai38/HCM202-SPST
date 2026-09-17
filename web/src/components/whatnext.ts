import { STAGES, STAGE_BY_ID } from '../data/stages';
import { getVisited, nextUnvisited } from '../lib/state';
import { h } from '../lib/dom';

/**
 * Where to go from here.
 *
 * Four screens - the three activities and the verification register - ended
 * with nothing. No link, no action, not one anchor in the whole of `<main>`.
 * A learner who finished an activity could only reach the journey again
 * through the menu or the browser's Back button, and the synthesis screen, the
 * end of the journey, returned them nowhere at all.
 *
 * One grammar for all four: a line saying what this screen was for, one primary
 * action, and at most one secondary. Basis for the shape: `primary-action`,
 * SKILL.md Quick Reference section 4 - one primary call per screen with the
 * secondary visually subordinate.
 */

export interface WhatNext {
  /** One line about what has just been done, and what follows. */
  lead: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}

export function whatNext(spec: WhatNext): HTMLElement {
  const root = h(
    'aside',
    { class: 'whatnext', aria: { label: 'Đi tiếp' } },
    h('p', { class: 'whatnext__lead', text: spec.lead }),
  );

  const acts = h('div', { class: 'whatnext__acts' });
  acts.appendChild(
    h(
      'a',
      { class: 'btn btn--primary whatnext__go', href: spec.primary.href },
      h('span', { text: spec.primary.label }),
    ),
  );
  if (spec.secondary) {
    acts.appendChild(
      h(
        'a',
        { class: 'btn whatnext__aside', href: spec.secondary.href },
        h('span', { text: spec.secondary.label }),
      ),
    );
  }
  root.appendChild(acts);
  return root;
}

/**
 * The stage the journey would continue with.
 *
 * The first unopened stage, or - once all five have been opened - the overview,
 * because sending someone back to stage 1 when they have walked all five is a
 * loop, not a next step. Opening a stage is not the same as having understood
 * it, and nothing here says otherwise: it is a bookmark.
 */
export function continueJourney(): { label: string; href: string } {
  const visited = getVisited();
  if (visited.length >= STAGES.length) {
    return { label: 'Xem lại toàn bộ 5 chặng', href: '#/hanh-trinh' };
  }
  const id = nextUnvisited();
  const stage = id ? STAGE_BY_ID.get(id) : undefined;
  if (!stage) return { label: 'Xem toàn bộ 5 chặng', href: '#/hanh-trinh' };
  return {
    label: `Tiếp tục chặng ${String(stage.ordinal)}`,
    href: `#/chang/${stage.id}`,
  };
}
