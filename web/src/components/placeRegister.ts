import {
  ARCHIPELAGOS,
  CARTOGRAPHY_PROJECTION,
  CARTOGRAPHY_RETRIEVED,
  CARTOGRAPHY_SOURCES,
  LAND_SIMPLIFY_DEGREES,
} from '../data/land';
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
      text: `Nền bản đồ mà bản khắc vẽ lên là một LỚP BẰNG CHỨNG KHÁC, không phải nguồn lịch sử và cũng không phải bản ghi toạ độ. Nó được ghi riêng ở mục “Nền bản đồ: nguồn, quy ước và giới hạn” ngay dưới đây. Một đường biên giới không xác thực điều gì trích đoạn nói, và giáo trình không cung cấp hình học bản đồ nào.`,
    }),
  );

  return sec;
}

/**
 * The basemap, as its own section of the register.
 *
 * It is separate from the place register above it on purpose. The Student
 * Guideline's source hierarchy governs ACADEMIC claims; a coastline is not one.
 * Three evidence classes meet on this plate and the product is only honest while
 * they stay apart:
 *
 *   the excerpt          - what happened, and where the source says it happened
 *   the coordinate record - where a named place is, quoted from Wikidata
 *   the basemap          - where land, borders and islands are drawn
 *
 * A border does not validate a historical claim. A textbook does not supply GIS
 * geometry. A coordinate database does not settle a sovereignty convention. This
 * section exists so a reader can see which of the three each line came from.
 *
 * Every field below is generated by `tools/build-land.mjs` from the constants
 * the geometry was actually built from. None is typed by hand, because a
 * hand-written constant in this register has already reported falsely once.
 */
export function cartographySection(): HTMLElement {
  const sec = h('section', { class: 'stack' });

  sec.appendChild(
    h('h2', { class: 'section-title', text: 'Nền bản đồ: nguồn, quy ước và giới hạn' }),
  );

  sec.appendChild(
    h('p', {
      class: 'section-sub',
      text: `Bản khắc vẽ bốn lớp nền: đường bờ biển, đường biên giới quốc gia, đảo ven bờ và các nhóm đảo ngoài khơi. Toàn bộ hình học được tải về một lần lúc dựng dữ liệu (ngày ${CARTOGRAPHY_RETRIEVED}), chuyển thành chữ và đóng gói sẵn trong sản phẩm; lúc chạy sản phẩm không gọi ra mạng, không gọi máy chủ ô bản đồ nào, và mở được từ ổ USB không có mạng.`,
    }),
  );

  sec.appendChild(
    h(
      'ul',
      { class: 'register' },
      ...CARTOGRAPHY_SOURCES.map((src) =>
        h(
          'li',
          { class: 'register__item', dataset: { status: 'NEED VERIFICATION' } },
          h(
            'div',
            { class: 'register__head' },
            h('span', { class: 'register__id', text: 'nền bản đồ' }),
            h('h3', { class: 'register__title', text: src.layer }),
            chipForStatus('NEED VERIFICATION'),
          ),
          /*
           * A dataset name is a filename, not prose: `ne_10m_admin_0_countries_vnm.geojson`
           * is one unbreakable 38-character token, and left in an ordinary value
           * it set a 572px minimum on the card and pushed a 390px viewport into
           * horizontal scroll at 200% text - which the cartography audit caught.
           * It reflows here, like the Wikidata addresses above it already do.
           * Basis: `long-token-wrapping`, ui-ux-pro-max Quick Reference section 6
           * - let URLs and IDs reflow with `overflow-wrap: anywhere`; the
           * Vietnamese prose around them is left to wrap on word boundaries.
           */
          h(
            'div',
            { class: 'register__field' },
            h('span', { class: 'register__label', text: 'Bộ dữ liệu' }),
            h('p', { class: 'register__value register__data', text: src.dataset }),
          ),
          field('Phiên bản', src.version),
          h(
            'div',
            { class: 'register__field' },
            h('span', { class: 'register__label', text: 'Địa chỉ tải' }),
            h('p', { class: 'register__url' }, h('a', { href: src.url, text: src.url })),
          ),
          field('Giấy phép', src.licence),
          field('Cách xử lý', src.note),
        ),
      ),
    ),
  );

  sec.appendChild(h('h3', { class: 'section-title', text: 'Quy ước thể hiện Việt Nam' }));

  sec.appendChild(
    h('p', {
      class: 'section-sub',
      text: 'Quy chuẩn kỹ thuật quốc gia về bản đồ hành chính QCVN 80:2024/BTNMT, ban hành kèm Thông tư số 28/2024/TT-BTNMT ngày 29-11-2024 của Bộ trưởng Bộ Tài nguyên và Môi trường, sửa đổi bởi Thông tư số 24/2025/TT-BNNMT ngày 20-6-2025, nêu ở mục 1.1: “Bản đồ phải thể hiện đúng chủ quyền lãnh thổ Việt Nam bao gồm đất liền, biển, đảo, quần đảo.” Đó là lý do bản khắc này không dừng lại ở đường bờ biển đất liền: nó vẽ cả đảo ven bờ và các nhóm đảo ngoài khơi mà bộ dữ liệu được dẫn có hình học. Toàn văn QCVN 80 mà nhóm đọc được là bản DỰ THẢO trước khi ký, đăng trên trang của một Sở; bản đã ban hành chưa mở được. Trạng thái: NEED VERIFICATION.',
    }),
  );

  sec.appendChild(
    h('p', {
      class: 'section-sub',
      text: 'Bản khắc KHÔNG ghi tên nhóm đảo nào. Đây là một quyết định biên tập của nhóm: đề tài của sản phẩm là quá trình hình thành và phát triển tư tưởng Hồ Chí Minh, không phải chủ quyền biển đảo. Hình học vẫn được giữ vì một tấm bản đồ Việt Nam dừng ở đường bờ biển đất liền sẽ bỏ mất chính thứ mà nguồn có; nhưng việc đặt tên lên bản vẽ sẽ là một phát ngôn mà sản phẩm này không cần đưa ra và cũng không có tư cách đưa ra. Bảng dưới đây ghi lại hình học đã dùng, không ghi tên.',
    }),
  );

  sec.appendChild(
    h(
      'ul',
      { class: 'register' },
      ...ARCHIPELAGOS.map((group) =>
        h(
          'li',
          { class: 'register__item', dataset: { status: 'NEED VERIFICATION' } },
          h(
            'div',
            { class: 'register__head' },
            h('span', { class: 'register__id', text: 'nhóm đảo ngoài khơi' }),
            h('h3', {
              class: 'register__title',
              text: `${String(group.islets.length)} đảo, ${String(group.isletExtent[0])}°Đ – ${String(
                group.isletExtent[2],
              )}°Đ`,
            }),
            chipForStatus('NEED VERIFICATION'),
          ),
          field(
            'Cách thể hiện trên bản khắc',
            `Ký hiệu đảo KHÔNG THEO TỶ LỆ, không phải hình khối đất liền, và không kèm tên. ${String(
              group.islets.length,
            )} điểm, mỗi điểm là một đảo trong bộ dữ liệu được dẫn. Ký hiệu quy ước là cách mà chính quy chuẩn quy định chứ không phải một lối đi vòng: QCVN 80:2024/BTNMT mục 4.1.2 nêu “các đảo có diện tích từ 0,5 mm² trở lên trên bản đồ được trình bày bằng ký hiệu theo tỷ lệ, các đảo có diện tích dưới 0,5 mm² trên bản đồ được trình bày bằng ký hiệu không theo tỷ lệ”, và mục 4.8 định nghĩa ký hiệu không theo tỷ lệ là ký hiệu có “kích thước quy ước, không theo kích thước thực”. Các đảo thật chỉ rộng khoảng 0,3-1,7 km, nhỏ hơn ngưỡng ấy rất nhiều. Ở khung nhìn rộng, các đảo nằm cách nhau chỉ vài đơn vị trên bản vẽ nên sẽ dính thành một khối đặc — ở đó bản khắc KHÔNG vẽ gì cả, vì tỷ lệ ấy không thể hiện được chúng một cách trung thực.`,
          ),
          field(
            'Phạm vi công bố của nhóm đảo',
            `Kinh độ ${String(group.extent[0])}° đến ${String(
              group.extent[2],
            )}° Đông, vĩ độ ${String(group.extent[1])}° đến ${String(
              group.extent[3],
            )}° Bắc, theo lớp địa danh của bộ dữ liệu được dẫn (mã ${group.wikidataId}).`,
          ),
          field(
            'Phạm vi mà nguồn thực sự dựng được',
            `Kinh độ ${String(group.isletExtent[0])}° đến ${String(
              group.isletExtent[2],
            )}° Đông, vĩ độ ${String(group.isletExtent[1])}° đến ${String(
              group.isletExtent[3],
            )}° Bắc. Đây là phạm vi của ${String(
              group.islets.length,
            )} đảo mà bộ dữ liệu có hình học. Nó KHÔNG trùng với phạm vi công bố ở trên: chỗ chênh nhau là phần nhóm đảo mà nguồn này không dựng được, và được ghi ra chứ không lấp đi.`,
          ),
        ),
      ),
    ),
  );

  sec.appendChild(h('h3', { class: 'section-title', text: 'Những điều nền bản đồ này KHÔNG làm' }));

  sec.appendChild(
    h(
      'ul',
      { class: 'register' },
      ...[
        {
          title: 'Không phải sản phẩm bản đồ đạt chuẩn',
          body: 'Điều 19 Thông tư 17/2018/TT-BTNMT buộc sản phẩm bản đồ thể hiện lãnh thổ Việt Nam phải dùng đường biên giới theo “bộ bản đồ chuẩn biên giới quốc gia được công bố”. Sản phẩm này KHÔNG dùng bộ bản đồ ấy, vì nhóm không tìm được nơi tải công khai. Vì vậy sản phẩm này KHÔNG tự nhận là đạt QCVN 80:2024/BTNMT hay Thông tư 17/2018/TT-BTNMT. Đây là một bản khắc tư liệu phục vụ học tập, và chỗ này ghi rõ khoảng cách ấy thay vì lờ đi.',
        },
        {
          title: 'Không phải phần mềm giải quyết tranh chấp',
          body: 'Vùng biển này đang có tranh chấp quốc tế. Sản phẩm này theo bản dữ liệu dựng theo quan điểm Việt Nam đã dẫn ở trên, và nói rõ là nó theo bản nào. Một dòng mã, một bài kiểm thử hay một hình vẽ không phân xử được chủ quyền, và ở đây không có chỗ nào tự nhận làm việc đó. Điều duy nhất sản phẩm khẳng định là: nó vẽ đúng theo nguồn đã dẫn, và nguồn ấy được nêu tên đầy đủ để người đọc tự mở ra đối chiếu.',
        },
        {
          title: 'Không phải hình học do AI sinh ra',
          body: 'Không toạ độ nào trên nền bản đồ này được gõ từ trí nhớ, ước lượng từ ảnh chụp màn hình, hay do mô hình sinh ra. Mỗi điểm đều do `tools/build-land.mjs` đọc ra từ tệp nguồn đã dẫn. Chạy lại công cụ ấy sẽ dựng lại đúng cùng một tệp: lớp đường bờ biển sinh ra trong đợt làm việc này trùng khít từng ký tự với lớp đã có từ trước.',
        },
        {
          title: 'Không phải biên giới lịch sử',
          body: 'Biên giới trên nền bản đồ là biên giới quốc gia HIỆN NAY, trong khi trích đoạn trải từ năm 1911 đến năm 1969. Chúng ở đây để định hướng — để người đọc biết một dấu nằm trong nước nào — chứ không phải để nói rằng biên giới ngày nay đã tồn tại y như vậy ở mọi mốc thời gian trích đoạn nêu. Dựng lại biên giới chính trị theo từng năm nằm ngoài phạm vi bài tập này.',
        },
        {
          title: 'Không vẽ ranh giới tỉnh',
          body: 'Bản khắc chỉ vẽ biên giới cấp quốc gia. Không có ranh giới tỉnh, bang, huyện hay xã của Việt Nam hay của bất kỳ nước nào. Đây không phải do lọc bỏ mà do tệp nguồn không chứa hình học cấp dưới quốc gia nào, nên không có đường nào như vậy lọt vào được. Hành trình tư tưởng không phải một bài tập bản đồ hành chính.',
        },
        {
          title: 'Phép chiếu không hoàn hảo',
          body: CARTOGRAPHY_PROJECTION,
        },
        {
          title: 'Độ phân giải có giới hạn',
          body: `Đường bờ biển và biên giới ở tỷ lệ 1:110m, đơn giản hoá Douglas-Peucker ở mức ${String(
            LAND_SIMPLIFY_DEGREES,
          )}°. Khung hẹp nhất mà bản khắc cho phép được chặn ở 24° kinh độ, để bản vẽ không bao giờ ngụ ý một độ chính xác mà dữ liệu nguồn không có. Hai quần đảo phải lấy từ bộ 10m vì ở mức 1:110m chúng hoàn toàn không tồn tại, nên hai lớp ấy khác tỷ lệ nhau — điều này được ghi ra chứ không giấu đi.`,
        },
      ].map((item) =>
        h(
          'li',
          { class: 'register__item', dataset: { status: 'NEED VERIFICATION' } },
          h(
            'div',
            { class: 'register__head' },
            h('span', { class: 'register__id', text: 'giới hạn' }),
            h('h3', { class: 'register__title', text: item.title }),
          ),
          h('p', { class: 'register__value', text: item.body }),
        ),
      ),
    ),
  );

  return sec;
}
