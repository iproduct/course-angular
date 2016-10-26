/* tslint:disable: member-ordering */
import { Component, ViewChild  } from '@angular/core';


import { Hero }      from '../shared/hero';
import { MySubmitted } from '../shared/submitted.component';
import { NgForm } from '@angular/forms';



@Component({
  moduleId:  module.id,
  selector: 'hero-form-template1',
  templateUrl: 'hero-form-template1.component.html'
})
export class HeroFormTemplate1Component {

  @ViewChild('heroForm') currentForm: NgForm;

  powers = ['Really Smart', 'Super Flexible', 'Weather Changer'];

  hero = new Hero(18, 'Dr. WhatIsHisWayTooLongName', this.powers[0], 'Dr. What');

  submitted = false;

  onSubmit() {
    this.submitted = true;
  }
  // Reset the form with a new hero AND restore 'pristine' class state
  // by toggling 'active' flag which causes the form
  // to be removed/re-added in a tick via NgIf
  // TODO: Workaround until NgForm has a reset method (#6822)
  active = true;

  addHero() {
    this.hero = new Hero(42, '', '');
    this.currentForm.reset();

    // this.active = false;
    // setTimeout(() => this.active = true, 0);
  }

  onSubmittedChange(event: MySubmitted) {
    console.log(JSON.stringify(event));
    this.submitted = event.submitted;
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/