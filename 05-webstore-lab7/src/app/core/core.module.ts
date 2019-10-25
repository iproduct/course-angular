import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendPromiseService, BackendPromiseServiceMockImpl } from './backend-promise.service';
import { BACKEND_SERVICE } from './backend.service';
import { BackendHttpService } from './backend-http.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CachingInterceptor } from './caching-interceptor';
import { LoggingInterceptor } from './logging-interceptor';
import { RequestCache, RequestCacheWithMap } from './request-cache.service';
import { MessageService } from './message.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [ MessageService,
    { provide: BackendPromiseService, useClass: BackendPromiseServiceMockImpl},
    { provide: BACKEND_SERVICE, useClass: BackendHttpService},
    { provide: RequestCache, useClass: RequestCacheWithMap },
    { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true }
  ]
})
export class CoreModule { }
