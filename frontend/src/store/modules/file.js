import { createAction, handleActions } from "redux-actions";
import { applyPenders } from "redux-pender";

const SET_FILE = "file/SET_FILE";
const SET_MODAL = "file/SET_MODAL";

export const setFile = createAction(SET_FILE, file => file);
export const setModal = createAction(SET_MODAL);

const initialState = {
  fileData: null
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
    })
  },
  initialState
);

export default applyPenders(reducer, []);
