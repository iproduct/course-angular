import { ActionReducer, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../../environments/environment';

export interface ReducersHash {
  [key: string]: ActionReducer<any>;
}

export function makeRootReducer<S>(reducersHash: ReducersHash): ActionReducer<S> {
  const developmentReducer: ActionReducer<S> = compose(storeFreeze, combineReducers)(reducersHash);
  const productionReducer: ActionReducer<S> = combineReducers(reducersHash);
  return function reducer(state: any, action: any) {
    if (environment.production) {
      return productionReducer(state, action);
    } else {
      return developmentReducer(state, action);
    }
  }
}
