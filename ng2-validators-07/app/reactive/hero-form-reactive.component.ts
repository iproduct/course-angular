/* tslint:disable: member-ordering forin */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { Hero } from '../shared/hero';
import { forbiddenNameValidator, nameTakenValidator } from '../shared/forbidden-name.directive';

@Component({
  moduleId: module.id,
  selector: 'hero-form-reactive3',
  templateUrl: 'hero-form-reactive.component.html'
})
export class HeroFormReactiveComponent implements OnInit {

  powers = ['Really Smart', 'Super Flexible', 'Weather Changer'];

  hero = new Hero(18, 'Dr. WhatIsHisName', this.powers[0], 'Dr. What');

  submitted = false;

  onSubmit() {
    this.submitted = true;
    this.hero = this.heroForm.value;
  }

  // Reset the form with a new hero AND restore 'pristine' class state
  // by toggling 'active' flag which causes the form
  // to be removed/re-added in a tick via NgIf
  // TODO: Workaround until NgForm has a reset method (#6822)
  active = true;
  addHero() {
    this.hero = new Hero(42, '', '');
    this.buildForm();

    this.active = false;
    setTimeout(() => this.active = true, 0);
  }

  heroForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
  }

  onBlur(event: Event) {
    let fieldName = (event.target as HTMLInputElement).id;
    let control: AbstractControl = this.heroForm.get(fieldName);
    control.asyncValidator(control);
  }

  buildForm(): void {
    this.heroForm = this.fb.group({
      'name': [this.hero.name, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(24),
        forbiddenNameValidator(/bob/i)
      ], [nameTakenValidator('john')]
      ],
      'alterEgo': [this.hero.alterEgo, [], [nameTakenValidator('superman')]],
      'power': [this.hero.power, Validators.required]
    });

    this.heroForm.statusChanges
      .subscribe(data => this.onStatusChanged(data));

    this.onStatusChanged(); // (re)set validation messages now
  }

  // ngDoCheck() {
  //   this.onStatusChanged();
  // }

  onStatusChanged(data?: any) {
    if (!this.heroForm) { return; }
    const form = this.heroForm;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          let error = control.errors[key];
          if (key === 'nameTaken') {
            let message = (messages[key] as string).replace('$', error.invalidValue);
            this.formErrors[field] += message + ' ';
          } else {
            this.formErrors[field] += messages[key] + ' ';
          }
        }
      }
    }
  }

  formErrors = {
    'name': '',
     'alterEgo': '',
    'power': ''
  };

  validationMessages = {
    'name': {
      'required': 'Name is required.',
      'minlength': 'Name must be at least 4 characters long.',
      'maxlength': 'Name cannot be more than 24 characters long.',
      'forbiddenName': 'Someone named "Bob" cannot be a hero.',
      'nameTaken': "Username '$' is alrady taken."
    },
    'alterEgo': {
      'nameTaken': "Alter ego '$' is alrady taken."
    },
    'power': {
      'required': 'Power is required.'
    }
  };
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/