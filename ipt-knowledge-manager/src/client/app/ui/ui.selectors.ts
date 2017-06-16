import { createSelector } from 'reselect';
import { RootState } from '../root.reducer';
import { State } from './ui.reducer';

/**
 * Ui state specific selectors
 */
export const getUiShowSidenav = (state: State) => state.showSidenav;

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
