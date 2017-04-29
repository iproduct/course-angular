import { Component } from '@angular/core';
@Component({
  selector: 'countdown-parent-lv',
  template: `
  <h3>Countdown to Liftoff (via local variable)</h3>
  <button (click)="timer.start()">Start</button>
  <button (click)="timer.stop()">Stop</button>
  <div class="seconds">{{timer.seconds}}</div>
  <countdown-timer #timer>
    <header>Countdown Timer Header</header>
    <timer-name></timer-name>
    <div class="footer"> Countdown Template Variable Timer Footer </div>
  </countdown-timer>
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
  `]
})
export class CountdownVarParentComponent { }
