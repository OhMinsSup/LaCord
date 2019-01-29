import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as youtubeActions from "../../store/modules/youtube";

import HeaderContainer from "../../containers/base/HeaderContainer";
import VideoTemplate from "../../components/video/VideoTemplate";
import VideoViewer from "../../components/video/VideoViewer";
import VideoMeta from "../../components/video/VideoMeta";
import RelatedVideos from "../../components/video/RelatedVideos";

class VideoConvertViewer extends Component {
  initialize = async () => {
    const { videoId, YoutubeActions } = this.props;

    try {
      await YoutubeActions.getDetail(videoId);
      await YoutubeActions.getRelated(videoId);
    } catch (e) {
      throw new Error(e);
    }
  };

  componentDidMount() {
    this.initialize();
  }

  render() {
    const { youtube, youtubes, videoId } = this.props;
    if (!youtube) return null;

    return (
      <VideoTemplate header={<HeaderContainer />}>
        <VideoViewer videoId={videoId} />
        <VideoMeta title={youtube.snippet.title} />
        <RelatedVideos videos={youtubes} />
      </VideoTemplate>
    );
  }
}

const enhance = connect(
  ({ youtube }) => ({
    youtube: youtube.youtube,
    youtubes: youtube.youtubes
  }),
  dispatch => ({
    YoutubeActions: bindActionCreators(youtubeActions, dispatch)
  })
);

export default enhance(VideoConvertViewer);
