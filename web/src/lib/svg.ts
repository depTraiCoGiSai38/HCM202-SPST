/**
 * Namespaced element builder for the drawn layer.
 *
 * `h()` in lib/dom.ts creates HTML elements. SVG needs createElementNS, so the
 * thread, the stage diagrams and the markers are built through here instead.
 *
 * Same discipline as `h()`: text only ever goes through `textContent`, never
 * `innerHTML`, so academic content cannot be re-read as markup.
 */

type SvgChild = Node | string | number | false | null | undefined;

export interface SvgAttrs {
  class?: string;
  id?: string;
  text?: string;
  role?: string;
  tabIndex?: number;
  /** Raw presentation/geometry attributes, written verbatim. */
  attrs?: Record<string, string | number | undefined>;
  dataset?: Record<string, string | undefined>;
  aria?: Record<string, string | undefined>;
  on?: Partial<Record<keyof SVGElementEventMap, (ev: Event) => void>>;
}

const NS = 'http://www.w3.org/2000/svg';

export function s<K extends keyof SVGElementTagNameMap>(
  tag: K,
  attrs: SvgAttrs = {},
  ...children: SvgChild[]
): SVGElementTagNameMap[K] {
  const el = document.createElementNS(NS, tag);

  if (attrs.class) el.setAttribute('class', attrs.class);
  if (attrs.id) el.setAttribute('id', attrs.id);
  if (attrs.role) el.setAttribute('role', attrs.role);
  if (typeof attrs.tabIndex === 'number') el.setAttribute('tabindex', String(attrs.tabIndex));
  if (attrs.text !== undefined) el.textContent = attrs.text;

  if (attrs.attrs) {
    for (const [k, v] of Object.entries(attrs.attrs)) {
      if (v !== undefined) el.setAttribute(k, String(v));
    }
  }

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

  for (const child of children) {
    if (child === null || child === undefined || child === false) continue;
    el.appendChild(
      typeof child === 'string' || typeof child === 'number'
        ? document.createTextNode(String(child))
        : child,
    );
  }

  return el;
}

/**
 * Root <svg>. Decorative by default: the drawn layer never carries information
 * that is not also present as text, so it stays out of the accessibility tree
 * unless a caller passes an explicit label.
 */
export function svgRoot(
  viewBox: string,
  className: string,
  label?: string,
  ...children: SvgChild[]
): SVGSVGElement {
  const root = s(
    'svg',
    {
      class: className,
      attrs: { viewBox, preserveAspectRatio: 'none', focusable: 'false' },
      ...(label
        ? { role: 'img', aria: { label } }
        : { aria: { hidden: 'true' } }),
    },
    ...children,
  );
  return root;
}

/** Catmull-Rom through the given points, converted to a cubic Bezier `d`. */
export function smoothPath(points: readonly (readonly [number, number])[], tension = 0.5): string {
  if (points.length === 0) return '';
  const first = points[0];
  if (!first) return '';
  if (points.length === 1) return `M ${String(first[0])} ${String(first[1])}`;

  const at = (i: number): readonly [number, number] => {
    const clamped = Math.min(points.length - 1, Math.max(0, i));
    return points[clamped] ?? first;
  };

  let d = `M ${String(first[0])} ${String(first[1])}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = at(i - 1);
    const p1 = at(i);
    const p2 = at(i + 1);
    const p3 = at(i + 2);
    const c1x = p1[0] + ((p2[0] - p0[0]) / 6) * tension * 2;
    const c1y = p1[1] + ((p2[1] - p0[1]) / 6) * tension * 2;
    const c2x = p2[0] - ((p3[0] - p1[0]) / 6) * tension * 2;
    const c2y = p2[1] - ((p3[1] - p1[1]) / 6) * tension * 2;
    d += ` C ${String(round(c1x))} ${String(round(c1y))}, ${String(round(c2x))} ${String(round(c2y))}, ${String(round(p2[0]))} ${String(round(p2[1]))}`;
  }
  return d;
}

function round(n: number): number {
  return Math.round(n * 100) / 100;
}
