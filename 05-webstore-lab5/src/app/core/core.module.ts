import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Identifiable } from '../shared/shared-types';
import { PRODUCTS } from './mock-data';
import { BackendMockService } from './backend-mock.service';
import { PRODUCTS_TOKEN } from './injection-tokens';
import { BackendHtpPromiseService } from './backend-http-promise.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    { provide: BackendMockService, useClass: BackendHtpPromiseService },
    { provide: PRODUCTS_TOKEN, useValue: PRODUCTS }
  ]
})
export class CoreModule { }
