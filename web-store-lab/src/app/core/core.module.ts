import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendMockService } from './backend-mock.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [BackendMockService]
})
export class CoreModule { }
