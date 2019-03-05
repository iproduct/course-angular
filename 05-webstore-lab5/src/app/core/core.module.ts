import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Identifiable } from '../shared/shared-types';
import { PRODUCTS } from './mock-data';
import { BackendMockService } from './backend-mock.service';
import { PRODUCTS_TOKEN } from './injection-tokens';
import { BackendHtpPromiseService } from './backend-http-promise.service';
import { HttpClientModule } from '@angular/common/http';
import { BackendService } from './backend.service';
import { BackendHtpObservableService } from './backend-http-observable.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    { provide: BackendService, useClass: BackendHtpObservableService },
    { provide: PRODUCTS_TOKEN, useValue: PRODUCTS }
  ]
})
export class CoreModule { }
