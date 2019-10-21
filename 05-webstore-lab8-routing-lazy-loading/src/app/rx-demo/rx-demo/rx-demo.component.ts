import { Component, OnInit, OnDestroy } from '@angular/core';
import { from, interval, Observable, zip, Subscription } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'ws-rx-demo',
  templateUrl: './rx-demo.component.html',
  styleUrls: ['./rx-demo.component.scss']
})
export class RxDemoComponent implements OnInit, OnDestroy {
  names$ = from([
    'Hello',
    'Reactive',
    'Extensions',
    'from',
    'Angular'
  ]);

  interval$ = interval(1000).pipe(
    // take(10)
  );

  animated$: Observable<string>;
  intervalSubscription: Subscription;
  animatedSubscription: Subscription;
  log = '';

  constructor() { }

  ngOnInit() {
    this.animated$ = zip(this.interval$, this.names$).pipe(
      map(([i, name]) => name)
    );

    this.intervalSubscription = this.interval$.subscribe(
      next => this.log += next + ', '
    );

    this.animatedSubscription = this.animated$.subscribe(
      s => this.log += `next(${s}), `,
      err => this.log += `error(${err}), `,
      () => this.log += 'complete()'
    );
  }

  ngOnDestroy(): void {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
    if (this.animatedSubscription) {
      this.animatedSubscription.unsubscribe();
    }
  }
}
