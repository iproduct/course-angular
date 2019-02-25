import { Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { NgForm, NgModel, NgModelGroup } from '@angular/forms';

@Component({
  selector: 'ws-simple-form',
  template: `
    <form #formElem #formModel="ngForm" (ngSubmit)="onSubmit()">
      <p *ngIf="nameCtrl.invalid">Name is invalid.</p>
      <div ngModelGroup="name" #nameCtrl="ngModelGroup">
        <input #first="ngModel" name="first" [ngModel]="name.first" minlength="2">
        Errors: {{formModel.controls['name'].controls['first'].errors | json}} <br>
        <input #last="ngModel" name="last" [ngModel]="name.last" required>
        Errors: {{last.errors | json}} <br>
      </div>
      <input name="email" ngModel>
      <button>Submit</button>
    </form> <button (click)="setValue()">Set value</button>
    {{formModel.value | json}} <br>
    Valid:{{formModel.valid}}<br>
    {{formElem.className | json}}
  `,
  styleUrls: ['./simple-form.component.css']
})
export class SimpleFormComponent {
  @ViewChild('formElem') formElement: ElementRef<HTMLFormElement>;
  @ViewChild(NgForm) form: NgForm;
  @ViewChild('nameCtrl') nameGroup: NgModelGroup;
  @ViewChildren(NgModel) controls: QueryList<NgModel>;
  private i = 0;

  constructor() {}

  public name = {first: 'John', last: 'Smith'};
  public onSubmit() {
    console.log(this.form.value);
    console.log(this.form.valid);
    console.log(this.controls.toArray());
    console.log(this.nameGroup.value);
  }
  public setValue() {
    this.name = {first: 'Brian', last: 'Adams'};
    this.nameGroup.reset(this.name);
  }
}
