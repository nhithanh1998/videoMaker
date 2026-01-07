import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const TransitionFlash = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 3, 6], [0, 1, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "white",
        opacity,
      }}
    />
  );
};
