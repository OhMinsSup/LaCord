import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as baseActions from "../../store/modules/base";
import * as searchActions from "../../store/modules/search";

import SearchBar from "../../components/search/SearchBar";
import SearchTemplate from "../../components/search/SearchTemplate";
import SearchResults from "../../components/search/SearchResults";

class SearchContainer extends Component {
  onSearch = keyword => {
    const { SearchActions, currentKeyword } = this.props;
    if (currentKeyword === keyword) return null;
    if (!keyword) {
      SearchActions.initialize();
      return null;
    }
    SearchActions.initialize();
    return SearchActions.publicSearch({
      query: keyword
    });
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

  componentDidMount() {
    this.loadYoutubeApi();
  }

  render() {
    const { results, totalResults } = this.props;
    return (
      <SearchTemplate searchBar={<SearchBar onSearch={this.onSearch} />}>
        <SearchResults videos={results} count={totalResults} />
      </SearchTemplate>
    );
  }
}

const enhance = connect(
  ({ base, search }) => ({
    results: search.results,
    currentKeyword: search.currentKeyword,
    nextPageToken: search.nextPageToken,
    totalResults: search.totalResults
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    SearchActions: bindActionCreators(searchActions, dispatch)
  })
);

export default enhance(SearchContainer);
