import { createAction, handleActions } from "redux-actions";
import { applyPenders } from "redux-pender";
import produce from "immer";

import * as YoutubeAPI from "../../lib/api/youtube";

const GET_DETAIL_YOUTUBE = "youtube/GET_DETAIL_YOUTUBE";
const SET_VIEWER_ID = "youtube/SET_VIEWER_ID";

export const setViewerId = createAction(SET_VIEWER_ID, id => id);
export const getDetail = createAction(
  GET_DETAIL_YOUTUBE,
  YoutubeAPI.buildVideoDetailRequest
);

const initialState = {
  viewerId: "",
  youtube: null,
  nextPageToken: ""
};

const reducer = handleActions(
  {
    [SET_VIEWER_ID]: (state, action) => ({
      ...state,
      viewerId: action.payload
    })
  },
  initialState
);

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
  }
]);
