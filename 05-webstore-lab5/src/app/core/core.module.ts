import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Identifiable } from '../shared/shared-types';
import { PRODUCTS } from './mock-data';
import { BackendMockService } from './backend-mock.service';
import { PRODUCTS_TOKEN } from './injection-tokens';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    { provide: BackendMockService, useClass: BackendMockService },
    { provide: PRODUCTS_TOKEN, useValue: PRODUCTS }
  ]
})
export class CoreModule { }
