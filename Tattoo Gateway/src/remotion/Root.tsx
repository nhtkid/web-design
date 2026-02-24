import { Composition, staticFile } from 'remotion';
import { PromoClip } from './PromoClip';

const fps = 30;
const durationInFrames = 135;
const width = 1080;
const height = 1080;

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="PromoProcess"
        component={PromoClip}
        durationInFrames={durationInFrames}
        fps={fps}
        width={width}
        height={height}
        defaultProps={{
          images: [
            staticFile('Design1.png'),
            staticFile('Design2.png'),
            staticFile('Design3.png'),
          ],
          accentOpacity: 0.2,
          driftDirection: 1 as const,
        }}
      />

      <Composition
        id="PromoCraft"
        component={PromoClip}
        durationInFrames={durationInFrames}
        fps={fps}
        width={width}
        height={height}
        defaultProps={{
          images: [
            staticFile('Artwork1.png'),
            staticFile('Artwork2.png'),
            staticFile('Artwork3.png'),
          ],
          accentOpacity: 0.16,
          driftDirection: -1 as const,
        }}
      />

      <Composition
        id="PromoAftercare"
        component={PromoClip}
        durationInFrames={durationInFrames}
        fps={fps}
        width={width}
        height={height}
        defaultProps={{
          images: [
            staticFile('Alice2.png'),
            staticFile('Alice4.png'),
            staticFile('Alice5.png'),
          ],
          accentOpacity: 0.12,
          driftDirection: 1 as const,
        }}
      />

      <Composition
        id="PromoCommunity"
        component={PromoClip}
        durationInFrames={durationInFrames}
        fps={fps}
        width={width}
        height={height}
        defaultProps={{
          images: [
            staticFile('community_bg_client.jpg'),
            staticFile('process_circle_eye.jpg'),
            staticFile('community_circle_arm.jpg'),
          ],
          accentOpacity: 0.14,
          driftDirection: -1 as const,
        }}
      />
    </>
  );
};
