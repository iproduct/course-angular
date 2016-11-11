import { Component, OnDestroy, OnInit, ContentChild, AfterContentChecked, AfterContentInit } from '@angular/core';
import { TimerNameComponent } from './timer-name.component';
@Component({
  selector: 'countdown-timer',
  template: `
  <h3>{{name}}</h3>
  <p>{{message}}</p>
  <ng-content></ng-content>
  `

})
export class CountdownTimerComponent implements OnInit, OnDestroy, AfterContentChecked {
  @ContentChild(TimerNameComponent) private timerNameComponent: TimerNameComponent;
  intervalId = 0;
  message = '';
  seconds = 11;
  name = 'no-value';
  clearTimer() { clearInterval(this.intervalId); }
  ngOnInit()    { this.start(); }
  ngOnDestroy() { this.clearTimer(); }
  ngAfterContentChecked() {
    // Redefine `seconds()` to get from the `CountdownTimerComponent.seconds` ...
    // but wait a tick first to avoid one-time devMode
    // unidirectional-data-flow-violation error
   this.name = this.timerNameComponent.name;
  }
  start() { this.countDown(); }
  stop()  {
    this.clearTimer();
    this.message = `Holding at T-${this.seconds} seconds`;
  }
  private countDown() {
    this.clearTimer();
    this.intervalId = window.setInterval(() => {
      this.seconds -= 1;
      if (this.seconds === 0) {
        this.message = 'Blast off!';
      } else {
        if (this.seconds < 0) { this.seconds = 10; } // reset
        this.message = `T-${this.seconds} seconds and counting`;
      }
    }, 1000);
  }
}
