import React from "react";
import classNames from "classnames/bind";
import styles from "./VideoPreview.scss";

import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const VideoPreview = ({ video }) => {
  if (!video) return null;

  return (
    <Link to="/">
      <div className={cx("video-preview", "horizontal", "expanded")}>
        <div className={cx("image-wrapper")}>
          <img src={video.snippet.thumbnails.medium.url} alt="이미지" />
        </div>
        <div className={cx("video-info")}>
          <div className={cx("semi-bold", "expanded")}>
            {video.snippet.title}
          </div>
          <div className={cx("preview-metadata")}>
            <div className={cx("channel-title")}>
              {video.snippet.channelTitle}
            </div>
            <div className={cx("show-max-two-lines")}>
              {video.snippet.description}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoPreview;
