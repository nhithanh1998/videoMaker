import "./index.css";
import { Composition, staticFile } from "remotion";
import { Short } from "./Short";
import { loadFont } from "@remotion/fonts";

loadFont({
  family: "UTM",
  url: staticFile("fonts/utm.ttf"),
});
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="YoutubeShort"
        component={Short}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={30 * 12}
        defaultProps={{
          images: ["/shorts/hinh-1.png", "/shorts/hinh-2.png", "/shorts/hinh-3.png"],
          durations: [4, 4, 4],
          captions: [
            "Bạn có biết?",
            "90% người bỏ lỡ điều này",
            "Sự thật khiến bạn sốc",
          ],
          music: "/music/bg.mp3",
        }}
      />
    </>
  );
};
