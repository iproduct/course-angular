import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

export const BASE_API_URI = new InjectionToken<string>('BASE_API_URI');

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [{provide: BASE_API_URI, useValue: 'http://localhost:4200/api/'}],
})
export class CoreModule { }
