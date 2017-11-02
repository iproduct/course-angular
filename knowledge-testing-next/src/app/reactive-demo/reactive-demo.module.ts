import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Demo01Component } from './demo01/demo01.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [Demo01Component],
  exports: [Demo01Component]
})
export class ReactiveDemoModule { }
