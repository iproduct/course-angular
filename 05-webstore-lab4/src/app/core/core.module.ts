import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BackendService } from './backend.service';
import { BackendObservableService } from './backend-observable.service';
import { LoggingInterceptor } from './logging-interceptor';
import { MessageService } from './message.service';
import { RequestCache, RequestCacheWithMap } from './request-cache.service';
import { CachingInterceptor } from './caching-interceptor';

export const BASE_API_URI = new InjectionToken<string>('BASE_API_URI');

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true },
    { provide: BackendService, useClass: BackendObservableService },
    { provide: RequestCache, useClass: RequestCacheWithMap },
  ],
})
export class CoreModule { }
