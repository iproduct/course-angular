import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'ws-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {
  @ViewChild('f') form: NgForm;

  name = {first: 'John', last: 'Smith'};

  constructor() { }

  ngOnInit() {
  }

  public onSubmit() {
    console.log(this.form.value); console.log(this.form.valid);
  }
  public setValue() { this.name = {first: 'Brian', last: 'Adams'}; }

}
