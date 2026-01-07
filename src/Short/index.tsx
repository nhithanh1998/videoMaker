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
  images: number;       // số lượng hình, ví dụ 10
  captions: string[];   // array 10 caption
}

export const Short: React.FC<ShortProps> = ({ images, captions }) => {
  const { fps } = useVideoConfig();

  // Tạo array đường dẫn hình
  const imageList = Array.from(
    { length: images },
    (_, i) => `/shorts/hinh-${i + 1}.png`
  );

  // Mỗi hình 4 giây
  const durationPerImage = 4 * fps;

  return (
    <AbsoluteFill>
      {imageList.map((img, i) => {
        const from = i * durationPerImage; // tính vị trí xuất hiện

        return (
          <Sequence
            key={i}
            from={from}
            durationInFrames={durationPerImage}
          >
            <ImageSlide
              src={staticFile(img)}
              durationInFrames={durationPerImage}
              index={i}
            />
            <Caption text={captions[i] ?? ""} />
          </Sequence>
        );
      })}

      {/* Flash transition cuối */}
      <Sequence from={images * durationPerImage - 6} durationInFrames={6}>
        <TransitionFlash />
      </Sequence>
    </AbsoluteFill>
  );
};
