import React from "react";
import classNames from "classnames/bind";
import styles from "./VideoMeta.scss";
import ConvertInfo from "../ConvertInfo";

const cx = classNames.bind(styles);

const NavItem = ({ text }) => (
  <li className={cx("nav-item")}>
    <span>
      <div className={cx("text")}>{text}</div>
    </span>
  </li>
);

const VideoMeta = ({ video }) => {
  // if (!video) return null;
  return (
    <div className={cx("video-meta")}>
      <div className={cx("video-wrapper")}>
        <h3>타이틀 입니다. 잘부탁해용</h3>
        <div className={cx("video-stats")}>
          <div className={cx("subinfo-nav")}>
            <ul className={cx("nav-wrapper")}>
              <NavItem text="유형" />
              <NavItem text="해상도" />
              <NavItem text="용량" />
              <NavItem text="다운로드" />
            </ul>
          </div>
          <ConvertInfo type="Audio/m4a" resolution="128kbit/s" size="162.6MB" />
          <ConvertInfo type="Video/mp4" resolution="360p" size="453.06MB" />
        </div>
      </div>
    </div>
  );
};

export default VideoMeta;
