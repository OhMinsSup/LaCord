// @flow
import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';
import base, { type BaseState } from './base';

export default combineReducers({
    base: base,
    pender: penderReducer
})

export type State = {
    base: BaseState,
    pender: {
        pending: any,
        success: any,
        failure: any,
    }
}