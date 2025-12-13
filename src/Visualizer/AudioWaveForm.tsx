import { useAudioData, visualizeAudio } from "@remotion/media-utils";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { useRef } from "react";
import { processFrequencyData } from "../helpers/process-frequency-data";

const spectrumContainer: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  height: "8rem",
  alignItems: "end",
  justifyContent: "center",
  gap: "5px",
  overflow: "hidden",
  width: "20rem",
};

export const AudioWaveform: React.FC<{
  readonly barColor: string;
  readonly numberOfSamples: number;
  readonly waveLinesToDisplay: number;
  readonly mirrorWave: boolean;
  readonly audioSrc: string;
}> = ({
  barColor,
  numberOfSamples,
  waveLinesToDisplay,
  mirrorWave,
  audioSrc,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const audioData = useAudioData(audioSrc);

  // 🔥 LƯU GIÁ TRỊ FRAME TRƯỚC
  const prevBarsRef = useRef<number[] | null>(null);

  if (!audioData) {
    return <div style={spectrumContainer} />;
  }

  const frequencyData = visualizeAudio({
    fps,
    frame,
    audioData,
    numberOfSamples,
    optimizeFor: "speed",
  });

  const normalizedData = processFrequencyData(
    frequencyData,
    waveLinesToDisplay,
    prevBarsRef.current, // 👈 truyền bars frame trước
  );

  // 👇 cập nhật lại cho frame sau
  prevBarsRef.current = normalizedData;

  const frequenciesToDisplay = mirrorWave
    ? [...normalizedData.slice(1).reverse(), ...normalizedData]
    : normalizedData;

  return (
    <div style={spectrumContainer}>
      {frequenciesToDisplay.map((v, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            backgroundColor: barColor,
            height: `${Math.min(100, 80 * v)}%`,
            borderRadius: "6px",
            margin: "0 0.3%",
            minWidth: "1px",
            transition: "height 0.12s linear", // 🎯 thêm tí easing
          }}
        />
      ))}
    </div>
  );
};
