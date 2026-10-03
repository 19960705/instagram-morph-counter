import {Composition} from 'remotion';
import {Instagram, DURATION} from './Instagram';

export const Root: React.FC = () => (
  <Composition
    id="Instagram"
    component={Instagram}
    durationInFrames={DURATION}
    fps={30}
    width={1920}
    height={1080}
  />
);
