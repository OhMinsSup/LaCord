import React, { Component } from "react";
import HeaderContainer from "../../containers/base/HeaderContainer";
import VideoTemplate from "../../components/video/VideoTemplate";
import VideoViewer from "../../components/video/VideoViewer";
import VideoMeta from "../../components/video/VideoMeta";

class VideoConvertViewer extends Component {
  render() {
    return (
      <VideoTemplate header={<HeaderContainer />}>
        <VideoViewer />
        <VideoMeta />
      </VideoTemplate>
    );
  }
}

export default VideoConvertViewer;
