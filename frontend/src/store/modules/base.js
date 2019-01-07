import { createAction, handleActions } from "redux-actions";

const HIDE_USER_MODAL = "base/HIDE_USER_MODAL";
const SHOW_USER_MODAL = "base/SHOW_USER_MODAL";
const HIDE_URL_MODAL = "base/HIDE_URL_MODAL";
const SHOW_URL_MODAL = "base/SHOW_URL_MODAL";

export const hideUserModal = createAction(HIDE_USER_MODAL, visible => visible);
export const showUserModal = createAction(SHOW_USER_MODAL, visible => visible);
export const hideUrlModal = createAction(HIDE_URL_MODAL, visible => visible);
export const showUrlModal = createAction(SHOW_URL_MODAL, visible => visible);

const initialState = {
  user_modal: false,
  url_modal: false
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
    })
  },
  initialState
);
