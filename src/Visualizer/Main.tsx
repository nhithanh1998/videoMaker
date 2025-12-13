import { useMemo } from "react";

import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const Visualizer = ({
  bookTitle,
  episode,
  chapterStart,
  chapterEnd,
  backgroundUrl,
  discImgUrl,
}: {
  bookTitle: string;
  episode: number;
  chapterStart: number;
  chapterEnd: number;
  backgroundUrl: string;
  discImgUrl: string;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rotate = useMemo(() => {
    const t = frame / fps;

    const baseSpeed = 0.05;
    const baseRotate = t * baseSpeed * 360;

    // micro oscillation để che stepping
    const smooth = Math.sin(t * Math.PI * 2 * 0.25) * 0.15;

    return baseRotate + smooth;
  }, [frame, fps]);

  return (
    <AbsoluteFill>
      {/* Background */}
      <Img
        src={backgroundUrl}
        className="w-full h-full object-cover absolute"
      />

      <Img
        src={staticFile("support.png")}
        className="h-[300px] object-cover absolute z-10 -bottom-24 right-30"
      />

      <Img
        src={staticFile("atm.jpg")}
        className="h-[200px] object-cover absolute z-10 bottom-0 right-0"
      />

      {/* Overlay dark */}
      <div className="absolute inset-0 bg-black/50" />

      <div
        className="abosolute flex flex-col items-center justify-center ml-2 h-full z-50 w-xl text-white text-4xl text-center"
        style={{ fontFamily: "UTM" }}
      >
        <p className="leading-relaxed">{bookTitle}</p>
        <Img src={staticFile("divider.png")} className="w-96" />
        <p className="text-5xl mb-4">Tập</p>
        <p className="font-bold text-[150px]">{episode}</p>
        <p className="text-4xl mb-6">
          Chương {chapterStart}{" "}
          <span className="text-4xl" style={{ fontFamily: "sans" }}>
            -
          </span>{" "}
          {chapterEnd}
        </p>
      </div>

      <Img
        src={staticFile("stick.png")}
        className="w-[400px] absolute z-20 -right-[250px] -top-[300px]"
      />
      {/* Disc quay */}
      <div
        className="absolute right-0 w-[55%] flex items-center justify-center"
        style={{
          transform: `rotate(${rotate}deg)`,
          willChange: "transform",
        }}
      >
        <Img src={discImgUrl} className="w-full h-auto object-contain" />
      </div>
    </AbsoluteFill>
  );
};
