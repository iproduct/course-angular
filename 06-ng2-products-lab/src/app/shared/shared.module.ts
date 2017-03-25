import {NgModule} from '@angular/core';
import { Logger } from './logger.service';
import { BackendService } from './backend.service';
import { BackendHttpService } from './backend-http.service';
import { BackendMockService } from './backend-mock.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataModel } from './in-memory-data.model';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataModel, {delay: 200}),
  ],
  providers: [
    Logger,
    { provide: 'API_BASE_URL', useValue: '/api' },
    { provide: BackendService, useClass: BackendHttpService },
    // { provide: BackendObservableService, useClass: BackendHttpObservableService }
  ]
})
export class SharedModule { }