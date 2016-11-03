import { AfterViewInit, ViewChild } from '@angular/core';
import { Component }                from '@angular/core';
import { CountdownTimerComponent }  from './countdown-timer.component';
@Component({
  selector: 'countdown-parent-vc',
  template: `
  <h3>Countdown to Liftoff (via ViewChild)</h3>
  <button (click)="start()">Start</button>
  <button (click)="stop()">Stop</button>
  <div class="seconds">{{ seconds() }}</div>
  <countdown-timer></countdown-timer>
  `,
  styles: [`
    .seconds {
      width: 1.5em;
      height: 1.5em;
      font-size: 5em;
      background-color: blue;
      border: 3px solid red;
      color: yellow;
      text-align: center;
      vertical-align:middle;
    }
  `]})
export class CountdownViewChildParentComponent implements AfterViewInit {
  @ViewChild(CountdownTimerComponent)
  private timerComponent: CountdownTimerComponent;
  seconds() { return 0; }
  ngAfterViewInit() {
    // Redefine `seconds()` to get from the `CountdownTimerComponent.seconds` ...
    // but wait a tick first to avoid one-time devMode
    // unidirectional-data-flow-violation error
   this.seconds = () => this.timerComponent.seconds;
  }
  start() { this.timerComponent.start(); }
  stop() { this.timerComponent.stop(); }
}
