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
import { ActionReducer } from '@ngrx/store';
import { ReducersMap, makeRootReducer } from './shared/reducer-helpers';
import * as fromRouter from '@ngrx/router-store';
import * as fromUi from './ui/ui.reducer';

export interface RootState {
  ui: fromUi.State;
  router: fromRouter.RouterState;
}

export const reducers: ReducersMap = {
  ui: fromUi.reducer,
  router: fromRouter.routerReducer
};

export const reducer = makeRootReducer(reducers);
