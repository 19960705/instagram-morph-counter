import {Composition} from 'remotion';
import {Instagram, DURATION, WIDTH, HEIGHT} from './Instagram';

export const Root: React.FC = () => (
  <Composition
    id="Instagram"
    component={Instagram}
    durationInFrames={DURATION}
    fps={30}
    width={WIDTH}
    height={HEIGHT}
  />
);
