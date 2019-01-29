import React from "react";
import VideoConvertViewer from "../containers/video/VideoConvertViewer";

const Youtube = ({ match }) => <VideoConvertViewer videoId={match.params.id} />;

export default Youtube;
