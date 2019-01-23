import { createAction, handleActions } from "redux-actions";
import { applyPenders } from "redux-pender";
import produce from "immer";

import * as YoutubeAPI from "../../lib/api/youtube";

const PUBLIC_SEARCH = "search/PUBLIC_SEARCH";
const NEXT_PUBLIC_SEARCH = "search/NEXT_PUBLIC_SEARCH";
const INITIALIZE = "search/INITIALIZE";

export const publicSearch = createAction(
  PUBLIC_SEARCH,
  YoutubeAPI.buildSearchRequest,
  meta => meta
);
export const nextPublicSearch = createAction(
  NEXT_PUBLIC_SEARCH,
  YoutubeAPI.buildSearchRequest,
  meta => meta
);
export const initialize = createAction(INITIALIZE);

const initialState = {
  totalResults: 0,
  nextPageToken: "",
  currentKeyword: "",
  results: null
};

const reducer = handleActions(
  {
    [INITIALIZE]: () => initialState
  },
  initialState
);

export default applyPenders(reducer, [
  {
    type: PUBLIC_SEARCH,
    onPending: (state, action) => {
      const { meta } = action;
      return produce(state, draft => {
        draft.currentKeyword = meta.query;
      });
    },
    onSuccess: (state, action) => {
      return {
        ...state,
        results: action.payload.result.items.map(item => ({
          ...item,
          id: item.id.videoId
        })),
        totalResults: action.payload.result.pageInfo.totalResults,
        nextPageToken: action.payload.result.nextPageToken
      };
    },
    type: NEXT_PUBLIC_SEARCH,
    onPending: (state, action) => {},
    onSuccess: (state, action) => {}
  }
]);
