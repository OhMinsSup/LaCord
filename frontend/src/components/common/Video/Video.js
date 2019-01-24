import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "./Video.scss";

import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

class Video extends Component {
  render() {
    const { video } = this.props;
    if (!video) return null;

    return (
      <div className={cx("video")}>
        {video.snippet.thumbnails.medium.url && (
          <Link to="/" className={cx("thumbnail-wrapper")}>
            {video.snippet.thumbnails.medium.url && (
              <img src={video.snippet.thumbnails.medium.url} alt="이미지" />
            )}
            <div className={cx("overlays")}>5:52</div>
            <div className={cx("white-mask")} />
          </Link>
        )}
        <div className={cx("video-content")}>
          <h3>
            <Link to="/">{video.snippet.title}</Link>
          </h3>
          <p>{video.snippet.description}</p>
        </div>
      </div>
    );
  }
}

export default Video;
