import { BOUNDARIES, EPILOGUE, QUOTATION_BY_ID, STAGES, STAGE_BY_ID } from '../data/stages';
import { STAGE_ENTRY, STAGE_ENTRY_STATUS } from '../data/project';
import { FIGURE_SLOTS } from '../data/figures';
import { figureSlot } from './figure';
import { LOCATOR_BY_ID, RISK_BY_ID } from '../data/locators';
import type { Passage, Quotation, Stage, StageId, TurningPoint } from '../data/types';
import { ICONS, clear, h, icon } from '../lib/dom';
import { getReading, getStop, motionSuppressed, setReading, setStop } from '../lib/state';
import { type EvidenceItem, lensTrigger, readLocator } from './evidence';
import { predictPanel } from './predict';
import { stageThread } from './thread';

/**
 * One stage, walked rather than read.
 *
 * The stage is broken into the units the excerpt itself supplies, in printed
 * order: each context passage, each development passage, each turning point at
 * the point where its last cited passage sits, each printed quotation, and
 * finally what the excerpt does not say. The viewer moves along the thread one
 * unit at a time, so a single screen carries one idea instead of eight.
 *
 * Nothing is summarised, merged or shortened to make this fit. Every unit is
 * the stored text in full; a turning point shows its two positions one after
 * the other rather than dropping either of them.
 */

type TurnPhase = 'before' | 'after';

type Station =
  | { kind: 'passage'; id: string; passage: Passage }
  | { kind: 'turn'; id: string; turn: TurningPoint }
  | { kind: 'quote'; id: string; quotation: Quotation }
  | { kind: 'boundary'; id: string; lines: readonly string[] };

function buildStations(stage: Stage): Station[] {
  const ordered: Passage[] = [...stage.context, ...stage.development];
  const stations: Station[] = [];

  // A turning point is anchored to the last passage it cites, so it arrives
  // after the viewer has seen everything the excerpt attaches to it.
  const turnAfter = new Map<string, TurningPoint[]>();
  for (const tp of stage.turningPoints) {
    const anchor = [...tp.passageIds].reverse().find((pid) => ordered.some((p) => p.id === pid));
    const key = anchor ?? ordered[ordered.length - 1]?.id ?? '';
    const list = turnAfter.get(key) ?? [];
    list.push(tp);
    turnAfter.set(key, list);
  }

  for (const p of ordered) {
    stations.push({ kind: 'passage', id: p.id, passage: p });
    for (const tp of turnAfter.get(p.id) ?? []) {
      stations.push({ kind: 'turn', id: tp.id, turn: tp });
    }
  }

  for (const qid of stage.quotations) {
    const q = QUOTATION_BY_ID.get(qid);
    if (q) stations.push({ kind: 'quote', id: qid, quotation: q });
  }

  if (stage.boundaries.length > 0) {
    stations.push({ kind: 'boundary', id: `${stage.id}-bound`, lines: stage.boundaries });
  }

  return stations;
}

/**
 * The reading phases of a stage, in the order the excerpt lays them out.
 *
 * `1 / 11` told a viewer how far along they were and nothing else: not what
 * kind of thing they were reading, not what was still ahead, not how to reach
 * the turning point they came for. These groups are the same stations seen as
 * structure. The first four labels are the group's reading model; the fifth is
 * the stage's own boundary stop.
 *
 * Grouping is presentational. It neither reorders the stations nor changes what
 * any of them contains, and a group is named only when the stage actually has
 * stations in it.
 */
interface Phase {
  id: string;
  label: string;
  /** Station indexes belonging to this phase, in printed order. */
  at: number[];
}

function phasesOf(stage: Stage, stations: readonly Station[]): Phase[] {
  const contextIds = new Set(stage.context.map((p) => p.id));

  const of = (st: Station): string => {
    switch (st.kind) {
      case 'turn':
        return 'buoc-ngoat';
      case 'quote':
        return 'nguyen-van';
      case 'boundary':
        return 'ranh-gioi';
      case 'passage':
        return contextIds.has(st.passage.id) ? 'boi-canh' : 'chuyen-bien';
    }
  };

  const LABELS: Record<string, string> = {
    'boi-canh': 'Bối cảnh và trải nghiệm',
    'chuyen-bien': 'Chuyển biến nhận thức',
    'buoc-ngoat': 'Bước ngoặt',
    'nguyen-van': 'Nguyên văn trích dẫn',
    'ranh-gioi': 'Ranh giới của chặng',
  };
  const ORDER = ['boi-canh', 'chuyen-bien', 'buoc-ngoat', 'nguyen-van', 'ranh-gioi'];

  const byId = new Map<string, number[]>();
  stations.forEach((st, i) => {
    const pid = of(st);
    const list = byId.get(pid) ?? [];
    list.push(i);
    byId.set(pid, list);
  });

  return ORDER.flatMap((pid) => {
    const at = byId.get(pid);
    if (!at || at.length === 0) return [];
    return [{ id: pid, label: LABELS[pid] ?? pid, at }];
  });
}

export function stagePage(id: StageId): HTMLElement {
  const found = STAGE_BY_ID.get(id);
  if (!found) return notFound(id);
  const stage: Stage = found;

  const stations = buildStations(stage);
  const phases = phasesOf(stage, stations);
  const nodeAt = stations.flatMap((st, i) => (st.kind === 'turn' ? [i] : []));
  const track = stageThread(stations.length, nodeAt);

  /*
   * The traverse always opens at the entrance.
   *
   * Where this sitting had got to is remembered and offered as a control, not
   * applied silently: arriving in the middle of a stage with no explanation is
   * disorienting, and it would also make the same address show two different
   * screens depending on history.
   */
  const resumeAt = Math.min(getStop(stage.id), stations.length - 1);
  let index = 0;
  // Which side of each turning point the viewer has walked to. Kept for the
  // life of the page so stepping away and back does not silently rewind it.
  const turnPhase = new Map<string, TurnPhase>();

  const head = stageHead(stage);
  const panel = h('div', { class: 'walk__panel', aria: { live: 'polite' } });
  const counter = h('span', { class: 'walk__counter' });
  const hits = h('div', { class: 'walk__hits' });

  const prevBtn = h(
    'button',
    { class: 'btn walk__nav', type: 'button', aria: { label: 'Nhịp trước trong chặng' } },
    icon(ICONS.prev),
    h('span', { text: 'Trước' }),
  );
  const nextBtn = h(
    'button',
    { class: 'btn btn--primary walk__nav', type: 'button', aria: { label: 'Nhịp sau trong chặng' } },
    h('span', { text: 'Tiếp' }),
    icon(ICONS.next),
  );

  function paintTrack(): void {
    const inked = track.querySelector<SVGPathElement>('.track__inked');
    const denom = Math.max(1, stations.length - 1);
    if (inked) inked.style.setProperty('--inked', String(index / denom));

    for (const mark of track.querySelectorAll<SVGElement>('.track__tick, .track__node')) {
      const i = Number(mark.dataset['index'] ?? '-1');
      mark.dataset['state'] = i < index ? 'done' : i === index ? 'current' : 'todo';
      const st = stations[i];
      if (st?.kind === 'turn') {
        mark.dataset['turn'] = turnPhase.get(st.turn.id) ?? 'before';
      }
    }

    for (const hit of hits.querySelectorAll<HTMLButtonElement>('.walk__hit')) {
      const i = Number(hit.dataset['index'] ?? '-1');
      hit.setAttribute('aria-current', i === index ? 'step' : 'false');
      hit.tabIndex = i === index ? 0 : -1;
    }

    for (const btn of map.querySelectorAll<HTMLButtonElement>('.walk__phase')) {
      const pid = btn.dataset['phase'];
      const phase = phases.find((p) => p.id === pid);
      const here = phase ? phase.at.includes(index) : false;
      btn.dataset['state'] = here ? 'here' : 'away';
      btn.setAttribute('aria-current', here ? 'true' : 'false');
    }

    // Crossing a turning point is the only thing that fills the margin record,
    // and every crossing comes through here.
    gained.sync();
  }

  function render(): void {
    const station = stations[index];
    if (!station) return;

    setStop(stage.id, index);

    clear(panel);
    panel.appendChild(
      station.kind === 'turn'
        ? turnStation(station.turn, turnPhase.get(station.turn.id) ?? 'before', (next) => {
            turnPhase.set(station.turn.id, next);
            paintTrack();
          })
        : stationView(station, stage),
    );

    counter.textContent = `${String(index + 1)} / ${String(stations.length)}`;

    // Reaching either end disables the control that got you there. Disabling
    // the focused element drops focus to the document, which strands a keyboard
    // user mid-traverse, so hand focus to the control that is still live.
    const focused = document.activeElement;
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === stations.length - 1;
    if (focused === prevBtn && prevBtn.disabled) nextBtn.focus();
    else if (focused === nextBtn && nextBtn.disabled) prevBtn.focus();
    // The full official heading stands at the entrance to the stage; after that
    // a compact context bar carries it, with the exact wording one click away
    // and always present for assistive technology.
    head.setMode(index === 0 ? 'full' : 'compact');
    // The hand-off to the next stage belongs at the end of this one, not beside
    // its first passage.
    bridgeEl.hidden = index !== stations.length - 1;
    paintTrack();

    if (!motionSuppressed()) {
      panel.dataset['enter'] = 'true';
      requestAnimationFrame(() => {
        delete panel.dataset['enter'];
      });
    }
  }

  function go(to: number): void {
    const next = Math.max(0, Math.min(stations.length - 1, to));
    if (next === index) return;
    index = next;
    render();
  }

  function focusCurrentHit(): void {
    const hit = hits.querySelector<HTMLElement>(`.walk__hit[data-index="${String(index)}"]`);
    // offsetParent is null when the marks are hidden on a narrow screen; moving
    // focus to an invisible control would strand a keyboard user.
    if (hit && hit.offsetParent !== null) hit.focus();
  }

  prevBtn.addEventListener('click', () => {
    go(index - 1);
  });
  nextBtn.addEventListener('click', () => {
    go(index + 1);
  });

  stations.forEach((st, i) => {
    const t = stations.length === 1 ? 0.5 : i / (stations.length - 1);
    const hit = h('button', {
      class: 'walk__hit',
      type: 'button',
      dataset: { index: String(i), kind: st.kind },
      tabIndex: i === 0 ? 0 : -1,
      aria: { label: stationLabel(st, i, stations.length) },
    });
    // The track reserves 4% of its width as padding at each end.
    hit.style.insetInlineStart = `calc(4% + ${String(t * 92)}%)`;
    hit.addEventListener('click', () => {
      go(i);
      hit.focus();
    });
    hits.appendChild(hit);
  });

  /*
   * Two ways to take the same stage.
   *
   * The guided traverse carries one idea per screen, which is what the stage is
   * built for. But a stage holds between eleven and twenty stops, and asking
   * for twenty clicks before a reader may simply read is a toll, not a design.
   * Continuous reading lays the identical stations out in the identical printed
   * order on one page. Nothing is added, removed, merged or shortened in either
   * mode, and the choice is remembered.
   *
   * The continuous view is built on first use, not up front, so a stage that is
   * only ever walked never pays for it.
   */
  let reading = getReading();
  const flowEl = h('div', { class: 'walk__flow', hidden: true });
  let flowBuilt = false;

  const readBtn = h('button', { class: 'walk__read', type: 'button' });

  function buildFlow(): void {
    if (flowBuilt) return;
    flowBuilt = true;
    stations.forEach((st, i) => {
      const view =
        st.kind === 'turn'
          ? turnStation(st.turn, turnPhase.get(st.turn.id) ?? 'before', (next) => {
              turnPhase.set(st.turn.id, next);
              paintTrack();
            })
          : stationView(st, stage);
      view.dataset['station'] = String(i);
      flowEl.appendChild(view);
    });
  }

  /*
   * The stage seen as structure rather than as a count.
   *
   * Each control names a phase of the stage and how many stops it holds, and
   * moves the traverse to the first of them. In continuous reading it scrolls
   * to the same station instead. This is the one place a viewer can see what is
   * still ahead of them inside a stage.
   */
  const map = h('div', { class: 'walk__map', role: 'group', aria: { label: 'Các phần của chặng' } });
  for (const phase of phases) {
    const first = phase.at[0] ?? 0;
    const btn = h(
      'button',
      {
        class: 'walk__phase',
        type: 'button',
        dataset: { phase: phase.id, state: 'away' },
        aria: {
          label: `${phase.label}: ${String(phase.at.length)} nhịp. Tới nhịp đầu tiên của phần này.`,
        },
      },
      h('span', { class: 'walk__phase-label', text: phase.label }),
      h('span', { class: 'walk__phase-n', text: String(phase.at.length) }),
    );
    btn.addEventListener('click', () => {
      if (reading === 'flow') {
        flowEl.querySelector(`[data-station="${String(first)}"]`)?.scrollIntoView({
          block: 'start',
          behavior: motionSuppressed() ? 'auto' : 'smooth',
        });
        return;
      }
      go(first);
    });
    map.appendChild(btn);
  }

  const walk = h('div', { class: 'walk__track' }, track, hits);

  function paintReading(): void {
    const flow = reading === 'flow';
    if (flow) buildFlow();
    section.dataset['reading'] = reading;
    flowEl.hidden = !flow;
    panel.hidden = flow;
    walk.hidden = flow;
    controls.hidden = flow;
    readBtn.textContent = flow ? 'Đi từng nhịp' : 'Đọc liền mạch';
    readBtn.setAttribute(
      'aria-label',
      flow
        ? 'Chuyển sang đi từng nhịp, mỗi màn hình một nhịp'
        : 'Chuyển sang đọc liền mạch, tất cả các nhịp trên một trang',
    );
    readBtn.setAttribute('aria-pressed', flow ? 'true' : 'false');
    // In continuous reading the end of the stage is always on the page, so the
    // hand-off belongs there permanently rather than at one stop.
    bridgeEl.hidden = flow ? false : index !== stations.length - 1;
  }

  readBtn.addEventListener('click', () => {
    reading = reading === 'flow' ? 'walk' : 'flow';
    setReading(reading);
    paintReading();
    if (reading === 'walk') render();
    readBtn.focus();
  });

  /*
   * Arrow keys move along the thread from the per-stop marks and from the
   * Prev/Next buttons alike. That matters on a narrow screen, where the marks
   * are not shown: with twenty stops across a phone width each mark would be
   * about 18px and overlap its neighbour, which is neither tappable nor within
   * the target-size minimum. There, Prev/Next carries the traverse.
   */
  const onArrow = (ev: Event): void => {
    if (!(ev instanceof KeyboardEvent)) return;
    const key = ev.key;
    if (key === 'ArrowRight' || key === 'ArrowDown') {
      ev.preventDefault();
      go(index + 1);
      focusCurrentHit();
    } else if (key === 'ArrowLeft' || key === 'ArrowUp') {
      ev.preventDefault();
      go(index - 1);
      focusCurrentHit();
    } else if (key === 'Home') {
      ev.preventDefault();
      go(0);
      focusCurrentHit();
    } else if (key === 'End') {
      ev.preventDefault();
      go(stations.length - 1);
      focusCurrentHit();
    }
  };

  walk.addEventListener('keydown', onArrow);

  const controls = h('div', { class: 'walk__controls' }, prevBtn, counter, nextBtn);
  controls.addEventListener('keydown', onArrow);

  /*
   * Where this sitting had got to, offered rather than applied. It appears only
   * when there is somewhere to go back to, and it says exactly where it leads.
   */
  const resumeBtn =
    resumeAt > 0
      ? h(
          'button',
          {
            class: 'walk__resume',
            type: 'button',
            aria: {
              label: `Tiếp tục từ nhịp ${String(resumeAt + 1)} trên ${String(stations.length)}, nơi bạn dừng lại lần trước`,
            },
          },
          h('span', { text: `Tiếp tục từ nhịp ${String(resumeAt + 1)} / ${String(stations.length)}` }),
        )
      : null;
  if (resumeBtn) {
    resumeBtn.addEventListener('click', () => {
      go(resumeAt);
      resumeBtn.hidden = true;
      nextBtn.focus();
    });
  }

  const bridgeEl = bridge(stage);

  const bar = h(
    'div',
    { class: 'walk__bar' },
    map,
    h('div', { class: 'walk__bar-acts' }, resumeBtn, readBtn),
  );

  const gained = clarified(stage, turnPhase);

  // The documentary position for this stage. Blocked until a photograph has a
  // source that can be opened and a usage condition that permits it.
  const slot = FIGURE_SLOTS.find((s) => s.stageId === stage.id);
  const figure = slot ? h('div', { class: 'walk__figure' }, figureSlot(slot.id, slot.role)) : null;

  /*
   * The reading column keeps its measure and the margin gets a job.
   *
   * Body text is capped at 66ch because longer lines are harder to read, which
   * on a wide screen left almost half the stage empty. Widening the text would
   * trade one problem for a worse one, so the space beside it carries the
   * record of what the viewer has opened so far instead: the stage's turning
   * points, blank until crossed, then holding the sentence that names what
   * changed. It is the argument of the stage, accumulating.
   */
  const section = h(
    'section',
    { class: 'walk' },
    head.root,
    bar,
    h(
      'div',
      { class: 'walk__body' },
      h('div', { class: 'walk__column' }, walk, controls, panel, flowEl, bridgeEl),
      h('div', { class: 'walk__margin' }, figure, gained.root),
    ),
    pager(stage),
  );

  if (stage.id === 'ky-5') section.appendChild(epilogueLink());

  render();
  paintReading();
  return section;
}

interface Clarified {
  root: HTMLElement;
  sync: () => void;
}

/**
 * What this stage has made clear so far.
 *
 * One row per turning point the excerpt records, in printed order. A row that
 * has not been crossed shows only its printed time marker, so the viewer can
 * see there is something still to reach. A crossed one shows the group's
 * sentence for what changed, labelled as such.
 *
 * Nothing here is new: the markers, the titles and the shift sentences are the
 * same stored values the stations show, and a row can only fill in as a result
 * of the viewer crossing that turning point themselves.
 */
function clarified(stage: Stage, phases: Map<string, TurnPhase>): Clarified {
  const list = h('ol', { class: 'gained__list' });
  const ordinalOf = STAGES.findIndex((s) => s.id === stage.id) + 1;

  for (const tp of stage.turningPoints) {
    list.appendChild(
      h(
        'li',
        { class: 'gained__item', dataset: { id: tp.id, state: 'todo' } },
        h('p', { class: 'gained__marker', text: tp.marker }),
        h('p', { class: 'gained__title', text: tp.title }),
        h('p', { class: 'gained__shift', text: tp.shift }),
        h('p', { class: 'gained__todo', text: 'Chưa mở' }),
      ),
    );
  }

  const count = h('p', { class: 'gained__count' });

  const root = h(
    'aside',
    { class: 'gained', aria: { label: 'Những gì chặng này đã làm rõ' } },
    h('p', { class: 'gained__kicker', text: 'Đã làm rõ trong chặng này' }),
    list,
    count,
    h(
      'p',
      { class: 'gained__where' },
      h('span', { class: 'gained__where-n', text: `${String(ordinalOf)} / ${String(STAGES.length)}` }),
      h('span', { text: 'chặng của hành trình' }),
    ),
  );

  const sync = (): void => {
    let done = 0;
    for (const item of list.querySelectorAll<HTMLElement>('.gained__item')) {
      const id = item.dataset['id'] ?? '';
      const open = phases.get(id) === 'after';
      const was = item.dataset['state'];
      item.dataset['state'] = open ? 'done' : 'todo';
      /*
       * The one moment of feedback in the margin.
       *
       * What it is for: crossing a turning point happens in the reading column
       * and its result is recorded over here, which is easy to miss. A single
       * short mark on the row that just filled says the action landed and
       * where. It runs only on the transition into 'done', never on a repaint,
       * so stepping between stops does not set the margin flickering.
       */
      if (open && was === 'todo' && !motionSuppressed()) {
        item.animate(
          [
            { backgroundColor: 'var(--son-wash)', offset: 0 },
            { backgroundColor: 'var(--son-wash)', offset: 0.45 },
            { backgroundColor: 'transparent', offset: 1 },
          ],
          { duration: 900, easing: 'ease-out' },
        );
      }
      if (open) done++;
    }
    const total = stage.turningPoints.length;
    count.textContent =
      done === 0
        ? total === 1
          ? 'Chặng này có 1 bước ngoặt. Mở nó ra để thấy điều gì đã thay đổi.'
          : `Chặng này có ${String(total)} bước ngoặt. Mở chúng ra để thấy điều gì đã thay đổi.`
        : done === total
          ? 'Đã mở hết các bước ngoặt của chặng này.'
          : `Đã mở ${String(done)} trên ${String(total)} bước ngoặt.`;
  };

  sync();
  return { root, sync };
}

/**
 * The hand-off from one stage to the next.
 *
 * A stage that simply stops leaves the reader to work out for themselves what
 * the next one has to do with it. Everything printed here is stored source
 * material: the claim half of the next stage's own official heading, and the
 * label the two headings share at their boundary. The one sentence that is the
 * group's - naming the joint as shared or as blurred - is what the boundary
 * record already says, and the registered risk travels with it.
 */
function bridge(stage: Stage): HTMLElement {
  const i = STAGES.findIndex((s) => s.id === stage.id);
  const next = STAGES[i + 1];
  const boundary = BOUNDARIES[i];

  const root = h('aside', { class: 'bridge', hidden: true });

  if (!next) {
    root.appendChild(h('p', { class: 'bridge__kicker', text: 'Hết năm chặng' }));
    root.appendChild(
      h('p', {
        class: 'bridge__claim',
        text: 'Đây là chặng cuối trong trích đoạn được giao. Phần tổng hợp dựng lại cả năm chặng và trở về câu hỏi trung tâm.',
      }),
    );
    root.appendChild(
      h('a', { class: 'btn btn--primary bridge__go', href: '#/tong-hop' }, h('span', { text: 'Sang phần tổng hợp' })),
    );
    return root;
  }

  root.appendChild(h('p', { class: 'bridge__kicker', text: 'Sợi chỉ đi tiếp' }));
  if (boundary) {
    const risk = boundary.riskId ? RISK_BY_ID.get(boundary.riskId) : undefined;
    root.appendChild(
      h(
        'p',
        { class: 'bridge__joint', dataset: { kind: boundary.kind } },
        h('span', {
          text:
            boundary.kind === 'blurred'
              ? 'Hai tiêu đề liền nhau, ranh giới in mờ: '
              : 'Hai tiêu đề liền nhau dùng chung một ranh giới: ',
        }),
        h('span', { class: 'bridge__joint-label', text: boundary.label }),
        risk ? h('span', { class: 'station__flag', text: risk.id }) : null,
      ),
    );
  }
  root.appendChild(h('p', { class: 'bridge__period', text: next.headingPeriod }));
  root.appendChild(h('p', { class: 'bridge__claim', text: next.headingClaim }));

  /*
   * Why go on, rather than merely where to.
   *
   * A hand-off that only names the next stage gives a reader no reason to open
   * it. The question the next stage opens with is already written and already
   * labelled as the group's; printing it here turns "Tiếp" into an invitation
   * with something at stake. It is the same sentence the next screen shows, so
   * nothing new is introduced by putting it one screen earlier.
   */
  root.appendChild(
    h(
      'p',
      { class: 'bridge__ask-label' },
      h('span', { text: 'Chặng sau mở bằng câu hỏi' }),
      h('span', { class: 'station__flag', text: 'DIỄN GIẢI CỦA NHÓM' }),
    ),
  );
  root.appendChild(h('p', { class: 'bridge__ask', text: STAGE_ENTRY[next.id].question }));

  root.appendChild(
    h(
      'a',
      { class: 'btn btn--primary bridge__go', href: `#/chang/${next.id}` },
      h('span', { text: `Vào chặng ${String(next.ordinal)}` }),
      h('span', { class: 'visually-hidden', text: `: ${next.heading}` }),
    ),
  );

  return root;
}

/** What a stop on the thread is called when it is announced, not just where. */
function stationLabel(station: Station, i: number, total: number): string {
  const where = `Nhịp ${String(i + 1)} trên ${String(total)}`;
  switch (station.kind) {
    case 'turn':
      return `${where}: bước ngoặt ${station.turn.marker}`;
    case 'quote':
      return `${where}: trích dẫn nguyên văn`;
    case 'boundary':
      return `${where}: ranh giới của chặng`;
    case 'passage':
      return `${where}: đoạn ${station.passage.id}`;
  }
}

interface Head {
  root: HTMLElement;
  setMode: (mode: 'full' | 'compact') => void;
}

/**
 * The stage header.
 *
 * `full` prints the exact official heading, verbatim and complete, at the
 * entrance to the stage. `compact` replaces it visually with the stage number
 * and its period and moves the exact heading behind a disclosure - but never
 * out of the accessibility tree, so a screen reader still reads the official
 * wording at every stop, and never out of the evidence magnifier either.
 */
function stageHead(stage: Stage): Head {
  const heading = h('h1', { class: 'walk__heading', text: stage.heading });

  // The exact heading is still in the accessibility tree at every stop, so this
  // bar would otherwise be read out twice. It is decoration for the eye only.
  const context = h(
    'p',
    { class: 'walk__context', aria: { hidden: 'true' } },
    h('span', { class: 'walk__context-ord', text: `Chặng ${String(stage.ordinal)}` }),
    h('span', { class: 'walk__context-period', text: stage.headingPeriod }),
  );

  const expandBtn = h('button', {
    class: 'walk__expand',
    type: 'button',
    text: 'Tiêu đề đầy đủ',
    aria: { expanded: 'false' },
  });

  /*
   * The stage opens by asking, not by asserting.
   *
   * The question is the group's wording and says so on the surface, with its
   * basis one click away. It is a question precisely so that it can stand in
   * front of the source material without adding a claim to it. It belongs to
   * the entrance, so it collapses with the heading once the traverse moves on.
   */
  const entry = STAGE_ENTRY[stage.id];
  const ask = h(
    'div',
    { class: 'walk__ask' },
    h(
      'p',
      { class: 'walk__ask-label' },
      h('span', { text: 'Câu hỏi dẫn vào chặng' }),
      h('span', { class: 'station__flag', text: 'DIỄN GIẢI CỦA NHÓM' }),
    ),
    h('p', { class: 'walk__ask-text', text: entry.question }),
    lensTrigger(
      {
        title: 'Câu hỏi dẫn vào chặng này',
        items: [
          { label: 'Trạng thái', value: STAGE_ENTRY_STATUS, tone: 'status' },
          {
            label: 'Nghĩa là',
            value:
              'Đây là câu hỏi do nhóm đặt để dẫn vào chặng, không phải câu in trong trích đoạn. Nó được viết dưới dạng câu hỏi để không thêm bất kỳ khẳng định nào vào nguồn.',
            tone: 'caution',
          },
          { label: 'Dựa trên', value: entry.basis, tone: 'plain' },
          { label: 'Tiêu đề chính thức, nguyên văn', value: stage.heading, tone: 'plain' },
          { label: 'Vị trí trong trích đoạn', value: readLocator(stage.at), tone: 'locator' },
        ],
      },
      'Câu hỏi này của ai?',
    ),
  );

  const root = h(
    'header',
    { class: 'walk__head', dataset: { mode: 'full', expanded: 'false' } },
    h(
      'p',
      { class: 'walk__kicker' },
      h('span', { class: 'walk__ord', text: String(stage.ordinal) }),
      h('span', { text: `Chặng ${String(stage.ordinal)} trong năm chặng` }),
    ),
    heading,
    context,
    ask,
    // The optional guess stands beside the question rather than inside it: it
    // is an offer about the question, not part of what the question says.
    predictPanel(stage),
    h(
      'div',
      { class: 'walk__apparatus' },
      expandBtn,
      lensTrigger(stageEvidence(stage), 'Nguồn và trạng thái'),
    ),
  );

  expandBtn.addEventListener('click', () => {
    const open = root.dataset['expanded'] !== 'true';
    root.dataset['expanded'] = open ? 'true' : 'false';
    expandBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    expandBtn.textContent = open ? 'Thu gọn tiêu đề' : 'Tiêu đề đầy đủ';
  });

  return {
    root,
    setMode: (mode) => {
      root.dataset['mode'] = mode;
      if (mode === 'full') {
        root.dataset['expanded'] = 'false';
        expandBtn.setAttribute('aria-expanded', 'false');
        expandBtn.textContent = 'Tiêu đề đầy đủ';
      }
    },
  };
}

function stageEvidence(stage: Stage): { title: string; items: EvidenceItem[] } {
  const items: EvidenceItem[] = [
    { label: 'Tiêu đề chính thức, nguyên văn', value: stage.heading, tone: 'plain' },
    { label: 'Vị trí trong trích đoạn', value: readLocator(stage.at), tone: 'locator' },
    { label: 'Vị trí, nguyên dạng lưu trữ', value: stage.at, tone: 'plain' },
    { label: 'Loại nội dung', value: 'SOURCE CONTENT', tone: 'status' },
    {
      label: 'Trạng thái',
      value: 'NEED VERIFICATION — chưa đối chiếu với giáo trình chính thống',
      tone: 'status',
    },
  ];

  for (const rid of stage.riskIds) {
    const risk = RISK_BY_ID.get(rid);
    if (risk) {
      items.push({ label: risk.id, value: `${risk.title} — ${risk.handling}`, tone: 'caution' });
    }
  }

  if (stage.locatorIds.length === 0) {
    items.push({
      label: 'Ứng viên định vị',
      value: 'Không có chú thích số nào được in trong phần này của trích đoạn.',
      tone: 'plain',
    });
  } else {
    // The printed note itself, verbatim - not just its id. An abbreviation such
    // as `Sđd` has to stay visible and unexpanded next to the content it is
    // attached to, not only in the register at #/kiem-chung.
    for (const lid of stage.locatorIds) {
      const loc = LOCATOR_BY_ID.get(lid);
      if (!loc) continue;
      items.push({ label: `${loc.id} · ${readLocator(loc.at)}`, value: loc.printed, tone: 'locator' });
      if (loc.caution) {
        items.push({ label: `${loc.id} · lưu ý`, value: loc.caution, tone: 'caution' });
      }
    }
  }

  return { title: `Chặng ${String(stage.ordinal)}: nguồn và trạng thái`, items };
}

function stationView(station: Station, stage: Stage): HTMLElement {
  switch (station.kind) {
    case 'passage':
      return passageView(station.passage, stage);
    case 'quote':
      return quoteView(station.quotation);
    case 'boundary':
      return boundaryView(station.lines);
    case 'turn':
      // Turn stations carry their own state and are built by the caller.
      return turnStation(station.turn, 'before', () => undefined);
  }
}

/**
 * Split a passage for reading, at sentence boundaries only.
 *
 * Never mid-sentence, never reworded, never dropped: the parts concatenate back
 * to the stored text exactly, and the whole text stays in the magnifier. A
 * single-sentence passage is never cut, however long it is - there is no
 * honest place to break it.
 */
export function splitForReading(text: string, limit = 90): string[] {
  const words = (t: string): number => t.trim().split(/\s+/).filter(Boolean).length;
  if (words(text) <= limit) return [text];

  const sentences = text.match(/[^.?!]+[.?!]+\s*|[^.?!]+$/g);
  if (!sentences || sentences.length < 2) return [text];

  const parts: string[] = [];
  let current = '';
  for (const sentence of sentences) {
    if (current && words(current) + words(sentence) > limit) {
      parts.push(current);
      current = sentence;
    } else {
      current += sentence;
    }
  }
  if (current) parts.push(current);

  return parts.length > 1 ? parts.map((t) => t.trim()) : [text];
}

function passageView(p: Passage, stage: Stage): HTMLElement {
  const parts = splitForReading(p.text);

  const items: EvidenceItem[] = [
    { label: 'Mã đoạn', value: p.id, tone: 'plain' },
    { label: 'Vị trí', value: readLocator(p.at), tone: 'locator' },
    { label: 'Vị trí, nguyên dạng lưu trữ', value: p.at, tone: 'plain' },
  ];
  if (parts.length > 1) {
    // Split for reading, so the whole of it stays available in one piece here.
    items.push({ label: 'Toàn văn đoạn', value: p.text, tone: 'plain' });
  }
  if (p.evaluative) {
    items.push({
      label: 'Lưu ý',
      value:
        'Đây là ngôn ngữ đánh giá do trích đoạn đưa ra. Nó cần được kiểm chứng độc lập trước khi dùng như sự kiện đã xác lập.',
      tone: 'caution',
    });
  }
  if (p.caution) items.push({ label: 'Ghi chú bản in', value: p.caution, tone: 'caution' });

  const kind = stage.context.some((c) => c.id === p.id)
    ? 'Bối cảnh và trải nghiệm'
    : 'Chuyển biến nhận thức';

  const body = h('p', { class: 'station__text', text: parts[0] ?? p.text });
  const foot = h('div', { class: 'station__foot' });

  const article = h(
    'article',
    { class: 'station', dataset: { kind: 'passage' } },
    h(
      'p',
      { class: 'station__kicker' },
      h('span', { text: kind }),
      p.evaluative ? h('span', { class: 'station__flag', text: 'ngôn ngữ đánh giá' }) : null,
    ),
    body,
    foot,
  );

  if (parts.length > 1) {
    let at = 0;
    const counter = h('span', { class: 'station__part' });
    const more = h('button', { class: 'btn station__more', type: 'button' });
    const back = h('button', { class: 'btn station__back', type: 'button', text: 'Phần trước' });

    const paint = (): void => {
      body.textContent = parts[at] ?? p.text;
      counter.textContent = `Phần ${String(at + 1)} / ${String(parts.length)}`;
      more.textContent = 'Đọc tiếp đoạn này';
      more.hidden = at >= parts.length - 1;
      back.hidden = at === 0;
    };

    more.addEventListener('click', () => {
      at = Math.min(parts.length - 1, at + 1);
      paint();
      body.focus();
    });
    back.addEventListener('click', () => {
      at = Math.max(0, at - 1);
      paint();
      body.focus();
    });

    body.tabIndex = -1;
    article.dataset['split'] = 'true';
    foot.appendChild(counter);
    foot.appendChild(back);
    foot.appendChild(more);
    paint();
  }

  foot.appendChild(lensTrigger({ title: p.id, items }, readLocator(p.at)));
  return article;
}

/**
 * A turning point, crossed rather than read at once.
 *
 * The excerpt gives two positions either side of the moment. The viewer stands
 * on the near side first, crosses deliberately, and only then sees the far side
 * and the summary. Nothing is dropped or shortened: `before`, `after` and
 * `shift` are all the stored text in full, and the crossing is reversible.
 *
 * On `shift`: with a single exception in stage 2, the stored `shift` sentences
 * are the group's own one-line formulation of what changed, NOT wording printed
 * in the excerpt. They are therefore labelled `PROJECT DECISION` wherever they
 * appear, and the magnifier carries their basis - the two positions, the cited
 * passages, and the printed time marker.
 */
function turnStation(
  tp: TurningPoint,
  initial: TurnPhase,
  onPhase: (next: TurnPhase) => void,
): HTMLElement {
  let phase: TurnPhase = initial;

  const body = h('div', { class: 'turn__body' });
  const crossBtn = h('button', { class: 'btn turn__cross', type: 'button' });

  const basis: EvidenceItem[] = [
    { label: 'Mốc in trong trích đoạn', value: tp.marker, tone: 'locator' },
    { label: 'Câu tóm tắt bước ngoặt', value: 'PROJECT DECISION', tone: 'status' },
    {
      label: 'Nghĩa là',
      value:
        'Đây là cách diễn đạt của nhóm, không phải câu in trong trích đoạn. Căn cứ là hai vị trí trước và sau, cùng các đoạn được dẫn dưới đây.',
      tone: 'caution',
    },
    { label: 'Trước đó', value: tp.before, tone: 'plain' },
    { label: 'Sau đó', value: tp.after, tone: 'plain' },
    { label: 'Các đoạn làm căn cứ', value: tp.passageIds.join(', '), tone: 'locator' },
  ];
  if (tp.quotationIds.length > 0) {
    basis.push({ label: 'Trích dẫn liên quan', value: tp.quotationIds.join(', '), tone: 'locator' });
  }
  if (tp.caution) basis.push({ label: 'Ghi chú bản in', value: tp.caution, tone: 'caution' });

  function paint(): void {
    clear(body);

    const beforeState = h(
      'div',
      { class: 'turn__state', dataset: { side: 'before' } },
      h('p', { class: 'turn__label', text: 'Trước đó' }),
      h('p', { class: 'turn__text', text: tp.before }),
    );

    if (phase === 'before') {
      body.appendChild(beforeState);
      return;
    }

    /*
     * Once crossed, both positions stand together.
     *
     * The near side used to be removed at this point, which left the whole
     * weight of the moment on the reader's memory of a paragraph they could no
     * longer see - and the change from one position to the other IS the
     * content here. Keeping both, with the near side stepped back and an arrow
     * between them, lets the contrast be read rather than recalled.
     *
     * What the crossing still guarantees is unchanged and still tested: the far
     * side and the summary do not exist on the page until the viewer crosses.
     */
    body.appendChild(
      h(
        'div',
        { class: 'turn__pair' },
        beforeState,
        h('span', { class: 'turn__arrow', aria: { hidden: 'true' } }),
        h(
          'div',
          { class: 'turn__state', dataset: { side: 'after' } },
          h('p', { class: 'turn__label', text: 'Sau đó' }),
          h('p', { class: 'turn__text', text: tp.after }),
        ),
      ),
    );
    body.appendChild(
      h(
        'div',
        { class: 'turn__shift' },
        h(
          'p',
          { class: 'turn__shift-label' },
          h('span', { text: 'Nhóm tóm tắt bước ngoặt' }),
          // Audience wording. The audit code `PROJECT DECISION` is kept intact
          // one click away, in the magnifier and in the compliance record.
          h('span', { class: 'station__flag', text: 'DIỄN GIẢI CỦA NHÓM' }),
        ),
        h('p', { class: 'station__shift', text: tp.shift }),
      ),
    );
  }

  /*
   * The pending crossing animation, kept so it can be cancelled.
   *
   * Correctness must not depend on a timer firing: a viewer who crosses, crosses
   * back and crosses again within the window would otherwise leave stale timers
   * to repaint over the live state. Every entry into setPhase cancels whatever
   * was in flight and sets the final state itself.
   */
  let crossing: number | null = null;

  function setPhase(next: TurnPhase): void {
    if (crossing !== null) {
      window.clearTimeout(crossing);
      crossing = null;
    }

    phase = next;
    onPhase(next);
    crossBtn.textContent = next === 'before' ? 'Điều gì đã thay đổi?' : 'Quay lại trạng thái trước';
    crossBtn.dataset['dir'] = next;

    // The thread moves first, then the far side arrives. With motion switched
    // off there is nothing to wait for, so the content swaps immediately: the
    // crossing is content, not decoration, and has to work either way.
    if (next === 'after' && !motionSuppressed()) {
      body.dataset['crossing'] = 'true';
      crossing = window.setTimeout(() => {
        crossing = null;
        // The viewer may have stepped to another stop while the thread moved.
        if (!body.isConnected || phase !== 'after') return;
        delete body.dataset['crossing'];
        paint();
      }, 300);
      return;
    }

    delete body.dataset['crossing'];
    paint();
  }

  crossBtn.addEventListener('click', () => {
    setPhase(phase === 'before' ? 'after' : 'before');
  });

  const root = h(
    'article',
    { class: 'station station--turn', dataset: { kind: 'turn' } },
    h(
      'p',
      { class: 'station__kicker' },
      h('span', { class: 'station__marker', text: tp.marker }),
      h('span', { text: 'Bước ngoặt' }),
      tp.caution ? h('span', { class: 'station__flag', text: 'có ghi chú bản in' }) : null,
    ),
    h('h2', { class: 'station__turn-title', text: tp.title }),
    body,
    h('div', { class: 'station__foot' }, crossBtn, lensTrigger({ title: tp.title, items: basis }, 'Căn cứ')),
  );

  setPhase(initial);
  return root;
}

function quoteView(q: Quotation): HTMLElement {
  const items: EvidenceItem[] = [
    { label: 'Trích đoạn gán cho', value: q.attribution, tone: 'plain' },
    { label: 'Vị trí', value: q.at, tone: 'locator' },
    {
      label: 'Ứng viên định vị',
      value: q.locatorIds.length > 0 ? q.locatorIds.join(', ') : 'Không có chú thích số',
      tone: 'locator',
    },
  ];
  if (q.caution) items.push({ label: 'Lưu ý', value: q.caution, tone: 'caution' });

  return h(
    'article',
    { class: 'station', dataset: { kind: 'quote' } },
    h('p', { class: 'station__kicker' }, h('span', { text: 'Nguyên văn in trong trích đoạn' })),
    h('blockquote', { class: 'station__quote' }, h('p', { text: q.text })),
    h('p', { class: 'station__attrib', text: q.attribution }),
    h('div', { class: 'station__foot' }, lensTrigger({ title: 'Trích dẫn', items }, readLocator(q.at))),
  );
}

/** The last stop: what the excerpt does not say, kept on the main path. */
function boundaryView(lines: readonly string[]): HTMLElement {
  const list = h('ul', { class: 'station__bounds' });
  for (const line of lines) list.appendChild(h('li', { text: line }));

  return h(
    'article',
    { class: 'station', dataset: { kind: 'boundary' } },
    h('p', { class: 'station__kicker' }, h('span', { text: 'Ranh giới của chặng này' })),
    h('h2', { class: 'station__turn-title', text: 'Những gì trích đoạn không nói' }),
    list,
  );
}

function epilogueLink(): HTMLElement {
  return h(
    'p',
    { class: 'walk__epilogue' },
    h('span', { text: `${EPILOGUE.label} — ` }),
    h('span', { text: EPILOGUE.status }),
  );
}

function pager(stage: Stage): HTMLElement {
  const i = STAGES.findIndex((s) => s.id === stage.id);
  const prev = STAGES[i - 1];
  const next = STAGES[i + 1];

  const row = h('nav', { class: 'walk__pager', aria: { label: 'Chuyển chặng' } });

  row.appendChild(
    prev
      ? h(
          'a',
          { class: 'walk__pager-link', href: `#/chang/${prev.id}` },
          h('span', { class: 'walk__pager-dir', text: 'Chặng trước' }),
          h('span', { class: 'walk__pager-name', text: prev.headingPeriod }),
        )
      : h(
          'a',
          { class: 'walk__pager-link', href: '#/hanh-trinh' },
          h('span', { class: 'walk__pager-dir', text: 'Về tổng quan' }),
          h('span', { class: 'walk__pager-name', text: 'Năm chặng' }),
        ),
  );

  row.appendChild(
    next
      ? h(
          'a',
          { class: 'walk__pager-link walk__pager-link--next', href: `#/chang/${next.id}` },
          h('span', { class: 'walk__pager-dir', text: 'Sợi chỉ đi tiếp' }),
          h('span', { class: 'walk__pager-name', text: next.headingPeriod }),
        )
      : h(
          'a',
          { class: 'walk__pager-link walk__pager-link--next', href: '#/tong-hop' },
          h('span', { class: 'walk__pager-dir', text: 'Tổng hợp' }),
          h('span', { class: 'walk__pager-name', text: 'Trở lại câu hỏi trung tâm' }),
        ),
  );

  return row;
}

function notFound(id: string): HTMLElement {
  return h(
    'section',
    { class: 'walk' },
    h('h1', { class: 'walk__heading', text: 'Không tìm thấy chặng' }),
    h('p', { class: 'station__text', text: `Mã chặng "${id}" không tương ứng với chặng nào.` }),
    h('a', { class: 'btn', href: '#/hanh-trinh', text: 'Về tổng quan năm chặng' }),
  );
}
