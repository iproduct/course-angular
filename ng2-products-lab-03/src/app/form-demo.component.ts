import { Component, DoCheck, ChangeDetectorRef} from '@angular/core';
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
      <input name="email" ngModel> 
      <input name="date" [ngModel]="date | date:'short'"> 
      <button>Submit</button>
    </form> 
    <button (click)="setValue()">Set value</button>
    <button (click)="reset(f)">Reset</button>
    <p>Form data:{{f.value | json}}</p>
    <p>Name data:{{name | json}}</p>
    <p>Date:{{date.toJSON()}}</p>
  `
})
export class FormDemoComponent implements DoCheck {
  public name = {first: 'John', last: 'Smith'};
  public date: Date = new Date();
  public previousDate: Date;
  constructor(public ref: ChangeDetectorRef) {}
  public onSubmit(f: NgForm) {console.log(f.value); console.log(f.valid); }
  public setValue() { this.name = {first: 'Brian', last: 'Adams'}; }
  public reset(f: NgForm) { this.date.setDate(this.date.getDate() + 1); }
  public ngDoCheck() {
    if (this.previousDate && this.previousDate.getDate() === this.date.getDate()) {
      // this.ref.detectChanges();
      this.date = new Date(this.date);
    }
    this.previousDate = this.date;
  }
}
