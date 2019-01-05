import React from "react";
import classNames from "classnames/bind";
import styles from "./ConvertTools.scss";
import ConvertTool from "../ConvertTool/ConvertTool";
import {
  MdTextFormat,
  MdVideoLibrary,
  MdSlowMotionVideo,
  MdInsertDriveFile,
  MdInsertPhoto
} from "react-icons/md";
import { FaYoutube } from "react-icons/fa";

const cx = classNames.bind(styles);

const ConvertTools = () => {
  return (
    <div className={cx("tools-wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("flex")}>
          <ConvertTool
            icon={<MdTextFormat />}
            text="글꼴 변환기"
            description="글꼴을 변환 시킬 수 있습니다."
            boder={true}
            boder2={false}
            to="/convert/font"
          />
          <ConvertTool
            icon={<MdVideoLibrary />}
            text="비디오 컨버터"
            description="비디오를 변환 시킬 수 있습니다"
            boder={true}
            boder2={false}
            to="/convert/video"
          />
          <ConvertTool
            icon={<MdSlowMotionVideo />}
            text="오디오 변환기"
            description="오디오를 변환 시킬 수 있습니다"
            boder={false}
            boder2={false}
            to="/convert/audio"
          />
          <ConvertTool
            icon={<MdInsertDriveFile />}
            text="문서 변환기"
            description="문서를 변환 시킬 수 있습니다"
            boder={true}
            boder2={true}
            to="/convert/doc"
          />
          <ConvertTool
            icon={<MdInsertPhoto />}
            text="이미지 변환기"
            description="이미지를 변환 시킬 수 있습니다"
            boder={true}
            boder2={true}
            to="/convert/image"
          />
          <ConvertTool
            icon={<FaYoutube />}
            text="유튜브 변환기"
            description="유튜브를 변환 시킬 수 있습니다"
            boder={false}
            boder2={true}
            to="/convert/youtube"
          />
        </div>
      </div>
    </div>
  );
};

export default ConvertTools;
