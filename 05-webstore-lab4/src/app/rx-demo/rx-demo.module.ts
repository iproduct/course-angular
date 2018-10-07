import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxDemoComponent } from './rx-demo/rx-demo.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [RxDemoComponent],
  exports: [RxDemoComponent]
})
export class RxDemoModule { }
