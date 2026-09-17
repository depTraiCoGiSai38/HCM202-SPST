import type { StageId } from '../data/types';
import { STAGES } from '../data/stages';

/**
 * Viewer preferences and journey progress.
 *
 * Everything here lives in the viewer's own browser only. Nothing is sent
 * anywhere, aggregated, or turned into interaction data. Real evidence of user
 * interaction must come from testing with real users and be stored separately.
 */

const KEY = 'htt.prefs.v1';

export type Theme = 'auto' | 'light' | 'dark';
export type Motion = 'auto' | 'off';

/**
 * How a stage is read.
 *
 * `walk` is the guided traverse, one stop at a time. `flow` lays the same stops
 * out in printed order on one page, for a reader who would rather read than
 * step. Neither mode adds, removes or shortens anything: `flow` renders exactly
 * the stations `walk` renders, in the same order.
 */
export type Reading = 'walk' | 'flow';

interface Prefs {
  theme: Theme;
  motion: Motion;
  reading: Reading;
  visited: StageId[];
}

const DEFAULTS: Prefs = { theme: 'auto', motion: 'auto', reading: 'walk', visited: [] };

function isStageId(v: unknown): v is StageId {
  return typeof v === 'string' && STAGES.some((s) => s.id === v);
}

function read(): Prefs {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULTS, visited: [] };
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) return { ...DEFAULTS, visited: [] };
    const o = parsed as Record<string, unknown>;
    const theme: Theme =
      o['theme'] === 'light' || o['theme'] === 'dark' || o['theme'] === 'auto' ? o['theme'] : 'auto';
    const motion: Motion = o['motion'] === 'off' ? 'off' : 'auto';
    const reading: Reading = o['reading'] === 'flow' ? 'flow' : 'walk';
    const visited = Array.isArray(o['visited']) ? o['visited'].filter(isStageId) : [];
    return { theme, motion, reading, visited };
  } catch {
    // Private windows, blocked storage and quota errors all land here.
    return { ...DEFAULTS, visited: [] };
  }
}

function write(p: Prefs): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    // Storage is a convenience only; the product works without it.
  }
}

let prefs: Prefs = read();

const listeners = new Set<() => void>();

export function subscribe(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function emit(): void {
  for (const fn of listeners) fn();
}

export function getTheme(): Theme {
  return prefs.theme;
}

export function cycleTheme(): Theme {
  const order: Theme[] = ['auto', 'light', 'dark'];
  const next = order[(order.indexOf(prefs.theme) + 1) % order.length] ?? 'auto';
  prefs = { ...prefs, theme: next };
  write(prefs);
  applyTheme();
  emit();
  return next;
}

export function applyTheme(): void {
  const root = document.documentElement;
  if (prefs.theme === 'auto') root.removeAttribute('data-theme');
  else root.setAttribute('data-theme', prefs.theme);
}

export function getMotion(): Motion {
  return prefs.motion;
}

/** True when the OS asks for reduced motion. */
export function systemReducedMotion(): boolean {
  return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** True when motion should be suppressed for any reason. */
export function motionSuppressed(): boolean {
  return prefs.motion === 'off' || systemReducedMotion();
}

export function toggleMotion(): Motion {
  const next: Motion = prefs.motion === 'off' ? 'auto' : 'off';
  prefs = { ...prefs, motion: next };
  write(prefs);
  applyMotion();
  emit();
  return next;
}

export function applyMotion(): void {
  const root = document.documentElement;
  if (prefs.motion === 'off') root.setAttribute('data-motion', 'off');
  else root.removeAttribute('data-motion');
}

export function getReading(): Reading {
  return prefs.reading;
}

export function setReading(next: Reading): void {
  if (prefs.reading === next) return;
  prefs = { ...prefs, reading: next };
  write(prefs);
  emit();
}

export function getVisited(): readonly StageId[] {
  return prefs.visited;
}

/**
 * Where the viewer had got to inside each stage.
 *
 * Deliberately not persisted: it is a convenience for one sitting, so that
 * stepping out to the overview and back does not silently rewind the traverse.
 * It is also never sent anywhere - like every other piece of state here, it
 * lives only in this browser tab and produces no interaction data.
 */
const stops = new Map<StageId, number>();

export function getStop(id: StageId): number {
  return stops.get(id) ?? 0;
}

export function setStop(id: StageId, index: number): void {
  stops.set(id, index);
}

/** The first stage that has not been opened yet, or null when all five have. */
export function nextUnvisited(): StageId | null {
  for (const s of STAGES) {
    if (!prefs.visited.includes(s.id)) return s.id;
  }
  return null;
}

export function markVisited(id: StageId): void {
  if (prefs.visited.includes(id)) return;
  prefs = { ...prefs, visited: [...prefs.visited, id] };
  write(prefs);
  emit();
}

export function resetVisited(): void {
  prefs = { ...prefs, visited: [] };
  stops.clear();
  write(prefs);
  emit();
}

/** Fraction of the five stages opened so far. */
export function progressFraction(): number {
  return prefs.visited.length / STAGES.length;
}
