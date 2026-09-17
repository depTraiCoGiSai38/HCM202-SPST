import '@fontsource-variable/source-serif-4/index.css';
import '@fontsource/be-vietnam-pro/400.css';
import '@fontsource/be-vietnam-pro/500.css';
import '@fontsource/be-vietnam-pro/600.css';
import '@fontsource/be-vietnam-pro/700.css';
import '@fontsource/be-vietnam-pro/800.css';
import '@fontsource-variable/jetbrains-mono/index.css';

import './styles/tokens.css';
import './styles/base.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/interactive.css';
import './styles/experience.css';
import './styles/activities.css';
import './styles/presentation.css';

import { PRODUCT_SUBTITLE, PRODUCT_TITLE } from './data/project';
import type { StageId } from './data/types';
import { STAGE_BY_ID } from './data/stages';
import { ICONS, clear, h, icon } from './lib/dom';
import { type Route, navigate, startRouter } from './lib/router';
import {
  applyMotion,
  applyTheme,
  cycleTheme,
  getMotion,
  getTheme,
  markVisited,
  toggleMotion,
} from './lib/state';
import { createJourneyBar, updateJourneyBar } from './components/journeybar';
import { closeMenu, isMenuOpen, openMenu, syncMenu } from './components/menu';
import { openingPage } from './components/openingPage';
import { journeyPage } from './components/journeyPage';
import { stagePage } from './components/stagePage';
import { comparePage } from './components/comparePage';
import { connectPage } from './components/connectPage';
import { synthesisPage } from './components/synthesisPage';
import { verifyPage } from './components/verifyPage';
import { createPresentation } from './components/presentation';

applyTheme();
applyMotion();

const app = document.getElementById('app');
if (!app) throw new Error('Missing #app container');
app.classList.add('app');
// `render` is a hoisted function declaration, so the null check above does not
// narrow `app` inside it. Bind the checked value once instead.
const appRoot: HTMLElement = app;

const main = h('main', { class: 'main', id: 'noi-dung', tabIndex: -1 });
const journeyBar = createJourneyBar();
const presentation = createPresentation();

const themeBtn = h('button', {
  class: 'btn btn--icon',
  type: 'button',
  aria: { label: 'Đổi chế độ sáng tối' },
});
const motionBtn = h('button', {
  class: 'btn btn--icon',
  type: 'button',
  aria: { label: 'Bật hoặc tắt chuyển động' },
});
const presentBtn = h(
  'button',
  { class: 'btn', type: 'button', aria: { label: 'Mở chế độ trình bày' } },
  icon(ICONS.play),
  h('span', { class: 'masthead__present-text', text: 'Trình bày' }),
);

function syncToolButtons(): void {
  const theme = getTheme();
  clear(themeBtn);
  themeBtn.appendChild(icon(theme === 'dark' ? ICONS.moon : ICONS.sun));
  themeBtn.title =
    theme === 'auto' ? 'Theo hệ thống' : theme === 'light' ? 'Nền sáng' : 'Nền tối';
  themeBtn.setAttribute('aria-label', `Đổi chế độ sáng tối. Hiện tại: ${themeBtn.title}`);

  const motion = getMotion();
  clear(motionBtn);
  motionBtn.appendChild(icon(ICONS.motion));
  motionBtn.setAttribute('aria-pressed', motion === 'off' ? 'true' : 'false');
  motionBtn.title = motion === 'off' ? 'Chuyển động đang tắt' : 'Chuyển động đang bật';
  motionBtn.setAttribute('aria-label', motion === 'off' ? 'Bật chuyển động' : 'Tắt chuyển động');
}

themeBtn.addEventListener('click', () => {
  cycleTheme();
  syncToolButtons();
});
motionBtn.addEventListener('click', () => {
  toggleMotion();
  syncToolButtons();
});
presentBtn.addEventListener('click', () => {
  presentation.open();
});

/*
 * The one way to everything that is not the stage in front of you. It replaces
 * a permanent four-destination list that was measured competing with the
 * content on every route; see menu.ts for the numbers.
 */
const menuBtn = h(
  'button',
  {
    class: 'masthead__menu',
    type: 'button',
    aria: { expanded: 'false', haspopup: 'dialog', label: 'Mở mục lục hành trình' },
  },
  icon(ICONS.menu),
  h('span', { class: 'masthead__menu-text', text: 'Mục lục' }),
);
menuBtn.addEventListener('click', () => {
  if (isMenuOpen()) closeMenu();
  else openMenu(menuBtn);
});

const masthead = h(
  'header',
  { class: 'masthead' },
  menuBtn,
  h(
    'a',
    { class: 'masthead__brand', href: '#/' },
    h('span', { class: 'masthead__title', text: PRODUCT_TITLE }),
    h('span', { class: 'masthead__sub', text: PRODUCT_SUBTITLE }),
  ),
  h('div', { class: 'masthead__tools' }, presentBtn, motionBtn, themeBtn),
  // Where you are, said once, without being a second way to move.
  journeyBar,
);

const colophon = h(
  'footer',
  { class: 'colophon' },
  h(
    'div',
    { class: 'colophon__inner' },
    h(
      'div',
      {},
      h('p', {
        text: 'Sản phẩm sáng tạo của sinh viên trong học phần HCM202. Nội dung học thuật giới hạn trong trích đoạn được giao và vẫn cần đối chiếu với giáo trình chính thống.',
      }),
    ),
    h(
      'div',
      {},
      h('p', {
        text: 'Sản phẩm không tạo, không mô phỏng và không làm biến dạng chân dung của bất kỳ nhân vật lịch sử nào. Toàn bộ ngôn ngữ thị giác là chữ, mốc thời gian và bố cục tư liệu.',
      }),
      h('p', {}, h('a', { href: '#/kiem-chung', text: 'Xem toàn bộ điểm cần kiểm chứng' })),
    ),
  ),
);

app.appendChild(
  h('a', { class: 'skip-link', href: '#noi-dung', text: 'Bỏ qua, tới nội dung chính' }),
);
app.appendChild(masthead);
app.appendChild(h('div', { class: 'shell' }, main));
app.appendChild(colophon);
app.appendChild(presentation.root);

syncToolButtons();

/*
 * How much sticky chrome sits above the content.
 *
 * The masthead is one row on a laptop, two on a phone, and taller again at 200%
 * text, so the offset that keeps a focused control out from under it cannot be
 * a constant. It is measured and published as `--chrome-h`, which base.css uses
 * for `scroll-margin` on `:focus-visible`.
 *
 * Basis: `Sticky Navigation`, returned by `search.py "sticky header obscuring
 * content offset" --domain ux` - a fixed navigation must not obscure content,
 * and the content needs an offset equal to the navigation's height. WCAG 2.2 AA
 * `focus-not-obscured` is the accessibility rule behind the same behaviour.
 */
function publishChromeHeight(): void {
  const px = Math.round(masthead.getBoundingClientRect().height);
  document.documentElement.style.setProperty('--chrome-h', `${String(px)}px`);
}
publishChromeHeight();
if (typeof ResizeObserver === 'function') {
  new ResizeObserver(publishChromeHeight).observe(masthead);
}

const TITLES: Record<string, string> = {
  opening: 'Câu hỏi trung tâm',
  journey: 'Tổng quan hành trình',
  compare: 'Đối sánh các chặng',
  connect: 'Nối trải nghiệm với nhận thức',
  synthesis: 'Tổng hợp',
  verify: 'Điểm cần kiểm chứng',
  design: 'Căn cứ của các lựa chọn thiết kế',
  notfound: 'Không tìm thấy trang',
};

let firstRender = true;

function render(route: Route): void {
  clear(main);
  appRoot.dataset['route'] = route.name;

  let activeStage: StageId | null = null;

  switch (route.name) {
    case 'opening':
      main.appendChild(openingPage());
      break;
    case 'journey':
      main.appendChild(journeyPage());
      break;
    case 'stage': {
      const id = route.params['id'] as StageId | undefined;
      if (id && STAGE_BY_ID.has(id)) {
        activeStage = id;
        markVisited(id);
      }
      main.appendChild(stagePage(id ?? 'ky-1'));
      break;
    }
    case 'compare':
      main.appendChild(
        comparePage({ left: route.params['left'], right: route.params['right'] }),
      );
      break;
    case 'connect':
      main.appendChild(connectPage());
      break;
    case 'synthesis':
      main.appendChild(synthesisPage());
      break;
    // `#/thiet-ke` is where the design-decision record lives, as a section of
    // the verification register. The route existed but had no branch here, so
    // it rendered "page not found" to anyone who followed it.
    case 'verify':
    case 'design': // falls through: same screen
      main.appendChild(verifyPage());
      break;
    default:
      main.appendChild(
        h(
          'div',
          { class: 'page-head' },
          h('h1', { class: 'page-head__title', text: 'Không tìm thấy trang' }),
          h('p', { class: 'page-head__lede', text: 'Địa chỉ này không tương ứng với phần nào của sản phẩm.' }),
          h('a', { class: 'btn', href: '#/', text: 'Về câu hỏi trung tâm' }),
        ),
      );
  }

  const here = location.hash || '#/';
  updateJourneyBar(activeStage, route.name, here);
  syncMenu(activeStage, here);

  const stage = activeStage ? STAGE_BY_ID.get(activeStage) : undefined;
  const label = stage ? `Chặng ${String(stage.ordinal)} · ${stage.headingPeriod}` : TITLES[route.name];
  document.title = `${label ?? 'Hành trình tư tưởng'} — ${PRODUCT_TITLE}`;

  // On a route change, move focus to the content region so keyboard and
  // screen-reader users land on the new view rather than staying on the link
  // they activated. On the very first render focus is left alone, otherwise the
  // skip link would be unreachable by the first Tab press.
  if (!firstRender) {
    main.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'auto' });
  }
  firstRender = false;
}

startRouter(render);

// Global shortcut for the Showcase: P toggles presentation mode.
document.addEventListener('keydown', (ev) => {
  if (ev.key !== 'p' && ev.key !== 'P') return;
  if (ev.metaKey || ev.ctrlKey || ev.altKey) return;
  const target = ev.target;
  if (
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement
  ) {
    return;
  }
  ev.preventDefault();
  if (presentation.isOpen()) presentation.close();
  else presentation.open();
});

if (!location.hash) navigate('/');
