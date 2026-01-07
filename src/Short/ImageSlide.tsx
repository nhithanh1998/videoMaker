import {
  AbsoluteFill,
  Img,
  interpolate,
  useCurrentFrame,
} from "remotion";

interface Props {
  src: string;
  durationInFrames: number;
  index: number;
}

export const ImageSlide: React.FC<Props> = ({
  src,
  durationInFrames,
  index,
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [0, 10, durationInFrames - 10, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp" }
  );

  const scale = interpolate(frame, [0, durationInFrames], [1, 1.12]);

  const translateY = interpolate(
    frame,
    [0, durationInFrames],
    index % 2 === 0 ? [0, -40] : [0, 40]
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
      <AbsoluteFill style={{ backgroundColor: "rgba(0,0,0,0.35)" }} />
    </AbsoluteFill>
  );
};
