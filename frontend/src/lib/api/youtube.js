import { buildApiRequest } from "../common";

export const buildSearchRequest = (query, nextPageToken, amount = 12) => {
  return buildApiRequest("GET", "/youtube/v3/search", {
    part: "id,snippet",
    q: query,
    type: "video",
    pageToken: nextPageToken,
    maxResults: amount
  });
};

export const buildVideoDetailRequest = videoId => {
  return buildApiRequest("GET", "/youtube/v3/videos", {
    part: "snippet,statistics,contentDetails",
    id: videoId,
    fields:
      "kind,items(contentDetails/duration,id,snippet(channelId,channelTitle,description,publishedAt,thumbnails/medium,title),statistics)"
  });
};

export const buildRelatedVideosRequest = (
  videoId,
  amountRelatedVideos = 12
) => {
  return buildApiRequest("GET", "/youtube/v3/search", {
    part: "snippet",
    type: "video",
    maxResults: amountRelatedVideos,
    relatedToVideoId: videoId
  });
};
