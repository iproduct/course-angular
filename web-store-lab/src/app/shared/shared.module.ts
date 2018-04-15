import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDemoComponent } from './form-demo/form-demo.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [FormDemoComponent],
  exports: [FormDemoComponent]
})
export class SharedModule { }
