import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { FormsModule } from '@angular/forms';
import { FormDemoComponent } from './form-demo.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [FormDemoComponent],
  exports: [FormDemoComponent]
})
export class SharedModule { }
