import {
  AbsoluteFill,
  Sequence,
  staticFile,
  useVideoConfig,
  Audio,
} from "remotion";
import { ImageSlide } from "./ImageSlide";
import { AudioItem } from "../utils/getAudioDuration";

interface ShortProps {
  audios: AudioItem[];
}

export const Short: React.FC<ShortProps> = ({ audios }) => {
  const { fps } = useVideoConfig();

  const imageList = audios.map(
    (_, i) => `/shorts/hinh-${i + 1}.png`,
  );

  // duration = audio + buffer 0.5–1s
  const durationsInFrames = audios.map((a) =>
    Math.floor((a.duration + 0.7) * fps),
  );

  const overlapFrames = Math.floor(0.7 * fps);

  const starts: number[] = [];
  durationsInFrames.reduce((acc, cur, i) => {
    starts[i] = acc;
    return acc + cur - overlapFrames;
  }, 0);

  return (
    <AbsoluteFill>
      {imageList.map((img, i) => (
        <Sequence
          key={i}
          from={starts[i]}
          durationInFrames={durationsInFrames[i]}
        >
          <ImageSlide
            src={staticFile(img)}
            durationInFrames={durationsInFrames[i]}
            fadeFrames={overlapFrames}
            index={i}
          />

          <Audio src={staticFile(audios[i].src)} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
