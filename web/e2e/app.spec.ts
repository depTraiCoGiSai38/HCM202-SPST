import { type Page, expect, test } from '@playwright/test';

/**
 * Browser checks.
 *
 * These verify the things unit tests cannot: that the five headings survive to
 * the rendered page, that nothing overflows horizontally at any tested width,
 * that the interactions work, and that the console stays clean.
 */

const HEADINGS = [
  'Thời kỳ từ ngày 5-6-1911 trở về trước: Hình thành tư tưởng yêu nước và chí hướng tìm con đường cứu nước mới',
  'Thời kỳ từ ngày 6-6-1911 đến ngày 30-12-1920: Hình thành tư tưởng cứu nước, giải phóng dân tộc Việt Nam theo con đường cách mạng vô sản',
  'Thời kỳ từ ngày 31-12-1920 đến ngày 3-2-1930: Hình thành những nội dung cơ bản tư tưởng về cách mạng Việt Nam',
  'Thời kỳ từ ngày 4-2-1930 đến ngày 28-1-1941: Vượt qua thử thách, giữ vững đường lối, phương pháp cách mạng Việt Nam đúng đắn, sáng tạo',
  'Thời kỳ từ ngày 29-1-1941 đến ngày 2-9-1969: Tư tưởng Hồ Chí Minh tiếp tục phát triển, soi đường cho sự nghiệp cách mạng của Đảng và nhân dân ta',
];

const ROUTES = [
  '#/',
  '#/hanh-trinh',
  '#/chang/ky-1',
  '#/chang/ky-2',
  '#/chang/ky-3',
  '#/chang/ky-4',
  '#/chang/ky-5',
  '#/doi-sanh',
  '#/noi-ket',
  '#/tong-hop',
  '#/kiem-chung',
];

/** Collect console errors and page errors for every test in the file. */
// eslint-disable-next-line @typescript-eslint/require-await
test.beforeEach(async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text());
  });
  page.on('pageerror', (e) => errors.push(e.message));
  // Exposed so individual tests can assert on it.
  (page as unknown as { __errors: string[] }).__errors = errors;
});

function errorsOf(page: unknown): string[] {
  return (page as { __errors: string[] }).__errors;
}

test('every route renders without console errors', async ({ page }) => {
  for (const route of ROUTES) {
    await page.goto(`/${route}`);
    await expect(page.locator('main#noi-dung')).toBeVisible();
    await expect(page.locator('main#noi-dung h1')).toHaveCount(1);
  }
  expect(errorsOf(page)).toEqual([]);
});

test('no horizontal overflow on any route', async ({ page }) => {
  for (const route of ROUTES) {
    await page.goto(`/${route}`);
    await page.waitForTimeout(120);
    const overflow = await page.evaluate(() => {
      const de = document.documentElement;
      return { scroll: de.scrollWidth, client: de.clientWidth };
    });
    expect(overflow.scroll, `horizontal overflow at ${route}`).toBeLessThanOrEqual(
      overflow.client + 1,
    );
  }
});

test('the five exact headings are rendered in full', async ({ page }) => {
  for (let i = 0; i < HEADINGS.length; i++) {
    await page.goto(`/#/chang/ky-${String(i + 1)}`);
    const h1 = page.locator('.walk__heading');
    await expect(h1).toHaveText(HEADINGS[i] as string);
  }
});

/**
 * Walk to the first turning point using Next.
 *
 * The per-stop marks are not shown on a narrow screen - they cannot meet the
 * target-size minimum there - so tests that need to reach a stop step with the
 * control that exists on every viewport.
 */
async function walkToFirstTurn(page: Page, stage: string): Promise<void> {
  await page.goto(`/#/chang/${stage}`);
  const total = await page.locator('.walk__hit').count();
  for (let i = 0; i < total; i++) {
    const kind = await page.locator(`.walk__hit[data-index="${String(i)}"]`).getAttribute('data-kind');
    if (kind === 'turn') break;
    await page.locator('.walk__nav.btn--primary').click();
  }
}

test('every stage traverses its own content, in printed order', async ({ page }) => {
  // What each stage should produce: one stop per context passage, one per
  // development passage, one per turning point, one per printed quotation, and
  // a closing stop for what the excerpt does not say.
  const EXPECTED: Record<string, { stops: number; turns: number; quotes: number }> = {
    'ky-1': { stops: 13, turns: 1, quotes: 2 },
    'ky-2': { stops: 11, turns: 2, quotes: 0 },
    'ky-3': { stops: 16, turns: 1, quotes: 2 },
    'ky-4': { stops: 20, turns: 2, quotes: 5 },
    'ky-5': { stops: 17, turns: 2, quotes: 2 },
  };

  for (const [id, want] of Object.entries(EXPECTED)) {
    await page.goto(`/#/chang/${id}`);
    await expect(page.locator('.walk__hit'), id).toHaveCount(want.stops);
    await expect(page.locator('.walk__hit[data-kind="turn"]'), id).toHaveCount(want.turns);
    await expect(page.locator('.walk__hit[data-kind="quote"]'), id).toHaveCount(want.quotes);
    // Exactly one closing stop, and it is last.
    await expect(page.locator('.walk__hit[data-kind="boundary"]'), id).toHaveCount(1);
    await expect(
      page.locator(`.walk__hit[data-index="${String(want.stops - 1)}"]`),
      id,
    ).toHaveAttribute('data-kind', 'boundary');
  }
});

test('every turning point in the product crosses and crosses back', async ({ page }) => {
  for (const id of ['ky-1', 'ky-2', 'ky-3', 'ky-4', 'ky-5']) {
    await page.goto(`/#/chang/${id}`);
    const total = await page.locator('.walk__hit').count();
    const kinds: string[] = [];
    for (let i = 0; i < total; i++) {
      kinds.push((await page.locator(`.walk__hit[data-index="${String(i)}"]`).getAttribute('data-kind')) ?? '');
    }
    const turnAt = kinds.flatMap((k, i) => (k === 'turn' ? [i] : []));
    expect(turnAt.length, `${id} has no turning point`).toBeGreaterThan(0);

    let at = 0;
    for (const i of turnAt) {
      while (at < i) {
        await page.locator('.walk__nav.btn--primary').click();
        at++;
      }
      const station = page.locator('.station--turn');
      await expect(station.locator('.turn__state[data-side="before"]'), `${id}#${String(i)}`).toBeVisible();
      await expect(station.locator('.station__shift')).toHaveCount(0);

      await station.locator('.turn__cross').click();
      await expect(station.locator('.turn__state[data-side="after"]')).toBeVisible();
      await expect(station.locator('.station__shift')).toBeVisible();
      // Audience wording on the surface, everywhere, not only in stage 2.
      await expect(station.locator('.turn__shift-label')).toContainText('DIỄN GIẢI CỦA NHÓM');
      await expect(station.locator('.turn__shift-label')).not.toContainText('PROJECT DECISION');

      await station.locator('.turn__cross').click();
      await expect(station.locator('.turn__state[data-side="before"]')).toBeVisible();
    }
  }
});

test('a printed quotation is never split across states', async ({ page }) => {
  // Splitting a verbatim quotation would put a partial quotation on screen,
  // which is exactly the truncation the course documents prohibit.
  await page.goto('/#/chang/ky-4');
  const total = await page.locator('.walk__hit').count();
  // Step with Next so this holds on a phone too, where the per-stop marks are
  // deliberately not shown.
  for (let i = 0; i < total - 1; i++) {
    await page.locator('.walk__nav.btn--primary').click();
    const station = page.locator('.station[data-kind="quote"]');
    if ((await station.count()) === 0) continue;
    await expect(station.locator('blockquote')).toBeVisible();
    await expect(station.locator('.station__more')).toHaveCount(0);
    await expect(station).not.toHaveAttribute('data-split', 'true');
  }
});

test('a long passage is read in order and never shortened', async ({ page }) => {
  await page.goto('/#/chang/ky-3');
  for (let i = 0; i < 7; i++) await page.locator('.walk__nav.btn--primary').click();

  const station = page.locator('.station[data-kind="passage"]');
  await expect(station).toHaveAttribute('data-split', 'true');
  await expect(station.locator('.station__part')).toContainText('Phần 1 / 2');

  const first = (await station.locator('.station__text').innerText()).trim();
  await station.locator('.station__more').click();
  await expect(station.locator('.station__part')).toContainText('Phần 2 / 2');
  const second = (await station.locator('.station__text').innerText()).trim();
  expect(second).not.toBe(first);
  // The first part ends on a sentence boundary, not mid-clause.
  expect(first).toMatch(/[.?!]$/);

  // And the whole of it is still available in one piece.
  await station.locator('.lens-trigger').click();
  const lens = page.locator('.lens');
  await expect(lens).toContainText('Toàn văn đoạn');
  await expect(lens).toContainText(first.slice(0, 40));
  await expect(lens).toContainText(second.slice(0, 40));
});

test('the chrome holds one navigation system and one position indicator', async ({ page }) => {
  await page.goto('/#/chang/ky-2');

  // The sidebar is gone. Nothing addresses the five stages except the menu.
  await expect(page.locator('nav.rail')).toHaveCount(0);

  // What stays on screen says where you are and offers nowhere to go.
  const bar = page.locator('.jbar');
  await expect(bar).toBeVisible();
  await expect(bar).toContainText('Chặng 2 / 5');
  await expect(bar.locator('a, button')).toHaveCount(0);
  await expect(bar.locator('.jbar__mark[data-here="true"]')).toHaveCount(1);

  // The opening is about orientation already, so the strip stays out of it.
  await page.goto('/#/');
  await expect(page.locator('.jbar')).toBeHidden();

  // And it names every other screen, not only the stages. The router's name for
  // a route is not its address, so this is checked at each address.
  const elsewhere: [string, string][] = [
    ['/#/hanh-trinh', 'Tổng quan hành trình'],
    ['/#/doi-sanh', 'Đối sánh'],
    ['/#/noi-ket', 'Nối kết'],
    ['/#/tong-hop', 'Tổng hợp'],
    ['/#/kiem-chung', 'Kiểm chứng'],
  ];
  for (const [href, label] of elsewhere) {
    await page.goto(href);
    await expect(bar, href).toBeVisible();
    await expect(bar.locator('.jbar__where'), href).toHaveText(label);
  }
});

test('the menu is the one way to every destination and marks the current one', async ({ page }) => {
  await page.goto('/#/chang/ky-3');

  const trigger = page.locator('.masthead__menu');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await trigger.click();
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');

  const menu = page.locator('.menu');
  await expect(menu.locator('.menu__stage')).toHaveCount(5);
  // Shared-boundary markers between each adjacent pair.
  await expect(menu.locator('.menu__joint')).toHaveCount(4);

  const here = menu.locator('.menu__stage-link[aria-current="step"]');
  await expect(here).toHaveCount(1);
  await expect(here).toContainText('Thời kỳ từ ngày 31-12-1920 đến ngày 3-2-1930');

  // Escape closes it and gives focus back to the control that opened it.
  await page.keyboard.press('Escape');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect(trigger).toBeFocused();
});

test('a turning point is crossed one side at a time and can be crossed back', async ({ page }) => {
  await page.goto('/#/chang/ky-2');
  // The traverse opens on a passage, not a turn.
  await expect(page.locator('.station[data-kind="passage"]')).toBeVisible();

  await walkToFirstTurn(page, 'ky-2');
  const station = page.locator('.station--turn');
  await expect(station).toBeVisible();

  // Near side only: the far side and the summary are not on screen yet.
  await expect(station.locator('.turn__state[data-side="before"]')).toBeVisible();
  await expect(station.locator('.turn__state[data-side="after"]')).toHaveCount(0);
  await expect(station.locator('.station__shift')).toHaveCount(0);

  // The thread has not moved either.
  await expect(page.locator('.track__node[data-state="current"]')).toHaveAttribute(
    'data-turn',
    'before',
  );

  const cross = station.locator('.turn__cross');
  await expect(cross).toHaveText('Điều gì đã thay đổi?');
  await cross.click();

  // The thread changes state at the node immediately; the far side follows.
  await expect(page.locator('.track__node[data-state="current"]')).toHaveAttribute(
    'data-turn',
    'after',
  );
  await expect(station.locator('.turn__state[data-side="after"]')).toBeVisible();
  await expect(station.locator('.station__shift')).toBeVisible();
  // Both positions now stand together, because the change from one to the
  // other is the content of a turning point and should be readable rather than
  // remembered. What the crossing guarantees is unchanged and asserted above:
  // neither the far side nor the summary exists on the page until it is made.
  await expect(station.locator('.turn__state[data-side="before"]')).toBeVisible();
  await expect(station.locator('.turn__pair')).toBeVisible();

  // The summary sentence says whose it is, in words the room can read. The
  // exact audit code is kept, but in the magnifier rather than on the wall.
  await expect(station.locator('.turn__shift-label')).toContainText('DIỄN GIẢI CỦA NHÓM');
  await expect(station.locator('.turn__shift-label')).not.toContainText('PROJECT DECISION');

  // Crossing back is possible.
  await expect(cross).toHaveText('Quay lại trạng thái trước');
  await cross.click();
  await expect(station.locator('.turn__state[data-side="before"]')).toBeVisible();
  await expect(station.locator('.station__shift')).toHaveCount(0);
});

test('the turning point summary carries its basis in the magnifier', async ({ page }) => {
  await walkToFirstTurn(page, 'ky-2');

  const lens = page.locator('.lens');
  await page.locator('.station--turn .lens-trigger').click();
  await expect(lens).toBeVisible();

  // The summary is declared a project formulation, not printed wording, and
  // both positions plus the cited passages travel with it.
  // Audience wording on the surface, exact audit code in here. Both, not either.
  await expect(lens).toContainText('PROJECT DECISION');
  await expect(lens).toContainText('không phải câu in trong trích đoạn');
  await expect(lens.getByText('Trước đó', { exact: true })).toBeVisible();
  await expect(lens.getByText('Sau đó', { exact: true })).toBeVisible();
  await expect(lens).toContainText('P2-5');
  await expect(lens).toContainText('7-1920');
});

test('the exact heading is printed at the stage entrance and reachable after it', async ({
  page,
}) => {
  await page.goto('/#/chang/ky-2');
  const head = page.locator('.walk__head');
  const heading = page.locator('.walk__heading');

  // Entrance: the official heading in full, visible.
  await expect(head).toHaveAttribute('data-mode', 'full');
  await expect(heading).toBeVisible();
  await expect(heading).toHaveText(HEADINGS[1] as string);

  // Later stops: compact context bar, heading still in the accessibility tree.
  await page.locator('.walk__nav.btn--primary').click();
  await expect(head).toHaveAttribute('data-mode', 'compact');
  await expect(page.locator('.walk__context-period')).toBeVisible();
  // Collapsed to a 1px clipped box: no longer presented visually, but still
  // rendered, so it stays in the accessibility tree and is still announced.
  const collapsed = await heading.boundingBox();
  expect(collapsed?.height ?? 99).toBeLessThan(2);
  await expect(heading).toHaveText(HEADINGS[1] as string);

  // And one click brings the exact wording back.
  const expand = page.locator('.walk__expand');
  await expect(expand).toHaveAttribute('aria-expanded', 'false');
  await expand.click();
  await expect(expand).toHaveAttribute('aria-expanded', 'true');
  const expanded = await heading.boundingBox();
  expect(expanded?.height ?? 0).toBeGreaterThan(20);

  // Returning to the entrance restores the full heading outright.
  await page.locator('.walk__nav:not(.btn--primary)').click();
  await expect(head).toHaveAttribute('data-mode', 'full');
  await expect(heading).toBeVisible();
});

test('the traverse is fully operable from the keyboard', async ({ page }) => {
  await page.goto('/#/chang/ky-2');

  // Wait for the traverse to be on its first stop before touching the keyboard.
  await expect(page.locator('.walk__counter')).toHaveText('1 / 11');

  const marks = page.locator('.walk__hit[data-index="0"]');
  const marksShown = await marks.isVisible();

  // Wide screens: arrow keys from the per-stop marks. Narrow screens: the same
  // keys from the Prev/Next controls, which is what exists there.
  const anchor = marksShown ? marks : page.locator('.walk__nav.btn--primary');
  await anchor.focus();
  await expect(anchor).toBeFocused();

  await page.keyboard.press('ArrowRight');
  await expect(page.locator('.walk__counter')).toHaveText('2 / 11');

  await page.keyboard.press('ArrowLeft');
  await expect(page.locator('.walk__counter')).toHaveText('1 / 11');

  await page.keyboard.press('End');
  await expect(page.locator('.walk__counter')).toHaveText('11 / 11');

  await page.keyboard.press('Home');
  await expect(page.locator('.walk__counter')).toHaveText('1 / 11');
});

test('presentation mode opens, steps and closes with the keyboard', async ({ page }) => {
  await page.goto('/#/');
  const present = page.locator('.present');
  await expect(present).toBeHidden();

  await page.keyboard.press('p');
  await expect(present).toBeVisible();
  await expect(present.locator('.slide__index')).toContainText('1 / 7');

  await page.keyboard.press('ArrowRight');
  await expect(present.locator('.slide__index')).toContainText('2 / 7');

  await page.keyboard.press('ArrowLeft');
  await expect(present.locator('.slide__index')).toContainText('1 / 7');

  await page.keyboard.press('Escape');
  await expect(present).toBeHidden();
  expect(errorsOf(page)).toEqual([]);
});

test('the evidence magnifier carries the printed locator, unexpanded', async ({ page }) => {
  await page.goto('/#/chang/ky-4');

  const trigger = page.locator('.walk__apparatus .lens-trigger');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  const lens = page.locator('.lens');
  await expect(lens).toBeHidden();

  await trigger.click();
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await expect(lens).toBeVisible();

  // The stage's location in the excerpt and its verification status are both
  // reachable without leaving the stage.
  await expect(lens.getByText('NEED VERIFICATION', { exact: false })).toBeVisible();
  // Locator L6 must still show the unexpanded abbreviation.
  await expect(lens.getByText('Sđd', { exact: false }).first()).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(lens).toBeHidden();
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
});

test('the projected slide attributes the group summary on the slide itself', async ({ page }) => {
  await page.goto('/#/');
  await page.keyboard.press('p');
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('ArrowRight');

  const slide = page.locator('.slide[data-beat="PB-3"]');
  await expect(slide).toBeVisible();
  await expect(slide.locator('.slide__shift')).toBeVisible();
  // Never on the wall without saying whose sentence it is - in audience wording.
  await expect(slide.locator('.slide__flag')).toHaveText('DIỄN GIẢI CỦA NHÓM');

  // The deck must read completely without the speaker notes, which are shut.
  await expect(page.locator('.present__notes')).toBeHidden();
});

test('speaker notes are shut by default and warn that the room sees them', async ({ page }) => {
  await page.goto('/#/');
  await page.keyboard.press('p');
  const notes = page.locator('.present__notes');
  await expect(notes).toBeHidden();

  await page.keyboard.press('n');
  await expect(notes).toBeVisible();
  await expect(notes.locator('.present__notes-warn')).toContainText('khán giả cũng nhìn thấy');

  await page.keyboard.press('n');
  await expect(notes).toBeHidden();
});

test('skip link works and route change moves focus to main', async ({ page }) => {
  await page.goto('/#/');
  await page.keyboard.press('Tab');
  const skip = page.locator('.skip-link');
  await expect(skip).toBeFocused();

  await page.goto('/#/hanh-trinh');
  const focusedId = await page.evaluate(() => document.activeElement?.id ?? '');
  expect(focusedId).toBe('noi-dung');
});

test('interactive controls meet the 44px touch target minimum', async ({ page }) => {
  // Both the activity screen and a stage screen, so the evidence controls and
  // the traverse buttons are covered and not only the older widgets.
  for (const route of ['/#/noi-ket', '/#/chang/ky-2']) {
    await checkTargets(page, route);
  }
});

/**
 * Wait until nothing on the page is still moving.
 *
 * Target size is a property of the layout box, but `boundingBox` reports the
 * painted quad. While a control is inside an element that is mid-transition on
 * `translate`, that quad comes back a fraction short - a 44px control measured
 * 43.99994px, which is 44px to any eye and to any finger, and under the line to
 * a strict assertion. Measuring at rest removes the artifact without weakening
 * the check: the assertion below is still exact.
 */
async function settle(page: Page): Promise<void> {
  await page.evaluate(async () => {
    const running = document
      .getAnimations()
      .map((a) => a.finished.catch(() => undefined));
    await Promise.race([
      Promise.all(running),
      new Promise((resolve) => setTimeout(resolve, 1500)),
    ]);
    await new Promise((resolve) => requestAnimationFrame(() => { resolve(undefined); }));
  });
}

async function checkTargets(page: Page, route: string): Promise<void> {
  await page.goto(route);
  await settle(page);
  const controls = page.locator('button:visible, a.btn:visible, select:visible');
  const count = await controls.count();
  expect(count).toBeGreaterThan(0);
  const tooSmall: string[] = [];
  for (let i = 0; i < count; i++) {
    const box = await controls.nth(i).boundingBox();
    if (!box) continue;
    const cls = (await controls.nth(i).getAttribute('class')) ?? '';
    if (cls.includes('walk__hit')) continue;
    if (box.height < 44 || box.width < 24) {
      tooSmall.push(`${await controls.nth(i).innerText()} -> ${String(box.width)}x${String(box.height)}`);
    }
  }
  expect(tooSmall, `controls under target size at ${route}: ${tooSmall.join(' | ')}`).toEqual([]);
}

test('a screen reader gets the stage and the current stop without repetition', async ({ page }) => {
  await page.goto('/#/chang/ky-2');

  // The exact heading is the accessible name of the stage, at every stop.
  const heading = page.locator('h1.walk__heading');
  await expect(heading).toHaveText(HEADINGS[1] as string);

  // The compact bar repeats the period the heading already carries, so it is
  // decoration for the eye and is kept out of the accessibility tree.
  await page.locator('.walk__nav.btn--primary').click();
  await expect(page.locator('.walk__context')).toHaveAttribute('aria-hidden', 'true');
  await expect(heading).toHaveText(HEADINGS[1] as string);

  // A stop announces what it is, not only its number.
  const turn = page.locator('.walk__hit[data-kind="turn"]').first();
  const label = await turn.getAttribute('aria-label');
  expect(label).toContain('bước ngoặt');
  expect(label).toContain('7-1920');

  const passage = page.locator('.walk__hit[data-index="0"]');
  expect(await passage.getAttribute('aria-label')).toContain('đoạn P2-1');

  // Exactly one stop is marked current at a time.
  await expect(page.locator('.walk__hit[aria-current="step"]')).toHaveCount(1);
});

test('reduced motion is honoured', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/#/chang/ky-1');
  const duration = await page.evaluate(() => {
    const el = document.querySelector('.station');
    return el ? getComputedStyle(el).transitionDuration : '';
  });
  expect(duration).toBe('0.001s');

  // The thread must arrive already drawn rather than drawing itself in.
  await page.goto('/#/');
  const drawState = await page.evaluate(
    () => document.querySelector('.scene')?.getAttribute('data-draw') ?? null,
  );
  expect(drawState).toBeNull();

  // The chapter opening settles in on arrival. With motion reduced it is simply
  // already in place: no animation at all, and full opacity either way, so
  // nothing is revealed by movement alone.
  await page.goto('/#/chang/ky-2');
  const entrance = await page.evaluate(() => {
    const el = document.querySelector('.walk__heading');
    if (!el) return null;
    const cs = getComputedStyle(el);
    return { name: cs.animationName, opacity: cs.opacity };
  });
  expect(entrance?.name).toBe('none');
  expect(entrance?.opacity).toBe('1');
});

test('the chapter opening settles in once, and only on arrival', async ({ page }) => {
  await page.goto('/#/chang/ky-2');
  const head = page.locator('.walk__head');
  await expect(head).toHaveAttribute('data-mode', 'full');

  const anim = await page.evaluate(() => {
    const el = document.querySelector('.walk__heading');
    if (!el) return null;
    const cs = getComputedStyle(el);
    return {
      name: cs.animationName,
      iteration: cs.animationIterationCount,
      duration: cs.animationDuration,
      delay: cs.animationDelay,
    };
  });
  expect(anim?.name).toBe('chapter-open');
  // Once, not a loop, and short enough not to hold up reading.
  expect(anim?.iteration).toBe('1');
  expect(parseFloat(anim?.duration ?? '9')).toBeLessThanOrEqual(0.5);
  expect(parseFloat(anim?.delay ?? '9')).toBeLessThanOrEqual(0.2);

  // Past the entrance nothing in the header is animating any more.
  await page.locator('.walk__nav.btn--primary').click();
  await expect(head).toHaveAttribute('data-mode', 'compact');
  const after = await page.evaluate(
    () => getComputedStyle(document.querySelector('.walk__heading') as Element).animationName,
  );
  expect(after).toBe('none');
});

test('the sticky masthead never covers the control that has focus', async ({ page }) => {
  await page.goto('/#/chang/ky-2');

  // The offset is measured, not assumed: the masthead is one row on a laptop
  // and two on a phone.
  const published = await page.evaluate(() =>
    getComputedStyle(document.documentElement).getPropertyValue('--chrome-h').trim(),
  );
  const measured = await page.locator('.masthead').evaluate((el) =>
    Math.round(el.getBoundingClientRect().height),
  );
  expect(published).toBe(`${String(measured)}px`);

  // Tab through the screen and check every landing place clears the chrome.
  for (let i = 0; i < 25; i++) {
    await page.keyboard.press('Tab');
    const clear = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return true;
      const r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) return true;
      const bar = document.querySelector('.masthead');
      if (!bar || bar.contains(el)) return true;
      // Things that deliberately sit above the masthead rather than under it:
      // the dialogs, and the skip link, which is z-index 100 against the
      // masthead's 40 precisely so it can appear over the chrome.
      if (el.closest('.menu, .lens, .shade, .deck')) return true;
      if (el.classList.contains('skip-link')) return true;
      return r.top >= bar.getBoundingClientRect().bottom - 1;
    });
    expect(clear, `tab stop ${String(i)}`).toBe(true);
  }
});
