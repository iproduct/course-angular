import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SimpleFormComponent } from './simple-form/simple-form.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [SimpleFormComponent],
  exports: [SimpleFormComponent]
})
export class SimpleFormModule { }
