import React from "react";
import classNames from "classnames/bind";
import styles from "./Video.scss";

import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const Video = ({ video }) => {
  if (!video) return null;
  const to = `/youtube/convert/${video.id}`;

  return (
    <div className={cx("video")}>
      {video.snippet.thumbnails.medium.url && (
        <Link to={to} className={cx("thumbnail-wrapper")}>
          {video.snippet.thumbnails.medium.url && (
            <img src={video.snippet.thumbnails.medium.url} alt="이미지" />
          )}
          <div className={cx("white-mask")} />
        </Link>
      )}
      <div className={cx("video-content")}>
        <h3>
          <Link to={to}>{video.snippet.title}</Link>
        </h3>
        <p>{video.snippet.description}</p>
      </div>
    </div>
  );
};

export default Video;
