import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { LoggerService } from './logger.service';
import { BackendMockService } from './backend-mock.service';
import { BackendPromiseService } from './backend-promise.service';
import { BackendPromiseHttpService } from './backend-promise-http.service';
import { API_BASE_URL } from '../shared/shared-types';
import { getBaseApiUrl } from '../shared/constants';
// import 'rxjs/add/operator/do';
import 'rxjs/Rx';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    LoggerService,
    HttpClientModule,
    { provide: API_BASE_URL, useFactory: getBaseApiUrl },
    {provide: BackendPromiseService, useClass: BackendPromiseHttpService}

  ]
})
export class CoreModule { }
