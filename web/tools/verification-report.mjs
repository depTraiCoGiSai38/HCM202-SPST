/**
 * Inventory of everything the product shows that is not yet verified.
 *
 * Reads the data layer only. Nothing here is a judgement; it counts what the
 * data already declares so the group can work through it before submission.
 */
import { STAGES, EPILOGUE, ALL_QUOTATIONS } from '../src/data/stages.ts';
import { LOCATORS, RISKS, PRINTED_FORM_NOTES, UNNOTED_MARKERS } from '../src/data/locators.ts';
import { citeSource } from '../src/data/source.ts';

const line = (s) => console.log(s);

line('=== DOCUMENT CONFLICT ===');
for (const r of RISKS.filter((r) => r.status === 'DOCUMENT CONFLICT')) {
  line(`  ${r.id}  ${r.title}`);
  line(`         ${r.issue}`);
}

line('\n=== NEED VERIFICATION: risks ===');
for (const r of RISKS.filter((r) => r.status !== 'DOCUMENT CONFLICT')) {
  const where = STAGES.filter((s) => s.riskIds.includes(r.id)).map((s) => s.ordinal);
  line(`  ${r.id}  ${r.title}${where.length ? '  [chặng ' + where.join(', ') + ']' : ''}`);
}

line('\n=== NEED VERIFICATION: locator candidates ===');
for (const l of LOCATORS) {
  const sdd = l.printed.includes('Sdd') ? '  <- chữ viết tắt chưa mở rộng' : '';
  line(`  ${l.id}  ${citeSource(l.at)}${sdd}`);
}
line(`  (${String(LOCATORS.length)} ứng viên, không cái nào được đánh dấu đã kiểm chứng)`);
line(`  (${String(UNNOTED_MARKERS.length)} mốc xuất bản in trong thân bài, không có chú thích số)`);

line('\n=== Ngôn ngữ đánh giá do giáo trình đưa ra, cần kiểm chứng độc lập ===');
let ev = 0;
for (const s of STAGES) {
  const list = [...s.context, ...s.development].filter((p) => p.evaluative);
  ev += list.length;
  if (list.length) line(`  chặng ${String(s.ordinal)}: ${list.map((p) => p.id).join(', ')}`);
}
line(`  tổng: ${String(ev)} đoạn`);

line('\n=== Ghi chú bản in giữ nguyên, không sửa ===');
for (const n of PRINTED_FORM_NOTES) {
  line(`  "${n.printed}"  ->  dùng: "${n.used}"  (${citeSource(n.at)})${n.registered ? '  [GT-R06]' : ''}`);
}

line('\n=== Trích dẫn nguyên văn ===');
line(`  ${String(ALL_QUOTATIONS.length)} trích dẫn; ${String(ALL_QUOTATIONS.filter((q) => q.locatorIds.length === 0).length)} không có chú thích số nào`);

line('\n=== Vĩ thanh ngoài mốc ngày 2-9-1969 ===');
line(`  ${EPILOGUE.label} — ${EPILOGUE.status}`);

line('\n=== Trạng thái tổng thể ===');
line('  REQUIRES HUMAN VERIFICATION AND REAL PROJECT EVIDENCE');
