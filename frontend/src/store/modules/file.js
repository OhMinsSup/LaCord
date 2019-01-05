import { createAction, handleActions } from "redux-actions";
import { applyPenders } from "redux-pender";

const SET_FILE = "file/SET_FILE";

export const setFile = createAction(SET_FILE, file => file);

const initialState = {
  fileData: null
};

const reducer = handleActions(
  {
    [SET_FILE]: (state, action) => ({
      ...state,
      fileData: action.payload
    })
  },
  initialState
);

export default applyPenders(reducer, []);
