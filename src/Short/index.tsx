import {
  AbsoluteFill,
  Sequence,
  staticFile,
  useVideoConfig,
} from "remotion";
import { ImageSlide } from "./ImageSlide";
import { Caption } from "./Caption";
import { TransitionFlash } from "./TransitionFlash";

interface ShortProps {
  images: string[];
  durations: number[];
  captions: string[];
}

export const Short: React.FC<ShortProps> = ({
  images,
  durations,
  captions,
}) => {
  const { fps } = useVideoConfig();
  let from = 0;

  return (
    <AbsoluteFill>
      {images.map((img, i) => {
        const durationInFrames = durations[i] * fps;

        const seq = (
          <Sequence
            key={i}
            from={from}
            durationInFrames={durationInFrames}
          >
            <ImageSlide
              src={staticFile(img)}
              durationInFrames={durationInFrames}
              index={i}
            />
            <Caption text={captions[i]} />
          </Sequence>
        );

        from += durationInFrames;
        return seq;
      })}

      {/* Flash transition */}
      <Sequence from={from - 6} durationInFrames={6}>
        <TransitionFlash />
      </Sequence>
    </AbsoluteFill>
  );
};
