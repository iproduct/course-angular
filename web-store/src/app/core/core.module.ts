import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggerService } from './logger.service';
import { BackendService } from './backend.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [LoggerService, BackendService],
  declarations: []
})
export class CoreModule { }
