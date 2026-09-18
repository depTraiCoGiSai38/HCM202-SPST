/**
 * A minimal PNG reader, so the cartography audit can measure what was actually
 * PAINTED rather than what CSS said should be painted.
 *
 * This exists because the first cartography pass shipped a national-boundary
 * layer that satisfied every structural check - the path was in the SVG, the
 * stroke was set, the tests passed - and was invisible on screen. Computed style
 * is not evidence of visibility; pixels are. Nothing in this repository could
 * read a pixel, so this does.
 *
 * Dependency-free on purpose: `zlib` is in Node's standard library and PNG's
 * IDAT stream is zlib over filtered scanlines. The repository already hand-rolls
 * TopoJSON decoding and Douglas-Peucker for the same reason.
 *
 * Supports the 8-bit RGB/RGBA non-interlaced images Chrome produces for a
 * screenshot, which is all this is ever pointed at. Anything else throws rather
 * than guessing.
 */
import { inflateSync } from 'zlib';

/** @returns {{width:number,height:number,at:(x:number,y:number)=>[number,number,number]}} */
export function readPng(buffer) {
  if (buffer.readUInt32BE(0) !== 0x89504e47) throw new Error('not a PNG');

  let pos = 8;
  let width = 0;
  let height = 0;
  let depth = 0;
  let colourType = 0;
  const idat = [];

  while (pos < buffer.length) {
    const length = buffer.readUInt32BE(pos);
    const type = buffer.toString('ascii', pos + 4, pos + 8);
    const data = buffer.subarray(pos + 8, pos + 8 + length);
    if (type === 'IHDR') {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      depth = data[8];
      colourType = data[9];
      if (data[12] !== 0) throw new Error('interlaced PNG not supported');
    } else if (type === 'IDAT') {
      idat.push(data);
    } else if (type === 'IEND') {
      break;
    }
    pos += 12 + length;
  }

  if (depth !== 8) throw new Error(`unsupported bit depth ${String(depth)}`);
  const channels = colourType === 2 ? 3 : colourType === 6 ? 4 : 0;
  if (channels === 0) throw new Error(`unsupported colour type ${String(colourType)}`);

  const raw = inflateSync(Buffer.concat(idat));
  const stride = width * channels;
  const out = Buffer.alloc(height * stride);

  /*
   * Undo the per-scanline filters. Each scanline is prefixed with a filter byte;
   * the five types are defined by the PNG spec and all five turn up in a real
   * screenshot, so all five are implemented rather than the common ones only.
   */
  for (let y = 0; y < height; y++) {
    const filter = raw[y * (stride + 1)];
    const line = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1));
    const prev = y === 0 ? null : out.subarray((y - 1) * stride, y * stride);
    const cur = out.subarray(y * stride, (y + 1) * stride);
    for (let i = 0; i < stride; i++) {
      const a = i >= channels ? cur[i - channels] : 0;
      const b = prev ? prev[i] : 0;
      const c = prev && i >= channels ? prev[i - channels] : 0;
      const x = line[i];
      let v;
      switch (filter) {
        case 0:
          v = x;
          break;
        case 1:
          v = x + a;
          break;
        case 2:
          v = x + b;
          break;
        case 3:
          v = x + ((a + b) >> 1);
          break;
        case 4: {
          const p = a + b - c;
          const pa = Math.abs(p - a);
          const pb = Math.abs(p - b);
          const pc = Math.abs(p - c);
          v = x + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c);
          break;
        }
        default:
          throw new Error(`unknown PNG filter ${String(filter)}`);
      }
      cur[i] = v & 0xff;
    }
  }

  return {
    width,
    height,
    at: (x, y) => {
      const i = y * stride + x * channels;
      return [out[i], out[i + 1], out[i + 2]];
    },
  };
}

/** WCAG relative luminance, 0-1. */
export function luminance([r, g, b]) {
  return [r, g, b]
    .map((v) => v / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
    .reduce((acc, v, i) => acc + v * [0.2126, 0.7152, 0.0722][i], 0);
}

/** WCAG contrast ratio between two RGB triples. */
export function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}
