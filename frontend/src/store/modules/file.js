import { createAction, handleActions } from "redux-actions";
import { applyPenders } from "redux-pender";

import * as fileAPI from "../../lib/api/file";

const SET_FILE = "file/SET_FILE";
const SET_MODAL = "file/SET_MODAL";
const CONVERT_IMAGE = "file/CONVERT_IMAGE";
const CONVERT_YOUTUBE = "file/CONVERT_YOUTUBE";
const CONVERT_URL = "file/CONVERT_URL";
const INITIALIZE = "file/INITIALIZE";

export const setFile = createAction(SET_FILE, file => file);
export const setModal = createAction(SET_MODAL);
export const convertImage = createAction(CONVERT_IMAGE, fileAPI.convertImage);
export const convertYoutube = createAction(
  CONVERT_YOUTUBE,
  fileAPI.convertYoutube
);
export const convertUrl = createAction(CONVERT_URL, fileAPI.convertUrl);
export const initialize = createAction(INITIALIZE);

export const initialState = {
  fileData: null,
  result: false
};

const reducer = handleActions(
  {
    [SET_FILE]: (state, action) => ({
      ...state,
      fileData: action.payload
    }),
    [SET_MODAL]: (state, action) => ({
      ...state,
      fileData: null
    }),
    [INITIALIZE]: (state, action) => ({
      ...state,
      result: false
    })
  },
  initialState
);

export default applyPenders(reducer, [
  {
    type: CONVERT_IMAGE,
    onSuccess: (state, action) => ({
      ...state,
      result: action.payload.data.status === 200 ? true : false
    })
  },
  {
    type: CONVERT_YOUTUBE,
    onSuccess: (state, action) => ({
      ...state,
      result: action.payload.data.status === 200 ? true : false
    })
  },
  {
    type: CONVERT_URL,
    onSuccess: (state, action) => ({
      ...state,
      result: action.payload.data.status === 200 ? true : false
    })
  }
]);
