import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }           from './app.component';
import { HeroFormTemplateModule } from './template/hero-form-template.module';
import { HeroFormReactiveModule } from './reactive/hero-form-reactive.module';

@NgModule({
  imports: [
    BrowserModule,
    HeroFormTemplateModule,
    HeroFormReactiveModule
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/