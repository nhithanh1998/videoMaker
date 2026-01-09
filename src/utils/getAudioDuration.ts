import { getAudioData } from "@remotion/media-utils";
import { staticFile } from "remotion";

export interface AudioItem {
  src: string;
  duration: number;
}

export const getAudioDurations = async (
  count: number,
): Promise<AudioItem[]> => {
  const audios: AudioItem[] = [];

  for (let i = 1; i <= count; i++) {
    const filePath = staticFile(`shorts/chuong-${i}.wav`);

    const audioData = await getAudioData(filePath);

    audios.push({
      src: `/shorts/chuong-${i}.wav`,
      duration: audioData.durationInSeconds,
    });
  }

  return audios;
};
