import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleFormComponent } from './simple-form.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [SimpleFormComponent],
  exports: [SimpleFormComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class SimpleFormModule { }
