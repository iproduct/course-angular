/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

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
