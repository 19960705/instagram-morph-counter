// Skeleton paths for the digits 0-9, sampled to a fixed point count so any two
// digits can be morphed by interpolating point-by-point.
type P = [number, number];
const N = 90;

const arc = (cx: number, cy: number, rx: number, ry: number, a0: number, a1: number, n = 40): P[] =>
  Array.from({length: n + 1}, (_, i) => {
    const a = ((a0 + ((a1 - a0) * i) / n) * Math.PI) / 180;
    return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)] as P;
  });

const line = (a: P, b: P, n = 20): P[] =>
  Array.from({length: n + 1}, (_, i) => [a[0] + ((b[0] - a[0]) * i) / n, a[1] + ((b[1] - a[1]) * i) / n] as P);

const resample = (pts: P[], count: number): P[] => {
  const d = [0];
  for (let i = 1; i < pts.length; i++) {
    d.push(d[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  }
  const total = d[d.length - 1];
  const out: P[] = [];
  let j = 1;
  for (let k = 0; k < count; k++) {
    const t = (total * k) / (count - 1);
    while (j < d.length - 1 && d[j] < t) j++;
    const seg = d[j] - d[j - 1] || 1;
    const f = (t - d[j - 1]) / seg;
    out.push([pts[j - 1][0] + (pts[j][0] - pts[j - 1][0]) * f, pts[j - 1][1] + (pts[j][1] - pts[j - 1][1]) * f]);
  }
  return out;
};

const rot180 = (pts: P[]): P[] => pts.map(([x, y]) => [100 - x, 150 - y] as P);

const six: P[] = [
  ...arc(66, 28, 40, 28, -75, -170, 14).slice(0, -1),
  ...arc(50, 100, 32, 38, 200, 200 + 360, 50),
];

const eight: P[] = Array.from({length: 61}, (_, i) => {
  const t = (i / 60) * Math.PI * 2;
  return [50 + 29 * Math.sin(2 * t), 78 - 56 * Math.cos(t)] as P;
});

const RAW: P[][] = [
  arc(50, 75, 30, 54, -100, 260, 60), // 0
  [...line([22, 38], [58, 14], 10), ...line([58, 14], [58, 138], 30)], // 1
  [...arc(50, 46, 28, 28, 180, 395, 24), ...line([75, 66], [22, 132], 20), ...line([22, 132], [82, 132], 12)], // 2
  [...line([22, 20], [78, 20], 12), ...line([78, 20], [46, 66], 12), ...arc(48, 102, 34, 34, -95, 150, 30)], // 3
  [...line([66, 140], [66, 14], 20), ...line([66, 14], [14, 98], 18), ...line([14, 98], [90, 98], 14)], // 4
  [...line([80, 18], [30, 18], 10), ...line([30, 18], [24, 66], 10), ...arc(50, 100, 34, 36, -125, 150, 34)], // 5
  six, // 6
  [...line([14, 18], [86, 18], 14), ...line([86, 18], [38, 140], 24)], // 7
  eight, // 8
  rot180(six), // 9
];

export const DIGITS: P[][] = RAW.map((p) => resample(p, N));
export const POINTS = N;
export type {P};
