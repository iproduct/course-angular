import { Component } from '@angular/core';
@Component({
  selector: 'timer-name',
  template: `
  <input type="text" [(ngModel)]="name">
  <p>{{name}}</p>
  `
})
export class TimerNameComponent {
  name = '';
}
