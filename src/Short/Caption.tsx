import { AbsoluteFill } from "remotion";

export const Caption: React.FC<{ text: string }> = ({ text }) => {
  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 120,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          maxWidth: "90%",
          padding: "16px 24px",
          fontSize: 42,
          fontWeight: 700,
          color: "white",
          textAlign: "center",
          lineHeight: 1.3,
          background: "rgba(0,0,0,0.55)",
          borderRadius: 16,
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};
