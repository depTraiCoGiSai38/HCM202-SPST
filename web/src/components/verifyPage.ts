import { citeSource } from '../data/source';
import { LOCATORS, PRINTED_FORM_NOTES, RISKS, UNNOTED_MARKERS } from '../data/locators';
import { continueJourney, whatNext } from './whatnext';
import { ALL_QUOTATIONS, STAGES } from '../data/stages';
import { DESIGN_DECISIONS, INTEGRITY_STATEMENTS } from '../data/project';
import {
  FIGURE_REQUIREMENTS,
  FIGURE_SLOTS,
  figureFilledCount,
  figureStatus,
  slotStatus,
  SOURCING_CHECKS,
} from '../data/figures';
import { chipForStatus, h } from '../lib/dom';
import { RISK_BY_ID } from '../data/locators';
import { motionSuppressed } from '../lib/state';

/**
 * The verification register.
 *
 * Everything the product has NOT verified, gathered in one place and shown to
 * the viewer rather than hidden. This is the honest counterpart to the
 * Evidence Visible standard: the apparatus states its own limits.
 */
export function verifyPage(): HTMLElement {
  const wrap = h('div', { class: 'stack stack--l' });

  wrap.appendChild(
    h(
      'header',
      { class: 'page-head' },
      h('p', { class: 'kicker', text: 'Kiểm chứng' }),
      h('h1', { class: 'page-head__title', text: 'Những gì chưa được kiểm chứng' }),
      h('p', {
        class: 'page-head__lede',
        text: 'Trang này liệt kê đúng những chỗ mà sản phẩm chưa xác thực được: ứng viên định vị, căng thẳng niên đại trong tài liệu, và các dấu hiệu lỗi in. Không mục nào ở đây được đánh dấu là đã kiểm chứng.',
      }),
    ),
  );

  wrap.appendChild(contents());
  wrap.appendChild(conflictFocus());
  wrap.appendChild(anchor('tom-tat', summary()));
  wrap.appendChild(h('hr', { class: 'rule' }));
  wrap.appendChild(anchor('dinh-vi', locatorTable()));
  wrap.appendChild(h('hr', { class: 'rule' }));
  wrap.appendChild(anchor('khong-chu-thich', unnotedSection()));
  wrap.appendChild(h('hr', { class: 'rule' }));
  wrap.appendChild(anchor('rui-ro', riskSection()));
  wrap.appendChild(h('hr', { class: 'rule' }));
  wrap.appendChild(anchor('chu-in', printedFormSection()));
  wrap.appendChild(h('hr', { class: 'rule' }));
  wrap.appendChild(anchor('anh-tu-lieu', figureSection()));
  wrap.appendChild(h('hr', { class: 'rule' }));
  wrap.appendChild(anchor('khai-bao', statementsSection()));
  wrap.appendChild(h('hr', { class: 'rule' }));
  wrap.appendChild(anchor('thiet-ke', designSection()));
  wrap.appendChild(
    whatNext({
      lead: 'Đây là bản ghi những gì chưa xác thực, không phải một chặng của hành trình.',
      primary: continueJourney(),
      secondary: { label: 'Về câu hỏi dẫn đường', href: '#/' },
    }),
  );

  return wrap;
}

/**
 * Documentary photographs: the positions, which are filled, and why the rest
 * are empty.
 *
 * Every number and every status on this screen is derived from the figure data.
 * They used to be written by hand, and when the first photograph cleared its
 * source and its usage condition the hand-written text did not move - so this
 * screen, whose whole job is to state the evidence truthfully, went on saying
 * that nothing had cleared while the opening screen displayed something that
 * had. Under AGENTS.md that is the wrong direction of error to leave standing,
 * so nothing here is a constant any more.
 */
function figureSection(): HTMLElement {
  const total = FIGURE_SLOTS.length;
  const filled = figureFilledCount();
  const empty = total - filled;

  const sec = h('section', { class: 'stack' });
  sec.appendChild(h('h2', { class: 'section-title', text: 'Ảnh tư liệu: vị trí đã điền và vị trí còn trống' }));
  sec.appendChild(
    h('p', {
      class: 'section-lede',
      text:
        `Sản phẩm có ${String(total)} vị trí dành cho ảnh tư liệu. ` +
        `Hiện ${String(filled)} vị trí đã được điền và ${String(empty)} vị trí còn trống. ` +
        'Một vị trí chỉ được điền khi ảnh vừa mở được trang nguồn để kiểm, vừa có điều kiện sử dụng cho phép dùng lại. ' +
        'Các vị trí còn lại được để trống và ghi rõ là đang bị chặn, không dựng ảnh thay thế và không dùng AI tạo chân dung.',
    }),
  );
  sec.appendChild(h('p', {}, chipForStatus(figureStatus())));

  const slots = h('div', { class: 'table-wrap' });
  const slotTable = h('table', { class: 'grid' });
  slotTable.appendChild(
    h(
      'thead',
      {},
      h(
        'tr',
        {},
        h('th', { text: 'Mã vị trí' }),
        h('th', { text: 'Dùng để' }),
        h('th', { text: 'Trạng thái' }),
      ),
    ),
  );
  const slotBody = h('tbody', {});
  for (const slot of FIGURE_SLOTS) {
    slotBody.appendChild(
      h(
        'tr',
        {},
        h('td', {}, h('span', { class: 'marker', text: slot.id })),
        h('td', { text: slot.role }),
        h('td', {}, chipForStatus(slotStatus(slot.id))),
      ),
    );
  }
  slotTable.appendChild(slotBody);
  slots.appendChild(slotTable);
  sec.appendChild(slots);

  sec.appendChild(
    h('h3', { class: 'section-sub', text: 'Những nguồn đã kiểm, và kết quả' }),
  );

  const checks = h('div', { class: 'table-wrap' });
  const checkTable = h('table', { class: 'grid' });
  checkTable.appendChild(
    h(
      'thead',
      {},
      h(
        'tr',
        {},
        h('th', { text: 'Trang đã mở' }),
        h('th', { text: 'Loại' }),
        h('th', { text: 'Trang đó ghi gì' }),
        h('th', { text: 'Vì sao chưa dùng được' }),
      ),
    ),
  );
  const checkBody = h('tbody', {});
  for (const c of SOURCING_CHECKS) {
    checkBody.appendChild(
      h(
        'tr',
        {},
        h('td', {}, h('span', { class: 'marker', text: c.url })),
        h('td', { text: c.kind }),
        h('td', { text: c.found }),
        h('td', { text: c.blocker }),
      ),
    );
  }
  checkTable.appendChild(checkBody);
  checks.appendChild(checkTable);
  sec.appendChild(checks);

  sec.appendChild(h('h3', { class: 'section-sub', text: 'Điều kiện để mở khoá một vị trí' }));
  const reqs = h('ol', { class: 'bounds' });
  for (const r of FIGURE_REQUIREMENTS) reqs.appendChild(h('li', { text: r }));
  sec.appendChild(reqs);

  return sec;
}

/** Give a section a stable id so the contents list and the deck can reach it. */
function anchor(id: string, section: HTMLElement): HTMLElement {
  section.id = id;
  section.tabIndex = -1;
  return section;
}

const SECTIONS: [string, string][] = [
  ['tom-tat', 'Tóm tắt bằng con số'],
  ['dinh-vi', 'Mười ứng viên định vị'],
  ['khong-chu-thich', 'Dẫn liệu không có chú thích số'],
  ['rui-ro', 'Sổ rủi ro niên đại và văn bản'],
  ['chu-in', 'Đối chiếu dạng chữ in'],
  ['anh-tu-lieu', 'Ảnh tư liệu: vị trí còn trống'],
  ['khai-bao', 'Sản phẩm tự khai báo'],
  ['thiet-ke', 'Căn cứ của các lựa chọn thiết kế'],
];

/**
 * Contents.
 *
 * This is a reference appendix, not a narrative: it is long on purpose, and the
 * tables below are kept whole. What it lacked was a way in.
 */
function contents(): HTMLElement {
  const list = h('ul', { class: 'toc__list' });

  for (const [id, label] of SECTIONS) {
    // Buttons, not anchors. The product routes on the hash, so `href="#tom-tat"`
    // does not jump within the page - it replaces the route, and the router
    // resolves it to "not found". A control that scrolls and moves focus is
    // what this actually is, so that is what it says it is.
    const btn = h('button', { class: 'toc__link', type: 'button', text: label });
    btn.addEventListener('click', () => {
      const target = document.getElementById(id);
      if (!target) return;
      target.scrollIntoView({
        behavior: motionSuppressed() ? 'auto' : 'smooth',
        block: 'start',
      });
      // Move focus with the view, so a keyboard or screen-reader user arrives
      // where a sighted user is looking rather than carrying on from the list.
      target.focus({ preventScroll: true });
    });
    list.appendChild(h('li', {}, btn));
  }

  return h(
    'nav',
    { class: 'toc', aria: { label: 'Mục lục phụ lục kiểm chứng' } },
    h('p', { class: 'atlas__kicker', text: 'Mục lục' }),
    list,
  );
}

/**
 * The one document conflict, given its own place.
 *
 * It is beat 6 of the Showcase, so it has to be findable in one look rather
 * than hunted for inside the risk table - where it also remains, in full.
 */
function conflictFocus(): HTMLElement {
  const risk = RISK_BY_ID.get('GT-R02');
  if (!risk) return h('div');

  return h(
    'section',
    { class: 'focus', id: 'xung-dot' },
    h(
      'p',
      { class: 'focus__head' },
      h('span', { class: 'focus__id', text: risk.id }),
      h('span', { class: 'focus__tag', text: 'Hai chỗ trong tài liệu không khớp nhau' }),
    ),
    h('h2', { class: 'focus__title', text: risk.title }),
    h('p', { class: 'focus__issue', text: risk.issue }),
    h(
      'p',
      { class: 'focus__handling' },
      h('span', { class: 'focus__handling-label', text: 'Nhóm xử lý thế nào' }),
      h('span', { text: risk.handling }),
    ),
    h('p', { class: 'focus__code', text: risk.status }),
  );
}

function summary(): HTMLElement {
  const sddCount = LOCATORS.filter((l) => l.printed.includes('Sđd')).length;
  const evaluativeCount = STAGES.reduce(
    (n, s) => n + [...s.context, ...s.development].filter((p) => p.evaluative).length,
    0,
  );

  const facts: [string, string][] = [
    ['Ứng viên định vị được in trong trích đoạn', String(LOCATORS.length)],
    ['Trong đó dùng chữ viết tắt “Sđd”, không được mở rộng', String(sddCount)],
    ['Dẫn liệu xuất bản không kèm chú thích số', String(UNNOTED_MARKERS.length)],
    ['Trích dẫn nguyên văn được tái hiện', String(ALL_QUOTATIONS.length)],
    ['Câu mang tính đánh giá, quy kết của tài liệu', String(evaluativeCount)],
    ['Mục trong sổ rủi ro niên đại và văn bản', String(RISKS.length)],
    ['Dạng chữ in khác với dạng dùng trong diễn giải', String(PRINTED_FORM_NOTES.length)],
  ];

  const grid = h('div', { class: 'figures' });
  for (const [label, value] of facts) {
    grid.appendChild(
      h(
        'div',
        { class: 'figure-card' },
        h('p', { class: 'figure-card__n', text: value }),
        h('p', { class: 'figure-card__label', text: label }),
      ),
    );
  }

  return h(
    'section',
    { class: 'stack' },
    h('h2', { class: 'page-head__title', text: 'Tóm tắt bằng con số' }),
    h('p', {
      class: 'page-head__lede',
      text: 'Các con số này đếm chính nội dung đang được hiển thị trong sản phẩm, không phải số liệu khảo sát.',
    }),
    grid,
  );
}

function locatorTable(): HTMLElement {
  const tbody = h('tbody');
  for (const l of LOCATORS) {
    tbody.appendChild(
      h(
        'tr',
        {},
        h('td', {}, h('span', { class: 'source__id', text: l.id })),
        h('td', {}, h('span', { class: 'source__printed', text: l.printed })),
        h('td', {}, h('span', { class: 'marker', text: citeSource(l.at) })),
        h('td', {}, h('span', { text: l.attachedTo })),
        h(
          'td',
          {},
          chipForStatus(l.status),
          l.caution ? h('p', { class: 'source__caution', text: l.caution }) : null,
        ),
      ),
    );
  }

  return h(
    'section',
    { class: 'stack' },
    h('h2', { class: 'page-head__title', text: 'Mười ứng viên định vị' }),
    h('p', {
      class: 'page-head__lede',
      text: 'Đây là mười chú thích số in trong trích đoạn, tái hiện nguyên văn. Chúng là ứng viên, chưa phải trích dẫn đã xác thực. Một chú thích ở gần không hợp thức hoá cả đoạn văn quanh nó.',
    }),
    h(
      'div',
      { class: 'table-wrap' },
      h(
        'table',
        { class: 'grid' },
        h(
          'thead',
          {},
          h(
            'tr',
            {},
            h('th', { text: 'Mã' }),
            h('th', { text: 'Nguyên văn chú thích' }),
            h('th', { text: 'Vị trí' }),
            h('th', { text: 'Gắn với' }),
            h('th', { text: 'Trạng thái' }),
          ),
        ),
        tbody,
      ),
    ),
  );
}

function unnotedSection(): HTMLElement {
  const list = h('ul', { class: 'passages' });
  for (const m of UNNOTED_MARKERS) {
    list.appendChild(h('li', { class: 'passage' }, h('p', { class: 'source__printed', text: m })));
  }
  return h(
    'section',
    { class: 'stack' },
    h('h2', { class: 'page-head__title', text: 'Dẫn liệu không có chú thích số' }),
    h('p', {
      class: 'page-head__lede',
      text: 'Các dẫn liệu xuất bản sau đây xuất hiện ngay trong thân bài mà không kèm chú thích số nào.',
    }),
    list,
    h('p', {}, chipForStatus('NEED VERIFICATION')),
  );
}

function riskSection(): HTMLElement {
  const list = h('ul', { class: 'register' });
  for (const r of RISKS) {
    list.appendChild(
      h(
        'li',
        { class: 'register__item', dataset: { status: r.status } },
        h(
          'div',
          { class: 'register__head' },
          h('span', { class: 'register__id', text: r.id }),
          h('h3', { class: 'register__title', text: r.title }),
          chipForStatus(r.status),
        ),
        h(
          'div',
          { class: 'register__field' },
          h('span', { class: 'register__label', text: 'Hiện trạng trong tài liệu' }),
          h('p', { class: 'register__value', text: r.issue }),
        ),
        h(
          'div',
          { class: 'register__field' },
          h('span', { class: 'register__label', text: 'Cách xử lý' }),
          h('p', { class: 'register__value', text: r.handling }),
        ),
      ),
    );
  }

  return h(
    'section',
    { class: 'stack' },
    h('h2', { class: 'page-head__title', text: 'Sổ rủi ro niên đại và văn bản' }),
    h('p', {
      class: 'page-head__lede',
      text: 'Chín mục dưới đây được giữ nguyên trạng. Sản phẩm không sửa, không dời chỗ và không chuẩn hoá chúng theo trí nhớ.',
    }),
    list,
  );
}

function printedFormSection(): HTMLElement {
  const tbody = h('tbody');
  for (const n of PRINTED_FORM_NOTES) {
    tbody.appendChild(
      h(
        'tr',
        {},
        h('td', {}, h('span', { class: 'source__id', text: n.id })),
        h('td', {}, h('span', { class: 'source__printed', text: n.printed })),
        h('td', {}, h('span', { text: n.used })),
        h('td', {}, h('span', { class: 'marker', text: citeSource(n.at) })),
        h('td', {}, h('span', { text: n.where })),
        h(
          'td',
          {},
          n.registered
            ? h('span', { class: 'chip chip--source', text: 'ĐÃ GHI TRONG GT-R06' })
            : chipForStatus('NEED VERIFICATION'),
        ),
      ),
    );
  }

  return h(
    'section',
    { class: 'stack' },
    h('h2', { class: 'page-head__title', text: 'Đối chiếu dạng chữ in và dạng dùng trong diễn giải' }),
    h('p', {
      class: 'page-head__lede',
      text: 'Giáo trình 2019 in một số dạng chữ khác với dạng mà sản phẩm dùng trong câu diễn giải tiếng Việt. Bảng này ghi lại cả hai dạng thay vì lặng lẽ thay thế. Mỗi mục đều đọc trực tiếp trên bản quét ở mức phóng to và đều nằm trong GT-R06. Việc mỗi mục là lỗi in thật hay là đặc điểm của bản quét vẫn chưa được giải quyết và cần bản in sạch.',
    }),
    h('p', {
      class: 'page-head__lede',
      text: 'Ở những chỗ sản phẩm trích dẫn nguyên văn, dạng in được giữ nguyên; bảng này chỉ nói về câu diễn giải.',
    }),
    h(
      'div',
      { class: 'table-wrap' },
      h(
        'table',
        { class: 'grid' },
        h(
          'thead',
          {},
          h(
            'tr',
            {},
            h('th', { text: 'Mã' }),
            h('th', { text: 'Dạng in trong bản được cung cấp' }),
            h('th', { text: 'Dạng dùng trong diễn giải' }),
            h('th', { text: 'Vị trí' }),
            h('th', { text: 'Ở câu nào' }),
            h('th', { text: 'Trạng thái' }),
          ),
        ),
        tbody,
      ),
    ),
  );
}

function statementsSection(): HTMLElement {
  const list = h('div', { class: 'figures' });
  for (const s of INTEGRITY_STATEMENTS) {
    list.appendChild(
      h(
        'div',
        { class: 'card' },
        h(
          'div',
          { class: 'register__head' },
          h('h3', { class: 'card__title', text: s.title }),
          chipForStatus(s.status),
        ),
        h('p', { class: 'register__value', text: s.body }),
      ),
    );
  }
  return h(
    'section',
    { class: 'stack' },
    h('h2', { class: 'page-head__title', text: 'Sản phẩm tự khai báo' }),
    list,
  );
}

function designSection(): HTMLElement {
  const tbody = h('tbody');
  for (const d of DESIGN_DECISIONS) {
    tbody.appendChild(
      h(
        'tr',
        {},
        h('td', {}, h('span', { class: 'source__id', text: d.id })),
        h('td', { text: d.decision }),
        h('td', { text: d.reason }),
        h('td', { text: d.evidence }),
        h('td', { text: d.alternative }),
      ),
    );
  }

  return h(
    'section',
    { class: 'stack' },
    h('h2', { class: 'page-head__title', text: 'Căn cứ của các lựa chọn thiết kế' }),
    h('p', {
      class: 'page-head__lede',
      text: 'Cẩm nang yêu cầu mọi lựa chọn thiết kế phải có bằng chứng, nhưng không quy định biểu mẫu. Bảng dưới đây là cách nhóm tự ghi lại; bản thân bảng này là một quyết định của nhóm.',
    }),
    h(
      'div',
      { class: 'table-wrap' },
      h(
        'table',
        { class: 'grid' },
        h(
          'thead',
          {},
          h(
            'tr',
            {},
            h('th', { text: 'Mã' }),
            h('th', { text: 'Quyết định' }),
            h('th', { text: 'Lý do' }),
            h('th', { text: 'Căn cứ' }),
            h('th', { text: 'Phương án đã cân nhắc' }),
          ),
        ),
        tbody,
      ),
    ),
  );
}
