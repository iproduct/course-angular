import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { of, interval, Observable, zip, Subscription, fromEvent } from 'rxjs';
import { map, scan, bufferTime, debounceTime, buffer } from 'rxjs/operators';

@Component({
  selector: 'ws-rx-demo',
  templateUrl: './rx-demo.component.html',
  styleUrls: ['./rx-demo.component.scss']
})
export class RxDemoComponent implements OnInit, OnDestroy {
  names$ = of('Hello', 'from', 'Reactive', 'Extentions', 'JavaScript');
  interval$ = interval(1000);
  asyncNames$: Observable<string>;
  log = '';
  intervalSubscription: Subscription;
  @ViewChild('target', {static: true}) ref: ElementRef;
  results$: Observable<number>;

  constructor() { }

  ngOnInit() {
    this.asyncNames$ = zip(this.interval$, this.names$).pipe(
      map(([i, name]) => name)
    );
    this.asyncNames$.subscribe(
      name => this.log += `next(${name}) | `,
      err => this.log += `error(${err})`,
      () => this.log += `complete()`
    );
    this.intervalSubscription = this.interval$.subscribe(
      name => this.log += `next(${name}) | `,
      err => this.log += `error(${err})`,
      () => this.log += `complete()`
    );

    const clicks$ = fromEvent(this.ref.nativeElement, 'click');
    this.results$ = clicks$.pipe(
      buffer( clicks$.pipe(debounceTime(200)) ),
      map(events => events.length)
      // scan((acc, val) => acc + 1, 0)
    );

    // const observable$ = new Observable(subscriber => {
    //   subscriber.next(1);
    //   subscriber.next(2);
    //   subscriber.next(3);
    //   setTimeout(() => {
    //     subscriber.next(4);
    //     subscriber.error('Error generated.');
    //   }, 1000);
    // });
    // observable$.subscribe(
    //     next => this.log += `next(${next}) | `,
    //     err => this.log += `error(${err})`,
    //     () => this.log += `complete()`
    //   );
  }

  ngOnDestroy(): void {
    if (this.intervalSubscription && !this.intervalSubscription.closed) {
      this.intervalSubscription.unsubscribe();
    }
  }

}
