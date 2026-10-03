import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {Blob} from './Blob';

export const FPS = 30;
export const DURATION = 328; // ~10.93s, like the reference
export const WIDTH = 1080;
export const HEIGHT = 1350; // 4:5, same ratio as the original post card
const SEQUENCE = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3];
const STEP = 23.4; // frames per digit (~0.78s)
const MORPH = 8; // frames spent morphing between digits

export const Instagram: React.FC = () => {
  const frame = useCurrentFrame();
  const idx = Math.min(SEQUENCE.length - 1, Math.floor(frame / STEP));
  const local = frame - idx * STEP;
  const nextIdx = Math.min(SEQUENCE.length - 1, idx + 1);
  const t = interpolate(local, [STEP - MORPH, STEP], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });
  const wobble = Math.sin(frame / 9) * 0.5 + 0.5;
  return (
    <AbsoluteFill style={{background: '#fff'}}>
      <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
        <g transform="translate(300 290) scale(5)">
          <Blob from={SEQUENCE[idx]} to={SEQUENCE[nextIdx]} t={idx === nextIdx ? 0 : t} wobble={wobble} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
