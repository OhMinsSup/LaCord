import { createAction, handleActions } from "redux-actions";
import { applyPenders } from "redux-pender";
import produce from "immer";

import * as authAPI from "../../lib/api/auth";

const CHANGE_INPUT = "auth/CHANGE_INPUT";
const SET_ERROR = "auth/SET_ERROR";
const CHECK_EMAIL_EXISTS = "auth/CHECK_EMAIL_EXISTS";
const CHECK_USERNAME_EXISTS = "auth/CHECK_USERNAME_EXISTS";
const LOCAL_REGISTER = "auth/LOCAL_REGISTER";
const LOCAL_LOGIN = "auth/LOCAL_LOGIN";
const INITIALIZE = "auth/INITIALIZE";

export const changeInput = createAction(CHANGE_INPUT, payload => payload);
export const setError = createAction(SET_ERROR, payload => payload);
export const checkEmailExists = createAction(
  CHECK_EMAIL_EXISTS,
  authAPI.checkExists
);
export const checkUsernameExists = createAction(
  CHECK_USERNAME_EXISTS,
  authAPI.checkExists
);
export const register = createAction(LOCAL_REGISTER, authAPI.register);
export const login = createAction(LOCAL_LOGIN, authAPI.login);
export const initialize = createAction(INITIALIZE, form => form);

const initialState = {
  login_form: {
    email: "",
    password: "",
    error: ""
  },
  register_form: {
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    error: ""
  },
  exists: {
    email: false,
    username: false
  },
  authResult: {
    id: "",
    username: "",
    thumbnail: "",
    email: ""
  }
};

const reducer = handleActions(
  {
    [CHANGE_INPUT]: (state, action) => {
      return produce(state, draft => {
        draft[action.payload.form][action.payload.name] = action.payload.value;
      });
    },
    [SET_ERROR]: (state, action) => {
      return produce(state, draft => {
        draft[action.payload.form][action.payload.name] =
          action.payload.message;
      });
    },
    [INITIALIZE]: (state, action) => initialState
  },
  initialState
);

export default applyPenders(reducer, [
  {
    type: CHECK_EMAIL_EXISTS,
    onSuccess: (state, action) => {
      return produce(state, draft => {
        draft.exists.email = action.payload.data.exists;
      });
    }
  },
  {
    type: CHECK_USERNAME_EXISTS,
    onSuccess: (state, action) => {
      return produce(state, draft => {
        draft.exists.username = action.payload.data.exists;
      });
    }
  },
  {
    type: LOCAL_REGISTER,
    onSuccess: (state, action) => {
      return produce(state, draft => {
        draft.authResult = action.payload.data.user;
      });
    }
  },
  {
    type: LOCAL_LOGIN,
    onSuccess: (state, action) => {
      return produce(state, draft => {
        draft.authResult = action.payload.data.user;
      });
    }
  }
]);
