/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

import { createSelector } from 'reselect';
import { ActionReducer, combineReducers } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import * as fromUi from './ui/ui.reducer';
import { compose, ActionReducerMap } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../environments/environment';

export interface RootState {
  ui: fromUi.State;
  router: fromRouter.RouterReducerState;
}

export interface ReducersMap {
  [key: string]: ActionReducer<any>;
}

export const reducers: ActionReducerMap<RootState> = {
  ui: fromUi.reducer,
  router: fromRouter.routerReducer
};

const devProdReducers: ReducersMap = {
  developmentReducer: compose(storeFreeze, combineReducers)(reducers),
  productionReducer: combineReducers(reducers)
}

export function addReducer<S>(name: string, reducer: ActionReducer<S>): void {
  reducers[name] = reducer;
  devProdReducers['developmentReducer'] = compose(storeFreeze, combineReducers)(reducers);
  devProdReducers['productionReducer'] = combineReducers(reducers);
  console.log('New reducers:', reducers);
}

export function rootReducer(state: any, action: any) {
  if (environment.production) {
    return devProdReducers.productionReducer(state, action);
  } else {
    return devProdReducers.developmentReducer(state, action);
  }
}
