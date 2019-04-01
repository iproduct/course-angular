import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'ws-simple-form',
  template: `
    <form #f="ngForm" #fElem (ngSubmit)="onSubmit(f)">
      <p *ngIf="nameCtrl.invalid">Name is invalid.</p>
      <div ngModelGroup="name" #nameCtrl="ngModelGroup">
        <input name="first" [ngModel]="name.first" required minlength="2" />
        <input name="last" [ngModel]="name.last" required />
      </div>
      <input name="email" ngModel /> <button>Submit</button>
    </form>
    <button (click)="setValue()">Set value</button>
    <br>{{ f.value | json }}
    <br>{{ fElem.className | json }}
  `,
  styles: [`
  .ng-valid[required], .ng-valid.required  {
    border-left: 5px solid #42A948; /* green */
  }
  .ng-invalid:not(form)  {
    border-left: 5px solid #a94442; /* red */
  }
  `]
})
export class SimpleFormComponent implements OnInit {
  public name = { first: 'John', last: 'Smith' };
  constructor() {}

  ngOnInit() {}

  public onSubmit(f: NgForm) {
    console.log(f.value);
    console.log(f.valid);
  }
  public setValue() {
    this.name = { first: 'Brian', last: 'Adams' };
  }
}
