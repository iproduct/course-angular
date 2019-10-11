import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleFormComponent } from './simple-form.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [SimpleFormComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [SimpleFormComponent],
})
export class SimpleFormModule { }
