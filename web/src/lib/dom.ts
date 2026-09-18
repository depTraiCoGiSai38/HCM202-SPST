/**
 * Minimal element builder.
 *
 * All text goes through `textContent`, never `innerHTML`, so academic content
 * is rendered exactly as stored and can never be re-interpreted as markup.
 */

type Child = Node | string | number | false | null | undefined;

export interface Attrs {
  class?: string;
  id?: string;
  type?: string;
  href?: string;
  title?: string;
  hidden?: boolean;
  disabled?: boolean;
  open?: boolean;
  value?: string;
  lang?: string;
  dir?: string;
  role?: string;
  /* Image attributes. `alt` is always written when present, including as an
     empty string, so a decorative image can be marked as such deliberately. */
  src?: string;
  alt?: string;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
  /** Rendered as the `for` attribute, associating a label with its control. */
  htmlFor?: string;
  tabIndex?: number;
  text?: string;
  html?: never;
  dataset?: Record<string, string | undefined>;
  aria?: Record<string, string | undefined>;
  on?: Partial<Record<keyof HTMLElementEventMap, (ev: Event) => void>>;
}

export function h<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs: Attrs = {},
  ...children: Child[]
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);

  if (attrs.class) el.className = attrs.class;
  if (attrs.id) el.id = attrs.id;
  if (attrs.title) el.title = attrs.title;
  if (attrs.lang) el.lang = attrs.lang;
  if (attrs.dir) el.dir = attrs.dir;
  if (attrs.role) el.setAttribute('role', attrs.role);
  if (attrs.htmlFor) el.setAttribute('for', attrs.htmlFor);
  if (attrs.hidden) el.hidden = true;
  if (typeof attrs.tabIndex === 'number') el.tabIndex = attrs.tabIndex;
  if (attrs.text !== undefined) el.textContent = attrs.text;

  if (attrs.src !== undefined) el.setAttribute('src', attrs.src);
  if (attrs.alt !== undefined) el.setAttribute('alt', attrs.alt);
  if (attrs.loading !== undefined) el.setAttribute('loading', attrs.loading);
  if (attrs.decoding !== undefined) el.setAttribute('decoding', attrs.decoding);

  if (attrs.type && 'type' in el) (el as HTMLInputElement).type = attrs.type;
  if (attrs.href && el instanceof HTMLAnchorElement) el.href = attrs.href;
  if (attrs.value !== undefined && 'value' in el) (el as HTMLInputElement).value = attrs.value;
  if (attrs.disabled && 'disabled' in el) (el as HTMLButtonElement).disabled = true;
  if (attrs.open && el instanceof HTMLDetailsElement) el.open = true;

  if (attrs.dataset) {
    for (const [k, v] of Object.entries(attrs.dataset)) {
      if (v !== undefined) el.dataset[k] = v;
    }
  }

  if (attrs.aria) {
    for (const [k, v] of Object.entries(attrs.aria)) {
      if (v !== undefined) el.setAttribute(`aria-${k}`, v);
    }
  }

  if (attrs.on) {
    for (const [k, fn] of Object.entries(attrs.on)) {
      if (fn) el.addEventListener(k, fn);
    }
  }

  append(el, children);
  return el;
}

export function append(parent: Node, children: Child[]): void {
  for (const child of children) {
    if (child === null || child === undefined || child === false) continue;
    parent.appendChild(
      typeof child === 'string' || typeof child === 'number'
        ? document.createTextNode(String(child))
        : child,
    );
  }
}

export function frag(...children: Child[]): DocumentFragment {
  const f = document.createDocumentFragment();
  append(f, children);
  return f;
}

export function clear(el: Element): void {
  while (el.firstChild) el.removeChild(el.firstChild);
}

/** Status chip. The label text is the provenance label itself, verbatim. */
export function chip(label: string, tone: 'verify' | 'conflict' | 'source' | 'project'): HTMLElement {
  return h('span', { class: `chip chip--${tone}`, text: label });
}

export function chipForStatus(status: string): HTMLElement {
  if (status.includes('CONFLICT') || status.includes('REJECT')) return chip(status, 'conflict');
  /*
   * `CAUTION` joined this line on 19-9-2026, with the reuse decisions.
   *
   * `USE WITH CAUTION` would otherwise have fallen through to the neutral
   * `project` tone, which is what a settled project decision looks like - and
   * this is the opposite of settled. It takes the same amber the product uses
   * everywhere else for a question still open.
   */
  if (
    status.includes('NEED VERIFICATION') ||
    status.includes('NOT YET EVIDENCED') ||
    status.includes('CAUTION')
  ) {
    return chip(status, 'verify');
  }
  if (status.includes('SOURCE')) return chip(status, 'source');
  return chip(status, 'project');
}

/** A caution strip. Conflicts get the stronger treatment. */
export function cautionBox(text: string, conflict = false): HTMLElement {
  return h(
    'p',
    { class: conflict ? 'caution caution--conflict' : 'caution' },
    h('span', { class: 'marker', text: conflict ? 'XUNG ĐỘT' : 'LƯU Ý', aria: { hidden: 'true' } }),
    h('span', { text }),
  );
}

export function icon(path: string, label?: string): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('width', '18');
  svg.setAttribute('height', '18');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '1.8');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  if (label) {
    svg.setAttribute('role', 'img');
    const t = document.createElementNS('http://www.w3.org/2000/svg', 'title');
    t.textContent = label;
    svg.appendChild(t);
  } else {
    svg.setAttribute('aria-hidden', 'true');
  }
  const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  p.setAttribute('d', path);
  svg.appendChild(p);
  return svg;
}

export const ICONS = {
  sun: 'M12 4V2m0 20v-2m8-8h2M2 12h2m13.66-5.66 1.41-1.41M4.93 19.07l1.41-1.41m11.32 0 1.41 1.41M4.93 4.93l1.41 1.41M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',
  moon: 'M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z',
  motion: 'M2 12c2.5-5 5-5 7.5 0s5 5 7.5 0 3.5-3 5-1.5',
  play: 'M6 4l14 8-14 8V4Z',
  close: 'M6 6l12 12M18 6 6 18',
  prev: 'M15 6l-6 6 6 6',
  next: 'M9 6l6 6-6 6',
  plus: 'M12 6v12M6 12h12',
  lens: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm5 12 4.5 4.5',
  menu: 'M4 7h16M4 12h16M4 17h16',
} as const;
