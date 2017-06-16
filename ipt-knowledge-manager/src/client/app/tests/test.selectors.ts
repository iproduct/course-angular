/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

import { RootState } from './test.module';
import { State } from './test.reducer';
import { createSelector } from 'reselect';

/**
 * Test state specific selectors
 */
export const getEntities = (state: State) => state.entities;
export const getIds = (state: State) => state.ids;
export const getSelectedId = (state: State) => state.selectedTestId;
export const getLoading = (state: State) => state.loading;
export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
  return entities[selectedId];
});
export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
  return ids.map(id => entities[id]);
});

/**
 * Root state selectors - select the `tests` state.
 * Selectors are used with the `select` operator.
 *
 * ```ts
 * class ClientComponent {
 * 	constructor(state$: Observable<State>) {
 * 	  this.testsState$ = state$.select(getTestsState);
 * 	}
 * }
 * ```
 */
export const getTestsState = (state: RootState) => state.tests;
export const getTests = createSelector(getTestsState, getAll);
export const getTestEntities = createSelector(getTestsState, getEntities);
export const getTestIds = createSelector(getTestsState, getIds);
export const getSelectedTestId = createSelector(getTestsState, getSelectedId);
export const getSelectedTest = createSelector(getTestsState, getSelected);
export const getTestsLoading = createSelector(getTestsState, getLoading);
