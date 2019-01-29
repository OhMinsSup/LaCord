import { createAction, handleActions } from "redux-actions";
import { applyPenders } from "redux-pender";
import produce from "immer";

import * as YoutubeAPI from "../../lib/api/youtube";

const GET_DETAIL_YOUTUBE = "youtube/GET_DETAIL_YOUTUBE";
const GET_RELATED_YOUTUBE = "youtube/GET_RELATED_YOUTUBE";

export const getDetail = createAction(
  GET_DETAIL_YOUTUBE,
  YoutubeAPI.buildVideoDetailRequest
);
export const getRelated = createAction(
  GET_RELATED_YOUTUBE,
  YoutubeAPI.buildRelatedVideosRequest
);

const initialState = {
  youtube: null,
  youtubes: [],
  nextPageToken: ""
};

const reducer = handleActions({}, initialState);

export default applyPenders(reducer, [
  {
    type: GET_DETAIL_YOUTUBE,
    onSuccess: (state, action) => {
      return produce(state, draft => {
        const youtube = action.payload.result.items.map(item => ({
          ...item,
          id: item.id.videoId
        }));
        draft.youtube = youtube[0];
      });
    }
  },
  {
    type: GET_RELATED_YOUTUBE,
    onSuccess: (state, action) => {
      return produce(state, draft => {
        draft.youtubes = action.payload.result.items.map(item => ({
          ...item,
          id: item.id.videoId
        }));
        draft.nextPageToken = action.payload.result.nextPageToken;
      });
    }
  }
]);
