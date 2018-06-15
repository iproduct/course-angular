import {FormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateFormComponent } from './template-form/template-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [TemplateFormComponent],
  exports: [TemplateFormComponent],
})
export class SimpleDemosModule { }
