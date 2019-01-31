import { createAction, handleActions } from "redux-actions";
import { applyPenders } from "redux-pender";

import * as userAPI from "../../lib/api/user";

const SET_USER = "user/SET_USER";
const CHECK_USER = "user/CHECK_USER";
const LOGOUT = "user/LOGOUT";
const ASK_UNREGISTER = "user/ASK_UNREGISTER";
const GENERATE_UNREGISTER_TOKEN = "user/GENERATE_UNREGISTER_TOKEN";
const UNREGISTER = "user/UNREGISTER";
const GET_USER_INFO = "user/GET_USER_INFO";

export const setUser = createAction(SET_USER, payload => payload);
export const checkUser = createAction(CHECK_USER, userAPI.check);
export const logout = createAction(LOGOUT, userAPI.logout);
export const askUnregister = createAction(ASK_UNREGISTER, open => open);
export const generateUnregisterToken = createAction(
  GENERATE_UNREGISTER_TOKEN,
  userAPI.generateUnregisterToken
);
export const unregister = createAction(UNREGISTER, userAPI.unregister);
export const getUserInfo = createAction(GET_USER_INFO, userAPI.getUserInfo);

const initialState = {
  user: null,
  askUnregister: false,
  unregisterToken: null
};

const reducer = handleActions(
  {
    [ASK_UNREGISTER]: (state, action) => ({
      ...state,
      askUnregister: action.payload
    }),
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
  },
  {
    type: GENERATE_UNREGISTER_TOKEN,
    onSuccess: (state, action) => {
      return {
        ...state,
        unregisterToken: action.payload.data.unregister_token
      };
    }
  },
  {
    type: GET_USER_INFO,
    onSuccess: (state, action) => {
      return {
        ...state,
        user: action.payload.data.user
      };
    }
  }
]);
