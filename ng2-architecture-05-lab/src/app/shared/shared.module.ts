import {NgModule} from '@angular/core';
import { Logger } from './logger.service';
import { BackendService } from './backend.service';

@NgModule({
  providers: [Logger, BackendService]
})
export class SharedModule { }
