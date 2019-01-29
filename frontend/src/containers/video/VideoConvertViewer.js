import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as youtubeActions from "../../store/modules/youtube";

import HeaderContainer from "../../containers/base/HeaderContainer";
import VideoTemplate from "../../components/video/VideoTemplate";
import VideoViewer from "../../components/video/VideoViewer";
import VideoMeta from "../../components/video/VideoMeta";
import RelatedVideos from "../../components/video/RelatedVideos";

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
  }
];
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
    //   this.initialize();
  }

  render() {
    //  const { youtube, youtubes, videoId } = this.props;
    //  if (!youtube) return null;

    return (
      <VideoTemplate header={<HeaderContainer />}>
        <VideoViewer videoId="dsdsds" />
        <VideoMeta title="타이틀이다 타이틀" />
        <RelatedVideos videos={a} />
      </VideoTemplate>
    );
    /*
    return (
      <VideoTemplate header={<HeaderContainer />}>
        <VideoViewer videoId={videoId} />
        <VideoMeta title={youtube.snippet.title} />
        <RelatedVideos videos={youtubes} />
      </VideoTemplate>
    );
    */
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
