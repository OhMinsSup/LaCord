import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "./VideoViewer.scss";

const cx = classNames.bind(styles);

class VideoViewer extends Component {
  render() {
    const { onOutSideClick } = this.props;

    const baseUrl = "https://www.youtube.com/embed/";
    const embedUrl = `${baseUrl}${this.props.videoId}`;

    return (
      <div className={cx("video-viewer")} onClick={onOutSideClick}>
        <div className={cx("player-wrapper")}>
          <iframe
            src={embedUrl}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="video"
          />
        </div>
      </div>
    );
  }
}

export default VideoViewer;
