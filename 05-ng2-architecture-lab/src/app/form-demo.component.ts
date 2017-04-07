import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'form-demo',
  template: `
    <h2>Template-Driven Form Demo</h2>
    <form #f="ngForm" (ngSubmit)="onSubmit(f)" class="form-inline">
      <p *ngIf="nameCtrl.invalid" class="alert alert-danger">Name is invalid.</p>
      <div ngModelGroup="name" #nameCtrl="ngModelGroup" class="form-group">
        <input name="first" [ngModel]="name.first" minlength="2"  class="form-control" placeholder="First">
        <input name="last" [ngModel]="name.last" required  class="form-control" placeholder="Last">
      </div>
      <input name="email" ngModel  class="form-control" placeholder="Email"> 
      <button>Submit</button>
    </form> 
    <button (click)="setValue()">Set value</button>
  `,
  styles: [`h2 {padding-top: 20px;}`]
})
export class FormDemoComponent {
  public name = { first: 'John', last: 'Smith' };
  public onSubmit(f: NgForm) { console.log(f.value); console.log(f.valid); }
  public setValue() { this.name = { first: 'Brian', last: 'Adams' }; }
}
