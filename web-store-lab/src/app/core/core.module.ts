import {HttpClientModule} from '@angular/common/http';
import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendMockService } from './backend-mock.service';
import { LoggerService } from './logger.service';
import { BackendPromiseHttpService } from './backend-promise-http.service';
import { BackendPromiseService } from './backend-promise.service';

export let BACKEND_SERVICE = new InjectionToken<BackendPromiseService>('backend.service');

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    { provide: BACKEND_SERVICE, useClass: BackendMockService },
    LoggerService,
    BackendPromiseHttpService,
  ]
})
export class CoreModule { }
