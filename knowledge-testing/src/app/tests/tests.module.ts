import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestListComponent } from './test-list/test-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TestListComponent],
  exports: [TestListComponent]
})
export class TestsModule { }
