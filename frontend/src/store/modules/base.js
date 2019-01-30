import { createAction, handleActions } from "redux-actions";

const HIDE_USER_MODAL = "base/HIDE_USER_MODAL";
const SHOW_USER_MODAL = "base/SHOW_USER_MODAL";
const HIDE_URL_MODAL = "base/HIDE_URL_MODAL";
const SHOW_URL_MODAL = "base/SHOW_URL_MODAL";
const YOUTUBE_LIBRARY_LOADED = "base/YOUTUBE_LIBRARY_LOADED";
const SET_VIDEO_VIEWER = "base/SET_VIDEO_VIEWER";

export const hideUserModal = createAction(HIDE_USER_MODAL);
export const showUserModal = createAction(SHOW_USER_MODAL);
export const hideUrlModal = createAction(HIDE_URL_MODAL);
export const showUrlModal = createAction(SHOW_URL_MODAL);
export const youtubeLibraryLoad = createAction(YOUTUBE_LIBRARY_LOADED);
export const setVideoViewer = createAction(
  SET_VIDEO_VIEWER,
  visible => visible
);

const initialState = {
  user_modal: false,
  url_modal: false,
  youtube_library_load: false,
  viewer: false
};

export default handleActions(
  {
    [HIDE_USER_MODAL]: (state, action) => ({
      ...state,
      user_modal: false
    }),
    [SHOW_USER_MODAL]: (state, action) => ({
      ...state,
      user_modal: true
    }),
    [HIDE_URL_MODAL]: (state, action) => ({
      ...state,
      url_modal: false
    }),
    [SHOW_URL_MODAL]: (state, action) => ({
      ...state,
      url_modal: true
    }),
    [YOUTUBE_LIBRARY_LOADED]: (state, action) => ({
      ...state,
      youtube_library_load: true
    }),
    [SET_VIDEO_VIEWER]: (state, action) => ({
      ...state,
      viewer: action.payload
    })
  },
  initialState
);
