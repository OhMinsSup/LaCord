import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as youtubeActions from "../../store/modules/youtube";
import * as baseActions from "../../store/modules/base";

import VideoViewer from "../../components/video/VideoViewer";

class VideoViewerContainer extends Component {
  onOutSideClick = () => {
    const { BaseActions, YoutubeActions } = this.props;
    BaseActions.setVideoViewer(false);
    YoutubeActions.setViewerId("");
  };

  render() {
    if (!this.props.viewer || !this.props.viewerId) return null;

    return (
      <VideoViewer
        onOutSideClick={this.onOutSideClick}
        videoId={this.props.viewerId}
      />
    );
  }
}

const enhance = connect(
  ({ base, youtube }) => ({
    youtube: youtube.youtube,
    viewerId: youtube.viewerId,
    viewer: base.viewer
  }),
  dispatch => ({
    YoutubeActions: bindActionCreators(youtubeActions, dispatch),
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
);

export default enhance(VideoViewerContainer);
