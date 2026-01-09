import { AbsoluteFill, Img, interpolate, useCurrentFrame } from "remotion";

interface Props {
  src: string;
  durationInFrames: number;
  fadeFrames: number;
  index: number;
}

export const ImageSlide: React.FC<Props> = ({
  src,
  durationInFrames,
  fadeFrames,
  index,
}) => {
  const frame = useCurrentFrame();

  // Fade in đầu – fade out cuối
  const opacity = interpolate(
    frame,
    [0, fadeFrames, durationInFrames - fadeFrames, durationInFrames],
    [0, 1, 1, 0],
    { extrapolate: "clamp" },
  );

  // Ken Burns nhẹ
  const scale = interpolate(frame, [0, durationInFrames], [1.05, 1.15]);

  const translateY = interpolate(
    frame,
    [0, durationInFrames],
    index % 2 === 0 ? [20, -20] : [-20, 20],
  );

  return (
    <AbsoluteFill style={{ opacity }}>
      <Img
        src={src}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale}) translateY(${translateY}px)`,
        }}
      />
      {/* overlay nhẹ cho chữ */}
      <AbsoluteFill style={{ backgroundColor: "rgba(0,0,0,0.35)" }} />
    </AbsoluteFill>
  );
};
