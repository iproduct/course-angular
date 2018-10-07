import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, from, interval, zip, Subject, BehaviorSubject, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ws-rx-demo',
  templateUrl: './rx-demo.component.html',
  styleUrls: ['./rx-demo.component.css']
})
export class RxDemoComponent implements OnInit {
  names$: Observable<string>;
  interval$: Observable<number>;
  asyncNames$: Observable<string>;

  result = '';

  @ViewChild('clicked') clicked: ElementRef;

  constructor() {}

  ngOnInit() {
    this.names$ = from([
      'Hello',
      'Reactive',
      'Extensions',
      'from',
      'TypeScript'
    ]);
    this.interval$ = interval(1000);
    // this.asyncNames$ = zip(this.names$, this.interval$).pipe(
    //   map(([name, num]) => name)
    // );

    this.asyncNames$ = zip(this.names$, <Observable<MouseEvent>> fromEvent(this.clicked.nativeElement, 'click'))
    .pipe(
      map(([name, ev]) => `${name} (${ev.clientX}, ${ev.clientY}), `)
    );

    const subscription = this.asyncNames$.subscribe(
      next => (this.result += next + ' '),
      err => (this.result += 'ERROR:' + err),
      () => {
        this.result += 'COMPLETED.';
        subscription.unsubscribe(); // not really necessary
      }
    );


    // const subject = new BehaviorSubject<number>(0);

    // subject.subscribe({
    //   next: v => console.log(`observerA: ${v}`)
    // });

    // subject.next(1);

    // subject.subscribe({
    //   next: v => console.log(`observerB: ${v}`)
    // });
    // subject.next(2);
  }
}
