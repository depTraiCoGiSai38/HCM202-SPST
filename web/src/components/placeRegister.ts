import { LAND_SIMPLIFY_DEGREES } from '../data/land';
import {
  MOVEMENTS,
  PLACES,
  PLACE_READING_NOTES,
  SPATIAL_NODES,
  placeOf,
  turningPointPlacement,
} from '../data/places';
import { citeSource } from '../data/source';
import { chipForStatus, h } from '../lib/dom';

/**
 * Place, as a section of the verification register.
 *
 * Two things live here, and they are different in kind.
 *
 * The first is a NEW CLASS OF EVIDENCE this product did not previously carry.
 * Coordinates are not in the textbook and are not a textbook claim, so they are
 * not allowed to sit silently under a drawing. Each one quotes the item record
 * it came from - id, address, value, and the precision the record itself
 * publishes - so a human can open the same page and check it. Wikidata is a
 * checkable source, not an authority under the Student Guideline's hierarchy,
 * so every one of them stays `NEED VERIFICATION`.
 *
 * The second is the more important half: the places the excerpt does NOT give.
 * It records a date and no place for a large share of what it covers, including
 * most of its turning points. Filling those from general knowledge would be
 * inventing historical facts, which both rule documents put in their most
 * serious category. They are listed instead, which is what this register is for.
 *
 * Every number on this screen is counted from the data at render time. None is
 * written by hand - this register has already reported falsely once, when a
 * hand-written constant about the figures was not moved after the data changed.
 */
function field(label: string, value: string): HTMLElement {
  return h(
    'div',
    { class: 'register__field' },
    h('span', { class: 'register__label', text: label }),
    h('p', { class: 'register__value', text: value }),
  );
}

function placeItem(place: (typeof PLACES)[number]): HTMLElement {
  const c = place.coordinate;
  const item = h(
    'li',
    { class: 'register__item', dataset: { status: place.status } },
    h(
      'div',
      { class: 'register__head' },
      h('span', { class: 'register__id', text: place.granularity }),
      h('h3', { class: 'register__title', text: place.printed }),
      chipForStatus(place.status),
    ),
    field('Trích đoạn nói gì về nơi này', place.role),
    field('Vị trí trong trích đoạn', citeSource(place.at)),
  );

  if (c) {
    const labels = c.recordLabelVi === c.recordLabel ? c.recordLabel : `${c.recordLabel} / ${c.recordLabelVi}`;
    item.appendChild(
      h(
        'div',
        { class: 'register__field' },
        h('span', { class: 'register__label', text: 'Toạ độ và bản ghi dẫn nguồn' }),
        /*
         * A data line, not prose: coordinates, an item id, and the precision
         * exactly as the record publishes it. That precision is a raw float -
         * `0.00002777777777778` - and it is kept at full length because it is
         * quoted evidence, not a display value. As one unbreakable 20-character
         * token it set a 328px minimum on the whole card, which pushed the page
         * to 411px at 200% text on a 390px screen. It reflows here, and the
         * surrounding Vietnamese prose is deliberately left alone.
         */
        h('p', {
          class: 'register__value register__data',
          text: `${c.lat.toFixed(5)}, ${c.lon.toFixed(5)} — ${c.qid} (${labels}); độ chính xác do bản ghi công bố ${String(c.precision)}°; đọc ngày ${c.retrieved}.`,
        }),
        /*
         * The record's address, printed in full so it can be read off a
         * projected slide or a printout, not hidden behind link text.
         *
         * A URL is one unbreakable token, so it sets a minimum width on its
         * whole column and pushed the register 1.7px past a 375px viewport -
         * which the horizontal-overflow test caught. Basis: `long-token-wrapping`
         * in the skill's Quick Reference section 6 - let URLs and IDs reflow
         * with `overflow-wrap: anywhere` and a shrinkable text child, rather
         * than applying `word-break: break-all` to ordinary prose.
         */
        h('p', { class: 'register__url' }, h('a', { href: c.url, text: c.url })),
      ),
    );
  } else {
    item.appendChild(field('Vì sao không có toạ độ', place.noCoordinate ?? ''));
  }

  if (place.caution) item.appendChild(field('Lưu ý', place.caution));
  return item;
}

export function placeSection(): HTMLElement {
  const sec = h('section', { class: 'stack' });

  const unplaced = SPATIAL_NODES.filter((n) => n.kind === 'unplaced');
  const drawable = SPATIAL_NODES.filter(
    (n) => n.kind === 'placed' && placeOf(n)?.coordinate != null,
  ).length;
  const turns = turningPointPlacement();
  const turnTotal = turns.placed + turns.unplaced + turns.region;

  sec.appendChild(
    h('h2', {
      class: 'section-title',
      text: 'Nơi chốn: toạ độ, và những chỗ trích đoạn không định vị',
    }),
  );

  sec.appendChild(
    h('p', {
      class: 'section-sub',
      text: `Bản khắc chỉ đặt lên bản đồ những gì trích đoạn in ra. Trên ${String(
        SPATIAL_NODES.length,
      )} sự việc mà tám trang ghi nhận, ${String(drawable)} vẽ được thành một điểm; ${String(
        unplaced.length,
      )} sự việc có ngày tháng nhưng không có nơi chốn nào trong trích đoạn; và trong ${String(
        turnTotal,
      )} bước ngoặt thì chỉ ${String(turns.placed)} bước ngoặt có in địa điểm.`,
    }),
  );

  sec.appendChild(
    h('p', {
      class: 'section-sub',
      text: 'Toạ độ KHÔNG có trong giáo trình. Đây là một lớp bằng chứng riêng, dẫn từ bản ghi của từng địa danh trên Wikidata, và không bao giờ được trình bày như một khẳng định của giáo trình. Wikidata là nguồn kiểm được, không phải một nguồn có thẩm quyền theo thứ bậc nguồn của tài liệu hướng dẫn, nên mọi mục dưới đây giữ nguyên trạng thái NEED VERIFICATION.',
    }),
  );

  sec.appendChild(h('ul', { class: 'register' }, ...PLACES.map(placeItem)));

  sec.appendChild(
    h('h3', {
      class: 'section-title',
      text: `Sự việc trích đoạn không in địa điểm (${String(unplaced.length)})`,
    }),
  );
  sec.appendChild(
    h('ul', { class: 'register' }, ...unplaced.map((node) =>
      h(
        'li',
        { class: 'register__item', dataset: { status: node.status } },
        h(
          'div',
          { class: 'register__head' },
          h('span', { class: 'register__id', text: node.marker ?? 'không in mốc' }),
          h('h3', { class: 'register__title', text: node.title }),
        ),
        field('Vị trí trong trích đoạn', citeSource(node.at)),
        node.caution ? field('Lưu ý', node.caution) : null,
      ),
    )),
  );

  sec.appendChild(
    h('h3', {
      class: 'section-title',
      text: `Câu nói thẳng ra một chuyến đi (${String(MOVEMENTS.length)})`,
    }),
  );
  sec.appendChild(
    h('ul', { class: 'register' }, ...MOVEMENTS.map((m) =>
      h(
        'li',
        { class: 'register__item', dataset: { status: m.status } },
        h(
          'div',
          { class: 'register__head' },
          h('span', { class: 'register__id', text: m.marker }),
          h('h3', {
            class: 'register__title',
            text: m.legs.some((l) => l === null) ? 'Một đầu không có tên' : 'Hai đầu đều có tên',
          }),
        ),
        field('Câu trong trích đoạn', m.statement),
        field('Vị trí trong trích đoạn', citeSource(m.at)),
        m.caution ? field('Lưu ý', m.caution) : null,
      ),
    )),
  );

  sec.appendChild(h('h3', { class: 'section-title', text: 'Đọc lại bản quét để lấy tên đất' }));
  sec.appendChild(
    h('p', {
      class: 'section-sub',
      text: 'Tệp 2019 không có lớp văn bản, nên tám trang ảnh của nó được tách ra và đọc trực tiếp cho phần việc này. Những chỗ bản in lệch với bản ghi thứ cấp của chính dự án được ghi lại ở đây thay vì lặng lẽ làm phẳng.',
    }),
  );
  sec.appendChild(
    h('ul', { class: 'register' }, ...PLACE_READING_NOTES.map((note) =>
      h(
        'li',
        { class: 'register__item', dataset: { status: 'NEED VERIFICATION' } },
        h(
          'div',
          { class: 'register__head' },
          h('span', { class: 'register__id', text: note.id }),
          h('h3', { class: 'register__title', text: note.printed }),
        ),
        field('Bản ghi khác của dự án ghi', note.elsewhere),
        field('Xử lý', note.note),
        field('Vị trí trong trích đoạn', citeSource(note.at)),
      ),
    )),
  );

  sec.appendChild(
    h('p', {
      class: 'section-sub',
      text: `Nền bản đồ là đường bờ biển Natural Earth 1:110m, miền công cộng, đơn giản hoá ở mức ${String(
        LAND_SIMPLIFY_DEGREES,
      )}°, đóng gói sẵn trong sản phẩm và không tải về lúc chạy. Không vẽ đường biên giới quốc gia: trích đoạn trải từ năm 1911 đến năm 1969, nên biên giới ngày nay đặt dưới chân nội dung sẽ là một mốc thời gian sai. Phép chiếu là phép chiếu hình trụ đều, nên vùng vĩ độ cao bị kéo giãn theo chiều ngang; điều này được ghi ra ở đây chứ không giấu đi.`,
    }),
  );

  return sec;
}
