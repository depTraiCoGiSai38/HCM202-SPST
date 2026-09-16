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
import { createRail, setRailCompact, updateRail } from './components/rail';
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
const rail = createRail();
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
  { class: 'btn', type: 'button' },
  icon(ICONS.play),
  h('span', { text: 'Trình bày' }),
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

const masthead = h(
  'header',
  { class: 'masthead' },
  h(
    'a',
    { class: 'masthead__brand', href: '#/' },
    h('span', { class: 'masthead__title', text: PRODUCT_TITLE }),
    h('span', { class: 'masthead__sub', text: PRODUCT_SUBTITLE }),
  ),
  h('div', { class: 'masthead__tools' }, presentBtn, motionBtn, themeBtn),
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
app.appendChild(h('div', { class: 'shell' }, rail, main));
app.appendChild(colophon);
app.appendChild(presentation.root);

syncToolButtons();

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
  // The opening scene runs without the rail beside it; every other view keeps
  // the five-stage rail present, as the journey indicator has to be.
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
      main.appendChild(comparePage());
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

  updateRail(activeStage, location.hash || '#/');
  // On a stage screen the signature interaction is the thread; the rail steps
  // back to a progress indicator there and opens out again everywhere else.
  setRailCompact(route.name === 'stage');

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
