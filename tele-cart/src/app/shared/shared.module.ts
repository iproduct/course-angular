import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendMockService } from './backend-mock.service';
import { Logger } from './logger.service';
import { BackendService } from './backend.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    Logger,
    { provide: BackendService, useClass: BackendMockService }
  ]
})
export class SharedModule { }
