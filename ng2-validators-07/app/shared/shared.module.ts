import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForbiddenValidatorDirective } from './forbidden-name.directive';
import { SubmittedComponent }          from './submitted.component';

@NgModule({
  imports:      [ CommonModule],
  declarations: [ ForbiddenValidatorDirective, SubmittedComponent ],
  exports:      [ ForbiddenValidatorDirective, SubmittedComponent,
                  CommonModule ]
})
export class SharedModule { }


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/