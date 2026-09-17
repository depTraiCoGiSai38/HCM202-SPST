import { BOUNDARIES, STAGES } from '../data/stages';
import type { Stage, StageId } from '../data/types';
import { s, smoothPath, svgRoot } from '../lib/svg';

/**
 * The red thread.
 *
 * PROJECT DECISION. Every visual property of the thread maps to a countable
 * property of the data, so the drawing cannot assert more than the excerpt does:
 *
 *   horizontal extent of a segment -> stage.railStart .. stage.railEnd
 *   a joint between two segments   -> BOUNDARIES kind 'exact', the two dates
 *                                     the 2019 edition prints on either side
 *   a node on the segment          -> one entry in stage.turningPoints
 *   a tick under the segment       -> one entry in stage.markers
 *   inked vs unstitched segment    -> whether the viewer has opened that stage
 *
 * The rail fractions are a presentation choice, not a time scale. The journey
 * view states that in words; nothing here upgrades them to measured time.
 */

export const VB_W = 1000;
export const VB_H = 440;

/**
 * Vertical centre of each stage's own line, top stage first.
 *
 * The gap between levels has to clear a two-line period label sitting above its
 * own line, otherwise the labels collide with the line above them.
 */
const LEVELS = [58, 153, 248, 343, 420];

export function levelFor(ordinal: number): number {
  return LEVELS[ordinal - 1] ?? LEVELS[0] ?? 0;
}

export function xFor(fraction: number): number {
  return Math.round(fraction * VB_W * 100) / 100;
}

/**
 * A stage line with a small deterministic waver, so it reads as drawn thread
 * rather than as a progress bar. No randomness: the same stage always draws
 * identically, which matters when the same frame is shown at the Showcase.
 */
function stageLinePath(stage: Stage): string {
  const y = levelFor(stage.ordinal);
  const x0 = xFor(stage.railStart);
  const x1 = xFor(stage.railEnd);
  const steps = 8;
  const points: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = x0 + (x1 - x0) * t;
    // Amplitude is fixed at 1.6px: visible as a hand quality, far too small to
    // be read as encoding anything.
    const waver = Math.sin(t * Math.PI * 2 + stage.ordinal) * 1.6;
    points.push([x, y + waver]);
  }
  return smoothPath(points, 0.5);
}

/** The joint between two consecutive stage lines, inside their overlap. */
function jointPath(a: Stage, b: Stage): string {
  const ya = levelFor(a.ordinal);
  const yb = levelFor(b.ordinal);
  // The joint is drawn across the region the two headings share.
  const x0 = xFor(b.railStart);
  const x1 = xFor(a.railEnd);
  const mid = (x0 + x1) / 2;
  return `M ${String(x0)} ${String(ya)} C ${String(mid)} ${String(ya)}, ${String(mid)} ${String(yb)}, ${String(x1)} ${String(yb)}`;
}

export interface JourneyThreadOptions {
  visited: readonly StageId[];
  activeId: StageId | null;
  onPick?: (id: StageId) => void;
}

/**
 * The five-stage thread for the journey overview.
 *
 * The SVG itself is decorative: every stage it draws is also present as a real
 * focusable link in the list beside it, so nothing here is the only route to
 * the content.
 */
export function journeyThread(opts: JourneyThreadOptions): SVGSVGElement {
  const joints = s('g', { class: 'thread__joints' });
  const lines = s('g', { class: 'thread__lines' });
  const nodes = s('g', { class: 'thread__nodes' });
  const ticks = s('g', { class: 'thread__ticks' });

  STAGES.forEach((stage, i) => {
    const next = STAGES[i + 1];
    if (next) {
      const boundary = BOUNDARIES[i];
      joints.appendChild(
        s('path', {
          class: 'thread__joint',
          dataset: { kind: boundary?.kind ?? 'exact' },
          attrs: { d: jointPath(stage, next), pathLength: 1 },
        }),
      );
    }

    const visited = opts.visited.includes(stage.id);
    lines.appendChild(
      s('path', {
        class: 'thread__line',
        dataset: {
          stage: stage.id,
          visited: visited ? 'true' : 'false',
          active: stage.id === opts.activeId ? 'true' : 'false',
        },
        attrs: { d: stageLinePath(stage), pathLength: 1 },
      }),
    );

    // One tick per printed time marker, spread evenly across the stage's own
    // span. Even spacing is a drawing choice; the markers themselves keep the
    // printed precision and are listed in full beside the drawing.
    const y = levelFor(stage.ordinal);
    const x0 = xFor(stage.railStart);
    const x1 = xFor(stage.railEnd);
    stage.markers.forEach((_, mi) => {
      const t = (mi + 1) / (stage.markers.length + 1);
      const x = x0 + (x1 - x0) * t;
      ticks.appendChild(
        s('line', {
          class: 'thread__tick',
          dataset: { stage: stage.id },
          attrs: { x1: x, y1: y + 7, x2: x, y2: y + 13 },
        }),
      );
    });

    // One node per turning point the excerpt itself records.
    stage.turningPoints.forEach((_, ti) => {
      const t = (ti + 1) / (stage.turningPoints.length + 1);
      const x = x0 + (x1 - x0) * t;
      // A rounded rect rather than a circle: the drawing is stretched to its
      // container, and a rect degrades to a bead instead of to an ellipse.
      nodes.appendChild(
        s('rect', {
          class: 'thread__node',
          dataset: { stage: stage.id },
          attrs: { x: x - 4.5, y: y - 4.5, width: 9, height: 9, rx: 3 },
        }),
      );
    });
  });

  return svgRoot(
    `0 0 ${String(VB_W)} ${String(VB_H)}`,
    'thread',
    undefined,
    joints,
    lines,
    ticks,
    nodes,
  );
}

/**
 * The thread for one stage, used as the traverse track.
 *
 * `stations` is the stage's passages in printed order. `nodeAt` marks the
 * station indexes where a turning point is recorded.
 */
export function stageThread(stationCount: number, nodeAt: readonly number[]): SVGSVGElement {
  const W = 1000;
  const H = 60;
  const y = 30;
  const pad = 40;
  const span = W - pad * 2;

  const points: [number, number][] = [];
  for (let i = 0; i <= 12; i++) {
    const t = i / 12;
    points.push([pad + span * t, y + Math.sin(t * Math.PI * 2) * 1.4]);
  }

  const track = s('path', { class: 'track__line', attrs: { d: smoothPath(points, 0.5) } });
  const inked = s('path', {
    class: 'track__inked',
    attrs: { d: smoothPath(points, 0.5), 'pathLength': 1 },
  });

  const marks = s('g', { class: 'track__marks' });
  for (let i = 0; i < stationCount; i++) {
    const t = stationCount === 1 ? 0.5 : i / (stationCount - 1);
    const x = pad + span * t;
    const isNode = nodeAt.includes(i);
    marks.appendChild(
      s(isNode ? 'rect' : 'line', {
        class: isNode ? 'track__node' : 'track__tick',
        dataset: { index: String(i) },
        attrs: isNode
          ? { x: x - 5.5, y: y - 5.5, width: 11, height: 11, rx: 3.5 }
          : { x1: x, y1: y - 6, x2: x, y2: y + 6 },
      }),
    );
  }

  return svgRoot(`0 0 ${String(W)} ${String(H)}`, 'track', undefined, track, inked, marks);
}

/**
 * The opening thread.
 *
 * The journey diagram draws each stage as its own line so that the regions two
 * headings share can be seen at once. The opening has a different job: to show
 * that this is ONE process, with a beginning and a direction. So the same five
 * levels and the same boundary positions are drawn here as a single unbroken
 * stroke, starting at a marked point on the left and gathering weight as it
 * runs. It carries no claim the journey screen does not make more precisely.
 */
export function openingThread(): SVGSVGElement {
  const W = 1000;
  const H = 240;
  const top = 40;
  const bottom = H - 46;

  /*
   * Two anchors per stage, at its own level, plus the descent between them.
   * Smoothed, this reads as five terraces joined by one unbroken run - the
   * five-ness is legible at a glance without the square wave you get from
   * joining the exact boundary overlaps, which are 2-3% of the width against a
   * whole level of drop. Those are drawn precisely, with their labels, on the
   * overview screen; this is the same five levels, taken gently.
   */
  const pts: [number, number][] = [];
  STAGES.forEach((stage) => {
    const t = (stage.ordinal - 1) / (STAGES.length - 1);
    const y = top + (bottom - top) * t;
    const x0 = stage.railStart * W;
    const x1 = stage.railEnd * W;
    const inset = (x1 - x0) * 0.18;
    pts.push([Math.round(x0 + inset), Math.round(y)]);
    pts.push([Math.round(x1 - inset), Math.round(y)]);
  });

  const first = pts[0];
  const last = pts[pts.length - 1];
  // Run the line out to both edges so it reads as passing through, not as a
  // chart that begins and ends inside the frame.
  if (first) pts.unshift([-30, first[1] - 6]);
  if (last) pts.push([W + 30, last[1] + 6]);

  const grad = s('linearGradient', {
    id: 'thread-run',
    attrs: { x1: '0', y1: '0', x2: '1', y2: '0' },
  });
  for (const [offset, opacity] of [
    ['0%', '0.18'],
    ['40%', '0.45'],
    ['100%', '0.9'],
  ] as const) {
    grad.appendChild(
      s('stop', { attrs: { offset, 'stop-color': 'currentColor', 'stop-opacity': opacity } }),
    );
  }

  const origin = pts[1] ?? [0, top];

  return svgRoot(
    `0 0 ${String(W)} ${String(H)}`,
    'thread thread--opening',
    undefined,
    s('defs', {}, grad),
    s('path', { class: 'thread__run', attrs: { d: smoothPath(pts, 0.5) } }),
    // Where the thread starts. Nothing else on this screen is a filled dot.
    s('circle', {
      class: 'thread__origin',
      attrs: { cx: origin[0], cy: origin[1], r: 5.5 },
    }),
  );
}

/**
 * Two stage segments side by side, at the positions they occupy on the journey.
 *
 * Used by the comparison screen. Nothing here encodes a difference between the
 * two stages: the only thing the drawing says is where each one sits and how
 * long it runs, both taken from railStart/railEnd.
 */
export function compareThread(a: Stage, b: Stage): SVGSVGElement {
  const W = 1000;
  const H = 96;
  const rows = [30, 66];

  const g = s('g', { class: 'duo__lines' });

  [a, b].forEach((stage, i) => {
    const y = rows[i] ?? 30;
    const x0 = xFor(stage.railStart);
    const x1 = xFor(stage.railEnd);

    // The full span of the journey, so each segment is seen against the whole.
    g.appendChild(
      s('line', {
        class: 'duo__rule',
        attrs: { x1: 0, y1: y, x2: W, y2: y },
      }),
    );
    g.appendChild(
      s('line', {
        class: 'duo__seg',
        dataset: { which: i === 0 ? 'a' : 'b' },
        attrs: { x1: x0, y1: y, x2: x1, y2: y },
      }),
    );
    g.appendChild(
      s('rect', {
        class: 'duo__cap',
        dataset: { which: i === 0 ? 'a' : 'b' },
        attrs: { x: x0 - 4, y: y - 4, width: 8, height: 8, rx: 2.5 },
      }),
    );
    g.appendChild(
      s('text', {
        class: 'duo__seg-n',
        text: String(stage.ordinal),
        attrs: { x: x0 + (x1 - x0) / 2, y: y - 10, 'text-anchor': 'middle' },
      }),
    );
  });

  return svgRoot(`0 0 ${String(W)} ${String(H)}`, 'duo__thread', undefined, g);
}

/**
 * Five empty segments that join into one line when the order is right.
 *
 * Used by the synthesis screen. The segments sit at the same fractions the
 * journey uses, so the line the viewer rebuilds is the line they walked.
 */
export function synthesisThread(): SVGSVGElement {
  const W = 1000;
  const H = 80;
  const y = 40;

  const g = s('g', { class: 'weave__lines' });

  g.appendChild(s('line', { class: 'weave__rule', attrs: { x1: 0, y1: y, x2: W, y2: y } }));

  STAGES.forEach((stage, i) => {
    const x0 = xFor(stage.railStart);
    const x1 = xFor(stage.railEnd);
    g.appendChild(
      s('line', {
        class: 'weave__seg',
        dataset: { slot: String(i), state: 'empty' },
        attrs: { x1: x0, y1: y, x2: x1, y2: y },
      }),
    );
    g.appendChild(
      s('text', {
        class: 'weave__seg-n',
        text: String(i + 1),
        attrs: { x: x0 + (x1 - x0) / 2, y: y - 14, 'text-anchor': 'middle' },
      }),
    );
  });

  return svgRoot(`0 0 ${String(W)} ${String(H)}`, 'weave__thread', undefined, g);
}
