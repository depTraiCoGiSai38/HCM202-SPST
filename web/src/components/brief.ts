import { ACTIVITY_BRIEFS } from '../data/project';
import { h } from '../lib/dom';

/**
 * What an activity is for, said before it starts.
 *
 * Each of the three activities previously opened with a provenance note - true,
 * necessary, and no help at all to someone who does not yet know what they are
 * being asked to do. This block answers two questions first: what you should be
 * able to do afterwards, and how to work the screen. The provenance note stays
 * exactly where it was, underneath.
 *
 * `PROJECT DECISION`. Nothing here describes the source, so nothing here needs
 * a locator; and nothing here claims an effect the product has measured,
 * because it has measured none.
 */
export function brief(id: string): HTMLElement | null {
  const it = ACTIVITY_BRIEFS[id];
  if (!it) return null;

  return h(
    'div',
    { class: 'brief' },
    h(
      'p',
      { class: 'brief__row' },
      h('span', { class: 'brief__label', text: 'Mục tiêu' }),
      h('span', { class: 'brief__text', text: it.goal }),
    ),
    h(
      'p',
      { class: 'brief__row' },
      h('span', { class: 'brief__label', text: 'Cách làm' }),
      h('span', { class: 'brief__text', text: it.how }),
    ),
  );
}
