import { Component, DoCheck, ChangeDetectorRef} from '@angular/core';
import {NgForm} from '@angular/forms';

const defaultName = {first: 'John', last: 'Smith'};

@Component({
selector: 'form-demo',
template: `
    <form #f="ngForm" (ngSubmit)="onSubmit(f)">
      <p *ngIf="nameCtrl.invalid">Name is invalid.</p>
      <div ngModelGroup="fullName" #nameCtrl="ngModelGroup">
        <input name="first" [ngModel]="fullName.first" minlength="2">
        <input name="last" [ngModel]="fullName.last" required>
      </div>
      <input name="email" ngModel>
      <input name="date" [ngModel]="date | date:'short'">
      <button [disabled]="!f.valid">Submit</button>
      <button type="button"  (click)="reset(f)">Reset</button>
      </form>
    <button (click)="setValue()">Set value</button>
    <button (click)="incrementDate(f)">Increment Date</button>
    <p>Form data:{{f.value | json}}</p>
    <p>Name data:{{fullName | json}}</p>
    <p>Date:{{date.toJSON()}}</p>
  `
})
export class FormDemoComponent implements DoCheck {
  public fullName = defaultName;
  public date: Date = new Date();
  public previousDate: Date;
  constructor(public ref: ChangeDetectorRef) {}
  public onSubmit(f: NgForm) {console.log(f.value); console.log(f.valid); }
  public setValue() { this.fullName = {first: 'Brian', last: 'Adams'}; }
  public incrementDate(f: NgForm) { this.date.setDate(this.date.getDate() + 1); }
  public reset(f: NgForm) { this.fullName = defaultName; f.value.email = ''; this.date = new Date(); }
  public ngDoCheck() {
    if (this.previousDate && this.previousDate.getDate() === this.date.getDate()) {
      // this.ref.detectChanges();
      this.date = new Date(this.date);
    }
    this.previousDate = this.date;
  }
}
