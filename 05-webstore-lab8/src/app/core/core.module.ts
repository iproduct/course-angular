import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendService } from './backend.service';
import { BackendHttpService } from './backend-http.service';

export const BACKEND_SERVICE = new InjectionToken<BackendService>('backend.service');

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: BACKEND_SERVICE, useClass: BackendHttpService }
  ]
})
export class CoreModule { }
