import React from "react";
import classNames from "classnames/bind";
import styles from "./VideoTemplate.scss";

const cx = classNames.bind(styles);

const VideoTemplate = ({ children, header }) => (
  <div className={cx("video-template")}>
    {header && <header>{header}</header>}
    <main>{children}</main>
  </div>
);

export default VideoTemplate;
