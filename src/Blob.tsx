import React from 'react';
import {DIGITS, POINTS, P} from './digits';

const COLORS = ['#e60000', '#800019', '#0080ff', '#ff8cb4', '#008000', '#f2ff00'];
// Where each colour blob starts along the path (fraction); later blobs paint on top.
const STARTS = [0.0, 0.1, 0.3, 0.5, 0.62, 0.78];
const LENGTHS = [0.26, 0.22, 0.3, 0.3, 0.22, 0.3];

const mix = (a: P[], b: P[], t: number): P[] => a.map((p, i) => [p[0] + (b[i][0] - p[0]) * t, p[1] + (b[i][1] - p[1]) * t] as P);

const toD = (pts: P[]) => pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join(' ');

export const Blob: React.FC<{from: number; to: number; t: number; wobble: number}> = ({from, to, t, wobble}) => {
  const pts = mix(DIGITS[from], DIGITS[to], t);
  const shift = Math.round(wobble * 3);
  const slice = (s: number, l: number) => {
    const a = Math.floor(s * POINTS);
    const n = Math.max(3, Math.floor(l * POINTS));
    return pts.slice(a, a + n + 1);
  };
  return (
    <g strokeLinecap="round" strokeLinejoin="round" fill="none">
      {/* offset outline echo */}
      <path d={toD(pts)} stroke="#111" strokeWidth={41} transform="translate(-4 -3)" />
      <path d={toD(pts)} stroke="#fff" strokeWidth={38.5} transform="translate(-4 -3)" />
      {COLORS.map((c, i) => {
        const s = (STARTS[i] * POINTS + shift) / POINTS;
        const seg = slice(Math.min(s, 0.92), LENGTHS[i]);
        return <path key={c} d={toD(seg)} stroke={c} strokeWidth={i === 1 ? 28 : 36} />;
      })}
      {/* thin contour on top */}
      <path d={toD(pts)} stroke="#111" strokeWidth={1.4} opacity={0.75} />
    </g>
  );
};
