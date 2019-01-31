import React from "react";
import classNames from "classnames/bind";
import styles from "./Video.scss";

import monent from "moment";
import Button from "../Button";

const cx = classNames.bind(styles);

const Video = ({ video, onClick, onConvert }) => {
  if (!video) return null;

  return (
    <div className={cx("video")}>
      {video.snippet.thumbnails.medium.url && (
        <div
          className={cx("thumbnail-wrapper")}
          onClick={() => onClick(video.id)}
        >
          {video.snippet.thumbnails.medium.url && (
            <img src={video.snippet.thumbnails.medium.url} alt="이미지" />
          )}
          <div className={cx("white-mask")} />
        </div>
      )}
      <div className={cx("video-content")}>
        <div className={cx("channel")}>{video.snippet.channelTitle}</div>
        <h3 onClick={() => onClick(video.id)}>
          <span>{video.snippet.title}</span>
        </h3>
        <div className={cx("info")}>
          <span className={cx("time")}>
            {monent(video.snippet.publishedAt).format("LL")}
          </span>
        </div>
        <div className={cx("btn-wrapper")}>
          <Button
            theme="outline"
            className={cx("btn")}
            onClick={() => onConvert(video.id, "mp3", video.snippet.title)}
          >
            MP3 다운
          </Button>
          <Button
            theme="outline"
            className={cx("btn")}
            onClick={() => onConvert(video.id, "mp4", video.snippet.title)}
          >
            MP4 다운
          </Button>
        </div>
      </div>
      <p onClick={() => onClick(video.id)} className={cx("description")}>
        {video.snippet.description}
      </p>
    </div>
  );
};

export default Video;
