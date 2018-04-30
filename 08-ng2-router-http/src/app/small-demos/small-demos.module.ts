import { NgModule }     from '@angular/core';
import { SimpleFormComponent } from './simple.form.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [SimpleFormComponent],
  exports: [SimpleFormComponent]
})
export class SmallDemosModule { }
