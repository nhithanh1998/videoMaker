import "./index.css";
import { Composition } from "remotion";
import { Short } from "./Short";

export const RemotionRoot: React.FC = () => {
  const captions = [
    "Trong thế giới tu tiên tàn khốc,",
    "phàm nhân… chỉ là cỏ dại dưới chân tiên môn.",
    "Lý Trường An không linh căn thượng đẳng,",
    "không gia tộc chống lưng, cũng không được tông môn thu nhận.",
    "Hắn lưu lạc phường thị, trở thành tán tu hèn mọn.",
    "Trường sinh? Với hắn, từng là giấc mộng buồn cười.",
    "Cho đến một ngày — hệ thống thức tỉnh.",
    "【 mỗi ngày hỏi một quẻ 】",
    "Biết trước cát – hung… chính là nghịch thiên cải mệnh.",
    "Một phàm nhân. Một quẻ mỗi ngày. Hắn chọn sống đủ lâu.",
  ];
  return (
    <>
      <Composition
        id="YoutubeShort"
        component={Short}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={30 * 40} // Số giây toàn video phải tính!!!! fps * số giây
        defaultProps={{
          images: 10,
          durations: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
          captions,
          // music: "/music/bg.mp3",
        }}
      />
    </>
  );
};
