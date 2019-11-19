import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'ws-simple-form',
  template: `
    <form #fElem #f="ngForm" (ngSubmit)="onSubmit(f)">
      <p *ngIf="nameCtrl.invalid">Name is invalid.</p>
      <div ngModelGroup="name" #nameCtrl="ngModelGroup">
        <input name="first" [ngModel]="name.first" minlength="2">
        <input name="last" [ngModel]="name.last" required>
      </div>
      <input name="email" ngModel> <button>Submit</button>
    </form> <button (click)="setValue()">Set value</button>
    <p>Value: {{f.value | json}}</p>
    <p>Valid: {{f.valid}}</p>
    <p>Value: {{fElem.className}}</p>
    `,
  styles: []
})
export class SimpleFormComponent {
  public name = {first: 'John', last: 'Smith'};
  constructor() { }
  public onSubmit(f: NgForm) {console.log(f.value); console.log(f.valid); }
  public setValue() { this.name = {first: 'Brian', last: 'Adams'}; }

}
