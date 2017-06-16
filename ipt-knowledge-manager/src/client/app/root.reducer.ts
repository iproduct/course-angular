import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';
import { ReducersHash, makeRootReducer } from './shared/reducer-helpers';
import * as fromRouter from '@ngrx/router-store';
import * as fromUi from './ui/ui.reducer';

export interface RootState {
  ui: fromUi.State;
  router: fromRouter.RouterState;
}

export const reducers: ReducersHash = {
  ui: fromUi.reducer,
  router: fromRouter.routerReducer
};

export const reducer = makeRootReducer(reducers);
