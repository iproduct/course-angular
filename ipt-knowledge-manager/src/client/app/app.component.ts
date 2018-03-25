/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */
import 'rxjs/add/operator/let';

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { RootState } from './root.reducer';
import { UiActions } from './ui/ui.actions';
import { getShowSidenav } from './ui/ui.selectors';


/**
 * The main component of the application bootstrapped by the root module.
 * Html template presents the overall application layout.
 */
@Component({
  selector: 'ipt-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  showSidenav$: Observable<boolean>;

  constructor(private store: Store<RootState>, private uiActions: UiActions) {
    this.showSidenav$
    = this.store.select(getShowSidenav);
  }

  closeSidenav() {
    this.store.dispatch(this.uiActions.closeSidenav());
  }

  openSidenav() {
    this.store.dispatch(this.uiActions.openSidenav());
  }
}
