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

