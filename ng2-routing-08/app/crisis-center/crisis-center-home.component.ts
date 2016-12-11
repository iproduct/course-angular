import { Observable, Subscription, BehaviorSubject } from 'rxjs/Rx';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  template: `
    <p>Welcome to the Crisis Center</p>
    <p>Observable numbers: {{result}}</p>
    <p>Subject demo: {{subjectResult}}</p>
  `
})
export class CrisisCenterHomeComponent implements OnInit, OnDestroy {
  numbersObservable: Observable<string>;
  result: string = '';
  subjectResult: string = '';
  numbersSubscription: Subscription;

  ngOnInit() {
    this.numbersObservable = Observable.interval(200)
      .map(n => n * n)
      .filter(n => n % 3 === 0)
      .take(10)
      .scan((acc: string, val: number) => acc + ' - ' + val);

    this.numbersSubscription = this.numbersObservable
      .subscribe(s => this.result = s,
      err => this.result += ': error:' + err,
      () => this.result += ': completed');

    let source = Observable.interval(1000);
    let subject = new BehaviorSubject<number>(0);
    let refCounted = source.multicast(subject).refCount();
    let subscription1: Subscription;
    let subscription2: Subscription;

    // This calls `connect()`, because
    // it is the first subscriber to `refCounted`
    this.subjectResult += 'observerA subscribed; ';
    subscription1 = refCounted.subscribe({
      next: (v) => this.subjectResult += 'observerA: ' + v + '; '
    });

    setTimeout(() => {
      this.subjectResult += 'observerB subscribed; ';
      subscription2 = refCounted.subscribe({
        next: (v) => this.subjectResult += 'observerB: ' + v + '; '
      });
    }, 2200);

    setTimeout(() => {
      this.subjectResult += 'observerA unsubscribed; ';
      subscription1.unsubscribe();
    }, 3400);

    // This is when the shared Observable execution will stop, because
    // `refCounted` would have no more subscribers after this
    setTimeout(() => {
      this.subjectResult += 'observerB unsubscribed; ';
      subscription2.unsubscribe();
    }, 4000);
  }
  ngOnDestroy() {
    this.numbersSubscription.unsubscribe();
  }

}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/