import React from "react";
import classNames from "classnames/bind";
import styles from "./VideoViewer.scss";

const cx = classNames.bind(styles);

const BASE_EMBED_URL = "https://www.youtube.com/embed/";

const VideoViewer = ({ videoId }) => {
  const embedUrl = `${BASE_EMBED_URL}${videoId}`;
  return (
    <div className={cx("video-viewer")}>
      <div className={cx("video-wrapper")}>
        <div className={cx("video")}>
          <iframe
            className={cx("video-player")}
            src={embedUrl}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="video"
          />
        </div>
      </div>
    </div>
  );
};

export default VideoViewer;
