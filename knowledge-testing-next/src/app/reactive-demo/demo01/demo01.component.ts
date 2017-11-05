/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

import { Component, OnInit, OnDestroy, ViewChild, ElementRef, HostBinding } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { slideInDownAnimation } from '../../shared/animations';

@Component({
  selector: 'kt-demo01',
  templateUrl: './demo01.component.html',
  styleUrls: ['./demo01.component.css'],
  animations: [slideInDownAnimation]
})
export class Demo01Component implements OnInit, OnDestroy {
  @HostBinding('@routeAnimation') routeAnimation = true;
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
    // 1 step - create
    this.asyncNames$ = Observable.zip(this.names$, this.interval$, (name, number) => ([name, number]))
      .map( ([name, number]) =>  name + ' ' );
      // .take(3);
    // 2 step - subscribe and 3 step -execute immediately
    this.subscription = this.asyncNames$.subscribe(name => this.results += name);

    // switchMap and throttle demo
    const clicks$ = Observable.fromEvent(this.button.nativeElement, 'click'); //PUSH
    const switchMapped$ = clicks$
      .throttleTime(3000)
      .switchMap((ev) => Observable.interval(1000));
    switchMapped$.subscribe(x => this.resultsSwitchMap += x);

  }

  ngOnDestroy(): void {
    // 4 step - dispose
    this.subscription.unsubscribe();
  }

}
