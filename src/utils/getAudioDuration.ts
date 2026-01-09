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
    const filePath = staticFile(`shorts/${i}.MP3`);

    const audioData = await getAudioData(filePath);

    audios.push({
      src: `/shorts/${i}.MP3`,
      duration: audioData.durationInSeconds,
    });
  }

  return audios;
};
