import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxDemoComponent } from './rx-demo/rx-demo.component';

@NgModule({
  declarations: [RxDemoComponent],
  imports: [
    CommonModule
  ],
  exports: [RxDemoComponent]
})
export class RxDemoModule { }
