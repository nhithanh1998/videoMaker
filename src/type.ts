interface Episode {
  startChapter: number;
  endChapter: number;
  audio: string;
  episodeNumber: number;
}

export interface Data {
  title: string;
  episodes: Episode[];
}
