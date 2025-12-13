import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const slug = "khong-phai-chu-ban-gai-ao-cua-ta-sao-lai-tu-thanh-kiem-tien-roi";

const DATA_PATH = `public/${slug}/data.json`;
const OUTPUT_DIR = `output/${slug}`;
const TMP_DIR = ".tmp-props";

// Tạo thư mục nếu chưa có
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
if (!fs.existsSync(TMP_DIR)) fs.mkdirSync(TMP_DIR, { recursive: true });

// Đọc data
const data = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));

for (const episode of data.episodes) {
  const audioFileUrl = `../public/${slug}/${episode.audio}`;

  const props = {
    bookTitle: data.title,
    episode: episode.episodeNumber,
    chapterStart: episode.startChapter,
    chapterEnd: episode.endChapter,
    backgroundUrl: `../public/${slug}/bg.jpg`,
    discImgUrl: `../public/${slug}/disc.png`,
    audioOffsetInSeconds: 0,
  };

  // Ghi props ra file JSON tạm
  const propsPath = path.join(TMP_DIR, `ep-${episode.episodeNumber}.json`);
  fs.writeFileSync(propsPath, JSON.stringify(props, null, 2));

  // File video tạm từ Remotion
  const outFile = path.join(
    OUTPUT_DIR,
    `tap-${String(episode.episodeNumber).padStart(3, "0")}.mp4`
  );

  console.log("Rendering video loop:", outFile);

  // Render video loop bằng Remotion
  execSync(
    [
      "npx remotion render src/index.ts Visualizer",
      `"${outFile}"`,
      "--codec=h264",
      "--pixel-format=yuv420p",
      "--image-format=jpeg",
      "--concurrency=16",
      "--audio-bitrate=64k",
      `--props=${propsPath}`,
    ].join(" "),
    { stdio: "inherit" }
  );

  // File MP4 hoàn chỉnh có audio
  const finalOutFile = path.join(
    OUTPUT_DIR,
    `tap-${String(episode.episodeNumber).padStart(3, "0")}-full.mp4`
  );

  console.log("Muxing audio:", finalOutFile);

  // Ghép audio vào video loop
  execSync(
    `ffmpeg -y -i "${outFile}" -i "${audioFileUrl}" -c:v copy -c:a aac -b:a 128k -shortest "${finalOutFile}"`,
    { stdio: "inherit" }
  );
}

console.log("Done! All episodes rendered and muxed with audio.");
