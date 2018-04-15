import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ws-form-demo',
  template: `
  <form #fElem #f="ngForm" (ngSubmit)="onSubmit(f)">
    <p *ngIf="nameCtrl.invalid">Name is invalid.</p>
    <div ngModelGroup="name" #nameElem #nameCtrl="ngModelGroup">
      <input #first="ngModel" name="first" [ngModel]="name.first" required minlength="2"><br>
      {{first.errors | json}}
      <div class="danger" *ngIf="first.errors && first.errors['required']">First name is required.</div>
      <input name="last" [ngModel]="name.last" required>
    </div>
    <input name="email" ngModel>
   <button>Submit</button>
  </form>
  <button (click)="setValue()">Set value</button>
  {{name | json}}<br>
  {{f.value | json}}<br>
  Name Valid: {{nameCtrl.valid}}<br>
  Form CSS classes: {{fElem.className}}<br>
  Name form group CSS classes: {{nameElem.className}}
  `,
  styles: [``]
})
export class FormDemoComponent {
  name = { first: 'John', last: 'Smith' };
  onSubmit(f: NgForm) {
    console.log(f.value);
    console.log(f.valid);
  }
  setValue() {
    this.name = { first: 'Brian', last: 'Adams' };
  }
}
