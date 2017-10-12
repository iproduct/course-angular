import { NgModule }            from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule }              from '../shared/shared.module';
import { HeroFormReactiveComponent } from './hero-form-reactive.component';

@NgModule({
  imports:      [ SharedModule, ReactiveFormsModule ],
  declarations: [ HeroFormReactiveComponent ],
  exports:      [ HeroFormReactiveComponent ]
})
export class HeroFormReactiveModule { }


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/