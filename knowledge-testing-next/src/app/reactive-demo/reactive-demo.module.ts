import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveDemoComponent } from './demo01/demo01.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ReactiveDemoComponent],
  exports: [ReactiveDemoComponent]
})
export class ReactiveDemoModule { }
