import React, { Fragment } from "react";
import PageTemplate from "../components/base/PageTemplate";
import HeaderContainer from "../containers/base/HeaderContainer";
import SearchContainer from "../containers/search/SearchContainer";
import VideoViewerContainer from "../containers/video/VideoViewerContainer";

const Search = () => (
  <Fragment>
    <PageTemplate header={<HeaderContainer />}>
      <SearchContainer />
    </PageTemplate>
    <VideoViewerContainer />
  </Fragment>
);

export default Search;
