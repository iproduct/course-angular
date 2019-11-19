import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DynamicFormModule } from './dynamic-form/dynamic-form.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DynamicFormModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
