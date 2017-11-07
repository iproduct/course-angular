import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Renderer2Component } from './renderer2.component';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [Renderer2Component],
  exports: [Renderer2Component]
})
export class Renderer2Module { }