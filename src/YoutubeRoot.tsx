"use client";

import { Composition } from "remotion";
import { Short } from "./Short";
import { getAudioDurations } from "./utils/getAudioDuration";

const FPS = 30;
const AUDIO_COUNT = 8;

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="YoutubeShort"
      component={Short}
      fps={FPS}
      width={1080}
      height={1920}
      durationInFrames={1} // placeholder
      calculateMetadata={async () => {
        const audios = await getAudioDurations(AUDIO_COUNT);

        const totalDurationInFrames = Math.ceil(
          audios.reduce(
            (sum, a) => sum + a.duration + 0.7, // buffer 0.7s
            0,
          ) * FPS,
        );

        return {
          durationInFrames: totalDurationInFrames,
          props: {
            audios,
          },
        };
      }}
    />
  );
};
