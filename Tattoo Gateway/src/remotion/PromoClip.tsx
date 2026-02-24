import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

type PromoClipProps = {
  images: string[];
  accentOpacity?: number;
  driftDirection?: 1 | -1;
};

export const PromoClip = ({ images, accentOpacity = 0.18, driftDirection = 1 }: PromoClipProps) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const imageCount = Math.max(images.length, 1);
  const segment = Math.floor(durationInFrames / imageCount);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0B0D10',
        overflow: 'hidden',
      }}
    >
      {images.map((image, index) => {
        const start = index * segment;
        const localFrame = frame - start;
        const reveal = spring({
          frame: localFrame,
          fps,
          config: { damping: 200, stiffness: 160 },
        });

        const fadeOut = interpolate(
          localFrame,
          [segment - 16, segment],
          [1, 0],
          {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }
        );

        const visible = frame >= start && frame < start + segment;
        if (!visible) return null;

        const moveX = interpolate(
          localFrame,
          [0, segment],
          [driftDirection * -3, driftDirection * 3],
          {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }
        );

        const moveY = interpolate(localFrame, [0, segment], [-2, 2], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        const scale = interpolate(localFrame, [0, segment], [1.04, 1.16], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        return (
          <AbsoluteFill
            key={image}
            style={{
              opacity: Math.min(reveal, fadeOut),
              transform: `translate(${moveX}%, ${moveY}%) scale(${scale})`,
              transformOrigin: 'center',
            }}
          >
            <Img
              src={image}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </AbsoluteFill>
        );
      })}

      <AbsoluteFill
        style={{
          background:
            `radial-gradient(circle at 50% 40%, rgba(212, 162, 74, ${accentOpacity}), rgba(11, 13, 16, 0.68) 62%, rgba(11, 13, 16, 0.92) 100%)`,
        }}
      />

      <AbsoluteFill
        style={{
          background: 'linear-gradient(180deg, rgba(11,13,16,0.2) 0%, rgba(11,13,16,0.48) 100%)',
        }}
      />
    </AbsoluteFill>
  );
};
