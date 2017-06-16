/* tslint:disable: member-ordering */
import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';

@Injectable()
export class UiActions {

  // Sidenav
  static OPEN_SIDENAV = '[UI] Open Sidenav';
  openSidenav(): Action {
    return {
      type: UiActions.OPEN_SIDENAV
    };
  }

  static CLOSE_SIDENAV = '[UI] Close Sidenav';
  closeSidenav(): Action {
    return {
      type: UiActions.CLOSE_SIDENAV
    };
  }
}
