// @flow 
import { createAction, handleActions, type ActionType } from 'redux-actions';
import produce from 'immer';

const SET_SCREEN_MASK_VISIBILITY = 'base/SET_SCREEN_MASK_VISIBILITY';
const SHOW_USER_MENU = 'base/SHOW_USER_MENU';
const HIDE_USER_MENU = 'base/HIDE_USER_MENU';
const SHOW_SIDEBAR = 'base/SHOW_SIDEBAR';
const HIDE_SIDEBAR = 'base/HIDE_SIDEBAR';

const setScreenMaskVisibility = createAction(SET_SCREEN_MASK_VISIBILITY, (visible: boolean) => visible); 
const showUserMenu = createAction(SHOW_USER_MENU);
const hideUserMenu = createAction(HIDE_USER_MENU);
const showSidebar = createAction(SHOW_SIDEBAR);
const hideSidebar = createAction(HIDE_SIDEBAR);


type SetScreenMaskVisibilityAction = ActionType<typeof setScreenMaskVisibility>;

export interface BaseActionCreators {
    setScreenMaskVisibility(visible: boolean): any;
    showUserMenu(): any;
    hideUserMenu(): any;
    showSidebar(): any;
    hideSidebar(): any;
}

export const actionCreators: BaseActionCreators = {
    setScreenMaskVisibility,
    showUserMenu,
    hideUserMenu,
    showSidebar,
    hideSidebar,
}

export type BaseState = {
    screenMask: {
        visible: boolean
    },
    header: {
        userMenu: boolean
    },
    sidebar: {
        visible: boolean
    },
}

const initialState: BaseState = {
    screenMask: {
        visible: false
    },
    header: {
        userMenu: false
    },
    sidebar: {
        visible: false
    }
}

export default handleActions({
    [SET_SCREEN_MASK_VISIBILITY]: (state, action: SetScreenMaskVisibilityAction) => {
        return produce(state, (draft) => {
            draft.screenMask = {
                visible: action.payload
            };
        });
    },
    [SHOW_USER_MENU]: (state) => {
        return produce(state, (draft) => {
            draft.header = {
                userMenu: true
            }
        })
    },
    [HIDE_USER_MENU]: (state) => {
        return produce(state, (draft) => {
            draft.header = {
                userMenu: false
            }
        });
    },
    [SHOW_SIDEBAR]: (state) => {
        return produce(state, (draft) => {
            draft.sidebar = {
                visible: true
            }
        });
    },
    [HIDE_SIDEBAR]: (state) => {
        return produce(state, (draft) => {
            draft.sidebar = {
                visible: false
            }
        });
    }
}, initialState);