import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
selector: 'form-demo',
template: `
    <form #f="ngForm" (ngSubmit)="onSubmit(f)">
      <p *ngIf="nameCtrl.invalid">Name is invalid.</p>
      <div ngModelGroup="name" #nameCtrl="ngModelGroup">
        <input name="first" [ngModel]="name.first" minlength="2">
        <input name="last" [ngModel]="name.last" required>
      </div>
      <input name="email" ngModel> <button>Submit</button>
    </form> <button (click)="setValue()">Set value</button>
  `
})
export class FormDemoComponent {
  public name = {first: 'John', last: 'Smith'};
  public onSubmit(f: NgForm) {console.log(f.value); console.log(f.valid); }
  public setValue() { this.name = {first: 'Brian', last: 'Adams'}; }
}
