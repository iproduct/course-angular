import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { INCREMENT, DECREMENT, RESET, AppState } from './counter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  counter$: Observable<number>;

  constructor(private store$: Store<AppState>) {
    this.counter$ = store$.select('counter');
  }

  increment() {
    this.store$.dispatch({ type: INCREMENT });
  }

  decrement() {
    this.store$.dispatch({ type: DECREMENT });
  }

  reset() {
    this.store$.dispatch({ type: RESET });
  }
}
