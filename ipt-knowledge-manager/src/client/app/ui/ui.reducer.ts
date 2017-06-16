/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

import { UiActions } from './ui.actions';
import { Action } from '@ngrx/store';

export interface State {
  showSidenav: boolean;
}

const initialState: State = {
  showSidenav: false,
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case UiActions.CLOSE_SIDENAV:
      return {
        showSidenav: false
      };

    case UiActions.OPEN_SIDENAV:
      return {
        showSidenav: true
      };

    default:
      return state;
  }
}

