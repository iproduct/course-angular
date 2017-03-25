import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'simple-form',
  template: `
    <form #f="ngForm" (ngSubmit)="onSubmit(f)">
      <p *ngIf="nameCtrl.invalid">Name is invalid.</p>
      <div ngModelGroup="name" #nameCtrl="ngModelGroup">
        <input name="first" [ngModel]="name.first" minlength="2" class="form-control">
        <input name="last" [ngModel]="name.last" required class="form-control">
      </div>
      <input name="email" ngModel class="form-control"> 
      <button>Submit</button>
    </form>
    <button (click)="setValue()">Set value</button>
  `,
})
export class SimpleFormComponent {
  public name = {first: 'Nancy', last: 'Drew'};
  public onSubmit(f: NgForm) {
    console.log(f.value);  // {name: {first: 'Nancy', last: 'Drew'}, email: ''}
    console.log(f.valid);  // true
  }
  public setValue() { this.name = {first: 'Bess', last: 'Marvin'}; }
}
