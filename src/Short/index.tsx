import {
  AbsoluteFill,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ImageSlide } from "./ImageSlide";
import { Caption } from "./Caption";

interface ShortProps {
  images: number;
  captions: string[];
}

export const Short: React.FC<ShortProps> = ({ images, captions }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const imageList = Array.from(
    { length: images },
    (_, i) => `/shorts/hinh-${i + 1}.png`
  );

  const durationPerImage = 4 * fps;
  const overlapFrames = Math.floor(0.7 * fps);
  const step = durationPerImage - overlapFrames;

  // Xác định caption hiện tại
  const currentIndex = Math.min(
    Math.floor(frame / step),
    captions.length - 1
  );

  return (
    <AbsoluteFill>
      {/* Image sequences */}
      {imageList.map((img, i) => (
        <Sequence
          key={i}
          from={i * step}
          durationInFrames={durationPerImage}
        >
          <ImageSlide
            src={staticFile(img)}
            durationInFrames={durationPerImage}
            fadeFrames={overlapFrames}
            index={i}
          />
        </Sequence>
      ))}

      {/* Caption luôn đứng yên */}
      <Caption text={captions[currentIndex] ?? ""} />
    </AbsoluteFill>
  );
};
