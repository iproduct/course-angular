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
import * as fromUi from './ui/ui.reducer';
import { compose, StoreModule, ActionReducerMap } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../environments/environment';

import { Params, RouterStateSnapshot } from '@angular/router';
import {
  StoreRouterConnectingModule,
  routerReducer,
  RouterReducerState,
  RouterStateSerializer
} from '@ngrx/router-store';

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

export interface RootState {
  ui: fromUi.State;
  router: RouterReducerState<RouterStateUrl>;
}

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const { url, root: { queryParams } } = routerState;
    const { params } = route;

    // Only return an object including the URL, params and query params
    // instead of the entire snapshot
    return { url, params, queryParams };
  }
}

export const reducers: ActionReducerMap<RootState> = {
  ui: fromUi.reducer,
  router: routerReducer
};


// export interface ReducersMap {
//   [key: string]: ActionReducer<any>;
// }


// const devProdReducers: ReducersMap = {
//   developmentReducer: compose(storeFreeze, combineReducers)(reducers),
//   productionReducer: combineReducers(reducers)
// }

// export function addReducer<S>(name: string, reducer: ActionReducer<S>): void {
//   reducers[name] = reducer;
//   devProdReducers['developmentReducer'] = compose(storeFreeze, combineReducers)(reducers);
//   devProdReducers['productionReducer'] = combineReducers(reducers);
//   console.log('New reducers:', reducers);
// }

// export function rootReducer(state: any, action: any) {
//   if (environment.production) {
//     return devProdReducers.productionReducer(state, action);
//   } else {
//     return devProdReducers.developmentReducer(state, action);
//   }
// }
