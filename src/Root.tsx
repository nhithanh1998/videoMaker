import "./index.css";
import { Composition, staticFile } from "remotion";
import { Visualizer } from "./Visualizer/Main";
import { visualizerCompositionSchema } from "./helpers/schema";
import { parseMedia } from "@remotion/media-parser";
import { loadFont } from "@remotion/fonts";

const FPS = 8;
loadFont({
  family: "UTM",
  url: staticFile("fonts/utm.ttf"),
});
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Visualizer"
        component={Visualizer}
        width={1280}
        height={720}
        fps={FPS}
        schema={visualizerCompositionSchema}
        defaultProps={{
          bookTitle:
            "Không Phải Chứ Bạn Gái Ảo Của Ta Sao Lại Tu Thành Kiếm Tiên Rồi?",
          episode: 1,
          chapterStart: 1,
          chapterEnd: 10,
          backgroundUrl: staticFile("sample-bg.jpg"),
          discImgUrl: staticFile("sample-disc.png"),
          audioFileUrl: staticFile("sample-episode.mp3"),
          audioOffsetInSeconds: 0,
        }}
        calculateMetadata={async ({ props }) => {
          const { slowDurationInSeconds } = await parseMedia({
            src: props.audioFileUrl,
            fields: {
              slowDurationInSeconds: true,
            },
            acknowledgeRemotionLicense: true,
          });

          return {
            durationInFrames: Math.floor(
              (slowDurationInSeconds - props.audioOffsetInSeconds) * FPS,
            ),
          };
        }}
      />
    </>
  );
};
