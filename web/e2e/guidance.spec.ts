import { type Page, expect, test } from '@playwright/test';

/**
 * The guidance layer added in the UX pass.
 *
 * These guard the things that make the product walkable rather than merely
 * present: that every screen can be reached by clicking, that a stage says what
 * it is asking before it starts answering, that the stage can be read as well
 * as stepped, and that a wrong answer explains itself.
 *
 * The first test is the important one. Before this pass, `#/doi-sanh` and
 * `#/noi-ket` had no link anywhere in the product - they were reachable only by
 * typing the address or by driving the presentation. A screen nobody can find
 * is not an interaction, so that must not be allowed to happen again.
 */

const DESTINATIONS = [
  { label: 'Đối sánh', hash: '#/doi-sanh' },
  { label: 'Nối kết', hash: '#/noi-ket' },
  { label: 'Tổng hợp', hash: '#/tong-hop' },
  { label: 'Kiểm chứng', hash: '#/kiem-chung' },
];

test('every screen after the five stages can be reached by clicking', async ({ page }) => {
  // From the overview, where the journey is laid out.
  for (const dest of DESTINATIONS) {
    await page.goto('/#/hanh-trinh');
    await page.locator('.onward__card', { hasText: dest.label }).click();
    await expect(page).toHaveURL(new RegExp(`${dest.hash.replace('#/', '')}$`));
    await expect(page.locator('main#noi-dung h1')).toHaveCount(1);
  }

  // And from the opening, for someone who does not want to start at stage one.
  for (const dest of DESTINATIONS) {
    await page.goto('/#/');
    await page.locator('.scene__after-link', { hasText: dest.label }).click();
    await expect(page).toHaveURL(new RegExp(`${dest.hash.replace('#/', '')}$`));
  }
});

test('the rail carries the four destinations and marks the current one', async ({ page }) => {
  await page.goto('/#/noi-ket');
  const rail = page.locator('nav.rail');

  // The five stages stay the spine; the destinations are a separate group.
  await expect(rail.locator('.rail__item')).toHaveCount(5);
  await expect(rail.locator('.rail__aside-item')).toHaveCount(4);

  const current = rail.locator('.rail__aside-link[aria-current="page"]');
  await expect(current).toHaveCount(1);
  await expect(current).toContainText('Nối kết');

  // Moving on moves the mark with it.
  await page.goto('/#/kiem-chung');
  await expect(rail.locator('.rail__aside-link[aria-current="page"]')).toContainText('Kiểm chứng');

  // On a stage screen no destination is current.
  await page.goto('/#/chang/ky-2');
  await expect(rail.locator('.rail__aside-link[aria-current="page"]')).toHaveCount(0);
});

test('the overview names what each stage is about and what joins them', async ({ page }) => {
  await page.goto('/#/hanh-trinh');

  const rows = page.locator('.chain__item');
  await expect(rows).toHaveCount(5);
  // The claim half of the official heading, not only the dates.
  await expect(rows.nth(0).locator('.chain__claim')).toHaveText(
    'Hình thành tư tưởng yêu nước và có chí hướng tìm con đường cứu nước mới',
  );
  // The full official heading is still the accessible name of the row.
  await expect(rows.nth(0).locator('a')).toContainText('Thời kỳ trước ngày 5-6-1911');

  // One named joint between each adjacent pair, and the blurred one says so.
  const joints = page.locator('.chain__joint');
  await expect(joints).toHaveCount(4);
  await expect(joints.nth(0)).toHaveAttribute('data-kind', 'blurred');
  await expect(joints.nth(0)).toContainText('C2-R01');
  await expect(joints.nth(1)).toContainText('cuối năm 1920');
});

test('a stage opens by asking, and says whose question it is', async ({ page }) => {
  await page.goto('/#/chang/ky-3');

  const ask = page.locator('.walk__ask');
  await expect(ask).toBeVisible();
  // It asks; it does not assert.
  await expect(ask.locator('.walk__ask-text')).toContainText('?');
  await expect(ask.locator('.walk__ask-label')).toContainText('DIỄN GIẢI CỦA NHÓM');

  // Its basis is one click away, with the audit code intact.
  await ask.locator('.lens-trigger').click();
  const lens = page.locator('.lens');
  await expect(lens).toBeVisible();
  await expect(lens).toContainText('PROJECT DECISION');
  await expect(lens).toContainText('không phải câu in trong trích đoạn');
  await page.keyboard.press('Escape');

  // It belongs to the entrance, and steps aside with the full heading.
  await page.locator('.walk__nav.btn--primary').click();
  await expect(ask).toBeHidden();
});

test('the phase bar shows what a stage is made of and jumps into it', async ({ page }) => {
  await page.goto('/#/chang/ky-2');

  const phases = page.locator('.walk__phase');
  await expect(phases).toHaveCount(4);
  await expect(page.locator('.walk__phase[data-state="here"]')).toHaveCount(1);
  await expect(page.locator('.walk__phase[data-phase="boi-canh"]')).toHaveAttribute(
    'data-state',
    'here',
  );

  // The counts are the stations, not a guess: stage 2 records two turning points.
  await expect(page.locator('.walk__phase[data-phase="buoc-ngoat"] .walk__phase-n')).toHaveText('2');

  // Jumping lands on that phase, and the bar follows.
  await page.locator('.walk__phase[data-phase="buoc-ngoat"]').click();
  await expect(page.locator('.station--turn')).toBeVisible();
  await expect(page.locator('.walk__phase[data-phase="buoc-ngoat"]')).toHaveAttribute(
    'data-state',
    'here',
  );
});

/** Count the stations the guided traverse offers for a stage. */
async function stopCount(page: Page, stage: string): Promise<number> {
  await page.goto(`/#/chang/${stage}`);
  return page.locator('.walk__hit').count();
}

test('continuous reading shows the same stations, and nothing else', async ({ page }) => {
  const stops = await stopCount(page, 'ky-2');

  await page.locator('.walk__read').click();

  // Every station, in printed order, on one page.
  await expect(page.locator('.walk__flow .station')).toHaveCount(stops);
  await expect(page.locator('.walk__flow .station[data-station="0"]')).toBeVisible();

  // The traverse controls stand down rather than sitting there inert.
  await expect(page.locator('.walk__controls')).toBeHidden();
  await expect(page.locator('.walk__track')).toBeHidden();
  await expect(page.locator('.walk__panel')).toBeHidden();

  // A turning point is still crossed rather than shown open.
  const turn = page.locator('.walk__flow .station--turn').first();
  await expect(turn.locator('.turn__state[data-side="before"]')).toBeVisible();
  await expect(turn.locator('.station__shift')).toHaveCount(0);
  await turn.locator('.turn__cross').click();
  await expect(turn.locator('.station__shift')).toBeVisible();

  // And it goes back.
  await page.locator('.walk__read').click();
  await expect(page.locator('.walk__flow')).toBeHidden();
  await expect(page.locator('.walk__controls')).toBeVisible();
  await expect(page.locator('.walk__counter')).toHaveText(`1 / ${String(stops)}`);
});

test('a stage hands off to the next one, with the shared boundary named', async ({ page }) => {
  await page.goto('/#/chang/ky-2');
  const bridge = page.locator('.bridge');

  // Not at the entrance: the hand-off belongs at the end.
  await expect(bridge).toBeHidden();

  await page.locator('.walk__nav.btn--primary').focus();
  await page.keyboard.press('End');
  await expect(bridge).toBeVisible();

  // The next stage's own claim, and the boundary the two headings share.
  await expect(bridge.locator('.bridge__claim')).toHaveText(
    'Hình thành những nội dung cơ bản tư tưởng về cách mạng Việt Nam',
  );
  await expect(bridge.locator('.bridge__joint')).toContainText('cuối năm 1920');
  await expect(bridge.locator('.bridge__joint')).toContainText('dùng chung');

  await bridge.locator('.bridge__go').click();
  await expect(page).toHaveURL(/chang\/ky-3$/);

  // The last stage hands off to the synthesis instead of to a sixth stage.
  await page.goto('/#/chang/ky-5');
  await page.locator('.walk__nav.btn--primary').focus();
  await page.keyboard.press('End');
  await expect(page.locator('.bridge__go')).toHaveText('Sang phần tổng hợp');
});

test('a missed pairing explains itself instead of only saying no', async ({ page }) => {
  await page.goto('/#/noi-ket');

  const rows = page.locator('.join__row');
  await rows.nth(0).locator('.join__end[data-side="experience"]').click();
  await rows.nth(1).locator('.join__end[data-side="recognition"]').click();

  const status = page.locator('.join__status');
  await expect(status).toContainText('Chưa khớp');
  // The reason names where to look, in the excerpt, rather than the answer.
  await expect(status).toContainText('C2 PDF');
  // The choice is kept, so the viewer can simply try the other end.
  await expect(rows.nth(0).locator('.join__end[data-side="experience"]')).toHaveAttribute(
    'aria-pressed',
    'true',
  );

  // And the right pairing still joins.
  await rows.nth(0).locator('.join__end[data-side="recognition"]').click();
  await expect(rows.nth(0)).toHaveAttribute('data-state', 'joined');
});

test('the opening names the stage its one action opens', async ({ page }) => {
  await page.goto('/#/');
  const go = page.locator('.scene__go');

  // Concrete, not a slogan: the label carries the stage and the period.
  await expect(go.locator('.scene__go-lead')).toContainText('chặng 1');
  await expect(go.locator('.scene__go-name')).toHaveText('Thời kỳ trước ngày 5-6-1911');
  // And the full official heading is what assistive technology gets.
  await expect(go).toContainText(
    'Thời kỳ trước ngày 5-6-1911: Hình thành tư tưởng yêu nước và có chí hướng tìm con đường cứu nước mới',
  );

  await go.click();
  await expect(page).toHaveURL(/chang\/ky-1$/);

  // The map is still one step to the side for anyone who wants it first.
  await page.goto('/#/');
  await page.locator('.scene__map').click();
  await expect(page).toHaveURL(/hanh-trinh$/);
});

test('the guess is offered, never required, and is built from real answers', async ({ page }) => {
  await page.goto('/#/chang/ky-2');

  const toggle = page.locator('.guess__toggle');
  await expect(toggle).toBeVisible();
  await expect(toggle).toContainText('không bắt buộc');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');

  // Shut on arrival, and the stage is fully readable without ever opening it.
  await expect(page.locator('.guess__body')).toBeHidden();
  await expect(page.locator('.station[data-kind="passage"]')).toBeVisible();
  await page.locator('.walk__nav.btn--primary').click();
  await expect(page.locator('.walk__counter')).toHaveText('2 / 11');

  // Stepping forward puts the entrance away, guess included. Reload rather than
  // navigate: the address has not changed, so a goto would not re-render.
  await page.reload();
  await toggle.click();
  await expect(page.locator('.guess__body')).toBeVisible();

  // Three options, each one a real stored answer belonging to a real stage.
  const options = page.locator('.guess__option');
  await expect(options).toHaveCount(3);
  for (let i = 0; i < 3; i++) {
    const id = await options.nth(i).getAttribute('data-stage');
    expect(id).toMatch(/^ky-[1-5]$/);
    expect((await options.nth(i).innerText()).trim().length).toBeGreaterThan(20);
  }
  // Exactly one of them is this stage's.
  await expect(page.locator('.guess__option[data-stage="ky-2"]')).toHaveCount(1);
});

test('a wrong guess says which stage that sentence belongs to', async ({ page }) => {
  await page.goto('/#/chang/ky-2');
  await page.locator('.guess__toggle').click();

  const wrong = page.locator('.guess__option:not([data-stage="ky-2"])').first();
  await wrong.click();

  const verdict = page.locator('.guess__verdict');
  await expect(verdict).toHaveAttribute('data-right', 'false');
  // It names the stage that sentence does belong to, so a wrong guess still
  // teaches something. Mid-sentence, so the period reads in lower case.
  await expect(verdict).toContainText('thời kỳ');
  // The stage's own answer is then shown, with both locations.
  await expect(page.locator('.guess__where')).toBeVisible();
  await expect(page.locator('.guess__locators')).toContainText('C2 PDF');
  // Outcome is not carried by colour alone.
  await expect(page.locator('.guess__option[data-stage="ky-2"]')).toHaveAttribute(
    'data-state',
    'right',
  );

  // And it can be tried again.
  await page.locator('.guess__reset').click();
  await expect(page.locator('.guess__verdict')).toHaveCount(0);
  await expect(page.locator('.guess__option[data-stage="ky-2"]')).toHaveAttribute(
    'data-state',
    'rest',
  );
});

test('crossing a turning point fills the record beside the reading', async ({ page }) => {
  await page.goto('/#/chang/ky-2');

  const items = page.locator('.gained__item');
  await expect(items).toHaveCount(2);
  // Nothing is given away before it is opened.
  await expect(items.nth(0)).toHaveAttribute('data-state', 'todo');
  await expect(items.nth(0).locator('.gained__todo')).toBeVisible();
  await expect(page.locator('.gained__count')).toContainText('2 bước ngoặt');

  // Where this stage sits in the five.
  await expect(page.locator('.gained__where-n')).toHaveText('2 / 5');

  await page.locator('.walk__phase[data-phase="buoc-ngoat"]').click();
  await page.locator('.turn__cross').click();

  await expect(items.nth(0)).toHaveAttribute('data-state', 'done');
  await expect(items.nth(0).locator('.gained__shift')).toBeVisible();
  await expect(page.locator('.gained__count')).toContainText('Đã mở 1 trên 2');

  // Crossing back takes it out again: the record follows the viewer, and never
  // claims more than they have actually opened.
  await page.locator('.turn__cross').click();
  await expect(items.nth(0)).toHaveAttribute('data-state', 'todo');
});

test('the hand-off gives a reason to open the next stage', async ({ page }) => {
  await page.goto('/#/chang/ky-2');
  await page.locator('.walk__nav.btn--primary').focus();
  await page.keyboard.press('End');

  const bridge = page.locator('.bridge');
  await expect(bridge).toBeVisible();
  // Not only where to go: the question the next stage opens with, attributed.
  const ask = bridge.locator('.bridge__ask');
  await expect(ask).toBeVisible();
  await expect(ask).toContainText('?');
  await expect(bridge.locator('.bridge__ask-label')).toContainText('DIỄN GIẢI CỦA NHÓM');

  // And it is the same sentence that stage actually opens with.
  const promised = (await ask.innerText()).trim();
  await bridge.locator('.bridge__go').click();
  await expect(page).toHaveURL(/chang\/ky-3$/);
  expect((await page.locator('.walk__ask-text').innerText()).trim()).toBe(promised);
});

test('each activity says what it is for before it asks for anything', async ({ page }) => {
  for (const hash of ['/#/doi-sanh', '/#/noi-ket', '/#/tong-hop']) {
    await page.goto(hash);
    const brief = page.locator('.brief');
    await expect(brief, hash).toBeVisible();
    await expect(brief, hash).toContainText('Mục tiêu');
    await expect(brief, hash).toContainText('Cách làm');
  }
});
