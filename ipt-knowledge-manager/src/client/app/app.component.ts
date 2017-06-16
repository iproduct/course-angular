import { Component, ChangeDetectionStrategy } from '@angular/core';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { reducer, RootState } from './root.reducer';
import { UiActions } from './ui/ui.actions';
import { getShowSidenav } from './ui/ui.selectors';


@Component({
  selector: 'ipt-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  showSidenav$: Observable<boolean>;

  constructor(private store: Store<RootState>,  private uiActions: UiActions) {
    this.showSidenav$ = this.store.select(getShowSidenav);
  }

  closeSidenav() {
    this.store.dispatch(this.uiActions.closeSidenav());
  }

  openSidenav() {
    this.store.dispatch(this.uiActions.openSidenav());
  }
}

