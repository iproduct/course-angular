import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BACKEND } from './backend.service';
import { BackendHttpService } from './backend-http.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [{provide: BACKEND, useClass: BackendHttpService}]
})
export class CoreModule { }
