import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as baseActions from "../../store/modules/base";
import * as searchActions from "../../store/modules/search";
import * as fileActions from "../../store/modules/file";

import SearchBar from "../../components/search/SearchBar";
import SearchTemplate from "../../components/search/SearchTemplate";
import SearchResults from "../../components/search/SearchResults";

const a = [
  {
    kind: "youtube#searchResult",
    etag: '"XpPGQXPnxQJhLgs6enD_n8JR4Qk/RsX1zkYUxFx2dsnI4f7HrfTZH7M"',
    id: {
      kind: "youtube#video",
      videoId: "uIGxFwheG-Q"
    },
    snippet: {
      publishedAt: "2019-01-27T01:02:49.000Z",
      channelId: "UC6xWZn2suKPqAQkidOiMeHg",
      title: "그치만.. 이렇게라도 하지 않으면 딸기단 나에게 관심도 없는 걸!",
      description:
        "181101 ✿ 더보기를 눌러주세요 ✿ ❀ 에렌디라 후원하기 (Donate for Erendira) Twip(Twitch) : https://twip.kr/donate/erenjjing ❀ 유튜브 구독하기 ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/uIGxFwheG-Q/default.jpg",
          width: 120,
          height: 90
        },
        medium: {
          url: "https://i.ytimg.com/vi/uIGxFwheG-Q/mqdefault.jpg",
          width: 320,
          height: 180
        },
        high: {
          url: "https://i.ytimg.com/vi/uIGxFwheG-Q/hqdefault.jpg",
          width: 480,
          height: 360
        }
      },
      channelTitle: "YouTube에렌디라",
      liveBroadcastContent: "none"
    }
  },
  {
    kind: "youtube#searchResult",
    etag: '"XpPGQXPnxQJhLgs6enD_n8JR4Qk/RsX1zkYUxFx2dsnI4f7HrfTZH7M"',
    id: {
      kind: "youtube#video",
      videoId: "uIGxFwheG-Q"
    },
    snippet: {
      publishedAt: "2019-01-27T01:02:49.000Z",
      channelId: "UC6xWZn2suKPqAQkidOiMeHg",
      title: "그치만.. 이렇게라도 하지 않으면 딸기단 나에게 관심도 없는 걸!",
      description:
        "181101 ✿ 더보기를 눌러주세요 ✿ ❀ 에렌디라 후원하기 (Donate for Erendira) Twip(Twitch) : https://twip.kr/donate/erenjjing ❀ 유튜브 구독하기 ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/uIGxFwheG-Q/default.jpg",
          width: 120,
          height: 90
        },
        medium: {
          url: "https://i.ytimg.com/vi/uIGxFwheG-Q/mqdefault.jpg",
          width: 320,
          height: 180
        },
        high: {
          url: "https://i.ytimg.com/vi/uIGxFwheG-Q/hqdefault.jpg",
          width: 480,
          height: 360
        }
      },
      channelTitle: "YouTube에렌디라",
      liveBroadcastContent: "none"
    }
  },
  {
    kind: "youtube#searchResult",
    etag: '"XpPGQXPnxQJhLgs6enD_n8JR4Qk/RsX1zkYUxFx2dsnI4f7HrfTZH7M"',
    id: {
      kind: "youtube#video",
      videoId: "uIGxFwheG-Q"
    },
    snippet: {
      publishedAt: "2019-01-27T01:02:49.000Z",
      channelId: "UC6xWZn2suKPqAQkidOiMeHg",
      title: "그치만.. 이렇게라도 하지 않으면 딸기단 나에게 관심도 없는 걸!",
      description:
        "181101 ✿ 더보기를 눌러주세요 ✿ ❀ 에렌디라 후원하기 (Donate for Erendira) Twip(Twitch) : https://twip.kr/donate/erenjjing ❀ 유튜브 구독하기 ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/uIGxFwheG-Q/default.jpg",
          width: 120,
          height: 90
        },
        medium: {
          url: "https://i.ytimg.com/vi/uIGxFwheG-Q/mqdefault.jpg",
          width: 320,
          height: 180
        },
        high: {
          url: "https://i.ytimg.com/vi/uIGxFwheG-Q/hqdefault.jpg",
          width: 480,
          height: 360
        }
      },
      channelTitle: "YouTube에렌디라",
      liveBroadcastContent: "none"
    }
  },
  {
    kind: "youtube#searchResult",
    etag: '"XpPGQXPnxQJhLgs6enD_n8JR4Qk/RsX1zkYUxFx2dsnI4f7HrfTZH7M"',
    id: {
      kind: "youtube#video",
      videoId: "uIGxFwheG-Q"
    },
    snippet: {
      publishedAt: "2019-01-27T01:02:49.000Z",
      channelId: "UC6xWZn2suKPqAQkidOiMeHg",
      title: "그치만.. 이렇게라도 하지 않으면 딸기단 나에게 관심도 없는 걸!",
      description:
        "181101 ✿ 더보기를 눌러주세요 ✿ ❀ 에렌디라 후원하기 (Donate for Erendira) Twip(Twitch) : https://twip.kr/donate/erenjjing ❀ 유튜브 구독하기 ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/uIGxFwheG-Q/default.jpg",
          width: 120,
          height: 90
        },
        medium: {
          url: "https://i.ytimg.com/vi/uIGxFwheG-Q/mqdefault.jpg",
          width: 320,
          height: 180
        },
        high: {
          url: "https://i.ytimg.com/vi/uIGxFwheG-Q/hqdefault.jpg",
          width: 480,
          height: 360
        }
      },
      channelTitle: "YouTube에렌디라",
      liveBroadcastContent: "none"
    }
  },
  {
    kind: "youtube#searchResult",
    etag: '"XpPGQXPnxQJhLgs6enD_n8JR4Qk/RsX1zkYUxFx2dsnI4f7HrfTZH7M"',
    id: {
      kind: "youtube#video",
      videoId: "uIGxFwheG-Q"
    },
    snippet: {
      publishedAt: "2019-01-27T01:02:49.000Z",
      channelId: "UC6xWZn2suKPqAQkidOiMeHg",
      title: "그치만.. 이렇게라도 하지 않으면 딸기단 나에게 관심도 없는 걸!",
      description:
        "181101 ✿ 더보기를 눌러주세요 ✿ ❀ 에렌디라 후원하기 (Donate for Erendira) Twip(Twitch) : https://twip.kr/donate/erenjjing ❀ 유튜브 구독하기 ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/uIGxFwheG-Q/default.jpg",
          width: 120,
          height: 90
        },
        medium: {
          url: "https://i.ytimg.com/vi/uIGxFwheG-Q/mqdefault.jpg",
          width: 320,
          height: 180
        },
        high: {
          url: "https://i.ytimg.com/vi/uIGxFwheG-Q/hqdefault.jpg",
          width: 480,
          height: 360
        }
      },
      channelTitle: "YouTube에렌디라",
      liveBroadcastContent: "none"
    }
  },
  {
    kind: "youtube#searchResult",
    etag: '"XpPGQXPnxQJhLgs6enD_n8JR4Qk/RsX1zkYUxFx2dsnI4f7HrfTZH7M"',
    id: {
      kind: "youtube#video",
      videoId: "uIGxFwheG-Q"
    },
    snippet: {
      publishedAt: "2019-01-27T01:02:49.000Z",
      channelId: "UC6xWZn2suKPqAQkidOiMeHg",
      title: "그치만.. 이렇게라도 하지 않으면 딸기단 나에게 관심도 없는 걸!",
      description:
        "181101 ✿ 더보기를 눌러주세요 ✿ ❀ 에렌디라 후원하기 (Donate for Erendira) Twip(Twitch) : https://twip.kr/donate/erenjjing ❀ 유튜브 구독하기 ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/uIGxFwheG-Q/default.jpg",
          width: 120,
          height: 90
        },
        medium: {
          url: "https://i.ytimg.com/vi/uIGxFwheG-Q/mqdefault.jpg",
          width: 320,
          height: 180
        },
        high: {
          url: "https://i.ytimg.com/vi/uIGxFwheG-Q/hqdefault.jpg",
          width: 480,
          height: 360
        }
      },
      channelTitle: "YouTube에렌디라",
      liveBroadcastContent: "none"
    }
  },
  {
    kind: "youtube#searchResult",
    etag: '"XpPGQXPnxQJhLgs6enD_n8JR4Qk/RsX1zkYUxFx2dsnI4f7HrfTZH7M"',
    id: {
      kind: "youtube#video",
      videoId: "uIGxFwheG-Q"
    },
    snippet: {
      publishedAt: "2019-01-27T01:02:49.000Z",
      channelId: "UC6xWZn2suKPqAQkidOiMeHg",
      title: "그치만.. 이렇게라도 하지 않으면 딸기단 나에게 관심도 없는 걸!",
      description:
        "181101 ✿ 더보기를 눌러주세요 ✿ ❀ 에렌디라 후원하기 (Donate for Erendira) Twip(Twitch) : https://twip.kr/donate/erenjjing ❀ 유튜브 구독하기 ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/uIGxFwheG-Q/default.jpg",
          width: 120,
          height: 90
        },
        medium: {
          url: "https://i.ytimg.com/vi/uIGxFwheG-Q/mqdefault.jpg",
          width: 320,
          height: 180
        },
        high: {
          url: "https://i.ytimg.com/vi/uIGxFwheG-Q/hqdefault.jpg",
          width: 480,
          height: 360
        }
      },
      channelTitle: "YouTube에렌디라",
      liveBroadcastContent: "none"
    }
  },
  {
    kind: "youtube#searchResult",
    etag: '"XpPGQXPnxQJhLgs6enD_n8JR4Qk/RsX1zkYUxFx2dsnI4f7HrfTZH7M"',
    id: {
      kind: "youtube#video",
      videoId: "uIGxFwheG-Q"
    },
    snippet: {
      publishedAt: "2019-01-27T01:02:49.000Z",
      channelId: "UC6xWZn2suKPqAQkidOiMeHg",
      title: "그치만.. 이렇게라도 하지 않으면 딸기단 나에게 관심도 없는 걸!",
      description:
        "181101 ✿ 더보기를 눌러주세요 ✿ ❀ 에렌디라 후원하기 (Donate for Erendira) Twip(Twitch) : https://twip.kr/donate/erenjjing ❀ 유튜브 구독하기 ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/uIGxFwheG-Q/default.jpg",
          width: 120,
          height: 90
        },
        medium: {
          url: "https://i.ytimg.com/vi/uIGxFwheG-Q/mqdefault.jpg",
          width: 320,
          height: 180
        },
        high: {
          url: "https://i.ytimg.com/vi/uIGxFwheG-Q/hqdefault.jpg",
          width: 480,
          height: 360
        }
      },
      channelTitle: "YouTube에렌디라",
      liveBroadcastContent: "none"
    }
  },
  {
    kind: "youtube#searchResult",
    etag: '"XpPGQXPnxQJhLgs6enD_n8JR4Qk/RsX1zkYUxFx2dsnI4f7HrfTZH7M"',
    id: {
      kind: "youtube#video",
      videoId: "uIGxFwheG-Q"
    },
    snippet: {
      publishedAt: "2019-01-27T01:02:49.000Z",
      channelId: "UC6xWZn2suKPqAQkidOiMeHg",
      title: "그치만.. 이렇게라도 하지 않으면 딸기단 나에게 관심도 없는 걸!",
      description:
        "181101 ✿ 더보기를 눌러주세요 ✿ ❀ 에렌디라 후원하기 (Donate for Erendira) Twip(Twitch) : https://twip.kr/donate/erenjjing ❀ 유튜브 구독하기 ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/uIGxFwheG-Q/default.jpg",
          width: 120,
          height: 90
        },
        medium: {
          url: "https://i.ytimg.com/vi/uIGxFwheG-Q/mqdefault.jpg",
          width: 320,
          height: 180
        },
        high: {
          url: "https://i.ytimg.com/vi/uIGxFwheG-Q/hqdefault.jpg",
          width: 480,
          height: 360
        }
      },
      channelTitle: "YouTube에렌디라",
      liveBroadcastContent: "none"
    }
  }
];

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

  componentDidMount() {
    // this.loadYoutubeApi();
  }

  render() {
    const { results, totalResults } = this.props;
    return (
      <SearchTemplate searchBar={<SearchBar onSearch={this.onSearch} />}>
        <SearchResults
          // videos={results}
          videos={a}
          count={totalResults}
          onSearchNext={this.onSearchNext}
        />
      </SearchTemplate>
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
    FileActions: bindActionCreators(fileActions, dispatch),
    BaseActions: bindActionCreators(baseActions, dispatch),
    SearchActions: bindActionCreators(searchActions, dispatch)
  })
);

export default enhance(SearchContainer);
