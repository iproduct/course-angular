/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

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
