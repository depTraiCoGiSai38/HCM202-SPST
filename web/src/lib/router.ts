/**
 * Hash router.
 *
 * Hash routing keeps every view deep-linkable while still working when the
 * built product is opened straight from a file, which matters when the demo
 * runs from a USB stick on a single classroom computer.
 */

export interface Route {
  name: string;
  params: Record<string, string>;
}

export type RouteHandler = (route: Route) => void;

const ROUTES: { pattern: RegExp; name: string; keys: string[] }[] = [
  { pattern: /^\/?$/, name: 'opening', keys: [] },
  { pattern: /^\/hanh-trinh$/, name: 'journey', keys: [] },
  { pattern: /^\/chang\/([a-z0-9-]+)$/, name: 'stage', keys: ['id'] },
  { pattern: /^\/doi-sanh$/, name: 'compare', keys: [] },
  { pattern: /^\/noi-ket$/, name: 'connect', keys: [] },
  { pattern: /^\/tong-hop$/, name: 'synthesis', keys: [] },
  { pattern: /^\/kiem-chung$/, name: 'verify', keys: [] },
  { pattern: /^\/thiet-ke$/, name: 'design', keys: [] },
];

export function parse(hash: string): Route {
  const path = hash.replace(/^#/, '') || '/';
  for (const r of ROUTES) {
    const m = r.pattern.exec(path);
    if (!m) continue;
    const params: Record<string, string> = {};
    r.keys.forEach((k, i) => {
      const v = m[i + 1];
      if (v !== undefined) params[k] = v;
    });
    return { name: r.name, params };
  }
  return { name: 'notfound', params: {} };
}

export function currentRoute(): Route {
  return parse(location.hash);
}

export function navigate(to: string): void {
  const next = to.startsWith('#') ? to : `#${to}`;
  if (location.hash === next) {
    window.dispatchEvent(new Event('hashchange'));
    return;
  }
  location.hash = next;
}

export function startRouter(handler: RouteHandler): void {
  const run = (): void => {
    handler(currentRoute());
  };
  window.addEventListener('hashchange', run);
  run();
}
