import React from "react";
import classNames from "classnames/bind";
import styles from "./RelatedVideos.scss";
import VideoPreview from "../VideoPreview";

const cx = classNames.bind(styles);

const RelatedVideos = ({ videos }) => {
  if (!videos) return null;

  const relates = videos.map((video, index) => {
    return <VideoPreview key={index} video={video} />;
  });

  return <div className={cx("related-videos")}>{relates}</div>;
};

export default RelatedVideos;
