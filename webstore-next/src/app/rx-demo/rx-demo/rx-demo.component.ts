import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, interval, from, zip, Subscription } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'ws-rx-demo',
  templateUrl: './rx-demo.component.html',
  styleUrls: ['./rx-demo.component.css']
})
export class RxDemoComponent implements OnInit, OnDestroy {

  interval$: Observable<number>;
  names$: Observable<string>;
  animated$: Observable<string>;
  name: String;
  error: String;
  complete = false;
  private subscription: Subscription;

  constructor() { }

  ngOnInit() {
    this.interval$ = interval(1000).pipe(
      take(20)
    );
    this.names$ = from([
      'Hello',
      'Reactive',
      'Extensions',
      'from',
      'TypeScript'
    ]);
    this.animated$ = zip(this.interval$, this.names$).pipe(
      map(([id, name]) => name),
      map(name => {
        if (name === 'from') {
          throw new Error('Stream error!!!');
        }
        return name;
      })
    );

    this.subscription = this.animated$.subscribe(
      name => this.name = name, // onNext
      err => this.error = err, // onError
      () => this.complete = true // onComplete
    );

  }
  ngOnDestroy(): void {
    if (!this.subscription.closed) {
      console.log('Closing subscription.');
      this.subscription.unsubscribe();
    }
  }

}
