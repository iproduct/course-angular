import {HttpClientModule} from '@angular/common/http';
import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendMockService } from './backend-mock.service';
import { LoggerService } from './logger.service';
import { BackendPromiseService } from './backend-promise.service';
import { BackendService } from './backend.service';
import { BackendHttpService } from './backend-http.service';
import { NavComponent } from './nav/nav.component';
import { RouterModule } from '@angular/router';

export let BACKEND_PROMISE_SERVICE = new InjectionToken<BackendPromiseService>('backend.service');
export let BACKEND_SERVICE = new InjectionToken<BackendService>('backend.service');

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    { provide: BACKEND_SERVICE, useClass: BackendHttpService },
    LoggerService
  ],
  declarations: [NavComponent],
  exports: [NavComponent]
})
export class CoreModule { }
