import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendPromiseService, BackendPromiseServiceMockImpl } from './backend-promise.service';
import { BACKEND_SERVICE } from './backend.service';
import { BackendHttpService } from './backend-http.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    {provide: BackendPromiseService, useClass: BackendPromiseServiceMockImpl},
    {provide: BACKEND_SERVICE, useClass: BackendHttpService}
  ]
})
export class CoreModule { }
