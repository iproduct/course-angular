import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxDemoComponent } from './rx-demo/rx-demo.component';



@NgModule({
  declarations: [RxDemoComponent],
  exports: [RxDemoComponent],
  imports: [
    CommonModule
  ]
})
export class RxdemoModule { }
