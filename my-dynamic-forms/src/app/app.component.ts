import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

import { FieldConfig } from './dynamic-form/models/field-config.interface';
import { DynamicFormComponent } from './dynamic-form/containers/dynamic-form/dynamic-form.component';

@Component({
  selector: 'df-root',
  styleUrls: ['app.component.scss'],
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild(DynamicFormComponent, {static: false}) df: DynamicFormComponent;

  config: FieldConfig[] = [
    {
      type: 'input',
      label: 'Full name',
      name: 'name',
      placeholder: 'Enter your name',
      validation: [Validators.required, Validators.minLength(4)]
    },
    {
      type: 'select',
      label: 'Favourite Food',
      name: 'food',
      options: ['Pizza', 'Hot Dogs', 'Knakworstje', 'Coffee'],
      placeholder: 'Select an option',
      validation: [Validators.required]
    },
    {
      label: 'Submit',
      name: 'submit',
      type: 'button'
    }
  ];
  ngOnInit(): void {
  }

  ngAfterViewInit() {
    let previousValid = this.df.valid;
    this.df.changes.subscribe(() => {
      if (this.df.valid !== previousValid) {
        previousValid = this.df.valid;
        this.df.setDisabled('submit', !previousValid);
      }
    });
  }

  submit(value: {[name: string]: any}) {
    console.log(value);
  }
}
