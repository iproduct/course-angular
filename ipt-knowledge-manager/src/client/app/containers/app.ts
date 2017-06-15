import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../reducers';
import * as layout from '../actions/layout';


@Component({
  selector: 'ipt-app',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ipt-layout>
      <ipt-sidenav [open]="showSidenav$ | async">
        <ipt-nav-item (activate)="closeSidenav()" routerLink="/" icon="book" hint="View your book collection">
          My Collection
        </ipt-nav-item>
        <ipt-nav-item (activate)="closeSidenav()" routerLink="/book/find" icon="search" hint="Find your next book!">
          Browse Books
        </ipt-nav-item>
        <ipt-nav-item (activate)="closeSidenav()" routerLink="/users" icon="search" hint="Manage users">
          Users
        </ipt-nav-item>
        <ipt-nav-item (activate)="closeSidenav()" routerLink="/tests" icon="search" hint="Manage tests">
          Tests
        </ipt-nav-item>
      </ipt-sidenav>
      <ipt-toolbar (openMenu)="openSidenav()">
        Personal Knowledge Manager
      </ipt-toolbar>

      <router-outlet></router-outlet>
    </ipt-layout>
  `
})
export class AppComponent {
  showSidenav$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    /**
     * Selectors can be applied with the `select` operator which passes the state
     * tree to the provided selector
     */
    this.showSidenav$ = this.store.select(fromRoot.getShowSidenav);
  }

  closeSidenav() {
    /**
     * All state updates are handled through dispatched actions in 'container'
     * components. This provides a clear, reproducible history of state
     * updates and user interaction through the life of our
     * application.
     */
    this.store.dispatch(new layout.CloseSidenavAction());
  }

  openSidenav() {
    this.store.dispatch(new layout.OpenSidenavAction());
  }
}
