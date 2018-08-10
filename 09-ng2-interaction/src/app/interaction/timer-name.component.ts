import { Component } from '@angular/core';
@Component({
  selector: 'timer-name',
  template: `
  <input type="text" [(ngModel)]="name" validateEmail #emailInput="ngModel">
  <p *ngIf="emailInput.invalid">Invalid email.</p>
  <p>{{name}}</p>
  `
})
export class TimerNameComponent {
  name = 'Timer Name Comp';
}
