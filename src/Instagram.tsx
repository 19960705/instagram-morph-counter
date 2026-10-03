import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {Blob} from './Blob';

export const FPS = 30;
export const DURATION = 328; // ~10.93s, like the reference
const SEQUENCE = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3];
const STEP = 23.4; // frames per digit (~0.78s)
const MORPH = 8; // frames spent morphing between digits

const FONT = '-apple-system, "SF Pro Text", "Helvetica Neue", Helvetica, Arial, "PingFang SC", sans-serif';

const Icon: React.FC<{y: number; children: React.ReactNode}> = ({y, children}) => (
  <svg style={{position: 'absolute', left: 24, top: y - 12}} width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const Sidebar: React.FC = () => (
  <>
    <Icon y={168}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.3" cy="6.7" r=".6" fill="#111" /></Icon>
    <Icon y={312}><path d="M3 11l9-8 9 8v10h-6v-6H9v6H3z" fill="#111" /></Icon>
    <Icon y={367}><rect x="3" y="3" width="18" height="18" rx="5" /><path d="M10 8l5 4-5 4z" /></Icon>
    <Icon y={424}><path d="M21 3L3 9l7 3 3 8z" /><path d="M10 12l6-4" /></Icon>
    <Icon y={479}><circle cx="11" cy="11" r="7" /><path d="M21 21l-5-5" /></Icon>
    <Icon y={535}><path d="M12 21C5 15 3 12 3 8.5A4.5 4.5 0 0112 6a4.5 4.5 0 019 2.5C21 12 19 15 12 21z" /></Icon>
    <div style={{position: 'absolute', left: 43, top: 523, width: 8, height: 8, borderRadius: 4, background: '#ff3040'}} />
    <Icon y={591}><path d="M12 4v16M4 12h16" /></Icon>
    <Icon y={647}><rect x="3" y="3" width="18" height="18" rx="4" /><path d="M8 17v-5M12 17V7M16 17v-3" /></Icon>
    <div style={{position: 'absolute', left: 24, top: 691, width: 24, height: 24, borderRadius: 12, background: 'radial-gradient(circle at 50% 40%, #e9d3c4 0 30%, #2a1f1c 31% 100%)'}} />
    <Icon y={854}><path d="M3 6h18M3 12h18M3 18h18" /></Icon>
    <Icon y={911}><rect x="3" y="3" width="7" height="7" rx="2" /><rect x="14" y="3" width="7" height="7" rx="2" /><rect x="8" y="14" width="7" height="7" rx="2" /></Icon>
  </>
);

const SUGGEST: [string, string, number][] = [
  ['みい | Snow Manと暮らす社会人', '粉丝：mm.s.d.snow', 140],
  ['太田栄子', '为你推荐', 205],
  ['Zhao', '粉丝：cst.tang.1117', 265],
  ['星野傻熊', '粉丝：hoshinobakakuma', 325],
  ['42evo', '为你推荐', 385],
];

const Suggestions: React.FC = () => (
  <>
    {SUGGEST.map(([name, sub, y], i) => (
      <div key={name}>
        <div style={{position: 'absolute', left: 1167, top: y - 22, width: 44, height: 44, borderRadius: 22, background: ['#6d7fb5', '#9a9a8c', '#d6d6d9', '#d9d9e6', '#4a4540'][i], overflow: 'hidden'}}>
          {name === 'Zhao' && <div style={{position: 'absolute', left: 12, top: 8, width: 20, height: 20, borderRadius: 10, background: '#8e8e93', boxShadow: '0 22px 0 6px #8e8e93'}} />}
        </div>
        <div style={{position: 'absolute', left: 1224, top: y - (i === 0 ? 24 : 20), width: 190, fontSize: 15, fontWeight: 600, lineHeight: '17px', whiteSpace: 'normal', color: '#111', fontFamily: FONT}}>{name}</div>
        <div style={{position: 'absolute', left: 1224, top: y + (i === 0 ? 10 : 0), fontSize: 13, color: '#737373', fontFamily: FONT}}>{sub}</div>
        <div style={{position: 'absolute', left: 1424, top: y - 10, fontSize: 13, fontWeight: 600, color: '#2f3cff', fontFamily: FONT}}>关注</div>
      </div>
    ))}
    <div style={{position: 'absolute', left: 1163, top: 447, width: 290, fontSize: 13, lineHeight: '20px', whiteSpace: 'normal', color: '#737373', fontFamily: FONT}}>
      关于 · 帮助 · 新闻中心 · API · 工作 · 隐私设置 · 条款 · 地点 · 语言 · Meta Verified
    </div>
    <div style={{position: 'absolute', left: 1163, top: 504, fontSize: 13, color: '#737373', fontFamily: FONT}}>© 2026 INSTAGRAM FROM META</div>
  </>
);

const Post: React.FC<{digit: number; next: number; t: number; wobble: number}> = ({digit, next, t, wobble}) => (
  <>
    {/* header */}
    <div style={{position: 'absolute', left: 546, top: 146, width: 26, height: 26, borderRadius: 13, background: 'radial-gradient(circle at 50% 40%, #e9d3c4 0 28%, #2a1f1c 30% 100%)'}} />
    <div style={{position: 'absolute', left: 556, top: 138, width: 24, height: 24, borderRadius: 12, background: '#3de07a', zIndex: -1}} />
    <div style={{position: 'absolute', left: 591, top: 144, fontSize: 15, color: '#111', fontFamily: FONT, whiteSpace: 'nowrap'}}>
      <b style={{fontWeight: 600}}>antonin.work 和 cavalry.app</b> <span style={{color: '#737373'}}>· 1 周</span>
    </div>
    <div style={{position: 'absolute', left: 972, top: 138, fontSize: 22, letterSpacing: 1, color: '#111', fontFamily: FONT}}>···</div>
    {/* media card */}
    <div style={{position: 'absolute', left: 534, top: 182, width: 468, height: 585, borderRadius: 6, border: '1px solid #dbdbdb', background: '#fff', overflow: 'hidden'}}>
      <svg width={468} height={585} viewBox="0 0 468 585" style={{position: 'absolute', left: 0, top: 0}}>
        <g transform="translate(87 52) scale(3.1)" >
          <Blob from={digit} to={next} t={t} wobble={wobble} />
        </g>
      </svg>
      <div style={{position: 'absolute', left: 429, top: 546, width: 28, height: 28, borderRadius: 14, background: '#4a4a4a'}}>
        <svg width={28} height={28} viewBox="0 0 28 28" fill="none" stroke="#fff" strokeWidth={1.8} strokeLinecap="round"><path d="M8 11h3l4-3v12l-4-3H8z" fill="#fff" /><path d="M18 11l4 6M22 11l-4 6" /></svg>
      </div>
      <div style={{position: 'absolute', left: 432, top: 282, width: 22, height: 22, borderRadius: 11, background: '#fff', boxShadow: '0 0 3px rgba(0,0,0,.25)', fontSize: 14, textAlign: 'center', color: '#bbb', lineHeight: '22px'}}>›</div>
    </div>
    {/* pager dots */}
    {[0, 1, 2, 3].map((i) => (
      <div key={i} style={{position: 'absolute', left: 751 + i * 10.5, top: 780, width: 6, height: 6, borderRadius: 3, background: i === 0 ? '#3b5bdb' : '#a8a8a8'}} />
    ))}
    {/* actions */}
    <div style={{position: 'absolute', left: 546, top: 800, display: 'flex', gap: 14, alignItems: 'center', fontSize: 17, fontWeight: 600, color: '#111', fontFamily: FONT}}>
      <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth={2}><path d="M12 21C5 15 3 12 3 8.5A4.5 4.5 0 0112 6a4.5 4.5 0 019 2.5C21 12 19 15 12 21z" /></svg>
      <span style={{marginLeft: -8}}>2,590</span>
      <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth={2}><path d="M12 3a9 9 0 11-4 17l-5 1 1-5A9 9 0 0112 3z" /></svg>
      <span style={{marginLeft: -8}}>131</span>
      <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth={2} strokeLinecap="round"><path d="M17 3l3 3-3 3M4 11V9a3 3 0 013-3h13M7 21l-3-3 3-3M20 13v2a3 3 0 01-3 3H4" /></svg>
      <span style={{marginLeft: -8}}>38</span>
      <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth={2} strokeLinejoin="round"><path d="M21 3L3 9l7 3 3 8z" /></svg>
    </div>
    <svg style={{position: 'absolute', left: 968, top: 802}} width={24} height={24} viewBox="0 0 24 24"><path d="M5 3h14v18l-7-5-7 5z" fill="#111" /></svg>
    <div style={{position: 'absolute', left: 546, top: 836, display: 'flex', alignItems: 'center', gap: 6, fontSize: 15, fontWeight: 600, color: '#111', fontFamily: FONT}}>
      <div style={{width: 18, height: 18, borderRadius: 9, background: '#3de07a'}} />
      <div style={{width: 18, height: 18, borderRadius: 9, background: '#111', marginLeft: -12, border: '1px solid #fff'}} />
      cavalry.app和其他2589位用户赞了
    </div>
    <div style={{position: 'absolute', left: 546, top: 864, width: 420, fontSize: 15, lineHeight: '18px', whiteSpace: 'normal', color: '#111', fontFamily: FONT}}>
      <b style={{fontWeight: 600}}>antonin.work</b> I'm one of the lucky few with access to the <span style={{color: '#2f3cff'}}>@cavalry.app</span> beta, and among the major new features, the Morph Deformer has... <span style={{color: '#737373'}}>更多</span>
    </div>
    <div style={{position: 'absolute', left: 546, top: 925, fontSize: 13, fontWeight: 600, color: '#111', fontFamily: FONT}}>查看翻译</div>
  </>
);

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
  // slow drift of the colour blobs while a digit is held
  const wobble = Math.sin(frame / 9) * 0.5 + 0.5;
  return (
    <AbsoluteFill style={{background: '#000', whiteSpace: 'nowrap'}}>
      {/* letterboxed browser viewport */}
      <div style={{position: 'absolute', left: 0, top: 116, width: 1920, height: 846, background: '#fff', overflow: 'hidden'}}>
        <div style={{position: 'absolute', left: 0, top: -116}}>
          <Sidebar />
          <Suggestions />
          <Post digit={SEQUENCE[idx]} next={SEQUENCE[nextIdx]} t={idx === nextIdx ? 0 : t} wobble={wobble} />
          {/* floating messages pill */}
          <div style={{position: 'absolute', left: 1638, top: 876, width: 248, height: 54, borderRadius: 27, background: '#fff', boxShadow: '0 2px 14px rgba(0,0,0,.18)'}}>
            <svg style={{position: 'absolute', left: 16, top: 15}} width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth={2} strokeLinejoin="round"><path d="M21 3L3 9l7 3 3 8z" /></svg>
            <div style={{position: 'absolute', left: 48, top: 15, fontSize: 17, fontWeight: 600, color: '#111', fontFamily: FONT}}>消息</div>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{position: 'absolute', left: 163 + i * 22, top: 13, width: 26, height: 26, borderRadius: 13, background: ['#e8e8ee', '#7a6a58', '#e0e0ea'][i], border: '2px solid #fff'}} />
            ))}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
