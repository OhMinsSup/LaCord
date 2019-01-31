import { createAction, handleActions } from "redux-actions";
import { applyPenders } from "redux-pender";

import * as userAPI from "../../lib/api/user";

const SET_USER = "user/SET_USER";
const CHECK_USER = "user/CHECK_USER";
const LOGOUT = "user/LOGOUT";

export const setUser = createAction(SET_USER, payload => payload);
export const checkUser = createAction(CHECK_USER, userAPI.check);
export const logout = createAction(LOGOUT, userAPI.logout);

const initialState = {
  user: null
};

const reducer = handleActions(
  {
    [SET_USER]: (state, action) => ({
      ...state,
      user: action.payload
    })
  },
  initialState
);

export default applyPenders(reducer, [
  {
    type: CHECK_USER,
    onSuccess: (state, action) => ({
      ...state,
      user: action.payload.data.user
    }),
    onFailure: (state, action) => ({
      ...state,
      user: null
    })
  }
]);
