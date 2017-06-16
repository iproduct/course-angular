import { NgModule } from '@angular/core';
import { EllipsisPipe } from './pipes/ellipsis';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    EllipsisPipe
  ],
  exports: [
    EllipsisPipe
  ]
})
export class SharedModule { }
