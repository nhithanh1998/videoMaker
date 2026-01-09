import {
  AbsoluteFill,
  Img,
  interpolate,
  useCurrentFrame,
  Easing,
} from "remotion";

interface Props {
  src: string;
  durationInFrames: number;
  fadeFrames: number;
  index: number;
}

const rand = (seed: number) => {
  const x = Math.sin(seed * 1337) * 10000;
  return x - Math.floor(x);
};

export const ImageSlide: React.FC<Props> = ({
  src,
  durationInFrames,
  fadeFrames,
  index,
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [0, fadeFrames, durationInFrames - fadeFrames, durationInFrames],
    [0, 1, 1, 0],
    { extrapolate: "clamp" }
  );

  const preset = Math.floor(rand(index) * 5);
  const ease = Easing.linear;

  let scale = 1.1;
  let x = 0;
  let y = 0;

  switch (preset) {
    // 1. Zoom in chậm
    case 0:
      scale = interpolate(frame, [0, durationInFrames], [1.08, 1.18], {
        easing: ease,
      });
      break;

    // 2. Zoom out nhẹ
    case 1:
      scale = interpolate(frame, [0, durationInFrames], [1.18, 1.08], {
        easing: ease,
      });
      break;

    // 3. Pan ngang rất chậm
    case 2:
      scale = 1.15;
      x = interpolate(frame, [0, durationInFrames], [-25, 25]);
      break;

    // 4. Pan dọc nhẹ
    case 3:
      scale = 1.15;
      y = interpolate(frame, [0, durationInFrames], [20, -20]);
      break;

    // 5. Depth drift (điện ảnh)
    case 4:
      scale = interpolate(frame, [0, durationInFrames], [1.12, 1.2]);
      x = interpolate(frame, [0, durationInFrames], [-10, 10]);
      y = interpolate(frame, [0, durationInFrames], [10, -10]);
      break;
  }

  return (
    <AbsoluteFill style={{ opacity }}>
      <Img
        src={src}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `translate(${x}px, ${y}px) scale(${scale})`,
        }}
      />
      {/* overlay tối giúp đọc chữ */}
      <AbsoluteFill style={{ backgroundColor: "rgba(0,0,0,0.35)" }} />
    </AbsoluteFill>
  );
};
