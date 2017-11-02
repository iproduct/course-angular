import {HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggerService } from './logger.service';
import { BackendMockService } from './backend-mock.service';
import { BackendPromiseService } from './backend-promise.service';
import { API_BASE_URL, getBaseApiUrl } from '../shared/constants';
import { BackendPromiseHttpService } from './backend-promise-http.service';
import { BackendHttpService } from './backend-http.service';
import { BackendService } from './backend.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    LoggerService,
    {provide: API_BASE_URL, useFactory: getBaseApiUrl},
    {provide: BackendPromiseService, useClass: BackendPromiseHttpService},
    {provide: BackendService, useClass: BackendHttpService}
  ]
})
export class CoreModule { }
