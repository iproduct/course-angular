import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'kt-demo01',
  templateUrl: './demo01.component.html',
  styleUrls: ['./demo01.component.css']
})
export class Demo01Component implements OnInit, OnDestroy {
  @ViewChild('mybutton') button: ElementRef;

  names$: Observable<string>;
  interval$: Observable<number>;
  asyncNames$: Observable<string>;
  results = '';
  resultsSwitchMap = '';
  subscription: Subscription;

  constructor() { }

  ngOnInit() {
    this.names$ = Observable.from<string>(['Hello', 'Reactive', 'Extensions', 'from', 'TypeScript']);
    this.interval$ = Observable.interval(1000);
    this.asyncNames$ = Observable.zip(this.names$, this.interval$, (name, number) => ([name, number]))
      .map( ([name, number]) =>  name + ' ' );
      // .take(3);
      this.subscription = this.asyncNames$.subscribe(name => this.results += name);

    // switchMap and throttle demo
    const clicks = Observable.fromEvent(this.button.nativeElement, 'click');
    const switchMapped$ = clicks
      .switchMap((ev) => Observable.interval(1000));
    switchMapped$.subscribe(x => this.resultsSwitchMap += x);

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
