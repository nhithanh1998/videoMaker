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

  /* =============================
     FADE IN / OUT (crossfade safe)
  ============================== */
  const opacity = interpolate(
    frame,
    [0, fadeFrames, durationInFrames - fadeFrames, durationInFrames],
    [0, 1, 1, 0],
    {
      extrapolate: "clamp",
      easing: Easing.easeInOut,
    }
  );

  /* =============================
     MOTION PROGRESS (cinematic)
  ============================== */
  const ease = Easing.bezier(0.4, 0, 0.2, 1);
  const progress = interpolate(
    frame,
    [0, durationInFrames],
    [0, 1],
    { easing: ease }
  );

  const preset = Math.floor(rand(index) * 5);

  let scale = 1.1;
  let x = 0;
  let y = 0;

  switch (preset) {
    // Zoom in chậm
    case 0:
      scale = interpolate(progress, [0, 1], [1.08, 1.16]);
      break;

    // Zoom out nhẹ
    case 1:
      scale = interpolate(progress, [0, 1], [1.16, 1.08]);
      break;

    // Pan ngang
    case 2:
      scale = 1.14;
      x = interpolate(progress, [0, 1], [-24, 24]);
      break;

    // Pan dọc
    case 3:
      scale = 1.14;
      y = interpolate(progress, [0, 1], [18, -18]);
      break;

    // Depth drift điện ảnh
    case 4:
      scale = interpolate(progress, [0, 1], [1.12, 1.18]);
      x = interpolate(progress, [0, 1], [-10, 10]);
      y = interpolate(progress, [0, 1], [10, -10]);
      break;
  }

  return (
    <AbsoluteFill
      style={{
        opacity,
        backgroundColor: "black", // tránh flash trắng
      }}
    >
      <Img
        src={src}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          willChange: "transform, opacity",
          transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
        }}
      />
    </AbsoluteFill>
  );
};
