import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PRODUCTS } from './mock-data';
import { BackendMockService } from './backend-mock.service';
import { PRODUCTS_TOKEN } from './constants';
import { BackendHtpPromiseService } from './backend-http-promise.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BackendObservableService } from './backend-observable.service';
import { BackendService } from './backend.service';
import { LoggingInterceptor } from './logging-interceptor';
import { CachingInterceptor } from './caching-interceptor';
import { RequestCache, RequestCacheWithMap } from './request-cache.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    { provide: BackendMockService, useClass: BackendHtpPromiseService },
    { provide: BackendService, useClass: BackendObservableService },
    { provide: PRODUCTS_TOKEN, useValue: PRODUCTS },
    { provide: RequestCache, useClass: RequestCacheWithMap },
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true },
  ]
})
export class CoreModule { }
