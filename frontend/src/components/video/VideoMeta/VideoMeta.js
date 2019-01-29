import React from "react";
import classNames from "classnames/bind";
import styles from "./VideoMeta.scss";

import Button from "../../common/Button";

const cx = classNames.bind(styles);

const VideoMeta = ({ title }) => (
  <div className={cx("video-meta")}>
    <div className={cx("video-wrapper")}>
      <div className={cx("left")}>
        <h3>{title}</h3>
      </div>
      <div className={cx("right")}>
        <Button className={cx("btn")}>MP3 변환</Button>
        <Button className={cx("btn")}>MP4 변환</Button>
      </div>
    </div>
  </div>
);

export default VideoMeta;
