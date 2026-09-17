import { expect, test } from '@playwright/test';

/**
 * The three activity screens after they were rebuilt in the thread language.
 *
 * These guard two things at once: that each activity still works, and that each
 * one declares whose sentences it is showing. The compare answers, the pairings
 * and the core message are all the group's wording, and the screens have to say
 * so on the surface while keeping the audit code in the magnifier.
 */

const HEADING_2 =
  'Thời kỳ từ ngày 6-6-1911 đến ngày 30-12-1920: Hình thành tư tưởng cứu nước, giải phóng dân tộc Việt Nam theo con đường cách mạng vô sản';

test('comparison puts two answers at two places on the thread', async ({ page }) => {
  await page.goto('/#/doi-sanh');

  // The axes are the group's questions, and the screen says so once, up top.
  const note = page.locator('.duo__note');
  await expect(note).toContainText('DIỄN GIẢI CỦA NHÓM');
  await expect(note).toContainText('do nhóm đặt ra');

  const sides = page.locator('.duo__side');
  await expect(sides).toHaveCount(2);
  const first = await sides.nth(0).locator('.duo__answer').innerText();
  const second = await sides.nth(1).locator('.duo__answer').innerText();
  expect(first).not.toEqual(second);

  // Two segments drawn at the two stages' own positions on the journey.
  await expect(page.locator('.duo__seg')).toHaveCount(2);

  // Switching the axis changes both answers.
  await page.locator('.duo__axis').nth(1).click();
  expect(await sides.nth(0).locator('.duo__answer').innerText()).not.toEqual(first);

  // Switching a stage changes that side only.
  await page.locator('.duo__picker').nth(0).locator('.duo__pick').nth(4).click();
  await expect(sides.nth(0).locator('.duo__ord')).toHaveText('5');
});

test('the comparison never computes a difference for the viewer', async ({ page }) => {
  await page.goto('/#/doi-sanh');
  // Highlighting "what differs" would be a new reading of the source. The
  // closing line only states that the two answers are not the same, and says
  // whose observation that is.
  const read = page.locator('.duo__read-block');
  await expect(read).toBeVisible();
  await expect(read.locator('.station__flag')).toHaveText('DIỄN GIẢI CỦA NHÓM');
  await expect(read.locator('.duo__read')).toContainText('không giống nhau');
  // Nothing inside an answer is marked up as a difference.
  await expect(page.locator('.duo__answer mark, .duo__answer .diff')).toHaveCount(0);

  await read.locator('.lens-trigger').click();
  await expect(page.locator('.lens')).toContainText('PROJECT DECISION');
});

test('connect offers every pair, arranged by stage', async ({ page }) => {
  await page.goto('/#/noi-ket');

  // Twelve pairs across five stages: 2 + 3 + 2 + 2 + 3. An earlier version
  // silently took the first eight of the array and dropped stage 5 entirely.
  const counts = [2, 3, 2, 2, 3];
  let total = 0;
  for (const [i, want] of counts.entries()) {
    await page.locator('.join__stage').nth(i).click();
    await expect(page.locator('.join__row')).toHaveCount(want);
    total += want;
  }
  expect(total).toBe(12);

  // Stage 5 is reachable and has its pairs.
  await page.locator('.join__stage').nth(4).click();
  await expect(page.locator('.join__row')).toHaveCount(3);
});

test('connect joins a correct pair and says so on a wrong one', async ({ page }) => {
  await page.goto('/#/noi-ket');

  const row = page.locator('.join__row').first();
  await row.locator('.join__end[data-side="experience"]').click();
  await expect(row.locator('.join__end[data-side="experience"]')).toHaveAttribute(
    'aria-pressed',
    'true',
  );

  // Wrong end first: the screen says it does not match and lets them retry.
  const other = page.locator('.join__row').nth(1);
  await other.locator('.join__end[data-side="recognition"]').click();
  await expect(page.locator('.join__status')).toContainText('Chưa khớp');
  await expect(page.locator('.join__row[data-state="joined"]')).toHaveCount(0);

  // Right end: the two become one piece of thread and the locator appears.
  await row.locator('.join__end[data-side="recognition"]').click();
  await expect(row).toHaveAttribute('data-state', 'joined');
  await expect(row.locator('.join__found .lens-trigger')).toBeVisible();

  // There is no score anywhere on this screen.
  await expect(page.locator('.join__score, .join__points')).toHaveCount(0);
});

test('synthesis rebuilds one continuous thread from five segments', async ({ page }) => {
  await page.goto('/#/tong-hop');

  const ORDER = [
    'từ ngày 5-6-1911 trở về trước',
    'từ ngày 6-6-1911',
    'từ ngày 31-12-1920',
    'từ ngày 4-2-1930',
    'từ ngày 29-1-1941',
  ];

  for (const [position, key] of ORDER.entries()) {
    const pieces = page.locator('.weave__piece');
    const n = await pieces.count();
    let placed = false;
    for (let i = 0; i < n; i++) {
      if ((await pieces.nth(i).innerText()).includes(key)) {
        await pieces.nth(i).click();
        await page.locator('.weave__slot').nth(position).locator('.weave__slot-btn').click();
        placed = true;
        break;
      }
    }
    expect(placed, `no segment for position ${String(position + 1)}`).toBe(true);
  }

  // Every segment in place, and the drawn line is continuous.
  await expect(page.locator('.weave__slot[data-state="right"]')).toHaveCount(5);
  await expect(page.locator('.weave__thread')).toHaveAttribute('data-joined', 'true');
  await expect(page.locator('.weave__seg[data-state="right"]')).toHaveCount(5);

  // Only then does the Central Question come back.
  await expect(page.locator('.weave__question')).toContainText('Vì sao tư tưởng Hồ Chí Minh');

  // The core message is the group's sentence, and says so, with the audit code
  // one click away.
  await expect(page.locator('.weave__done .station__flag')).toHaveText('DIỄN GIẢI CỦA NHÓM');
  await page.locator('.weave__done .lens-trigger').click();
  await expect(page.locator('.lens')).toContainText('PROJECT DECISION');
});

test('synthesis carries each official heading verbatim', async ({ page }) => {
  await page.goto('/#/tong-hop');
  await expect(page.locator('.weave__piece-text').filter({ hasText: 'từ ngày 6-6-1911' })).toHaveText(
    HEADING_2,
  );
});

test('the verification appendix keeps its tables and gains a way in', async ({ page }) => {
  await page.goto('/#/kiem-chung');

  // Every contents entry is actually activated, not merely checked for a
  // matching target. The previous version of this test only confirmed the
  // target existed, and so never noticed that following the link replaced the
  // route and landed on "not found".
  const links = page.locator('.toc__link');
  const n = await links.count();
  expect(n).toBeGreaterThan(4);

  for (let i = 0; i < n; i++) {
    await links.nth(i).click();
    expect(page.url(), `entry ${String(i + 1)} left the register`).toContain('#/kiem-chung');
    await expect(page.locator('h1')).toHaveText('Những gì chưa được kiểm chứng');
    const focused = await page.evaluate(() => document.activeElement?.id ?? '');
    expect(focused, `entry ${String(i + 1)} did not move focus`).not.toBe('');
    await expect(page.locator(`section#${focused}`)).toBeInViewport();
  }

  // The one document conflict, lifted out for the Showcase.
  const focus = page.locator('.focus');
  await expect(focus.locator('.focus__id')).toHaveText('GT-R02');
  await expect(focus.locator('.focus__code')).toHaveText('DOCUMENT CONFLICT');

  // The tables underneath are untouched: ten locators, nine risks, and the
  // unexpanded abbreviation still present.
  await expect(page.locator('table')).not.toHaveCount(0);
  await expect(page.getByText('Sđd', { exact: false }).first()).toBeVisible();
});

test('the whole Showcase script runs, beat by beat, inside its slot', async ({ page }) => {
  await page.goto('/#/');
  await page.keyboard.press('p');

  const EXPECTED = [
    { kicker: 'Mở', route: '#/' },
    { kicker: 'Khung', route: '#/hanh-trinh' },
    { kicker: 'Chiều sâu', route: '#/chang/ky-2' },
    { kicker: 'Lập luận', route: '#/doi-sanh' },
    { kicker: 'Tương tác', route: '#/noi-ket' },
    { kicker: 'Kiểm chứng', route: '#/kiem-chung' },
    { kicker: 'Đóng', route: '#/tong-hop' },
  ];

  for (const [i, want] of EXPECTED.entries()) {
    if (i > 0) await page.keyboard.press('ArrowRight');
    const slide = page.locator('.slide');
    await expect(slide).toBeVisible();
    await expect(slide.locator('.slide__index')).toHaveText(`${String(i + 1)} / 7`);
    await expect(slide.locator('.slide__kicker')).toContainText(want.kicker);
    // Every beat carries a real headline and something under it. Beat 2's
    // body is a drawing, so this counts content rather than text.
    await expect(slide.locator('.slide__title')).not.toBeEmpty();
    const filled = await slide
      .locator('.slide__body')
      .evaluate((el) => el.childElementCount > 0 || (el.textContent ?? '').trim().length > 0);
    expect(filled, `beat ${String(i + 1)} has an empty body`).toBe(true);
    // The demo behind the deck is on the screen this beat talks about.
    expect(page.url()).toContain(want.route);
    // Speaker notes never open themselves.
    await expect(page.locator('.present__notes')).toBeHidden();

    // Beats that put a sentence the group wrote on the wall say so on the
    // slide, because the room cannot open a magnifier.
    //
    // Beats 2 and 6 carry no such label, and that is NOT a claim that
    // everything on them is source wording: beat 2's drawing is the group's
    // way of laying the five stages out, and beat 6 states a risk the group
    // registered. Neither puts a group-authored SENTENCE on the wall, which is
    // what this label is for. Their provenance is recorded on the overview
    // legend and in the register at #/kiem-chung.
    if ([1, 3, 4, 5, 7].includes(i + 1)) {
      await expect(slide.locator('.slide__flag'), `beat ${String(i + 1)}`).toHaveText(
        'DIỄN GIẢI CỦA NHÓM',
      );
    }
  }

  // Beat 1 also shows that the question is still awaiting approval.
  await page.keyboard.press('Home');
  const opening = page.locator('.slide[data-beat="PB-1"]');
  await expect(opening.locator('.slide__flag')).toHaveText('DIỄN GIẢI CỦA NHÓM');
  await expect(opening.locator('.slide__attrib-label')).toContainText('do nhóm đề xuất');
  await expect(opening.locator('.slide__status')).toHaveText('Chờ nhóm và giảng viên phê duyệt');
  // The question itself is never shortened on the way to the wall.
  await expect(opening.locator('.slide__lead')).toContainText('kiểm nghiệm trong thực tiễn cách mạng Việt Nam?');

  // The budget the room is told about matches the script that just ran.
  await expect(page.locator('.present__budget')).toContainText('10-12 phút');
  await expect(page.locator('.present__budget')).toContainText('11.5 phút');

  // Escape closes the deck. The slide stays in the DOM inside the hidden
  // dialog, so this checks the dialog rather than counting slides.
  await page.keyboard.press('Escape');
  await expect(page.locator('.present')).toBeHidden();
});
