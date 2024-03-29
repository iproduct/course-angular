import { AppRoutingModule } from '../app/app-routing.module';
import {RouterLinkStubDirective,  RouterOutletStubComponent,  RouterStub, ActivatedRouteStub} from './router-stubs';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  declarations: [
    RouterLinkStubDirective,
    RouterOutletStubComponent
  ],
  providers: [RouterStub, ActivatedRouteStub],
  exports: [
    RouterLinkStubDirective,
    RouterOutletStubComponent,
    AppRoutingModule
  ]
})
export class TestingModule { }
