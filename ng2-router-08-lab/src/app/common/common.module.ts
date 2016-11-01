import { BrowserModule }       from '@angular/platform-browser';
import { NgModule }     from '@angular/core';
import { BackendService }      from './backend.service';
import { Logger }              from './logger.service';
import { HttpModule } from '@angular/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataModel } from './in-memory-data.model';
import { BackendHttpService } from './backend-http.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataModel, { delay: 2000})
  ],
  providers: [
    Logger,
    { provide: 'API_BASE_URL', useValue: '/api' },
    { provide: BackendService, useClass: BackendHttpService }
  ]
})
export class CommonModule { }
