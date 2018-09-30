import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'ws-simple-form',
  templateUrl: './simple-form.component.html',
  styleUrls: ['./simple-form.component.css']
})
export class SimpleFormComponent implements OnInit {
  name = { first: 'John', last: 'Smith' };
  @ViewChild('fElem') formElement: ElementRef<HTMLFormElement>;
  @ViewChild('f') f: NgForm;

  constructor() {}

  ngOnInit() {}

  onSubmit() {
    console.log(this.f.value);
    console.log(this.f.valid);
    console.log(this.formElement.nativeElement.className);
  }

  setValue() {
    this.name = { first: 'Brian', last: 'Adams' };
  }
}
