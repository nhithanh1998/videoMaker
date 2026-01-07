import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";

export const Caption = ({ text }: { text: string }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 10], [0, 1]);
  const translateY = interpolate(frame, [0, 10], [30, 0]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: "0 80px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          color: "white",
          fontSize: 72,
          fontWeight: 800,
          lineHeight: 1.2,
          opacity,
          transform: `translateY(${translateY}px)`,
          textShadow: "0 8px 40px rgba(0,0,0,0.6)",
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};
