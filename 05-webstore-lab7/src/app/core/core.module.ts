import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendPromiseService, BackendPromiseServiceMockImpl } from './backend-promise.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {provide: BackendPromiseService, useClass: BackendPromiseServiceMockImpl}
  ]
})
export class CoreModule { }
