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
import { RootState } from '../root.reducer';
import { State } from './ui.reducer';

/**
 * Ui state specific selectors
 */
export const getUiShowSidenav = (state: State) => {
  console.log(state);
  return state.showSidenav;
}

/**
 * Root state selectors - select the `UI` state.
 * Selectors are used with the `select` operator.
 *
 * ```ts
 * class ClientComponent {
 * 	constructor(state$: Observable<RootState>) {
 * 	  this.uiState$ = store$.select(getUiState);
 * 	}
 * }
 * ```
 */
export const getUiState = (state: RootState) => state.ui;
export const getShowSidenav = createSelector(getUiState, getUiShowSidenav);
