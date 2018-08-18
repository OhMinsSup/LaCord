import { pender } from 'redux-pender';

type Reducer = (state: any, action: any) => any;

export function applyPenders<T: Reducer>(reducer: T, penders: any[]): T {
    const updaters = Object.assign({}, ...penders.map(pender));
    return ((state, action) => {
      if (updaters[action.type]) {
        return updaters[action.type](state, action);
      }
      return reducer(state, action);
    }: any);    
}

export type GenericResponseAction<D, M> = {
    type: string,
    payload: {
      data: D,
    },
    meta: M,
};