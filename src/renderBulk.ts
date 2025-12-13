import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const slug = "khong-phai-chu-ban-gai-ao-cua-ta-sao-lai-tu-thanh-kiem-tien-roi";

const DATA_PATH = `public/${slug}/data.json`;
const OUTPUT_DIR = `output/${slug}`;
const TMP_DIR = ".tmp-props";

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR);
if (!fs.existsSync(TMP_DIR)) fs.mkdirSync(TMP_DIR);

const data = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));

for (const episode of data.episodes) {
  const props = {
    bookTitle: data.title,
    episode: episode.episodeNumber,
    chapterStart: episode.startChapter,
    chapterEnd: episode.endChapter,

    audioFileUrl: `../public/${slug}/${episode.audio}`,
    backgroundUrl: `../public/${slug}/bg.png`,
    discImgUrl: `../public/${slug}/disc.png`,

    audioOffsetInSeconds: 1,
  };

  // 👉 ghi props ra file JSON
  const propsPath = path.join(TMP_DIR, `ep-${episode.episodeNumber}.json`);

  fs.writeFileSync(propsPath, JSON.stringify(props, null, 2));

  const outFile = path.join(
    OUTPUT_DIR,
    `tap-${String(episode.episodeNumber).padStart(3, "0")}.mp4`,
  );

  console.log("Rendering:", outFile);

  execSync(
    [
      "npx remotion render src/index.ts Visualizer",
      `"${outFile}"`,
      "--codec=h264", // ⬅️ ĐỔI Ở ĐÂY
      "--pixel-format=yuv420p",
      "--image-format=jpeg",
      "--jpeg-quality=80",
      "--audio-bitrate=64k",
      `--props=${propsPath}`,
    ].join(" "),
    { stdio: "inherit" },
  );
}
