import React, { Component, Fragment } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as baseActions from "../../store/modules/base";
import * as searchActions from "../../store/modules/search";
import * as fileActions from "../../store/modules/file";
import * as youtubeActions from "../../store/modules/youtube";

import SearchBar from "../../components/search/SearchBar";
import SearchTemplate from "../../components/search/SearchTemplate";
import SearchResults from "../../components/search/SearchResults";
import GoBackButton from "../../components/search/GoBackButton/GoBackButton";

class SearchContainer extends Component {
  onSearch = keyword => {
    const { SearchActions, currentKeyword } = this.props;
    if (currentKeyword === keyword) return null;
    if (!keyword) {
      SearchActions.initialize();
      return null;
    }
    SearchActions.initialize();
    return SearchActions.publicSearch(keyword);
  };

  onSearchNext = () => {
    const {
      currentKeyword,
      nextPageToken,
      pending,
      SearchActions
    } = this.props;
    if (pending) return;

    SearchActions.nextPublicSearch(currentKeyword, nextPageToken, 25);
  };

  loadYoutubeApi() {
    const { BaseActions } = this.props;
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/client.js";

    script.onload = () => {
      window.gapi.load("client", () => {
        window.gapi.client.setApiKey("AIzaSyDdoZtg1qfZDECpxDC_C7c6ht-xCgMaFyQ");
        window.gapi.client.load("youtube", "v3", () => {
          BaseActions.youtubeLibraryLoad();
        });
      });
    };

    document.body.appendChild(script);
  }

  onClick = id => {
    const { BaseActions, YoutubeActions } = this.props;
    BaseActions.setVideoViewer(true);
    YoutubeActions.setViewerId(id);
  };

  componentDidMount() {
    this.loadYoutubeApi();
  }

  render() {
    const { results, totalResults } = this.props;
    return (
      <Fragment>
        <SearchTemplate searchBar={<SearchBar onSearch={this.onSearch} />}>
          <GoBackButton result={results} />
          <SearchResults
            videos={results}
            count={totalResults}
            onClick={this.onClick}
            onSearchNext={this.onSearchNext}
          />
        </SearchTemplate>
      </Fragment>
    );
  }
}

const enhance = connect(
  ({ base, search, pender }) => ({
    results: search.results,
    currentKeyword: search.currentKeyword,
    nextPageToken: search.nextPageToken,
    totalResults: search.totalResults,
    pending:
      pender.pending["search/NEXT_PUBLIC_SEARCH"] ||
      pender.pending["search/PUBLIC_SEARCH"]
  }),
  dispatch => ({
    YoutubeActions: bindActionCreators(youtubeActions, dispatch),
    FileActions: bindActionCreators(fileActions, dispatch),
    BaseActions: bindActionCreators(baseActions, dispatch),
    SearchActions: bindActionCreators(searchActions, dispatch)
  })
);

export default enhance(SearchContainer);
